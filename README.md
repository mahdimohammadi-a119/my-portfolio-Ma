# Mahdi's Portfolio with Admin Panel

A React (Vite) portfolio with a small backend built on Vercel Serverless Functions.
All site text, skills, projects, and contact details can be edited from a password-protected
admin panel at `/admin`. Visitors' contact form messages are stored and shown in the panel.

## Project structure

```
api/            Vercel serverless endpoints (public + /admin)
server/         Backend logic: auth, storage, validation, HTTP helpers
shared/         Content schema (used by API and admin UI) and default content
src/            React frontend
src/admin/      Admin panel
public/         Static images
```

## Local development

1. Install dependencies: `npm install`
2. Create `.env.local` from `.env.example` and set `ADMIN_PASSWORD`.
3. Start the API: `npx vercel dev` (listens on port 3000).
4. In another terminal, start the frontend: `npm run dev`, then open the Vite URL.

Without Upstash, changes are saved to `data/db.json` on your machine.

## Environment variables

| Name | Required | Purpose |
| --- | --- | --- |
| `ADMIN_PASSWORD` | Yes | Password for `/admin`. Never hard-code it in the source. |
| `SESSION_SECRET` | Recommended | Random string used to sign admin sessions. |
| `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` | Yes on Vercel | Persistent storage. Also accepts `KV_REST_API_URL` / `KV_REST_API_TOKEN`. |

## Deploying to Vercel

1. Push the repository to GitHub and import it in Vercel. The Vite framework is detected automatically.
2. In **Project Settings → Environment Variables**, add `ADMIN_PASSWORD` and `SESSION_SECRET`.
3. In the **Storage** (or Marketplace) tab, create an **Upstash Redis** database and connect it to the project.
   This sets the Redis variables automatically. Without it, the site still displays, but saving changes fails.
4. Deploy. Open `https://your-site.vercel.app/admin` and sign in.

## Admin panel

- `/admin` shows a login form. Sessions last 8 hours and use an HttpOnly cookie.
- Edit each section (Site, Hero, About, Skills, Projects, Contact) and click **Save changes**.
- Images are referenced by URL. Use files in `public/` (for example `/project1.jpg`) or any `https://` link.
- The **Messages** tab lists contact form submissions and lets you delete them.

## API

| Method | Path | Access | Description |
| --- | --- | --- | --- |
| GET | `/api/content` | Public | All site content |
| POST | `/api/messages` | Public | Submit the contact form |
| POST | `/api/admin/login` | Public | Body `{ "password" }`, sets session cookie |
| POST | `/api/admin/logout` | Public | Clears the session cookie |
| GET | `/api/admin/session` | Public | Returns `{ "authenticated": boolean }` |
| PUT | `/api/admin/content` | Admin | Body `{ "section", "data" }` |
| GET | `/api/admin/messages` | Admin | List contact messages |
| DELETE | `/api/admin/messages?id=` | Admin | Delete one message |
