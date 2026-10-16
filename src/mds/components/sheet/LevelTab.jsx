import { useState } from 'react'
import RichText from './RichText'
import { MovePicker } from './Choices'
import { CARTILHAS_BY_ID } from '../../data/cartilhas'
import { H, BoxRow, OptionLine, Illustration, LineInput, Chip, SmallBtn } from './parts'
import { TIPOS_ALIADO } from '../../data/regras'
import {
  STATS, STAT_NAME, BASIC_MOVES, classificarMelhoria, regrasDe, resolveMove, moveTitle, outrasCartilhas,
  sectionsOf, moveRef, textoMelhoria, PREFIXO, novoPatch, aplicarPatch, efeitosAoMarcar, efeitosAoDesmarcar,
} from './rules'

// Aba "Subir de nível": experiência, melhorias (Salvar melhoria) e melhorias avançadas (Escolher MA).
// Cada escolha fica em data.niveis com o que foi aplicado, para poder desfazer a última.

const XP_CHEIO = [true, true, true, true, true]
const XP_VAZIO = [false, false, false, false, false]
const num = (v) => Number(v) || 0

function disponibilidade(ctx, t, i) {
  const { c, data, d } = ctx
  const text = t === 'm' ? c.melhorias[i] : c.avancadas[i]
  const k = classificarMelhoria(text, t)
  if (d.taken.has(t + i)) return { k, taken: true }
  if (d.aposentado || d.maligno) return { k, blocked: 'o caçador saiu de jogo' }
  if (t === 'a' && d.normais < 5) return { k, blocked: null, locked: true }
  const stats = data.stats || {}
  switch (k.k) {
    case 'stat':
      if (num(stats[k.stat]) >= k.max) return { k, blocked: `${STAT_NAME[k.stat]} já está em ${k.max >= 0 ? '+' : ''}${k.max} ou mais` }
      break
    case 'statQualquer':
      if (STATS.every(s => num(stats[s.key]) >= 3)) return { k, blocked: 'todas as classificações já estão em +3' }
      break
    case 'refugioAdd':
      if (!(regrasDe(c).grupos || []).some(g => g.bonus === 'refugio') && d.refugioExtra === null) return { k, blocked: 'você ainda não tem um refúgio' }
      break
    case 'sorte':
      if (!(data.sorte || []).some(Boolean)) return { k, blocked: 'nenhuma caixa de Sorte marcada' }
      break
    case 'basicos': {
      if (k.depoisDe) {
        const prev = c.avancadas.findIndex((a, j) => j !== i && classificarMelhoria(a, 'a').k === 'basicos' && !classificarMelhoria(a, 'a').depoisDe)
        if (prev >= 0 && !d.taken.has(`a${prev}`)) return { k, blocked: 'escolha antes a melhoria anterior' }
      }
      if (BASIC_MOVES.filter(m => !d.basicos.includes(m)).length < 2) return { k, blocked: 'não há movimentos básicos suficientes' }
      break
    }
    default:
  }
  return { k }
}

// Opções já marcadas na ficha (para decidir o que manter ao mudar de cartilha)
function escolhasAtuais(c, data) {
  const out = []
  for (const s of sectionsOf(c)) {
    for (const it of s.items) {
      if (it.k === 'opt' && (it.fixed ? s.titulo === 'MOVIMENTOS' : data.checks?.[it.id])) out.push({ ref: moveRef(c.id, it.id), secao: s.titulo, it })
    }
  }
  return out
}

