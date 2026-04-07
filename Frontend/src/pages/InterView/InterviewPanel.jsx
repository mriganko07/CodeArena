import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SoftBackdrop from "../../components/SoftBackdrop";
import LenisScroll from "../../components/lenis";
import InterViewHeader from "../../components/InterViewHeader";

const CustomModal = ({ isOpen, title, message, type, onClose, onConfirm }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-md bg-[#0f1117]/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10 shadow-2xl overflow-hidden text-center"
          >
            <div
              className={`absolute top-0 left-0 w-full h-1.5 ${type === "danger" ? "bg-red-500" : "bg-indigo-500"}`}
            />

            <div className="space-y-4">
              <h3
                className={`text-xl font-bold tracking-tight ${type === "danger" ? "text-red-400" : "text-indigo-300"}`}
              >
                {title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">{message}</p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              {onConfirm && (
                <button
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                  className="flex-1 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-black uppercase tracking-widest transition-all active:scale-95"
                >
                  Confirm
                </button>
              )}
              <button
                onClick={onClose}
                className="flex-1 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 text-[10px] font-black uppercase tracking-widest transition-all active:scale-95"
              >
                {onConfirm ? "Cancel" : "Close"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const DeviceSetupModal = ({ isOpen, onClose, onConfirm }) => {
  const previewVideoRef = useRef(null);
  const [error, setError] = useState(null);
  const [audioLevel, setAudioLevel] = useState(0);

  useEffect(() => {
    let stream = null;
    let audioContext = null;
    let analyser = null;
    let animationFrameId;

    const setupDevices = async () => {
      try {
        setError(null);
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        if (previewVideoRef.current) {
          previewVideoRef.current.srcObject = stream;
        }

        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioContext = new AudioContext();
        const source = audioContext.createMediaStreamSource(stream);
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        source.connect(analyser);

        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        const checkAudioLevel = () => {
          analyser.getByteFrequencyData(dataArray);
          let sum = 0;
          for (let i = 0; i < dataArray.length; i++) {
            sum += dataArray[i];
          }
          const average = sum / dataArray.length;
          setAudioLevel(Math.min(average * 2, 100));
          animationFrameId = requestAnimationFrame(checkAudioLevel);
        };

        checkAudioLevel();
      } catch (err) {
        setError(
          "Camera or Microphone access denied. Please allow permissions in your browser.",
        );
        console.error("Device error:", err);
      }
    };

    if (isOpen) {
      setupDevices();
    }

    return () => {
      if (stream) stream.getTracks().forEach((track) => track.stop());
      if (audioContext && audioContext.state !== "closed") audioContext.close();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg bg-[#0f1117]/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 shadow-2xl overflow-hidden"
          >
            <div className="space-y-6">
              <h3 className="text-xl font-bold tracking-tight text-indigo-300 text-center">
                Device Setup & Test
              </h3>

              {error ? (
                <div className="p-4 bg-red-500/20 border border-red-500/40 rounded-xl text-red-300 text-sm text-center">
                  {error}
                </div>
              ) : (
                <div className="space-y-4">

                  <div className="aspect-video bg-black/50 rounded-2xl overflow-hidden border border-white/10 relative">
                    <video
                      ref={previewVideoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover scale-x-[-1]"
                    />
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2">
                    <div className="flex justify-between text-xs text-gray-400 font-mono uppercase tracking-wider">
                      <span>Microphone Signal</span>
                      <span>{Math.round(audioLevel)}%</span>
                    </div>
                    <div className="w-full h-2 bg-black/50 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 transition-all duration-75"
                        style={{ width: `${audioLevel}%` }}
                      />
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 text-center">
                    Speak to test your microphone and verify your camera angle
                    before starting.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-8 flex gap-3">
              <button
                onClick={onConfirm}
                disabled={!!error}
                className="flex-1 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-700 disabled:text-gray-500 text-white text-[10px] font-black uppercase tracking-widest transition-all active:scale-95"
              >
                Start Interview
              </button>
              <button
                onClick={onClose}
                className="px-6 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 text-[10px] font-black uppercase tracking-widest transition-all active:scale-95"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const InterviewPanel = () => {
  const videoRef = useRef(null);
  const violationCount = useRef(0);
  const [status, setStatus] = useState("idle");
  const [cameraError, setCameraError] = useState(null);

  const [isSetupModalOpen, setIsSetupModalOpen] = useState(false);

  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "info",
    onConfirm: null,
  });

  const closeModal = () =>
    setModalConfig((prev) => ({ ...prev, isOpen: false }));

  const triggerAlert = (title, message, type = "info", onConfirm = null) => {
    setModalConfig({ isOpen: true, title, message, type, onConfirm });
  };

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
        setCameraError("Camera access denied. Please check permissions.");
      }
    }

    if (status === "active") {
      enableCamera();
    } else {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
    }
    return () => {
      if (stream) stream.getTracks().forEach((track) => track.stop());
    };
  }, [status]);

  useEffect(() => {
    if (status !== "active") return;

    let interval;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const checkCamera = () => {
      if (modalConfig.isOpen) return;

      const video = videoRef.current;
      if (!video || video.readyState < 2) return;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = frame.data;
      let totalBrightness = 0;

      for (let i = 0; i < pixels.length; i += 40) {
        totalBrightness += (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;
      }

      const avgBrightness = totalBrightness / (pixels.length / 40);

      if (avgBrightness < 50) {
        violationCount.current += 1;

        if (violationCount.current >= 4) {
          setStatus("idle");
          violationCount.current = 0;
          triggerAlert(
            "Session Terminated",
            "Multiple visual quality violations detected. The interview has been ended automatically due to poor lighting or camera obstruction.",
            "danger",
          );

          if (document.fullscreenElement) {
            document.exitFullscreen().catch(() => {});
          }
        } else {
          triggerAlert(
            "Visual Quality Warning",
            `Warning ${violationCount.current}/3: Your camera feed is too dark. Please fix your lighting or the session will be terminated.`,
            "danger",
          );
        }
      }
    };

    interval = setInterval(checkCamera, 5000);
    return () => {
      clearInterval(interval);
      if (status === "idle") violationCount.current = 0;
    };
  }, [status, modalConfig.isOpen]);

  useEffect(() => {
    if (status !== "active") return;

    const handleViolation = (msg) => {
      setStatus("idle");
      triggerAlert("Security Violation", msg, "danger");
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
    };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && status === "active") {
        document.documentElement
          .requestFullscreen()
          .then(() => {
            triggerAlert(
              "Security Violation",
              "Exiting full-screen mode is prohibited. Your attempt has been logged.",
              "danger",
            );
          })
          .catch((err) => {
            console.error("Fullscreen re-entry blocked:", err);
            handleViolation("Security protocol failed. Session terminated.");
          });
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        handleViolation("Tab switching is strictly prohibited.");
      }
    };

    const handleBlur = () => {
      handleViolation("Security protocol failed. Session terminated.");
    };

    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      const ctrlOrMeta = e.ctrlKey || e.metaKey;

      const forbiddenKeys = ["c", "v", "u", "y", "t", "w", "l", "r", "i", "p"];
      if (key === "escape") {
        e.preventDefault();
        return;
      }

      if (
        (ctrlOrMeta && forbiddenKeys.includes(key)) ||
        (e.altKey && key === "tab") ||
        key === "f12" ||
        (ctrlOrMeta && e.shiftKey && key === "i")
      ) {
        e.preventDefault();
        e.stopPropagation();
        triggerAlert(
          "Restricted Action",
          "Shortcut disabled. This attempt has been logged.",
          "danger",
        );
      }
    };

    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("keydown", handleKeyDown, true);
    document.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("blur", handleBlur);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("keydown", handleKeyDown, true);
      document.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("blur", handleBlur);
    };
  }, [status]);

  const toggleInterview = () => {
    if (status === "idle") {
      setIsSetupModalOpen(true);
    } else {
      triggerAlert(
        "End Session?",
        "Are you sure you want to stop the interview? Your progress will be finalized.",
        "danger",
        () => {
          setStatus("idle");
          if (document.fullscreenElement) document.exitFullscreen();
        },
      );
    }
  };

  const startActualInterview = () => {
    setIsSetupModalOpen(false);
    setStatus("active");
    setCameraError(null);
    document.documentElement.requestFullscreen?.();
  };

  return (
    <div className="min-h-screen text-white font-sans selection:bg-indigo-500/30 overflow-hidden">
      <SoftBackdrop />
      <LenisScroll />

      <InterViewHeader isInterviewActive={status === "active"} />

      <CustomModal {...modalConfig} onClose={closeModal} />

      <DeviceSetupModal
        isOpen={isSetupModalOpen}
        onClose={() => setIsSetupModalOpen(false)}
        onConfirm={startActualInterview}
      />

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
              <div className="text-xs font-mono text-gray-400 bg-black/20 px-3 py-1 rounded-md">
                00:45:12 Remaining
              </div>
            )}
          </div>

          <div className="flex-1 p-8 flex flex-col justify-center items-center text-center">
            <div className="space-y-6 w-full max-w-4xl px-4">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 via-indigo-200 to-white bg-clip-text text-transparent">
                {status === "active"
                  ? "Question Loading..."
                  : "Ready to Start?"}
              </h1>
              <p className="text-gray-400 text-sm">
                {status === "active"
                  ? "Assessment modules are initializing. Please stay focused."
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
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-[10px] uppercase tracking-widest font-bold">
                  Camera Offline
                </span>
              </div>
            ) : (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="h-full w-full object-cover scale-x-[-1]"
                />
                {cameraError && (
                  <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-center p-4">
                    <div className="bg-red-500/20 border border-red-500/40 text-red-300 px-6 py-4 rounded-2xl text-sm font-semibold backdrop-blur-md">
                      ⚠ {cameraError}
                    </div>
                  </div>
                )}
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-600/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-black uppercase animate-pulse shadow-lg">
                  <span className="h-2 w-2 bg-white rounded-full"></span> REC
                </div>
              </>
            )}
          </div>

          <div className="flex-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col shadow-2xl">
            <h3 className="text-[10px] font-black text-indigo-400 mb-6 uppercase tracking-[0.3em] flex items-center gap-2">
              <span
                className={`h-1.5 w-1.5 rounded-full ${status === "active" ? "bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]" : "bg-gray-600"}`}
              />
              AI Interviewer
            </h3>

            <div className="flex-1 overflow-y-auto mb-8">
              <div className="p-5 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl text-sm text-indigo-50 leading-relaxed shadow-inner">
                {status === "active"
                  ? "System active. I am currently monitoring your session for compliance and technical performance."
                  : "Welcome. Please ensure you are in a quiet room with stable lighting before initiating the session."}
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={toggleInterview}
                className={`w-full max-w-[300px] flex items-center justify-center gap-3 py-4 rounded-2xl border transition-all active:scale-95 text-[10px] font-black uppercase tracking-[0.2em]
                    ${
                      status === "idle"
                        ? "bg-indigo-500/20 border-indigo-500/40 text-indigo-400 hover:bg-indigo-500 hover:text-white shadow-[0_0_20px_rgba(99,102,241,0.2)]"
                        : "bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white"
                    }`}
              >
                {status === "idle" ? (
                  <>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    Start Interview
                  </>
                ) : (
                  <>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <rect x="6" y="6" width="12" height="12" rx="2" />
                    </svg>
                    End Interview
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
