# Manual de Uso e Roteiro de Demonstração

Este manual descreve, em detalhes, como executar o projeto **Click & Cargo** e como conduzir uma **demonstração completa** da jornada do Cliente e da Transportadora, incluindo serviços extras.

Ele foi pensado para que qualquer pessoa consiga rodar o sistema localmente e seguir um roteiro de apresentação consistente.

---

## 1. Como rodar o projeto

> Para instruções completas de instalação, consulte também o arquivo `README.md` na raiz do projeto.

### 1.1. Pré-requisitos

- Node.js 18 ou superior
- NPM 9 ou superior

Verifique as versões com:

```bash
node -v
npm -v
```

### 1.2. Instalação inicial

Na raiz do projeto (pasta `Click-Cargo`):

```bash
npm install
```

Depois, instale dependências específicas de API e Web (apenas na primeira vez):

```bash
cd api
npm install
cd ..

cd web
npm install
cd ..
```

### 1.3. Subindo backend e frontend juntos (modo demo)

Na raiz do projeto:

```bash
npm start
```

Isso irá subir:

- API em `http://localhost:3000`
- Angular em `http://localhost:4200`

Abra o navegador em:

- `http://localhost:4200`

Se preferir rodar separado, veja a seção correspondente no `README.md`.

---

## 2. Perfis de demonstração e conceitos

### 2.1. Perfis de login (demo)

Estão configurados perfis **fictícios** apenas para facilitar a apresentação:

- **Cliente**  
  E-mail: `cliente@clickcargo.com`  
  Senha: `123456`

- **Transportadora**  
  E-mail: `transportadora@clickcargo.com`  
  Senha: `123456`

> Não há autenticação real; o backend não valida usuário/senha em banco de dados.

### 2.2. Conceitos principais

- **Cliente**: pessoa que está se mudando e precisa contratar uma transportadora e serviços extras.
- **Transportadora**: empresa que recebe pedidos de orçamento e envia propostas.
- **Pedido de orçamento**: solicitação feita pelo Cliente com dados da mudança.
- **Proposta**: oferta de serviço enviada pela Transportadora para um pedido.
- **Serviços extras**: vistoria virtual, seguro e personal organizer.

---

## 3. Preparação antes da demo

Antes de apresentar, siga estes passos:

1. **Suba o ambiente** com `npm start` na raiz e verifique:
   - API ok em `http://localhost:3000/health` (resposta simples de status).
   - Frontend ok em `http://localhost:4200`.
2. **Abra o navegador** já posicionado na **Home** (`/`).
3. Tenha em mente o fluxo de história que você quer contar:
   - Cliente com mudança marcada.
   - Transportadora avaliando e enviando proposta.
   - Cliente escolhendo proposta e simulando pagamento.
   - Uso de serviços extras (vistoria, seguro, organizer).
4. Como os dados são em memória, se você reiniciar a API, tudo será **resetado**.

Sugestão: antes de uma demo importante, faça um ensaio rápido completando toda a jornada.

---

## 4. Jornada do Cliente (detalhada)

### 4.1. Home e acesso ao login

1. Acesse `http://localhost:4200`.
2. Mostre a **Home**, explicando rapidamente o propósito do Click & Cargo.
3. Clique em **“Sou Cliente”** ou vá para `/login` pelo menu.

**Sugestão de imagem:**

- Home com destaque para os botões "Sou Cliente" e "Sou Transportadora".

```markdown
![Home - visão geral](./web/src/assets/manual/home-visao-geral.png)
```

### 4.2. Cadastro rápido (opcional)

- Caso queira ilustrar o fluxo completo, abra a tela de **Cadastro do Cliente** e mostre como seriam preenchidos dados básicos.
- Reforce que, no MVP atual, o foco é a jornada de orçamento e não um cadastro robusto.

### 4.3. Login do Cliente

1. Acesse `/login`.
2. Informe as credenciais do Cliente demo:
   - E-mail: `cliente@clickcargo.com`
   - Senha: `123456`
3. Após o login, o sistema redireciona para o **Dashboard do Cliente**.

**Sugestão de imagem:**

```markdown
![Tela de login - Cliente](./web/src/assets/manual/login-cliente.png)
```

### 4.4. Dashboard do Cliente

