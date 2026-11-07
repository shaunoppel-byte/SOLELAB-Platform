# SOLELAB Platinum v2 — approved Gold / Silver / Stadium Blue

## Website and mobile app
- Responsive static storefront with premium stadium-inspired hero, sport category cards, searchable demo catalogue, bag, sell-enquiry preview and FAQ guide.
- Installable PWA via `manifest.webmanifest` and `sw.js` once hosted over HTTPS.
- Responsive mobile navigation and keyboard focus states.
- Preview inventory is local to each browser, not shared or secured.

## Hosting on existing zero-cost stack
1. Parent creates/approves a separate GitHub repository for SOLELAB.
2. Upload this folder, preserving assets and PWA files.
3. Connect the repository to Cloudflare Pages; build command blank; output directory `/` (repo root).
4. Verify HTTPS, links, forms, PWA installation and actual mobile-browser behavior.
5. Do NOT enable real sales until server-side inventory, adult-only authentication, privacy and consumer disclosures, verified product photographs and payment arrangements are ready.

## Truth in advertising
Demo products and prices are NOT real stock; the feature image is illustrative. There is no live AI, payments, shared inventory, fulfilment or production deployment. An adult must supervise supplier contact, personal information, customer service and transactions. Free hosting is possible at modest scale; payment, shipping and supplies have costs.

## Phase 3: Cloudflare D1 read-only catalogue scaffold
`backend/schema.sql` defines a product inventory with draft/published/sold status and honest condition notes. `backend/worker.js` provides **GET /api/products** for published stock only, with parameterized category filtering and bounded pagination. `backend/wrangler.toml.example` is a template, not a deployed configuration.

This backend has NOT been deployed or connected to the frontend. No public inventory edits, customer PII collection, orders or payments are exposed. An adult must create the repository and Cloudflare resources, configure Cloudflare Access and a separately tested admin API before enabling writes. Never put admin API keys in the frontend. Product photographs should be uploaded to a private, parent-controlled image pipeline and reviewed before publication.

Suggested rollout: (1) parent-controlled GitHub repo, (2) Cloudflare Pages preview, (3) D1 and read-only catalogue, (4) Cloudflare Access-protected admin workflow, (5) supplier privacy and moderation, (6) approved payment and fulfilment, (7) AI FAQ with human handoff. Do not publish example stock as available inventory.
