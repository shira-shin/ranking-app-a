# ranking-app

Next.js + FastAPI + GPT-4o で動く AI ランキングジェネレーター

## Development

### Web (Next.js)

```bash
cd web
npm install
npm run dev
```

Run these commands from the `web` directory so dependencies like `next-auth` and `react` are installed locally. See [web/README.md](web/README.md) for detailed setup and development instructions, including environment variables and type checking with `npx tsc --noEmit`. Copy `web/.env.local.example` to `web/.env.local` and fill in the Google OAuth values before starting the app.

If `npm run dev` fails with "Module not found" or "Invalid hook call" errors, reinstall dependencies in `web/` and ensure no globally installed copies of `react` or `next-auth` are being used.

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

The API requires `OPENAI_API_KEY` to be set in the environment. Copy `.env.example` to `.env` and replace `YOUR_OPENAI_API_KEY` with your actual key before running the server. When testing without a key, set `USE_DUMMY_DATA=1` to return sample rankings.

The web frontend uses NextAuth with Google OAuth 2.0 for authentication. Place the same OAuth credentials in `web/.env.local` as described above. If these variables are omitted the app will still run, but login functionality will be disabled.

When deploying the backend, set the `FRONTEND_ORIGINS` environment variable to the URL of your frontend (comma‑separated if multiple). This controls which sites are allowed to make requests to the API. By default it only allows `http://localhost:3000` for local development.

If you don't have an OpenAI API key handy, start the server with ``USE_DUMMY_DATA=1`` to use built-in sample rankings:
```
USE_DUMMY_DATA=1 uvicorn app.main:app --reload
```

### History API

The server persists ranking history to `server/app/history.json`, which is generated at runtime. You can manage this data with the following endpoints:
```
POST   /history        # add a new entry, returns the stored object
GET    /history        # list all history entries
DELETE /history/{id}   # remove an entry by its ID
```

### Testing

Run the backend tests with `pytest`. The repository includes a `pytest.ini` file so that imports resolve automatically. If you prefer not to rely on the config file, prefix the command with `PYTHONPATH=.`:
```bash
PYTHONPATH=. pytest -q
```

## License

This project is licensed under the [MIT License](LICENSE).
