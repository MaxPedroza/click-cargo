import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { API_URL } from '../../shared/api-config';

@Component({
  selector: 'app-carrier-dashboard-plans',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="content">
      <header class="header">
        <div>
          <h2>Planos e assinatura</h2>
          <p class="hint">
            Atenção: simulação dos planos e assinatura da transportadora na Click & Cargo em ambiente demonstrativo.
          </p>
        </div>
        <div class="current" *ngIf="profile">
          <span class="label">Plano atual:</span>
          <span class="value">{{ profile.plan }}</span>
          <span class="value" *ngIf="profile.price > 0">· R$ {{ profile.price | number: '1.2-2' }}/mês</span>
          <span class="value" *ngIf="profile.validUntil">· até {{ profile.validUntil | date: 'dd/MM/yyyy' }}</span>
        </div>
      </header>

      <div class="plans">
        <article class="plan-card" [class.plan-active]="profile?.plan === 'Free'">
          <h3>Free</h3>
          <p class="price">R$ 0<span>/mês</span></p>
          <ul>
            <li>Até 5 pedidos por mês</li>
            <li>Cadastro básico da transportadora</li>
            <li>Envio de propostas manuais</li>
          </ul>
          <button type="button" (click)="changePlan('free')" [disabled]="isCurrentPlan('free') || loading">
            {{ isCurrentPlan('free') ? 'Plano atual' : 'Ativar plano Free' }}
          </button>
        </article>

        <article class="plan-card plan-featured" [class.plan-active]="isPlanKeyActive('prata')">
          <div class="chip" *ngIf="isPlanKeyActive('prata')">Plano atual</div>
          <h3>Prata</h3>
          <p class="price">R$ 199<span>/mês</span></p>
          <ul>
            <li>Pedidos ilimitados</li>
            <li>Destaque nas buscas de clientes</li>
            <li>Suporte por e-mail e WhatsApp</li>
          </ul>
          <button type="button" (click)="startPayment('prata')" [disabled]="loading">
            {{ isPlanKeyActive('prata') ? 'Plano ativo' : 'Assinar plano Prata' }}
          </button>
        </article>

        <article class="plan-card" [class.plan-active]="isPlanKeyActive('ouro')">
          <h3>Ouro</h3>
          <p class="price">R$ 399<span>/mês</span></p>
          <ul>
            <li>Todas as vantagens do Prata</li>
            <li>Gestor de conta dedicado</li>
            <li>Relatórios avançados de performance</li>
          </ul>
          <button type="button" (click)="startPayment('ouro')" [disabled]="loading">
            {{ isPlanKeyActive('ouro') ? 'Plano ativo' : 'Assinar plano Ouro' }}
          </button>
        </article>
      </div>

      <section class="payment" *ngIf="pendingPlanKey">
        <h3>Pagamento do plano {{ pendingPlanLabel() }} (simulado)</h3>
        <p class="hint">
          Atenção: esta etapa apenas simula a contratação do plano escolhido. Não há cobrança real neste ambiente.
        </p>
        <div class="payment-summary">
          <p><strong>Transportadora:</strong> TransClick Logística</p>
          <p><strong>Plano:</strong> {{ pendingPlanLabel() }}</p>
          <p><strong>Valor mensal:</strong> R$ {{ pendingPlanPrice() | number: '1.2-2' }}</p>
        </div>
        <div class="payment-actions">
          <button type="button" (click)="confirmPayment()" [disabled]="loading">
            {{ loading ? 'Confirmando...' : 'Confirmar pagamento (simulado)' }}
          </button>
          <button type="button" class="secondary" (click)="cancelPayment()" [disabled]="loading">Cancelar</button>
        </div>
        <p class="status" *ngIf="message">{{ message }}</p>
      </section>
    </section>
  `,
  styles: `
    .content { padding: 24px 28px; font-size: 0.95rem; }
    .header { margin-bottom: 18px; }
    h2 { margin: 0 0 4px; font-size: 1.2rem; }
    .hint { margin: 0; font-size: 0.85rem; color: var(--cc-muted); }
    .current { font-size: 0.85rem; color: #4b5563; display: flex; flex-wrap: wrap; gap: 4px; align-items: center; }
    .current .label { font-weight: 600; }
    .current .value { margin-left: 2px; }
    .plans { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 18px; }
    .plan-card { background: #fff; border-radius: 16px; border: 1px solid #e1e7f0; padding: 18px 16px; box-shadow: 0 4px 12px rgba(15, 23, 42, 0.04); display: flex; flex-direction: column; gap: 10px; }
    .plan-card.plan-active { border-color: var(--cc-blue); box-shadow: 0 0 0 1px rgba(37, 99, 235, 0.15), 0 6px 18px rgba(15, 23, 42, 0.08); }
    .plan-card h3 { margin: 0; font-size: 1rem; }
    .price { margin: 0; font-size: 1.4rem; font-weight: 600; color: var(--cc-blue-dark); }
    .price span { font-size: 0.8rem; font-weight: 400; color: var(--cc-muted); margin-left: 4px; }
    ul { margin: 4px 0 0; padding-left: 18px; font-size: 0.86rem; color: #4b5563; display: grid; gap: 4px; }
    button { margin-top: 8px; align-self: flex-start; padding: 8px 14px; border-radius: 999px; border: none; background: var(--cc-blue); color: #fff; font-size: 0.85rem; cursor: pointer; }
    button[disabled] { background: #cbd5e1; cursor: default; }
    .plan-featured { border-width: 2px; position: relative; }
    .chip { position: absolute; top: 10px; right: 12px; background: #e0f2fe; color: #075985; padding: 3px 8px; border-radius: 999px; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.04em; }
    .payment { margin-top: 26px; padding-top: 12px; border-top: 1px dashed #d4d4d8; }
    .payment-summary { margin-top: 10px; border-radius: 14px; border: 1px solid #e4e4e7; padding: 10px 12px; background: #f9fafb; font-size: 0.9rem; display: grid; gap: 2px; }
    .payment-actions { margin-top: 10px; display: flex; gap: 10px; }
    .payment-actions .secondary { background: #e5e7eb; color: #111827; }
    .status { margin-top: 8px; font-size: 0.85rem; color: #065f46; }

    @media (max-width: 600px) {
      .content {
        padding: 18px 16px;
      }
      .plans {
        gap: 14px;
      }
      .plan-card {
        padding: 16px 14px;
      }
      .payment-actions {
        flex-direction: column;
      }
      .payment-actions button {
        width: 100%;
      }
    }
  `,
})
export class CarrierDashboardPlansComponent {
  profile: { plan: string; price: number; validUntil: string | null } | null = null;
  pendingPlanKey: 'free' | 'prata' | 'ouro' | null = null;
  loading = false;
  message = '';

  async ngOnInit() {
    await this.loadProfile();
  }

  async loadProfile() {
    try {
			const res = await fetch(`${API_URL}/carrier-profile`);
      if (res.ok) {
        this.profile = await res.json();
      }
    } catch {
      this.profile = null;
    }
  }

  isCurrentPlan(key: 'free' | 'prata' | 'ouro'): boolean {
    if (!this.profile) return false;
    if (key === 'free') return this.profile.plan === 'Free';
    if (key === 'prata') return this.profile.plan === 'Plano Prata';
    return this.profile.plan === 'Plano Ouro';
  }

  isPlanKeyActive(key: 'prata' | 'ouro'): boolean {
    return this.isCurrentPlan(key);
  }

  changePlan(key: 'free') {
    this.pendingPlanKey = 'free';
    this.message = '';
    this.confirmPayment();
  }

  startPayment(key: 'prata' | 'ouro') {
    this.pendingPlanKey = key;
    this.message = '';
  }

  cancelPayment() {
    this.pendingPlanKey = null;
    this.message = '';
  }

  pendingPlanLabel(): string {
    if (this.pendingPlanKey === 'prata') return 'Plano Prata';
    if (this.pendingPlanKey === 'ouro') return 'Plano Ouro';
    return 'Free';
  }

  pendingPlanPrice(): number {
    if (this.pendingPlanKey === 'prata') return 199;
    if (this.pendingPlanKey === 'ouro') return 399;
    return 0;
  }

  async confirmPayment() {
    if (!this.pendingPlanKey) return;
    this.loading = true;
    this.message = '';
    try {
      const res = await fetch(`${API_URL}/carrier-profile/plan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planKey: this.pendingPlanKey }),
      });
      if (res.ok) {
        this.profile = await res.json();
        this.message = 'Plano atualizado com sucesso! (pagamento simulado)';
      } else {
        this.message = 'Não foi possível atualizar o plano. Confira se a API está rodando.';
      }
    } catch {
      this.message = 'Não foi possível conectar à API.';
    } finally {
      this.loading = false;
      this.pendingPlanKey = null;
    }
  }
}
