import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="home-grid">
      <section class="home-hero">
        <h2>
          <span class="icon material-symbols-outlined">local_shipping</span>
          Sua mudança, do jeito certo.
        </h2>
        <p>
          O Click & Cargo conecta clientes e transportadoras confiáveis para
          mudanças, fretes e serviços adicionais como vistoria virtual e
          personal organizer.
        </p>
        <div class="home-actions">
          <button routerLink="/cadastro-cliente" class="primary">
            <span class="icon material-symbols-outlined">person</span>
            Sou Cliente
          </button>
          <button routerLink="/cadastro-transportadora" class="secondary">
            <span class="icon material-symbols-outlined">local_shipping</span>
            Sou Transportadora
          </button>
        </div>
        <ul class="home-bullets">
          <li><span class="bullet-icon material-symbols-outlined">list_alt</span>Orçamentos organizados em um só lugar</li>
          <li><span class="bullet-icon material-symbols-outlined">visibility</span>Transparência em planos e valores</li>
          <li><span class="bullet-icon material-symbols-outlined">star</span>Serviços extras para uma experiência completa</li>
        </ul>
      </section>

      <section class="home-panels">
        <div class="panel cliente" routerLink="/cadastro-cliente">
          <h3><span class="icon material-symbols-outlined">person_search</span>Jornada do Cliente</h3>
          <p>Cadastre-se, solicite orçamentos e acompanhe todas as etapas.</p>
        </div>
        <div class="panel centro" routerLink="/sobre-click-cargo">
          <h3><span class="icon material-symbols-outlined">hub</span>Click & Cargo</h3>
          <p>Hub inteligente que faz a ponte entre as duas pontas.</p>
        </div>
        <div class="panel transportadora" routerLink="/cadastro-transportadora">
          <h3><span class="icon material-symbols-outlined">local_shipping</span>Jornada da Transportadora</h3>
          <p>Receba solicitações, envie propostas e gerencie seus planos.</p>
        </div>
      </section>
    </div>
  `,
  styles: `
    .home-grid { display: grid; grid-template-columns: 3fr 2.5fr; gap: 32px; align-items: stretch; }
    .home-hero { padding: 24px 20px 20px; border-radius: var(--cc-radius-lg); background: linear-gradient(135deg, rgba(0,74,99,0.06), rgba(44,107,91,0.02)); border: 1px solid rgba(255,255,255,0.7); box-shadow: 0 12px 28px rgba(0,0,0,0.04); }
    .home-hero h2 { margin: 0 0 8px; font-size: 1.8rem; color: var(--cc-blue-dark); display: flex; align-items: center; gap: 8px; }
    .home-hero p { margin: 0 0 16px; color: var(--cc-muted); max-width: 520px; }
    .home-actions { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 16px; }
    .home-actions .primary { background: var(--cc-blue); color: #fff; border-radius: 999px; padding: 10px 18px; border: none; cursor: pointer; box-shadow: 0 8px 20px rgba(0,74,99,0.35); display: inline-flex; align-items: center; gap: 6px; }
    .home-actions .secondary { background: transparent; color: var(--cc-blue-dark); border-radius: 999px; padding: 10px 18px; border: 1px dashed rgba(0,74,99,0.4); cursor: pointer; display: inline-flex; align-items: center; gap: 6px; }
    .home-actions button:hover { filter: brightness(1.04); }
    .home-bullets { list-style: none; padding: 0; margin: 0; display: grid; gap: 6px; font-size: 0.9rem; color: var(--cc-text); }
    .home-bullets li { display: flex; align-items: center; gap: 4px; }
    .home-panels { display: grid; gap: 12px; }
    .panel { padding: 16px 14px; border-radius: 18px; background: var(--cc-surface); border: 1px solid rgba(0,0,0,0.04); box-shadow: 0 10px 22px rgba(0,0,0,0.06); font-size: 0.94rem; cursor: pointer; transition: transform 0.08s ease, box-shadow 0.08s ease; }
    .panel:hover { transform: translateY(-1px); box-shadow: 0 14px 26px rgba(0,0,0,0.08); }
    .panel h3 { margin: 0 0 4px; font-size: 1rem; display: flex; align-items: center; gap: 6px; }
    .panel p { margin: 0; color: var(--cc-muted); }
    .panel.cliente { border-left: 4px solid var(--cc-blue); }
    .panel.centro { border-left: 4px solid var(--cc-green); }
    .panel.transportadora { border-left: 4px solid var(--cc-blue-dark); }
    .icon { font-size: 1.4rem; }
    .bullet-icon { font-size: 1.1rem; color: var(--cc-green); }
    @media (max-width: 900px) {
      .home-grid {
        grid-template-columns: 1fr;
        gap: 20px;
      }

      .home-hero {
        padding: 18px 14px 16px;
      }

      .home-hero h2 {
        font-size: 1.4rem;
        flex-wrap: wrap;
      }

      .home-actions {
        flex-direction: column;
        align-items: stretch;
      }

      .home-actions button {
        width: 100%;
        justify-content: center;
      }

      .home-panels {
        grid-template-columns: 1fr;
      }
    }
  `,
})
export class HomeComponent {}
