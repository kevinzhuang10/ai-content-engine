# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15.5.3 application bootstrapped with `create-next-app`, using the App Router architecture. The project is configured with TypeScript, TailwindCSS v4, and ESLint for code quality.

## Development Commands

- **Start development server**: `npm run dev` (uses Turbopack for faster builds)
- **Build for production**: `npm run build` (uses Turbopack)
- **Start production server**: `npm start`
- **Lint code**: `npm run lint`

## Architecture

### Tech Stack
- **Framework**: Next.js 15.5.3 with App Router
- **Language**: TypeScript 5+ with strict mode enabled
- **Styling**: TailwindCSS v4 with PostCSS
- **UI Components**: shadcn/ui (New York style, with Lucide icons)
- **Build Tool**: Turbopack (Next.js default)
- **Runtime**: React 19.1.0

### Project Structure
- `src/app/` - App Router pages and layouts using Next.js 13+ conventions
- `src/app/layout.tsx` - Root layout with Geist font configuration and global styles
- `src/app/page.tsx` - Home page component
- `src/app/globals.css` - Global CSS with TailwindCSS imports and shadcn/ui variables
- `src/lib/utils.ts` - Utility functions including cn() for conditional classes
- `@/components/ui/` - shadcn/ui components (configured via components.json)

### Key Configuration
- **TypeScript**: Configured with path mapping (`@/*` → `./src/*`) and Next.js plugin
- **ESLint**: Uses Next.js core-web-vitals and TypeScript rules via FlatCompat
- **Fonts**: Geist Sans and Geist Mono loaded via `next/font/google`
- **Styling**: TailwindCSS v4 with CSS custom properties for theming (light/dark mode support)

### Development Notes
- The project uses App Router architecture (not Pages Router)
- TailwindCSS v4 syntax is used with `@theme inline` blocks
- Font variables are defined in layout.tsx and used in globals.css
- Dark mode is handled via CSS custom properties and `.dark` class
- shadcn/ui components can be added with: `npx shadcn@latest add [component-name]`
- Use `cn()` utility from `@/lib/utils` for conditional class merging


## Visual Development

### Design Principles
- Comprehensive design checklist in `/context/design-principles.md`
- Brand style guide in `/context/style-guide.md`
- When making visual (front-end, UI/UX) changes, always refer to these files for guidance

### Quick Visual Check
IMMEDIATELY after implementing any front-end change:
1. **Identify what changed** - Review the modified components/pages
2. **Navigate to affected pages** - Use `mcp__playwright__browser_navigate` to visit each changed view
3. **Verify design compliance** - Compare against `/context/design-principles.md` and `/context/style-guide.md`
4. **Validate feature implementation** - Ensure the change fulfills the user's specific request
5. **Check acceptance criteria** - Review any provided context files or requirements
6. **Capture evidence** - Take full page screenshot at desktop viewport (1440px) of each changed view
7. **Check for errors** - Run `mcp__playwright__browser_console_messages`

This verification ensures changes meet design standards and user requirements.
- ## Port Usage for Testing

If a process is already running on port 3000, use that port for testing purposes rather than spinning up a new process on a different port (e.g., 3001). The port 3000 process is typically the main application that has been started separately. Reuse existing ports when possible to avoid port proliferation.