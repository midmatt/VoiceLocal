# Cursor Build Prompt — VoiceLocal Marketing Site
## voicelocalapp.com — Next.js 14 + Stripe + Resend + Vercel

Paste this whole thing into Cursor as a new project.

---

## PROJECT CONTEXT

VoiceLocal is a local-first voice dictation app for macOS. It transcribes speech entirely on-device using Whisper, injects text into any app (native macOS, Chrome, Electron apps like Cursor/Discord/Slack), and optionally formats output via local Ollama or cloud AI. The core differentiator: nothing ever leaves your machine. No cloud STT, no account required, no subscription.

**Price:** $25 one-time, 7-day free trial included with every download.
**Distribution:** Direct download (not Mac App Store).
**Domain:** voicelocalapp.com
**Stack:** Next.js 14 (App Router), Tailwind CSS, Stripe Checkout, Resend for license key email delivery, Vercel deployment.

---

## TECH STACK

```
voicelocal-site/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── layout.tsx                  # Root layout + fonts + metadata
│   ├── globals.css                 # Global styles
│   ├── api/
│   │   ├── checkout/route.ts       # POST → create Stripe Checkout session
│   │   ├── webhook/route.ts        # POST → Stripe webhook → send license key via Resend
│   │   └── verify-license/route.ts # POST → verify license key validity
│   ├── success/page.tsx            # Post-purchase success page
│   └── download/page.tsx          # Download page (gated, shown after trial starts)
├── components/
│   ├── Hero.tsx
│   ├── HowItWorks.tsx
│   ├── Features.tsx
│   ├── Pricing.tsx
│   ├── FAQ.tsx
│   ├── Footer.tsx
│   └── WaveformAnimation.tsx       # Animated bars matching the app's visualizer
├── lib/
│   ├── stripe.ts                   # Stripe client
│   ├── resend.ts                   # Resend client
│   └── license.ts                  # License key generation + validation
└── .env.local
```

---

## ENVIRONMENT VARIABLES

```env
# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID=price_...          # The $25 one-time price ID from Stripe dashboard

# Resend
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=hello@voicelocalapp.com

# License
LICENSE_SECRET=generate_a_random_32_char_string_here

# App
NEXT_PUBLIC_SITE_URL=https://voicelocalapp.com
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

---

## DESIGN SYSTEM

**Colors:**
- Background: `#080810` (near black, matches app)
- Surface: `#0f0f1a`
- Card: `#13131f`
- Border: `rgba(91, 110, 245, 0.2)`
- Primary: `#5B6EF5`
- Primary hover: `#4a5ce0`
- Accent: `#A78BFA`
- Text primary: `#e8e8f4`
- Text secondary: `#8b8fb8`
- Text muted: `#4a4a6a`
- Success: `#4ade80`

**Typography:**
- Font: Inter (Google Fonts)
- Hero headline: 72px desktop / 42px mobile, weight 700, tight letter-spacing
- Section headline: 48px / 32px, weight 600
- Body: 18px / 16px, weight 400, line-height 1.7
- Caption: 13px, weight 500, letter-spacing 1.5px, uppercase

**Components:**
- Buttons: border-radius 12px, height 52px, font-size 16px weight 600
- Cards: border-radius 16px, border `1px solid rgba(91, 110, 245, 0.15)`
- Section padding: 120px vertical desktop / 80px mobile
- Max content width: 1100px, centered

---

## PAGE SECTIONS — BUILD IN THIS ORDER

### 1. Layout + Metadata (`app/layout.tsx`)

```tsx
export const metadata = {
  title: 'VoiceLocal — Private Voice Dictation for Mac',
  description: 'Dictate anywhere on your Mac. Speech-to-text that never leaves your device — no cloud, no subscription, no account. Works in every app.',
  openGraph: {
    title: 'VoiceLocal — Private Voice Dictation for Mac',
    description: 'Dictate anywhere on your Mac. 100% private, 100% offline.',
    url: 'https://voicelocalapp.com',
    siteName: 'VoiceLocal',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VoiceLocal — Private Voice Dictation for Mac',
    description: 'Dictate anywhere on your Mac. 100% private, 100% offline.',
  }
}
```

Include Inter font from Google Fonts. Dark background on `<html>` so no flash of white on load.

---

### 2. Hero Section (`components/Hero.tsx`)

**Layout:** Full viewport height, centered content, subtle animated background.

**Background:** Very subtle radial gradient from `rgba(91, 110, 245, 0.08)` at center to transparent, so the page doesn't look flat. No heavy gradients.

**Content (centered, max-width 800px):**

