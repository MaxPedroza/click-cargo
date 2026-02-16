import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { API_URL } from '../../shared/api-config';

@Component({
  selector: 'app-carrier-dashboard-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="content">
      <header class="content-header">
        <h2>Visão geral da conta</h2>
        <p>Veja rapidamente o plano atual e o status dos pedidos.</p>
      </header>

      <div class="grid">
        <div class="card plan" *ngIf="profile; else loadingPlan">
          <h3>Plano atual</h3>
          <p class="plan-name">{{ profile.plan }}</p>
          <p class="plan-price" *ngIf="profile.price > 0; else freePrice">
            R$ {{ profile.price | number: '1.2-2' }} <span>/mês</span>
          </p>
          <ng-template #freePrice>
            <p class="plan-price">Gratuito</p>
          </ng-template>
          <p class="plan-validity" *ngIf="profile.validUntil">
            Vigente até {{ profile.validUntil | date: 'dd/MM/yyyy' }}
          </p>
          <p class="plan-validity" *ngIf="!profile.validUntil">
            Sem data de vencimento configurada.
          </p>
          <p class="plan-note">
            Gerencie os planos em <strong>Planos e assinatura</strong>.
          </p>
        </div>

        <div class="card">
          <div class="table-header">
            <span>Resumo dos pedidos (demo)</span>
          </div>
          <div class="table-container">
          <table class="table">
            <thead>
              <tr>
                <th>Pedido</th>
                <th>Origem</th>
                <th>Destino</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Pedido demonstração</td>
                <td>São Paulo</td>
                <td>Rio de Janeiro</td>
                <td>Pendente de proposta</td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>
      </div>

      <ng-template #loadingPlan>
        <div class="card plan loading">
          <p class="plan-loading">Carregando plano da transportadora...</p>
        </div>
      </ng-template>
    </section>
  `,
  styles: `
    .content { padding: 24px 28px; }
    .content-header h2 { margin: 0 0 4px; }
    .content-header p { margin: 0; font-size: 0.9rem; color: #6b7280; }
    .grid { display: grid; grid-template-columns: minmax(0, 260px) minmax(0, 1fr); gap: 18px; margin-top: 20px; }
    .card { padding: 18px 16px; border-radius: 14px; background: #f9fafb; border: 1px solid #e5e7eb; }
    .plan { background: #eff6ff; border-color: #bfdbfe; }
    .plan.loading { background: #f9fafb; border-style: dashed; color: #6b7280; font-size: 0.88rem; }
    .plan h3 { margin: 0 0 4px; font-size: 0.95rem; }
    .plan-name { margin: 0 0 2px; font-weight: 600; font-size: 1.05rem; color: #1d4ed8; }
    .plan-price { margin: 0 0 4px; font-size: 0.95rem; color: #111827; }
    .plan-price span { font-size: 0.8rem; color: #6b7280; margin-left: 4px; }
    .plan-validity { margin: 0 0 6px; font-size: 0.82rem; color: #4b5563; }
    .plan-note { margin: 0; font-size: 0.8rem; color: #6b7280; }
    .table-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
    .table-container { width: 100%; overflow-x: auto; }
    .table { width: 100%; border-collapse: collapse; }
    th, td { padding: 8px 10px; text-align: left; font-size: 0.9rem; }
    thead { background: #f3f4f6; }
    tbody tr:nth-child(even) td { background: #f9fafb; }

    @media (max-width: 900px) {
      .grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 600px) {
      .content {
        padding: 18px 16px;
      }
      .grid {
        gap: 14px;
        margin-top: 16px;
      }
      .card {
        padding: 14px 12px;
      }
      .table-header {
        flex-direction: column;
        align-items: flex-start;
      }
      .table {
        min-width: 480px;
        font-size: 0.82rem;
      }
    }
  `,
})
export class CarrierDashboardHomeComponent {
  profile: { plan: string; price: number; validUntil: string | null } | null = null;

  async ngOnInit() {
    try {
			const res = await fetch(`${API_URL}/carrier-profile`);
      if (res.ok) {
        this.profile = await res.json();
      }
    } catch {
      this.profile = null;
    }
  }
}
