import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ValidationPopupComponent } from '../../shared/validation-popup';
import { API_URL } from '../../shared/api-config';

interface CarrierForm {
  name: string;
  companyName: string;
  email: string;
  phone: string;
  document: string;
  city: string;
}

@Component({
  selector: 'app-carrier-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ValidationPopupComponent],
  template: `
    <div class="page">
      <h2>Cadastro de Transportadora</h2>

      <form class="form" (ngSubmit)="save()">
        <div class="grid">
          <label>
            Responsável
            <input [(ngModel)]="form.name" name="name" required />
          </label>
          <label>
            Razão social / Nome fantasia
            <input [(ngModel)]="form.companyName" name="companyName" required />
          </label>
          <label>
            E-mail de contato
            <input type="email" [(ngModel)]="form.email" name="email" required />
          </label>
          <label>
            Telefone / WhatsApp
            <input [(ngModel)]="form.phone" name="phone" required />
          </label>
          <label>
            CNPJ / CPF
            <input [(ngModel)]="form.document" name="document" required />
          </label>
          <label>
            Cidade / Região de atuação
            <input [(ngModel)]="form.city" name="city" required />
          </label>
        </div>

        <div class="actions">
          <button type="submit">Salvar transportadora</button>
          <span class="status" *ngIf="message">{{ message }}</span>
        </div>
      </form>

      <cc-validation-popup
        [(visible)]="validationVisible"
        [messages]="validationMessages"
        title="Campos obrigatórios não preenchidos"
        description="Preencha todos os dados essenciais da transportadora para continuar:"
      ></cc-validation-popup>

      <h3>Transportadoras cadastradas</h3>
      <div class="table-container" *ngIf="carriers.length; else empty">
      <table class="table">
        <thead>
          <tr>
            <th>Empresa</th>
            <th>Responsável</th>
            <th>Cidade</th>
            <th>Contato</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let c of carriers">
            <td>{{ c.companyName }}</td>
            <td>{{ c.name }}</td>
            <td>{{ c.city }}</td>
            <td>{{ c.email }} · {{ c.phone }}</td>
          </tr>
        </tbody>
      </table>
      </div>
      <ng-template #empty>
        <p class="empty">Nenhuma transportadora cadastrada ainda.</p>
      </ng-template>
    </div>
  `,
  styles: `
    .page { max-width: 900px; margin: 32px auto; background: var(--cc-surface); padding: 24px 22px; border-radius: 18px; box-shadow: 0 10px 24px rgba(0,0,0,0.04); }
    .form { display: flex; flex-direction: column; gap: 16px; margin-bottom: 24px; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; }
    label { display: flex; flex-direction: column; font-size: 0.9rem; gap: 4px; }
    input { padding: 8px 10px; border-radius: 8px; border: 1px solid #d0d7de; font-size: 0.9rem; }
    .actions { display: flex; align-items: center; gap: 12px; }
    button { padding: 10px 18px; border-radius: 999px; border: none; background: var(--cc-blue); color: #fff; font-weight: 600; cursor: pointer; box-shadow: 0 4px 10px rgba(0,0,0,0.08); }
    button:hover { background: #0059a8; }
    .status { font-size: 0.85rem; color: var(--cc-green); }
    .table-container { width: 100%; overflow-x: auto; }
    .table { width: 100%; border-collapse: collapse; margin-top: 8px; }
    th, td { padding: 8px 10px; text-align: left; font-size: 0.9rem; }
    thead { background: #f6f8fa; }
    tr:nth-child(even) td { background: #fafbfc; }
    .empty { font-size: 0.9rem; color: #666; }

    @media (max-width: 600px) {
      .page {
        margin: 20px 12px;
        padding: 18px 14px;
      }
      .grid {
        gap: 12px;
      }
      .actions {
        flex-direction: column;
        align-items: flex-start;
      }
      .table {
        min-width: 560px;
        font-size: 0.82rem;
      }
    }
  `,
})
export class CarrierRegisterComponent {
  form: CarrierForm = {
    name: '',
    companyName: '',
    email: '',
    phone: '',
    document: '',
    city: '',
  };

  carriers: CarrierForm[] = [];
  message = '';
  validationVisible = false;
  validationMessages: string[] = [];

  constructor() {
    this.loadCarriers();
  }

  async loadCarriers() {
    try {
			const res = await fetch(`${API_URL}/carriers`);
      if (!res.ok) return;
      this.carriers = await res.json();
    } catch {
      // silencioso para o MVP
    }
  }

  async save() {
    this.message = '';

    const missing: string[] = [];
    if (!this.form.name) missing.push('Responsável');
    if (!this.form.companyName) missing.push('Razão social / Nome fantasia');
    if (!this.form.email) missing.push('E-mail de contato');
    if (!this.form.phone) missing.push('Telefone / WhatsApp');
    if (!this.form.document) missing.push('CNPJ / CPF');
    if (!this.form.city) missing.push('Cidade / Região de atuação');

    if (missing.length) {
      this.validationMessages = missing;
      this.validationVisible = true;
      return;
    }

    try {
			const res = await fetch(`${API_URL}/carriers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.form),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({ message: 'Erro ao salvar transportadora.' }));
        this.message = body.message || 'Erro ao salvar transportadora.';
        return;
      }

      this.form = { name: '', companyName: '', email: '', phone: '', document: '', city: '' };
      this.message = 'Transportadora cadastrada com sucesso!';
      await this.loadCarriers();
    } catch {
      this.message = 'Não foi possível conectar à API.';
    }
  }
}
