/**
 * config.js — Single source of truth for the Kiribati Online Business Registry
 * re-registration programme.
 *
 * Every HTML file in docs/ imports this file. If a fact appears in more than
 * one page, it MUST live here.
 *
 * Usage:  <script src="config.js"></script>
 *         then reference window.CONFIG in your page scripts.
 */

window.CONFIG = {

  /* ── Programme ───────────────────────────────────────────── */
  programme: {
    name:        "Re-Registration Programme",
    tagline:     "Confirm your business details on the new Online Business Registry",
    deadlineISO: "2027-03-31T23:59:59",
    deadlineLabel: "31 March 2027",
    recommendedSubmissionISO: "2027-03-15",
    recommendedSubmissionLabel: "15 March 2027",
    isFree:      true,
    freeLabel:   "Re-registration is free",
  },

  /* ── Registry URLs ──────────────────────────────────────── */
  registry: {
    base:          "https://business.gov.ki",
    login:         "https://business.gov.ki/public/login.aspx",
    createAccount: "https://business.gov.ki/public/setupaccount.aspx",
  },

  /* ── API endpoints ────────────────────────────────────────
     emailWorker: Cloudflare Worker URL for sending plan emails
     via SendGrid. Set to null until deployed.                */
  api: {
    emailWorker: null,   // e.g. "https://ki-rereg-email.your-subdomain.workers.dev"
  },

  /* ── Entity types ───────────────────────────────────────── */
  entities: {
    bn: {
      id:          "bn",
      label:       "Business Name",
      form:        "BN-0",
      formBuilder: "https://business.gov.ki/bn-forms.html",
      guide:       "guide-reregister-bn.html",
      description: "Sole traders, partnerships, or companies using a business name",
      ownerTerm:   "owner",
      canRestore:  false,
    },
    co: {
      id:          "co",
      label:       "Local Company",
      form:        "CO-0",
      formBuilder: "https://business.gov.ki/co-forms.html",
      guide:       "guide-reregister-co.html",   // Phase 3
      description: "Companies incorporated in Kiribati",
      ownerTerm:   "director",
      canRestore:  true,
    },
    overseas: {
      id:          "overseas",
      label:       "Overseas Company",
      form:        "CO-0a",
      formBuilder: "https://business.gov.ki/overseas-co-forms.html",
      guide:       "guide-reregister-overseas.html", // Phase 3
      description: "Companies from other countries doing business in Kiribati",
      ownerTerm:   "director",
      canRestore:  true,
    },
  },

  /* ── Roles (who can file) ───────────────────────────────── */
  roles: {
    bn: [
      { id: "owner", label: "I am the owner of this business name",  recommended: true },
      { id: "agent", label: "I am an employee or authorised agent",  recommended: false },
      { id: "none",  label: "None of the above",                     recommended: false },
    ],
    co: [
      { id: "owner", label: "I am a director of this company",       recommended: true },
      { id: "agent", label: "I am an employee or authorised agent",  recommended: false },
      { id: "none",  label: "None of the above",                     recommended: false },
    ],
    overseas: [
      { id: "owner", label: "I am a director of this company",       recommended: true },
      { id: "agent", label: "I am an employee or authorised agent",  recommended: false },
      { id: "none",  label: "None of the above",                     recommended: false },
    ],
  },

  /* ── Wait times (shown in step cards) ───────────────────── */
  waitTimes: {
    accountApproval:    "2–3 business days",
    authorityApproval:  "2–5 business days",
    fullProcess:        "1–2 weeks",
  },

  /* ── Key messages / FAQ ─────────────────────────────────── */
  keyMessages: [
    {
      q: "What is re-registration?",
      a: "Kiribati has new laws — the Business Names Act 2021 and the Companies Act 2021. Re-registration moves your existing business name or company from the old laws to the new ones and puts your information on the new Online Business Registry.",
    },
    {
      q: "Does it change my business?",
      a: "No. Your business keeps its name, its rights, its debts, and its property. It is still the same business under updated rules.",
    },
    {
      q: "What does it cost?",
      a: "Nothing. Re-registration is free.",
    },
    {
      q: "What is the deadline?",
      a: "31 March 2027. This deadline is firm. Entities that do not re-register by this date will be removed from the register.",
    },
    {
      q: "What happens if I'm removed?",
      a: "It becomes illegal to operate your business. Companies and overseas companies can apply for restoration, but this costs money and has time limits. Business names that are removed cannot be restored — you would need to register a new business name.",
    },
    {
      q: "How long does it take?",
      a: "Multiple steps, each requiring MTCIC to check your information. You cannot complete it in a single day. Allow 1–2 weeks.",
    },
    {
      q: "Who needs to do this?",
      a: "Every existing business name, local company, and overseas company. If your company also uses a registered business name, you need to re-register both — the company first, then the business name.",
    },
  ],

  /* ── Authority letter wording ───────────────────────────── */
  authorityLetter: {
    instruction: "Write this by hand on paper, sign it, photograph it, and upload the photo.",
    template: "I, [owner/director name], authorise [agent name] to act on behalf of [entity name] for the purpose of re-registration on the Online Business Registry.",
  },

  /* ── MTCIC contact details ──────────────────────────────── */
  contact: {
    ministry: "Ministry of Tourism, Commerce, Industry and Cooperatives",
    country:  "Kiribati",
    phone:    null,   // TBC
    email:    null,   // TBC
  },

  /* ── Workshop settings (Phase 4) ────────────────────────── */
  workshop: {
    staffRequired:      3,
    staffRoles:         ["Facilitator", "Roaming helper", "Approving officer"],
    laptopsRequired:    2,
    registrationCloseDaysBefore: 7,
    attendeePrereqs:    ["Smartphone with mobile data", "An email address"],
  },

  /* ── Design tokens (mirrors styles.css custom properties) ─ */
  tokens: {
    greenDark:    "#146151",
    greenBanner:  "#1E5F53",
    greenLight:   "#e8f5e9",
    blue:         "#0052cc",
    blueLight:    "#eaf4ff",
    gold:         "#FFE066",
    red:          "#A3262A",
    redLight:     "#fce8e8",
    amber:        "#92400e",
    amberBg:      "#fffbeb",
    amberBorder:  "#fde68a",
    text:         "#333",
    textMid:      "#555",
    textLight:    "#666",
    bg:           "#fff",
    border:       "#949494",
    borderLight:  "#ddd",
    borderGray:   "#eee",
    radius:       "6px",
    radiusBtn:    "4px",
    greenAction:  "#448040",
    greenDarkBorder: "#002a2b",
    inputBorder:  "#767676",
    disabled:     "#e0e0e0",
    bgSubtle:     "#f9f9f9",
    bgPage:       "#f4f4f4",
    warnBorder:   "#d4a017",
    fileBadge:    "#dc3545",
    amberDark:    "#b8860b",
    focus:        "#ffdd00",
    focusShadow:  "0 0 0 1px #333",
    shadow:       "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)",
    font:         "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  },


  /* ── Helpers ─────────────────────────────────────────────── */

  /** Days until the programme deadline. */
  daysUntilDeadline() {
    return Math.ceil((new Date(this.programme.deadlineISO) - new Date()) / 864e5);
  },

  /** Urgency level: calm | alert | urgent | critical. */
  urgency() {
    const d = this.daysUntilDeadline();
    if (d > 270) return "calm";
    if (d > 90)  return "alert";
    if (d > 30)  return "urgent";
    return "critical";
  },

  /** Human-readable urgency message. */
  urgencyMessage() {
    const d = this.daysUntilDeadline();
    const u = this.urgency();
    if (u === "calm")     return `You have approximately ${Math.floor(d / 30)} months. Start early to avoid the rush.`;
    if (u === "alert")    return `${d} days remain. The process takes ${this.waitTimes.fullProcess}. Start soon.`;
    if (u === "urgent")   return `Only ${d} days left. Start immediately — each step requires MTCIC approval.`;
    if (d > 0)            return `${d} days left. Contact MTCIC directly.`;
    return "The deadline has passed.";
  },

  /** Percentage of time elapsed since programme start (approx 1 Mar 2026). */
  deadlineProgress() {
    const start = new Date("2026-03-01");
    const end   = new Date(this.programme.deadlineISO);
    const total = end - start;
    const elapsed = new Date() - start;
    return Math.min(100, Math.max(0, (elapsed / total) * 100));
  },
};
