from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import cm
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase import pdfmetrics
from pathlib import Path
from datetime import date

ROOT = Path(__file__).parents[2]
OUT = ROOT / 'docs/security-audit/relatorio-auditoria-seguranca.pdf'
OUT.parent.mkdir(parents=True, exist_ok=True)

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name='Cover', parent=styles['Title'], alignment=TA_CENTER, fontSize=24, leading=30, textColor=colors.HexColor('#B91C1C'), spaceAfter=18))
styles.add(ParagraphStyle(name='Small', parent=styles['BodyText'], fontSize=8.5, leading=11))
styles.add(ParagraphStyle(name='Finding', parent=styles['BodyText'], fontSize=9, leading=12, spaceAfter=8))

def footer(canvas, doc):
    canvas.saveState()
    canvas.setFont('Helvetica', 8)
    canvas.setFillColor(colors.HexColor('#64748B'))
    canvas.drawString(2*cm, 1.1*cm, 'Auditoria do Mercadinho Brisa Mar')
    canvas.drawRightString(A4[0]-2*cm, 1.1*cm, f'Página {doc.page}')
    canvas.restoreState()

story = [
    Spacer(1, 4*cm),
    Paragraph('Relatório de Auditoria', styles['Cover']),
    Paragraph('Mercadinho Brisa Mar', styles['Title']),
    Spacer(1, 1*cm),
    Paragraph(f'Data: {date.today().strftime("%d/%m/%Y")}<br/>Escopo: segurança, funcionamento e UX/interface<br/>Stack: Next.js 15, React 19, TypeScript, Tailwind CSS, Google Maps', styles['BodyText']),
    Spacer(1, 2*cm),
    Paragraph('Metodologia: inspeção do código rastreado, configuração, assets, referências de segurança e scripts disponíveis. Não foram inferidos problemas além das evidências encontradas.', styles['BodyText']),
    PageBreak(),
    Paragraph('Resumo executivo', styles['Heading1']),
    Paragraph('Foram confirmados 5 achados: 1 média, 3 baixas e 1 informativa. Não foram identificados handlers de backend, banco, autenticação, isolamento de dados, IDOR ou sinks de XSS no código auditado.', styles['BodyText']),
    Spacer(1, 10),
    Table([['Severidade', 'Quantidade'], ['Média', '1'], ['Baixa', '3'], ['Informativa', '1']], colWidths=[8*cm, 4*cm], style=TableStyle([('GRID',(0,0),(-1,-1),0.4,colors.HexColor('#CBD5E1')),('BACKGROUND',(0,0),(-1,0),colors.HexColor('#B91C1C')),('TEXTCOLOR',(0,0),(-1,0),colors.white),('PADDING',(0,0),(-1,-1),7)])),
    Spacer(1, 14),
    Paragraph('Pontos positivos', styles['Heading2']),
    Paragraph('Uso de rel="noopener noreferrer" nos links externos; ausência de HTML injetado, eval/new Function e endpoints próprios; chave do Google Maps referenciada por variável NEXT_PUBLIC em vez de valor literal; TypeScript com erros de build não ignorados.', styles['BodyText']),
    Paragraph('Principais fragilidades', styles['Heading2']),
    Paragraph('Assets locais usam caminhos públicos incorretos; o mapa aceita chave vazia e pode falhar em produção; o documento está marcado como inglês; Facebook e Instagram apontam para #.', styles['BodyText']),
    PageBreak(),
    Paragraph('Achados verificados', styles['Heading1']),
]

