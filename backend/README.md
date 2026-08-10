# Ramanayam Backend Service

This is the enterprise-ready backend framework for **Ramanayam**, a temple e-commerce and services platform. The backend is designed around Clean Architecture and SOLID principles, ensuring clear boundaries, decoupled logic, and database layer independence.

---

## Tech Stack
- **Runtime & Language**: Node.js & TypeScript
- **Web Server**: Express.js
- **Database Access & ORM**: PostgreSQL & Prisma ORM
- **Logging**: Winston Logger & Morgan HTTP logger
- **Security & Utilities**:
  - `helmet` (HTTP headers security)
  - `cors` (Cross-Origin Resource Sharing control)
  - `cookie-parser` (Signed cookie parsing)
  - `compression` (Gzip responses compression)
  - `express-rate-limit` (DDoS and brute-force protection)
  - `zod` (Request payload schema validation)
  - `bcrypt` (Secure password hashing)
  - `jsonwebtoken` (State-less session tokens)
  - `express-async-errors` (Automatic async error forwarding)

---

## Directory Architecture

```
backend/
├── docs/                      # Technical plans & architecture documentation
│   └── database.md            # Relational database layout blueprint
├── prisma/                    # Prisma database client config and schema definitions
│   └── schema.prisma          # PostgreSQL connection and client setup
├── uploads/                   # Local staging file uploads folder (Multer)
├── logs/                      # Error & Combined service logs (Winston)
└── src/
    ├── config/                # App-wide global settings & config constants
    ├── controllers/           # HTTP Request handlers (Zod validation & status orchestration)
    ├── services/              # Domain/Business Logic
    ├── repositories/          # Data Access Layers (interacts directly with Prisma)
    ├── database/              # Shared Database connection instances (singleton Prisma)
    ├── routes/                # Express Route declarations and API version controllers
    ├── middlewares/           # Morgan logging, Error handling, Rate limiting, Auth stubs
    ├── validators/            # Reusable Zod schemas
    ├── types/                 # Standard TypeScript types and shared definitions
    ├── interfaces/            # Reusable core contracts and class blueprints
    ├── utils/                 # General helpers (AppError, logger wrapper)
    ├── constants/             # Enums, HTTP codes, static constants
    ├── helpers/               # Lightweight parsing and serialization helpers
    ├── seed/                  # Database seeder scripts
    ├── tests/                 # Integration and unit tests
    └── modules/               # Domain-specific slices (Vertical slices)
        └── [module-name]/
            ├── controller.ts
            ├── service.ts
            ├── repository.ts
            ├── route.ts
            ├── validator.ts
            └── types.ts
```

---

## Quick Start Setup

### Prerequisites
- Node.js (v18+ recommended)
- PostgreSQL
- Redis (optional/setup ready)

### Installation
1. Install project dependencies:
   ```bash
   npm install
   ```

2. Copy the environment template and configure:
   ```bash
   cp .env.example .env
   ```

3. Update the `.env` file with your PostgreSQL connection URL:
   ```env
   DATABASE_URL="postgresql://postgres:<PASSWORD>@localhost:5432/ramanayam_db"
   ```

4. Run Prisma database code-generation:
   ```bash
   npx prisma generate
   ```

### Execution Scripts
- **Development Server (hot reload)**:
  ```bash
  npm run dev
  ```
- **Build (compiles to `dist/`)**:
  ```bash
  npm run build
  ```
- **Production Server**:
  ```bash
  npm run start
  ```
- **Linting & Code Formatting**:
  ```bash
  npm run lint
  ```
  ```bash
  npm run format
  ```