No dashboard, destaque:

- Menu lateral com atalhos para:
  - Nova solicitação de orçamento
  - Meus orçamentos
  - Vistoria virtual
  - Seguro mudança
  - Serviços extras (Personal Organizer)
  - Link rápido para WhatsApp
- Cards iniciais mostrando resumo dos pedidos mais recentes.

**Sugestão de imagem:**

```markdown
![Dashboard do Cliente](./web/src/assets/manual/dashboard-cliente.png)
```

### 4.5. Criar um novo pedido de orçamento

1. No menu, clique em **“Nova solicitação”** (rota similar a `/dashboard-cliente/orcamento-novo`).
2. Preencha as informações da mudança, por exemplo:
   - Cidade de origem e destino
   - Data da mudança
   - Tipo de imóvel, andar, existência de elevador etc.
3. Clique em **Enviar**.
4. Explique que o pedido é enviado para a API via `POST /requests` e guardado em memória.

Pontos para reforçar na fala:

- Formulário simples, focado em capturar as principais variáveis de complexidade da mudança.
- Pode ser facilmente estendido para novos campos.

### 4.6. Acompanhar orçamentos recebidos

1. Acesse **“Meus orçamentos”** (`/dashboard-cliente/orcamentos`).
2. O sistema lista as **propostas** (offers) que foram cadastradas pela Transportadora.
3. Cada linha mostra: transportadora, plano, valor, status e ações.

No início da demo, você pode:

- Mostrar que ainda **não há propostas** para o novo pedido.
- Em seguida, trocar para a jornada da Transportadora (seção 5) para criar as propostas.
- Depois voltar para “Meus orçamentos” e atualizar a lista.

**Sugestão de imagem:**

```markdown
![Lista de orçamentos do Cliente](./web/src/assets/manual/cliente-orcamentos-lista.png)
```

### 4.7. Pagar uma proposta (simulado) e recibo fake

1. Na lista de orçamentos, clique em **“Pagar proposta”** em uma das linhas.
2. O sistema navega para a tela de **Pagamento** (`/dashboard-cliente/pagamento/:offerId`).
3. Nesta tela, você vê o resumo da proposta selecionada:
   - Transportadora
   - Plano (Free/Prata/Ouro)
   - Valor
   - Validade da proposta
4. Clique em **“Confirmar pagamento”**.
5. O sistema faz uma chamada `PATCH /offers/:id/status`, marcando a proposta como **aceita**.
6. Em seguida, exibe um **recibo fake** com:
   - Código do pagamento (gerado localmente)
   - Data e hora
   - Dados do cliente demo
   - Dados da transportadora e do plano
   - Observação clara de que é um **recibo de demonstração**.

Mensagem importante para narrar:

- "Após o pagamento, o Click & Cargo notificaria a transportadora e seguiria com o fluxo operacional da mudança" (no MVP isso é apenas simulado).

**Sugestão de imagens:**

```markdown
![Tela de pagamento da proposta](./web/src/assets/manual/cliente-pagamento.png)
![Recibo fake de pagamento](./web/src/assets/manual/cliente-recibo.png)
```

### 4.8. Serviços extras: vistoria virtual

1. No menu do cliente, clique em **“Vistoria virtual”**.
2. A página segue um pequeno fluxo em etapas, por exemplo:
   - Etapa 1: dados básicos da vistoria (endereço, data sugerida etc.).
   - Etapa 2: confirmação/pagamento simulado da vistoria.
   - Etapa 3: tela de confirmação com data, horário e um **link fake de vídeo** para a vistoria.
3. Explique que, na prática, este link poderia ser integrado a Zoom, Meet ou outra solução.
4. Reforce que tudo é registrado em `/service-requests` como tipo `vistoria`.

**Sugestão de imagem:**

```markdown
![Fluxo de Vistoria Virtual](./web/src/assets/manual/cliente-vistoria-virtual.png)
```

### 4.9. Serviços extras: seguro e personal organizer

1. Acesse **Seguro** no menu (`/dashboard-cliente/seguro`).
   - Mostre o formulário simples para cotação de seguro mudança.
   - Explique que a requisição é salva como um `serviceRequest` do tipo `seguro`.
