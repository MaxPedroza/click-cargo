import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-client-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="layout">
      <aside class="sidebar">
      <div class="sidebar-header">
        <div class="avatar">C</div>
        <div class="name">Cliente Click & Cargo</div>
        <button type="button" class="menu-toggle" (click)="toggleMenu()">
          <span class="material-symbols-outlined">{{ menuOpen ? 'close' : 'menu' }}</span>
        </button>
      </div>
      <nav class="menu" [class.menu-collapsed]="!menuOpen">
          <a routerLink="." routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">
            <span class="material-symbols-outlined">dashboard</span>
            Meus pedidos
          </a>
          <a routerLink="dados" routerLinkActive="active">
            <span class="material-symbols-outlined">badge</span>
            Meus dados
          </a>
          <a routerLink="orcamento-novo" routerLinkActive="active">
            <span class="material-symbols-outlined">add_circle</span>
            Nova solicitação
          </a>
          <a routerLink="orcamentos" routerLinkActive="active">
            <span class="material-symbols-outlined">receipt_long</span>
            Meus orçamentos
          </a>
          <a routerLink="vistoria-virtual" routerLinkActive="active">
            <span class="material-symbols-outlined">videocam</span>
            Vistoria virtual
          </a>
          <a routerLink="seguro" routerLinkActive="active">
            <span class="material-symbols-outlined">shield</span>
            Seguro mudança
          </a>
          <a routerLink="servicos-extras" routerLinkActive="active">
            <span class="material-symbols-outlined">auto_awesome</span>
            Serviços extras
          </a>
          <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer">
				<span class="material-symbols-outlined">chat</span>
				WhatsApp
			</a>
          <a routerLink="suporte" routerLinkActive="active">
            <span class="material-symbols-outlined">help</span>
            Ajuda e suporte
          </a>
        </nav>
      </aside>
      <section class="content-wrapper">
        <router-outlet></router-outlet>
      </section>
    </div>
  `,
  styles: `
    .layout { display: grid; grid-template-columns: 260px 1fr; min-height: 520px; background: var(--cc-surface); border-radius: 18px; margin: 24px auto; max-width: 1100px; box-shadow: 0 10px 24px rgba(0,0,0,0.04); overflow: hidden; }
    .sidebar { background: #f5f7fb; padding: 24px 20px; display: flex; flex-direction: column; align-items: flex-start; gap: 16px; border-right: 1px solid #e0e4f2; }
    .sidebar-header { display: flex; align-items: center; gap: 12px; width: 100%; justify-content: flex-start; }
    .avatar { width: 72px; height: 72px; border-radius: 50%; background: #d0e4ff; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; font-weight: 700; color: #004b93; }
    .name { font-weight: 600; font-size: 1rem; }
    .menu-toggle { margin-left: auto; border: none; background: transparent; cursor: pointer; display: none; align-items: center; justify-content: center; padding: 6px; border-radius: 999px; }
    .menu { display: flex; flex-direction: column; gap: 10px; margin-top: 8px; width: 100%; }
    .menu a { font-size: 0.9rem; padding: 6px 4px; color: #344054; text-decoration: none; border-left: 3px solid transparent; display: flex; align-items: center; gap: 6px; }
    .menu a.active { font-weight: 600; border-color: var(--cc-blue); color: var(--cc-blue); }
    .content-wrapper { padding: 0; }
    a { color: var(--cc-blue); text-decoration: none; font-size: 0.9rem; }
    @media (max-width: 900px) {
      .layout { grid-template-columns: 1fr; margin: 20px auto; }
      .sidebar {
        border-right: none;
        border-bottom: 1px solid #e0e4f2;
        padding: 16px 14px;
      }
      .sidebar-header {
        justify-content: space-between;
      }
      .menu-toggle {
        display: inline-flex;
        background: #e5edf9;
      }
      .menu {
        margin-top: 10px;
      }
      .menu.menu-collapsed {
        display: none;
      }
    }

    @media (max-width: 600px) {
      .layout { margin: 16px auto; }
      .sidebar {
        gap: 10px;
      }
      .avatar {
        width: 56px;
        height: 56px;
        font-size: 1.4rem;
      }
    }
  `,
})
export class ClientDashboardComponent {
	menuOpen = true;

	toggleMenu() {
		this.menuOpen = !this.menuOpen;
	}
}
