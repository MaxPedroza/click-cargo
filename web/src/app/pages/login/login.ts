import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgIf, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ValidationPopupComponent } from '../../shared/validation-popup';
import { API_URL } from '../../shared/api-config';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, ValidationPopupComponent],
  template: `
    <div class="page">
      <h2>Login</h2>
      <form (ngSubmit)="login()" class="form">
        <label>
          E-mail
          <input type="email" [(ngModel)]="email" name="email" required />
        </label>
        <label>
          Senha
          <input type="password" [(ngModel)]="password" name="password" required />
        </label>
        <button type="submit">Entrar</button>
        <p *ngIf="error" class="error">{{ error }}</p>
        <p class="hint">Use os logins de demonstração:<br />
          Cliente: cliente@clickcargo.com / 123456<br />
          Transportadora: transportadora@clickcargo.com / 123456
        </p>
      </form>

      <div class="register-box">
        <p class="register-title">Ainda não tem cadastro?</p>
        <div class="register-actions">
          <a routerLink="/cadastro-cliente" class="link-button secondary">Sou Cliente</a>
          <a routerLink="/cadastro-transportadora" class="link-button">Sou Transportadora</a>
        </div>
      </div>

      <cc-validation-popup
        [(visible)]="validationVisible"
        [messages]="validationMessages"
        title="Informe e-mail e senha"
        description="Para entrar, preencha os campos abaixo:"
      ></cc-validation-popup>
    </div>
  `,
  styles: `
    .page { max-width: 400px; margin: 40px auto; }
    .form { display: flex; flex-direction: column; gap: 12px; }
    label { display: flex; flex-direction: column; font-size: 0.9rem; }
    input { padding: 8px; border-radius: 4px; border: 1px solid #ccc; }
    button { padding: 8px 12px; border-radius: 4px; border: none; background: #1976d2; color: #fff; cursor: pointer; }
    .error { color: #c62828; font-size: 0.85rem; }
    .hint { font-size: 0.8rem; color: #555; margin-top: 8px; }
    .register-box { margin-top: 24px; padding-top: 16px; border-top: 1px solid #e0e0e0; }
    .register-title { font-size: 0.9rem; margin-bottom: 8px; }
    .register-actions { display: flex; flex-direction: column; gap: 8px; }
    .link-button { display: inline-block; text-align: center; padding: 8px 12px; border-radius: 4px; border: 1px solid #1976d2; color: #1976d2; text-decoration: none; font-size: 0.9rem; }
    .link-button.secondary { border-color: #555; color: #555; }
    .link-button:hover { background: #1976d2; color: #fff; }
    @media (max-width: 600px) {
      .page {
        margin: 24px 16px;
      }

      .form {
        gap: 10px;
      }

      button,
      .link-button {
        width: 100%;
      }

      .hint {
        font-size: 0.78rem;
      }
    }
  `,
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  validationVisible = false;
  validationMessages: string[] = [];

  constructor(private router: Router) {}

  async login() {
    this.error = '';

    if (!this.email || !this.password) {
      const missing: string[] = [];
      if (!this.email) missing.push('E-mail');
      if (!this.password) missing.push('Senha');
      this.validationMessages = missing;
      this.validationVisible = true;
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: this.email, password: this.password }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({ message: 'Erro ao fazer login.' }));
        this.error = body.message || 'Erro ao fazer login.';
        return;
      }

      const data = await response.json() as {
        user: { id: number; name: string; email: string; role: 'client' | 'carrier' };
        token: string;
      };

      localStorage.setItem('cc_user', JSON.stringify(data.user));
      localStorage.setItem('cc_token', data.token);

      if (data.user.role === 'client') {
        this.router.navigateByUrl('/dashboard-cliente');
      } else {
        this.router.navigateByUrl('/dashboard-transportadora');
      }
    } catch (err) {
      this.error = 'Não foi possível conectar ao servidor. Confira se a API está rodando.';
    }
  }
}
