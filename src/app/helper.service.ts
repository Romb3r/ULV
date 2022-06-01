import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse , HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_PATH = "https://ulv-api.fly.dev/v1/"

@Injectable({
  providedIn: 'root'
})

export class HelperService {
  public items: any[] = []

  constructor(private http: HttpClient) {
    this.http.get(BASE_PATH + "items", {
      observe: "response",
      headers: new HttpHeaders({
        "Authorization": "Basic " + btoa("ulv:ulvistgeil")
      })
    })
    .toPromise()
    .then(response => {
      this.items.push(response["body"])
    })
  }

}
