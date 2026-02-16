import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client-dashboard-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    <section class="content">
      <header class="content-header">
        <h2>Meus pedidos de mudança</h2>
        <p>Acompanhe seus pedidos, orçamentos e serviços extras.</p>
      </header>

      <div class="card">
        <div class="table-header">
          <span>Resumo dos pedidos recentes</span>
          <button routerLink="/dashboard-cliente/orcamento-novo">Novo pedido</button>
        </div>
			<div *ngIf="!requests.length" class="empty">Nenhum pedido enviado ainda. Que tal criar o primeiro?</div>
			<div class="table-container" *ngIf="requests.length">
			<table class="table">
				<thead>
					<tr>
						<th>Pedido</th>
						<th>Origem</th>
						<th>Destino</th>
						<th>Data</th>
					</tr>
				</thead>
				<tbody>
					<tr *ngFor="let r of requests | slice:0:3">
						<td>#{{ r.id }}</td>
						<td>{{ r.pickupAddress }}</td>
						<td>{{ r.deliveryAddress }}</td>
						<td>{{ r.createdAt | date: 'dd/MM/yyyy HH:mm' }}</td>
					</tr>
				</tbody>
			</table>
			</div>
      </div>
    </section>
  `,
  styles: `
    .content { padding: 24px 28px; }
    .content-header h2 { margin: 0 0 4px; }
    .content-header p { margin: 0; font-size: 0.9rem; color: #6b7280; }
    .card { margin-top: 24px; padding: 18px 16px; border-radius: 14px; background: #f9fafb; border: 1px solid #e5e7eb; }
    .table-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
    .table-header button { padding: 8px 14px; border-radius: 999px; border: none; background: var(--cc-blue); color: #fff; font-size: 0.85rem; font-weight: 600; cursor: pointer; }
    .table-container { width: 100%; overflow-x: auto; }
    .table { width: 100%; border-collapse: collapse; }
    th, td { padding: 8px 10px; text-align: left; font-size: 0.9rem; }
    thead { background: #f3f4f6; }
    tbody tr:nth-child(even) td { background: #f9fafb; }
    a { color: var(--cc-blue); text-decoration: none; font-size: 0.9rem; }
    .empty { font-size: 0.9rem; color: #6b7280; padding: 8px 2px; }

    @media (max-width: 600px) {
      .content { padding: 18px 16px; }
      .card { margin-top: 16px; padding: 14px 12px; }
      .table-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
      }
      .table-header button {
        width: 100%;
        text-align: center;
      }
      .table {
        min-width: 480px;
        font-size: 0.82rem;
      }
    }
  `,
})
export class ClientDashboardHomeComponent {
  requests: any[] = [];

  async ngOnInit() {
    try {
      const res = await fetch('http://localhost:3000/requests');
      if (res.ok) {
        this.requests = await res.json();
      }
    } catch {
      this.requests = [];
    }
  }
}
