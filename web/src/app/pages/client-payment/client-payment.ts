import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { API_URL } from '../../shared/api-config';

@Component({
	selector: 'app-client-payment',
	standalone: true,
	imports: [CommonModule, RouterModule],
	template: `
		<div class="page" *ngIf="!loading && offer; else loadingTpl">
			<h2>Pagamento da proposta</h2>
			<div class="alert">
				<strong>Atenção – Proposta e Pagamento</strong>
				<p>
					Para aceitar um orçamento, o cliente precisa realizar o pagamento do valor da proposta.
					Após o pagamento ser identificado, a transportadora recebe um aviso e um e-mail com os seus dados de contato.
				</p>
			</div>

			<section class="summary">
				<h3>Resumo da proposta</h3>
				<dl>
					<div>
						<dt>Transportadora</dt>
						<dd>{{ offer.carrierName }}</dd>
					</div>
					<div>
						<dt>Plano</dt>
						<dd>{{ offer.plan }}</dd>
					</div>
					<div>
						<dt>Valor</dt>
						<dd>R$ {{ offer.price | number: '1.2-2' }}</dd>
					</div>
					<div>
						<dt>Validade</dt>
						<dd>{{ offer.validityDate | date: 'dd/MM/yyyy' }}</dd>
					</div>
				</dl>
			</section>

			<section class="payment-box">
				<h3>Forma de pagamento (simulação)</h3>
				<p class="hint">
					Atenção: este é um fluxo demonstrativo. Nenhum pagamento real é processado neste ambiente.
				</p>
				<button type="button" (click)="confirmPayment()" [disabled]="processing || success">
					{{ success ? 'Pagamento confirmado' : 'Pagar proposta' }}
				</button>
				<p class="status" *ngIf="message">{{ message }}</p>
				<a routerLink="/dashboard-cliente/orcamentos" class="back-link">Voltar para orçamentos</a>
			</section>

			<section class="receipt" *ngIf="success && offer">
				<h3>Recibo de pagamento (demo)</h3>
				<p class="receipt-note">Documento meramente ilustrativo para fins de demonstração.</p>
				<div class="receipt-grid">
					<div>
						<span class="label">Recibo nº</span>
						<span class="value">RCB-{{ offer.id | number: '4.0-0' }}</span>
					</div>
					<div>
						<span class="label">Data do pagamento</span>
						<span class="value">{{ paymentAt || (newDate() | date: 'dd/MM/yyyy HH:mm') }}</span>
					</div>
					<div>
						<span class="label">Cliente</span>
						<span class="value">{{ userName || 'Cliente Click & Cargo (demo)' }}</span>
					</div>
					<div *ngIf="userEmail">
						<span class="label">E-mail</span>
						<span class="value">{{ userEmail }}</span>
					</div>
					<div>
						<span class="label">Transportadora</span>
						<span class="value">{{ offer.carrierName }}</span>
					</div>
					<div>
						<span class="label">Plano contratado</span>
						<span class="value">{{ offer.plan }}</span>
					</div>
					<div>
						<span class="label">Valor pago</span>
						<span class="value">R$ {{ offer.price | number: '1.2-2' }}</span>
					</div>
				</div>
			</section>
		</div>

		<ng-template #loadingTpl>
			<div class="page">
				<p>Carregando proposta selecionada...</p>
			</div>
		</ng-template>
	`,
	styles: `
		.page { max-width: 720px; margin: 32px auto; background: var(--cc-surface); padding: 24px 22px; border-radius: 18px; box-shadow: 0 10px 24px rgba(0,0,0,0.04); }
		.hint { font-size: 0.85rem; color: var(--cc-muted); margin-bottom: 16px; }
		.alert { border-radius: 14px; border: 1px solid #fecaca; background: #fff7ed; padding: 12px 14px; margin: 10px 0 18px; font-size: 0.88rem; color: #7c2d12; display: grid; gap: 4px; }
		.alert strong { font-size: 0.9rem; }
		.summary { border-radius: 14px; border: 1px solid #e5e7eb; padding: 14px 14px 10px; margin-bottom: 18px; }
		.summary h3 { margin: 0 0 8px; font-size: 1rem; }
		dl { margin: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 8px 18px; font-size: 0.9rem; }
		dt { font-weight: 600; color: #4b5563; }
		dd { margin: 0; color: #111827; }
		.payment-box { border-radius: 14px; border: 1px solid #e5e7eb; padding: 14px; }
		.payment-box h3 { margin: 0 0 6px; font-size: 1rem; }
		button { margin-top: 8px; padding: 10px 18px; border-radius: 999px; border: none; background: var(--cc-blue); color: #fff; font-size: 0.9rem; cursor: pointer; }
		button[disabled] { background: #9ca3af; cursor: default; }
		.status { margin-top: 10px; font-size: 0.88rem; color: #065f46; }
		.back-link { display: inline-block; margin-top: 10px; font-size: 0.85rem; color: var(--cc-blue); text-decoration: none; }
		.receipt { margin-top: 22px; border-radius: 16px; border: 1px dashed #cbd5f5; background: #f9fafb; padding: 16px 14px; }
		.receipt h3 { margin: 0 0 4px; font-size: 1rem; }
		.receipt-note { margin: 0 0 10px; font-size: 0.8rem; color: var(--cc-muted); }
		.receipt-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 8px 18px; font-size: 0.9rem; }
		.label { display: block; font-size: 0.8rem; text-transform: uppercase; color: #6b7280; }
		.value { font-weight: 600; color: #111827; }
	`,
})
export class ClientPaymentComponent {
	offer: any | null = null;
	loading = true;
	processing = false;
	success = false;
	message = '';
	userName = '';
	userEmail = '';
	paymentAt: string | null = null;

	private route = inject(ActivatedRoute);

	async ngOnInit() {
		this.loadUser();
		const idParam = this.route.snapshot.paramMap.get('offerId');
		if (!idParam) {
			this.loading = false;
			return;
		}
		const id = Number(idParam);
		try {
			const res = await fetch(`${API_URL}/offers`);
			if (res.ok) {
				const all = await res.json();
				this.offer = all.find((o: any) => o.id === id) ?? null;
			}
		} finally {
			this.loading = false;
		}
	}

	private loadUser() {
		try {
			const raw = localStorage.getItem('cc_user');
			if (!raw) return;
			const parsed = JSON.parse(raw) as { name?: string; email?: string };
			this.userName = parsed.name || '';
			this.userEmail = parsed.email || '';
		} catch {
			this.userName = '';
			this.userEmail = '';
		}
	}

	// Helper apenas para template quando paymentAt ainda não foi definido
	newDate(): Date {
		return new Date();
	}

	async confirmPayment() {
		if (!this.offer || this.processing || this.success) return;
		this.processing = true;
		this.message = '';

		try {
			const res = await fetch(`${API_URL}/offers/${this.offer.id}/status`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ status: 'aceito' }),
			});
			if (res.ok) {
				this.success = true;
				this.paymentAt = new Date().toISOString();
				this.message = 'Pagamento confirmado! A transportadora será notificada por e-mail com seus dados de contato.';
			} else {
				this.message = 'Não foi possível confirmar o pagamento. Tente novamente em instantes.';
			}
		} catch (err) {
			this.message = 'Não foi possível conectar ao servidor. Confira se a API está rodando.';
		} finally {
			this.processing = false;
		}
	}
}
