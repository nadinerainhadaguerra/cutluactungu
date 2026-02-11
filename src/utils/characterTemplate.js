export const ATTRIBUTES = [
  { id: 'agility', name: 'AGILIDADE' },
  { id: 'strength', name: 'FORÇA' },
  { id: 'coordination', name: 'COORDENAÇÃO' },
  { id: 'discernment', name: 'DISCERNIMENTO' },
  { id: 'reason', name: 'RAZÃO' },
  { id: 'will', name: 'VONTADE' },
]

export const SKILLS_DATA = [
  {
    id: 'academia',
    name: 'ACADEMIA',
    focuses: ['Arte', 'Ciência', 'Criptografia', 'Finanças', 'História', 'Linguística', 'Ocultismo'],
  },
  {
    id: 'atletismo',
    name: 'ATLETISMO',
    focuses: ['Arremessar', 'Condicionamento Físico', 'Corrida', 'Escalar', 'Levantamento', 'Natação'],
  },
  {
    id: 'combater',
    name: 'COMBATER',
    focuses: ['Armas Brancas', 'Armas Pesadas', 'Combate Desarmado', 'Combate Próximo', 'Discernir Ameaças', 'Armas Exóticas', 'Rifles e Fuzis', 'Pistolas'],
  },
  {
    id: 'engenharia',
    name: 'ENGENHARIA',
    focuses: ['Arquitetura', 'Eletrônica', 'Engenharia de Combate', 'Engenharia Mecânica', 'Explosivos'],
  },
  {
    id: 'furtividade',
    name: 'FURTIVIDADE',
    focuses: ['Camuflagem', 'Disfarces', 'Furtividade Rural', 'Furtividade Urbana'],
  },
  {
    id: 'medicina',
    name: 'MEDICINA',
    focuses: ['Cirurgia', 'Doenças Infecciosas', 'Farmacologia', 'Primeiros Socorros', 'Psiquiatria', 'Toxicologia'],
  },
  {
    id: 'observar',
    name: 'OBSERVAR',
    focuses: ['Audição', 'Instintos', 'Olfato e Paladar', 'Visão'],
  },
  {
    id: 'persuasao',
    name: 'PERSUASÃO',
    focuses: ['Charme', 'Dissimulação', 'Insinuação', 'Intimidação', 'Invocação', 'Negociação', 'Retórica'],
  },
  {
    id: 'resiliencia',
    name: 'RESILIÊNCIA',
    focuses: ['Disciplina', 'Fortitude', 'Imunidade'],
  },
  {
    id: 'sobrevivencia',
    name: 'SOBREVIVÊNCIA',
    focuses: ['Caça', 'Forragear', 'Misticismo', 'Orientação', 'Rastrear', 'Treinar Animais'],
  },
  {
    id: 'taticas',
    name: 'TÁTICAS',
    focuses: ['Aeronáutica', 'Exército', 'Liderança', 'Marinha', 'Operações Secretas', 'Projetos Técnicos'],
  },
  {
    id: 'veiculos',
    name: 'VEÍCULOS',
    focuses: ['Aeronaves', 'Carros', 'Embarcações', 'Motocicletas', 'Tanques', 'Veículos Pesados'],
  },
]

export function createCharacterTemplate(name, password) {
  const attributes = {}
  ATTRIBUTES.forEach(attr => {
    attributes[attr.id] = { graduation: '', additionalDamage: '' }
  })

  const skills = {}
  SKILLS_DATA.forEach(skill => {
    skills[skill.id] = { graduation: '', focuses: [] }
  })

  return {
    name,
    password,
    nationality: '',
    rank: '',
    archetype: '',
    background: '',
    characteristic: '',
    personalTruths: ['', '', '', ''],
    stress: Array(24).fill(false),
    courage: '',
    wounds: Array(5).fill(false),
    armor: '',
    languages: [],
    fortune: '',
    attributes,
    skills,
    belongings: Array(12).fill(''),
    weapons: [],
    biography: '',
    talents: Array(7).fill(null).map(() => ({
      name: '', keyword: '', effect: '',
    })),
    spells: Array(7).fill(null).map(() => ({
      name: '', skill: '', difficulty: '', cost: '', duration: '', effect: '', momentum: '',
    })),
    power: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}
