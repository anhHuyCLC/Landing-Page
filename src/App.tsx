import { useState } from 'react'
import './App.css'
import type { ActiveBuild } from './type'
import { ShoppingBag } from 'lucide-react';
import { BASE_PRICE, CATEGORIES, THEMES } from './data';
import HeroSection from './components/HeroSection';
import ExplodedView from './components/ExplodedView';

function App() {

  const [activeTab, setActiveTab] = useState<string>("configurator");
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [engravingText, setEngravingText] = useState<string>("");
  const [checkoutStep, setCheckoutStep] = useState<"summary" | "shipping" | "success">("summary");
  const [showCheckoutModal, setShowCheckoutModal] = useState<boolean>(false);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);


  const [activeBuild, setActiveBuild] = useState<ActiveBuild>({
    cpu: CATEGORIES[0].options[0],
    gpu: CATEGORIES[1].options[0],
    ram: CATEGORIES[2].options[0],
    storage: CATEGORIES[3].options[0],
    psu: CATEGORIES[4].options[0],
    theme: THEMES[0],
  })

  const totalPrice = BASE_PRICE +
    activeBuild.cpu.priceDelta +
    activeBuild.gpu.priceDelta +
    activeBuild.ram.priceDelta +
    activeBuild.storage.priceDelta +
    activeBuild.psu.priceDelta +
    (shippingMethod === 'express' ? 45 : 0) +
    (engravingText ? 25 : 0);


  return (
    <>
      <nav className='fixed top-0 w-full z-40 border-b border-white/10 bg-[#050505]/80 backdrop-blur-xl'>
        <div className="flex justify-between items-center w-full px-6 md:px-20 py-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-2 5 h-2 5 rounded-full transition-colors duration-500"
              style={{
                backgroundColor: activeBuild.theme.primaryColor,
                boxShadow: `0 0 12px ${activeBuild.theme.primaryColor}`
              }}>
              <span className='font-serif text-2xl font-blod tracking-[0.3em text-white cursor-pointer hover:opacity-80 trasition-opacity uppercase' onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                AURORA
              </span>
            </div>
            <div className="hidden md:flex gap-10 items-center">

              <button onClick={() => {
                setActiveTab("models");
                document.getElementById("components")?.scrollIntoView({
                  behavior: "smooth"
                })
              }} className='text--[10px] uppercase font-bold tracking--[0.2em] font-semibold pb-1 border-b trasition-all duration-300 cursor-pointer' style={{
                color: activeTab === "models" ? activeBuild.theme.primaryColor : "rgba(255, 255, 255, 0.4)",
                borderColor: activeTab === "models" ? activeBuild.theme.primaryColor : "transparent",
              }}>
                Models
              </button>

              <button onClick={() => {
                setActiveTab("configurator");
                document.getElementById("customizer")?.scrollIntoView({
                  behavior: "smooth"
                })
              }} className='text--[10px] uppercase font-bold tracking--[0.2em] font-semibold pb-1 border-b trasition-all duration-300 cursor-pointer' style={{
                color: activeTab === "configurator" ? activeBuild.theme.primaryColor : "rgba(255, 255, 255, 0.4)",
                borderColor: activeTab === "configurator" ? activeBuild.theme.primaryColor : "transparent",
              }}>
                Configurator
              </button>

              <button onClick={() => {
                setActiveTab("benchmark");
                document.getElementById("telemetry")?.scrollIntoView({
                  behavior: "smooth"
                })
              }} className='text--[10px] uppercase font-bold tracking--[0.2em] font-semibold pb-1 border-b trasition-all duration-300 cursor-pointer' style={{
                color: activeTab === "benchmark" ? activeBuild.theme.primaryColor : "rgba(255, 255, 255, 0.4)",
                borderColor: activeTab === "benchmark" ? activeBuild.theme.primaryColor : "transparent",
              }}>
                Telemetry
              </button>
            </div>

            <div className="flex items-center gap-6">
              <div className="hidden xl:flex flex-col text-right">
                <span className='font-mono text-[9px] tracking-widest text-white/40 uppercase'>live total</span>
                <span className='text-sm font-bold text-white'>
                  ${totalPrice.toLocaleString()}
                </span>
              </div>
              <button onClick={() => {
                setCheckoutStep("summary");
                setShowCheckoutModal(true);
              }} className='relative overflow-hidden px-6 py-3 font-mono text-[10px] uppercase tracking-[0.2em] font-bold text-black bg-white trasition-all duration-300 shadow-xl hover:bg-white/90 active:scale-95' style={{
                backgroundColor: activeBuild.theme.primaryColor,
              }}>
                <span className="relative z-10 flex items-center gap-2">
                  Build Now
                  <ShoppingBag size={12} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className='pt-24 pb-20 relative z-10'>
        <HeroSection primaryColor={activeBuild.theme.primaryColor} />
        <ExplodedView activeBuild={activeBuild} activeHotspot={activeHotspot} setActiveHotspot={setActiveHotspot} />
      </main>
    </>
  )
}

export default App
