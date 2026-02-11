import { NavigationPort } from "./navigation.port";

export class FakeNavigationWrapper implements NavigationPort {
    commands: any[] = [];
    params: Record<string, string> = {};
    shareData?: ShareData
    externalUrl?: string

    navigate(commands: any[]): void {
        this.commands = commands;
    }

    getParam(name: string): string {
        return this.params[name] ?? '';
    }

    share(shareData: ShareData): void {
        this.shareData = shareData;
    }

    openExternal(url: string): void {
        this.externalUrl = url;
    }
}