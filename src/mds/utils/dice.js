// Dados do Monstro da Semana: movimentos rolam 2d6 + classificação.
// 10+ sucesso total · 7–9 sucesso parcial · 6− falha (marca experiência).

const d = (sides) => Math.floor(Math.random() * sides) + 1

export function outcomeOf(total) {
  if (total >= 10) return { key: 'full', label: 'Sucesso total' }
  if (total >= 7) return { key: 'partial', label: 'Sucesso parcial' }
  return { key: 'miss', label: 'Falha — marque experiência' }
}

export function rollMove(modifier = 0) {
  const dice = [d(6), d(6)]
  const mod = Number(modifier) || 0
  const total = dice[0] + dice[1] + mod
  return { dice, mod, total, outcome: outcomeOf(total).key }
}

// Expressão livre tipo "2d6+1", "d20", "3d6-2" (até 20 dados de até 100 faces)
export function rollExpression(expr) {
  const m = String(expr).replace(/\s+/g, '').toLowerCase().match(/^(\d{0,2})d(\d{1,3})([+-]\d{1,3})?$/)
  if (!m) return null
  const count = Math.min(20, Math.max(1, parseInt(m[1] || '1', 10)))
  const sides = Math.min(100, Math.max(2, parseInt(m[2], 10)))
  const mod = m[3] ? parseInt(m[3], 10) : 0
  const dice = Array.from({ length: count }, () => d(sides))
  const total = dice.reduce((a, b) => a + b, 0) + mod
  return { expr: `${count}d${sides}${mod ? (mod > 0 ? `+${mod}` : mod) : ''}`, dice, mod, total }
}
