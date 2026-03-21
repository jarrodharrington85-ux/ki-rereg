import { useState, useEffect } from "react";

const C = {
  greenDark: "#146151",
  greenBanner: "#1E5F53",
  greenLight: "#e8f5e9",
  blue: "#0052cc",
  blueLight: "#eaf4ff",
  gold: "#FFE066",
  red: "#A3262A",
  redLight: "#fce8e8",
  amber: "#92400e",
  amberBg: "#fff8e6",
  bg: "#fff",
  text: "#333",
  textMid: "#555",
  textLight: "#666",
  border: "#ddd",
  borderGray: "#eee",
};
const F = `-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif`;

/* ─── QR Code generator (simple SVG-based) ─── */
function QRPlaceholder({ url, size = 180 }) {
  // In production, use qrcode.js or similar. This renders a placeholder with the URL.
  const cells = 21;
  const cellSize = size / cells;
  // Generate a deterministic pattern from the URL for visual interest
  const hash = (s) => { let h = 0; for (let i = 0; i < s.length; i++) { h = ((h << 5) - h + s.charCodeAt(i)) | 0; } return Math.abs(h); };
  const seed = hash(url);
  const pattern = [];
  for (let r = 0; r < cells; r++) {
    for (let c = 0; c < cells; c++) {
      // Finder patterns (top-left, top-right, bottom-left)
      const inFinder = (r < 7 && c < 7) || (r < 7 && c >= cells - 7) || (r >= cells - 7 && c < 7);
      const onFinderBorder = inFinder && (r === 0 || r === 6 || c === 0 || c === 6 || (r >= cells - 7 && (r === cells - 7 || r === cells - 1)) || (c >= cells - 7 && (c === cells - 7 || c === cells - 1)));
      const inFinderCenter = inFinder && r >= 2 && r <= 4 && c >= 2 && c <= 4 && !(r >= cells - 7) || (r >= cells - 5 && r <= cells - 3 && c >= 2 && c <= 4) || (r >= 2 && r <= 4 && c >= cells - 5 && c <= cells - 3);
      if (inFinder) {
        const isOuter = r % 6 === 0 || c % 6 === 0 || (r < 7 && (r === 0 || r === 6)) || (c < 7 && (c === 0 || c === 6));
        const ri = r >= cells - 7 ? r - (cells - 7) : r;
        const ci = c >= cells - 7 ? c - (cells - 7) : c;
        const border = ri === 0 || ri === 6 || ci === 0 || ci === 6;
        const inner = ri >= 2 && ri <= 4 && ci >= 2 && ci <= 4;
        if (border || inner) pattern.push({ r, c, fill: true });
      } else {
        // Pseudo-random data pattern
        const v = ((seed * (r * cells + c + 1)) >> 3) & 1;
        if (v) pattern.push({ r, c, fill: true });
      }
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ border: "4px solid #000", borderRadius: 4, background: "#fff" }}>
        {pattern.map((p, i) => (
          <rect key={i} x={p.c * cellSize} y={p.r * cellSize} width={cellSize} height={cellSize} fill="#000" />
        ))}
      </svg>
      <div style={{ fontSize: 13, color: C.textLight, fontFamily: F, textAlign: "center", maxWidth: size, wordBreak: "break-all", lineHeight: 1.4 }}>
        {url}
      </div>
    </div>
  );
}

