import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Announce} from './post.interface';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService{
  url = 'http://localhost:3000/announce';

  constructor(private http: HttpClient) {
  }

  getAnnouncements(): Observable<Announce[]>{
    return this.http.get<Announce[]>(this.url);
  }
 /* getAnnounceTitle(): Observable<Announce>{
    return this.http.get<Announce>(this.url);
  }*/
  getAnnounce1(): Observable<Announce>{
    return this.http.get<Announce>(this.url);
  }
  getAnnounce(id: number): Observable<Announce>{
    const url = `${this.url}/${id}`;

    return this.http.get<Announce>(url);
  }
  createListAnnounce(announce: Announce): Observable<any>{
    return this.http.post(this.url, announce.title);
  }
  createAnnounce(announce: Announce): Observable<any>{
    return this.http.post(this.url, announce);
  }
  updateAnnounce(announce: Announce): Observable<any>{
    const url = `${this.url}/${announce.id}`;
    return this.http.put(url, announce);
  }
  deleteAnnounce(id: number): Observable<any>{
    const url = `${this.url}/${id}`;
    return this.http.delete(url);
  }

}
