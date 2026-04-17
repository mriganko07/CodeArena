import { useState, useRef, useEffect } from "react";


const S = {
  root: { background: "#050816", height: "100vh", width: "100vw", display: "flex", position: "relative", fontFamily: "'Inter', sans-serif", overflow: "hidden" },
  sidebar: { width: "210px", background: "#0a0618", borderRight: "1px solid #1e1540", display: "flex", flexDirection: "column", padding: "22px 12px 20px", gap: "2px", flexShrink: 0, height: "100%" },
  avWrap: { position: "relative", width: "72px", height: "72px", margin: "0 auto 8px", cursor: "pointer", flexShrink: 0 },
  avRing: { width: "72px", height: "72px", borderRadius: "50%", border: "2px solid #6C63FF", padding: "2px", background: "#050816" },
  avImg: { width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover", display: "block" },
  avOverlayBase: { position: "absolute", inset: 0, borderRadius: "50%", background: "#00000077", display: "flex", alignItems: "center", justifyContent: "center", transition: "opacity .2s" },
  sName: { textAlign: "center", fontSize: "13px", fontWeight: 600, color: "#fff", marginBottom: "3px", letterSpacing: ".2px" },
  sTag: { textAlign: "center", fontSize: "10.5px", color: "#6C63FF", background: "#6C63FF15", padding: "2px 10px", borderRadius: "20px", display: "inline-block", margin: "0 auto 18px" },
  sCenter: { display: "flex", justifyContent: "center" },
  menuItem: (active) => ({ padding: "8px 11px", borderRadius: "9px", fontSize: "12px", cursor: "pointer", color: active ? "#6C63FF" : "#666", transition: "all .18s", display: "flex", alignItems: "center", gap: "9px", userSelect: "none", borderLeft: active ? "2px solid #6C63FF" : "2px solid transparent", background: active ? "#6C63FF12" : "transparent", paddingLeft: active ? "10px" : "11px" }),
  main: { flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: "#050816", minWidth: 0 },
  topbar: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px 0", flexShrink: 0 },
  pgTitle: { fontSize: "17px", fontWeight: 600, color: "#fff", letterSpacing: ".2px" },
  pgSub: { fontSize: "10.5px", color: "#6C63FF", background: "#6C63FF12", border: "1px solid #6C63FF30", padding: "2px 10px", borderRadius: "20px", marginLeft: "10px", fontWeight: 500 },
  btnEdit: { background: "#6C63FF", color: "#fff", border: "none", padding: "7px 18px", borderRadius: "8px", fontSize: "12px", cursor: "pointer", fontWeight: 600, letterSpacing: ".2px", fontFamily: "inherit" },
  btnSave: { background: "transparent", color: "#22C55E", border: "1px solid #22C55E55", padding: "7px 18px", borderRadius: "8px", fontSize: "12px", cursor: "pointer", fontWeight: 600, fontFamily: "inherit" },
  content: { flex: 1, overflowY: "auto", padding: "18px 24px 24px", minHeight: 0 },
  card: { background: "#111827", borderRadius: "12px", border: "1px solid #1a2540", padding: "16px 18px", marginBottom: "12px" },
  cardTitle: { fontSize: "11px", color: "#6C63FF", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".8px", marginBottom: "14px", display: "flex", alignItems: "center", gap: "7px" },
  ctBar: { width: "3px", height: "12px", background: "#6C63FF", borderRadius: "2px", flexShrink: 0 },
  grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" },
  field: { display: "flex", flexDirection: "column", gap: "4px" },
  fl: { fontSize: "10px", color: "#555", textTransform: "uppercase", letterSpacing: ".5px", fontWeight: 500 },
  fv: { fontSize: "13px", color: "#d0d0d0" },
  fvA: { fontSize: "13px", color: "#6C63FF" },
  divx: { border: "none", borderTop: "1px solid #1a2540", margin: "12px 0" },
  inp: { background: "#0a1628", border: "1px solid #1e2d42", borderRadius: "7px", padding: "7px 11px", color: "#d0d0d0", fontSize: "12.5px", outline: "none", width: "100%", fontFamily: "inherit" },
  statRow: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "10px", marginBottom: "12px" },
  stat: { background: "#111827", borderRadius: "10px", border: "1px solid #1a2540", padding: "12px 10px", textAlign: "center" },
  sv: { fontSize: "22px", fontWeight: 600, color: "#6C63FF", lineHeight: 1 },
  sl: { fontSize: "10px", color: "#555", marginTop: "4px", letterSpacing: ".3px" },
  eduBlock: { background: "#0d1522", borderRadius: "9px", padding: "13px 14px", marginBottom: "9px", border: "1px solid #1a2540" },
  eduHead: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "5px" },
  eduInst: { fontSize: "13px", fontWeight: 600, color: "#e0e0e0" },
  pctPill: { background: "#22C55E18", color: "#22C55E", border: "1px solid #22C55E33", fontSize: "11px", padding: "2px 9px", borderRadius: "20px", fontWeight: 500 },
  projBlock: { background: "#0d1522", borderRadius: "9px", padding: "13px 14px", marginBottom: "9px", border: "1px solid #1a2540" },
  pt: { fontSize: "13px", fontWeight: 600, color: "#6C63FF", marginBottom: "3px" },
  pd: { fontSize: "12px", color: "#666", lineHeight: 1.5 },
  addBtn: { background: "transparent", color: "#6C63FF", border: "1px dashed #6C63FF44", padding: "8px 14px", borderRadius: "8px", fontSize: "12px", cursor: "pointer", width: "100%", marginTop: "2px", fontFamily: "inherit", fontWeight: 500 },
  resumeZone: (up) => ({ border: `2px dashed ${up ? "#22C55E55" : "#1a2540"}`, borderRadius: "12px", padding: "36px 20px", textAlign: "center", cursor: "pointer", background: up ? "#22C55E06" : "transparent", transition: "all .2s" }),
  rzTitle: (up) => ({ fontSize: "13.5px", fontWeight: 600, color: up ? "#22C55E" : "#d0d0d0", marginBottom: "3px" }),
  rzHint: { fontSize: "11px", color: "#444" },
  rzFile: { display: "flex", alignItems: "center", gap: "10px", background: "#0d1522", border: "1px solid #22C55E33", borderRadius: "9px", padding: "11px 14px", marginTop: "12px" },
  rzFname: { fontSize: "12.5px", color: "#22C55E", fontWeight: 500, flex: 1 },
  rzDel: { background: "transparent", border: "none", color: "#555", cursor: "pointer", fontSize: "15px", padding: "2px 6px", borderRadius: "5px", fontFamily: "inherit" },
  ub: { display: "inline-flex", alignItems: "center", gap: "5px", background: "#22C55E12", color: "#22C55E", border: "1px solid #22C55E33", padding: "3px 11px", borderRadius: "20px", fontSize: "11px", marginTop: "8px", fontWeight: 500 },
  delBtn: { background: "transparent", border: "1px solid #E24B4A33", color: "#E24B4A88", padding: "3px 9px", borderRadius: "6px", fontSize: "11px", cursor: "pointer", fontFamily: "inherit" },
  resultTag: { display: "inline-flex", alignItems: "center", gap: "4px", background: "#6C63FF12", color: "#6C63FF", border: "1px dashed #6C63FF44", fontSize: "10.5px", padding: "4px 10px", borderRadius: "7px", cursor: "pointer", marginTop: "8px" },
};


