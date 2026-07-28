import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
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
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly cookieService = inject(CookieService);

  private readonly apiUrl = 'http://localhost:4000/api/auth';
  private readonly tokenCookieName = 'auth_token';

  login(
    credentials: LoginCredentials,
    rememberMe: boolean
  ): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap((response: LoginResponse) => {
          this.saveToken(response.token, rememberMe);
        })
      );
  }

  register(
  credentials: RegisterCredentials
): Observable<RegisterResponse> {
  return this.http
    .post<RegisterResponse>(
      `${this.apiUrl}/register`,
      credentials
    )
    .pipe(
      tap((response: RegisterResponse) => {
        this.saveToken(response.token, false);
      })
    );
}

  getToken(): string {
    return this.cookieService.get(this.tokenCookieName);
  }

  isLoggedIn(): boolean {
    return Boolean(this.getToken());
  }

  logout(): void {
    this.cookieService.delete(this.tokenCookieName, '/');
  }

  private saveToken(token: string, rememberMe: boolean): void {
    if (rememberMe) {
      this.cookieService.set(
        this.tokenCookieName,
        token,
        7,
        '/',
        undefined,
        false,
        'Lax'
      );

      return;
    }

    this.cookieService.set(
      this.tokenCookieName,
      token,
      undefined,
      '/',
      undefined,
      false,
      'Lax'
    );
  }
}