import { useState, useEffect, useRef } from "react";

/* ─── Design tokens matched to form builder :root vars ─── */
const C = {
  greenDark: "#146151",
  greenBanner: "#1E5F53",
  greenLight: "#e8f5e9",
  blue: "#0052cc",
  blueLight: "#eaf4ff",
  red: "#A3262A",
  redLight: "#fce8e8",
  gold: "#FFE066",
  focus: "#ffdd00",
  bg: "#fff",
  border: "#949494",
  borderLight: "#ddd",
  borderGray: "#eee",
  text: "#333",
  textMid: "#555",
  textLight: "#666",
  radius: "6px",
  shadow: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)",
  amber: "#92400e",
  amberBg: "#fffbeb",
  amberBorder: "#fde68a",
};
const F = `-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif`;

/* ─── Time ─── */
const DEADLINE = new Date("2027-03-31T23:59:59");
const RECOMMENDED = new Date("2027-03-15");
function getDaysUntil(d) { return Math.ceil((d - new Date()) / 864e5); }
function getUrgency() {
  const d = getDaysUntil(DEADLINE);
  if (d > 270) return "calm"; if (d > 90) return "alert"; if (d > 30) return "urgent"; return "critical";
}
function scrollTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const headerHeight = 70; // sticky header approx height
  const top = el.getBoundingClientRect().top + window.scrollY - headerHeight - 12;
  window.scrollTo({ top, behavior: "smooth" });
}

/* ═══════════════════════════════════════════
   HEADER — matches form builder site-header
   ═══════════════════════════════════════════ */