Top pill badge:
```
🔒  100% Private · Never leaves your Mac
```
Style: `background: rgba(91, 110, 245, 0.12)`, border `1px solid rgba(91, 110, 245, 0.3)`, border-radius 999px, padding `6px 16px`, font-size 13px, color `#8b8fdb`.

Headline:
```
Dictate anywhere.
Privately.
```
The word "Privately." should be in `#5B6EF5` color. 72px, weight 700, line-height 1.1.

Subheadline:
```
VoiceLocal transcribes your voice locally on your Mac — no cloud, no subscription, no account. Press a hotkey, speak, and your words appear in any app instantly.
```
18px, color text-secondary, max-width 560px, centered.

**WaveformAnimation component** — centered below the subheadline:
- 9 animated vertical bars, same design as the app's floating visualizer widget.
- Bars animate in a looping breathing pattern — heights pulse gently as if listening.
- Bar colors: `#5B6EF5` outer bars, `#A78BFA` center bar.
- Container: `background: rgba(15, 15, 26, 0.8)`, border `1px solid rgba(91, 110, 245, 0.2)`, border-radius 20px, padding `20px 32px`.
- Use CSS keyframe animation — no JS needed.
- Size: roughly 240px wide × 80px tall.

CTA buttons (side by side, centered):
- Primary: "Download Free Trial" → links to `/download` — background `#5B6EF5`, white text.
- Secondary: "Buy Now — $25" → triggers Stripe Checkout — border `1px solid rgba(91, 110, 245, 0.4)`, text `#e8e8f4`, transparent background.

Small text below buttons:
```
7-day free trial · $25 one-time after · No subscription ever
```
13px, color text-muted.

**App compatibility row** — below CTAs:
Small logos/icons in a horizontal row showing "Works in:" followed by icons for: Safari, Chrome, Cursor, VS Code, Slack, Discord, Notes, Mail.
Use simple SVG icons or text labels if SVGs aren't available. Muted styling — this shouldn't dominate.

---

### 3. How It Works (`components/HowItWorks.tsx`)

Section headline: "Three keystrokes. Done."

Three steps in a horizontal row (stack on mobile):

**Step 1 — Press**
Icon: keyboard/hotkey icon in `#5B6EF5`
Title: "Press your hotkey"
Body: "Hit Cmd+Shift+Space from anywhere on your Mac. VoiceLocal activates instantly — no app switching, no clicking."

**Step 2 — Speak**
Icon: waveform/mic icon in `#5B6EF5`
Title: "Say what you mean"
Body: "Speak naturally. VoiceLocal transcribes in real time using Whisper AI, running entirely on your device."

**Step 3 — Done**
Icon: checkmark/inject icon in `#5B6EF5`
Title: "Text appears instantly"
Body: "Press again. Your words are injected directly into whatever field you were in — no copy-paste needed."

Each step: card with dark background, top-left step number in `rgba(91, 110, 245, 0.2)` large text (like a watermark behind the content), icon + title + body.

---

### 4. Features (`components/Features.tsx`)

Section headline: "Built for people who can't afford leaks."

Six feature cards in a 3×2 grid (2×3 on mobile):

**🔒 Completely private**
"Your audio never touches a server. Transcription runs on your Mac using Whisper — the same model used by OpenAI, running locally."

**⚡ Works everywhere**
"Native Mac apps, Chrome tabs, Cursor, VS Code, Slack, Discord — VoiceLocal injects text at the cursor position in any app."

**🧠 AI formatting**
"Removes filler words, fixes punctuation, and structures long dictations into paragraphs or bullet points — locally via Ollama, or with your own API key."

**⌨️ Any hotkey**
"Set any key combination you want. Press to start, press to stop. That's the whole workflow."

**🎙️ Multiple models**
"Choose your accuracy vs speed tradeoff — tiny (fastest), base, small, or large-v3-turbo (best accuracy for names and technical terms)."

**💰 Pay once**
"$25. No monthly fees, no account, no usage limits. One payment, yours forever. Future updates included."

Card style: `background: #13131f`, border `1px solid rgba(91, 110, 245, 0.12)`, border-radius 16px, padding 28px. Icon in `#5B6EF5` at top, title 18px weight 600, body 15px text-secondary.

---

### 5. Privacy Section

Full-width dark section with a centered statement. Background slightly different from page (`#0d0d1a`).

Large centered text:
```
"Your voice is yours."
```
72px, weight 700, `#5B6EF5`.

Below it:
```
VoiceLocal was built by a cybersecurity student who knows what happens 
when your data goes to someone else's server. So it doesn't.
Not your audio. Not your text. Not your usage patterns. Nothing.
```
18px, text-secondary, max-width 600px, centered.

Two stat pills below:
- "0 bytes sent to any server"
- "100% on-device processing"

