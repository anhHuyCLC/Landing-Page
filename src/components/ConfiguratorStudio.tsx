
import { Gift, Sparkles, X } from "lucide-react";
import { formatPrice, type ActiveBuild, type AmbientTheme, type ComponentCategory, type ComponentOption } from "../type";

interface ConfiguratorStudioProps {
    activeBuild: ActiveBuild;
    selectOption: (categoryId: string, option: ComponentOption) => void;
    selectTheme: (theme: AmbientTheme) => void;
    engravingText: string;
    setEngravingText: (text: string) => void;
    // Nhận từ App.tsx thay vì tự gọi API — tránh double API call
    categories: ComponentCategory[];
    themes: AmbientTheme[];
}

export default function ConfiguratorStudio({
    activeBuild,
    selectOption,
    selectTheme,
    engravingText,
    setEngravingText,
    categories,
    themes,
}: ConfiguratorStudioProps) {
    const primaryColor = activeBuild.theme.primaryColor;

    return (
        <div className="lg:col-span-7 space-y-10">
            <div className="space-y-4">
                <span className="font-mono text-[10px] tracking-widest uppercase" style={{
                    color: primaryColor
                }}>
                    Forge Your Machine
                </span>
                <h2 className="font-display text-3xl md:text-5xl font-extrabold text-white">
                    Build Your Aurora
                </h2>
                <p className="font-sans text-[#bac9cc]">
                    Tùy biến các linh kiện cao cấp theo nhu cầu sử dụng của bạn. Tất cả tùy chọn đều được hỗ trợ bởi chế
                    độ bảo hành vàng 1-đổi-1 của Aurora Systems.
                </p>
            </div>

            {/* Theme selector */}
            <div className="glass-panel rounded-3xl p-6 border border-white/5">
                <h3 className="font-mono text-xs uppercase tracking-widest text-white mb-4 flex items-center gap-2">
                    <Sparkles size={14} style={{ color: primaryColor }} />
                    SYSTEM LIGHTING ACCENT (AURA RGB)
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {themes.map((theme) => (
                        <button key={theme.id}
                            onClick={() => selectTheme(theme)}
                            className={`p-3.5 rounded-xl border flex items-center gap-2.5 transition-all duration-300 text-left active:scale-95 ${activeBuild.theme.id === theme.id ? "bg-white/5" : "hover:bg-white/5 border-white/5 bg-transparent"}`}
                            style={{
                                borderColor:
                                    activeBuild.theme.id === theme.id ? theme.primaryColor : "rgba(255, 255, 255, 0.25)",
                            }}>
                            <div className="w-3.5 h-3.5 rounded-full shadow-md shrink-0" style={{
                                backgroundColor: theme.primaryColor,
                                boxShadow: `0 0 10px ${theme.primaryColor}`,
                            }} />
                            <span className="font-sans text-xs font-semibold text-white whitespace-nowrap">
                                {theme.name}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Component categories */}
            {categories.map((category) => (
                <div key={category.id} className="glass-panel rounded-3xl p-6 border border-white/5 space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="font-mono text-xs uppercase tracking-widest text-white flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm" style={{
                                color: primaryColor
                            }}>
                                {category.icon}
                            </span>
                            {category.name}
                        </h3>
                    </div>
                    <div className="space-y-3">
                        {category.options.map((option) => {
                            const isSelected = activeBuild[category.id as keyof ActiveBuild]?.id == option.id;
                            return (
                                <div key={option.id}
                                    onClick={() => selectOption(category.id, option)}
                                    className={`p-4 md:p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${isSelected ? "bg-white/5 shadow-inner" : "bg-transparent border-white/5 hover:border-white/5"}`}
                                    style={{
                                        borderColor: isSelected ? primaryColor : "rgba(255,255,255,0.05)",
                                    }}>
                                    {/* Fix mobile: dùng flex-wrap thay vì cứng 1 hàng */}
                                    <div className="flex items-start gap-3">
                                        {/* Radio dot */}
                                        <div className="pt-0.5 shrink-0">
                                            <div className="w-4 h-4 rounded-full border flex items-center justify-center transition-all duration-300" style={{
                                                borderColor: isSelected ? primaryColor : "rgba(255,255,255,0.2)",
                                            }}>
                                                {isSelected && (
                                                    <div className="w-2.5 h-2.5 rounded-full"
                                                        style={{ backgroundColor: primaryColor }} />
                                                )}
                                            </div>
                                        </div>
                                        {/* Tên option + price — wrap tự nhiên trên mobile */}
                                        <div className="flex flex-1 flex-wrap justify-between items-start gap-x-4 gap-y-1">
                                            <div className="font-sans text-sm font-bold text-white leading-normal">
                                                {option.specs}
                                            </div>
                                            <div className="shrink-0">
                                                {option.priceDelta === 0 ? (
                                                    <span className="font-mono text-[10px] text-white/50 bg-white/5 px-2.5 py-1 rounded-full border border-white/10 uppercase tracking-wider">
                                                        Base
                                                    </span>
                                                ) : (
                                                    <span className="font-mono text-xs font-semibold text-white">
                                                        {formatPrice(option.priceDelta, true)}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            ))}

            {/* Engraving */}
            <div className="glass-panel rounded-3xl p-6 border border-white/5 space-y-4">
                <h3 className="font-mono text-xs uppercase tracking-widest text-white flex items-center gap-2">
                    <Gift size={14} style={{ color: primaryColor }} />
                    AURORA SIGNATURE ENGRAVING (TÙY CHỌN KHẮC TÊN TRÊN KÍNH)
                </h3>
                <p className="font-sans text-xs text-[#bac9cc]">
                    Khắc la-ze chữ ký hoặc slogan cá nhân lên tấm kính cường lực của case PC. Một điểm nhấn tối thượng để
                    khẳng định cá tính. (+ {formatPrice(25)})
                </p>
                <div className="space-y-3">
                    <input type="text" maxLength={32} value={engravingText} onChange={(e) => setEngravingText(e.target.value)} placeholder="Ví dụ: ALEX SUPREME MACHINE (Tối đa 32 ký tự)" className="w-full bg-[#0B0B0B] border border-white/10 hover:border-white/20 focus:border-white focus:outline-none rounded-xl px-4 py-3.5 font-mono text-xs text-white transition-colors" />

                    {engravingText && (
                        <div className="glass-panel rounded-xl p-4 border border-white/5 flex items-center justify-between gap-3">
                            <div className="space-y-1 min-w-0">
                                <span className="font-mono text-[9px] text-[#bac9cc] uppercase">
                                    Bản xem trước phần khắc la-ze kính:
                                </span>
                                <div
                                    className="font-display font-black text-sm tracking-widest text-white animate-pulse truncate"
                                    style={{ textShadow: `0 0 10px ${primaryColor}` }}
                                >
                                    &quot;{engravingText.toUpperCase()}&quot;
                                </div>
                            </div>
                            <button
                                onClick={() => setEngravingText("")}
                                className="p-1 rounded-full hover:bg-white/5 text-white/60 hover:text-white shrink-0"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}