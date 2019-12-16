import { Injectable } from "@angular/core";
import {
  ApplicationInsights,
  DistributedTracingModes
} from "@microsoft/applicationinsights-web";
import { ActivatedRouteSnapshot, ResolveEnd, Router } from "@angular/router";
import { filter } from "rxjs/operators";
import { AppConfig } from "./app.config.service";

@Injectable()
export class ApplicationInsightsService {
  private appInsights = new ApplicationInsights({
    config: {
      instrumentationKey: AppConfig.settings.instrumentation,
      distributedTracingMode: DistributedTracingModes.W3C,
      disableCorrelationHeaders: false,
      enableCorsCorrelation: true
    }
  });

  constructor(private router: Router) {
    this.appInsights.loadAppInsights();

    this.appInsights.addTelemetryInitializer(envelope => {
      envelope.tags["ai.cloud.role"] = "app";
    });

    this.router.events
      .pipe(filter(event => event instanceof ResolveEnd))
      .subscribe((event: ResolveEnd) => {
        const activatedComponent = this.getActivatedComponent(event.state.root);
        if (activatedComponent) {
          this.trackPageView(
            `${activatedComponent.name} ${this.getRouteTemplate(
              event.state.root
            )}`,
            event.urlAfterRedirects
          );
          this.appInsights.flush(); // Debug -> don't wait for browser to close
        }
      });
  }

  trackPageView(name?: string, uri?: string) {
    this.appInsights.trackPageView({ name, uri });
  }

  private getActivatedComponent(snapshot: ActivatedRouteSnapshot): any {
    if (snapshot.firstChild) {
      return this.getActivatedComponent(snapshot.firstChild);
    }

    return snapshot.component;
  }

  private getRouteTemplate(snapshot: ActivatedRouteSnapshot): string {
    let path = "";
    if (snapshot.routeConfig) {
      path += snapshot.routeConfig.path;
    }

    if (snapshot.firstChild) {
      return path + this.getRouteTemplate(snapshot.firstChild);
    }

    return path;
  }
}
