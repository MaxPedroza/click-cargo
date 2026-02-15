# Click & Cargo - Projeto Conceito

Projeto exemplo para demonstrar o fluxo da plataforma **Click & Cargo**, conectando clientes e transportadoras. 

- Frontend: Angular
- Backend: Node.js + Express + TypeScript (dados em memória, sem banco real)

## Pré-requisitos

- Node.js 18+ (recomendado)
- NPM 9+ (vem junto com o Node)

Verifique as versões com:

```bash
node -v
npm -v
```

## Estrutura do projeto

- `api/` – API Node.js/Express em TypeScript (CRUD em memória)
- `web/` – Aplicação Angular (interface do cliente)

## Instalação

Na raiz do projeto (`Click-Cargo`):

1. Instale as dependências do root (para usar o script que sobe tudo junto):

```bash
npm install
```

2. Instale as dependências da API:

```bash
cd api
npm install
cd ..
```

3. Instale as dependências do frontend Angular:

```bash
cd web
npm install
cd ..
```

> Obs.: Os passos 2 e 3 só precisam ser feitos na primeira vez (ou quando adicionar novos pacotes).

## Como rodar o projeto

### Opção 1 – Backend e frontend juntos (recomendado)

Na raiz do projeto (`Click-Cargo`):

```bash
npm start
```

Isso irá:

- Subir a **API** em `http://localhost:3000`
- Subir o **Angular** em `http://localhost:4200`

Acesse no navegador:

- Interface web: `http://localhost:4200`

### Opção 2 – Rodar separadamente

**API (backend)**

```bash
cd api
npm run dev
```

A API ficará disponível em `http://localhost:3000`.

**Frontend Angular**

Em outro terminal:

```bash
cd web
npm start
```

O Angular ficará disponível em `http://localhost:4200`.

## Principais rotas da aplicação (frontend)

- `/` – Home (visão geral e chamadas para Cliente/Transportadora)
- `/login` – Login (simulado, redireciona para o dashboard do cliente)
- `/dashboard-cliente` – Dashboard do Cliente, com os cards da jornada
- `/cadastro-cliente` – Cadastro de dados pessoais do cliente
- `/cliente/orcamento/novo` – Enviar pedido de orçamento
- `/cliente/orcamentos` – Ver orçamentos recebidos
- `/cliente/vistoria-virtual` – Solicitar vistoria virtual
- `/cliente/seguro` – Solicitar cotação de seguro
- `/cliente/personal-organizer` – Solicitar cotação de Personal Organizer

## Principais endpoints da API (resumo)

- `GET /health` – Verifica se a API está no ar
- `GET/POST/PUT/DELETE /clients` – CRUD de clientes em memória
- `GET/POST /requests` – Pedidos de orçamento do cliente
- `GET /offers` – Lista de orçamentos recebidos (dados fictícios)
- `PATCH /offers/:id/status` – Atualiza status de uma oferta (enviado/aceito/recusado)
- `GET/POST /service-requests` – Solicitações de vistoria, seguro e personal organizer

## Logo do projeto

Para exibir o logo na interface, coloque o arquivo de imagem na pasta:

- `web/src/assets/logo-click-cargo.png`

O layout já está preparado para carregar esse arquivo.

## Observações

- Todos os dados são mantidos **apenas em memória**, para fins de demonstração.
- Ao reiniciar o servidor da API, os dados são resetados.
- Este projeto é um **MVP visual** para apresentação a parceiros e empreendedores, servindo de base para um projeto real futuro.
