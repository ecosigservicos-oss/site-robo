import './styles.css'

const app = document.querySelector('#app')

const faqItems = [
  {
    q: 'Funciona na Hantec Markets e em outras corretoras MT5?',
    a: 'Sim. O EA foi desenhado para operar em contas MT5 ECN ou Standard. Ele identifica automaticamente FOK, IOC e RETURN, aceita ativos com sufixo e mantém o isolamento por Magic Number para você rodar vários gráficos sem conflito.'
  },
  {
    q: 'Posso usar em Mesas Proprietárias (Prop Firms)?',
    a: 'Sim, desde que o regulamento da mesa permita Expert Advisors e operações automatizadas. Recomendamos validar as regras de notícias, overnight, lote máximo e perda diária antes de ativar o robô.'
  },
  {
    q: 'Qual o capital mínimo recomendado e quais tempos gráficos usar?',
    a: 'A configuração de referência usa M1, M5 ou M15, com preferência pelo timeframe que melhor se encaixa na liquidez do seu ativo. O capital ideal depende do risco escolhido, spread e regras da corretora; comece com uma banca que permita absorver a variação natural do mercado.'
  },
  {
    q: 'O que acontece se sair uma notícia forte na primeira vela?',
    a: 'O filtro de vela anormal impede a formação de uma estrutura distorcida. Se a primeira vela ultrapassar o limite configurado, o ciclo é descartado e o robô aguarda uma nova oportunidade — sem entradas emocionais.'
  },
  {
    q: 'O robô opera mais de uma vez por dia?',
    a: 'Pode operar novos ciclos quando houver uma confirmação válida. Depois de TP ou SL, o EA bloqueia quatro velas fechadas para evitar reentradas em exaustão e só então inicia um novo Canal de Referência.'
  },
  {
    q: 'Preciso deixar o computador ligado ou posso usar VPS?',
    a: 'Você pode usar um VPS com MetaTrader 5 para manter o EA ativo 24 horas, com baixa latência e conexão estável. O manual mostra os passos de instalação e ativação do AlgoTrading.'
  }
]

const benefits = [
  { n: '01', title: 'Filtro anti-falso rompimento', text: 'Não entra no primeiro toque. Exige fechamento fora da estrutura completa: Canal de Referência mais Canal de Ação.', tone: 'blue', tag: 'CONFIRMAÇÃO' },
  { n: '02', title: 'Stop Loss técnico de 10 pips', text: 'Proteção posicionada além da extremidade oposta do canal para buscar uma relação risco-retorno assimétrica.', tone: 'red', tag: 'PROTEÇÃO' },
  { n: '03', title: 'Alvos projetados em 1x e 2x', text: 'A altura total da estrutura é calculada automaticamente para você escolher entre o primeiro ou o segundo alvo.', tone: 'orange', tag: 'PROJEÇÃO' },
  { n: '04', title: 'Ciclo contínuo com bloqueio', text: 'Após TP ou SL, quatro velas fechadas de pausa evitam reentradas em exaustão antes do novo ciclo.', tone: 'green', tag: 'DISCIPLINA' },
  { n: '05', title: 'Lote automático por banca', text: 'O volume se ajusta ao saldo e à distância do Stop, enquanto o filtro descarta velas gigantes de notícia.', tone: 'purple', tag: 'AUTOMAÇÃO' }
]

