// ============================================================
// bookData.js — Dados oficiais do livro Achtung! Cthulhu 2d20
// Fonte: Livro do Jogador (PT-BR)
// ATENÇÃO: Não modificar sem consultar o livro-fonte.
// ============================================================

// ============================================================
// PARTE 1 — ARQUÉTIPOS
// PARTE 2 — ANTECEDENTES
// ============================================================

export const ARQUETIPOS = [
  {
    id: 'comandante',
    nome: 'Comandante',
    descricao: 'Balas, bombas e baionetas não são úteis por si só... elas precisam ser implantadas no lugar e momento certos para vencer batalhas. Um Comandante é um mestre nisso, capaz de ver o panorama maior e organizar as tropas e recursos à sua disposição para que todos possam fazer seu trabalho com a máxima eficiência.',
    atributosBonus: {
      coordination: 2,
      discernment: 1,
      reason: 2,
      will: 1,
    },
    periciasBonus: {
      academia: 1,
      combater: 2,
      furtividade: 1,
      persuasao: 1,
      sobrevivencia: 2,
      taticas: 2,
    },
    focosPermitidos: ['combater', 'sobrevivencia', 'taticas'],
    talentos: [
      {
        nome: 'Guia dos Ermos',
        palavrasChave: ['Comandante', 'Sobrevivência'],
        efeito: 'Você é hábil não só em se manter vivo no campo de batalha, mas também em ajudar os outros a fazer o mesmo. Quando um membro do seu grupo fizer um teste de Sobrevivência e você não puder auxiliar, você pode gastar 2 de ímpeto para auxiliar mesmo assim, representando sua orientação e conselhos. Qualquer teste auxiliado dessa forma tem a margem de complicação aumentada em 1.',
      },
      {
        nome: 'Oportunista',
        palavrasChave: ['Comandante', 'Combater'],
        efeito: 'Você tem um talento especial para aproveitar os erros cometidos pelo inimigo. Como uma reação, quando um inimigo sofrer uma complicação ou falhar em um teste Desafiador (D3) ou maior, você pode gastar 2 de ímpeto para criar uma Verdade, que deve representar uma vantagem tática e que dura apenas até o final dessa cena de ação.',
      },
      {
        nome: 'Líder Nato',
        palavrasChave: ['Comandante', 'Táticas', 'Fortuna'],
        efeito: 'Você tem uma habilidade natural quando se trata de liderar os outros e trazer o melhor neles. Você pode gastar um ponto de Fortuna para que um único aliado ganhe imediatamente um ponto de Fortuna.',
      },
    ],
    pertences: 'No início de cada aventura, você pode requisitar gratuitamente um item com até Restrição 2.',
    pertencesEstruturado: [
      { tipo: 'passivo', descricao: 'No início de cada aventura, você pode requisitar gratuitamente um item com até Restrição 2.' },
    ],
  },

  {
    id: 'cranio',
    nome: 'Crânio',
    descricao: 'Um Crânio sabe como as coisas funcionam. Eles têm um vasto conhecimento técnico e prático, e o talento para aplicar esses saberes. Se um Crânio não souber alguma coisa, provavelmente pode descobrir através da tentativa e erro, e eles não têm medo de sujar as mãos.',
    atributosBonus: {
      coordination: 2,
      discernment: 1,
      strength: 1,
      reason: 2,
    },
    periciasBonus: {
      academia: 1,
      engenharia: 2,
      furtividade: 1,
      medicina: 2,
      observar: 1,
      veiculos: 2,
    },
    focosPermitidos: ['engenharia', 'medicina', 'veiculos'],
    talentos: [
      {
        nome: 'Forçar os Limites',
        palavrasChave: ['Crânio', 'Engenharia'],
        efeito: 'Seu conhecimento de veículos permite que você os force ao limite. Se você puder mexer no motor do veículo, poderá fazer um teste Desencorajador (D3) de Coordenação + Veículos. Se for bem-sucedido, a Velocidade do veículo aumenta em 1, ou o veículo passa a contar sua Escala como se fosse 1 a menos para fins de terreno e manobras. No entanto, esses ajustes podem deixá-lo menos confiável — todo teste feito para operá-lo tem a margem de complicação aumentada em 1. Os benefícios deste talento terminam no final da cena.',
      },
      {
        nome: 'Protótipo',
        palavrasChave: ['Crânio', 'Engenharia'],
        efeito: 'Você consegue construir dispositivos incomuns e experimentais fazendo um teste Desafiador (D2) de Engenharia. Quando fizer isso, escolha um talento da seção de Talentos e aplique seus benefícios ao dispositivo. Quem usar o dispositivo pode aplicar esse talento aos testes que fizer. Após o dispositivo ser usado, jogue 1 mais 1 adicional para cada uso após o primeiro; se obtiver um Efeito, o dispositivo para de funcionar e não pode ser consertado.',
      },
      {
        nome: 'Salvador',
        palavrasChave: ['Crânio', 'Fortuna', 'Medicina'],
        efeito: 'Você consegue trazer as pessoas de volta da beira da morte. Você facilita qualquer teste de Medicina feito para estabilizar um personagem moribundo. Você também pode tentar salvar a vida de um personagem que morreu durante a cena atual. Para isso, é necessário gastar 1 de Fortuna e fazer um teste Desencorajador (D3) de Coordenação + Medicina. Se for bem-sucedido, o personagem é derrotado, em vez de morto.',
      },
    ],
    pertences: 'Escolha dois conjuntos de ferramentas, dois contatos ou um conjunto de ferramentas e um contato: Ferramentas de mecânico ou um contato (mecânico); Ferramentas de eletricista ou um contato (eletricista); Kit de demolição ou um contato (demolições); Sacola de médico ou um contato (medicina).',
    pertencesEstruturado: [
      { tipo: 'escolha', quantia: 2, opcoes: [
        { tipo: 'item', nome: 'Ferramentas de mecânico' },
        { tipo: 'contato', descricao: 'Mecânico' },
        { tipo: 'item', nome: 'Ferramentas de eletricista' },
        { tipo: 'contato', descricao: 'Eletricista' },
        { tipo: 'item', nome: 'Kit de demolição' },
        { tipo: 'contato', descricao: 'Demolições' },
        { tipo: 'item', nome: 'Sacola de médico' },
        { tipo: 'contato', descricao: 'Medicina' },
      ]},
    ],
  },

  {
    id: 'faz-tudo',
    nome: 'Faz-Tudo',
    descricao: 'Praticamente nascido ao volante, você é um especialista em fazer pessoas e suprimentos estarem onde precisam. Você é inestimável durante missões perigosas, não apenas por sua habilidade em operar veículos, mas por sua capacidade de mantê-los funcionando nas piores condições.',
    atributosBonus: {
      strength: 1,
      coordination: 2,
      discernment: 1,
      reason: 2,
    },
    periciasBonus: {
      atletismo: 1,
      engenharia: 2,
      persuasao: 2,
      resiliencia: 1,
      sobrevivencia: 1,
      veiculos: 2,
    },
    focosPermitidos: ['engenharia', 'persuasao', 'veiculos'],
    talentos: [
      {
        nome: 'Mantendo a Eficiência',
        palavrasChave: ['Faz-Tudo', 'Engenharia'],
        efeito: 'Você adora alterar e mexer no seu veículo, sendo capaz de mantê-lo funcionando nas piores condições. Ao operar um veículo, se você gastou tempo fazendo manutenção e modificando-o, pode gastar 2 de ímpeto quando fizer um teste de Veículos para ignorar os efeitos de quaisquer danos que ele venha a sofrer durante o teste.',
      },
      {
        nome: 'Nascido para o Volante',
        palavrasChave: ['Faz-Tudo', 'Veículos'],
        efeito: 'Você está sempre no controle de qualquer veículo que opere e pode fazer acrobacias incríveis que poucos ousariam. Ao fazer um teste Desencorajador (D3) de Veículos ou mais para operar um veículo, você pode gastar até 3 de ímpeto para facilitá-lo em um, dois ou três passos (um ponto de ímpeto para cada passo). A margem de complicação do teste aumenta na mesma medida em que a dificuldade é facilitada, devido ao risco da manobra.',
      },
      {
        nome: 'Quartel-Mestre',
        palavrasChave: ['Faz-Tudo', 'Persuasão', 'Fortuna'],
        efeito: 'Você está acostumado a transportar suprimentos e lidar com fornecedores, e é conhecido por ter alguns itens ocasionais para emergências. Você pode gastar um ponto de Fortuna para revelar que tem um item específico disponível. Esse objeto está escondido em suas roupas, armazenado em um veículo que você está usando ou em um local oculto próximo (o mestre determina onde ele está). Precisa ser um item menor de Restrição 3 ou menos, e não pode ser uma arma, a menos que ela tenha a qualidade Arremessável.',
      },
    ],
    pertences: 'Ferramentas de mecânico; Um contato (veículos).',
    pertencesEstruturado: [
      { tipo: 'item', nome: 'Ferramentas de mecânico' },
      { tipo: 'contato', descricao: 'Veículos' },
    ],
  },

  {
    id: 'infiltrador',
    nome: 'Infiltrador',
    descricao: 'Infiltradores são proficientes em entrar em lugares que não deveriam. Eles se destacam em evitar detecção, burlar a segurança e subtrair objetos de valor e segredos de locais seguros. Em meio ao furor da guerra, a capacidade de se mover indetectável lhes concede uma vantagem crucial.',
    atributosBonus: {
      agility: 2,
      coordination: 2,
      discernment: 1,
      strength: 1,
    },
    periciasBonus: {
      atletismo: 2,
      combater: 2,
      engenharia: 1,
      furtividade: 2,
      observar: 1,
      sobrevivencia: 1,
    },
    focosPermitidos: ['atletismo', 'combater', 'furtividade'],
    talentos: [
      {
        nome: 'Acrobático',
        palavrasChave: ['Infiltrador', 'Atletismo'],
        efeito: 'Você é extremamente flexível e atlético, capaz de ultrapassar obstáculos com rapidez e um mínimo de esforço. Ao tentar superar um obstáculo, você pode gastar 2 de ímpeto para contorná-lo imediatamente, sem a necessidade de testes e sem o uso de ferramentas como equipamento de escalada. O obstáculo precisa ser algo que você possa ultrapassar normalmente, como uma abertura que pode ser saltada, um muro ou penhasco que pode ser escalado.',
      },
      {
        nome: 'Assassinato',
        palavrasChave: ['Infiltrador', 'Combater'],
        efeito: 'Você é mortal contra inimigos que não detectaram sua presença, derrubando-os com rapidez e silenciosamente. Ao atacar um alvo desprevenido, você pode gastar 2 de ímpeto para cometer um assassinato, ganhando a qualidade de arma Violenta no ataque (ou um +2 de dano adicional, se o ataque já for Violento). Se o alvo for derrotado pelo seu assassinato, o ataque ocorre em silêncio e não é ouvido por ninguém.',
      },
      {
        nome: 'Passo Silencioso',
        palavrasChave: ['Infiltrador', 'Furtividade'],
        efeito: 'Seus passos são bastante silenciosos, e passar despercebido é tão natural para você quanto respirar. Sempre que sofrer uma complicação ao fazer um teste de Furtividade, você pode gastar 1 de ímpeto para impedir que ela ocorra.',
      },
    ],
    pertences: 'Roupas camufladas; Equipamento de escalada; Ferramentas de ladrão.',
    pertencesEstruturado: [
      { tipo: 'item', nome: 'Roupas camufladas' },
      { tipo: 'item', nome: 'Equipamento de escalada' },
      { tipo: 'item', nome: 'Ferramentas de ladrão' },
    ],
  },

  {
    id: 'investigador',
    nome: 'Investigador',
    descricao: 'Investigadores possuem um apetite insaciável pela verdade e vão até os confins da terra para encontrá-la. Com a propaganda de guerra dominando ambos os lados do conflito, a verdade é mais difícil de discernir, mas mais valiosa do que nunca. Detetives particulares, policiais militares e jornalistas se embrenham na verdade por trás das manchetes, conforme a vida das pessoas é virada de cabeça para baixo, e esses indivíduos são grandes agentes.',
    atributosBonus: {
      agility: 1,
      coordination: 1,
      discernment: 2,
      reason: 2,
    },
    periciasBonus: {
      academia: 2,
      engenharia: 1,
      furtividade: 1,
      medicina: 2,
      observar: 2,
      persuasao: 1,
    },
    focosPermitidos: ['academia', 'medicina', 'observar'],
    talentos: [
      {
        nome: 'Análise Detalhada',
        palavrasChave: ['Investigador', 'Observar'],
        efeito: 'Você presta bastante atenção nos detalhes, estudando cuidadosamente tudo o que observa. Uma vez por cena, você pode gastar 2 de ímpeto para fazer três perguntas ao mestre sobre ela, conforme o gasto de ímpeto Obter Informação, mas sem precisar de teste.',
      },
      {
        nome: 'A Vanguarda da Medicina',
        palavrasChave: ['Investigador', 'Medicina'],
        efeito: 'Você conhece os mais novos avanços da ciência médica, desde novas técnicas cirúrgicas até novos medicamentos e o estudo de novas doenças; com esse conhecimento, você está preparado para qualquer coisa. Ao fazer um teste Desencorajador (D3) de Medicina ou mais, você pode gastar até 3 de ímpeto para facilitá-lo em um, dois ou três passos (um ponto de ímpeto a cada passo). A margem de complicação do teste aumenta na mesma medida em que a dificuldade é reduzida, devido aos últimos avanços na medicina nem sempre serem seguros.',
      },
      {
        nome: 'Polímata',
        palavrasChave: ['Investigador', 'Academia'],
        efeito: 'Você é bastante culto e multitalentoso, com experiência em uma ampla variedade de campos. Uma vez por cena, você pode gastar 2 de ímpeto para ganhar um foco adicional enquanto ela durar. É possível escolher ganhar o foco em qualquer perícia que o personagem tenha graduação 2 ou mais.',
      },
    ],
    pertences: 'Escolha 1 conjunto de ferramentas ou um contato: Ferramentas analíticas ou um contato (Ciência); Um kit de primeiros socorros ou um contato (Medicina); Uma pistola ou um contato (Academia).',
    pertencesEstruturado: [
      { tipo: 'escolha', quantia: 1, opcoes: [
        { tipo: 'item', nome: 'Ferramentas analíticas' },
        { tipo: 'contato', descricao: 'Ciência' },
        { tipo: 'item', nome: 'Kit de primeiros socorros' },
        { tipo: 'contato', descricao: 'Medicina' },
        { tipo: 'catalogo', descricao: 'Uma pistola', filtro: 'pistola', maxRestricao: 3 },
        { tipo: 'contato', descricao: 'Academia' },
      ]},
    ],
  },

  {
    id: 'ocultista',
    nome: 'Ocultista',
    descricao: 'O Ocultista se embrenhou em meio às forças mais profundas e estranhas do universo, descobrindo os segredos de como dobrá-las à sua vontade. Embora apenas os Ocultistas mais egoístas e delirantes possam reivindicar domínio sobre o sobrenatural, até mesmo um parco talento para o esotérico pode ser poderoso nas mãos certas... ou perigoso nas erradas.',
    // Atributos fixos
    atributosBonus: {
      strength: 1,
      will: 2,
    },
    // O jogador escolhe UMA das duas opções abaixo
    atributosBonusEscolha: [
      { discernment: 2, reason: 1 },
      { discernment: 1, reason: 2 },
    ],
    // Perícias fixas
    periciasBonus: {
      furtividade: 1,
      observar: 1,
      persuasao: 2,
      resiliencia: 2,
    },
    // O jogador escolhe UMA das duas opções abaixo
    periciasBonosEscolha: [
      { academia: 2, sobrevivencia: 1 },
      { academia: 1, sobrevivencia: 2 },
    ],
    focosPermitidos: ['academia', 'persuasao', 'resiliencia', 'sobrevivencia'],
    talentos: [
      {
        nome: 'Erudito do Oculto',
        palavrasChave: ['Ocultista', 'Academia', 'Conjurador'],
        efeito: 'Você é versado em tradições arcanas, parapsicologia e outros campos de estudo sobrenatural. Além disso, conhece algumas técnicas para fortalecer a mente contra os horrores do oculto. Você é um conjurador, conforme descrito em mais detalhes no Capítulo 9: A Magia e o Mythôs. Você ganha uma quantidade de Coragem igual à sua perícia Academia (isso não se acumula com o talento Corajoso).',
      },
      {
        nome: 'Invocador',
        palavrasChave: ['Ocultista', 'Persuasão', 'Conjurador'],
        efeito: 'Você já conversou com entidades de além das fronteiras do mundo material e é hábil em convocar criaturas de outras dimensões além do tempo e do espaço. Você é um conjurador, conforme descrito em mais detalhes no Capítulo 9: A Magia e o Mythôs. Além disso, sempre que você conjurar um feitiço de invocação, você pode gastar 2 de ímpeto para garantir a obediência da criatura invocada. Essa lealdade dura uma quantidade de minutos (ou rodadas em combate) igual à sua perícia Persuasão. Depois disso a criatura precisa ser comandada conforme as regras habituais.',
      },
      {
        nome: 'Um Preço a Pagar',
        palavrasChave: ['Ocultista', 'Resiliência', 'Conjurador'],
        efeito: 'Você entende que a magia sempre cobra um preço, e paga esse custo voluntariamente, até mesmo sacrificando mais de si mesmo para alimentar os seus feitiços. Você é um conjurador, conforme descrito em mais detalhes no Capítulo 9: A Magia e o Mythôs. Além disso, sempre que você conjurar um feitiço, pode ganhar 2 de ímpeto extra que pode ser utilizado apenas para aprimorar os efeitos do feitiço, e não pode ser guardado. Se fizer isso, o Custo do feitiço aumenta em +2, e será estresse físico, em vez de mental.',
      },
    ],
    pertences: 'Ferramentas Ritualísticas; Um contato com foco em Ocultismo ou Misticismo.',
    pertencesEstruturado: [
      { tipo: 'item', nome: 'Ferramentas Ritualísticas' },
      { tipo: 'contato_foco_opcoes', opcoes: ['Ocultismo', 'Misticismo'] },
    ],
  },

  {
    id: 'soldado',
    nome: 'Soldado',
    descricao: 'Soldados se destacam no combate, derrotando inimigos e protegendo seus companheiros. Mesmo em tempos de guerra, quando exércitos inteiros marcham pelas cidades da Europa, um Soldado se destaca no campo de batalha: eles geralmente sobrevivem a horrores e desastres que outros não conseguiriam e são escolhidos para missões especiais de combate.',
    atributosBonus: {
      agility: 1,
      coordination: 2,
      discernment: 1,
      strength: 2,
    },
    periciasBonus: {
      atletismo: 1,
      combater: 2,
      observar: 1,
      resiliencia: 2,
      sobrevivencia: 2,
      taticas: 1,
    },
    focosPermitidos: ['combater', 'resiliencia', 'sobrevivencia'],
    talentos: [
      {
        nome: 'Atrair o Fogo Inimigo',
        palavrasChave: ['Soldado', 'Resiliência'],
        efeito: 'Você protege seus aliados atraindo a atenção do inimigo. Após atacar, você pode gastar 2 de ímpeto para atrair a atenção do inimigo. Se fizer isso, qualquer inimigo capaz de atacá-lo e que tente acertar um dos seus aliados terá a dificuldade do ataque aumentada em um passo.',
      },
      {
        nome: 'Dominar o Campo de Batalha',
        palavrasChave: ['Comandante', 'Táticas', 'Fortuna'],
        efeito: 'Você é um guerreiro astuto, proficiente em aproveitar o terreno ao seu redor ao máximo. Você pode gastar um ponto de Fortuna para fazer uma das seguintes Reações: Tiro Rápido!: Quando um inimigo a alcance Médio de você falhar em um teste para se mover por terreno difícil, você pode causar uma quantidade de estresse físico igual à sua perícia Combater. Você não pode gastar munição para fazer desse um ataque de Barragem, ou gastar ímpeto para aumentar a quantidade da jogada de estresse. Você precisa estar empunhando uma arma de fogo funcional e carregada para fazer esta reação. Abaixem!: Quando um inimigo for bem-sucedido em um ataque a distância contra você ou um aliado dentro do seu alcance Médio, o alvo do ataque ganha uma quantidade de resistência de Cobertura igual à sua perícia Observar até o início do próximo turno.',
      },
      {
        nome: 'Exército de Uma Pessoa Só',
        palavrasChave: ['Comandante', 'Combater'],
        efeito: 'Você é mortal com várias armas e formas de combate diferentes. Ao atacar, você pode gastar 2 de ímpeto para adicionar um dos seguintes efeitos de arma ao ataque: Atordoante, Drenagem, Perfurante. Apenas um efeito de arma pode ser adicionado a um ataque dessa forma.',
      },
    ],
    pertences: 'Uma arma com Restrição 3 ou menos; Uma pistola com Restrição 1.',
    pertencesEstruturado: [
      { tipo: 'catalogo', descricao: 'Uma arma com Restrição 3 ou menos', filtro: 'arma', maxRestricao: 3 },
      { tipo: 'catalogo', descricao: 'Uma pistola com Restrição 1', filtro: 'pistola', maxRestricao: 1 },
    ],
  },

  {
    id: 'vigarista',
    nome: 'Vigarista',
    descricao: 'Os Vigaristas sentem-se em casa em meio à sociedade, falando quaisquer línguas e adotando quaisquer traços de personalidade que os permitam seguir adiante. Eles são manipuladores habilidosos, capazes de intimidar, seduzir, persuadir e enganar, assim pavimentando seu caminho pela vida, e também são igualmente talentosos em detectar quando outra pessoa está tentando manipulá-los.',
    atributosBonus: {
      coordination: 1,
      discernment: 2,
      reason: 1,
      will: 2,
    },
    periciasBonus: {
      academia: 1,
      furtividade: 2,
      observar: 2,
      persuasao: 2,
      resiliencia: 1,
      taticas: 1,
    },
    focosPermitidos: ['furtividade', 'observar', 'persuasao'],
    talentos: [
      {
        nome: 'Camaleão',
        palavrasChave: ['Vigarista', 'Furtividade', 'Fortuna'],
        efeito: 'Você tem bastante habilidade em se disfarçar de outras pessoas, e até mesmo a identidade com que você se apresenta pode não ser verdadeira. Quando você adota um disfarce, pode gastar um ponto de Fortuna para estabelecer que você já tem uma persona apropriada, com documentos adequados e outras coisas consigo ou em um local seguro nas proximidades.',
      },
      {
        nome: 'Leitura Fria',
        palavrasChave: ['Vigarista', 'Observar'],
        efeito: 'Você sabe como usar observações simples e declarações importantes para parecer conhecer mais de um assunto do que realmente sabe. Quando estiver conversando, você pode gastar 2 de ímpeto para fazer uma leitura fria, e os outros personagens presentes (que não são parte do truque) acreditarão erroneamente que você tem alguma fonte de conhecimento detalhada e específica.',
      },
      {
        nome: 'Um Jeitinho com as Palavras',
        palavrasChave: ['Vigarista', 'Persuasão'],
        efeito: 'Você nunca diz nada além do que precisa. Sempre que sofrer uma complicação ao fazer um teste de Persuasão, pode gastar 1 de ímpeto para impedir que ela ocorra.',
      },
    ],
    pertences: 'Kit de disfarces; Um contato, para qualquer perícia ou foco.',
    pertencesEstruturado: [
      { tipo: 'item', nome: 'Kit de disfarces' },
      { tipo: 'contato_foco_livre' },
    ],
  },
]

