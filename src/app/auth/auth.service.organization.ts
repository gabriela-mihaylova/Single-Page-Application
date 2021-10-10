import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

import {map} from 'rxjs/operators';
import {Organization} from './organization_model';
import {Injectable} from '@angular/core';
import {User} from './user_model';

@Injectable({
  providedIn: 'root'
})

export class AuthServiceOrganization{
  url = 'http://localhost:3000/organization';

  private hasLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
  }

  getOrganizations(): Observable<Organization[]> {
    return this.http.get<Organization[]>(this.url);

  }
  getOrganization(id: number): Observable<Organization>{
    const url = `${this.url}/${id}`;

    return this.http.get<Organization>(url);
  }
  getCurrentOrganization(): Observable<Organization>{
    return this.getOrganizations().pipe(
      map((stream) =>
        stream.find(organization => organization.username === this.getLoggedOrganization().username))
    );

  }

  login(username: string, password: string, email: string): Observable<Organization> {
    return this.getOrganizations().pipe(
      map((stream: Organization[]) =>
        stream.find(organization => organization.username === username
          && organization.password === password))
    );
  }
  register(data: Organization): Observable<Organization>{
    return this.http.post<Organization>(this.url, data);
  }
  logout(): void {
    localStorage.removeItem('loggedOrganization');

    this.setHasLoggedIn(false);

  }

  setLoggedOrganization(organization: Organization): void{
    localStorage.setItem('loggedOrganization', JSON.stringify(organization));

    this.setHasLoggedIn(true);
  }

  getLoggedOrganization(): Organization{
    return JSON.parse(localStorage.getItem('loggedOrganization'));
  }

  setHasLoggedIn(hasLogged: boolean): void {
    this.hasLoggedIn$.next(hasLogged);
  }

  getHasLoggedIn(): Observable<boolean>{
    return this.hasLoggedIn$.asObservable();
  }
  editOrganization(organization: Organization): Observable<any>{
    const url = `${this.url}/${organization.id}`;

    return this.http.put(url, organization);
  }
  deleteOrganization(id: number): Observable<any> {
    const url = `${this.url}/${id}`;

    return this.http.delete(url);
  }
}