app.innerHTML = `
  <div class="site-shell">
    <header class="site-header">
      <div class="header-inner">
        <a class="brand" href="#top" aria-label="Canal Referência EA 4.2 - início">
          <span class="brand-mark" aria-hidden="true"><span></span><span></span><span></span></span>
          <span class="brand-copy"><strong>CANAL</strong><em>REFERÊNCIA</em><small>EA / V4.2</small></span>
        </a>
        <button class="mobile-toggle" aria-label="Abrir menu" aria-expanded="false"><span></span><span></span><span></span></button>
        <nav class="main-nav" aria-label="Navegação principal">
          <a href="#metodo">O método</a>
          <a href="#recursos">Recursos</a>
          <a href="#calculadora">Calculadora</a>
          <a href="#duvidas">Dúvidas</a>
        </nav>
        <a class="header-cta" href="#planos">Ver licenças <span>↗</span></a>
      </div>
    </header>

    <main id="main-content">
      <section class="hero section-pad" id="top">
        <div class="hero-grid">
          <div class="hero-copy reveal">
            <div class="eyebrow"><span class="pulse-dot"></span> SISTEMA ATIVO · META TRADER 5</div>
            <h1>Automatize rompimentos estruturais no <span class="accent-blue">Ouro</span> e <span class="accent-orange">Forex</span> com precisão matemática.</h1>
            <p class="hero-lede">O Canal Referência EA 4.2 lê a acumulação das 4 velas iniciais, projeta o Canal de Ação 1:1 e executa apenas entradas confirmadas — com Stop Loss curto, alvos duplos e gestão automática de lote.</p>
            <div class="hero-actions">
              <a class="btn btn-primary" href="#planos">Garantir minha licença agora <span>↗</span></a>
              <a class="btn btn-ghost" href="#simulador"><span class="play-icon">▷</span> Ver o robô trabalhando</a>
            </div>
            <div class="hero-footnote"><span class="tiny-check">✓</span> Entrega imediata <span class="divider"></span> Garantia de 7 dias <span class="divider"></span> Suporte em português</div>
          </div>
          <div class="hero-visual reveal delay-1" aria-label="Terminal de negociação ilustrativo">
            <div class="terminal-frame hero-terminal">
              <div class="terminal-topbar"><span class="window-dots"><i></i><i></i><i></i></span><span class="terminal-title">XAUUSD · M5 <b>·</b> CR_EA_4.2</span><span class="live-pill"><span></span> LIVE</span></div>
              <div class="chart-area hero-chart" id="hero-chart"></div>
              <div class="terminal-bottom"><span><b class="green-text">+2.0R</b> alvo projetado</span><span class="mono">1.084.26 <b class="red-text">▼ 0.18%</b></span></div>
            </div>
            <div class="floating-stat stat-top"><span class="stat-label">ESTRUTURA</span><strong>40 <small>PIPS</small></strong><span class="stat-trend">↗ RANGE VALIDADO</span></div>
            <div class="floating-stat stat-bottom"><span class="stat-label">RISCO / OPERAÇÃO</span><strong>1.0<small>%</small></strong><span class="stat-trend green-text">● LOTE DINÂMICO</span></div>
          </div>
        </div>
        <div class="hero-badges" aria-label="Benefícios do produto">
          <div class="badge-item"><span class="badge-icon">◈</span><span><strong>100% Automatizado</strong><small>Expert Advisor MT5</small></span></div>
          <div class="badge-item"><span class="badge-icon orange-icon">⌁</span><span><strong>Compatível com Mesas Proprietárias</strong><small>Regras sob seu controle</small></span></div>
          <div class="badge-item"><span class="badge-icon green-icon">◒</span><span><strong>Gestão de risco dinâmica</strong><small>Percentual da banca</small></span></div>
          <div class="ticker-note"><span class="mono">STATUS</span> Canal Referência conectado <span class="green-text">●</span></div>
        </div>
      </section>

      <section class="method-section section-pad" id="metodo">
        <div class="section-intro split-intro">
          <div><div class="eyebrow orange-eyebrow">01 / MÉTODO DE EXECUÇÃO</div><h2>Não é um palpite.<br><span class="muted-title">É uma sequência.</span></h2></div>
          <p>O mercado passa por fases. O EA transforma a leitura de estrutura em um protocolo objetivo: mapear, esperar, confirmar e executar. Sem antecipação. Sem improviso.</p>
        </div>
        <div class="step-rail">
          <div class="rail-line"></div>
          <div class="rail-step active"><span>01</span><strong>Início</strong><small>linha vertical</small></div>
          <div class="rail-step"><span>02</span><strong>Referência</strong><small>4 velas</small></div>
          <div class="rail-step"><span>03</span><strong>Ação</strong><small>projeção 1:1</small></div>
          <div class="rail-step"><span>04</span><strong>Entrada</strong><small>confirmação</small></div>
          <div class="rail-step"><span>05</span><strong>Pausa</strong><small>4 velas</small></div>
        </div>
      </section>

      <section class="demo-section section-pad" id="simulador">
        <div class="section-intro centered-intro"><div class="eyebrow blue-eyebrow">02 / VEJA EM TEMPO REAL</div><h2>O robô trabalha assim.</h2><p>Escolha um cenário e percorra cada decisão que o EA toma antes de abrir uma ordem.</p></div>
        <div class="demo-layout">
          <div class="simulator terminal-frame">
            <div class="terminal-topbar"><span class="window-dots"><i></i><i></i><i></i></span><span class="terminal-title">SIMULADOR DE ESTRUTURA <b>·</b> MODO VISUAL</span><span class="chart-clock mono">09:45:00</span></div>
            <div class="simulator-stage" id="simulator-stage"></div>
            <div class="simulator-footer"><span class="legend-dot blue-dot"></span> Canal Referência <span class="legend-dot orange-dot"></span> Canal Ação <span class="legend-dot red-dot"></span> Alvo / SL <span class="stage-price mono">1.084.26</span></div>
          </div>
          <div class="simulator-controls">
            <div class="scenario-switch" role="group" aria-label="Escolha de cenário"><button class="scenario-btn active" data-scenario="buy">Cenário de compra <span>↗</span></button><button class="scenario-btn" data-scenario="sell">Cenário de venda <span>↘</span></button></div>
            <div class="control-card"><div class="control-kicker"><span class="live-dot"></span> SIMULAÇÃO GUIADA</div><h3 id="sim-title">A estrutura começa a se formar.</h3><p id="sim-copy">O EA marca o horário exato de início e ignora velas anormais antes de medir qualquer canal.</p><div class="step-list" role="list">
              <button class="step-btn active" data-step="1"><span class="step-num">01</span><span><strong>Início do ciclo</strong><small>linha vertical + filtro</small></span><i>→</i></button>
              <button class="step-btn" data-step="2"><span class="step-num">02</span><span><strong>Canal de Referência</strong><small>4 velas fechadas</small></span><i>→</i></button>
              <button class="step-btn" data-step="3"><span class="step-num">03</span><span><strong>Canal de Ação</strong><small>projeção 1:1</small></span><i>→</i></button>
              <button class="step-btn" data-step="4"><span class="step-num">04</span><span><strong>Entrada + proteção</strong><small>SL 10 pips / TP 1x + 2x</small></span><i>→</i></button>
              <button class="step-btn" data-step="5"><span class="step-num">05</span><span><strong>Pausa inteligente</strong><small>4 velas antes do próximo ciclo</small></span><i>→</i></button>
            </div></div>
            <div class="sim-readout"><span class="readout-label">DECISÃO DO EA</span><strong id="sim-status">Mapeando início do ciclo</strong><span class="readout-value mono">R:R <b>1:2</b> · SL <b>10 pips</b></span></div>
          </div>
        </div>
      </section>

      <section class="gallery-section section-pad" id="recursos">
        <div class="section-intro split-intro"><div><div class="eyebrow orange-eyebrow">03 / REGISTROS DO TERMINAL</div><h2>Clareza em cada<br><span class="muted-title">operação.</span></h2></div><p>O mesmo protocolo que você acabou de ver, aplicado dentro do MetaTrader 5. Explore os painéis de uma operação completa.</p></div>
        <div class="gallery-wrap"><div class="gallery-tabs" role="tablist"><button class="gallery-tab active" data-gallery="buy">Compra · XAUEUR</button><button class="gallery-tab" data-gallery="sell">Venda · XAUUSD</button><button class="gallery-tab" data-gallery="panel">Parâmetros · F7</button><button class="gallery-tab video-tab" data-gallery="video"><span class="play-icon">▷</span> Vídeo demonstrativo</button></div><div class="gallery-content" id="gallery-content"></div></div>
      </section>

      <section class="benefits-section section-pad" id="diferenciais">
        <div class="section-intro centered-intro"><div class="eyebrow green-eyebrow">04 / POR DENTRO DO SISTEMA</div><h2>Cinco camadas de disciplina.</h2><p>Mais do que abrir operações, o Canal Referência EA foi programado para saber quando não operar.</p></div>
        <div class="benefit-grid">${benefits.map((item) => `<article class="benefit-card ${item.tone}"><div class="card-top"><span class="benefit-number">${item.n}</span><span class="benefit-tag">${item.tag}</span></div><div class="benefit-glyph" aria-hidden="true"></div><h3>${item.title}</h3><p>${item.text}</p><span class="card-arrow">↗</span></article>`).join('')}</div>
      </section>

      <section class="tools-section section-pad" id="calculadora">
        <div class="tool-layout">
          <div class="calculator-panel panel-surface"><div class="eyebrow blue-eyebrow">05 / RISCO SOB CONTROLE</div><h2>Projete antes<br><span class="muted-title">de executar.</span></h2><p>Simule o tamanho da posição com base na sua banca, no risco por operação e na altura da estrutura.</p><div class="form-grid"><label>Saldo da conta <span>$</span><input id="balance-input" type="number" min="0" step="100" value="1000" inputmode="decimal"></label><label>Risco por operação <span>%</span><input id="risk-input" type="number" min="0" max="100" step="0.1" value="1" inputmode="decimal"></label><label class="wide-field">Altura da estrutura <span>pips</span><input id="height-input" type="number" min="1" step="1" value="40" inputmode="decimal"></label></div><div class="calc-disclaimer">Projeção educacional. O valor por pip varia conforme ativo, lote e especificação da corretora.</div></div>
          <div class="results-panel"><div class="result-head"><span class="eyebrow green-eyebrow">SAÍDA DA CALCULADORA</span><span class="calc-live"><span class="live-dot"></span> AO VIVO</span></div><div class="result-main"><span>Risco financeiro máximo</span><strong id="risk-output">$ 10,00</strong><small>Limite sugerido para esta operação</small></div><div class="result-row"><span><i class="result-line red-line"></i> Linha vermelha 1 · 1x</span><strong id="tp1-output">+$ 10,00</strong></div><div class="result-row"><span><i class="result-line red-line soft"></i> Linha vermelha 2 · 2x</span><strong id="tp2-output">+$ 20,00</strong></div><div class="result-footer"><span>ALTURA TOTAL</span><strong class="mono" id="height-output">40 pips</strong></div></div>
        </div>
      </section>

      <section class="compat-section section-pad">
        <div class="compat-grid"><div class="compat-copy"><div class="eyebrow orange-eyebrow">06 / PLUG &amp; TRADE</div><h2>Compatível com o seu ambiente de execução.</h2><p>Construído para entrar na rotina de quem leva risco a sério — da conta própria às mesas proprietárias.</p><div class="compat-list"><div><span class="compat-check">✓</span><span><strong>Hantec Markets</strong><small>ECN / Standard e ativos com sufixo</small></span></div><div><span class="compat-check">✓</span><span><strong>Preenchimento inteligente</strong><small>FOK · IOC · RETURN detectados automaticamente</small></span></div><div><span class="compat-check">✓</span><span><strong>Magic Number isolado</strong><small>Vários gráficos, sem conflito entre estratégias</small></span></div></div></div><div class="install-panel"><div class="install-header"><span class="eyebrow green-eyebrow">INSTALAÇÃO EM 3 PASSOS</span><span class="mono">&lt; 05 MIN</span></div><div class="install-step"><span class="install-num">01</span><div><strong>Baixe o pacote</strong><p>Arquivo .ex5 + Manual PDF direto após a compra.</p></div><span class="install-icon">↓</span></div><div class="install-step"><span class="install-num">02</span><div><strong>Coloque no MT5</strong><p>Cole o arquivo na pasta <code>MQL5/Experts</code>.</p></div><span class="install-icon">⌁</span></div><div class="install-step"><span class="install-num">03</span><div><strong>Ative e configure</strong><p>Ligue o AlgoTrading e escolha seu perfil de risco.</p></div><span class="install-icon">✓</span></div></div></div>
      </section>

      <section class="plans-section section-pad" id="planos">
        <div class="section-intro centered-intro"><div class="eyebrow green-eyebrow">07 / ESCOLHA SEU ACESSO</div><h2>Uma licença para cada fase.</h2><p>Comece com a estrutura. Evolua com o método. Tenha o EA trabalhando ao seu lado.</p></div>
        <div class="plans-grid"><article class="plan-card"><div class="plan-kicker">FLEXIBILIDADE</div><h3>Mensal</h3><p class="plan-desc">Para validar a estratégia no seu ritmo.</p><div class="plan-price"><sup>R$</sup><strong>97</strong><span>/ mês</span></div><ul><li>Acesso completo ao EA v4.2</li><li>Manual de configuração em PDF</li><li>Suporte em português</li></ul><a class="btn btn-plan" href="https://wa.me/5566996348508?text=Quero%20a%20licen%C3%A7a%20Mensal%20do%20Canal%20Refer%C3%AAncia%20EA" target="_blank" rel="noreferrer">Escolher mensal <span>↗</span></a><div class="plan-note">Entrega imediata · Garantia 7 dias</div></article><article class="plan-card featured"><div class="popular-badge">MAIS ESCOLHIDO <span>★</span></div><div class="plan-kicker">EVOLUÇÃO CONTÍNUA</div><h3>Semestral</h3><p class="plan-desc">Mais tempo de tela. Mais eficiência no custo.</p><div class="plan-price"><sup>R$</sup><strong>497</strong><span>/ 6 meses</span></div><div class="saving-pill">Economize 15% · 2 contas simultâneas</div><ul><li>Acesso completo ao EA v4.2</li><li>Manual + atualizações incluídas</li><li>Suporte prioritário em português</li></ul><a class="btn btn-primary" href="https://wa.me/5566996348508?text=Quero%20a%20licen%C3%A7a%20Semestral%20do%20Canal%20Refer%C3%AAncia%20EA" target="_blank" rel="noreferrer">Garantir meu acesso <span>↗</span></a><div class="plan-note">Entrega imediata · Garantia 7 dias</div></article><article class="plan-card"><div class="plan-kicker">POSSE DO MÉTODO</div><h3>Vitalícia</h3><p class="plan-desc">Um pagamento. Uma operação para sempre.</p><div class="plan-price"><sup>R$</sup><strong>997</strong><span>único</span></div><ul><li>Acesso vitalício ao EA v4.2</li><li>Contas ilimitadas no mesmo titular</li><li>Manual completo + suporte prioritário</li></ul><a class="btn btn-plan" href="https://wa.me/5566996348508?text=Quero%20a%20licen%C3%A7a%20Vital%C3%ADcia%20do%20Canal%20Refer%C3%AAncia%20EA" target="_blank" rel="noreferrer">Quero a vitalícia <span>↗</span></a><div class="plan-note">Entrega imediata · Garantia 7 dias</div></article></div><div class="plans-trust"><span>✓ Compra segura via atendimento</span><span>✓ 7 dias para testar com tranquilidade</span><span>✓ Manual de instalação incluso</span></div></section>

      <section class="faq-section section-pad" id="duvidas"><div class="faq-layout"><div class="faq-main"><div class="eyebrow orange-eyebrow">08 / CENTRAL DE DÚVIDAS</div><h2>Perguntas que aparecem<br><span class="muted-title">antes da entrada.</span></h2><div class="faq-search"><span>⌕</span><input id="faq-search" type="search" placeholder="Buscar uma dúvida..." aria-label="Buscar no FAQ"></div><div class="faq-list" id="faq-list"></div></div><aside class="contact-card"><div class="contact-orbit"></div><div class="eyebrow green-eyebrow">ATENDIMENTO DIRETO</div><h3>Ainda tem alguma dúvida?</h3><p>Fale com quem entende da estrutura. Respondemos em horário comercial pelo WhatsApp ou e-mail.</p><form id="contact-form"><label>Seu nome<input name="name" type="text" required placeholder="Como podemos te chamar?"></label><label>WhatsApp ou e-mail<input name="contact" type="text" required placeholder="Para retornarmos sua mensagem"></label><label>Sua dúvida<textarea name="message" rows="3" required placeholder="Conte o que você quer saber..."></textarea></label><button class="btn btn-primary" type="submit">Enviar dúvida <span>↗</span></button><div class="form-feedback" id="form-feedback" role="status"></div></form></aside></div></section>
    </main>

    <footer class="site-footer"><div class="footer-top"><a class="brand" href="#top"><span class="brand-mark" aria-hidden="true"><span></span><span></span><span></span></span><span class="brand-copy"><strong>CANAL</strong><em>REFERÊNCIA</em><small>EA / V4.2</small></span></a><p>Estrutura objetiva para decisões<br>mais precisas no MetaTrader 5.</p><div class="footer-links"><a href="#metodo">O método</a><a href="#planos">Licenças</a><a href="#duvidas">Suporte</a><a href="https://wa.me/5566996348508" target="_blank" rel="noreferrer">WhatsApp ↗</a></div></div><div class="risk-note"><strong>AVISO DE RISCO</strong><span>Operações no mercado financeiro, incluindo Forex e Metais, envolvem riscos significativos. Resultados passados não garantem lucros futuros. O Canal Referência EA é uma ferramenta de automação; a responsabilidade pela gestão de risco e pelas decisões de uso é do operador.</span></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} Canal Referência EA. Todos os direitos reservados.</span><span>MT5 · XAUUSD · XAUEUR · XAUAUD</span></div></footer>
    <a class="whatsapp-float" href="https://wa.me/5566996348508" target="_blank" rel="noreferrer" aria-label="Tirar dúvidas pelo WhatsApp"><span>◔</span><small>Falar no WhatsApp</small></a>
  </div>
`

