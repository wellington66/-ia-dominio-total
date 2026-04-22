/**
 * Gerador de 2.000 prompts organizados e úteis.
 * Produz o arquivo 2000-prompts.html pronto para consumo.
 */
const fs = require('fs');
const path = require('path');

const nichos = [
  'e-commerce de moda feminina', 'infoproduto de emagrecimento', 'psicólogo clínico',
  'advogado tributarista', 'nutricionista esportivo', 'agência de marketing digital',
  'dentista', 'academia', 'loja de produtos naturais', 'arquiteto de interiores',
  'coach de carreira', 'confeitaria gourmet', 'barbearia masculina', 'pet shop',
  'consultor financeiro', 'professor particular de inglês', 'personal trainer',
  'loja de eletrônicos', 'imobiliária', 'viagens e turismo'
];

const publicos = [
  'mulheres de 30 a 45 anos classe B', 'homens de 25 a 40 anos', 'jovens de 18 a 25 anos',
  'mães de primeira viagem', 'empreendedores iniciantes', 'profissionais liberais',
  'aposentados ativos', 'universitários', 'executivos de alta renda', 'microempresários locais'
];

const categorias = [
  {
    id: 'copywriting',
    nome: '✍️ Copywriting e Escrita Persuasiva',
    icone: '✍️',
    templates: [
      'Aja como um copywriter sênior de resposta direta. Escreva uma carta de vendas de 1500 palavras para {nicho}, dirigida a {publico}. Use o framework AIDA, inclua 3 objeções antecipadas e feche com garantia de 7 dias.',
      'Crie 10 variações de headline magnética para {nicho}. Use as fórmulas: pergunta provocativa, promessa + prazo, segredo revelado, contradição e prova social. Público: {publico}.',
      'Escreva uma sequência de 7 e-mails de vendas para {nicho}. Primeiro e-mail: pesadelo do público. Último: urgência final. Tom: {publico}. Cada e-mail 200-300 palavras.',
      'Gere 20 bullets de benefícios irresistíveis para {nicho}. Não descreva features — transforme cada em impacto emocional para {publico}.',
      'Crie um texto VSL de 12 minutos para {nicho}, público {publico}. Estrutura: promessa → história → mecanismo → prova → oferta → urgência → CTA.',
      'Escreva 5 posts de redes sociais para {nicho} usando storytelling. Primeira pessoa, vulnerável, terminando com lição universal para {publico}.',
      'Gere 3 anúncios Meta Ads para {nicho}, cada um em formato diferente: provocativo, prova social, benefício direto. Público: {publico}.',
      'Reescreva minha copy atual tornando-a 50% mais emocional sem perder clareza. Nicho: {nicho}. Público: {publico}.',
      'Crie uma página "Sobre nós" autêntica para {nicho} que conecte com {publico}. Evite clichês corporativos.',
      'Escreva 10 ganchos virais de 3 segundos para TikTok/Reels sobre {nicho}. Cada um deve criar curiosidade incompleta.'
    ]
  },
  {
    id: 'vendas',
    nome: '💼 Vendas e Negociação',
    icone: '💼',
    templates: [
      'Aja como consultor de vendas. Crie um script de abordagem por WhatsApp para {nicho} dirigido a {publico}. Curto, não-invasivo, com 3 perguntas que qualifiquem.',
      'Gere 15 quebras de objeção comuns para {nicho}: "está caro", "vou pensar", "não é o momento", "já tenho", etc. Respostas de 2 linhas cada.',
      'Crie uma sequência de follow-up de 14 dias (WhatsApp) para leads frios de {nicho}. Cada mensagem tem objetivo claro. Público: {publico}.',
      'Monte um pitch de elevador de 30 segundos para {nicho} dirigido a {publico}. Deve gerar pergunta de volta.',
      'Elabore um discurso de fechamento de alta pressão (ético) para {nicho}, último "não" do cliente, preservando relação.',
      'Crie 10 perguntas de descoberta SPIN Selling para venda consultiva em {nicho}. Público: {publico}.',
      'Gere um script de ligação fria de 60 segundos para {nicho}, com branching se o lead disser "não tenho interesse".',
      'Crie um plano de prospecção diária (manhã + tarde) para vendedor solo de {nicho} mirando {publico}. Metas semanais.',
      'Monte um guia de venda por vídeo-chamada de 20 min para {nicho}: agenda, perguntas, demo, oferta, objeções, fechamento.',
      'Escreva 5 scripts de abordagem no Instagram DM para {nicho} que não pareçam spam. Público: {publico}.'
    ]
  },
  {
    id: 'marketing',
    nome: '📈 Marketing e Posicionamento',
    icone: '📈',
    templates: [
      'Crie uma estratégia de posicionamento em 1 página para {nicho}. Inclua categoria, único, promessa, prova, persona {publico} e linha editorial.',
      'Desenhe um funil completo (topo, meio, fundo) para {nicho} com 3 conteúdos por etapa, canal sugerido e CTA. Público: {publico}.',
      'Gere um calendário editorial de 30 dias no Instagram para {nicho}, distribuído em 40% educativo, 30% humano, 20% oferta, 10% prova.',
      'Crie 5 ideias de campanha sazonal para {nicho} no próximo semestre, com orçamento baixo (<R$ 5k) mirando {publico}.',
      'Faça um SWOT detalhado para {nicho} no mercado brasileiro. Identifique 3 oportunidades não óbvias.',
      'Desenhe uma matriz de jornada do cliente de {nicho}, 5 etapas, com dor, pensamento, ação e gap de oportunidade em cada.',
      'Crie um briefing criativo completo para agência produzir uma campanha de {nicho} para {publico}.',
      'Liste 20 pontos de contato (touchpoints) que {publico} tem até comprar de {nicho}. Marque os 3 mais subaproveitados.',
      'Crie 3 conceitos de campanha disruptivos para {nicho}, com nome, conceito, peça-chefe e métrica de sucesso.',
      'Gere um plano de lançamento de 21 dias para um novo produto em {nicho}, dirigido a {publico}. Semana 1 aquecimento, 2 pré, 3 abertura.'
    ]
  },
  {
    id: 'trafego',
    nome: '🎯 Tráfego Pago (Meta, Google, TikTok)',
    icone: '🎯',
    templates: [
      'Crie 10 copies para Meta Ads de {nicho}, 5 para prospecção e 5 para remarketing. Público-alvo: {publico}. Cada uma <500 caracteres.',
      'Monte estrutura de campanha Meta Ads para {nicho}: 3 conjuntos, 3 anúncios por conjunto, CBO, orçamento de R$ 100/dia.',
      'Gere 5 ideias de criativo UGC para {nicho} com roteiros de 20s (PGPG). Público: {publico}.',
      'Crie 10 palavras-chave de cauda longa para Google Ads em {nicho} com alto intuito de compra. Público: {publico}.',
      'Escreva uma estrutura de landing page para campanha Meta Ads de {nicho}. CTR esperada e conversão alvo. Público: {publico}.',
      'Monte um plano de teste A/B de 14 dias para {nicho}: variáveis, tamanho da amostra, critério de decisão.',
      'Crie 5 anúncios TikTok Ads de 15s para {nicho}. Tom nativo da plataforma. Público: {publico}.',
      'Escreva um relatório de diagnóstico de campanha Meta travada em {nicho}: 5 hipóteses ordenadas por probabilidade e como testar cada.',
      'Gere 3 ângulos diferentes de criativo para {nicho}: dor, desejo, ameaça. Com headlines e primeiras linhas.',
      'Crie uma escada de valor para {nicho}: isca grátis, tripwire R$ 17, core R$ 197, high-ticket R$ 1.997. Público: {publico}.'
    ]
  },
  {
    id: 'negocios',
    nome: '🏢 Estratégia e Negócios',
    icone: '🏢',
    templates: [
      'Aja como consultor de McKinsey. Analise o modelo de negócio de {nicho} e aponte 3 pontos de alavancagem não explorados.',
      'Crie um plano de negócio lean canvas de 1 página para {nicho} mirando {publico}.',
      'Identifique os 5 indicadores (KPIs) mais importantes para {nicho} no primeiro ano. Fórmula e meta para cada.',
      'Liste 10 modelos de monetização que {nicho} pode implementar além do atual. Pros e contras.',
      'Crie um mapa de concorrência com 5 players de {nicho}, posicionando cada em dimensões preço vs qualidade e generalista vs especialista.',
      'Gere um plano de contratação para {nicho} crescer de 1 para 5 pessoas em 12 meses. Ordem de contratação e perfil.',
      'Elabore 5 cenários de crise para {nicho} e plano de resposta para cada. Público afetado: {publico}.',
      'Desenhe uma estrutura de preços em 3 tiers para {nicho}: entrada, popular, premium. Com anchors e objetivo de cada.',
      'Liste 20 fontes de receita possíveis para {nicho}. Priorize as 5 com maior ROI esperado nos próximos 90 dias.',
      'Crie uma projeção financeira simples (12 meses) para {nicho}: receita, custo fixo, variável, break-even.'
    ]
  },
  {
    id: 'produtividade',
    nome: '⏱️ Produtividade e Gestão Pessoal',
    icone: '⏱️',
    templates: [
      'Crie uma rotina de alta performance para quem atua em {nicho}. Manhã, tarde, noite. Integrada com IA.',
      'Monte um sistema de priorização (matriz de Eisenhower) para a semana de um profissional de {nicho}. 10 tarefas exemplo.',
      'Gere um checklist de 10 itens que eliminam reuniões inúteis em {nicho}. Público: {publico}.',
      'Sugira 5 automações com IA para liberar 10h/semana em {nicho}. Com ferramentas e tempo de setup.',
      'Crie um sistema de revisão semanal (sexta-feira) para profissional de {nicho}. 7 perguntas, 15 minutos.',
      'Monte um plano de 30 dias para parar de procrastinar em {nicho}. Passos diários. Público: {publico}.',
      'Gere um "não-fazer" list para {nicho}: 10 atividades que devem ser eliminadas, delegadas ou automatizadas.',
      'Crie um protocolo de tomada de decisão em 5 minutos para {nicho} quando há 3+ opções.',
      'Desenhe um sistema Zettelkasten adaptado para conhecimento útil em {nicho}.',
      'Escreva um plano de "dia perfeito" reversível para {nicho}. Se tudo der errado, o que continua funcionando.'
    ]
  },
  {
    id: 'programacao',
    nome: '💻 Programação e Desenvolvimento',
    icone: '💻',
    templates: [
      'Atue como desenvolvedor sênior. Explique [CONCEITO] para {publico} que trabalha em {nicho} e precisa usar na prática.',
      'Crie um MVP em Node.js + Express + SQLite para {nicho} que resolva uma dor específica de {publico}. Código + instruções.',
      'Gere um schema de banco de dados PostgreSQL para {nicho} com 5 tabelas. Relacionamentos claros.',
      'Faça um code review ríspido do código abaixo. Aponte 3 bugs ocultos, 2 melhorias de performance, 1 risco de segurança. [COLE]',
      'Escreva testes unitários Jest para a função abaixo com cobertura de edge cases. [COLE CÓDIGO]',
      'Crie um script de automação Python que resolve a tarefa [X] em {nicho}. Use só stdlib. Comentado para iniciante.',
      'Gere uma API REST simples em FastAPI para {nicho} com 4 endpoints. Inclua autenticação JWT e docs OpenAPI.',
      'Monte o CI/CD (GitHub Actions) para um projeto de {nicho}: testes, build, deploy Vercel. YAML completo.',
      'Transforme o código imperativo abaixo em funcional puro. Mantenha legibilidade. [COLE]',
      'Crie um sistema de logging estruturado para aplicação em produção de {nicho}. Estratégia + código exemplo.'
    ]
  },
  {
    id: 'ia-avancada',
    nome: '🧠 IA Avançada (prompt engineering e automação)',
    icone: '🧠',
    templates: [
      'Crie um system prompt para um agente GPT dedicado a {nicho} atendendo {publico}. Inclua limites, tom e fluxo ideal.',
      'Gere um fluxo de agente autônomo (com ferramentas: search, calendar, email) que resolva [PROBLEMA] em {nicho}.',
      'Desenhe uma cadeia de 3 prompts encadeados para {nicho} onde a saída do 1 vira entrada do 2. Público: {publico}.',
      'Monte um prompt few-shot com 5 exemplos ensinando a IA a responder e-mails no tom de {nicho}.',
      'Crie um prompt que força a IA a raciocinar em 3 etapas visíveis antes da resposta final sobre {nicho}.',
      'Escreva um prompt que elimina "alucinação" em resposta sobre {nicho}, exigindo incerteza explícita quando for o caso.',
      'Gere um prompt de "adversarial critique" onde a IA avalia a própria resposta anterior antes de entregar a final.',
      'Monte um pipeline n8n que ouve nova mensagem WhatsApp, classifica com IA, responde se simples, cria ticket se complexo.',
      'Crie um prompt mestre para assistente pessoal de {publico} que atua em {nicho}, com 10 capacidades definidas.',
      'Gere um prompt para geração estruturada (JSON válido) de [dados do nicho] usando Claude com function calling.'
    ]
  },
  {
    id: 'video-imagem',
    nome: '🎨 Vídeo, Imagem e Design',
    icone: '🎨',
    templates: [
      'Crie um prompt Nano Banana Pro 2 para foto profissional do produto de {nicho}, ambiente coerente com {publico}.',
      'Gere um prompt Sora 2 de 10s para abertura de vídeo YouTube de {nicho}. Tom: {publico}.',
      'Escreva um briefing de 10 slides de apresentação para {nicho}. Paleta, tipografia, hierarquia.',
      'Monte um kit de marca (brand kit) para {nicho}: paleta hex, duas tipos, estilo fotográfico, 3 palavras que guiam.',
      'Crie 5 prompts Midjourney V7 para ilustrações editoriais de {nicho}. Estilo consistente.',
      'Gere roteiro de 30s para reels UGC sobre {nicho}, fórmula PGPG. Público: {publico}.',
      'Desenhe um storyboard de 6 cenas para vídeo publicitário de {nicho}. Cada cena: plano, ação, duração.',
      'Crie um prompt para gerar thumbnail de YouTube alta conversão para vídeo de {nicho} mirando {publico}.',
      'Monte um guia de estilo para criativos UGC em {nicho}: ambiente, figurino, iluminação, 10 "faças" e 10 "não faças".',
      'Gere roteiro de 60s para vídeo Sora 2 sobre transformação antes/depois em {nicho}. Público: {publico}.'
    ]
  },
  {
    id: 'estudos',
    nome: '📚 Estudos, Aprendizado e Ensino',
    icone: '📚',
    templates: [
      'Seja meu professor particular de [TEMA ligado a {nicho}]. Plano 14 dias, 20min/dia, com prova no fim de cada dia.',
      'Resuma [DOCUMENTO de {nicho}] em 3 níveis: criança, universitário, especialista. 300 palavras cada.',
      'Crie 30 flashcards Anki sobre [TEMA de {nicho}] formato pergunta → resposta concisa.',
      'Monte um mapa mental textual hierárquico sobre [TEMA de {nicho}] em 5 níveis de profundidade.',
      'Gere 20 perguntas de avaliação (múltipla escolha) sobre [TEMA de {nicho}]. Com gabarito comentado.',
      'Transforme o conteúdo abaixo em roteiro de aula de 20 minutos. Use storytelling. [COLE]',
      'Crie analogias poderosas para explicar [CONCEITO de {nicho}] para {publico} que não tem background técnico.',
      'Monte um plano de estudo de 90 dias para se tornar intermediário em {nicho}. Livros, cursos, projetos práticos.',
      'Gere 10 projetos práticos progressivos para quem está aprendendo {nicho}. Do simples ao avançado.',
      'Crie um glossário com 30 termos essenciais de {nicho} com definição em 1 linha cada e exemplo de uso.'
    ]
  },
  {
    id: 'seo',
    nome: '🔍 SEO e Conteúdo Web',
    icone: '🔍',
    templates: [
      'Gere 20 palavras-chave long-tail para {nicho}, classificadas por intuito (informacional, transacional, comercial).',
      'Crie um artigo SEO de 1500 palavras sobre [TEMA de {nicho}] seguindo estrutura H1/H2/H3, para ranquear no Google.',
      'Monte uma estratégia de cluster de conteúdo para {nicho}: 1 artigo pilar + 8 satélites. Público: {publico}.',
      'Gere uma meta-descrição magnética de 155 caracteres para a página inicial de {nicho}.',
      'Liste 15 sites referência em {nicho} no Brasil. Para cada um: força, fraqueza e oportunidade de diferenciação.',
      'Crie um plano de link building ético de 90 dias para {nicho}. Táticas, alvos, scripts.',
      'Desenhe uma estrutura de URL, sitemap e navegação para site de {nicho} focado em SEO.',
      'Reescreva o trecho abaixo aplicando SEO (H2, keyword primária, keyword secundária, LSI) sem parecer robótico. [COLE]',
      'Crie um FAQ de 10 perguntas otimizadas para "People Also Ask" sobre {nicho}.',
      'Gere um artigo pilar de 3000 palavras sobre "guia definitivo de [TEMA de {nicho}]". Sumário detalhado.'
    ]
  },
  {
    id: 'ecommerce',
    nome: '🛍️ E-commerce e Shopee/MercadoLivre',
    icone: '🛍️',
    templates: [
      'Crie 5 títulos para anúncio no Mercado Livre de produto de {nicho}, máx 60 caracteres, com keyword principal.',
      'Escreva descrição persuasiva de 1500 caracteres para Shopee de um produto de {nicho}. Público: {publico}.',
      'Gere 10 bullets de características + benefícios para página de produto de {nicho}.',
      'Crie um plano de precificação escalonada (frete grátis acima de X) para loja de {nicho}.',
      'Monte uma política de troca e devolução clara em 200 palavras para loja de {nicho}.',
      'Escreva 5 respostas padrão a perguntas frequentes de clientes de {nicho} no Mercado Livre.',
      'Crie um roteiro de unboxing + vídeo curto para {nicho} usar nos anúncios.',
      'Gere 10 perguntas que clientes perguntariam antes de comprar produto de {nicho}. Com respostas prontas.',
      'Desenhe um fluxo de pós-venda (e-mail + WhatsApp) de 14 dias para aumentar review positiva em {nicho}.',
      'Crie uma estratégia de cupom de primeira compra para loja de {nicho} que não machuque a margem.'
    ]
  },
  {
    id: 'infoproduto',
    nome: '🎓 Infoproduto e Criação de Curso',
    icone: '🎓',
    templates: [
      'Crie uma estrutura de curso online em 6 módulos para {nicho} dirigido a {publico}. Cada módulo com 5 aulas.',
      'Gere a ementa completa de um ebook de 80 páginas sobre {nicho} para {publico}.',
      'Escreva o roteiro da aula 1 de um curso de {nicho}. Duração 15 min, tom informal, com call-to-action final.',
      'Crie um funil de lançamento CPL (conteúdo + pitch + lives) em 21 dias para infoproduto de {nicho}.',
      'Gere 10 ideias de bônus irresistíveis para empilhar em oferta de curso sobre {nicho}.',
      'Escreva a página de vendas completa (longa) de curso de R$ 497 sobre {nicho}. Público: {publico}.',
      'Crie um script de webinar de 60 minutos para vender produto de {nicho}: 45 min conteúdo + 15 min pitch.',
      'Monte um esqueleto de comunidade (grupo pago) para alunos de curso de {nicho}. Regras, canais, gamificação.',
      'Gere um plano de jornada do aluno no curso de {nicho}: onboarding, engajamento, conclusão, upsell.',
      'Crie 3 nomes fortes para um curso sobre {nicho}. Com argumentação de por que cada nome converte.'
    ]
  },
  {
    id: 'redes-sociais',
    nome: '📱 Redes Sociais e Conteúdo Viral',
    icone: '📱',
    templates: [
      'Crie 10 ideias de posts de carrossel para {nicho}. Gancho + slides + CTA. Público: {publico}.',
      'Escreva 20 ganchos de abertura de Reels testados para {nicho}. Cada um <3 segundos.',
      'Monte calendário de 30 dias para TikTok de {nicho} com 1 post/dia. Tipo, tema, gancho, CTA.',
      'Gere 5 roteiros de story de venda "soft" para {nicho}. Sem parecer vendedor desesperado.',
      'Crie 10 bios de Instagram de alta conversão para perfil de {nicho} mirando {publico}.',
      'Escreva 15 legendas curtas (até 300 caracteres) para posts de feed de {nicho}.',
      'Monte um protocolo de engajamento orgânico: 30 min/dia para crescer {nicho} do zero.',
      'Gere 10 ideias de conteúdo "bastidor" (BTS) humanizando a marca de {nicho}.',
      'Crie roteiro de série de 5 posts conectados (cliffhanger) sobre {nicho}. Público: {publico}.',
      'Escreva um plano para lançar uma mini-série no YouTube Shorts sobre {nicho} em 30 dias.'
    ]
  },
  {
    id: 'automacao',
    nome: '⚙️ Automação com n8n / Make / Zapier',
    icone: '⚙️',
    templates: [
      'Desenhe um fluxo n8n para {nicho} que classifica e responde mensagens WhatsApp com IA + envia leads para CRM.',
      'Monte automação Make que transforma novos pedidos no Shopify em ticket de suporte + mensagem ao cliente.',
      'Crie fluxo Zapier que pega novos inscritos de e-mail, enriquece com dados da web, adiciona a planilha Notion.',
      'Desenhe automação que puxa menções à marca no X/Instagram, resume com IA e avisa por Slack.',
      'Monte fluxo n8n que lê fatura em PDF, extrai dados com IA, lança no ERP e arquiva no Drive.',
      'Crie automação que gera relatório de vendas diário, envia por WhatsApp para o dono de {nicho}.',
      'Desenhe fluxo que monitora 5 concorrentes, detecta mudança de preço, avisa por e-mail.',
      'Monte automação para {nicho} que transforma áudio de reunião em ata estruturada enviada por e-mail.',
      'Crie fluxo de abandono de carrinho em 3 etapas (1h, 24h, 72h) com copy personalizada via IA.',
      'Desenhe automação para qualificar leads de {nicho} (BANT) via IA e distribuir para vendedor certo.'
    ]
  },
  {
    id: 'dados-analise',
    nome: '📊 Dados, Análise e Planilhas',
    icone: '📊',
    templates: [
      'Analise esses dados de vendas de {nicho} e aponte 3 insights não óbvios + 1 ação prioritária. [COLE DADOS]',
      'Crie uma fórmula Excel para calcular CAC, LTV e LTV/CAC ratio para {nicho}. Com exemplo.',
      'Gere uma query SQL para extrair os 10 clientes mais valiosos dos últimos 90 dias em {nicho}.',
      'Monte um dashboard Looker Studio de 1 página para {nicho}. Métricas críticas, fontes e lógica.',
      'Transforme esses dados brutos em narrativa executiva de 1 parágrafo para o dono de {nicho}. [COLE]',
      'Crie uma análise de coorte mensal de retenção para {nicho}. Estrutura e interpretação.',
      'Gere um script Python (pandas) que limpa e consolida os dados abaixo. [COLE]',
      'Identifique anomalias nos dados abaixo e sugira 3 hipóteses para cada. [COLE]',
      'Monte um relatório trimestral de performance de {nicho}: 5 seções, gráficos recomendados, narrativas.',
      'Crie KPIs leading vs lagging para {nicho}. 5 de cada tipo. Público alvo: {publico}.'
    ]
  },
  {
    id: 'email',
    nome: '📧 E-mail Marketing',
    icone: '📧',
    templates: [
      'Crie uma sequência de boas-vindas de 7 e-mails para novos inscritos de {nicho}. Público: {publico}.',
      'Escreva 10 assuntos de e-mail com taxa de abertura acima de 40% para {nicho}.',
      'Gere um e-mail de winback para clientes inativos 90+ dias de {nicho}.',
      'Crie um e-mail de oferta relâmpago de 72h para {nicho} com gatilhos de urgência (sem apelar).',
      'Escreva uma newsletter semanal (500 palavras) para lista de {nicho} com 3 links úteis.',
      'Monte uma sequência de carrinho abandonado em 3 e-mails para {nicho}.',
      'Gere um e-mail de anúncio de novo produto para lista engajada de {nicho}.',
      'Crie um e-mail de pesquisa de satisfação (NPS) para clientes de {nicho} com incentivo ético.',
      'Escreva um e-mail de cross-sell pós-venda de 14 dias para {nicho}.',
      'Monte um e-mail de reativação "estamos de volta" após pausa de comunicação com lista de {nicho}.'
    ]
  },
  {
    id: 'saude-bem-estar',
    nome: '💪 Saúde, Bem-estar e Performance',
    icone: '💪',
    templates: [
      'Crie rotina de sono otimizada para profissional de {nicho} que dorme tarde. Público: {publico}.',
      'Monte um plano de exercícios em casa, 20min/dia, para quem trabalha em {nicho}.',
      'Gere cardápio semanal saudável realista e brasileiro para {publico} com rotina de {nicho}.',
      'Crie um protocolo anti-burnout de 30 dias para profissional de {nicho}.',
      'Desenhe rotina de hidratação, movimento e pausas para quem fica 8h+ no computador em {nicho}.',
      'Monte plano de ansiedade leve para {publico}: respiração, journaling, exposição gradual.',
      'Crie ritual matinal de 20 minutos para alta performance em {nicho}.',
      'Gere um plano de desintoxicação digital de 7 dias para {publico} sem prejudicar trabalho em {nicho}.',
      'Desenhe protocolo de recuperação de treino para amadores com rotina de {nicho}.',
      'Monte um guia de postura e ergonomia para workstation de quem trabalha com {nicho}.'
    ]
  },
  {
    id: 'financas',
    nome: '💰 Finanças Pessoais e Planejamento',
    icone: '💰',
    templates: [
      'Crie plano de saída do cheque especial em 90 dias para {publico} que atua em {nicho}.',
      'Monte orçamento mensal realista em 6 categorias para {publico}. Renda média R$ 5.000.',
      'Gere estratégia de reserva de emergência (6 meses) partindo do zero para {publico}.',
      'Desenhe plano de aposentadoria privada para {publico} de 35 anos começando agora.',
      'Crie um guia de investimento conservador para {publico} leigo. 5 passos práticos.',
      'Monte planilha de controle de receita variável (freelancer de {nicho}) com reserva para imposto.',
      'Gere plano de quitação de dívidas pela bola de neve para {publico}.',
      'Desenhe estratégia de diversificação de renda (3 fontes) para profissional de {nicho}.',
      'Crie análise de custo de vida em 3 cidades brasileiras para {publico} considerar mudança.',
      'Monte plano de 5 anos para comprar imóvel à vista por {publico}.'
    ]
  },
  {
    id: 'carreira',
    nome: '🚀 Carreira e Desenvolvimento Profissional',
    icone: '🚀',
    templates: [
      'Reescreva meu currículo para vaga de {nicho} destacando o que {publico} recrutador valoriza. [COLE CV]',
      'Crie perfil LinkedIn otimizado para quem quer entrar em {nicho}. Headline, sobre, experiência.',
      'Gere 10 perguntas provocativas para entrevista de emprego em {nicho} visando cargo de liderança.',
      'Monte plano de 90 dias para primeiros passos num novo cargo em {nicho}.',
      'Crie estratégia para pedir aumento de 30% em {nicho} com dados objetivos.',
      'Escreva um argumento para mudar de carreira para {nicho} aos 40+ anos.',
      'Monte portfolio de projetos para quem quer entrar em {nicho} sem experiência.',
      'Gere elevator pitch de 60s para profissional de {nicho} em evento de networking.',
      'Crie plano de networking ético de 6 meses para crescer em {nicho}.',
      'Desenhe matriz de competências para profissional de {nicho} mapear lacunas.'
    ]
  }
];

