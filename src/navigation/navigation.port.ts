
export interface NavigationPort {
    navigate(commands: readonly any[]): void;
    getParam(name: string): string | null
}

