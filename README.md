# wrappp-web

Frontend for [Wrappp](https://wrappp.link) — a minimalist URL shortener with QR code generation, live health status, and a rolling 30-day link expiry policy.

Built with **Next.js 16 (App Router)** 

---


## Features

- Shorten any URL instantly — no account required
- Auto-generated QR code with one-click download
- Rolling 30-day expiry — extended by each click on the link
- Live system health indicator in the footer
- Dynamic Open Graph images, sitemap, and structured data (JSON-LD)
- Server-side rendering — no client-side API keys exposed

---

## Local Development

### Prerequisites

- Node.js 20+
- A running instance of the [wrappp backend API](https://github.com/gattolab/wrappp)

### Setup

```bash
git clone https://github.com/gattolab/wrappp-web
cd wrappp-web
npm install
```

Copy the environment file and fill in your local values:

```bash
cp .env.local.example .env.local
```

```ini
# .env.local
SITE_URL=http://localhost:8080
API_BASE=http://localhost:3000
REDIRECT_BASE=http://localhost:3000
```

Start the dev server:

```bash
npm run dev
# → http://localhost:8080
```

---

## Link Expiry Policy

- Links expire **30 days after creation**
- Each click **resets the 30-day timer**
- A link that is never clicked expires exactly 30 days after it was created
- There is no maximum lifetime — an active link never expires

---

## Contributing

Issues and PRs welcome at [github.com/gattolab/wrappp](https://github.com/gattolab/wrappp).

To report a bug: [github.com/gattolab/wrappp/issues](https://github.com/gattolab/wrappp/issues)

To support the project: [ko-fi.com/babytub](https://ko-fi.com/babytub)

---

## License

MIT © [Gatto Lab](https://github.com/gattolab)
