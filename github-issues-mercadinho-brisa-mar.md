# Especificação de GitHub Issues — Mercadinho Brisa Mar

Este documento apresenta o mapeamento completo das **9 GitHub Issues** estruturadas para o repositório `0xphygames/Mercado`. As tarefas foram divididas em 3 Epics principais para cobrir a implementação da identidade visual **Vermelho Brisa Mar**, as funcionalidades de checkout de água, gás e mercearia, além da otimização de PWA e SEO local para Luís Correia - PI.

---

## 📌 Epic 1: Identidade Visual e Red Branding (`Red Theme`)

### Issue #1: [UI/UX] Implementação da Identidade Visual Vermelho Brisa Mar (Tailwind & Config)

* **Labels**: `ui/ux`, `enhancement`, `priority:high`
* **User Story**: Como visitante do site, quero identificar a marca do Mercadinho Brisa Mar em vermelho vibrante e laranja, para reconhecer a identidade visual da loja no ambiente digital e físico.
* **Descrição Técnica**:
  * Atualizar o arquivo de configuração do Tailwind CSS (`tailwind.config.js`) no repositório `0xphygames/Mercado`.
  * Configurar a nova paleta de cores:
    * **Vermelho Primário**: `#D32F2F` (Red 700) e `#E50914`
    * **Laranja Secundário**: `#FF8C00` (Gás GLP e Alertas de Oferta)
    * **Escuro Neutro**: `#1E1E1E`
    * **Claro Neutro**: `#F8F9FA`
    * **Verde Ação / WhatsApp**: `#25D366`
  * Substituir componentes e elementos visuais que utilizavam azul por classes utilitárias baseadas na nova paleta.
* **Tarefas de Implementação**:
  * [ ] Atualizar `tailwind.config.js` com o objeto de cores da marca.
  * [ ] Atualizar componentes de Header, Navbar, Botões, Cards e Footer.
  * [ ] Validar contraste WCAG AA em botões e elementos de texto.
* **Critérios de Aceite**:
  * 100% das páginas refletem a nova paleta em vermelho e laranja.
  * Testes de contraste de acessibilidade aprovados.

---

### Issue #2: [UI/UX] Reestruturação da Header e Hero Section com Destaque para Água e Gás

* **Labels**: `ui/ux`, `frontend`, `priority:high`
* **User Story**: Como morador ou veranista em Luís Correia, quero visualizar o status de atendimento da loja e ter acesso rápido aos serviços essenciais na abertura do site.
* **Descrição Técnica**:
  * Redesenhar o componente `HeroSection` e `Header`.
  * Adicionar indicador dinâmico de status (*"Aberto - Entregando Agora em Luís Correia"*).
  * Manter a barra de navegação fixa no topo (*sticky header*) com fundo em Vermelho Brisa Mar (`#D32F2F`).
* **Tarefas de Implementação**:
  * [ ] Criar o componente `StoreStatusBadge.tsx`.
  * [ ] Atualizar `Header.tsx` responsivo para telas móveis e desktop.
  * [ ] Exibir o carrinho flutuante com contador em tempo real.
* **Critérios de Aceite**:
  * Header fixo com fácil navegação no celular.
  * Badge visual indicando loja aberta com sinalizador verde.

---

## 🛒 Epic 2: Regras de Negócio e Checkout de Conversão (Água + Gás + Mercearia)

### Issue #3: [FE/Checkout] Componente Seletor de Troca de Vasilhames e Cascos Vazio (Água 20L e GLP P13)

* **Labels**: `feature`, `checkout`, `business-logic`, `priority:critical`
* **User Story**: Como comprador de água mineral ou gás de cozinha, quero selecionar se possuo casco vazio para devolução ou se preciso adquirir um casco novo, evitando problemas no momento da entrega.
* **Descrição Técnica**:
  * Criar o componente `VasilhameSelector.tsx` integrado aos itens de Água 20L e Gás P13.
  * Adicionar propriedade no estado do carrinho para controlar a presença do casco vazio.
  * Adicionar cobrança de taxa configurável caso o cliente marque que não possui o casco para troca.
