import React, { useState, useEffect } from "react";
import { ShoppingBag } from "lucide-react";

import HeroSection from "./components/HeroSection";
import ExplodedView from "./components/ExplodedView";
import HardwareHighlights from "./components/HardwareHighlights";
import PerformanceDashboard from "./components/PerformanceDashboard";
import ConfiguratorStudio from "./components/ConfiguratorStudio";
import BuildSummary from "./components/BuildSummary";
import CheckoutModal from "./components/CheckoutModal";
import { formatPrice, type ActiveBuild, type AmbientTheme, type BenchmarkGame, type ComponentCategory, type ComponentOption } from "./type";
import { componentService } from "./service/components";

// Default fallback data — UI renders immediately with this, no API wait needed
const DEFAULT_THEME: AmbientTheme = {
  id: "arctic",
  name: "Arctic Blue",
  primaryColor: "#38BDF8",
  glowColor: "rgba(56,189,248,0.3)",
  borderColor: "rgba(56,189,248,0.3)",
  gradientFrom: "#38BDF8",
};

const DEFAULT_OPTION: ComponentOption = {
  id: "default",
  name: "Loading...",
  specs: "",
  priceDelta: 0,
  powerDraw: 0,
  fpsFactor: 1,
  renderFactor: 1,
  thermalFactor: 1,
};

