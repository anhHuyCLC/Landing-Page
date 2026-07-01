import type { ComponentCategory, AmbientTheme, BenchmarkGame } from "./type";

export const BASE_PRICE = 4299;

export const CATEGORIES: ComponentCategory[] = [
  {
    id: "cpu",
    name: "PROCESSOR",
    icon: "memory",
    options: [
      {
        id: "ultra-9-285k",
        name: "Intel Core Ultra 9 285K",
        specs: "24 Cores / 32 Threads, Up to 5.7 GHz",
        priceDelta: 0,
        powerDraw: 250,
        fpsFactor: 1.0,
        renderFactor: 1.0,
        thermalFactor: 1.0,
      },
      {
        id: "ultra-7-265k",
        name: "Intel Core Ultra 7 265K",
        specs: "20 Cores / 28 Threads, Up to 5.5 GHz",
        priceDelta: -150,
        powerDraw: 200,
        fpsFactor: 0.92,
        renderFactor: 1.15,
        thermalFactor: 0.9,
      },
      {
        id: "ryzen-9-9950x",
        name: "AMD Ryzen 9 9950X",
        specs: "16 Cores / 32 Threads, Up to 5.7 GHz",
        priceDelta: 50,
        powerDraw: 230,
        fpsFactor: 1.02,
        renderFactor: 0.95,
        thermalFactor: 0.95,
      },
      {
        id: "ryzen-7-7800x3d",
        name: "AMD Ryzen 7 7800X3D",
        specs: "8 Cores / 16 Threads, 3D V-Cache Up to 5.0 GHz",
        priceDelta: -100,
        powerDraw: 120,
        fpsFactor: 1.06,
        renderFactor: 1.3,
        thermalFactor: 0.8,
      }
    ]
  },
  {
    id: "gpu",
    name: "GRAPHICS CARD",
    icon: "developer_board",
    options: [
      {
        id: "rtx-4090",
        name: "NVIDIA GeForce RTX 4090",
        specs: "24GB GDDR6X, Ada Lovelace Architectural Masterpiece",
        priceDelta: 0,
        powerDraw: 450,
        fpsFactor: 1.0,
        renderFactor: 1.0,
        thermalFactor: 1.0,
      },
      {
        id: "rtx-4080-super",
        name: "NVIDIA GeForce RTX 4080 Super",
        specs: "16GB GDDR6X, Extreme 4K Gaming Capabilities",
        priceDelta: -600,
        powerDraw: 320,
        fpsFactor: 0.82,
        renderFactor: 1.25,
        thermalFactor: 0.85,
      },
      {
        id: "rtx-4070ti-super",
        name: "NVIDIA GeForce RTX 4070 Ti Super",
        specs: "16GB GDDR6X, Premium 1440p / Entry 4K Specs",
        priceDelta: -900,
        powerDraw: 285,
        fpsFactor: 0.68,
        renderFactor: 1.45,
        thermalFactor: 0.78,
      },
      {
        id: "rx-7900-xtx",
        name: "AMD Radeon RX 7900 XTX",
        specs: "24GB GDDR6, Ultra-fast Rasterization",
        priceDelta: -700,
        powerDraw: 355,
        fpsFactor: 0.84,
        renderFactor: 1.4,
        thermalFactor: 0.92,
      }
    ]
  },
  {
    id: "ram",
    name: "SYSTEM MEMORY",
    icon: "database",
    options: [
      {
        id: "64gb-ddr5",
        name: "64GB DDR5 Dual Channel @ 6400MHz",
        specs: "Premium High-Speed Low-Latency Corsair Dominator Titanium",
        priceDelta: 0,
        powerDraw: 15,
        fpsFactor: 1.0,
        renderFactor: 1.0,
        thermalFactor: 1.0,
      },
      {
        id: "32gb-ddr5",
        name: "32GB DDR5 Dual Channel @ 6000MHz",
        specs: "High Performance Low Profile Gaming Memory",
        priceDelta: -120,
        powerDraw: 10,
        fpsFactor: 0.98,
        renderFactor: 1.1,
        thermalFactor: 0.95,
      },
      {
        id: "96gb-ddr5",
        name: "96GB DDR5 Dual Channel @ 6400MHz",
        specs: "Ultimate Capacity for Heavy 3D, 8K Video Rendering & VMs",
        priceDelta: 220,
        powerDraw: 20,
        fpsFactor: 1.01,
        renderFactor: 0.88,
        thermalFactor: 1.05,
      }
    ]
  },
  {
    id: "storage",
    name: "SOLID STATE STORAGE",
    icon: "hard_drive",
    options: [
      {
        id: "4tb-nvme",
        name: "4TB PCIe Gen5 NVMe M.2 SSD",
        specs: "Crucial T700, Up to 12,400 MB/s Blistering Read Speeds",
        priceDelta: 0,
        powerDraw: 12,
        fpsFactor: 1.0,
        renderFactor: 1.0,
        thermalFactor: 1.0,
      },
      {
        id: "2tb-nvme",
        name: "2TB PCIe Gen4 NVMe M.2 SSD",
        specs: "Samsung 990 Pro, Up to 7,450 MB/s Extreme Speeds",
        priceDelta: -100,
        powerDraw: 8,
        fpsFactor: 0.99,
        renderFactor: 1.05,
        thermalFactor: 0.9,
      },
      {
        id: "8tb-nvme-raid",
        name: "8TB PCIe Gen5 NVMe SSD (RAID 0)",
        specs: "Dual 4TB Crucial T700 Drives with Custom Thermal Heatsinks",
        priceDelta: 450,
        powerDraw: 24,
        fpsFactor: 1.0,
        renderFactor: 0.9,
        thermalFactor: 1.15,
      }
    ]
  },
  {
    id: "psu",
    name: "POWER SUPPLY UNIT",
    icon: "bolt",
    options: [
      {
        id: "1000w-gold",
        name: "1000W 80+ Gold Fully Modular ATX 3.0",
        specs: "Corsair RM1000x Shift, Smart Cable Interface",
        priceDelta: 0,
        powerDraw: 0,
        fpsFactor: 1.0,
        renderFactor: 1.0,
        thermalFactor: 1.0,
      },
      {
        id: "850w-gold",
        name: "850W 80+ Gold Fully Modular ATX 3.0",
        specs: "Corsair RM850x, Compact Power Delivery",
        priceDelta: -40,
        powerDraw: 0,
        fpsFactor: 1.0,
        renderFactor: 1.0,
        thermalFactor: 1.0,
      },
      {
        id: "1200w-platinum",
        name: "1200W 80+ Platinum Fully Modular ATX 3.0",
        specs: "Seasonic PRIME TX-1200, Supreme Efficiency & Durability",
        priceDelta: 120,
        powerDraw: 0,
        fpsFactor: 1.0,
        renderFactor: 1.0,
        thermalFactor: 1.0,
      }
    ]
  }
];

