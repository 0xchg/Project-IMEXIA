# Project-IMEXIA

Learning React while building the institutional website for IMEXIA.

## Description

IMEXIA is a multi-sector business group based in Luanda, Angola, working in travel agency services, transport and logistics, and software and systems development. This project is the company's institutional website. It presents who the company is, what it does and how to reach it.

The project has two goals:

- **For the company:** a modern, fast and animated website in Portuguese and English that works the same on phones, tablets and desktops.
- **For the author:** learning React by building a real product step by step, from the project setup to the last page.

### Overview

The site has four pages:

| Page | Path | Content |
|---|---|---|
| Home | `/` | Hero with an animated network of connected points, company introduction, scroll-driven services showcase, pillars, clients and a closing call to action |
| Services | `/services` | One section per service with its features, reachable from shortcuts in the page header or from links such as `/services#logistica` |
| About | `/about` | Who we are, mission, values and pillars |
| Contact | `/contact-us` | Every contact channel, a contact form that sends the message through WhatsApp, and a map of the office |

Every page also exists in English under `/en` (for example `/en/services`). A PT / EN switch in the navbar keeps the visitor on the same page.

Main features:

- **Two languages, one structure:** all text lives in `src/data/pt.ts` and `src/data/en.ts`, typed by the same interface, so the build fails if a translation is missing.
- **Motion:** sections reveal on scroll, headings slide up from behind a mask, and the services showcase changes one service per scroll gesture. All motion respects the "reduce motion" system setting.
- **Accessibility:** keyboard navigation, visible focus, 44 px touch targets, labelled form fields with inline errors, and text contrast of at least 4.5:1.
- **No backend:** the site is fully static. The contact form composes the message and opens WhatsApp with it, ready to send.

### Tech stack

- [React 19](https://react.dev) with [TypeScript](https://www.typescriptlang.org), built with [Vite](https://vite.dev)
- [Tailwind CSS 4](https://tailwindcss.com) for styling, with the colour palette defined as theme tokens in `src/index.css`
- [React Router 7](https://reactrouter.com) for the pages and the `/en` prefix
- [Motion](https://motion.dev) for animations
- [Lucide](https://lucide.dev) for interface icons and [Simple Icons](https://simpleicons.org) for brand icons
- [Oxlint](https://oxc.rs/docs/guide/usage/linter) for linting

### Project structure

```
website-institucional/
├── index.html
├── src/
│   ├── main.tsx, App.tsx   # entry point and routes (Portuguese at the root, English under /en)
│   ├── index.css           # Tailwind import, theme tokens (colours, fonts, sizes), keyframes
│   ├── pages/              # Home, Services, About, Contact
│   ├── components/         # reusable pieces: Navbar, Footer, Section, PageHeader, ContactForm…
│   ├── hooks/              # useContent (language from the URL), useDocumentTitle
│   ├── data/               # shared.ts (contacts, images), pt.ts and en.ts (text), types.ts
│   └── assets/             # logo, client logos, service illustrations
└── package.json
```

`src/data/imexia.md` is the original content provided by the company, which the texts in `pt.ts` are based on.

## Instructions

### Requirements

- [Node.js](https://nodejs.org) 20.19 or later, or 22.12 or later (required by Vite 8)
- npm, which comes with Node.js

### Installation

```bash
git clone git@github.com:0xchg/Project-IMEXIA.git
cd Project-IMEXIA/website-institucional
npm install
```

### Running in development

```bash
npm run dev
```

Then open the address Vite prints, usually <http://localhost:5173>. Changes to the code reload the page automatically.

### Building for production

```bash
npm run build     # type-checks with tsc, then builds into dist/
npm run preview   # serves dist/ locally to check the production build
```

The `dist/` folder contains plain static files and can be hosted on any static host. Because the site is a single-page application, the host must answer every path (such as `/services` or `/en/about`) with `index.html`. Otherwise, reloading a page other than the home page returns a 404 error.

### Linting

```bash
npm run lint
```

## Resources

### Documentation

- [React documentation](https://react.dev/learn): components, state, effects, context and hooks
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Vite guide](https://vite.dev/guide/), including [deploying a static site](https://vite.dev/guide/static-deploy)
- [Tailwind CSS documentation](https://tailwindcss.com/docs), especially [theme variables](https://tailwindcss.com/docs/theme) in v4
- [React Router documentation](https://reactrouter.com/home): routing, nested routes and `ScrollRestoration`
- [Motion for React](https://motion.dev/docs/react): `useScroll`, `useTransform`, `whileInView` and `AnimatePresence`

### Web platform (MDN)

- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API), used for the hero network animation
- [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API), used to pause animations off screen
- [`prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
- [`scroll-margin-top`](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-margin-top), which keeps anchored sections clear of the sticky navbar
- [`mix-blend-mode`](https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode) and [`mask-image`](https://developer.mozilla.org/en-US/docs/Web/CSS/mask-image), used to blend the service illustrations into the page

### Accessibility

- [Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/WCAG22/)
- [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [WAI forms tutorial](https://www.w3.org/WAI/tutorials/forms/): labels, validation and error messages

### Integrations

- [WhatsApp click to chat](https://faq.whatsapp.com/5913398998672934): the `wa.me` links used by the contact form
- [Google Maps URLs](https://developers.google.com/maps/documentation/urls/get-started): the links that open the office's location

### Use of AI

This project was built with [Claude Code](https://claude.com/claude-code), Anthropic's AI coding assistant, used as a pair programmer throughout. Because the project is also a way to learn React, the work was split into phases. Before each phase, the AI explained the plan and the reasoning behind it. After each phase, the author reviewed the result in the browser, asked for changes and validated it before moving on.

**What the AI did:**

- **Code:** wrote most of the code in every phase, from the setup (Vite, TypeScript, Tailwind, React Router) to the routes and layout, the data files, the four pages and their components.
- **Content:** rewrote the company's original notes in `src/data/imexia.md` into polished Portuguese texts in `pt.ts`, without adding services, figures or claims that were not in the source. It also translated all the texts into English in `en.ts`.
- **Animations:** wrote the scroll and motion effects, including the services showcase, the hero network, the masked headings, the scroll-lit paragraphs and the parallax illustrations.
- **Images:** removed the backgrounds from the client logos, cropped the IMEXIA logo, and converted the client logos and service illustrations to WebP.
- **Testing:** checked every change in a headless browser (Playwright) at several screen sizes. The checks covered layout, horizontal scrolling, keyboard focus, form validation, both languages and reduced motion. These test scripts were run locally and are not part of the repository.
- **Commits:** proposed commit messages, which the author approved before each commit.

**What the author did:**

- **Brief:** defined the goal, the pages, the stack and the step-by-step way of working.
- **Material:** provided the company content, the logo, the client logos and the service illustrations.
- **Decisions:** made every design decision, including the colour palette, the amount of motion, which services to show and the WhatsApp contact form. Some ideas were tried and rejected, such as a dark palette and a scroll-reactive marquee.
- **Review:** reviewed and tested each phase, edited parts of the code directly, and made or approved every commit.
