import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from './user_model';
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Announce} from '../post.interface';


@Injectable({
  providedIn: 'root'
})

export class AutService {
  url = 'http://localhost:3000/user';

  private hasLoggedIn$ = new BehaviorSubject<boolean>(false);
  private currentUser  = new BehaviorSubject<User>(null);
  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);

  }
  getCurrentUser(): Observable<User>{
    return this.getUsers().pipe(
      map((stream: User[]) =>
        stream.find(user => user.username === this.getLoggedUser().username))
    );

  }

  getUser(id: number): Observable<User>{
    const url = `${this.url}/${id}`;

    return this.http.get<User>(url);
  }

  login(username: string, password: string, email: string): Observable<User> {
    return this.getUsers().pipe(
      map((stream: User[]) =>
        stream.find(user => user.username === username
          && user.password === password))
    );
  }
  register(data: User): Observable<User>{
  return this.http.post<User>(this.url, data);
  }
  logout(): void {
    localStorage.removeItem('loggedUser');

    this.setHasLoggedIn(false);

  }

  setLoggedUser(user: User): void{
    localStorage.setItem('loggedUser', JSON.stringify(user));

    this.setHasLoggedIn(true);
  }

  getLoggedUser(): User{
    return JSON.parse(localStorage.getItem('loggedUser'));
  }

  setHasLoggedIn(hasLogged: boolean): void {
    this.hasLoggedIn$.next(hasLogged);
  }
  getHasLoggedIn(): Observable<boolean>{
    return this.hasLoggedIn$.asObservable();
  }
  editUser(user: User): Observable<any>{
    const url = `${this.url}/${user.id}`;

    return this.http.put(url, user);
  }
  deleteUser(id: number): Observable<any> {
    const url = `${this.url}/${id}`;

    return this.http.delete(url);
  }
}
