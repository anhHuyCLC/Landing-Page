import { motion } from "motion/react";
import { Monitor, Flame } from "lucide-react";
import { GAMES } from "../data";
import type { ActiveBuild, BenchmarkGame } from "../type";

interface PerformanceDashboardProps {
  activeBuild: ActiveBuild;
  selectedGame: BenchmarkGame;
  setSelectedGame: (game: BenchmarkGame) => void;
  currentFps: number;
  renderTime: string;
  peakThermal: number;
  aiComputeScore: string;
}

export default function PerformanceDashboard({
  activeBuild,
  selectedGame,
  setSelectedGame,
  currentFps,
  renderTime,
  peakThermal,
  aiComputeScore,
}: PerformanceDashboardProps) {
  const primaryColor = activeBuild.theme.primaryColor;

  return (
    <section id="telemetry" className="py-24 px-6 md:px-20 max-w-7xl mx-auto relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
        <div>
          <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: primaryColor }}>
            Live System Benchmarks
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold text-white mt-2">
            Real-Time Telemetry
          </h2>
        </div>

        {/* Game / Task selectors to update telemetry dynamically */}
        <div className="flex flex-wrap gap-2">
          {GAMES.map((game) => (
            <button
              key={game.id}
              onClick={() => setSelectedGame(game)}
              className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                selectedGame.id === game.id
                  ? "bg-white text-black font-bold"
                  : "glass-panel hover:bg-white/5 text-[#bac9cc]"
              }`}
            >
              {game.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Live FPS Counter Card - Large */}
        <div className="md:col-span-2 glass-panel rounded-3xl p-8 flex flex-col justify-between min-h-[320px] relative overflow-hidden group border border-white/5 shadow-xl">
          <div
            className="absolute top-0 right-0 w-48 h-48 opacity-10 blur-3xl rounded-full transition-all duration-500 group-hover:opacity-20 pointer-events-none"
            style={{ backgroundColor: primaryColor }}
          />

          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="font-mono text-[10px] tracking-wider text-[#bac9cc] uppercase">
                Gaming Simulation
              </span>
              <h3 className="font-display text-2xl md:text-4xl font-extrabold text-white">
                {selectedGame.name}
              </h3>
            </div>
            <div className="text-right">
              <div
                className="font-display text-6xl font-black tracking-tighter"
                style={{ color: primaryColor }}
              >
                {currentFps}
              </div>
              <span className="font-mono text-[9px] tracking-widest text-[#bac9cc] uppercase">
                AVG FPS @ 4K MAX
              </span>
            </div>
          </div>

          {/* Custom FPS graph line */}
          <div className="space-y-4 mt-8">
            <div className="w-full bg-white/5 h-1.5 rounded-full relative overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(currentFps / 540) * 100}%` }}
                transition={{ duration: 0.5 }}
                className="h-full rounded-full shadow-lg"
                style={{
                  backgroundColor: primaryColor,
                  boxShadow: `0 0 10px ${primaryColor}`,
                }}
              />
            </div>
            <div className="flex justify-between font-mono text-[9px] text-[#bac9cc]">
              <span>0 FPS</span>
              <span>1% Low: {Math.round(currentFps * 0.78)} FPS</span>
              <span>Target: {selectedGame.id === "valorant" ? "600 FPS" : "180 FPS"}</span>
            </div>
          </div>
        </div>

        {/* Video Rendering Counter */}
        <div className="glass-panel rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group border border-white/5 shadow-xl">
          <div
            className="absolute top-0 right-0 w-32 h-32 opacity-5 blur-2xl rounded-full pointer-events-none"
            style={{ backgroundColor: "#cdbdff" }}
          />

          <div className="flex justify-between items-center">
            <span className="font-mono text-[10px] tracking-wider text-[#bac9cc] uppercase">
              Media Productivity
            </span>
            <Monitor size={18} className="text-[#cdbdff]" />
          </div>

          <div className="my-6">
            <div className="font-display text-5xl font-black text-white tracking-tight">
              {renderTime}s
            </div>
            <span className="font-mono text-[10px] tracking-widest text-[#bac9cc] uppercase block mt-2">
              4K VIDEO RENDER (1GB)
            </span>
          </div>

          <p className="font-sans text-xs text-[#bac9cc]">
            Được tăng tốc bởi luồng phần cứng tối ưu và xung nhịp bộ nhớ DDR5{" "}
            {activeBuild.ram?.id === "96gb-ddr5" ? "nhanh vượt trội" : "hiệu năng cao"}.
          </p>
        </div>

        {/* Thermals Circle Progress Gauge */}
        <div className="glass-panel rounded-3xl p-8 flex flex-col justify-between items-center text-center relative overflow-hidden group border border-white/5 shadow-xl">
          <span className="font-mono text-[10px] tracking-wider text-[#bac9cc] uppercase mb-4 self-start">
            Thermals & Dissipation
          </span>

          <div className="relative w-36 h-36 flex items-center justify-center my-2">
            {/* SVG Circle */}
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="72" cy="72" r="58" stroke="rgba(255,255,255,0.05)" strokeWidth="6" fill="transparent" />
              <circle
                cx="72"
                cy="72"
                r="58"
                stroke={primaryColor}
                strokeWidth="6"
                fill="transparent"
                strokeDasharray={364}
                strokeDashoffset={364 - (364 * peakThermal) / 100}
                className="transition-all duration-500"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="font-display text-3xl font-black text-white">{peakThermal}°C</span>
              <span className="font-mono text-[8px] tracking-wider uppercase text-[#bac9cc]">
                Peak Thermals
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 mt-4 text-xs text-[#bac9cc]">
            <Flame size={12} className="text-orange-400" />
            <span>Liquid Cooling: {peakThermal > 70 ? "High Load" : "Optimum Cool"}</span>
          </div>
        </div>

        {/* AI Compute Score */}
        <div className="md:col-span-2 glass-panel rounded-3xl p-8 flex items-center justify-between border border-white/5 shadow-xl">
          <div className="space-y-2">
            <span className="font-mono text-[10px] tracking-wider text-[#00e0b0] uppercase">
              Neural Acceleration
            </span>
            <h3 className="font-display text-2xl font-bold text-white">Stable Diffusion XL</h3>
            <p className="font-sans text-xs text-[#bac9cc] max-w-sm">
              Tăng tốc tạo hình ảnh bằng AI nhờ số lượng nhân Tensor vượt trội của cấu hình {activeBuild.gpu?.name}.
            </p>
          </div>

          <div className="text-right">
            <div className="font-display text-5xl font-black text-[#00e0b0] drop-shadow-[0_0_15px_rgba(0,224,176,0.2)]">
              {aiComputeScore}
            </div>
            <span className="font-mono text-[9px] tracking-widest text-[#bac9cc] uppercase">
              IMAGES / SECOND
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
