# Portfolio Content Inventory

Everything currently published in `C:\Users\salazar pc\Projects\MyPortfolio`.

- **Generated:** November 17, 2026
- **Package:** `benedict-salazar-portfolio` v1.0.0
- **Stack:** Next.js 16.4.3 (App Router), React 19, TypeScript, Tailwind CSS 4, Geist / Geist Mono, lucide-react
- **Output:** static export to `out/` (`output: "export"`, `trailingSlash: true`, unoptimized images)
- **Content model:** all copy lives in `src/data/*.ts`; layout and styling in `src/components/*` and `src/app/globals.css`

---

## 1. Identity & metadata

| Field | Value |
| --- | --- |
| Name | John Benedict Salazar |
| Role | Developer |
| Location | Valenzuela City, Metro Manila, Philippines |
| Email | benedictsalazar64@gmail.com |
| Phone | 0963 652 7633 (`tel:+639636527633`) |
| Site URL | https://benedict-salazar-portfolio.vercel.app |
| Résumé download | none (`profile.resumeUrl` is `null`) |
| Portrait | `/images/benedict.webp` (grayscale via CSS) |

**Browser title:** `John Benedict Salazar — Developer`
**Title template:** `%s — John Benedict Salazar`
**Meta description:** “John Benedict Salazar is a web and mobile developer in Valenzuela City, Philippines. Explore selected web applications, experience, and tools.”
**Open Graph:** type `website`, locale `en_PH`, site name `John Benedict Salazar`, title `John Benedict Salazar — Developer`, tagline “Practical web experiences. Thoughtfully built.”, image `/images/og.png` (1200×630)
**Twitter card:** `summary_large_image`

### Bio copy

**Introduction (hero)**
> I’m a fourth-year IT student and web and mobile developer. I build practical web experiences and interactive applications, with foundational knowledge of networking and computer hardware.

**About**
> I'm interested in the space where thoughtful design meets useful technology. My work spans web development, interactive applications, UI/UX design, and system development. I'm comfortable working independently or collaborating with a team, and I've contributed to projects involving system design, documentation, and technical problem-solving.

**IT support**
> Beyond development, I have hands-on experience in computer assembly, basic hardware and software troubleshooting, printer setup, and Microsoft Office. My networking foundation includes subnetting, routing, and port forwarding, with Cisco Packet Tracer among the tools I use. I also hold a TESDA Computer Systems Servicing NC II certification.

**Education**
> I'm currently a fourth-year Bachelor of Science in Information Technology student at Our Lady of Lourdes College, continuously expanding my knowledge in web and mobile development, networking, and emerging technologies.

---

## 2. Pages & routes (15 content routes)

| Route | Page | Content |
| --- | --- | --- |
| `/` | Home | Hero, 3 highlights, 01 about, 02 selected projects, 03 journey, 04 stack, 05 contact |
| `/projects/` | All projects | Intro + 11 project cards numbered 01–11 |
| `/projects/hds-e/` | Detail | HDS-E |
| `/projects/in7sight/` | Detail | In7Sight: CBAS Learning Hub |
| `/projects/orbit/` | Detail | Orbit |
| `/projects/7ncloud/` | Detail | 7nCloud |
| `/projects/portfolio-v2/` | Detail | Portfolio V2 |
| `/projects/kislap/` | Detail | Kislap |
| `/projects/petcha/` | Detail | Petcha |
| `/projects/panitikan-quest/` | Detail | Panitikan Quest |
| `/projects/viral-frame/` | Detail | Viral Frame |
| `/projects/sample-auto/` | Detail | Sample Auto |
| `/projects/sample-coffeeshop/` | Detail | Sample Café |
| `/journey/` | Journey | Detailed timeline + certifications & awards |
| `/stack/` | Stack | 8 grouped tool categories |
| `/robots.txt`, `/sitemap.xml`, `/icon.svg`, `/404` | Generated | Sitemap lists every project slug |

Old route: `/projects/petsa-de-putcha/` → `/projects/petcha/` (Vercel redirect only).

**Navigation:** Home · Projects · Journey · Stack — each with a small `↗`, active item underlined.
**Header controls:** theme menu (light / dark / system) and mobile menu button.

---

## 3. Home page copy

**Eyebrow:** Developer
**Headline:** John Benedict Salazar. (two lines; the period is muted)
**Location line:** “↳ Based in Valenzuela City, Metro Manila, Philippines”
**Buttons:** “Explore my work ↗” → `/projects/` · “Get in touch ↓” → `#contact`
**Portrait caption:** JOHN BENEDICT SALAZAR (left) / PH ↗ (right)

