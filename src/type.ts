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