# HackGold - Hackathon Platform

## Overview

HackGold is a hackathon event platform built with a React frontend and Express backend. It features a dark-themed, gold-accented landing page with animated backgrounds, track/challenge listings, user authentication via Replit Auth, and a protected dashboard for registered participants.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state
- **Styling**: Tailwind CSS with CSS variables for theming, shadcn/ui component library
- **Animations**: Framer Motion for scroll effects, page transitions, and visual effects
- **Build Tool**: Vite with custom plugins for Replit integration

The frontend uses a component-based architecture with:
- Reusable UI components in `client/src/components/ui/` (shadcn/ui)
- Page components in `client/src/pages/`
- Custom hooks in `client/src/hooks/` for auth, data fetching, and utilities
- Path aliases configured: `@/` maps to `client/src/`, `@shared/` maps to `shared/`

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Replit Auth (OpenID Connect) with Passport.js
- **Session Management**: PostgreSQL-backed sessions via connect-pg-simple

The backend follows a layered architecture:
- Routes defined in `server/routes.ts`
- Database access through `server/storage.ts` using repository pattern
- Auth integration isolated in `server/replit_integrations/auth/`
- Schema definitions shared between frontend and backend in `shared/`

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` with models split into `shared/models/`
- **Migrations**: Managed via `drizzle-kit push` command
- **Validation**: Zod schemas generated from Drizzle schemas via drizzle-zod

### API Design
- RESTful endpoints defined in `shared/routes.ts` with type-safe route definitions
- Response schemas defined using Zod for runtime validation
- API routes prefixed with `/api/`

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connection via `DATABASE_URL` environment variable
- **Drizzle ORM**: Type-safe database queries and schema management

### Authentication
- **Replit Auth**: OpenID Connect authentication provider
- **Required Environment Variables**:
  - `DATABASE_URL`: PostgreSQL connection string
  - `SESSION_SECRET`: Secret for session encryption
  - `ISSUER_URL`: OIDC issuer (defaults to Replit)
  - `REPL_ID`: Replit environment identifier

### Frontend Libraries
- **shadcn/ui**: Component library built on Radix UI primitives
- **Framer Motion**: Animation library for visual effects
- **Lucide React**: Icon library
- **Google Fonts**: Playfair Display, Manrope, Cinzel fonts

### Build & Development
- **Vite**: Frontend build tool with HMR
- **esbuild**: Server bundling for production
- **Replit Plugins**: Runtime error overlay, cartographer, dev banner