**Highlights strip**
| Label | Text |
| --- | --- |
| Building experiences | Web & Mobile Development |
| Connecting systems | Networking |
| Solving problems | IT Support |

**01 About**
- Heading: “Good technology. / A clear purpose.”
- Body: about + IT support + education paragraphs
- Link: “A little more about me” → `/journey/`

**02 Selected projects** — shows featured projects only (HDS-E, In7Sight). Link: “All projects”.
**03 Journey** — timeline; link “The full journey”.
**04 Stack** — note: “Tools I work with across interfaces, systems, and the spaces in between.”; link “My toolkit”.
**05 Contact** — see below.

**Footer:** “© {year} John Benedict Salazar” · “Thoughtfully designed. Purposefully built.” · “Back to top ↑”

---

## 4. Contact section

**Eyebrow:** Have an idea in mind?
**Heading:** “Let’s build / something great.”
**Body:** “A useful website. An interactive experience. / Let’s talk about what you’re working on.”

**Links**
- Email — opens Gmail compose in a new tab, prefilled to `benedictsalazar64@gmail.com`
- Phone — `0963 652 7633`
- Location — Valenzuela City, Metro Manila, Philippines
- 5 social icons

---

## 5. Social profiles

| Platform | URL |
| --- | --- |
| Facebook | https://www.facebook.com/szzzz.beneddd/ |
| Instagram | https://www.instagram.com/benneverbeena.10/ |
| TikTok | https://www.tiktok.com/@notbnddd |
| GitHub | https://github.com/bensalazarrr |
| LinkedIn | https://www.linkedin.com/in/john-benedict-salazar-45379b444/ |

---

## 6. Projects — 11 total

★ = featured on the home page.

| # | Project | Subtitle | Category | Status | Live URL |
| --- | --- | --- | --- | --- | --- |
| 01 | **HDS-E** ★ | A Property Management Simulation | Web application · Simulation | — | https://hdse.lol |
| 02 | **In7Sight: CBAS Learning Hub** ★ | A research-based cloud accounting learning hub | Commissioned website · Education | — | https://learn-cbas.vercel.app/ |
| 03 | **Orbit** | One profile. A connected personal workspace. | Personal workspace · In development | In development | https://orbit.benworks.workers.dev |
| 04 | **7nCloud** | Cloud accounting companion to In7Sight | Commissioned application · Accounting | — | https://in7sight-cbass.vercel.app/ |
| 05 | **Portfolio V2** | A bolder take on this portfolio | Personal website · Design | — | https://portfoliov2.benbuilds.workers.dev |
| 06 | **Kislap** | One QR code, one shared event album | Web application · Events | — | https://kislap.benbuilds.workers.dev |
| 07 | **Petcha** | Personal Deadline & Life Admin App | Mobile application · Testing | Testing | — |
| 08 | **Panitikan Quest** | Baybayin mo, Baybayin ko! | Web application · Education | — | https://panitikanquest.netlify.app/ |
| 09 | **Viral Frame** | A local timestamp clipper | Local tool · Video | Completed | — |
| 10 | **Sample Auto** | Automotive business website concept | Sample website · Automotive | Portfolio demonstration | https://sample-auto.vercel.app/ |
| 11 | **Sample Café** | Local coffee shop website concept | Sample website · Coffee shop | Portfolio demonstration | https://sample-coffeeshop.vercel.app/ |

Each project page renders: category, name, subtitle, summary, “Visit live project” button (when a URL exists), preview image + caption, facts (My role / Format / Status), then *The purpose*, *The approach*, *What it brings together*, and *Technologies* (hidden when empty).

### 6.1 HDS-E ★
- **Slug:** `hds-e` · **Format:** Interactive web application
- **Role:** Project Leader / Full Stack Developer
- **Summary:** An interactive web application that brings hotel front-desk operations and property-management workflows into a learning environment.
- **Purpose:** Give students a way to become familiar with hotel front-desk operations through a property management simulation.
- **Approach:** Built the frontend and backend, including database integration. Brings hotel workflows into an interactive web application for the OLLC Hospitality Management Program, with separate student, instructor, and administrator roles.
- **Features:** Reservations and guest management · Check-in and check-out workflows · Housekeeping and billing · Role-based access for students and instructors
- **Preview:** `/images/hdse.webp` — “HDS-E public sign-in screen with role selection for its property management simulation”
- **Image note:** Public welcome screen. Authenticated workflows were not accessed.