function candleMarkup(values, compact = false) {
  const width = compact ? 10 : 14
  const gap = compact ? 22 : 39
  const start = compact ? 30 : 40
  return values.map((value, index) => {
    const x = start + index * gap
    const yHigh = value.high
    const yLow = value.low
    const yOpen = value.open
    const yClose = value.close
    const rising = yClose < yOpen
    const color = rising ? '#089981' : '#F23645'
    const bodyY = Math.min(yOpen, yClose)
    const bodyH = Math.max(5, Math.abs(yClose - yOpen))
    return `<line x1="${x + width / 2}" y1="${yHigh}" x2="${x + width / 2}" y2="${yLow}" stroke="${color}" stroke-width="1.5"/><rect x="${x}" y="${bodyY}" width="${width}" height="${bodyH}" rx="1" fill="${color}" opacity="${rising ? '.95' : '.86'}"/>`
  }).join('')
}

const heroValues = Array.from({ length: 20 }, (_, i) => {
  const base = 146 - Math.sin(i * 0.72) * 21 - i * 1.4
  const open = base + (i % 3 === 0 ? 7 : -4)
  const close = base + (i % 2 === 0 ? -8 : 8)
  return { high: Math.min(open, close) - 8 - (i % 5 === 0 ? 12 : 0), low: Math.max(open, close) + 8, open, close }
})

