import { NavigationPort } from "./navigation.port";

export class FakeNavigationAdapter implements NavigationPort {
    commands: any[] = [];
    params: Record<string, string> = {};

    navigate(commands: any[]): void {
        this.commands = commands;
    }

    getParam(name: string): string | null {
        return this.params[name] ?? null;
    }
}