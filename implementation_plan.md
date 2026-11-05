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
