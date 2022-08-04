import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private url="http://localhost:3000/api/reporter/"
  constructor(private http:HttpClient) { }
  addnews(news:any){
    return this.http.post(this.url + 'news',news)
  }
  shownews(){
    return this.http.get(this.url + 'news')
  }
  delete(id:any){
    return this.http.delete(this.url +'news/' + id)
  }
  single(id:any){
    return this.http.get(this.url + 'news/' + id)
  }
  update(id:any,news:any){
    return this.http.patch(this.url + 'news/' + id, news)
  }
}