/* ─── Steps data ─── */
const STEPS = [
  {
    stage: "Welcome",
    stageIcon: "1",
    stageColor: C.greenDark,
    title: "Welcome to the re-registration workshop",
    subtitle: "Te workshop ibukin te manga-rejita",
    instruction: "Welcome everyone. Today we will re-register your business name or company together, step by step. You will need your phone, your business registration number, and a photo ID.",
    isWelcome: true,
    tips: [
      "Ask everyone to turn on their phone and connect to WiFi if available",
      "Check that everyone has their photo ID ready",
      "Ask who has a business name vs a company — they will use different forms",
    ],
  },
  {
    stage: "Get set up",
    stageIcon: "1",
    stageColor: C.blue,
    title: "Create your online account",
    subtitle: "Karaoa am account",
    instruction: "Everyone scan this QR code to open the account creation page. Fill in your name, email, and address. Upload a photo of your ID.",
    qrUrl: "https://business.gov.ki/public/setupaccount.aspx",
    qrLabel: "Account creation page",
    waitNote: "MTCIC must approve each account before the next step. If a registry officer is present, ask them to approve accounts now.",
    problems: [
      { q: "\"I don't have an email address\"", a: "Help them create a free Gmail account on their phone first. They need an email to receive approval notifications." },
      { q: "\"My photo ID is blurry\"", a: "The photo must be clear and readable. Take it in good light, hold the phone steady, and make sure all text on the ID is visible." },
      { q: "\"I already have an account\"", a: "Great — they can skip this step. Ask them to log in and wait for the next step." },
    ],
  },
  {
    stage: "Get set up",
    stageIcon: "2",
    stageColor: C.blue,
    title: "Connect your account to your business",
    subtitle: "Kabooa am account ma am bitineti",
    instruction: "Everyone scan this QR code to log in. Search for your business name or company by name or registration number. Tap on it, then tap the blue REQUEST ENTITY AUTHORITY button.",
    qrUrl: "https://business.gov.ki/public/login.aspx",
    qrLabel: "Registry login page",
    waitNote: "MTCIC must approve each authority request. If a registry officer is present, ask them to approve these now.",
    highlight: "REQUEST ENTITY AUTHORITY",
    problems: [
      { q: "\"I can't find my business\"", a: "Try searching by registration number instead of name. Check for spelling differences. If it still doesn't appear, ask the MTCIC officer for help." },
      { q: "\"What do I write for the reason?\"", a: "Write: \"I am the owner of this business name and I am applying to re-register.\" For companies, replace \"owner\" with \"director.\"" },
      { q: "\"What proof do I upload?\"", a: "Owners and directors: upload your photo ID. Employees or agents: upload your ID plus a letter of authority from the owner or director." },
    ],
  },
  {
    stage: "Complete the form",
    stageIcon: "3",
    stageColor: "#448040",
    title: "Fill in the re-registration form",
    subtitle: "Kaonobwaia te form ibukin te manga-rejita",
    instruction: "Everyone scan this QR code to open the online form. The form will ask for your business details step by step. Fill in everything and save the completed form as a PDF to your phone.",
    qrUrl: "https://business.gov.ki/bn-forms.html",
    qrLabel: "Business name form (BN-0)",
    altQr: { url: "https://business.gov.ki/co-forms.html", label: "Company form (CO-0)" },
    problems: [
      { q: "\"I don't know my registration number\"", a: "Search the registry at business.gov.ki — it's listed on your entity page." },
      { q: "\"How do I save the PDF?\"", a: "On Android: the file saves to your Downloads folder automatically. On iPhone: tap the share icon, then 'Save to Files'." },
      { q: "\"The form won't load\"", a: "Check your internet connection. The form needs to load once, then it works even if the connection drops." },
    ],
  },
  {
    stage: "Upload and submit",
    stageIcon: "4",
    stageColor: C.amber,
    title: "Upload your form to the registry",
    subtitle: "Upload am form nakoia te registry",
    instruction: "Everyone scan this QR code to log in. Go to My Entities, tap your business name or company, then tap the green RE-REGISTER button. Upload the PDF you just saved, add any supporting documents, and tap SUBMIT.",
    qrUrl: "https://business.gov.ki/public/login.aspx",
    qrLabel: "Registry login page",
    highlight: "RE-REGISTER",
    problems: [
      { q: "\"I can't find the PDF on my phone\"", a: "On Android: check Downloads folder. On iPhone: check the Files app under 'On My iPhone' or 'Downloads'." },
      { q: "\"Do I have to pay?\"", a: "No. Re-registration is completely free. Tap CHECKOUT to finish — there is nothing to pay." },
      { q: "\"It says my form has errors\"", a: "Go back to the form builder and check the fields marked in red. Fix them, save a new PDF, and upload that one instead." },
    ],
  },
  {
    stage: "Done",
    stageIcon: "✓",
    stageColor: "#448040",
    title: "Workshop complete",
    subtitle: "E a tia te workshop",
    instruction: "Well done! Everyone has submitted their re-registration. MTCIC will check each form and send an email when the re-registration is complete. If there are any problems, MTCIC will contact you.",
    isDone: true,
    tips: [
      "Remind everyone that they must also submit an annual return every year after re-registering",
      "If anyone also has a business name to re-register (in addition to a company), they should repeat the process using form BN-0",
      "Hand out the MTCIC contact details for anyone who has follow-up questions",
    ],
  },
];

/* ─── Components ─── */

