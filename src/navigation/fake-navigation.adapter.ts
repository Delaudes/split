import { NavigationPort } from "./navigation.port";

export class FakeNavigationAdapter implements NavigationPort {
    commands: any[] = [];
    params: Record<string, string> = {};

    navigate(commands: any[]): void {
        this.commands = commands;
    }

    getParam(name: string): string {
        return this.params[name] ?? '';
    }
}