document.querySelector('#hero-chart').innerHTML = `<svg viewBox="0 0 860 310" role="img" aria-label="Mockup de gráfico com canais e alvos"><defs><pattern id="hero-grid" width="54" height="44" patternUnits="userSpaceOnUse"><path d="M 54 0 L 0 0 0 44" fill="none" stroke="#252a36" stroke-width="1"/></pattern><linearGradient id="hero-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#2962FF" stop-opacity=".14"/><stop offset="1" stop-color="#2962FF" stop-opacity="0"/></linearGradient></defs><rect width="860" height="310" fill="url(#hero-grid)"/>${candleMarkup(heroValues, true)}<line x1="330" x2="780" y1="135" y2="135" stroke="#2962FF" stroke-width="2"/><line x1="330" x2="780" y1="211" y2="211" stroke="#2962FF" stroke-width="2"/><rect x="330" y="135" width="190" height="76" fill="url(#hero-fill)"/><line x1="520" x2="780" y1="105" y2="105" stroke="#FF9800" stroke-width="2" stroke-dasharray="5 5"/><line x1="520" x2="780" y1="241" y2="241" stroke="#FF9800" stroke-width="2" stroke-dasharray="5 5"/><line x1="602" x2="602" y1="68" y2="260" stroke="#F23645" stroke-width="2" stroke-dasharray="2 5"/><line x1="602" x2="780" y1="74" y2="74" stroke="#F23645" stroke-width="1.5"/><line x1="602" x2="780" y1="47" y2="47" stroke="#F23645" stroke-width="1.5" stroke-dasharray="3 4"/><circle cx="602" cy="74" r="4" fill="#089981" stroke="#0B0E14" stroke-width="3"/><g class="chart-labels"><text x="338" y="128" fill="#6c8cff">REF TOP</text><text x="338" y="227" fill="#6c8cff">REF LOW</text><text x="645" y="67" fill="#F23645">ALVO 2X</text><text x="645" y="93" fill="#F23645">ALVO 1X</text><text x="612" y="257" fill="#F23645">ENTRADA</text></g></svg>`

