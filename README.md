# BrandUpMe — Business Partnership Program Website

Static marketing site for the BrandUpMe Business Partnership Program.
Single-page conversion site targeting UAE business owners.

**Live domain (planned):** https://www.brandupme.ae/

---

## Approved direction

| Decision | Choice |
|---|---|
| Visual direction | **A — Poster Match** (black / gold / red, matches the running ad campaign) |
| Colour conflict with BRD | Build black/gold/red, **swappable via CSS variables** — green variant is a 6-line change |
| Form backend | **Pending client decision** — form is validated and API-ready, endpoint not yet wired |
| Tech stack | Plain HTML5 + CSS3 + vanilla JS. No framework, no build step. |

---

## Tech stack & why

Per the BRD (*"HTML5, CSS3, responsive grid, semantic headings, SEO metadata, fast loading, form API-ready"*):

- **No build step** — deploys to cPanel, Hostinger, Netlify or Vercel by copying files.
- **Fastest possible load** — better Core Web Vitals, better ranking for the target keywords.
- **Editable by anyone** — the client's future developer doesn't need Node/npm.
- **No dependency risk** on a 10-day deadline.

Only external request is Google Fonts (Anton + Inter). Everything else is local.

---

## Structure

This folder (`website/`) **is** the git repository root and the Vercel deploy root.

```
website/                 ← repo root
├─ index.html            Homepage — all sections, single page
├─ thank-you.html        Post-registration page (conversion tracking goes here)
├─ privacy.html          } required by Chapter 2 footer spec
├─ terms.html            }  — PENDING
├─ refund.html           }
├─ robots.txt
├─ sitemap.xml
├─ vercel.json           caching + security headers
├─ README.md             this file
├─ docs/                 client source material — GITIGNORED, never published
└─ assets/
   ├─ css/style.css      full design system, all colours as CSS variables
   ├─ js/main.js         nav, accordions, scroll reveal, form validation
   └─ img/               logo, favicon, OG image — PENDING ASSETS
```

> **`docs/` is gitignored on purpose.** The GitHub repo is public and those PDFs
> are the client's internal BRD and strategy documents. Do not commit them
> unless the client explicitly approves making them public.

Point Live Server at `index.html`. Vercel deploys this folder as-is — no build step.

### Homepage section order

Deliberately **problem before solution** — the client's brief was that a business owner
should "feel that he is lacking up somewhere." Sections 3–4 do that work *before*
AED 500 is ever mentioned, which is what makes the price feel small.

```
Hero → Trust marquee → The Problem (8 mistakes) → 10 Questions
→ The Solution → Services → How It Works (8 steps) → Onboarding (8 steps)
→ Comparison table → Industries → Pricing → FAQ (13)
→ Registration form → Contact → Final CTA band → Footer
```

---

## Theming

Every colour is a CSS custom property in `:root` at the top of `assets/css/style.css`.

To switch the whole site to the "dark green premium" variant from the BRD, change
**only** these three lines:

```css
--ink:   #04140E;
--ink-2: #082117;
--ink-3: #0C2C1F;
```

Nothing else needs to be touched.

---

## Form backend — integration point

The registration form is fully validated client-side but **not yet connected**.
`assets/js/main.js` deliberately blocks submission and shows a notice while the
endpoint placeholder is still in place, so nothing fails silently.

To go live, set the `action` attribute on `<form id="partnerForm">` in `index.html`:

| Option | Action URL | Notes |
|---|---|---|
| Formspree | `https://formspree.io/f/YOUR_ID` | Free tier, handles file uploads, instant email |
| Web3Forms | `https://api.web3forms.com/submit` | Also needs a hidden `access_key` input |
| Custom PHP | `/submit.php` | Needs cPanel/PHP hosting; data stays with client |

On success the user is redirected to `thank-you.html`.

---

## SEO implemented

- Semantic heading hierarchy, one `<h1>`
- Meta title / description / keywords, canonical, robots
- Open Graph + Twitter card
- Geo tags (`AE-DU`, Dubai)
- JSON-LD: `Organization`, `Service` (with AED 500 Offer), `WebSite`, `FAQPage`
- `robots.txt` + `sitemap.xml`
- The 10-question section and 13-item FAQ are **real indexable text**, not images —
  this is the long-tail SEO asset

**Target keywords:** remote sales representative Dubai · outsourced sales UAE ·
cold calling services Dubai · B2B lead generation Dubai · business development partner UAE ·
sales outsourcing UAE

---

## ⚠ OPEN ITEMS — needed from the client

| # | Item | Blocks | Status |
|---|---|---|---|
| 1 | **Official logo** (PNG/SVG, transparent) | Header, footer, favicon, OG image | Placeholder SVG in use |
| 2 | **Real phone number** — `+971 50 123 4567` appears to be a poster placeholder | Every call/WhatsApp CTA | Placeholder in use |
| 3 | **Real email** — is `hello@brandupme.ae` live? | Contact section, mailto links | Placeholder in use |
| 4 | **Form backend decision** | Registration cannot go live | Awaiting client |
| 5 | **Hosting + domain access** for brandupme.ae | Deployment | Awaiting client |
| 6 | **Social media URLs** (LinkedIn, Instagram, Facebook) | Footer icons link to `#` | Awaiting client |
| 7 | **Legal copy** — Privacy, Terms, Refund Policy | 3 footer pages | Needs client/legal sign-off |
| 8 | **Green vs black/gold/red** — confirm with management | Final colour | Building black/gold/red, swappable |
| 9 | **Company address** — full Dubai address for schema + footer | Local SEO | Only "Dubai, UAE" so far |
| 10 | **Google Analytics / Meta Pixel IDs** | Conversion tracking on thank-you page | Awaiting client |

---

## Running locally

Just open `index.html` in a browser — no server required.

For a local server (needed if testing form posts):

```bash
python -m http.server 8000
# then visit http://localhost:8000
```

---

## Remaining build tasks

- [ ] Privacy / Terms / Refund pages
- [ ] Drop in real logo, favicon, `og-image.jpg`
- [ ] Replace placeholder phone / email / social links
- [ ] Wire form backend once decided
- [ ] Cross-browser + real-device mobile QA
- [ ] Lighthouse pass (target 90+ on all four)
- [ ] Deploy + Google Search Console verification + sitemap submission
