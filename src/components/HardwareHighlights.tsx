import React from "react";
import { Check } from "lucide-react";

interface HardwareHighlightsProps {
  primaryColor: string;
}

export default function HardwareHighlights({ primaryColor }: HardwareHighlightsProps) {
  return (
    <section className="py-24 px-6 md:px-20 max-w-7xl mx-auto space-y-32">
      {/* Highlight Block 1: CPU */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 space-y-6 order-2 lg:order-1">
          <div
            className="font-mono text-[10px] tracking-widest font-bold inline-block px-3 py-1 rounded bg-white/5"
            style={{ color: primaryColor }}
          >
            PROCESSING ARCHITECTURE
          </div>
          <h3 className="font-display text-3xl md:text-5xl font-extrabold text-white leading-tight">
            Unmatched
            <br />
            Compute Power
          </h3>
          <p className="font-sans text-base text-[#bac9cc] leading-relaxed">
            Được xây dựng trên nền tảng vi kiến trúc mới nhất, mang lại sức mạnh đa nhiệm cực hạn cho các tác vụ dựng hình 4K chuyên nghiệp đồng thời duy trì xung nhịp đơn nhân tối đa phục vụ những trận game Esport kịch tính.
          </p>

          <ul className="space-y-3 pt-4">
            <li className="flex items-center gap-3 text-white">
              <Check size={16} style={{ color: primaryColor }} />
              <span className="text-sm font-sans">Smart Thermal Velocity Boost tối ưu hóa xung nhịp tự động</span>
            </li>
            <li className="flex items-center gap-3 text-white">
              <Check size={16} style={{ color: primaryColor }} />
              <span className="text-sm font-sans">Phân luồng thông minh được hỗ trợ bởi thuật toán AI</span>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-7 order-1 lg:order-2 h-[350px] md:h-[500px] relative">
          <div className="absolute inset-0 glass-panel rounded-3xl p-4 neon-glow hover:shadow-[0_0_50px_rgba(0,229,255,0.05)] transition-all duration-500">
            <img
              alt="CPU Hardware Zoom"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFLh0TxSrtVLnn94xL1Ty1qwvmSjfYOpOqs-lz4yUBSUv_YTu9U7UYJclHmnDv4uwOOEhjYnsw5COVEuvXU660a_MpH52Oj0PnflhqM1fkvdvosJEbS-GUwV8_8I1g_ZJpTHK17m5JEg3S6V8iMw-fgKmYiI-iB0EUepzL1Qj9fDx1vMpiDUS6KZLEzmSY-e8DP-Q8yROIhe-QQWJ-daLZM3-8zu4QPaYH_u0gWPJ-GRsGQOBxZSMExtkn4NiMz_44yMw19TYi6SjD"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </div>
      </div>

      {/* Highlight Block 2: GPU */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 h-[350px] md:h-[500px] relative">
          <div className="absolute inset-0 glass-panel rounded-3xl p-4 neon-glow hover:shadow-[0_0_50px_rgba(0,229,255,0.05)] transition-all duration-500">
            <img
              alt="GPU Hardware Zoom"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3YyjG6k05GNDEyUQPuZvF0Ocd2FOu6JLVcQDInoVFSZb5L2FJcu4DNM4daUIDTytb7evx31CiQYKvNXURaXq3YfnQPoPpd3XLHNV7d22dkrv0SCoyjAACTxfzlngKvEVtgYrKMhruiOoUPHoySSy-JLsd6-qKddvrXJ7iQSfarpskibWp8OyVUa1vD3tAsgwGw28yUq6jxjMc8z29wSg8EOBnkDDKF4MS5NLUZKENwGCNucq-CjGdbocZrJx7_jvB2Y3KCDGrEEP2"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div
            className="font-mono text-[10px] tracking-widest font-bold inline-block px-3 py-1 rounded bg-white/5"
            style={{ color: primaryColor }}
          >
            GRAPHICS ENGINE
          </div>
          <h3 className="font-display text-3xl md:text-5xl font-extrabold text-white leading-tight">
            Photorealistic
            <br />
            Fidelity
          </h3>
          <p className="font-sans text-base text-[#bac9cc] leading-relaxed">
            Được tiếp sức mạnh từ kiến trúc NVIDIA Ada Lovelace đỉnh cao. Tận hưởng công nghệ dò tia Ray Tracing toàn phần kết hợp thuật toán tái tạo khung hình DLSS 3 mang lại chất lượng đồ họa tuyệt diệu.
          </p>

          <ul className="space-y-3 pt-4">
            <li className="flex items-center gap-3 text-white">
              <Check size={16} style={{ color: primaryColor }} />
              <span className="text-sm font-sans">DLSS 3 Frame Generation tăng tốc độ khung hình gấp 4 lần</span>
            </li>
            <li className="flex items-center gap-3 text-white">
              <Check size={16} style={{ color: primaryColor }} />
              <span className="text-sm font-sans">Nhân dò tia thế hệ thứ 3 đột phá chất lượng phản chiếu ánh sáng</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
