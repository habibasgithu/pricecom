# PriceScout — product comparison + affiliate site

A working starter: visitors search by product **name or photo**, see results
side-by-side from **Amazon, eBay, Walmart, and Temu**, and every "View deal"
link is automatically wrapped with **your affiliate ID**.

## Run it

```bash
npm install
cp .env.example .env   # then fill in your real IDs (see below)
npm start
```

Open http://localhost:3000

## What's real vs. what's mocked right now

Out of the box, the site is **fully functional end-to-end**, but the four
platform searches return **sample/placeholder data**, not live prices. This
is intentional — hooking up real results requires accounts/API keys that
only you can obtain. Here's exactly what to do for each:

| Platform | What you need | Where |
|---|---|---|
| **Amazon** | Become an Amazon Associate, then apply for Product Advertising API access (requires qualifying sales first) | affiliate-program.amazon.com |
| **eBay** | Join the eBay Partner Network (free) for your campaign ID, and register a developer app for the Browse API (free, no sales requirement) | partnernetwork.ebay.com / developer.ebay.com |
| **Walmart** | Join Walmart's affiliate program (runs via Impact.com), get your affiliate ID | affiliates.walmart.com |
| **Temu** | Temu has **no public product-search API**. Affiliates get ready-made tracking links from a network (Impact, CJ, etc.) rather than querying Temu directly | Temu's affiliate page, or search "Temu affiliate program" |

Once you have credentials, drop them into `.env` (see `.env.example`) and
replace the `TODO` sections in `platforms.js` with real API calls — the
comments there link to each platform's docs.

**Important honest note:** I didn't write any code that scrapes these sites
directly (e.g. pulling live prices without an API). Scraping Amazon/Walmart/etc.
typically violates their Terms of Service and can get you IP-banned or your
affiliate account terminated — the official APIs/affiliate networks above are
the reliable path to real income here.

## Search by photo

Real product recognition from a photo needs an image-recognition API (Google
Cloud Vision, AWS Rekognition, or similar) to turn the photo into a product
name/keywords, which then get searched normally. There's a stub for this in
`platforms.js` (`identifyProductFromImage`) — plug in your provider's API key
in `.env` and fill in the TODO. Until then, photo uploads will show an error
prompting the visitor to type the product name instead.

## File map

- `server.js` — Express server, one API route: `POST /api/search`
- `platforms.js` — one function per platform (swap mock data for real API calls here) + the affiliate-link-wrapping logic
- `config.js` — loads your affiliate IDs/API keys from `.env`
- `public/` — the frontend (plain HTML/CSS/JS, no framework needed)

## Deploying

Any Node host works (Render, Railway, Fly.io, a VPS). Just set the same
environment variables from `.env` in your host's dashboard instead of
committing the `.env` file.
