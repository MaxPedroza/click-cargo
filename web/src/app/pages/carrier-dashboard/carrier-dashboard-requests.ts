import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { API_URL } from '../../shared/api-config';

@Component({
  selector: 'app-carrier-dashboard-requests',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <section class="content">
      <header class="header">
        <div>
          <h2>Pedidos recebidos</h2>
          <p class="hint">Lista de pedidos de mudança enviados pelos clientes para a plataforma.</p>
          <p class="hint small">
            A quantidade de pedidos visíveis depende do plano ativo da transportadora.
          </p>
        </div>
        <span class="badge" *ngIf="requests.length">{{ requests.length }} pedido(s)</span>
      </header>

      <div *ngIf="!requests.length && !loading" class="empty">
        Ainda não há pedidos recebidos. Assim que um cliente enviar um pedido de orçamento, ele aparecerá aqui.
      </div>

      <div class="card" *ngIf="requests.length">
        <div class="filters">
				<input type="text" placeholder="Filtrar por cidade, bairro ou endereço" [(ngModel)]="filterTerm" />
			</div>
        <div class="table-container">
        <table class="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Cliente</th>
              <th>Origem</th>
              <th>Destino</th>
              <th>Data</th>
					<th>Ações</th>
            </tr>
          </thead>
          <tbody>
				<tr *ngFor="let r of filteredRequests()">
              <td>{{ r.id }}</td>
              <td>{{ r.requesterName || 'Cliente' }}</td>
              <td>{{ r.pickupAddress }}</td>
              <td>{{ r.deliveryAddress }}</td>
              <td>{{ r.createdAt | date: 'dd/MM/yyyy HH:mm' }}</td>
					<td>
						<a [routerLink]="['/dashboard-transportadora/propostas/nova', r.id]" class="link">Enviar proposta</a>
					</td>
            </tr>
          </tbody>
        </table>
        </div>

        <p class="hint limit" *ngIf="visibleLimit && totalAfterFilter > filteredRequests().length">
          Atenção orçamento: você está vendo apenas {{ filteredRequests().length }} de {{ totalAfterFilter }} pedido(s) neste plano.
          Para visualizar mais pedidos, faça upgrade em <strong>Planos e assinatura</strong>.
        </p>
        <p class="hint privacy">
          Atenção dados de contato: os dados completos de contato do cliente (e-mail, telefone) não são exibidos aqui.
          Após o cliente aceitar uma proposta, o time Click &amp; Cargo faria o repasse desses dados para a transportadora.
        </p>
      </div>
    </section>
  `,
  styles: `
    .content { padding: 24px 28px; font-size: 0.95rem; }
    .header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
    h2 { margin: 0 0 4px; font-size: 1.2rem; }
    .hint { margin: 0; font-size: 0.85rem; color: var(--cc-muted); }
    .hint.small { font-size: 0.8rem; }
    .badge { background: #e3f2fd; color: #064273; padding: 4px 10px; border-radius: 999px; font-size: 0.8rem; }
    .card { background: #fff; border-radius: 14px; border: 1px solid #e1e7f0; padding: 12px 14px; box-shadow: 0 4px 12px rgba(15, 23, 42, 0.04); }
    .filters { margin-bottom: 8px; }
		.filters input { width: 100%; max-width: 320px; padding: 6px 8px; border-radius: 6px; border: 1px solid #ccd6e0; font-size: 0.85rem; }
    .table-container { width: 100%; overflow-x: auto; }
    .table { width: 100%; border-collapse: collapse; font-size: 0.88rem; }
    th, td { padding: 8px 6px; border-bottom: 1px solid #edf1f7; text-align: left; }
    th { font-weight: 600; font-size: 0.8rem; text-transform: uppercase; color: #6b7280; }
    .empty { padding: 18px 14px; border-radius: 12px; background: #f8fafc; border: 1px dashed #cbd5f0; font-size: 0.9rem; color: var(--cc-muted); }
    .link { font-size: 0.85rem; color: var(--cc-blue); text-decoration: none; }
    .hint.limit { margin-top: 10px; }
    .hint.privacy { margin-top: 4px; font-size: 0.8rem; }

    @media (max-width: 600px) {
      .content {
        padding: 18px 16px;
      }
      .header {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
      }
      .card {
        padding: 12px 10px;
      }
      .table {
        min-width: 560px;
        font-size: 0.82rem;
      }
    }
  `,
})
export class CarrierDashboardRequestsComponent {
  requests: any[] = [];
  loading = true;
  filterTerm = '';
  profile: { plan: string } | null = null;
  visibleLimit: number | null = null;
  totalAfterFilter = 0;

  async ngOnInit() {
    try {
			const res = await fetch(`${API_URL}/requests`);
      if (res.ok) {
        this.requests = await res.json();
      }
      const profileRes = await fetch(`${API_URL}/carrier-profile`);
      if (profileRes.ok) {
        this.profile = await profileRes.json();
        this.visibleLimit = this.computeLimit();
      }
    } finally {
      this.loading = false;
    }
  }

  filteredRequests() {
    const term = this.filterTerm.trim().toLowerCase();
    let list = this.requests;
    if (term) {
      list = this.requests.filter(r =>
        (r.pickupAddress || '').toLowerCase().includes(term) ||
        (r.deliveryAddress || '').toLowerCase().includes(term)
      );
    }

    this.totalAfterFilter = list.length;

    if (this.visibleLimit && this.visibleLimit > 0) {
      return list.slice(0, this.visibleLimit);
    }

    return list;
  }

  private computeLimit(): number | null {
    if (!this.profile) return null;
    if (this.profile.plan === 'Free') return 5;
    if (this.profile.plan === 'Plano Prata') return 20;
    // Plano Ouro ou outros: sem limite definido no frontend
    return null;
  }
}
