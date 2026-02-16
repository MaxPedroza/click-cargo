import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ValidationPopupComponent } from '../../shared/validation-popup';
import { API_URL } from '../../shared/api-config';

@Component({
  selector: 'app-client-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ValidationPopupComponent],
  template: `
    <div class="page">
      <h2>Cadastro de Cliente</h2>
      <form (ngSubmit)="save()" class="form">
        <label>
          Nome completo
          <input [(ngModel)]="model.name" name="name" required />
        </label>
        <label>
          E-mail de contato
          <input [(ngModel)]="model.email" name="email" required />
        </label>
        <label>
          Data de nascimento
          <input type="date" [(ngModel)]="model.birthDate" name="birthDate" />
        </label>
        <label>
          Celular de contato
          <input [(ngModel)]="model.phone" name="phone" />
        </label>
        <label class="full-row">
          Endereço completo
          <textarea [(ngModel)]="model.address" name="address" rows="3"></textarea>
        </label>
        <div class="actions">
          <button type="submit">Salvar dados</button>
        </div>
      </form>

      <cc-validation-popup
        [(visible)]="validationVisible"
        [messages]="validationMessages"
        title="Campos obrigatórios não preenchidos"
        description="Para salvar o cadastro, preencha pelo menos os campos essenciais:"
      ></cc-validation-popup>

      <h3>Clientes cadastrados (memória)</h3>
      <div class="table-container" *ngIf="clients.length">
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Celular</th>
            <th>Nascimento</th>
            <th>Endereço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let c of clients">
            <td>{{ c.id }}</td>
            <td>{{ c.name }}</td>
            <td>{{ c.email }}</td>
            <td>{{ c.phone }}</td>
            <td>{{ c.birthDate | date:'dd/MM/yyyy' }}</td>
            <td>{{ c.address }}</td>
            <td>
              <button type="button" (click)="edit(c)">Editar</button>
              <button type="button" (click)="remove(c)">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
  `,
  styles: `
    .page { max-width: 960px; margin: 32px auto; background: var(--cc-surface); padding: 24px 22px; border-radius: 18px; box-shadow: 0 10px 24px rgba(0,0,0,0.04); }
    .form { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px 18px; margin-bottom: 24px; }
    label { display: flex; flex-direction: column; font-size: 0.9rem; }
    .full-row { grid-column: 1 / -1; }
    input, textarea { padding: 8px; border-radius: 6px; border: 1px solid #ccd6e0; font-size: 0.9rem; }
    .actions { grid-column: 1 / -1; display: flex; justify-content: flex-end; }
    button { margin-right: 4px; padding: 8px 14px; border-radius: 999px; border: none; background: var(--cc-blue); color: #fff; cursor: pointer; }
    .table-container { width: 100%; overflow-x: auto; }
    table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
    th, td { padding: 8px; border-bottom: 1px solid #eee; text-align: left; }

    @media (max-width: 600px) {
      .page {
        margin: 20px 12px;
        padding: 18px 14px;
      }
      .form {
        grid-template-columns: 1fr;
        gap: 12px 14px;
      }
      .actions {
        justify-content: flex-start;
      }
      .table {
        min-width: 600px;
        font-size: 0.82rem;
      }
    }
  `,
})
export class ClientRegisterComponent {
  model: any = {};
  clients: any[] = [];
  editingId: number | null = null;
  validationVisible = false;
  validationMessages: string[] = [];

  async ngOnInit() {
		const res = await fetch(`${API_URL}/clients`);
    this.clients = await res.json();
  }

  async save() {
    const missing: string[] = [];
    if (!this.model.name) missing.push('Nome completo');
    if (!this.model.email) missing.push('E-mail de contato');
    if (!this.model.phone) missing.push('Celular de contato');
    if (!this.model.address) missing.push('Endereço completo');

    if (missing.length) {
      this.validationMessages = missing;
      this.validationVisible = true;
      return;
    }

    if (this.editingId) {
      const res = await fetch(`${API_URL}/clients/${this.editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.model),
      });
      const updated = await res.json();
      this.clients = this.clients.map(c => (c.id === updated.id ? updated : c));
    } else {
      const res = await fetch(`${API_URL}/clients`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.model),
      });
      const created = await res.json();
      this.clients.push(created);
    }
    this.model = {};
    this.editingId = null;
  }

  edit(client: any) {
    this.model = {
      name: client.name,
      email: client.email,
      phone: client.phone,
      birthDate: client.birthDate,
      address: client.address,
    };
    this.editingId = client.id;
  }

  async remove(client: any) {
    await fetch(`${API_URL}/clients/${client.id}`, { method: 'DELETE' });
    this.clients = this.clients.filter(c => c.id !== client.id);
  }
}