function MelhoriaForm({ ctx, k, form, setForm }) {
  const { c, data, d } = ctx
  const f = (patch) => setForm(prev => ({ ...prev, ...patch }))
  const label = (t) => <div className="font-sans text-[11px] uppercase tracking-wider text-mds-600 dark:text-mds-300 mb-1">{t}</div>
  const box = (children) => <div className="ml-6 my-2 p-2 rounded-lg bg-mds-50 dark:bg-mds-900/50 border border-mds-200 dark:border-mds-800 space-y-2">{children}</div>

  switch (k.k) {
    case 'statQualquer':
      return box(<>
        {label('Qual classificação?')}
        <div className="flex flex-wrap gap-1">
          {STATS.map(s => (
            <Chip key={s.key} on={form.stat === s.key} disabled={num(data.stats?.[s.key]) >= 3} onClick={() => f({ stat: s.key })}>
              {s.name} +1
            </Chip>
          ))}
        </div>
      </>)
    case 'outraCartilha':
      return box(<>
        {label('Movimento de outra cartilha')}
        <MovePicker c={c} value={form.move || ''} onChange={v => f({ move: v })} exclude={d.outros} />
        <p className="text-xs italic font-sans">Tenha certeza de que o movimento faz sentido para o seu caçador (livro p. 146).</p>
      </>)
    case 'aliado':
      return box(<>
        {label(k.equipe ? 'Tipo da equipe' : 'Tipo do aliado')}
        <div className="flex flex-wrap gap-1">
          {TIPOS_ALIADO.map(a => (
            <Chip key={a.key} on={form.tipo === a.key} title={`Motivação: ${a.motivacao}`} onClick={() => f({ tipo: a.key })}>{a.label}</Chip>
          ))}
        </div>
        {form.tipo && <p className="text-xs italic font-sans">Motivação: {TIPOS_ALIADO.find(a => a.key === form.tipo).motivacao}</p>}
        <LineInput value={form.nome || ''} onChange={v => f({ nome: v })} placeholder={k.equipe ? 'Nome da equipe / membros' : 'Nome do aliado'} className="w-full font-sans text-sm" />
        <LineInput value={form.desc || ''} onChange={v => f({ desc: v })} placeholder="Histórico, aparência, habilidades (opcional)" className="w-full font-sans text-sm" />
      </>)
    case 'recursoOuBurocracia':
      return box(<>
        {label('O que você quer fazer?')}
        <div className="flex flex-wrap gap-1">
          <Chip on={form.escolha === 'recurso'} onClick={() => f({ escolha: 'recurso' })}>Adicionar uma marca de recurso</Chip>
          <Chip on={form.escolha === 'burocracia'} onClick={() => f({ escolha: 'burocracia' })}>Alterar uma marca de burocracia</Chip>
        </div>
      </>)
    case 'perdicao':
      return box(
        <label className="flex items-center gap-2 font-sans text-sm cursor-pointer">
          <input type="checkbox" checked={!!form.heroismo} onChange={e => f({ heroismo: e.target.checked })} />
          Remover também uma marca de Heroísmo
        </label>,
      )
    case 'basicos': {
      const livres = BASIC_MOVES.filter(m => !d.basicos.includes(m))
      const sel = form.moves || []
      return box(<>
        {label(`Dois movimentos básicos (${sel.length}/2)`)}
        <div className="flex flex-wrap gap-1">
          {livres.map(m => (
            <Chip key={m} on={sel.includes(m)} disabled={!sel.includes(m) && sel.length >= 2}
                  onClick={() => f({ moves: sel.includes(m) ? sel.filter(x => x !== m) : [...sel, m] })}>{m}</Chip>
          ))}
        </div>
      </>)
    }
    case 'mudarTipo': {
      const atuais = escolhasAtuais(c, data)
      const mant = form.mantidos || []
      return box(<>
        {label('Nova cartilha')}
        <select value={form.para || ''} onChange={e => f({ para: e.target.value })} className="mds-input !w-auto !py-1 !px-2 text-sm">
          <option value="">Escolher…</option>
          {outrasCartilhas(c).map(x => <option key={x.id} value={x.id}>{x.nome}</option>)}
        </select>
        <p className="text-xs italic font-sans">
          Classificações e histórico continuam iguais. Mantenha só os movimentos intrinsecamente ligados a quem você é
          (decida com o Guardião); equipamentos antigos podem ficar se fizer sentido. Depois escolha os da nova cartilha
          como numa criação (livro p. 150).
        </p>
        {atuais.length > 0 && label('Manter da cartilha atual')}
        <div className="space-y-0.5">
          {atuais.map(a => (
            <label key={a.ref} className="flex items-start gap-2 font-sans text-sm cursor-pointer">
              <input type="checkbox" className="mt-1" checked={mant.includes(a.ref)}
                     onChange={e => f({ mantidos: e.target.checked ? [...mant, a.ref] : mant.filter(x => x !== a.ref) })} />
              <span><span className="opacity-60">{a.secao.split(',')[0]} · </span>{moveTitle(a.it)}</span>
            </label>
          ))}
        </div>
      </>)
    }
    case 'segundo':
      return box(<p className="text-sm font-sans">Ao escolher, abre a criação de uma nova ficha. Não ligue seus próprios caçadores no histórico (livro p. 151).</p>)
    case 'aposentar':
      return box(<p className="text-sm font-sans">O caçador se aposenta e passa para o Guardião, seguro contra as ameaças (livro p. 151).</p>)
    case 'maligno':
      return box(<p className="text-sm font-sans">O caçador sai do seu controle para sempre e vira uma ameaça do Guardião (livro p. 153).</p>)
    case 'maldicao':
      return box(<p className="text-sm font-sans">A maldição deixa de valer e você perde 1 de Estranheza.</p>)
    case 'sorte':
      return box(<p className="text-sm font-sans">A última caixa marcada de Sorte será apagada.</p>)
    case 'registro':
      return box(<LineInput value={form.nota || ''} onChange={v => f({ nota: v })} placeholder="Anotação (opcional)" className="w-full font-sans text-sm" />)
    default:
      return null
  }
}

