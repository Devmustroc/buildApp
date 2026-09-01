# 📝 BuildApp - Notion-Inspired Collaborative Workspace & Editor

[![Next.js 14](https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Convex](https://img.shields.io/badge/Convex-Realtime_Backend-EE342F?style=for-the-badge&logo=convex&logoColor=white)](https://www.convex.dev/)
[![BlockNote](https://img.shields.io/badge/BlockNote-Notion_Editor-000000?style=for-the-badge&logo=editor&logoColor=white)](https://www.blocknotejs.org/)
[![Clerk](https://img.shields.io/badge/Clerk-Authentication-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)](https://clerk.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

**BuildApp** is a full-stack, real-time workspace and document management platform inspired by **Notion**. Built with **Next.js 14**, **Convex Database**, **BlockNote Editor**, **Clerk Auth**, **EdgeStore**, and **Framer Motion**, it offers rich document editing, nested page structures, live real-time sync, and trash recovery.

---

## ✨ Features

- 📝 **Rich Block-Based Editor**: Powered by **BlockNote** — create headings, bullet lists, code blocks, callouts, and inline media embeds seamlessly.
- ⚡ **Real-Time Database Sync**: Sub-second real-time sync across sessions powered by **Convex DB**.
- 📂 **Nested Document Navigation**: Infinite nested page tree hierarchy, side navigation bar, and search modal (`cmdk`).
- 🖼️ **Cover Images & Icon Pickers**: Add custom covers and emojis to pages via **EdgeStore** and `emoji-picker-react`.
- 🔐 **Clerk Authentication**: Secure sign-in, user authentication, and workspace isolation.
- 🗑️ **Trash & Archival System**: Soft-delete documents, restore archived pages, or permanently purge notes.
- 🎨 **Dark / Light Modes**: Responsive UI styling with **Tailwind CSS**, **Framer Motion** transitions, and `next-themes`.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [Next.js 14](https://nextjs.org/) (App Router) |
| **Realtime Backend** | [Convex](https://www.convex.dev/) (Serverless Realtime Database & Functions) |
| **Rich Text Editor** | [BlockNote JS](https://www.blocknotejs.org/) |
| **Authentication** | [Clerk](https://clerk.com/) (`@clerk/nextjs`) |
| **File / Media Storage** | [EdgeStore](https://edgestore.dev/) |
| **UI & Motion** | [Framer Motion](https://www.framer.com/motion/) + [Tailwind CSS](https://tailwindcss.com/) + Radix UI |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v18.17` or higher
- **Convex Account**: Run `npx convex dev` to initialize a Convex backend
- **Clerk Account**: Keys for user authentication
- **EdgeStore Account**: Access keys for file uploads

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Devmustroc/buildApp.git
   cd buildApp
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file in the root directory:
   ```env
   CONVEX_DEPLOYMENT=dev:...
   NEXT_PUBLIC_CONVEX_URL=https://...convex.cloud
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   EDGE_STORE_ACCESS_KEY=...
   EDGE_STORE_SECRET_KEY=...
   ```

4. **Start Convex backend**:
   ```bash
   npx convex dev
   ```

5. **Run the Next.js development server**:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```text
buildApp/
├── app/                  # Next.js 14 App Router routes & document layouts
│   ├── (main)/           # Main workspace UI and document reader/editor
│   └── (marketing)/      # Landing page & feature introduction
├── convex/               # Convex database schema & backend functions (documents.ts)
├── components/           # UI components (Editor, Toolbar, Cover image picker, Modals)
│   ├── ui/               # Primitive UI components
│   └── modals/           # Settings, Trash & Search modals
├── hooks/                # Custom React hooks & state stores (Zustand)
└── lib/                  # EdgeStore setup & client utilities
```

---

## 📜 License

Distributed under the MIT License.

---

<p align="center">
  Crafted with ❤️ by <a href="https://github.com/Devmustroc">Devmustroc</a>
</p>