2. Acesse **Serviços extras / Personal Organizer** (`/dashboard-cliente/servicos-extras`).
   - Mostre o formulário para contratar um organizer.
   - Explique que também é registrado em `/service-requests`.

**Sugestão de imagens:**

```markdown
![Formulário de seguro mudança](./web/src/assets/manual/cliente-seguro.png)
![Formulário de personal organizer](./web/src/assets/manual/cliente-organizer.png)
```

---

## 5. Jornada da Transportadora (detalhada)

### 5.1. Login da Transportadora

1. Acesse `/login`.
2. Use as credenciais de transportadora demo:
   - E-mail: `transportadora@clickcargo.com`
   - Senha: `123456`
3. Você será redirecionado para o **Dashboard da Transportadora**.

### 5.2. Dashboard da Transportadora

Destaque no menu lateral:

- Meus pedidos (home com resumo do plano atual)
- Dados da empresa
- **Pedidos recebidos**
- **Minhas propostas**
- **Planos e assinatura**
- **WhatsApp Contato**
- **Ajuda e suporte** (link de e-mail para o time Click & Cargo)

**Sugestão de imagem:**

```markdown
![Dashboard da Transportadora](./web/src/assets/manual/dashboard-transportadora.png)
```

### 5.3. Pedidos recebidos

1. Acesse a tela **“Pedidos recebidos”**.
2. A tabela lista os pedidos de orçamento criados pelos clientes (vindo de `/requests`).
3. Mostre o **campo de filtro** para pesquisar por origem/destino.
4. Em cada linha, há um botão **“Enviar proposta”**.
5. Explique a regra de **limite por plano** (somente no frontend):
   - Plano **Free**: o painel mostra até 5 pedidos após filtro.
   - Plano **Prata**: até 20 pedidos.
   - Plano **Ouro**: sem limite definido.
6. Quando houver mais pedidos do que o plano permite visualizar, aparece uma mensagem “Atenção orçamento” sugerindo o upgrade em *Planos e assinatura*.
7. Comente a mensagem de **atenção aos dados de contato**:
   - O painel não mostra e-mail/telefone do cliente.
   - Após o aceite da proposta, o time Click & Cargo faria o repasse dos dados de contato para a transportadora.

**Sugestão de imagem:**

```markdown
![Lista de pedidos recebidos](./web/src/assets/manual/transportadora-pedidos-recebidos.png)
```

### 5.4. Enviar proposta para um pedido

1. Clique em **“Enviar proposta”** em um dos pedidos.
2. A tela de **formulário de proposta** é aberta (rota do tipo `/dashboard-transportadora/propostas/nova/:requestId`).
3. Preencha:
   - Tipo de plano (Free, Prata, Ouro)
   - Valor proposto
   - Data de validade da proposta
4. Envie o formulário.
5. Explique que isso aciona `POST /offers` na API, adicionando uma nova oferta em memória.

**Sugestão de imagem:**

```markdown
![Formulário de proposta da transportadora](./web/src/assets/manual/transportadora-form-proposta.png)
```

### 5.5. Minhas propostas (lista + indicadores)

1. Acesse a tela **“Minhas propostas”**.
2. A lista mostra as ofertas da transportadora demo, com:
   - Pedido associado
   - Cliente (quando aplicável)
   - Plano, valor, status
3. No topo, destaque os **indicadores**:
   - Total de propostas enviadas
   - Quantas estão com status **aceito** (fechadas)

Explique a dinâmica:

- Quando o Cliente "paga" uma proposta (seção 4.7), o status muda para **aceito**.
- Esses indicadores permitem acompanhar o desempenho da transportadora dentro da plataforma.

**Sugestão de imagem:**

```markdown
![Minhas propostas - lista e indicadores](./web/src/assets/manual/transportadora-minhas-propostas.png)
```

### 5.6. Planos e assinatura

1. Acesse a tela **“Planos e assinatura”**.
2. Mostre os cards dos planos **Free**, **Prata** e **Ouro**.
3. Explique brevemente a diferença conceitual entre eles (quantidade de leads, recursos extras, suporte etc.).
4. Destaque o **resumo do plano atual** no topo (nome do plano, valor mensal e data de validade quando houver).
5. Mostre o fluxo de assinatura:
   - **Free**: botão “Ativar plano Free” (ou “Plano atual” quando já selecionado).
   - **Prata / Ouro**: ao clicar em “Assinar plano Prata/Ouro” abre-se um mini fluxo de pagamento simulado.
   - Ao confirmar o pagamento, o sistema chama `POST /carrier-profile/plan` e atualiza o plano e a validade.
