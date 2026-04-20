function rollSingleDie(sides) {
  return Math.floor(Math.random() * sides) + 1
}

// Dado de Desafio (Challenge Die): d6 com faces especiais
// 1 → 1 dano | 2 → 2 dano | 3 → 0 | 4 → 0 | 5 → ⚔ + 1 dano | 6 → ⚔ + 1 dano
export function rollChallengeDice(n) {
  const dice = []
  let totalDamage = 0
  let totalEffects = 0

  for (let i = 0; i < n; i++) {
    const face = rollSingleDie(6)
    let damage = 0
    let effect = false

    if (face === 1) {
      damage = 1
    } else if (face === 2) {
      damage = 2
    } else if (face === 3 || face === 4) {
      // 0 dano, sem efeito
    } else { // face === 5 ou 6
      effect = true
      damage = 1
    }

    totalDamage += damage
    if (effect) totalEffects++
    dice.push({ face, damage, effect })
  }

  return { dice, totalDamage, totalEffects, count: n }
}

export function parseDiceExpression(input) {
  const expression = input.replace(/\s+/g, '')

  if (!expression) {
    return { error: 'Expressão vazia.' }
  }

  const dicePattern = /(\d+)[dD](\d+)/g
  const details = []

  const withRolls = expression.replace(dicePattern, (match, countStr, sidesStr) => {
    const count = parseInt(countStr, 10)
    const sides = parseInt(sidesStr, 10)

    if (count < 1 || count > 100) {
      return 'NaN'
    }
    if (sides < 1 || sides > 1000) {
      return 'NaN'
    }

    const rolls = []
    for (let i = 0; i < count; i++) {
      rolls.push(rollSingleDie(sides))
    }
    const sum = rolls.reduce((a, b) => a + b, 0)

    details.push({
      notation: match,
      rolls,
      sum,
    })

    return sum.toString()
  })

  if (/[dD]/.test(withRolls)) {
    return { error: 'Formato de dado inválido.' }
  }

  if (!/^[\d+\-*/().]+$/.test(withRolls)) {
    return { error: 'Expressão contém caracteres inválidos.' }
  }

  try {
    const result = Function('"use strict"; return (' + withRolls + ')')()

    if (typeof result !== 'number' || !isFinite(result)) {
      return { error: 'Resultado inválido.' }
    }

    return {
      expression,
      evaluated: withRolls,
      details,
      result: Math.floor(result * 100) / 100,
    }
  } catch {
    return { error: 'Expressão matemática inválida.' }
  }
}

export function formatRollResult(rollData) {
  if (rollData.error) {
    return `Erro: ${rollData.error}`
  }

  let text = `${rollData.expression} = `
  if (rollData.details.length > 0) {
    const parts = rollData.details.map(d => {
      return `${d.notation} [${d.rolls.join(', ')}]=${d.sum}`
    })
    text += parts.join(' ')
    text += ` => `
  }
  text += `**${rollData.result}**`

  return text
}
