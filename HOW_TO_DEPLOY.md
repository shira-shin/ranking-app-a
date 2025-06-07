# How to Deploy

This repository contains a Next.js frontend in `web` and a FastAPI backend in `server`.

## Deploy the frontend to Vercel
1. Create a new project in Vercel and select this repository.
2. When prompted for the project directory, choose `web`.
3. Set the environment variable `NEXT_PUBLIC_API_URL` to the public URL of the Render service (see below).
4. Deploy.

## Deploy the backend to Render
1. Create a new Web Service in Render from this repository. Render will automatically read `Render.yaml`.
2. Provide the environment variable `OPENAI_API_KEY`.
3. Deploy the service. Once live, note the service URL and use it for `NEXT_PUBLIC_API_URL` in Vercel.