### 6.2 In7Sight: CBAS Learning Hub ★
- **Slug:** `in7sight` · **Format:** Research-based educational website
- **Summary:** A research-based digital showcase of how Cloud-Based Accounting Systems support organized records, reliable financial reporting, and regulatory compliance.
- **Purpose:** Explain how cloud-based accounting supports organized records, reliable financial reporting, and regulatory compliance, while emphasizing accurate data and responsible human verification.
- **Approach:** Created as part of the first professional client commission; presents cloud accounting research through an educational website and connects visitors to 7nCloud, its companion accounting system.
- **Features:** Cloud-based accounting overview · Financial reporting quality and regulatory compliance topics · Emphasis on accurate data and human verification · Connection to the companion 7nCloud accounting system
- **Preview:** `/images/in7sight.webp` — “In7Sight CBAS Learning Hub homepage introducing cloud-based accounting”

### 6.3 Orbit
- **Slug:** `orbit` · **Status:** In development · **Format:** Personal workspace application
- **Summary:** A personal workspace bringing projects, learning, career, and freelance work together around one profile, with a résumé generator and AI assistant.
- **Purpose:** Bring personal projects, learning, career planning, and freelance work into one connected workspace.
- **Approach:** Developing Orbit around a shared profile, with spaces for projects, tasks, goals, learning, career history, and freelance work. Includes a résumé generator and AI assistant, and it is online while development continues.
- **Features:** Projects, tasks, goals, and learning · Career history and job applications · Freelance clients, proposals, and invoices · Résumé generator and AI assistant
- **Preview:** `/images/orbit.webp` — “Orbit workspace overview with projects, learning, career, freelance, and AI assistant navigation”

### 6.4 7nCloud
- **Slug:** `7ncloud` · **Format:** Cloud-based accounting system
- **Summary:** A cloud-based accounting system linked to In7Sight: CBAS Learning Hub, connecting its educational content with an interactive accounting experience.
- **Purpose:** Provide a companion cloud-based accounting experience for the In7Sight learning hub.
- **Approach:** 7nCloud and In7Sight were developed as part of the first professional client commission. The accounting system is linked to the learning hub to support its introduction to cloud-based accounting.
- **Features:** Companion system linked to In7Sight · Cloud accounting experience · Public sign-in and sample-company entry points
- **Preview:** `/images/7ncloud.webp` — “7nCloud public sign-in screen introducing its cloud accounting experience”
- **Image note:** Public welcome screen. Authenticated account workflows were not accessed.

### 6.5 Portfolio V2
- **Slug:** `portfolio-v2` · **Format:** Personal portfolio website
- **Summary:** A second take on this portfolio, built around bold color, heavy type, and card-based sections that place work, capability, and contact next to each other.
- **Purpose:** Present the same body of work in a more expressive visual direction than the minimal edition.
- **Approach:** Reorganizes the site into a bold, card-led layout: an introduction, a profile card, current work, specialty, and project count, with clear paths to work, capability, journey, and contact.
- **Features:** Bold, card-based layout · Work, capability, journey, and contact sections · Profile, specialty, and current-work highlights · Responsive web experience
- **Preview:** `/images/Portfoliov2.JPG` — “Portfolio V2 homepage with bold, colorful cards introducing Benedict, his specialty, and current work”

### 6.6 Kislap
- **Slug:** `kislap` · **Format:** Event photo-sharing web application
- **Summary:** A web app where event guests scan one QR code and drop their photos into one shared album, with no sign-up.
- **Purpose:** Keep the photos from an event in one place. Guests scan a QR code at the event and add their pictures to a shared album, instead of photos being scattered across group chats and phones while the host chases everyone for copies.
- **Approach:** Built around a single QR code: guests scan it at the event, add their photos to one shared album, and each guest gets a folder for their own shots. Made for weddings, birthdays, graduations, org events, and casual celebrations, and contributing needs no sign-up.
- **Features:** One QR code guests scan at the event · A single shared album for the whole event · A folder for each guest · No sign-up to contribute · Made for weddings, birthdays, graduations, org events, and casual celebrations
- **Preview:** `/images/kislap.JPG` — “Kislap landing page with the headline Scan. Share. Kislap. and an event album preview”

