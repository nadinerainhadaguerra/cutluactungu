// Regras de escolha de cada cartilha (livro, "Criação" p. 21–123 e "Subindo de nível" p. 145–153).
// Os textos continuam vindo de cartilhas.js; aqui só ficam limites, agrupamentos e efeitos.
//
// grupos: opções da Página 2 que formam uma escolha.
//   opts      faixa de ids ("o1-o10") ou lista
//   max       quantas escolher (null = sem máximo)          min  mínimo (padrão = max)
//   peloMenos { opts, n, rotulo } — ex.: magia combativa "tendo pelo menos uma base"
//   bonus     chave somada ao limite pelas melhorias (ver MELHORIA_BONUS em sheet/rules.js)
// eliminar:  escolha entre os itens (•) de uma opção fixa (Ferramentas e técnicas do Arcano)
// subs:      escolhas dentro de uma opção. `lista` lê as opções do próprio texto da cartilha:
//   { depois: 'Escolha um:' } pega o que vem depois do marcador até o ponto final;
//   { li: 0 } pega o 1º item (•) logo abaixo da opção, depois dos dois-pontos.
//   tipo 'texto' = campo livre; tipo 'movimento' = de outra cartilha
//   tipo 'stats' = classificações escolhidas que recebem `delta` (padrão +1) sem passar de `limite`
//     (padrão +3); `distinto` = não pode repetir a classificação escolhida em outra escolha
// bonusStats: opções que somam numa classificação fixa ao marcar (só se couber no máximo)
// paragrafos: escolhas/campos presos a um parágrafo (casado pelo início do texto)
// ordem:     seções da Página 2 na ordem em que o texto de criação da cartilha manda escolher

// Efeitos de "usar magia" (livro p. 131), para o movimento Praticante do Arcano.
export const EFEITOS_USAR_MAGIA = [
  'Causar dano',
  'Encantar uma arma',
  'Fazer uma coisa além das limitações humanas',
  'Barrar um local ou um portal',
  'Prender uma pessoa, lacaio ou monstro específico',
  'Banir um espírito ou maldição',
  'Invocar um monstro para o seu mundo',
  'Se comunicar com alguma coisa que não tenha uma linguagem em comum com você',
  'Observar outro local ou momento',
  'Curar 1 de dano de uma lesão, ou curar uma doença, ou neutralizar um veneno',
]

// Tipos de aliado/equipe (livro p. 147)
export const TIPOS_ALIADO = [
  { key: 'subordinado', label: 'Subordinado', motivacao: 'seguir suas instruções à risca' },
  { key: 'tenente', label: 'Tenente', motivacao: 'executar suas instruções como achar melhor' },
  { key: 'amigo', label: 'Amigo', motivacao: 'fornecer suporte emocional' },
  { key: 'guarda-costas', label: 'Guarda-costas', motivacao: 'interceptar o perigo' },
  { key: 'confidente', label: 'Confidente', motivacao: 'dar conselhos e perspectivas' },
  { key: 'reforco', label: 'Reforço', motivacao: 'ficar com você' },
]

