import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from './user_model';
import {AnnounceApplied} from './announce_applied';
import {Announce} from '../post.interface';

@Injectable({
  providedIn: 'root'
})

export class AuthServiceAnnouncelist{
  url =  'http://localhost:3000/announced-applied';
constructor(private http: HttpClient) {
}
  getAnnounceList(): Observable<AnnounceApplied[]> {
    return this.http.get<AnnounceApplied[]>(this.url);
  }
  createListAnnounce(announceList: AnnounceApplied): Observable<any>{
    return this.http.post(this.url, announceList);
  }
  
  getAnnouncements(): Observable<Announce[]>{
    return this.http.get<Announce[]>(this.url);
  }

}