6. Reforce que tudo é **simulado** (não há cobrança real) e que os dados do plano são persistidos apenas em arquivo JSON.

**Sugestão de imagem:**

```markdown
![Planos e assinatura da transportadora](./web/src/assets/manual/transportadora-planos.png)
```

### 5.7. Canais de contato e suporte

1. Mostre o item **“WhatsApp Contato”** no menu.
2. Explique que ele aponta para um link que, em produção, poderia abrir uma conversa com o time Click & Cargo.
3. Mostre o item **“Ajuda e suporte”**, que abre um e-mail para `suporte@clickcargo.com`.
4. Reforce a ideia de **canais diretos** com o time de implantação/parcerias.

---

## 6. O que é real e o que é simulado

Para alinhar expectativas durante a apresentação, é importante deixar claro:

- **Persistência de dados**: todos os dados são mantidos **apenas em memória**.
- **Auth/Login**: não há autenticação real; os logins são perfis fixos de demonstração.
- **Pagamentos**:
  - Não há integração com gateway (Stripe, PayPal, etc.).
  - O pagamento é **totalmente simulado**; serve apenas para mudar o status da proposta e exibir recibo fake.
- **Notificações**:
  - Não há envio real de e-mail, SMS ou push.
  - A lógica de "avisar a transportadora" é conceitual.
- **Vistoria virtual**:
  - Link de vídeo é fictício; não há integração com plataforma de vídeo real.
- **Planos e assinatura**:
   - Não há cobrança de assinatura ou recorrência configurada (pagamento é simulado).
   - O plano (Free/Prata/Ouro) e sua validade são salvos em um arquivo JSON via endpoint `/carrier-profile`, apenas para fins de demonstração.

---

## 7. Dicas de narrativa para a demo

- Comece contando a **história do cliente**:
  - "João está se mudando de cidade e precisa cotar algumas transportadoras..."
- Mostre como o Click & Cargo facilita:
  - Envio do pedido de orçamento em poucos cliques.
  - Recebimento de múltiplas propostas organizadas em uma única tela.
  - Simulação de pagamento e geração de recibo.
  - Contratação de serviços extras para reduzir fricção na mudança.
- Em seguida, troque o ponto de vista para a **Transportadora**:
  - Como ela recebe os pedidos.
  - Como decide o plano e monta a proposta.
  - Como acompanha o funil de propostas enviadas vs. fechadas.
- Termine reforçando que:
  - É um **MVP** que já demonstra bem o potencial do produto.
  - A arquitetura está preparada para receber integrações reais (banco, auth, pagamentos, vídeo, etc.).

---

## 8. Espaços reservados para imagens

Ao longo deste manual foram sugeridas imagens com caminhos na pasta `web/src/assets/manual/`.  
Você pode gerar os screenshots reais no navegador e salvar com os nomes indicados, ou ajustar os nomes conforme sua preferência.

Exemplos de caminhos sugeridos:

- `./web/src/assets/manual/home-visao-geral.png`
- `./web/src/assets/manual/login-cliente.png`
- `./web/src/assets/manual/dashboard-cliente.png`
- `./web/src/assets/manual/cliente-orcamentos-lista.png`
- `./web/src/assets/manual/cliente-pagamento.png`
- `./web/src/assets/manual/cliente-recibo.png`
- `./web/src/assets/manual/cliente-vistoria-virtual.png`
- `./web/src/assets/manual/cliente-seguro.png`
- `./web/src/assets/manual/cliente-organizer.png`
- `./web/src/assets/manual/dashboard-transportadora.png`
- `./web/src/assets/manual/transportadora-pedidos-recebidos.png`
- `./web/src/assets/manual/transportadora-form-proposta.png`
- `./web/src/assets/manual/transportadora-minhas-propostas.png`
- `./web/src/assets/manual/transportadora-planos.png`

Sinta-se à vontade para adaptar, remover ou adicionar novas imagens conforme o nível de detalhe desejado na apresentação.
