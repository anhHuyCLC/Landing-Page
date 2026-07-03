import { memo } from "react";
import { Zap, ShoppingBag } from "lucide-react";
import { formatPrice, type ActiveBuild } from "../type";

interface BuildSummaryProps {
  activeBuild: ActiveBuild;
  totalPrice: number;
  totalPowerDraw: number;
  psuLimit: number;
  powerSafetyMargin: number;
  engravingText: string;
  onProceedToCheckout: () => void;
}

const BuildSummary = memo(function BuildSummary({
  activeBuild,
  totalPrice,
  totalPowerDraw,
  psuLimit,
  powerSafetyMargin,
  engravingText,
  onProceedToCheckout,
}: BuildSummaryProps) {
  const primaryColor = activeBuild.theme.primaryColor;

  return (
    <div className="lg:col-span-5 self-start lg:sticky lg:top-24 space-y-6">
      <div className="glass-panel rounded-3xl p-8 border border-white/5 relative overflow-hidden shadow-2xl">
        <div
          className="absolute top-0 left-0 w-full h-1 transition-colors duration-500"
          style={{ backgroundColor: primaryColor }}
        />

        <h3 className="font-display text-xl font-bold text-white mb-6 flex items-center gap-2">
          Build Summary
        </h3>

        <div className="space-y-4 mb-8">
          <div className="flex justify-between items-start pb-4 border-b border-white/5">
            <span className="font-sans text-xs text-[#d1e0e3]">Processor</span>
            <span className="font-sans text-xs font-bold text-white text-right">
              {activeBuild.cpu.name.replace("Intel Core ", "").replace("AMD ", "")}
            </span>
          </div>

          <div className="flex justify-between items-start pb-4 border-b border-white/5">
            <span className="font-sans text-xs text-[#d1e0e3]">Graphics</span>
            <span className="font-sans text-xs font-bold text-white text-right">
              {activeBuild.gpu.name.replace("NVIDIA GeForce ", "").replace("AMD ", "")}
            </span>
          </div>

          <div className="flex justify-between items-start pb-4 border-b border-white/5">
            <span className="font-sans text-xs text-[#d1e0e3]">System Memory</span>
            <span className="font-sans text-xs font-bold text-white text-right">
              {activeBuild.ram.name.split("Dual Channel")[0]}
            </span>
          </div>

          <div className="flex justify-between items-start pb-4 border-b border-white/5">
            <span className="font-sans text-xs text-[#d1e0e3]">Solid Storage</span>
            <span className="font-sans text-xs font-bold text-white text-right">
              {activeBuild.storage.name.split(",")[0]}
            </span>
          </div>

          <div className="flex justify-between items-start pb-4 border-b border-white/5">
            <span className="font-sans text-xs text-[#d1e0e3]">Power Supply</span>
            <span className="font-sans text-xs font-bold text-white text-right">
              {activeBuild.psu.name.split("Fully Modular")[0]}
            </span>
          </div>

          {engravingText && (
            <div className="flex justify-between items-start pb-4 border-b border-white/5">
              <span className="font-sans text-xs text-[#d1e0e3]">Signature Engraving</span>
              <span className="font-sans text-xs font-bold text-[#00e0b0] text-right">Enabled (+{formatPrice(25)})</span>
            </div>
          )}
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-white/5 space-y-2 mb-8">
          <div className="flex justify-between items-center">
            <span className="font-mono text-[9px] tracking-widest text-[#d1e0e3] uppercase flex items-center gap-1.5">
              <Zap size={10} style={{ color: primaryColor }} />
              ESTIMATED POWER DRAW
            </span>
            <span className="font-mono text-xs font-bold text-white">
              {totalPowerDraw}W / {psuLimit}W
            </span>
          </div>

          <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${(totalPowerDraw / psuLimit) * 100}%`,
                backgroundColor: powerSafetyMargin < 150 ? "#ff5d3c" : primaryColor,
              }}
            />
          </div>

          <div className="flex justify-between items-center text-[10px] text-[#d1e0e3]">
            <span>Safety Margin: {powerSafetyMargin}W</span>
            <span className={powerSafetyMargin < 150 ? "text-orange-400 font-bold" : "text-[#d1e0e3]"}>
              {powerSafetyMargin < 150 ? "Low Headroom" : "High Efficiency"}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-end mb-8">
          <div className="font-mono text-[10px] tracking-widest text-[#d1e0e3] uppercase">
            TOTAL ESTIMATED
          </div>
          <div className="font-display text-3xl font-black text-white tracking-tight">
            {formatPrice(totalPrice)}
          </div>
        </div>

        <button
          onClick={onProceedToCheckout}
          aria-label="Proceed to Checkout"
          className="w-full py-4 font-mono text-[10px] uppercase tracking-widest text-black font-bold transition-all duration-300 hover:bg-white active:scale-95 cursor-pointer relative overflow-hidden group/btn"
          style={{
            backgroundColor: primaryColor,
          }}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            Proceed to Checkout
            <ShoppingBag size={14} />
          </span>
          <div className="absolute inset-0 bg-white/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
        </button>
      </div>
    </div>
  );
});

export default BuildSummary;
