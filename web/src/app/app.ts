import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  currentUser: { name: string; email: string; role: 'client' | 'carrier' } | null = null;

  constructor() {
    this.loadUser();
  }

  private loadUser() {
    try {
      const raw = localStorage.getItem('cc_user');
      this.currentUser = raw ? JSON.parse(raw) : null;
    } catch {
      this.currentUser = null;
    }
  }

  logout() {
    localStorage.removeItem('cc_user');
    localStorage.removeItem('cc_token');
    this.currentUser = null;
    window.location.href = '/';
  }
}
