import { useState, useRef } from "react";
import SoftBackdropNew from "../../components/SoftBackdropNew";


const COLORS = {
  deepNavy: "#050816",
  darkPurple: "#1A0B2E",
  midPurple: "#2A1454",
  accent: "#6C63FF",
  cardDark: "#1F2937",
  grayMuted: "#A1A1AA",
  green: "#22C55E",
};

const initialPersonal = {
  firstName: "Mriganko",
  lastName: "Roy",
  email: "mriganko@email.com",
  phone: "+91 98765 43210",
  location: "Kolkata, West Bengal",
  linkedin: "linkedin.com/in/mriganko",
  github: "github.com/mriganko",
  bio: "MCA final year student with a passion for full-stack development, AI systems, and building real-world web applications.",
};

const initialSkills = ["React", "Node.js", "Python", "WebSocket", "Tailwind CSS", "MongoDB"];

const initialEducation = [
  {
    id: 1,
    degree: "Master of Computer Applications (MCA)",
    institution: "NCRD's Sterling Institute",
    university: "University of Mumbai",
    year: "2023 – 2025",
    cgpa: "8.34 CGPA",
    current: true,
    docs: [{ name: "Marksheet_Sem1.pdf", size: "142 KB" }],
  },
  {
    id: 2,
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "Your College Name",
    university: "",
    year: "2020 – 2023",
    cgpa: "8.14 CGPA",
    current: false,
    docs: [],
  },
];

function Toast({ message, onDone }) {
  useState(() => {
    const t = setTimeout(onDone, 2500);
    return () => clearTimeout(t);
  });
  return (
    <div
      style={{
        position: "fixed",
        bottom: 28,
        right: 28,
        background: COLORS.cardDark,
        border: `1px solid ${COLORS.green}55`,
        color: COLORS.green,
        fontFamily: "'Space Mono', monospace",
        fontSize: 12,
        padding: "10px 16px",
        borderRadius: 12,
        display: "flex",
        alignItems: "center",
        gap: 8,
        zIndex: 9999,
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
      }}
    >
      ✓ {message}
    </div>
  );
}

function Input({ label, value, editing, onChange, textarea }) {
  const base = {
    width: "100%",
    background: editing ? COLORS.cardDark : "transparent",
    border: editing ? `1.5px solid ${COLORS.midPurple}` : "1.5px solid transparent",
    color: "#fff",
    borderRadius: 10,
    padding: "8px 12px",
    fontSize: 13,
    fontFamily: "'DM Sans', sans-serif",
    outline: "none",
    resize: "none",
    transition: "border 0.2s",
    boxSizing: "border-box",
  };
  return (
    <div style={{ marginBottom: 4 }}>
      <label style={{ fontSize: 10, color: COLORS.grayMuted, fontFamily: "'Space Mono',monospace", letterSpacing: 1, textTransform: "uppercase", display: "block", marginBottom: 5 }}>
        {label}
      </label>
      {textarea ? (
        <textarea rows={3} style={base} value={value} readOnly={!editing} onChange={e => onChange(e.target.value)} />
      ) : (
        <input style={base} value={value} readOnly={!editing} onChange={e => onChange(e.target.value)} />
      )}
    </div>
  );
}

function SectionCard({ children, style }) {
  return (
    <div style={{
      background: `linear-gradient(135deg, ${COLORS.cardDark} 60%, ${COLORS.darkPurple} 100%)`,
      borderRadius: 18,
      padding: 24,
      boxShadow: `0 0 24px 2px rgba(108,99,255,0.10)`,
      border: `1px solid ${COLORS.midPurple}55`,
      ...style,
    }}>
      {children}
    </div>
  );
}

