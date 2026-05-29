<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

- Standard commands live in `package.json`; `npm run build` is the best non-secret readiness check because there is no lint or test script yet.
- For local Cloud smoke testing, run the Next.js dev server on an explicit port such as `npm run dev -- --hostname 127.0.0.1 --port 3000` so it can coexist with the other repos in this workspace.
- Full Supabase, Stripe, Anthropic, Plaid, and Resend flows require real environment variables from `.env.example`; the public landing/pricing pages and the fixed referral-code validation path can be tested without those secrets.
