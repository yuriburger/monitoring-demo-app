import { Component, OnInit } from "@angular/core";
import { InfoService } from "./info.service";
import { Info } from "./info";
import { ApplicationInsightsService } from "./appinsights.service";
import {
  ApplicationInsights,
  DistributedTracingModes
} from "@microsoft/applicationinsights-web";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "app";
  info: Info;

  constructor(
    private infoService: InfoService,
    private appInsightsService: ApplicationInsightsService
  ) {}

  ngOnInit() {
    this.appInsightsService.trackPageView();
    this.getInfo();
  }

  getInfo() {
    this.infoService.getInfo().subscribe(response => {
      this.info = response;
    });
  }
}
