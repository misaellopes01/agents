# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a Node.js TypeScript server built with Fastify, part of the NLW Agents Intermediate Level project. It's a modern REST API server with PostgreSQL database integration using Drizzle ORM.

## Development Commands

### Core Development
```bash
# Start development server with hot reload
pnpm run dev

# Start production server
pnpm run start
```

### Database Operations
```bash
# Generate database migrations from schema changes
pnpm run db:generate

# Apply pending migrations
pnpm run db:migrate

# Seed database with sample data (resets existing data)
pnpm run db:seed
```

### Code Quality
```bash
# Format and lint code with Biome
npx biome format --write .
npx biome lint --write .
npx biome check --write .
```

### Docker Database
```bash
# Start PostgreSQL with pgvector extension
docker-compose up -d

# Stop database
docker-compose down
```

## Architecture Overview

### Technology Stack
- **Runtime**: Node.js with native TypeScript support (`--experimental-strip-types`)
- **Framework**: Fastify with Zod type provider for type-safe routes
- **Database**: PostgreSQL with pgvector extension
- **ORM**: Drizzle ORM with snake_case column naming
- **Validation**: Zod schemas for environment and API validation
- **Code Quality**: Biome (extends ultracite config) with semicolon-optional style
- **Package Manager**: pnpm

### Project Structure
```
src/
├── db/
│   ├── schema/           # Database schema definitions
│   │   ├── rooms.ts      # Rooms table schema
│   │   ├── questions.ts  # Questions table schema (references rooms)
│   │   └── index.ts      # Schema exports
│   ├── connection.ts     # Database connection and Drizzle setup
│   └── seed.ts          # Database seeding with fake data
├── http/
│   └── routes/          # API route handlers
│       └── get-rooms.ts # GET /rooms endpoint
├── env.ts               # Environment validation with Zod
└── server.ts           # Main server setup and registration
```

### Database Schema
The application has two main entities:
- **Rooms**: Chat rooms with id, name, description, and timestamps
- **Questions**: Questions within rooms (currently has schema bug - table name should be 'questions', not 'rooms')

### Key Architectural Decisions
- Uses native Node.js TypeScript compilation instead of build tools
- Environment variables validated at startup with Zod
- Database uses snake_case naming convention while TypeScript uses camelCase
- CORS configured for localhost:5173 (likely frontend dev server)
- Type-safe API routes with Fastify + Zod integration
- Database queries use Drizzle's query builder for type safety

### Environment Setup
Required environment variables (see `.env.example`):
- `PORT`: Server port (default: 3333)
- `DATABASE_URL`: PostgreSQL connection string

### Known Issues
- Questions schema incorrectly defines table name as 'rooms' instead of 'questions' (line 4 in `src/db/schema/questions.ts`)

### Development Workflow
1. Start PostgreSQL: `docker-compose up -d`
2. Set up environment: Copy `.env.example` to `.env` and configure `DATABASE_URL`
3. Generate and run migrations: `pnpm run db:generate && pnpm run db:migrate`
4. Seed database: `pnpm run db:seed` (optional)
5. Start dev server: `pnpm run dev`

### Testing API
Use the included `client.http` file for API testing with REST client extensions.