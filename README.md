# ranking-app

Next.js + FastAPI + GPT-4o で動く AI ランキングジェネレーター

## Development

### Web (Next.js)
```
cd web
npm install
npm run dev
```

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

The API requires `OPENAI_API_KEY` to be set in the environment. Create a `.env`
file or export the variable before running the server. When testing without a
key, set `USE_DUMMY_DATA=1` to return sample rankings.

If you don't have an OpenAI API key handy, start the server with
``USE_DUMMY_DATA=1`` to use built-in sample rankings:

```
USE_DUMMY_DATA=1 uvicorn app.main:app --reload
```
