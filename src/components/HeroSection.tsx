import { Sparkles, ArrowRight, ChevronDown } from "lucide-react";

interface HeroSectionProps {
    primaryColor: string;
}

export default function HeroSection({ primaryColor }: HeroSectionProps) {
    const scrollToSection = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section className="relative min-h-[90vh] flex flex-col justify-center px-6 md:px-20 max-w-7xl mx-auto z-10 text-center items-center">
            {/* Visual Floating Accent */}
            <div
                className="absolute top-1/4 w-72 h-72 rounded-full opacity-10 blur-[120px] transition-all duration-1000 animate-pulse pointer-events-none"
                style={{ backgroundColor: primaryColor }}
            />

            {/* Dùng CSS animation thay vì framer-motion để không block LCP paint */}
            <div
                className="space-y-6 max-w-4xl"
                style={{ animation: "heroFadeIn 0.8s ease forwards" }}
            >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel border-white/10 mb-2">
                    <Sparkles size={14} style={{ color: primaryColor }} />
                    <span className="font-mono text-[10px] tracking-widest uppercase text-white/80">
                        Next-Generation Computing
                    </span>
                </div>

                <h1 className="font-display text-5xl md:text-8xl font-black tracking-tight text-white leading-none">
                    Build Beyond <span className="text-gradient">Limits</span>
                </h1>

                <p className="font-sans text-lg md:text-xl text-[#bac9cc] max-w-2xl mx-auto leading-relaxed">
                    Trải nghiệm hiệu năng chơi game và sáng tạo tối thượng từ thế hệ phần cứng vượt trội. Được chế tác tỉ mỉ dành riêng cho những nhà vô địch.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                    <button
                        onClick={() => scrollToSection("customizer")}
                        className="group flex items-center justify-center gap-2 px-10 py-4 font-mono text-[10px] uppercase tracking-widest text-black font-bold transition-all duration-300 cursor-pointer hover:bg-white"
                        style={{
                            backgroundColor: primaryColor,
                        }}
                    >
                        Configure Build
                        <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button
                        onClick={() => scrollToSection("components")}
                        className="px-10 py-4 font-mono text-[10px] uppercase tracking-widest text-white glass-panel hover:bg-white/10 transition-all duration-300 cursor-pointer"
                    >
                        Explore Hardware
                    </button>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div
                onClick={() => scrollToSection("components")}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer opacity-50 hover:opacity-100 transition-opacity"
            >
                <span className="font-mono text-[9px] tracking-widest uppercase text-[#bac9cc]">
                    Scroll to explore
                </span>
                <ChevronDown size={14} className="animate-bounce" style={{ color: primaryColor }} />
            </div>
        </section>
    );
}
