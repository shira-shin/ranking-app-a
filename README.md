# ranking-app

Next.js + FastAPI + GPT-4o で動く AI ランキングジェネレーター

## Development

### Web (Next.js)
```
cd web
npm install
npm run dev
```
Run these commands from the `web` directory so that Next.js can read the environment variables located there.
The `.env.local` file is git-ignored, so copy `web/.env.local.example` to
`web/.env.local` and replace the `dummy_*` values with your actual Firebase
credentials before starting the dev server. If any of the Firebase variables are
missing, the frontend logs a message like `Firebase disabled: missing env vars
(apiKey, authDomain)`. Use this hint to verify that all keys are loaded
correctly when troubleshooting login issues.  When this warning persists:

- Confirm that `.env.local` lives in the `web` directory.
- Ensure there are **no quotes or trailing spaces** around the values.
- Restart `npm run dev` after editing the file so Next.js reloads the
  environment.
The `web` directory uses TypeScript with a standard `tsconfig.json` configured for Next.js. Run `npm run build` to
compile the project for production or use `npx tsc --noEmit` to perform a type
check only.

### Server (FastAPI)
```
cd server
pip install -r requirements.txt
# After pulling new commits, run the install command again to make sure
# dependencies such as `openai` and `httpx` are updated.  Old versions of
# `httpx` can cause errors like `Client.__init__() got an unexpected keyword
# argument 'proxies'`.
uvicorn app.main:app --reload
```

The API requires `OPENAI_API_KEY` to be set in the environment. Copy
`.env.example` to `.env` and replace `YOUR_OPENAI_API_KEY` with your actual key
before running the server. When testing without a key, set
`USE_DUMMY_DATA=1` to return sample rankings.

The web frontend uses Firebase Authentication and Firestore. Set the `NEXT_PUBLIC_FIREBASE_*` variables with your Firebase project credentials. When running `npm run dev` inside the `web` directory, Next.js only reads environment files from that folder. Copy `web/.env.local.example` to `web/.env.local` (or `web/.env`) and fill in your Firebase keys there; otherwise the frontend will start with an invalid API key and Firebase will raise `auth/invalid-api-key` errors. If these variables are omitted the app will still run, but login functionality will be disabled.

When deploying the backend, set the `FRONTEND_ORIGINS` environment variable to
the URL of your frontend (comma‑separated if multiple). This controls which
sites are allowed to make requests to the API. By default it only allows
`http://localhost:3000` for local development.

If you don't have an OpenAI API key handy, start the server with
``USE_DUMMY_DATA=1`` to use built-in sample rankings:

```
USE_DUMMY_DATA=1 uvicorn app.main:app --reload
```

### History API

The server persists ranking history to `server/app/history.json`, which is
generated at runtime.
You can manage this data with the following endpoints:

```
POST   /history        # add a new entry, returns the stored object
GET    /history        # list all history entries
DELETE /history/{id}   # remove an entry by its ID
```

## License

This project is licensed under the [MIT License](LICENSE).
