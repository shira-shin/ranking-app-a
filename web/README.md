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

## Troubleshooting

If the dev server reports "Module not found: Can't resolve 'next-auth/react'" or "Invalid hook call", the local `node_modules`
directory may be missing or corrupted. Reinstall dependencies in the `web` folder and avoid relying on globally installed
packages:

```bash
rm -rf node_modules package-lock.json
npm install
```

## Development

Start the development server:

```bash
npm run dev
```

Restart `npm run dev` after editing `.env.local` so Next.js reloads environment changes.

## Build

Create a production build:

```bash
npm run build
```

To run a type check without emitting files:

```bash
npx tsc --noEmit
```

## Environment variables

Copy `.env.local.example` to `.env.local` and fill in the Google OAuth values before running the app.

- The file must live in the `web` directory.
- Ensure values have no quotes or trailing spaces.
- Restart `npm run dev` after editing the file so Next.js reloads the environment.
- Saving or sharing rankings requires a logged-in user. Without these values, those actions will prompt for login and no data will be persisted.