let currentScenario = 'buy'
let activeStep = 1

const scenarioCopy = {
  buy: {
    title: ['A estrutura começa a se formar.', 'Quatro fechamentos definem o limite.', 'O rompimento ganha contexto.', 'Confirmação. Proteção. Projeção.', 'Trade encerrado. O ciclo respira.'],
    copy: ['O EA marca o horário exato de início e ignora velas anormais antes de medir qualquer canal.', 'As quatro velas fechadas formam o Canal de Referência. Topo e fundo ficam visíveis para a próxima decisão.', 'O primeiro fechamento fora do azul projeta o Canal de Ação 1:1 — mas ainda não abre uma ordem.', 'Só depois do fechamento além do extremo da ação o EA entra. SL de 10 pips e alvos 1x / 2x são posicionados.', 'Após TP ou SL, o robô conta quatro velas fechadas. Depois, um novo canal pode começar.'],
    status: ['Mapeando início do ciclo', 'Canal de Referência validado', 'Aguardando confirmação final', 'Entrada confirmada · risco protegido', 'Pausa inteligente ativada']
  },
  sell: {
    title: ['O ciclo começa no topo.', 'A referência limita a queda.', 'A ação confirma a pressão.', 'Venda confirmada. Risco calculado.', 'Pausa antes de procurar de novo.'],
    copy: ['A linha vertical marca o início e o filtro impede que uma vela de notícia distorça a leitura de venda.', 'O EA mede as quatro velas fechadas para construir um teto e um piso objetivos.', 'O fechamento abaixo do Canal de Referência projeta a Ação 1:1. Ainda sem ordem precipitada.', 'O rompimento do extremo confirma a venda. O Stop fica 10 pips além da estrutura e os alvos são calculados.', 'O encerramento dispara o bloqueio de quatro velas. Disciplina também é saber esperar.'],
    status: ['Mapeando início do ciclo', 'Canal de Referência validado', 'Aguardando confirmação final', 'Venda confirmada · risco protegido', 'Pausa inteligente ativada']
  }
}