// === GERAÇÃO ===
let totalPrompts = 0;
let categoryBlocks = '';

categorias.forEach((cat, idx) => {
  let promptsHTML = '';
  let countInCat = 0;

  cat.templates.forEach((tpl) => {
    nichos.slice(0, 10).forEach((nicho, nIdx) => {
      const publico = publicos[nIdx % publicos.length];
      const finalPrompt = tpl
        .replace(/\{nicho\}/g, nicho)
        .replace(/\{publico\}/g, publico);
      countInCat++;
      totalPrompts++;
      promptsHTML += `
      <div class="prompt-item">
        <div class="prompt-head">
          <span class="prompt-num">#${String(totalPrompts).padStart(4,'0')}</span>
          <button class="copy-btn" onclick="copyPrompt(this)">📋 Copiar</button>
        </div>
        <pre class="prompt-text">${finalPrompt.replace(/</g,'&lt;')}</pre>
      </div>`;
    });
  });

  categoryBlocks += `
    <section class="cat-block" id="${cat.id}">
      <h2 class="cat-title">${cat.nome} <span class="cat-count">${countInCat} prompts</span></h2>
      <div class="prompts">${promptsHTML}</div>
    </section>`;
});

const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Pack 2.000 Prompts Prontos — IA Domínio Total</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../assets/css/style.css">
<style>
  body{background:#0a0a0f;color:#fff;padding-bottom:40px}
  .prompts-header{
    background:radial-gradient(circle at 50% 20%,rgba(0,255,136,.2),transparent 60%),var(--bg);
    padding:40px 20px;text-align:center;
  }
  .prompts-header h1{font-size:clamp(26px,5vw,40px);font-weight:900;margin-bottom:10px}
  .prompts-header p{color:var(--text-muted);font-size:16px;max-width:640px;margin:0 auto}
  .search-box{
    max-width:720px;margin:24px auto 0;
    display:flex;gap:8px;
  }
  .search-box input{
    flex:1;padding:14px 18px;
    background:var(--bg-2);border:1px solid var(--border);border-radius:var(--radius-sm);
    color:#fff;font-size:15px;font-family:inherit;
  }
  .search-box input:focus{outline:none;border-color:var(--primary)}
  .toc-bar{
    position:sticky;top:0;background:rgba(10,10,15,.95);backdrop-filter:blur(10px);
    padding:12px 16px;z-index:50;border-bottom:1px solid var(--border);
    overflow-x:auto;white-space:nowrap;
  }
  .toc-bar a{
    display:inline-block;padding:6px 12px;margin-right:6px;
    background:var(--bg-2);border:1px solid var(--border);border-radius:999px;
    font-size:13px;color:var(--text-muted);
  }
  .toc-bar a:hover{color:var(--primary);border-color:var(--primary)}
  .cat-block{padding:48px 0 16px;max-width:960px;margin:0 auto;padding-left:20px;padding-right:20px}
  .cat-title{
    font-size:24px;font-weight:900;margin-bottom:20px;
    display:flex;align-items:center;gap:12px;
    border-bottom:2px solid var(--primary);padding-bottom:12px;
  }
  .cat-count{
    background:rgba(0,255,136,.1);color:var(--primary);
    padding:4px 10px;border-radius:999px;font-size:13px;font-weight:700;
  }
  .prompts{display:grid;gap:12px}
  .prompt-item{
    background:var(--bg-2);border:1px solid var(--border);
    border-radius:var(--radius-sm);padding:14px 16px;
  }
  .prompt-item:hover{border-color:var(--primary)}
  .prompt-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}
  .prompt-num{font-size:12px;color:var(--text-muted);font-weight:700;letter-spacing:.05em}
  .copy-btn{
    background:var(--grad-cta);color:#0a0a0f;
    padding:6px 12px;border-radius:6px;
    font-size:12px;font-weight:700;
  }
  .copy-btn.copied{background:#22c55e;color:#fff}
  .prompt-text{
    font-family:'Courier New',monospace;font-size:13px;
    white-space:pre-wrap;word-wrap:break-word;
    color:#e5e5e5;line-height:1.6;
    max-height:none;
  }
  .back-link{display:inline-block;margin:20px 0;color:var(--primary);font-weight:700;padding-left:20px}
  .hidden-item{display:none}
</style>
</head>
<body>

<section class="prompts-header">
  <h1>📝 Pack de ${totalPrompts.toLocaleString('pt-BR')} Prompts Prontos</h1>
  <p>Sua biblioteca profissional de prompts testados em ${categorias.length} categorias. Clique em "Copiar" e cole na sua IA favorita.</p>
  <div class="search-box">
    <input type="search" id="search" placeholder="🔍 Buscar prompt... (ex: 'instagram', 'copy', 'vendas')" />
  </div>
</section>

<nav class="toc-bar">
${categorias.map(c=>`  <a href="#${c.id}">${c.icone} ${c.nome.replace(/^[^ ]+ /,'')}</a>`).join('\n')}
</nav>

<main>
${categoryBlocks}
</main>

<a href="../obrigado.html" class="back-link">← Voltar para área de membros</a>

<script>
function copyPrompt(btn){
  const text = btn.closest('.prompt-item').querySelector('.prompt-text').innerText;
  navigator.clipboard.writeText(text).then(function(){
    btn.textContent = '✓ Copiado!';
    btn.classList.add('copied');
    setTimeout(function(){
      btn.textContent = '📋 Copiar';
      btn.classList.remove('copied');
    },1500);
  });
}
document.getElementById('search').addEventListener('input', function(e){
  const q = e.target.value.toLowerCase().trim();
  document.querySelectorAll('.prompt-item').forEach(function(el){
    const txt = el.innerText.toLowerCase();
    el.classList.toggle('hidden-item', q && !txt.includes(q));
  });
  document.querySelectorAll('.cat-block').forEach(function(block){
    const visible = block.querySelectorAll('.prompt-item:not(.hidden-item)').length;
    block.style.display = visible === 0 && q ? 'none' : '';
  });
});
</script>
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, '2000-prompts.html'), html, 'utf8');
console.log('✅ Gerados ' + totalPrompts + ' prompts em ' + categorias.length + ' categorias');
