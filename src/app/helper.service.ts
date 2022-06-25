import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class HelperService {
  public code: string = "";

  constructor(private http: HttpClient) { }

  public postItem(postData: object) {
    console.log(this.code)
    return this.http.post('https://ulv-api.fly.dev/v1/items', postData, {
      headers: new HttpHeaders({
        "Authorization": "Basic " + btoa("ulv:ulvistgeil"),
        "X-Group-Key": this.code
      })
    })
    .toPromise()
  }

  public patchItem(patchData: object, uuid: string) {
    return this.http.patch('https://ulv-api.fly.dev/v1/items/' + uuid, patchData, {
      headers: new HttpHeaders({
        "Authorization": "Basic " + btoa("ulv:ulvistgeil"),
        "X-Group-Key": this.code
      })
    })
    .toPromise()
  }

  public deleteItem(uuid: string) {
    return this.http.delete('https://ulv-api.fly.dev/v1/items/' + uuid, {
      headers: new HttpHeaders({
        "Authorization": "Basic " + btoa("ulv:ulvistgeil"),
        "X-Group-Key": this.code
      })
    })
    .toPromise()
  }

  public postPlace(postData: object) {
    return this.http.post('https://ulv-api.fly.dev/v1/places', postData, {
      headers: new HttpHeaders({
        "Authorization": "Basic " + btoa("ulv:ulvistgeil"),
        "X-Group-Key": this.code
      })
    })
    .toPromise()
  }

  public patchPlace(patchData: object, uuid: string) {
    return this.http.patch('https://ulv-api.fly.dev/v1/places/' + uuid, patchData, {
      headers: new HttpHeaders({
        "Authorization": "Basic " + btoa("ulv:ulvistgeil"),
        "X-Group-Key": this.code
      })
    })
    .toPromise()
  }

  public deletePlace(uuid: string) {
    return this.http.delete('https://ulv-api.fly.dev/v1/places/' + uuid, {
      headers: new HttpHeaders({
        "Authorization": "Basic " + btoa("ulv:ulvistgeil"),
        "X-Group-Key": this.code
      })
    })
    .toPromise()
  }

  public postCartItem(postData: object) {
    return this.http.post('https://ulv-api.fly.dev/v1/cart-items', postData, {
      headers: new HttpHeaders({
        "Authorization": "Basic " + btoa("ulv:ulvistgeil"),
        "X-Group-Key": this.code
      })
    })
    .toPromise()
  }

  public patchCartItem(patchData: object, uuid: string) {
    return this.http.patch('https://ulv-api.fly.dev/v1/cart-items/' + uuid, patchData, {
      headers: new HttpHeaders({
        "Authorization": "Basic " + btoa("ulv:ulvistgeil"),
        "X-Group-Key": this.code
      })
    })
    .toPromise()
  }

  public deleteCartItem(uuid: string) {
    return this.http.delete('https://ulv-api.fly.dev/v1/cart-items/' + uuid, {
      headers: new HttpHeaders({
        "Authorization": "Basic " + btoa("ulv:ulvistgeil"),
        "X-Group-Key": this.code
      })
    })
    .toPromise()
  }

  public putCartItem(uuid: string) {
    return this.http.put('https://ulv-api.fly.dev/v1/cart-items/' + uuid + '/shopped', {
      headers: new HttpHeaders({
        "Authorization": "Basic " + btoa("ulv:ulvistgeil"),
        "X-Group-Key": this.code
      })
    })
    .toPromise()  
  }
}