function formValido(k, form) {
  switch (k.k) {
    case 'statQualquer': return !!form.stat
    case 'outraCartilha': return !!resolveMove(form.move)
    case 'aliado': return !!form.tipo && !!form.nome?.trim()
    case 'recursoOuBurocracia': return !!form.escolha
    case 'basicos': return (form.moves || []).length === 2
    case 'mudarTipo': return !!form.para
    default: return true
  }
}

// Resumo do que foi escolhido, ao lado de uma melhoria já tomada
function detalheNivel(n) {
  const d = n.d || {}
  switch (n.k) {
    case 'statQualquer': return STAT_NAME[d.stat]
    case 'outraCartilha': { const m = resolveMove(d.move); return m ? `${m.c.nome}: ${moveTitle(m.opt)}` : '' }
    case 'aliado': return `${d.nome} (${TIPOS_ALIADO.find(a => a.key === d.tipo)?.label || d.tipo})`
    case 'recursoOuBurocracia': return d.escolha === 'recurso' ? 'adicionar recurso' : 'alterar burocracia'
    case 'basicos': return (d.moves || []).join(', ')
    case 'mudarTipo': return `→ ${CARTILHAS_BY_ID[d.para]?.nome || d.para}`
    case 'perdicao': return d.heroismo ? 'e uma de Heroísmo' : ''
    case 'registro': return d.nota || ''
    default: return ''
  }
}

