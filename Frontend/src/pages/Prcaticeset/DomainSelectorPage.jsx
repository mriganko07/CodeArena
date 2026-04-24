import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import SoftBackdropNew from "../../components/SoftBackdropNew";
import LenisScroll from "../../components/lenis";

const groups = [
  {
    category: "Core CS",
    domains: [
      "Data Structures & Algorithms (DSA)",
      "Operating System (OS)",
      "Database Management System (DBMS)",
      "Computer Networks (CN)",
      "Object-Oriented Programming (OOP)",
    ],
  },
  {
    category: "Programming Languages",
    domains: ["Java / Python / C++ / JavaScript"],
  },
  {
    category: "Web Development",
    domains: [
      "HTML, CSS, JavaScript",
      "React.js / Angular / Vue",
      "Node.js / Express.js",
      "Spring Boot (Java)",
      "Django / Flask (Python)",
      "MySQL / PostgreSQL",
      "MongoDB",
      "REST APIs",
      "Authentication (JWT, OAuth)",
      "Web Security (CORS, XSS, CSRF)",
      "Web Performance Optimization",
    ],
  },
  {
    category: "Mobile Development",
    domains: ["Android (Java / Kotlin)", "iOS (Swift)", "Flutter / React Native"],
  },
  {
    category: "AI & Data",
    domains: [
      "Machine Learning Algorithms",
      "Deep Learning (CNN, RNN)",
      "NLP (Natural Language Processing)",
      "Computer Vision",
      "NumPy, Pandas, TensorFlow, PyTorch",
      "Data Analysis",
      "Data Visualization (Matplotlib, Power BI, Tableau)",
      "Statistics & Probability",
      "SQL (Advanced Queries)",
    ],
  },
  {
    category: "Cloud & DevOps",
    domains: ["AWS / Azure / Google Cloud", "Docker", "Kubernetes", "CI/CD Pipelines", "Linux & Shell Scripting"],
  },
  {
    category: "Cybersecurity",
    domains: ["Network Security", "Cryptography", "Ethical Hacking", "Penetration Testing", "Web Security"],
  },
  {
    category: "Database & Systems",
    domains: ["Database Design", "Query Optimization", "Indexing", "Backup & Recovery"],
  },
  {
    category: "Game Development",
    domains: ["Unity (C#)", "Unreal Engine (C++)", "Graphics Programming"],
  },
  {
    category: "IoT & Embedded",
    domains: ["Microcontrollers (Arduino, Raspberry Pi)", "C / C++", "Sensors & Hardware Integration"],
  },
  {
    category: "Networking",
    domains: ["TCP/IP", "Routing & Switching", "Network Configuration", "Linux Administration"],
  },
  {
    category: "Blockchain",
    domains: ["Smart Contracts", "Solidity", "Ethereum", "Web3"],
  },
  {
    category: "Testing & QA",
    domains: ["Manual Testing", "Automation Testing (Selenium)", "Test Cases & Bug Tracking"],
  },
];

const totalTopics = groups.reduce((sum, g) => sum + g.domains.length, 0);

// Inline styles for glassmorphism (works regardless of Tailwind version)
const glass = {
  section: {
    background: "rgba(255, 255, 255, 0.03)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "22px",
    padding: "24px",
  },
  card: {
    background: "rgba(255, 255, 255, 0.04)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: "1px solid rgba(255, 255, 255, 0.09)",
    borderRadius: "16px",
  },
  cardHover: {
    background: "rgba(108, 99, 255, 0.08)",
    border: "1px solid rgba(108, 99, 255, 0.4)",
  },
  headerCard: {
    background: "rgba(255, 255, 255, 0.04)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "24px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
  },
};

