# orage.agency — marketing website

Next.js + shadcn/ui marketing site for [Orage AI Agency](https://www.orage.agency). Includes the **Stacy** chat widget that talks to our n8n workflow at `orageaiagency.app.n8n.cloud`.

## Stack

- **Next.js 15** (App Router) + **React 19**
- **Tailwind CSS v4** + **shadcn/ui** (Radix primitives)
- **TypeScript**
- Deployed on **Vercel** (project: `v0-avant-garde-designer-portfolio`, team: `orageagency`)

## Local development

```bash
pnpm install
pnpm dev
# → http://localhost:3000
```

## What's where

| File | Purpose |
| --- | --- |
| `app/page.tsx` | Home page — hero, FAQ, footer (privacy/terms links) |
| `app/aboutus/page.tsx` | About page |
| `app/privacy/page.tsx` | Privacy policy (linked from footer + chat widget) |
| `app/terms/page.tsx` | Terms of service (linked from footer) |
| `app/layout.tsx` | Root layout, fonts, global meta |
| `app/globals.css` | Global styles |
| `components/liquid-glass-chat-widget.tsx` | The Stacy chat widget — POSTs to the n8n webhook |
| `components/floating-stacy-button.tsx` | Bottom-right "Talk with Stacy" trigger |
| `components/ai-hero-section.tsx` | Top hero |
| `components/faq-section.tsx` | FAQ accordion |
| `components/trusted-by.tsx` | Logo bar |
| `components/ui/*` | shadcn/ui primitives |

## Stacy chat widget

The widget POSTs `{ message, sessionId }` to:

```
https://orageaiagency.app.n8n.cloud/webhook/e9b95343-00f9-4772-9e76-d60aa255271e
```

The webhook returns JSON with one of `reply | output | response | text | message` — we render that as Stacy's response. The full conversational logic (memory, tools, GHL sync, calendar booking) lives in the n8n workflow, not here.

The widget persists `sessionId` and conversation history in `localStorage` (24h TTL) so a returning visitor on the same browser stays in the same conversation.

### Editing the welcome message

`components/liquid-glass-chat-widget.tsx` → `WELCOME` constant.

### Editing the fallback / human-handoff target email

Same file:
- `FALLBACK_REPLY` for what Stacy says on a network error
- `handoffToHuman()` for the "Talk to a human" mailto target (currently `team@orage.agency`)

## Deploy

Pushes to `main` auto-deploy on Vercel.
