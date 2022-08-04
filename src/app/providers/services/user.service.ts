import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public otp = ""
  private url="http://localhost:3000/api/reporter/"
  constructor(private _http:HttpClient) { }
  signup(data:any):Observable<any>{
    return this._http.post(`${this.url}signup`, data)
  }
  login(data:any):Observable<any>{
    return this._http.post(`${this.url}login`, data)
  }

  me():Observable<any>{
    return this._http.get(`${this.url}me`)
  }
  logout():Observable<any>{
    return this._http.post(`${this.url}logout`, null)
  }
  update():Observable<any>{
    return this._http.post(`${this.url}update`, null)
  }
  all():Observable<any>{
    return this._http.post(`${this.url}all`, null)
  }
  profile():Observable<any>{
    return this._http.post(`${this.url}profile`, null)
  }
}
