import { useState } from "react";

const C = {
  greenDark: "#146151", greenBanner: "#1E5F53", greenLight: "#e8f5e9",
  blue: "#0052cc", blueLight: "#eaf4ff",
  gold: "#FFE066",
  red: "#A3262A", redLight: "#fce8e8",
  amber: "#92400e", amberBg: "#fff8e6",
  bg: "#fff", text: "#333", textMid: "#555", textLight: "#666",
  border: "#ddd", borderGray: "#eee",
  radius: "6px",
  shadow: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)",
  focus: "#ffdd00",
};
const F = `-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif`;

/* ═══════════════════════════════════════════
   EVENT CONFIG — edit per event
   ═══════════════════════════════════════════ */
const EVENT = {
  title: "Re-register your business name",
  titleKi: "Manga-rejita aran am bitineti",
  type: "bn", // "bn" or "co"
  date: "Tuesday 16 June 2026",
  time: "10:00 AM \u2014 12:00 PM",
  location: "MTCIC Office, Betio, Tarawa",
  mapUrl: "https://maps.app.goo.gl/example",
  capacity: 25,
  registered: 14,
  registrationOpen: true,
  registrationCutoff: "Tuesday 10 June 2026",
  description: "At this workshop, MTCIC staff will help you re-register your business name on the Online Business Registry. You will do everything on your own phone. You will leave with your re-registration submitted.",
  descriptionKi: "[I-Kiribati: Translation of workshop description]",
  duration: "Approximately 2 hours",
  form: "BN-0",
};

const isBN = EVENT.type === "bn";
const entWord = isBN ? "business name" : "company";
const ownWord = isBN ? "owner" : "director";

/* ═══════════════════════════════════════════
   SHARED STYLES + COMPONENTS
   ═══════════════════════════════════════════ */
const inputStyle = {
  width: "100%", padding: "12px 14px", fontSize: 15, fontFamily: F,
  border: `2px solid ${C.border}`, borderRadius: C.radius,
  color: C.text, background: C.bg, outline: "none",
};
const focusHandlers = {
  onFocus: e => { e.target.style.borderColor = C.blue; e.target.style.outline = `3px solid ${C.focus}`; e.target.style.outlineOffset = "2px"; },
  onBlur: e => { e.target.style.borderColor = C.border; e.target.style.outline = "none"; },
};

function OptionButton({ selected, onClick, children }) {
  return (
    <button onClick={onClick} style={{
      width: "100%", textAlign: "left", fontFamily: F,
      background: selected ? C.blueLight : C.bg,
      border: selected ? `2px solid ${C.blue}` : `1.5px solid ${C.border}`,
      borderRadius: C.radius, padding: "12px 14px", cursor: "pointer",
      transition: "all 0.15s ease", minHeight: 48,
    }}>
      {children}
    </button>
  );
}

function StatusBadge({ ok }) {
  return (
    <span style={{
      display: "inline-block", fontSize: 11, fontWeight: 700,
      background: ok ? C.greenLight : C.amberBg,
      color: ok ? C.greenDark : C.amber,
      border: `1px solid ${ok ? C.greenDark : C.amber}`,
      padding: "2px 8px", borderRadius: 3, marginLeft: 6,
    }}>{ok ? "Ready" : "Prepare"}</span>
  );
}

/* ═══════════════════════════════════════════
   HEADER
   ═══════════════════════════════════════════ */
function Header() {
  return (
    <header style={{ background: C.greenDark, borderBottom: "4px solid #002a2b", padding: "12px 16px", display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: C.gold, fontSize: 12, fontWeight: 800, fontFamily: F }}>Ki</div>
      <div>
        <div style={{ color: C.gold, fontSize: 16, fontWeight: 700, fontFamily: F }}>business.gov.ki</div>
        <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 11, fontFamily: F }}>Workshop Registration</div>
      </div>
    </header>
  );
}

/* ═══════════════════════════════════════════
   EVENT HEADER
   ═══════════════════════════════════════════ */
