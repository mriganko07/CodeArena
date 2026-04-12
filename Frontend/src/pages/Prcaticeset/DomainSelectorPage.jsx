import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div className="min-h-screen bg-[#050816] text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* ── HEADER CARD ── */}
        <div className="mb-10 rounded-3xl border border-white/10 bg-[#1F2937] p-6 shadow-2xl shadow-black/30 sm:p-8">

          {/* top row */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#6C63FF]/30 bg-[#2A1454] px-4 py-2 text-sm text-white/90">
              <span className="text-base">✦</span>
              Interview Practice Domain Selector
            </div>

            {/* categories · topics badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#111827] px-4 py-2 text-sm text-white/70">
              <span className="h-2 w-2 rounded-full bg-[#22C55E]" />
              {groups.length} categories · {totalTopics} topics
            </div>
          </div>

          {/* heading + search row */}
          <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_0.9fr] lg:items-end">
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Choose a domain,{" "}
                <span className="bg-gradient-to-r from-[#7C6FF7] to-[#6C63FF] bg-clip-text text-transparent">
                  start practicing.
                </span>
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-white/60 sm:text-base">
                Browse every interview topic in one place. Search fast, pick a domain, and jump straight into
                a focused practice session.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#111827] p-4">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-white/50">
                Search Domains
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-base">
                  🔍
                </span>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Type to filter..."
                  className="w-full rounded-xl border border-white/10 bg-[#1F2937] py-3 pl-9 pr-4 text-white outline-none placeholder:text-white/30 focus:border-[#6C63FF] focus:ring-2 focus:ring-[#6C63FF]/30"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── CATEGORY SECTIONS ── */}
        <div className="space-y-6">
          {filteredGroups.map((group, idx) => (
            <section
              key={group.category}
              // className="rounded-3xl border bg-[#1F2937] p-6 shadow-xl shadow-black/20 sm:p-8"
              className="rounded-[22px] border border-white/7 bg-white/[0.03] p-5 sm:p-6"
              // style={{ borderColor: "#0d1117" }}
            >
              {/* section label + heading */}
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <span className="mb-1 inline-block rounded-full bg-[#2A1454] px-3 py-0.5 text-xs font-semibold text-[#6C63FF]">
                    Section {idx + 1}
                  </span>
                  <h2 className="text-xl font-bold sm:text-2xl">{group.category}</h2>
                  <p className="mt-0.5 text-xs text-white/40">
                    {group.domains.length} topic{group.domains.length !== 1 ? "s" : ""} available
                  </p>
                </div>
                <span className="rounded-full border border-white/10 bg-[#111827] px-3 py-1 text-xs text-white/50">
                  {group.domains.length} topics
                </span>
              </div>

              {/* domain cards */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {group.domains.map((domain) => {
                  const active = selected === domain;
                  return (
                    <button
                      key={domain}
                      // onClick={() => openPractice(domain)}
                      className={[
                        "group relative rounded-2xl border p-4 text-left transition-all duration-300",
                        "bg-[#111827] hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40",
                        active
                          ? "border-[#6C63FF] ring-2 ring-[#6C63FF]/30"
                          : "border-white/10 hover:border-[#6C63FF]/50",
                      ].join(" ")}
                    >
                      {/* category pill */}
                      <span className="inline-block rounded-full bg-[#2A1454] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-[#6C63FF]">
                        {group.category}
                      </span>

                      {/* title + arrow */}
                      <div className="mt-3 flex items-start justify-between gap-3">
                        <h3 className="text-sm font-semibold leading-5 text-white group-hover:text-[#6C63FF] transition-colors">
                          {domain}
                        </h3>
                        <div
                          className={[
                            "shrink-0 rounded-xl p-2 text-sm transition-all duration-200",
                            active
                              ? "bg-[#6C63FF] text-white"
                              : "bg-[#2A1454] text-[#6C63FF] group-hover:bg-[#6C63FF] group-hover:text-white",
                          ].join(" ")}
                        >
                          →
                        </div>
                      </div>

                      {/* footer */}
                      <div className="mt-4 flex items-center gap-2 text-xs text-white/40">
                        <span className="h-2 w-2 rounded-full bg-[#22C55E]" />
                        Open practice set
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}