### 6.7 Petcha
- **Slug:** `petcha` · **Status:** Testing · **Format:** Personal deadline & life-admin application
- **Summary:** A personal deadline and life-admin app for organizing responsibilities, tracking important dates, and managing reminders. Currently in testing.
- **Purpose:** Keep everyday responsibilities, important dates, and reminders organized in one place.
- **Approach:** Brings upcoming deadlines, recurring reminders, and personal tasks into a mobile interface. Previously called Petsa de Putcha; now in its testing phase.
- **Features:** Upcoming deadlines and completion overview · Recurring reminders with categories · Timeline and calendar views · Personal task organization
- **Previews (2 mobile screens):** `/images/petcha.webp` (1032×2048) · `/images/petcha-reminders.webp` (1032×2049)

### 6.8 Panitikan Quest
- **Slug:** `panitikan-quest` · **Role:** Lead Developer
- **Summary:** An interactive educational experience that helps students explore and understand Baybayin.
- **Purpose:** Make learning about Baybayin an interactive experience for students.
- **Approach:** An educational web application centered on learning Baybayin, pairing the subject with an interactive format.
- **Features:** A focus on Baybayin learning · An interactive, browser-based educational experience
- **Preview:** `/images/panitikan.webp` — “Panitikan Quest homepage with the introduction Our stories. Our script. Your next quest. and illustrated Baybayin cards”

### 6.9 Viral Frame
- **Slug:** `viral-frame` · **Status:** Completed · **Format:** Local video clipping tool
- **Summary:** A completed local video tool for turning selected timestamps from longer recordings into clips.
- **Purpose:** Make it easier to select a useful segment from a longer recording and export it as a clip.
- **Approach:** Users choose the start and end of a recording and export the selection as a vertical video. The local workspace brings source input, processing, results, and saved clips together.
- **Features:** Video URL or MP4 upload input · Start and end timestamp selection · Vertical video export · Local processing and clip management
- **Preview:** `/images/viral-frame.webp`

### 6.10 Sample Auto
- **Slug:** `sample-auto` · **Status:** Portfolio demonstration · **Format:** Sample business website
- **Summary:** A sample website for a local automotive business, presenting workshop services, an auto-parts catalog, and contact information.
- **Purpose:** Explore how a local automotive business can introduce its services and parts online.
- **Approach:** Service information, a demonstration parts catalog, and pathways to booking and contact information. A portfolio concept for a fictional business.
- **Features:** Workshop service information · Demonstration auto-parts catalog · About and contact pages
- **Preview:** `/images/sample-auto.webp`

### 6.11 Sample Café
- **Slug:** `sample-coffeeshop` · **Status:** Portfolio demonstration · **Format:** Sample business website
- **Summary:** A sample website for a neighborhood café, with a drinks menu, café story, and visit information.
- **Purpose:** Explore how a local coffee shop can introduce its identity and offerings online.
- **Approach:** A fictional neighborhood coffee shop concept, bringing its menu, story, and sample visit details into a business website.
- **Features:** Food and drinks menu presentation · Café story and imagery · Sample location and opening hours
- **Preview:** `/images/sample-coffeeshop.webp`

---

## 7. Journey

### Education
| Period | Program | School |
| --- | --- | --- |
| 2024 — Present | BS Information Technology | Our Lady of Lourdes College |
| 2023 — 2024 | BS Electrical Engineering | Pamantasan ng Lungsod ng Valenzuela |
| 2021 — 2023 | Information and Communication Technology (TVL-ICT) | Sitero Francisco Memorial National High School |

### Certifications & awards
| Year | Item | Issuer | Kind |
| --- | --- | --- | --- |
| 2026 | Introduction to Software Testing | Simplilearn SkillUp | Training |
| 2025 | Getting Started with Cisco Packet Tracer | Cisco Networking Academy | Training |
| 2025 | Introduction to Packet Tracer Exam | Cisco Networking Academy | Training |
| 2024 | Dr. Pio Valenzuela Scholarship Program | Scholarship recipient | Award |
| 2023 | Computer Systems Servicing NC II | TESDA | Certification |
| 2023 | Best in ICT | TVL-ICT | Award |

---

## 8. Stack — 8 groups

| Group | Description | Tools |
| --- | --- | --- |
| Web & mobile | Building interfaces for the web and mobile. Expo is a tool currently being learned and developed with. | HTML, CSS, JavaScript, TypeScript, React, Tailwind CSS, React Native, Expo · Learning |
| Programming | Languages for working through problems and data. | Java, C, SQL |
| Database & backend | Connecting applications, services, and data. | PostgreSQL, Supabase, Firebase, MariaDB, Node.js, Prisma, GraphQL |
| Development tools | Version control, local development, and deployment. | Git, GitHub, Docker, XAMPP, Vercel, Netlify |
| Web platforms | Creating and maintaining business websites. | WordPress, Wix |
| Networking | A foundation in subnetting, routing, and port forwarding. | Cisco Packet Tracer |
| AI-assisted development | Tools that support the development and problem-solving workflow. | ChatGPT, Codex, Claude, Claude Code, Gemini, DeepSeek |
| Other tools | Organizing knowledge, understanding projects, and everyday productivity. | Obsidian, Graphify, Microsoft Office |