export default function LevelTab({ ctx, onNewSheet, onChangeCartilha, goto }) {
  const { c, data, set, ro, d } = ctx
  const [pend, setPend] = useState(null) // { t: 'm' | 'a', i }
  const [form, setForm] = useState({})
  const niveis = data.niveis || []
  const xpCount = (data.xp || []).filter(Boolean).length
  const xpFull = xpCount >= 5
  const normais = Math.min(d.normais, 5)

  const nivelDe = (t, i) => [...niveis].reverse().find(n => n.c === c.id && n.t === t && n.i === i)

  const escolher = () => {
    const { t, i } = pend
    const text = t === 'm' ? c.melhorias[i] : c.avancadas[i]
    const k = classificarMelhoria(text, t)
    const entry = { t, i, c: c.id, k: k.k, em: new Date().toISOString(), d: {} }
    const stats = { ...(data.stats || {}) }
    switch (k.k) {
      case 'stat':
        entry.d.stat = k.stat
        stats[k.stat] = num(stats[k.stat]) + 1
        set('stats', stats)
        break
      case 'statQualquer':
        entry.d.stat = form.stat
        stats[form.stat] = num(stats[form.stat]) + 1
        set('stats', stats)
        break
      case 'maldicao':
        stats.est = num(stats.est) - 1
        set('stats', stats)
        break
      case 'outraCartilha': {
        entry.d.move = form.move
        // bônus fixo do movimento (ex.: Olhos de louco) entra agora; escolhas ficam na aba Ações
        const m = resolveMove(form.move)
        aplicarPatch(set, efeitosAoMarcar(regrasDe(m.c), m.opt.id, PREFIXO.outra(m.c.id), data))
        break
      }
      case 'aliado': entry.d = { tipo: form.tipo, nome: form.nome.trim(), desc: (form.desc || '').trim(), equipe: !!k.equipe }; break
      case 'recursoOuBurocracia': entry.d.escolha = form.escolha; break
      case 'perdicao': entry.d.heroismo = !!form.heroismo; break
      case 'basicos': entry.d.moves = form.moves; break
      case 'registro': entry.d.nota = (form.nota || '').trim(); break
      case 'sorte': {
        const sorte = Array.from({ length: 7 }, (_, j) => !!data.sorte?.[j])
        const idx = sorte.lastIndexOf(true)
        sorte[idx] = false
        entry.d.idx = idx
        set('sorte', sorte)
        break
      }
      case 'mudarTipo': {
        entry.d = { para: form.para, mantidos: form.mantidos || [] }
        entry.snap = {
          cartilha: c.id, checks: data.checks || {}, sub: data.sub || {}, detalhe: data.detalhe || {},
          fields: data.fields || {}, cls: data.cls ?? null, stats: data.stats || {}, efeitos: data.efeitos || {},
        }
        // Mantidos levam suas escolhas (prefixo m_); os descartados desfazem o que somaram
        const R = regrasDe(c)
        const pm = PREFIXO.mantido(c.id)
        const patch = novoPatch(data)
        const estrangeiro = key => /^(x|e|m)_/.test(key)
        const pega = (obj) => Object.fromEntries(Object.entries(obj || {}).filter(([key, v]) => estrangeiro(key) && v))
        const sub = pega(data.sub)
        const detalhe = pega(data.detalhe)
        const efeitos = pega(data.efeitos)
        for (const it of c.pagina2.flat()) {
          if (it.k !== 'opt' || !(it.fixed || data.checks?.[it.id])) continue
          if (entry.d.mantidos.includes(moveRef(c.id, it.id))) {
            for (const cfg of R.subs?.[it.id] || []) {
              const key = cfg.key || it.id
              if (data.sub?.[key]) sub[pm + key] = data.sub[key]
              if (data.detalhe?.[key]) detalhe[pm + key] = data.detalhe[key]
            }
            if (data.efeitos?.[it.id]) efeitos[pm + it.id] = data.efeitos[it.id]
          } else efeitosAoDesmarcar(R, it.id, PREFIXO.proprio(), data, patch)
        }
        for (const [inst, ef] of Object.entries(patch.efeitos)) if (ef === null) delete efeitos[inst]
        for (const [key, v] of Object.entries(patch.sub)) if (key in sub) sub[key] = v
        if (patch.mudouStats) set('stats', patch.stats)
        set('checks', {})
        set('sub', sub)
        set('detalhe', detalhe)
        set('efeitos', efeitos)
        set('fields', {})
        set('cls', null)
        break
      }
      default:
    }
    set('xp', XP_VAZIO)
    set('niveis', [...niveis, entry])
    setPend(null)
    setForm({})
    if (k.k === 'mudarTipo') { onChangeCartilha?.(form.para); goto?.('criacao') }
    else if (k.k === 'segundo') onNewSheet?.()
    else if (['movimentos', 'magia', 'ataques', 'refugioAdd', 'refugioNovo', 'ferramentas', 'outraCartilha'].includes(k.k) ||
             (k.k === 'recursoOuBurocracia' && form.escolha === 'recurso')) goto?.('acoes')
  }

  const desfazer = () => {
    const n = niveis[niveis.length - 1]
    if (!n || !confirm(`Desfazer a última melhoria?\n\n${textoMelhoria(n).replace(/\*\*|_/g, '')}`)) return
    const stats = { ...(data.stats || {}) }
    if ((n.k === 'stat' || n.k === 'statQualquer') && n.d?.stat) { stats[n.d.stat] = num(stats[n.d.stat]) - 1; set('stats', stats) }
    if (n.k === 'maldicao') { stats.est = num(stats.est) + 1; set('stats', stats) }
    if (n.k === 'sorte' && n.d?.idx >= 0) set(`sorte`, Array.from({ length: 7 }, (_, j) => (j === n.d.idx ? true : !!data.sorte?.[j])))
    if (n.k === 'outraCartilha') {
      const m = resolveMove(n.d?.move)
      if (m) aplicarPatch(set, efeitosAoDesmarcar(regrasDe(m.c), m.opt.id, PREFIXO.outra(m.c.id), data))
    }
    if (n.k === 'mudarTipo' && n.snap) {
      if (n.snap.stats) set('stats', n.snap.stats)
      set('efeitos', n.snap.efeitos || {})
      set('checks', n.snap.checks)
      set('sub', n.snap.sub)
      set('detalhe', n.snap.detalhe)
      set('fields', n.snap.fields)
      set('cls', n.snap.cls)
      onChangeCartilha?.(n.snap.cartilha)
    }
    set('xp', XP_CHEIO)
    set('niveis', niveis.slice(0, -1))
  }

  const lista = (t) => {
    const textos = t === 'm' ? c.melhorias : c.avancadas
    return textos.map((m, i) => {
      const av = disponibilidade(ctx, t, i)
      const isPend = pend?.t === t && pend.i === i
      const n = av.taken ? nivelDe(t, i) : null
      const det = n ? detalheNivel(n) : ''
      return (
        <div key={i}>
          <OptionLine checked={av.taken || isPend} ro={ro} disabled={av.taken || !!av.blocked || av.locked}
                      onToggle={() => { setPend(isPend ? null : { t, i }); setForm({}) }}>
            <RichText text={m} />
            {det && <span className="font-sans text-xs text-mds-600 dark:text-mds-300 ml-1">({det})</span>}
            {av.blocked && !ro && <span className="font-sans text-xs italic opacity-70 ml-1">— {av.blocked}</span>}
          </OptionLine>
          {isPend && <MelhoriaForm ctx={ctx} k={av.k} form={form} setForm={setForm} />}
        </div>
      )
    })
  }

  const pendK = pend && disponibilidade(ctx, pend.t, pend.i).k
  const podeEscolher = pend && xpFull && formValido(pendK, form)
  const botao = (t, rotulo) => !ro && (
    <div className="flex items-center gap-3 flex-wrap mt-2">
      <SmallBtn variant="solid" onClick={escolher} disabled={!(pend?.t === t && podeEscolher)}>{rotulo}</SmallBtn>
      {pend?.t === t && !xpFull && <span className="text-xs font-sans italic text-amber-700 dark:text-amber-300">Preencha as 5 caixas de experiência para subir de nível.</span>}
      {pend?.t === t && xpFull && !formValido(pendK, form) && <span className="text-xs font-sans italic opacity-70">Complete a escolha acima.</span>}
    </div>
  )

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-8">
      <div>
        <H className="!mt-0">Subindo de nível</H>
        <div className="flex items-center gap-2 flex-wrap">
          <span>Experiência:</span>
          <BoxRow values={data.xp} count={5} disabled={ro} label="Experiência" onChange={v => set('xp', v)} />
          {xpFull && !ro && <span className="font-sans text-xs font-semibold text-emerald-700 dark:text-emerald-300">Pronto para subir de nível!</span>}
        </div>
        {c.subindo.map((p, i) => <p key={i} className="mt-1"><RichText text={p} /></p>)}

        <H>Melhorias</H>
        <p className="text-xs font-sans italic text-mds-600 dark:text-mds-300 mb-1">Cada uma só pode ser escolhida uma vez.</p>
        {lista('m')}
        {botao('m', 'Salvar melhoria')}
        {c.melhoriasNota.map((p, i) => <p key={i} className="mt-2"><RichText text={p} /></p>)}
      </div>

      <div>
        <div className="flex items-baseline justify-between gap-2 mt-3 xl:mt-0">
          <H className="xl:!mt-0">Melhorias avançadas</H>
          <span className={`font-sans text-sm font-bold px-2 py-0.5 rounded-full
                            ${normais >= 5 ? 'bg-emerald-600 text-white' : 'bg-mds-100 text-mds-800 dark:bg-mds-900 dark:text-mds-100'}`}>
            {normais}/5
          </span>
        </div>
        {d.normais < 5 && (
          <p className="text-xs font-sans italic text-mds-600 dark:text-mds-300 mb-1">
            Liberadas depois de salvar 5 melhorias. Depois disso, cada subida de nível pode usar qualquer das duas listas.
          </p>
        )}
        {lista('a')}
        {botao('a', 'Escolher MA')}

        {niveis.length > 0 && (
          <>
            <H>Histórico de subidas</H>
            <ol className="list-decimal pl-6 space-y-0.5 text-[14px]">
              {niveis.map((n, i) => (
                <li key={i}>
                  <span className="font-sans text-[11px] uppercase tracking-wider text-mds-500 mr-1">{n.t === 'a' ? 'MA' : 'M'}</span>
                  <RichText text={textoMelhoria(n)} />
                  {detalheNivel(n) && <span className="font-sans text-xs opacity-70 ml-1">({detalheNivel(n)})</span>}
                </li>
              ))}
            </ol>
            {!ro && <div className="mt-2"><SmallBtn onClick={desfazer}>Desfazer a última</SmallBtn></div>}
          </>
        )}
        {c.imagensPagina1.map(img => <Illustration key={img.src} src={img.src} />)}
      </div>
    </div>
  )
}
