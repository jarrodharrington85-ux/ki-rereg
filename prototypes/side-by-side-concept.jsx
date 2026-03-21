import { useState } from "react";

const C = {
  greenDark: "#146151",
  blue: "#0052cc",
  blueLight: "#eaf4ff",
  gold: "#FFE066",
  text: "#333",
  textLight: "#666",
  bg: "#fff",
  borderLight: "#ddd",
  borderGray: "#eee",
  red: "#A3262A",
  amber: "#92400e",
  amberBg: "#fff8e6",
};
const F = `-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif`;

/* ─── Walkthrough steps with matching registry "screen" ─── */
const STEPS = [
  {
    id: 1,
    stage: "Get set up",
    stageColor: C.blue,
    title: "Find your business name",
    instruction: "Log in to your account. Use the search to find your business name by name or registration number.",
    registryScreen: "search",
  },
  {
    id: 2,
    stage: "Get set up",
    stageColor: C.blue,
    title: "Request authority",
    instruction: 'On the entity page, tap the blue REQUEST ENTITY AUTHORITY button.',
    highlight: "REQUEST ENTITY AUTHORITY",
    registryScreen: "entity",
  },
  {
    id: 3,
    stage: "Get set up",
    stageColor: C.blue,
    title: "Upload your proof",
    instruction: "Enter your reason for requesting authority. Upload your photo ID. Then tap REQUEST.",
    registryScreen: "authority-form",
  },
  {
    id: 4,
    stage: "Upload and submit",
    stageColor: C.amber,
    title: "Find your business in My Entities",
    instruction: "After MTCIC approves your authority, log in and go to My Entities. Tap your business name.",
    registryScreen: "my-entities",
  },
  {
    id: 5,
    stage: "Upload and submit",
    stageColor: C.amber,
    title: "Tap RE-REGISTER",
    instruction: "On the entity page, tap the green RE-REGISTER button.",
    highlight: "RE-REGISTER",
    registryScreen: "entity-rereg",
  },
  {
    id: 6,
    stage: "Upload and submit",
    stageColor: C.amber,
    title: "Upload your form",
    instruction: "Upload your completed BN-0 form (the PDF you saved). Add any supporting documents. Tap SUBMIT.",
    registryScreen: "upload",
  },
];

