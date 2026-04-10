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
        <div className="mb-8 rounded-3xl border border-white/10 bg-[#1F2937] p-6 shadow-2xl shadow-black/30 sm:p-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#6C63FF]/30 bg-[#2A1454] px-4 py-2 text-sm text-white/90">
            <span className="h-2 w-2 rounded-full bg-[#22C55E]" />
            Interview Practice Domain Selector
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_0.9fr] lg:items-end">
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Choose a domain and start practicing
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-white/70 sm:text-base">
                Search and select a domain from grouped categories. Each card navigates to a practice set page.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#111827] p-4">
              <label className="mb-2 block text-sm font-medium text-white/80">Search domains</label>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Type to filter..."
                className="w-full rounded-xl border border-white/10 bg-[#1F2937] px-4 py-3 text-white outline-none placeholder:text-white/40 focus:border-[#6C63FF] focus:ring-2 focus:ring-[#6C63FF]/30"
              />
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {filteredGroups.map((group) => (
            <section key={group.category} className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold sm:text-xl">{group.category}</h2>
                <span className="rounded-full border border-white/10 bg-[#111827] px-3 py-1 text-xs text-white/60">
                  {group.domains.length} topics
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {group.domains.map((domain) => {
                  const active = selected === domain;
                  return (
                    <button
                      key={domain}
                      onClick={() => openPractice(domain)}
                      className={[
                        "group rounded-2xl border p-4 text-left transition-all duration-300",
                        "bg-[#1F2937] hover:-translate-y-1 hover:bg-[#111827] hover:shadow-lg hover:shadow-black/30",
                        active
                          ? "border-[#6C63FF] ring-2 ring-[#6C63FF]/30"
                          : "border-white/10 hover:border-[#6C63FF]/40",
                      ].join(" ")}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs uppercase tracking-widest text-white/40">{group.category}</p>
                          <h3 className="mt-2 text-base font-semibold leading-6 text-white group-hover:text-[#6C63FF]">
                            {domain}
                          </h3>
                        </div>
                        <div className="mt-1 rounded-xl bg-[#2A1454] p-2 text-[#6C63FF] transition group-hover:bg-[#6C63FF] group-hover:text-white">
                          →
                        </div>
                      </div>

                      <div className="mt-4 flex items-center gap-2 text-xs text-white/50">
                        <span className="h-2 w-2 rounded-full bg-[#22C55E]" />
                        Click to open practice set
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