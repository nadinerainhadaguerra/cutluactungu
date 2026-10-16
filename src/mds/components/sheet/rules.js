import { CARTILHAS, CARTILHAS_BY_ID } from '../../data/cartilhas'
import { REGRAS, EFEITOS_USAR_MAGIA } from '../../data/regras'

// Lógica das escolhas da ficha: seções, grupos com limite, melhorias e seus efeitos.

export const STATS = [
  { key: 'bra', name: 'Braveza', moves: ['Partir pra porrada', 'Proteger alguém'] },
  { key: 'esp', name: 'Esperteza', moves: ['Investigar um mistério', 'Perceber uma enrascada'] },
  { key: 'est', name: 'Estranheza', moves: ['Usar magia'] },
  { key: 'fir', name: 'Firmeza', moves: ['Agir sob pressão', 'Dar uma mão'] },
  { key: 'sut', name: 'Sutileza', moves: ['Manipular alguém'] },
]
export const STAT_NAME = Object.fromEntries(STATS.map(s => [s.key, s.name]))
const STAT_KEY = Object.fromEntries(STATS.map(s => [s.name, s.key]))
export const BASIC_MOVES = STATS.flatMap(s => s.moves)

export const plain = (t = '') => t.replace(/\*\*|_/g, '')
export const regrasDe = (c) => REGRAS[c?.id] || {}

export function expand(opts) {
  if (Array.isArray(opts)) return opts
  const [a, b] = opts.split('-').map(s => parseInt(s.slice(1), 10))
  return Array.from({ length: b - a + 1 }, (_, i) => `o${a + i}`)
}

// ---------- listas lidas do texto da cartilha ----------

function splitTop(s, sep) {
  const out = []
  let depth = 0
  let cur = ''
  for (const ch of s) {
    if (ch === '(' || ch === '[') depth++
    if (ch === ')' || ch === ']') depth--
    if (ch === sep && depth === 0) { out.push(cur); cur = '' } else cur += ch
  }
  out.push(cur)
  return out
}

function cutAtPeriod(s) {
  let depth = 0
  for (let i = 0; i < s.length; i++) {
    const ch = s[i]
    if (ch === '(' || ch === '[') depth++
    if (ch === ')' || ch === ']') depth--
    if (ch === '.' && depth === 0 && (i === s.length - 1 || s[i + 1] === ' ')) return s.slice(0, i)
  }
  return s
}

