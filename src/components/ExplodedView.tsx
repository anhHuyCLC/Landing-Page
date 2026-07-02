import { Info } from "lucide-react";
import type { ActiveBuild } from "../type";

interface ExplodedViewProps {
  activeBuild: ActiveBuild;
  activeHotspot: string | null;
  setActiveHotspot: (hotspot: string | null) => void;
}

export default function ExplodedView({
  activeBuild,
  activeHotspot,
  setActiveHotspot,
}: ExplodedViewProps) {
  const primaryColor = activeBuild.theme.primaryColor;

  return (
    <section id="components" className="py-24 px-6 md:px-20 max-w-7xl mx-auto relative">
      <div className="text-center mb-16 space-y-4">
        <h2 className="font-display text-3xl md:text-5xl font-extrabold text-white tracking-tight">
          Precision Engineered
        </h2>
        <p className="font-sans text-[#bac9cc] max-w-xl mx-auto">
          Từng linh kiện được lựa chọn kỹ lưỡng và giải nhiệt tối ưu để duy trì hiệu năng đỉnh cao không giới hạn.
        </p>
      </div>

      <div className="relative w-full h-[500px] md:h-[700px] glass-panel rounded-3xl overflow-hidden group flex items-center justify-center border border-white/5 shadow-2xl">
        {/* Real PC Artwork Backing */}
        <div className="absolute inset-0 z-0">
          <img
            alt="Exploded PC View"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCmBqcU-LP9kkwBQA_eTLAO0I8Zp0B2ar_YfXag8AOv-5r_ogU3ltIEzYgfplD2W35_2irM70JLqKMwCUjG44IVLEbrJIE2ttxHh-a0WnMQr-hQrWSDeVbAZWBiCHjGbAuqSlDK55Rl3Swd_6kjGCjDErznEdiMR9RwsuSY-nKQ0fOe3prL41Bmb3g84ttaHBQOcQ-b8jw_ju9ZcsBERhB1L4pAclbXtXNLBGhC-YYBohMkrSUONHw38DOTTg4jcxz0xrduiOMpcYt"
            className="w-full h-full object-cover opacity-40 mix-blend-screen scale-105 group-hover:scale-100 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]" />
        </div>

        {/* Interactive Custom Interactive Hotspots */}
        <div className="absolute inset-0 z-10">
          {/* CPU Hotspot */}
          <div
            className="absolute top-[32%] left-[48%] -translate-x-1/2 -translate-y-1/2"
            onMouseEnter={() => setActiveHotspot("cpu")}
            onMouseLeave={() => setActiveHotspot(null)}
            onClick={() => setActiveHotspot("cpu")}
          >
            <div className="w-8 h-8 rounded-full bg-white/10 border border-white/30 flex items-center justify-center cursor-pointer relative group/pulse">
              <div
                className="w-2.5 h-2.5 rounded-full transition-colors duration-500"
                style={{ backgroundColor: primaryColor }}
              />
              <div
                className="absolute inset-0 rounded-full border hotspot-ring"
                style={{ borderColor: primaryColor }}
              />
            </div>

            {/* Popover overlay */}
            <div
              className={`absolute left-10 top-1/2 -translate-y-1/2 w-72 glass-panel p-5 rounded-2xl transition-all duration-300 pointer-events-none shadow-2xl z-20 ${activeHotspot === "cpu" ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                }`}
            >
              <span className="font-mono text-[9px] tracking-wider uppercase" style={{ color: primaryColor }}>
                Component Detail
              </span>
              <h4 className="font-display text-lg font-bold text-white mt-1">{activeBuild.cpu.name}</h4>
              <p className="font-sans text-xs text-[#bac9cc] mt-1">{activeBuild.cpu.specs}</p>
              <div className="h-[1px] w-full bg-white/10 my-3" />
              <div className="flex justify-between items-center">
                <span className="font-mono text-[9px] text-[#bac9cc]">POWER DRAW</span>
                <span className="font-mono text-xs text-white">{activeBuild.cpu.powerDraw}W</span>
              </div>
            </div>
          </div>

          {/* GPU Hotspot */}
          <div
            className="absolute top-[52%] left-[42%] -translate-x-1/2 -translate-y-1/2"
            onMouseEnter={() => setActiveHotspot("gpu")}
            onMouseLeave={() => setActiveHotspot(null)}
            onClick={() => setActiveHotspot("gpu")}
          >
            <div className="w-8 h-8 rounded-full bg-white/10 border border-white/30 flex items-center justify-center cursor-pointer relative group/pulse">
              <div
                className="w-2.5 h-2.5 rounded-full transition-colors duration-500"
                style={{ backgroundColor: primaryColor }}
              />
              <div
                className="absolute inset-0 rounded-full border hotspot-ring"
                style={{ borderColor: primaryColor, animationDelay: "0.5s" }}
              />
            </div>

            {/* Popover overlay */}
            <div
              className={`absolute right-10 top-1/2 -translate-y-1/2 w-72 glass-panel p-5 rounded-2xl transition-all duration-300 pointer-events-none shadow-2xl z-20 ${activeHotspot === "gpu" ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                }`}
            >
              <span className="font-mono text-[9px] tracking-wider uppercase" style={{ color: primaryColor }}>
                Component Detail
              </span>
              <h4 className="font-display text-lg font-bold text-white mt-1">{activeBuild.gpu.name}</h4>
              <p className="font-sans text-xs text-[#bac9cc] mt-1">{activeBuild.gpu.specs}</p>
              <div className="h-[1px] w-full bg-white/10 my-3" />
              <div className="flex justify-between items-center">
                <span className="font-mono text-[9px] text-[#bac9cc]">VRAM</span>
                <span className="font-mono text-xs text-white">24GB GDDR6X</span>
              </div>
            </div>
          </div>

          {/* RAM Hotspot */}
          <div
            className="absolute top-[28%] left-[58%] -translate-x-1/2 -translate-y-1/2"
            onMouseEnter={() => setActiveHotspot("ram")}
            onMouseLeave={() => setActiveHotspot(null)}
            onClick={() => setActiveHotspot("ram")}>
            <div className="w-8 h-8 rounded-full bg-white/10 border border-white/30 flex items-center justify-center cursor-pointer relative group/pulse">
              <div
                className="w-2.5 h-2.5 rounded-full transition-colors duration-500"
                style={{ backgroundColor: primaryColor }}
              />
              <div
                className="absolute inset-0 rounded-full border hotspot-ring"
                style={{ borderColor: primaryColor, animationDelay: "0.8s" }}
              />
            </div>

            {/* Popover overlay */}
            <div
              className={`absolute left-10 top-1/2 -translate-y-1/2 w-72 glass-panel p-5 rounded-2xl transition-all duration-300 pointer-events-none shadow-2xl z-20 ${activeHotspot === "ram" ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                }`}
            >
              <span className="font-mono text-[9px] tracking-wider uppercase" style={{ color: primaryColor }}>
                Component Detail
              </span>
              <h4 className="font-display text-lg font-bold text-white mt-1">{activeBuild.ram.name}</h4>
              <p className="font-sans text-xs text-[#bac9cc] mt-1">{activeBuild.ram.specs}</p>
              <div className="h-[1px] w-full bg-white/10 my-3" />
              <div className="flex justify-between items-center">
                <span className="font-mono text-[9px] text-[#bac9cc]">SPEED</span>
                <span className="font-mono text-xs text-white">6400 MT/s</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hint Badge */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 glass-panel px-4 py-2 rounded-full border-white/10 flex items-center gap-2 pointer-events-none">
          <Info size={12} style={{ color: primaryColor }} />
          <span className="font-mono text-[10px] uppercase text-white/80">
            Di chuột qua điểm sáng để xem thông số kỹ thuật
          </span>
        </div>
      </div>
    </section>
  );
}
