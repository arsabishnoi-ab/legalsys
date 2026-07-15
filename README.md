# PS Viswanathan — Advocate & Legal Consultant

Premium single-page legal landing website for **PS Viswanathan**, Advocate in BTM Layout, Bengaluru.

## Quick Start

```bash
# From the project root
python -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000) in your browser.

> **Note:** ES modules require a local server — opening `index.html` directly via `file://` will not load JavaScript correctly.

## Project Structure

| Path | Purpose |
|------|---------|
| `index.html` | Single-page site — all sections, SEO meta, JSON-LD |
| `css/style.css` | Design system, layout, animations, responsive breakpoints |
| `js/main.js` | Header scroll, nav, scrollspy, reveal, counters, reviews, contact form |
| `js/reviews.js` | ~100 placeholder client reviews (filterable by practice area) |
| `images/` | Logo, portraits, OG image, service card headers |
| `images/services/` | Practice area card background images |
| `robots.txt` | Search engine crawl rules |
| `sitemap.xml` | XML sitemap for SEO |
| `site.webmanifest` | PWA manifest (name, theme, icons) |

## Content Editing Guide

| What to change | Where |
|----------------|-------|
| Name, phone, email, address | `index.html` (contact, footer, hero) + `js/main.js` (`SITE` object) |
| Practice area descriptions | `index.html` → `#practice` section |
| About bio & credentials | `index.html` → `#about` section |
| Client reviews | `js/reviews.js` — replace placeholder entries with real testimonials |
| Office hours | `index.html` contact section + JSON-LD in `<head>` |
| Canonical / OG URLs | Find-replace `https://YOUR-DOMAIN.com` in `index.html`, `robots.txt`, `sitemap.xml` |
| Stats (years, clients) | `index.html` → `data-count` attributes on `.stat__value` elements |
| Google Maps embed | `index.html` → `.contact__map iframe src` |

## Image Slots

| File | Recommended size | Used in |
|------|-------------------|---------|
| `images/hero-portrait.jpg` | 480 × 640 (3:4) | Hero section portrait |
| `images/about-main.jpg` | 560 × 700 (4:5) | About gallery — main photo |
| `images/about-side.jpg` | 400 × 533 (3:4) | About gallery — side photo |
| `images/about-chip.jpg` | 100 × 100 (1:1) | Inline circular chips in about statement |
| `images/og-image.jpg` | 1200 × 630 (16:9) | Open Graph / Twitter social preview |
| `images/logo.svg` | Vector | Header, footer branding |
| `images/favicon.svg` | Vector | Browser tab icon |
| `images/apple-touch-icon.png` | 180 × 180 | iOS home screen icon |
| `images/services/family.jpg` | 800 × 500 | Family & Divorce card |
| `images/services/consumer.jpg` | 800 × 500 | Consumer Cases card |
| `images/services/civil.jpg` | 800 × 500 | Civil Cases card |
| `images/services/property.jpg` | 800 × 500 | Property Opinions card |
| `images/services/registration.jpg` | 800 × 500 | Registration card |
| `images/services/cheque-bounce.jpg` | 800 × 500 | Cheque Bounce card |
| `images/services/arbitration.jpg` | 800 × 500 | Arbitration card |

All image slots have CSS gradient fallbacks — the site works even if images are missing.

## Important Notes

- **No backend:** The contact form uses `mailto:` and WhatsApp (`wa.me`) only. No data is stored on a server.
- **Placeholder reviews:** The 100 reviews in `js/reviews.js` are sample content. Replace with genuine client testimonials before launch.
- **Bar Council disclaimer:** Included in the footer as required for Indian advocates.

## SEO Launch Checklist

- [ ] Replace all `https://YOUR-DOMAIN.com` with your actual domain
- [ ] Update `sitemap.xml` `lastmod` date
- [ ] Submit sitemap to Google Search Console
- [ ] Verify JSON-LD with [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Test Open Graph preview with [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [ ] Replace placeholder reviews with real testimonials
- [ ] Confirm Google Maps iframe shows correct office location
- [ ] Add real `apple-touch-icon.png` (180×180) if needed

## Deploy

### Netlify (drag-and-drop)

1. Zip the project folder (or connect a Git repo)
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
3. Drag the folder onto the page
4. Update `YOUR-DOMAIN.com` in all files to your Netlify URL or custom domain

### GitHub Pages

1. Push the project to a GitHub repository
2. Go to **Settings → Pages → Source → Deploy from branch**
3. Select `main` branch, `/ (root)` folder
4. Site will be live at `https://<username>.github.io/<repo>/`
5. Update canonical URLs accordingly

---

© PS Viswanathan Advocate — BTM Layout, Bengaluru