/* ─── Simplified registry screen mockups ─── */
function RegistryMasthead() {
  return (
    <div style={{ background: C.greenDark, padding: "8px 10px", display: "flex", alignItems: "center", gap: 6, borderBottom: "2px solid #002a2b" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <div style={{ width: 12, height: 1.5, background: C.gold, borderRadius: 1 }} />
        <div style={{ width: 12, height: 1.5, background: C.gold, borderRadius: 1 }} />
        <div style={{ width: 12, height: 1.5, background: C.gold, borderRadius: 1 }} />
      </div>
      <span style={{ fontSize: 11, fontWeight: 700, color: C.gold, fontFamily: F }}>business.gov.ki</span>
    </div>
  );
}

function RegistryScreen({ screen, highlight }) {
  const labelStyle = { fontSize: 8, color: C.textLight, fontFamily: F, marginBottom: 2 };
  const inputStyle = { width: "100%", height: 22, background: "#f5f5f5", border: `1px solid ${C.borderLight}`, borderRadius: 3, marginBottom: 6 };
  const btnBlue = { background: C.blue, color: "#fff", border: "none", borderRadius: 3, padding: "5px 10px", fontSize: 8, fontWeight: 700, fontFamily: F, width: "100%", textAlign: "center" };
  const btnGreen = { ...btnBlue, background: "#448040" };
  const hlRing = highlight ? { outline: `2px solid ${C.blue}`, outlineOffset: 2, position: "relative" } : {};

  return (
    <div style={{ background: C.bg, height: "100%", display: "flex", flexDirection: "column" }}>
      <RegistryMasthead />
      <div style={{ flex: 1, padding: 8, overflow: "hidden", fontSize: 9, fontFamily: F, color: C.text }}>
        {screen === "search" && (<>
          <div style={{ fontWeight: 700, fontSize: 10, marginBottom: 6 }}>Entity Search</div>
          <div style={labelStyle}>Search by name or number</div>
          <div style={inputStyle} />
          <div style={{ ...btnBlue, width: "auto", display: "inline-block", padding: "4px 12px" }}>Search</div>
          <div style={{ marginTop: 8, borderTop: `1px solid ${C.borderGray}`, paddingTop: 6 }}>
            <div style={{ padding: "6px 0", borderBottom: `1px solid ${C.borderGray}`, display: "flex", justifyContent: "space-between" }}>
              <div><div style={{ fontWeight: 600, fontSize: 9 }}>Tarawa Fresh Fish</div><div style={{ fontSize: 7, color: C.textLight }}>BN-12345 · Business Name</div></div>
              <div style={{ color: C.blue, fontSize: 8 }}>View</div>
            </div>
          </div>
        </>)}

        {screen === "entity" && (<>
          <div style={{ fontWeight: 700, fontSize: 10, marginBottom: 2 }}>Tarawa Fresh Fish</div>
          <div style={{ fontSize: 7, color: C.textLight, marginBottom: 8 }}>BN-12345 · Registered</div>
          <div style={{ background: "#f9f9f9", border: `1px solid ${C.borderGray}`, borderRadius: 3, padding: 6, marginBottom: 6 }}>
            <div style={{ fontSize: 7, color: C.textLight }}>Owner</div>
            <div style={{ fontSize: 8, fontWeight: 600 }}>Teramira Tabai</div>
          </div>
          <div style={{ ...hlRing }}>
            <div style={btnBlue}>REQUEST ENTITY AUTHORITY</div>
          </div>
          {highlight && <div style={{ fontSize: 7, color: C.blue, fontWeight: 700, textAlign: "center", marginTop: 3 }}>&#9757; Tap this button</div>}
        </>)}

        {screen === "authority-form" && (<>
          <div style={{ fontWeight: 700, fontSize: 10, marginBottom: 6 }}>Request Authority</div>
          <div style={labelStyle}>Reason for requesting authority</div>
          <div style={{ ...inputStyle, height: 36, background: "#fff", border: `1.5px solid ${C.blue}` }}>
            <div style={{ padding: 4, fontSize: 7, color: C.text }}>I am the owner of this business name and I am applying to re-register.</div>
          </div>
          <div style={labelStyle}>Upload proof of identity</div>
          <div style={{ border: `1.5px dashed #448040`, borderRadius: 3, padding: 8, textAlign: "center", marginBottom: 6, background: "#f0f9f0" }}>
            <div style={{ fontSize: 7, color: "#448040", fontWeight: 600 }}>Tap to upload photo ID</div>
          </div>
          <div style={btnBlue}>REQUEST</div>
        </>)}

        {screen === "my-entities" && (<>
          <div style={{ fontWeight: 700, fontSize: 10, marginBottom: 6 }}>My Entities</div>
          <div style={{ border: `1.5px solid #448040`, borderRadius: 3, padding: 6, background: "#f9fff9" }}>
            <div style={{ fontWeight: 700, fontSize: 9 }}>Tarawa Fresh Fish</div>
            <div style={{ fontSize: 7, color: C.textLight }}>BN-12345 · Business Name</div>
            <div style={{ fontSize: 7, color: "#448040", fontWeight: 600, marginTop: 2 }}>Authority: Approved</div>
          </div>
        </>)}

        {screen === "entity-rereg" && (<>
          <div style={{ fontWeight: 700, fontSize: 10, marginBottom: 2 }}>Tarawa Fresh Fish</div>
          <div style={{ fontSize: 7, color: C.textLight, marginBottom: 8 }}>BN-12345 · Registered</div>
          <div style={{ background: "#f9f9f9", border: `1px solid ${C.borderGray}`, borderRadius: 3, padding: 6, marginBottom: 6 }}>
            <div style={{ fontSize: 7, color: C.textLight }}>Owner</div>
            <div style={{ fontSize: 8, fontWeight: 600 }}>Teramira Tabai</div>
          </div>
          <div style={hlRing}>
            <div style={btnGreen}>RE-REGISTER</div>
          </div>
          {highlight && <div style={{ fontSize: 7, color: "#448040", fontWeight: 700, textAlign: "center", marginTop: 3 }}>&#9757; Tap this button</div>}
        </>)}

        {screen === "upload" && (<>
          <div style={{ fontWeight: 700, fontSize: 10, marginBottom: 6 }}>Upload and Submit</div>
          <div style={labelStyle}>Form Upload</div>
          <div style={{ border: `1.5px dashed #448040`, borderRadius: 3, padding: 8, textAlign: "center", marginBottom: 6, background: "#f0f9f0" }}>
            <div style={{ fontSize: 7, fontWeight: 600, color: "#448040" }}>BN-0_Tarawa_Fresh_Fish.pdf</div>
            <div style={{ fontSize: 6, color: C.textLight }}>142 KB · Uploaded</div>
          </div>
          <div style={labelStyle}>Supporting Documents</div>
          <div style={{ border: `1.5px dashed ${C.borderLight}`, borderRadius: 3, padding: 6, textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 7, color: C.textLight }}>+ Add document</div>
          </div>
          <div style={btnBlue}>SUBMIT</div>
          <div style={{ marginTop: 6, background: C.amberBg, borderRadius: 3, padding: 6, textAlign: "center" }}>
            <div style={{ fontSize: 7, fontWeight: 700, color: C.amber }}>CHECKOUT</div>
            <div style={{ fontSize: 6, color: C.textLight }}>Free — nothing to pay</div>
          </div>
        </>)}
      </div>
    </div>
  );
}

/* ─── Main component ─── */
export default function SideBySideMode() {
  const [current, setCurrent] = useState(0);
  const step = STEPS[current];

  return (
    <div style={{ minHeight: "100vh", background: "#f4f4f4", fontFamily: F }}>
      {/* Header */}
      <div style={{ background: C.greenDark, borderBottom: "4px solid #002a2b", padding: "12px 16px", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: C.gold, fontSize: 11, fontWeight: 800 }}>Ki</div>
        <div>
          <div style={{ color: C.gold, fontSize: 16, fontWeight: 700 }}>Side-by-Side Mode</div>
          <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 11 }}>Follow along with the real registry</div>
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "16px 12px" }}>

        {/* Stage + step indicator */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <div style={{
            fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em",
            color: step.stageColor, background: step.stageColor === C.blue ? C.blueLight : C.amberBg,
            padding: "3px 10px", borderRadius: 4,
          }}>{step.stage}</div>
          <div style={{ fontSize: 12, color: C.textLight }}>Step {current + 1} of {STEPS.length}</div>
        </div>

        {/* Progress pips */}
        <div style={{ display: "flex", gap: 3, marginBottom: 16 }}>
          {STEPS.map((_, i) => (
            <div key={i} style={{
              flex: 1, height: 4, borderRadius: 2,
              background: i < current ? "#448040" : i === current ? C.blue : "#e0e0e0",
              transition: "background 0.3s ease",
            }} />
          ))}
        </div>

        {/* Side-by-side layout */}
        <div style={{ display: "flex", gap: 12, alignItems: "stretch" }}>

          {/* LEFT: Instruction panel */}
          <div style={{
            flex: 1, background: C.bg, border: `1.5px solid ${C.borderLight}`,
            borderTop: `4px solid ${C.blue}`, borderRadius: 6, padding: 16,
            display: "flex", flexDirection: "column",
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.textLight, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 4 }}>
              What to do
            </div>
            <div style={{ fontSize: 17, fontWeight: 700, color: C.text, lineHeight: 1.3, marginBottom: 10 }}>
              {step.title}
            </div>
            <div style={{ fontSize: 14, color: C.text, lineHeight: 1.6, flex: 1 }}>
              {step.instruction}
            </div>
            {step.highlight && (
              <div style={{
                marginTop: 12, background: C.blueLight, borderLeft: `4px solid ${C.blue}`,
                borderRadius: 4, padding: "8px 12px", fontSize: 13, color: C.blue, fontWeight: 600,
              }}>
                Look for the <strong>{step.highlight}</strong> button
              </div>
            )}
            <div style={{
              marginTop: 16, padding: "10px 12px", background: "#f9f9f9",
              border: `1px solid ${C.borderGray}`, borderRadius: 4,
              fontSize: 12, color: C.textLight, lineHeight: 1.5,
            }}>
              Open <strong style={{ color: C.text }}>business.gov.ki</strong> in another tab and follow along. The screen on the right shows roughly what you should see.
            </div>
          </div>

          {/* RIGHT: Registry preview in phone frame */}
          <div style={{ width: 220, flexShrink: 0 }}>
            <div style={{
              fontSize: 10, fontWeight: 600, color: C.textLight, textTransform: "uppercase",
              letterSpacing: "0.04em", marginBottom: 6, textAlign: "center",
            }}>
              What you should see
            </div>
            <div style={{
              background: "#111", borderRadius: 20, padding: 6,
              boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
            }}>
              <div style={{
                background: C.bg, borderRadius: 16, overflow: "hidden",
                height: 340,
              }}>
                <RegistryScreen screen={step.registryScreen} highlight={step.highlight} />
              </div>
            </div>
            <div style={{
              marginTop: 6, fontSize: 10, color: C.textLight, textAlign: "center",
              fontStyle: "italic", lineHeight: 1.4,
            }}>
              Screens are indicative — your view may look slightly different
            </div>
          </div>
        </div>

        {/* Where am I? */}
        <div style={{
          marginTop: 16, background: C.bg, border: `1.5px solid ${C.borderLight}`,
          borderRadius: 6, padding: "12px 16px",
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
        }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>Lost?</div>
            <div style={{ fontSize: 12, color: C.textLight }}>Tell us what you see and we'll find the right step.</div>
          </div>
          <button style={{
            background: C.bg, border: `1.5px solid ${C.blue}`, borderRadius: 4,
            padding: "8px 14px", fontSize: 12, fontWeight: 700, color: C.blue,
            cursor: "pointer", fontFamily: F, whiteSpace: "nowrap",
          }}>
            Where am I?
          </button>
        </div>

        {/* Navigation */}
        <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
          <button
            onClick={() => setCurrent(Math.max(0, current - 1))}
            disabled={current === 0}
            style={{
              flex: 1, padding: "14px 16px", borderRadius: 4, fontFamily: F,
              fontSize: 14, fontWeight: 700, cursor: current === 0 ? "not-allowed" : "pointer",
              background: C.bg, color: current === 0 ? "#ccc" : C.blue,
              border: `1.5px solid ${current === 0 ? "#e0e0e0" : C.blue}`,
              minHeight: 48,
            }}
          >
            &larr; Back
          </button>
          <button
            onClick={() => setCurrent(Math.min(STEPS.length - 1, current + 1))}
            disabled={current === STEPS.length - 1}
            style={{
              flex: 1, padding: "14px 16px", borderRadius: 4, fontFamily: F,
              fontSize: 14, fontWeight: 700, cursor: current === STEPS.length - 1 ? "not-allowed" : "pointer",
              background: current === STEPS.length - 1 ? "#e0e0e0" : C.blue,
              color: current === STEPS.length - 1 ? "#999" : "#fff",
              border: `1.5px solid ${current === STEPS.length - 1 ? "#e0e0e0" : C.blue}`,
              minHeight: 48,
            }}
          >
            {current === STEPS.length - 1 ? "Done" : "Next \u2192"}
          </button>
        </div>
      </div>
    </div>
  );
}
