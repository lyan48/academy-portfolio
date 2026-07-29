import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, tap } from 'rxjs';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  username: string;
  dateOfBirth: string;
  role: string;
}

export interface AuthUser {
  id: number;
  email: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  gender?: string;
  phoneNumber?: string;
  country?: string;
  role?: string;
}

export interface LoginResponse {
  token: string;
  user: AuthUser;
}

export interface RegisterResponse {
  token: string;
  user: AuthUser;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly cookieService = inject(CookieService);

  private readonly apiUrl = 'http://localhost:4000/api/auth';
  private readonly tokenCookieName = 'auth_token';
  private readonly userStorageKey = 'trendify_current_user';

  readonly currentUser = signal<AuthUser | null>(this.loadStoredUser());

  login(credentials: LoginCredentials, rememberMe: boolean): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: LoginResponse) => {
        this.saveToken(response.token, rememberMe);
        this.saveUser(response.user);
      }),
    );
  }

  register(credentials: RegisterCredentials): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.apiUrl}/register`, credentials).pipe(
      tap((response: RegisterResponse) => {
        this.saveToken(response.token, false);
        this.saveUser(response.user);
      }),
    );
  }

  getToken(): string {
    return this.cookieService.get(this.tokenCookieName);
  }

  isLoggedIn(): boolean {
    return Boolean(this.getToken());
  }

  updateStoredUser(user: AuthUser): void {
    this.saveUser(user);
  }

  logout(): void {
    this.cookieService.delete(this.tokenCookieName, '/');

    localStorage.removeItem(this.userStorageKey);
    this.currentUser.set(null);
  }

  private saveToken(token: string, rememberMe: boolean): void {
    if (rememberMe) {
      this.cookieService.set(this.tokenCookieName, token, 7, '/', undefined, false, 'Lax');

      return;
    }

    this.cookieService.set(this.tokenCookieName, token, undefined, '/', undefined, false, 'Lax');
  }

  private saveUser(user: AuthUser): void {
    localStorage.setItem(this.userStorageKey, JSON.stringify(user));

    this.currentUser.set(user);
  }

  private loadStoredUser(): AuthUser | null {
    const savedUser = localStorage.getItem(this.userStorageKey);

    if (!savedUser) {
      return null;
    }

    try {
      return JSON.parse(savedUser) as AuthUser;
    } catch {
      localStorage.removeItem(this.userStorageKey);
      return null;
    }
  }
}