function Header() {
  return (
    <header style={{
      background: C.greenDark, borderBottom: "4px solid #002a2b",
      position: "sticky", top: 0, zIndex: 100,
    }}>
      <div style={{
        display: "flex", alignItems: "center", padding: "14px 16px",
        maxWidth: 1200, margin: "0 auto",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 42, height: 42, borderRadius: "50%",
            background: "rgba(255,255,255,0.12)", display: "flex",
            alignItems: "center", justifyContent: "center",
            color: C.gold, fontSize: 14, fontWeight: 800, fontFamily: F,
          }}>Ki</div>
          <div>
            <div style={{ color: C.gold, fontSize: 20, fontWeight: 700, fontFamily: F, lineHeight: 1.1 }}>
              business.gov.ki
            </div>
            <div style={{ color: "#fff", fontSize: 15, fontWeight: 500, fontFamily: F, lineHeight: 1.2, marginTop: 1 }}>
              Re-Registration Guide
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ═══════════════════════════════════════════
   TIME BANNER
   ═══════════════════════════════════════════ */
function TimeBanner() {
  const days = getDaysUntil(DEADLINE);
  const urg = getUrgency();
  const isCalm = urg === "calm";
  const isAlert = urg === "alert";
  const bg = isCalm ? C.greenDark : isAlert ? C.amber : C.red;
  const bgLight = isCalm ? C.greenLight : isAlert ? C.amberBg : C.redLight;
  const borderColor = isCalm ? C.greenDark : isAlert ? C.amberBorder : C.red;

  const msg = {
    calm: `You have approximately ${Math.floor(days / 30)} months. Start early to avoid the rush.`,
    alert: `${days} days remain. The process takes 1\u20132 weeks. Start soon.`,
    urgent: `Only ${days} days left. Start immediately \u2014 each step requires MTCIC approval.`,
    critical: days > 0 ? `${days} days left. Contact MTCIC directly.` : "The deadline has passed.",
  }[urg];

  const total = Math.ceil((DEADLINE - new Date("2026-03-01")) / 864e5);
  const pct = Math.min(100, Math.max(0, ((total - days) / total) * 100));

  return (
    <div style={{
      border: `2px solid ${borderColor}`, borderLeft: `5px solid ${borderColor}`,
      borderRadius: C.radius, padding: 16, marginBottom: 24,
      background: isCalm ? C.bg : bgLight,
    }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 8 }}>
        <span style={{ fontSize: 26, fontWeight: 800, fontFamily: F, color: bg, lineHeight: 1 }}>
          {Math.max(0, days)}
        </span>
        <span style={{ fontSize: 13, fontWeight: 600, color: bg, fontFamily: F }}>
          days until deadline
        </span>
      </div>
      {/* Progress bar */}
      <div style={{ height: 4, background: C.borderGray, borderRadius: 2, marginBottom: 10, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: bg, borderRadius: 2, transition: "width 0.5s ease" }} />
      </div>
      <div style={{ fontSize: 14, lineHeight: 1.5, color: C.text, fontFamily: F }}>{msg}</div>
      <div style={{ fontSize: 12, color: C.textLight, marginTop: 4, fontFamily: F }}>
        Deadline: 31 March 2027 · Recommended submission by 15 March 2027
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   KEY MESSAGES — accordion, form-builder card style
   ═══════════════════════════════════════════ */
const KEY_MESSAGES = [
  { q: "What is re-registration?", a: "Kiribati has new laws \u2014 the Business Names Act 2021 and the Companies Act 2021. Re-registration moves your existing business name or company from the old laws to the new ones and puts your information on the new Online Business Registry." },
  { q: "Does it change my business?", a: "No. Your business keeps its name, its rights, its debts, and its property. It is still the same business under updated rules." },
  { q: "What does it cost?", a: "Nothing. Re-registration is free." },
  { q: "What is the deadline?", a: "31 March 2027. This deadline is firm. Entities that do not re-register by this date will be removed from the register." },
  { q: "What happens if I\u2019m removed?", a: "It becomes illegal to operate your business. Companies and overseas companies can apply for restoration, but this costs money and has time limits. Business names that are removed cannot be restored \u2014 you would need to register a new business name." },
  { q: "How long does it take?", a: "Multiple steps, each requiring MTCIC to check your information. You cannot complete it in a single day. Allow 1\u20132 weeks." },
  { q: "Who needs to do this?", a: "Every existing business name, local company, and overseas company. If your company also uses a registered business name, you need to re-register both \u2014 the company first, then the business name." },
];

function Accordion({ q, a }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const [h, setH] = useState(0);
  useEffect(() => { if (ref.current) setH(ref.current.scrollHeight); }, [open]);
  return (
    <div style={{ borderBottom: `1px solid ${C.borderGray}` }}>
      <button onClick={() => setOpen(!open)} aria-expanded={open} style={{
        width: "100%", textAlign: "left", background: "none", border: "none",
        padding: "14px 0", cursor: "pointer", fontFamily: F,
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10,
      }}>
        <span style={{ fontSize: 15, fontWeight: 600, color: C.text }}>{q}</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, transform: open ? "rotate(180deg)" : "", transition: "transform 0.2s ease" }}>
          <path d="M4 6l4 4 4-4" stroke={C.textLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div style={{ maxHeight: open ? h + 14 : 0, overflow: "hidden", transition: "max-height 0.2s ease" }}>
        <div ref={ref} style={{ fontSize: 14, color: C.textLight, lineHeight: 1.6, fontFamily: F, paddingBottom: 14 }}>{a}</div>
      </div>
    </div>
  );
}

function KeyMessages() {
  return (
    <section id="info-section" style={{ marginBottom: 28 }}>
      <h2 style={{ fontSize: 18, fontWeight: 700, color: C.greenBanner, fontFamily: F, marginBottom: 12 }}>
        What you need to know
      </h2>
      <div style={{ background: C.bg, border: `1.5px solid ${C.borderLight}`, borderRadius: C.radius, padding: "0 16px" }}>
        {KEY_MESSAGES.map((m, i) => <Accordion key={i} q={m.q} a={m.a} />)}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   PATH FORK
   ═══════════════════════════════════════════ */
function PathFork({ onInfo, onFast }) {
  const cardStyle = {
    width: "100%", textAlign: "left", fontFamily: F,
    background: C.bg, border: `1.5px solid ${C.borderLight}`, borderLeft: `5px solid ${C.blue}`,
    borderRadius: C.radius, padding: "14px 16px", cursor: "pointer", minHeight: 48,
    transition: "border-color 0.15s ease, background 0.15s ease",
  };
  return (
    <section style={{ marginBottom: 28, display: "flex", flexDirection: "column", gap: 8 }}>
      <button onClick={onInfo} style={cardStyle}>
        <div style={{ fontSize: 15, fontWeight: 600, color: C.text, marginBottom: 2 }}>
          I need to understand what re-registration is
        </div>
        <div style={{ fontSize: 13, color: C.textLight, lineHeight: 1.4 }}>
          Read about the process, deadline, and requirements first
        </div>
      </button>
      <button onClick={onFast} style={cardStyle}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 2 }}>
            I know what I need to do — get started
          </div>
          <span style={{ color: C.blue, fontSize: 18, fontWeight: 700, flexShrink: 0 }} aria-hidden="true">&rarr;</span>
        </div>
        <div style={{ fontSize: 13, color: C.textLight, lineHeight: 1.4 }}>
          Go straight to your plan
        </div>
      </button>
    </section>
  );
}

/* ═══════════════════════════════════════════
   WIZARD — one question at a time, form-builder style
   ═══════════════════════════════════════════ */
const ENTITIES = [
  { id: "bn", label: "Business Name", form: "BN-0", desc: "Sole traders, partnerships, or companies using a business name" },
  { id: "co", label: "Local Company", form: "CO-0", desc: "Companies incorporated in Kiribati" },
  { id: "overseas", label: "Overseas Company", form: "CO-0a", desc: "Companies from other countries doing business in Kiribati" },
];

const ROLES = {
  bn: [
    { id: "owner", label: "I am the owner of this business name", rec: true },
    { id: "agent", label: "I am an employee or authorised agent", rec: false },
    { id: "none", label: "None of the above", rec: false },
  ],
  co: [
    { id: "owner", label: "I am a director of this company", rec: true },
    { id: "agent", label: "I am an employee or authorised agent", rec: false },
    { id: "none", label: "None of the above", rec: false },
  ],
  overseas: [
    { id: "owner", label: "I am a director of this company", rec: true },
    { id: "agent", label: "I am an employee or authorised agent", rec: false },
    { id: "none", label: "None of the above", rec: false },
  ],
};

function Confirmed({ label, value, onReset }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: C.blueLight, borderRadius: C.radius, padding: "10px 14px", marginBottom: 10,
      borderLeft: `4px solid ${C.blue}`,
    }}>
      <div>
        <div style={{ fontSize: 11, fontWeight: 600, color: C.textLight, fontFamily: F, textTransform: "uppercase", letterSpacing: "0.03em" }}>{label}</div>
        <div style={{ fontSize: 14, fontWeight: 700, color: C.blue, fontFamily: F }}>{value}</div>
      </div>
      <button onClick={onReset} style={{
        background: "none", border: `1.5px solid ${C.blue}`, borderRadius: "4px",
        padding: "4px 10px", fontSize: 12, fontWeight: 700, color: C.blue,
        cursor: "pointer", fontFamily: F,
      }}>Change</button>
    </div>
  );
}

