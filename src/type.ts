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

export const DEFAULT_BUILD: ActiveBuild = {
    cpu: {
        id: "cpu-u9-285k",
        name: "Intel Core Ultra 9 285K",
        specs: "Intel Core Ultra 9 285K (24 Cores, 5.7GHz)",
        priceDelta: 0,
        powerDraw: 250,
        fpsFactor: 1.0,
        renderFactor: 1.0,
        thermalFactor: 1.0
    },
    gpu: {
        id: "gpu-rtx4090",
        name: "NVIDIA GeForce RTX 4090 24GB",
        specs: "NVIDIA GeForce RTX 4090 24GB GDDR6X",
        priceDelta: 0,
        powerDraw: 450,
        fpsFactor: 1.0,
        renderFactor: 1.0,
        thermalFactor: 1.0
    },
    ram: {
        id: "ram-64gb",
        name: "64GB DDR5 6400MHz",
        specs: "64GB (2x32GB) DDR5 6400MHz RGB",
        priceDelta: 0,
        powerDraw: 30,
        fpsFactor: 1.0,
        renderFactor: 1.0,
        thermalFactor: 1.0
    },
    storage: {
        id: "ssd-2tb",
        name: "2TB PCIe 4.0 NVMe SSD",
        specs: "2TB M.2 NVMe PCIe 4.0 (Read 7300MB/s)",
        priceDelta: 0,
        powerDraw: 10,
        fpsFactor: 1.0,
        renderFactor: 1.0,
        thermalFactor: 1.0
    },
    psu: {
        id: "1000w-gold",
        name: "1000W 80 Plus Gold Fully Modular",
        specs: "1000W 80 Plus Gold Power Supply",
        priceDelta: 0,
        powerDraw: 0,
        fpsFactor: 1.0,
        renderFactor: 1.0,
        thermalFactor: 1.0
    },
    theme: {
        id: "gold",
        name: "AURORA GOLD",
        primaryColor: "#D4AF37",
        glowColor: "rgba(212, 175, 55, 0.4)",
        borderColor: "rgba(212, 175, 55, 0.3)",
        gradientFrom: "#D4AF37"
    }
};

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