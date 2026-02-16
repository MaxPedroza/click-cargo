import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ValidationPopupComponent } from '../../shared/validation-popup';
import { API_URL } from '../../shared/api-config';

@Component({
  selector: 'app-client-budget-request',
  standalone: true,
  imports: [CommonModule, FormsModule, ValidationPopupComponent],
  template: `
    <div class="page">
      <h2>Enviar pedido de orçamento</h2>
      <form (ngSubmit)="submit()" class="form">
        <fieldset>
          <legend>Retirada</legend>
          <label>
            Endereço completo retirada
            <textarea [(ngModel)]="model.pickupAddress" name="pickupAddress" rows="2" required></textarea>
          </label>
          <label>
            Ponto de referência retirada
            <input [(ngModel)]="model.pickupReference" name="pickupReference" />
          </label>
          <label>
            Tipo de imóvel na retirada (casa térrea, apto...)
            <input [(ngModel)]="model.pickupPropertyType" name="pickupPropertyType" />
          </label>
        </fieldset>

        <fieldset>
          <legend>Entrega</legend>
          <label>
            Endereço completo entrega
            <textarea [(ngModel)]="model.deliveryAddress" name="deliveryAddress" rows="2" required></textarea>
          </label>
          <label>
            Ponto de referência entrega
            <input [(ngModel)]="model.deliveryReference" name="deliveryReference" />
          </label>
          <label>
            Tipo de imóvel na entrega
            <input [(ngModel)]="model.deliveryPropertyType" name="deliveryPropertyType" />
          </label>
        </fieldset>

        <fieldset>
          <legend>Dados do solicitante</legend>
          <label>
            Nome do solicitante
            <input [(ngModel)]="model.requesterName" name="requesterName" required />
          </label>
          <label>
            Idade
            <input type="number" [(ngModel)]="model.requesterAge" name="requesterAge" />
          </label>
          <label>
            Celular
            <input [(ngModel)]="model.requesterPhone" name="requesterPhone" />
          </label>
          <label>
            E-mail
            <input [(ngModel)]="model.requesterEmail" name="requesterEmail" />
          </label>
        </fieldset>

        <div class="actions">
          <button type="submit">Enviar pedido</button>
          <span class="status" *ngIf="message">{{ message }}</span>
        </div>
      </form>

      <cc-validation-popup
        [(visible)]="validationVisible"
        [messages]="validationMessages"
        title="Campos obrigatórios do pedido"
        description="Para enviar o orçamento, revise os campos essenciais:"
      ></cc-validation-popup>
    </div>
  `,
  styles: `
    .page { max-width: 960px; margin: 32px auto; background: var(--cc-surface); padding: 24px 22px; border-radius: 18px; box-shadow: 0 10px 24px rgba(0,0,0,0.04); }
    .form { display: grid; gap: 18px; }
    fieldset { border-radius: 14px; border: 1px solid #dde3ea; padding: 14px 14px 10px; }
    legend { padding: 0 6px; font-size: 0.9rem; font-weight: 600; color: var(--cc-blue-dark); }
    label { display: flex; flex-direction: column; margin-bottom: 8px; font-size: 0.9rem; }
    input, textarea { padding: 8px; border-radius: 6px; border: 1px solid #ccd6e0; font-size: 0.9rem; }
    .actions { display: flex; align-items: center; gap: 12px; justify-content: flex-end; }
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
      fieldset {
        padding: 12px 10px 8px;
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
export class ClientBudgetRequestComponent {
  model: any = {};
  message = '';
  validationVisible = false;
  validationMessages: string[] = [];

  async submit() {
    const missing: string[] = [];
    if (!this.model.pickupAddress) missing.push('Endereço completo de retirada');
    if (!this.model.deliveryAddress) missing.push('Endereço completo de entrega');
    if (!this.model.requesterName) missing.push('Nome do solicitante');

    if (missing.length) {
      this.validationMessages = missing;
      this.validationVisible = true;
      return;
    }

    const res = await fetch(`${API_URL}/requests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.model),
    });
    if (res.ok) {
      this.message = 'Pedido enviado com sucesso! As transportadoras poderão responder com propostas.';
      this.model = {};
    }
  }
}
