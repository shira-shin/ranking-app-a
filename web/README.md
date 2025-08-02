# Web (Next.js)

## Setup

From the repository root run:

```bash
cd web
npm install
```

Running `npm install` inside the `web` directory ensures packages like `next-auth`, `react`, and `react-dom` are installed locally. Using globally installed copies can lead to "Module not found" or "Invalid hook call" errors.

After the install, confirm a single version of each dependency is present:

```bash
npm ls react react-dom next-auth
```

If any of these packages are missing or duplicated, remove `node_modules` and `package-lock.json` and install again.

## Development

Start the development server:

```bash
npm run dev
```

## Build

Create a production build:

```bash
npm run build
```

## Environment variables

Copy `.env.local.example` to `.env.local` and fill in the Google OAuth values before running the app. These values must live in the `web` directory and should have no quotes or trailing spaces.