// Opções de uma escolha interna, extraídas mecanicamente do texto (nunca digitadas à mão).
export function subOptions(cfg, opt, lis) {
  if (cfg.listaFixa === 'usarMagia') return EFEITOS_USAR_MAGIA.map(l => ({ label: l, full: l }))
  if (cfg.labels) return cfg.labels.map(l => ({ label: l, full: l }))
  const { depois, sep, li } = cfg.lista
  let src
  if (li !== undefined) {
    const t = plain(lis?.[li]?.t || '')
    src = t.slice(t.indexOf(':') + 1)
  } else {
    const t = plain(opt.t)
    const i = t.indexOf(depois)
    if (i < 0) return []
    src = t.slice(i + depois.length)
  }
  const parts = splitTop(cutAtPeriod(src), sep).map(s => s.trim()).filter(Boolean)
  if (sep === ',' && parts.length) parts.push(...parts.pop().split(/\s+ou\s+/))
  return parts.map(full => ({ label: full.split(/\s[[(]/)[0].trim(), full }))
}

// ---------- seções da Página 2 ----------

const sectionCache = new Map()
export function sectionsOf(c) {
  if (sectionCache.has(c.id)) return sectionCache.get(c.id)
  const out = []
  let cur = { titulo: null, items: [] }
  for (const it of c.pagina2.flat()) {
    if (it.k === 'h') {
      if (cur.titulo || cur.items.length) out.push(cur)
      cur = { titulo: it.t, items: [] }
    } else cur.items.push(it)
  }
  if (cur.titulo || cur.items.length) out.push(cur)
  sectionCache.set(c.id, out)
  return out
}

// Opção com os itens (•) logo abaixo dela
export function optionBlock(c, id) {
  const items = c.pagina2.flat()
  const i = items.findIndex(it => it.id === id)
  if (i < 0) return null
  const lis = []
  for (let j = i + 1; items[j]?.k === 'li'; j++) lis.push(items[j])
  return { opt: items[i], lis }
}

// Movimentos de uma cartilha (seção MOVIMENTOS), para "pegue um movimento de outra cartilha"
export function movimentosDe(c) {
  const sec = sectionsOf(c).find(s => s.titulo === 'MOVIMENTOS')
  return (sec?.items || []).filter(it => it.k === 'opt')
}

export const moveRef = (cartilhaId, optId) => `${cartilhaId}:${optId}`
export function resolveMove(ref) {
  const [cid, oid] = String(ref || '').split(':')
  const c = CARTILHAS_BY_ID[cid]
  const block = c && optionBlock(c, oid)
  return block ? { c, ...block } : null
}
export const moveTitle = (opt) => {
  const m = plain(opt.t).match(/^([^:.]+)[:.]/)
  return m ? m[1].trim() : plain(opt.t).slice(0, 40)
}

export const outrasCartilhas = (c) => CARTILHAS.filter(x => x.id !== c.id)

// ---------- melhorias ----------

export function classificarMelhoria(text, tipo) {
  const t = plain(text)
  const stat = t.match(/^Receba \+1 em (Braveza|Esperteza|Estranheza|Firmeza|Sutileza) \(máximo \+(\d)\)/)
  if (stat) return { k: 'stat', stat: STAT_KEY[stat[1]], max: Number(stat[2]) }
  if (/^Receba \+1 em qualquer classificação/.test(t)) return { k: 'statQualquer', max: 3 }
  if (/^Pegue outro movimento de/.test(t)) return { k: 'movimentos' }
  if (/^Pegue um movimento de outra cartilha/.test(t)) return { k: 'outraCartilha' }
  if (/Magia Combativa/.test(t)) return { k: 'magia' }
  if (/Ataques Naturais/.test(t)) return { k: 'ataques' }
  if (/^Ganhe um Refúgio/.test(t)) return { k: 'refugioNovo' }
  if (/opção (ao|para) seu Refúgio/.test(t)) return { k: 'refugioAdd' }
  if (/biblioteca mística/.test(t)) return { k: 'biblioteca' }
  if (/^Ganhe um aliado/.test(t)) return { k: 'aliado' }
  if (/^Ganhe uma equipe/.test(t)) return { k: 'aliado', equipe: true }
  if (/^Apague uma caixa marcada de Sorte/.test(t)) return { k: 'sorte' }
  if (/marca de recurso/.test(t)) return { k: 'recursoOuBurocracia' }
  if (tipo === 'a') {
    if (/^Mude este caçador/.test(t)) return { k: 'mudarTipo' }
    if (/^Crie um segundo caçador/.test(t)) return { k: 'segundo' }
    if (/movimentos básicos como avançados/.test(t)) return { k: 'basicos', depoisDe: /^Marque outros/.test(t) }
    if (/^Aposente este caçador/.test(t)) return { k: 'aposentar' }
    if (/Ferramentas e técnicas/.test(t)) return { k: 'ferramentas' }
    if (/^Remova uma das marcas de Perdição/.test(t)) return { k: 'perdicao' }
    if (/^Livre-se da Maldição/.test(t)) return { k: 'maldicao' }
    if (/se torna maligno/.test(t)) return { k: 'maligno' }
    if (/marca de seu lado sombrio/.test(t)) return { k: 'lado' }
    if (/Cria da tecnologia/.test(t)) return { k: 'cria' }
  }
  return { k: 'registro' }
}

export const textoMelhoria = (n) => {
  const c = CARTILHAS_BY_ID[n.c]
  return c?.[n.t === 'm' ? 'melhorias' : 'avancadas']?.[n.i] || ''
}

// Estado que vem das melhorias já escolhidas (data.niveis)
export function derive(c, data) {
  const R = regrasDe(c)
  const niveis = data.niveis || []
  const bonus = {}
  const add = (k, n = 1) => { bonus[k] = (bonus[k] || 0) + n }
  const res = {
    bonus, taken: new Set(), normais: 0, refugioExtra: null, biblioteca: false, outros: [], aliados: [],
    basicos: [], aposentado: false, maligno: false, maldicaoRemovida: false, criaEliminada: false,
    registros: [], mantidos: [],
  }
  let refNovo = false
  let refAdd = 0
  const temRefugioProprio = (R.grupos || []).some(g => g.bonus === 'refugio')
  for (const n of niveis) {
    if (n.t === 'm') res.normais++
    const mine = n.c === c.id
    if (mine) res.taken.add(n.t + n.i)
    const d = n.d || {}
    switch (n.k) {
      case 'movimentos': case 'magia': case 'ataques': case 'ferramentas':
        if (mine) add(n.k)
        break
      case 'refugioAdd':
        if (mine) { if (temRefugioProprio) add('refugio'); else refAdd++ }
        break
      case 'refugioNovo': if (mine) refNovo = true; break
      case 'recursoOuBurocracia': if (mine && d.escolha === 'recurso') add('recursos'); break
      case 'perdicao':
        if (mine) { add('perdicao', -1); if (d.heroismo) add('heroismo', -1) }
        break
      case 'lado': if (mine) add('lado', -1); break
      case 'biblioteca': res.biblioteca = true; break
      case 'outraCartilha': if (d.move) res.outros.push(d.move); break
      case 'aliado': res.aliados.push(d); break
      case 'basicos': res.basicos.push(...(d.moves || [])); break
      case 'aposentar': res.aposentado = true; break
      case 'maligno': res.maligno = true; break
      case 'maldicao': if (mine) res.maldicaoRemovida = true; break
      case 'cria': if (mine) res.criaEliminada = true; break
      case 'mudarTipo': res.mantidos.push(...(d.mantidos || [])); break
      case 'registro': res.registros.push(n); break
      default: break
    }
  }
  if (refNovo) res.refugioExtra = 2 + refAdd
  return res
}

// Quanto as classificações devem ter além da linha escolhida
export function statBonus(c, data) {
  const b = {}
  const add = (k, n) => { b[k] = (b[k] || 0) + n }
  for (const n of data.niveis || []) {
    if ((n.k === 'stat' || n.k === 'statQualquer') && n.d?.stat) add(n.d.stat, 1)
    if (n.k === 'maldicao') add('est', -1)
  }
  // o que cada movimento somou de fato (data.efeitos[instância] = { bra: 1, … })
  for (const ef of Object.values(data.efeitos || {})) for (const [k, v] of Object.entries(ef || {})) add(k, v)
  return b
}

// ---------- movimentos que mexem nas classificações ----------
// Cada movimento marcado é uma "instância": os da própria cartilha usam prefixo '' (chaves como antes);
// os vindos de outra cartilha usam 'x_<cartilha>_' (melhoria), 'e_<cartilha>_' (Uma coisa emprestada)
// ou 'm_<cartilha>_' (mantido depois de mudar de tipo). data.efeitos[prefixo+opção] guarda o que foi somado.

export const PREFIXO = { proprio: () => '', outra: cid => `x_${cid}_`, emprestado: cid => `e_${cid}_`, mantido: cid => `m_${cid}_` }

const cabe = (stats, k, delta, limite) => {
  const v = (Number(stats[k]) || 0) + delta
  return delta > 0 ? v <= limite : v >= limite
}

// Patch acumulado: { stats, efeitos: {inst: map|null}, sub: {key: []} }
function novoPatch(data) {
  return { stats: { ...(data.stats || {}) }, efeitos: {}, sub: {}, mudouStats: false }
}
const efeitoAtual = (data, patch, inst) => (inst in patch.efeitos ? patch.efeitos[inst] : data.efeitos?.[inst]) || {}
function somar(data, patch, inst, k, delta) {
  if (!delta) return
  patch.stats[k] = (Number(patch.stats[k]) || 0) + delta
  const ef = { ...efeitoAtual(data, patch, inst) }
  ef[k] = (ef[k] || 0) + delta
  if (!ef[k]) delete ef[k]
  patch.efeitos[inst] = ef
  patch.mudouStats = true
}

// Ao marcar: bônus fixo (Olhos de louco, Inabalável) só entra se couber no máximo
export function efeitosAoMarcar(R2, optId, prefix, data, patch = novoPatch(data)) {
  const bs = R2.bonusStats?.[optId]
  if (bs) {
    for (const [k, v] of Object.entries(bs.stats)) {
      if (cabe(patch.stats, k, v, bs.max)) somar(data, patch, prefix + optId, k, v)
      else patch.efeitos[prefix + optId] = efeitoAtual(data, patch, prefix + optId)
    }
  }
  return patch
}

// Ao desmarcar: desfaz tudo que o movimento somou e esquece as escolhas internas
export function efeitosAoDesmarcar(R2, optId, prefix, data, patch = novoPatch(data)) {
  const inst = prefix + optId
  for (const [k, v] of Object.entries(efeitoAtual(data, patch, inst))) {
    patch.stats[k] = (Number(patch.stats[k]) || 0) - v
    patch.mudouStats = true
  }
  if (data.efeitos?.[inst] || inst in patch.efeitos) patch.efeitos[inst] = null
  for (const cfg of R2.subs?.[optId] || []) {
    const key = prefix + (cfg.key || optId)
    if (cfg.tipo === 'movimento') {
      // o movimento emprestado também é desfeito
      const ref = data.sub?.[key]?.[0]
      const m = resolveMove(ref)
      if (m) efeitosAoDesmarcar(REGRAS[m.c.id] || {}, m.opt.id, PREFIXO.emprestado(m.c.id), data, patch)
    }
    if ((data.sub?.[key] || []).length) patch.sub[key] = []
  }
  return patch
}

// Escolher/desfazer uma classificação numa escolha tipo 'stats'
export function efeitoEscolhaStat(cfg, optId, prefix, label, on, data, patch = novoPatch(data)) {
  const delta = cfg.delta ?? 1
  somar(data, patch, prefix + optId, label, on ? delta : -delta)
  return patch
}

// A classificação pode ser escolhida nesta escolha? (limite e "distinto")
export function statEscolhivel(cfg, prefix, k, data) {
  if (!cabe(data.stats || {}, k, cfg.delta ?? 1, cfg.limite ?? 3)) return false
  if (cfg.distinto && (data.sub?.[prefix + cfg.distinto] || []).includes(k)) return false
  return true
}

// Grava um patch com a função `set` da ficha
export function aplicarPatch(set, patch) {
  if (patch.mudouStats) set('stats', patch.stats)
  for (const [inst, ef] of Object.entries(patch.efeitos)) set(`efeitos.${inst}`, ef && Object.keys(ef).length ? ef : (ef ? {} : null))
  for (const [key, v] of Object.entries(patch.sub)) set(`sub.${key}`, v)
}

export { novoPatch }

// ---------- grupos ----------

function limitesIniciado(c, R, data) {
  const items = c.pagina2.flat()
  const tem = labels => items.some(it => it.k === 'opt' && data.checks?.[it.id] && labels.includes(plain(it.t).trim()))
  if (tem(R.armasPorTradicao.antiquadas3)) return { antiquadas: 3, modernas: 0 }
  if (tem(R.armasPorTradicao.modernas2)) return { antiquadas: 0, modernas: 2 }
  return { antiquadas: 2, modernas: 1 }
}

// Grupos da cartilha com os limites já ajustados pelas melhorias
export function groupsOf(c, data, d) {
  const R = regrasDe(c)
  return (R.grupos || []).map(g => {
    let max = g.max
    let min = g.min ?? g.max
    if (g.dinamico === 'iniciado') {
      max = limitesIniciado(c, R, data)[g.key]
      min = max
    }
    if (g.bonus && max != null) {
      max = Math.max(0, max + (d.bonus[g.bonus] || 0))
      min = g.min != null ? g.min : max
    }
    return { ...g, ids: expand(g.opts), max, min, pm: g.peloMenos ? { ...g.peloMenos, ids: expand(g.peloMenos.opts) } : null }
  })
}

export function groupState(g, isChecked) {
  const count = g.ids.filter(isChecked).length
  const over = g.max != null && count > g.max
  const target = g.max ?? g.min
  let faltaPm = 0
  if (g.pm) faltaPm = Math.max(0, g.pm.n - g.pm.ids.filter(isChecked).length)
  const complete = count >= (g.min ?? 0) && !over && faltaPm === 0
  return { count, over, target, faltaPm, complete }
}

export function canPick(g, st, id) {
  if (g.max != null && st.count >= g.max) return false
  if (g.pm && !g.pm.ids.includes(id) && g.max != null && g.max - st.count - 1 < st.faltaPm) return false
  return true
}

export const numeroExtenso = (n) => ['nenhuma', 'uma', 'duas', 'três', 'quatro', 'cinco', 'seis'][n] ?? String(n)

// Escolhas internas de uma opção marcada estão completas?
export function subsComplete(cfgs, data, optId) {
  return (cfgs || []).every(cfg => {
    const key = cfg.key || optId
    if (cfg.quando && !(data.sub?.[cfg.quando.key] || []).includes(cfg.quando.label)) return true
    const got = data.sub?.[key] || []
    if (cfg.tipo === 'texto') return true
    if (cfg.tipo === 'movimento') return got.length === 1
    if (cfg.tipo === 'stats') return got.length === cfg.max
    return got.length >= (cfg.min ?? cfg.max)
  })
}

// A seção da Página 2 está completa (para a lista de criação)?
export function sectionComplete(c, section, data, groups, d) {
  const R = regrasDe(c)
  const isChecked = id => !!data.checks?.[id]
  const ids = new Set(section.items.filter(it => it.k === 'opt').map(it => it.id))
  for (const g of groups) {
    if (!g.ids.some(id => ids.has(id))) continue
    if (!groupState(g, isChecked).complete) return false
  }
  for (const it of section.items) {
    if (it.k === 'opt' && (isChecked(it.id) || it.fixed) && !subsComplete(R.subs?.[it.id], data, it.id)) return false
    if (it.k === 'opt' && R.eliminar?.opt === it.id) {
      if ((data.sub?.[it.id] || []).length < eliminarLimit(R, d)) return false
    }
    if (it.k === 'p') {
      const pc = (R.paragrafos || []).find(p => plain(it.t).startsWith(p.inicio))
      if (pc?.max && (data.sub?.[pc.key] || []).length < pc.max) return false
    }
  }
  return true
}

export const eliminarLimit = (R, d) => (R.eliminar ? R.eliminar.max + (d.bonus[R.eliminar.bonus] || 0) : 0)

// Itens (•) da opção "eliminar" (Ferramentas e técnicas): rótulo em itálico antes dos dois-pontos
export const liLabel = (li) => plain(li.t).split(':')[0].trim()
