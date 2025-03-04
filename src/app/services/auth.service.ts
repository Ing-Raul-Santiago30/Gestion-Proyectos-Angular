import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    const user = localStorage.getItem('user');
    if (user) {
      this.userSubject.next(JSON.parse(user));
    }
  }

  login(username: string, password: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}?username=${username}&password=${password}`)
      .pipe(
        map(users => {
          if (users.length > 0) {
            const user = users[0];
            localStorage.setItem('user', JSON.stringify(user));
            this.userSubject.next(user);
            return user;
          } else {
            throw new Error('Credenciales incorrectas');
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  getUserRole(): string {
    const user = this.userSubject.value;
    return user ? user.role : '';
  }

  isAuthenticated(): boolean {
    return !!this.userSubject.value;
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'admin';
  }

  isEditor(): boolean {
    return this.getUserRole() === 'editor';
  }
}