export const REGRAS = {
  arcano: {
    ordem: ['MAGIA COMBATIVA', 'MOVIMENTOS', 'EQUIPAMENTOS'],
    grupos: [
      { key: 'magia', opts: 'o1-o10', max: 3, peloMenos: { opts: 'o1-o4', n: 1, rotulo: 'base' }, bonus: 'magia' },
      { key: 'movimentos', opts: 'o12-o21', max: 3, bonus: 'movimentos' },
      { key: 'armas', opts: 'o22-o24', max: 1 },
    ],
    eliminar: { opt: 'o11', max: 1, bonus: 'ferramentas' },
    subs: {
      o13: [{ tipo: 'texto', rotulo: 'Os três grupos ou organizações' }],
      o14: [{ tipo: 'texto', rotulo: 'Peça de vestuário encantada' }],
      o19: [{ max: 2, listaFixa: 'usarMagia', rotulo: 'Efeitos de usar magia' }],
    },
  },
  delinquente: {
    ordem: ['ANTECEDENTES', 'PERSEGUIÇÃO', 'SUBMUNDO', 'MOVIMENTOS', 'EQUIPAMENTOS'],
    grupos: [
      { key: 'movimentos', opts: 'o1-o8', max: 2, bonus: 'movimentos' },
      { key: 'antecedentes', opts: 'o9-o15', max: 1 },
      { key: 'perseguicao', opts: 'o16-o20', min: 2, max: null },
      { key: 'submundo', opts: 'o21-o24', max: 1 },
      { key: 'armas', opts: 'o25-o33', max: 3 },
    ],
    subs: {
      o1: [{ max: 1, lista: { depois: 'Escolha um:', sep: ';' }, rotulo: 'Artefato' }],
      o3: [
        { key: 'o3', min: 1, max: 2, lista: { depois: 'recebeu do pacto:', sep: ';' }, rotulo: 'O que você recebeu' },
        { key: 'o3_stats', tipo: 'stats', max: 2, delta: 1, limite: 3, quando: { key: 'o3', label: 'perícia' }, rotulo: 'Perícia: +1 em duas classificações' },
      ],
      o5: [{ tipo: 'texto', rotulo: 'Nome da gangue' }],
      o21: [{ max: 1, lista: { depois: 'Escolha um:', sep: ',' }, rotulo: 'Criatura' }],
      o22: [{ max: 1, lista: { depois: 'Escolha um:', sep: ',' }, rotulo: 'Quem era' }],
      o23: [{ max: 1, lista: { depois: 'Escolha um:', sep: ',' }, rotulo: 'O que contratou' }],
      o24: [{ max: 1, lista: { depois: '(escolha um):', sep: ',' }, rotulo: 'Com o que topou' }],
    },
  },
  divino: {
    ordem: ['MISSÃO', 'MOVIMENTOS', 'EQUIPAMENTOS'],
    grupos: [
      { key: 'missao', opts: 'o1-o5', max: 1 },
      { key: 'movimentos', opts: 'o6-o12', max: 3, bonus: 'movimentos' },
      { key: 'armas', opts: 'o13-o17', max: 1 },
    ],
  },
  escolhido: {
    ordem: ['SINA', 'MOVIMENTOS', 'EQUIPAMENTOS', 'SUA ARMA ESPECIAL'],
    grupos: [
      { key: 'descoberta', opts: 'o1-o7', max: 1 },
      { key: 'heroismo', opts: 'o8-o19', max: 2, bonus: 'heroismo' },
      { key: 'perdicao', opts: 'o20-o33', max: 2, bonus: 'perdicao' },
      { key: 'movimentos', opts: 'o36-o40', max: 1, bonus: 'movimentos' },
      { key: 'base', opts: 'o41-o44', max: 1 },
      { key: 'partes', opts: 'o45-o51', max: 3 },
    ],
  },
  especialista: {
    ordem: ['MOVIMENTOS', 'REFÚGIO', 'EQUIPAMENTOS'],
    grupos: [
      { key: 'refugio', opts: 'o1-o9', max: 3, bonus: 'refugio' },
      { key: 'movimentos', opts: 'o10-o16', max: 2, bonus: 'movimentos' },
      { key: 'armas', opts: 'o17-o25', max: 3 },
    ],
  },
  iniciado: {
    ordem: ['MOVIMENTOS', 'SEITA', 'EQUIPAMENTOS'],
    grupos: [
      { key: 'boas', opts: 'o1-o13', max: 2 },
      { key: 'ruins', opts: 'o14-o25', max: 1 },
      { key: 'movimentos', opts: 'o27-o34', max: 3, bonus: 'movimentos' },
      // quantidades dependem das tradições (ver limitesIniciado em sheet/rules.js)
      { key: 'antiquadas', opts: 'o35-o43', max: 2, dinamico: 'iniciado' },
      { key: 'modernas', opts: 'o44-o48', max: 1, dinamico: 'iniciado' },
    ],
    // tradições que mudam as armas (casadas pelo texto da opção)
    armasPorTradicao: {
      antiquadas3: ['Artes marciais', 'Equipamentos obsoletos'],
      modernas2: ['Modernizada', 'Dispositivos engenhosos'],
    },
    subs: {
      o31: [{ tipo: 'texto', rotulo: 'Nome do mentor' }],
      o32: [{ tipo: 'texto', rotulo: 'Nome do aprendiz' }],
    },
  },
  injusticado: {
    ordem: ['QUEM VOCÊ PERDEU', 'MOVIMENTOS', 'EQUIPAMENTOS'],
    grupos: [
      { key: 'perdeu', opts: 'o1-o5', min: 1, max: null },
      { key: 'porque', opts: 'o6-o13', min: 1, max: null },
      { key: 'movimentos', opts: 'o15-o21', max: 2, bonus: 'movimentos' },
      { key: 'predileta', opts: 'o22-o28', max: 1 },
      { key: 'praticas', opts: 'o29-o35', max: 2 },
    ],
  },
  lunatico: {
    ordem: ['MOVIMENTOS', 'EQUIPAMENTOS'],
    grupos: [
      { key: 'movimentos', opts: 'o1-o8', max: 3, bonus: 'movimentos' },
      { key: 'normais', opts: 'o9-o14', max: 1 },
      { key: 'ocultas', opts: 'o15-o20', max: 2 },
    ],
    bonusStats: { o2: { stats: { est: 1 }, max: 3 } }, // Olhos de louco
  },
  monstruoso: {
    ordem: ['RAÇA', 'MALDIÇÃO, ESCOLHA UMA:', 'ATAQUES NATURAIS', 'MOVIMENTOS', 'EQUIPAMENTOS'],
    grupos: [
      { key: 'maldicao', opts: 'o1-o4', max: 1 },
      // "uma Base e um extra para ela, ou então duas Bases"
      { key: 'ataques', opts: 'o5-o11', max: 2, peloMenos: { opts: 'o5-o8', n: 1, rotulo: 'base' }, bonus: 'ataques' },
      { key: 'movimentos', opts: 'o12-o23', max: 2, bonus: 'movimentos' },
      { key: 'armas', opts: 'o24-o31', min: 0, max: 1 },
    ],
    subs: {
      o2: [{ tipo: 'texto', rotulo: 'Substância' }],
      o3: [{ max: 1, lista: { depois: 'Escolha entre:', sep: ',' }, rotulo: 'Emoção' }],
      o22: [{ tipo: 'texto', rotulo: 'Forma(s)' }],
      o23: [{ tipo: 'movimento', rotulo: 'Movimento emprestado' }],
    },
  },
  mundano: {
    ordem: ['MOVIMENTOS', 'EQUIPAMENTOS'],
    grupos: [
      { key: 'movimentos', opts: 'o1-o8', max: 3, bonus: 'movimentos' },
      { key: 'armas', opts: 'o9-o14', max: 2 },
      { key: 'transporte', opts: 'o15-o20', max: 1 },
    ],
  },
  profissional: {
    ordem: ['AGÊNCIA', 'MOVIMENTOS', 'EQUIPAMENTOS'],
    grupos: [
      { key: 'recursos', opts: 'o1-o10', max: 2, bonus: 'recursos' },
      { key: 'burocracia', opts: 'o11-o19', max: 2 },
      { key: 'movimentos', opts: 'o21-o27', max: 3, bonus: 'movimentos' },
      { key: 'pesadas', opts: 'o28-o32', max: 1 },
      { key: 'normais', opts: 'o33-o37', max: 2 },
    ],
    bonusStats: { o22: { stats: { fir: 1 }, max: 3 } }, // Inabalável
    subs: {
      o27: [
        { key: 'o27_boas', max: 2, lista: { li: 0, sep: ';' }, rotulo: 'Duas coisas boas' },
        { key: 'o27_ruins', max: 1, lista: { li: 1, sep: ';' }, rotulo: 'Uma coisa ruim' },
      ],
    },
    paragrafos: [
      {
        inicio: 'Você recebe ou um colete', key: 'protecao', max: 1, rotulo: 'Proteção',
        labels: ['colete a prova de balas [1-armadura oculto]', 'armadura de combate [2-armadura pesada]'],
      },
    ],
  },
  sinistro: {
    ordem: ['MOVIMENTOS', 'SEU LADO SOMBRIO', 'EQUIPAMENTOS'],
    grupos: [
      { key: 'movimentos', opts: 'o1-o8', max: 3, bonus: 'movimentos' },
      { key: 'lado', opts: 'o9-o24', max: 3, bonus: 'lado' },
      { key: 'armas', opts: 'o25-o29', max: 2 },
    ],
    paragrafos: [
      { inicio: 'Você recebe duas armas normais e qualquer item', key: 'amuleto', tipo: 'texto', rotulo: 'Item ou amuleto de poder' },
    ],
  },
  viajante: {
    ordem: ['MEIO DE TRANSPORTE, ESCOLHA UM:', 'MOVIMENTOS', 'EQUIPAMENTOS'],
    grupos: [
      { key: 'meio', opts: 'o1-o4', max: 1 },
      { key: 'movimentos', opts: 'o6-o14', max: 3, bonus: 'movimentos' },
      { key: 'dispositivos', opts: 'o15-o21', max: 2 },
      { key: 'arma', opts: 'o22-o26', max: 1 },
    ],
    subs: {
      // Efeito borboleta: escolhido ao marcar o movimento (sem troca a cada mistério, por decisão da mesa)
      o6: [
        { key: 'o6_mais', tipo: 'stats', max: 1, delta: 1, limite: 3, distinto: 'o6_menos', rotulo: 'Recebe +1 (máximo +3)' },
        { key: 'o6_menos', tipo: 'stats', max: 1, delta: -1, limite: -2, distinto: 'o6_mais', rotulo: 'Recebe −1 (mínimo −2)' },
      ],
      o25: [{ tipo: 'texto', rotulo: 'Alcance e 3 marcas' }],
      o26: [{ tipo: 'texto', rotulo: 'Alcance e 1 marca' }],
    },
  },
}