Style: same pill badge as hero.

---

### 6. Pricing (`components/Pricing.tsx`)

Section headline: "Simple pricing."

Single centered pricing card, max-width 480px:

```
Free Trial
↓
VoiceLocal
$25
one-time
```

Feature list (checkmarks in `#4ade80`):
- ✓ 7-day free trial, no card required
- ✓ Full access to all features during trial
- ✓ $25 one-time after trial ends
- ✓ No subscription, ever
- ✓ All future updates included
- ✓ Works on up to 2 Macs

Two buttons:
- "Start Free Trial" → `/download` (primary, full width)
- "Buy Now — $25" → Stripe Checkout (secondary, full width, below)

Small text: "License delivered by email. Instant activation."

Compare to competitors note below the card:
```
VoiceType charges $8-12/month ($96-144/year).
VoiceLocal is $25. Once.
```
13px, text-muted, centered.

---

### 7. FAQ (`components/FAQ.tsx`)

Accordion-style, 8 questions:

**Does my audio ever leave my Mac?**
Never. Transcription runs locally using Whisper. VoiceLocal has no servers and makes no network requests during dictation.

**Which Mac models are supported?**
Any Mac running macOS 13 (Ventura) or later. Apple Silicon (M1/M2/M3/M4) recommended for best performance. Intel Macs are supported but larger models will be slower.

**Does it work in Chrome and Electron apps?**
Yes — VoiceLocal includes a companion Chrome extension (free) that enables injection into Chrome tabs, Cursor, VS Code, Slack, Discord, and other Electron-based apps.

**What's the Chrome extension?**
A lightweight extension that connects to VoiceLocal over a local WebSocket. It receives transcribed text and injects it at your cursor position. It never communicates with any external server.

**What is AI formatting?**
An optional post-processing step that removes filler words ("um", "uh", "like") and structures longer dictations. Runs locally via Ollama (free, private) or with your own Anthropic API key.

**How does the license work?**
After purchase, you receive a license key by email. Enter it in VoiceLocal's settings to activate. Works on up to 2 Macs simultaneously.

**What happens after the 7-day trial?**
The app continues to work but shows a prompt to purchase. Your dictation history and settings are preserved.

**Do you offer refunds?**
Yes — 30-day no-questions-asked refund. Email hello@voicelocalapp.com.

---

### 8. Footer (`components/Footer.tsx`)

Left: VoiceLocal wordmark + waveform icon (small) + "© 2025 VoiceLocal"
Right: Links — Privacy Policy, Terms, hello@voicelocalapp.com

Simple, minimal. Same dark background as page.

---

## API ROUTES

### `POST /api/checkout` (`app/api/checkout/route.ts`)

Creates a Stripe Checkout session for the $25 one-time purchase.

```typescript
import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price: process.env.STRIPE_PRICE_ID,
      quantity: 1,
    }],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/#pricing`,
    metadata: {
      product: 'voicelocal_lifetime',
    },
    custom_fields: [],
  })
  return Response.json({ url: session.url })
}
```

### `POST /api/webhook` (`app/api/webhook/route.ts`)

Handles `checkout.session.completed` Stripe webhook event:
1. Verify webhook signature using `STRIPE_WEBHOOK_SECRET`.
2. Extract customer email from `session.customer_details.email`.
3. Generate a license key using `lib/license.ts`.
4. Send license key email via Resend.
5. Store license key in a simple JSON file or Vercel KV (use Vercel KV if available, flat file as fallback — don't set up a full database for this).

**IMPORTANT:** Export the route config to disable body parsing (required for Stripe webhook signature verification):
```typescript
export const config = { api: { bodyParser: false } }
// In App Router use: export const runtime = 'nodejs'
```

### `lib/license.ts`

```typescript
import crypto from 'crypto'

export function generateLicenseKey(email: string): string {
  const timestamp = Date.now().toString()
  const hash = crypto
    .createHmac('sha256', process.env.LICENSE_SECRET!)
    .update(`${email}:${timestamp}`)
    .digest('hex')
    .toUpperCase()
  // Format: VLTL-XXXX-XXXX-XXXX-XXXX
  return `VLTL-${hash.slice(0,4)}-${hash.slice(4,8)}-${hash.slice(8,12)}-${hash.slice(12,16)}`
}

