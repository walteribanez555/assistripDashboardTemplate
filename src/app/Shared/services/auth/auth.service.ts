import { Injectable } from '@angular/core';
import { UserRole } from '../../enums/userRole.enums';

@Injectable({
  providedIn: 'root'
})
export class AuthService {



  private urlLogin : string = '';
  private isAuthenticated: boolean = false;
  private currentUserRole: UserRole | null = null;
  private currentUser : any =null;

  constructor() { }

  login(username: string, password: string, role: UserRole): boolean {
    // Authentication logic using the enum UserRole
    if (role === UserRole.Admin && username === 'admin' && password === 'admin123') {
      this.isAuthenticated = true;
      this.currentUserRole = UserRole.Admin;
      return true;
    } else if (role === UserRole.User && username === 'user' && password === 'user123') {
      this.isAuthenticated = true;
      this.currentUserRole = UserRole.User;
      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    this.isAuthenticated = false;
    this.currentUserRole = null;
    this.currentUser = null;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getCurrentUserRole(): UserRole | null {
    return this.currentUserRole;
  }

  hasRole(role: UserRole): boolean {
    return this.currentUserRole === role;
  }

  
}
