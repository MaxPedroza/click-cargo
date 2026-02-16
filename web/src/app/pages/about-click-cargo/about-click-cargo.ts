import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-about-click-cargo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="page">
      <header class="header">
        <h2>O que é a Click & Cargo</h2>
        <p class="subtitle">
          Página explicativa para apresentação do conceito da plataforma no MVP demonstrativo.
        </p>
      </header>

      <section class="block">
        <h3>Conectando clientes e transportadoras</h3>
        <p>
          A Click & Cargo é um hub digital que conecta pessoas que precisam fazer mudanças
          ou transportar bens a transportadoras especializadas. O objetivo é organizar os
          pedidos de orçamento em um só lugar, dar transparência em preços e planos e
          oferecer serviços complementares como vistoria virtual, seguro e Personal Organizer.
        </p>
      </section>

      <section class="block">
        <h3>Jornada do cliente</h3>
        <ul>
          <li>Cadastro simples como cliente para iniciar a jornada.</li>
          <li>Envio de um pedido de orçamento detalhando endereços e contexto da mudança.</li>
          <li>Recebimento de propostas de diferentes transportadoras dentro do painel.</li>
          <li>Pagamento simulado da proposta escolhida, com geração de recibo demonstrativo.</li>
          <li>Acesso a serviços adicionais: vistoria virtual, seguro e organização da mudança.</li>
        </ul>
      </section>

      <section class="block">
        <h3>Jornada da transportadora</h3>
        <ul>
          <li>Cadastro da transportadora com dados básicos de operação e contato.</li>
          <li>Visualização de pedidos de mudança compatíveis com a área de atuação.</li>
          <li>Envio de propostas estruturadas, com plano, valor e validade.</li>
          <li>Acompanhamento de propostas enviadas e indicadores de desempenho.</li>
          <li>Simulação de planos de assinatura (Free, Prata, Ouro) para acesso a mais pedidos.</li>
        </ul>
      </section>

      <section class="block info">
        <h3>Ambiente demonstrativo (MVP)</h3>
        <p>
          Este ambiente foi criado para demonstração do conceito Click & Cargo. Todos os fluxos
          de pagamento, notificações e serviços são simulados: não há cobrança real, nem envio de
          e-mails para clientes ou transportadoras. Os dados são armazenados apenas em memória ou
          em arquivos locais para fins de teste.
        </p>
      </section>
    </section>
  `,
  styles: `
    .page {
      max-width: 900px;
      margin: 32px auto;
      background: var(--cc-surface);
      padding: 24px 22px;
      border-radius: 18px;
      box-shadow: 0 10px 24px rgba(0, 0, 0, 0.04);
      font-size: 0.95rem;
    }
    .header {
      margin-bottom: 18px;
    }
    h2 {
      margin: 0 0 4px;
      font-size: 1.4rem;
    }
    .subtitle {
      margin: 0;
      font-size: 0.9rem;
      color: var(--cc-muted);
    }
    .block {
      margin-top: 16px;
    }
    .block h3 {
      margin: 0 0 6px;
      font-size: 1.05rem;
    }
    .block p {
      margin: 0;
      color: #4b5563;
    }
    .block ul {
      margin: 0;
      padding-left: 18px;
      color: #4b5563;
      display: grid;
      gap: 4px;
      font-size: 0.9rem;
    }
    .block.info {
      border-radius: 14px;
      border: 1px dashed #cbd5f5;
      padding: 12px 12px 10px;
      background: #f8fafc;
    }
  `,
})
export class AboutClickCargoComponent {}
