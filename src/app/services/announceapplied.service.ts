import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AnnouncedAppied } from '../model/announced-appied.model';
import { Observable } from 'rxjs';
import { AnnounceApplied } from '../auth/announce_applied';

@Injectable({
  providedIn: 'root'
})
export class AnnounceappliedService {
  
  url = 'http://localhost:3000/announcedapplied';

  constructor(private http: HttpClient) { }

  post(data: AnnouncedAppied): Observable<AnnouncedAppied>{
    return this.http.post<AnnouncedAppied>(this.url, data);
    }

    getAnnouncements(): Observable<AnnouncedAppied[]>{
      let user = JSON.parse( localStorage.getItem('loggedUser'));
      return this.http.get<AnnouncedAppied[]>(`${this.url}?username=${user.username}`);
    }
}