function WizardQ({ number, question, children }) {
  const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), 50); return () => clearTimeout(t); }, []);
  return (
    <div style={{ opacity: show ? 1 : 0, transform: show ? "translateY(0)" : "translateY(8px)", transition: "opacity 0.2s ease, transform 0.2s ease" }}>
      <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: C.textLight, fontFamily: F, marginBottom: 6 }}>
        Question {number}
      </div>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: C.text, fontFamily: F, lineHeight: 1.35, marginBottom: 12 }}>
        {question}
      </h3>
      {children}
    </div>
  );
}

function OptionBtn({ children, onClick }) {
  return (
    <button onClick={onClick} style={{
      width: "100%", textAlign: "left", fontFamily: F,
      background: C.bg, border: `1.5px solid ${C.borderLight}`,
      borderRadius: C.radius, padding: "14px 16px", cursor: "pointer",
      minHeight: 48, transition: "border-color 0.12s ease, background 0.12s ease",
    }}
      onMouseOver={e => { e.currentTarget.style.borderColor = C.blue; e.currentTarget.style.background = C.blueLight; }}
      onMouseOut={e => { e.currentTarget.style.borderColor = C.borderLight; e.currentTarget.style.background = C.bg; }}
    >{children}</button>
  );
}

function RoleGuidance({ role, entity }) {
  const ent = entity === "bn" ? "business name" : "company";
  const own = entity === "bn" ? "owner" : "director";
  if (role === "owner") return (
    <div style={{ marginTop: 12, marginBottom: 12, background: C.greenLight, borderRadius: C.radius, padding: "14px 16px", borderLeft: `4px solid ${C.greenDark}` }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: C.greenDark, fontFamily: F, marginBottom: 4 }}>You are the right person to start this process</div>
      <div style={{ fontSize: 14, color: C.text, lineHeight: 1.55, fontFamily: F }}>
        You will need your government-issued photo ID. Once verified, you can grant access to anyone else who needs to act on behalf of this {ent}.
      </div>
    </div>
  );
  if (role === "agent") return (
    <div style={{ marginTop: 12, marginBottom: 12, background: C.amberBg, borderRadius: C.radius, padding: "14px 16px", borderLeft: `4px solid ${C.amber}` }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: C.amber, fontFamily: F, marginBottom: 4 }}>Additional evidence required</div>
      <div style={{ fontSize: 14, color: C.text, lineHeight: 1.55, fontFamily: F }}>
        You will need your photo ID plus a letter of authority from the {own}. This path takes longer and may be sent back for revision. Where possible, the {own} should start this process instead.
      </div>
    </div>
  );
  return (
    <div style={{ marginTop: 12, marginBottom: 12, background: C.redLight, borderRadius: C.radius, padding: "14px 16px", borderLeft: `4px solid ${C.red}` }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: C.red, fontFamily: F, marginBottom: 4 }}>You cannot start this process</div>
      <div style={{ fontSize: 14, color: C.text, lineHeight: 1.55, fontFamily: F }}>
        Only {entity === "bn" ? "owners" : "directors"}, employees, or authorised agents can verify their connection to a {ent}. Find someone who holds one of those roles.
      </div>
    </div>
  );
}

