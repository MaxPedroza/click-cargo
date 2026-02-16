import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ValidationPopupComponent } from '../../shared/validation-popup';
import { API_URL } from '../../shared/api-config';

@Component({
  selector: 'app-client-virtual-inspection',
  standalone: true,
  imports: [CommonModule, FormsModule, ValidationPopupComponent],
  template: `
    <div class="page">
      <h2>Solicitar vistoria virtual</h2>
      <p class="hint">
        Atenção: fluxo demonstrativo completo. Solicitação, pagamento, agendamento e vistoria virtual são simulados neste ambiente.
      </p>

      <section class="step" *ngIf="step === 'form'">
        <h3>1. Formulário de solicitação</h3>
        <form (ngSubmit)="submit()" class="form">
          <label>
            Nome do cliente
            <input [(ngModel)]="name" name="name" required />
          </label>
          <label>
            Detalhes da vistoria (cômodos, volume aproximado, melhor horário...)
            <textarea [(ngModel)]="details" name="details" rows="4" required></textarea>
          </label>
          <div class="actions">
            <button type="submit">Enviar solicitação</button>
          </div>
        </form>
      </section>

      <section class="step" *ngIf="step === 'payment' && request">
        <h3>2. Pagamento da vistoria (simulado)</h3>
        <p class="hint">
          Para confirmar a vistoria virtual, o cliente realiza o pagamento do serviço de vistoria.
        </p>
        <div class="summary">
          <dl>
            <div>
              <dt>Cliente</dt>
              <dd>{{ request.clientName }}</dd>
            </div>
            <div>
              <dt>Descrição</dt>
              <dd>{{ request.details }}</dd>
            </div>
            <div>
              <dt>Valor da vistoria (demo)</dt>
              <dd>R$ 149,90</dd>
            </div>
          </dl>
        </div>
        <div class="actions">
          <button type="button" (click)="confirmPayment()" [disabled]="processing || success">
            {{ success ? 'Pagamento confirmado' : 'Pagar vistoria (simulado)' }}
          </button>
          <span class="status" *ngIf="message">{{ message }}</span>
        </div>
      </section>

      <section class="step" *ngIf="step === 'scheduled' && request">
        <h3>3. Agendamento e realização da vistoria virtual</h3>
        <p class="hint">
          Após o pagamento, a plataforma agenda a vistoria virtual e envia o link de vídeo para o cliente.
        </p>
        <div class="schedule-card">
          <p><strong>Data agendada (demo):</strong> {{ scheduledAt | date: 'dd/MM/yyyy HH:mm' }}</p>
          <p><strong>Link da vistoria virtual:</strong> <span class="link">https://meet.click-cargo.demo/vistoria/{{ request.id }}</span></p>
          <p class="small">Durante a vistoria, o perito coleta informações e imagens do imóvel.</p>
        </div>
        <div class="form-after">
          <h4>4. Formulário de vistoria virtual (resumo)</h4>
          <p class="small">
            Neste MVP, o formulário interno da vistoria é representado por este resumo textual. Em uma versão real,
            as informações coletadas na videochamada seriam registradas aqui.
          </p>
        </div>
      </section>

      <cc-validation-popup
        [(visible)]="validationVisible"
        [messages]="validationMessages"
        title="Campos obrigatórios da vistoria"
        description="Informe quem é o cliente e um resumo da vistoria desejada:"
      ></cc-validation-popup>
    </div>
  `,
  styles: `
    .page { max-width: 800px; margin: 32px auto; background: var(--cc-surface); padding: 24px 22px; border-radius: 18px; box-shadow: 0 10px 24px rgba(0,0,0,0.04); }
    .hint { font-size: 0.85rem; color: var(--cc-muted); margin-bottom: 12px; }
    .step { margin-bottom: 20px; }
    .form { display: grid; gap: 14px; }
    label { display: flex; flex-direction: column; font-size: 0.9rem; }
    input, textarea { padding: 8px; border-radius: 6px; border: 1px solid #ccd6e0; font-size: 0.9rem; }
    .actions { display: flex; align-items: center; gap: 10px; justify-content: flex-end; }
    button { padding: 8px 16px; border-radius: 999px; border: none; background: var(--cc-blue); color: #fff; cursor: pointer; }
    .status { font-size: 0.85rem; color: var(--cc-muted); }
    .summary { border-radius: 14px; border: 1px solid #e5e7eb; padding: 12px 14px; margin-top: 8px; }
    dl { margin: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 8px 18px; font-size: 0.9rem; }
    dt { font-weight: 600; color: #4b5563; }
    dd { margin: 0; color: #111827; }
    .schedule-card { border-radius: 14px; border: 1px solid #e5e7eb; padding: 12px 14px; background: #f9fafb; margin-bottom: 10px; font-size: 0.9rem; }
    .link { font-family: monospace; font-size: 0.85rem; }
    .small { font-size: 0.8rem; color: var(--cc-muted); }
    .form-after { border-radius: 14px; border: 1px dashed #cbd5f5; padding: 10px 12px; background: #f8fafc; }

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
      dl {
        grid-template-columns: 1fr;
      }
    }
  `,
})
export class ClientVirtualInspectionComponent {
  name = '';
  details = '';
  message = '';
  step: 'form' | 'payment' | 'scheduled' = 'form';
  request: any | null = null;
  processing = false;
  success = false;
  scheduledAt: Date = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
  validationVisible = false;
  validationMessages: string[] = [];

  async submit() {
    this.message = '';

    const missing: string[] = [];
    if (!this.name) missing.push('Nome do cliente');
    if (!this.details) missing.push('Detalhes da vistoria');

    if (missing.length) {
      this.validationMessages = missing;
      this.validationVisible = true;
      return;
    }

    const res = await fetch(`${API_URL}/service-requests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'vistoria', clientName: this.name, details: this.details }),
    });
    if (res.ok) {
      this.request = await res.json();
      this.step = 'payment';
    }
  }

  async confirmPayment() {
    if (!this.request || this.processing || this.success) return;
    this.processing = true;
    this.message = '';
    try {
      // Pagamento apenas simulado no frontend
      await new Promise(resolve => setTimeout(resolve, 600));
      this.success = true;
      this.message = 'Pagamento da vistoria confirmado (simulado). Vistoria virtual agendada!';
      this.step = 'scheduled';
    } finally {
      this.processing = false;
    }
  }
}