function Toast({ toasts }) {
  return (
    <div style={{ position: "absolute", top: "16px", left: "50%", transform: "translateX(-50%)", zIndex: 999, display: "flex", flexDirection: "column", gap: "8px", alignItems: "center", pointerEvents: "none", width: "320px" }}>
      {toasts.map((t) => (
        <div key={t.id} style={{ background: "#111827", border: "1px solid #22C55E33", borderLeft: "3px solid #22C55E", borderRadius: "10px", padding: "11px 16px", display: "flex", alignItems: "flex-start", gap: "10px", width: "100%", animation: "tin .3s ease" }}>
          <div style={{ width: "18px", height: "18px", background: "#22C55E1a", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "1px" }}>
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="#22C55E" strokeWidth="2.2"><polyline points="1,6 4,9 11,3" /></svg>
          </div>
          <div>
            <div style={{ fontWeight: 600, color: "#22C55E", fontSize: "11.5px", marginBottom: "2px" }}>{t.title}</div>
            <div style={{ fontSize: "11px", color: "#888", lineHeight: 1.4 }}>{t.msg}</div>
          </div>
        </div>
      ))}
    </div>
  );
}


const IconUser = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" /></svg>;
const IconEdu = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 10l10-6 10 6-10 6-10-6z" /><path d="M6 12v5c0 2 2.7 3 6 3s6-1 6-3v-5" /></svg>;
const IconProj = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="8" height="8" rx="1" /><rect x="13" y="3" width="8" height="8" rx="1" /><rect x="3" y="13" width="8" height="8" rx="1" /><rect x="13" y="13" width="8" height="8" rx="1" /></svg>;
const IconDoc = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14,2 14,8 20,8" /><line x1="8" y1="13" x2="16" y2="13" /><line x1="8" y1="17" x2="16" y2="17" /></svg>;
const IconCamera = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M4 8h2l2-2h8l2 2h2a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2v-8a2 2 0 012-2z" /></svg>;
const IconUpload = () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="17,8 12,3 7,8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>;

