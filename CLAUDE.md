# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project

SDE interview prep blog — a Next.js 16 (App Router) website where each blog post is a React component/page. No markdown or CMS; content lives directly in `.tsx` files.

## Stack

- **Framework**: Next.js 16 App Router (`src/app/`)
- **Styling**: Tailwind CSS v4 + shadcn/ui (components in `src/components/ui/`)
- **Language**: TypeScript
- **Package manager**: pnpm

## Commands

```bash
pnpm dev        # Start dev server (http://localhost:3000)
pnpm build      # Production build
pnpm lint       # ESLint
```

## Adding shadcn/ui components

```bash
pnpm dlx shadcn@latest add <component>
# e.g. pnpm dlx shadcn@latest add card badge
```

## Content architecture

Blog posts are React pages under `src/app/`. There is no markdown processing — write posts as `.tsx` files. The `src/lib/utils.ts` file exports `cn()` for merging Tailwind classes.
