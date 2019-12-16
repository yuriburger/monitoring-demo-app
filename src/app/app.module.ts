import { BrowserModule } from "@angular/platform-browser";
import { AppConfig } from "./app.config.service";
import { NgModule, APP_INITIALIZER } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";

import { ApplicationInsightsService } from "./appinsights.service";
import { HomeComponent } from "./home/home.component";

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [
    AppConfig,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppConfig],
      multi: true
    },
    ApplicationInsightsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

export function initializeApp(config: AppConfig) {
  return () => config.load();
}
