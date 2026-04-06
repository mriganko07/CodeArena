import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SoftBackdrop from "../../components/SoftBackdrop";
import LenisScroll from "../../components/lenis";
import InterViewHeader from "../../components/InterViewHeader"

const InterviewPanel = () => {
  const videoRef = useRef(null);
  const [status, setStatus] = useState("idle");
  const [cameraError, setCameraError] = useState(null);

  useEffect(() => {
    let stream = null;

    async function enableCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 1280, height: 720 },
          audio: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera Access Denied:", err);
        setCameraError("Camera access denied. Please check browser permissions.");
      }
    }

    if (status === "active") {
      enableCamera();
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [status]);

  const toggleInterview = () => {
    if (status === "idle") {
      setStatus("active");
      setCameraError(null);
    } else {
      const confirmStop = window.confirm("Are you sure you want to stop the interview?");
      if (confirmStop) {
        setStatus("idle");
      }
    }
  };

  return (
    <div className="min-h-screen text-white font-sans selection:bg-indigo-500/30 overflow-hidden">
      <SoftBackdrop />
      <LenisScroll />
      <InterViewHeader />

      <main className="p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-80px)] max-w-[1600px] mx-auto">
        
        <motion.section
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden flex flex-col shadow-2xl"
        >
          <div className="p-4 border-b border-white/10 bg-white/5 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-500/40"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500/40"></div>
                <div className="h-3 w-3 rounded-full bg-green-500/40"></div>
              </div>
              <span className="text-[11px] font-bold tracking-[0.2em] text-indigo-300 uppercase ml-2">
                Technical Assessment
              </span>
            </div>
            {status === "active" && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="text-xs font-mono text-gray-400 bg-black/20 px-3 py-1 rounded-md"
              >
                00:45:12 Remaining
              </motion.div>
            )}
          </div>

          <div className="flex-1 p-8 flex flex-col justify-center items-center text-center">
            <div className="space-y-6 w-full max-w-4xl px-4">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 via-indigo-200 to-white bg-clip-text text-transparent transition-all duration-500">
                {status === "active" ? "Question Loading..." : "Ready to Start?"}
              </h1>
              <p className="text-gray-400 text-sm md:whitespace-nowrap">
                {status === "active" 
                  ? "Code section or MCQ That will be set by backend. Solve the challenge to proceed."
                  : "Please ensure your camera and microphone are working before clicking 'Start Interview'."}
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-4 flex flex-col gap-6"
        >
          
          <div className="aspect-video bg-black/60 border border-indigo-500/30 rounded-3xl relative overflow-hidden ring-1 ring-indigo-500/20 shadow-xl group">
            {status === "idle" ? (
              <div className="h-full w-full flex flex-col items-center justify-center text-gray-500 gap-3">
                <div className="p-4 rounded-full bg-white/5 border border-white/10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                </div>
                <span className="text-[10px] uppercase tracking-widest font-bold">Camera Offline</span>
              </div>
            ) : cameraError ? (
              <div className="h-full w-full flex items-center justify-center p-6 text-center text-red-400 text-xs italic">
                {cameraError}
              </div>
            ) : (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="h-full w-full object-cover scale-x-[-1]"
              />
            )}
            
            <AnimatePresence>
                {status === "active" && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute top-4 left-4 flex items-center gap-2 bg-red-600/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter animate-pulse shadow-lg"
                    >
                        <span className="h-2 w-2 bg-white rounded-full"></span> REC
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="absolute bottom-4 left-4 text-[11px] font-semibold text-white/90 bg-black/60 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Candidate: Sanket Adhikary
            </div>
          </div>

          <div className="flex-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col shadow-2xl overflow-hidden">
            <h3 className="text-[10px] font-black text-indigo-400 mb-6 uppercase tracking-[0.3em] flex items-center gap-2">
              <span className={`h-1.5 w-1.5 rounded-full ${status === 'active' ? 'bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]' : 'bg-gray-600'}`}></span>
              AI Interviewer
            </h3>

            <div className="flex-1 overflow-y-auto space-y-5 pr-2 mb-6 scrollbar-hide">
              <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl rounded-tl-none text-sm text-indigo-50 leading-relaxed shadow-inner">
                {status === "active" 
                    ? "The session has started. I will be monitoring your progress. Good luck!" 
                    : "I am waiting for you to start the session. Once you are ready, click the 'Start' button below."}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                disabled={status === "idle"}
                className={`flex items-center justify-center gap-2 py-3.5 rounded-2xl border transition-all active:scale-95 text-xs font-bold uppercase tracking-widest
                    ${status === "idle" 
                        ? "bg-gray-500/5 border-white/5 text-gray-600 cursor-not-allowed opacity-50" 
                        : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:text-white"
                    }`}
              >
                <div className={`h-2 w-2 rounded-full ${status === 'idle' ? 'bg-gray-600' : 'bg-yellow-500'}`}></div>
                Break
              </button>

              <button
                onClick={toggleInterview}
                className={`flex items-center justify-center gap-2 py-3.5 rounded-2xl border transition-all active:scale-95 text-xs font-bold uppercase tracking-widest
                    ${status === "idle"
                        ? "bg-indigo-500/20 border-indigo-500/40 text-indigo-400 hover:bg-indigo-500 hover:text-white shadow-[0_0_15px_rgba(99,102,241,0.2)]"
                        : "bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white"
                    }`}
              >
                {status === "idle" ? (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                        Start
                    </>
                ) : (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <rect x="6" y="6" width="12" height="12" rx="2" />
                        </svg>
                        Stop
                    </>
                )}
              </button>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default InterviewPanel;