const DEFAULT_BUILD: ActiveBuild = {
  cpu: DEFAULT_OPTION,
  gpu: DEFAULT_OPTION,
  ram: DEFAULT_OPTION,
  storage: DEFAULT_OPTION,
  psu: DEFAULT_OPTION,
  theme: DEFAULT_THEME,
};

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("configurator");
  const BASE_PRICE = 4222;

  // Khởi tạo với default data ngay — không block render
  const [activeBuild, setActiveBuild] = useState<ActiveBuild>(DEFAULT_BUILD);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        // Gọi 2 API song song thay vì tuần tự — giảm ~50% thời gian chờ
        const [data, data2] = await Promise.all([
          componentService.getAllCategories(),
          componentService.getAllTheme(),
        ]);

        if (Array.isArray(data) && data.length >= 5 && Array.isArray(data2) && data2.length > 0) {
          const cpuCat = data.find((c: ComponentCategory) => c.id === "cpu") || data[0];
          const gpuCat = data.find((c: ComponentCategory) => c.id === "gpu") || data[1] || data[0];
          const ramCat = data.find((c: ComponentCategory) => c.id === "ram") || data[2] || data[0];
          const storageCat = data.find((c: ComponentCategory) => c.id === "storage") || data[3] || data[0];
          const psuCat = data.find((c: ComponentCategory) => c.id === "psu") || data[4] || data[0];

          setActiveBuild({
            cpu: cpuCat.options[0],
            gpu: gpuCat.options[0],
            ram: ramCat.options[0],
            storage: storageCat.options[0],
            psu: psuCat.options[0],
            theme: data2[0],
          });
        }
      } catch (error) {
        console.log(error);
        // Giữ nguyên DEFAULT_BUILD nếu API lỗi
      }
    };
    loadCategories();
  }, []);

  const [selectedGame, setSelectedGame] = useState<BenchmarkGame>({
    id: "cyberpunk",
    name: "Cyberpunk 2077",
    baseFps: 144,
    image: "",
  });

  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [engravingText, setEngravingText] = useState<string>("");
  const [isGift, setIsGift] = useState<boolean>(false);
  const [shippingMethod, setShippingMethod] = useState<"standard" | "express">("standard");
  const [showCheckoutModal, setShowCheckoutModal] = useState<boolean>(false);
  const [checkoutStep, setCheckoutStep] = useState<"summary" | "shipping" | "success">("summary");

  const [shippingForm, setShippingForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
  });

  const [trackingNumber, setTrackingNumber] = useState("");

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        const glow = document.getElementById("mouse-glow");
        if (glow) {
          glow.style.transform = `translate(${e.clientX - 192}px, ${e.clientY - 192}px)`;
        }
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const selectOption = (categoryId: string, option: ComponentOption) => {
    setActiveBuild((prev) => (prev ? { ...prev, [categoryId]: option } : prev));
  };

  const selectTheme = (theme: AmbientTheme) => {
    setActiveBuild((prev) => (prev ? { ...prev, theme } : prev));
  };

  const handleProceedToShipping = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep("shipping");
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingForm.fullName || !shippingForm.email || !shippingForm.address) {
      alert("Vui lòng điền đầy đủ thông tin giao hàng.");
      return;
    }
    setTrackingNumber(`AUR-${Math.floor(100000 + Math.random() * 900000)}`);
    setCheckoutStep("success");
  };

  const resetEngravingText = () => {
    setEngravingText("");
  };

  // Không còn loading block — UI render ngay với DEFAULT_BUILD

  const totalPrice =
    BASE_PRICE +
    activeBuild.cpu.priceDelta +
    activeBuild.gpu.priceDelta +
    activeBuild.ram.priceDelta +
    activeBuild.storage.priceDelta +
    activeBuild.psu.priceDelta +
    (shippingMethod === "express" ? 45 : 0) +
    (engravingText ? 25 : 0);

  const totalPowerDraw =
    120 +
    activeBuild.cpu.powerDraw +
    activeBuild.gpu.powerDraw +
    activeBuild.ram.powerDraw +
    activeBuild.storage.powerDraw;

  const psuLimit =
    activeBuild.psu.id === "850w-gold" ? 850 : activeBuild.psu.id === "1000w-gold" ? 1000 : 1200;
  const powerSafetyMargin = psuLimit - totalPowerDraw;
  const currentFps = Math.round(
    selectedGame.baseFps * activeBuild.cpu.fpsFactor * activeBuild.gpu.fpsFactor
  );
  const renderTime = (9.8 * activeBuild.cpu.renderFactor * activeBuild.ram.renderFactor).toFixed(1);
  const peakThermal = Math.round(65 * activeBuild.cpu.thermalFactor * activeBuild.gpu.thermalFactor);
  const aiComputeScore = (
    2.4 *
    activeBuild.gpu.fpsFactor *
    (activeBuild.ram.id === "96gb-ddr5" ? 1.15 : 1.0)
  ).toFixed(1);


  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F5] font-sans relative [overflow-x:clip] selection:bg-[#D4AF37] selection:text-black">
      <div
        id="mouse-glow"
        className="fixed w-96 left-0 top-0 h-96 rounded-full pointer-events-none z-0 transition-transform duration-500 blur-[120px] opacity-15"
        style={{
          backgroundColor: activeBuild.theme.primaryColor,
        }}
      />
      <div className="absolute top-0 left-4 w-[1px] h-full bg-white/[0.02] z-0 hidden lg:block" />
      <div className="absolute top-0 right-4 w-[1px] h-full bg-white/[0.02] z-0 hidden lg:block" />
      <nav className="fixed top-0 w-full z-40 border-b border-white/10 bg-[#050505]/80 backdrop-blur-xl">
        <div className="flex justify-between items-center w-full px-6 md:px-20 py-6 max-w-7xl mx-auto">

          <div className="flex items-center gap-3">
            <div
              className="w-2.5 h-2.5 rounded-full transition-colors duration-500"
              style={{
                backgroundColor: activeBuild.theme.primaryColor,
                boxShadow: `0 0 12px ${activeBuild.theme.primaryColor}`,
              }}
            />
            <span
              className="font-serif text-2xl font-bold tracking-[0.3em] text-white cursor-pointer hover:opacity-80 transition-opacity uppercase"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              AURORA
            </span>
          </div>
          <div className="hidden md:flex gap-10 items-center">
            <button
              onClick={() => {
                setActiveTab("models");
                document.getElementById("components")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-[10px] uppercase tracking-[0.2em] font-semibold pb-1 border-b transition-all duration-300 cursor-pointer"
              style={{
                color: activeTab === "models" ? activeBuild.theme.primaryColor : "rgba(255, 255, 255, 0.4)",
                borderColor: activeTab === "models" ? activeBuild.theme.primaryColor : "transparent",
              }}
            >
              Models
            </button>
            <button
              onClick={() => {
                setActiveTab("configurator");
                document.getElementById("customizer")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-[10px] uppercase tracking-[0.2em] font-semibold pb-1 border-b transition-all duration-300 cursor-pointer"
              style={{
                color:
                  activeTab === "configurator" ? activeBuild.theme.primaryColor : "rgba(255, 255, 255, 0.4)",
                borderColor:
                  activeTab === "configurator" ? activeBuild.theme.primaryColor : "transparent",
              }}
            >
              Configurator
            </button>
            <button
              onClick={() => {
                setActiveTab("benchmark");
                document.getElementById("telemetry")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-[10px] uppercase tracking-[0.2em] font-semibold pb-1 border-b transition-all duration-300 cursor-pointer"
              style={{
                color:
                  activeTab === "benchmark" ? activeBuild.theme.primaryColor : "rgba(255, 255, 255, 0.4)",
                borderColor: activeTab === "benchmark" ? activeBuild.theme.primaryColor : "transparent",
              }}
            >
              Telemetry
            </button>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden xl:flex flex-col text-right">
              <span className="font-mono text-[9px] tracking-widest text-white/40 uppercase">LIVE TOTAL</span>
              <span className="text-sm font-bold text-white">{formatPrice(totalPrice)}</span>
            </div>
            <button
              onClick={() => {
                setCheckoutStep("summary");
                setShowCheckoutModal(true);
              }}
              className="relative overflow-hidden px-6 py-3 font-mono text-[10px] uppercase tracking-[0.2em] font-bold text-black transition-all duration-300 shadow-xl active:scale-95 hover:bg-white cursor-pointer"
              style={{
                backgroundColor: activeBuild.theme.primaryColor,
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Build Now
                <ShoppingBag size={12} />
              </span>
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-20 relative z-10">
        <HeroSection primaryColor={activeBuild.theme.primaryColor} />
        <ExplodedView
          activeBuild={activeBuild}
          activeHotspot={activeHotspot}
          setActiveHotspot={setActiveHotspot}
        />

        <HardwareHighlights primaryColor={activeBuild.theme.primaryColor} />

        <PerformanceDashboard
          activeBuild={activeBuild}
          selectedGame={selectedGame}
          setSelectedGame={setSelectedGame}
          currentFps={currentFps}
          renderTime={renderTime}
          peakThermal={peakThermal}
          aiComputeScore={aiComputeScore}
        />

        <section id="customizer" className="py-24 px-6 md:px-20 max-w-7xl mx-auto relative">
          <div
            className="absolute -right-1/4 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-5 blur-[120px] pointer-events-none"
            style={{ backgroundColor: activeBuild.theme.primaryColor }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <ConfiguratorStudio
              activeBuild={activeBuild}
              selectOption={selectOption}
              selectTheme={selectTheme}
              engravingText={engravingText}
              setEngravingText={setEngravingText}
            />

            <BuildSummary
              activeBuild={activeBuild}
              totalPrice={totalPrice}
              totalPowerDraw={totalPowerDraw}
              psuLimit={psuLimit}
              powerSafetyMargin={powerSafetyMargin}
              engravingText={engravingText}
              onProceedToCheckout={() => {
                setCheckoutStep("summary");
                setShowCheckoutModal(true);
              }}
            />
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 py-16 bg-[#0c1314]">
        <div className="max-w-7xl mx-auto px-6 md:px-20 grid grid-cols-1 md:grid-cols-2 justify-between items-center gap-8">
          <div className="space-y-2">
            <span className="font-display text-xl font-black text-white">AURORA PC</span>
            <p className="font-mono text-[10px] tracking-wider text-[#bac9cc]">
              © 2026 AURORA SYSTEMS. ALL RIGHTS RESERVED. ENGINEERED FOR SUPREMACY.
            </p>
          </div>

          <div className="flex flex-wrap md:justify-end gap-6 font-mono text-xs">
            <a href="#" className="text-[#bac9cc] hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-[#bac9cc] hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-[#bac9cc] hover:text-white transition-colors">
              Warranty & Returns
            </a>
            <a href="#" className="text-[#bac9cc] hover:text-white transition-colors">
              Contact Support
            </a>
          </div>
        </div>
      </footer>
      <CheckoutModal
        showCheckoutModal={showCheckoutModal}
        setShowCheckoutModal={setShowCheckoutModal}
        checkoutStep={checkoutStep}
        setCheckoutStep={setCheckoutStep}
        activeBuild={activeBuild}
        totalPrice={totalPrice}
        engravingText={engravingText}
        shippingMethod={shippingMethod}
        setShippingMethod={setShippingMethod}
        isGift={isGift}
        setIsGift={setIsGift}
        shippingForm={shippingForm}
        setShippingForm={setShippingForm}
        handleProceedToShipping={handleProceedToShipping}
        handlePlaceOrder={handlePlaceOrder}
        trackingNumber={trackingNumber}
        resetEngravingText={resetEngravingText}
      />
    </div>
  );
}
