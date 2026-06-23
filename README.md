# Recetas Ricas

Recetas Ricas is a recipe web application built with Next.js (App Router), React, TypeScript, and MongoDB.

## Overview

Key features:
- Browse a catalog of recipes
- View detailed recipe pages with ingredients and step-by-step preparation
- Register and log in with email/password
- Mark recipes as favorites (per-user)
- Receive a welcome email after registration (if SMTP configured)

Authentication uses a JWT stored in an `HttpOnly` cookie for server-side API protection.

## Project layout

- `app/` – Next.js App Router pages and components
  - `app/page.tsx` – main dashboard
  - `app/recipes/[id]/page.tsx` – recipe detail page
  - `app/auth/*` – login and register pages
  - `app/favorites/page.tsx` – favorites page (requires authentication)
- `app/api/` – server API routes (auth, recipes, favorites)
- `app/src/components/` – reusable React components (cards, toggles, etc.)
- `app/src/services/` – service layer for business logic and DB access
- `app/src/models/` – Mongoose models (`users`, `recipes`, `favorites`)
- `app/lib/` – utilities (MongoDB connection, email sender)
- `scripts/` – utilities and developer scripts (seed, validation)

## Data and services

- `recipes` collection stores recipe documents with fields for name, image, time, difficulty, ingredients and preparation steps.
- `users` collection stores registered users with hashed passwords.
- `favorites` collection links users to their favorite recipes.
- All database interactions go through the service layer in `app/src/services/`.

## Typical flow

1. The dashboard loads recipes via `recipeService.fetchRecipes()`.
2. If the recipes collection is empty, default recipes are inserted using `createDefaultRecipes()`.
3. Users register and their passwords are hashed with `bcryptjs`; a welcome email is sent if SMTP is enabled.
4. On login a JWT is issued and stored in an `HttpOnly` cookie named `token`.
5. Authenticated users can toggle favorites; the server validates the JWT and updates the `favorites` collection.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables (create `app/.env` or `.env`):
- `MONGO_URI` or `MONGOURI`
- (optional) SMTP variables: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `EMAIL_FROM`

3. Seed the database (optional):

```bash
npm run seed
```

4. Run the development server:

```bash
npm run dev
```

Visit `http://localhost:3000`.

## Notes and recommendations

- Use the `scripts/seed.ts` to populate a development database with default data and a test user.
- Protect the `/favorites` page server-side and client-side so it requires authentication.
- Remove any hardcoded secrets from scripts before committing (for example, remove plain credentials in `delete-recipes.mjs`).
- Add tests and CI to validate core flows (auth, recipes, favorites).