---

## 9. Design system

### Colors
| Token | Light | Dark (default) |
| --- | --- | --- |
| `--background` | `#fff` | `#0c0c0f` |
| `--foreground` | `#0a0a0a` | `#f4f4f5` |
| `--muted` | `#575757` | `#a0a0a8` |
| `--border` | `#e9e9e9` | `#2a2a30` |
| `--surface` | `#f7f7f7` | `#17171b` |
| `--strong-border` | `#d4d4d4` | `#3a3a42` |

### Type
- Geist (sans) + Geist Mono, loaded with `next/font`
- Base 15px / line-height 1.75, headings weight 500
- Mono used for eyebrows, nav, wordmark, timeline periods, chips, project index, footer
- Hero headline: `clamp(30px, 12cqi, 70px)` with tight letter-spacing

### Layout
- Container 1060px (1120px at ≥1500px), padding 32px → 22px (≤640) → 18px (≤360)
- Sticky header 78px (66px ≤640); scroll padding 105px
- Hero grid `310px 1fr` → single column ≤640 (portrait hidden)
- Project grid 2 columns → 1 column ≤640
- Breakpoints: 1500, 850, 640, 360

### Behavior
- Theme key `portfolio-theme` in localStorage; **dark is the default** on first visit; light and system remain selectable; stored choice wins
- Entrance animation `rise` (translate + fade) with staggered delays; hover transforms on cards and links
- `prefers-reduced-motion: reduce` disables all animation and transitions
- Project previews are grayscale and colorize on hover; portrait always grayscale
- Accordion-free, no client-side data fetching, no database, no secrets

---

## 10. Assets — `public/images/`

| File | Used by |
| --- | --- |
| `hdse.webp` | HDS-E |
| `in7sight.webp` | In7Sight |
| `orbit.webp` | Orbit |
| `7ncloud.webp` | 7nCloud |
| `Portfoliov2.JPG` | Portfolio V2 |
| `kislap.JPG` | Kislap |
| `petcha.webp` | Petcha (home screen) |
| `petcha-reminders.webp` | Petcha (reminders screen) |
| `panitikan.webp` | Panitikan Quest |
| `viral-frame.webp` | Viral Frame |
| `sample-auto.webp` | Sample Auto |
| `sample-coffeeshop.webp` | Sample Café |
| `benedict.webp` | Portrait |
| `og.png` | Social share image |

---

## 11. Tooling, scripts & deploy

**Scripts**
| Command | Action |
| --- | --- |
| `npm run dev` | Next dev server |
| `npm run build` | Production static export to `out/` |
| `npm start` / `npm run preview` | Serve `out/` at http://127.0.0.1:3000 via `scripts/serve.mjs` |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run test:browser` | Playwright + installed Chrome across all routes at 320 / 390 / 768 / 1440 px |

**Deploy**
- Vercel: repo `bensalazarrr/Portfolio` → project `benedict-salazar-portfolio`, branch `main`, framework preset Next.js, config in `vercel.json`
- Static hosting: publish `out/`, enable directory indexes, use `404.html` for missing pages
- `.openai/hosting.json` identifies the private Sites project and also uses `out/`
- No environment variables required

**Verification status:** build, typecheck, lint and the full browser suite pass (all routes, all four widths, no page errors, no horizontal overflow, images load, theme default/persistence, keyboard menu, skip link, Gmail compose target, sitemap, robots, og image, 404).

---

## 12. Known gaps & stale content

1. `README.md` still states “thirteen content routes” and a “nine-project collection”; the site now has 15 routes and 11 projects. It also says Orbit has no public live link.
2. `technologies[]` is empty for every project, so no per-project tech list renders.
3. `profile.resumeUrl` is `null` — no résumé download.
4. `profile.siteUrl` still points at the Vercel domain, not a custom domain (drives sitemap and absolute metadata).
5. `Portfoliov2.JPG` and `kislap.JPG` keep source filename casing; fine on Windows, case-sensitive on Cloudflare. Every other preview is lowercase `.webp`.
6. `README` notes Petcha's old `/projects/petsa-de-putcha/` redirect exists only on Vercel; other static hosts need an equivalent.