function Wizard({ onComplete, onShowInfo }) {
  const [entity, setEntity] = useState(null);
  const [hasAccount, setHasAccount] = useState(null);
  const [hasBN, setHasBN] = useState(null);
  const [role, setRole] = useState(null);
  const [personName, setPersonName] = useState("");
  const [entityName, setEntityName] = useState("");
  const [namesSubmitted, setNamesSubmitted] = useState(false);

  const needsBN = entity === "co" || entity === "overseas";
  const entObj = entity ? ENTITIES.find(e => e.id === entity) : null;
  const entWord = entity === "bn" ? "business name" : "company";

  // Step logic: role selected = step 5 (names), names submitted = step 6 (complete)
  let step = 1;
  if (entity) step = 2;
  if (entity && hasAccount !== null) step = needsBN ? 3 : 4;
  if (entity && hasAccount !== null && needsBN && hasBN !== null) step = 4;
  if (entity && hasAccount !== null && (!needsBN || hasBN !== null) && role) step = 5;
  if (role && namesSubmitted) step = 6;

  function resetFrom(s) {
    if (s <= 1) { setEntity(null); setHasAccount(null); setHasBN(null); setRole(null); setNamesSubmitted(false); setPersonName(""); setEntityName(""); }
    else if (s <= 2) { setHasAccount(null); setHasBN(null); setRole(null); setNamesSubmitted(false); setPersonName(""); setEntityName(""); }
    else if (s <= 3) { setHasBN(null); setRole(null); setNamesSubmitted(false); setPersonName(""); setEntityName(""); }
    else if (s <= 4) { setRole(null); setNamesSubmitted(false); setPersonName(""); setEntityName(""); }
    else { setNamesSubmitted(false); }
  }

  useEffect(() => { if (step > 1 && step < 6) setTimeout(() => scrollTo(`ws${step}`), 120); }, [step]);
  useEffect(() => { if (step === 6) onComplete({ entity, hasAccount, hasBN, role, personName: personName.trim(), entityName: entityName.trim() }); }, [step]);

  // Dynamic question numbering
  let qn = 0;

  return (
    <section id="wizard-section" style={{
      background: C.bg, border: `1.5px solid ${C.borderLight}`,
      borderTop: `4px solid ${C.blue}`,
      borderRadius: C.radius, padding: "20px 16px", marginBottom: 28,
      boxShadow: C.shadow,
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
        <h2 style={{ fontSize: 18, fontWeight: 750, color: C.greenBanner, fontFamily: F, margin: 0 }}>
          Build your plan
        </h2>
        <button onClick={onShowInfo} style={{
          background: "none", border: "none", fontSize: 12, fontWeight: 600,
          color: C.blue, cursor: "pointer", fontFamily: F,
          textDecoration: "underline", textUnderlineOffset: "2px",
        }}>About re-registration</button>
      </div>

      {/* Q1: Entity */}
      {entity && step > 1 ? (
        <Confirmed label="Entity type" value={`${entObj.label} (Form ${entObj.form})`} onReset={() => resetFrom(1)} />
      ) : (
        <div id="ws1"><WizardQ number={++qn} question="What are you re-registering?">
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {ENTITIES.map(e => (
              <OptionBtn key={e.id} onClick={() => setEntity(e.id)}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 15, fontWeight: 700, color: C.text }}>{e.label}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: C.textLight }}>Form {e.form}</span>
                </div>
                <div style={{ fontSize: 13, color: C.textLight, marginTop: 2, lineHeight: 1.4 }}>{e.desc}</div>
              </OptionBtn>
            ))}
          </div>
        </WizardQ></div>
      )}

      {/* Q2: Account */}
      {entity && (hasAccount !== null && step > 2 ? (
        <Confirmed label="Online account" value={hasAccount ? "Yes, I have one" : "No, I need to create one"} onReset={() => resetFrom(2)} />
      ) : step === 2 ? (
        <div id="ws2"><WizardQ number={entity ? 2 : ++qn} question="Do you have an account for the Online Business Registry?">
          <div style={{ display: "flex", gap: 8 }}>
            {[{ v: true, l: "Yes" }, { v: false, l: "No" }].map(o => (
              <OptionBtn key={String(o.v)} onClick={() => setHasAccount(o.v)}>
                <div style={{ textAlign: "center", fontSize: 15, fontWeight: 700, color: C.text }}>{o.l}</div>
              </OptionBtn>
            ))}
          </div>
        </WizardQ></div>
      ) : null)}

      {/* Q3: Has BN */}
      {entity && hasAccount !== null && needsBN && (hasBN !== null && step > 3 ? (
        <Confirmed label="Also has business name" value={hasBN ? "Yes" : "No"} onReset={() => resetFrom(3)} />
      ) : step === 3 ? (
        <div id="ws3"><WizardQ number={3} question="Does your company also operate under a registered business name?">
          <div style={{ display: "flex", gap: 8 }}>
            {[{ v: true, l: "Yes" }, { v: false, l: "No" }].map(o => (
              <OptionBtn key={String(o.v)} onClick={() => setHasBN(o.v)}>
                <div style={{ textAlign: "center", fontSize: 15, fontWeight: 700, color: C.text }}>{o.l}</div>
              </OptionBtn>
            ))}
          </div>
        </WizardQ></div>
      ) : null)}

      {/* Q4: Role */}
      {entity && hasAccount !== null && (!needsBN || hasBN !== null) && (role ? (
        <div>
          <Confirmed label="Your connection" value={ROLES[entity].find(r => r.id === role)?.label} onReset={() => resetFrom(4)} />
          <RoleGuidance role={role} entity={entity} />
        </div>
      ) : step === 4 ? (
        <div id="ws4"><WizardQ number={needsBN ? 4 : 3} question={`What is your connection to this ${entWord}?`}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {ROLES[entity].map(r => (
              <OptionBtn key={r.id} onClick={() => setRole(r.id)}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                  <span style={{ fontSize: 14, color: C.text }}>{r.label}</span>
                  {r.rec && <span style={{ fontSize: 10, fontWeight: 700, color: C.greenDark, background: C.greenLight, padding: "2px 8px", borderRadius: "4px", flexShrink: 0, textTransform: "uppercase", letterSpacing: "0.04em" }}>Recommended</span>}
                </div>
              </OptionBtn>
            ))}
          </div>
          <div style={{
            marginTop: 12, fontSize: 13, color: C.textLight, lineHeight: 1.55, fontFamily: F,
            background: C.borderGray, borderRadius: C.radius, padding: "10px 14px",
          }}>
            Before you can re-register, MTCIC needs to confirm you are connected to this {entWord}. This stops anyone else from making changes to your {entWord} without your knowledge.
          </div>
        </WizardQ></div>
      ) : null)}

      {/* Q5: Name and entity name (optional) */}
      {role && role !== "none" && !namesSubmitted && step === 5 ? (
        <div id="ws5">
          <WizardQ number={needsBN ? 5 : 4} question="Add your details to your plan (optional)">
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div>
                <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: C.text, fontFamily: F, marginBottom: 4 }}>
                  Your full name
                </label>
                <input
                  type="text"
                  value={personName}
                  onChange={e => setPersonName(e.target.value)}
                  placeholder="e.g. Teramira Tabai"
                  style={{
                    width: "100%", padding: "12px 14px", fontSize: 15, fontFamily: F,
                    border: `2px solid ${C.borderLight}`, borderRadius: C.radius,
                    color: C.text, background: C.bg, outline: "none",
                    transition: "border-color 0.15s ease",
                  }}
                  onFocus={e => { e.target.style.outline = `3px solid ${C.focus}`; e.target.style.outlineOffset = "2px"; e.target.style.borderColor = C.blue; }}
                  onBlur={e => { e.target.style.outline = "none"; e.target.style.borderColor = C.borderLight; }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: C.text, fontFamily: F, marginBottom: 4 }}>
                  {entity === "bn" ? "Your business name" : "Your company name"}
                </label>
                <input
                  type="text"
                  value={entityName}
                  onChange={e => setEntityName(e.target.value)}
                  placeholder={entity === "bn" ? "e.g. Tarawa Fresh Fish" : "e.g. Pacific Holdings Ltd"}
                  style={{
                    width: "100%", padding: "12px 14px", fontSize: 15, fontFamily: F,
                    border: `2px solid ${C.borderLight}`, borderRadius: C.radius,
                    color: C.text, background: C.bg, outline: "none",
                    transition: "border-color 0.15s ease",
                  }}
                  onFocus={e => { e.target.style.outline = `3px solid ${C.focus}`; e.target.style.outlineOffset = "2px"; e.target.style.borderColor = C.blue; }}
                  onBlur={e => { e.target.style.outline = "none"; e.target.style.borderColor = C.borderLight; }}
                />
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                <button
                  onClick={() => setNamesSubmitted(true)}
                  style={{
                    flex: 1, fontFamily: F, fontSize: 15, fontWeight: 700,
                    background: C.blue, color: "#fff", border: `2px solid ${C.blue}`,
                    borderRadius: "4px", padding: "12px 16px", cursor: "pointer", minHeight: 48,
                  }}
                >
                  {personName.trim() || entityName.trim() ? "Continue" : "Skip"}
                </button>
              </div>
              <div style={{ fontSize: 13, color: C.text, fontFamily: F, lineHeight: 1.5 }}>
                This is optional. These details will appear on your plan to make it personal to you. <span style={{ color: C.textLight }}>This information is not stored or sent anywhere.</span>
              </div>
            </div>
          </WizardQ>
        </div>
      ) : role && role !== "none" && namesSubmitted && (personName.trim() || entityName.trim()) ? (
        <Confirmed
          label="Your details"
          value={[personName.trim(), entityName.trim()].filter(Boolean).join(" · ")}
          onReset={() => resetFrom(5)}
        />
      ) : null}
    </section>
  );
}

