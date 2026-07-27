import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GuestSessionService {
  private readonly guestSessionKey = 'guest_mode';

  startGuestSession(): void {
    sessionStorage.setItem(
      this.guestSessionKey,
      'true'
    );
  }

  isGuest(): boolean {
    return (
      sessionStorage.getItem(this.guestSessionKey) ===
      'true'
    );
  }

  endGuestSession(): void {
    sessionStorage.removeItem(
      this.guestSessionKey
    );
  }
}