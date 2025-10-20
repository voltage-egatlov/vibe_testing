# Tej's Portfolio Website

A modern, minimalist portfolio website featuring an innovative spatial tile-based navigation system. Built with Next.js 15, React 19, and Tailwind CSS 4.

## Purpose

This portfolio website showcases my projects, experience, and skills through an interactive tile grid interface. The design emphasizes clean aesthetics and intuitive navigation, creating a unique and memorable browsing experience.

**Key Features:**
- Spatial tile grid navigation system (6x4 grid layout)
- Keyboard navigation with arrow keys
- Smooth transitions between sections
- Expandable dropdown navigation menus
- Mobile-optimized responsive design
- Full-color project images with elegant presentation
- Zoom in/out functionality to view entire portfolio at a glance

## Methodology

The project follows modern React best practices with a focus on performance and maintainability:

### Architecture
- **Component-based design**: Modular, reusable components organized by function (`/common/`, `/content/`, `/navigation/`, `/views/`)
- **Custom React hooks**: Extracted reusable logic for media queries, click detection, keyboard navigation, and scroll indicators
- **Performance optimizations**: React.memo, useCallback, useMemo throughout for minimal re-renders
- **Type-safe TypeScript**: Strict typing with no `any` types, proper type guards
- **Centralized constants**: All magic numbers extracted to `/src/constants/layout.ts`

### Content Management
- File-based content system stored in `/src/filetree/`
- Build-time static generation via Node.js script
- Custom markdown-like tag parsing for rich content ([title], [h1], [h2], [img])
- Spatial grid layout with navigable tile system

### Styling
- Tailwind CSS 4 for utility-first styling
- Custom CSS for smooth animations and transitions
- Modern, minimalist design aesthetic
- Responsive layouts that adapt seamlessly across devices

## Tech Stack

- **Framework**: [Next.js 15.5.4](https://nextjs.org) with Turbopack
- **UI Library**: [React 19.1.0](https://react.dev)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com)
- **Language**: TypeScript
- **Icons**: [Lucide React](https://lucide.dev)
- **Build Tool**: Turbopack (Next.js bundler)

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd stylized_portfolio

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site in your browser.

### Build Commands

```bash
# Development server with hot reload
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Generate content data from filetree
npm run generate
```

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── components/
│   ├── common/            # Reusable components
│   ├── content/           # Content display components
│   ├── navigation/        # Navigation components
│   └── views/             # Main view components
├── constants/
│   └── layout.ts          # Centralized constants
├── data/
│   └── contentData.ts     # Generated content data
├── filetree/              # Content source files
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
└── types/                 # TypeScript type definitions
```

## Customization

See [CLAUDE.md](./CLAUDE.md) for detailed customization instructions, including:
- Adding new pages/sections
- Modifying content
- Adjusting visual effects
- Adding images

## Credits

This project was built with assistance from several AI tools and technologies:

- **[Claude](https://claude.ai)** by Anthropic - Primary AI assistant for architecture, refactoring, and implementation
- **[Aider](https://aider.chat)** - AI pair programming tool for code editing
- **[Ollama](https://ollama.ai)** - Local LLM runtime for development
- **[Qwen](https://qwenlm.github.io/)** - Open-source language model

Special thanks to the open-source community and the developers of Next.js, React, and Tailwind CSS.

## License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ and modern web technologies.
