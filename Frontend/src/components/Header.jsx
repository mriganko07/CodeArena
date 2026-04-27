import { useState, useRef, useEffect } from "react";
import { Search, ChevronDown, FileText, User, Lock, LogOut, X } from "lucide-react";
import SoftBackdrop from "./SoftBackdrop";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const [open, setOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const dropdownRef = useRef(null);
    const [search, setSearch] = useState("");

    const { user, isLoggedIn, logout } = useAuth();
    const navigate = useNavigate();

    const fullName = user ? `${user.firstName} ${user.lastName}` : "";
    const initials = user ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase() : "";

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <>
            <header className="p-5 shadow-lg flex justify-between items-center bg-white/5 backdrop-blur-md relative">

                <a href="/" className="text-2xl font-bold text-slate-200 hover:text-white transition-colors cursor-pointer">
                    CodeArena
                </a>

                <div className="flex items-center border border-gray-600 rounded-lg overflow-hidden shadow-sm relative">

                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Enter Drive Id"
                        className="px-3 py-2 outline-none text-sm w-52 pr-8 bg-transparent text-white"
                    />

                    {search && (
                        <button
                            onClick={() => setSearch("")}
                            className="absolute right-14 text-gray-400 hover:text-white"
                        >
                            <X size={16} />
                        </button>
                    )}

                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-slate-800 text-white px-4 py-2 flex items-center justify-center"
                    >
                        <Search size={18} />
                    </button>

                </div>

                {isLoggedIn && (
                    <div className="relative" ref={dropdownRef}>
                        <div
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={() => setOpen(!open)}
                        >
                            <div className="p-[2px] rounded-full bg-gradient-to-tr from-indigo-600 via-purple-700 to-indigo-900 shadow-[0_0_12px_rgba(99,102,241,0.35)]">
                                <div className="w-9 h-9 rounded-full overflow-hidden bg-[#0f172a] flex items-center justify-center text-sm text-white">
                                    {user?.picture ? (
                                        <img
                                            src={user.picture}
                                            alt="Profile"
                                            referrerPolicy="no-referrer"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        initials
                                    )}
                                </div>
                            </div>

                            <h3 className="text-slate-300 font-semibold">
                                {fullName}
                            </h3>

                            <ChevronDown
                                size={20}
                                className={`transition-transform text-slate-300 ${open ? "rotate-180" : ""}`}
                            />
                        </div>

                        {open && (
                            <div className="absolute right-0 mt-7 w-56 bg-black/90 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg p-3 space-y-2 z-50">

                                <a href="/profile" className="flex items-center gap-2 px-3 py-2 rounded-lg font-bold text-slate-200 hover:bg-white/10">
                                    <User size={16} strokeWidth={3} />
                                    My Profile
                                </a>

                                <a href="/change-password" className="flex items-center gap-2 px-3 py-2 rounded-lg font-bold text-slate-200 hover:bg-white/10">
                                    <Lock size={16} strokeWidth={3} />
                                    Change Password
                                </a>

                                <button 
                                    onClick={handleLogout} 
                                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg font-bold text-red-400 hover:bg-red-500/10 text-left"
                                >
                                    <LogOut size={16} strokeWidth={3} />
                                    Log Out
                                </button>

                            </div>
                        )}
                    </div>
                )}

            </header>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-md"
                        onClick={() => setShowModal(false)}
                    />
                    <div
                        className="relative w-[500px] rounded-3xl overflow-hidden shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="absolute inset-0 opacity-30">
                            <SoftBackdrop />
                        </div>
                        <div className="relative z-10 p-6 bg-white/20 backdrop-blur-2xl rounded-3xl">
                            <div className="flex items-center gap-2 border border-white/20 rounded-lg px-3 py-2 mb-4">
                                <Search size={18} />
                                <span className="text-white font-medium">242769</span>
                            </div>
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 rounded-full bg-white/20 flex items-center justify-center">
                                    <FileText size={30} className="text-white" strokeWidth={2} />
                                </div>
                                <div className="leading-tight">
                                    <h2 className="text-lg font-bold text-white">
                                        Techno India Group of Institutions Kolkata Bot Assessment 24th Feb
                                    </h2>
                                    <p className="text-sm text-white/70">
                                        February 24, 2026
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-2 text-sm text-white">
                                <p>✔ Questions</p>
                                <p>✔ Start Time: <b>10:00 AM IST</b></p>
                                <p>✔ Duration: -</p>
                            </div>
                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 border text-white border-white/30 hover:bg-white/10 transition-colors rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button className="px-4 py-2 bg-gray-300 text-gray-600 rounded-lg cursor-not-allowed">
                                    Register
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;