function PersonalSection({ editing }) {
  const [data, setData] = useState(initialPersonal);
  const [skills, setSkills] = useState(initialSkills);

  const set = key => val => setData(d => ({ ...d, [key]: val }));

  const addSkill = () => {
    const s = prompt("Enter skill name:");
    if (s?.trim()) setSkills(prev => [...prev, s.trim()]);
  };

  return (


    <SectionCard>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <div>
          <h2 style={{ fontFamily: "'Space Mono',monospace", fontSize: 16, fontWeight: 700, margin: 0 }}>Personal Details</h2>
          <p style={{ fontSize: 12, color: COLORS.grayMuted, marginTop: 4 }}>Your basic information shown to interviewers</p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
        <Input label="First Name" value={data.firstName} editing={editing} onChange={set("firstName")} />
        <Input label="Last Name" value={data.lastName} editing={editing} onChange={set("lastName")} />
        <Input label="Email Address" value={data.email} editing={editing} onChange={set("email")} />
        <Input label="Phone Number" value={data.phone} editing={editing} onChange={set("phone")} />
        <Input label="Location" value={data.location} editing={editing} onChange={set("location")} />
        <Input label="LinkedIn" value={data.linkedin} editing={editing} onChange={set("linkedin")} />
        <div style={{ gridColumn: "1 / -1" }}>
          <Input label="GitHub" value={data.github} editing={editing} onChange={set("github")} />
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          <Input label="About / Bio" value={data.bio} editing={editing} onChange={set("bio")} textarea />
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${COLORS.midPurple}55`, marginTop: 20, paddingTop: 20 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <label style={{ fontSize: 10, color: COLORS.grayMuted, fontFamily: "'Space Mono',monospace", letterSpacing: 1, textTransform: "uppercase" }}>Technical Skills</label>
          {editing && (
            <button onClick={addSkill} style={{ fontSize: 10, color: COLORS.accent, fontFamily: "'Space Mono',monospace", background: "none", border: `1px solid ${COLORS.accent}44`, padding: "3px 10px", borderRadius: 8, cursor: "pointer" }}>
              + Add Skill
            </button>
          )}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {skills.map((s, i) => (
            <span key={i} style={{ background: COLORS.midPurple, color: COLORS.accent, fontFamily: "'Space Mono',monospace", fontSize: 11, padding: "4px 12px", borderRadius: 99, border: `1px solid ${COLORS.accent}33` }}>
              {s}
            </span>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

function EduCard({ edu, editing, onDocUpload }) {
  return (
    <div style={{ border: `1px solid ${COLORS.midPurple}99`, borderRadius: 14, padding: 16, marginBottom: 14, position: "relative" }}>
      {edu.current && (
        <span style={{ position: "absolute", top: 12, right: 12, background: `${COLORS.green}22`, color: COLORS.green, fontSize: 9, fontFamily: "'Space Mono',monospace", padding: "3px 10px", borderRadius: 99, border: `1px solid ${COLORS.green}44` }}>
          ● Current
        </span>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 14px" }}>
        <div style={{ gridColumn: "1 / -1" }}>
          <Input label="Degree / Program" value={edu.degree} editing={editing} onChange={() => {}} />
        </div>
        <Input label="Institution" value={edu.institution} editing={editing} onChange={() => {}} />
        <Input label="University" value={edu.university} editing={editing} onChange={() => {}} />
        <Input label="Year" value={edu.year} editing={editing} onChange={() => {}} />
        <Input label="CGPA / %" value={edu.cgpa} editing={editing} onChange={() => {}} />
      </div>

      <div style={{ borderTop: `1px solid ${COLORS.midPurple}44`, marginTop: 14, paddingTop: 14 }}>
        <label style={{ fontSize: 10, color: COLORS.grayMuted, fontFamily: "'Space Mono',monospace", letterSpacing: 1, textTransform: "uppercase", display: "block", marginBottom: 8 }}>
          Supporting Documents
        </label>
        {edu.docs.map((d, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, background: `${COLORS.cardDark}99`, padding: "7px 12px", borderRadius: 9, border: `1px solid ${COLORS.midPurple}44`, marginBottom: 6, fontSize: 12 }}>
            <span style={{ color: COLORS.green }}>📄</span>
            <span style={{ color: COLORS.green, fontFamily: "'Space Mono',monospace", fontSize: 11 }}>{d.name}</span>
            <span style={{ marginLeft: "auto", fontSize: 10, color: COLORS.grayMuted }}>{d.size}</span>
          </div>
        ))}
        <label style={{ display: "flex", alignItems: "center", gap: 8, border: `2px dashed ${COLORS.midPurple}`, borderRadius: 10, padding: "9px 14px", cursor: "pointer", fontSize: 12, color: COLORS.grayMuted, marginTop: 4 }}>
          <span style={{ color: COLORS.accent, fontFamily: "'Space Mono',monospace", fontSize: 11 }}>↑ Upload document</span>
          <span style={{ marginLeft: "auto", fontSize: 10 }}>PDF, JPG, PNG</span>
          <input type="file" style={{ display: "none" }} multiple accept=".pdf,.jpg,.png,.jpeg" onChange={e => onDocUpload(edu.id, e)} />
        </label>
      </div>
    </div>
  );
}

function EducationSection({ editing }) {
  const [eduList, setEduList] = useState(initialEducation);

  const handleDocUpload = (id, e) => {
    const files = Array.from(e.target.files);
    setEduList(prev => prev.map(ed =>
      ed.id === id
        ? { ...ed, docs: [...ed.docs, ...files.map(f => ({ name: f.name, size: `${Math.round(f.size / 1024)} KB` }))] }
        : ed
    ));
  };

  return (
    <SectionCard>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontFamily: "'Space Mono',monospace", fontSize: 16, fontWeight: 700, margin: 0 }}>Educational Details</h2>
        <p style={{ fontSize: 12, color: COLORS.grayMuted, marginTop: 4 }}>Academic background and credentials</p>
      </div>
      {eduList.map(edu => <EduCard key={edu.id} edu={edu} editing={editing} onDocUpload={handleDocUpload} />)}
      <button style={{ width: "100%", border: `1.5px dashed ${COLORS.accent}44`, borderRadius: 12, padding: "10px 0", color: COLORS.accent, fontFamily: "'Space Mono',monospace", fontSize: 12, background: "none", cursor: "pointer" }}>
        + Add Another Education
      </button>
    </SectionCard>
  );
}

function ResumeSection() {
  const [resume, setResume] = useState(null);
  const inputRef = useRef();

  const handleFile = e => {
    const f = e.target.files[0];
    if (f) setResume({ name: f.name, size: `${Math.round(f.size / 1024)} KB` });
  };

  return (
    <SectionCard>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontFamily: "'Space Mono',monospace", fontSize: 16, fontWeight: 700, margin: 0 }}>Resume</h2>
        <p style={{ fontSize: 12, color: COLORS.grayMuted, marginTop: 4 }}>Upload your latest resume for interviewers to review</p>
      </div>

      {!resume ? (
        <label style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: `2px dashed ${COLORS.midPurple}`, borderRadius: 16, padding: "48px 24px", cursor: "pointer" }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: `${COLORS.midPurple}88`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16, fontSize: 24 }}>📄</div>
          <p style={{ fontFamily: "'Space Mono',monospace", fontSize: 13, color: "#fff", margin: 0 }}>Drag & drop your resume</p>
          <p style={{ fontSize: 12, color: COLORS.grayMuted, marginTop: 6 }}>or <span style={{ color: COLORS.accent }}>browse to upload</span></p>
          <p style={{ fontSize: 10, color: COLORS.grayMuted, marginTop: 10, fontFamily: "'Space Mono',monospace" }}>PDF, DOCX up to 5MB</p>
          <input type="file" style={{ display: "none" }} accept=".pdf,.docx" onChange={handleFile} />
        </label>
      ) : (
        <div style={{ border: `1px solid ${COLORS.green}44`, borderRadius: 14, padding: 16, background: `${COLORS.cardDark}88`, display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 42, height: 42, borderRadius: 10, background: `${COLORS.green}22`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>📄</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontFamily: "'Space Mono',monospace", fontSize: 12, color: "#fff", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{resume.name}</p>
            <p style={{ fontSize: 11, color: COLORS.grayMuted, marginTop: 3 }}>{resume.size} · Uploaded just now</p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <label style={{ fontSize: 11, color: COLORS.accent, fontFamily: "'Space Mono',monospace", border: `1px solid ${COLORS.accent}44`, padding: "4px 12px", borderRadius: 8, cursor: "pointer" }}>
              Replace <input type="file" style={{ display: "none" }} accept=".pdf,.docx" onChange={handleFile} />
            </label>
            <button onClick={() => setResume(null)} style={{ fontSize: 11, color: "#f87171", fontFamily: "'Space Mono',monospace", border: "1px solid #f8717144", padding: "4px 12px", borderRadius: 8, background: "none", cursor: "pointer" }}>
              Remove
            </button>
          </div>
        </div>
      )}

      <div style={{ marginTop: 20, padding: 16, borderRadius: 12, background: `${COLORS.accent}0D`, border: `1px solid ${COLORS.accent}22` }}>
        <p style={{ fontSize: 10, color: COLORS.accent, fontFamily: "'Space Mono',monospace", letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>Resume Tips</p>
        {["Keep your resume to 1–2 pages maximum", "Highlight projects, GitHub links, and measurable results", "Use consistent formatting and clear section headers", "Our AI will analyze your resume and suggest improvements"].map((tip, i) => (
          <p key={i} style={{ fontSize: 12, color: COLORS.grayMuted, marginBottom: 6 }}><span style={{ color: COLORS.accent }}>▸ </span>{tip}</p>
        ))}
      </div>

      <button style={{ width: "100%", marginTop: 16, padding: "12px 0", borderRadius: 12, background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.midPurple})`, color: "#fff", fontFamily: "'Space Mono',monospace", fontSize: 13, fontWeight: 700, border: "none", cursor: "pointer" }}>
        ✦ Analyze Resume with AI
      </button>
    </SectionCard>
  );
}

