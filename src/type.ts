export interface ComponentOption {
    id: string;
    name: string;
    specs: string;
    priceDelta: number;
    powerDraw: number;
    fpsFactor: number;
    renderFactor: number;
    thermalFactor: number;
}

export interface ComponentCategory {
    id: string;
    name: string;
    icon: string;
    options: ComponentOption[];
}

export interface AmbientTheme {
    id: string;
    name: string;
    primaryColor: string;
    glowColor: string;
    borderColor: string;
    gradientFrom: string;
}

export interface ActiveBuild {
    cpu: ComponentOption;
    gpu: ComponentOption;
    ram: ComponentOption;
    storage: ComponentOption;
    psu: ComponentOption;
    theme: AmbientTheme;
}

export interface BenchmarkGame {
    id: string;
    name: string;
    baseFps: number;
    image: string
}

export const formatPrice = (valueInUSD: number, showSign: boolean = false) => {
  const valueInVND = valueInUSD * 25000;
  const formatted = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.abs(valueInVND));

  if (valueInUSD === 0) return formatted;
  const sign = valueInUSD > 0 ? "+" : "-";
  return showSign ? `${sign}${formatted}` : `${valueInUSD < 0 ? "-" : ""}${formatted}`;
};