findings = [
    ('MÉDIA - Imagens locais não carregam', 'Funcionamento / UX', 'components/mercadinho-brisa-mar.tsx:93, 112, 121, 192, 200, 208', 'As referências usam /public/... e /src/... . No Next.js, arquivos em public são servidos a partir de / e arquivos em src/assets não são URLs públicas sem importação. As imagens de hero, galeria e serviços ficam quebradas em produção.', 'Mover os assets para public/assets e referenciar /assets/... ou importar imagens de src/assets via next/image.'),
    ('BAIXA - Mapa pode falhar silenciosamente', 'Funcionamento', 'components/mercadinho-brisa-mar.tsx:11, 160', 'NEXT_PUBLIC_GOOGLE_MAPS_API_KEY usa fallback vazio e é passado ao APIProvider. Sem variável configurada ou com restrição inválida, o mapa não renderiza corretamente.', 'Validar a configuração no deploy e exibir estado alternativo com endereço/link quando a chave estiver ausente; restringir a chave por domínio e APIs.'),
    ('BAIXA - Idioma declarado incorretamente', 'UX / acessibilidade', 'app/layout.tsx:15', 'O conteúdo está em português, mas o elemento html declara lang="en". Leitores de tela e mecanismos de busca podem aplicar pronúncia e classificação erradas.', 'Alterar para lang="pt-BR".'),
    ('BAIXA - Links sociais sem destino', 'Funcionamento / UX', 'components/mercadinho-brisa-mar.tsx:300-301', 'Facebook e Instagram usam href="#", levando o usuário ao topo da página e simulando ações que não funcionam.', 'Substituir pelos perfis reais ou remover os botões até que existam URLs válidas.'),
    ('INFORMATIVA - Verificação automatizada indisponível', 'Qualidade', 'package.json:scripts', 'npm run lint e npm run build não puderam ser executados porque as dependências locais não estão instaladas (eslint e next não reconhecidos).', 'Instalar dependências com o gerenciador oficial do projeto e executar lint/build no CI.'),
]
for title, category, loc, evidence, fix in findings:
    story += [Paragraph(f'<b>{title}</b> ({category})', styles['Finding']), Paragraph(f'<b>Local:</b> {loc}<br/><b>Evidência:</b> {evidence}<br/><b>Correção:</b> {fix}', styles['Finding']), Spacer(1, 5)]

story += [PageBreak(), Paragraph('Cobertura de segurança', styles['Heading1']), Paragraph('Banco sem tranca: não aplicável; não há banco nem consultas. Permissões no navegador: não há operações administrativas ou sensíveis. IDOR: não há objetos/rotas de dados. Chaves expostas: nenhum segredo real foi encontrado; .env.example contém apenas placeholders. XSS/injeção: não foram encontrados innerHTML, dangerouslySetInnerHTML, eval ou new Function; o conteúdo exibido é estático.', styles['BodyText']), Spacer(1, 12), Paragraph('Recomendações priorizadas', styles['Heading2']), Paragraph('1. Corrigir imediatamente os caminhos das imagens.<br/>2. Tornar o mapa resiliente à ausência da chave e configurar restrições da API.<br/>3. Corrigir lang para pt-BR e remover/substituir links sociais fictícios.<br/>4. Instalar dependências e adicionar lint/build ao CI antes do deploy.', styles['BodyText']), Spacer(1, 16), Paragraph('ISSUES PARA O GITHUB', styles['Heading1']), Paragraph('Não foram criadas issues. Abaixo estão blocos sugeridos, sem publicação automática.', styles['BodyText']), Spacer(1, 8)]
for title, _, loc, evidence, fix in findings[:4]:
    story.append(Paragraph(f'<b>Título:</b> {title}<br/><b>Local:</b> {loc}<br/><b>Problema:</b> {evidence}<br/><b>Correção:</b> {fix}', styles['Small']))
    story.append(Spacer(1, 8))

doc = SimpleDocTemplate(str(OUT), pagesize=A4, rightMargin=2*cm, leftMargin=2*cm, topMargin=2*cm, bottomMargin=1.8*cm, title='Relatório de Auditoria - Mercadinho Brisa Mar')
doc.build(story, onFirstPage=footer, onLaterPages=footer)
print(OUT)
