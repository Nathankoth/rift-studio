"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import clsx from "clsx";

const WHATSAPP = "2348116999112";

type Option = {
  label: string;
  points: number;
};

type Question = {
  id: string;
  area: string;
  prompt: string;
  options: Option[];
};

const QUESTIONS: Question[] = [
  {
    id: "search",
    area: "Google search",
    prompt: "When someone searches for your type of business on Google, what happens?",
    options: [
      { label: "We show up near the top with good info", points: 20 },
      { label: "We appear, but low down or with little detail", points: 12 },
      { label: "We rarely appear in search results", points: 5 },
      { label: "I'm not sure / we've never checked", points: 0 },
    ],
  },
  {
    id: "maps",
    area: "Google Maps",
    prompt: "How complete is your Google Business Profile (Maps listing)?",
    options: [
      { label: "Photos, hours, location, and reviews are all up to date", points: 20 },
      { label: "We have a listing, but it's missing photos or details", points: 12 },
      { label: "We have a basic listing with wrong or old info", points: 5 },
      { label: "We don't have one / I don't know", points: 0 },
    ],
  },
  {
    id: "website",
    area: "Website",
    prompt: "What does your website experience look like on a phone?",
    options: [
      { label: "Fast, clear, and easy to call, order, or book", points: 20 },
      { label: "We have a site, but it's slow or hard to use on mobile", points: 12 },
      { label: "We only use Instagram, WhatsApp, or a link-in-bio", points: 5 },
      { label: "We don't have a proper website", points: 0 },
    ],
  },
  {
    id: "direct",
    area: "Direct channel",
    prompt: "Can customers reach you directly without going through delivery apps or middlemen?",
    options: [
      { label: "Yes — our own site or channel handles orders and bookings", points: 15 },
      { label: "Partly — some sales go direct, many go through apps", points: 9 },
      { label: "Mostly through delivery apps or third parties", points: 4 },
      { label: "Not really — we depend on walk-ins or referrals", points: 0 },
    ],
  },
  {
    id: "enquiries",
    area: "Enquiries",
    prompt: "What happens when a customer calls or messages during a busy period?",
    options: [
      { label: "We answer quickly or have a system that catches every enquiry", points: 15 },
      { label: "We try, but calls and messages get missed sometimes", points: 9 },
      { label: "Enquiries often go unanswered until later", points: 4 },
      { label: "We don't track this / it happens a lot", points: 0 },
    ],
  },
  {
    id: "growth",
    area: "Ongoing presence",
    prompt: "How actively do you improve your online presence over time?",
    options: [
      { label: "We post, gather reviews, and keep info fresh regularly", points: 10 },
      { label: "We update occasionally when we remember", points: 6 },
      { label: "We set things up once and rarely touch them again", points: 2 },
      { label: "We haven't really started yet", points: 0 },
    ],
  },
];

type Screen = "intro" | "quiz" | "lead" | "result";

function scoreLabel(score: number) {
  if (score >= 80) return "Strong visibility";
  if (score >= 55) return "Room to grow";
  if (score >= 30) return "Customers are slipping away";
  return "Hard to find online";
}

function scoreMessage(score: number) {
  if (score >= 80) {
    return "You're ahead of most businesses — but there's still upside in staying active and capturing more enquiries.";
  }
  if (score >= 55) {
    return "You have some basics in place, but gaps are likely sending ready customers to competitors who are easier to find.";
  }
  if (score >= 30) {
    return "You're losing visibility every week. Fixing the biggest gaps is usually faster and cheaper than most owners expect.";
  }
  return "Right now, customers who want what you offer probably can't find you. That's fixable — and it starts with the basics.";
}