function simulatorValues(scenario) {
  const base = scenario === 'buy' ? 192 : 122
  return Array.from({ length: 16 }, (_, i) => {
    const drift = scenario === 'buy' ? -i * 2.3 : i * 2.3
    const wiggle = Math.sin(i * .95) * 11
    const open = base + drift + wiggle + (i % 2 ? 5 : -4)
    const close = base + drift + wiggle + (i % 2 ? -8 : 8)
    return { high: Math.min(open, close) - 8, low: Math.max(open, close) + 9, open, close }
  })
}

function renderSimulator() {
  const buy = currentScenario === 'buy'
  const direction = buy ? '↗' : '↘'
  const values = simulatorValues(currentScenario)
  const refTop = buy ? 112 : 156
  const refBottom = buy ? 206 : 250
  const actionTop = buy ? 70 : 198
  const actionBottom = buy ? 244 : 292
  const entryY = buy ? 76 : 262
  const target1 = buy ? 46 : 292
  const target2 = buy ? 25 : 315
  const step = activeStep
  const labels = scenarioCopy[currentScenario]
  const overlay = `
    <line x1="168" x2="168" y1="22" y2="318" stroke="#F23645" stroke-width="2" stroke-dasharray="3 6" opacity="${step >= 1 ? '1' : '.2'}"/>
    <text x="178" y="36" fill="#F23645" class="svg-label">INÍCIO 09:45:00</text>
    ${step >= 1 ? `<rect x="126" y="48" width="85" height="20" rx="3" fill="#F23645" fill-opacity=".12" stroke="#F23645" stroke-opacity=".5"/><text x="136" y="62" fill="#F23645" class="svg-label">VELA OK</text>` : ''}
    ${step >= 2 ? `<rect x="220" y="${refTop}" width="145" height="${refBottom - refTop}" fill="#2962FF" fill-opacity=".08" stroke="#2962FF" stroke-width="2"/><line x1="220" x2="530" y1="${refTop}" y2="${refTop}" stroke="#2962FF" stroke-width="2"/><line x1="220" x2="530" y1="${refBottom}" y2="${refBottom}" stroke="#2962FF" stroke-width="2"/><text x="230" y="${refTop - 9}" fill="#6c8cff" class="svg-label">REF TOP</text><text x="230" y="${refBottom + 17}" fill="#6c8cff" class="svg-label">REF LOW</text>` : ''}
    ${step >= 3 ? `<line x1="365" x2="620" y1="${actionTop}" y2="${actionTop}" stroke="#FF9800" stroke-width="2" stroke-dasharray="7 5"/><line x1="365" x2="620" y1="${actionBottom}" y2="${actionBottom}" stroke="#FF9800" stroke-width="2" stroke-dasharray="7 5"/><rect x="365" y="${Math.min(actionTop, actionBottom)}" width="160" height="${Math.abs(actionBottom - actionTop)}" fill="#FF9800" fill-opacity=".07"/><text x="382" y="${Math.min(actionTop, actionBottom) - 9}" fill="#FF9800" class="svg-label">AÇÃO 1:1</text>` : ''}
    ${step >= 4 ? `<line x1="515" x2="515" y1="20" y2="319" stroke="#089981" stroke-width="1.5" stroke-dasharray="2 5"/><circle cx="515" cy="${entryY}" r="5" fill="#089981" stroke="#0B0E14" stroke-width="3"/><text x="527" y="${entryY - 9}" fill="#089981" class="svg-label">ENTRADA ${direction}</text><line x1="515" x2="690" y1="${buy ? entryY + 28 : entryY - 28}" y2="${buy ? entryY + 28 : entryY - 28}" stroke="#F23645" stroke-width="1.5" stroke-dasharray="4 5"/><text x="695" y="${buy ? entryY + 32 : entryY - 32}" fill="#F23645" class="svg-label">SL -10</text><line x1="515" x2="690" y1="${target1}" y2="${target1}" stroke="#F23645" stroke-width="2"/><line x1="515" x2="690" y1="${target2}" y2="${target2}" stroke="#F23645" stroke-width="2" opacity=".65"/><text x="625" y="${target1 - 8}" fill="#F23645" class="svg-label">TP 1X</text><text x="625" y="${target2 - 8}" fill="#F23645" class="svg-label">TP 2X</text>` : ''}
    ${step >= 5 ? `<rect x="525" y="${buy ? 265 : 45}" width="130" height="34" rx="4" fill="#089981" fill-opacity=".1" stroke="#089981" stroke-opacity=".5"/><text x="540" y="${buy ? 280 : 60}" fill="#089981" class="svg-label">PAUSA ATIVA</text><text x="540" y="${buy ? 292 : 72}" fill="#089981" class="svg-label">4 VELAS</text>` : ''}`
  const grid = Array.from({ length: 7 }, (_, i) => `<line x1="0" x2="720" y1="${34 + i * 46}" y2="${34 + i * 46}" stroke="#232833" stroke-width="1"/>`).join('')
  const verticals = Array.from({ length: 13 }, (_, i) => `<line x1="${20 + i * 58}" x2="${20 + i * 58}" y1="0" y2="340" stroke="#1b2029" stroke-width="1"/>`).join('')
  document.querySelector('#simulator-stage').innerHTML = `<svg viewBox="0 0 720 340" role="img" aria-label="Simulador do cenário de ${buy ? 'compra' : 'venda'}"><defs><linearGradient id="sim-bg" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#111620"/><stop offset="1" stop-color="#0c1017"/></linearGradient></defs><rect width="720" height="340" fill="url(#sim-bg)"/>${grid}${verticals}<g class="candles">${candleMarkup(values)}</g>${overlay}<text x="18" y="326" fill="#525968" class="svg-label">09:40</text><text x="190" y="326" fill="#525968" class="svg-label">09:45</text><text x="368" y="326" fill="#525968" class="svg-label">09:50</text><text x="546" y="326" fill="#525968" class="svg-label">09:55</text></svg>`
  document.querySelector('#sim-title').textContent = labels.title[step - 1]
  document.querySelector('#sim-copy').textContent = labels.copy[step - 1]
  document.querySelector('#sim-status').textContent = labels.status[step - 1]
  document.querySelectorAll('.step-btn').forEach((button) => button.classList.toggle('active', Number(button.dataset.step) === step))
  document.querySelector('.chart-clock').textContent = step === 1 ? '09:45:00' : step === 5 ? '10:10:00' : `09:${45 + step * 2}:00`
}

