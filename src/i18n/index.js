export const locales = ['pt', 'en', 'nl'];
export const defaultLocale = 'pt';

export const localeNames = { pt: 'PT', en: 'EN', nl: 'NL' };
export const localeFull  = { pt: 'Português', en: 'English', nl: 'Nederlands' };

export const translations = {

  /* ─── PORTUGUÊS ─── */
  pt: {
    nav: {
      services:  'Serviços',
      work:      'Trabalhos',
      process:   'Processo',
      faq:       'FAQ',
      cta:       'Fale comigo',
    },
    hero: {
      badge:    'Aberto para projetos',
      headline: ['Ideias que viram', 'produto.'],
      body:     'Sites, ferramentas, IA, planilhas, SEO e tráfego pago — entregues com qualidade profissional, rápido e sem enrolação.',
      btnStart: 'Começar projeto',
      btnWork:  'Ver trabalhos →',
    },
    services: {
      eyebrow: 'Serviços',
      heading: ['O que posso', 'fazer por você'],
      items: [
        { n: '01', titulo: 'Criação de Sites',     desc: 'Landing pages, portfólios e sites institucionais modernos, rápidos e prontos para converter.' },
        { n: '02', titulo: 'Ferramentas Digitais', desc: 'Apps web e automações que resolvem problemas reais e poupam horas do seu dia.' },
        { n: '03', titulo: 'Soluções com IA',      desc: 'Chatbots, automações inteligentes e integrações com GPT/Claude que trabalham por você.' },
        { n: '04', titulo: 'Planilhas Excel',      desc: 'Dashboards, relatórios automáticos e sistemas de controle no Excel ou Google Sheets.' },
        { n: '05', titulo: 'Tráfego Pago',         desc: 'Campanhas no Google Ads e Meta Ads criadas para atrair clientes certos e maximizar o retorno sobre o investimento.' },
        { n: '06', titulo: 'SEO & Presença Digital', desc: 'Otimização para o Google: páginas empresariais que aparecem nas buscas certas e trazem clientes sem pagar por clique.' },
      ],
    },
    process: {
      eyebrow: 'Como funciona',
      heading: ['Simples.', 'Transparente.'],
      items: [
        { n: '01', titulo: 'Briefing',   desc: 'Entendemos o seu objetivo, público e prazo em detalhe.' },
        { n: '02', titulo: 'Construção', desc: 'Desenvolvemos com atualizações regulares. Você acompanha tudo.' },
        { n: '03', titulo: 'Entrega',    desc: 'Revisões até aprovar. Código limpo, documentado, seu.' },
      ],
    },
    portfolio: {
      eyebrow: 'Holofote',
      heading: 'Selecionados',
      soon: 'em breve',
      items: [
        { cat: 'Site',       titulo: 'Landing Page SaaS',         desc: 'Alta conversão, dark mode, animações com Framer Motion. Feita para converter visitante em cliente.',                tags: ['Next.js', 'Tailwind', 'Framer Motion'] },
        { cat: 'IA',         titulo: 'Assistente de Atendimento',  desc: 'Chatbot Claude AI integrado ao WhatsApp da empresa. Responde dúvidas, qualifica leads e agenda reuniões 24/7.',   tags: ['Claude API', 'WhatsApp', 'Node.js'] },
        { cat: 'Planilha',   titulo: 'Dashboard de Vendas',        desc: 'Metas, gráficos dinâmicos e relatório automático por email. Eliminou 3h semanais de trabalho manual.',             tags: ['Google Sheets', 'Apps Script', 'Looker Studio'] },
        { cat: 'Site',       titulo: 'Portfólio Criativo',         desc: 'Identidade visual forte, animações ricas e carregamento otimizado. Nota 97 no Lighthouse.',                        tags: ['Next.js', 'GSAP', 'Cloudflare'] },
        { cat: 'Ferramenta', titulo: 'Gerador de Propostas',       desc: 'Formulário → PDF personalizado gerado automaticamente. Economiza 45 min por proposta enviada.',                    tags: ['React', 'PDF.js', 'Web3Forms'] },
        { cat: 'IA',         titulo: 'Resumidor de Reuniões',      desc: 'Grava, transcreve e resume com GPT-4o em < 60 segundos. Integrado ao Notion do cliente.',                          tags: ['GPT-4o', 'Whisper', 'Notion API'] },
      ],
    },
    stats: [
      { val: '100%',   label: 'código próprio' },
      { val: '< 24h',  label: 'tempo de resposta' },
      { val: '7 dias', label: 'entrega média' },
      { val: '∞',      label: 'revisões' },
    ],
    guarantee: {
      eyebrow: 'Garantia',
      heading:  ['Você não aprova,', 'não paga', 'o restante.'],
      body:     'Revisões ilimitadas até você estar 100% satisfeito. Código limpo, entregue no prazo, sem surpresas.',
      quote:    'Revisões ilimitadas até aprovação. Código limpo e documentado. Entrega no prazo combinado. Sem custos ocultos.',
      btn:      'Começar agora',
    },
    faq: {
      eyebrow: 'FAQ',
      heading: ['Perguntas', 'frequentes'],
      items: [
        { q: 'Qual o prazo de entrega?',        a: 'Sites simples saem em 5–7 dias úteis. Projetos maiores têm cronograma definido no briefing.' },
        { q: 'Como funciona o pagamento?',      a: '50% na aprovação do briefing e 50% na entrega final.' },
        { q: 'O código fica comigo?',           a: 'Sim, 100%. Você recebe todo o código-fonte. Sem lock-in.' },
        { q: 'Há suporte após a entrega?',      a: 'Sim, ofereço suporte pós-entrega e pacotes de manutenção mensal.' },
        { q: 'Trabalha com orçamento pequeno?', a: 'Me conta o que você precisa e encontramos o melhor formato.' },
      ],
    },
    cta: {
      heading: ['Pronto para construir algo', 'incrível?'],
      body:    'Me conta a sua ideia. Em 24 horas você tem uma proposta personalizada.',
      btn:     'Começar projeto',
      wa:      'WhatsApp',
    },
    contact: {
      eyebrow:    'Contato',
      heading:    ['Vamos', 'conversar'],
      response:   'Respondo em até 24 horas.',
      body:       'Conte o que você precisa — seja um site, uma ferramenta, uma planilha ou uma solução com IA.',
      labelName:  'Nome',
      phName:     'Seu nome',
      labelEmail: 'Email / WhatsApp',
      phEmail:    'contato@email.com',
      labelSvc:   'Serviço',
      selectSvc:  'Selecione',
      services:   ['Criação de Site', 'Ferramenta Digital', 'Solução com IA', 'Planilha Excel', 'Tráfego Pago', 'SEO & Presença Digital', 'Não sei ainda'],
      labelMsg:   'Mensagem',
      phMsg:      'Descreva o que você precisa...',
      btn:        'Enviar mensagem',
    },
    footer: {
      copy: 'Todos os direitos reservados.',
    },
  },

  /* ─── ENGLISH ─── */
  en: {
    nav: {
      services:  'Services',
      work:      'Work',
      process:   'Process',
      faq:       'FAQ',
      cta:       'Get in touch',
    },
    hero: {
      badge:    'Available for projects',
      headline: ['Ideas that become', 'products.'],
      body:     'Websites, tools, AI, spreadsheets, SEO and paid traffic — delivered with professional quality, fast and no nonsense.',
      btnStart: 'Start a project',
      btnWork:  'View work →',
    },
    services: {
      eyebrow: 'Services',
      heading: ['What I can', 'do for you'],
      items: [
        { n: '01', titulo: 'Website Design',     desc: 'Landing pages, portfolios and modern business websites — fast, beautiful and built to convert.' },
        { n: '02', titulo: 'Digital Tools',      desc: 'Custom web apps and automations that solve real problems and save hours of your day.' },
        { n: '03', titulo: 'AI Solutions',       desc: 'Chatbots, smart automations and GPT/Claude integrations that work around the clock for you.' },
        { n: '04', titulo: 'Excel Spreadsheets', desc: 'Dashboards, automated reports and control systems in Excel or Google Sheets.' },
        { n: '05', titulo: 'Paid Traffic',       desc: 'Google Ads and Meta Ads campaigns built to attract the right customers and maximise your return on investment.' },
        { n: '06', titulo: 'SEO & Digital Presence', desc: 'Google optimisation: business pages that rank for the right searches and bring in customers without paying per click.' },
      ],
    },
    process: {
      eyebrow: 'How it works',
      heading: ['Simple.', 'Transparent.'],
      items: [
        { n: '01', titulo: 'Briefing',  desc: 'We dig into your goal, audience and timeline in detail.' },
        { n: '02', titulo: 'Build',     desc: 'Development with regular updates. You follow every step.' },
        { n: '03', titulo: 'Delivery',  desc: 'Revisions until you approve. Clean, documented code — yours to keep.' },
      ],
    },
    portfolio: {
      eyebrow: 'Spotlight',
      heading: 'Selected work',
      soon: 'coming soon',
      items: [
        { cat: 'Website',    titulo: 'SaaS Landing Page',          desc: 'High-converting, dark mode, Framer Motion animations. Built to turn visitors into customers.',          tags: ['Next.js', 'Tailwind', 'Framer Motion'] },
        { cat: 'AI',         titulo: 'Customer Service Assistant',  desc: 'Claude AI chatbot integrated with the company\'s WhatsApp. Answers questions and books meetings 24/7.', tags: ['Claude API', 'WhatsApp', 'Node.js'] },
        { cat: 'Spreadsheet',titulo: 'Sales Dashboard',             desc: 'Targets, dynamic charts and automated email reports. Eliminated 3 hours of manual work per week.',    tags: ['Google Sheets', 'Apps Script', 'Looker Studio'] },
        { cat: 'Website',    titulo: 'Creative Portfolio',          desc: 'Strong visual identity, rich animations and optimised loading. Lighthouse score of 97.',               tags: ['Next.js', 'GSAP', 'Cloudflare'] },
        { cat: 'Tool',       titulo: 'Proposal Generator',          desc: 'Form → customised PDF generated automatically. Saves 45 minutes per proposal sent.',                  tags: ['React', 'PDF.js', 'Web3Forms'] },
        { cat: 'AI',         titulo: 'Meeting Summariser',          desc: 'Records, transcribes and summarises with GPT-4o in under 60 seconds. Integrated with Notion.',        tags: ['GPT-4o', 'Whisper', 'Notion API'] },
      ],
    },
    stats: [
      { val: '100%',   label: 'custom code' },
      { val: '< 24h',  label: 'response time' },
      { val: '7 days', label: 'average delivery' },
      { val: '∞',      label: 'revisions' },
    ],
    guarantee: {
      eyebrow: 'Guarantee',
      heading:  ['You don\'t approve,', 'you don\'t pay', 'the rest.'],
      body:     'Unlimited revisions until you are 100% satisfied. Clean code, delivered on time, no surprises.',
      quote:    'Unlimited revisions until approval. Clean, documented code. Delivered on the agreed deadline. No hidden costs.',
      btn:      'Start now',
    },
    faq: {
      eyebrow: 'FAQ',
      heading: ['Frequently', 'asked questions'],
      items: [
        { q: 'What is the delivery time?',          a: 'Simple websites are ready in 5–7 business days. Larger projects have a timeline defined in the briefing.' },
        { q: 'How does payment work?',              a: '50% upon briefing approval and 50% upon final delivery.' },
        { q: 'Do I own the code?',                  a: 'Yes, 100%. You receive the full source code. No lock-in.' },
        { q: 'Is there support after delivery?',    a: 'Yes, I offer post-delivery support and monthly maintenance packages.' },
        { q: 'Do you work with small budgets?',     a: 'Tell me what you need and we\'ll find the best format for you.' },
      ],
    },
    cta: {
      heading: ['Ready to build something', 'amazing?'],
      body:    'Tell me your idea. Within 24 hours you\'ll have a personalised proposal.',
      btn:     'Start a project',
      wa:      'WhatsApp',
    },
    contact: {
      eyebrow:    'Contact',
      heading:    ['Let\'s', 'talk'],
      response:   'I respond within 24 hours.',
      body:       'Tell me what you need — a website, a tool, a spreadsheet or an AI-powered solution.',
      labelName:  'Name',
      phName:     'Your name',
      labelEmail: 'Email / WhatsApp',
      phEmail:    'hello@email.com',
      labelSvc:   'Service',
      selectSvc:  'Select',
      services:   ['Website', 'Digital Tool', 'AI Solution', 'Excel Spreadsheet', 'Paid Traffic', 'SEO & Digital Presence', 'Not sure yet'],
      labelMsg:   'Message',
      phMsg:      'Describe what you need...',
      btn:        'Send message',
    },
    footer: {
      copy: 'All rights reserved.',
    },
  },

  /* ─── NEDERLANDS ─── */
  nl: {
    nav: {
      services:  'Diensten',
      work:      'Werk',
      process:   'Proces',
      faq:       'FAQ',
      cta:       'Neem contact op',
    },
    hero: {
      badge:    'Beschikbaar voor projecten',
      headline: ['Ideeën die worden', 'producten.'],
      body:     'Websites, tools, AI, spreadsheets, SEO en betaald verkeer — geleverd met professionele kwaliteit, snel en zonder gedoe.',
      btnStart: 'Project starten',
      btnWork:  'Werk bekijken →',
    },
    services: {
      eyebrow: 'Diensten',
      heading: ['Wat ik voor', 'jou kan doen'],
      items: [
        { n: '01', titulo: 'Website Ontwerp',    desc: 'Landingspagina\'s, portfolio\'s en moderne bedrijfswebsites — snel, mooi en gebouwd om te converteren.' },
        { n: '02', titulo: 'Digitale Tools',    desc: 'Maatwerk webapps en automatiseringen die echte problemen oplossen en uren per dag besparen.' },
        { n: '03', titulo: 'AI-oplossingen',    desc: 'Chatbots, slimme automatiseringen en GPT/Claude-integraties die dag en nacht voor je werken.' },
        { n: '04', titulo: 'Excel Spreadsheets',desc: 'Dashboards, geautomatiseerde rapporten en controlesystemen in Excel of Google Sheets.' },
        { n: '05', titulo: 'Betaald Verkeer',   desc: 'Google Ads en Meta Ads campagnes gericht op de juiste klanten en maximaal rendement op je investering.' },
        { n: '06', titulo: 'SEO & Online Zichtbaarheid', desc: 'Google-optimalisatie: bedrijfspagina\'s die scoren op de juiste zoekopdrachten en klanten aantrekken zonder te betalen per klik.' },
      ],
    },
    process: {
      eyebrow: 'Hoe het werkt',
      heading: ['Eenvoudig.', 'Transparant.'],
      items: [
        { n: '01', titulo: 'Briefing',    desc: 'We verdiepen ons in jouw doel, doelgroep en tijdlijn.' },
        { n: '02', titulo: 'Bouwen',      desc: 'Ontwikkeling met regelmatige updates. Jij volgt elke stap.' },
        { n: '03', titulo: 'Oplevering',  desc: 'Revisies totdat je akkoord gaat. Schone, gedocumenteerde code — van jou.' },
      ],
    },
    portfolio: {
      eyebrow: 'Spotlight',
      heading: 'Geselecteerd werk',
      soon: 'binnenkort',
      items: [
        { cat: 'Website',      titulo: 'SaaS Landingspagina',        desc: 'Hoge conversie, dark mode, Framer Motion animaties. Gebouwd om bezoekers tot klanten te maken.',       tags: ['Next.js', 'Tailwind', 'Framer Motion'] },
        { cat: 'AI',           titulo: 'Klantenservice Assistent',    desc: 'Claude AI chatbot geïntegreerd met de WhatsApp van het bedrijf. Beantwoordt vragen en plant afspraken 24/7.', tags: ['Claude API', 'WhatsApp', 'Node.js'] },
        { cat: 'Spreadsheet',  titulo: 'Verkoop Dashboard',           desc: 'Doelen, dynamische grafieken en geautomatiseerde e-mailrapporten. Bespaart 3 uur handmatig werk per week.', tags: ['Google Sheets', 'Apps Script', 'Looker Studio'] },
        { cat: 'Website',      titulo: 'Creatief Portfolio',          desc: 'Sterke visuele identiteit, rijke animaties en geoptimaliseerd laden. Lighthouse-score van 97.',         tags: ['Next.js', 'GSAP', 'Cloudflare'] },
        { cat: 'Tool',         titulo: 'Offertegenerator',            desc: 'Formulier → gepersonaliseerde PDF automatisch gegenereerd. Bespaart 45 minuten per verstuurde offerte.', tags: ['React', 'PDF.js', 'Web3Forms'] },
        { cat: 'AI',           titulo: 'Vergaderingssamenvatting',    desc: 'Neemt op, transcribeert en vat samen met GPT-4o in minder dan 60 seconden. Geïntegreerd met Notion.',   tags: ['GPT-4o', 'Whisper', 'Notion API'] },
      ],
    },
    stats: [
      { val: '100%',    label: 'eigen code' },
      { val: '< 24u',   label: 'reactietijd' },
      { val: '7 dagen', label: 'gemiddelde levering' },
      { val: '∞',       label: 'revisies' },
    ],
    guarantee: {
      eyebrow: 'Garantie',
      heading:  ['Goedkeuring vereist,', 'anders betaal je', 'de rest niet.'],
      body:     'Onbeperkte revisies totdat je 100% tevreden bent. Schone code, op tijd geleverd, geen verrassingen.',
      quote:    'Onbeperkte revisies tot goedkeuring. Schone, gedocumenteerde code. Geleverd op de afgesproken deadline. Geen verborgen kosten.',
      btn:      'Nu beginnen',
    },
    faq: {
      eyebrow: 'FAQ',
      heading: ['Veelgestelde', 'vragen'],
      items: [
        { q: 'Wat is de levertijd?',                   a: 'Eenvoudige websites zijn klaar in 5–7 werkdagen. Grotere projecten hebben een tijdlijn die in de briefing wordt bepaald.' },
        { q: 'Hoe werkt de betaling?',                 a: '50% bij goedkeuring van de briefing en 50% bij de definitieve oplevering.' },
        { q: 'Ben ik eigenaar van de code?',           a: 'Ja, 100%. Je ontvangt de volledige broncode. Geen vendor lock-in.' },
        { q: 'Is er ondersteuning na de oplevering?',  a: 'Ja, ik bied ondersteuning na oplevering en maandelijkse onderhoudspakketten.' },
        { q: 'Werk je met kleine budgetten?',          a: 'Vertel me wat je nodig hebt en we vinden het beste format voor jou.' },
      ],
    },
    cta: {
      heading: ['Klaar om iets', 'geweldigs te bouwen?'],
      body:    'Vertel me je idee. Binnen 24 uur heb je een gepersonaliseerd voorstel.',
      btn:     'Project starten',
      wa:      'WhatsApp',
    },
    contact: {
      eyebrow:    'Contact',
      heading:    ['Laten we', 'praten'],
      response:   'Ik reageer binnen 24 uur.',
      body:       'Vertel me wat je nodig hebt — een website, een tool, een spreadsheet of een AI-oplossing.',
      labelName:  'Naam',
      phName:     'Jouw naam',
      labelEmail: 'E-mail / WhatsApp',
      phEmail:    'hallo@email.com',
      labelSvc:   'Dienst',
      selectSvc:  'Selecteer',
      services:   ['Website', 'Digitale Tool', 'AI-oplossing', 'Excel Spreadsheet', 'Betaald Verkeer', 'SEO & Online Zichtbaarheid', 'Weet ik nog niet'],
      labelMsg:   'Bericht',
      phMsg:      'Beschrijf wat je nodig hebt...',
      btn:        'Bericht versturen',
    },
    footer: {
      copy: 'Alle rechten voorbehouden.',
    },
  },
};