// ============================================================
// PARTE 2 — ANTECEDENTES
// Fonte: Livro do Jogador pp. 67–71
// focoPrincipal: perícia da qual deve escolher 1 foco obrigatoriamente
// palavraChaveTalento: keyword do talento que o jogador escolhe
// verdadesSugeridas: opções listadas no livro (+ opção livre)
// ============================================================

export const ANTECEDENTES = [
  {
    id: 'academico',
    nome: 'Acadêmico',
    descricao: 'Você passou boa parte de sua vida entre livros e outras fontes de conhecimento. É possível que seja especialista em um campo acadêmico específico, como um historiador, talvez um cientista, ou você pode ter passado seu tempo preservando e espalhando conhecimento, quem sabe como professor, bibliotecário ou curador de museu.',
    atributosBonus: {
      coordination: 2,
      discernment: 1,
      reason: 2,
      will: 1,
    },
    periciasBonus: {
      academia: 2,
      observar: 1,
      persuasao: 1,
    },
    focoPrincipal: 'academia',
    palavraChaveTalento: 'Academia',
    verdadesSugeridas: ['Curador de Museu', 'Doutor em (assunto)', 'Professor (assunto)'],
    pertences: 'Um contato (Academia).',
    pertencesEstruturado: [
      { tipo: 'contato', descricao: 'Academia' },
    ],
  },

  {
    id: 'agente-secreto',
    nome: 'Agente Secreto',
    descricao: 'Você atua por trás das linhas inimigas, como agente de um serviço especial, como na Executiva de Operações Especiais (SOE) ou o Escritório de Serviços Estratégicos (OSS). Seja reunindo inteligência e cultivando redes de informantes ou semeando discórdia através de sabotagem e propaganda, seu trabalho é arriscado, mas vital, especialmente para apoiar células de resistência que lutam para libertar suas próprias nações da ocupação.',
    atributosBonus: {
      agility: 2,
      coordination: 1,
      discernment: 1,
      will: 2,
    },
    periciasBonus: {
      persuasao: 1,
      furtividade: 2,
      taticas: 1,
    },
    focoPrincipal: 'furtividade',
    palavraChaveTalento: 'Furtividade',
    verdadesSugeridas: ['Assassino Silencioso', 'Identidade Falsa', 'Membro da Resistência'],
    pertences: 'Documentos de identidade e 1 arma com Restrição 2 ou menos com a qualidade Ocultável.',
    pertencesEstruturado: [
      { tipo: 'item', nome: 'Documentos de identidade' },
      { tipo: 'catalogo', descricao: 'Uma arma com Restrição 2 ou menos com a qualidade Ocultável', filtro: 'arma', maxRestricao: 2, qualidadesNecessarias: ['Ocultável'] },
    ],
  },

  {
    id: 'aeronautica',
    nome: 'Aeronáutica',
    descricao: 'Você pertence a uma das Forças Aéreas das nações aliadas, como piloto, parte da tripulação de um bombardeiro, navegador ou membro da equipe terrestre que cuida dos aviões entre os voos.',
    atributosBonus: {
      agility: 1,
      coordination: 2,
      discernment: 2,
      reason: 1,
    },
    periciasBonus: {
      engenharia: 1,
      taticas: 1,
      veiculos: 2,
    },
    focoPrincipal: 'veiculos',
    palavraChaveTalento: 'Veículos',
    verdadesSugeridas: ['Ás de Caças', 'Mecânico Talentoso', 'Navegador Especialista'],
    pertences: 'Ferramentas de Mecânico ou um contato com um dos seguintes focos: Mecânica, Veículos Pesados ou Aeronaves.',
    pertencesEstruturado: [
      { tipo: 'escolha', quantia: 1, opcoes: [
        { tipo: 'item', nome: 'Ferramentas de mecânico' },
        { tipo: 'contato', descricao: 'Mecânica' },
        { tipo: 'contato', descricao: 'Veículos Pesados' },
        { tipo: 'contato', descricao: 'Aeronaves' },
      ]},
    ],
  },

  {
    id: 'artista',
    nome: 'Artista',
    descricao: 'Você é um ator, comediante, músico ou praticante de algum outro ramo do entretenimento. Em meio aos horrores e dificuldades dos tempos de guerra, o entretenimento é uma forma importante de manter o espírito de luta, além de um veículo para propaganda governamental, e muitos artistas são alistados para ajudar a manter o moral em casa e no exterior.',
    atributosBonus: {
      agility: 2,
      coordination: 1,
      discernment: 1,
      will: 2,
    },
    periciasBonus: {
      atletismo: 1,
      observar: 1,
      persuasao: 2,
    },
    focoPrincipal: 'persuasao',
    palavraChaveTalento: 'Persuasão',
    verdadesSugeridas: ['A Voz de uma Geração', 'Artista de uma Obra Só', 'Estrela do Palco ou das Telas'],
    pertences: 'Um contato (Persuasão).',
    pertencesEstruturado: [
      { tipo: 'contato', descricao: 'Persuasão' },
    ],
  },

  {
    id: 'atleta',
    nome: 'Atleta',
    descricao: 'Você é um atleta profissional. Apesar de tentar manter um grau de normalidade, muitos esportes profissionais foram suspensos durante a guerra, e os atletas encontraram outras formas de contribuir para o esforço de guerra. Militares qualificados também eram chamados para atuar em partidas do Exército contra a Marinha e outras competições esportivas semelhantes, a fim de manter o moral elevado no fronte doméstico.',
    atributosBonus: {
      agility: 2,
      coordination: 1,
      strength: 2,
      discernment: 1,
    },
    periciasBonus: {
      atletismo: 2,
      combater: 1,
      resiliencia: 1,
    },
    focoPrincipal: 'atletismo',
    palavraChaveTalento: 'Atletismo',
    verdadesSugeridas: ['Boxeador Olímpico', 'Campeão de Beisebol', 'Estrela do Futebol'],
    pertences: 'Um taco de beisebol, taco de críquete ou outro equipamento esportivo de sua escolha, que pode servir como arma improvisada.',
    pertencesEstruturado: [
      { tipo: 'livre', descricao: 'Equipamento esportivo de sua escolha, como arma improvisada (ex: taco de beisebol, taco de críquete)' },
    ],
  },

  {
    id: 'engenheiro',
    nome: 'Engenheiro',
    descricao: 'Você lida com máquinas grandes e pequenas, consertando coisas quebradas para ganhar a vida ou projetando novos equipamentos e tecnologia de ponta. Em tempos de guerra, muitas das melhores mentes nesses campos ajudam a produzir as ferramentas para vencer o conflito, enquanto outras são vitais para manter as coisas funcionando direito em suas nações.',
    atributosBonus: {
      agility: 1,
      coordination: 2,
      discernment: 1,
      reason: 2,
    },
    periciasBonus: {
      academia: 1,
      engenharia: 2,
      observar: 1,
    },
    focoPrincipal: 'engenharia',
    palavraChaveTalento: 'Engenharia',
    verdadesSugeridas: ['Gênio Experimental', 'Mecânico Diligente', 'Técnico Teórico'],
    pertences: 'Ferramentas de mecânico, ferramentas de eletricista ou um contato com um dos seguintes focos: Eletrônica ou Mecânica.',
    pertencesEstruturado: [
      { tipo: 'escolha', quantia: 1, opcoes: [
        { tipo: 'item', nome: 'Ferramentas de mecânico' },
        { tipo: 'item', nome: 'Ferramentas de eletricista' },
        { tipo: 'contato', descricao: 'Eletrônica' },
        { tipo: 'contato', descricao: 'Mecânica' },
      ]},
    ],
  },

  {
    id: 'criminoso',
    nome: 'Criminoso',
    descricao: 'Você é um criminoso de carreira, pertencente ao lado errado da lei, embora os tempos de guerra possam ter mudado um pouco sua lealdade. Diversas organizações criminosas usam suas conexões para ajudar seus países, enquanto outras aproveitam o caos da guerra para expandir os mercados paralelos.',
    atributosBonus: {
      agility: 2,
      discernment: 2,
      strength: 1,
      will: 1,
    },
    periciasBonus: {
      furtividade: 1,
      persuasao: 2,
      taticas: 1,
    },
    focoPrincipal: 'persuasao',
    palavraChaveTalento: 'Persuasão',
    verdadesSugeridas: ['Caixeiro Viajante Desonesto', 'Comerciante do Mercado Paralelo', 'Gênio do Crime'],
    pertences: '1 item com Restrição 1 ou menos.',
    pertencesEstruturado: [
      { tipo: 'catalogo', descricao: '1 item com Restrição 1 ou menos', filtro: 'qualquer', maxRestricao: 1 },
    ],
  },

  {
    id: 'exercito',
    nome: 'Exército',
    descricao: 'Você pertence a um dos exércitos das nações aliadas. Talvez você seja um soldado de infantaria, mas os exércitos são organizações enormes, com várias funções diferentes, desde tripulações de tanques e artilharia, logística e pessoal técnico, a batedores e atiradores, também incluindo papéis de elite, como paraquedistas e comandos.',
    atributosBonus: {
      agility: 2,
      coordination: 1,
      strength: 2,
      will: 1,
    },
    periciasBonus: {
      atletismo: 1,
      combater: 2,
      taticas: 1,
    },
    focoPrincipal: 'combater',
    palavraChaveTalento: 'Combater',
    verdadesSugeridas: ['Atirador Treinado', 'Comando Mortal', 'Paraquedista'],
    pertences: 'Um cinto de munição.',
    pertencesEstruturado: [
      { tipo: 'item', nome: 'Cinto de munição' },
    ],
  },

  {
    id: 'jornalista',
    nome: 'Jornalista',
    descricao: 'Você relata as notícias mais recentes e investiga os eventos que moldam a vida cotidiana. Com o mundo em guerra, as notícias são uma moeda importante como ferramenta de informação e propaganda, e entre os jornais, o rádio e os cinejornais, o novo é coberto com uma profundidade nunca antes vista.',
    atributosBonus: {
      coordination: 1,
      discernment: 2,
      reason: 1,
      will: 2,
    },
    periciasBonus: {
      academia: 1,
      observar: 2,
      persuasao: 1,
    },
    focoPrincipal: 'observar',
    palavraChaveTalento: 'Observar',
    verdadesSugeridas: ['Jornalista Premiado', 'Repórter Investigativo', 'Teórico da Conspiração Desequilibrado'],
    pertences: 'Uma câmera ou um conjunto de rádio portátil.',
    pertencesEstruturado: [
      { tipo: 'escolha', quantia: 1, opcoes: [
        { tipo: 'item', nome: 'Câmera' },
        { tipo: 'item', nome: 'Conjunto de rádio portátil' },
      ]},
    ],
  },

  {
    id: 'lider-espiritual',
    nome: 'Líder Espiritual',
    descricao: 'Seu personagem pode ser um sacerdote, xamã, praticante de ocultismo ou pesquisador do desconhecido, proveniente das nações aliadas ou dos cantos distantes do globo. Você perscruta os reinos além do mundo físico, procurando por iluminação, poder ou outras recompensas espirituais, muitas vezes guiando outros no processo.',
    atributosBonus: {
      agility: 1,
      discernment: 2,
      reason: 1,
      will: 2,
    },
    periciasBonus: {
      academia: 2,
      persuasao: 1,
      resiliencia: 1,
    },
    focoPrincipal: 'academia',
    palavraChaveTalento: 'Academia',
    verdadesSugeridas: ['Líder de Culto Mesmerizante', 'Médium Perspicaz', 'Pessoa Santa'],
    pertences: 'Roupas adequadas à sua posição, insígnias apropriadas e um contato (ocultismo).',
    pertencesEstruturado: [
      { tipo: 'item', nome: 'Roupas adequadas à sua posição' },
      { tipo: 'item', nome: 'Insígnias apropriadas' },
      { tipo: 'contato', descricao: 'Ocultismo' },
    ],
  },

  {
    id: 'marinha',
    nome: 'Marinha',
    descricao: 'Você é um marinheiro, levando a vida nos mares e oceanos do mundo, servindo como parte da tripulação de um navio de guerra, porta-aviões ou submarino. Os marinheiros têm empregos bastante técnicos e trabalham em pequenas equipes, muitas vezes precisando operar maquinário pesado.',
    atributosBonus: {
      agility: 2,
      coordination: 2,
      strength: 1,
      reason: 1,
    },
    periciasBonus: {
      engenharia: 1,
      taticas: 1,
      veiculos: 2,
    },
    focoPrincipal: 'veiculos',
    palavraChaveTalento: 'Veículos',
    verdadesSugeridas: ['Lobo do Mar', 'Submarinista Experiente', 'Tripulante Empolgado'],
    pertences: 'Ferramentas de mecânico ou ferramentas de engenheiro.',
    pertencesEstruturado: [
      { tipo: 'escolha', quantia: 1, opcoes: [
        { tipo: 'item', nome: 'Ferramentas de mecânico' },
        { tipo: 'item', nome: 'Ferramentas de engenheiro' },
      ]},
    ],
  },

  {
    id: 'motorista',
    nome: 'Motorista',
    descricao: 'Você passou sua vida profissional com as mãos num volante. Talvez tenha dirigido ônibus ou táxi, ou então trabalhasse como caminhoneiro, transportando carga. Você pode ser um aviador civil ou membro da marinha mercante, e todos esses personagens focados em transporte podem acabar usando suas habilidades em tempo de guerra, ajudando a transportar pessoas e suprimentos.',
    atributosBonus: {
      coordination: 2,
      discernment: 2,
      strength: 1,
      reason: 1,
    },
    periciasBonus: {
      atletismo: 1,
      engenharia: 1,
      veiculos: 2,
    },
    focoPrincipal: 'veiculos',
    palavraChaveTalento: 'Veículos',
    verdadesSugeridas: ['Louco por Velocidade', 'Motorista Obsessivo', 'Piloto Audaz'],
    pertences: 'Um contato com um dos seguintes focos: Carros, Veículos Pesados, Aeronaves ou Embarcações.',
    pertencesEstruturado: [
      { tipo: 'contato_foco_opcoes', opcoes: ['Carros', 'Veículos Pesados', 'Aeronaves', 'Embarcações'] },
    ],
  },

  {
    id: 'medico',
    nome: 'Médico',
    descricao: 'Você fez um juramento antigo de "primeiro, não prejudicar" e curar os doentes e feridos. Você pode ser um médico com treinamento extensivo, mas também pode ser uma enfermeira, psiquiatra ou farmacêutico. Médicos militares são encontrados em bases do exército e em hospitais de campanha ou navios hospitalares perto das linhas de frente.',
    atributosBonus: {
      coordination: 2,
      discernment: 1,
      reason: 2,
      will: 1,
    },
    periciasBonus: {
      academia: 1,
      medicina: 2,
      resiliencia: 1,
    },
    focoPrincipal: 'medicina',
    palavraChaveTalento: 'Medicina',
    verdadesSugeridas: ['Enfermeira Atenciosa', 'Médico de Frente de Batalha Determinado', 'Psicólogo Dedicado'],
    pertences: 'Um kit de primeiros socorros ou um contato (medicina).',
    pertencesEstruturado: [
      { tipo: 'escolha', quantia: 1, opcoes: [
        { tipo: 'item', nome: 'Kit de primeiros socorros' },
        { tipo: 'contato', descricao: 'Medicina' },
      ]},
    ],
  },

  {
    id: 'oficial-militar',
    nome: 'Oficial Militar',
    descricao: 'Você é um líder, treinado e comissionado para exercer autoridade dentro de um ramo das forças armadas da sua nação. Proveniente de uma família rica, com formação militar, ou talvez até mesmo membro de uma força colonial, você foi treinado em uma academia militar e mantém uma distância profissional dos seus subordinados.',
    atributosBonus: {
      agility: 1,
      discernment: 1,
      reason: 2,
      will: 2,
    },
    periciasBonus: {
      combater: 1,
      persuasao: 1,
      taticas: 2,
    },
    focoPrincipal: 'taticas',
    palavraChaveTalento: 'Táticas',
    verdadesSugeridas: ['Comandante da Linha de Frente', 'Estrategista Calculista', 'Líder Inspirador'],
    pertences: 'Uma vez por aventura, você pode reduzir em um passo a dificuldade de quaisquer solicitações especiais de requisição feitas para a Seção M ou a Majestic.',
    pertencesEstruturado: [
      { tipo: 'passivo', descricao: 'Uma vez por aventura, você pode reduzir em um passo a dificuldade de quaisquer solicitações especiais de requisição feitas para a Seção M ou a Majestic.' },
    ],
  },

  {
    id: 'operario',
    nome: 'Operário',
    descricao: 'Sua vida é de trabalho duro, mas seu excelente condicionamento físico e a escassez de trabalho nas indústrias de guerra geralmente significam que empregos não qualificados pagam um salário decente. Você pode trabalhar em uma fazenda, no setor de construção, em uma fábrica, com mineração, ou em um dos inúmeros outros trabalhos que há... ou então pode ter se envolvido em todo tipo de atividade ao longo dos anos.',
    atributosBonus: {
      agility: 1,
      coordination: 2,
      strength: 2,
      will: 1,
    },
    periciasBonus: {
      atletismo: 1,
      resiliencia: 2,
      sobrevivencia: 1,
    },
    focoPrincipal: 'resiliencia',
    palavraChaveTalento: 'Resiliência',
    verdadesSugeridas: ['Agricultor Esforçado', 'Mineiro Experiente', 'Pau para Toda Obra'],
    pertences: 'Um contato com um dos seguintes focos: Arquitetura, Mecânica, Treinar Animais, Forragear, Caça ou Orientação.',
    pertencesEstruturado: [
      { tipo: 'contato_foco_opcoes', opcoes: ['Arquitetura', 'Mecânica', 'Treinar Animais', 'Forragear', 'Caça', 'Orientação'] },
    ],
  },

  {
    id: 'politico',
    nome: 'Político',
    descricao: 'Você ocupa um cargo eleito ou trabalha para alguém que o faz. Você é bem-educado, tem boas conexões, conta com talento no campo da retórica e dos debates e é competente ao liderar. Um personagem com este antecedente pode estar em qualquer nível de política, e os Estados Unidos, em particular, têm vários cargos públicos e funcionários eleitos.',
    atributosBonus: {
      coordination: 1,
      discernment: 2,
      reason: 1,
      will: 2,
    },
    periciasBonus: {
      academia: 1,
      persuasao: 2,
      taticas: 1,
    },
    focoPrincipal: 'persuasao',
    palavraChaveTalento: 'Persuasão',
    verdadesSugeridas: ['Figura Pública Carismática', 'Parlamentar Astuto', 'Servidor Público Sobrecarregado'],
    pertences: 'No início de cada aventura, o grupo ganha 2 pontos de Requisição a mais para gastar em equipamentos.',
    pertencesEstruturado: [
      { tipo: 'passivo', descricao: 'No início de cada aventura, o grupo ganha 2 pontos de Requisição a mais para gastar em equipamentos.' },
    ],
  },

  {
    id: 'policia',
    nome: 'Polícia',
    descricao: 'Você foi, ou ainda é, parte de uma força policial, seja uma força local responsável por uma cidade, uma agência nacional como o MI5 da Grã-Bretanha, ou o FBI dos Estados Unidos. Você pode ser um policial de patrulha, um detetive investigando os crimes mais hediondos ou quem sabe um agente investigativo especial.',
    atributosBonus: {
      agility: 1,
      coordination: 2,
      discernment: 2,
      strength: 1,
    },
    periciasBonus: {
      combater: 1,
      observar: 2,
      persuasao: 1,
    },
    focoPrincipal: 'observar',
    palavraChaveTalento: 'Observar',
    verdadesSugeridas: ['Detetive Particular Casca-Grossa', 'Policial de Patrulha Ocupado', 'Policial Militar Intimidante'],
    pertences: 'Uma arma corporal de Restrição 2 ou menos ou uma pistola.',
    pertencesEstruturado: [
      { tipo: 'escolha', quantia: 1, opcoes: [
        { tipo: 'catalogo', descricao: 'Uma arma corporal com Restrição 2 ou menos', filtro: 'arma_corporal', maxRestricao: 2 },
        { tipo: 'catalogo', descricao: 'Uma pistola', filtro: 'pistola', maxRestricao: 3 },
      ]},
    ],
  },

  {
    id: 'resistencia',
    nome: 'Resistência',
    descricao: 'Sua terra está sob o peso do coturno do Terceiro Reich, mas, com a ajuda das inteligências britânica e americana, você trabalha secretamente para prejudicar os alemães. Muitos combatentes da resistência são refugiados que voltaram para casa após receber treinamento especializado no exterior e enfrentam o perigo constante de serem descobertos e executados.',
    atributosBonus: {
      agility: 1,
      coordination: 1,
      reason: 2,
      will: 2,
    },
    periciasBonus: {
      persuasao: 1,
      furtividade: 2,
      taticas: 1,
    },
    focoPrincipal: 'furtividade',
    palavraChaveTalento: 'Furtividade',
    verdadesSugeridas: ['Agente Aliado Émigré', 'Sabotador Confiante', 'Valoroso Líder de Célula'],
    pertences: 'Escolha um: equipamento de comunicação secreto, kit de sabotador, arma de Restrição 2 ou menos, ou contato (Furtividade).',
    pertencesEstruturado: [
      { tipo: 'escolha', quantia: 1, opcoes: [
        { tipo: 'item', nome: 'Equipamento de comunicação secreto' },
        { tipo: 'item', nome: 'Kit de sabotador' },
        { tipo: 'catalogo', descricao: 'Uma arma com Restrição 2 ou menos', filtro: 'arma', maxRestricao: 2 },
        { tipo: 'contato', descricao: 'Furtividade' },
      ]},
    ],
  },
]

