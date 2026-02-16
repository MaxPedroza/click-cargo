import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { API_URL } from '../../shared/api-config';

@Component({
  selector: 'app-carrier-dashboard-proposals',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="content">
      <header class="header">
        <div>
          <h2>Minhas propostas</h2>
          <p class="hint">Propostas desta transportadora enviadas para os pedidos dos clientes.</p>
        </div>
        <div class="metrics" *ngIf="offers.length">
				<span class="badge">{{ offers.length }} proposta(s)</span>
				<span class="metric">Enviadas: {{ sentCount }}</span>
				<span class="metric">Fechadas: {{ acceptedCount }}</span>
			</div>
      </header>

      <div *ngIf="!offers.length && !loading" class="empty">
        Ainda não há propostas cadastradas para esta transportadora.
      </div>

      <div class="card" *ngIf="offers.length">
        <div class="table-container">
        <table class="table">
          <thead>
            <tr>
              <th>Pedido</th>
              <th>Cliente</th>
              <th>Contato do cliente</th>
              <th>Plano</th>
              <th>Valor</th>
              <th>Validade</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let o of offers">
              <td>#{{ o.requestId }}</td>
              <td>{{ clientName(o.requestId) }}</td>
              <td>
					<ng-container *ngIf="o.status === 'aceito'; else contactHidden">
						<div>{{ clientEmail(o.requestId) || 'E-mail não informado' }}</div>
						<div *ngIf="clientPhone(o.requestId)">{{ clientPhone(o.requestId) }}</div>
					</ng-container>
					<ng-template #contactHidden>
						<span class="contact-hint">Visível após o cliente aceitar a proposta</span>
					</ng-template>
				</td>
              <td>{{ o.plan }}</td>
              <td>R$ {{ o.price | number: '1.2-2' }}</td>
              <td>{{ o.validityDate | date: 'dd/MM/yyyy' }}</td>
              <td>
                <span class="status" [class.status-enviado]="o.status === 'enviado'" [class.status-aceito]="o.status === 'aceito'" [class.status-recusado]="o.status === 'recusado'">
                  {{ o.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>
    </section>
  `,
  styles: `
    .content { padding: 24px 28px; font-size: 0.95rem; }
    .header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
    h2 { margin: 0 0 4px; font-size: 1.2rem; }
    .hint { margin: 0; font-size: 0.85rem; color: var(--cc-muted); }
    .badge { background: #e3f2fd; color: #064273; padding: 4px 10px; border-radius: 999px; font-size: 0.8rem; }
    .metrics { display: flex; align-items: center; gap: 8px; font-size: 0.8rem; color: #4b5563; }
    .metric { padding: 2px 8px; border-radius: 999px; background: #f3f4ff; }
    .card { background: #fff; border-radius: 14px; border: 1px solid #e1e7f0; padding: 12px 14px; box-shadow: 0 4px 12px rgba(15, 23, 42, 0.04); }
    .table-container { width: 100%; overflow-x: auto; }
    .table { width: 100%; border-collapse: collapse; font-size: 0.88rem; }
    th, td { padding: 8px 6px; border-bottom: 1px solid #edf1f7; text-align: left; }
    th { font-weight: 600; font-size: 0.8rem; text-transform: uppercase; color: #6b7280; }
    .empty { padding: 18px 14px; border-radius: 12px; background: #f8fafc; border: 1px dashed #cbd5f0; font-size: 0.9rem; color: var(--cc-muted); }
    .status { padding: 4px 8px; border-radius: 999px; font-size: 0.8rem; text-transform: capitalize; }
    .status-enviado { background: #e3f2fd; color: #064273; }
    .status-aceito { background: #e0f2f1; color: #00695c; }
    .status-recusado { background: #ffebee; color: #c62828; }
    .contact-hint { font-size: 0.78rem; color: #6b7280; }

    @media (max-width: 600px) {
      .content {
        padding: 18px 16px;
      }
      .header {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
      }
      .metrics {
        flex-wrap: wrap;
      }
      .card {
        padding: 12px 10px;
      }
      .table {
        min-width: 640px;
        font-size: 0.82rem;
      }
    }
  `,
})
export class CarrierDashboardProposalsComponent {
  offers: any[] = [];
  loading = true;
  private readonly carrierName = 'TransClick Logística';
  sentCount = 0;
  acceptedCount = 0;
  private requestsById: Record<number, any> = {};

  async ngOnInit() {
    try {
			const res = await fetch(`${API_URL}/offers`);
      if (res.ok) {
        const all = await res.json();
        this.offers = all.filter((o: any) => o.carrierName === this.carrierName);
        this.sentCount = this.offers.length;
        this.acceptedCount = this.offers.filter(o => o.status === 'aceito').length;
      }

      const reqRes = await fetch(`${API_URL}/requests`);
			if (reqRes.ok) {
				const reqs = await reqRes.json();
				this.requestsById = (reqs as any[]).reduce((acc, r) => {
					acc[r.id] = r;
					return acc;
				}, {} as Record<number, any>);
			}
    } finally {
      this.loading = false;
    }
  }

	clientName(requestId: number): string {
		const r = this.requestsById[requestId];
		return (r && r.requesterName) || 'Cliente Click & Cargo';
	}

	clientEmail(requestId: number): string | null {
		const r = this.requestsById[requestId];
		return (r && r.requesterEmail) || null;
	}

	clientPhone(requestId: number): string | null {
		const r = this.requestsById[requestId];
		return (r && r.requesterPhone) || null;
	}
}
