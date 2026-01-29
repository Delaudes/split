import { NavigationPort } from "./navigation.port";

export class FakeNavigationAdapter implements NavigationPort {
    commands: any[] = [];
    params: Record<string, string> = {};
    shareData?: ShareData

    navigate(commands: any[]): void {
        this.commands = commands;
    }

    getParam(name: string): string {
        return this.params[name] ?? '';
    }

    share(shareData: ShareData): void {
        this.shareData = shareData;
    }
}