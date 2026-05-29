<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

- This is a Next.js app; standard commands are in `package.json`.
- Public page smoke tests can run with the Supabase project URL and publishable key for the `blindadousa` project. Full auth, checkout, Plaid, Resend, and AI flows require the private secrets from `.env.example`.
- Local dev was verified with `npm run dev -- -p 3001`; production build works for the public route set without private service credentials.
