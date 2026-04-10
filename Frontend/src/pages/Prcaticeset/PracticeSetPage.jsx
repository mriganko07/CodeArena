import React from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function PracticeSetPage() {
  const { domain } = useParams();
  const navigate = useNavigate();
  const decoded = decodeURIComponent(domain || "");

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <div className="mx-auto flex min-h-screen max-w-4xl items-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full rounded-3xl border border-white/10 bg-[#1F2937] p-8 shadow-2xl shadow-black/30">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#6C63FF]/30 bg-[#2A1454] px-4 py-2 text-sm text-white/90">
            <span className="h-2 w-2 rounded-full bg-[#22C55E]" />
            Practice Set Loaded
          </div>

          <h1 className="mt-6 text-3xl font-bold sm:text-4xl">{decoded}</h1>
          <p className="mt-4 text-white/70">
            This is a dummy practice set page. Replace this with your actual interview questions later.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => navigate(-1)}
              className="rounded-xl bg-[#6C63FF] px-5 py-3 font-semibold text-white transition hover:bg-[#5b54f3]"
            >
              Go Back
            </button>
            <button className="rounded-xl border border-white/10 bg-[#111827] px-5 py-3 font-semibold text-white/80 transition hover:border-[#6C63FF]/40 hover:bg-[#0f172a]">
              Start Questions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}