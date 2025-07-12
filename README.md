# ranking-app

Next.js + FastAPI + GPT-4o で動く AI ランキングジェネレーター

## Development

### Web (Next.js)
```
cd web
npm install
npm run dev
```
The `web` directory uses TypeScript with a standard `tsconfig.json` configured
for Next.js. Run `npm run build` to compile the project for production or use
`npx tsc --noEmit` to perform a type check only.

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

When deploying the backend, set the `ALLOWED_ORIGINS` environment variable to
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
