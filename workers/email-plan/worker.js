/**
 * Cloudflare Worker — ki-rereg email plan sender (KIR-28)
 *
 * Receives the personalised re-registration plan as HTML from the
 * mini site front-end and delivers it via SendGrid.
 *
 * Environment variables (set in Cloudflare dashboard or wrangler.toml):
 *   SENDGRID_API_KEY   — SendGrid API key
 *   FROM_EMAIL         — verified sender (e.g. noreply@business.gov.ki)
 *   FROM_NAME          — display name (e.g. "Business Registry Kiribati")
 *   ALLOWED_ORIGINS    — comma-separated origins for CORS
 *                        (e.g. "https://business.gov.ki,http://localhost:8080")
 *
 * POST /send  { email, subject, html }
 *   → 200  { ok: true }
 *   → 400  { error: "..." }   (validation)
 *   → 429  { error: "..." }   (rate limit)
 *   → 500  { error: "..." }   (SendGrid failure)
 */

export default {
  async fetch(request, env) {
    // ── CORS ──
    const origin = request.headers.get('Origin') || '';
    const allowed = (env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim());
    const corsOK = allowed.includes(origin) || allowed.includes('*');
    const corsHeaders = {
      'Access-Control-Allow-Origin': corsOK ? origin : '',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    };

    // Preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    // Only POST /send
    const url = new URL(request.url);
    if (request.method !== 'POST' || url.pathname !== '/send') {
      return json({ error: 'Not found' }, 404, corsHeaders);
    }

    // ── Parse + validate ──
    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: 'Invalid JSON' }, 400, corsHeaders);
    }

    const { email, subject, html } = body;

    if (!email || typeof email !== 'string' || !email.includes('@') || email.length > 254) {
      return json({ error: 'Invalid email address' }, 400, corsHeaders);
    }
    if (!html || typeof html !== 'string' || html.length < 100) {
      return json({ error: 'Missing or empty plan HTML' }, 400, corsHeaders);
    }
    if (html.length > 200_000) {
      return json({ error: 'Plan HTML too large' }, 400, corsHeaders);
    }

    const subjectLine = (typeof subject === 'string' && subject.length > 0 && subject.length < 200)
      ? subject
      : 'Your re-registration plan — business.gov.ki';

    // ── Rate limit (simple per-IP, 5 per minute) ──
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    const rateLimitKey = `rate:${ip}`;
    const current = parseInt(await env.KV?.get(rateLimitKey) || '0', 10);
    if (current >= 5) {
      return json({ error: 'Too many requests. Please try again in a minute.' }, 429, corsHeaders);
    }
    // Increment (best-effort; KV not available = skip rate limiting)
    if (env.KV) {
      await env.KV.put(rateLimitKey, String(current + 1), { expirationTtl: 60 });
    }

    // ── Send via SendGrid ──
    const sgPayload = {
      personalizations: [{
        to: [{ email: email.trim() }],
        subject: subjectLine,
      }],
      from: {
        email: env.FROM_EMAIL || 'noreply@business.gov.ki',
        name:  env.FROM_NAME  || 'Business Registry Kiribati',
      },
      content: [
        { type: 'text/html', value: html },
      ],
      tracking_settings: {
        click_tracking:        { enable: false },
        open_tracking:         { enable: false },
        subscription_tracking: { enable: false },
      },
    };

    try {
      const sgResp = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.SENDGRID_API_KEY}`,
          'Content-Type':  'application/json',
        },
        body: JSON.stringify(sgPayload),
      });

      if (!sgResp.ok) {
        const errText = await sgResp.text();
        console.error('SendGrid error:', sgResp.status, errText);
        return json({ error: 'Email service error. Please try again.' }, 500, corsHeaders);
      }

      return json({ ok: true }, 200, corsHeaders);

    } catch (err) {
      console.error('SendGrid fetch failed:', err);
      return json({ error: 'Email service unavailable.' }, 500, corsHeaders);
    }
  },
};

function json(data, status, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...headers },
  });
}
