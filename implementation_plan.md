# Plano de Auditoria Completa do Site

## Escopo

Auditar o projeto nas dimensões de segurança, funcionamento e UX/interface, usando o estado atual do repositório.

## Etapas

1. Identificar stack, scripts, rotas, autenticação, banco, integrações e configuração de deploy.
2. Mapear todas as rotas/backend handlers e cruzá-las com os controles de frontend.
3. Verificar segurança: isolamento de dados, autorização server-side, IDOR, segredos expostos e XSS/injeção.
4. Verificar bugs: fluxos críticos, validações, estados de erro/loading, chamadas de API e build/lint/testes disponíveis.
5. Verificar UX/interface: responsividade, acessibilidade básica, consistência visual, navegação e feedback ao usuário.
6. Executar verificações reproduzíveis e registrar somente problemas confirmados, com arquivo e linha quando aplicável.
7. Produzir relatório em português com achados priorizados, evidências, pontos positivos, limitações e recomendações.
8. Gerar e inspecionar visualmente o PDF de auditoria em `docs/security-audit/relatorio-auditoria-seguranca.pdf`, conforme o padrão da auditoria de segurança.

## Entregáveis

- Relatório completo de auditoria.
- PDF de segurança em `docs/security-audit/relatorio-auditoria-seguranca.pdf`.
- Lista priorizada de correções, sem criar issues no GitHub sem autorização explícita.

## Critérios de parada

- Não alterar comportamento do produto durante a auditoria.
- Não expor valores de segredos; evidências serão redigidas.
- Se uma verificação falhar duas vezes pelo mesmo motivo, interromper e reportar o bloqueio.

## Extensão aprovada: identidade visual e mídia local

1. Usar a foto anexada da fachada como referência visual e imagem principal, sem inventar informações comerciais.
2. Preservar a paleta observada na fachada: vermelho/coral, branco e azul-marinho, com apoio neutro.
3. Corrigir as referências de imagens locais e substituir imagens genéricas/quebradas por mídia local disponível.
4. Atualizar o mapa e os links de localização para o ponto GPS informado: -2.9013541, -41.6201847.
5. Melhorar o layout da landing page para refletir a fachada, destacar WhatsApp, localização e serviços.
6. Validar com lint/build se as dependências estiverem disponíveis e fazer inspeção visual do resultado.

## Extensão aprovada: conteúdo comercial e posicionamento

1. Reorganizar o hero com a proposta "Sua Entrega Rápida em Luís Correia" e CTA direto para WhatsApp.
2. Apresentar os três pilares: água mineral 20L, gás P13 e mercadorias/conveniência.
3. Reforçar o fluxo de compra em três etapas e as formas de pagamento informadas.
4. Destacar as regiões atendidas: Atalaia, Coqueiro, Peito de Moça, Macapá, Centro e bairros vizinhos.
5. Manter horários, WhatsApp e localização no mapa; não inventar endereço físico além do que já foi fornecido.
6. Incorporar a proposta de valor de varejo de proximidade e entrega rápida litorânea sem alegações não verificadas.

## Extensão aprovada: guia visual e experiência mobile-first

1. Aplicar vermelho Brisa Mar como cor primária, laranja para gás/ofertas, branco como base e verde apenas para WhatsApp.
2. Criar no cabeçalho um símbolo vetorial simples com onda, gota e chama usando ícones existentes, sem afirmar um registro de marca.
3. Usar tipografia sans-serif moderna e reforçar contraste, legibilidade e áreas de toque em telas móveis.
4. Adicionar status visual da loja e atalhos de um clique para Água 20L e Gás P13.
5. Adicionar busca visual para itens de mercearia/conveniência; sem implementar checkout ou estoque sem backend real.
6. Destacar atendimento, regiões e localização; deixar ANP e selos de segurança como campos pendentes, sem inventar registros.
7. Avaliar manifest/PWA somente se houver configuração compatível no projeto; não prometer funcionamento offline sem implementação.

## Diretrizes estratégicas derivadas da pesquisa regional

1. Posicionar o site como canal D2C local para unificar água 20L, gás P13, mercearia e conveniência em um único pedido.
2. Priorizar WhatsApp como checkout inicial, com mensagem estruturada contendo itens, quantidades, endereço, bairro, vasilhame e forma de pagamento.
3. Criar um modelo de frete por setor: atendimento prioritário no Residencial Brisa Mar e Peito de Moça; expansão controlada para Coqueiro, Atalaia, Macapá e Barro Preto.
4. Implementar troca/devolução de vasilhame como campo explícito do pedido, sem automatizar regras comerciais antes de validação dos proprietários.
5. Manter a primeira versão leve e mobile-first; avaliar PWA/cache apenas após confirmar que melhora o uso em conexões instáveis.
6. Criar experiências específicas para moradores (reposição recorrente de água/gás) e turistas (kits de praia, casa de temporada e churrasco).
7. Não competir inicialmente por catálogo ou preço com redes de Parnaíba; competir por rapidez, proximidade, pedido unificado e atendimento humano.
8. Validar antes de publicar qualquer promessa de prazo, taxa, cobertura, Pix, estoque, registro regulatório ou disponibilidade de plataforma terceira.

## Extensão aprovada: mídia pública do Google Maps

1. Usar a foto local fornecida pelo usuário como asset estável da fachada.
2. Adicionar um bloco de “Tour no Google Maps” com link oficial para a experiência pública do estabelecimento.
3. Usar a localização e o Street View como CTA/galeria externa, sem depender de URL temporária de imagem do Google.
4. Não incorporar ou baixar vídeo protegido/dinâmico sem arquivo original ou autorização explícita; se o usuário fornecer o arquivo, otimizar e hospedar no projeto.
5. Atualizar a galeria com fotos locais estáveis e textos alternativos descritivos.