document.querySelectorAll('.scenario-btn').forEach((button) => button.addEventListener('click', () => {
  currentScenario = button.dataset.scenario
  activeStep = 1
  document.querySelectorAll('.scenario-btn').forEach((item) => item.classList.toggle('active', item === button))
  renderSimulator()
}))
document.querySelectorAll('.step-btn').forEach((button) => button.addEventListener('click', () => {
  activeStep = Number(button.dataset.step)
  renderSimulator()
}))
renderSimulator()

const galleryData = {
  buy: { label: 'XAUEUR · M5 · COMPRA CONFIRMADA', accent: '#089981', title: 'Ação 1:1 confirmada. Alvo 2x em andamento.', metrics: [['ENTRADA', '2.318.40'], ['STOP', '2.317.40'], ['ALVO 1', '2.322.40'], ['ALVO 2', '2.326.40']] },
  sell: { label: 'XAUUSD · M1 · VENDA CONFIRMADA', accent: '#F23645', title: 'Fechamento além da ação. Venda protegida.', metrics: [['ENTRADA', '2.641.80'], ['STOP', '2.642.80'], ['ALVO 1', '2.637.80'], ['ALVO 2', '2.633.80']] },
  panel: { label: 'CANAL REFERÊNCIA EA · CONFIGURAÇÃO', accent: '#2962FF', title: 'Parâmetros organizados para execução sem ruído.', metrics: [['RISCO', '1.00%'], ['SL', '10 pips'], ['PAUSA', '4 velas'], ['MAGIC', '420042']] }
}
function renderGallery(type = 'buy') {
  const target = document.querySelector('#gallery-content')
  if (type === 'video') {
    target.innerHTML = `<div class="video-placeholder"><div class="video-grid"></div><div class="video-play"><span>▷</span></div><div class="video-copy"><span class="eyebrow green-eyebrow">DEMO · 02:18</span><h3>Veja o Canal Referência EA<br>tomar uma decisão completa.</h3><p>Da primeira vela ao alvo projetado, sem cortes e sem mágica.</p></div><div class="video-corner mono">PLAYBACK / 01</div></div>`
    return
  }
  const data = galleryData[type]
  const mini = Array.from({ length: 18 }, (_, i) => { const base = type === 'sell' ? 80 + i * 2.2 : 190 - i * 2.4; const open = base + Math.sin(i) * 8; const close = base + Math.cos(i * .7) * 9; return { high: Math.min(open, close) - 6, low: Math.max(open, close) + 7, open, close } })
  target.innerHTML = `<div class="gallery-terminal"><div class="gallery-terminal-bar"><span class="window-dots"><i></i><i></i><i></i></span><span class="mono">${data.label}</span><span class="gallery-connected"><span></span> CONECTADO</span></div><div class="gallery-chart"><svg viewBox="0 0 900 300"><defs><pattern id="gallery-lines" width="50" height="42" patternUnits="userSpaceOnUse"><path d="M 50 0 L 0 0 0 42" fill="none" stroke="#282e3a" stroke-width="1"/></pattern></defs><rect width="900" height="300" fill="url(#gallery-lines)"/>${candleMarkup(mini, true)}<line x1="300" x2="800" y1="104" y2="104" stroke="#2962FF" stroke-width="2"/><line x1="300" x2="800" y1="196" y2="196" stroke="#2962FF" stroke-width="2"/><line x1="500" x2="800" y1="67" y2="67" stroke="#FF9800" stroke-width="2" stroke-dasharray="5 5"/><line x1="500" x2="800" y1="233" y2="233" stroke="#FF9800" stroke-width="2" stroke-dasharray="5 5"/><line x1="620" x2="620" y1="36" y2="267" stroke="${data.accent}" stroke-width="2" stroke-dasharray="2 6"/><line x1="620" x2="840" y1="53" y2="53" stroke="#F23645" stroke-width="2"/><line x1="620" x2="840" y1="25" y2="25" stroke="#F23645" stroke-width="1.5"/><circle cx="620" cy="${type === 'sell' ? 220 : 78}" r="5" fill="#089981"/><text x="312" y="96" fill="#6c8cff" class="svg-label">REF TOP · 2.321.40</text><text x="312" y="215" fill="#6c8cff" class="svg-label">REF LOW · 2.317.40</text><text x="645" y="46" fill="#F23645" class="svg-label">TP 2X</text><text x="645" y="73" fill="#F23645" class="svg-label">TP 1X</text></svg></div><div class="gallery-bottom"><div class="gallery-title"><span class="live-dot"></span><strong>${data.title}</strong><small>Canal Referência EA · ${type === 'panel' ? 'painel de parâmetros' : 'execução automatizada'}</small></div><div class="gallery-metrics">${data.metrics.map((metric) => `<div><span>${metric[0]}</span><strong class="mono">${metric[1]}</strong></div>`).join('')}</div></div></div>`
}
renderGallery()
document.querySelectorAll('.gallery-tab').forEach((button) => button.addEventListener('click', () => { document.querySelectorAll('.gallery-tab').forEach((item) => item.classList.toggle('active', item === button)); renderGallery(button.dataset.gallery) }))

