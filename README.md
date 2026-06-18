# RIFT.STUDIO

Digital studio landing page — Next.js 14 + GSAP + Tailwind, deployed on Vercel.

---

## Quick start

```bash
# 1. Install dependencies
npm install

# 2. Drop your hero video into /public/videos/
#    Required files:
#    - hero.webm (primary, smaller file size)
#    - hero.mp4  (fallback for Safari)
#    - hero-poster.jpg (poster image while video loads)

# 3. Run dev server
npm run dev
```

Open `http://localhost:3000`.

---

## Project structure

```
rift-studio/
├── app/
│   ├── layout.tsx       # Root layout, fonts, SEO metadata, JSON-LD
│   ├── page.tsx         # Homepage — assembles all sections
│   └── globals.css      # Tailwind + base styles + grain texture
├── components/
│   ├── Nav.tsx              # Sticky nav + full-screen mobile menu
│   ├── Hero.tsx             # Video background + animated headline
│   ├── Marquee.tsx          # Service marquee strip
│   ├── BrandShowcase.tsx    # Floating mockups section (cream contrast)
│   ├── Services.tsx         # Two-lane offering (Web + AI Voice)
│   ├── Work.tsx             # Selected work — desktop rows / mobile cards
│   ├── Process.tsx          # 4-step process (trust builder)
│   ├── About.tsx            # Founder bio + stats
│   └── CTA.tsx              # Contact + footer
├── public/
│   └── videos/          # ← drop hero video assets here
├── tailwind.config.ts   # Design tokens (colors, fonts, sizes)
└── next-sitemap.config.mjs
```

---

## Responsive design

Fully responsive across all breakpoints:

| Breakpoint | Tailwind | Range          | Notes                                    |
| ---------- | -------- | -------------- | ---------------------------------------- |
| Mobile     | (none)   | 0 – 639px      | Single column, hamburger menu, stacked   |
| Small      | `sm:`    | 640px+         | Larger type, side-by-side CTAs           |
| Tablet     | `md:`    | 768px+         | Multi-column grids appear, desktop nav   |
| Desktop    | `lg:`    | 1024px+        | Full editorial layouts, scattered cards  |
| Wide       | `xl:`    | 1280px+        | Max headline scales                      |

**Key responsive patterns:**

- Mobile-first Tailwind classes throughout
- Full-screen hamburger menu on mobile (lock body scroll when open)
- BrandShowcase uses two completely different layouts: scattered/rotated on desktop, clean 2-column grid on mobile
- Work section uses 12-column row layout on desktop, stacked card layout on mobile
- All type uses responsive scales (e.g. `text-5xl md:text-7xl lg:text-huge`)
- `100svh` viewport unit for hero (avoids iOS Safari address bar jump)
- `overflow-x: clip` on main to prevent horizontal scroll from rotated mockups
- GSAP `matchMedia` for breakpoint-specific animations

---

## Adding the showcase section

The new **BrandShowcase** section sits between the marquee and services. It uses a cream background (`#F5F0EB`) to create a deliberate contrast moment in the dark theme.

To swap the mockup card content with your real work:

1. Open `components/BrandShowcase.tsx`
2. Edit the `cards` array at the top
3. Each card has a `className` (positioning) and a `content` JSX block
4. Adjust `top`, `left`, `right`, `bottom`, `width`, and `rotate-[Xdeg]` to taste
5. Mobile automatically reflows to a 2-column grid

---



All in `tailwind.config.ts`. Change once, propagates everywhere.

| Token       | Value     | Purpose                  |
| ----------- | --------- | ------------------------ |
| background  | `#0f0e0d` | Warm dark base           |
| surface     | `#1a1916` | Cards, elevated areas    |
| border      | `#2a2825` | Subtle separators        |
| accent      | `#FF4D00` | Electric orange          |
| primary     | `#F5F0EB` | Warm off-white text      |
| muted       | `#7a7672` | Secondary text           |

Fonts loaded via `next/font/google` (zero layout shift):
- **Syne** — display (headlines)
- **Inter** — body
- **DM Serif Display** — italic accent moments

---

## Hero video

Place your video files in `public/videos/`:

- **hero.webm** — primary source, use VP9 codec, target ~3-5MB
- **hero.mp4** — H.264 fallback for Safari, target ~5-8MB
- **hero-poster.jpg** — first frame as JPEG, shows while video loads

### Convert your existing video with ffmpeg:

```bash
# WebM (VP9) — best compression
ffmpeg -i input.mov -c:v libvpx-vp9 -crf 35 -b:v 0 -an public/videos/hero.webm

# MP4 (H.264) — Safari fallback
ffmpeg -i input.mov -c:v libx264 -crf 28 -preset slow -an public/videos/hero.mp4

# Poster frame
ffmpeg -i input.mov -ss 00:00:00 -vframes 1 public/videos/hero-poster.jpg
```

Tips: keep it under 8MB total, no audio (`-an`), 5–8 seconds, loops cleanly.

---

## Customizing content

All copy lives inside each component file. Edit directly:

- **Hero headline** — `components/Hero.tsx`
- **Services** — array at top of `components/Services.tsx`
- **Projects** — array at top of `components/Work.tsx`
- **Process steps** — array at top of `components/Process.tsx`
- **About copy** — `components/About.tsx`
- **Contact email / WhatsApp** — `components/CTA.tsx`

---

## SEO

Already configured:

- Per-page metadata via `generateMetadata`
- OpenGraph + Twitter cards
- JSON-LD structured data (ProfessionalService schema)
- Auto-generated `sitemap.xml` and `robots.txt` after `npm run build`
- Semantic HTML (proper `<section>`, `<article>`, `<header>`, `<footer>`)

### Before launch:

1. Add real `/public/og-image.jpg` (1200×630)
2. Update `metadataBase` and contact details in `app/layout.tsx`
3. Run `npm run build` to generate sitemap
4. Submit sitemap to Google Search Console

---

## Vercel deployment

```bash
# Install Vercel CLI if not already
npm install -g vercel

# Deploy
vercel
```

Or connect the repo in the [Vercel dashboard](https://vercel.com) — it auto-detects Next.js and deploys on every push to `main`.

Add custom domain: `rift.studio`

---

## Performance checklist

- [x] Fonts: `next/font` (no FOUT, preloaded)
- [x] Images: lazy-loaded by default
- [x] Video: poster image, `playsInline`, autoplay only when muted
- [x] CSS: Tailwind purged in production
- [x] Animations: respect `prefers-reduced-motion`
- [x] HTML: semantic landmarks for accessibility
- [ ] Lighthouse audit before launch (target 95+ across all metrics)

---

## Next steps

1. Add hero video files
2. Replace founder portrait placeholder in `About.tsx`
3. Add real project thumbnails to `Work.tsx`
4. Set up `hello@rift.studio` email
5. Buy `rift.studio` domain
6. Deploy

---

Built with intention. RIFT.
