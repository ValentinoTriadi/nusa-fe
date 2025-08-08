<div align="center">
	<img src="public/logo.png" alt="Nusa FE Logo" width="120" />
	<h1>Nusa</h1>
	<p><b>Empowering SME Collaboration for Wholesale Commerce</b></p>
	<p>
		<img src="https://img.shields.io/badge/Next.js-15-blue?logo=nextdotjs" />
		<img src="https://img.shields.io/badge/React-19-61dafb?logo=react" />
		<img src="https://img.shields.io/badge/TanStack_Query-v5-ff4154?logo=react-query" />
		<img src="https://img.shields.io/badge/PWA-Ready-green?logo=pwa" />
		<img src="https://img.shields.io/badge/TypeScript-5-blue?logo=typescript" />
	</p>
</div>

---

Nusa FE is a cutting-edge frontend for a collaborative B2B marketplace, empowering small and medium enterprises (SMEs) to streamline group purchases and wholesale transactions. Built with the latest in modern web tech — Next.js 15, React 19, and TypeScript — Nusa FE combines sleek UX, performance, and scalability with full e-commerce capabilities and progressive web app support.

---

## 🌱 Why Nusa?

In a world of fragmented supply chains and limited access for SMEs, Nusa provides a digital bridge — enabling trusted, scalable, and cooperative commerce. This platform goes beyond simple transactions — it fosters collaboration, collective buying power, and shared growth.

## ✨ Features

- 🚀 Modern B2B marketplace UI/UX
- 🔒 Secure authentication with Better Auth (cookie-based)
- 🛒 Product catalog, detail, and dynamic pricing
- 🤝 SME collaboration for group/wholesale purchase
- 🧾 Cart, checkout, and order summary
- 🚚 Shipping and payment selection
- 🔄 Session context, cross-tab sync, and auto-refresh
- 📱 PWA support (HTTPS, manifest, service worker)
- 📊 Analytics-ready and scalable
- 💡 Mobile-first, accessible, and fast

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **UI:** React 19, Tailwind CSS, ShadCN
- **State Management:** TanStack Query v5
- **HTTP Client:** Axios
- **Authentication:** Better Auth (cookie/session-based)
- **PWA:** Service Worker, Manifest, HTTPS
- **Icons:** Lucide React
- **Image Optimization:** next/image

## 📦 Main Libraries Used

- `next` (v15)
- `react` (v19)
- `@tanstack/react-query` (v5)
- `axios`
- `lucide-react` (icon)
- `zod` (for schema validation)
- `tailwindcss`
- `postcss`
- `eslint` (with custom config)
- `open-api` (backend integration)
- `shadCN` (UI Components)
- `next-pwa` (PWA)

## 📁 Folder Structure

```
src/
├── app/             # Next.js app routing
├── components/      # Reusable UI components and pages
├── hooks/           # Custom hooks (auth, query, API)
├── lib/             # Core utilities (auth, axios, helpers)
├── types/           # Zod schemas, shared types
public/              # Static assets (icons, sw, manifest)
```

## 🚀 Getting Started

```bash
pnpm install
pnpx next dev --experimental-https
```

Open [https://localhost:3000](https://localhost:3000) to view the app.

## 🌏 Project Vision

Nusa FE aims to empower Indonesian SMEs to collaborate, digitize, and thrive in the wholesale market. By making group buying, collaboration, and digital commerce accessible, we help local businesses grow together.

## ❓ FAQ

**Q: How do I enable PWA/HTTPS in development?**
A: Use `pnpx next dev --experimental-https` and ensure your backend also uses HTTPS for cookies.

## 📜 License

MIT

---

Built with ❤️ by `Tuhan Yang Atur`.
- Shabrina Maharani (13522134)
- Auralea Alvinia Syaikha (13522148)
- Valentino Chryslie Triadi (13522164)