function EventHeader() {
  const spotsLeft = EVENT.capacity - EVENT.registered;
  const almostFull = spotsLeft <= 5;
  const full = spotsLeft <= 0;

  return (
    <section style={{ marginBottom: 24 }}>
      <div style={{ display: "inline-block", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: C.blue, background: C.blueLight, padding: "3px 10px", borderRadius: 4, marginBottom: 10 }}>
        {isBN ? "Business Name Workshop" : "Company Workshop"}
      </div>
      <h1 style={{ fontSize: 26, fontWeight: 800, color: C.greenBanner, fontFamily: F, lineHeight: 1.2, marginBottom: 4 }}>{EVENT.title}</h1>
      <div style={{ fontSize: 15, color: C.textLight, fontStyle: "italic", fontFamily: F, marginBottom: 16 }}>{EVENT.titleKi}</div>
      <div style={{ background: C.bg, border: `1.5px solid ${C.border}`, borderLeft: `5px solid ${C.blue}`, borderRadius: C.radius, padding: "14px 16px", marginBottom: 12 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 18, width: 24, textAlign: "center", flexShrink: 0 }}>&#128197;</span>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.text, fontFamily: F }}>{EVENT.date}</div>
              <div style={{ fontSize: 13, color: C.textLight, fontFamily: F }}>{EVENT.time} · {EVENT.duration}</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 18, width: 24, textAlign: "center", flexShrink: 0 }}>&#128205;</span>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.text, fontFamily: F }}>{EVENT.location}</div>
              <a href={EVENT.mapUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: C.blue, fontFamily: F, textDecoration: "none", fontWeight: 600 }}>View on map &rarr;</a>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 18, width: 24, textAlign: "center", flexShrink: 0 }}>&#9200;</span>
            <div style={{ fontSize: 13, color: C.textLight, fontFamily: F }}>
              Registration closes <strong style={{ color: C.text }}>{EVENT.registrationCutoff}</strong>
            </div>
          </div>
        </div>
      </div>
      <div style={{
        background: full ? C.redLight : almostFull ? C.amberBg : C.blueLight,
        borderLeft: `4px solid ${full ? C.red : almostFull ? C.amber : C.blue}`,
        borderRadius: C.radius, padding: "10px 14px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ fontSize: 14, fontWeight: 600, fontFamily: F, color: full ? C.red : almostFull ? C.amber : C.blue }}>
          {full ? "This session is full" : almostFull ? `Only ${spotsLeft} spots remaining` : `${spotsLeft} of ${EVENT.capacity} spots available`}
        </div>
        <div style={{ width: 80, height: 6, background: "rgba(0,0,0,0.08)", borderRadius: 3, overflow: "hidden" }}>
          <div style={{ height: "100%", borderRadius: 3, width: `${(EVENT.registered / EVENT.capacity) * 100}%`, background: full ? C.red : almostFull ? C.amber : C.blue }} />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   DESCRIPTION
   ═══════════════════════════════════════════ */
function Description() {
  return (
    <section style={{ marginBottom: 24 }}>
      <h2 style={{ fontSize: 18, fontWeight: 700, color: C.greenBanner, fontFamily: F, marginBottom: 8 }}>What happens at the workshop</h2>
      <p style={{ fontSize: 15, color: C.text, lineHeight: 1.65, fontFamily: F, marginBottom: 6 }}>{EVENT.description}</p>
      <p style={{ fontSize: 13, color: C.textLight, fontStyle: "italic", lineHeight: 1.5, fontFamily: F }}>{EVENT.descriptionKi}</p>
    </section>
  );
}

/* ═══════════════════════════════════════════
   PREPARATION WIZARD + REGISTRATION
   ═══════════════════════════════════════════ */
function PrepWizard() {
  const [step, setStep] = useState(0);
  const [connection, setConnection] = useState(null);
  const [ownerCount, setOwnerCount] = useState(null);
  const [directorCount, setDirectorCount] = useState(null);
  const [shareholderCount, setShareholderCount] = useState(null);
  const [checks, setChecks] = useState({});
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [entityName, setEntityName] = useState("");
  const [regNumber, setRegNumber] = useState("");

  const setCheck = (key, val) => setChecks(prev => ({ ...prev, [key]: val }));

  if (!EVENT.registrationOpen || EVENT.registered >= EVENT.capacity) {
    return (
      <section style={{ marginBottom: 24 }}>
        <div style={{ background: C.redLight, border: `1.5px solid ${C.red}`, borderRadius: C.radius, padding: "20px 16px", textAlign: "center" }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: C.red, fontFamily: F, marginBottom: 4 }}>Registration is closed</div>
          <div style={{ fontSize: 14, color: C.textMid, fontFamily: F, lineHeight: 1.5 }}>This session is full. You can still re-register on your own using the online guide.</div>
          <a href="https://business.gov.ki/rereg-guide.html" style={{ display: "inline-block", marginTop: 12, padding: "10px 20px", background: C.blue, color: "#fff", borderRadius: "4px", fontSize: 14, fontWeight: 700, fontFamily: F, textDecoration: "none" }}>
            Go to the re-registration guide &rarr;
          </a>
        </div>
      </section>
    );
  }

  /* ─── Q1: Connection ─── */
  if (step === 0) {
    return (
      <section style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: C.greenBanner, fontFamily: F, marginBottom: 4 }}>Register and prepare</h2>
        <p style={{ fontSize: 14, color: C.textLight, fontFamily: F, marginBottom: 14, lineHeight: 1.4 }}>Answer a few questions so we can tell you exactly what to bring.</p>
        <div style={{ background: C.bg, border: `1.5px solid ${C.border}`, borderTop: `4px solid ${C.blue}`, borderRadius: C.radius, padding: "16px", boxShadow: C.shadow }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.textLight, fontFamily: F, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 4 }}>Question 1 of 3</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: C.text, fontFamily: F, marginBottom: 14 }}>What is your connection to this {entWord}?</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <OptionButton selected={connection === "owner"} onClick={() => setConnection("owner")}>
              <div style={{ fontSize: 15, fontWeight: 600, color: C.text, fontFamily: F }}>I am {isBN ? "an owner" : "a director"}</div>
              <div style={{ fontSize: 12, color: C.textLight, fontFamily: F, marginTop: 2 }}>Recommended \u2014 fastest path</div>
            </OptionButton>
            <OptionButton selected={connection === "agent"} onClick={() => setConnection("agent")}>
              <div style={{ fontSize: 15, fontWeight: 600, color: C.text, fontFamily: F }}>I am an employee or authorised agent</div>
              <div style={{ fontSize: 12, color: C.textLight, fontFamily: F, marginTop: 2 }}>You will need additional evidence</div>
            </OptionButton>
          </div>
          {connection && (
            <button onClick={() => setStep(1)} style={{ width: "100%", marginTop: 14, padding: "12px 16px", fontSize: 15, fontWeight: 700, fontFamily: F, background: C.blue, color: "#fff", border: `2px solid ${C.blue}`, borderRadius: "4px", cursor: "pointer", minHeight: 48 }}>
              Continue
            </button>
          )}
        </div>
      </section>
    );
  }

  /* ─── Q2: How many people ─── */
  if (step === 1) {
    const hasAnswer = isBN ? ownerCount !== null : (directorCount !== null && shareholderCount !== null);
    const NumberPicker = ({ value, onChange, label }) => (
      <div style={{ marginBottom: 12 }}>
        {label && <div style={{ fontSize: 14, fontWeight: 600, color: C.text, fontFamily: F, marginBottom: 6 }}>{label}</div>}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {[1, 2, 3, 4, 5].map(n => (
            <button key={n} onClick={() => onChange(n)} style={{
              width: 48, height: 48, borderRadius: C.radius, fontFamily: F, fontSize: 16, fontWeight: 700,
              background: value === n ? C.blueLight : C.bg, border: value === n ? `2px solid ${C.blue}` : `1.5px solid ${C.border}`,
              color: value === n ? C.blue : C.text, cursor: "pointer",
            }}>{n}{n === 5 ? "+" : ""}</button>
          ))}
        </div>
      </div>
    );
    return (
      <section style={{ marginBottom: 24 }}>
        <div style={{ background: C.bg, border: `1.5px solid ${C.border}`, borderTop: `4px solid ${C.blue}`, borderRadius: C.radius, padding: "16px", boxShadow: C.shadow }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.textLight, fontFamily: F, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 4 }}>Question 2 of 3</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: C.text, fontFamily: F, marginBottom: 14 }}>
            {isBN ? "How many owners does your business name have?" : "How many directors and shareholders does your company have?"}
          </div>
          {isBN
            ? <NumberPicker value={ownerCount} onChange={setOwnerCount} />
            : <><NumberPicker value={directorCount} onChange={setDirectorCount} label="Directors" /><NumberPicker value={shareholderCount} onChange={setShareholderCount} label="Shareholders" /></>
          }
          {hasAnswer && (
            <button onClick={() => setStep(2)} style={{ width: "100%", marginTop: 6, padding: "12px 16px", fontSize: 15, fontWeight: 700, fontFamily: F, background: C.blue, color: "#fff", border: `2px solid ${C.blue}`, borderRadius: "4px", cursor: "pointer", minHeight: 48 }}>
              Continue
            </button>
          )}
        </div>
      </section>
    );
  }

  /* ─── Q3: Readiness checks ─── */
  const questions = [
    { key: "phone", q: "Do you have a smartphone (a phone that can access the internet) that you can bring to the workshop?" },
    { key: "photoId", q: "Do you have a current photo ID (passport, national ID, or licence)?" },
    { key: "email", q: "Do you have an email address you can access on your phone?" },
    { key: "regNum", q: `Do you know your ${entWord} registration number?` },
  ];
  if (isBN) {
    const oc = ownerCount || 1;
    questions.push({ key: "ownerDetails", q: `Do you have the full name, date of birth, nationality, and address for ${oc === 1 ? "your owner" : `all ${oc} owners`}?` });
  } else {
    questions.push({ key: "directorDetails", q: `Do you have the full name, date of birth, nationality, and address for ${(directorCount || 1) === 1 ? "your director" : `all ${directorCount} directors`}?` });
    questions.push({ key: "shareholderDetails", q: `Do you have the full name, address, and share details for ${(shareholderCount || 1) === 1 ? "your shareholder" : `all ${shareholderCount} shareholders`}?` });
    questions.push({ key: "constitution", q: "Have you decided which company constitution to adopt?" });
  }
  if (connection === "agent") {
    questions.push({ key: "authority", q: `Do you have a signed letter of authority from the ${ownWord} and a copy of the ${ownWord}\u2019s photo ID?` });
  }

  if (step === 2) {
    const allAnswered = questions.every(q => checks[q.key] !== undefined);
    return (
      <section style={{ marginBottom: 24 }}>
        <div style={{ background: C.bg, border: `1.5px solid ${C.border}`, borderTop: `4px solid ${C.blue}`, borderRadius: C.radius, padding: "16px", boxShadow: C.shadow }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.textLight, fontFamily: F, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 4 }}>Question 3 of 3</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: C.text, fontFamily: F, marginBottom: 4 }}>Do you have everything you need?</div>
          <div style={{ fontSize: 13, color: C.textLight, fontFamily: F, marginBottom: 16, lineHeight: 1.4 }}>Answer honestly so we can tell you what to prepare before the workshop.</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {questions.map((q, i) => (
              <div key={i} style={{ padding: "10px 12px", background: checks[q.key] === true ? C.greenLight : checks[q.key] === false ? C.amberBg : "#fafafa", border: `1px solid ${checks[q.key] === true ? C.greenDark : checks[q.key] === false ? C.amber : C.borderGray}`, borderRadius: C.radius }}>
                <div style={{ fontSize: 14, color: C.text, fontFamily: F, fontWeight: 500, lineHeight: 1.4, marginBottom: 8 }}>{q.q}</div>
                <div style={{ display: "flex", gap: 8 }}>
                  {[true, false].map(val => (
                    <button key={String(val)} onClick={() => setCheck(q.key, val)} style={{
                      flex: 1, padding: "8px", fontSize: 14, fontWeight: 600, fontFamily: F, minHeight: 40, cursor: "pointer", borderRadius: "4px",
                      background: checks[q.key] === val ? (val ? C.greenDark : C.amber) : C.bg,
                      color: checks[q.key] === val ? "#fff" : C.text,
                      border: checks[q.key] === val ? `2px solid ${val ? C.greenDark : C.amber}` : `1.5px solid ${C.border}`,
                    }}>{val ? "Yes" : "No"}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {allAnswered && (
            <button onClick={() => setStep(3)} style={{ width: "100%", marginTop: 16, padding: "12px 16px", fontSize: 15, fontWeight: 700, fontFamily: F, background: C.blue, color: "#fff", border: `2px solid ${C.blue}`, borderRadius: "4px", cursor: "pointer", minHeight: 48 }}>
              See my results and register
            </button>
          )}
        </div>
      </section>
    );
  }

  /* ─── Readiness items for summary + confirmation ─── */
  const helpTexts = {
    phone: "Bring a smartphone (a phone that can access the internet), fully charged. Make sure you have mobile data credit in case WiFi is not available. Bring a charger if possible.",
    photoId: "You need a current passport, national ID, or driver licence. Get one before the workshop.",
    email: "You must have an email address before the workshop. Create a free Gmail account on your phone, or ask a family member to help you. Setting up email during the workshop slows everyone down.",
    regNum: "Check any old documents or call MTCIC to ask. We can also look it up at the workshop.",
    ownerDetails: `Gather the full name, date of birth, nationality, and residential address for each owner before the workshop. Without this you cannot complete the form \u2014 but you can still create your account and get authority to file.`,
    directorDetails: "Gather the full name, date of birth, nationality, and residential address for each director.",
    shareholderDetails: "Gather the full name, address, number of shares, and share class for each shareholder.",
    constitution: "Decide whether to adopt the model constitution (standard rules) or provide your own. Most small companies choose the model constitution.",
    authority: `Ask the ${ownWord} to write and sign a letter confirming you are authorised to act on behalf of the ${entWord}. You also need a copy of the ${ownWord}\u2019s photo ID. Bring both to the workshop.`,
  };
  const readinessItems = questions.map(q => ({
    key: q.key,
    label: q.key === "phone" ? "Smartphone with mobile data, fully charged"
      : q.key === "photoId" ? "Photo ID"
      : q.key === "email" ? "Email address"
      : q.key === "regNum" ? "Registration number"
      : q.key === "ownerDetails" ? `Details for ${ownerCount === 1 ? "1 owner" : `${ownerCount} owners`} (name, DOB, nationality, address)`
      : q.key === "directorDetails" ? `Details for ${directorCount === 1 ? "1 director" : `${directorCount} directors`}`
      : q.key === "shareholderDetails" ? `Share details for ${shareholderCount === 1 ? "1 shareholder" : `${shareholderCount} shareholders`}`
      : q.key === "constitution" ? "Company constitution decision"
      : q.key === "authority" ? `Letter of authority + ${ownWord}\u2019s photo ID`
      : q.q,
    ok: !!checks[q.key],
    help: helpTexts[q.key] || "",
  }));
  const missingCount = readinessItems.filter(i => !i.ok).length;
  const allReady = missingCount === 0;

  /* ─── Step 3: Summary + contact details ─── */
  if (step === 3) {
    const canSubmit = name.trim() && phone.trim() && entityName.trim();
    return (
      <section style={{ marginBottom: 24 }}>
        {/* Readiness summary */}
        <div style={{ background: allReady ? C.greenLight : C.amberBg, border: `2px solid ${allReady ? C.greenDark : C.amber}`, borderRadius: C.radius, padding: "16px", marginBottom: 16 }}>
          <div style={{ fontSize: 17, fontWeight: 700, color: allReady ? C.greenDark : C.amber, fontFamily: F, marginBottom: 4 }}>
            {allReady ? "You are ready for the workshop" : `You need to prepare ${missingCount} ${missingCount === 1 ? "item" : "items"}`}
          </div>
          <div style={{ fontSize: 13, color: C.text, fontFamily: F, lineHeight: 1.4, marginBottom: 12 }}>
            {allReady ? "You have everything you need. Register below to secure your place." : "You can still register and attend. The items marked below need your attention before the workshop."}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {readinessItems.map((item, i) => (
              <div key={i} style={{ background: C.bg, borderRadius: C.radius, padding: "10px 12px", border: `1px solid ${item.ok ? C.greenDark : C.amber}`, borderLeft: `4px solid ${item.ok ? C.greenDark : C.amber}` }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: C.text, fontFamily: F }}>{item.label}</div>
                  <StatusBadge ok={item.ok} />
                </div>
                {!item.ok && <div style={{ fontSize: 13, color: C.textMid, fontFamily: F, marginTop: 4, lineHeight: 1.5 }}>{item.help}</div>}
              </div>
            ))}
          </div>
        </div>

        {!allReady && (
          <div style={{ background: C.blueLight, borderLeft: `4px solid ${C.blue}`, borderRadius: C.radius, padding: "12px 14px", marginBottom: 16, fontSize: 14, color: C.text, fontFamily: F, lineHeight: 1.5 }}>
            <strong style={{ color: C.blue }}>Even if you are missing some items</strong>, you should still attend. At the workshop you can create your account and get authority to file \u2014 the steps that require MTCIC approval. You can complete the form later once you have gathered the missing details.
          </div>
        )}

        {/* Contact details */}
        <div style={{ background: C.bg, border: `1.5px solid ${C.border}`, borderTop: `4px solid ${C.blue}`, borderRadius: C.radius, padding: "16px", boxShadow: C.shadow }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: C.text, fontFamily: F, marginBottom: 12 }}>Your details</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: C.text, fontFamily: F, marginBottom: 4 }}>Your full name <span style={{ color: C.red }}>*</span></label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Teramira Tabai" style={inputStyle} {...focusHandlers} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: C.text, fontFamily: F, marginBottom: 4 }}>Phone number <span style={{ color: C.red }}>*</span></label>
              <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="e.g. +686 75512345" style={inputStyle} {...focusHandlers} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: C.text, fontFamily: F, marginBottom: 4 }}>Your {entWord} name <span style={{ color: C.red }}>*</span></label>
              <input type="text" value={entityName} onChange={e => setEntityName(e.target.value)} placeholder={isBN ? "e.g. Tarawa Fresh Fish" : "e.g. Pacific Holdings Ltd"} style={inputStyle} {...focusHandlers} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: C.text, fontFamily: F, marginBottom: 4 }}>Registration number <span style={{ fontSize: 12, fontWeight: 400, color: C.textLight }}>(if you know it)</span></label>
              <input type="text" value={regNumber} onChange={e => setRegNumber(e.target.value)} placeholder={`e.g. ${isBN ? "BN" : "CO"}-12345`} style={inputStyle} {...focusHandlers} />
            </div>
          </div>
          <button onClick={() => { if (canSubmit) setStep(4); }} disabled={!canSubmit} style={{
            width: "100%", marginTop: 18, padding: "14px 20px", fontSize: 16, fontWeight: 700, fontFamily: F,
            background: canSubmit ? C.greenDark : "#e0e0e0", color: canSubmit ? "#fff" : "#999",
            border: `2px solid ${canSubmit ? C.greenDark : "#e0e0e0"}`, borderRadius: "4px",
            cursor: canSubmit ? "pointer" : "not-allowed", minHeight: 52,
          }}>Register for this workshop</button>
          <div style={{ fontSize: 12, color: C.textLight, fontFamily: F, marginTop: 8, lineHeight: 1.4, textAlign: "center" }}>
            Your details will be shared with MTCIC to manage workshop attendance. They will not be used for any other purpose.
          </div>
        </div>
      </section>
    );
  }

  /* ─── Step 4: Confirmation ─── */
  if (step === 4) {
    return (
      <section style={{ marginBottom: 24 }}>
        <div style={{ background: C.greenLight, border: `2px solid ${C.greenDark}`, borderRadius: C.radius, padding: "24px 16px" }}>
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>&#9989;</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: C.greenDark, fontFamily: F, marginBottom: 6 }}>
              You are registered{name ? `, ${name.split(" ")[0]}` : ""}
            </div>
            <div style={{ fontSize: 14, color: C.text, fontFamily: F, lineHeight: 1.6 }}><strong>{EVENT.date}</strong> at <strong>{EVENT.time}</strong></div>
            <div style={{ fontSize: 14, color: C.text, fontFamily: F }}>{EVENT.location}</div>
          </div>
          <div style={{ background: C.bg, borderRadius: C.radius, padding: "14px 16px", border: `1px solid ${C.border}` }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.greenDark, fontFamily: F, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.04em" }}>
              Your checklist for {entityName || `your ${entWord}`}
            </div>
            {readinessItems.map((item, i) => (
              <div key={i} style={{ fontSize: 14, color: C.text, fontFamily: F, padding: "4px 0", display: "flex", gap: 8, lineHeight: 1.4 }}>
                <span style={{ color: item.ok ? C.greenDark : C.amber, fontWeight: 700, flexShrink: 0 }}>{item.ok ? "\u2713" : "\u26A0"}</span>
                <span>{item.label}{!item.ok && <span style={{ color: C.amber, fontWeight: 600, fontSize: 12 }}> \u2014 prepare this</span>}</span>
              </div>
            ))}
          </div>
          {connection === "agent" && (
            <div style={{ marginTop: 12, background: C.amberBg, borderLeft: `4px solid ${C.amber}`, borderRadius: C.radius, padding: "10px 14px", fontSize: 13, color: C.amber, fontWeight: 600, fontFamily: F, lineHeight: 1.5 }}>
              As an employee or agent, you will need to provide additional evidence at the workshop. Make sure you have your letter of authority.
            </div>
          )}
          <div style={{ marginTop: 14, textAlign: "center", fontSize: 14, color: C.blue, fontWeight: 600, fontFamily: F }}>
            Screenshot this page to remember what to bring.
          </div>
        </div>
      </section>
    );
  }

  return null;
}

