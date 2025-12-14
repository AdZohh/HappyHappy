# Romantic Birthday Interactive Gift Page

## Overview

This is a personal, romantic birthday gift website designed to create an emotional, interactive experience. The application presents an animated gift box that, when tapped, reveals a love letter with floating hearts, confetti, and romantic animations. It's built as a mobile-first experience with soft, pastel aesthetics and progressive content revelation.

The project follows a full-stack architecture with a React frontend and Express backend, though the primary focus is on the frontend interactive experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with custom configuration
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with CSS variables for theming
- **UI Components**: shadcn/ui component library (New York style)
- **Animations**: Framer Motion for smooth transitions, canvas-confetti for celebration effects
- **Typography**: Google Fonts (Dancing Script, Playfair Display, Quicksand) for romantic aesthetics

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript (ESM modules)
- **Development**: tsx for TypeScript execution
- **Build**: esbuild for production bundling

### Data Storage
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Schema Location**: `shared/schema.ts`
- **Current Storage**: In-memory storage (`MemStorage` class) as default
- **Database Ready**: Drizzle config expects `DATABASE_URL` environment variable when database is provisioned

### Project Structure
```
├── client/           # React frontend
│   ├── src/
│   │   ├── components/ui/  # shadcn/ui components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utilities and query client
├── server/           # Express backend
│   ├── index.ts      # Server entry point
│   ├── routes.ts     # API route definitions
│   ├── storage.ts    # Data storage interface
│   └── vite.ts       # Vite dev server integration
├── shared/           # Shared types and schemas
│   └── schema.ts     # Drizzle database schema
└── migrations/       # Database migrations (Drizzle)
```

### Path Aliases
- `@/*` → `client/src/*`
- `@shared/*` → `shared/*`
- `@assets/*` → `attached_assets/*`

### Key Design Patterns
- **Mobile-First Design**: Primary viewport is mobile with centered, full-height layouts
- **Progressive Revelation**: Content unfolds through user interactions
- **Component-Based UI**: Extensive use of Radix UI primitives through shadcn/ui
- **Romantic Theme**: Soft pink/rose color palette with HSL CSS variables

## External Dependencies

### UI & Animation
- **Radix UI**: Full suite of accessible UI primitives
- **Framer Motion**: Animation library for React
- **canvas-confetti**: Celebration particle effects
- **Lucide React**: Icon library

### Data & Forms
- **TanStack React Query**: Async state management
- **React Hook Form**: Form handling with Zod validation
- **Zod**: Schema validation
- **drizzle-zod**: Zod schema generation from Drizzle

### Backend Services
- **PostgreSQL**: Database (via Drizzle ORM when provisioned)
- **connect-pg-simple**: Session storage for PostgreSQL
- **express-session**: Session management

### Development Tools
- **Vite**: Frontend build and dev server
- **esbuild**: Production server bundling
- **Drizzle Kit**: Database migrations and schema management
- **Replit Plugins**: Runtime error overlay, cartographer, dev banner