/* ═══════════════════════════════════════════
   PATHWAY — task-card style from form builder
   ═══════════════════════════════════════════ */
function getSteps(entity, hasAccount, role, pName, eName) {
  const form = { bn: "BN-0", co: "CO-0", overseas: "CO-0a" }[entity];
  const ent = { bn: "business name", co: "company", overseas: "overseas company" }[entity];
  const formUrl = {
    bn: "https://business.gov.ki/bn-forms.html",
    co: "https://business.gov.ki/co-forms.html",
    overseas: "https://business.gov.ki/overseas-co-forms.html",
  }[entity];
  const own = entity === "bn" ? "owner" : "director";

  // Personalised labels
  const idFor = pName ? `Government-issued photo ID for ${pName}` : "Your government-issued photo ID";
  const entLabel = eName || `your ${ent}`;

  // Authority proof based on role
  const proofNeeds = role === "owner"
    ? [idFor]
    : [idFor, `Letter of authority for ${entLabel} from the ${own}`];

  // Guide walkthrough URL — deep-link to relevant screen
  const guideUrl = "guide-reregister-bn.html"; // TODO: entity-specific guides for CO/overseas

  const s = [];
  if (!hasAccount) s.push({
    title: "Create an online account",
    wait: "Allow 2\u20133 business days for MTCIC to approve",
    needs: ["An email address", idFor],
    summary: `Go to business.gov.ki, click CREATE ACCOUNT, fill in your details, upload your photo ID, and submit. Wait for MTCIC\u2019s approval email.`,
    guideLink: `${guideUrl}#step2`,
    cta: { label: "Create your account", url: "https://business.gov.ki/public/setupaccount.aspx" },
  });
  s.push({
    title: `Connect your account to ${entLabel}`,
    wait: "Allow 2\u20135 business days for MTCIC to approve",
    needs: ["Approved online account", ...proofNeeds],
    summary: `Log in, search for ${entLabel} by name or registration number, click REQUEST ENTITY AUTHORITY, upload your proof, and submit. You will receive an email from MTCIC when this has been approved.`,
    guideLink: `${guideUrl}#step4`,
    cta: { label: "Log in to the registry", url: "https://business.gov.ki/public/login.aspx" },
  });
  s.push({
    title: `Complete form ${form}`,
    wait: "No wait \u2014 you can do this while waiting for MTCIC",
    needs: [`Details for ${entLabel} (owners, addresses, activities, etc.)`],
    summary: `Go to the ${form} form on business.gov.ki, fill in the details for ${entLabel}, and save the completed form as a PDF to your device.`,
    cta: { label: `Go to form ${form}`, url: formUrl },
  });
  s.push({
    title: "Upload and submit your form",
    wait: "MTCIC will process and email you when complete",
    needs: [`Your account is connected to ${entLabel}`, `Completed form ${form} saved as PDF`, "Any supporting documents from the form checklist"],
    summary: `Log in, go to My Entities, click ${entLabel}, click RE-REGISTER, upload your form and documents, and submit. Re-registration is free \u2014 there is nothing to pay.`,
    guideLink: `${guideUrl}#step10`,
    cta: { label: "Log in to submit your form", url: "https://business.gov.ki/public/login.aspx" },
  });
  return s;
}