function DomainCard({ domain, category, active, onClick }) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...glass.card,
        ...(hovered || active ? glass.cardHover : {}),
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 12px 40px rgba(108, 99, 255, 0.2), inset 0 1px 0 rgba(255,255,255,0.08)"
          : "0 2px 12px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)",
        transition: "all 0.25s ease",
        padding: "16px",
        textAlign: "left",
        width: "100%",
        cursor: "pointer",
        outline: active ? "2px solid rgba(108,99,255,0.5)" : "none",
        outlineOffset: "2px",
      }}
    >
      {/* category pill */}
      <span
        style={{
          display: "inline-block",
          background: "rgba(108, 99, 255, 0.18)",
          border: "1px solid rgba(108, 99, 255, 0.3)",
          color: "#a89eff",
          borderRadius: "999px",
          padding: "2px 10px",
          fontSize: "10px",
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        {category}
      </span>

      {/* title + arrow */}
      <div style={{ marginTop: "12px", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px" }}>
        <h3
          style={{
            fontSize: "13px",
            fontWeight: 600,
            lineHeight: "1.4",
            color: hovered || active ? "#a89eff" : "#f1f5f9",
            transition: "color 0.2s",
            margin: 0,
          }}
        >
          {domain}
        </h3>
        <div
          style={{
            flexShrink: 0,
            background: hovered || active ? "#6C63FF" : "rgba(108, 99, 255, 0.15)",
            border: "1px solid rgba(108, 99, 255, 0.3)",
            borderRadius: "10px",
            padding: "6px 10px",
            fontSize: "13px",
            color: hovered || active ? "#fff" : "#6C63FF",
            transition: "all 0.2s",
          }}
        >
          →
        </div>
      </div>

      {/* footer */}
      <div style={{ marginTop: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
        <span
          style={{
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            background: "#22C55E",
            boxShadow: "0 0 6px rgba(34,197,94,0.6)",
            display: "inline-block",
          }}
        />
        <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)" }}>Open practice set</span>
      </div>
    </button>
  );
}

export default function DomainSelectorPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("");

  const filteredGroups = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return groups;
    return groups
      .map((g) => ({
        ...g,
        domains: g.domains.filter((d) => d.toLowerCase().includes(q)),
      }))
      .filter((g) => g.domains.length > 0);
  }, [search]);

  const openPractice = (domain) => {
    setSelected(domain);
    navigate(`/practice/${encodeURIComponent(domain)}`);
  };

  return (
    <>
      <SoftBackdropNew /> 
      <LenisScroll />

      <div  className="relative z-10 min-h-screen text-white bg-transparent">
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 24px" }}>

          {/* ── HEADER CARD ── */}
          <div style={{ ...glass.headerCard, padding: "32px", marginBottom: "32px" }}>

            {/* top row */}
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "rgba(108, 99, 255, 0.12)",
                  border: "1px solid rgba(108, 99, 255, 0.25)",
                  borderRadius: "999px",
                  padding: "6px 16px",
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.85)",
                }}
              >
                <span>✦</span>
                Interview Practice Domain Selector
              </div>

              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "999px",
                  padding: "6px 16px",
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.55)",
                }}
              >
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#22C55E", boxShadow: "0 0 6px rgba(34,197,94,0.5)", display: "inline-block" }} />
                {groups.length} categories · {totalTopics} topics
              </div>
            </div>

            {/* heading + search */}
            <div style={{ marginTop: "28px", display: "grid", gap: "24px", gridTemplateColumns: "1.4fr 0.9fr", alignItems: "end" }}
              className="header-grid"
            >
              <div>
                <h1 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1, margin: 0 }}>
                  Choose a domain,{" "}
                  <span style={{ background: "linear-gradient(135deg, #a89eff 0%, #6C63FF 100%)", WebkitBackdropFilter: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                    start practicing.
                  </span>
                </h1>
                <p style={{ marginTop: "16px", fontSize: "14px", lineHeight: 1.7, color: "rgba(255,255,255,0.5)", maxWidth: "480px" }}>
                  Browse every interview topic in one place. Search fast, pick a domain, and jump straight into a focused practice session.
                </p>
              </div>

              {/* search box */}
              <div
                style={{
                  background: "rgba(255,255,255,0.03)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "16px",
                  padding: "16px",
                }}
              >
                <label style={{ display: "block", marginBottom: "8px", fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>
                  Search Domains
                </label>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.25)", pointerEvents: "none" }}>
                    🔍
                  </span>
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Type to filter..."
                    style={{
                      width: "100%",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "12px",
                      padding: "10px 14px 10px 36px",
                      color: "#fff",
                      fontSize: "14px",
                      outline: "none",
                      boxSizing: "border-box",
                      transition: "border-color 0.2s, box-shadow 0.2s",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "rgba(108,99,255,0.5)";
                      e.target.style.boxShadow = "0 0 0 3px rgba(108,99,255,0.12)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(255,255,255,0.08)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ── CATEGORY SECTIONS ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {filteredGroups.map((group, idx) => (
              <section key={group.category} style={glass.section}>

                {/* section header */}
                <div style={{ marginBottom: "20px", display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                  <div>
                    <span
                      style={{
                        display: "inline-block",
                        background: "rgba(108, 99, 255, 0.18)",
                        border: "1px solid rgba(108, 99, 255, 0.3)",
                        color: "#a89eff",
                        borderRadius: "999px",
                        padding: "2px 12px",
                        fontSize: "11px",
                        fontWeight: 700,
                        marginBottom: "8px",
                      }}
                    >
                      Section {idx + 1}
                    </span>
                    <h2 style={{ fontSize: "clamp(18px, 2vw, 22px)", fontWeight: 700, margin: "0 0 4px 0" }}>{group.category}</h2>
                    <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", margin: 0 }}>
                      {group.domains.length} topic{group.domains.length !== 1 ? "s" : ""} available
                    </p>
                  </div>
                  <span
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "999px",
                      padding: "4px 14px",
                      fontSize: "11px",
                      color: "rgba(255,255,255,0.4)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {group.domains.length} topics
                  </span>
                </div>

                {/* domain cards grid */}
                <div
                  style={{
                    display: "grid",
                    gap: "14px",
                    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                  }}
                >
                  {group.domains.map((domain) => (
                    <DomainCard
                      key={domain}
                      domain={domain}
                      category={group.category}
                      active={selected === domain}
                      onClick={() => openPractice(domain)}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>

        </div>
      </div>

      {/* responsive fix for header grid */}
      <style>{`
        @media (max-width: 768px) {
          .header-grid {
            grid-template-columns: 1fr !important;
          }
        }
        input::placeholder {
          color: rgba(255,255,255,0.25);
        }
      `}</style>
    </>
  );
}