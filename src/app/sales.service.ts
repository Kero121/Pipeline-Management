import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(private _httpClient:HttpClient) { }

  getDeals():Observable<any>
  {
    return this._httpClient.get(`https://my-json-server.typicode.com/mabukoush1/contacts/db`);
  }
}
