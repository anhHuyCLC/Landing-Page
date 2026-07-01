import React, { useState, useEffect } from "react";
import { ShoppingBag } from "lucide-react";
import { CATEGORIES, THEMES, BASE_PRICE, formatPrice } from "./data";

import HeroSection from "./components/HeroSection";
import ExplodedView from "./components/ExplodedView";
import HardwareHighlights from "./components/HardwareHighlights";
import PerformanceDashboard from "./components/PerformanceDashboard";
import ConfiguratorStudio from "./components/ConfiguratorStudio";
import BuildSummary from "./components/BuildSummary";
import CheckoutModal from "./components/CheckoutModal";
import type { ActiveBuild, AmbientTheme, BenchmarkGame, ComponentOption } from "./type";

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<string>("configurator");

  // Selection States
  const [activeBuild, setActiveBuild] = useState<ActiveBuild>({
    cpu: CATEGORIES[0].options[0],
    gpu: CATEGORIES[1].options[0],
    ram: CATEGORIES[2].options[0],
    storage: CATEGORIES[3].options[0],
    psu: CATEGORIES[4].options[0],
    theme: THEMES[0],
  });

  // Telemetry game selection
  const [selectedGame, setSelectedGame] = useState<BenchmarkGame>({
    id: "cyberpunk",
    name: "Cyberpunk 2077",
    baseFps: 144,
    image: "",
  });

  // Selected Hotspot details on exploded view
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  // Custom configuration additions
  const [engravingText, setEngravingText] = useState<string>("");
  const [isGift, setIsGift] = useState<boolean>(false);
  const [shippingMethod, setShippingMethod] = useState<"standard" | "express">("standard");

  // Checkout modal
  const [showCheckoutModal, setShowCheckoutModal] = useState<boolean>(false);
  const [checkoutStep, setCheckoutStep] = useState<"summary" | "shipping" | "success">("summary");

  // Checkout Form fields
  const [shippingForm, setShippingForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
  });

  // Random tracking ID (stable across renders)
  const [trackingNumber, setTrackingNumber] = useState("");

  // Dynamic values calculation
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
    120 + // baseline power draw for high-end cooling, fans, motherboard
    activeBuild.cpu.powerDraw +
    activeBuild.gpu.powerDraw +
    activeBuild.ram.powerDraw +
    activeBuild.storage.powerDraw;

  // Max support power depends on selected PSU
  const psuLimit =
    activeBuild.psu.id === "850w-gold" ? 850 : activeBuild.psu.id === "1000w-gold" ? 1000 : 1200;
  const powerSafetyMargin = psuLimit - totalPowerDraw;

  // Telemetry formula metrics
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

  // Mouse ambient light effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const glow = document.getElementById("mouse-glow");
      if (glow) {
        glow.style.left = `${e.clientX - 192}px`;
        glow.style.top = `${e.clientY - 192}px`;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Update selected option in category
  const selectOption = (categoryId: string, option: ComponentOption) => {
    setActiveBuild((prev) => ({
      ...prev,
      [categoryId]: option,
    }));
  };

  // Switch custom RGB theme
  const selectTheme = (theme: AmbientTheme) => {
    setActiveBuild((prev) => ({
      ...prev,
      theme,
    }));
  };

  // Handle shipping form submission
  const handleProceedToShipping = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep("shipping");
  };

  // Simulate Order Finalization
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

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F5] font-sans relative overflow-x-hidden selection:bg-[#D4AF37] selection:text-black">
      {/* Background Ambient Spotlight that responds to custom RGB Theme */}
      <div
        id="mouse-glow"
        className="fixed w-96 h-96 rounded-full pointer-events-none z-0 transition-transform duration-500 blur-[120px] opacity-15"
        style={{
          backgroundColor: activeBuild.theme.primaryColor,
        }}
      />

      {/* Decorative vertical rails simulating system hardware aesthetics */}
      <div className="absolute top-0 left-4 w-[1px] h-full bg-white/[0.02] z-0 hidden lg:block" />
      <div className="absolute top-0 right-4 w-[1px] h-full bg-white/[0.02] z-0 hidden lg:block" />

      {/* Dynamic Header */}
      <nav className="fixed top-0 w-full z-40 border-b border-white/10 bg-[#050505]/80 backdrop-blur-xl">
        <div className="flex justify-between items-center w-full px-6 md:px-20 py-6 max-w-7xl mx-auto">
          {/* Brand Logo with ambient custom spotlight */}
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

          {/* Nav Links */}
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

          {/* Call to Action Button with glowing border */}
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

      {/* Main Container */}
      <main className="pt-24 pb-20 relative z-10">
        {/* Hero Banner Section */}
        <HeroSection primaryColor={activeBuild.theme.primaryColor} />

        {/* Section 2: Interactive Exploded Hardware View */}
        <ExplodedView
          activeBuild={activeBuild}
          activeHotspot={activeHotspot}
          setActiveHotspot={setActiveHotspot}
        />

        {/* Section 3: Dual Column Highlight Block */}
        <HardwareHighlights primaryColor={activeBuild.theme.primaryColor} />

        {/* Section 4: Performance Dashboard (Bento Grid) */}
        <PerformanceDashboard
          activeBuild={activeBuild}
          selectedGame={selectedGame}
          setSelectedGame={setSelectedGame}
          currentFps={currentFps}
          renderTime={renderTime}
          peakThermal={peakThermal}
          aiComputeScore={aiComputeScore}
        />

        {/* Section 5: Configurator Studio */}
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

      {/* Footer Section */}
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

      {/* Checkout Process Walkthrough Modal */}
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
