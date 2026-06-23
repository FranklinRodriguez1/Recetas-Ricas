# Recetas Ricas

Recipe web application built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and **MongoDB**.

## Description

Recetas Ricas allows users to:
- view a recipe catalog
- see details for each recipe
- create an account and log in
- mark recipes as favorites
- view the user's favorite recipes list

The application uses a JWT stored in an `HttpOnly` cookie to authenticate API routes on the server.

## Main architecture

- `app/page.tsx`: main page that renders the `Dashboard`
- `app/auth/login/page.tsx`: login page
- `app/auth/register/page.tsx`: registration page
- `app/favorites/page.tsx`: favorites page
- `app/recipes/[id]/page.tsx`: individual recipe detail page
- `app/api/*`: API routes for auth, recipes, and favorites
- `app/src/context/AuthContext.tsx`: session state and user control
- `app/src/services/*`: services layer for client and server logic
- `app/src/models/*`: Mongoose models for users and recipes
- `app/lib/datebases.ts`: MongoDB connection
- `app/lib/email.ts`: optional welcome email sending

## Application flow

1. The user visits `/` and the `Dashboard` loads.
2. The backend fetches recipes from MongoDB using `recipeService.fetchRecipes()`.
3. If no recipes exist, the server inserts 10 default recipes.
4. The user can navigate to a specific recipe at `/recipes/[id]` to view details.
5. The user can register at `/auth/register`.
   - Email and password are validated on the server.
   - The password is hashed with `bcryptjs`.
   - The user is created in MongoDB.
   - A welcome email is attempted if SMTP is configured.
6. The user logs in at `/auth/login`.
   - The password is verified with `authService.validateUser()`.
   - A JWT is generated with `jsonwebtoken`.
   - The token is returned in an `HttpOnly` cookie named `token`.
7. When authenticated, the user can mark recipes as favorites.
   - The client calls `/api/favorites` via `favoriteClient.toggleFavorite()`.
   - The server verifies the JWT with `favoritesService.verifyTokenFromHeader()`.
   - The recipe document's `isFavorite` field is updated.
8. The user views favorite recipes at `/favorites`.
9. The user logs out using `/api/auth/logout`, which clears the `token` cookie.

## Service layers

### Presentation layer

- React components in `app/src/components/*`
- Client pages in `app/*`
- Login and registration forms with validation
- `AuthContext` manages `isLogin` and `user`

### HTTP client layer

- `app/src/services/authClient.ts`
  - `registerUser`
  - `loginUser`
  - `fetchCurrentUser`
  - `logoutUser`
- `app/src/services/recipeClient.ts`
  - `getRecipes`
  - `getRecipeById`
- `app/src/services/favoriteClient.ts`
  - `getFavorites`
  - `toggleFavorite`

This layer abstracts `fetch()` requests and response handling.

### API / server layer

- `app/api/auth/login/route.ts`: signs in and issues the JWT
- `app/api/auth/register/route.ts`: registers users and sends email
- `app/api/auth/me/route.ts`: validates the current session
- `app/api/auth/logout/route.ts`: removes the session cookie
- `app/api/recipes/route.ts`: lists recipes and creates default recipes
- `app/api/recipes/[id]/route.ts`: returns recipe details
- `app/api/favorites/route.ts`: gets and toggles favorites with authentication

### Business logic layer

- `app/src/services/authService.ts`
  - `createUser`
  - `findUserByEmail`
  - `validateUser`
- `app/src/services/recipeService.ts`
  - `fetchRecipes`
  - `getRecipeById`
  - `createDefaultRecipes`
- `app/src/services/favoritesService.ts`
  - `parseCookies`
  - `verifyTokenFromHeader`
- `app/src/services/emails.ts`
  - `sendRegistrationEmail`

### Data layer

- `app/src/models/userModel.ts`: defines the user schema (`email`, `password`)
- `app/src/models/recipeModel.ts`: defines the recipe schema (`nombre`, `imagen`, `tiempoPreparacion`, `dificultad`, `preparacion`, `isFavorite`)
- `app/lib/datebases.ts`: connects to MongoDB using `MONGO_URI` or `MONGOURI`

## How to run

1. Install dependencies:

```bash
npm install
```

2. Set environment variables:
- `MONGO_URI` or `MONGOURI`
- optionally `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `EMAIL_FROM`

3. Start the server:

```bash
npm run dev
```

4. Open the app in the browser:

```text
http://localhost:3000
```

## Important notes

- Authentication uses a JWT stored in an `HttpOnly` cookie.
- The backend will create default recipes if the collection is empty.
- Email sending only works if SMTP is configured.
- Logout clears the `token` cookie and resets session state.
