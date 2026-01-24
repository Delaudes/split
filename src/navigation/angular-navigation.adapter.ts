import { inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NavigationPort } from "./navigation.port";

export class AngularNavigationAdapter implements NavigationPort {
    private readonly router = inject(Router);
    private readonly activatedRoute = inject(ActivatedRoute);

    navigate(commands: any[]): void {
        this.router.navigate(commands);
    }

    getParam(name: string): string | null {
        return this.activatedRoute.snapshot.paramMap.get(name)
    }
}