export const THEMES: AmbientTheme[] = [
  {
    id: "gold",
    name: "Aura Gold",
    primaryColor: "#D4AF37",
    borderColor: "rgba(212, 175, 55, 0.3)",
    glowColor: "rgba(212, 175, 55, 0.4)",
    gradientFrom: "from-[#D4AF37] to-[#121212]",
  },
  {
    id: "obsidian",
    name: "Obsidian Platinum",
    primaryColor: "#E5E5E5",
    borderColor: "rgba(229, 229, 229, 0.3)",
    glowColor: "rgba(229, 229, 229, 0.4)",
    gradientFrom: "from-[#E5E5E5] to-[#121212]",
  },
  {
    id: "emerald",
    name: "Alpine Jade",
    primaryColor: "#50B498",
    borderColor: "rgba(80, 180, 152, 0.3)",
    glowColor: "rgba(80, 180, 152, 0.4)",
    gradientFrom: "from-[#50B498] to-[#121212]",
  },
  {
    id: "bronze",
    name: "Sartorial Bronze",
    primaryColor: "#C58F5C",
    borderColor: "rgba(197, 143, 92, 0.3)",
    glowColor: "rgba(197, 143, 92, 0.4)",
    gradientFrom: "from-[#C58F5C] to-[#121212]",
  }
];

export const GAMES: BenchmarkGame[] = [
  {
    id: "cyberpunk",
    name: "Cyberpunk 2077",
    baseFps: 144,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3YyjG6k05GNDEyUQPuZvF0Ocd2FOu6JLVcQDInoVFSZb5L2FJcu4DNM4daUIDTytb7evx31CiQYKvNXURaXq3YfnQPoPpd3XLHNV7d22dkrv0SCoyjAACTxfzlngKvEVtgYrKMhruiOoUPHoySSy-JLsd6-qKddvrXJ7iQSfarpskibWp8OyVUa1vD3tAsgwGw28yUq6jxjMc8z29wSg8EOBnkDDKF4MS5NLUZKENwGCNucq-CjGdbocZrJx7_jvB2Y3KCDGrEEP2",
  },
  {
    id: "hogwarts",
    name: "Hogwarts Legacy",
    baseFps: 165,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDCmBqcU-LP9kkwBQA_eTLAO0I8Zp0B2ar_YfXag8AOv-5r_ogU3ltIEzYgfplD2W35_2irM70JLqKMwCUjG44IVLEbrJIE2ttxHh-a0WnMQr-hQrWSDeVbAZWBiCHjGbAuqSlDK55Rl3Swd_6kjGCjDErznEdiMR9RwsuSY-nKQ0fOe3prL41Bmb3g84ttaHBQOcQ-b8jw_ju9ZcsBERhB1L4pAclbXtXNLBGhC-YYBohMkrSUONHw38DOTTg4jcxz0xrduiOMpcYt",
  },
  {
    id: "valorant",
    name: "Valorant (Competitive)",
    baseFps: 540,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBFLh0TxSrtVLnn94xL1Ty1qwvmSjfYOpOqs-lz4yUBSUv_YTu9U7UYJclHmnDv4uwOOEhjYnsw5COVEuvXU660a_MpH52Oj0PnflhqM1fkvdvosJEbS-GUwV8_8I1g_ZJpTHK17m5JEg3S6V8iMw-fgKmYiI-iB0EUepzL1Qj9fDx1vMpiDUS6KZLEzmSY-e8DP-Q8yROIhe-QQWJ-daLZM3-8zu4QPaYH_u0gWPJ-GRsGQOBxZSMExtkn4NiMz_44yMw19TYi6SjD",
  }
];
