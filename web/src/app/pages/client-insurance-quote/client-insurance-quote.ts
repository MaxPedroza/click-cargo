import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ValidationPopupComponent } from '../../shared/validation-popup';
import { API_URL } from '../../shared/api-config';

@Component({
  selector: 'app-client-insurance-quote',
  standalone: true,
  imports: [CommonModule, FormsModule, ValidationPopupComponent],
  template: `
    <div class="page">
      <h2>Solicitar cotação de seguro</h2>
      <p class="hint">
        Atenção: fluxo demonstrativo de cotação de seguro. Nenhum contrato real é gerado neste ambiente.
      </p>
      <form (ngSubmit)="submit()" class="form">
        <label>
          Nome do cliente
          <input [(ngModel)]="name" name="name" required />
        </label>
        <label>
          Descrição dos bens / valor estimado
          <textarea [(ngModel)]="details" name="details" rows="4" required></textarea>
        </label>
        <div class="actions">
          <button type="submit">Solicitar cotação</button>
          <span class="status" *ngIf="message">{{ message }}</span>
        </div>
      </form>

      <cc-validation-popup
        [(visible)]="validationVisible"
        [messages]="validationMessages"
        title="Campos obrigatórios da cotação"
        description="Para solicitar a cotação de seguro, preencha:"
      ></cc-validation-popup>
    </div>
  `,
  styles: `
    .page { max-width: 800px; margin: 32px auto; background: var(--cc-surface); padding: 24px 22px; border-radius: 18px; box-shadow: 0 10px 24px rgba(0,0,0,0.04); }
    .hint { font-size: 0.85rem; color: var(--cc-muted); margin-bottom: 12px; }
    .form { display: grid; gap: 14px; }
    label { display: flex; flex-direction: column; font-size: 0.9rem; }
    input, textarea { padding: 8px; border-radius: 6px; border: 1px solid #ccd6e0; font-size: 0.9rem; }
    .actions { display: flex; align-items: center; gap: 10px; justify-content: flex-end; }
    button { padding: 8px 16px; border-radius: 999px; border: none; background: var(--cc-blue); color: #fff; cursor: pointer; }
    .status { font-size: 0.85rem; color: var(--cc-muted); }

    @media (max-width: 600px) {
      .page {
        margin: 20px 12px;
        padding: 18px 14px;
      }
      .form {
        gap: 12px;
      }
      .actions {
        flex-direction: column;
        align-items: stretch;
        justify-content: flex-start;
      }
      .actions button {
        width: 100%;
      }
      .status {
        text-align: left;
      }
    }
  `,
})
export class ClientInsuranceQuoteComponent {
  name = '';
  details = '';
  message = '';
  validationVisible = false;
  validationMessages: string[] = [];

  async submit() {
    const missing: string[] = [];
    if (!this.name) missing.push('Nome do cliente');
    if (!this.details) missing.push('Descrição dos bens / valor estimado');

    if (missing.length) {
      this.validationMessages = missing;
      this.validationVisible = true;
      return;
    }

    const res = await fetch(`${API_URL}/service-requests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'seguro', clientName: this.name, details: this.details }),
    });
    if (res.ok) {
      this.message = 'Solicitação de cotação de seguro registrada!';
      this.name = '';
      this.details = '';
    }
  }
}