* **Tarefas de Implementação**:
  * [ ] Criar seletor com as opções "Com Troca de Casco" e "Sem Troca (Comprar Casco Novo)".
  * [ ] Atualizar o cálculo do subtotal do item no carrinho de compras.
  * [ ] Exibir aviso sobre a validade de 5 anos exigida para garrafões de água 20L.
* **Critérios de Aceite**:
  * Seleção obrigatória para itens das categorias de Água e Gás.
  * O subtotal é ajustado automaticamente ao selecionar a opção sem casco.

---

### Issue #4: [FE/Checkout] Botões de Pedido Expresso 1-Clique na Hero Section

* **Labels**: `feature`, `ux`, `conversion`, `priority:high`
* **User Story**: Como cliente com urgência de água ou gás, quero clicar em um botão de 1-Clique na tela inicial para ir direto ao checkout.
* **Descrição Técnica**:
  * Adicionar o widget `ExpressOrderWidget.tsx` na Hero Section.
  * Disponibilizar atalhos diretos:
    * *"Pedir Água 20L Agora"*
    * *"Pedir Gás P13 Agora"*
  * Ao clicar, o item é inserido no carrinho e o usuário é direcionado para a etapa de finalização.
* **Tarefas de Implementação**:
  * [ ] Desenvolver botões de destaque na Hero Section.
  * [ ] Configurar redirecionamento rápido para a tela de checkout.
* **Critérios de Aceite**:
  * Conclusão do pedido em menos de 3 cliques até a abertura do WhatsApp.

---

### Issue #5: [BE/Integration] Formatador de Payload Automático para Checkout via WhatsApp

* **Labels**: `backend`, `integration`, `whatsapp`, `priority:critical`
* **User Story**: Como atendente do Mercadinho Brisa Mar, quero receber no WhatsApp da loja os pedidos formatados com itens, trocos, vasilhames e endereço completo de Luís Correia.
* **Descrição Técnica**:
  * Desenvolver a função auxiliar `generateWhatsAppMessage.ts`.
  * Construir texto formatado contendo:
    * Lista de produtos e quantidades;
    * Informação de devolução de vasilhames (Com/Sem troca);
    * Endereço em Luís Correia com bairro e ponto de referência;
    * Forma de pagamento (Pix, Cartão ou Dinheiro com troco).
* **Tarefas de Implementação**:
  * [ ] Criar função de formatação do texto da mensagem.
  * [ ] Gerar link dinâmico para abertura direta do chat no WhatsApp.
* **Critérios de Aceite**:
  * Mensagem recebida no WhatsApp organizada com quebras de linha e dados completos.

---

### Issue #6: [FE/Checkout] Módulo de Tabela de Frete Setorizado por Bairros (Geofencing)

* **Labels**: `feature`, `checkout`, `logistics`, `priority:medium`
* **User Story**: Como morador ou turista em Luís Correia, quero selecionar meu bairro em um menu suspenso para saber a taxa de entrega e o tempo estimado.
* **Descrição Técnica**:
  * Desenvolver o componente `DeliveryZoneSelector.tsx`.
  * Mapear zonas de entrega da região:
    * **Zona 1**: Residencial Brisa Mar e Peito de Moça (Entrega Rápida / 15-25 min);
    * **Zona 2**: Praia do Coqueiro e Farol Velho (25-40 min);
    * **Zona 3**: Centro de Luís Correia, Macapá e Barro Preto (35-50 min).
* **Tarefas de Implementação**:
  * [ ] Criar o arquivo de configuração `deliveryZones.json`.
  * [ ] Integrar a taxa selecionada ao valor total do carrinho.
* **Critérios de Aceite**:
  * Atualização imediata do frete e total do pedido conforme o bairro selecionado.

---

## ⚡ Epic 3: PWA, Desempenho Offline, SEO Local & Catálogo Especializado

### Issue #7: [PWA/Performance] Configuração de Service Worker e Cache Strategy para Redes Litorâneas