// ============================================================
// PARTE 3 — CARACTERÍSTICAS
// Fonte: Livro do Jogador pp. 72–77
//
// Estrutura de cada característica:
//   atributosFixos: bônus fixos de atributo
//   atributosLivres: quantidade de pontos +1 livres em atributos
//   periciasFixas: bônus fixos de perícia
//   periciasLivres: quantidade de pontos +1 livres em perícias
//   restricaoPericiasLivres: restrição de quais perícias (null = qualquer)
//   periciasEspecial: regra especial para bônus de perícia (null = padrão)
//   palavrasChaveTalento: keywords permitidas ([] = qualquer keyword)
//   verdadeSugerida: verdade sugerida no livro
//   pertences: descrição dos pertences
// ============================================================

export const CARACTERISTICAS = [
  {
    id: 'traca-de-livros',
    nome: 'Traça de Livros',
    descricao: 'Você estudou bastante e tem grande amor pelo aprendizado e pelo conhecimento. É esse personagem que conhece fatos obscuros e estatísticas estranhas, e você prefere passar o tempo com a cara enfiada num livro do que estar fazendo qualquer outra coisa.',
    atributosFixos: { discernment: 1, reason: 1 },
    atributosLivres: 1,
    periciasFixas: { academia: 1 },
    periciasLivres: 3,
    restricaoPericiasLivres: null,
    periciasEspecial: null,
    palavrasChaveTalento: ['Academia'],
    verdadeSugerida: 'Traça de Livros',
    pertences: 'Livros e periódicos relacionados ao seu estudo, apoiando seu conhecimento factual.',
    pertencesEstruturado: [
      { tipo: 'item', nome: 'Livros e periódicos relacionados ao seu estudo' },
    ],
  },

  {
    id: 'nascido-ao-volante',
    nome: 'Nascido ao Volante',
    descricao: 'Você vive a vida no banco do motorista ou com os braços nas entranhas do motor de seus veículos favoritos.',
    atributosFixos: { coordination: 1, reason: 1 },
    atributosLivres: 1,
    periciasFixas: { engenharia: 1, veiculos: 1 },
    periciasLivres: 2,
    restricaoPericiasLivres: null,
    periciasEspecial: null,
    palavrasChaveTalento: ['Veículos'],
    verdadeSugerida: 'Nascido ao Volante',
    pertences: 'Macacões, luvas de condução e óculos de proteção.',
    pertencesEstruturado: [
      { tipo: 'item', nome: 'Macacões, luvas de condução e óculos de proteção' },
    ],
  },

  {
    id: 'gigante-entre-homens',
    nome: 'Um Gigante Entre Homens',
    descricao: 'Você é imenso. É muito maior que as outras pessoas ao seu redor, mais alto e largo que seus colegas. E não é só uma questão de tamanho — você também é forte e sempre encontrou formas de usar essa força.',
    atributosFixos: { coordination: 1, strength: 1 },
    atributosLivres: 1,
    periciasFixas: { atletismo: 1, combater: 1, resiliencia: 1 },
    periciasLivres: 1,
    restricaoPericiasLivres: null,
    periciasEspecial: null,
    palavrasChaveTalento: ['Atletismo', 'Resiliência'],
    verdadeSugerida: 'Um Gigante Entre Homens',
    pertences: 'Todas as suas roupas são mal ajustadas ou foram bastante alteradas para acomodar seu tamanho incomum.',
    pertencesEstruturado: [
      { tipo: 'item', nome: 'Roupas extensivamente alteradas para acomodar seu tamanho incomum' },
    ],
  },

  {
    id: 'objetor-de-consciencia',
    nome: 'Objetor de Consciência',
    descricao: 'A violência nunca é a resposta, mas isso não faz de você um covarde. Muitos objetores de consciência servem com distinção em todos os tipos de papéis e fazem grandes contribuições para os esforços de guerra. Embora você se recuse a portar uma arma, a exposição à Guerra Secreta está prestes a testar essa crença até o limite.',
    atributosFixos: { reason: 1, will: 1 },
    atributosLivres: 1,
    periciasFixas: { resiliencia: 1 },
    periciasLivres: 3,
    restricaoPericiasLivres: ['agility', 'coordination', 'strength', 'discernment', 'reason', 'will', 'academia', 'atletismo', 'engenharia', 'furtividade', 'medicina', 'observar', 'persuasao', 'resiliencia', 'sobrevivencia', 'veiculos'],
    periciasEspecial: 'exceto_combater_taticas',
    palavrasChaveTalento: ['Resiliência'],
    verdadeSugerida: 'Objetor de Consciência',
    pertences: '1 kit de perícia para alguma perícia que tenha em 2 ou mais.',
    pertencesEstruturado: [
      { tipo: 'catalogo', descricao: '1 kit de perícia para uma perícia com graduação 2 ou mais', filtro: 'kit_pericia', maxRestricao: 3 },
    ],
  },

  {
    id: 'mentalidade-criminosa',
    nome: 'Mentalidade Criminosa',
    descricao: 'Você não se importa com trivialidades como a lei e sempre procura uma oportunidade de lucrar. Além disso, sempre há desculpas para suas ações. Quem sabe suas habilidades únicas possam ser úteis na Guerra Secreta?',
    atributosFixos: { agility: 1, discernment: 1 },
    atributosLivres: 1,
    periciasFixas: { observar: 1, furtividade: 1 },
    periciasLivres: 2,
    restricaoPericiasLivres: null,
    periciasEspecial: null,
    palavrasChaveTalento: ['Furtividade', 'Persuasão'],
    verdadeSugerida: 'Mentalidade Criminosa',
    pertences: 'Um único item com Restrição 3 ou menos, que foi obtido ilegalmente.',
    pertencesEstruturado: [
      { tipo: 'catalogo', descricao: 'Um item com Restrição 3 ou menos (obtido ilegalmente)', filtro: 'qualquer', maxRestricao: 3 },
    ],
  },

  {
    id: 'diletante',
    nome: 'Diletante',
    descricao: 'Você tem diversas áreas de interesse e já fez um pouco de tudo, podendo atuar em qualquer coisa com algum grau de sucesso, embora logo sua atenção seja capturada por outra coisa.',
    atributosFixos: { coordination: 1, discernment: 1 },
    atributosLivres: 1,
    periciasFixas: {},
    periciasLivres: 0,
    restricaoPericiasLivres: null,
    periciasEspecial: 'todas_zero',
    palavrasChaveTalento: [],
    verdadeSugerida: 'Diletante',
    pertences: 'Uma série de itens triviais, potencialmente úteis, como um relógio de bolso, chave de fenda, fósforos etc. que podem estar sob sua posse ao critério do mestre.',
    pertencesEstruturado: [
      { tipo: 'item', nome: 'Itens triviais variados (relógio de bolso, chave de fenda, fósforos etc.)' },
    ],
  },

  {
    id: 'andarilho-dos-sonhos',
    nome: 'Andarilho dos Sonhos',
    descricao: 'O sono é um mero portal e, mesmo quando criança, você vagava pelas Terras Oníricas. Muitos seres estranhos tentaram induzi-lo a obedecê-los, mas você evitou os destinos cruéis dos que se perderam no vazio. Agora seu país precisa de você.',
    atributosFixos: { discernment: 1, will: 1 },
    atributosLivres: 1,
    periciasFixas: { resiliencia: 1, observar: 1 },
    periciasLivres: 2,
    restricaoPericiasLivres: null,
    periciasEspecial: null,
    palavrasChaveTalento: ['Observar', 'Estranho'],
    verdadeSugerida: 'Andarilho dos Sonhos',
    pertences: 'Um animal de estimação à sua escolha, que é dedicado a você e parece ver coisas que não estão lá.',
    pertencesEstruturado: [
      { tipo: 'livre', descricao: 'Um animal de estimação à sua escolha (especifique qual)' },
    ],
  },

  {
    id: 'sobrevivente-refugiado',
    nome: 'Sobrevivente Refugiado',
    descricao: 'Tudo o que você amava foi engolido pela máquina de guerra alemã e seus terríveis mestres. Você lutou duro e fez o seu melhor, mas acabou precisando fugir para escapar da morte ou pior. Sua nova casa parece estranha, mas trabalhar com os Aliados lhe faz arder de desejo por libertar sua terra natal.',
    atributosFixos: { discernment: 1, will: 1 },
    atributosLivres: 1,
    periciasFixas: { academia: 1, atletismo: 1, persuasao: 1, sobrevivencia: 1 },
    periciasLivres: 0,
    restricaoPericiasLivres: null,
    periciasEspecial: null,
    palavrasChaveTalento: ['Persuasão', 'Sobrevivência'],
    verdadeSugerida: 'Sobrevivente Refugiado',
    pertences: 'Um único objeto de recordação, bastante danificado, que traz lembranças de sua casa.',
    pertencesEstruturado: [
      { tipo: 'item', nome: 'Objeto de recordação danificado de sua casa natal' },
    ],
  },

  {
    id: 'cobaia-em-experimentos',
    nome: 'Cobaia em Experimentos',
    descricao: 'Os esforços de guerra precisam de voluntários, para que se possa descobrir as possibilidades da ciência, da tecnologia e até mesmo das forças místicas. Experimentos ultrassecretos, fora de quaisquer registros, estão sendo conduzidos para aprimorar soldados com novos poderes assustadores.',
    atributosFixos: { agility: 1, strength: 1 },
    atributosLivres: 1,
    periciasFixas: {},
    periciasLivres: 4,
    restricaoPericiasLivres: null,
    periciasEspecial: null,
    palavrasChaveTalento: ['Estranho'],
    verdadeSugerida: 'Cobaia em Experimentos',
    pertences: 'Algum tipo de identificação estranha, sigilos ou marcas misteriosas em sua pele, ou talvez até mesmo documentos incompletos, ou um uniforme estranho pertencente ao seu tempo como cobaia.',
    pertencesEstruturado: [
      { tipo: 'item', nome: 'Identificação estranha ou documentos incompletos do tempo como cobaia' },
    ],
  },

  {
    id: 'minha-guerra-comecou-cedo',
    nome: 'Minha Guerra Começou Cedo',
    descricao: 'Tenha começado sua luta na Abissínia, Tchecoslováquia, Manchúria ou Espanha, você está em guerra desde muito tempo antes de o conflito principal ser deflagrado. A guerra é um show de horrores, mas você está se dessensibilizando a um nível alarmante.',
    atributosFixos: { agility: 1, coordination: 1, strength: 1 },
    atributosLivres: 0,
    periciasFixas: { combater: 1, medicina: 1 },
    periciasLivres: 2,
    restricaoPericiasLivres: null,
    periciasEspecial: null,
    palavrasChaveTalento: ['Combater', 'Medicina'],
    verdadeSugerida: 'Minha Guerra Começou Cedo',
    pertences: 'Algumas lembranças preciosas, como uma foto de família, o relógio de seu pai ou um item cultural ou religioso que você sempre carrega.',
    pertencesEstruturado: [
      { tipo: 'item', nome: 'Lembrança preciosa (foto de família, relógio do pai ou item cultural/religioso)' },
    ],
  },

  {
    id: 'nomade',
    nome: 'Nômade',
    descricao: 'Você já teve uma casa, mas agora vive na estrada. Você é um espírito inquieto e nunca fica no mesmo lugar por muito tempo. Sempre um passo à frente de seus problemas, você passou a apreciar a liberdade que um estilo de vida itinerante oferece.',
    atributosFixos: { strength: 1, coordination: 1, reason: 1 },
    atributosLivres: 0,
    periciasFixas: { sobrevivencia: 1, veiculos: 1 },
    periciasLivres: 2,
    restricaoPericiasLivres: null,
    periciasEspecial: null,
    palavrasChaveTalento: ['Sobrevivência', 'Veículos'],
    verdadeSugerida: 'Nômade',
    pertences: 'Uma série de objetos triviais consigo, um canivete, dados, linha e outras quinquilharias úteis, bem como meios de conseguir dinheiro, como um instrumento musical ou um pacote de cartas.',
    pertencesEstruturado: [
      { tipo: 'item', nome: 'Objetos triviais (canivete, dados, linha etc.) e meio de renda (instrumento ou cartas)' },
    ],
  },

  {
    id: 'tem-artefato-ocultista',
    nome: 'Tem um Artefato Ocultista',
    descricao: 'O objeto está em sua família há tanto tempo quanto você consegue se lembrar, e agora este legado tornou-se sua responsabilidade. Seja uma arma que pode ser usada contra o Reich, a alma aprisionada de uma monstruosidade ou um fragmento de uma entidade bizarra em conserva, você precisa decidir como usará o estranho artefato.',
    atributosFixos: { reason: 1, will: 1 },
    atributosLivres: 1,
    periciasFixas: { resiliencia: 1 },
    periciasLivres: 3,
    restricaoPericiasLivres: null,
    periciasEspecial: 'observar_persuasao_ou_furtividade',
    palavrasChaveTalento: ['Estranho'],
    verdadeSugerida: 'Tem um Artefato Ocultista',
    pertences: 'Um artefato ocultista, como um temido tomo do Mythôs, o símbolo de uma divindade, um espelho de obsidiana usado para divinações ou uma caixa que sussurra para você durante o sono, mas que está adormecida... por enquanto. A natureza desse artefato precisa ser debatida com o mestre.',
    pertencesEstruturado: [
      { tipo: 'item', nome: 'Artefato ocultista (a definir com o mestre)' },
    ],
  },

  {
    id: 'criado-por-culto',
    nome: 'Criado por um Culto',
    descricao: 'Você nasceu e cresceu em uma ordem esotérica secreta. Embora você frequentasse a igreja aos domingos, cantando louvores, quando as estrelas se alinhavam, sua família celebrava ritos mais sombrios. Você testemunhou muitas coisas horríveis e surpreendentes, coisas que expandiram sua mente e trouxeram uma nova perspectiva sobre o lugar do homem no universo.',
    atributosFixos: { coordination: 1, strength: 1 },
    atributosLivres: 1,
    periciasFixas: { academia: 1, furtividade: 1, resiliencia: 1 },
    periciasLivres: 1,
    restricaoPericiasLivres: null,
    periciasEspecial: null,
    palavrasChaveTalento: ['Furtividade', 'Resiliência', 'Estranho'],
    verdadeSugerida: 'Criado por um Culto',
    pertences: 'Vestes cerimoniais, símbolos, amuletos e outros objetos pessoais do culto.',
    pertencesEstruturado: [
      { tipo: 'item', nome: 'Vestes cerimoniais, símbolos e amuletos do culto' },
    ],
  },

  {
    id: 'criado-nas-colonias',
    nome: 'Criado nas Colônias',
    descricao: 'Quando a guerra estourou na Europa, você estava longe do fronte. Poucos países estavam tão afastados da ação quanto o seu, mas você se alistou pelo seu rei e seu país e viajou milhares de quilômetros para ajudar nos esforços de guerra. Sua vida era bucólica, e você trabalhou bastante com agricultura, cuidando do gado que pastava pelas planícies em uma cidadezinha em que todo mundo se conhecia, mas agora você está ansioso para enfrentar o Eixo.',
    atributosFixos: { agility: 1, strength: 1, will: 1 },
    atributosLivres: 0,
    periciasFixas: { atletismo: 1, sobrevivencia: 1 },
    periciasLivres: 2,
    restricaoPericiasLivres: null,
    periciasEspecial: null,
    palavrasChaveTalento: ['Atletismo', 'Sobrevivência'],
    verdadeSugerida: 'Criado nas Colônias',
    pertences: 'Algumas roupas ou objetos pessoais da sua pátria.',
    pertencesEstruturado: [
      { tipo: 'item', nome: 'Roupas ou objetos pessoais da sua pátria' },
    ],
  },

  {
    id: 'leu-livro-ocultista',
    nome: 'Leu um Livro Ocultista',
    descricao: 'Em algum momento do passado, você leu de um livro proibido que lhe revelou segredos horrendos e os estranhos mistérios do universo. Você não se lembra exatamente do que leu, mas a sensação de ver aqueles sigilos e ler aquelas palavras ainda permanece, como uma leve cicatriz na mente. Você parece perceber coisas e fazer conexões que os outros, desprovidos de seu conhecimento do oculto, ignoram.',
    atributosFixos: { discernment: 1, will: 1 },
    atributosLivres: 1,
    periciasFixas: { observar: 1, resiliencia: 1 },
    periciasLivres: 2,
    restricaoPericiasLivres: null,
    periciasEspecial: null,
    palavrasChaveTalento: ['Estranho'],
    verdadeSugerida: 'Leu um Livro Ocultista',
    pertences: 'Uma coleção de notas pessoais sobre um tomo ocultista.',
    pertencesEstruturado: [
      { tipo: 'item', nome: 'Coleção de notas pessoais sobre um tomo ocultista' },
    ],
  },

  {
    id: 'visionario-cientifico',
    nome: 'Visionário Científico',
    descricao: 'Você fez uma descoberta incrível através de seus estudos, o que pode ser uma contribuição inestimável para os esforços de guerra.',
    atributosFixos: { discernment: 1, reason: 1 },
    atributosLivres: 1,
    periciasFixas: { academia: 1, engenharia: 1 },
    periciasLivres: 2,
    restricaoPericiasLivres: null,
    periciasEspecial: null,
    palavrasChaveTalento: ['Academia', 'Engenharia'],
    verdadeSugerida: 'Visionário Científico',
    pertences: 'Um contato com um dos seguintes focos: Criptografia, Ciência, Eletrônica, Explosivos ou a perícia Medicina.',
    pertencesEstruturado: [
      { tipo: 'contato_foco_opcoes', opcoes: ['Criptografia', 'Ciência', 'Eletrônica', 'Explosivos', 'Medicina'] },
    ],
  },

  {
    id: 'crianca-de-rua',
    nome: 'Criança de Rua',
    descricao: 'Sua vida até agora tem sido bastante difícil, e você precisou trabalhar duro para conseguir o pouco que tem. De alguma forma, você sempre conseguiu o suficiente para sobreviver. Mas você é rápido, durão e astuto, e confia em sua esperteza e conhecimento das ruas para sobreviver.',
    atributosFixos: { coordination: 1, strength: 1, reason: 1 },
    atributosLivres: 0,
    periciasFixas: { furtividade: 1, resiliencia: 1, sobrevivencia: 1 },
    periciasLivres: 1,
    restricaoPericiasLivres: null,
    periciasEspecial: 'exceto_academia',
    palavrasChaveTalento: ['Sobrevivência'],
    verdadeSugerida: 'Criança de Rua',
    pertences: 'Um amuleto da sorte ou algum outro símbolo de boa sorte.',
    pertencesEstruturado: [
      { tipo: 'item', nome: 'Amuleto da sorte ou símbolo de boa sorte' },
    ],
  },

  {
    id: 'sortudo',
    nome: 'O Sortudo',
    descricao: 'Quando a ordem de procurar abrigo chegou, todos obedeceram. Então as bombas caíram e você foi o único sobrevivente. Você não sabe explicar como sobreviveu enquanto todos os outros morreram, mas agora ouve as pessoas sussurrando pelas suas costas, chamando você de Jonas, em referência ao personagem bíblico, e dizendo que você dá azar.',
    atributosFixos: { agility: 1, strength: 1, will: 1 },
    atributosLivres: 0,
    periciasFixas: { atletismo: 1, taticas: 1 },
    periciasLivres: 2,
    restricaoPericiasLivres: null,
    periciasEspecial: null,
    palavrasChaveTalento: ['Fortuna'],
    verdadeSugerida: 'Sortudo',
    pertences: 'Um objeto que é uma recordação comovente de um de seus amigos ou camaradas caídos.',
    pertencesEstruturado: [
      { tipo: 'item', nome: 'Objeto de recordação de um amigo ou camarada caído' },
    ],
  },

  {
    id: 'veterano-grande-guerra',
    nome: 'Veterano da Grande Guerra',
    descricao: 'Você lutou na Grande Guerra. Você se lembra de quando declararam que aquela era "a guerra para acabar com todas as guerras". Agora, outro conflito global eclodiu, e suas velhas habilidades — e aquele antigo revólver de serviço — serão úteis novamente.',
    atributosFixos: { coordination: 1, strength: 1, will: 1 },
    atributosLivres: 0,
    periciasFixas: { combater: 1, sobrevivencia: 1 },
    periciasLivres: 2,
    restricaoPericiasLivres: null,
    periciasEspecial: null,
    palavrasChaveTalento: ['Combater', 'Sobrevivência'],
    verdadeSugerida: 'Veterano da Grande Guerra',
    pertences: 'Um velho revólver de serviço (use as regras do Revólver de Serviço Enfield, p. 103).',
    pertencesEstruturado: [
      { tipo: 'item', nome: 'Revólver de Serviço Enfield' },
    ],
  },

  {
    id: 'procurado-autoridades',
    nome: 'Procurado pelas Autoridades',
    descricao: 'Você cometeu um crime grave e está foragido, mas evitou ser capturado pelas autoridades até agora. Ao longo do caminho, você conseguiu se tornar útil e agora faz parte de uma organização secreta que investiga o oculto. Talvez você tenha trocado esse trabalho por sua "liberdade", ou talvez tenha se juntado aos militares sob um pseudônimo e tema ser descoberto.',
    atributosFixos: { agility: 1, discernment: 1 },
    atributosLivres: 1,
    periciasFixas: { furtividade: 1, persuasao: 1 },
    periciasLivres: 2,
    restricaoPericiasLivres: null,
    periciasEspecial: null,
    palavrasChaveTalento: ['Furtividade', 'Persuasão'],
    verdadeSugerida: 'Procurado pelas Autoridades',
    pertences: 'Um item de Restrição 2 ou menos relacionado ao seu crime, ou documentos de identidade falsos.',
    pertencesEstruturado: [
      { tipo: 'escolha', quantia: 1, opcoes: [
        { tipo: 'catalogo', descricao: 'Um item de Restrição 2 ou menos relacionado ao seu crime', filtro: 'qualquer', maxRestricao: 2 },
        { tipo: 'item', nome: 'Documentos de identidade falsos' },
      ]},
    ],
  },

  {
    id: 'coracao-jovem',
    nome: 'Coração Jovem',
    descricao: 'Você pode ser jovem ou simplesmente ingênuo, mas quando se trata de fazer o que importa, você logo aprende o que precisa e tem a energia da juventude ao seu lado.',
    atributosFixos: { agility: 1, reason: 1 },
    atributosLivres: 1,
    periciasFixas: { atletismo: 1, furtividade: 1 },
    periciasLivres: 0,
    restricaoPericiasLivres: null,
    periciasEspecial: 'mais2_graduacao0ou1',
    palavrasChaveTalento: [],
    verdadeSugerida: 'Coração Jovem',
    pertences: '1 recurso extra para quaisquer kits de perícia que tiver.',
    pertencesEstruturado: [
      { tipo: 'passivo', descricao: '1 recurso extra para quaisquer kits de perícia que tiver.' },
    ],
  },
]

