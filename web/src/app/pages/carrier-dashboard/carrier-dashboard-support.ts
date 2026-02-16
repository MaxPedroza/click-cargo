import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ValidationPopupComponent } from '../../shared/validation-popup';
import { API_URL } from '../../shared/api-config';

@Component({
  selector: 'app-carrier-dashboard-support',
  standalone: true,
  imports: [CommonModule, FormsModule, ValidationPopupComponent],
  template: `
    <section class="content">
      <header class="header">
        <h2>Ajuda e suporte</h2>
        <p class="hint">
          Envie suas dúvidas sobre o uso da Click & Cargo. Nossa equipe de suporte
          retornará pelo e-mail informado.
        </p>
      </header>

      <form (ngSubmit)="submit()" novalidate>
        <div class="field-group">
          <label for="name">Nome da transportadora *</label>
          <input id="name" type="text" [(ngModel)]="form.name" name="name" />
        </div>

        <div class="field-group inline">
          <div>
            <label for="email">E-mail para contato *</label>
            <input id="email" type="email" [(ngModel)]="form.email" name="email" />
          </div>
          <div>
            <label for="phone">Telefone / WhatsApp</label>
            <input id="phone" type="tel" [(ngModel)]="form.phone" name="phone" />
          </div>
        </div>

        <div class="field-group">
          <label for="subject">Assunto *</label>
          <select id="subject" [(ngModel)]="form.subject" name="subject">
            <option value="">Selecione</option>
            <option value="planos">Dúvidas sobre planos e assinatura</option>
            <option value="acesso">Problemas de acesso ou login</option>
            <option value="pedidos">Pedidos e propostas</option>
            <option value="outros">Outros assuntos</option>
          </select>
        </div>

        <div class="field-group">
          <label for="message">Descreva sua dúvida ou problema *</label>
          <textarea
            id="message"
            rows="5"
            [(ngModel)]="form.message"
            name="message"
          ></textarea>
        </div>

        <p class="disclaimer">
          Atenção: este é um ambiente demonstrativo. A mensagem é registrada na
          plataforma como se fosse enviada ao time de suporte da Click & Cargo.
        </p>

        <div class="actions">
          <button type="submit" [disabled]="loading">
            {{ loading ? 'Enviando...' : 'Enviar para suporte' }}
          </button>
          <span class="status" *ngIf="statusMessage">{{ statusMessage }}</span>
        </div>
      </form>

      <cc-validation-popup
        [(visible)]="validationVisible"
        [messages]="validationMessages"
        title="Revise os campos para enviar sua dúvida"
        description="Algumas informações são obrigatórias para que possamos retornar seu contato."
      ></cc-validation-popup>
    </section>
  `,
  styles: `
    .content {
      padding: 24px 28px;
      font-size: 0.95rem;
    }
    .header {
      margin-bottom: 18px;
    }
    h2 {
      margin: 0 0 4px;
      font-size: 1.2rem;
    }
    .hint {
      margin: 0;
      font-size: 0.85rem;
      color: var(--cc-muted);
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 14px;
      max-width: 560px;
    }
    .field-group {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .field-group.inline {
      flex-direction: row;
      gap: 12px;
    }
    .field-group.inline > div {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    label {
      font-size: 0.85rem;
      color: #374151;
      font-weight: 500;
    }
    input,
    select,
    textarea {
      border-radius: 10px;
      border: 1px solid #d1d5db;
      padding: 8px 10px;
      font-size: 0.9rem;
      font-family: inherit;
    }
    textarea {
      resize: vertical;
    }
    .disclaimer {
      margin: 6px 0 0;
      font-size: 0.8rem;
      color: #6b7280;
      max-width: 560px;
    }
    .actions {
      margin-top: 4px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    button[type='submit'] {
      padding: 8px 18px;
      border-radius: 999px;
      border: none;
      background: var(--cc-blue);
      color: #fff;
      font-size: 0.9rem;
      cursor: pointer;
    }
    button[disabled] {
      background: #cbd5e1;
      cursor: default;
    }
    .status {
      font-size: 0.85rem;
      color: #065f46;
    }
    @media (max-width: 800px) {
      .content {
        padding: 18px 16px;
      }
      .field-group.inline {
        flex-direction: column;
      }
    }
  `,
})
export class CarrierDashboardSupportComponent {
  form = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  };

  loading = false;
  statusMessage = '';

  validationVisible = false;
  validationMessages: string[] = [];

  private validate(): boolean {
    const messages: string[] = [];

    if (!this.form.name.trim()) {
      messages.push('Informe o nome da transportadora.');
    }
    if (!this.form.email.trim()) {
      messages.push('Informe um e-mail para retorno.');
    }
    if (!this.form.subject) {
      messages.push('Selecione um assunto para a sua solicitação.');
    }
    if (!this.form.message.trim()) {
      messages.push('Descreva sua dúvida ou problema.');
    }

    if (messages.length > 0) {
      this.validationMessages = messages;
      this.validationVisible = true;
      return false;
    }

    return true;
  }

  async submit() {
    if (!this.validate()) {
      return;
    }

    this.loading = true;
    this.statusMessage = '';

    try {
			const res = await fetch(`${API_URL}/support-messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'transportadora',
          origin: 'carrier-dashboard',
          ...this.form,
        }),
      });

      if (res.ok) {
        this.statusMessage =
          'Mensagem enviada com sucesso. Nossa equipe entrará em contato pelo e-mail informado.';
        this.form = { name: this.form.name, email: this.form.email, phone: this.form.phone, subject: '', message: '' };
      } else {
        this.statusMessage =
          'Não foi possível enviar sua mensagem agora. Tente novamente em alguns instantes.';
      }
    } catch {
      this.statusMessage = 'Falha de conexão com a API. Confira se o backend está em execução.';
    } finally {
      this.loading = false;
    }
  }
}
