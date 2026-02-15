<p align="center">
	<img src="./web/src/assets/logo-click-Cargo.jpg" alt="Logo Click & Cargo" width="280" />
</p>

# Click & Cargo - Projeto Conceito

Projeto exemplo para demonstrar o fluxo da plataforma **Click & Cargo**, conectando clientes e transportadoras.

- Frontend: Angular 20
- Backend: Node.js 18+ + Express + TypeScript (dados em memória, sem banco real)

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

## Scripts úteis

Na raiz do projeto:

- `npm start` – sobe API e frontend em paralelo (modo desenvolvimento)
- `npm run start:api` – sobe somente a API (atalho para o script da pasta api)
- `npm run start:web` – sobe somente o frontend (atalho para o script da pasta web)

Na pasta `api`:

- `npm run dev` – API em desenvolvimento com ts-node/nodemon
- `npm run build` – gera build em `api/dist`
- `npm start` – roda a API já compilada a partir de `dist`

Na pasta `web`:

- `npm start` – roda `ng serve --open` (dev)
- `npm run build` – build de produção do frontend em `web/dist`

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

## Manual de uso (roteiro de demo)

Para um passo a passo bem detalhado de apresentação (com sugestões de imagens), consulte o manual completo:

- [MANUAL.md](MANUAL.md)

## Principais endpoints da API (resumo)

- `GET /health` – Verifica se a API está no ar
- `GET/POST/PUT/DELETE /clients` – CRUD de clientes em memória
- `GET/POST /requests` – Pedidos de orçamento do cliente
- `GET /offers` – Lista de orçamentos recebidos (dados fictícios)
- `PATCH /offers/:id/status` – Atualiza status de uma oferta (enviado/aceito/recusado)
- `GET/POST /service-requests` – Solicitações de vistoria, seguro e personal organizer
 - `GET /carrier-profile` – Perfil da transportadora (plano atual, preço, validade – armazenado em JSON)
 - `POST /carrier-profile/plan` – Atualiza o plano da transportadora (`free`, `prata`, `ouro`) com pagamento simulado

## Logo do projeto

Para exibir o logo na interface, coloque o arquivo de imagem na pasta:

- `web/src/assets/logo-click-cargo.png`

O layout já está preparado para carregar esse arquivo.

## Build e execução em modo "produção" (simples)

Este projeto é um MVP e não possui pipeline de build/deploy automatizado, mas você pode simular um cenário "produção" localmente:

1. Gerar build da API:

	```bash
	cd api
	npm run build
	npm start
	```

2. Em outro terminal, gerar e servir o build do Angular (por exemplo, usando um servidor estático como `npx http-server` ou servindo a pasta `web/dist` por trás de um Nginx/Apache).

Para desenvolvimento do dia a dia, o uso de `npm start` na raiz continua sendo o fluxo recomendado.

## Documentação de requisitos

Na pasta de assets do frontend há um documento de especificação de requisitos (SRS) utilizado como base para este MVP:

- `web/src/assets/Documento-de-Especificacao-de-Requisitos-de-Software-SRS-V-20.pdf`

Recomenda-se consultá-lo para entender o escopo funcional completo e as futuras evoluções planejadas.

## Observações

- Todos os dados são mantidos **apenas em memória**, para fins de demonstração.
- Ao reiniciar o servidor da API, os dados são resetados.
- Este projeto é um **MVP visual** para apresentação a parceiros e empreendedores, servindo de base para um projeto real futuro.
 - O código foi organizado para facilitar a extensão futura (ex.: troca do armazenamento em memória por um banco relacional ou NoSQL, integração com autenticação real e provedores externos).
