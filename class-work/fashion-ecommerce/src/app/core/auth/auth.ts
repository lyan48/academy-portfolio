import { Injectable, signal, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, tap, map } from 'rxjs';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthUser {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  role: string;
  dateOfBirth: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private http = inject(HttpClient);
  private router = inject(Router);
  private cookieService = inject(CookieService);

  private readonly apiUrl = '/api';
  private readonly tokenKey = 'token';
  private readonly userKey = 'user';

  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true'
  });

  currentUser: AuthUser | null = this.getUser();
  isLoggedIn = signal<boolean>(this.hasToken());

  login(email: string, password: string): Observable<string> {
  return this.http.post<AuthResponse>(
    `${this.apiUrl}/auth/login`,
    { email, password }
  ).pipe(
    tap((res) => {
      if (!res.token) return;

      this.currentUser = res.user;
      this.setToken(res.token);
      this.setUser(res.user);
      this.isLoggedIn.set(true);
    }),
    map((res) => res.token)
  );
}

  setToken(token: string): void {
    this.cookieService.set(this.tokenKey, token, {
      path: '/',
      expires: 7
    });
  }

  getToken(): string {
    return this.cookieService.get(this.tokenKey);
  }

  setUser(user: AuthUser): void {
    this.cookieService.set(this.userKey, JSON.stringify(user), {
      path: '/',
      expires: 7
    });
  }

  getUser(): AuthUser | null {
    const user = this.cookieService.get(this.userKey);

    if (!user) {
      return null;
    }

    return JSON.parse(user);
  }

  logout(): void {
    this.cookieService.delete(this.tokenKey, '/');
    this.cookieService.delete(this.userKey, '/');

    this.currentUser = null;
    this.isLoggedIn.set(false);

    this.router.navigate(['/login']);
  }

  private hasToken(): boolean {
    return !!this.getToken();
  }
}