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
    cpu: ComponentOption | null;
    gpu: ComponentOption | null;
    ram: ComponentOption | null;
    storage: ComponentOption | null;
    psu: ComponentOption | null;
    theme: AmbientTheme;
}

export interface BenchmarkGame {
    id: string;
    name: string;
    baseFps: number;
    image: string
}