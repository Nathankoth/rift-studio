"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";

const INPUT_SAMPLE_RATE = 16000;
const PLAYBACK_SAMPLE_RATE = 24000;

function normalizeWsUrl(url: string): string {
  if (!url) return url;
  if (url.startsWith("https://")) return `wss://${url.slice(8)}`;
  if (url.startsWith("http://")) return `ws://${url.slice(7)}`;
  return url;
}

const WS_URL = normalizeWsUrl(process.env.NEXT_PUBLIC_NANCY_URL ?? "");

type ConnectionStatus =
  | "idle"
  | "connecting"
  | "ready"
  | "speaking"
  | "listening"
  | "error";

type LogEntry = {
  category: string;
  message: string;
  timestamp: string;
};

function downsample(buffer: Float32Array, fromRate: number, toRate: number): Float32Array {
  if (fromRate === toRate) return buffer;
  const ratio = fromRate / toRate;
  const length = Math.round(buffer.length / ratio);
  const result = new Float32Array(length);
  for (let i = 0; i < length; i++) {
    result[i] = buffer[Math.floor(i * ratio)];
  }
  return result;
}

function floatTo16BitPCM(float32: Float32Array): Int16Array {
  const buffer = new Int16Array(float32.length);
  for (let i = 0; i < float32.length; i++) {
    const s = Math.max(-1, Math.min(1, float32[i]));
    buffer[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
  }
  return buffer;
}

const STATUS_LABEL: Record<ConnectionStatus, string> = {
  idle: "Talk to Nancy",
  connecting: "Connecting…",
  ready: "Nancy is ready",
  speaking: "Nancy is speaking",
  listening: "Listening",
  error: "Something went wrong",
};

function micErrorMessage(err: unknown): string {
  const name = err instanceof DOMException ? err.name : "";
  if (name === "NotAllowedError" || name === "PermissionDeniedError") {
    return "Microphone blocked. Click the lock icon in your browser address bar, allow microphone access for this site, then try again.";
  }
  if (name === "NotFoundError") {
    return "No microphone found. Connect a mic or check your system settings.";
  }
  if (name === "NotReadableError") {
    return "Your microphone is in use by another app. Close it and try again.";
  }
  if (err instanceof Error && err.message) {
    return err.message;
  }
  return "Could not access your microphone.";
}

async function requestMicrophone(): Promise<MediaStream> {
  if (!navigator.mediaDevices?.getUserMedia) {
    throw new Error("Your browser does not support voice calls here.");
  }
  return navigator.mediaDevices.getUserMedia({
    audio: { channelCount: 1, echoCancellation: true, noiseSuppression: true },
  });
}

export default function NancyWidget() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<ConnectionStatus>("idle");
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [error, setError] = useState("");

  const wsRef = useRef<WebSocket | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const captureCtxRef = useRef<AudioContext | null>(null);
  const playbackCtxRef = useRef<AudioContext | null>(null);
  const nextPlayTimeRef = useRef(0);
  const scheduledSourcesRef = useRef<AudioBufferSourceNode[]>([]);

  const stopPlayback = useCallback(() => {
    scheduledSourcesRef.current.forEach((source) => {
      try {
        source.stop();
      } catch {
        /* already stopped */
      }
    });
    scheduledSourcesRef.current = [];
    nextPlayTimeRef.current = 0;
  }, []);

  const cleanup = useCallback(() => {
    stopPlayback();
    processorRef.current?.disconnect();
    processorRef.current = null;
    mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
    mediaStreamRef.current = null;
    void captureCtxRef.current?.close();
    captureCtxRef.current = null;
    void playbackCtxRef.current?.close();
    playbackCtxRef.current = null;
  }, [stopPlayback]);

  const disconnect = useCallback(() => {
    wsRef.current?.close();
    wsRef.current = null;
    cleanup();
    setStatus("idle");
  }, [cleanup]);

  const playPcm = useCallback((int16Buffer: ArrayBuffer) => {
    if (!playbackCtxRef.current) {
      playbackCtxRef.current = new AudioContext({ sampleRate: PLAYBACK_SAMPLE_RATE });
    }
    const ctx = playbackCtxRef.current;
    if (ctx.state === "suspended") void ctx.resume();

    const samples = new Int16Array(int16Buffer);
    const float32 = new Float32Array(samples.length);
    for (let i = 0; i < samples.length; i++) {
      float32[i] = samples[i] / 32768;
    }

    const buffer = ctx.createBuffer(1, float32.length, PLAYBACK_SAMPLE_RATE);
    buffer.copyToChannel(float32, 0);

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);

    const now = ctx.currentTime;
    const start = Math.max(now, nextPlayTimeRef.current);
    source.start(start);
    nextPlayTimeRef.current = start + buffer.duration;
    scheduledSourcesRef.current.push(source);
    source.onended = () => {
      scheduledSourcesRef.current = scheduledSourcesRef.current.filter((s) => s !== source);
      if (scheduledSourcesRef.current.length === 0) {
        setStatus("listening");
      }
    };
    setStatus("speaking");
  }, []);

  const startMicrophone = useCallback((stream: MediaStream, ws: WebSocket) => {
    const ctx = new AudioContext();
    captureCtxRef.current = ctx;
    const source = ctx.createMediaStreamSource(stream);
    const processor = ctx.createScriptProcessor(4096, 1, 1);
    processorRef.current = processor;

    processor.onaudioprocess = (event) => {
      if (ws.readyState !== WebSocket.OPEN) return;
      const input = event.inputBuffer.getChannelData(0);
      const downsampled = downsample(input, ctx.sampleRate, INPUT_SAMPLE_RATE);
      const pcm = floatTo16BitPCM(downsampled);
      ws.send(pcm.buffer);
    };

    source.connect(processor);
    processor.connect(ctx.destination);
    setStatus("listening");
  }, []);

  const connect = useCallback(async () => {
    if (!WS_URL) {
      setError("Nancy is not configured. Set NEXT_PUBLIC_NANCY_URL.");
      setStatus("error");
      return;
    }

    setStatus("connecting");
    setError("");
    setLogs([]);

    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;
    ws.binaryType = "arraybuffer";

    let settled = false;

    const fail = (message: string) => {
      if (settled) return;
      settled = true;
      ws.close();
      wsRef.current = null;
      cleanup();
      setError(message);
      setStatus("error");
    };

    const connectTimeout = window.setTimeout(() => {
      fail(
        "Could not reach Nancy. Start the voice server (uv run main.py in voice_agent) or check NEXT_PUBLIC_NANCY_URL."
      );
    }, 10000);

    ws.onopen = () => {
      setLogs((prev) => [
        ...prev,
        {
          category: "system",
          message: "Connected to Nancy",
          timestamp: new Date().toISOString(),
        },
      ]);
    };

    ws.onmessage = async (event) => {
      if (event.data instanceof ArrayBuffer) {
        playPcm(event.data);
        return;
      }

      try {
        const data = JSON.parse(event.data as string);

        if (data.type === "ready") {
          window.clearTimeout(connectTimeout);
          setStatus("ready");
          setLogs((prev) => [
            ...prev,
            {
              category: "system",
              message: "Allow microphone when prompted…",
              timestamp: new Date().toISOString(),
            },
          ]);

          try {
            const stream = await requestMicrophone();
            if (settled || ws.readyState !== WebSocket.OPEN) {
              stream.getTracks().forEach((track) => track.stop());
              return;
            }
            mediaStreamRef.current = stream;
            startMicrophone(stream, ws);
          } catch (err: unknown) {
            fail(micErrorMessage(err));
          }
          return;
        }

        if (data.type === "session_end") {
          settled = true;
          window.clearTimeout(connectTimeout);
          setLogs((prev) => [
            ...prev,
            {
              category: "system",
              message: data.message || "Call ended.",
              timestamp: new Date().toISOString(),
            },
          ]);
          stopPlayback();
          disconnect();
          return;
        }

        if (data.type === "agent_event" && data.event?.type === "UserStartedSpeaking") {
          stopPlayback();
          return;
        }

        if (data.type === "log" || data.category) {
          const category = data.category || "system";
          const message = data.message || "";
          if (category === "stt" || category === "llm") {
            setLogs((prev) => [
              ...prev.slice(-19),
              {
                category,
                message,
                timestamp: data.timestamp || new Date().toISOString(),
              },
            ]);
          }
          if (category === "stt") setStatus("listening");
          if (category === "tts") setStatus("speaking");
        }
      } catch {
        /* ignore malformed messages */
      }
    };

    ws.onerror = () => {
      window.clearTimeout(connectTimeout);
      fail("Could not connect to Nancy. The voice server may be offline.");
    };

    ws.onclose = () => {
      window.clearTimeout(connectTimeout);
      if (settled || wsRef.current !== ws) return;
      wsRef.current = null;
      cleanup();
      setStatus("idle");
    };
  }, [cleanup, disconnect, playPcm, startMicrophone, stopPlayback]);

  useEffect(() => () => disconnect(), [disconnect]);

  if (!WS_URL) return null;

  const inCall = status !== "idle" && status !== "error";
  const canStart = status === "idle" || status === "error";

  return (
    <div className="fixed z-[60] flex flex-col items-end gap-3 bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] left-auto max-sm:left-[max(1rem,env(safe-area-inset-left))] max-sm:items-stretch">
      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 bg-background/50 backdrop-blur-[2px] md:bg-background/40 md:backdrop-blur-none"
            aria-label="Close Nancy panel"
            onClick={() => setOpen(false)}
          />
          <div className="relative w-[min(100vw-2rem,22rem)] max-sm:w-auto rounded-3xl border border-border bg-surface shadow-2xl overflow-hidden max-sm:mx-0">
            <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent font-display text-sm font-extrabold text-background">
                  N
                </span>
                <div>
                  <p className="font-display text-sm font-extrabold">Nancy</p>
                  <p className="text-[10px] uppercase tracking-widest text-muted">
                    RIFT Digital Solution
                  </p>
                </div>
              </div>
              {inCall && (
                <span className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-accent">
                  <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                  Live
                </span>
              )}
            </div>

            <div className="px-5 py-6 text-center">
              <button
                type="button"
                onClick={canStart ? connect : disconnect}
                className={clsx(
                  "mx-auto flex h-20 w-20 items-center justify-center rounded-full border-2 transition-all",
                  canStart
                    ? "border-accent bg-accent text-background hover:bg-primary"
                    : "border-border bg-background text-primary"
                )}
                aria-label={canStart ? "Start call with Nancy" : "End call"}
              >
                {canStart ? (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                  </svg>
                ) : (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <rect x="6" y="6" width="12" height="12" rx="2" />
                  </svg>
                )}
              </button>
              <p className="mt-4 text-xs uppercase tracking-widest text-muted">
                {STATUS_LABEL[status]}
              </p>
              {canStart && !error && (
                <p className="mt-2 px-2 text-xs text-muted text-balance leading-relaxed">
                  Ask about websites, voice agents, or our free visibility check.
                  Tap to connect — your browser will ask for microphone access.
                </p>
              )}
              {error && (
                <p className="mt-3 text-sm text-red-400 text-balance" role="alert">
                  {error}
                </p>
              )}
            </div>

            {logs.length > 0 && (
              <div className="max-h-36 sm:max-h-44 overflow-y-auto overscroll-contain border-t border-border px-5 py-4 space-y-2">
                {logs.map((entry, index) => (
                  <p
                    key={`${entry.timestamp}-${index}`}
                    className={clsx(
                      "text-xs leading-relaxed",
                      entry.category === "stt" ? "text-muted" : "text-primary"
                    )}
                  >
                    {entry.category === "stt" ? "You: " : "Nancy: "}
                    {entry.message}
                  </p>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className={clsx(
          "relative ml-auto flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-border bg-surface font-display text-lg font-extrabold text-accent shadow-xl transition-colors hover:border-accent hover:bg-accent hover:text-background touch-manipulation",
          inCall && !open && "ring-2 ring-accent ring-offset-2 ring-offset-background"
        )}
        aria-label={open ? "Close Nancy" : "Talk to Nancy"}
        aria-expanded={open}
      >
        {open ? "×" : "N"}
      </button>
    </div>
  );
}