export function verifyLicenseKey(key: string, email: string): boolean {
  // For simple verification — in production, check against stored keys
  return key.startsWith('VLTL-') && key.length === 24
}
```

### Resend email template

```typescript
// lib/resend.ts
import { Resend } from 'resend'
const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendLicenseEmail(email: string, licenseKey: string) {
  await resend.emails.send({
    from: 'VoiceLocal <hello@voicelocalapp.com>',
    to: email,
    subject: 'Your VoiceLocal license key',
    html: `
      <div style="font-family: -apple-system, sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px; background: #080810; color: #e8e8f4;">
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="color: #5B6EF5; font-size: 28px; margin: 0;">VoiceLocal</h1>
          <p style="color: #8b8fb8; margin: 8px 0 0;">Private dictation for Mac</p>
        </div>
        <h2 style="font-size: 20px; color: #e8e8f4;">Your license key</h2>
        <p style="color: #8b8fb8;">Thanks for purchasing VoiceLocal. Here's your license key:</p>
        <div style="background: #13131f; border: 1px solid rgba(91,110,245,0.3); border-radius: 12px; padding: 20px; text-align: center; margin: 24px 0;">
          <code style="font-size: 22px; color: #5B6EF5; letter-spacing: 2px; font-family: monospace;">${licenseKey}</code>
        </div>
        <h3 style="color: #e8e8f4;">How to activate:</h3>
        <ol style="color: #8b8fb8; line-height: 1.8;">
          <li>Open VoiceLocal (tray icon in your menu bar)</li>
          <li>Click Settings → License</li>
          <li>Paste your license key and click Activate</li>
        </ol>
        <p style="color: #8b8fb8;">Works on up to 2 Macs. Need help? Reply to this email.</p>
        <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.08); margin: 32px 0;">
        <p style="color: #4a4a6a; font-size: 13px; text-align: center;">VoiceLocal · voicelocalapp.com · 30-day refund guarantee</p>
      </div>
    `
  })
}
```

---

## SUCCESS PAGE (`app/success/page.tsx`)

Show after purchase. Retrieve the Stripe session to confirm payment and display:
- Big checkmark in `#4ade80`
- "You're all set." headline
- "Your license key is on its way to [email]."
- Download button linking to `/download`
- Note: "Check your spam folder if you don't see it within 2 minutes."

---

## DOWNLOAD PAGE (`app/download/page.tsx`)

Simple page with:
- VoiceLocal logo + name
- "Download VoiceLocal for Mac" headline
- Big download button → links to the actual `.dmg` file (host on Vercel or a direct GitHub release URL — placeholder for now: `#`)
- System requirements: "macOS 13 Ventura or later · Apple Silicon recommended · 500MB free space"
- "Starting your 7-day free trial. No payment required." note
- Link to buy now if they want to skip the trial

---

## VERCEL DEPLOYMENT CONFIG

Create `vercel.json`:
```json
{
  "functions": {
    "app/api/webhook/route.ts": {
      "maxDuration": 30
    }
  }
}
```

Add to `next.config.js`:
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/api/webhook',
        headers: [{ key: 'Content-Type', value: 'application/json' }]
      }
    ]
  }
}
module.exports = nextConfig
```

---

## BUILD ORDER FOR CURSOR

1. Scaffold Next.js 14 project with Tailwind, install dependencies (`stripe`, `resend`, `@vercel/kv` optional).
2. Set up `globals.css` with design system colors as CSS variables.
3. Build `WaveformAnimation.tsx` first — it's used in the Hero and should be tested standalone.
4. Build each page section component in order (Hero → HowItWorks → Features → Privacy → Pricing → FAQ → Footer).
5. Assemble `app/page.tsx` importing all sections.
6. Build API routes (`/api/checkout` → `/api/webhook` → `/api/verify-license`).
7. Build `/success` and `/download` pages.
8. Test full purchase flow in Stripe test mode using card `4242 4242 4242 4242`.
9. Deploy to Vercel, connect `voicelocalapp.com` domain, add all env vars to Vercel dashboard.
10. Set up Stripe webhook endpoint in Stripe dashboard pointing at `https://voicelocalapp.com/api/webhook` with event `checkout.session.completed`.

---

## DEFINITION OF DONE

- [ ] Site loads at localhost:3000 with all sections rendering correctly
- [ ] WaveformAnimation animates smoothly
- [ ] "Buy Now" button creates a Stripe Checkout session and redirects correctly
- [ ] Test purchase with card 4242 4242 4242 4242 completes successfully
- [ ] Webhook fires and license key email arrives in inbox (check spam)
- [ ] License key format is VLTL-XXXX-XXXX-XXXX-XXXX
- [ ] Success page shows correct email after purchase
- [ ] Download page renders with download button
- [ ] Site is fully responsive on mobile
- [ ] Deployed to Vercel and accessible at voicelocalapp.com
- [ ] All env vars set in Vercel dashboard (not just .env.local)
- [ ] Stripe webhook secret added to Vercel env vars after setting up webhook endpoint