function StepCard({ step, index }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const [h, setH] = useState(0);
  useEffect(() => { if (ref.current) setH(ref.current.scrollHeight); }, [open, step]);

  return (
    <div style={{
      background: C.bg, border: `1.5px solid ${C.borderLight}`,
      borderLeft: `5px solid ${C.blue}`,
      borderRadius: C.radius, overflow: "hidden", marginBottom: 8,
    }}>
      <button onClick={() => setOpen(!open)} aria-expanded={open} style={{
        width: "100%", display: "flex", alignItems: "center", gap: 12,
        padding: "14px 14px", border: "none", background: "transparent",
        cursor: "pointer", textAlign: "left", fontFamily: F,
      }}>
        <div style={{
          width: 28, height: 28, borderRadius: "4px",
          background: C.blue, color: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, fontWeight: 700, fontFamily: F, flexShrink: 0,
        }}>{index + 1}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: C.text, lineHeight: 1.3 }}>{step.title}</div>
          <div style={{ fontSize: 12, color: C.textLight, marginTop: 2, fontFamily: F }}>{step.wait}</div>
        </div>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, transform: open ? "rotate(180deg)" : "", transition: "transform 0.2s ease" }}>
          <path d="M3 5l4 4 4-4" stroke={C.textLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div style={{ maxHeight: open ? h + 16 : 0, overflow: "hidden", transition: "max-height 0.2s ease" }}>
        <div ref={ref} style={{ padding: "0 14px 14px 54px" }}>
          <div style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: C.textLight, marginBottom: 6, fontFamily: F }}>What you need</div>
            {step.needs.map((n, i) => (
              <div key={i} style={{ fontSize: 14, color: C.text, lineHeight: 1.55, padding: "2px 0", display: "flex", gap: 8, fontFamily: F }}>
                <span style={{ color: C.greenDark, flexShrink: 0, fontWeight: 700 }}>&#10003;</span><span>{n}</span>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 14, color: C.text, lineHeight: 1.6, fontFamily: F, background: "#f9f9f9", padding: "12px 14px", borderRadius: C.radius, border: `1px solid ${C.borderGray}` }}>
            {step.summary}
          </div>
          {/* Action buttons row */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
            {step.cta && (
              <a href={step.cta.url} target="_blank" rel="noopener noreferrer" style={{
                fontFamily: F, fontSize: 14, fontWeight: 700,
                background: C.blue, color: "#fff", border: `2px solid ${C.blue}`,
                borderRadius: "4px", padding: "10px 18px", cursor: "pointer",
                textDecoration: "none", minHeight: 48,
                display: "inline-flex", alignItems: "center", gap: 8,
                transition: "background 0.15s ease",
              }}>
                {step.cta.label} <span aria-hidden="true">&rarr;</span>
              </a>
            )}
            {step.guideLink && (
              <a href={step.guideLink} target="_blank" rel="noopener noreferrer" style={{
                background: C.bg, border: `1.5px solid ${C.blue}`,
                borderRadius: "4px", padding: "10px 14px", fontSize: 13, fontWeight: 700,
                color: C.blue, cursor: "pointer", fontFamily: F, textDecoration: "none",
                display: "inline-flex", alignItems: "center", gap: 6, minHeight: 48,
              }}>
                Show me how
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Pathway({ config }) {
  if (!config || config.role === "none") return null;
  const { entity, hasAccount, hasBN, role, personName, entityName } = config;
  const steps = getSteps(entity, hasAccount, role, personName, entityName);
  const entLabel = ENTITIES.find(e => e.id === entity).label;
  const formLabel = ENTITIES.find(e => e.id === entity).form;
  const planTitle = entityName ? `Your plan for ${entityName}` : "Your plan";

  return (
    <section id="pathway-section" style={{
      background: C.bg, border: `1.5px solid ${C.borderLight}`,
      borderTop: `4px solid ${C.blue}`,
      borderRadius: C.radius, padding: "20px 16px", marginBottom: 28,
      boxShadow: C.shadow,
    }} aria-live="polite">
      <h2 style={{ fontSize: 18, fontWeight: 750, color: C.greenBanner, fontFamily: F, marginBottom: 4 }}>
        {planTitle}
      </h2>
      <p style={{ fontSize: 14, color: C.textLight, fontFamily: F, marginBottom: 16, lineHeight: 1.5 }}>
        {entLabel} · Form {formLabel} · {steps.length} steps · Free
      </p>
      {steps.map((s, i) => <StepCard key={i} step={s} index={i} />)}
      {hasBN && (
        <div style={{
          background: C.amberBg, borderLeft: `4px solid ${C.amber}`,
          borderRadius: C.radius, padding: "12px 14px", marginTop: 10,
          fontSize: 14, color: C.amber, lineHeight: 1.5, fontFamily: F, fontWeight: 600,
        }}>
          You also need to re-register your business name. Complete your company re-registration first, then repeat the process using form BN-0.
        </div>
      )}
    </section>
  );
}

/* ═══════════════════════════════════════════
   DOWNLOAD
   ═══════════════════════════════════════════ */
function DownloadSection({ config }) {
  if (!config || config.role === "none") return null;
  const dlTitle = config.entityName ? `Download your plan for ${config.entityName}` : "Download your plan";
  return (
    <section style={{
      background: C.greenDark, borderRadius: C.radius, padding: "28px 20px",
      textAlign: "center", marginBottom: 28,
    }}>
      <h3 style={{ fontSize: 18, fontWeight: 700, color: "#fff", fontFamily: F, marginBottom: 6 }}>
        {dlTitle}
      </h3>
      <p style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", fontFamily: F, marginBottom: 18, lineHeight: 1.5, maxWidth: 380, marginLeft: "auto", marginRight: "auto" }}>
        A PDF with your steps, forms, and documents needed. Print it or save it to your device.
      </p>
      <button onClick={() => alert("PDF generation via jsPDF \u2014 not in prototype")} style={{
        fontFamily: F, fontSize: 16, fontWeight: 700,
        background: "#fff", color: C.greenDark,
        border: "none", borderRadius: "4px",
        padding: "14px 28px", cursor: "pointer", minHeight: 48,
        display: "inline-flex", alignItems: "center", gap: 8,
        width: "100%", maxWidth: 320, justifyContent: "center",
        boxShadow: C.shadow,
      }}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M9 2v10M9 12l-3.5-3.5M9 12l3.5-3.5M3 14h12" stroke={C.greenDark} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Save plan to your device
      </button>
    </section>
  );
}

/* ═══════════════════════════════════════════
   FOOTER — matches form builder site-footer
   ═══════════════════════════════════════════ */
function Footer() {
  return (
    <footer style={{
      background: "#222", color: "#fff",
      padding: "24px 16px", marginTop: 8, fontFamily: F,
    }}>
      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>Contact MTCIC</div>
      <div style={{ fontSize: 13, color: "#ccc", lineHeight: 1.6, marginBottom: 14 }}>
        Phone: [to be confirmed]<br />Email: [to be confirmed]
      </div>
      <div style={{ borderTop: "1px solid #444", paddingTop: 14, fontSize: 12, color: "#999", lineHeight: 1.6 }}>
        Ministry of Tourism, Commerce, Industry and Cooperatives · Kiribati<br />
        For official requirements, visit{" "}
        <a href="https://business.gov.ki" style={{ color: C.gold, textDecoration: "none", fontWeight: 600 }}>business.gov.ki</a>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════
   APP
   ═══════════════════════════════════════════ */
export default function App() {
  const [path, setPath] = useState(null);       // null | "info" | "fast"
  const [showInfo, setShowInfo] = useState(false); // triggered from wizard's "About" link
  const [showWizard, setShowWizard] = useState(false); // for info path, wizard appears after CTA
  const [wizardResult, setWizardResult] = useState(null);
  const [wizardKey, setWizardKey] = useState(0);

  function handleRestart() {
    setPath(null);
    setShowInfo(false);
    setShowWizard(false);
    setWizardResult(null);
    setWizardKey(k => k + 1);
    setTimeout(() => scrollTo("main-content"), 100);
  }

  const wizardVisible = path === "fast" || showWizard;

  return (
    <div style={{ minHeight: "100vh", background: "#f4f4f4", fontFamily: F }}>
      <Header />
      <main id="main-content" style={{ maxWidth: 640, margin: "0 auto", padding: "20px 16px 0" }}>

        {/* ── Landing: context and orientation ── */}
        <h1 style={{ fontSize: 28, fontWeight: 800, color: C.greenBanner, fontFamily: F, lineHeight: 1.2, marginBottom: 12 }}>
          Re-register your business name or company
        </h1>
        <p style={{ fontSize: 16, color: C.text, lineHeight: 1.65, fontFamily: F, marginBottom: 24 }}>
          Kiribati has a new Business Names Act and Companies Act. We are moving to a new Online Business Registry and need you to confirm your business details. Re-registration is free.
        </p>

        <TimeBanner />

        {/* ── Interactive section ── */}
        <h2 style={{ fontSize: 22, fontWeight: 800, color: C.greenBanner, fontFamily: F, lineHeight: 1.25, marginBottom: 14 }}>
          Get your re-registration plan
        </h2>

        {!path && <PathFork
          onInfo={() => { setPath("info"); setTimeout(() => scrollTo("info-section"), 100); }}
          onFast={() => { setPath("fast"); setShowWizard(true); setTimeout(() => scrollTo("wizard-section"), 100); }}
        />}

        {/* Info path: FAQs then a CTA to launch the wizard */}
        {(path === "info" || showInfo) && (
          <>
            <KeyMessages />
            {!showWizard && (
              <div style={{ borderTop: `1px solid ${C.borderLight}`, paddingTop: 20, marginBottom: 28 }}>
                <button
                  onClick={() => { setShowWizard(true); setTimeout(() => scrollTo("wizard-section"), 100); }}
                  style={{
                    width: "100%", fontFamily: F, fontSize: 16, fontWeight: 700,
                    background: C.greenDark, color: "#fff", border: `2px solid ${C.greenDark}`,
                    borderRadius: "4px", padding: "16px 20px", cursor: "pointer", minHeight: 52,
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    boxShadow: C.shadow,
                  }}
                >
                  Get my re-registration plan <span aria-hidden="true">&rarr;</span>
                </button>
              </div>
            )}
          </>
        )}

        {/* Wizard */}
        {wizardVisible && (
          <Wizard
            key={wizardKey}
            onComplete={(r) => { setWizardResult(r); setTimeout(() => scrollTo("pathway-section"), 200); }}
            onShowInfo={() => { setShowInfo(true); setTimeout(() => scrollTo("info-section"), 100); }}
          />
        )}

        <Pathway config={wizardResult} />
        <DownloadSection config={wizardResult} />

        {/* After re-registration: ongoing responsibilities */}
        {wizardResult && wizardResult.role !== "none" && (
          <section style={{
            background: C.bg, border: `1.5px solid ${C.borderLight}`,
            borderRadius: C.radius, padding: "16px", marginBottom: 28,
          }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: C.greenBanner, fontFamily: F, marginBottom: 8 }}>
              After you re-register
            </h3>
            <p style={{ fontSize: 14, color: C.textMid, lineHeight: 1.55, fontFamily: F, marginBottom: 12 }}>
              Once re-registered, you will have ongoing responsibilities under the new laws. These include keeping your information up to date and submitting an annual return every year.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {wizardResult.entity === "bn" && (
                <a href="https://business.gov.ki/public/help.aspx?cn=AboutBusinessName" target="_blank" rel="noopener noreferrer" style={{
                  fontSize: 14, fontWeight: 600, color: C.blue, fontFamily: F, textDecoration: "none",
                  padding: "8px 0", display: "flex", alignItems: "center", gap: 6,
                }}>
                  Learn about your responsibilities as a business name owner <span aria-hidden="true">&rarr;</span>
                </a>
              )}
              {(wizardResult.entity === "co" || wizardResult.entity === "overseas") && (
                <a href="https://business.gov.ki/public/help.aspx?cn=AboutCompanies" target="_blank" rel="noopener noreferrer" style={{
                  fontSize: 14, fontWeight: 600, color: C.blue, fontFamily: F, textDecoration: "none",
                  padding: "8px 0", display: "flex", alignItems: "center", gap: 6,
                }}>
                  Learn about your responsibilities as a company <span aria-hidden="true">&rarr;</span>
                </a>
              )}
              <a href="https://business.gov.ki/public/howto.aspx?cn=FileAnnualReturn&ctk=CompanyHowTo" target="_blank" rel="noopener noreferrer" style={{
                fontSize: 14, fontWeight: 600, color: C.blue, fontFamily: F, textDecoration: "none",
                padding: "8px 0", display: "flex", alignItems: "center", gap: 6,
              }}>
                How to submit your annual return <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </section>
        )}

        {wizardResult && (
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <button onClick={handleRestart} style={{
              fontFamily: F, fontSize: 14, fontWeight: 700,
              background: C.bg, color: C.blue, border: `1.5px solid ${C.blue}`,
              borderRadius: "4px", padding: "12px 24px", cursor: "pointer",
              minHeight: 48, display: "inline-flex", alignItems: "center", gap: 8,
            }}>
              <span aria-hidden="true">&larr;</span> Start again for a different entity
            </button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
