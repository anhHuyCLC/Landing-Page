import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  lazy,
  Suspense,
} from "react";
import { ShoppingBag, Menu, X } from "lucide-react";

import HeroSection from "./components/HeroSection";
import ViewportSection from "./components/ViewportSection";

const ExplodedView = lazy(() => import("./components/ExplodedView"));
const HardwareHighlights = lazy(() => import("./components/HardwareHighlights"));
const PerformanceDashboard = lazy(() => import("./components/PerformanceDashboard"));
const ConfiguratorStudio = lazy(() => import("./components/ConfiguratorStudio"));
const BuildSummary = lazy(() => import("./components/BuildSummary"));
const CheckoutModal = lazy(() => import("./components/CheckoutModal"));

import {
  formatPrice,
  type ActiveBuild,
  type AmbientTheme,
  type BenchmarkGame,
  type ComponentCategory,
  type ComponentOption,
} from "./type";
import { componentService } from "./service/components";

const SectionFallback = () => (
  <div className="flex items-center justify-center py-24 min-h-[400px]">
    <div className="w-6 h-6 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
  </div>
);

const BASE_PRICE = 4222;

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("configurator");
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [activeBuild, setActiveBuild] = useState<ActiveBuild | null>(null);
  const [categories, setCategories] = useState<ComponentCategory[]>([]);
  const [themes, setThemes] = useState<AmbientTheme[]>([]);
  const [games, setGames] = useState<BenchmarkGame[]>([]);

  useEffect(() => {
    const loadAll = async () => {
      try {
        setLoading(true);
        const [data, data2, gamesData] = await Promise.all([
          componentService.getAllCategories(),
          componentService.getAllTheme(),
          componentService.getAllGame(),
        ]);

        if (
          Array.isArray(data) &&
          data.length >= 5 &&
          Array.isArray(data2) &&
          data2.length > 0
        ) {
          const find = (id: string, fallbackIdx: number) =>
            data.find((c: ComponentCategory) => c.id === id) ||
            data[fallbackIdx] ||
            data[0];

          setCategories(data);
          setThemes(data2);
          if (Array.isArray(gamesData)) setGames(gamesData);

          setActiveBuild({
            cpu: find("cpu", 0).options[0],
            gpu: find("gpu", 1).options[0],
            ram: find("ram", 2).options[0],
            storage: find("storage", 3).options[0],
            psu: find("psu", 4).options[0],
            theme: data2[0],
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadAll();
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
    let rafId: number;
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const glow = document.getElementById("mouse-glow");
        if (glow) {
          glow.style.transform = `translate(${e.clientX - 192}px, ${e.clientY - 192}px)`;
        }
      });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const selectOption = useCallback(
    (categoryId: string, option: ComponentOption) => {
      setActiveBuild((prev) => (prev ? { ...prev, [categoryId]: option } : prev));
    },
    []
  );

  const selectTheme = useCallback((theme: AmbientTheme) => {
    setActiveBuild((prev) => (prev ? { ...prev, theme } : prev));
  }, []);

  const handleProceedToShipping = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep("shipping");
  }, []);

  const handlePlaceOrder = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!shippingForm.fullName || !shippingForm.email || !shippingForm.address) {
        alert("Vui lòng điền đầy đủ thông tin giao hàng.");
        return;
      }
      setTrackingNumber(`AUR-${Math.floor(100000 + Math.random() * 900000)}`);
      setCheckoutStep("success");
    },
    [shippingForm]
  );

  const resetEngravingText = useCallback(() => setEngravingText(""), []);

  const openCheckout = useCallback(() => {
    setCheckoutStep("summary");
    setShowCheckoutModal(true);
  }, []);

  const totalPrice = useMemo(() => {
    if (!activeBuild) return BASE_PRICE;
    return (
      BASE_PRICE +
      activeBuild.cpu.priceDelta +
      activeBuild.gpu.priceDelta +
      activeBuild.ram.priceDelta +
      activeBuild.storage.priceDelta +
      activeBuild.psu.priceDelta +
      (shippingMethod === "express" ? 45 : 0) +
      (engravingText ? 25 : 0)
    );
  }, [activeBuild, shippingMethod, engravingText]);

  const perfStats = useMemo(() => {
    if (!activeBuild) return null;
    const psuLimit =
      activeBuild.psu.id === "850w-gold"
        ? 850
        : activeBuild.psu.id === "1000w-gold"
        ? 1000
        : 1200;
    const totalPowerDraw =
      120 +
      activeBuild.cpu.powerDraw +
      activeBuild.gpu.powerDraw +
      activeBuild.ram.powerDraw +
      activeBuild.storage.powerDraw;
    return {
      totalPowerDraw,
      psuLimit,
      powerSafetyMargin: psuLimit - totalPowerDraw,
      currentFps: Math.round(
        selectedGame.baseFps * activeBuild.cpu.fpsFactor * activeBuild.gpu.fpsFactor
      ),
      renderTime: (
        9.8 * activeBuild.cpu.renderFactor * activeBuild.ram.renderFactor
      ).toFixed(1),
      peakThermal: Math.round(
        65 * activeBuild.cpu.thermalFactor * activeBuild.gpu.thermalFactor
      ),
      aiComputeScore: (
        2.4 *
        activeBuild.gpu.fpsFactor *
        (activeBuild.ram.id === "96gb-ddr5" ? 1.15 : 1.0)
      ).toFixed(1),
    };
  }, [activeBuild, selectedGame]);

  if (loading || !activeBuild || !perfStats) {
    return (
      <div
        className="flex items-center justify-center h-screen bg-[#050505]"
        style={{ minHeight: "100dvh" }}
      >
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const primaryColor = activeBuild.theme.primaryColor;

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F5] font-sans relative [overflow-x:clip] selection:bg-[#D4AF37] selection:text-black">
      <div
        id="mouse-glow"
        className="fixed w-96 left-0 top-0 h-96 rounded-full pointer-events-none z-0 will-change-transform blur-[120px] opacity-15"
        style={{ backgroundColor: primaryColor }}
      />
      <div className="absolute top-0 left-4 w-[1px] h-full bg-white/[0.02] z-0 hidden lg:block" />
      <div className="absolute top-0 right-4 w-[1px] h-full bg-white/[0.02] z-0 hidden lg:block" />

      {/* NAV */}
      <nav className="fixed top-0 w-full z-40 border-b border-white/10 bg-[#050505]/80 backdrop-blur-xl">
        <div className="flex justify-between items-center w-full px-6 lg:px-20 py-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div
              className="w-2.5 h-2.5 rounded-full transition-colors duration-500"
              style={{
                backgroundColor: primaryColor,
                boxShadow: `0 0 12px ${primaryColor}`,
              }}
            />
            <span
              className="font-serif text-2xl font-bold tracking-[0.3em] text-white cursor-pointer hover:opacity-80 transition-opacity uppercase"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              AURORA
            </span>
          </div>

          <div className="hidden lg:flex gap-10 items-center">
            {[
              { label: "Models", tab: "models", target: "components" },
              { label: "Configurator", tab: "configurator", target: "customizer" },
              { label: "Telemetry", tab: "benchmark", target: "telemetry" },
            ].map(({ label, tab, target }) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-[10px] uppercase tracking-[0.2em] font-semibold pb-1 border-b transition-all duration-300 cursor-pointer"
                style={{
                  color: activeTab === tab ? primaryColor : "rgba(255, 255, 255, 0.4)",
                  borderColor: activeTab === tab ? primaryColor : "transparent",
                }}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 lg:gap-6">
            <div className="hidden xl:flex flex-col text-right">
              <span className="font-mono text-[9px] tracking-widest text-white/40 uppercase">LIVE TOTAL</span>
              <span className="text-sm font-bold text-white">{formatPrice(totalPrice)}</span>
            </div>
            <button
              onClick={openCheckout}
              aria-label="Build Now"
              className="relative overflow-hidden px-4 lg:px-6 py-2.5 lg:py-3 font-mono text-[10px] uppercase tracking-[0.2em] font-bold text-black transition-all duration-300 shadow-xl active:scale-95 hover:bg-white cursor-pointer"
              style={{ backgroundColor: primaryColor }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <span className="hidden sm:inline">Build Now</span>
                <ShoppingBag size={14} />
              </span>
            </button>
            <button
              id="mobile-menu-btn"
              onClick={() => setMobileMenuOpen((o) => !o)}
              className="lg:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          } border-t border-white/5 bg-[#050505]/95 backdrop-blur-xl`}
        >
          <div className="flex flex-col px-6 py-4 gap-1">
            {[
              { label: "Models", tab: "models", target: "components" },
              { label: "Configurator", tab: "configurator", target: "customizer" },
              { label: "Telemetry", tab: "benchmark", target: "telemetry" },
            ].map(({ label, tab, target }) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setMobileMenuOpen(false);
                  setTimeout(
                    () => document.getElementById(target)?.scrollIntoView({ behavior: "smooth" }),
                    100
                  );
                }}
                className="flex items-center justify-between w-full py-3.5 border-b border-white/5 text-left last:border-0"
              >
                <span
                  className="font-mono text-[11px] uppercase tracking-[0.2em] font-semibold"
                  style={{ color: activeTab === tab ? primaryColor : "rgba(255,255,255,0.6)" }}
                >
                  {label}
                </span>
                {activeTab === tab && (
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: primaryColor }} />
                )}
              </button>
            ))}
            <div className="pt-3 flex justify-between items-center">
              <span className="font-mono text-[9px] tracking-widest text-[#d1e0e3] uppercase">Live Total</span>
              <span className="font-mono text-sm font-bold" style={{ color: primaryColor }}>
                {formatPrice(totalPrice)}
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* MAIN — HeroSection is eager above-fold, below-fold sections are lazy-deferred via ViewportSection */}
      <main className="pt-24 pb-20 relative z-10">
        <HeroSection primaryColor={primaryColor} />

        <ViewportSection minHeight="600px">
          <Suspense fallback={<SectionFallback />}>
            <ExplodedView
              activeBuild={activeBuild}
              activeHotspot={activeHotspot}
              setActiveHotspot={setActiveHotspot}
            />
          </Suspense>
        </ViewportSection>

        <ViewportSection minHeight="500px">
          <Suspense fallback={<SectionFallback />}>
            <HardwareHighlights primaryColor={primaryColor} />
          </Suspense>
        </ViewportSection>

        <ViewportSection minHeight="600px">
          <Suspense fallback={<SectionFallback />}>
            <PerformanceDashboard
              activeBuild={activeBuild}
              selectedGame={selectedGame}
              setSelectedGame={setSelectedGame}
              currentFps={perfStats.currentFps}
              renderTime={perfStats.renderTime}
              peakThermal={perfStats.peakThermal}
              aiComputeScore={perfStats.aiComputeScore}
              games={games}
            />
          </Suspense>
        </ViewportSection>

        <section id="customizer" className="py-24 px-6 md:px-20 max-w-7xl mx-auto relative">
          <div
            className="absolute -right-1/4 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-5 blur-[120px] pointer-events-none"
            style={{ backgroundColor: primaryColor }}
          />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <ViewportSection className="lg:col-span-7" minHeight="800px">
              <Suspense fallback={<SectionFallback />}>
                <ConfiguratorStudio
                  activeBuild={activeBuild}
                  selectOption={selectOption}
                  selectTheme={selectTheme}
                  engravingText={engravingText}
                  setEngravingText={setEngravingText}
                  categories={categories}
                  themes={themes}
                />
              </Suspense>
            </ViewportSection>

            <ViewportSection className="lg:col-span-5" minHeight="500px">
              <Suspense fallback={<SectionFallback />}>
                <BuildSummary
                  activeBuild={activeBuild}
                  totalPrice={totalPrice}
                  totalPowerDraw={perfStats.totalPowerDraw}
                  psuLimit={perfStats.psuLimit}
                  powerSafetyMargin={perfStats.powerSafetyMargin}
                  engravingText={engravingText}
                  onProceedToCheckout={openCheckout}
                />
              </Suspense>
            </ViewportSection>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 py-16 bg-[#0c1314]">
        <div className="max-w-7xl mx-auto px-6 md:px-20 grid grid-cols-1 md:grid-cols-2 justify-between items-center gap-8">
          <div className="space-y-2">
            <span className="font-display text-xl font-black text-white">AURORA PC</span>
            <p className="font-mono text-[10px] tracking-wider text-[#d1e0e3]">
              © 2026 AURORA SYSTEMS. ALL RIGHTS RESERVED. ENGINEERED FOR SUPREMACY.
            </p>
          </div>
          <div className="flex flex-wrap md:justify-end gap-6 font-mono text-xs">
            {["Privacy Policy", "Terms of Service", "Warranty & Returns", "Contact Support"].map(
              (link) => (
                <a key={link} href="#" className="text-[#d1e0e3] hover:text-white transition-colors">
                  {link}
                </a>
              )
            )}
          </div>
        </div>
      </footer>

      {showCheckoutModal && (
        <Suspense fallback={null}>
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
        </Suspense>
      )}
    </div>
  );
}
