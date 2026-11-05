# Relatório de Auditoria de Segurança e Qualidade - Mercadinho Brisa Mar

**Data:** 04 de Novembro de 2026
**Status:** Concluído
**Versão:** 1.0.0

## 1. Escopo da Auditoria
Avaliação técnica do site "Mercadinho Brisa Mar" focado em segurança de dados, integridade de fluxos e experiência do usuário (UX).

## 2. Resultados de Segurança

### 2.1 Gestão de Segredos e API Keys
- **Google Maps API:** A chave está configurada via variável de ambiente `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`.
- **Exposição:** Não foram encontrados segredos (tokens, senhas) hardcoded no repositório.
- **Recomendação:** Garantir que a chave do Google Maps no Console do GCP esteja restrita por domínio (referenciador HTTP) para evitar uso indevido por terceiros.

### 2.2 Validação de Entradas (XSS/Injeção)
- **Sanitização:** O uso de React e Next.js nativamente protege contra a maioria dos ataques de XSS ao fazer o escape automático de conteúdo dinâmico.
- **Formulário de Pedido:** A lógica em `lib/whatsapp-order.ts` valida tipos e presença de campos obrigatórios antes de gerar o link.
- **Risco:** Baixo.

### 2.3 Privacidade e LGPD
- **Coleta de Dados:** O site não armazena dados em banco de dados próprio (stateless).
- **Trânsito de Dados:** Os dados do pedido (bairro, endereço, produtos) são passados via URL para o WhatsApp.
- **Risco:** Baixo, mas recomenda-se adicionar um aviso de que os dados são processados apenas para a finalidade do pedido.

## 3. Funcionalidade e Bugs

### 3.1 Fluxo de Pedido
- **WhatsApp:** O link é gerado corretamente com formatação em Markdown (negritos e listas) para facilitar a leitura pelo atendente.
- **Vasilhame:** O campo de troca/compra de vasilhame está implementado conforme as diretrizes estratégicas.

### 3.2 Mobile-First
- **Ajustes:** Áreas de toque (buttons e inputs) foram ampliadas para facilitar o uso em dispositivos móveis.
- **Status da Loja:** Implementada lógica dinâmica para exibir "Aberto" ou "Fechado" baseado no horário local do cliente.

## 4. Recomendações Priorizadas

1. **[ALTA] Restrição de API Key:** Configurar restrições de IP/Domínio no Google Cloud Console.
2. **[MÉDIA] SEO e PWA:** Implementar `manifest.json` para permitir instalação como Web App, melhorando o acesso recorrente de moradores.
3. **[BAIXA] Selos Regulatórios:** Validar e inserir o registro real da ANP para o comércio de gás assim que disponível.

## 5. Conclusão
O projeto encontra-se estável, seguro para a finalidade de checkout via WhatsApp e alinhado com a identidade visual da fachada real.
