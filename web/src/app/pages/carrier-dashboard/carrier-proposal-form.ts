import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ValidationPopupComponent } from '../../shared/validation-popup';
import { API_URL } from '../../shared/api-config';

@Component({
	selector: 'app-carrier-proposal-form',
	standalone: true,
	imports: [CommonModule, RouterModule, FormsModule, ValidationPopupComponent],
	template: `
		<section class="content" *ngIf="!loading; else loadingTpl">
			<h2>Enviar proposta para o cliente</h2>
			<p class="hint">Formulário demonstrativo para a transportadora responder um pedido de orçamento.</p>

			<section class="summary" *ngIf="request">
				<h3>Pedido #{{ request.id }}</h3>
				<p class="small">{{ request.pickupAddress }} → {{ request.deliveryAddress }}</p>
				<p class="small">Cliente: {{ request.requesterName || 'Cliente Click & Cargo' }}</p>
			</section>

			<form class="form" (ngSubmit)="submit()">
				<label>
					Plano
					<select [(ngModel)]="model.plan" name="plan" required>
						<option value="">Selecione...</option>
						<option>Plano Free</option>
						<option>Plano Prata</option>
						<option>Plano Ouro</option>
					</select>
				</label>
				<label>
					Valor da proposta (R$)
					<input type="number" [(ngModel)]="model.price" name="price" min="0" step="0.01" required />
				</label>
				<label>
					Validade da proposta
					<input type="date" [(ngModel)]="model.validityDate" name="validityDate" required />
				</label>
				<div class="actions">
					<button type="submit" [disabled]="submitting">Enviar proposta</button>
					<a routerLink="/dashboard-transportadora/pedidos" class="link">Voltar para pedidos</a>
				</div>
				<p class="status" *ngIf="message">{{ message }}</p>
			</form>
		</section>

		<cc-validation-popup
			[(visible)]="validationVisible"
			[messages]="validationMessages"
			title="Campos obrigatórios da proposta"
			description="Antes de enviar a proposta ao cliente, preencha:"
		></cc-validation-popup>

		<ng-template #loadingTpl>
			<section class="content">
				<p>Carregando dados do pedido...</p>
			</section>
		</ng-template>
	`,
	styles: `
		.content { padding: 24px 28px; font-size: 0.95rem; }
		h2 { margin: 0 0 4px; font-size: 1.2rem; }
		.hint { margin: 0 0 14px; font-size: 0.85rem; color: var(--cc-muted); }
		.summary { border-radius: 14px; border: 1px solid #e1e7f0; padding: 10px 12px; background: #f9fafb; margin-bottom: 16px; }
		.summary h3 { margin: 0 0 4px; font-size: 1rem; }
		.small { margin: 0; font-size: 0.85rem; color: #4b5563; }
		.form { display: grid; gap: 14px; max-width: 480px; }
		label { display: flex; flex-direction: column; font-size: 0.9rem; }
		input, select { padding: 8px; border-radius: 6px; border: 1px solid #ccd6e0; font-size: 0.9rem; }
		.actions { display: flex; align-items: center; gap: 10px; margin-top: 4px; }
		button { padding: 8px 16px; border-radius: 999px; border: none; background: var(--cc-blue); color: #fff; cursor: pointer; font-size: 0.9rem; }
		.link { font-size: 0.85rem; color: var(--cc-blue); text-decoration: none; }
		.status { margin-top: 8px; font-size: 0.85rem; color: #065f46; }
	`,
})
export class CarrierProposalFormComponent {
	request: any | null = null;
	loading = true;
	submitting = false;
	message = '';
	model: { plan: string; price: number | null; validityDate: string } = {
		plan: '',
		price: null,
		validityDate: '',
	};
	validationVisible = false;
	validationMessages: string[] = [];

	private route = inject(ActivatedRoute);
	private readonly carrierName = 'TransClick Logística';

	async ngOnInit() {
		const idParam = this.route.snapshot.paramMap.get('requestId');
		if (!idParam) {
			this.loading = false;
			return;
		}
		try {
			const res = await fetch(`${API_URL}/requests/${idParam}`);
			if (res.ok) {
				this.request = await res.json();
			}
			const today = new Date();
			today.setDate(today.getDate() + 7);
			this.model.validityDate = today.toISOString().slice(0, 10);
		} finally {
			this.loading = false;
		}
	}

	async submit() {
		const missing: string[] = [];
		if (!this.model.plan) missing.push('Plano da proposta');
		if (this.model.price == null) missing.push('Valor da proposta');
		if (!this.model.validityDate) missing.push('Validade da proposta');

		if (!this.request) missing.push('Pedido de origem da proposta (recarregue a página)');

		if (missing.length) {
			this.validationMessages = missing;
			this.validationVisible = true;
			return;
		}

		this.submitting = true;
		this.message = '';
		try {
			const res = await fetch(`${API_URL}/offers`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					requestId: this.request.id,
					carrierName: this.carrierName,
					plan: this.model.plan,
					price: Number(this.model.price),
					validityDate: new Date(this.model.validityDate).toISOString(),
					status: 'enviado',
				}),
			});
			if (res.ok) {
				this.message = 'Proposta enviada com sucesso para o cliente!';
			}
		} catch {
			this.message = 'Não foi possível enviar a proposta. Confira se a API está rodando.';
		} finally {
			this.submitting = false;
		}
	}
}