* **Labels**: `pwa`, `performance`, `offline`, `priority:high`
* **User Story**: Como cliente nas praias de Luís Correia com sinal de celular fraco, quero que o catálogo e o carrinho do site funcionem sem travamentos.
* **Descrição Técnica**:
  * Configurar Service Workers com suporte a cache de assets estáticos e imagens.
  * Adicionar manifesto de aplicação (`manifest.json`) com suporte a instalação na tela inicial móvel.
* **Tarefas de Implementação**:
  * [ ] Criar `manifest.json` com os dados e ícones da marca.
  * [ ] Registrar o Service Worker com estratégia *Stale-While-Revalidate*.
* **Critérios de Aceite**:
  * Carregamento do catálogo e carrinho mantidos mesmo sem conexão ativa.

---

### Issue #8: [SEO/SEO Local] Otimização de Meta Tags, Structured Data e SEO Local para Luís Correia

* **Labels**: `seo`, `marketing`, `frontend`, `priority:medium`
* **User Story**: Como turista buscando no Google por entregas em Luís Correia, quero encontrar o Mercadinho Brisa Mar nos primeiros resultados de busca.
* **Descrição Técnica**:
  * Adicionar meta tags de OpenGraph, Twitter Cards e dados estruturados Schema.org (`LocalBusiness`).
  * Incluir termos de busca locais (Residencial Brisa Mar, Praia do Coqueiro, Peito de Moça, entrega de água e gás).
* **Tarefas de Implementação**:
  * [ ] Criar o componente `SEOHead.tsx` com tags de localização.
  * [ ] Inserir dados estruturados JSON-LD no cabeçalho do site.
* **Critérios de Aceite**:
  * Validação no teste de resultados enriquecidos do Google sem inconsistências.

---

### Issue #9: [Catalog/Mercearia] Categoria de Kits de Praia, Churrasco e Pescados Embalados a Vácuo

* **Labels**: `catalog`, `feature`, `content`, `priority:medium`
* **User Story**: Como veranista hospedado em casa de praia, quero comprar combos de churrasco, gelo, cervejas geladas e pescados limpos embalados a vácuo com praticidade.
* **Descrição Técnica**:
  * Estruturar no catálogo as novas categorias de produto:
    * `Kits de Praia & Churrasco`
    * `Pescados & Frutos do Mar Embalados a Vácuo`
* **Tarefas de Implementação**:
  * [ ] Cadastrar os produtos e combos no arquivo `products.json`.
  * [ ] Adicionar navegação por categorias na loja.
* **Critérios de Aceite**:
  * Produtos e kits visíveis e filtráveis na vitrine do site.

---

## 📜 Resumo das Issues para GitHub CLI

Para criar as 9 issues no repositório `0xphygames/Mercado`, utilize os títulos e labels padronizados:

1. **[UI/UX] Implementação da Identidade Visual Vermelho Brisa Mar (Tailwind & Config)** (`ui/ux`, `enhancement`, `priority:high`)
2. **[UI/UX] Reestruturação da Header e Hero Section com Destaque para Água e Gás** (`ui/ux`, `frontend`, `priority:high`)
3. **[FE/Checkout] Seletor de Troca de Vasilhames e Cascos Vazio (Água 20L e GLP P13)** (`feature`, `checkout`, `business-logic`, `priority:critical`)
4. **[FE/Checkout] Botões de Pedido Expresso 1-Clique na Hero Section** (`feature`, `ux`, `conversion`, `priority:high`)
5. **[BE/Integration] Formatador de Payload Automático para Checkout via WhatsApp** (`backend`, `integration`, `whatsapp`, `priority:critical`)
6. **[FE/Checkout] Módulo de Tabela de Frete Setorizado por Bairros (Geofencing)** (`feature`, `checkout`, `logistics`, `priority:medium`)
7. **[PWA/Performance] Service Worker e Cache Strategy para Redes Litorâneas** (`pwa`, `performance`, `offline`, `priority:high`)
8. **[SEO/SEO Local] Otimização de Meta Tags, Structured Data e SEO Local para Luís Correia** (`seo`, `marketing`, `frontend`, `priority:medium`)
9. **[Catalog/Mercearia] Categoria de Kits de Praia, Churrasco e Pescados a Vácuo** (`catalog`, `feature`, `content`, `priority:medium`)