const TABS = [
  { id: "basic", label: "Basic Info", sub: "Profile", Icon: IconUser },
  { id: "education", label: "Education", sub: "Academic", Icon: IconEdu },
  { id: "projects", label: "Projects", sub: "Work", Icon: IconProj },
  { id: "resume", label: "Resume / CV", sub: "Documents", Icon: IconDoc },
];

const DEFAULT_USER = {
  name: "Mriganka Adhakary",
  dob: "20 June 2003",
  gender: "Male",
  phone: "8956789652",
  email: "mrigankaadhakary07@gmail.com",
  presentAddress: "Kolkata, West Bengal",
  permanentAddress: "Kolkata, West Bengal",
  education: [
    { id: 1, institute: "Indian Institute of Technology", board: "CBSE", percentage: "88.50", result: null },
    { id: 2, institute: "Delhi Public School", board: "CBSE", percentage: "92.00", result: null },
  ],
  projects: [
    { id: 1, title: "Portfolio Website", desc: "Personal portfolio built with React and Tailwind CSS" },
    { id: 2, title: "Task Manager App", desc: "Full stack task manager with Node.js backend" },
  ],
  resume: null,
};


export default function ProfileDashboard() {
  const [active, setActive] = useState("basic");
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState(DEFAULT_USER);
  const [draft, setDraft] = useState(DEFAULT_USER);
  const [avatarSrc, setAvatarSrc] = useState("https://cdn-icons-png.flaticon.com/512/149/149071.png");
  const [hovAv, setHovAv] = useState(false);
  const [toasts, setToasts] = useState([]);
  const avRef = useRef();
  const cvRef = useRef();

  const addToast = (title, msg) => {
    const id = Date.now();
    setToasts((p) => [...p, { id, title, msg }]);
    setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 3200);
  };

  const switchTab = (id) => {
    setActive(id);
    setEditMode(false);
    setDraft(user);
  };

  const toggleEdit = () => {
    if (editMode) {
      setUser(draft);
      addToast("Profile saved", "Your changes have been applied.");
    } else {
      setDraft(user);
    }
    setEditMode((e) => !e);
  };

  const handleAvatar = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setAvatarSrc(URL.createObjectURL(f));
    addToast("Photo updated", "Your profile picture has been changed.");
  };

  const handleCV = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setDraft((d) => ({ ...d, resume: f.name }));
    setUser((u) => ({ ...u, resume: f.name }));
    addToast("Resume uploaded", `"${f.name}" is now attached to your profile.`);
  };

  const updateDraftField = (key, val) => setDraft((d) => ({ ...d, [key]: val }));

  const updateEdu = (i, key, val) => {
    const edu = draft.education.map((e, idx) => idx === i ? { ...e, [key]: val } : e);
    setDraft((d) => ({ ...d, education: edu }));
  };

  const addEdu = () => setDraft((d) => ({ ...d, education: [...d.education, { id: Date.now(), institute: "", board: "", percentage: "", result: null }] }));
  const delEdu = (i) => { setDraft((d) => ({ ...d, education: d.education.filter((_, idx) => idx !== i) })); addToast("Entry removed", "Education entry deleted."); };

  const handleResult = (i, e) => {
    const f = e.target.files[0]; if (!f) return;
    const edu = draft.education.map((ed, idx) => idx === i ? { ...ed, result: f.name } : ed);
    setDraft((d) => ({ ...d, education: edu }));
    addToast("Result uploaded", `"${f.name}" attached.`);
  };

  const updateProj = (i, key, val) => {
    const projects = draft.projects.map((p, idx) => idx === i ? { ...p, [key]: val } : p);
    setDraft((d) => ({ ...d, projects }));
  };

  const addProj = () => setDraft((d) => ({ ...d, projects: [...d.projects, { id: Date.now(), title: "", desc: "" }] }));
  const delProj = (i) => { setDraft((d) => ({ ...d, projects: d.projects.filter((_, idx) => idx !== i) })); addToast("Project removed", "Project entry deleted."); };

  const D = editMode ? draft : user;

  
  const currentTab = TABS.find((t) => t.id === active);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { height: 100%; width: 100%; overflow: hidden; }
        @keyframes tin { from { opacity:0; transform:translateY(5px); } to { opacity:1; transform:translateY(0); } }
        .tab-in { animation: tin .22s ease; }
        .inp-field:focus { border-color:#6C63FF55 !important; background:#0d1d35 !important; }
        .add-btn-h:hover { background:#6C63FF0d; border-color:#6C63FF88; }
        .del-btn-h:hover { background:#E24B4A12; color:#E24B4A; border-color:#E24B4A66; }
        .menu-h:hover { background:#1a0f30; color:#aaa; }
        .rz-hover:hover { border-color:#6C63FF66 !important; background:#6C63FF06 !important; }
        .rz-del-h:hover { color:#E24B4A; }
        .proj-h:hover { border-color:#6C63FF44; }
        .result-tag-h:hover { background:#6C63FF1e; border-color:#6C63FF77; }
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-thumb { background:#2A1454; border-radius:4px; }
        ::-webkit-scrollbar-track { background: transparent; }
      `}</style>

      <div style={S.root}>
        <Toast toasts={toasts} />

        <div style={S.sidebar}>
          <div style={S.avWrap} onMouseEnter={() => setHovAv(true)} onMouseLeave={() => setHovAv(false)} onClick={() => avRef.current.click()}>
            <div style={S.avRing}><img style={S.avImg} src={avatarSrc} alt="avatar" /></div>
            <div style={{ ...S.avOverlayBase, opacity: hovAv ? 1 : 0 }}><IconCamera /></div>
          </div>
          <input ref={avRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleAvatar} />

          <p style={S.sName}>{user.name}</p>
          <div style={S.sCenter}><span style={S.sTag}>Developer</span></div>

          {TABS.map((t) => (
            <div key={t.id} className="menu-h" style={S.menuItem(active === t.id)} onClick={() => switchTab(t.id)}>
              <t.Icon />{t.label}
            </div>
          ))}
        </div>

        
        <div style={S.main}>
          <div style={S.topbar}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={S.pgTitle}>{currentTab.label}</span>
              <span style={S.pgSub}>{currentTab.sub}</span>
            </div>
            <button style={editMode ? S.btnSave : S.btnEdit} onClick={toggleEdit}>
              {editMode ? "Save" : "Edit"}
            </button>
          </div>

          <div style={S.content}>
            <div className="tab-in" key={active + editMode}>

              
              {active === "basic" && (
                <>
                  {!editMode && (
                    <div style={S.statRow}>
                      {[["education", "Education"], ["projects", "Projects"], ["resume", "Resume"]].map(([k, l]) => (
                        <div key={k} style={S.stat}>
                          <div style={S.sv}>{k === "resume" ? (user.resume ? "1" : "0") : user[k].length}</div>
                          <div style={S.sl}>{l}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div style={S.card}>
                    <div style={S.cardTitle}><span style={S.ctBar} />{editMode ? "Contact Details" : "Personal"}</div>
                    <div style={S.grid2}>
                      <div style={S.field}>
                        <span style={S.fl}>Full Name</span>
                        {editMode
                          ? <input className="inp-field" style={S.inp} value={draft.name} onChange={(e) => updateDraftField("name", e.target.value)} placeholder="Full name" />
                          : <span style={S.fv}>{D.name}</span>}
                      </div>
                      <div style={S.field}>
                        <span style={S.fl}>Date of Birth</span>
                        {editMode
                          ? <input className="inp-field" style={S.inp} value={draft.dob} onChange={(e) => updateDraftField("dob", e.target.value)} placeholder="e.g. 20 June 2003" />
                          : <span style={S.fv}>{D.dob}</span>}
                      </div>
                      <div style={S.field}>
                        <span style={S.fl}>Gender</span>
                        {editMode
                          ? <select className="inp-field" style={S.inp} value={draft.gender} onChange={(e) => updateDraftField("gender", e.target.value)}>
                              <option>Male</option><option>Female</option><option>Other</option>
                            </select>
                          : <span style={S.fv}>{D.gender}</span>}
                      </div>
                      <div style={S.field}>
                        <span style={S.fl}>Phone</span>
                        {editMode
                          ? <input className="inp-field" style={S.inp} value={draft.phone} onChange={(e) => updateDraftField("phone", e.target.value)} placeholder="Phone number" />
                          : <span style={S.fv}>{D.phone}</span>}
                      </div>
                    </div>
                    <div style={S.divx} />
                    <div style={S.grid2}>
                      <div style={S.field}>
                        <span style={S.fl}>Email</span>
                        {editMode
                          ? <input className="inp-field" style={S.inp} value={draft.email} onChange={(e) => updateDraftField("email", e.target.value)} placeholder="Email" />
                          : <span style={S.fvA}>{D.email}</span>}
                      </div>
                      <div style={S.field}>
                        <span style={S.fl}>Present Address</span>
                        {editMode
                          ? <input className="inp-field" style={S.inp} value={draft.presentAddress} onChange={(e) => updateDraftField("presentAddress", e.target.value)} placeholder="Present address" />
                          : <span style={S.fv}>{D.presentAddress}</span>}
                      </div>
                      <div style={S.field}>
                        <span style={S.fl}>Permanent Address</span>
                        {editMode
                          ? <input className="inp-field" style={S.inp} value={draft.permanentAddress} onChange={(e) => updateDraftField("permanentAddress", e.target.value)} placeholder="Permanent address" />
                          : <span style={S.fv}>{D.permanentAddress}</span>}
                      </div>
                    </div>
                  </div>
                </>
              )}

              
              {active === "education" && (
                <div style={S.card}>
                  <div style={S.cardTitle}><span style={S.ctBar} />Academic History</div>
                  {D.education.map((e, i) => (
                    <div key={e.id} style={S.eduBlock}>
                      <div style={S.eduHead}>
                        <span style={S.eduInst}>{e.institute || "Institute Name"}</span>
                        <span style={S.pctPill}>{e.percentage || "0"}%</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "11.5px", color: "#555" }}>Board / University: {e.board || "—"}</span>
                        {editMode && <button className="del-btn-h" style={S.delBtn} onClick={() => delEdu(i)}>Remove</button>}
                      </div>
                      {e.result && <div style={{ marginTop: "6px", fontSize: "11px", color: "#22C55E" }}>📎 {e.result}</div>}
                      {editMode && (
                        <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: "8px" }}>
                          <input className="inp-field" style={S.inp} value={e.institute} onChange={(ev) => updateEdu(i, "institute", ev.target.value)} placeholder="Institute name" />
                          <div style={S.grid2}>
                            <input className="inp-field" style={S.inp} value={e.board} onChange={(ev) => updateEdu(i, "board", ev.target.value)} placeholder="Board / University" />
                            <input className="inp-field" style={S.inp} value={e.percentage} onChange={(ev) => updateEdu(i, "percentage", ev.target.value)} placeholder="Percentage / CGPA" />
                          </div>
                          <label className="result-tag-h" style={S.resultTag}>
                            <IconUpload /> {e.result ? "Replace result" : "Upload result"}
                            <input type="file" style={{ display: "none" }} onChange={(ev) => handleResult(i, ev)} />
                          </label>
                        </div>
                      )}
                    </div>
                  ))}
                  {editMode && <button className="add-btn-h" style={S.addBtn} onClick={addEdu}>+ Add Education</button>}
                </div>
              )}

              
              {active === "projects" && (
                <div style={S.card}>
                  <div style={S.cardTitle}><span style={S.ctBar} />Project Work</div>
                  {D.projects.map((p, i) => (
                    <div key={p.id} className={editMode ? "" : "proj-h"} style={S.projBlock}>
                      {editMode ? (
                        <>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px", gap: "8px" }}>
                            <input className="inp-field" style={{ ...S.inp, flex: 1 }} value={p.title} onChange={(e) => updateProj(i, "title", e.target.value)} placeholder="Project title" />
                            <button className="del-btn-h" style={S.delBtn} onClick={() => delProj(i)}>Remove</button>
                          </div>
                          <input className="inp-field" style={S.inp} value={p.desc} onChange={(e) => updateProj(i, "desc", e.target.value)} placeholder="Short description" />
                        </>
                      ) : (
                        <>
                          <div style={S.pt}>{p.title}</div>
                          <div style={S.pd}>{p.desc}</div>
                        </>
                      )}
                    </div>
                  ))}
                  {editMode && <button className="add-btn-h" style={S.addBtn} onClick={addProj}>+ Add Project</button>}
                </div>
              )}

              
              {active === "resume" && (
                <div style={S.card}>
                  <div style={S.cardTitle}><span style={S.ctBar} />Curriculum Vitae</div>
                  <div className="rz-hover" style={S.resumeZone(!!user.resume)} onClick={() => cvRef.current.click()}>
                    <div style={{ marginBottom: "8px" }}>
                      {user.resume
                        ? <svg width="30" height="30" viewBox="0 0 32 32" fill="none" stroke="#22C55E" strokeWidth="1.5"><path d="M4 4h16l8 8v16a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z" /><polyline points="20,4 20,12 28,12" /><polyline stroke="#22C55E" strokeWidth="2.2" points="10,20 14,24 22,16" /></svg>
                        : <svg width="30" height="30" viewBox="0 0 32 32" fill="none" stroke="#6C63FF" strokeWidth="1.5"><path d="M4 4h16l8 8v16a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z" /><polyline points="20,4 20,12 28,12" /><line x1="10" y1="18" x2="22" y2="18" /><line x1="10" y1="22" x2="18" y2="22" /></svg>
                      }
                    </div>
                    <div style={S.rzTitle(!!user.resume)}>{user.resume ? "Resume Uploaded" : "Upload Your Resume"}</div>
                    <div style={S.rzHint}>{user.resume ? "Click to replace · PDF only" : "PDF only · Max 5MB"}</div>
                    {user.resume && (
                      <div style={S.ub}>
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="#22C55E" strokeWidth="2.2"><polyline points="1,6 4,9 11,3" /></svg>
                        {user.resume}
                      </div>
                    )}
                  </div>
                  {user.resume && (
                    <div style={S.rzFile}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14,2 14,8 20,8" /></svg>
                      <span style={S.rzFname}>{user.resume}</span>
                      <span style={{ fontSize: "11px", color: "#555" }}>PDF</span>
                      <button className="rz-del-h" style={S.rzDel} onClick={(e) => { e.stopPropagation(); setUser((u) => ({ ...u, resume: null })); addToast("Resume removed", "You can upload a new one anytime."); }}>✕</button>
                    </div>
                  )}
                  <input ref={cvRef} type="file" accept=".pdf" style={{ display: "none" }} onChange={handleCV} />
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
}