function formatBRL(value) { return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }
function updateCalculator() {
  const balance = Number(document.querySelector('#balance-input').value) || 0
  const risk = Number(document.querySelector('#risk-input').value) || 0
  const height = Number(document.querySelector('#height-input').value) || 0
  const maxRisk = balance * risk / 100
  document.querySelector('#risk-output').textContent = formatBRL(maxRisk)
  document.querySelector('#tp1-output').textContent = `+${formatBRL(maxRisk)}`
  document.querySelector('#tp2-output').textContent = `+${formatBRL(maxRisk * 2)}`
  document.querySelector('#height-output').textContent = `${height} pips`
}
;['balance-input', 'risk-input', 'height-input'].forEach((id) => document.querySelector(`#${id}`).addEventListener('input', updateCalculator))
updateCalculator()

function renderFaq(filter = '') {
  const normalized = filter.toLowerCase().trim()
  const filtered = faqItems.filter((item) => `${item.q} ${item.a}`.toLowerCase().includes(normalized))
  const list = document.querySelector('#faq-list')
  list.innerHTML = filtered.length ? filtered.map((item, index) => `<details class="faq-item" ${index === 0 && !normalized ? 'open' : ''}><summary><span>${item.q}</span><b>+</b></summary><p>${item.a}</p></details>`).join('') : '<div class="empty-faq">Nenhuma dúvida encontrada. Tente outra palavra ou fale direto com nosso atendimento.</div>'
}
renderFaq()
document.querySelector('#faq-search').addEventListener('input', (event) => renderFaq(event.target.value))

document.querySelector('#contact-form').addEventListener('submit', (event) => {
  event.preventDefault()
  const feedback = document.querySelector('#form-feedback')
  feedback.textContent = 'Mensagem recebida. Nosso atendimento vai retornar em breve.'
  feedback.classList.add('visible')
  event.target.reset()
})

const mobileToggle = document.querySelector('.mobile-toggle')
const nav = document.querySelector('.main-nav')
mobileToggle.addEventListener('click', () => { const isOpen = nav.classList.toggle('open'); mobileToggle.setAttribute('aria-expanded', String(isOpen)) })
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => { nav.classList.remove('open'); mobileToggle.setAttribute('aria-expanded', 'false') }))

const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('is-visible') }), { threshold: .08 })
document.querySelectorAll('.reveal, .benefit-card, .plan-card, .install-panel, .contact-card').forEach((el) => observer.observe(el))

document.addEventListener("submit", (event) => {
  const form = event.target;
  const textarea = form.querySelector("textarea");
  if (!textarea) return;

  event.preventDefault();

  const inputs = form.querySelectorAll("input");
  const nome = inputs[0]?.value.trim() || "";
  const contato = inputs[1]?.value.trim() || "";
  const duvida = textarea.value.trim();

  const texto = `Olá! Vim pelo site.\n\n*Nome:* ${nome}\n*Contato:* ${contato}\n*Dúvida:* ${duvida}`;
  const url = `https://wa.me/5566996348508?text=${encodeURIComponent(texto)}`;

  window.open(url, "_blank");
}, true);