function StageBar({ steps, current }) {
  return (
    <div style={{ display: "flex", gap: 4, padding: "0 24px", marginBottom: 24 }}>
      {steps.map((_, i) => (
        <div key={i} style={{
          flex: 1, height: 6, borderRadius: 3,
          background: i < current ? "#448040" : i === current ? C.blue : "#e0e0e0",
          transition: "background 0.3s ease",
        }} />
      ))}
    </div>
  );
}

function ProblemCard({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid ${C.borderGray}` }}>
      <button onClick={() => setOpen(!open)} style={{
        width: "100%", textAlign: "left", background: "none", border: "none",
        padding: "12px 0", cursor: "pointer", fontFamily: F,
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
      }}>
        <span style={{ fontSize: 16, color: C.text, fontWeight: 600 }}>{q}</span>
        <span style={{ fontSize: 18, color: C.textLight, flexShrink: 0, transform: open ? "rotate(180deg)" : "", transition: "transform 0.2s" }}>&#9662;</span>
      </button>
      {open && (
        <div style={{ fontSize: 15, color: C.textMid, lineHeight: 1.6, paddingBottom: 12, fontFamily: F }}>
          {a}
        </div>
      )}
    </div>
  );
}

function StepView({ step, stepNum, total, onPrev, onNext }) {
  return (
    <div style={{ padding: "0 24px 24px" }}>
      {/* Stage badge + step count */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: step.stageColor, color: "#fff",
          padding: "6px 16px", borderRadius: 4,
          fontSize: 14, fontWeight: 700, fontFamily: F,
        }}>
          <span style={{
            width: 24, height: 24, borderRadius: "50%",
            background: "rgba(255,255,255,0.25)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, fontWeight: 800,
          }}>{step.stageIcon}</span>
          {step.stage}
        </div>
        <div style={{ fontSize: 15, color: C.textLight, fontFamily: F }}>
          Step {stepNum} of {total}
        </div>
      </div>

      {/* Title */}
      <h1 style={{ fontSize: 36, fontWeight: 800, color: C.greenBanner, fontFamily: F, lineHeight: 1.2, marginBottom: 4 }}>
        {step.title}
      </h1>
      <div style={{ fontSize: 18, color: C.textLight, fontStyle: "italic", fontFamily: F, marginBottom: 20 }}>
        {step.subtitle}
      </div>

      {/* Instruction */}
      <div style={{
        fontSize: 20, color: C.text, lineHeight: 1.65, fontFamily: F, marginBottom: 24,
        maxWidth: 720,
      }}>
        {step.instruction}
      </div>

      {/* Welcome/Done: tips list */}
      {step.tips && (
        <div style={{
          background: C.blueLight, borderLeft: `5px solid ${C.blue}`,
          borderRadius: 6, padding: "18px 20px", marginBottom: 24,
        }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: C.blue, fontFamily: F, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.04em" }}>
            {step.isWelcome ? "Before you begin" : "Reminders"}
          </div>
          {step.tips.map((t, i) => (
            <div key={i} style={{ fontSize: 16, color: C.text, lineHeight: 1.6, fontFamily: F, padding: "4px 0", display: "flex", gap: 10 }}>
              <span style={{ color: C.blue, fontWeight: 700, flexShrink: 0 }}>&#10003;</span>
              <span>{t}</span>
            </div>
          ))}
        </div>
      )}

      {/* QR code + highlight */}
      {step.qrUrl && (
        <div style={{ display: "flex", gap: 32, alignItems: "flex-start", flexWrap: "wrap", marginBottom: 24 }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.textLight, fontFamily: F, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 8 }}>
              Scan with your phone
            </div>
            <QRPlaceholder url={step.qrUrl} size={200} />
            <div style={{ fontSize: 13, fontWeight: 600, color: C.text, fontFamily: F, marginTop: 6, textAlign: "center" }}>
              {step.qrLabel}
            </div>
          </div>

          {step.altQr && (
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.textLight, fontFamily: F, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 8 }}>
                For companies
              </div>
              <QRPlaceholder url={step.altQr.url} size={200} />
              <div style={{ fontSize: 13, fontWeight: 600, color: C.text, fontFamily: F, marginTop: 6, textAlign: "center" }}>
                {step.altQr.label}
              </div>
            </div>
          )}

          {step.highlight && (
            <div style={{ flex: 1, minWidth: 240 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.textLight, fontFamily: F, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 8 }}>
                Look for this button
              </div>
              <div style={{
                display: "inline-block",
                background: step.highlight === "RE-REGISTER" ? "#448040" : C.blue,
                color: "#fff", padding: "14px 28px", borderRadius: 4,
                fontSize: 18, fontWeight: 700, fontFamily: F,
              }}>
                {step.highlight}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Wait note */}
      {step.waitNote && (
        <div style={{
          background: C.amberBg, borderLeft: `5px solid ${C.amber}`,
          borderRadius: 6, padding: "16px 20px", marginBottom: 24,
        }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: C.amber, fontFamily: F, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 4 }}>
            Wait for approval
          </div>
          <div style={{ fontSize: 16, color: C.text, lineHeight: 1.6, fontFamily: F }}>
            {step.waitNote}
          </div>
        </div>
      )}

      {/* Common problems */}
      {step.problems && (
        <div style={{
          background: C.bg, border: `1.5px solid ${C.border}`,
          borderRadius: 6, padding: "16px 20px", marginBottom: 24,
        }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: C.text, fontFamily: F, marginBottom: 8 }}>
            Common problems
          </div>
          {step.problems.map((p, i) => <ProblemCard key={i} q={p.q} a={p.a} />)}
        </div>
      )}

      {/* Done panel */}
      {step.isDone && (
        <div style={{
          background: C.greenLight, border: `2px solid ${C.greenDark}`,
          borderRadius: 6, padding: "24px", textAlign: "center", marginBottom: 24,
        }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>&#9989;</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.greenDark, fontFamily: F }}>
            All applications submitted
          </div>
          <div style={{ fontSize: 16, color: C.textMid, fontFamily: F, marginTop: 8, lineHeight: 1.6 }}>
            MTCIC will check each form and email everyone when their re-registration is complete.
          </div>
        </div>
      )}

      {/* Navigation */}
      <div style={{ display: "flex", gap: 12, marginTop: 24, borderTop: `1px solid ${C.borderGray}`, paddingTop: 20 }}>
        <button
          onClick={onPrev}
          disabled={stepNum === 1}
          style={{
            padding: "16px 32px", borderRadius: 4, fontFamily: F,
            fontSize: 16, fontWeight: 700, minHeight: 56,
            cursor: stepNum === 1 ? "not-allowed" : "pointer",
            background: C.bg, color: stepNum === 1 ? "#ccc" : C.blue,
            border: `2px solid ${stepNum === 1 ? "#e0e0e0" : C.blue}`,
          }}
        >
          &larr; Previous step
        </button>
        <div style={{ flex: 1 }} />
        <button
          onClick={onNext}
          disabled={stepNum === total}
          style={{
            padding: "16px 40px", borderRadius: 4, fontFamily: F,
            fontSize: 16, fontWeight: 700, minHeight: 56,
            cursor: stepNum === total ? "not-allowed" : "pointer",
            background: stepNum === total ? "#e0e0e0" : C.blue,
            color: stepNum === total ? "#999" : "#fff",
            border: `2px solid ${stepNum === total ? "#e0e0e0" : C.blue}`,
          }}
        >
          {stepNum === total ? "Workshop complete" : "Next step \u2192"}
        </button>
      </div>
    </div>
  );
}

/* ─── App ─── */
export default function FacilitatorMode() {
  const [current, setCurrent] = useState(0);

  return (
    <div style={{ minHeight: "100vh", background: "#f4f4f4", fontFamily: F }}>
      {/* Header */}
      <div style={{
        background: C.greenDark, borderBottom: "4px solid #002a2b",
        padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 40, height: 40, borderRadius: "50%",
            background: "rgba(255,255,255,0.12)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: C.gold, fontSize: 14, fontWeight: 800, fontFamily: F,
          }}>Ki</div>
          <div>
            <div style={{ color: C.gold, fontSize: 18, fontWeight: 700, fontFamily: F }}>business.gov.ki</div>
            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, fontFamily: F }}>Re-Registration Workshop</div>
          </div>
        </div>
        <div style={{
          background: "rgba(255,255,255,0.15)", borderRadius: 4,
          padding: "6px 14px", fontSize: 13, fontWeight: 600, color: C.gold, fontFamily: F,
        }}>
          Facilitator Mode
        </div>
      </div>

      {/* Progress */}
      <div style={{ paddingTop: 20 }}>
        <StageBar steps={STEPS} current={current} />
      </div>

      {/* Current step */}
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <StepView
          step={STEPS[current]}
          stepNum={current + 1}
          total={STEPS.length}
          onPrev={() => setCurrent(Math.max(0, current - 1))}
          onNext={() => setCurrent(Math.min(STEPS.length - 1, current + 1))}
        />
      </div>
    </div>
  );
}