// ============================================================
// PARTE 4 — TALENTOS
// Fonte: Livro do Jogador Capítulo 6, pp. 86–96
//
// palavrasChave: array de strings (keywords exatas do livro)
// periciaSelecionavel: true = jogador escolhe 1 perícia ao adquirir (talentos <Perícia>)
// avancado: true = requer graduação 3+ na perícia associada
// ============================================================

export const TALENTOS = [
  // ----------------------------------------------------------
  // TALENTOS COMUNS (<Perícia> — jogador escolhe a perícia ao adquirir)
  // ----------------------------------------------------------
  {
    id: 'audaz',
    nome: 'Audaz',
    palavrasChave: [],
    periciaSelecionavel: true,
    avancado: false,
    efeito: 'Quando você assume riscos calculados, tende a ter sucesso com mais frequência do que parece razoável. Ao escolher este talento, selecione uma única perícia. Sempre que fizer um teste usando a perícia escolhida e comprar d20s extras gerando Ameaça para o mestre, você pode rejogar um d20 dessa parada de dados.',
  },
  {
    id: 'cauteloso',
    nome: 'Cauteloso',
    palavrasChave: [],
    periciaSelecionavel: true,
    avancado: false,
    efeito: 'Você é paciente e circunspecto, agindo apenas quando as probabilidades estão a seu favor. Ao escolher este talento, selecione uma única perícia. Sempre que fizer um teste usando a perícia escolhida e comprar d20s extras gastando ímpeto, você pode rejogar um d20 dessa parada de dados.',
  },
  {
    id: 'conselheiro',
    nome: 'Conselheiro',
    palavrasChave: [],
    periciaSelecionavel: true,
    avancado: false,
    efeito: 'Você tem um talento especial para orientar os outros durante problemas. Ao escolher este talento, selecione uma única perícia. Sempre que você prestar auxílio a um aliado e usar a perícia escolhida, o aliado pode rejogar um dado da parada de dados dele.',
  },
  {
    id: 'colaboracao',
    nome: 'Colaboração',
    palavrasChave: ['Avançado'],
    periciaSelecionavel: true,
    avancado: true,
    efeito: 'Você treinou seus aliados para confiarem em sua experiência, e o esforço valeu a pena. Ao escolher este talento, selecione uma única perícia com graduação 3 ou mais. Sempre que um aliado fizer um teste usando a perícia escolhida, e você puder se comunicar com ele, gaste 2 de ímpeto para permitir que esse aliado use seu valor nessa perícia e um dos seus focos (se for aplicável).',
  },
  {
    id: 'mente-fria-sob-pressao',
    nome: 'Mente Fria Sob Pressão',
    palavrasChave: ['Fortuna'],
    periciaSelecionavel: true,
    avancado: false,
    efeito: 'Quando as coisas ficam feias, você respira fundo e faz o seu trabalho. Ao escolher este talento, selecione uma única perícia. Quando fizer um teste usando a perícia escolhida, você pode gastar um ponto de Fortuna para ser bem-sucedido automaticamente, mas sem gerar ímpeto.',
  },

  // ----------------------------------------------------------
  // ACADEMIA
  // ----------------------------------------------------------
  {
    id: 'dedicacao',
    nome: 'Dedicação',
    palavrasChave: ['Academia', 'Fortuna'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'Você tem uma capacidade extraordinária de colocar todo o seu esforço em uma atividade quando isso realmente importa. Sempre que fizer um teste onde tiver um foco aplicável, você pode gastar um ponto de Fortuna para dobrar sua margem de sucesso crítico (até um máximo de o dobro da sua graduação na perícia).',
  },
  {
    id: 'especializacao-geral',
    nome: 'Especialização Geral',
    palavrasChave: ['Academia'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'Você é especialista em muitos campos. Você ganha um foco adicional em todas as perícias que tiverem graduação 3 ou mais. Depois de escolher este talento, se alguma das suas perícias aumentar para 3, você ganha imediatamente um foco nela.',
  },
  {
    id: 'estudioso',
    nome: 'Estudioso',
    palavrasChave: ['Academia'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'Na primeira vez que você Obter Informação em um teste bem-sucedido, você pode fazer uma pergunta adicional.',
  },
  {
    id: 'estudou-a-operacao',
    nome: 'Estudou a Operação',
    palavrasChave: ['Academia', 'Avançado'],
    periciaSelecionavel: false,
    avancado: true,
    efeito: 'Você estuda todos os fatos e detalhes sobre as situações que provavelmente encontrará em suas missões. Uma vez por cena, você pode usar Academia em vez de qualquer outra perícia, e você conta como se tivesse foco para esse teste.',
  },
  {
    id: 'rato-de-biblioteca',
    nome: 'Rato de Biblioteca',
    palavrasChave: ['Academia'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'Você se sente em casa quando está entre livros e livrarias. Sempre que fizer um teste de Academia para pesquisar algum assunto, você só leva metade do tempo normal.',
  },
  {
    id: 'poliglota',
    nome: 'Poliglota',
    palavrasChave: ['Academia'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'Você precisa ter o foco Linguística para escolher este talento. Você ganha uma verdade adicional: Poliglota. Você também conhece três línguas adicionais da sua escolha e, quando se depara com uma língua que não conhece, pode gastar um ponto de ímpeto para entender o significado geral do texto ou da conversa.',
  },
  {
    id: 'traca-de-livros-talento',
    nome: 'Traça de Livros',
    palavrasChave: ['Academia'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'Você leu uma miríade de obras. Se você gastar qualquer quantidade de ímpeto para Obter Informação durante uma cena, você pode reduzir em 1 o custo de ímpeto de um dos d20 extras que comprar mais tarde nessa cena.',
  },

  // ----------------------------------------------------------
  // ATLETISMO
  // ----------------------------------------------------------
  {
    id: 'ave-maria',
    nome: 'Ave Maria',
    palavrasChave: ['Atletismo'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'Seu arremesso é devastador, permitindo que você acerte um alvo a distâncias muito mais longas. Sempre que você usar uma arma arremessável, pode gerar 1 de Ameaça para aumentar a categoria de alcance dela em um passo (de Curto para Médio, por exemplo) e também ganhar +1 de dano adicional.',
  },
  {
    id: 'em-forma',
    nome: 'Em Forma',
    palavrasChave: ['Atletismo'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'Você está em boas condições físicas e não se cansa tão rápido quanto os outros. Sempre que você sofrer fadiga devido a atividades físicas extenuantes, jogue 1 para cada ponto de Fadiga sofrido. Cada efeito obtido ignora 1 ponto de fadiga.',
  },
  {
    id: 'o-poder-faz-a-razao',
    nome: 'O Poder Faz a Razão',
    palavrasChave: ['Atletismo', 'Avançado'],
    periciaSelecionavel: false,
    avancado: true,
    efeito: 'Você sabe como usar seu tamanho e força em uma luta. Sempre que fizer um teste disputado para um ataque corporal, você pode usar Força + Atletismo. Além disso, você pode ignorar a qualidade Pesada das armas que empunhar.',
  },
  {
    id: 'pes-firmes',
    nome: 'Pés Firmes',
    palavrasChave: ['Atletismo'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'Você tem um equilíbrio perfeito e parece nunca tropeçar, desequilibrar-se ou cair. Sempre que fizer um teste de Atletismo, você pode ignorar a primeira Complicação que obtiver, e os adversários precisam gastar 3 de ímpeto, em vez de 2, para derrubá-lo prostrado em combate.',
  },
  {
    id: 'prodigio-atletico',
    nome: 'Prodígio Atlético',
    palavrasChave: ['Atletismo'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'Você se esforça mais do que qualquer outra pessoa. Sempre que for bem-sucedido em um teste de Atletismo como parte de uma tarefa prolongada, você pode adicionar +2 à sua jogada de estresse para progredir nela.',
  },
  {
    id: 'serpentino',
    nome: 'Serpentino',
    palavrasChave: ['Atletismo'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'Sempre que fizer a ação Correr em combate, os ataques realizados contra você são dificultados em um passo até o começo do seu próximo turno.',
  },

  // ----------------------------------------------------------
  // COMBATER
  // ----------------------------------------------------------
  {
    id: 'atirador-de-elite',
    nome: 'Atirador de Elite',
    palavrasChave: ['Combater'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'Você é um excelente atirador, capaz de efetuar disparos com os quais a maioria das outras pessoas conseguiria apenas sonhar. Quando você fizer a ação menor Mirar antes de um ataque à distância, o primeiro d20 extra que você comprar será gratuito. O ataque ganha a qualidade Perfurante, ou incrementa em 1 uma qualidade Perfurante já existente.',
  },
  {
    id: 'chumbo-grosso',
    nome: 'Chumbo Grosso',
    palavrasChave: ['Combater'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'Quando você abre fogo, dispara rajadas devastadoras. Sempre que fizer ataques à distância e gastar munição para possibilitar um ataque de barragem, seu primeiro d20 extra é gratuito.',
  },
  {
    id: 'defensivo',
    nome: 'Defensivo',
    palavrasChave: ['Combater'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'Você é especialmente bom em evitar perigos. Escolha uma das seguintes opções: ataques corporais ou à distância. Quando ataques do tipo escolhido visam você, eles são dificultados em um passo. Este talento pode ser selecionado duas vezes, uma para cada tipo de ataque.',
  },
  {
    id: 'gancho-de-direita-perverso',
    nome: 'Gancho de Direita Perverso',
    palavrasChave: ['Combater'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'Seus ataques desarmados ganham o efeito de arma Feroz.',
  },
  {
    id: 'guardiao',
    nome: 'Guardião',
    palavrasChave: ['Combater'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'Você se coloca prontamente na linha de fogo. Você pode fazer uma reação e se tornar alvo de um ataque que vise um aliado à distância Curta de você.',
  },
  {
    id: 'ta-fazendo-o-que-ai-embaixo',
    nome: 'Tá Fazendo O Que Aí Embaixo?',
    palavrasChave: ['Combater'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'Quando a luta chega ao corpo a corpo, você é um especialista com nervos de aço, derrubando os inimigos com golpes poderosos. Quando você se mover, ficar Adjacente a um inimigo e fizer um ataque corporal, o primeiro d20 extra que comprar para esse ataque será gratuito e, se for bem-sucedido, o alvo cai prostrado.',
  },

  // ----------------------------------------------------------
  // ENGENHARIA
  // ----------------------------------------------------------
  {
    id: 'armeiro',
    nome: 'Armeiro',
    palavrasChave: ['Engenharia'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'Você conhece o funcionamento interno das armas de fogo e sabe mantê-las em boas condições. No início de uma missão, você pode escolher 1 arma à distância que esteja com o grupo. Essa arma ganha a qualidade Confiável ou perde a qualidade Inconstante.',
  },
  {
    id: 'demolicoes',
    nome: 'Demolições',
    palavrasChave: ['Engenharia', 'Avançado'],
    periciaSelecionavel: false,
    avancado: true,
    efeito: 'Você é proficiente em criar, instalar e desarmar explosivos. Sempre que você fizer um teste de Engenharia para criar, instalar ou desarmar um artefato explosivo, seu primeiro d20 extra será gratuito. Uma vez por cena, você também pode ignorar a primeira Complicação resultante de um teste de Engenharia envolvendo explosivos.',
  },
  {
    id: 'fazer-gambiarra',
    nome: 'Fazer Gambiarra',
    palavrasChave: ['Engenharia'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'Sempre que você fizer um teste para consertar uma máquina, pode gerar 2 de Ameaça para facilitar o teste em um passo, até o mínimo de Simples (D0), mas os consertos são apenas temporários. Os reparos duram pelo menos até o restante da cena atual, mas falham em algum momento depois disso, quando o mestre gastar 2 de Ameaça.',
  },
  {
    id: 'isso-vai-ter-que-servir',
    nome: 'Isso Vai Ter que Servir',
    palavrasChave: ['Engenharia'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'Você está acostumado a se contentar com o que consegue retirar de outras máquinas. Você pode passar meia hora desmontando uma máquina e recuperando peças úteis com um teste Médio (D1) de Discernimento + Engenharia. Se for bem-sucedido, você recupera peças de reposição o suficiente para reabastecer os recursos de um kit de ferramentas de mecânico ou de eletricista. Esse teste pode ter sucesso a um custo, o que faz o item que você está desmontando ser destruído.',
  },
  {
    id: 'mao-na-massa',
    nome: 'Mão na Massa',
    palavrasChave: ['Engenharia'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'Você está acostumado a trabalhar duro e fazer o que precisa. Sempre que fizer um teste de Engenharia como parte de uma tarefa estendida, você pode ignorar 1 de resistência para cada efeito obtido nos Dados de Desafio.',
  },
  {
    id: 'sabotador',
    nome: 'Sabotador',
    palavrasChave: ['Engenharia'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'Você tem um talento especial para quebrar coisas. Ao atacar um objeto, estrutura ou veículo estacionário, você pode usar sua perícia Engenharia em vez de Combater, e ganha Dados de Desafio extras baseando-se em sua Razão, em vez de Força ou Discernimento. Quando causar estresse nesse alvo, você pode gastar 2 de ímpeto para alterar o resultado de qualquer Dado de Desafio para um efeito, em uma quantidade até a graduação da sua Engenharia.',
  },

  // ----------------------------------------------------------
  // ESTRANHO
  // ----------------------------------------------------------
  {
    id: 'insensivel-aos-horrores',
    nome: 'Insensível aos Horrores',
    palavrasChave: ['Estranho'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'Por alguma razão, sangue, morte e violência não o afetam mentalmente. Você aumenta sua resistência de Coragem em +6 e pode rejogar 1d20 em qualquer teste para determinar se ganharia uma cicatriz mental. Contudo, as outras pessoas consideram seus modos desagradáveis, aumentando em +1 a margem de complicação de todos os seus testes de Persuasão.',
  },
  {
    id: 'intuicao-bizarra',
    nome: 'Intuição Bizarra',
    palavrasChave: ['Estranho'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'Sua mente muitas vezes lhe apresenta vislumbres de coisas que você não teria como saber. Uma vez por cena, você pode gerar 1 de Ameaça para Obter Informação (faça uma pergunta ao Mestre) sem precisar de um teste.',
  },
  {
    id: 'pressentimento-salvador',
    nome: 'Pressentimento Salvador',
    palavrasChave: ['Estranho'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'De vez em quando, parece que você evita por pouco o desastre graças a uma mão guia desconhecida. Ninguém sabe como você evita esses destinos, mas a má sorte parece cair sobre aqueles à sua volta. Uma vez por sessão, quando sofrer um ferimento, você pode gerar 3 de Ameaça para evitá-lo. Ao critério do Mestre, você pode ter a chance de evitar outro tipo de infortúnio em troca de gerar 3 de Ameaça.',
  },
  {
    id: 'ocultista-amador',
    nome: 'Ocultista Amador',
    palavrasChave: ['Conjurador', 'Estranho'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'Você se meteu com forças ocultas além da sua compreensão. Agora você é um conjurador da prática amador, conforme descrito no Capítulo 9: A Magia e o Mythôs.',
  },
  {
    id: 'pacto-menor',
    nome: 'Pacto Menor',
    palavrasChave: ['Estranho'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'Você descobriu que, se separar um pouco de comida e bebida à noite, tudo terá desaparecido pela manhã, e algo de bom acontecerá com você. Você se pergunta o que pode acontecer se oferecesse mais do que apenas comida e bebida. Se você fizer pequenas oferendas a cada noite, ganhará um ponto de Fortuna adicional no início de cada aventura. Ao critério do Mestre, você obtém benefícios maiores com oferendas mais significativas.',
  },
  {
    id: 'poder-mistico',
    nome: 'Poder Místico',
    palavrasChave: ['Estranho'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'Somente personagens conjuradores podem escolher este talento. Você se embrenhou nos mistérios imortais do Mythôs e nos segredos do tempo, retornando com maior aptidão em atividades arcanas. Você ganha uma verdade de personagem adicional: Vislumbrou o que os Mortais Não Deveriam Conhecer, ou uma descrição semelhante do custo que esse conhecimento teve. Quando conjurar um feitiço, você pode aumentar o seu Poder em +2. Se fizer isso, todos os seus aliados ao alcance Curto sofrem 1 de estresse mental para cada Efeito obtido na jogada do Custo do feitiço, pois serão expostos aos segredos sobrenaturais que você aprendeu.',
  },

  // ----------------------------------------------------------
  // FURTIVIDADE
  // ----------------------------------------------------------
  {
    id: 'bater-e-correr',
    nome: 'Bater e Correr',
    palavrasChave: ['Furtividade'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'Você sabe que o primeiro lugar que os inimigos olharão é de onde veio o ataque, por isso faz questão de não estar mais lá. Após fazer um ataque bem-sucedido contra um alvo desprevenido, você pode gastar 1 de ímpeto para se mover dentro da distância Curta. Você pode fazer isso mesmo se já tiver se movido nesse turno.',
  },
  {
    id: 'como-uma-sombra',
    nome: 'Como uma Sombra',
    palavrasChave: ['Furtividade'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'Você é discreto, mesmo quando as coisas dão errado, e consegue diminuir bem rápido as perturbações que causa. Quando uma cena incluir um medidor de consequência relacionado à atenção ou perseguição de inimigos, adicione +2 à resistência da consequência.',
  },
  {
    id: 'explorar-fraquezas',
    nome: 'Explorar Fraquezas',
    palavrasChave: ['Furtividade'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'Quando você atacar um inimigo inconsciente ou que esteja sofrendo de uma verdade que representa uma fraqueza ou vulnerabilidade, o ataque ganha o efeito de arma Perfurante 2.',
  },
  {
    id: 'na-hora-certa',
    nome: 'Na Hora Certa',
    palavrasChave: ['Furtividade'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'Você sempre chega aonde precisa estar na hora certa. Sempre que fizer um teste de Furtividade e houver restrições de tempo para ser bem-sucedido — como chegar a um local antes que um guarda se vire ou evitar um holofote em movimento —, o primeiro d20 extra que você comprar é gratuito.',
  },
  {
    id: 'os-melhores-esconderijos',
    nome: 'Os Melhores Esconderijos',
    palavrasChave: ['Furtividade'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'É difícil se esgueirar para pegá-lo de surpresa, pois você já descobriu todos os melhores esconderijos. Quando inimigos tentarem um teste de Furtividade ao alcance de sua visão, o teste deles é dificultado em um passo.',
  },
  {
    id: 'so-mais-um-rosto-na-multidao',
    nome: 'Só Mais um Rosto na Multidão',
    palavrasChave: ['Furtividade'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'Você sabe como se esconder à vista de todos, agindo como se pertencesse ao lugar onde está. Se você estiver usando roupas apropriadas ou um disfarce adequado, o teste de Observar de quem tentar notá-lo dentro de um grupo de pessoas será dificultado em um passo.',
  },

  // ----------------------------------------------------------
  // MEDICINA
  // ----------------------------------------------------------
  {
    id: 'cuidados-prolongados',
    nome: 'Cuidados Prolongados',
    palavrasChave: ['Medicina'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'Você é habilidoso em tratar os horrores da guerra e garantir que os ferimentos de seus companheiros sejam curados com sucesso. Você pode rejogar um único d20 em qualquer teste de Medicina para determinar se um personagem ganha uma cicatriz ou quando você tentar curar uma cicatriz.',
  },
  {
    id: 'efeito-placebo',
    nome: 'Efeito Placebo',
    palavrasChave: ['Medicina'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'Com suprimentos escassos, você é bom em aproveitar ao máximo o pouco que tem. Quando você gastar recursos de um kit de primeiros socorros em um teste de Medicina, jogue 1 para cada uso de medicação. Para cada efeito obtido, um desses recursos gastos é recuperado imediatamente.',
  },
  {
    id: 'ja-vi-coisa-pior',
    nome: 'Já Vi Coisa Pior',
    palavrasChave: ['Medicina', 'Avançado'],
    periciaSelecionavel: false,
    avancado: true,
    efeito: 'Você tem um estômago forte e um senso de dever que não permite que seus próprios medos se sobreponham às necessidades de seus pacientes. Você pode gastar 2 de ímpeto para ganhar resistência de Moral igual à quantidade de aliados feridos que você estiver vendo ou ouvindo.',
  },
  {
    id: 'longe-do-perigo',
    nome: 'Longe do Perigo',
    palavrasChave: ['Medicina'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'Você está acostumado a equilibrar a necessidade de manter um paciente parado e de levá-lo a algum lugar mais seguro. Ao tentar carregar ou conter outra pessoa, você pode usar Medicina em vez de Atletismo, e ignora a primeira Complicação obtida nesses testes.',
  },
  {
    id: 'medico',
    nome: 'Médico',
    palavrasChave: ['Medicina'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'Sempre que estabilizar um aliado, você pode gastar 2 de ímpeto para tratar imediatamente um ferimento físico que ele tenha sofrido, embora ele permaneça derrotado.',
  },
  {
    id: 'tranquilizar',
    nome: 'Tranquilizar',
    palavrasChave: ['Medicina'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'Sua calma e jeitinho de falar são perfeitos e empáticos, e seus pacientes perdem o medo quando você está por perto. Ao tentar tratar os ferimentos mentais de um paciente, você pode gastar 2 de ímpeto para tratar um ferimento mental adicional.',
  },

  // ----------------------------------------------------------
  // OBSERVAR
  // ----------------------------------------------------------
  {
    id: 'batedor',
    nome: 'Batedor',
    palavrasChave: ['Observar'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'Você é muito bom em entender a geografia de onde está e perceber os detalhes importantes com rapidez. Você pode fazer 1 pergunta gratuita no início de cada cena de ação, como se tivesse gastado ímpeto para Obter Informação.',
  },
  {
    id: 'batedor-avancado',
    nome: 'Batedor Avançado',
    palavrasChave: ['Observar'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'Você marca alvos para a artilharia aliada, permitindo que cumpram seus objetivos. Se conseguir se comunicar com um aliado que está usando uma arma com a qualidade Indireto, você pode prestar auxílio ao ataque dele usando Razão + Observação. Seu aliado também facilita o ataque dele em um passo quando você fizer isso.',
  },
  {
    id: 'examinar',
    nome: 'Examinar',
    palavrasChave: ['Observar'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'Você presta bastante atenção sempre que possível, notando pequenos detalhes que os outros podem ignorar. Sempre que você dobrar o tempo necessário para fazer um teste de Observar fora de combate, o primeiro d20 extra que você comprar é gratuito.',
  },
  {
    id: 'olhos-de-gato',
    nome: 'Olhos de Gato',
    palavrasChave: ['Observar'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'Sua avó sempre falava que formiga faz bem para os olhos, e parece que você não tinha nojo quando elas entravam no açúcar, porque consegue enxergar muito bem no escuro, permitindo atuar com eficácia até mesmo em ambientes de pouca luz. Você ignora qualquer aumento na Dificuldade ou margem de complicação causado pela penumbra, embora a escuridão total ainda o afete normalmente.',
  },
  {
    id: 'revirar-tudo',
    nome: 'Revirar Tudo',
    palavrasChave: ['Observar'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'Você sabe que o tempo é essencial, e quando vasculha algum lugar, o faz muito bem, embora faça certa bagunça. Sempre que tentar um teste de Observar para vasculhar uma área, você pode gerar 2 de Ameaça para facilitar o teste em um passo e o tempo dessa atividade pela metade.',
  },
  {
    id: 'vigilia-constante',
    nome: 'Vigília Constante',
    palavrasChave: ['Observar'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'Sempre que fizer um teste para detectar perigo ou inimigos ocultos, facilite-o em um passo, até um mínimo de Simples (D0).',
  },

  // ----------------------------------------------------------
  // PERSUASÃO
  // ----------------------------------------------------------
  {
    id: 'agitar-coracoes',
    nome: 'Agitar Corações',
    palavrasChave: ['Persuasão'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'Você está acostumado a falar em público, atiçando as emoções das pessoas. Quando tentar convencer ou persuadir os outros com um discurso comovente, facilite o teste em um passo. Além disso, você também pode proferir um grito de guerra durante cenas de ação. Para isso, faça um teste Médio (D1) de Vontade + Persuasão como uma ação maior. Se você for bem-sucedido, até o final da cena, todo aliado capaz de ouvi-lo ganhará 2 de Moral, mais 1 de Moral por ímpeto gasto.',
  },
  {
    id: 'discurso-racional',
    nome: 'Discurso Racional',
    palavrasChave: ['Persuasão'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'Você usa as palavras de forma precisa e sucinta, permitindo que transmitam fatos e argumentos lógicos com rapidez e eficácia. Quando você precisar comunicar informações complicadas ou discutir com lógica, em vez de emoção, facilite seu teste de Persuasão em um passo.',
  },
  {
    id: 'pistas-sutis',
    nome: 'Pistas Sutis',
    palavrasChave: ['Persuasão'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'Você é bom em saber o que as pessoas estão pensando, detectando todas as pequenas pistas que elas dão na forma de postura, gestos e tom de voz... e também é bom em fingir esses indícios. Se você passar algum tempo conversando ou observando alguém, quando fizer um teste de Persuasão contra essa pessoa durante a cena atual, poderá reduzir para 0 o custo do primeiro d20 que comprar.',
  },
  {
    id: 'presenca-imponente',
    nome: 'Presença Imponente',
    palavrasChave: ['Persuasão'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'Para você sempre foi fácil intimidar os outros. Quando usar uma arma corporal para fazer um ataque mental, você pode usar sua perícia Persuasão em vez de Combater, além de adicionar os efeitos de arma Atordoante ou Perfurante 1 ao ataque.',
  },
  {
    id: 'roubar-os-holofotes',
    nome: 'Roubar os Holofotes',
    palavrasChave: ['Persuasão'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'Você está acostumado a ser o centro das atenções e sabe como manter todos os olhos focados em você. Quando for bem-sucedido em um teste de Persuasão para distrair ou manter a atenção dos outros, você pode gastar 1 de ímpeto para dificultar em um passo todos os testes de Observar feitos pelos inimigos.',
  },
  {
    id: 'uma-resposta-para-tudo',
    nome: 'Uma Resposta para Tudo',
    palavrasChave: ['Persuasão'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'Você aprecia debates intensos, onde pode ver o argumento de seus oponentes se desenrolar e, em seguida, usá-lo contra eles. Quando você for bem-sucedido em um teste de Persuasão como parte de uma tarefa estendida, pode rejogar uma quantidade de d20s igual à sua perícia Persuasão.',
  },

  // ----------------------------------------------------------
  // RESILIÊNCIA
  // ----------------------------------------------------------
  {
    id: 'bom-de-copo',
    nome: 'Bom de Copo',
    palavrasChave: ['Resiliência'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'Bebidas de alto teor alcoólico ajudam você a manter os nervos. Adicione um cantil de bebida alcoólica forte aos seus pertences. Quando você fizer a ação Tomar Fôlego para remover estresse de si ou de um aliado, você ou ele podem beber do cantil. Fazer isso remove 1 de estresse adicional. No entanto, se obtiver um efeito, o álcool entorpeceu suas habilidades, e você aumenta em +1 a margem de complicação de todas as perícias que tentar pelo restante da cena. Você não pode usar este talento se a bebida acabar (possivelmente como uma complicação), embora nunca seja muito difícil conseguir uma recarga.',
  },
  {
    id: 'corajoso',
    nome: 'Corajoso',
    palavrasChave: ['Resiliência'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'Você não se assusta fácil. Você ganha uma quantidade de resistência de Coragem igual à sua perícia Resiliência.',
  },
  {
    id: 'casca-grossa',
    nome: 'Casca-Grossa',
    palavrasChave: ['Resiliência'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'Você é mais durão que a maioria das pessoas. Sua resistência de Armadura aumenta em +1.',
  },
  {
    id: 'esforco-extra',
    nome: 'Esforço Extra',
    palavrasChave: ['Resiliência'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'Ao escolher este talento, selecione um atributo. Sempre que você fizer um teste usando o atributo escolhido, pode comprar d20s extras usando Fadiga em vez de ímpeto, sofrendo 1 de Fadiga para cada ponto de ímpeto que teria gastado.',
  },
  {
    id: 'folego-renovado',
    nome: 'Fôlego Renovado',
    palavrasChave: ['Resiliência', 'Fortuna'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'No seu turno, como uma ação livre, você pode gastar um ponto de Fortuna para remover todo o estresse que tem atualmente.',
  },
  {
    id: 'indomito',
    nome: 'Indômito',
    palavrasChave: ['Resiliência'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'Sempre que você fizer um teste de perícia para resistir ser intimidado ou ameaçado, ou então para resistir ao medo e ao pânico, o primeiro d20 extra que comprar é gratuito.',
  },
  {
    id: 'vigoroso',
    nome: 'Vigoroso',
    palavrasChave: ['Resiliência'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'Você consegue lidar com estresse melhor que a maioria das pessoas. Seu medidor de estresse aumenta em +3.',
  },

  // ----------------------------------------------------------
  // SOBREVIVÊNCIA
  // ----------------------------------------------------------
  {
    id: 'companheiro',
    nome: 'Companheiro',
    palavrasChave: ['Sobrevivência'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'Você não está sozinho nos ermos. Você tem um cachorro de estimação que atua como amigo e aliado em momentos perigosos. Esse animal tem um perfil de personagem e é tratado como um PdM aliado sob seu comando. Quando você procurar suprimentos, seu cão cuida de si mesmo. Se esse companheiro for morto pelas mãos dos inimigos ou devido ao infortúnio, você imediatamente ganha um ponto de Fortuna e pode escolher retreinar este talento (e conseguir um novo cão) ou substituí-lo por um talento diferente.',
  },
  {
    id: 'misturando-se-a-natureza',
    nome: 'Misturando-se à Natureza',
    palavrasChave: ['Sobrevivência'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'Você se sente em casa nas regiões indomadas do mundo. Você pode usar Sobrevivência, em vez de Furtividade, ao tentar se esconder ou evitar a atenção em um ambiente rural inóspito.',
  },
  {
    id: 'posicao-defensiva',
    nome: 'Posição Defensiva',
    palavrasChave: ['Sobrevivência'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'Você sabe tornar os ermos acolhedores. Sempre que fizer um teste de Sobrevivência para armar um acampamento ou posição defensiva, você pode reduzir o tempo gasto pela metade.',
  },
  {
    id: 'rastreador',
    nome: 'Rastreador',
    palavrasChave: ['Sobrevivência'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'Você consegue seguir até mesmo os rastros mais fracos. Sempre que fizer um teste de Sobrevivência para rastrear animais, pessoas ou criaturas de outro mundo, o primeiro d20 extra que você comprar é gratuito. Se a ação de rastrear for feita como parte de uma tarefa estendida, você causa +1 de estresse para cada efeito obtido.',
  },
  {
    id: 'sobreviver-e-prosperar',
    nome: 'Sobreviver e Prosperar',
    palavrasChave: ['Sobrevivência'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'Você aproveita ao máximo seus kits e mochilas de suprimentos, carregando o que for humanamente possível sem causar atrasos. Você pode carregar um item maior adicional. Isso acumula com quaisquer itens adicionais extras por ter uma Força alta.',
  },
  {
    id: 'tudo-que-eu-preciso-esta-aqui',
    nome: 'Tudo Que Eu Preciso Está Aqui',
    palavrasChave: ['Sobrevivência'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'Você é hábil em encontrar o que precisa na natureza. Sempre que fizer um teste de Sobrevivência para encontrar comida, água limpa, lenha e outros suprimentos essenciais, você pode facilitá-lo em um passo e encontrar comida e água suficiente para 1 refeição adicional por cada ponto de ímpeto gasto.',
  },

  // ----------------------------------------------------------
  // TÁTICAS
  // ----------------------------------------------------------
  {
    id: 'chamado-a-acao',
    nome: 'Chamado à Ação',
    palavrasChave: ['Táticas'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'Você dá instruções precisas, permitindo que seus aliados assumam posições favoráveis. Em uma cena de ação, você pode gastar uma ação menor para deixar um aliado fazer uma ação menor imediata. Como uma ação maior, você pode fazer um teste Médio (D1) de Coordenação + Táticas para conceder uma ação menor imediata a uma quantidade de aliados igual à sua perícia Táticas. Você precisa estar se comunicando com o aliado a quem quer conceder essa ação menor extra.',
  },
  {
    id: 'direcionar',
    nome: 'Direcionar',
    palavrasChave: ['Táticas'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'Seu forte é comandar os outros. Em uma cena de ação, como uma ação maior, escolha um único aliado com o qual possa se comunicar. Esse aliado pode tentar imediatamente uma ação maior. Se essa ação incluir um teste de perícia, você presta auxílio, usando sua perícia Táticas.',
  },
  {
    id: 'irmaos-de-armas',
    nome: 'Irmãos de Armas',
    palavrasChave: ['Táticas'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'Você e seus aliados criaram laços devido à adversidade compartilhada. Quando uma cena de ação começar, se houver menos pontos de ímpeto na reserva do grupo do que personagens presentes com este talento, adicione imediatamente um ponto de ímpeto à reserva do grupo.',
  },
  {
    id: 'plano-decisivo',
    nome: 'Plano Decisivo',
    palavrasChave: ['Táticas'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'Você é hábil em ajudar seus aliados no calor da batalha. Quando prestar auxílio durante uma cena de ação, você pode Manter a Iniciativa sem pagar o custo normal de ímpeto.',
  },
  {
    id: 'transmitir-intencao',
    nome: 'Transmitir Intenção',
    palavrasChave: ['Táticas'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'Você não precisa dizer muito para ser completamente compreendido, e muitas vezes um gesto na hora certa pode falar muito. Sempre que fizer um teste de Táticas para transmitir instruções ou comunicar um novo plano para o restante do grupo, o primeiro d20 extra que você comprar é gratuito.',
  },
  {
    id: 'trabalho-em-equipe',
    nome: 'Trabalho em Equipe',
    palavrasChave: ['Táticas'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'Sua equipe é mais do que a soma de suas partes, principalmente devido à sua influência. Quando você lidera ou auxilia um teste de perícia, se um personagem tiver um foco aplicável, todos os envolvidos contam como tendo um foco aplicável. Se o teste fizer parte de uma tarefa prolongada, adicione +2 de estresse à parada de dano.',
  },

  // ----------------------------------------------------------
  // VEÍCULOS
  // ----------------------------------------------------------
  {
    id: 'ainda-no-controle',
    nome: 'Ainda no Controle',
    palavrasChave: ['Veículos'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'Mesmo quando você perde o controle, ainda pode exercer influência sobre seu veículo. Quando um veículo que você está operando sofrer uma Complicação, você pode decidir os efeitos dela em vez de deixar a cargo do Mestre, embora este possa vetar coisas que não façam sentido.',
  },
  {
    id: 'artilheiro-de-combate',
    nome: 'Artilheiro de Combate',
    palavrasChave: ['Veículos'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'Você treinou para operar veículos de combate e armas montadas. Por isso, pode usar sua perícia Veículos, em vez de Combater, quando atacar com uma arma montada em um veículo.',
  },
  {
    id: 'avanco-de-metralha',
    nome: 'Avanço de Metralha',
    palavrasChave: ['Veículos', 'Avançado'],
    periciaSelecionavel: false,
    avancado: true,
    efeito: 'Você é um mestre das rajadas controladas, causando dano mortal aos seus inimigos. Sempre que fizer um ataque de barragem com uma arma enquanto estiver em um veículo, você ignora quaisquer aumentos na dificuldade e na margem de complicação causados pela velocidade do veículo ou pelo terreno acidentado.',
  },
  {
    id: 'contrabandista',
    nome: 'Contrabandista',
    palavrasChave: ['Veículos'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'Você conhece as melhores formas de esconder pessoas e suprimentos dentro e ao redor de um veículo. Ao tentar ocultar personagens ou objetos dentro de um veículo, use sua perícia Veículos, em vez de Furtividade. Você ainda pode rejogar 1d20 da parada.',
  },
  {
    id: 'dirigir-a-noite-inteira',
    nome: 'Dirigir a Noite Inteira',
    palavrasChave: ['Veículos'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'Você está acostumado a ficar atrás do volante por horas a fio. Quando estiver operando um veículo, você pode usar sua perícia com Veículos, em vez de Resiliência, em quaisquer testes feitos para resistir à Fadiga causada por exaustão ou privação de sono.',
  },
  {
    id: 'todo-terreno',
    nome: 'Todo-Terreno',
    palavrasChave: ['Veículos'],
    periciaSelecionavel: false,
    avancado: false,
    efeito: 'Embora os veículos em si não tenham sido projetados para isso, você é adepto de dirigi-los por terreno acidentado. Você facilita em um passo qualquer teste de terreno que fizer com o veículo.',
  },
]

// ============================================================
// MAGIAS
// ============================================================
// Tradições: 'Celta', 'Rúnico', 'Psíquico'
// pericia usa os IDs do characterTemplate.js

export const MAGIAS = [
  // ----------------------------------------------------------
  // GRIMÓRIO CELTA
  // ----------------------------------------------------------
  {
    id: 'berrante-de-noit',
    nome: 'Berrante de Nóit',
    tradicao: 'Celta',
    pericia: 'sobrevivencia',
    dificuldade: 'Média (D1)',
    custo: '4 Drenagem',
    duracao: 'Uma quantidade de rodadas igual ao Poder do conjurador',
    tipo: ['Maldição'],
    efeito: 'Feitiço de maldição. Este feitiço visa todas as criaturas inimigas dentro do alcance Médio do conjurador. O conjurador deve jogar seu Poder em [dados de efeito] e comparar a quantidade de efeitos obtidos com o Atletismo de cada alvo (para alvos maiores, adicione a Escala da criatura ao seu valor de Atletismo). Cada criatura cujo Atletismo for menor do que a quantidade de efeitos obtidos é enredada e não pode realizar nenhuma ação física além de tentar se libertar. Libertar-se requer um teste de Agilidade + Atletismo ou Força + Atletismo com dificuldade equivalente à quantidade de efeitos obtidos na conjuração do feitiço. Criaturas enredadas são libertadas automaticamente quando os efeitos do feitiço terminarem.',
    imperfeito: null,
    impeto: 'Para cada ímpeto gasto, uma criatura adicional em alcance Curto ou Longo também é afetada. Para cada ímpeto gasto, o conjurador joga +1 ao jogar seu Poder.',
  },
  {
    id: 'ciclone-de-cernunnos',
    nome: 'Ciclone de Cernunnos',
    tradicao: 'Celta',
    pericia: 'sobrevivencia',
    dificuldade: 'Desafiadora (D2)',
    custo: '4 Drenagem, Perfurante 1',
    duracao: 'Uma quantidade de rodadas igual ao Poder do conjurador',
    tipo: ['Invocação'],
    efeito: 'Feitiço de invocação. O feitiço conjura um ciclone de vento em uma zona a alcance Médio. O ciclone tem seu próprio turno na ordem de ações, mas não pode ser atacado ou sofrer dano de forma alguma. No início do turno do ciclone, ele causará Poder +1 de estresse físico com os efeitos Atordoante e Perfurante 1 em todas as criaturas e objetos danificáveis a alcance Curto dele, e então ele se moverá para uma zona adjacente. O dano causado contra criaturas sobrenaturais também tem o efeito Feroz. Sempre que o ciclone se mover, o conjurador pode escolher a direção, se estiver à distância Média dele. Se o conjurador estiver mais longe que isso, o ciclone permanecerá parado; o mestre pode gastar 1 de Ameaça para mover o ciclone.',
    imperfeito: 'Uma versão imperfeita deste feitiço não permite que o conjurador controle o ciclone e não exige que o mestre gaste Ameaça para mover o ciclone.',
    impeto: 'O conjurador pode aumentar o estresse que o ciclone causa à taxa de +1 por ímpeto gasto.',
  },
  {
    id: 'dadiva-de-arduinna',
    nome: 'Dádiva de Arduinna',
    tradicao: 'Celta',
    pericia: 'sobrevivencia',
    dificuldade: 'Desencorajadora (D3)',
    custo: '4 Drenagem',
    duracao: 'Uma quantidade total de rodadas igual ao Poder do conjurador, dividido igualmente entre os alvos afetados (arredondando para baixo)',
    tipo: ['Bênção'],
    efeito: 'Feitiço de bênção. Este feitiço pode afetar o conjurador e aliados em alcance Curto, até uma quantidade total de alvos igual ao Poder do conjurador. Enquanto os efeitos do feitiço persistirem, os aliados afetados podem se mover uma zona adicional quando se movimentam com uma Ação Maior ou Menor. Além disso, eles também podem realizar uma Ação Menor adicional gratuita a cada turno.',
    imperfeito: null,
    impeto: 'Para cada 2 de ímpeto gasto, o conjurador ou um único aliado afetado pode fazer uma Ação Maior adicional em um turno antes do fim dos efeitos de feitiço. Não é possível ganhar mais de uma Ação Maior.',
  },
  {
    id: 'generosidade-de-dagda',
    nome: 'Generosidade de Dagda',
    tradicao: 'Celta',
    pericia: 'medicina',
    dificuldade: 'Desafiadora (D2)',
    custo: '4 Drenagem',
    duracao: 'Instantâneo',
    tipo: ['Proteção'],
    efeito: 'Feitiço de proteção. Este feitiço remove uma quantidade de estresse igual ao Poder do conjurador de todos os aliados em alcance Curto.',
    imperfeito: null,
    impeto: 'Por 2 de ímpeto, todos os aliados afetados curam um único Ferimento (físico ou mental). Por 2 de ímpeto, adicione o efeito Persistente 6. Por 1 de ímpeto, todos os aliados dentro do alcance do feitiço que estiverem derrotados se recuperam imediatamente. Por 2 de ímpeto, o feitiço afeta aliados dentro do alcance Médio.',
  },
  {
    id: 'lanca-de-lug',
    nome: 'Lança de Lug',
    tradicao: 'Celta',
    pericia: 'combater',
    dificuldade: 'Desencorajadora (D3)',
    custo: '5 Drenagem, Perfurante 1',
    duracao: 'Instantâneo',
    tipo: ['Ataque'],
    efeito: 'Feitiço de ataque. Este feitiço atinge um único inimigo ou objeto ao alcance Médio e causa Poder + 2 de dano físico no alvo, com o efeito Perfurante 3.',
    imperfeito: null,
    impeto: 'Por 2 de ímpeto, adicione o efeito Violento. Por 2 de ímpeto, adicione o efeito Feroz.',
  },
  {
    id: 'olhar-de-balor',
    nome: 'Olhar de Balor',
    tradicao: 'Celta',
    pericia: 'persuasao',
    dificuldade: 'Desafiadora (D2), disputado pela Vontade + Resiliência do alvo',
    custo: '5 Atordoante, Drenagem',
    duracao: 'Instantâneo',
    tipo: ['Ataque'],
    efeito: 'Feitiço de ataque. Este feitiço tem como alvo um único inimigo ao alcance Médio e causa Poder +2 de estresse mental, com o efeito Violento.',
    imperfeito: null,
    impeto: 'Por 2 de ímpeto, adicione o efeito Drenagem.',
  },
  {
    id: 'raizes-da-terra',
    nome: 'Raízes da Terra',
    tradicao: 'Celta',
    pericia: 'sobrevivencia',
    dificuldade: 'Desafiadora (D2)',
    custo: '3 Atordoante, Drenagem',
    duracao: 'Instantâneo',
    tipo: ['Bênção'],
    efeito: 'Feitiço de bênção. Este feitiço pode afetar o conjurador e qualquer quantidade de aliados em alcance Curto, até uma quantidade total de alvos igual à metade do Poder do conjurador (arredondando para cima). Os personagens afetados desaparecem e reaparecem instantaneamente em qualquer ponto à vista dentro do alcance Longo.',
    imperfeito: null,
    impeto: 'Por 2 de ímpeto, todos os personagens transportados pelo feitiço recebem +2 de Cobertura até o início do próximo turno do conjurador.',
  },
  {
    id: 'simbolo-do-ogham',
    nome: 'Símbolo do Ogham',
    tradicao: 'Celta',
    pericia: 'academia',
    dificuldade: 'Desencorajadora (D3)',
    custo: '5 Drenagem, Perfurante 1',
    duracao: 'Instantâneo',
    tipo: ['Banimento'],
    efeito: 'Feitiço de banimento. Este feitiço tem como alvo uma única criatura sobrenatural ao alcance Médio e causa Poder + 2 de dano mental a ela, com os efeitos Drenagem e Perfurante 2, mesmo que a criatura normalmente seja imune a ataques mentais (criaturas normalmente imunes a ataques mentais contam como tendo Coragem 6). Se a criatura sofrer um ou mais Ferimentos mentais com este feitiço, perderá os benefícios de sua regra especial Invulnerável para o restante da cena atual. Se a criatura for derrotada pelo feitiço, ela desaparece, banida para o reino de onde se originou.',
    imperfeito: null,
    impeto: 'Por 2 de ímpeto, adicione o efeito Violento. Por 2 de ímpeto, adicione o efeito Atordoante.',
  },

  // ----------------------------------------------------------
  // GRIMÓRIO RÚNICO
  // ----------------------------------------------------------
  {
    id: 'bencao-de-eir',
    nome: 'Bênção de Eir',
    tradicao: 'Rúnico',
    pericia: 'medicina',
    dificuldade: 'Desencorajadora (D3)',
    custo: '4 Drenagem',
    duracao: 'Instantâneo',
    tipo: ['Proteção'],
    efeito: 'Feitiço de proteção. Este feitiço remove uma quantidade de estresse igual ao Poder do conjurador de todos os aliados em alcance Curto. Além disso, os aliados derrotados que estiverem ao alcance Curto se recuperam imediatamente.',
    imperfeito: 'Uma versão imperfeita deste feitiço remove o estresse de todas as criaturas ao alcance Curto, não apenas de aliados.',
    impeto: 'Por 2 de ímpeto, todos os aliados afetados curam um único Ferimento (físico ou mental). Por 2 de ímpeto, o feitiço afeta aliados dentro do alcance Médio.',
  },
  {
    id: 'celeridade-de-sleipnir',
    nome: 'Celeridade de Sleipnir',
    tradicao: 'Rúnico',
    pericia: 'sobrevivencia',
    dificuldade: 'Desafiadora (D2)',
    custo: '3 Drenagem',
    duracao: 'Instantâneo',
    tipo: ['Bênção'],
    efeito: 'Feitiço de bênção. O conjurador e quaisquer aliados em alcance Curto podem mover-se imediatamente duas zonas. Além disso, sempre que um aliado escolhe implementar a verdade Manter a Iniciativa antes do próximo turno do conjurador, custa 0 de ímpeto para fazê-lo.',
    imperfeito: null,
    impeto: 'Por dois de ímpeto, cada personagem afetado pode realizar uma ação menor adicional gratuita em seu próximo turno.',
  },
  {
    id: 'corvos-de-odin',
    nome: 'Corvos de Odin',
    tradicao: 'Rúnico',
    pericia: 'academia',
    dificuldade: 'Desafiadora (D2)',
    custo: '4 Drenagem, Perfurante 1',
    duracao: 'Uma quantidade de rodadas igual ao Poder do conjurador',
    tipo: ['Proteção'],
    efeito: 'Feitiço de proteção. Enquanto o feitiço permanecer ativo, todos os aliados do conjurador ao alcance Curto recebem uma quantidade de Moral adicional igual ao Poder do conjurador.',
    imperfeito: null,
    impeto: 'Por 2 de ímpeto, todos os personagens afetados causam +2 de estresse em todos os ataques corporais. Um ou mais aliados afetados podem receber um ponto de Fortuna adicional, que é perdido no final da duração do feitiço se não for usado, por 3 de ímpeto cada.',
  },
  {
    id: 'dadiva-de-baldur',
    nome: 'Dádiva de Baldur',
    tradicao: 'Rúnico',
    pericia: 'resiliencia',
    dificuldade: 'Desafiadora (D2)',
    custo: '3 Drenagem',
    duracao: 'Uma quantidade de rodadas igual ao Poder do conjurador',
    tipo: ['Proteção'],
    efeito: 'Feitiço de proteção. Enquanto este feitiço permanecer ativo, quaisquer ataques contra o conjurador ou qualquer um dos aliados dele dentro do seu alcance Curto são dificultados em dois passos.',
    imperfeito: null,
    impeto: 'Todos os personagens afetados ganham +X de Cobertura, em que X é a quantidade de ímpeto gasto.',
  },
  {
    id: 'maldicao-de-loki',
    nome: 'Maldição de Loki',
    tradicao: 'Rúnico',
    pericia: 'persuasao',
    dificuldade: 'Desafiadora (D2)',
    custo: '5 Drenagem. Além disso, cada efeito obtido no custo gera 1 de Ameaça',
    duracao: 'Instantâneo',
    tipo: ['Ataque'],
    efeito: 'Feitiço de ataque. O conjurador causa Poder + 2 de dano mental com o efeito Atordoante a todos os inimigos no alcance Curto.',
    imperfeito: 'Uma versão imperfeita desse feitiço afeta todas as criaturas dentro do alcance, não apenas os inimigos.',
    impeto: 'Por 2 de ímpeto, adicione o efeito Persistente 6. Por 2 de ímpeto, adicione o efeito Contenção ao ataque.',
  },
  {
    id: 'martelo-de-thor',
    nome: 'Martelo de Thor',
    tradicao: 'Rúnico',
    pericia: 'combater',
    dificuldade: 'Desafiadora (D2)',
    custo: '4 Drenagem, Perfurante 1',
    duracao: 'Instantâneo',
    tipo: ['Ataque'],
    efeito: 'Feitiço de ataque. Este feitiço atinge um único inimigo ou objeto dentro do alcance Médio e causa Poder + 2 de dano no alvo, com o efeito Área.',
    imperfeito: null,
    impeto: 'Por 1 de ímpeto, substitua o efeito Área pelo efeito Perfurante 2. Por 2 de ímpeto, adicione o efeito Feroz. Por 2 de ímpeto, adicione o efeito Atordoante.',
  },
  {
    id: 'sabedoria-de-frigg',
    nome: 'Sabedoria de Frigg',
    tradicao: 'Rúnico',
    pericia: 'observar',
    dificuldade: 'Média (D1)',
    custo: '3 Atordoante, Drenagem',
    duracao: 'Instantâneo',
    tipo: ['Divinação'],
    efeito: 'Feitiço de divinação. O conjurador precisa escolher uma única criatura dentro do alcance Médio. Ele ganha 3 de ímpeto extra, que podem ser usados apenas para Obter Informação sobre a criatura ou criar uma Verdade, considerando que a Verdade criada precisa refletir conhecimento sobre as fraquezas do alvo.',
    imperfeito: null,
    impeto: 'Por 2 de ímpeto, se a criatura tiver a habilidade especial Invulnerável, ela perde essa habilidade por uma quantidade de rodadas igual ao Poder do feiticeiro. Por 2 de ímpeto, quaisquer ataques feitos contra a criatura escolhida ganham o efeito Feroz ou Violento (à escolha do conjurador, aplicando-se a todos os ataques).',
  },

  // ----------------------------------------------------------
  // PSIQUISMO
  // ----------------------------------------------------------
  {
    id: 'atenuacao',
    nome: 'Atenuação',
    tradicao: 'Psíquico',
    pericia: 'academia',
    dificuldade: 'Desafiadora (D2), disputado pela Vontade + Resiliência do alvo',
    custo: '5 Drenagem, Perfurante 1',
    duracao: 'Uma quantidade de rodadas igual à metade do Poder do psíquico, arredondando para cima',
    tipo: ['Maldição'],
    efeito: 'Maldição. Visa uma única criatura dentro do alcance Médio; se a habilidade funcionar, o alvo perde sua habilidade especial Invulnerável, permitindo que seja ferido por ataques convencionais. Esta habilidade não tem efeito contra criaturas sem a habilidade especial Invulnerável.',
    imperfeito: null,
    impeto: 'Por 1 de ímpeto, todos os ataques físicos contra a criatura afetada ganham o efeito Perfurante 1. Por 2 de ímpeto, todos os aliados do psíquico ganham +3 de Moral contra qualquer estresse mental que a criatura afetada causar.',
  },
  {
    id: 'combustao-espontanea',
    nome: 'Combustão Espontânea',
    tradicao: 'Psíquico',
    pericia: 'resiliencia',
    dificuldade: 'Média (D1)',
    custo: '4 Drenagem, Persistente 3',
    duracao: 'Instantâneo',
    tipo: ['Ataque', 'Invocação'],
    efeito: 'Ataque ou Invocação. O psíquico determina um objeto ou criatura a alcance Curto; o alvo fica extremamente quente em alguns instantes e pode pegar fogo, causando Poder + 1 de estresse físico, com o efeito Persistente 4. Alternativamente, o efeito da habilidade cria uma nova verdade nas proximidades, pois o psíquico faz com que um objeto exploda em chamas — isso pode ser tão benigno quanto acender uma fogueira ou tão perigoso quanto tocar fogo em um depósito de combustíveis ou explosivos.',
    imperfeito: 'Uma versão imperfeita desta habilidade ganha o efeito de Área, mas o jogador não tem controle sobre quais criaturas ou objetos também são afetados por ela.',
    impeto: 'Por 2 de ímpeto, adicione o efeito Área. Por 2 de ímpeto, adicione o efeito Perfurante 2. Por 2 de ímpeto, o objeto ou criatura visado pode estar no alcance Médio.',
  },
  {
    id: 'furia-atavica',
    nome: 'Fúria Atávica',
    tradicao: 'Psíquico',
    pericia: 'combater',
    dificuldade: 'Desafiadora (D2)',
    custo: '4 Drenagem',
    duracao: 'Até o final da cena atual',
    tipo: ['Bênção'],
    efeito: 'Bênção. O psíquico seleciona um único personagem ao alcance Curto (que pode ser ele mesmo). Esse personagem entra em uma fúria monstruosa e fica incapaz de fazer ataques a distância ou usar quaisquer outras habilidades enquanto o efeito persistir. O alvo pode fazer ataques corporais que causam Poder + 1 de estresse físico com o efeito Feroz (ou ganhar +1 em seus ataques corporais, pra quem não for psíquico). Além disso, o alvo também ganha +3 de resistência de Armadura.',
    imperfeito: 'Uma versão imperfeita desta habilidade deixa o alvo incapaz de distinguir amigo de inimigo, fazendo com que ataque o indivíduo mais próximo.',
    impeto: 'Por 2 de ímpeto, os ataques corporais do personagem afetado também ganham o efeito Perfurante 1.',
  },
  {
    id: 'grito-primordial',
    nome: 'Grito Primordial',
    tradicao: 'Psíquico',
    pericia: 'persuasao',
    dificuldade: 'Média (D1)',
    custo: '4 Atordoante, Drenagem',
    duracao: 'Instantâneo',
    tipo: ['Ataque'],
    efeito: 'Ataque. O psíquico causa Poder + 2 de dano mental com o efeito Atordoante a todos os inimigos ao alcance Curto.',
    imperfeito: 'Uma versão imperfeita desta habilidade afeta todas as criaturas dentro do alcance, não apenas inimigos.',
    impeto: 'Por 2 de ímpeto, adicione o efeito Perfurante 1. Por 2 de ímpeto, adicione o efeito Feroz. Por 2 de ímpeto, aumente o alcance para Médio.',
  },
  {
    id: 'instintos-aprimorados',
    nome: 'Instintos Aprimorados',
    tradicao: 'Psíquico',
    pericia: 'observar',
    dificuldade: 'Desafiadora (D2)',
    custo: '3 Drenagem',
    duracao: 'Uma quantidade de rodadas igual ao Poder do psíquico',
    tipo: ['Bênção'],
    efeito: 'Bênção. Esta habilidade afeta o psíquico ou um dos seus aliados a alcance Curto. Os personagens afetados ignoram qualquer aumento de dificuldade em ataques a distância devido ao alcance de suas armas e adicionam Perfurante 1 ao dano dos ataques.',
    imperfeito: null,
    impeto: 'Por cada 2 de ímpeto gasto, isso pode afetar um aliado adicional.',
  },
  {
    id: 'nirvana-interior',
    nome: 'Nirvana Interior',
    tradicao: 'Psíquico',
    pericia: 'resiliencia',
    dificuldade: 'Desafiadora (D2)',
    custo: '3 Drenagem',
    duracao: 'Uma quantidade de rodadas igual ao Poder do psíquico',
    tipo: ['Proteção'],
    efeito: 'Proteção. Esta habilidade afeta o psíquico e qualquer quantidade de aliados em alcance Curto, até um total de alvos igual ao Poder do psíquico. Os personagens afetados recebem uma quantidade de Cobertura adicional igual à metade do Poder do psíquico (arredondando para cima). Além disso, os personagens afetados recuperam uma quantidade de estresse igual à Resiliência deles no começo de cada turno em que a habilidade estiver ativada.',
    imperfeito: null,
    impeto: 'Por 2 de ímpeto, os personagens recebem uma quantidade de Cobertura igual ao Poder do psíquico, em vez de metade.',
  },
  {
    id: 'percepcao-de-combate',
    nome: 'Percepção de Combate',
    tradicao: 'Psíquico',
    pericia: 'observar',
    dificuldade: 'Desafiadora (D2)',
    custo: '3 Drenagem, Perfurante 1',
    duracao: 'Uma quantidade de rodadas igual ao Poder do psíquico',
    tipo: ['Bênção'],
    efeito: 'Bênção. Por algum tempo, o psíquico consegue prever e contra-atacar movimentos inimigos, tornando-o muito mais difícil de acertar, fortalecendo contra-ataques e maximizando a potência de seus próprios ataques corporais. A dificuldade dos ataques corporais feitos contra o psíquico aumenta em dois passos. O psíquico também adiciona +2 a qualquer estresse físico que causar com ataques corporais.',
    imperfeito: null,
    impeto: 'Por 2 de ímpeto, a dificuldade dos ataques a distância feitos contra o psíquico também aumenta em dois passos. Por 1 de ímpeto, quando esta habilidade for usada e no início de cada rodada em que estiver ativada, o psíquico pode fazer uma única pergunta sobre a situação como em Obter Informação.',
  },
  {
    id: 'telecinese',
    nome: 'Telecinese',
    tradicao: 'Psíquico',
    pericia: 'resiliencia',
    dificuldade: 'Variável',
    custo: '3 Drenagem',
    duracao: 'Variável',
    tipo: ['Manifestação'],
    efeito: 'Manifestação. O psíquico escolhe um dos seguintes efeitos quando esta habilidade for usada com sucesso: Manipular (Dificuldade Média D1) — o psíquico move ou manipula objetos ao alcance Curto como se estivesse fazendo isso fisicamente, podendo manipular uma quantidade de objetos igual ao seu Poder por uma quantidade de rodadas igual ao seu Poder. Esses objetos não podem ser movidos rápido o bastante para causar dano. Qualquer manipulação complexa exige que o psíquico consiga vê-los. Projetar (Dificuldade Média D1) — o psíquico arremessa pequenos objetos com uma onda de força telecinética concentrada, escolhendo um único inimigo ao alcance Curto e causando Poder de estresse físico com o efeito Atordoante. Efeito instantâneo. Segurar (Dificuldade equivalente à Escala do alvo, mínima de 1) — o psíquico move uma única criatura ou objeto grande. Escolhe um alvo a alcance Curto com Escala até metade do seu Poder, podendo movê-lo para qualquer lugar dentro do alcance Curto da localização original. Dura uma quantidade de rodadas igual ao Poder do psíquico. O objeto fica indefeso; se cair ou bater em algo sólido, sofre Poder de estresse físico com efeito Atordoante.',
    imperfeito: null,
    impeto: 'Por 2 de ímpeto, qualquer efeito de telecinese pode influenciar objetos dentro do alcance Médio. Por 1 de ímpeto, ao usar Manipular, o psíquico pode manejar armas de longo alcance para atacar com elas (requer ação maior, não pode se concentrar em mais de uma arma por vez). Por 2 de ímpeto, ao usar Manipular, os objetos controlados fornecem ao psíquico +2 de Cobertura. Por 2 de ímpeto, ao usar Projetar, adicione o efeito Área. Por 2 de ímpeto, ao usar Projetar, os alvos são derrubados. Por 2 de ímpeto, ao usar Segurar, o alvo pode ser esmagado como uma ação maior, causando Poder + 2 de estresse físico com o efeito Perfurante 2.',
  },
  {
    id: 'telepatia',
    nome: 'Telepatia',
    tradicao: 'Psíquico',
    pericia: 'observar',
    dificuldade: 'Variável',
    custo: '1 Drenagem, Perfurante 1',
    duracao: 'Variável',
    tipo: ['Manifestação'],
    efeito: 'Manifestação. O psíquico escolhe um dos seguintes efeitos. Esses efeitos só funcionarão em seres com inteligência semelhante à humana. Enviar Pensamento (Dificuldade Média D1) — o psíquico pode enviar seus pensamentos para qualquer pessoa ao alcance Médio, equivalendo a alguns segundos de fala; o destinatário pode responder. Acontece instantaneamente. Ligação Mental (Dificuldade Desafiadora D2) — o psíquico liga as mentes de uma quantidade de pessoas voluntárias igual ao seu Poder, ao alcance Médio. Por uma quantidade de horas igual ao Poder do psíquico, os ligados podem se comunicar telepaticamente. Se algum membro sofrer estresse mental, todos os outros sofrerão metade desse estresse (arredondado para cima). Leitura Mental (Dificuldade Desafiadora D2, disputado pela Vontade + Resiliência do alvo, custo aumenta em 3) — o psíquico sonda a mente de uma única pessoa ao alcance Curto, revelando pensamentos superficiais. É possível gastar ímpeto como Obter Informação. Cada ação maior persistindo permite uma pergunta sem custo de ímpeto.',
    imperfeito: null,
    impeto: 'Ao usar Enviar Pensamento ou Ligação Mental, o alcance é aumentado para Longo por 1 de ímpeto, para "em qualquer lugar dentro de dois quilômetros" por 2 de ímpeto, ou para "em qualquer lugar da Terra" por 3 de ímpeto. Ao usar Enviar Pensamento ou Ligação Mental, o psíquico ou outra criatura visada podem gastar 1 ou mais ímpeto para compartilhar imagens, sons ou memórias de seus próprios sentidos. Ao usar Leitura Mental, por 2 de ímpeto o alvo não terá conhecimento da intrusão mental.',
  },
  {
    id: 'visualizacao-remota',
    nome: 'Visualização Remota',
    tradicao: 'Psíquico',
    pericia: 'observar',
    dificuldade: 'Desafiadora (D2)',
    custo: '2 Drenagem, Perfurante 1',
    duracao: 'Uma quantidade de rodadas igual ao Poder do psíquico',
    tipo: ['Divinação'],
    efeito: 'Divinação. O psíquico seleciona um objeto a alcance Curto do qual esteja ciente. O psíquico pode estudar com precisão o objeto, mesmo partes dele que estão escondidas ou obscurecidas, como ler cartas dentro de envelopes selados ou perceber o conteúdo de um cofre trancado. Ele pode continuar a estudar o objeto, ou mudar sua atenção para outro objeto dentro do alcance (uma vez por rodada no máximo), enquanto a habilidade durar. Gastar ímpeto para Obter Informação enquanto esta habilidade está em efeito pode revelar coisas que uma pessoa normal não teria como descobrir.',
    imperfeito: null,
    impeto: 'O custo de Visualização Remota aumenta em +1 para cada ímpeto gasto nas opções a seguir. Por 1 de ímpeto, o psíquico pode selecionar um objeto dentro do alcance Médio. Por 2 de ímpeto, pode selecionar um objeto dentro do alcance Longo. Por 3 de ímpeto, pode selecionar um objeto em qualquer local da Terra com o qual esteja familiarizado (em todos os casos, o psíquico precisa estar ciente do objeto antes de usar a habilidade). Por 3 de ímpeto, o psíquico também pode escolher um objeto Adjacente e obter conhecimento limitado sobre o passado dele; gastar ímpeto adicional para Obter Informação possibilita fazer perguntas sobre a história do objeto — o alcance da habilidade não pode ser aumentado se essa opção for usada.',
  },
]

// ============================================================
// ARMAS
// ============================================================
// categoria: 'Corporal' | 'Pistola' | 'Rifle/Fuzil' | 'Submetralhadora/MG' | 'Arma Pesada' | 'Granada' | 'Exótica'
// origem: 'Aliada' | 'Alemã'
// alcance: null (corpo a corpo) | 'Curto' | 'Médio' | 'Longo' | 'Extremo'
// estresse: número de Dados de Desafio (ex: '4')
// efeito: efeitos ativados por ⚔ nos dados de dano (ex: 'Feroz', 'Perfurante 1'), ou null
// barragem: efeito de barragem, ou null
// tamanho: 'Trivial' | 'Pequeno' | 'Grande' | 'N/A' | '3 por Pequeno'
// qualidades: propriedades passivas da arma (ex: 'Ocultável, Sutil'), ou null
// restricao: string ('—' = sem restrição)

export const ARMAS = [
  // ----------------------------------------------------------
  // CORPORAIS — ALIADAS
  // ----------------------------------------------------------
  { id: 'ataque-desarmado', nome: 'Ataque Desarmado', categoria: 'Corporal', origem: 'Aliada', foco: 'Combate Desarmado', alcance: null, estresse: '2', efeito: null, barragem: null, tamanho: 'N/A', qualidades: 'Sutil', restricao: '—' },
  { id: 'baioneta', nome: 'Baioneta', categoria: 'Corporal', origem: 'Aliada', foco: 'Armas Corporais', alcance: null, estresse: '3', efeito: 'Perfurante 1', barragem: null, tamanho: 'Pequeno', qualidades: null, restricao: '1' },
  { id: 'cassetete', nome: 'Cassetete', categoria: 'Corporal', origem: 'Aliada', foco: 'Armas Corporais', alcance: null, estresse: '3', efeito: null, barragem: null, tamanho: 'Pequeno', qualidades: 'Sutil', restricao: '1' },
  { id: 'coronha-de-fuzil', nome: 'Coronha de Fuzil', categoria: 'Corporal', origem: 'Aliada', foco: 'Armas Corporais', alcance: null, estresse: '3', efeito: null, barragem: null, tamanho: 'N/A', qualidades: null, restricao: '—' },
  { id: 'faca-de-combate', nome: 'Faca de Combate', categoria: 'Corporal', origem: 'Aliada', foco: 'Armas Corporais', alcance: null, estresse: '2', efeito: 'Perfurante 1', barragem: null, tamanho: 'Pequeno', qualidades: 'Ocultável, Sutil', restricao: '1' },
  { id: 'faca-de-dedal', nome: 'Faca de Dedal', categoria: 'Corporal', origem: 'Aliada', foco: 'Armas Corporais', alcance: null, estresse: '1', efeito: 'Perfurante 1', barragem: null, tamanho: 'Pequeno', qualidades: 'Ocultável, Sutil', restricao: '1' },
  { id: 'faca-de-trincheira', nome: 'Faca de Trincheira', categoria: 'Corporal', origem: 'Aliada', foco: 'Armas Corporais', alcance: null, estresse: '3', efeito: 'Feroz', barragem: null, tamanho: 'Pequeno', qualidades: 'Ocultável', restricao: '1' },
  { id: 'garrote', nome: 'Garrote', categoria: 'Corporal', origem: 'Aliada', foco: 'Combate Desarmado', alcance: null, estresse: '3', efeito: 'Contenção', barragem: null, tamanho: 'Trivial', qualidades: 'Ocultável, Sutil', restricao: '2' },
  { id: 'machado', nome: 'Machado', categoria: 'Corporal', origem: 'Aliada', foco: 'Armas Corporais', alcance: null, estresse: '3', efeito: 'Feroz', barragem: null, tamanho: 'Pequeno', qualidades: null, restricao: '1' },
  { id: 'machado-de-bombeiro', nome: 'Machado de Bombeiro', categoria: 'Corporal', origem: 'Aliada', foco: 'Armas Corporais', alcance: null, estresse: '4', efeito: 'Feroz', barragem: null, tamanho: 'Grande', qualidades: null, restricao: '1' },
  { id: 'pa-de-trincheira', nome: 'Pá de Trincheira', categoria: 'Corporal', origem: 'Aliada', foco: 'Armas Corporais', alcance: null, estresse: '3', efeito: null, barragem: null, tamanho: 'Pequeno', qualidades: null, restricao: '1' },
  { id: 'sabre', nome: 'Sabre', categoria: 'Corporal', origem: 'Aliada', foco: 'Armas Corporais', alcance: null, estresse: '3', efeito: 'Perfurante 1', barragem: null, tamanho: 'Grande', qualidades: 'Aparagem', restricao: '2' },
  { id: 'soqueira', nome: 'Soqueira', categoria: 'Corporal', origem: 'Aliada', foco: 'Combate Desarmado', alcance: null, estresse: '2', efeito: 'Atordoante', barragem: null, tamanho: 'Pequeno', qualidades: 'Ocultável', restricao: '1' },
  { id: 'taco', nome: 'Taco', categoria: 'Corporal', origem: 'Aliada', foco: 'Armas Corporais', alcance: null, estresse: '3', efeito: 'Atordoante', barragem: null, tamanho: 'Grande', qualidades: null, restricao: '1' },
  // Exóticas Corporais
  { id: 'espada', nome: 'Espada', categoria: 'Exótica', origem: 'Aliada', foco: 'Exótico', alcance: null, estresse: '4', efeito: null, barragem: null, tamanho: 'Grande', qualidades: 'Aparagem', restricao: '2' },
  { id: 'espada-larga', nome: 'Espada Larga', categoria: 'Exótica', origem: 'Aliada', foco: 'Exótico', alcance: null, estresse: '5', efeito: null, barragem: null, tamanho: 'Grande', qualidades: null, restricao: '2' },
  { id: 'lanca', nome: 'Lança', categoria: 'Exótica', origem: 'Aliada', foco: 'Exótico', alcance: null, estresse: '4', efeito: 'Perfurante 1', barragem: null, tamanho: 'Grande', qualidades: null, restricao: '2' },
  // Exóticas de Alcance
  { id: 'arco', nome: 'Arco', categoria: 'Exótica', origem: 'Aliada', foco: 'Exótico', alcance: 'Médio', estresse: '3', efeito: null, barragem: 'Perfurante, Feroz', tamanho: 'Grande', qualidades: 'Confiável, Sutil', restricao: '—' },
  { id: 'arco-longo', nome: 'Arco Longo', categoria: 'Exótica', origem: 'Aliada', foco: 'Exótico', alcance: 'Longo', estresse: '5', efeito: null, barragem: 'Perfurante, Feroz', tamanho: 'Grande', qualidades: 'Confiável, Sutil', restricao: '—' },
  { id: 'besta', nome: 'Besta', categoria: 'Exótica', origem: 'Aliada', foco: 'Exótico', alcance: 'Médio', estresse: '4', efeito: null, barragem: 'Perfurante', tamanho: 'Grande', qualidades: 'Confiável, Sutil', restricao: '—' },

  // ----------------------------------------------------------
  // PISTOLAS — ALIADAS
  // ----------------------------------------------------------
  { id: 'enpen-mk1', nome: 'Enpen Mk.I', categoria: 'Pistola', origem: 'Aliada', foco: 'Pistolas', alcance: 'Curto', estresse: '2', efeito: null, barragem: 'Feroz', tamanho: 'Pequeno', qualidades: 'Combate Próximo, Sutil', restricao: '—' },
  { id: 'pistola-browning-hi-power', nome: 'Pistola Browning Hi-Power', categoria: 'Pistola', origem: 'Aliada', foco: 'Pistolas', alcance: 'Curto', estresse: '5', efeito: null, barragem: 'Feroz', tamanho: 'Pequeno', qualidades: 'Combate Próximo', restricao: '1' },
  { id: 'pistola-high-standard-hdm', nome: 'Pistola High Standard HDM', categoria: 'Pistola', origem: 'Aliada', foco: 'Pistolas', alcance: 'Curto', estresse: '3', efeito: null, barragem: 'Feroz', tamanho: 'Pequeno', qualidades: 'Combate Próximo, Sutil', restricao: '1' },
  { id: 'pistola-m1911a1', nome: 'Pistola M1911A1', categoria: 'Pistola', origem: 'Aliada', foco: 'Pistolas', alcance: 'Curto', estresse: '4', efeito: null, barragem: 'Feroz', tamanho: 'Pequeno', qualidades: 'Combate Próximo, Ocultável', restricao: '—' },
  { id: 'pistola-mab-modele-d', nome: 'Pistola MAB Modèle D', categoria: 'Pistola', origem: 'Aliada', foco: 'Pistolas', alcance: 'Curto', estresse: '3', efeito: null, barragem: 'Feroz', tamanho: 'Pequeno', qualidades: 'Combate Próximo', restricao: '1' },
  { id: 'pistola-oculta', nome: 'Pistola Oculta', categoria: 'Pistola', origem: 'Aliada', foco: 'Pistolas', alcance: 'Curto', estresse: '3', efeito: null, barragem: 'Feroz', tamanho: 'Pequeno', qualidades: 'Combate Próximo, Ocultável', restricao: '1' },
  { id: 'pistola-welrod-mk2a', nome: 'Pistola Welrod Mk.IIA', categoria: 'Pistola', origem: 'Aliada', foco: 'Pistolas', alcance: 'Curto', estresse: '3', efeito: null, barragem: 'Feroz', tamanho: 'Pequeno', qualidades: 'Combate Próximo, Sutil', restricao: '2' },
  { id: 'revolver-enfield-no2', nome: 'Revólver de Serviço Enfield No.2 .38/200', categoria: 'Pistola', origem: 'Aliada', foco: 'Pistolas', alcance: 'Curto', estresse: '4', efeito: null, barragem: 'Feroz', tamanho: 'Pequeno', qualidades: 'Combate Próximo, Confiável', restricao: '1' },
  { id: 'revolver-mas-1873', nome: 'Revólver MAS Modèle 1873', categoria: 'Pistola', origem: 'Aliada', foco: 'Pistolas', alcance: 'Curto', estresse: '4', efeito: null, barragem: 'Feroz', tamanho: 'Pequeno', qualidades: 'Combate Próximo', restricao: '1' },

  // ----------------------------------------------------------
  // RIFLES E FUZIS — ALIADOS
  // ----------------------------------------------------------
  { id: 'carabina-berthier-m16', nome: 'Carabina Berthier Modèle 1892 M16', categoria: 'Rifle/Fuzil', origem: 'Aliada', foco: 'Rifles e Fuzis', alcance: 'Médio', estresse: '5', efeito: null, barragem: 'Feroz', tamanho: 'Grande', qualidades: 'Confiável', restricao: '2' },
  { id: 'carabina-de-lisle', nome: 'Carabina De Lisle Commando Mk.I', categoria: 'Rifle/Fuzil', origem: 'Aliada', foco: 'Rifles e Fuzis', alcance: 'Médio', estresse: '4', efeito: null, barragem: 'Feroz', tamanho: 'Grande', qualidades: 'Sutil', restricao: '3' },
  { id: 'carabina-m1', nome: 'Carabina M1', categoria: 'Rifle/Fuzil', origem: 'Aliada', foco: 'Rifles e Fuzis', alcance: 'Médio', estresse: '4', efeito: null, barragem: 'Feroz', tamanho: 'Grande', qualidades: 'Confiável', restricao: '2' },
  { id: 'espingarda-winchester-m12', nome: 'Espingarda Winchester M12', categoria: 'Rifle/Fuzil', origem: 'Aliada', foco: 'Combate Próximo', alcance: 'Curto', estresse: '5', efeito: null, barragem: 'Feroz', tamanho: 'Grande', qualidades: 'Confiável', restricao: '2' },
  { id: 'fuzil-lee-enfield', nome: 'Fuzil Lee-Enfield', categoria: 'Rifle/Fuzil', origem: 'Aliada', foco: 'Rifles e Fuzis', alcance: 'Médio', estresse: '6', efeito: null, barragem: 'Feroz', tamanho: 'Grande', qualidades: 'Confiável', restricao: '2' },
  { id: 'fuzil-m1-garand', nome: 'Fuzil M1 Garand', categoria: 'Rifle/Fuzil', origem: 'Aliada', foco: 'Rifles e Fuzis', alcance: 'Médio', estresse: '5', efeito: null, barragem: 'Feroz', tamanho: 'Grande', qualidades: 'Confiável', restricao: '2' },
  { id: 'fuzil-mas-1936', nome: 'Fuzil MAS Modèle 1936', categoria: 'Rifle/Fuzil', origem: 'Aliada', foco: 'Rifles e Fuzis', alcance: 'Médio', estresse: '5', efeito: null, barragem: 'Feroz', tamanho: 'Grande', qualidades: 'Confiável', restricao: '2' },
  { id: 'springfield-m1903', nome: 'Springfield M1903', categoria: 'Rifle/Fuzil', origem: 'Aliada', foco: 'Rifles e Fuzis', alcance: 'Longo', estresse: '5', efeito: null, barragem: 'Feroz', tamanho: 'Grande', qualidades: 'Confiável, Preciso', restricao: '3' },

  // ----------------------------------------------------------
  // SUBMETRALHADORAS E METRALHADORAS — ALIADAS
  // ----------------------------------------------------------
  { id: 'bar', nome: 'Fuzil Browning Automatic (BAR)', categoria: 'Submetralhadora/MG', origem: 'Aliada', foco: 'Rifles e Fuzis', alcance: 'Médio', estresse: '5', efeito: null, barragem: 'Área', tamanho: 'Grande', qualidades: 'Imprecisa', restricao: '3' },
  { id: 'metralhadora-bren', nome: 'Metralhadora Bren', categoria: 'Submetralhadora/MG', origem: 'Aliada', foco: 'Rifles e Fuzis', alcance: 'Médio', estresse: '5', efeito: null, barragem: 'Área', tamanho: 'Grande', qualidades: 'Imprecisa', restricao: '3' },
  { id: 'metralhadora-browning-m1919', nome: 'Metralhadora Browning M1919', categoria: 'Submetralhadora/MG', origem: 'Aliada', foco: 'Armas Pesadas', alcance: 'Médio', estresse: '7', efeito: null, barragem: 'Área', tamanho: 'Grande', qualidades: 'Agravamento, Imprecisa', restricao: '3' },
  { id: 'metralhadora-johnson-m1941', nome: 'Metralhadora Johnson M1941', categoria: 'Submetralhadora/MG', origem: 'Aliada', foco: 'Rifles e Fuzis', alcance: 'Médio', estresse: '5', efeito: null, barragem: 'Área', tamanho: 'Grande', qualidades: 'Imprecisa', restricao: '3' },
  { id: 'metralhadora-mac-1924-m29', nome: 'Metralhadora MAC Modèle 1924-M29', categoria: 'Submetralhadora/MG', origem: 'Aliada', foco: 'Rifles e Fuzis', alcance: 'Médio', estresse: '5', efeito: null, barragem: 'Área', tamanho: 'Grande', qualidades: 'Imprecisa', restricao: '3' },
  { id: 'metralhadora-vickers', nome: 'Metralhadora Vickers', categoria: 'Submetralhadora/MG', origem: 'Aliada', foco: 'Armas Pesadas', alcance: 'Médio', estresse: '7', efeito: null, barragem: 'Área', tamanho: 'Grande', qualidades: 'Agravamento, Imprecisa', restricao: '3' },
  { id: 'emp-35', nome: 'Pistolet Mitrailleur ERMA Modèle 1935 (EMP-35)', categoria: 'Submetralhadora/MG', origem: 'Aliada', foco: 'Rifles e Fuzis', alcance: 'Médio', estresse: '5', efeito: null, barragem: 'Atordoante', tamanho: 'Grande', qualidades: 'Imprecisa, Inconstante', restricao: '3' },
  { id: 'sten-mk2s', nome: 'Sten Mk IIS SMG Suprimida', categoria: 'Submetralhadora/MG', origem: 'Aliada', foco: 'Combate Próximo', alcance: 'Curto', estresse: '3', efeito: null, barragem: 'Atordoante', tamanho: 'Grande', qualidades: 'Imprecisa, Sutil', restricao: '3' },
  { id: 'sten-mk5', nome: 'Submetralhadora Sten Mk. V', categoria: 'Submetralhadora/MG', origem: 'Aliada', foco: 'Combate Próximo', alcance: 'Curto', estresse: '4', efeito: null, barragem: 'Atordoante', tamanho: 'Grande', qualidades: 'Imprecisa', restricao: '2' },
  { id: 'thompson', nome: 'Submetralhadora Thompson', categoria: 'Submetralhadora/MG', origem: 'Aliada', foco: 'Combate Próximo', alcance: 'Curto', estresse: '4', efeito: null, barragem: 'Atordoante', tamanho: 'Grande', qualidades: 'Imprecisa', restricao: '2' },
  { id: 'united-defense-m42', nome: 'Submetralhadora United Defense M42', categoria: 'Submetralhadora/MG', origem: 'Aliada', foco: 'Combate Próximo', alcance: 'Curto', estresse: '4', efeito: null, barragem: 'Atordoante', tamanho: 'Grande', qualidades: 'Imprecisa', restricao: '2' },

  // ----------------------------------------------------------
  // ARMAS PESADAS E ARTILHARIA — ALIADAS
  // ----------------------------------------------------------
  { id: 'piat', nome: 'Arma Anti-Tanque PIAT', categoria: 'Arma Pesada', origem: 'Aliada', foco: 'Armas Pesadas', alcance: 'Médio', estresse: '6', efeito: null, barragem: 'Perfurante 1, Feroz', tamanho: 'Grande', qualidades: 'Desajeitada, Agravamento, Mata-Gigante, Pesada, Imprecisa, Munição', restricao: '3' },
  { id: 'bazuca-m1a1', nome: 'Bazuca M1A1', categoria: 'Arma Pesada', origem: 'Aliada', foco: 'Armas Pesadas', alcance: 'Médio', estresse: '6', efeito: null, barragem: 'Feroz', tamanho: 'Grande', qualidades: 'Desajeitada, Agravamento, Mata-Gigante, Pesada, Imprecisa, Munição', restricao: '3' },
  { id: 'bazuca-m9', nome: 'Bazuca M9', categoria: 'Arma Pesada', origem: 'Aliada', foco: 'Armas Pesadas', alcance: 'Médio', estresse: '6', efeito: null, barragem: 'Perfurante 1, Feroz', tamanho: 'Grande', qualidades: 'Desajeitada, Agravamento, Mata-Gigante, Pesada, Imprecisa, Munição', restricao: '3' },
  { id: 'lanca-chamas-lifebuoy', nome: 'Lança-Chamas Portátil Lifebuoy No. 2 Mk.I', categoria: 'Arma Pesada', origem: 'Aliada', foco: 'Armas Pesadas', alcance: 'Curto', estresse: '5', efeito: null, barragem: 'Persistente 4, Área', tamanho: 'Grande', qualidades: 'Agravamento, Debilitante', restricao: '3' },
  { id: 'morteiro-2pol', nome: 'Morteiro de 2 Polegadas', categoria: 'Arma Pesada', origem: 'Aliada', foco: 'Armas Pesadas', alcance: 'Extremo', estresse: '6', efeito: null, barragem: 'Área, Atordoante', tamanho: 'Pequeno', qualidades: 'Agravamento, Pesada, Indireta', restricao: '3' },
  { id: 'morteiro-m2', nome: 'Morteiro M2', categoria: 'Arma Pesada', origem: 'Aliada', foco: 'Armas Pesadas', alcance: 'Extremo', estresse: '7', efeito: null, barragem: 'Área, Atordoante', tamanho: 'Grande', qualidades: 'Agravamento, Pesada, Indireta', restricao: '3' },
  { id: 'rifle-antitanque-boys', nome: 'Rifle Antitanque Boys', categoria: 'Arma Pesada', origem: 'Aliada', foco: 'Armas Pesadas', alcance: 'Longo', estresse: '7', efeito: null, barragem: 'Feroz', tamanho: 'Grande', qualidades: 'Preciso, Desajeitada, Agravamento, Pesada', restricao: '3' },

  // ----------------------------------------------------------
  // GRANADAS E BOMBAS — ALIADAS
  // ----------------------------------------------------------
  { id: 'bomba-mills', nome: 'Bomba Mills', categoria: 'Granada', origem: 'Aliada', foco: 'Arremessável', alcance: 'Curto', estresse: '6', efeito: null, barragem: 'Área, Atordoante', tamanho: '3 por Pequeno', qualidades: 'Imprecisa, Munição', restricao: '2' },
  { id: 'bomba-mills-rifle', nome: 'Bomba Mills — Variante Rifle', categoria: 'Granada', origem: 'Aliada', foco: 'Rifles e Fuzis', alcance: 'Médio', estresse: '6', efeito: null, barragem: 'Área, Atordoante', tamanho: '3 por Pequeno', qualidades: 'Imprecisa, Munição', restricao: '2' },
  { id: 'carga-padrao', nome: 'Carga Padrão Demolição 0,75 kg/1,5 kg', categoria: 'Granada', origem: 'Aliada', foco: 'Demolição', alcance: 'Curto', estresse: '10', efeito: null, barragem: 'Área, Atordoante, Violenta', tamanho: '3 por Pequeno', qualidades: null, restricao: '3' },
  { id: 'granada-abacaxi', nome: 'Granada Abacaxi (M17)', categoria: 'Granada', origem: 'Aliada', foco: 'Arremessável', alcance: 'Curto', estresse: '6', efeito: null, barragem: 'Área, Atordoante', tamanho: '3 por Pequeno', qualidades: 'Imprecisa, Munição', restricao: '2' },
  { id: 'granada-abacaxi-rifle', nome: 'Granada Abacaxi — Variante de Rifle', categoria: 'Granada', origem: 'Aliada', foco: 'Rifles e Fuzis', alcance: 'Médio', estresse: '6', efeito: null, barragem: 'Área, Atordoante', tamanho: '3 por Pequeno', qualidades: 'Imprecisa, Munição', restricao: '2' },
  { id: 'granada-gp', nome: 'Granada GP', categoria: 'Granada', origem: 'Aliada', foco: 'Arremessável', alcance: 'Curto', estresse: '6', efeito: null, barragem: 'Área, Feroz', tamanho: '3 por Pequeno', qualidades: 'Desajeitada, Imprecisa, Munição', restricao: '2' },
  { id: 'tyrebuster', nome: 'Tyrebuster (Rompe-Pneu)', categoria: 'Granada', origem: 'Aliada', foco: 'Arremessável', alcance: 'Curto', estresse: '6', efeito: null, barragem: 'Área, Perfurante 1', tamanho: '3 por Pequeno', qualidades: 'Desajeitada, Imprecisa, Munição', restricao: '2' },

  // ----------------------------------------------------------
  // CORPORAIS — ALEMÃS
  // ----------------------------------------------------------
  { id: 'adaga-da-ss', nome: 'Adaga da SS', categoria: 'Corporal', origem: 'Alemã', foco: 'Armas Corporais', alcance: null, estresse: '3', efeito: 'Perfurante 1', barragem: null, tamanho: 'Pequeno', qualidades: 'Sutil', restricao: '—' },
  { id: 'faca-luftwaffe', nome: 'Faca de Utilidade Aeronáutica da Luftwaffe', categoria: 'Corporal', origem: 'Alemã', foco: 'Armas Corporais', alcance: null, estresse: '5', efeito: 'Perfurante 1', barragem: null, tamanho: 'Pequeno', qualidades: 'Ocultável, Sutil', restricao: '—' },
  { id: 'kampfmesser-42', nome: 'Faca Kampfmesser 42', categoria: 'Corporal', origem: 'Alemã', foco: 'Armas Corporais', alcance: null, estresse: '4', efeito: 'Perfurante 1', barragem: null, tamanho: 'Pequeno', qualidades: 'Ocultável, Sutil', restricao: '—' },

  // ----------------------------------------------------------
  // PISTOLAS — ALEMÃS
  // ----------------------------------------------------------
  { id: 'pistola-luger', nome: 'Pistola Luger', categoria: 'Pistola', origem: 'Alemã', foco: 'Pistolas', alcance: 'Curto', estresse: '4', efeito: null, barragem: 'Feroz', tamanho: 'Pequeno', qualidades: 'Combate Próximo', restricao: '—' },
  { id: 'walther-p-series', nome: 'Walther P Series', categoria: 'Pistola', origem: 'Alemã', foco: 'Pistolas', alcance: 'Curto', estresse: '3', efeito: null, barragem: 'Feroz', tamanho: 'Pequeno', qualidades: 'Combate Próximo, Confiável, Ocultável', restricao: '—' },

  // ----------------------------------------------------------
  // RIFLES E FUZIS — ALEMÃES
  // ----------------------------------------------------------
  { id: 'fg-42', nome: 'Fallschirmjägergewehr (FG 42)', categoria: 'Rifle/Fuzil', origem: 'Alemã', foco: 'Rifles e Fuzis', alcance: 'Médio', estresse: '5', efeito: null, barragem: 'Atordoante', tamanho: 'Grande', qualidades: 'Imprecisa', restricao: '—' },
  { id: 'g-k43', nome: 'Gewehr/Karabiner 43 (G/K43)', categoria: 'Rifle/Fuzil', origem: 'Alemã', foco: 'Rifles e Fuzis', alcance: 'Médio', estresse: '5', efeito: null, barragem: 'Feroz', tamanho: 'Grande', qualidades: 'Confiável', restricao: '—' },
  { id: 'kar98k', nome: 'Karabiner 98k (Kar. 98k)', categoria: 'Rifle/Fuzil', origem: 'Alemã', foco: 'Rifles e Fuzis', alcance: 'Médio', estresse: '5', efeito: null, barragem: 'Feroz', tamanho: 'Grande', qualidades: 'Confiável', restricao: '—' },
  { id: 'kar98k-precisao', nome: 'Karabiner 98k — Variante de Precisão', categoria: 'Rifle/Fuzil', origem: 'Alemã', foco: 'Rifles e Fuzis', alcance: 'Longo', estresse: '5', efeito: null, barragem: 'Feroz', tamanho: 'Grande', qualidades: 'Preciso, Confiável', restricao: '—' },
  { id: 'stg44', nome: 'Sturmgewehr 44 (StGw44)', categoria: 'Rifle/Fuzil', origem: 'Alemã', foco: 'Rifles e Fuzis', alcance: 'Médio', estresse: '5', efeito: null, barragem: 'Atordoante', tamanho: 'Grande', qualidades: 'Inconstante', restricao: '—' },

  // ----------------------------------------------------------
  // SUBMETRALHADORAS E METRALHADORAS — ALEMÃS
  // ----------------------------------------------------------
  { id: 'mg42', nome: 'Maschinengewehr 42 (MG 42)', categoria: 'Submetralhadora/MG', origem: 'Alemã', foco: 'Rifles e Fuzis', alcance: 'Médio', estresse: '6', efeito: null, barragem: 'Área', tamanho: 'Grande', qualidades: 'Imprecisa', restricao: '—' },
  { id: 'mp40', nome: 'Maschinenpistole 40 (MP 40)', categoria: 'Submetralhadora/MG', origem: 'Alemã', foco: 'Combate Próximo', alcance: 'Curto', estresse: '4', efeito: null, barragem: 'Atordoante', tamanho: 'Grande', qualidades: 'Confiável', restricao: '—' },
  { id: 'mg131', nome: 'Maschinengewehr 131 (MG 131)', categoria: 'Submetralhadora/MG', origem: 'Alemã', foco: 'Armas Pesadas', alcance: 'Médio', estresse: '7', efeito: null, barragem: 'Área', tamanho: 'Grande', qualidades: 'Confiável', restricao: '—' },

  // ----------------------------------------------------------
  // ARMAS PESADAS E GRANADAS — ALEMÃS
  // ----------------------------------------------------------
  { id: 'flammenwerfer-41', nome: 'Flammenwerfer 41 (FmW 41)', categoria: 'Arma Pesada', origem: 'Alemã', foco: 'Armas Pesadas', alcance: 'Médio', estresse: '5', efeito: null, barragem: 'Persistente 4, Área', tamanho: 'Grande', qualidades: 'Agravamento, Debilitante', restricao: '—' },
  { id: 'granatwerfer-36', nome: 'Granatwerfer 36 (GrW 36)', categoria: 'Arma Pesada', origem: 'Alemã', foco: 'Armas Pesadas', alcance: 'Extremo', estresse: '7', efeito: null, barragem: 'Área, Atordoante', tamanho: 'Grande', qualidades: 'Agravamento, Indireta, Pesada', restricao: '—' },
  { id: 'panzerfaust-60', nome: 'Panzerfaust 60', categoria: 'Arma Pesada', origem: 'Alemã', foco: 'Armas Pesadas', alcance: 'Longo', estresse: '5', efeito: null, barragem: 'Perfurante 1, Feroz', tamanho: 'Grande', qualidades: 'Agravamento, Mata-Gigante, Desajeitada, Munição, Imprecisa, Pesada', restricao: '—' },
  { id: 'stielhandgranate-24', nome: 'Stielhandgranate 24', categoria: 'Granada', origem: 'Alemã', foco: 'Arremessável', alcance: 'Curto', estresse: '5', efeito: null, barragem: 'Área, Atordoante', tamanho: '3 por Pequeno', qualidades: 'Munição', restricao: '—' },
]

// ============================================================
// DESCRIÇÕES DE EFEITOS DE ARMAS
// Ativados quando ⚔ aparece nos dados de dano.
// ============================================================
export const EFEITOS_DESC = {
  'Feroz':       '+1 de dano adicional por cada ⚔ obtido no ataque.',
  'Perfurante':  'Ignora X pontos de Resistência por cada ⚔ obtido. (X = valor do efeito)',
  'Atordoante':  'Se o número de ⚔ for igual ou maior que a Resiliência do alvo, o alvo perde sua próxima ação.',
  'Persistente': 'Causa X de dano por turno durante N turnos adicionais, onde N = número de ⚔ obtidos. (X = valor do efeito)',
  'Área':        'Pode atingir 1 alvo adicional por ⚔ obtido, desde que esteja no mesmo alcance.',
  'Violento':    'Se pelo menos 1 ⚔ for obtido e o ataque causar 1 ou mais Ferimentos, causa 1 Ferimento extra.',
  'Contenção':   'O alvo fica Agarrado (imobilizado). Pode escapar com um teste de Atletismo ou Combater.',
}

// ============================================================
// DESCRIÇÕES DE QUALIDADES DE ARMAS
// Propriedades passivas da arma; não dependem de ⚔.
// ============================================================
export const QUALIDADES_DESC = {
  'Ocultável':      'Pode ser ocultada em uma inspeção casual.',
  'Sutil':          'Não faz barulho ao ser usada; disparos são silenciosos.',
  'Aparagem':       'Pode ser usada para aparar ataques corporais (reação).',
  'Confiável':      'Nunca trava nem falha por mau funcionamento.',
  'Imprecisa':      'Sofre penalidade ao ser usada além do alcance Curto.',
  'Preciso':        'Concede +1d20 em ataques dentro do alcance ideal.',
  'Combate Próximo':'Não sofre penalidade ao ser usada em situações de combate corpo a corpo.',
  'Munição':        'Tem quantidade limitada de usos; precisa ser reabastecida.',
  'Inconstante':    'Pode travar ou falhar ao rolar resultado 20 em qualquer dado de ataque.',
  'Drenagem':       'O uso causa dano ao próprio usuário.',
  'Desajeitada':    'Requer espaço e esforço extra para manejar; penalidade em espaços confinados.',
  'Pesada':         'Requer suporte ou dois portadores para ser usada adequadamente.',
  'Indireta':       'Pode atingir alvos em cobertura total ou atrás de obstáculos.',
  'Agravamento':    'Os Ferimentos causados são mais difíceis de tratar.',
  'Debilitante':    'O alvo sofre uma condição debilitante além do dano normal.',
  'Mata-Gigante':   'Causa dano adicional contra alvos com alta Resistência ou blindagem.',
}

// ============================================================
// CATÁLOGO DE PERTENCES
// Fonte: Livro do Jogador pp. 101-117
// Usado para seleções no Wizard de criação de personagem.
//
// categoria:
//   arma_corporal  — armas corpo a corpo comuns
//   arma_exotica   — armas corpo a corpo exóticas/arcaicas
//   pistola        — pistolas e revólveres
//   rifle          — rifles, fuzis, espingardas e carabinas
//   smg            — submetralhadoras e metralhadoras leves
//   metralhadora   — metralhadoras médias/pesadas (foco Armas Pesadas)
//   arma_pesada    — armas pesadas (bazucas, morteiros, lança-chamas)
//   granada        — granadas e explosivos
//   armadura       — armaduras e escudos
//   kit_pericia    — kits de perícia e instalações (p. 110)
//   equipamento    — outros equipamentos e acessórios
// ============================================================

export const ITEMS_CATALOG = [
  // ── ARMAS CORPORAIS COMUNS ──────────────────────────────────
  { nome: 'Baioneta',            categoria: 'arma_corporal', restricao: 0, qualidades: ['Perfurante'] },
  { nome: 'Cassetete',           categoria: 'arma_corporal', restricao: 1, qualidades: ['Sutil'] },
  { nome: 'Faca de combate',     categoria: 'arma_corporal', restricao: 1, qualidades: ['Perfurante', 'Ocultável', 'Sutil'] },
  { nome: 'Faca de dedal',       categoria: 'arma_corporal', restricao: 1, qualidades: ['Perfurante', 'Ocultável', 'Sutil'] },
  { nome: 'Faca de trincheira',  categoria: 'arma_corporal', restricao: 1, qualidades: ['Feroz', 'Ocultável'] },
  { nome: 'Garrote',             categoria: 'arma_corporal', restricao: 2, qualidades: ['Contenção', 'Ocultável', 'Sutil'] },
  { nome: 'Machado',             categoria: 'arma_corporal', restricao: 1, qualidades: ['Feroz'] },
  { nome: 'Machado de bombeiro', categoria: 'arma_corporal', restricao: 1, qualidades: ['Feroz'] },
  { nome: 'Pá de trincheira',    categoria: 'arma_corporal', restricao: 1, qualidades: [] },
  { nome: 'Sabre',               categoria: 'arma_corporal', restricao: 2, qualidades: ['Perfurante', 'Aparagem'] },
  { nome: 'Soqueira',            categoria: 'arma_corporal', restricao: 1, qualidades: ['Atordoante', 'Ocultável'] },
  { nome: 'Taco',                categoria: 'arma_corporal', restricao: 1, qualidades: ['Atordoante'] },

  // ── ARMAS CORPORAIS EXÓTICAS ────────────────────────────────
  { nome: 'Espada',       categoria: 'arma_exotica', restricao: 2, qualidades: ['Aparagem'] },
  { nome: 'Espada larga', categoria: 'arma_exotica', restricao: 2, qualidades: [] },
  { nome: 'Lança',        categoria: 'arma_exotica', restricao: 2, qualidades: ['Perfurante'] },

  // ── PISTOLAS ────────────────────────────────────────────────
  { nome: 'Enpen Mk.1',                         categoria: 'pistola', restricao: 0, qualidades: ['Combate Próximo', 'Sutil'] },
  { nome: 'Pistola Browning Hi-Power',           categoria: 'pistola', restricao: 1, qualidades: ['Combate Próximo'] },
  { nome: 'Pistola High Standard HDM',           categoria: 'pistola', restricao: 1, qualidades: ['Combate Próximo', 'Sutil'] },
  { nome: 'Pistola M1911A1',                     categoria: 'pistola', restricao: 0, qualidades: ['Combate Próximo', 'Ocultável'] },
  { nome: 'Pistola MAB Modèle D',                categoria: 'pistola', restricao: 1, qualidades: ['Combate Próximo'] },
  { nome: 'Pistola oculta',                      categoria: 'pistola', restricao: 1, qualidades: ['Combate Próximo', 'Ocultável'] },
  { nome: 'Pistola Welrod Mk.IIA',               categoria: 'pistola', restricao: 2, qualidades: ['Combate Próximo', 'Sutil'] },
  { nome: 'Revólver de serviço Enfield No.2',    categoria: 'pistola', restricao: 1, qualidades: ['Combate Próximo', 'Confiável'] },
  { nome: 'Revólver MAS Modèle 1873',            categoria: 'pistola', restricao: 1, qualidades: ['Combate Próximo'] },

  // ── RIFLES, FUZIS E ESPINGARDAS ─────────────────────────────
  { nome: 'Carabina Berthier Modèle 1892 M16',  categoria: 'rifle', restricao: 2, qualidades: ['Confiável'] },
  { nome: 'Carabina De Lisle Commando Mk.I',    categoria: 'rifle', restricao: 3, qualidades: ['Sutil'] },
  { nome: 'Carabina M1',                        categoria: 'rifle', restricao: 2, qualidades: ['Confiável'] },
  { nome: 'Espingarda Winchester M12',           categoria: 'rifle', restricao: 2, qualidades: ['Confiável', 'Imprecisa'] },
  { nome: 'Fuzil Lee-Enfield',                  categoria: 'rifle', restricao: 2, qualidades: ['Confiável'] },
  { nome: 'Fuzil M1 Garand',                    categoria: 'rifle', restricao: 2, qualidades: ['Confiável'] },
  { nome: 'Fuzil MAS Modèle 1936',              categoria: 'rifle', restricao: 2, qualidades: ['Confiável'] },
  { nome: 'Springfield M1903',                  categoria: 'rifle', restricao: 3, qualidades: ['Confiável', 'Preciso'] },

  // ── SUBMETRALHADORAS E METRALHADORAS LEVES ──────────────────
  { nome: 'Fuzil Browning Automatic (BAR)',          categoria: 'smg', restricao: 3, qualidades: ['Imprecisa'] },
  { nome: 'Metralhadora Johnson M1941',              categoria: 'smg', restricao: 3, qualidades: ['Imprecisa'] },
  { nome: 'Metralhadora MAC Modèle 1924-M29',        categoria: 'smg', restricao: 3, qualidades: ['Imprecisa'] },
  { nome: 'Pistolet Mitrailleur ERMA EMP-35',        categoria: 'smg', restricao: 3, qualidades: ['Imprecisa', 'Inconstante'] },
  { nome: 'Sten Mk IIS (suprimida)',                 categoria: 'smg', restricao: 3, qualidades: ['Imprecisa', 'Sutil'] },
  { nome: 'Submetralhadora Sten Mk. V',              categoria: 'smg', restricao: 2, qualidades: ['Imprecisa'] },
  { nome: 'Submetralhadora Thompson',                categoria: 'smg', restricao: 2, qualidades: ['Imprecisa'] },
  { nome: 'Submetralhadora United Defense M42',      categoria: 'smg', restricao: 2, qualidades: ['Imprecisa'] },

  // ── METRALHADORAS MÉDIAS/PESADAS ────────────────────────────
  { nome: 'Metralhadora Bren',            categoria: 'metralhadora', restricao: 3, qualidades: ['Imprecisa'] },
  { nome: 'Metralhadora Browning M1919',  categoria: 'metralhadora', restricao: 3, qualidades: ['Agravamento', 'Imprecisa'] },
  { nome: 'Metralhadora Vickers',         categoria: 'metralhadora', restricao: 3, qualidades: ['Agravamento', 'Imprecisa'] },

  // ── ARMAS PESADAS E ARTILHARIA ──────────────────────────────
  { nome: 'Arma Anti-Tanque PIAT',                           categoria: 'arma_pesada', restricao: 3, qualidades: ['Desajeitada', 'Agravamento', 'Mata-Gigante', 'Pesada', 'Imprecisa', 'Munição'] },
  { nome: 'Bazuca M1A1',                                     categoria: 'arma_pesada', restricao: 3, qualidades: ['Desajeitada', 'Agravamento', 'Mata-Gigante', 'Pesada', 'Imprecisa', 'Munição'] },
  { nome: 'Bazuca M9',                                       categoria: 'arma_pesada', restricao: 3, qualidades: ['Desajeitada', 'Agravamento', 'Mata-Gigante', 'Pesada', 'Imprecisa', 'Munição'] },
  { nome: 'Lança-Chamas Portátil No. 2 Mk.I',               categoria: 'arma_pesada', restricao: 3, qualidades: ['Agravamento', 'Debilitante'] },
  { nome: 'Morteiro de 2 polegadas',                         categoria: 'arma_pesada', restricao: 3, qualidades: ['Agravamento', 'Pesada', 'Indireta'] },
  { nome: 'Morteiro M2',                                     categoria: 'arma_pesada', restricao: 3, qualidades: ['Agravamento', 'Pesada', 'Indireta'] },
  { nome: 'Rifle antitanque Boys',                           categoria: 'arma_pesada', restricao: 3, qualidades: ['Desajeitada', 'Agravamento', 'Pesada'] },

  // ── ARMAS DE LONGO ALCANCE EXÓTICAS ────────────────────────
  { nome: 'Arco',       categoria: 'rifle', restricao: 2, qualidades: ['Confiável', 'Sutil'] },
  { nome: 'Arco Longo', categoria: 'rifle', restricao: 2, qualidades: ['Confiável', 'Sutil'] },
  { nome: 'Besta',      categoria: 'rifle', restricao: 2, qualidades: ['Confiável', 'Sutil'] },

  // ── GRANADAS E BOMBAS ───────────────────────────────────────
  { nome: 'Bomba Mills',                      categoria: 'granada', restricao: 2, qualidades: ['Imprecisa', 'Munição'] },
  { nome: 'Bomba Mills (variante rifle)',      categoria: 'granada', restricao: 2, qualidades: ['Imprecisa', 'Munição'] },
  { nome: 'Carga Padrão 0,75 kg/1,5 kg',     categoria: 'granada', restricao: 3, qualidades: [] },
  { nome: 'Granada Abacaxi',                  categoria: 'granada', restricao: 2, qualidades: ['Imprecisa', 'Munição'] },
  { nome: 'Granada Abacaxi (variante rifle)', categoria: 'granada', restricao: 2, qualidades: ['Imprecisa', 'Munição'] },
  { nome: 'Granada GP',                       categoria: 'granada', restricao: 2, qualidades: ['Desajeitada', 'Imprecisa', 'Munição'] },
  { nome: 'Tyrebuster (Rompe-Pneu)',          categoria: 'granada', restricao: 2, qualidades: ['Desajeitada', 'Imprecisa', 'Munição'] },

  // ── ARMADURAS ───────────────────────────────────────────────
  { nome: 'Armadura de Couro',       categoria: 'armadura', restricao: 1, qualidades: [] },
  { nome: 'Colete à Prova de Balas', categoria: 'armadura', restricao: 2, qualidades: ['Desconfortável'] },
  { nome: 'Escudo',                  categoria: 'armadura', restricao: 2, qualidades: ['Escudo'] },

  // ── KITS DE PERÍCIA (tabela p. 110) ────────────────────────
  { nome: 'Cinto de Munição',          categoria: 'kit_pericia', restricao: 1, qualidades: [] },
  { nome: 'Documentos de Identidade',  categoria: 'kit_pericia', restricao: 2, qualidades: [] },
  { nome: 'Ferramentas Analíticas',    categoria: 'kit_pericia', restricao: 1, qualidades: [] },
  { nome: 'Ferramentas Ritualísticas', categoria: 'kit_pericia', restricao: 2, qualidades: [] },
  { nome: 'Ferramentas de Eletricista',categoria: 'kit_pericia', restricao: 1, qualidades: [] },
  { nome: 'Ferramentas de Ladrão',     categoria: 'kit_pericia', restricao: 1, qualidades: [] },
  { nome: 'Ferramentas de Mecânico',   categoria: 'kit_pericia', restricao: 1, qualidades: [] },
  { nome: 'Kit de Demolições',         categoria: 'kit_pericia', restricao: 2, qualidades: [] },
  { nome: 'Kit de Disfarces',          categoria: 'kit_pericia', restricao: 1, qualidades: [] },
  { nome: 'Kit de Primeiros Socorros', categoria: 'kit_pericia', restricao: 1, qualidades: [] },

  // ── OUTROS EQUIPAMENTOS ─────────────────────────────────────
  { nome: 'Câmera',                             categoria: 'equipamento', restricao: 2, qualidades: [] },
  { nome: 'Mira Telescópica',                   categoria: 'equipamento', restricao: 2, qualidades: [] },
  { nome: 'Pacotes de Ração',                   categoria: 'equipamento', restricao: 0, qualidades: [] },
  { nome: 'Plaqueta de Identificação',          categoria: 'equipamento', restricao: 0, qualidades: [] },
  { nome: 'Câmera Subminiatura Eastman M.B.',   categoria: 'equipamento', restricao: 2, qualidades: [] },
  { nome: 'Câmera Subminiatura Minox Riga',     categoria: 'equipamento', restricao: 2, qualidades: [] },
  { nome: 'Equipamento de Comunicação Clandestina', categoria: 'equipamento', restricao: 2, qualidades: [] },
  { nome: 'Estrepes',                           categoria: 'equipamento', restricao: 2, qualidades: [] },
  { nome: 'Faca de Fuga M19',                   categoria: 'equipamento', restricao: 2, qualidades: [] },
  { nome: 'Faca-Gazua',                         categoria: 'equipamento', restricao: 2, qualidades: [] },
  { nome: 'Gilhooey',                           categoria: 'equipamento', restricao: 2, qualidades: [] },
  { nome: 'Kit de Copiar Chaves',               categoria: 'equipamento', restricao: 2, qualidades: [] },
  { nome: 'Roupas de Infiltração',              categoria: 'equipamento', restricao: 1, qualidades: [] },
  { nome: 'Supressor (Silenciador)',             categoria: 'equipamento', restricao: 2, qualidades: [] },
]
