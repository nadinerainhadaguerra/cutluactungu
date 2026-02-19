function rollSingleDie(sides) {
  return Math.floor(Math.random() * sides) + 1
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
