import { useState, useRef, useEffect } from "react";
import { User, Lock, LogOut, ChevronDown } from "lucide-react";

export default function Header({ isInterviewActive }) {
  const [open, setOpen] = useState(false);
  const headerRef = useRef();

  useEffect(() => {
    if (isInterviewActive) {
      setOpen(false);
    }
  }, [isInterviewActive]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="p-5 shadow-lg flex justify-between items-center bg-white/5 backdrop-blur-md relative z-50">
      
      <a href="/" className="text-2xl font-bold text-slate-200">
        CodeArena
      </a>

      <div className="relative" ref={headerRef}>
        
        <div
          className={`flex items-center gap-2 ${
            isInterviewActive ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          onClick={() => {
            if (!isInterviewActive) setOpen(!open);
          }}
        >
          <div className="w-9 h-9 rounded-full bg-indigo-900 text-white flex items-center justify-center text-sm">
            SA
          </div>

          <h3 className="text-slate-300 font-semibold">
            Sanket Adhikary
          </h3>

          {!isInterviewActive && (
            <ChevronDown
              size={18}
              className={`text-slate-300 transition-transform duration-300 ${
                open ? "rotate-180" : ""
              }`}
            />
          )}
        </div>

        {open && !isInterviewActive && (
          <div className="absolute right-0 mt-4 w-56 z-[9999] bg-black/100 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-3 space-y-2">
            
            <a href="/profile" className="flex items-center gap-2 px-3 py-2 rounded-lg font-bold text-slate-200 hover:bg-white/10">
              <User size={16} strokeWidth={3} />
              My Profile
            </a>

            <a href="/change-password" className="flex items-center gap-2 px-3 py-2 rounded-lg font-bold text-slate-200 hover:bg-white/10">
              <Lock size={16} strokeWidth={3} />
              Change Password
            </a>

            <a href="/logout" className="flex items-center gap-2 px-3 py-2 rounded-lg font-bold text-red-400 hover:bg-red-500/10">
              <LogOut size={16} strokeWidth={3} />
              Log Out
            </a>

          </div>
        )}
      </div>
    </header>
  );
}