import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Info } from "./info";
import { Observable, of } from "rxjs";
import { AppConfig } from "src/app/app.config.service";

@Injectable({
  providedIn: "root"
})
export class InfoService {
  apiURL = AppConfig.settings.endPointApiUrl;

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };

  constructor(private http: HttpClient) {}

  getInfo(): Observable<Info> {
    return this.http.get<Info>(`${this.apiURL}/info`);
  }
}
