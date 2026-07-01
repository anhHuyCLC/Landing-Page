import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send, ShieldCheck, Truck } from "lucide-react"
import type { ActiveBuild } from "../type";
import { formatPrice } from "../data";

interface ShippingFormType {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
}

interface CheckoutModalProps {
  showCheckoutModal: boolean;
  setShowCheckoutModal: (show: boolean) => void;
  checkoutStep: "summary" | "shipping" | "success";
  setCheckoutStep: (step: "summary" | "shipping" | "success") => void;
  activeBuild: ActiveBuild;
  totalPrice: number;
  engravingText: string;
  shippingMethod: "standard" | "express";
  setShippingMethod: (method: "standard" | "express") => void;
  isGift: boolean;
  setIsGift: (isGift: boolean) => void;
  shippingForm: ShippingFormType;
  setShippingForm: (form: ShippingFormType) => void;
  handleProceedToShipping: (e: React.FormEvent) => void;
  handlePlaceOrder: (e: React.FormEvent) => void;
  trackingNumber: string;
  resetEngravingText: () => void;
}

export default function CheckoutModal({
  showCheckoutModal,
  setShowCheckoutModal,
  checkoutStep,
  setCheckoutStep,
  activeBuild,
  totalPrice,
  engravingText,
  shippingMethod,
  setShippingMethod,
  isGift,
  setIsGift,
  shippingForm,
  setShippingForm,
  handleProceedToShipping,
  handlePlaceOrder,
  trackingNumber,
  resetEngravingText,
}: CheckoutModalProps) {
  const primaryColor = activeBuild.theme.primaryColor;

  return (
    <AnimatePresence>
      {showCheckoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Dark overlay backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCheckoutModal(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Body */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl glass-panel bg-[#151515] rounded-3xl overflow-hidden border border-white/10 shadow-2xl z-10 flex flex-col max-h-[90vh]"
          >
            {/* Close Button */}
            <button
              onClick={() => setShowCheckoutModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-white/5 text-white/60 hover:text-white z-20"
            >
              <X size={16} />
            </button>

            <div className="p-8 overflow-y-auto space-y-6">
              {/* Steps Header indicator */}
              <div className="flex items-center gap-4 pb-4 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-[10px] font-bold ${
                      checkoutStep === "summary" ? "bg-white text-black" : "bg-white/10 text-white/50"
                    }`}
                  >
                    1
                  </div>
                  <span className="font-mono text-xs uppercase tracking-wider text-white">Xác nhận</span>
                </div>
                <div className="h-[1px] w-12 bg-white/10" />
                <div className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-[10px] font-bold ${
                      checkoutStep === "shipping" ? "bg-white text-black" : "bg-white/10 text-white/50"
                    }`}
                  >
                    2
                  </div>
                  <span className="font-mono text-xs uppercase tracking-wider text-white">Giao hàng</span>
                </div>
                <div className="h-[1px] w-12 bg-white/10" />
                <div className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-[10px] font-bold ${
                      checkoutStep === "success" ? "bg-[#00e0b0] text-black" : "bg-white/10 text-white/50"
                    }`}
                  >
                    ✓
                  </div>
                  <span className="font-mono text-xs uppercase tracking-wider text-white">Hoàn tất</span>
                </div>
              </div>

              {/* Step 1 Content: Order Review */}
              {checkoutStep === "summary" && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h4 className="font-display text-2xl font-extrabold text-white">Xác Nhận Đơn Hàng</h4>
                    <p className="font-sans text-sm text-[#bac9cc]">
                      Vui lòng kiểm tra kỹ lại cấu hình siêu máy tính Aurora của bạn trước khi điền thông tin
                      giao hàng.
                    </p>
                  </div>

                  <div className="glass-panel rounded-2xl p-5 border border-white/5 space-y-3 font-sans text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#bac9cc] font-medium">Bộ vi xử lý:</span>
                      <span className="text-white font-bold">{activeBuild.cpu.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#bac9cc] font-medium">Card đồ họa:</span>
                      <span className="text-white font-bold">{activeBuild.gpu.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#bac9cc] font-medium">Bộ nhớ RAM:</span>
                      <span className="text-white font-bold">{activeBuild.ram.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#bac9cc] font-medium">Ổ cứng lưu trữ:</span>
                      <span className="text-white font-bold">{activeBuild.storage.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#bac9cc] font-medium">Nguồn máy tính (PSU):</span>
                      <span className="text-white font-bold">{activeBuild.psu.name}</span>
                    </div>
                    {engravingText && (
                      <div className="flex justify-between">
                        <span className="text-[#bac9cc] font-medium">Khắc chữ kính cường lực:</span>
                        <span className="text-[#00e5ff] font-bold">
                          ✓ &quot;{engravingText.toUpperCase()}&quot;
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Shipping Method Option */}
                  <div className="space-y-3">
                    <label className="font-mono text-xs uppercase tracking-widest text-white block">
                      Phương thức vận chuyển
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div
                        onClick={() => setShippingMethod("standard")}
                        className={`p-4 rounded-xl border cursor-pointer transition-colors ${
                          shippingMethod === "standard" ? "bg-white/5" : "hover:bg-white/5 border-white/5"
                        }`}
                        style={{
                          borderColor:
                            shippingMethod === "standard" ? primaryColor : "rgba(255,255,255,0.05)",
                        }}
                      >
                        <div className="font-bold text-white text-sm">Giao hàng tiêu chuẩn</div>
                        <div className="text-xs text-[#bac9cc] mt-1">Miễn phí (3 - 5 ngày làm việc)</div>
                      </div>

                      <div
                        onClick={() => setShippingMethod("express")}
                        className={`p-4 rounded-xl border cursor-pointer transition-colors ${
                          shippingMethod === "express" ? "bg-white/5" : "hover:bg-white/5 border-white/5"
                        }`}
                        style={{
                          borderColor:
                            shippingMethod === "express" ? primaryColor : "rgba(255,255,255,0.05)",
                        }}
                      >
                        <div className="font-bold text-white text-sm">Hỏa tốc hàng không</div>
                        <div className="text-xs text-[#bac9cc] mt-1">
                          +{formatPrice(45)} (1 - 2 ngày làm việc, đóng thùng gỗ bảo hiểm)
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="giftCheckbox"
                      checked={isGift}
                      onChange={(e) => setIsGift(e.target.checked)}
                      className="rounded border-white/10 bg-[#050505] text-primary focus:ring-primary focus:ring-offset-background"
                    />
                    <label htmlFor="giftCheckbox" className="font-sans text-xs text-[#bac9cc] cursor-pointer">
                      Đây là quà tặng (Yêu cầu bọc ruy-băng sang trọng và thiệp chúc mừng đóng sáp)
                    </label>
                  </div>

                  <div className="flex justify-between items-end pt-4 border-t border-white/5">
                    <div>
                      <span className="font-mono text-[9px] tracking-widest text-[#bac9cc] uppercase">
                        TOTAL VALUE
                      </span>
                      <div className="font-display text-2xl font-black text-white">
                        {formatPrice(totalPrice)}
                      </div>
                    </div>

                    <button
                      onClick={handleProceedToShipping}
                      className="px-6 py-3 font-mono text-[10px] uppercase tracking-widest text-black font-bold transition-all duration-300 hover:bg-white cursor-pointer"
                      style={{
                        backgroundColor: primaryColor,
                      }}
                    >
                      Nhập địa chỉ giao hàng
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2 Content: Shipping Form */}
              {checkoutStep === "shipping" && (
                <form onSubmit={handlePlaceOrder} className="space-y-6">
                  <div className="space-y-2">
                    <h4 className="font-display text-2xl font-extrabold text-white">Thông Tin Giao Hàng</h4>
                    <p className="font-sans text-sm text-[#bac9cc]">
                      Vui lòng nhập địa chỉ chính xác để đội ngũ vận chuyển chuyên dụng của chúng tôi vận
                      chuyển và lắp đặt máy tận nhà.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="font-mono text-[10px] tracking-widest text-[#bac9cc] uppercase block">
                        Họ và tên
                      </label>
                      <input
                        required
                        type="text"
                        value={shippingForm.fullName}
                        onChange={(e) => setShippingForm({ ...shippingForm, fullName: e.target.value })}
                        className="w-full bg-[#050505] border border-white/10 hover:border-white/20 focus:border-white focus:outline-none rounded-xl px-4 py-3 font-mono text-xs text-white"
                        placeholder="Nguyễn Văn A"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="font-mono text-[10px] tracking-widest text-[#bac9cc] uppercase block">
                        Địa chỉ Email
                      </label>
                      <input
                        required
                        type="email"
                        value={shippingForm.email}
                        onChange={(e) => setShippingForm({ ...shippingForm, email: e.target.value })}
                        className="w-full bg-[#050505] border border-white/10 hover:border-white/20 focus:border-white focus:outline-none rounded-xl px-4 py-3 font-mono text-xs text-white"
                        placeholder="vana@gmail.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="font-mono text-[10px] tracking-widest text-[#bac9cc] uppercase block">
                        Số điện thoại
                      </label>
                      <input
                        required
                        type="tel"
                        value={shippingForm.phone}
                        onChange={(e) => setShippingForm({ ...shippingForm, phone: e.target.value })}
                        className="w-full bg-[#050505] border border-white/10 hover:border-white/20 focus:border-white focus:outline-none rounded-xl px-4 py-3 font-mono text-xs text-white"
                        placeholder="0901234567"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="font-mono text-[10px] tracking-widest text-[#bac9cc] uppercase block">
                        Thành phố / Tỉnh
                      </label>
                      <input
                        required
                        type="text"
                        value={shippingForm.city}
                        onChange={(e) => setShippingForm({ ...shippingForm, city: e.target.value })}
                        className="w-full bg-[#050505] border border-white/10 hover:border-white/20 focus:border-white focus:outline-none rounded-xl px-4 py-3 font-mono text-xs text-white"
                        placeholder="Hồ Chí Minh"
                      />
                    </div>

                    <div className="sm:col-span-2 space-y-2">
                      <label className="font-mono text-[10px] tracking-widest text-[#bac9cc] uppercase block">
                        Địa chỉ chi tiết (Số nhà, đường, quận)
                      </label>
                      <input
                        required
                        type="text"
                        value={shippingForm.address}
                        onChange={(e) => setShippingForm({ ...shippingForm, address: e.target.value })}
                        className="w-full bg-[#050505] border border-white/10 hover:border-white/20 focus:border-white focus:outline-none rounded-xl px-4 py-3 font-mono text-xs text-white"
                        placeholder="123 Đường Điện Biên Phủ, Quận Bình Thạnh"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-white/5">
                    <button
                      type="button"
                      onClick={() => setCheckoutStep("summary")}
                      className="px-5 py-2.5 font-mono text-[10px] uppercase tracking-widest text-[#bac9cc] hover:text-white glass-panel cursor-pointer"
                    >
                      Quay lại
                    </button>

                    <button
                      type="submit"
                      className="px-6 py-3 font-mono text-[10px] uppercase tracking-widest text-black font-bold transition-all duration-300 flex items-center gap-2 hover:bg-white cursor-pointer"
                      style={{
                        backgroundColor: primaryColor,
                      }}
                    >
                      Đặt hàng ngay
                      <Send size={11} />
                    </button>
                  </div>
                </form>
              )}

              {/* Step 3 Content: Order Finalized Success Celebration */}
              {checkoutStep === "success" && (
                <div className="text-center py-8 space-y-6">
                  <div className="w-16 h-16 bg-[#00e0b0]/10 border border-[#00e0b0]/30 rounded-full flex items-center justify-center mx-auto text-[#00e0b0]">
                    <ShieldCheck size={32} />
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-display text-3xl font-extrabold text-white">Chế Tác Thành Công!</h4>
                    <p className="font-sans text-sm text-[#bac9cc] max-w-md mx-auto">
                      Cảm ơn bạn <span className="text-white font-bold">{shippingForm.fullName}</span>! Đơn
                      hàng siêu máy tính Aurora của bạn đã được đưa vào quy trình thiết kế và chế tác thủ
                      công.
                    </p>
                  </div>

                  <div className="glass-panel rounded-2xl p-5 border border-white/5 space-y-4 max-w-md mx-auto text-left font-sans text-xs">
                    <div className="flex justify-between">
                      <span className="text-[#bac9cc]">Mã đơn hàng:</span>
                      <span className="font-mono text-white font-bold">{trackingNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#bac9cc]">Trạng thái:</span>
                      <span className="text-[#00e0b0] font-bold">ĐANG CHẾ TÁC THỦ CÔNG</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#bac9cc]">Phương thức:</span>
                      <span className="text-white uppercase font-bold">
                        {shippingMethod === "express" ? "Hỏa tốc hàng không" : "Giao hàng tiêu chuẩn"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#bac9cc]">Thời gian lắp đặt dự kiến:</span>
                      <span className="text-[#00e5ff] font-bold">
                        {shippingMethod === "express" ? "Trong 24h - 48h tiếp theo" : "Từ 3 - 5 ngày làm việc"}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-3 pt-4">
                    <div className="flex items-center gap-1.5 text-xs text-[#bac9cc]">
                      <Truck size={14} style={{ color: primaryColor }} />
                      <span>
                        Email xác nhận và mã vận đơn thời gian thực đã được gửi tới: {shippingForm.email}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        setShowCheckoutModal(false);
                        resetEngravingText();
                      }}
                      className="px-8 py-3 rounded-xl font-mono text-xs uppercase tracking-widest text-black bg-white font-bold hover:opacity-90 active:scale-95 transition-all duration-300"
                    >
                      Quay về Trang chủ
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