/* ═══════════════════════════════════════════
   NOT SURE / FOOTER
   ═══════════════════════════════════════════ */
function NotSure() {
  return (
    <section style={{ background: C.bg, border: `1.5px solid ${C.border}`, borderRadius: C.radius, padding: "16px", marginBottom: 24 }}>
      <h3 style={{ fontSize: 15, fontWeight: 700, color: C.greenBanner, fontFamily: F, marginBottom: 6 }}>Not sure if you need to re-register?</h3>
      <p style={{ fontSize: 14, color: C.text, lineHeight: 1.55, fontFamily: F, marginBottom: 10 }}>
        If you registered your {entWord} before the new {isBN ? "Business Names Act 2021" : "Companies Act 2021"} came into effect, you must re-register by 31 March 2027 or it will be removed from the register.
      </p>
      <a href="https://business.gov.ki/rereg-guide.html" style={{ fontSize: 14, fontWeight: 600, color: C.blue, fontFamily: F, textDecoration: "none" }}>Learn more about re-registration &rarr;</a>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: "#222", color: "#fff", padding: "20px 16px", fontFamily: F }}>
      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>Contact MTCIC</div>
      <div style={{ fontSize: 13, color: "#ccc", lineHeight: 1.6, marginBottom: 12 }}>Phone: [to be confirmed]<br />Email: [to be confirmed]</div>
      <div style={{ borderTop: "1px solid #444", paddingTop: 12, fontSize: 12, color: "#999", lineHeight: 1.6 }}>
        Ministry of Tourism, Commerce, Industry and Cooperatives · Kiribati<br />
        <a href="https://business.gov.ki" style={{ color: C.gold, textDecoration: "none", fontWeight: 600 }}>business.gov.ki</a>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════
   APP
   ═══════════════════════════════════════════ */
export default function WorkshopPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#f4f4f4", fontFamily: F }}>
      <Header />
      <main style={{ maxWidth: 640, margin: "0 auto", padding: "20px 16px 0" }}>
        <EventHeader />
        <Description />
        <PrepWizard />
        <NotSure />
      </main>
      <Footer />
    </div>
  );
}
