// Gerado a partir das cartilhas preenchíveis (Fichas Classes/*.pdf) com a errata aplicada.
// Marcação: **negrito**, _itálico_, {{campo}} = campo de texto dentro da frase.
// pagina2 = três colunas, na mesma ordem da ficha impressa.
export const CARTILHAS = [
  {
    "id": "arcano",
    "nome": "Arcano",
    "imagensPagina1": [],
    "titulo": "O Arcano",
    "lema": [
      "_Eu combato o fogo com **fogo mágico**._"
    ],
    "sorteEspecial": null,
    "criacao": "Para criar seu caçador Arcano, primeiro escolha e escreva um nome na primeira linha da folha. Então siga as instruções para decidir sua aparência, classificações, magia combativa, movimentos e equipamentos. Finalmente, se apresente e escolha o histórico.",
    "aparencia": [
      "Homem, mulher, andrógino",
      "Olhos sombrios, olhos ferozes, olhos cansados, olhos faiscantes",
      "Roupas amarrotadas, roupas estilosas, roupas góticas, roupas antiquadas"
    ],
    "classificacoes": [
      {
        "bra": 0,
        "esp": 1,
        "est": 2,
        "fir": 1,
        "sut": -1
      },
      {
        "bra": 1,
        "esp": 1,
        "est": 2,
        "fir": -1,
        "sut": 0
      },
      {
        "bra": -1,
        "esp": 2,
        "est": 2,
        "fir": 0,
        "sut": -1
      },
      {
        "bra": -1,
        "esp": 1,
        "est": 2,
        "fir": 0,
        "sut": 1
      },
      {
        "bra": 0,
        "esp": 1,
        "est": 2,
        "fir": 0,
        "sut": 0
      }
    ],
    "apresentacoes": "Quando você chegar aqui, espere que todos também cheguem para que vocês se apresentem juntos. Na sua vez descreva seu caçador e diga ao grupo o que eles sabem sobre você.",
    "historicoIntro": "Na sua vez escolha um destes para cada um dos caçadores:",
    "historico": [
      "Ele age como sua consciência quando você sente o poder subir à cabeça. Pergunte a ele sobre a última vez que isto aconteceu.",
      "Parentes de sangue, embora vocês não tenham tido contato por vários anos. Pergunte a ele como vocês se reconectaram.",
      "Mentor de uma outra vida. Pergunte a ele o que ele te ensinou.",
      "Quando você o resgatou exibindo sua magia, você o introduziu ao sobrenatural. Diga a ele que criatura estava atrás dele.",
      "Uma velha rivalidade que se tornou uma forte amizade. Diga a ele o que vocês disputavam.",
      "Você pensou que ele estava morto, e agora ele está de volta. O que o “matou”?",
      "Ele é um interesse amoroso que vai e volta. Pergunte a ele o que mantém vocês separados. Diga a ele o que mantém vocês juntos.",
      "Um companheiro de luta. Vocês enfrentaram as maiores ameaças juntos."
    ],
    "subindo": [
      "Sempre que sua rolagem for 6 ou menos, ou quando um movimento determinar, marque uma caixa de experiência.",
      "Quando você tiver preenchido todas as cinco caixas de experiência, você sobe de nível. Apague todas as caixas e escolha uma melhoria da seguinte lista:"
    ],
    "melhorias": [
      "Receba +1 em Estranheza (máximo +3).",
      "Receba +1 em Firmeza (máximo +2).",
      "Receba +1 em Esperteza (máximo +2).",
      "Receba +1 em Braveza (máximo +2).",
      "Pegue outro movimento de Arcano.",
      "Pegue outro movimento de Arcano.",
      "Pegue um movimento de outra cartilha.",
      "Pegue um movimento de outra cartilha.",
      "Pegue outra escolha de Magia Combativa."
    ],
    "melhoriasNota": [
      "Depois de você subir de nível _cinco_ vezes, você já pode ter melhorias avançadas além destas."
    ],
    "avancadas": [
      "Receba +1 em qualquer classificação (máximo +3).",
      "Mude este caçador para um novo tipo.",
      "Crie um segundo caçador para jogar junto com este.",
      "Marque dois dos movimentos básicos como avançados.",
      "Marque outros dois dos movimentos básicos como avançados.",
      "Aposente este caçador para uma vida segura.",
      "Apague uma caixa marcada de Sorte.",
      "Pegue outra escolha de Magia Combativa.",
      "Você pode eliminar outra opção das suas _Ferramentas e técnicas_."
    ],
    "pagina2": [
      [
        {
          "k": "h",
          "t": "MAGIA COMBATIVA"
        },
        {
          "k": "p",
          "t": "Você tem alguns feitiços de ataque que pode usar como armas. Quando você usar estes feitiços para **partir pra porrada**, role +Estranheza em vez de +Braveza. Algumas vezes a situação pode fazer você **agir sob pressão** para que o feitiço seja lançado sem problemas."
        },
        {
          "k": "p",
          "t": "Escolha três opções da lista abaixo. Seus feitiços combativos podem combinar qualquer base com qualquer efeito."
        },
        {
          "k": "p",
          "t": "**Magia combativa** (escolha três, tendo pelo menos uma base):"
        },
        {
          "k": "p",
          "t": "_Bases:_"
        },
        {
          "k": "opt",
          "t": "Explosão [2-dano perto mágica chamativa barulhenta]",
          "id": "o1"
        },
        {
          "k": "opt",
          "t": "Bola [1-dano perto área mágica chamativa barulhenta]",
          "id": "o2"
        },
        {
          "k": "opt",
          "t": "Míssil [1-dano longe mágica chamativa barulhenta]",
          "id": "o3"
        },
        {
          "k": "opt",
          "t": "Muralha [1-dano perto barreira 1-armadura mágica chamativa barulhenta]",
          "id": "o4"
        },
        {
          "k": "p",
          "t": "_Efeitos:_"
        },
        {
          "k": "opt",
          "t": "Fogo: Adicione +2 de dano e [fogo] para uma base. Com 10+ em uma rolagem de magia combativa, o fogo não vai se espalhar.",
          "id": "o5"
        },
        {
          "k": "opt",
          "t": "Força ou Vento: Adicione +1 de dano e [empurrão] para uma base; ou +1 de armadura para uma muralha.",
          "id": "o6"
        },
        {
          "k": "opt",
          "t": "Raio ou Entropia: Adicione +1 de dano e [brutal] para uma base.",
          "id": "o7"
        },
        {
          "k": "opt",
          "t": "Frio ou Gelo: Adicione −1 de dano e +2 de armadura para uma muralha; ou +1 de dano e [restritiva] para outras bases.",
          "id": "o8"
        },
        {
          "k": "opt",
          "t": "Terra: Adicione [empurrão restritiva] para uma base.",
          "id": "o9"
        },
        {
          "k": "opt",
          "t": "Necromântica: Adicione [drena-vida] para uma base.",
          "id": "o10"
        },
        {
          "k": "img",
          "src": "/mds/cartilhas/arcano-1.webp",
          "w": 216,
          "h": 175
        }
      ],
      [
        {
          "k": "h",
          "t": "MOVIMENTOS"
        },
        {
          "k": "p",
          "t": "_Você recebe todos os movimentos básicos e quatro movimentos de caçador Arcano. Você recebe este:_"
        },
        {
          "k": "opt",
          "t": "**Ferramentas e técnicas:** Para poder usar sua magia combativa efetivamente, você depende de uma série de ferramentas e técnicas. Se você não utilizá-las, haverá algumas complicações. Elimine uma destas; você vai necessitar das outras.",
          "id": "o11",
          "fixed": true
        },
        {
          "k": "li",
          "t": "_Consumíveis:_ Você precisa ter certos suprimentos — pós, óleos, etc. — a mão para lançar seu feitiço. Eles são consumidos quando você lança o feitiço. Se você não os tiver a mão, seu corpo será o substituto: receba [1-dano ignora-armadura] quando lançar."
        },
        {
          "k": "li",
          "t": "_Focos:_ Você precisa de varinhas, cajados e outros implementos chamativos para focar seus esforços de forma mais poderosa. Se você não tiver o que precisa a mão, sua magia combativa causa −1 de dano."
        },
        {
          "k": "li",
          "t": "_Gestos:_ Você precisa ser capaz de gesticular com suas mãos de forma chamativa para poder usar sua magia combativa. Se você estiver preso de alguma forma você ainda consegue lançar o feitiço, mas as chances de dar errado são maiores; receba −1 constante em sua magia combativa."
        },
        {
          "k": "li",
          "t": "_Encantamentos:_ Você precisa falar em uma linguagem mística para controlar sua magia sem filtrá-la diretamente com sua mente. Se você usar um feitiço de magia combativa, com sucesso ou falha, enquanto não pode ou não quer falar, você deve imediatamente **agir sob pressão** para evitar embaralhar seus pensamentos — produzindo alucinações, perda de sentidos e desorientação em geral."
        },
        {
          "k": "p",
          "t": "_Depois escolhe três destes:_"
        },
        {
          "k": "opt",
          "t": "**Treinamento mágico avançado:** Se você tiver duas de suas três **Ferramentas e técnicas** à disposição, você pode ignorar a terceira.",
          "id": "o12"
        },
        {
          "k": "opt",
          "t": "**Reputação mágica:** Escolha três grandes grupos ou organizações da comunidade sobrenatural, o que pode incluir alguns dos tipos mais sociáveis de monstros. Eles ouviram falar você e respeitam seu poder. Com humanos afetados, receba +1 adiante para **manipular alguém**. Você pode usar **manipular alguém** em monstros afetados como se eles fossem humanos, mas sem bônus.",
          "id": "o13"
        },
        {
          "k": "opt",
          "t": "**Vestuário encantado:** Escolha uma peça de vestuário do dia a dia — ela está encantada sem nenhuma alteração na aparência. Receba 1 de dano a menos de qualquer coisa que tentar te acertar através da peça de roupa.",
          "id": "o14"
        }
      ],
      [
        {
          "k": "opt",
          "t": "**Poderia ser pior:** Quando você falhar em uma rolagem para **usar magia** você pode usar uma das seguintes opções em vez de perder o controle da magia:",
          "id": "o15"
        },
        {
          "k": "li",
          "t": "_Fiasco:_ As preparações e materiais para o feitiço foram arruinados. Você terá que começar do zero com o tempo de preparação dobrado."
        },
        {
          "k": "li",
          "t": "_Isso não vai ser bom:_ O efeito acontece, mas você aciona todos os defeitos listados menos um. Você escolhe qual defeito vai evitar."
        },
        {
          "k": "opt",
          "t": "**Adivinhação forense:** Quando você **investigar um mistério** com sucesso, você pode perguntar “Que magia foi feita aqui?” como uma pergunta extra e gratuita.",
          "id": "o16"
        },
        {
          "k": "opt",
          "t": "**Vá com tudo ou vá pra casa:** Quando você precisar **usar magia** como um requisito de **magia grandiosa**, receba +1 constante nestas rolagens de **usar magia**.",
          "id": "o17"
        },
        {
          "k": "opt",
          "t": "**Não é minha culpa:** Receba +1 para **agir sob pressão** quando estiver lidando com as consequências dos seus próprios feitiços.",
          "id": "o18"
        },
        {
          "k": "opt",
          "t": "**Praticante:** Escolha dois efeitos dos disponíveis de **usar magia**. Receba +1 para **usar magia** sempre que escolher um destes efeitos.",
          "id": "o19"
        },
        {
          "k": "opt",
          "t": "**Escudo mágico:** Quando você **proteger alguém**, você recebe [2-armadura] contra qualquer dano que seja transferido para você. Isto não acumula com outras armaduras, se houver.",
          "id": "o20"
        },
        {
          "k": "opt",
          "t": "**Terceiro olho:** Quando você **perceber uma enrascada**, você pode **abrir seu terceiro olho** por um momento para perceber informações extras. Receba +1 de reserva em qualquer resultado 7 ou maior, você também consegue enxergar coisas invisíveis. Com uma falha, você ainda pode reservar 1, mas você está exposto aos perigos sobrenaturais. A totalidade da realidade oculta é dura na mente!",
          "id": "o21"
        },
        {
          "k": "h",
          "t": "EQUIPAMENTOS"
        },
        {
          "k": "p",
          "t": "Você não precisa de muito — além de qualquer foco ou consumível para dar poder à sua magia. No entanto, ainda é bom ter uma reserva."
        },
        {
          "k": "p",
          "t": "**Armas de reserva** (escolha uma):"
        },
        {
          "k": "opt",
          "t": "Revólver velho [2-dano perto recarga barulhenta]",
          "id": "o22"
        },
        {
          "k": "opt",
          "t": "Faca ritualística [1-dano contato]",
          "id": "o23"
        },
        {
          "k": "opt",
          "t": "Espada herdada [2-dano contato brutal]",
          "id": "o24"
        }
      ]
    ]
  },
  {
    "id": "delinquente",
    "nome": "Delinquente",
    "imagensPagina1": [
      {
        "src": "/mds/cartilhas/delinquente-1.webp",
        "w": 158,
        "h": 238
      }
    ],
    "titulo": "O Delinquente",
    "lema": [
      "_Isso, eu estive por aí. Já fiz um pouquinho disso, um pouquinho daquilo. Quando eu entrei no submundo secreto de monstros e magia… bem… ele não era tão diferente do submundo que eu já conhecia. Foi fácil entrar nos esquemas, igual eu fazia antes._"
    ],
    "sorteEspecial": "**Especial do Delinquente:** Quando você marcar uma caixa de Sorte, alguém do seu passado (_Perseguição_ ou _Submundo_) vai reaparecer na sua vida. Em breve.",
    "criacao": "Para criar seu caçador Delinquente, primeiro escolha e escreva um nome na primeira linha da folha. Então siga as instruções para decidir sua aparência, classificações, antecedentes, perseguição, submundo, movimentos e equipamentos. Finalmente, se apresente e escolha o histórico.",
    "aparencia": [
      "Homem, mulher, oculto",
      "Olhos duros, olhos amigáveis, olhos vigilantes, olhos sorridentes, olhos calculistas",
      "Estilo das ruas, terno sob medida, terno barato, trajes esportivos, roupas discretas"
    ],
    "classificacoes": [
      {
        "bra": 0,
        "esp": 2,
        "est": -1,
        "fir": 1,
        "sut": 1
      },
      {
        "bra": 2,
        "esp": 1,
        "est": 0,
        "fir": 1,
        "sut": -1
      },
      {
        "bra": 0,
        "esp": 2,
        "est": -1,
        "fir": 2,
        "sut": -1
      },
      {
        "bra": 0,
        "esp": 1,
        "est": -1,
        "fir": 1,
        "sut": 2
      },
      {
        "bra": -1,
        "esp": 1,
        "est": 1,
        "fir": 0,
        "sut": 2
      }
    ],
    "apresentacoes": "Quando você chegar aqui, espere que todos também cheguem para que vocês se apresentem juntos. Na sua vez descreva seu caçador e diga ao grupo o que eles sabem sobre você.",
    "historicoIntro": "Na sua vez escolha um destes para cada um dos caçadores:",
    "historico": [
      "Ele sabe sobre o seu passado criminoso. Diga a ele que crimes ele viu você cometer.",
      "Ele estava lá quando você decidiu abandonar a vida normal e começar a caçar monstros. Decidam juntos como isso aconteceu.",
      "Ele é seu irmão mais novo ou seu filho (possivelmente adotado). Você se preocupa com ele.",
      "Ele é um primo ou parente mais distante.",
      "Ele salvou sua vida quando um monstro tinha a vantagem sobre você. Agora você deve uma para ele.",
      "Ele trabalhou com você em um trabalho semi-lícito ou ilícito. Decidam qual era o trabalho.",
      "Ele é sua referência moral. Quando você conversa com ele, os conselhos que ele dá mantém você na linha.",
      "Você está fortemente atraído por ele. Talvez algum dia você o mereça."
    ],
    "subindo": [
      "Sempre que sua rolagem for 6 ou menos, ou quando um movimento determinar, marque uma caixa de experiência.",
      "Quando você tiver preenchido todas as cinco caixas de experiência, você sobe de nível. Apague todas as caixas e escolha uma melhoria da seguinte lista:"
    ],
    "melhorias": [
      "Receba +1 em Esperteza (máximo +3).",
      "Receba +1 em Braveza (máximo +2).",
      "Receba +1 em Firmeza (máximo +2).",
      "Receba +1 em Sutileza (máximo +2).",
      "Pegue outro movimento de Delinquente.",
      "Pegue outro movimento de Delinquente.",
      "Ganhe um aliado: alguém do seu velho bando.",
      "Recupere um monte de dinheiro dos velhos tempos, o suficiente para viver sem se preocupar… por um ano ou dois.",
      "Pegue um movimento de outra cartilha.",
      "Pegue um movimento de outra cartilha."
    ],
    "melhoriasNota": [
      "Depois de você subir de nível _cinco_ vezes, você já pode ter melhorias avançadas além destas."
    ],
    "avancadas": [
      "Receba +1 em qualquer classificação (máximo +3).",
      "Mude este caçador para um novo tipo.",
      "Crie um segundo caçador para jogar junto com este.",
      "Marque dois dos movimentos básicos como avançados.",
      "Marque outros dois dos movimentos básicos como avançados.",
      "Aposente este caçador para uma vida segura.",
      "Apague uma caixa marcada de Sorte."
    ],
    "pagina2": [
      [
        {
          "k": "h",
          "t": "MOVIMENTOS"
        },
        {
          "k": "p",
          "t": "_Você recebe todos os movimentos básicos e escolhe dois movimentos de caçador Delinquente._"
        },
        {
          "k": "opt",
          "t": "**Artefato:** Você “encontrou” um artefato mágico com poderes vantajosos e o guardou para si. Escolha um: Amuleto protetor [1-armadura mágico recarga]; Talismã da sorte (pode ser usado como um ponto de Sorte grátis, apenas uma vez); Grimório (estudar o livro de concede +1 adiante para usar magia); Chave mestra (abre qualquer porta lacrada com magia); Pedra do diabinho (um demônio fraco é obrigado a servir o portador, o diabinho deve ser invocado com um movimento **usar magia**).",
          "id": "o1"
        },
        {
          "k": "opt",
          "t": "**Bando:** Você tem um bando habitual, uma equipe de três ou quatro pessoas que vão te ajudar com praticamente qualquer coisa. Eles valem como uma equipe.",
          "id": "o2"
        },
        {
          "k": "opt",
          "t": "**Pacto com o diabo:** Você vendeu sua alma para o Diabo. Escolha uma ou duas coisas que você recebeu do pacto: riqueza; fama; juventude; prazer; perícia (adicione +1 em duas classificações). O pagamento será cobrado quando você morrer, em seis meses se você escolheu duas coisas ou então em um ano.",
          "id": "o3"
        },
        {
          "k": "opt",
          "t": "**Amigos na corporação:** Você conhece alguns policiais que podem ser convencidos a fazer vista grossa ou algum favor para você nas circunstâncias certas. Você pode **agir sob pressão** para entrar em contato com eles quando você precisa desviar a atenção da lei e da polícia. Isso terá um custo, embora talvez não seja imediato.",
          "id": "o4"
        },
        {
          "k": "opt",
          "t": "**Gangster:** Você foi “efetivado” dentro de uma gangue. Dê nome à gangue e descreva como suas operações se ligam com seu passado. Você pode chamar membros da gangue para te ajudar, mas eles vão querer um pagamento. Seus chefes pedirão coisas para você de tempos em tempos e você será pago por isso. Problemas menores serão ignorados, mas é melhor você não sacanear nenhum outro efetivo da gangue.",
          "id": "o5"
        },
        {
          "k": "opt",
          "t": "**Volante:** Você recebe +1 constante enquanto dirige e você também consegue fazer ligação direta em qualquer coisa (quanto mais velho for, menos ferramentas você precisa para isso). Você também possui dois veículos convenientes à disposição (talvez um carro esporte e uma van).",
          "id": "o6"
        }
      ],
      [
        {
          "k": "opt",
          "t": "**Velha vizinhança:** Seu bando faz questão de manter os moradores contentes — mantendo-os seguros e garantindo que tudo funcione bem. Quando você está de volta na sua velha vizinhança, você sempre consegue achar pessoas que podem te esconder ou te ajudar com algum pequeno favor, sem fazer nenhuma pergunta.",
          "id": "o7"
        },
        {
          "k": "opt",
          "t": "**Notoriedade:** Você tem uma reputação pelo seu passado criminoso. Quando você **revelar quem você é**, sua reputação terrível vale como uma razão para as pessoas fazerem o que você pedir no movimento **manipular alguém**. É lógico que revelar a sua identidade para alguém pode criar problemas mais tarde.",
          "id": "o8"
        },
        {
          "k": "h",
          "t": "ANTECEDENTES"
        },
        {
          "k": "p",
          "t": "Você fazia trabalhos fora da legalidade antes de se tornar um caçador de monstros. O que você fazia?"
        },
        {
          "k": "opt",
          "t": "**Capanga.** Role +Braveza em vez de +Sutileza quando você **manipular alguém** com ameaças de violência.",
          "id": "o9"
        },
        {
          "k": "opt",
          "t": "**Arrombador.** Quando você **invadir um local protegido**, role +Esperteza. Com 10+ escolha três e com 7–9 escolha dois de: você entra sem ser visto; você sai sem ser visto; você não faz uma bagunça; você encontra o que você procura.",
          "id": "o10"
        },
        {
          "k": "opt",
          "t": "**Vigarista.** Quando você for **manipular alguém**, você pode perguntar ao Guardião “O que vai convencer esta pessoa a fazer o que eu quero?”. O Guardião deve dar uma resposta honesta, mas não necessariamente completa.",
          "id": "o11"
        },
        {
          "k": "opt",
          "t": "**Intermediário.** Se você precisar **comprar, vender ou arranjar alguma coisa ou alguém**, role +Sutileza. Com 10+, você conhece a pessoa certa que vai se interessar. Com 7–9, você conhece a única pessoa que pode fazer isso, mas tem uma complicação. Escolha uma: você deve para ele; ele sacaneou você; você sacaneou ele. Com uma falha, a única pessoa que pode ajudar é alguém que tem ódio mortal por você.",
          "id": "o12"
        },
        {
          "k": "opt",
          "t": "**Assassino.** Quando você der o primeiro tiro em um alvo desatento, cause +2 de dano.",
          "id": "o13"
        },
        {
          "k": "opt",
          "t": "**Charlatão.** Quando você quiser **convencer pessoas com truques de mágica**, role +Firmeza. Com 10+, sua plateia fica de boca aberta e é enganada por sua ilusão. Com 7–9, você escorregou algumas vezes, e talvez alguém tenha percebido. Você também pode **manipular alguém** usando técnicas de adivinhação. Quando fizer isso, pergunte “O que eles estão esperando ouvir agora?” como uma pergunta livre (mesmo com uma falha).",
          "id": "o14"
        },
        {
          "k": "opt",
          "t": "**Punguista.** Quando você **roubar alguma coisa pequena**, role +Sutileza. Com 10+, você pega a coisa e ninguém nota você pegando. Com 7–9, escolhe uma: você não pega a coisa; você pega a coisa errada; eles se lembram de você depois.",
          "id": "o15"
        }
      ],
      [
        {
          "k": "h",
          "t": "PERSEGUIÇÃO"
        },
        {
          "k": "p",
          "t": "Você não chegou até aqui sem fazer inimigos. Escolha pelo menos dois destes e dê nomes às pessoas envolvidas."
        },
        {
          "k": "opt",
          "t": "Um investigador da polícia, {{campo}}, assumiu como missão pessoal tirar você das ruas.",
          "id": "o16"
        },
        {
          "k": "opt",
          "t": "Você teve um rival no seu passado, {{campo}}, que nunca perde uma chance de ferrar você.",
          "id": "o17"
        },
        {
          "k": "opt",
          "t": "Você irritou um criminoso influente, {{campo}}, e ele vai fazer tudo que puder para destruir você.",
          "id": "o18"
        },
        {
          "k": "opt",
          "t": "{{campo}} é alguém com poderes especiais, pessoa ou monstro, que você tirou vantagem.",
          "id": "o19"
        },
        {
          "k": "opt",
          "t": "{{campo}} é um velho parceiro que você traiu no meio de um trabalho.",
          "id": "o20"
        },
        {
          "k": "h",
          "t": "SUBMUNDO"
        },
        {
          "k": "p",
          "t": "Escolha como você descobriu sobre o submundo real. Tenha isso em mente quando você selecionar seus movimentos na próxima seção para que tudo se encaixe."
        },
        {
          "k": "opt",
          "t": "O alvo de um trabalho era uma criatura perigosa. Escolha um: vampiro, lobisomem, troll, reptiliano.",
          "id": "o21"
        },
        {
          "k": "opt",
          "t": "Você trabalhou com alguém que era mais do que ele aparentava. Escolha um: feiticeiro, demônio, fada, médium.",
          "id": "o22"
        },
        {
          "k": "opt",
          "t": "Você foi contratado por alguma coisa estranha. Escolha um: imortal, deus, extradimensional, bruxa.",
          "id": "o23"
        },
        {
          "k": "opt",
          "t": "As coisas deram errado em um trabalho — incluindo, mas não limitado a, topar com (escolha um): uma horda de goblins, um grupo de carniçais, um devorador de sonhos, uma salamandra de fogo.",
          "id": "o24"
        },
        {
          "k": "h",
          "t": "EQUIPAMENTOS"
        },
        {
          "k": "p",
          "t": "**Armas efetivas** (escolha três):"
        },
        {
          "k": "opt",
          "t": "Revólver .22 [1-dano perto recarga pequena]",
          "id": "o25"
        },
        {
          "k": "opt",
          "t": "Revólver .38 [2-dano perto recarga barulhenta]",
          "id": "o26"
        },
        {
          "k": "opt",
          "t": "Pistola 9mm [2-dano perto barulhenta]",
          "id": "o27"
        },
        {
          "k": "opt",
          "t": "Espingarda [3-dano perto brutal barulhenta]",
          "id": "o28"
        },
        {
          "k": "opt",
          "t": "Rifle de caça [2-dano longe barulhenta]",
          "id": "o29"
        },
        {
          "k": "opt",
          "t": "Facão [1-dano contato]",
          "id": "o30"
        },
        {
          "k": "opt",
          "t": "Taco de beisebol [1-dano contato]",
          "id": "o31"
        },
        {
          "k": "opt",
          "t": "Submetralhadora [2-dano perto recarga automática]",
          "id": "o32"
        },
        {
          "k": "opt",
          "t": "Fuzil automático [3-dano perto/longe automática]",
          "id": "o33"
        }
      ]
    ]
  },
  {
    "id": "divino",
    "nome": "Divino",
    "imagensPagina1": [],
    "titulo": "O Divino",
    "lema": [
      "_Eu sou a Luz e a Espada._",
      "_Eu fui enviado para defender os inocentes da Escuridão._",
      "_Todo o Mal temerá a mim, pois eu serei seu fim._"
    ],
    "sorteEspecial": null,
    "criacao": "Para criar seu caçador Divino, primeiro escolha e escreva um nome na primeira linha da folha. Então siga as instruções para decidir sua aparência, classificações, missão, movimentos e equipamentos. Finalmente, se apresente e escolha o histórico.",
    "aparencia": [
      "Homem, mulher, andrógino, assexual",
      "Olhos flamejantes, olhos aterrorizantes, olhos serenos, olhos faiscantes, olhos perceptivos, olhos cintilantes, olhos brilhantes",
      "Roupas sujas, terno impecável, terno amarrotado, roupas casuais, roupas práticas"
    ],
    "classificacoes": [
      {
        "bra": 2,
        "esp": -1,
        "est": 0,
        "fir": 1,
        "sut": 1
      },
      {
        "bra": 2,
        "esp": -1,
        "est": 0,
        "fir": 2,
        "sut": -1
      },
      {
        "bra": 2,
        "esp": 1,
        "est": 1,
        "fir": 0,
        "sut": -1
      },
      {
        "bra": 2,
        "esp": 0,
        "est": -1,
        "fir": 1,
        "sut": 1
      },
      {
        "bra": 2,
        "esp": 0,
        "est": 1,
        "fir": 1,
        "sut": -1
      }
    ],
    "apresentacoes": "Quando você chegar aqui, espere que todos também cheguem para que vocês se apresentem juntos. Na sua vez descreva seu caçador e diga ao grupo o que eles sabem sobre você.",
    "historicoIntro": "Na sua vez escolha um destes para cada um dos caçadores:",
    "historico": [
      "Se você está protegendo outro caçador como sua missão, diga isso para ele: “Você tem um papel crucial no que está por vir. Eu estou aqui para te guiar e defendê-lo.”",
      "Ele não deveria estar envolvido nesta situação: as profecias não mencionam ele de forma alguma. Isso chama sua atenção, mas você ainda não sabe o que isso quer dizer.",
      "Ele é, lá no fundo, uma pessoa boa e justa. Você deve ajudá-lo a continuar assim.",
      "Ele é uma abominação e deveria ser destruído, mas você não pode fazê-lo. Discuta com ele o motivo disto.",
      "A prece dele (mesmo informal ou inconsciente) invocou você.",
      "Ele te enche de sentimentos de paixão e desejo. Você está confuso a respeito das emoções mortais relacionadas.",
      "Ele salvou sua vida e você compreende (pelo menos intelectualmente) que você deve a ele por isso.",
      "Ele é a pessoa que você vai atrás para conselhos sobre coisas mortais (exemplo: comida, sexo, drogas, televisão, etc.)."
    ],
    "subindo": [
      "Sempre que sua rolagem for 6 ou menos, ou quando um movimento determinar, marque uma caixa de experiência.",
      "Quando você tiver preenchido todas as cinco caixas de experiência, você sobe de nível. Apague todas as caixas e escolha uma melhoria da seguinte lista:"
    ],
    "melhorias": [
      "Receba +1 em Braveza (máximo +3).",
      "Receba +1 em Firmeza (máximo +2).",
      "Receba +1 em Sutileza (máximo +2).",
      "Receba +1 em Esperteza (máximo +2).",
      "Receba +1 em Estranheza (máximo +2).",
      "Pegue outro movimento de Divino.",
      "Pegue outro movimento de Divino.",
      "Ganhe um aliado: um ser divino inferior, enviado de lá de cima para ajudar na sua missão.",
      "Pegue um movimento de outra cartilha.",
      "Pegue um movimento de outra cartilha."
    ],
    "melhoriasNota": [
      "Depois de você subir de nível _cinco_ vezes, você já pode ter melhorias avançadas além destas. Eles estão listados abaixo."
    ],
    "avancadas": [
      "Receba +1 em qualquer classificação (máximo +3).",
      "Mude este caçador para um novo tipo.",
      "Crie um segundo caçador para jogar junto com este.",
      "Marque dois dos movimentos básicos como avançados.",
      "Marque outros dois dos movimentos básicos como avançados.",
      "Aposente este caçador para uma vida segura.",
      "Apague uma caixa marcada de Sorte.",
      "Altere sua Missão. Selecione outra missão das opções normais ou (com a permissão do Guardião) crie uma nova missão."
    ],
    "pagina2": [
      [
        {
          "k": "h",
          "t": "MISSÃO"
        },
        {
          "k": "p",
          "t": "Você foi colocado na Terra para um propósito. Escolha um:"
        },
        {
          "k": "opt",
          "t": "Você está aqui para combater os planos do Adversário.",
          "id": "o1"
        },
        {
          "k": "opt",
          "t": "O Fim dos Dias se aproxima. Seu papel é guiar estes caçadores para prevenir que isso aconteça.",
          "id": "o2"
        },
        {
          "k": "opt",
          "t": "O Fim dos Dias se aproxima. Seu papel é guiar estes caçadores para garantir que isso aconteça.",
          "id": "o3"
        },
        {
          "k": "opt",
          "t": "Você foi exilado. Você precisa trabalhar para a causa do Bem sem atrair a atenção dos seus irmãos e irmãs, pois eles estão obrigados a te executar por seus crimes.",
          "id": "o4"
        },
        {
          "k": "opt",
          "t": "Um dos outros caçadores tem um papel crucial nos eventos que estão por vir. Você deve prepará-lo para este papel e protegê-lo a _todo_ custo.",
          "id": "o5"
        },
        {
          "k": "img",
          "src": "/mds/cartilhas/divino-1.webp",
          "w": 216,
          "h": 338
        }
      ],
      [
        {
          "k": "h",
          "t": "MOVIMENTOS"
        },
        {
          "k": "p",
          "t": "_Você recebe todos os movimentos básicos e escolhe três movimentos de caçador Divino._"
        },
        {
          "k": "opt",
          "t": "**Chefe do além:** Ao **iniciar cada mistério**, role +Estranheza. Com 10+, seus Superiores pedem que você faça alguma coisa simples. Com 7–9, eles pedem que você faça alguma coisa difícil ou complicada. Em todo caso, você pode fazer a eles uma das perguntas do movimento **investigar um mistério** agora. Com uma falha, é exigido que você faça algo terrível. Se você não realizar o que foi ordenado, você não pode usar este movimento novamente até que você compense a sua falha.",
          "id": "o6"
        },
        {
          "k": "opt",
          "t": "**Asas angelicais:** Você pode ir instantaneamente para qualquer lugar que você já visitou antes ou até onde uma pessoa que você conheça bem está. Quando você **carregar uma ou duas pessoas com você**, role +Estranheza. Com 10+, vocês todos chegam onde desejam. Com 7–9, você não consegue totalmente: ou vocês todos se separam, ou vocês todos aparecem no lugar errado.",
          "id": "o7"
        },
        {
          "k": "opt",
          "t": "**O que eu preciso, quando eu preciso:** Você pode armazenar qualquer pequeno objeto que possua, colocando-o em um espaço mágico que ninguém pode alcançar. Você pode recuperar qualquer coisa armazenada assim a qualquer momento; ela aparece em sua mão.",
          "id": "o8"
        },
        {
          "k": "opt",
          "t": "**Reconfortante:** Quando você **falar com alguém por alguns segundos com uma voz calma**, você pode acalmá-lo, bloqueando qualquer pânico, raiva ou emoções negativas que ele tenha. Isso funciona mesmo se a coisa que o fez surtar ainda estiver presente, contanto que sua voz possa ser ouvida.",
          "id": "o9"
        },
        {
          "k": "opt",
          "t": "**Imposição de mãos:** Seu toque pode curar lesões e doenças. Quando você **impor suas mãos em alguém ferido**, role +Firmeza. Com 10+, cure 2 de dano ou uma doença, além disso ele é estabilizado. Com 7–9, você pode curar o dano ou doença assim como em 10+, mas você os transfere para si mesmo. Com uma falha, sua aura causa dano extra nele.",
          "id": "o10"
        },
        {
          "k": "opt",
          "t": "**Expulsar o mal:** Você pode **banir uma criatura não-natural da sua presença**. Role +Braveza. Com 10+, ela é banida. Com 7– 9, demora um pouco para o banimento fazer efeito — a criatura tem tempo para realizar uma ou duas ações. De qualquer forma, a criatura banida não é ferida e você não tem controle para onde ela vai. Esse movimento pode ser usado em caçadores não-naturais (exemplo: o Monstruoso). Com uma falha, alguma coisa está mantendo ela aqui. Isso é ruim.",
          "id": "o11"
        },
        {
          "k": "opt",
          "t": "**Fulminante:** Seu corpo e arma divina são considerados uma fraqueza contra monstros que você lutar. Seus ataques desarmados são [2-dano pessoal/contato brutal].",
          "id": "o12"
        }
      ],
      [
        {
          "k": "img",
          "src": "/mds/cartilhas/divino-2.webp",
          "w": 233,
          "h": 336
        },
        {
          "k": "h",
          "t": "EQUIPAMENTOS"
        },
        {
          "k": "p",
          "t": "**Armas divinas** (escolha uma):"
        },
        {
          "k": "opt",
          "t": "Espada flamejante [3-dano contato incendiária sagrada]",
          "id": "o13"
        },
        {
          "k": "opt",
          "t": "Martelo do trovão [3-dano contato atordoante sagrada]",
          "id": "o14"
        },
        {
          "k": "opt",
          "t": "Chicote de navalhas [3-dano contato área brutal sagrada]",
          "id": "o15"
        },
        {
          "k": "opt",
          "t": "Bolsa dos seis demônios [3-dano perto mágica sagrada]",
          "id": "o16"
        },
        {
          "k": "opt",
          "t": "Tridente de prata [3-dano perto prata sagrada]",
          "id": "o17"
        },
        {
          "k": "p",
          "t": "Você também recebe uma armadura divina [1-armadura sagrada]. Ela tem uma aparência apropriada a sua origem divina."
        }
      ]
    ]
  },
  {
    "id": "escolhido",
    "nome": "Escolhido",
    "imagensPagina1": [],
    "titulo": "O Escolhido",
    "lema": [
      "_Seu nascimento foi profetizado. Você é aquele que foi Escolhido, e com suas habilidades você pode salvar o mundo. Se você falhar, tudo será destruído. Tudo depende de você. Apenas de você._"
    ],
    "sorteEspecial": "**Especial do Escolhido:** Quando você marcar uma caixa de Sorte, o Guardião vai colocar sua sina no jogo.",
    "criacao": "Para criar seu caçador Escolhido, primeiro escolha e escreva um nome na primeira linha da folha. Então siga as instruções para decidir sua aparência, classificações, sina, movimentos, equipamentos e arma especial. Finalmente, se apresente e escolha o histórico.",
    "aparencia": [
      "Homem, mulher, menino, menina, andrógino",
      "Rosto disposto, rosto abatido, rosto jovem, rosto assombrado, rosto esperançoso, rosto controlado",
      "Roupas de marca, estilo casual, estilo descolado, roupas normais, roupas elegantes, estilo das ruas"
    ],
    "classificacoes": [
      {
        "bra": 2,
        "esp": 1,
        "est": -1,
        "fir": -1,
        "sut": 2
      },
      {
        "bra": 2,
        "esp": 1,
        "est": -1,
        "fir": 2,
        "sut": -1
      },
      {
        "bra": 1,
        "esp": 1,
        "est": -1,
        "fir": 2,
        "sut": 1
      },
      {
        "bra": -1,
        "esp": 2,
        "est": 2,
        "fir": 1,
        "sut": -1
      },
      {
        "bra": -1,
        "esp": -1,
        "est": 2,
        "fir": 2,
        "sut": 1
      }
    ],
    "apresentacoes": "Quando você chegar aqui, espere que todos também cheguem para que vocês se apresentem juntos. Na sua vez descreva seu caçador e diga ao grupo o que eles sabem sobre você.",
    "historicoIntro": "Na sua vez escolha um destes para cada um dos caçadores:",
    "historico": [
      "Vocês são parentes de sangue. Pergunte a ele o quão próximo.",
      "Ele está destinado a ser seu mentor. Diga ele como isso foi revelado.",
      "Seu melhor amigo no mundo, o qual você confia completamente.",
      "Um rival no início, mas vocês chegaram a um acordo.",
      "Enrolados romanticamente ou destinados a ficarem enrolados.",
      "Apenas amigos, da escola, do trabalho ou alguma coisa assim. Pergunte a ele de onde.",
      "Ele poderia ter sido o Escolhido em vez de você, mas ele falhou em algum teste. Diga a ele como ele falhou.",
      "Você salvou a vida dele quando ele não sabia que monstros eram reais. Diga a ele do que você o salvou."
    ],
    "subindo": [
      "Sempre que sua rolagem for 6 ou menos, ou quando um movimento determinar, marque uma caixa de experiência.",
      "Quando você tiver preenchido todas as cinco caixas de experiência, você sobe de nível. Apague todas as caixas e escolha uma melhoria da seguinte lista:"
    ],
    "melhorias": [
      "Receba +1 em Sutileza (máximo +3).",
      "Receba +1 em Firmeza (máximo +3).",
      "Receba +1 em Esperteza (máximo +3).",
      "Receba +1 em Braveza (máximo +3).",
      "Receba +1 em Estranheza (máximo +3).",
      "Pegue outro movimento de Escolhido.",
      "Pegue outro movimento de Escolhido.",
      "Ganhe um aliado.",
      "Pegue um movimento de outra cartilha.",
      "Pegue um movimento de outra cartilha."
    ],
    "melhoriasNota": [
      "Depois de você subir de nível _cinco_ vezes, você já pode ter melhorias avançadas além destas. Eles estão listados abaixo."
    ],
    "avancadas": [
      "Receba +1 em qualquer classificação (máximo +3).",
      "Mude este caçador para um novo tipo.",
      "Crie um segundo caçador para jogar junto com este.",
      "Marque dois dos movimentos básicos como avançados.",
      "Marque outros dois dos movimentos básicos como avançados.",
      "Aposente este caçador para uma vida segura.",
      "Remova uma das marcas de Perdição e, opcionalmente, uma das marcas de Heroísmo. Você alterou este aspecto da sua Sina."
    ],
    "pagina2": [
      [
        {
          "k": "h",
          "t": "SINA"
        },
        {
          "k": "p",
          "t": "Você decide o que o destino está guardando para você."
        },
        {
          "k": "p",
          "t": "Escolha como você descobriu sua sina da lista abaixo."
        },
        {
          "k": "p",
          "t": "**Como você descobriu** (escolha um):"
        },
        {
          "k": "opt",
          "t": "Pesadelos e visões",
          "id": "o1"
        },
        {
          "k": "opt",
          "t": "Algum maluco te contou",
          "id": "o2"
        },
        {
          "k": "opt",
          "t": "Um culto antigo encontrou você",
          "id": "o3"
        },
        {
          "k": "opt",
          "t": "Descoberto pelo seu arqui-inimigo",
          "id": "o4"
        },
        {
          "k": "opt",
          "t": "Atacado por monstros",
          "id": "o5"
        },
        {
          "k": "opt",
          "t": "Treinado desde o nascimento",
          "id": "o6"
        },
        {
          "k": "opt",
          "t": "Você encontrou a profecia",
          "id": "o7"
        },
        {
          "k": "p",
          "t": "Então escolha duas marcas de heroísmo e duas marcas de perdição para sua sina a partir das listas a seguir. Isso dirá como sua sina vai se desenrolar. Não tem problema se escolher marcas contraditórias, isso significa que sua sina está te puxando das duas formas."
        },
        {
          "k": "p",
          "t": "Sempre que você marcar uma caixa Sorte, o Guardião vai colocar alguma coisa da sua sina em seu caminho."
        },
        {
          "k": "p",
          "t": "**Heroísmo** (escolha duas):"
        },
        {
          "k": "opt",
          "t": "Sacrifício",
          "id": "o8"
        },
        {
          "k": "opt",
          "t": "Você é o Campeão",
          "id": "o9"
        },
        {
          "k": "opt",
          "t": "Visões",
          "id": "o10"
        },
        {
          "k": "opt",
          "t": "Treinamento secreto",
          "id": "o11"
        },
        {
          "k": "opt",
          "t": "Poderes mágicos",
          "id": "o12"
        },
        {
          "k": "opt",
          "t": "Herança mística",
          "id": "o13"
        },
        {
          "k": "opt",
          "t": "Uma vida normal",
          "id": "o14"
        },
        {
          "k": "opt",
          "t": "Amor verdadeiro",
          "id": "o15"
        },
        {
          "k": "opt",
          "t": "Você pode salvar o mundo",
          "id": "o16"
        },
        {
          "k": "opt",
          "t": "Aliados ocultos",
          "id": "o17"
        },
        {
          "k": "opt",
          "t": "O fim dos monstros",
          "id": "o18"
        },
        {
          "k": "opt",
          "t": "Ajuda divina",
          "id": "o19"
        },
        {
          "k": "p",
          "t": "**Perdição** (escolha duas):"
        },
        {
          "k": "opt",
          "t": "Morte",
          "id": "o20"
        },
        {
          "k": "opt",
          "t": "Você não pode salvar todos",
          "id": "o21"
        },
        {
          "k": "opt",
          "t": "Amor impossível",
          "id": "o22"
        },
        {
          "k": "opt",
          "t": "Fracasso",
          "id": "o23"
        },
        {
          "k": "opt",
          "t": "Um arqui-inimigo",
          "id": "o24"
        },
        {
          "k": "opt",
          "t": "Nenhuma vida normal",
          "id": "o25"
        },
        {
          "k": "opt",
          "t": "Perda de entes queridos",
          "id": "o26"
        },
        {
          "k": "opt",
          "t": "Traição",
          "id": "o27"
        },
        {
          "k": "opt",
          "t": "Dúvida",
          "id": "o28"
        },
        {
          "k": "opt",
          "t": "Compaixão pelo inimigo",
          "id": "o29"
        },
        {
          "k": "opt",
          "t": "Danação",
          "id": "o30"
        },
        {
          "k": "opt",
          "t": "Exércitos de monstros",
          "id": "o31"
        },
        {
          "k": "opt",
          "t": "O fim dos dias",
          "id": "o32"
        },
        {
          "k": "opt",
          "t": "A fonte do Mal",
          "id": "o33"
        }
      ],
      [
        {
          "k": "h",
          "t": "MOVIMENTOS"
        },
        {
          "k": "p",
          "t": "_Você recebe todos os movimentos básicos e três movimentos de caçador Escolhido. Você recebe estes dois:_"
        },
        {
          "k": "opt",
          "t": "**Joguete do destino:** Ao **iniciar cada mistério**, role +Estranheza para ver o que é revelado sobre seu futuro imediato. Com 10+, o Guardião vai revelar um detalhe útil sobre o mistério iminente. Com 7–9, você tem uma vaga ideia sobre ele. Com uma falha, alguma coisa ruim vai acontecer com você.",
          "id": "o34",
          "fixed": true
        },
        {
          "k": "opt",
          "t": "**Estou aqui por um motivo:** Há alguma coisa que você está predestinado a fazer. Combine os detalhes com o Guardião, de acordo com sua sina. Você não pode morrer até que isso ocorra. Se você morrer durante o jogo, você deve marcar uma caixa de Sorte e então você vai se recuperar ou voltar à vida de alguma forma. Assim que sua tarefa for concluída (ou você usar toda a sua Sorte) aí qualquer coisa pode acontecer.",
          "id": "o35",
          "fixed": true
        },
        {
          "k": "p",
          "t": "_Depois escolhe um destes:_"
        },
        {
          "k": "opt",
          "t": "**A grande entrada:** Quando você **fizer uma entrada chamativa em uma situação perigosa**, role +Firmeza. Com 10+, todos param para ver e ouvir até você acabar seu discurso de abertura. Com 7–9, você escolhe uma pessoa ou monstro para parar, ver e ouvir você até que acabar de falar. Com uma falha, você é marcado como a maior ameaça por todos os inimigos que estão presentes.",
          "id": "o36"
        },
        {
          "k": "opt",
          "t": "**Devastador:** Quando você **causar dano**, você pode causar +1 de dano.",
          "id": "o37"
        },
        {
          "k": "opt",
          "t": "**Perseverante:** Quando sua sina estiver te ferrando e mesmo assim você **agir de acordo com uma marca da sina** (de heroísmo ou de perdição) então você marca experiência. Se for uma marca de heroísmo, receba +1 adiante.",
          "id": "o38"
        },
        {
          "k": "opt",
          "t": "**Invencível:** Sempre considere você como tendo [2-armadura]. Isso não é cumulativo com outras proteções.",
          "id": "o39"
        },
        {
          "k": "opt",
          "t": "**Resiliente:** Você se recupera mais rápido que pessoas normais. Sempre que seus danos são curados, cure um ponto extra. Além disso, seus ferimentos são contados com 1 de dano a menos para os propósitos dos movimentos de dano do Guardião.",
          "id": "o40"
        }
      ],
      [
        {
          "k": "h",
          "t": "EQUIPAMENTOS"
        },
        {
          "k": "p",
          "t": "Você pode ter equipamento de proteção valendo [1-armadura], se quiser."
        },
        {
          "k": "p",
          "t": "Você tem uma arma especial que está destinado a empunhar."
        },
        {
          "k": "img",
          "src": "/mds/cartilhas/escolhido-1.webp",
          "w": 104,
          "h": 353
        },
        {
          "k": "h",
          "t": "SUA ARMA ESPECIAL"
        },
        {
          "k": "p",
          "t": "Crie sua arma escolhendo uma base, três opções da parte funcional (que são adicionadas às marcas básicas) e uma matéria-prima. Por exemplo, se você quiser uma espada mágica você poderia escolher: punho + lâmina + longa + artefato."
        },
        {
          "k": "p",
          "t": "**Base** (escolha uma):"
        },
        {
          "k": "opt",
          "t": "Bastão [1-dano contato/perto]",
          "id": "o41"
        },
        {
          "k": "opt",
          "t": "Cabo [2-dano contato pesada]",
          "id": "o42"
        },
        {
          "k": "opt",
          "t": "Punho [1-dano contato balanceada]",
          "id": "o43"
        },
        {
          "k": "opt",
          "t": "Corrente [1-dano contato área]",
          "id": "o44"
        },
        {
          "k": "p",
          "t": "**Parte funcional** (escolha três):"
        },
        {
          "k": "opt",
          "t": "Artefato: adicione [mágica]",
          "id": "o45"
        },
        {
          "k": "opt",
          "t": "Espinhos: adicione +1 de dano e [brutal]",
          "id": "o46"
        },
        {
          "k": "opt",
          "t": "Lâmina: adicione +1 de dano",
          "id": "o47"
        },
        {
          "k": "opt",
          "t": "Pesada: adicione +1 de dano",
          "id": "o48"
        },
        {
          "k": "opt",
          "t": "Longa: adicione [perto]",
          "id": "o49"
        },
        {
          "k": "opt",
          "t": "Arremessável: adicione [perto]",
          "id": "o50"
        },
        {
          "k": "opt",
          "t": "Corrente: adicione [área]",
          "id": "o51"
        },
        {
          "k": "p",
          "t": "**Material** (escolha um):"
        },
        {
          "k": "p",
          "t": "Finalmente, escolha o material da qual é feita a parte funcional: adicione [aço], [ferro puro], [prata], [madeira], [pedra], [osso], [dentes], [obsidiana] ou qualquer outra coisa que desejar."
        },
        {
          "k": "p",
          "t": "Material: {{campo}}",
          "id": "f1"
        }
      ]
    ]
  },
  {
    "id": "especialista",
    "nome": "Especialista",
    "imagensPagina1": [],
    "titulo": "O Especialista",
    "lema": [
      "_Eu dediquei minha vida ao estudo do não-natural. Eu conheço seus hábitos e suas fraquezas. Eu posso não ser o mais jovem ou o mais forte, mas meu conhecimento faz de mim a maior ameaça._"
    ],
    "sorteEspecial": null,
    "criacao": "Para criar seu caçador Especialista, primeiro escolha e escreva um nome na primeira linha da folha. Então siga as instruções para decidir sua aparência, classificações, movimentos, refúgio e equipamentos. Finalmente, se apresente e escolha o histórico.",
    "aparencia": [
      "Homem, mulher, indeterminado",
      "Rosto pensativo, rosto enrugado, rosto com cicatrizes, rosto contemplativo, rosto sério, rosto de tio, rosto experiente, rosto idoso",
      "Roupas antiquadas, roupas casuais, roupas utilitárias, roupas sob medida, roupas de aventura"
    ],
    "classificacoes": [
      {
        "bra": 1,
        "esp": 2,
        "est": 0,
        "fir": 1,
        "sut": -1
      },
      {
        "bra": -1,
        "esp": 2,
        "est": 1,
        "fir": 1,
        "sut": 0
      },
      {
        "bra": 1,
        "esp": 2,
        "est": 0,
        "fir": -1,
        "sut": 1
      },
      {
        "bra": 0,
        "esp": 2,
        "est": 1,
        "fir": 1,
        "sut": -1
      },
      {
        "bra": -1,
        "esp": 2,
        "est": 2,
        "fir": 0,
        "sut": -1
      }
    ],
    "apresentacoes": "Quando você chegar aqui, espere que todos também cheguem para que vocês se apresentem juntos. Na sua vez descreva seu caçador e diga ao grupo o que eles sabem sobre você.",
    "historicoIntro": "Na sua vez escolha um destes para cada um dos caçadores:",
    "historico": [
      "Ele é seu estudante, aprendiz, protegido ou filho. Decidam qual entre vocês.",
      "Ele veio até você buscando conselhos e seu conselho o tirou do perigo. Pergunte a ele qual era o perigo.",
      "Ele sabe alguns dos seus segredos sombrios, mas ele concordou em manter sigilo sobre o assunto. Diga a ele o que ele sabe.",
      "Uma relação distante. Diga a ele que tipo.",
      "Vocês dois eram membros de um grupo macabro que já debandou. Pergunte a ele porque _ele_ saiu e diga a ele porque _você_ saiu.",
      "Ele te ajudou a conseguir um item único que agora faz parte do seu refúgio. Diga a ele o que foi isso.",
      "Vocês foram ensinados pelo mesmo mestre. Pergunte a ele como isso terminou.",
      "Você salvou a vida dele de uma situação complicada. Diga a ele o que aconteceu."
    ],
    "subindo": [
      "Sempre que sua rolagem for 6 ou menos, ou quando um movimento determinar, marque uma caixa de experiência.",
      "Quando você tiver preenchido todas as cinco caixas de experiência, você sobe de nível. Apague todas as caixas e escolha uma melhoria da seguinte lista:"
    ],
    "melhorias": [
      "Receba +1 em Esperteza (máximo +3).",
      "Receba +1 em Sutileza (máximo +2).",
      "Receba +1 em Firmeza (máximo +2).",
      "Receba +1 em Estranheza (máximo +2).",
      "Pegue outro movimento de Especialista.",
      "Pegue outro movimento de Especialista.",
      "Adicione uma opção ao seu Refúgio.",
      "Adicione uma opção ao seu Refúgio.",
      "Pegue um movimento de outra cartilha.",
      "Pegue um movimento de outra cartilha."
    ],
    "melhoriasNota": [
      "Depois de você subir de nível _cinco_ vezes, você já pode ter melhorias avançadas além destas. Eles estão listados abaixo."
    ],
    "avancadas": [
      "Receba +1 em qualquer classificação (máximo +3).",
      "Mude este caçador para um novo tipo.",
      "Crie um segundo caçador para jogar junto com este.",
      "Marque dois dos movimentos básicos como avançados.",
      "Marque outros dois dos movimentos básicos como avançados.",
      "Aposente este caçador para uma vida segura."
    ],
    "pagina2": [
      [
        {
          "k": "h",
          "t": "REFÚGIO"
        },
        {
          "k": "p",
          "t": "Você tem um refúgio estabelecido, um local seguro para trabalhar. Escolha três das opções abaixo para seu refúgio:"
        },
        {
          "k": "opt",
          "t": "**Biblioteca erudita.** Quando você mergulha nos livros, receba +1 adiante para **investigar um mistério** (contanto que obras históricas ou de referência sejam apropriadas).",
          "id": "o1"
        },
        {
          "k": "opt",
          "t": "**Biblioteca mística.** Se você usar sua biblioteca para se preparar com seus tomos e grimórios, receba +1 adiante para **usar magia**.",
          "id": "o2"
        },
        {
          "k": "opt",
          "t": "**Feitiços de proteção.** Seu refúgio é seguro contra monstros — eles não podem entrar. Monstros podem fazer alguma coisa especial para evitar as proteções, mas não facilmente.",
          "id": "o3"
        },
        {
          "k": "opt",
          "t": "**Arsenal:** Você tem um estoque de armas e itens místicos e raros para matar monstros. Se você **precisar de uma arma especial**, role +Estranheza. Com 10+, você tem isso (e bastante se fizer diferença). Com 7–9, você tem isso, mas apenas o mínimo. Com uma falha, você tem a coisa errada.",
          "id": "o4"
        },
        {
          "k": "opt",
          "t": "**Enfermaria.** Você pode curar pessoas e tem espaço para um ou dois se recuperarem. O Guardião dirá qual o tempo provável para a recuperação de cada paciente e se você precisará de suprimentos ou ajuda extra.",
          "id": "o5"
        },
        {
          "k": "opt",
          "t": "**Oficina.** Você tem um espaço para construir e reparar armas, carros e outros dispositivos. Combine com o Guardião quanto tempo o reparo ou construção vai tomar, e se você precisará de suprimentos ou ajuda extra.",
          "id": "o6"
        },
        {
          "k": "opt",
          "t": "**Calabouço.** Esta sala é protegida contra todo tipo de monstro, espírito e magia que você conhece. Qualquer coisa que você armazenar aqui não pode ser encontrada, não pode fazer magia e não pode sair.",
          "id": "o7"
        },
        {
          "k": "opt",
          "t": "**Quarto do pânico.** Ele tem suprimentos essenciais e é protegido por meios normais e místicos. Você pode se esconder aqui por alguns dias, estando seguro contra praticamente qualquer coisa.",
          "id": "o8"
        },
        {
          "k": "opt",
          "t": "**Laboratório de magia.** Você possui um laboratório místico com todo tipo de ingredientes estranhos e ferramentas úteis para lançar feitiços (como **usar magia**, magia grandiosa e outros movimentos mágicos).",
          "id": "o9"
        }
      ],
      [
        {
          "k": "h",
          "t": "MOVIMENTOS"
        },
        {
          "k": "p",
          "t": "_Você recebe todos os movimentos básicos e escolhe dois movimentos de caçador Especialista._"
        },
        {
          "k": "opt",
          "t": "**Eu li sobre este tipo de coisa:** Role +Esperteza em vez de +Firmeza quando você **agir sob pressão**.",
          "id": "o10"
        },
        {
          "k": "opt",
          "t": "**Quase sempre certo:** Quando um caçador vier pedir um conselho sobre um problema, dê a ele sua opinião e conselho honestos. Se ele seguir seu conselho, ele recebe +1 constante enquanto seguir seu conselho, e você marca experiência.",
          "id": "o11"
        },
        {
          "k": "opt",
          "t": "**Preparativos:** Quando você **precisar de alguma coisa incomum ou rara**, role +Esperteza. Com 10+, você tem isso aqui neste momento. Com 7–9, você tem isso, mas não aqui — vai levar algum tempo para pegá-lo. Com uma falha, você sabe onde está, mas é em algum lugar bem ruim.",
          "id": "o12"
        },
        {
          "k": "opt",
          "t": "**Não estava tão ruim quanto parecia:** Uma vez por mistério, você pode tentar **continuar firme apesar das suas lesões**. Role +Firmeza. Com 10+, cure 2 de dano e estabilize suas lesões. Com 7–9, você pode ou se estabilizar ou curar 1 de dano. Com uma falha, isso era pior do que parecia: o Guardião pode usar o movimento causar dano em você ou tornar seus ferimentos instáveis.",
          "id": "o13"
        },
        {
          "k": "opt",
          "t": "**Acerto preciso:** Quando você **causar dano em um monstro**, você pode mirar num ponto vulnerável. Role +Braveza. Com 10+, você causa +2 de dano. Com 7–9, você causa +1 de dano. Com uma falha, você fica aberto para o monstro te acertar.",
          "id": "o14"
        },
        {
          "k": "opt",
          "t": "**O homem com um plano:** Ao **iniciar cada mistério**, role +Esperteza. Com 10+, reserve 2. Com 7–9, reserve 1. Gaste a reserva para estar onde você precisar, preparado e pronto. Com uma falha, o Guardião reserva 1 que ele pode gastar para colocar você no local errado, despreparado e desprevenido.",
          "id": "o15"
        },
        {
          "k": "opt",
          "t": "**Passado sombrio:** Você se envolveu com os piores tipos de artes místicas antes de se tornar um dos mocinhos. Se você **varrer suas memórias procurando alguma coisa relevante sobre o caso atual**, role +Estranheza. Com 10+, faça ao Guardião duas perguntas da lista abaixo. Com 7–9, pergunte uma. Com uma falha, você pode fazer uma pergunta, mas isso implicará em você ter ajudado pessoalmente na criação da situação que você está lidando agora. As perguntas são:",
          "id": "o16"
        },
        {
          "k": "li",
          "t": "Quando eu lidei com esta criatura (ou uma desta espécie), o que eu aprendi?"
        },
        {
          "k": "li",
          "t": "Que magia negra eu conheço que poderia ajudar aqui?"
        },
        {
          "k": "li",
          "t": "Eu conheço alguém que possa estar por trás disso?"
        },
        {
          "k": "li",
          "t": "Quem eu conheço que poderia nos ajudar agora?"
        }
      ],
      [
        {
          "k": "h",
          "t": "EQUIPAMENTOS"
        },
        {
          "k": "p",
          "t": "Você recebe três armas destruidoras de monstros."
        },
        {
          "k": "p",
          "t": "**Armas destruidoras de monstros** (escolha três):"
        },
        {
          "k": "opt",
          "t": "Martelo e estacas de madeira [3-dano pessoal lenta madeira]",
          "id": "o17"
        },
        {
          "k": "opt",
          "t": "Espada de prata [2-dano contato brutal prata]",
          "id": "o18"
        },
        {
          "k": "opt",
          "t": "Espada de ferro puro [2-dano contato brutal ferro]",
          "id": "o19"
        },
        {
          "k": "opt",
          "t": "Faca abençoada [2-dano contato sagrada]",
          "id": "o20"
        },
        {
          "k": "opt",
          "t": "Adaga mágica [2-dano contato mágica]",
          "id": "o21"
        },
        {
          "k": "opt",
          "t": "Saquinho de vodu [1-dano longe mágica]",
          "id": "o22"
        },
        {
          "k": "opt",
          "t": "Lança-chamas [3-dano perto incendiária pesada volátil]",
          "id": "o23"
        },
        {
          "k": "opt",
          "t": "Magnum [3-dano perto recarga barulhenta]",
          "id": "o24"
        },
        {
          "k": "opt",
          "t": "Espingarda [3-dano perto brutal barulhenta]",
          "id": "o25"
        },
        {
          "k": "img",
          "src": "/mds/cartilhas/especialista-1.webp",
          "w": 234,
          "h": 312
        }
      ]
    ]
  },
  {
    "id": "iniciado",
    "nome": "Iniciado",
    "imagensPagina1": [],
    "titulo": "O Iniciado",
    "lema": [
      "_Desde os primórdios da história, nós fomos a barreira contra o avanço das Trevas. Nós conhecemos os Males do mundo e nós os combatemos para que o resto da humanidade não precise temer. Nós somos a Chama que purifica as Sombras._"
    ],
    "sorteEspecial": null,
    "criacao": "Para criar seu caçador Iniciado, primeiro escolha e escreva um nome na primeira linha da folha. Então siga as instruções para decidir sua aparência, classificações, movimentos, Seita e equipamentos. Finalmente, se apresente e escolha o histórico.",
    "aparencia": [
      "Homem, mulher, mascarado, oculto",
      "Corpo enrijecido, corpo tatuado, corpo ágil, corpo forte, corpo magro, corpo ossudo, corpo curvado",
      "Roupas arcaicas, roupas fora de moda, roupas cerimoniais, roupas que não combinam, roupas formais"
    ],
    "classificacoes": [
      {
        "bra": 1,
        "esp": 0,
        "est": 2,
        "fir": 1,
        "sut": -1
      },
      {
        "bra": -1,
        "esp": 1,
        "est": 2,
        "fir": 1,
        "sut": 0
      },
      {
        "bra": 2,
        "esp": -1,
        "est": 2,
        "fir": 0,
        "sut": -1
      },
      {
        "bra": 0,
        "esp": 1,
        "est": 2,
        "fir": -1,
        "sut": 1
      },
      {
        "bra": 1,
        "esp": 0,
        "est": 2,
        "fir": 0,
        "sut": 0
      }
    ],
    "apresentacoes": "Quando você chegar aqui, espere que todos também cheguem para que vocês se apresentem juntos. Na sua vez descreva seu caçador e diga ao grupo o que eles sabem sobre você.",
    "historicoIntro": "Na sua vez escolha um destes para cada um dos caçadores:",
    "historico": [
      "Ele é um membro ainda não iniciado da sua Seita.",
      "Vocês lutaram juntos quando a maré de monstros parecia irrefreável. Pergunte a ele como foi isso.",
      "Amigo, mas ele conheceu você sob sua identidade secreta e descobriu sobre a Seita depois. Pergunte como ele se sente sobre isso.",
      "Ele é um parente próximo ou esposo(a). Decidam entre vocês exatamente que tipo de relação é essa.",
      "Colega de clube de armas antigas/artes marciais.",
      "Ele está descrito nas profecias, mas o papel que ele vai desempenhar não é revelado.",
      "Um ex-membro da Seita, mas ainda são amigos. Pergunte a ele porque ele saiu ou foi expulso.",
      "Vocês se encontraram pesquisando coisas místicas estranhas e vocês são colegas de bizarrice desde então."
    ],
    "subindo": [
      "Sempre que sua rolagem for 6 ou menos, ou quando um movimento determinar, marque uma caixa de experiência.",
      "Quando você tiver preenchido todas as cinco caixas de experiência, você sobe de nível. Apague todas as caixas e escolha uma melhoria da seguinte lista:"
    ],
    "melhorias": [
      "Receba +1 em Estranheza (máximo +3).",
      "Receba +1 em Firmeza (máximo +2).",
      "Receba +1 em Esperteza (máximo +2).",
      "Receba +1 em Braveza (máximo +2).",
      "Pegue outro movimento de Iniciado.",
      "Pegue outro movimento de Iniciado.",
      "Assuma o comando da sua filial da Seita.",
      "Ganhe uma equipe da Seita sob seu comando.",
      "Pegue um movimento de outra cartilha.",
      "Pegue um movimento de outra cartilha."
    ],
    "melhoriasNota": [
      "Depois de você subir de nível _cinco_ vezes, você já pode ter melhorias avançadas além destas. Eles estão listados abaixo."
    ],
    "avancadas": [
      "Receba +1 em qualquer classificação (máximo +3).",
      "Mude este caçador para um novo tipo.",
      "Crie um segundo caçador para jogar junto com este.",
      "Marque dois dos movimentos básicos como avançados.",
      "Marque outros dois dos movimentos básicos como avançados.",
      "Aposente este caçador para uma vida segura.",
      "Torne-se o líder, ou líder efetivo, de toda a Seita."
    ],
    "pagina2": [
      [
        {
          "k": "img",
          "src": "/mds/cartilhas/iniciado-1.webp",
          "w": 202,
          "h": 249
        },
        {
          "k": "h",
          "t": "SEITA"
        },
        {
          "k": "p",
          "t": "Você é parte de uma antiga ordem secreta que destrói monstros. De onde ela é? Quão antiga ela é? Ela é religiosa? Por que ela permanece secreta? Como ela recruta?"
        },
        {
          "k": "p",
          "t": "Você também precisa escolher as tradições da Seita (elas serão usadas pelo Guardião para determinar os métodos e ações da Seita):"
        },
        {
          "k": "p",
          "t": "**Tradições Boas** (escolha duas):"
        },
        {
          "k": "opt",
          "t": "Bem informada",
          "id": "o1"
        },
        {
          "k": "opt",
          "t": "Conhecimento antigo",
          "id": "o2"
        },
        {
          "k": "opt",
          "t": "Conhecimento mágico",
          "id": "o3"
        },
        {
          "k": "opt",
          "t": "Artes marciais",
          "id": "o4"
        },
        {
          "k": "opt",
          "t": "Filiais por toda parte",
          "id": "o5"
        },
        {
          "k": "opt",
          "t": "Influência civil",
          "id": "o6"
        },
        {
          "k": "opt",
          "t": "Táticas flexíveis",
          "id": "o7"
        },
        {
          "k": "opt",
          "t": "Modernizada",
          "id": "o8"
        },
        {
          "k": "opt",
          "t": "Integrada na sociedade",
          "id": "o9"
        },
        {
          "k": "opt",
          "t": "Hierarquia aberta",
          "id": "o10"
        },
        {
          "k": "opt",
          "t": "Ricos",
          "id": "o11"
        },
        {
          "k": "opt",
          "t": "Dispositivos engenhosos",
          "id": "o12"
        },
        {
          "k": "opt",
          "t": "Itens mágicos",
          "id": "o13"
        },
        {
          "k": "p",
          "t": "**Tradições Ruins** (escolha uma):"
        },
        {
          "k": "opt",
          "t": "Motivos duvidosos",
          "id": "o14"
        },
        {
          "k": "opt",
          "t": "Conservadora",
          "id": "o15"
        },
        {
          "k": "opt",
          "t": "Falta de visão",
          "id": "o16"
        },
        {
          "k": "opt",
          "t": "Paranoica e reservada",
          "id": "o17"
        },
        {
          "k": "opt",
          "t": "Hierarquia fechada",
          "id": "o18"
        },
        {
          "k": "opt",
          "t": "Dividida em facções",
          "id": "o19"
        },
        {
          "k": "opt",
          "t": "Leis rígidas",
          "id": "o20"
        },
        {
          "k": "opt",
          "t": "Juramentos místicos",
          "id": "o21"
        },
        {
          "k": "opt",
          "t": "Obediência total",
          "id": "o22"
        },
        {
          "k": "opt",
          "t": "Líderes tirânicos",
          "id": "o23"
        },
        {
          "k": "opt",
          "t": "Equipamentos obsoletos",
          "id": "o24"
        },
        {
          "k": "opt",
          "t": "Pobres",
          "id": "o25"
        }
      ],
      [
        {
          "k": "h",
          "t": "MOVIMENTOS"
        },
        {
          "k": "p",
          "t": "_Você recebe todos os movimentos básicos e quatro movimentos de caçador Iniciado. Você recebe este:_"
        },
        {
          "k": "opt",
          "t": "**Boa reputação na Seita:** Ao **iniciar cada mistério**, quando estiver com uma boa reputação na Seita, role +Sutileza. Com 10+, eles fornecem alguma informação útil ou ajuda no assunto. Com 7–9, você recebe uma missão associada com o mistério, se conseguir completá-la também vai receber informação ou ajuda. Com uma falha, eles pedem que você faça algo desagradável. Se você falhar em uma missão ou recusar uma ordem, você estará com uma má reputação na Seita até se redimir.",
          "id": "o26",
          "fixed": true
        },
        {
          "k": "p",
          "t": "_Depois escolhe três destes:_"
        },
        {
          "k": "opt",
          "t": "**Técnicas antigas de combate:** Quando usar uma arma de [contato] antiquada, você causa +1 de dano e recebe +1 sempre que rolar para **proteger alguém**.",
          "id": "o27"
        },
        {
          "k": "opt",
          "t": "**Místico:** Sempre que tiver sucesso em **usar magia**, receba +1 adiante.",
          "id": "o28"
        },
        {
          "k": "opt",
          "t": "**Previsões:** A Seita possui profecias antigas ou técnicas de adivinhação para prever o futuro. Uma vez por mistério, você pode usá-las. Se for **ver o que o futuro te reserva**, role +Estranheza. Com 10+, reserve 3. Com 7–9, reserve 1. Com uma falha, você recebe informação ruim e o Guardião decide como isso te afeta. Gaste sua reserva para:",
          "id": "o29"
        },
        {
          "k": "li",
          "t": "ter um objeto útil preparado."
        },
        {
          "k": "li",
          "t": "estar onde você precisa, bem a tempo."
        },
        {
          "k": "li",
          "t": "receber +1 adiante ou conceder +1 adiante para outro caçador."
        },
        {
          "k": "li",
          "t": "avisar alguém retroativamente sobre um ataque, de forma que ele não aconteça."
        },
        {
          "k": "opt",
          "t": "**Promessa sagrada:** Você consegue se concentrar em um único objetivo renunciando alguma coisa durante essa busca (exemplo: fala, todo o sustento exceto pão e água, álcool, mentiras, sexo, etc.). Tenha o consentimento do Guardião nisso — isso deve ser compatível com o objetivo em importância e dificuldade. Enquanto você manter sua promessa e batalhar por seu objetivo, marque experiência no final de cada sessão e receba +1 em qualquer rolagem que afete diretamente a obtenção deste objetivo. Se você quebrar sua promessa, recebe −1 constante até que você tenha se redimido.",
          "id": "o30"
        }
      ],
      [
        {
          "k": "opt",
          "t": "**Mentor:** Você tem um mentor em sua Seita, dê um nome a ele. Quando você **contatar seu mentor pedindo informações**, role +Esperteza. Com 10+, você recebe uma resposta para o seu questionamento sem problemas. Com 7–9, você escolhe: ou ele está ocupado e não pode ajudar; ou ele pode responder o questionamento, mas você fica devendo um favor. Com uma falha, seu questionamento cria problemas.",
          "id": "o31"
        },
        {
          "k": "opt",
          "t": "**Aprendiz:** Você tem um aprendiz, dê um nome a ele. Seu trabalho é ensiná-lo os caminhos da Seita. Ele conta como um **aliado: subordinado** (motivação: seguir suas instruções à risca).",
          "id": "o32"
        },
        {
          "k": "opt",
          "t": "**Mão amiga:** Quando você for **dar uma mão** para outro caçador, eles recebem +2 ao invés do +1 normal.",
          "id": "o33"
        },
        {
          "k": "opt",
          "t": "**A velha magia negra:** Quando você **usar magia**, como o efeito você pode fazer uma pergunta do movimento **investigar um mistério**.",
          "id": "o34"
        },
        {
          "k": "h",
          "t": "EQUIPAMENTOS"
        },
        {
          "k": "p",
          "t": "Se a Seita tiver **artes marciais** ou **equipamentos obsoletos**, então escolha três armas antiquadas. Se a Seita tiver **modernizada** ou **dispositivos engenhosos**, então escolha duas armas modernas. Do contrário, escolha duas armas antiquadas e uma arma moderna."
        },
        {
          "k": "p",
          "t": "Você também recebe uma armadura antiquada [1-armadura pesada]."
        },
        {
          "k": "p",
          "t": "**Armas antiquadas** (escolha duas ou três, conforme acima):"
        },
        {
          "k": "opt",
          "t": "Espada [2-dano contato brutal]",
          "id": "o35"
        },
        {
          "k": "opt",
          "t": "Machado [2-dano contato brutal]",
          "id": "o36"
        },
        {
          "k": "opt",
          "t": "Espada grande [3-dano contato brutal pesada]",
          "id": "o37"
        },
        {
          "k": "opt",
          "t": "Machado grande [3-dano contato brutal lenta pesada]",
          "id": "o38"
        },
        {
          "k": "opt",
          "t": "Faca de prata [1-dano contato prata]",
          "id": "o39"
        },
        {
          "k": "opt",
          "t": "Bastões curtos [1-dano contato rápida]",
          "id": "o40"
        },
        {
          "k": "opt",
          "t": "Lança [2-dano contato/perto]",
          "id": "o41"
        },
        {
          "k": "opt",
          "t": "Maça [2-dano contato brutal]",
          "id": "o42"
        },
        {
          "k": "opt",
          "t": "Besta [2-dano perto lenta]",
          "id": "o43"
        },
        {
          "k": "p",
          "t": "**Armas modernas** (escolha uma ou duas, conforme acima):"
        },
        {
          "k": "opt",
          "t": "Revólver .38 [2-dano perto recarga barulhenta]",
          "id": "o44"
        },
        {
          "k": "opt",
          "t": "Pistola 9mm [2-dano perto barulhenta]",
          "id": "o45"
        },
        {
          "k": "opt",
          "t": "Rifle sniper [3-dano longe]",
          "id": "o46"
        },
        {
          "k": "opt",
          "t": "Magnum [3-dano perto recarga barulhenta]",
          "id": "o47"
        },
        {
          "k": "opt",
          "t": "Espingarda [3-dano perto brutal barulhenta]",
          "id": "o48"
        }
      ]
    ]
  },
  {
    "id": "injusticado",
    "nome": "Injustiçado",
    "imagensPagina1": [],
    "titulo": "O Injustiçado",
    "lema": [
      "_Eles levaram meus entes queridos. Naquela época eu não era forte o bastante para lutar, mas eu estudei, treinei e agora eu estou pronto para limpar o mundo da sua mácula. Eu vou matar todos eles. Isso é tudo que me resta._"
    ],
    "sorteEspecial": null,
    "criacao": "Para criar seu caçador Injustiçado, primeiro escolha e escreva um nome na primeira linha da folha. Então siga as instruções para decidir sua aparência, classificações, quem você perdeu, movimentos e equipamentos. Finalmente, se apresente e escolha o histórico.",
    "aparencia": [
      "Homem, mulher, oculto",
      "Olhos tristes, olhos frios, olhos raivosos, olhos intocáveis, olhos sem emoção, olhos sofridos, olhos atormentados",
      "Roupas discretas, roupas rasgadas, roupas casuais, trajes de caça, trajes de exército, roupas velhas"
    ],
    "classificacoes": [
      {
        "bra": 2,
        "esp": -1,
        "est": 1,
        "fir": 1,
        "sut": 0
      },
      {
        "bra": 2,
        "esp": 1,
        "est": 0,
        "fir": 0,
        "sut": 0
      },
      {
        "bra": 2,
        "esp": 1,
        "est": -1,
        "fir": 0,
        "sut": 1
      },
      {
        "bra": 2,
        "esp": 0,
        "est": 2,
        "fir": -1,
        "sut": -1
      },
      {
        "bra": 2,
        "esp": 0,
        "est": 1,
        "fir": -1,
        "sut": 1
      }
    ],
    "apresentacoes": "Quando você chegar aqui, espere que todos também cheguem para que vocês se apresentem juntos. Na sua vez descreva seu caçador e diga ao grupo o que eles sabem sobre você.",
    "historicoIntro": "Na sua vez escolha um destes para cada um dos caçadores:",
    "historico": [
      "Ele te ajudou em um momento crítico da sua busca por vingança. Diga a ele que ajuda você precisou.",
      "Ele ficou entre você e o que você precisava descobrir. Pergunte a ele o motivo.",
      "Ele também perdeu um amigo ou parente para esses monstros. Pergunte a ele quem foi.",
      "Parentes, próximos ou distantes. Diga a ele que tipo.",
      "Você salvou a vida dele, quando ele ainda era um patético caçador novato. Pergunte a ele do que você o salvou.",
      "Você respeita o conhecimento suado dele e frequentemente vai até ele pedir conselhos.",
      "Ele te mostrou os primeiros passos, quando você estava aprendendo a lutar.",
      "Ele viu você surtar completamente e ficar alucinado. Diga a ele qual foi a situação e pergunte que danos colaterais você causou."
    ],
    "subindo": [
      "Sempre que sua rolagem for 6 ou menos, ou quando um movimento determinar, marque uma caixa de experiência.",
      "Quando você tiver preenchido todas as cinco caixas de experiência, você sobe de nível. Apague todas as caixas e escolha uma melhoria da seguinte lista:"
    ],
    "melhorias": [
      "Receba +1 em Braveza (máximo +3).",
      "Receba +1 em Firmeza (máximo +2).",
      "Receba +1 em Esperteza (máximo +2).",
      "Receba +1 em Estranheza (máximo +2).",
      "Pegue outro movimento de Injustiçado.",
      "Pegue outro movimento de Injustiçado.",
      "Ganhe um Refúgio, como o do Especialista, com duas opções.",
      "Adicione uma opção ao seu Refúgio.",
      "Pegue um movimento de outra cartilha.",
      "Pegue um movimento de outra cartilha."
    ],
    "melhoriasNota": [
      "Depois de você subir de nível _cinco_ vezes, você já pode ter melhorias avançadas além destas. Eles estão listados abaixo."
    ],
    "avancadas": [
      "Receba +1 em qualquer classificação (máximo +3).",
      "Mude este caçador para um novo tipo.",
      "Crie um segundo caçador para jogar junto com este.",
      "Marque dois dos movimentos básicos como avançados.",
      "Marque outros dois dos movimentos básicos como avançados.",
      "Aposente este caçador para uma vida segura.",
      "Você rastreia o mostro específico responsável pelas suas perdas — o Guardião deve fazer o próximo mistério ser sobre ele.",
      "Altere o alvo da sua fúria vingativa. Escolha uma nova raça de monstro: _Eu conheço minha presa_ agora se aplica a ela."
    ],
    "pagina2": [
      [
        {
          "k": "h",
          "t": "QUEM VOCÊ PERDEU"
        },
        {
          "k": "p",
          "t": "Quem você perdeu no passado? Escolha um ou mais:"
        },
        {
          "k": "opt",
          "t": "Seu pai e/ou mãe: {{campo}}",
          "id": "o1"
        },
        {
          "k": "opt",
          "t": "Seu(s) irmão(s): {{campo}}",
          "id": "o2"
        },
        {
          "k": "opt",
          "t": "Seu esposo(a)/parceiro(a): {{campo}}",
          "id": "o3"
        },
        {
          "k": "opt",
          "t": "Seu(s) filho(s): {{campo}}",
          "id": "o4"
        },
        {
          "k": "opt",
          "t": "Seu(s) melhor(es) amigo(s): {{campo}}",
          "id": "o5"
        },
        {
          "k": "p",
          "t": "O que causou isso? Com o consentimento do Guardião, escolha a raça de monstro."
        },
        {
          "k": "p",
          "t": "Minha presa: {{campo}}",
          "id": "f1"
        },
        {
          "k": "p",
          "t": "Por que você não pôde salvá-los? Você foi (escolha um ou mais):"
        },
        {
          "k": "opt",
          "t": "ausente",
          "id": "o6"
        },
        {
          "k": "opt",
          "t": "egoísta",
          "id": "o7"
        },
        {
          "k": "opt",
          "t": "ferido",
          "id": "o8"
        },
        {
          "k": "opt",
          "t": "fraco",
          "id": "o9"
        },
        {
          "k": "opt",
          "t": "lento",
          "id": "o10"
        },
        {
          "k": "opt",
          "t": "assustado",
          "id": "o11"
        },
        {
          "k": "opt",
          "t": "incrédulo",
          "id": "o12"
        },
        {
          "k": "opt",
          "t": "conivente",
          "id": "o13"
        },
        {
          "k": "img",
          "src": "/mds/cartilhas/injusticado-1.webp",
          "w": 143,
          "h": 208
        }
      ],
      [
        {
          "k": "h",
          "t": "MOVIMENTOS"
        },
        {
          "k": "p",
          "t": "_Você recebe todos os movimentos básicos e três movimentos de caçador Injustiçado. Você recebe este:_"
        },
        {
          "k": "opt",
          "t": "**Eu conheço minha presa:** Você recebe +1 constante quando sabe que está investigando, perseguindo ou lutando com a raça de monstro que causou sua perda.",
          "id": "o14",
          "fixed": true
        },
        {
          "k": "p",
          "t": "_Depois escolhe dois destes:_"
        },
        {
          "k": "opt",
          "t": "**Alucinado:** Não importa quanto dano você receba, você sempre continua lutando até que a luta acabe. Durante a luta, o Guardião não pode usar movimentos de dano em você e você não pode morrer. Quando a luta termina, todo o dano tem efeito normalmente.",
          "id": "o15"
        },
        {
          "k": "opt",
          "t": "**NUNCA MAIS!:** Em combate você pode escolher **proteger alguém** sem rolar, como se você tivesse rolado um 10+, mas você não pode escolher ‘sofrer pouco dano’.",
          "id": "o16"
        },
        {
          "k": "opt",
          "t": "**O que não me mata…:** Se você sofreu dano em uma luta, você ganha +1 constante até que a luta acabe.",
          "id": "o17"
        },
        {
          "k": "opt",
          "t": "**Fervor:** Quando você **manipular alguém**, role +Braveza em vez de +Sutileza.",
          "id": "o18"
        },
        {
          "k": "opt",
          "t": "**Segurança vem primeiro:** Você improvisou proteção extra nos seus trajes, te concedendo +1 em armadura (máximo [2-armadura]).",
          "id": "o19"
        },
        {
          "k": "opt",
          "t": "**Cirurgia improvisada:** Quando você **prestar um socorro rápido e precário em alguém** (incluindo você mesmo), role +Firmeza. Com 10+, está tudo bem, isto vale como os primeiros socorros normais, além de estabilizar as lesões e curar 1 de dano extra. Com 7–9, isto vale como os primeiros socorros normais, além de um dos seguintes (sua escolha):",
          "id": "o20"
        },
        {
          "k": "li",
          "t": "Estabilizar a lesão, mas o paciente recebe −1 adiante."
        },
        {
          "k": "li",
          "t": "Curar 1 de dano extra e estabilizar por ora, mas vai voltar como 2 de dano e ficar instável de novo mais tarde."
        },
        {
          "k": "li",
          "t": "Curar 1 de dano extra e estabilizar, mas o paciente recebe −1 constante até que seja socorrido apropriadamente."
        },
        {
          "k": "p",
          "t": "Com uma falha, o Guardião decide que dano você causou."
        },
        {
          "k": "opt",
          "t": "**Ferramenta certa para o trabalho certo:** Quando usar sua arma predileta (veja seus equipamentos abaixo), você recebe +1 para **partir pra porrada**.",
          "id": "o21"
        }
      ],
      [
        {
          "k": "h",
          "t": "EQUIPAMENTOS"
        },
        {
          "k": "p",
          "t": "Escolha uma arma predileta e duas armas práticas."
        },
        {
          "k": "p",
          "t": "Você tem equipamentos de proteção, adequados à sua aparência, valendo [1-armadura]."
        },
        {
          "k": "p",
          "t": "Se você quiser, você pode ter um carro ou moto clássico, ou uma picape ou van simples."
        },
        {
          "k": "p",
          "t": "**Armas prediletas** (escolha uma):"
        },
        {
          "k": "opt",
          "t": "Espingarda cano-serrado [3-dano contato/perto brutal barulhenta recarga]",
          "id": "o22"
        },
        {
          "k": "opt",
          "t": "Trabuco [3-dano perto barulhenta]",
          "id": "o23"
        },
        {
          "k": "opt",
          "t": "Faca de combate [2-dano contato silenciosa]",
          "id": "o24"
        },
        {
          "k": "opt",
          "t": "Espada/machado grande [3-dano contato brutal pesada]",
          "id": "o25"
        },
        {
          "k": "opt",
          "t": "Armas especializadas para destruir sua presa (exemplo: martelo e estacas de madeira para vampiros, adaga de prata para lobisomens, etc.): [4-dano] contra a criatura especificada, [1-dano] em outros seres, e outras marcas com consentimento do Guardião.",
          "id": "o26"
        },
        {
          "k": "opt",
          "t": "Adaga mágica [2-dano contato mágica]",
          "id": "o27"
        },
        {
          "k": "opt",
          "t": "Motosserra [3-dano contato brutal inconveniente barulhenta pesada]",
          "id": "o28"
        },
        {
          "k": "p",
          "t": "**Armas práticas** (escolha duas):"
        },
        {
          "k": "opt",
          "t": "Revólver .38 [2-dano perto recarga barulhenta]",
          "id": "o29"
        },
        {
          "k": "opt",
          "t": "Pistola 9mm [2-dano perto barulhenta]",
          "id": "o30"
        },
        {
          "k": "opt",
          "t": "Rifle de caça [2-dano longe barulhenta]",
          "id": "o31"
        },
        {
          "k": "opt",
          "t": "Espingarda [3-dano perto brutal barulhenta]",
          "id": "o32"
        },
        {
          "k": "opt",
          "t": "Facão [1-dano contato]",
          "id": "o33"
        },
        {
          "k": "opt",
          "t": "Soco inglês [1-dano contato furtiva]",
          "id": "o34"
        },
        {
          "k": "opt",
          "t": "Fuzil de assalto [3-dano perto área barulhenta recarga]",
          "id": "o35"
        }
      ]
    ]
  },
  {
    "id": "lunatico",
    "nome": "Lunático",
    "imagensPagina1": [],
    "titulo": "O Lunático",
    "lema": [
      "_Tudo está conectado, mas nem todos enxergam os padrões, e a maioria das pessoas nem se preocupa em procurar por eles. Mas eu, eu nunca paro de olhar para o fundo do buraco. Eu nunca consigo parar de ver a verdade. Eu percebo os padrões. Foi assim que eu achei os monstros, e é assim que ajudo a matá-los._"
    ],
    "sorteEspecial": null,
    "criacao": "Para criar seu caçador Lunático, primeiro escolha e escreva um nome na primeira linha da folha. Então siga as instruções para decidir sua aparência, classificações, movimentos e equipamentos. Finalmente, se apresente e escolha o histórico.",
    "aparencia": [
      "Homem, mulher, transgressivo, oculto",
      "Olhos selvagens, olhos oscilantes, olhos focados, olhos buscadores, olhos desconfiados, olhos arregalados, olhos reservados",
      "Roupas surradas, roupas casuais, terno amarrotado, roupas elegantes, roupas confortáveis, trajes de exército"
    ],
    "classificacoes": [
      {
        "bra": -1,
        "esp": 2,
        "est": 0,
        "fir": 1,
        "sut": 1
      },
      {
        "bra": -1,
        "esp": 2,
        "est": 1,
        "fir": 1,
        "sut": 0
      },
      {
        "bra": 1,
        "esp": 2,
        "est": 0,
        "fir": -1,
        "sut": 1
      },
      {
        "bra": 0,
        "esp": 2,
        "est": 1,
        "fir": -1,
        "sut": 1
      },
      {
        "bra": 0,
        "esp": 2,
        "est": 2,
        "fir": -1,
        "sut": -1
      }
    ],
    "apresentacoes": "Quando você chegar aqui, espere que todos também cheguem para que vocês se apresentem juntos. Na sua vez descreva seu caçador e diga ao grupo o que eles sabem sobre você.",
    "historicoIntro": "Na sua vez escolha um destes para cada um dos caçadores:",
    "historico": [
      "Ele está ligado a tudo isso de alguma forma. Você está de olho nele.",
      "Ele é um parente próximo. Pergunte a ele de que tipo.",
      "Um velho amigo que conheceu você através de uma longa lista de coincidências.",
      "Vocês passaram juntos por um martírio: talvez um monstro, talvez o serviço militar, talvez um tempo no hospício. O que quer que tenha sido, isso deixou vocês juntos e vocês tem total confiança um no outro.",
      "Membros do mesmo grupo de apoio.",
      "Colega maluco.",
      "Todos os sinais apontavam para vocês trabalharem juntos. Então você o encontrou e agora vocês trabalham juntos.",
      "Vocês se conhecem através de sites de criptozoologia e de teorias da conspiração."
    ],
    "subindo": [
      "Sempre que sua rolagem for 6 ou menos, ou quando um movimento determinar, marque uma caixa de experiência.",
      "Quando você tiver preenchido todas as cinco caixas de experiência, você sobe de nível. Apague todas as caixas e escolha uma melhoria da seguinte lista:"
    ],
    "melhorias": [
      "Receba +1 em Esperteza (máximo +3).",
      "Receba +1 em Sutileza (máximo +2).",
      "Receba +1 em Firmeza (máximo +2).",
      "Receba +1 em Estranheza (máximo +2).",
      "Pegue outro movimento de Lunático.",
      "Pegue outro movimento de Lunático.",
      "Ganhe um Refúgio, como o do Especialista, com duas opções.",
      "Ganhe outra opção para seu Refúgio.",
      "Pegue um movimento de outra cartilha.",
      "Pegue um movimento de outra cartilha."
    ],
    "melhoriasNota": [
      "Depois de você subir de nível _cinco_ vezes, você já pode ter melhorias avançadas além destas. Eles estão listados abaixo."
    ],
    "avancadas": [
      "Receba +1 em qualquer classificação (máximo +3).",
      "Mude este caçador para um novo tipo.",
      "Crie um segundo caçador para jogar junto com este.",
      "Marque dois dos movimentos básicos como avançados.",
      "Marque outros dois dos movimentos básicos como avançados.",
      "Aposente este caçador para uma vida segura."
    ],
    "pagina2": [
      [
        {
          "k": "img",
          "src": "/mds/cartilhas/lunatico-1.webp",
          "w": 153,
          "h": 432
        }
      ],
      [
        {
          "k": "h",
          "t": "MOVIMENTOS"
        },
        {
          "k": "p",
          "t": "_Você recebe todos os movimentos básicos e escolhe três movimentos de caçador Lunático._"
        },
        {
          "k": "opt",
          "t": "**Ligar os pontos:** Ao **iniciar cada mistério**, se você procurar padrões amplos que possam envolver os eventos atuais, role +Esperteza. Com 10+, reserve 3. Com 7–9, reserve 1. Gaste a reserva durante o mistério para perguntar ao Guardião uma das seguintes perguntas:",
          "id": "o1"
        },
        {
          "k": "li",
          "t": "Esta pessoa está mais envolvida com os eventos atuais do que ela está dizendo?"
        },
        {
          "k": "li",
          "t": "Quando e onde o próximo evento crítico vai ocorrer?"
        },
        {
          "k": "li",
          "t": "O que o monstro quer desta pessoa?"
        },
        {
          "k": "li",
          "t": "Isso está conectado com mistérios antigos que nós investigamos?"
        },
        {
          "k": "li",
          "t": "Como este mistério se relaciona no quadro geral?"
        },
        {
          "k": "opt",
          "t": "**Olhos de louco:** Você recebe +1 em Estranheza (máximo +3).",
          "id": "o2"
        },
        {
          "k": "opt",
          "t": "**Viu, tudo se encaixa:** Você pode rolar +Esperteza em vez de +Sutileza quando você **manipular alguém**.",
          "id": "o3"
        },
        {
          "k": "opt",
          "t": "**Mente desconfiada:** Se alguém mentir para você, você percebe.",
          "id": "o4"
        },
        {
          "k": "opt",
          "t": "**Quase sempre ignorado:** Quando você **agir como doido** para evitar alguma coisa, role +Estranheza. Com 10+, você é considerado inofensivo ou insignificante. Com 7–9, escolha um: inofensivo ou insignificante. Com uma falha, você atrai muita (mas não toda) atenção.",
          "id": "o5"
        },
        {
          "k": "opt",
          "t": "**Do contra:** Quando você **pedir e receber o conselho honesto de alguém** sobre a melhor forma de você agir e então faz alguma outra coisa, marque experiência. Se você fizer exatamente o oposto do conselho dado, você também recebe +1 constante em qualquer movimento que fizer buscando esse objetivo.",
          "id": "o6"
        },
        {
          "k": "opt",
          "t": "**Amigos da net:** Você conhece muitas pessoas na Internet. Quando você **contatar um amigo da net** para te ajudar com um mistério, role +Sutileza. Com 10+, ele está disponível e disposto a ajudar — ele pode consertar alguma coisa, quebrar um código, hackear um computador ou te conseguir alguma informação especial. Com 7–9, ele está preparado para ajudar, mas ou isso vai levar algum tempo ou você mesmo precisará fazer parte do trabalho. Com uma falha, você estraga o seu relacionamento com ele.",
          "id": "o7"
        },
        {
          "k": "opt",
          "t": "**Furtivo:** Quando você atacar em uma emboscada ou por trás, cause +2 de dano.",
          "id": "o8"
        }
      ],
      [
        {
          "k": "h",
          "t": "EQUIPAMENTOS"
        },
        {
          "k": "p",
          "t": "Você recebe uma arma normal e duas armas ocultas."
        },
        {
          "k": "p",
          "t": "**Armas normais** (escolha uma):"
        },
        {
          "k": "opt",
          "t": "Revólver .38 [2-dano perto recarga barulhenta]",
          "id": "o9"
        },
        {
          "k": "opt",
          "t": "Pistola 9mm [2-dano perto barulhenta]",
          "id": "o10"
        },
        {
          "k": "opt",
          "t": "Rifle de caça [2-dano longe barulhenta]",
          "id": "o11"
        },
        {
          "k": "opt",
          "t": "Magnum [3-dano perto recarga barulhenta]",
          "id": "o12"
        },
        {
          "k": "opt",
          "t": "Espingarda [3-dano perto brutal barulhenta]",
          "id": "o13"
        },
        {
          "k": "opt",
          "t": "Facão [1-dano contato]",
          "id": "o14"
        },
        {
          "k": "p",
          "t": "**Armas ocultas** (escolha duas):"
        },
        {
          "k": "opt",
          "t": "Facas de arremesso [1-dano perto numerosa]",
          "id": "o15"
        },
        {
          "k": "opt",
          "t": "Pistola de bolso [2-dano perto barulhenta recarga]",
          "id": "o16"
        },
        {
          "k": "opt",
          "t": "Garrote [3-dano pessoal]",
          "id": "o17"
        },
        {
          "k": "opt",
          "t": "Lanterna de vigia [1-dano contato]",
          "id": "o18"
        },
        {
          "k": "opt",
          "t": "Luvas com pesos/soco inglês [1-dano contato]",
          "id": "o19"
        },
        {
          "k": "opt",
          "t": "Faca borboleta/canivete [1-dano contato]",
          "id": "o20"
        },
        {
          "k": "img",
          "src": "/mds/cartilhas/lunatico-2.webp",
          "w": 169,
          "h": 306
        }
      ]
    ]
  },
  {
    "id": "monstruoso",
    "nome": "Monstruoso",
    "imagensPagina1": [],
    "titulo": "O Monstruoso",
    "lema": [
      "_Eu sinto a fome e o desejo de destruir. Mas eu luto contra isso, eu nunca vou desistir. Eu não sou mais humano, de forma alguma, mas eu preciso proteger aqueles que ainda são. Só assim eu posso dizer que sou diferente dos outros monstros. Algumas vezes até eu acredito nisso._"
    ],
    "sorteEspecial": null,
    "criacao": "Para criar seu caçador Monstruoso, primeiro escolha e escreva um nome na primeira linha da folha. Então siga as instruções para decidir sua aparência, classificações, raça, movimentos e equipamentos. Finalmente, se apresente e escolha o histórico.",
    "aparencia": [
      "Homem, mulher, misterioso, transgressivo",
      "Aura sinistra, aura poderosa, aura sombria, aura perturbadora, aura energética, aura maligna, aura bestial",
      "Roupas arcaicas, roupas casuais, roupas rasgadas, roupas sob medida, roupas estilosas, roupas de rua, roupas de aventura"
    ],
    "classificacoes": [
      {
        "bra": 2,
        "esp": 0,
        "est": 3,
        "fir": -1,
        "sut": -1
      },
      {
        "bra": 0,
        "esp": 1,
        "est": 3,
        "fir": 1,
        "sut": -1
      },
      {
        "bra": -1,
        "esp": -1,
        "est": 3,
        "fir": 0,
        "sut": 2
      },
      {
        "bra": 0,
        "esp": 0,
        "est": 3,
        "fir": 2,
        "sut": -2
      },
      {
        "bra": -1,
        "esp": 2,
        "est": 3,
        "fir": -1,
        "sut": 0
      }
    ],
    "apresentacoes": "Quando você chegar aqui, espere que todos também cheguem para que vocês se apresentem juntos. Na sua vez descreva seu caçador e diga ao grupo o que eles sabem sobre você.",
    "historicoIntro": "Na sua vez escolha um destes para cada um dos caçadores:",
    "historico": [
      "Você perdeu o controle uma vez e quase o matou. Pergunte a ele como ele te impediu.",
      "Ele tentou te destruir, mas você provou que estava no lado do bem. Pergunte a ele o que o convenceu.",
      "Você está obcecado romanticamente por ele. Pergunte se ele sabe e se é recíproco.",
      "Parentes próximos ou um descendente distante. Diga a ele qual.",
      "Você o salvou de outro de sua raça e impediu retaliações contra esta criatura específica (talvez seja outro do lado do bem ou talvez ele tenha influência sobre você).",
      "Ele está ligado à sua maldição ou à sua origem. Diga a ele como.",
      "Vocês lutaram juntos contra as adversidades e sobreviveram.",
      "Ele te salvou de outro caçador que estava pronto para matar você. Pergunte a ele o que aconteceu."
    ],
    "subindo": [
      "Sempre que sua rolagem for 6 ou menos, ou quando um movimento determinar, marque uma caixa de experiência.",
      "Quando você tiver preenchido todas as cinco caixas de experiência, você sobe de nível. Apague todas as caixas e escolha uma melhoria da seguinte lista:"
    ],
    "melhorias": [
      "Receba +1 em Sutileza (máximo +2).",
      "Receba +1 em Firmeza (máximo +2).",
      "Receba +1 em Esperteza (máximo +2).",
      "Receba +1 em Braveza (máximo +2).",
      "Pegue outro movimento de Monstruoso.",
      "Pegue outro movimento de Monstruoso.",
      "Ganhe um Refúgio, como o do Especialista, com duas opções.",
      "Pegue mais uma escolha de Ataques Naturais.",
      "Pegue um movimento de outra cartilha.",
      "Pegue um movimento de outra cartilha."
    ],
    "melhoriasNota": [
      "Depois de você subir de nível _cinco_ vezes, você já pode ter melhorias avançadas além destas. Eles estão listados abaixo."
    ],
    "avancadas": [
      "Receba +1 em qualquer classificação (máximo +3).",
      "Mude este caçador para um novo tipo.",
      "Crie um segundo caçador para jogar junto com este.",
      "Marque dois dos movimentos básicos como avançados.",
      "Marque outros dois dos movimentos básicos como avançados.",
      "Aposente este caçador para uma vida segura.",
      "Livre-se da Maldição da sua raça. Sua maldição não se aplica mais a você, mas você perde 1 de Estranheza.",
      "Você se torna maligno (de novo). Aposente este personagem, ele se torna uma das ameaças do Guardião."
    ],
    "pagina2": [
      [
        {
          "k": "h",
          "t": "RAÇA"
        },
        {
          "k": "p",
          "t": "Você é meio-humano e meio-monstro: decida se você sempre foi assim ou se você originalmente era humano e foi transformado de alguma forma. Agora decida se você sempre lutou pelo bem ou se você era mal e mudou de lado."
        },
        {
          "k": "img",
          "src": "/mds/cartilhas/monstruoso-1.webp",
          "w": 121,
          "h": 135
        },
        {
          "k": "p",
          "t": "Defina sua raça monstruosa escolhendo uma maldição, movimentos e ataques naturais. Crie o monstro que você quer ser: suas escolhas definem sua raça no jogo. Alguns monstros clássicos com sugestões de escolhas estão listados abaixo. Estas são _apenas_ sugestões: sinta-se livre para criar uma versão diferente!"
        },
        {
          "k": "p",
          "t": "Sugestões de Raças de Monstros:"
        },
        {
          "k": "li",
          "t": "**Vampiro:** _Maldição:_ alimentação (sangue ou força vital). _Ataques naturais:_ Base: drenagem vital ou Base: dentes; adicione +1 de dano ao ataque base. _Movimentos:_ imortal ou vitalidade inesgotável; domínio mental."
        },
        {
          "k": "li",
          "t": "**Lobisomem:** _Maldição:_ vulnerabilidade (prata). _Ataques naturais:_ Base: garras; Base: dentes. _Movimentos:_ metamorfo (lobo e/ou homem-lobo); garras da fera ou força profana."
        },
        {
          "k": "li",
          "t": "**Fantasma:** _Maldição:_ vulnerabilidade (sal grosso). _Ataques naturais:_ Base: força mágica; adicione alcance de [contato] à força mágica. _Movimentos:_ incorpóreo; imortal."
        },
        {
          "k": "li",
          "t": "**Fada:** _Maldição:_ puro impulso (alegria). _Ataques naturais:_ Base: força mágica; adicione [ignora-armadura] à força mágica. _Movimentos:_ voo; velocidade sobre-humana."
        },
        {
          "k": "li",
          "t": "**Demônio:** _Maldição:_ puro impulso (crueldade). _Ataques naturais:_ Base: garras; adicione +1 de dano às garras. _Movimentos:_ negociador sombrio; vitalidade inesgotável."
        },
        {
          "k": "li",
          "t": "**Orc:** _Maldição:_ mestre sombrio (o comandante orc). _Ataques naturais:_ Base: dentes; adicione [ignora-armadura] aos dentes. _Movimentos:_ força profana; negociador sombrio."
        },
        {
          "k": "li",
          "t": "**Zumbi:** _Maldição:_ puro impulso (fome), alimentação (carne ou cérebro). _Ataques naturais:_ Base: dentes; adicione +1 de dano aos dentes. _Movimentos:_ imortal; vitalidade inesgotável."
        }
      ],
      [
        {
          "k": "h",
          "t": "MALDIÇÃO, ESCOLHA UMA:"
        },
        {
          "k": "opt",
          "t": "**Alimentação:** Você deve se alimentar de humanos vivos — pode ser através de sangue, cérebro ou essência espiritual, mas deve vir de pessoas. Você precisa **agir sob pressão** para resistir se alimentar quando uma oportunidade perfeita surgir.",
          "id": "o1"
        },
        {
          "k": "opt",
          "t": "**Vulnerabilidade:** Escolha uma substância. Você sofre +1 de dano quando você sofrer dano dela. Se você estiver preso ou cercado por ela, você precisa **agir sob pressão** para usar seus poderes.",
          "id": "o2"
        },
        {
          "k": "opt",
          "t": "**Puro impulso:** Uma emoção te domina. Escolha entre: fome, ódio, raiva, medo, ciúmes, cobiça, alegria, orgulho, inveja, luxúria ou crueldade. Sempre que você tiver a chance de satisfazer essa emoção você deve satisfazê-la imediatamente ou **agir sob pressão** para resistir.",
          "id": "o3"
        },
        {
          "k": "opt",
          "t": "**Mestre sombrio:** Você tem um senhor do mal que não sabe que você mudou de lado. Ele ainda te dá ordens e ele não tolera recusas. Ou falhas.",
          "id": "o4"
        },
        {
          "k": "h",
          "t": "ATAQUES NATURAIS"
        },
        {
          "k": "p",
          "t": "Escolha uma Base e um extra para ela, ou então duas Bases."
        },
        {
          "k": "p",
          "t": "_Base:_"
        },
        {
          "k": "opt",
          "t": "Dentes [3-dano pessoal]",
          "id": "o5"
        },
        {
          "k": "opt",
          "t": "Garras [2-dano contato]",
          "id": "o6"
        },
        {
          "k": "opt",
          "t": "Força mágica [1-dano perto mágica]",
          "id": "o7"
        },
        {
          "k": "opt",
          "t": "Drenagem vital [1-dano pessoal drena-vida]",
          "id": "o8"
        },
        {
          "k": "p",
          "t": "_Extra:_"
        },
        {
          "k": "opt",
          "t": "Adicione +1 de dano para uma base",
          "id": "o9"
        },
        {
          "k": "opt",
          "t": "Adicione [ignora-armadura] para uma base",
          "id": "o10"
        },
        {
          "k": "opt",
          "t": "Adicione um alcance extra para uma base ([pessoal], [contato] ou [perto]).",
          "id": "o11"
        },
        {
          "k": "h",
          "t": "MOVIMENTOS"
        },
        {
          "k": "p",
          "t": "_Você recebe todos os movimentos básicos e escolhe dois movimentos de caçador Monstruoso._"
        },
        {
          "k": "opt",
          "t": "**Imortal:** Você não envelhece ou adoece, e sempre que você sofrer dano você sofre 1 de dano a menos.",
          "id": "o12"
        },
        {
          "k": "opt",
          "t": "**Atrativos não-naturais:** Role +Estranheza em vez de +Sutileza quando você **manipular alguém**.",
          "id": "o13"
        },
        {
          "k": "opt",
          "t": "**Força profana:** Role +Estranheza em vez de +Braveza quando você **partir pra porrada**.",
          "id": "o14"
        },
        {
          "k": "opt",
          "t": "**Incorpóreo:** Você pode se mover livremente através de objetos sólidos (mas não de pessoas).",
          "id": "o15"
        }
      ],
      [
        {
          "k": "opt",
          "t": "**Velocidade sobre-humana:** Você se movimenta muito mais rápido que as pessoas normais. Quando você **perseguir, fugir ou correr** receba +1 constante.",
          "id": "o16"
        },
        {
          "k": "opt",
          "t": "**Garras da fera:** Todos os seus ataques naturais causam +1 de dano.",
          "id": "o17"
        },
        {
          "k": "opt",
          "t": "**Domínio mental:** Quando você olhar fixamente nos olhos de um humano normal e **exercer sua vontade sobre ele**, role +Sutileza. Com 10+, reserve 3. Com 7–9, reserve 1. Você pode gastar sua reserva para dar uma ordem a ele. Pessoas comuns vão seguir suas ordens, independente do que for. Caçadores podem escolher se vão seguir ou não. Se seguirem, eles marcam experiência.",
          "id": "o18"
        },
        {
          "k": "opt",
          "t": "**Vitalidade inesgotável:** Quando você receber dano, você pode **curar-se**. Role +Firmeza. Com 10+, cure 2 de dano e estabilize suas lesões. Com 7–9, cure 1 de dano e estabilize suas lesões. Com uma falha, suas lesões pioram.",
          "id": "o19"
        },
        {
          "k": "opt",
          "t": "**Negociador sombrio:** Você pode usar o movimento **manipular alguém** em monstros tão bem quanto pessoas, se eles puderem raciocinar e falar.",
          "id": "o20"
        },
        {
          "k": "opt",
          "t": "**Voo:** Você pode voar.",
          "id": "o21"
        },
        {
          "k": "opt",
          "t": "**Metamorfo:** Você pode mudar de forma (geralmente para um animal). Decida se você tem apenas uma forma ou várias, e especifique quais. Você recebe +1 para **investigar um mistério** quando usar os sentidos ampliados da outra forma (exemplo: olfato de um lobo, visão de uma águia).",
          "id": "o22"
        },
        {
          "k": "opt",
          "t": "**Uma coisa emprestada:** Pegue um movimento de uma cartilha de caçador que não está em jogo no momento.",
          "id": "o23"
        },
        {
          "k": "h",
          "t": "EQUIPAMENTOS"
        },
        {
          "k": "p",
          "t": "Se você quiser, você pode ter uma arma conveniente."
        },
        {
          "k": "p",
          "t": "**Armas convenientes** (se quiser escolha uma):"
        },
        {
          "k": "opt",
          "t": "Revólver .38 [2-dano perto recarga barulhenta]",
          "id": "o24"
        },
        {
          "k": "opt",
          "t": "Pistola 9mm [2-dano perto barulhenta]",
          "id": "o25"
        },
        {
          "k": "img",
          "src": "/mds/cartilhas/monstruoso-2.webp",
          "w": 92,
          "h": 137
        },
        {
          "k": "opt",
          "t": "Magnum [3-dano perto recarga barulhenta]",
          "id": "o26"
        },
        {
          "k": "opt",
          "t": "Espingarda [3-dano perto brutal barulhenta]",
          "id": "o27"
        },
        {
          "k": "opt",
          "t": "Facão [1-dano contato]",
          "id": "o28"
        },
        {
          "k": "opt",
          "t": "Soco inglês [1-dano contato silenciosa pequena]",
          "id": "o29"
        },
        {
          "k": "opt",
          "t": "Espada [2-dano contato brutal]",
          "id": "o30"
        },
        {
          "k": "opt",
          "t": "Espada grande [3-dano contato brutal pesada]",
          "id": "o31"
        }
      ]
    ]
  },
  {
    "id": "mundano",
    "nome": "Mundano",
    "imagensPagina1": [],
    "titulo": "O Mundano",
    "lema": [
      "_Sabe como monstros só importunam as pessoas cheias de poderes malucos e capazes de revidar de igual pra igual? Pois é né, eu também não. Mas foda-se, eu acabei nessa equipe caçadora de monstros, então preciso fazer o que puder pra ajudar, certo?_"
    ],
    "sorteEspecial": null,
    "criacao": "Para criar seu caçador Mundano, primeiro escolha e escreva um nome na primeira linha da folha. Então siga as instruções para decidir sua aparência, classificações, movimentos e equipamentos. Finalmente, se apresente e escolha o histórico.",
    "aparencia": [
      "Homem, mulher, menino, menina, andrógino, oculto",
      "Rosto amigável, rosto atraente, rosto risonho, rosto confiável, rosto comum, rosto sério, rosto sensual",
      "Roupas normais, roupas casuais, roupas góticas, roupas esportivas, roupas de trabalho, roupas de rua, roupas de nerd"
    ],
    "classificacoes": [
      {
        "bra": 1,
        "esp": 0,
        "est": -1,
        "fir": 1,
        "sut": 2
      },
      {
        "bra": 1,
        "esp": 1,
        "est": 0,
        "fir": -1,
        "sut": 2
      },
      {
        "bra": 1,
        "esp": -1,
        "est": 1,
        "fir": 0,
        "sut": 2
      },
      {
        "bra": 1,
        "esp": 1,
        "est": -1,
        "fir": 0,
        "sut": 2
      },
      {
        "bra": 0,
        "esp": 1,
        "est": -1,
        "fir": 1,
        "sut": 2
      }
    ],
    "apresentacoes": "Quando você chegar aqui, espere que todos também cheguem para que vocês se apresentem juntos. Na sua vez descreva seu caçador e diga ao grupo o que eles sabem sobre você.",
    "historicoIntro": "Na sua vez escolha um destes para cada um dos caçadores:",
    "historico": [
      "Vocês são parentes próximos. Diga a ele como vocês são relacionados.",
      "Rivais no começo, agora vocês respeitam os talentos um do outro.",
      "Envolvidos romanticamente ou você só tem uma queda por ele. Pergunte qual ele prefere.",
      "Ele é seu herói, exatamente o tipo de caçador de monstros que você deseja ser. Diga a ele porque você o idolatra.",
      "Um bom amigo. Diga a ele se é recente ou de longa data.",
      "Você é um pouco desconfiado dele (talvez por causa dos poderes sobrenaturais dele ou algo assim).",
      "Ele te introduziu ao mundo dos monstros. Diga a ele como se sente sobre isso.",
      "Você o salvou de um monstro devido a uma sequência improvável de eventos. Diga a ele qual foi."
    ],
    "subindo": [
      "Sempre que sua rolagem for 6 ou menos, ou quando um movimento determinar, marque uma caixa de experiência.",
      "Quando você tiver preenchido todas as cinco caixas de experiência, você sobe de nível. Apague todas as caixas e escolha uma melhoria da seguinte lista:"
    ],
    "melhorias": [
      "Receba +1 em Sutileza (máximo +3).",
      "Receba +1 em Firmeza (máximo +2).",
      "Receba +1 em Esperteza (máximo +2).",
      "Receba +1 em Braveza (máximo +2).",
      "Pegue outro movimento de Mundano.",
      "Pegue outro movimento de Mundano.",
      "Apague uma caixa marcada de Sorte.",
      "Apague uma caixa marcada de Sorte.",
      "Pegue um movimento de outra cartilha.",
      "Pegue um movimento de outra cartilha."
    ],
    "melhoriasNota": [
      "Depois de você subir de nível _cinco_ vezes, você já pode ter melhorias avançadas além destas. Eles estão listados abaixo."
    ],
    "avancadas": [
      "Receba +1 em qualquer classificação (máximo +3).",
      "Mude este caçador para um novo tipo.",
      "Crie um segundo caçador para jogar junto com este.",
      "Marque dois dos movimentos básicos como avançados.",
      "Marque outros dois dos movimentos básicos como avançados.",
      "Aposente este caçador para uma vida segura.",
      "Apague uma caixa marcada de Sorte.",
      "Apague uma caixa marcada de Sorte."
    ],
    "pagina2": [
      [
        {
          "k": "img",
          "src": "/mds/cartilhas/mundano-1.webp",
          "w": 237,
          "h": 381
        }
      ],
      [
        {
          "k": "h",
          "t": "MOVIMENTOS"
        },
        {
          "k": "p",
          "t": "_Você recebe todos os movimentos básicos e escolhe três movimentos de caçador Mundano._"
        },
        {
          "k": "opt",
          "t": "**Sempre a vítima:** Quando outro caçador usar **proteger alguém** para te proteger, ele marca experiência. Sempre que um monstro te capturar, você marca experiência.",
          "id": "o1"
        },
        {
          "k": "opt",
          "t": "**Oops!:** Se você quiser **esbarrar em algo importante**, avise o Guardião. Você vai achar alguma coisa importante e útil, embora não necessariamente relacionada com seus problemas imediatos.",
          "id": "o2"
        },
        {
          "k": "opt",
          "t": "**Vamos dar o fora daqui!:** Se você puder **proteger alguém** dizendo o que ele deve fazer ou levando-o para fora, role +Sutileza em vez de +Braveza.",
          "id": "o3"
        },
        {
          "k": "opt",
          "t": "**Botão do pânico:** Quando você precisar escapar, se você **falar a rota que vai tentar usar**, role +Esperteza. Com 10+, você escapa do perigo, sem problemas. Com 7–9, você pode ir ou ficar, mas se você for isso vai te custar alguma coisa (você deixa algo para trás ou alguma coisa vem junto com você). Com uma falha, você é apanhado.",
          "id": "o4"
        },
        {
          "k": "opt",
          "t": "**O poder do coração:** Quando estiver combatendo um monstro, se for **dar uma mão** a alguém, não role +Firmeza. Você automaticamente ajuda como se tivesse rolado um 10.",
          "id": "o5"
        },
        {
          "k": "opt",
          "t": "**O que poderia dar errado?:** Quando você **avançar até o perigo imediato** sem se proteger antes, reserve 2. Você pode gastar sua reserva para:",
          "id": "o6"
        },
        {
          "k": "li",
          "t": "Causar +1 de dano."
        },
        {
          "k": "li",
          "t": "Reduzir em 1 o dano sofrido por alguém."
        },
        {
          "k": "li",
          "t": "Receber +2 adiante em uma rolagem de **agir sob pressão**."
        },
        {
          "k": "opt",
          "t": "**Confie em mim:** Quando você **contar a verdade para uma pessoa normal para protegê-la do perigo**, role +Sutileza. Com 10+, ela fará o que você disser que ela deve fazer, sem questionar. Com 7–9, ela fará isto, mas o Guardião escolhe um de:",
          "id": "o7"
        },
        {
          "k": "li",
          "t": "Ela primeiro faz uma pergunta difícil."
        },
        {
          "k": "li",
          "t": "Ela para e hesita por um tempo."
        },
        {
          "k": "li",
          "t": "Ela tem uma ideia “melhor”."
        },
        {
          "k": "p",
          "t": "Com uma falha, ele vai achar que você é doido e talvez perigoso também."
        },
        {
          "k": "opt",
          "t": "**Não se preocupe, só vou dar uma olhada:** Sempre que você for **olhar sozinho algum lugar (ou alguma coisa) assustadora**, marque experiência.",
          "id": "o8"
        }
      ],
      [
        {
          "k": "h",
          "t": "EQUIPAMENTOS"
        },
        {
          "k": "p",
          "t": "Você recebe duas armas mundanas e um meio de transporte."
        },
        {
          "k": "p",
          "t": "**Armas mundanas** (escolha duas):"
        },
        {
          "k": "opt",
          "t": "Taco de golfe, beisebol, críquete ou hóquei [2-dano contato discreta brutal]",
          "id": "o9"
        },
        {
          "k": "opt",
          "t": "Faca de bolso ou canivete suíço [1-dano contato útil pequeno]",
          "id": "o10"
        },
        {
          "k": "opt",
          "t": "Pistola pequena [2-dano perto barulhenta recarga]",
          "id": "o11"
        },
        {
          "k": "opt",
          "t": "Rifle de caça [3-dano longe barulhenta recarga]",
          "id": "o12"
        },
        {
          "k": "opt",
          "t": "Marreta ou machado de incêndio [3-dano contato brutal]",
          "id": "o13"
        },
        {
          "k": "opt",
          "t": "Nunchaku [2-dano contato área]",
          "id": "o14"
        },
        {
          "k": "p",
          "t": "**Meio de transporte** (escolha um):"
        },
        {
          "k": "opt",
          "t": "Skate",
          "id": "o15"
        },
        {
          "k": "opt",
          "t": "Bicicleta",
          "id": "o16"
        },
        {
          "k": "opt",
          "t": "Carro seminovo em boas condições",
          "id": "o17"
        },
        {
          "k": "opt",
          "t": "Carro clássico em terríveis condições",
          "id": "o18"
        },
        {
          "k": "opt",
          "t": "Motocicleta",
          "id": "o19"
        },
        {
          "k": "opt",
          "t": "Van",
          "id": "o20"
        },
        {
          "k": "img",
          "src": "/mds/cartilhas/mundano-2.webp",
          "w": 220,
          "h": 256
        }
      ]
    ]
  },
  {
    "id": "profissional",
    "nome": "Profissional",
    "imagensPagina1": [],
    "titulo": "O Profissional",
    "lema": [
      "_A vida é um pouco estranha quando o seu emprego diário regular é caçar monstros. Ainda assim, esse é o trabalho que eu assumi quando entrei nesta companhia. Ele paga bem e os benefícios são bons. É como dizem: “Você não precisa ser louco para trabalhar aqui, mas com certeza ajuda!”._"
    ],
    "sorteEspecial": null,
    "criacao": "Para criar seu caçador Profissional, primeiro escolha e escreva um nome na primeira linha da folha. Então siga as instruções para decidir sua aparência, classificações, Agência, movimentos e equipamentos. Finalmente, se apresente e escolha o histórico.",
    "aparencia": [
      "Homem, mulher, oculto",
      "Rosto esculpido, rosto com cicatrizes, rosto sem barbear, rosto compassivo, rosto jovem, rosto velho, rosto determinado",
      "Terno sob medida, terno surrado, terno impecável, macacão de trabalho, roupa camuflada, uniforme paramilitar, jaleco"
    ],
    "classificacoes": [
      {
        "bra": 2,
        "esp": -1,
        "est": -1,
        "fir": 2,
        "sut": 0
      },
      {
        "bra": 1,
        "esp": 1,
        "est": 0,
        "fir": 2,
        "sut": -1
      },
      {
        "bra": -1,
        "esp": 1,
        "est": 0,
        "fir": 2,
        "sut": 1
      },
      {
        "bra": 0,
        "esp": 1,
        "est": 1,
        "fir": 2,
        "sut": -1
      },
      {
        "bra": -1,
        "esp": 2,
        "est": -1,
        "fir": 2,
        "sut": 0
      }
    ],
    "apresentacoes": "Quando você chegar aqui, espere que todos também cheguem para que vocês se apresentem juntos. Na sua vez descreva seu caçador e diga ao grupo o que eles sabem sobre você.",
    "historicoIntro": "Na sua vez escolha um destes para cada um dos caçadores:",
    "historico": [
      "Seu relacionamento com ele tem um potencial romântico. Até agora isto ainda não avançou.",
      "Ele está na lista de vigilância da Agência e você tem mantido um olho atento nele.",
      "Vocês são parentes. Diga a ele a proximidade.",
      "Vocês se encontraram em uma missão e trabalharam juntos extraoficialmente. Tiveram sucesso.",
      "Ele trabalhou com a Agência antes e era bem-visto por lá.",
      "Vocês eram amigos na época do treinamento, antes de a Agência recrutar você. Isso pode ter sido no exército, polícia ou alguma outra academia estranha — decidam os detalhes entre vocês.",
      "Ele arrastou você (e talvez sua equipe inteira) para fora de uma missão que estava totalmente ferrada.",
      "Você foi enviado para “lidar com ele” como um perigo para as políticas da Agência uma vez. Diga a ele como você resolveu isso."
    ],
    "subindo": [
      "Sempre que sua rolagem for 6 ou menos, ou quando um movimento determinar, marque uma caixa de experiência.",
      "Quando você tiver preenchido todas as cinco caixas de experiência, você sobe de nível. Apague todas as caixas e escolha uma melhoria da seguinte lista:"
    ],
    "melhorias": [
      "Receba +1 em Firmeza (máximo +3).",
      "Receba +1 em Sutileza (máximo +2).",
      "Receba +1 em Esperteza (máximo +2).",
      "Receba +1 em Braveza (máximo +2).",
      "Pegue outro movimento de Profissional.",
      "Pegue outro movimento de Profissional.",
      "Adicione uma nova marca de recurso para sua Agência _ou_ altere uma marca de burocracia.",
      "Ganhe uma equipe de caçadores de monstros da Agência sob seu comando.",
      "Pegue um movimento de outra cartilha.",
      "Pegue um movimento de outra cartilha."
    ],
    "melhoriasNota": [
      "Depois de você subir de nível _cinco_ vezes, você já pode ter melhorias avançadas além destas. Eles estão listados abaixo."
    ],
    "avancadas": [
      "Receba +1 em qualquer classificação (máximo +3).",
      "Mude este caçador para um novo tipo.",
      "Crie um segundo caçador para jogar junto com este.",
      "Marque dois dos movimentos básicos como avançados.",
      "Marque outros dois dos movimentos básicos como avançados.",
      "Aposente este caçador para uma vida segura.",
      "Algum ou todos os outros caçadores dos jogadores são contratados pela Agência. Eles recebem o movimento _Lidar com a Agência_, assim como salário e benefícios."
    ],
    "pagina2": [
      [
        {
          "k": "h",
          "t": "AGÊNCIA"
        },
        {
          "k": "p",
          "t": "Decida para quem você trabalha. Eles são um departamento desconhecido do governo, uma unidade militar secreta, uma equipe de polícia clandestina, uma cruzada de um indivíduo particular, uma corporação, uma equipe científica ou o que?"
        },
        {
          "k": "p",
          "t": "O objetivo da Agência é: destruir os monstros, estudar o sobrenatural, proteger as pessoas, ganhar poder ou outra coisa?"
        },
        {
          "k": "p",
          "t": "Escolha duas marcas de recursos e duas marcas de burocracia para a Agência:"
        },
        {
          "k": "p",
          "t": "**Recursos** (escolha duas):"
        },
        {
          "k": "opt",
          "t": "Bem armada",
          "id": "o1"
        },
        {
          "k": "opt",
          "t": "Bem financiada",
          "id": "o2"
        },
        {
          "k": "opt",
          "t": "Treinamento rigoroso",
          "id": "o3"
        },
        {
          "k": "opt",
          "t": "Processos oficiais",
          "id": "o4"
        },
        {
          "k": "opt",
          "t": "Identidades secretas",
          "id": "o5"
        },
        {
          "k": "opt",
          "t": "Escritórios por toda parte",
          "id": "o6"
        },
        {
          "k": "opt",
          "t": "Boas informações",
          "id": "o7"
        },
        {
          "k": "opt",
          "t": "Autoridade reconhecida",
          "id": "o8"
        },
        {
          "k": "opt",
          "t": "Dispositivos tecnológicos",
          "id": "o9"
        },
        {
          "k": "opt",
          "t": "Equipes de apoio",
          "id": "o10"
        },
        {
          "k": "p",
          "t": "**Burocracia** (escolha duas):"
        },
        {
          "k": "opt",
          "t": "Motivos duvidosos",
          "id": "o11"
        },
        {
          "k": "opt",
          "t": "Burocrática",
          "id": "o12"
        },
        {
          "k": "opt",
          "t": "Hierarquia sigilosa",
          "id": "o13"
        },
        {
          "k": "opt",
          "t": "Missões enigmáticas",
          "id": "o14"
        },
        {
          "k": "opt",
          "t": "Superiores hostis",
          "id": "o15"
        },
        {
          "k": "opt",
          "t": "Rivalidade entre departamentos",
          "id": "o16"
        },
        {
          "k": "opt",
          "t": "Cortes de fundos",
          "id": "o17"
        },
        {
          "k": "opt",
          "t": "Não faz prisioneiros",
          "id": "o18"
        },
        {
          "k": "opt",
          "t": "Captura alvos vivos",
          "id": "o19"
        }
      ],
      [
        {
          "k": "h",
          "t": "MOVIMENTOS"
        },
        {
          "k": "p",
          "t": "_Você recebe todos os movimentos básicos e quatro movimentos de caçador Profissional. Você recebe este:_"
        },
        {
          "k": "opt",
          "t": "**Lidar com a Agência:** Quando você **lidar com a Agência** pedindo ajuda, equipamentos ou dando desculpas por um fracasso, role +Esperteza. Com 10+, está tudo bem — seu pedido por equipamentos ou pessoal é aprovado ou seu deslize passa despercebido. Com 7–9, as coisas não são tão boas. Você pode ser repreendido por seus superiores e haverá outras consequências, mas você consegue o que precisa para completar o trabalho. Com uma falha, você está ferrado: você pode ser suspenso, ficar sob investigação ou apenas ter que ficar aturando cara feia. Você certamente não conseguirá nenhuma ajuda até conseguir deixar tudo em ordem.",
          "id": "o20",
          "fixed": true
        },
        {
          "k": "p",
          "t": "_Depois escolhe três destes:_"
        },
        {
          "k": "opt",
          "t": "**Suprimir emoções:** Se você quiser, você pode receber um bônus até +3 quando **agir sob pressão**. Para cada +1 que você usar, o Guardião reserva 1. Esta reserva pode ser gasta depois — uma por uma — para dar −1 em qualquer movimento _exceto_ **agir sob pressão**.",
          "id": "o21"
        },
        {
          "k": "opt",
          "t": "**Inabalável:** Ganhe +1 em Firmeza (máximo +3).",
          "id": "o22"
        },
        {
          "k": "opt",
          "t": "**Consciência combativa:** Você sempre sabe o que está acontecendo à sua volta e em que prestar atenção. Ganhe +1 de armadura (máximo [2-armadura]) além de qualquer bônus que tiver do seu equipamento.",
          "id": "o23"
        },
        {
          "k": "opt",
          "t": "**Ninguém fica pra trás:** Em combate, quando você **ajudar alguém a escapar**, role +Esperteza. Com 10+, você faz ele escapar sem impedimentos. Com 7–9, você _ou_ faz ele escapar, _ou_ não sofre dano, você escolhe. Com uma falha, você fracassa em levar ele para fora e você atraiu a atenção dos inimigos.",
          "id": "o24"
        },
        {
          "k": "img",
          "src": "/mds/cartilhas/profissional-1.webp",
          "w": 180,
          "h": 180
        }
      ],
      [
        {
          "k": "opt",
          "t": "**Gênio tático:** Quando você for **perceber uma enrascada**, você pode rolar +Firmeza em vez de +Esperteza.",
          "id": "o25"
        },
        {
          "k": "opt",
          "t": "**Médico:** Você tem um kit de primeiros socorros completo e o treinamento para curar pessoas. Quando você **executar primeiros socorros**, role +Firmeza. Com 10+, o paciente é estabilizado e curado de 2 de dano. Com 7– 9, escolha um: curar 2 de dano ou estabilizar as lesões. Com uma falha, você causa 1 de dano extra. Isto toma o lugar dos primeiros socorros normais.",
          "id": "o26"
        },
        {
          "k": "opt",
          "t": "**Mobilidade:** Você tem uma picape, van ou carro construído para caçar monstros. Escolha duas coisas boas e uma coisa ruim sobre ele.",
          "id": "o27"
        },
        {
          "k": "li",
          "t": "_Coisas boas:_ espaçoso; equipamento de vigilância; rápido; furtivo; intimidante; clássico; kit médico; espaço para dormir; kit de ferramentas; armas escondidas; anônimo; blindado (+1 em armadura internamente); resistente; jaula para monstro."
        },
        {
          "k": "li",
          "t": "_Coisas ruins:_ barulhento; chamativo; temperamental; surrado; beberrão de gasolina; desconfortável; lento; velho."
        },
        {
          "k": "h",
          "t": "EQUIPAMENTOS"
        },
        {
          "k": "p",
          "t": "Escolha uma arma pesada e duas armas normais."
        },
        {
          "k": "p",
          "t": "Você recebe _ou_ um colete a prova de balas [1-armadura oculto] _ou_ armadura de combate [2-armadura pesada] para proteção."
        },
        {
          "k": "p",
          "t": "**Armas pesadas** (escolha uma):"
        },
        {
          "k": "opt",
          "t": "Fuzil de assalto [3-dano longe área barulhenta recarga]",
          "id": "o28"
        },
        {
          "k": "opt",
          "t": "Lançador de granadas [4-dano longe área brutal barulhenta recarga]",
          "id": "o29"
        },
        {
          "k": "opt",
          "t": "Rifle sniper [4-dano longe]",
          "id": "o30"
        },
        {
          "k": "opt",
          "t": "Granadas [4-dano perto área brutal barulhenta]",
          "id": "o31"
        },
        {
          "k": "opt",
          "t": "Submetralhadora [3-dano perto área barulhenta recarga]",
          "id": "o32"
        },
        {
          "k": "p",
          "t": "**Armas normais** (escolha duas):"
        },
        {
          "k": "opt",
          "t": "Revólver .38 [2-dano perto recarga barulhenta]",
          "id": "o33"
        },
        {
          "k": "opt",
          "t": "Pistola 9mm [2-dano perto barulhenta]",
          "id": "o34"
        },
        {
          "k": "opt",
          "t": "Rifle de caça [2-dano longe barulhenta]",
          "id": "o35"
        },
        {
          "k": "opt",
          "t": "Espingarda [3-dano perto brutal barulhenta]",
          "id": "o36"
        },
        {
          "k": "opt",
          "t": "Facão [1-dano contato]",
          "id": "o37"
        }
      ]
    ]
  },
  {
    "id": "sinistro",
    "nome": "Sinistro",
    "imagensPagina1": [],
    "titulo": "O Sinistro",
    "lema": [
      "_Eu posso fazer coisas… coisas que pessoas normais não podem. Mas isso tem um preço — eu ainda não paguei tudo, mas a conta vai chegar logo. É melhor eu não te contar mais nada. Se você se aproximar demais você vai acabar se machucando._"
    ],
    "sorteEspecial": null,
    "criacao": "Para criar seu caçador Sinistro, primeiro escolha e escreva um nome na primeira linha da folha. Então siga as instruções para decidir sua aparência, classificações, movimentos, lado sombrio e equipamentos. Finalmente, se apresente e escolha o histórico.",
    "aparencia": [
      "Homem, mulher, menino, menina, oculto, andrógino",
      "Olhos ardentes, olhos sombrios, olhos doloridos, olhos vazios, olhos fixos, olhos penetrantes, olhos sombreados, olhos assustadores",
      "Roupas surradas, roupas casuais, roupas góticas, roupas elegantes, roupas de nerd"
    ],
    "classificacoes": [
      {
        "bra": -1,
        "esp": 1,
        "est": 2,
        "fir": 0,
        "sut": 1
      },
      {
        "bra": 1,
        "esp": 0,
        "est": 2,
        "fir": 1,
        "sut": -1
      },
      {
        "bra": -1,
        "esp": -1,
        "est": 2,
        "fir": 0,
        "sut": 2
      },
      {
        "bra": 1,
        "esp": 1,
        "est": 2,
        "fir": -1,
        "sut": 0
      },
      {
        "bra": 0,
        "esp": 2,
        "est": 2,
        "fir": -1,
        "sut": -1
      }
    ],
    "apresentacoes": "Quando você chegar aqui, espere que todos também cheguem para que vocês se apresentem juntos. Na sua vez descreva seu caçador e diga ao grupo o que eles sabem sobre você.",
    "historicoIntro": "Na sua vez escolha um destes para cada um dos caçadores:",
    "historico": [
      "Ele te ensinou a controlar seus poderes, pelo menos até o ponto em que você pode controlá-los.",
      "Vocês são parentes de sangue. Decidam juntos exatamente que tipo.",
      "Vocês estão casados ou romanticamente envolvidos. Decidam entre vocês a relação exata.",
      "Vocês são velhos amigos e confiam um no outro completamente.",
      "Você usou seus poderes nele uma vez. Decida se foi por um motivo egoísta ou não, e diga se ele sabe disso ou não.",
      "Vocês se conhecem faz algum tempo, mas desde que seus poderes se manifestaram você o mantém distante emocionalmente.",
      "Você espera que ele possa te ajudar a controlar seus poderes.",
      "Ele viu você usar seus poderes por motivos egoístas ou por vingança. Pergunte a ele quem era a vítima e diga o que você fez."
    ],
    "subindo": [
      "Sempre que sua rolagem for 6 ou menos, ou quando um movimento determinar, marque uma caixa de experiência.",
      "Quando você tiver preenchido todas as cinco caixas de experiência, você sobe de nível. Apague todas as caixas e escolha uma melhoria da seguinte lista:"
    ],
    "melhorias": [
      "Receba +1 em Estranheza (máximo +3).",
      "Receba +1 em Sutileza (máximo +2).",
      "Receba +1 em Firmeza (máximo +2).",
      "Receba +1 em Esperteza (máximo +2).",
      "Pegue outro movimento de Sinistro.",
      "Pegue outro movimento de Sinistro.",
      "Altere algumas, ou todas, as marcas do seu lado sombrio.",
      "Ganhe uma biblioteca mística, como a da opção de refúgio do Especialista.",
      "Pegue um movimento de outra cartilha.",
      "Pegue um movimento de outra cartilha."
    ],
    "melhoriasNota": [
      "Depois de você subir de nível _cinco_ vezes, você já pode ter melhorias avançadas além destas. Eles estão listados abaixo."
    ],
    "avancadas": [
      "Receba +1 em qualquer classificação (máximo +3).",
      "Mude este caçador para um novo tipo.",
      "Crie um segundo caçador para jogar junto com este.",
      "Marque dois dos movimentos básicos como avançados.",
      "Marque outros dois dos movimentos básicos como avançados.",
      "Aposente este caçador para uma vida segura.",
      "Você descobre como usar seus poderes com um custo menor. Remova uma marca de seu lado sombrio permanentemente."
    ],
    "pagina2": [
      [
        {
          "k": "h",
          "t": "MOVIMENTOS"
        },
        {
          "k": "p",
          "t": "_Você recebe todos os movimentos básicos e escolhe três movimentos de caçador Sinistro._"
        },
        {
          "k": "opt",
          "t": "**Telepatia:** Você pode ler os pensamentos de outras pessoas e colocar palavras nas mentes delas. Isso te permite **investigar um mistério** ou **perceber uma enrascada** sem precisar falar de fato. Você também pode **manipular alguém** sem falar. Você ainda rola os movimentos normalmente, exceto que as pessoas podem não estar esperando e estranhar a sua comunicação mental.",
          "id": "o1"
        },
        {
          "k": "opt",
          "t": "**Praga:** Quando você lançar um feitiço (com **usar magia**), além dos efeitos normais, você pode escolher um dos seguintes:",
          "id": "o2"
        },
        {
          "k": "li",
          "t": "O alvo contrai uma doença."
        },
        {
          "k": "li",
          "t": "O alvo imediatamente sofre dano [2-dano mágico ignora-armadura]."
        },
        {
          "k": "li",
          "t": "O alvo quebra alguma coisa preciosa ou importante."
        },
        {
          "k": "opt",
          "t": "**A visão:** Você pode ver o invisível, especialmente espíritos e influências mágicas. Você pode se comunicar (e talvez até mesmo fazer acordos) com os espíritos que você vê. Com isso você tem mais oportunidades para descobrir pistas quando você for **investigar um mistério**.",
          "id": "o3"
        },
        {
          "k": "opt",
          "t": "**Premonições:** Ao **iniciar cada mistério**, role +Estranheza. Com 10+, você recebe uma visão detalhada de alguma coisa ruim que ainda vai acontecer. Você recebe +1 adiante para impedir que isso se torne verdade e marca experiência se você a impedir. Com 7–9, você recebe imagens nebulosas de alguma coisa ruim que ainda vai acontecer: marque experiência se você a impedir. Com uma falha, você recebe uma visão de alguma coisa ruim acontecendo com você e o Guardião reserva 3, para ser gasta (uma por vez) como penalidades nas rolagens que você fizer.",
          "id": "o4"
        },
        {
          "k": "opt",
          "t": "**Palpites:** Quando **ocorrer alguma coisa ruim** (ou estiver prestes a ocorrer) em algum lugar que você não está, role +Esperteza. Com 10+, você sabe onde precisa ir, bem a tempo de chegar lá. Com 7–9, você chega lá tarde — a tempo de intervir, mas não prevenir totalmente. Com uma falha, você chega lá bem a tempo para você mesmo entrar em apuros.",
          "id": "o5"
        }
      ],
      [
        {
          "k": "opt",
          "t": "**Sintonizar:** Você pode **sintonizar sua mente com um monstro ou lacaio**. Role +Estranheza. Com 10+, reserve 3. Com 7–9, reserve 1. Com uma falha, o monstro percebe você. Gaste uma reserva para fazer ao Guardião uma das seguintes perguntas e ganhar +1 constante enquanto agir de acordo com as respostas:",
          "id": "o6"
        },
        {
          "k": "li",
          "t": "Onde está a criatura agora?"
        },
        {
          "k": "li",
          "t": "O que ela está planejando fazer agora?"
        },
        {
          "k": "li",
          "t": "Quem ela vai atacar em seguida?"
        },
        {
          "k": "li",
          "t": "Quem ela considera a maior ameaça?"
        },
        {
          "k": "li",
          "t": "Como eu posso atrair a atenção dela?"
        },
        {
          "k": "opt",
          "t": "**O grande esconjuro:** Você pode usar seus poderes para **partir pra porrada**: role +Estranheza em vez de +Braveza. O ataque é [2-dano perto chamativa ignora-armadura]. Com uma falha, a magia se vira contra você.",
          "id": "o7"
        },
        {
          "k": "opt",
          "t": "**Mau-olhado:** Você pode estimular coincidências a ocorrerem, da forma que você quiser. Quando você **jogar mau-olhado num alvo**, role +Estranheza. Com 10+, reserve 2. Com 7–9, reserve 1. Com uma falha, o Guardião reserva 2 sobre você para ser usado da mesma forma. Gaste sua reserva para:",
          "id": "o8"
        },
        {
          "k": "li",
          "t": "Interferir com um caçador, dando a ele −1 adiante."
        },
        {
          "k": "li",
          "t": "Ajudar um caçador, dando a ele +1 adiante, ao interferir com o inimigo dele."
        },
        {
          "k": "li",
          "t": "Interferir com o que um monstro, lacaio ou espectador está tentando fazer."
        },
        {
          "k": "li",
          "t": "Causar [1-dano] no alvo devido a um acidente."
        },
        {
          "k": "li",
          "t": "O alvo encontra alguma coisa que você deixou para ele."
        },
        {
          "k": "li",
          "t": "O alvo perde alguma coisa para você encontrar em seguida."
        },
        {
          "k": "img",
          "src": "/mds/cartilhas/sinistro-1.webp",
          "w": 202,
          "h": 227
        }
      ],
      [
        {
          "k": "h",
          "t": "SEU LADO SOMBRIO"
        },
        {
          "k": "p",
          "t": "Seus poderes vêm de uma fonte desagradável, e algumas vezes você fica tentado a fazer coisas que não deveria. Essas coisas podem ser ordens do que quer que concedeu seus poderes ou impulsos que crescem no seu subconsciente. Alguma coisa assim. O que quer que seja, é perturbador."
        },
        {
          "k": "p",
          "t": "Escolha três marcas para seu lado sombrio:"
        },
        {
          "k": "opt",
          "t": "Violência",
          "id": "o9"
        },
        {
          "k": "opt",
          "t": "Depressão",
          "id": "o10"
        },
        {
          "k": "opt",
          "t": "Segredos",
          "id": "o11"
        },
        {
          "k": "opt",
          "t": "Luxúria",
          "id": "o12"
        },
        {
          "k": "opt",
          "t": "Barganha sombria",
          "id": "o13"
        },
        {
          "k": "opt",
          "t": "Culpa",
          "id": "o14"
        },
        {
          "k": "opt",
          "t": "Sem alma",
          "id": "o15"
        },
        {
          "k": "opt",
          "t": "Vício",
          "id": "o16"
        },
        {
          "k": "opt",
          "t": "Alterações de humor",
          "id": "o17"
        },
        {
          "k": "opt",
          "t": "Fúria",
          "id": "o18"
        },
        {
          "k": "opt",
          "t": "Autodestruição",
          "id": "o19"
        },
        {
          "k": "opt",
          "t": "Pouco autocontrole",
          "id": "o20"
        },
        {
          "k": "opt",
          "t": "Desejo de poder",
          "id": "o21"
        },
        {
          "k": "opt",
          "t": "Alucinações",
          "id": "o22"
        },
        {
          "k": "opt",
          "t": "Dor",
          "id": "o23"
        },
        {
          "k": "opt",
          "t": "Paranoia",
          "id": "o24"
        },
        {
          "k": "p",
          "t": "O Guardião pode pedir para você fazer coisas desagradáveis (de acordo com as marcas), quando seus poderes exigirem. Se você fizer o que for pedido, marque experiência. Se você não fizer, então seus poderes ficam indisponíveis até o final do mistério (ou até que você ceda a pressão). Conforme você for marcando caixas de Sorte, estes pedidos começarão a ficar cada vez maiores e mais desagradáveis."
        },
        {
          "k": "h",
          "t": "EQUIPAMENTOS"
        },
        {
          "k": "p",
          "t": "Você recebe duas armas normais e qualquer item ou amuleto mágico que você use para invocar seus poderes."
        },
        {
          "k": "p",
          "t": "**Armas normais** (escolha duas):"
        },
        {
          "k": "opt",
          "t": "Revólver .38 [2-dano perto recarga barulhenta]",
          "id": "o25"
        },
        {
          "k": "opt",
          "t": "Pistola 9mm [2-dano perto barulhenta]",
          "id": "o26"
        },
        {
          "k": "opt",
          "t": "Rifle de caça [2-dano longe barulhenta]",
          "id": "o27"
        },
        {
          "k": "opt",
          "t": "Espingarda [3-dano perto brutal barulhenta]",
          "id": "o28"
        },
        {
          "k": "opt",
          "t": "Facão [1-dano contato]",
          "id": "o29"
        }
      ]
    ]
  },
  {
    "id": "viajante",
    "nome": "Viajante",
    "imagensPagina1": [
      {
        "src": "/mds/cartilhas/viajante-1.webp",
        "w": 230,
        "h": 115
      }
    ],
    "titulo": "O Viajante",
    "lema": [
      "_Todas as suas previsões sobre o futuro estão erradas… Eu não vou voltar para aquele mundo apocalíptico enquanto não fizer tudo que puder para garantir um futuro melhor._"
    ],
    "sorteEspecial": null,
    "criacao": "Para criar seu caçador Viajante, primeiro escolha e escreva um nome na primeira linha da folha. Então siga as instruções para decidir sua aparência, classificações, meio de transporte, movimentos e equipamentos. Finalmente, se apresente e escolha o histórico.",
    "aparencia": [
      "Homem, mulher, andrógino, indistinto",
      "Rosto empolgado, rosto jovial, rosto maluco, rosto severo, rosto abatido, rosto inexpressivo, rosto triste, rosto esperançoso",
      "Roupas formais, roupas casuais, roupas berrantes, roupas futuristas, trajes improvisados, traje tático"
    ],
    "classificacoes": [
      {
        "bra": -1,
        "esp": 2,
        "est": 0,
        "fir": 1,
        "sut": 1
      },
      {
        "bra": -1,
        "esp": 2,
        "est": 0,
        "fir": -1,
        "sut": 2
      },
      {
        "bra": -1,
        "esp": 2,
        "est": 0,
        "fir": 2,
        "sut": -1
      },
      {
        "bra": 0,
        "esp": 1,
        "est": 0,
        "fir": 2,
        "sut": 0
      },
      {
        "bra": 2,
        "esp": -1,
        "est": 0,
        "fir": 2,
        "sut": -1
      }
    ],
    "apresentacoes": "Quando você chegar aqui, espere que todos também cheguem para que vocês se apresentem juntos. Na sua vez descreva seu caçador e diga ao grupo o que eles sabem sobre você.",
    "historicoIntro": "Na sua vez escolha um destes para cada um dos caçadores:",
    "historico": [
      "Ele viu você chegando do futuro e te enfrentou pensando que fosse um dos vilões. Pergunte a ele como você o convenceu.",
      "Ele te ensinou como se virar no “mundo moderno”, você ainda sofre para entender como tudo funciona, mas ele está lá para ajudar.",
      "Ele é algum tipo de antepassado. Diga a ele o que ele é.",
      "Ele te ajuda a lidar com o sobrenatural, tentando tirar você da dependência de tecnologia.",
      "Ele é um excelente companheiro de viagem. Você espera um dia poder levá-lo até sua era e mostrar o futuro para ele.",
      "Ele te lembra uma pessoa querida da sua era, você vai protegê-lo a todo custo.",
      "Um romance eternamente platônico. Vocês seriam um ótimo casal, mas você não quer se envolver demais nesta era.",
      "Ele te compreende perfeitamente como se tivesse vindo da mesma era que você, isto é reconfortante e te dá confiança total nele."
    ],
    "subindo": [
      "Sempre que sua rolagem for 6 ou menos, ou quando um movimento determinar, marque uma caixa de experiência.",
      "Quando você tiver preenchido todas as cinco caixas de experiência, você sobe de nível. Apague todas as caixas e escolha uma melhoria da seguinte lista:"
    ],
    "melhorias": [
      "Receba +1 em Braveza (máximo +3).",
      "Receba +1 em Esperteza (máximo +3).",
      "Receba +1 em Firmeza (máximo +3).",
      "Receba +1 em Sutileza (máximo +3).",
      "Receba +1 em Estranheza (máximo +2).",
      "Pegue outro movimento de Viajante.",
      "Pegue outro movimento de Viajante.",
      "Ganhe um aliado.",
      "Pegue um movimento de outra cartilha.",
      "Pegue um movimento de outra cartilha."
    ],
    "melhoriasNota": [
      "Depois de você subir de nível _cinco_ vezes, você já pode ter melhorias avançadas além destas."
    ],
    "avancadas": [
      "Receba +1 em qualquer classificação (máximo +3).",
      "Mude este caçador para um novo tipo.",
      "Crie um segundo caçador para jogar junto com este.",
      "Marque dois dos movimentos básicos como avançados.",
      "Marque outros dois dos movimentos básicos como avançados.",
      "Aposente este caçador para uma vida segura.",
      "Apague uma caixa marcada de Sorte.",
      "Elimine o movimento _Cria da tecnologia_. Você aprendeu a lidar com o sobrenatural, não recebendo mais penalidades para isto."
    ],
    "pagina2": [
      [
        {
          "k": "h",
          "t": "MEIO DE TRANSPORTE, ESCOLHA UM:"
        },
        {
          "k": "p",
          "t": "Você pode visitar eventos futuros, passados ou lugares remotos, tanto sozinho quanto com toda a equipe."
        },
        {
          "k": "p",
          "t": "O Guardião deve decidir como a viagem no tempo vai funcionar: passado mutável, linhas temporais alternativas, pequenas mudanças produzem grandes alterações, etc."
        },
        {
          "k": "p",
          "t": "Quando for **viajar no tempo e no espaço**, role +Esperteza. Com 10+, você chega no lugar desejado e no tempo desejado. Com 7–9, você chega no lugar desejado _ou_ no tempo desejado, você decide. Com uma falha, vocês estão perdidos, isto provavelmente é bastante sério."
        },
        {
          "k": "p",
          "t": "Escolha o meio como você viaja pelo tempo. Cada método de viagem possui pontos positivos e negativos. Vale a pena lembrar que viajar no tempo não é de forma alguma uma viagem segura."
        },
        {
          "k": "opt",
          "t": "**É maior por dentro:** Sua máquina do tempo é multidimensional, sendo tão pequena quanto uma cabine telefônica por fora, mas tão grande quanto uma nave espacial por dentro. Coisas dentro dela não pode ser rastreadas por meios normais. Para viajar ela some de um lugar e aparece em outro, mas de outra forma ela é completamente estacionária e não pode ser transportada de forma alguma.",
          "id": "o1"
        },
        {
          "k": "opt",
          "t": "**Teletransporte:** Você pode se teletransportar instantaneamente se tiver clara linha de visão do destino ou se o conhecer muito bem, do contrário precisa estudar o contínuo espaço-tempo por algumas horas, ou até dias, para planejar a viagem não acabar embaixo da terra ou então um quilômetro acima do chão.",
          "id": "o2"
        },
        {
          "k": "opt",
          "t": "**88 milhas por hora:** Sua máquina do tempo se parece com um carro ou uma van, não chamando muita atenção pela rua. Você pode utilizá-la para se locomover como qualquer outro veículo, mas ela depende de combustíveis, peças de manutenção, estradas, etc.",
          "id": "o3"
        },
        {
          "k": "opt",
          "t": "**Portal temporal:** Você abre um portal temporal até o seu destino. Você só pode abrir um portal por vez, e ele permanecerá ativo por quanto tempo desejar. Ele permite que você o atravesse em qualquer direção quantas vezes quiser, mas um portal não vigiado também pode ser atravessado por qualquer pessoa, ou monstro…",
          "id": "o4"
        }
      ],
      [
        {
          "k": "h",
          "t": "MOVIMENTOS"
        },
        {
          "k": "p",
          "t": "_Você recebe todos os movimentos básicos e quatro movimentos de caçador Viajante. Você recebe este:_"
        },
        {
          "k": "opt",
          "t": "**Cria da tecnologia:** Você é extremamente dependente da tecnologia, tendo dificuldades em se relacionar com o sobrenatural. Você recebe −1 constante em **usar magia** ou outros movimentos relacionados ao sobrenatural ou à magia.",
          "id": "o5",
          "fixed": true
        },
        {
          "k": "p",
          "t": "_Depois escolhe três destes:_"
        },
        {
          "k": "opt",
          "t": "**Efeito borboleta:** Ao **iniciar cada mistério** escolha uma classificação para receber +1 (máximo +3) e outra para receber −1 (mínimo −2) durante este mistério. Suas ações perturbam o espaço-tempo, e a oscilação de suas características é um reflexo disso.",
          "id": "o6"
        },
        {
          "k": "opt",
          "t": "**Historiador:** Quando você **investigar um mistério** ou **perceber uma enrascada** você pode escolher perguntar “Por que isto soa familiar?”. Se possível o Guardião vai descrever como uma situação parecida já aconteceu na história passada ou futura do mundo.",
          "id": "o7"
        },
        {
          "k": "opt",
          "t": "**Inventor:** Se você quiser **construir, reparar ou estudar um dispositivo** o Guardião dirá quanto tempo vai levar e quais equipamentos serão necessários.",
          "id": "o8"
        },
        {
          "k": "opt",
          "t": "**Presciência:** Ataques que podem causar sua morte surgem na sua memória instantaneamente. Quando você **sofrer dano e ficar instável**, você pode rolar +Estranheza. Com 10+, você lembrou ataque e pôde evitá-lo completamente. Com 7–9, a memória demorou para surgir, receba 1 de dano a menos _ou_ não fique instável. Com uma falha, a lembrança estava incorreta e sua esquiva te desequilibrou, além do dano você recebe −1 adiante.",
          "id": "o9"
        },
        {
          "k": "opt",
          "t": "**Treinamento neural:** Quando você **precisar fazer algo que exige treino prático**, como desarmar uma bomba ou pilotar um helicóptero, você já tem as informações implantadas em seu cérebro. Você ainda precisa **agir sob pressão**, mas sabe o que deve fazer.",
          "id": "o10"
        },
        {
          "k": "opt",
          "t": "**Tecnologia avançada é igual magia:** Você pode reproduzir os efeitos do movimento **usar magia** com ferramentas tecnológicas. Você não rola dados para isto, mas deve escolher um _efeito_ e um _defeito_. Isso não é magia, portanto o efeito não terá a marca [mágica] e não funcionará em coisas afetadas apenas por magia. O Guardião pode exigir um ou mais requisitos adequados ao efeito.",
          "id": "o11"
        },
        {
          "k": "opt",
          "t": "**Sem paradoxos:** Quando você disser porque alguma coisa deve acontecer para garantir o futuro, você pode **dar uma mão** para outro caçador e conceder +1 na rolagem dele como se tivesse rolado 10+. Você ainda precisa descrever como está ajudando.",
          "id": "o12"
        }
      ],
      [
        {
          "k": "opt",
          "t": "**Androide/Ciborgue:** Você possui melhoramentos cibernéticos ou talvez você seja metade máquina. Além de força sobre-humana, seus socos e chutes são ataques [3-dano contato].",
          "id": "o13"
        },
        {
          "k": "opt",
          "t": "**Disfarce psíquico:** Você recebe +1 constante em rolagens para evitar ser detectado e passar despercebido. Você também recebe +1 quando **manipular alguém** fingindo ser outra pessoa.",
          "id": "o14"
        },
        {
          "k": "h",
          "t": "EQUIPAMENTOS"
        },
        {
          "k": "p",
          "t": "Você pode ter dois dispositivos tecnológicos e uma arma de proteção."
        },
        {
          "k": "p",
          "t": "**Dispositivos tecnológicos** (escolha dois):"
        },
        {
          "k": "opt",
          "t": "_Binóculos fotônicos_: Capaz de enxergar na escuridão total e em diferentes espectros, incluindo visão infravermelha.",
          "id": "o15"
        },
        {
          "k": "opt",
          "t": "_Chave de fenda sônica_: Capaz de reparar, ou estragar, aparelhos mecânicos e eletrônicos simples (ex: rádios, fechaduras, armas, etc).",
          "id": "o16"
        },
        {
          "k": "opt",
          "t": "_Guia de viagem_: Um pequeno livro eletrônico contendo todo o conhecimento histórico humano até a era atual.",
          "id": "o17"
        },
        {
          "k": "opt",
          "t": "_Laboratório portátil_: Um pequeno dispositivo capaz de diagnosticar doenças, venenos e condições anormais com uma gota de sangue.",
          "id": "o18"
        },
        {
          "k": "opt",
          "t": "_Localizador universal_: Indica a posição exata no tempo e espaço. Só pode ser bloqueado com magia ou altos níveis de radiação.",
          "id": "o19"
        },
        {
          "k": "opt",
          "t": "_Projetor de hologramas_: Projeta um holograma do tamanho de uma pessoa (gravado ou ao vivo) que parece real até ser tocado.",
          "id": "o20"
        },
        {
          "k": "opt",
          "t": "_Tradutor instantâneo_: Garante a fala e compreensão de qualquer idioma natural (não funciona com idiomas mágicos).",
          "id": "o21"
        },
        {
          "k": "p",
          "t": "**Arma de proteção** (escolha uma):"
        },
        {
          "k": "opt",
          "t": "Facão [1-dano contato]",
          "id": "o22"
        },
        {
          "k": "opt",
          "t": "Revólver comum [2-dano perto recarga barulhenta]",
          "id": "o23"
        },
        {
          "k": "opt",
          "t": "Espingarda [3-dano perto brutal barulhenta]",
          "id": "o24"
        },
        {
          "k": "opt",
          "t": "Arma futurista leve [1-dano] (adicione 1 alcance e 3 marcas)",
          "id": "o25"
        },
        {
          "k": "opt",
          "t": "Arma futurista pesada [3-dano] (adicione 1 alcance e 1 marca)",
          "id": "o26"
        }
      ]
    ]
  }
]

export const CARTILHAS_BY_ID = Object.fromEntries(CARTILHAS.map(c => [c.id, c]))