export default function ProfilePage() {
  const [editing, setEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const [toast, setToast] = useState(null);
  const [photo, setPhoto] = useState(null);
  const photoRef = useRef();

  const handlePhotoChange = e => {
    const f = e.target.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = ev => setPhoto(ev.target.result);
    reader.readAsDataURL(f);
  };

  const handleEditToggle = () => {
    if (editing) setToast("Profile saved successfully!");
    setEditing(e => !e);
  };

  const tabs = [
    { id: "personal", label: "Personal Details", icon: "👤" },
    { id: "education", label: "Education", icon: "🎓" },
    { id: "resume", label: "Resume", icon: "📄" },
  ];

  return (
    <>
      <SoftBackdropNew /> 
      <div className="relative z-10" style={{ minHeight: "100vh", background: "transparent", color: "#fff", fontFamily: "'DM Sans', sans-serif", }} >
        <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

        {/* Navbar */}
        <nav style={{ borderBottom: `1px solid ${COLORS.midPurple}66`, background: `${COLORS.darkPurple}CC`, backdropFilter: "blur(12px)", position: "sticky", top: 0, zIndex: 50, padding: "12px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: COLORS.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>✓</div>
            <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 13, fontWeight: 700, color: COLORS.accent, letterSpacing: 2 }}>InterviewAI</span>
          </div>
          <button onClick={handleEditToggle} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 18px", borderRadius: 10, border: `1px solid ${COLORS.accent}66`, color: editing ? "#fff" : COLORS.accent, background: editing ? COLORS.accent : "transparent", fontFamily: "'Space Mono',monospace", fontSize: 12, fontWeight: 700, cursor: "pointer", transition: "all 0.2s" }}>
            {editing ? "✓ Save Profile" : "✎ Edit Profile"}
          </button>
        </nav>

        {/* Layout */}
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px", display: "flex", gap: 24, alignItems: "flex-start" }}>

          {/* Sidebar */}
          <aside style={{ width: 240, flexShrink: 0, display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Photo Card */}
            <SectionCard style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
              <div style={{ position: "relative" }} className="group">
                <div style={{ width: 100, height: 100, borderRadius: "50%", overflow: "hidden", boxShadow: `0 0 0 3px ${COLORS.accent}, 0 0 24px 4px rgba(108,99,255,0.25)` }}>
                  {photo
                    ? <img src={photo} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    : <div style={{ width: "100%", height: "100%", background: `linear-gradient(135deg, ${COLORS.midPurple}, ${COLORS.accent})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontFamily: "'Space Mono',monospace", fontWeight: 700 }}>MR</div>
                  }
                </div>
                <label style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "rgba(0,0,0,0.6)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", opacity: 0, transition: "opacity 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.opacity = 1}
                  onMouseLeave={e => e.currentTarget.style.opacity = 0}>
                  <span style={{ fontSize: 18 }}>↑</span>
                  <span style={{ fontSize: 9, color: COLORS.accent, fontFamily: "'Space Mono',monospace" }}>Change</span>
                  <input type="file" style={{ display: "none" }} accept="image/*" onChange={handlePhotoChange} />
                </label>
              </div>

              <div style={{ textAlign: "center" }}>
                <div style={{ fontWeight: 700, fontSize: 15 }}>Mriganko Roy</div>
                <div style={{ fontSize: 11, color: COLORS.grayMuted, marginTop: 2 }}>MCA Final Year</div>
                <span style={{ display: "inline-block", marginTop: 8, background: `${COLORS.green}22`, color: COLORS.green, fontSize: 9, fontFamily: "'Space Mono',monospace", padding: "3px 10px", borderRadius: 99, border: `1px solid ${COLORS.green}44` }}>● Available for Interviews</span>
              </div>

              <div style={{ width: "100%", borderTop: `1px solid ${COLORS.midPurple}55`, paddingTop: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 6 }}>
                  <span style={{ color: COLORS.grayMuted, fontFamily: "'Space Mono',monospace" }}>Profile</span>
                  <span style={{ color: COLORS.accent, fontFamily: "'Space Mono',monospace", fontWeight: 700 }}>78%</span>
                </div>
                <div style={{ height: 5, borderRadius: 99, background: COLORS.midPurple, overflow: "hidden" }}>
                  <div style={{ width: "78%", height: "100%", background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.green})`, borderRadius: 99 }} />
                </div>
                <p style={{ fontSize: 10, color: COLORS.grayMuted, marginTop: 6 }}>Upload resume to complete</p>
              </div>
            </SectionCard>

            {/* Nav Tabs */}
            <SectionCard style={{ padding: 10 }}>
              {tabs.map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ width: "100%", textAlign: "left", padding: "10px 14px", borderRadius: 10, display: "flex", alignItems: "center", gap: 10, fontSize: 13, fontWeight: 500, cursor: "pointer", border: "none", marginBottom: 2, background: activeTab === tab.id ? `linear-gradient(90deg, ${COLORS.accent}18, transparent)` : "transparent", color: activeTab === tab.id ? COLORS.accent : COLORS.grayMuted, borderLeft: activeTab === tab.id ? `3px solid ${COLORS.accent}` : "3px solid transparent", transition: "all 0.15s" }}>
                  <span>{tab.icon}</span> {tab.label}
                </button>
              ))}
            </SectionCard>

            {/* Quick Stats */}
            <SectionCard>
              <p style={{ fontSize: 10, color: COLORS.grayMuted, fontFamily: "'Space Mono',monospace", letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>Quick Stats</p>
              {[["Interviews Done", "3", COLORS.accent], ["Avg Score", "82%", COLORS.green], ["CGPA", "8.34", "#fff"]].map(([label, val, color]) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 10 }}>
                  <span style={{ color: COLORS.grayMuted }}>{label}</span>
                  <span style={{ color, fontFamily: "'Space Mono',monospace", fontWeight: 700 }}>{val}</span>
                </div>
              ))}
            </SectionCard>
          </aside>

          {/* Main Content */}
          <main style={{ flex: 1, minWidth: 0 }}>
            {activeTab === "personal" && <PersonalSection editing={editing} />}
            {activeTab === "education" && <EducationSection editing={editing} />}
            {activeTab === "resume" && <ResumeSection />}
          </main>
        </div>

        {toast && <Toast message={toast} onDone={() => setToast(null)} />}
      </div>
    </>
  );
}