export default function VisibilityCheck() {
  const [screen, setScreen] = useState<Screen>("intro");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [business, setBusiness] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");

  const score = useMemo(
    () => Object.values(answers).reduce((total, value) => total + value, 0),
    [answers]
  );

  const currentQuestion = QUESTIONS[step];
  const progress = screen === "quiz" ? ((step + 1) / QUESTIONS.length) * 100 : 0;

  function selectOption(points: number) {
    const nextAnswers = { ...answers, [currentQuestion.id]: points };
    setAnswers(nextAnswers);

    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
      return;
    }

    setScreen("lead");
  }

  function openWhatsApp() {
    const message = [
      "Hi RIFT — I just completed the Visibility Check.",
      "",
      `Business: ${business}`,
      `Name: ${name}`,
      `Contact: ${contact}`,
      `Score: ${score}/100 (${scoreLabel(score)})`,
    ].join("\n");

    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`, "_blank");
  }

  function handleLeadSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!business.trim() || !name.trim() || !contact.trim()) return;
    setScreen("result");
  }

  function reset() {
    setScreen("intro");
    setStep(0);
    setAnswers({});
    setBusiness("");
    setName("");
    setContact("");
  }

  return (
    <div className="mx-auto w-full max-w-xl rounded-3xl border border-border bg-surface p-6 sm:p-8 shadow-2xl">
      {screen === "intro" && (
        <div>
          <div className="mb-6 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-accent" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-muted">
              Free visibility check
            </span>
          </div>
          <h3 className="font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
            How easy are you to find online?
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
            Six quick questions. No login. Takes about two minutes. You&apos;ll get a score out
            of 100 and a clear next step.
          </p>
          <button
            type="button"
            onClick={() => setScreen("quiz")}
            className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-full bg-accent px-6 py-4 text-xs font-medium uppercase tracking-widest text-background transition-colors hover:bg-primary sm:text-sm"
          >
            Get my free score
            <span>→</span>
          </button>
        </div>
      )}

      {screen === "quiz" && currentQuestion && (
        <div>
          <div className="mb-6">
            <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-muted">
              <span>
                Question {step + 1} of {QUESTIONS.length}
              </span>
              <span>{currentQuestion.area}</span>
            </div>
            <div className="h-1 overflow-hidden rounded-full bg-border">
              <div
                className="h-full bg-accent transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <h3 className="font-display text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">
            {currentQuestion.prompt}
          </h3>

          <div className="mt-6 space-y-3">
            {currentQuestion.options.map((option) => (
              <button
                key={option.label}
                type="button"
                onClick={() => selectOption(option.points)}
                className="w-full rounded-2xl border border-border px-4 py-4 text-left text-sm leading-relaxed transition-colors hover:border-accent hover:bg-background sm:px-5 sm:text-base"
              >
                {option.label}
              </button>
            ))}
          </div>

          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="mt-6 text-xs uppercase tracking-widest text-muted transition-colors hover:text-primary"
            >
              ← Back
            </button>
          )}
        </div>
      )}

      {screen === "lead" && (
        <form onSubmit={handleLeadSubmit}>
          <div className="mb-6 flex items-center gap-2">
            <span className="font-display text-4xl font-extrabold text-accent">{score}</span>
            <span className="text-sm text-muted">/ 100 so far</span>
          </div>
          <h3 className="font-display text-2xl font-extrabold leading-tight sm:text-3xl">
            Almost done — where should we send your results?
          </h3>
          <p className="mt-3 text-sm text-muted">
            We&apos;ll open WhatsApp with your score so you can talk to us directly.
          </p>

          <div className="mt-6 space-y-4">
            <label className="block">
              <span className="mb-2 block text-[10px] uppercase tracking-[0.25em] text-muted">
                Business name
              </span>
              <input
                required
                value={business}
                onChange={(event) => setBusiness(event.target.value)}
                className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
                placeholder="e.g. SABI Restaurant"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-[10px] uppercase tracking-[0.25em] text-muted">
                Your name
              </span>
              <input
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
                placeholder="Your name"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-[10px] uppercase tracking-[0.25em] text-muted">
                Phone or WhatsApp
              </span>
              <input
                required
                value={contact}
                onChange={(event) => setContact(event.target.value)}
                className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
                placeholder="+234 ..."
              />
            </label>
          </div>

          <button
            type="submit"
            className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-full bg-accent px-6 py-4 text-xs font-medium uppercase tracking-widest text-background transition-colors hover:bg-primary sm:text-sm"
          >
            See my score
            <span>→</span>
          </button>
        </form>
      )}

      {screen === "result" && (
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted">Your score</p>
          <p className="mt-3 font-display text-6xl font-extrabold leading-none text-accent sm:text-7xl">
            {score}
            <span className="text-2xl text-muted">/100</span>
          </p>
          <p className="mt-4 font-display text-xl font-extrabold sm:text-2xl">
            {scoreLabel(score)}
          </p>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted sm:text-base">
            {scoreMessage(score)}
          </p>

          <div className="mt-8 space-y-3">
            <button
              type="button"
              onClick={openWhatsApp}
              className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-accent px-6 py-4 text-xs font-medium uppercase tracking-widest text-background transition-colors hover:bg-primary sm:text-sm"
            >
              Send to WhatsApp
              <span>→</span>
            </button>
            <button
              type="button"
              onClick={reset}
              className={clsx(
                "w-full py-2 text-xs uppercase tracking-widest text-muted transition-colors hover:text-primary"
              )}
            >
              Start over
            </button>
            <Link
              href="/blog"
              className="block pt-2 text-sm text-muted transition-colors hover:text-accent"
            >
              Read our Insights
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
