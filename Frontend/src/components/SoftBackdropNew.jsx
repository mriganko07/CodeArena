export default function SoftBackdropNew() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Base dark background depth */}
      <div className="absolute inset-0 bg-[#050816]" />

      {/* Main top center violet glow */}
      <div className="absolute left-1/2 top-12 -translate-x-1/2 w-[1400px] h-[700px] rounded-full bg-gradient-to-b from-violet-900/35 via-purple-900/20 to-transparent blur-[140px]" />

      {/* Left soft ambient shadow */}
      <div className="absolute left-[-180px] top-1/3 w-[700px] h-[700px] rounded-full bg-violet-950/20 blur-[180px]" />

      {/* Right magenta glow */}
      <div className="absolute right-[-120px] bottom-20 w-[700px] h-[700px] rounded-full bg-fuchsia-800/20 blur-[180px]" />

      {/* Center subtle purple fill */}
      <div className="absolute inset-x-0 top-1/4 mx-auto w-[1000px] h-[500px] rounded-full bg-purple-900/10 blur-[120px]" />

      {/* Bottom fade darkness */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050816] to-transparent" />
    </div>
  );
}