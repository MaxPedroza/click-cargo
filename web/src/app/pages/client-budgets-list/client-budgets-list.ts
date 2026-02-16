import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { API_URL } from '../../shared/api-config';

@Component({
  selector: 'app-client-budgets-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page">
      <h2>Orçamentos recebidos</h2>
      <p class="hint">Lista fictícia de propostas enviadas pelas transportadoras.</p>

			<div class="table-container" *ngIf="offers.length">
			<table class="table">
        <thead>
          <tr>
            <th>Transportadora</th>
            <th>Plano</th>
            <th>Valor</th>
            <th>Validade</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let o of offers">
            <td>{{ o.carrierName }}</td>
            <td>{{ o.plan }}</td>
            <td>R$ {{ o.price | number:'1.2-2' }}</td>
            <td>{{ o.validityDate | date:'dd/MM/yyyy' }}</td>
            <td>{{ o.status }}</td>
            <td>
              <button type="button" (click)="goToPayment(o)">Pagar proposta</button>
              <button type="button" (click)="updateStatus(o, 'recusado')" [disabled]="o.status === 'recusado'">Recusar</button>
            </td>
          </tr>
        </tbody>
			</table>
			</div>
    </div>
  `,
  styles: `
    .page { max-width: 960px; margin: 32px auto; background: var(--cc-surface); padding: 24px 22px; border-radius: 18px; box-shadow: 0 10px 24px rgba(0,0,0,0.04); }
    .hint { font-size: 0.85rem; color: var(--cc-muted); margin-bottom: 12px; }
		.table-container { width: 100%; overflow-x: auto; }
    .table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
    th, td { padding: 8px; border-bottom: 1px solid #eee; text-align: left; }
    button { margin-right: 4px; padding: 6px 10px; border-radius: 999px; border: none; background: var(--cc-blue); color: #fff; cursor: pointer; font-size: 0.8rem; }
    button[disabled] { background: #b0bec5; cursor: default; }

    @media (max-width: 600px) {
      .page {
        margin: 20px 12px;
        padding: 18px 14px;
      }
      .table {
        min-width: 560px;
        font-size: 0.82rem;
      }
      button {
        margin-top: 4px;
      }
    }
  `,
})
export class ClientBudgetsListComponent {
  offers: any[] = [];

  constructor(private router: Router) {}

  async ngOnInit() {
		const res = await fetch(`${API_URL}/offers`);
    this.offers = await res.json();
  }

  async updateStatus(offer: any, status: 'aceito' | 'recusado') {
    const res = await fetch(`${API_URL}/offers/${offer.id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      const updated = await res.json();
      this.offers = this.offers.map(o => (o.id === updated.id ? updated : o));
    }
  }

	goToPayment(offer: any) {
    this.router.navigate(['/dashboard-cliente/pagamento', offer.id]);
	}
}
