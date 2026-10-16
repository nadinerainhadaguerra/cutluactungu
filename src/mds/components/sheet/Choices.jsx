import RichText from './RichText'
import { H, Illustration, LineInput, OptionLine, Chip, SmallBtn } from './parts'
import {
  STATS, plain, groupState, canPick, subOptions, liLabel, eliminarLimit, numeroExtenso,
  outrasCartilhas, movimentosDe, moveRef, resolveMove, moveTitle, regrasDe,
  PREFIXO, novoPatch, aplicarPatch, efeitosAoMarcar, efeitosAoDesmarcar, efeitoEscolhaStat, statEscolhivel,
} from './rules'
import { CARTILHAS_BY_ID } from '../../data/cartilhas'

// Seções da Página 2 com as regras de escolha: grupos com limite se recolhem quando completos
// (mostrando só o que foi escolhido) e voltam a abrir pelo botão Editar.

const isSubheading = (it) => it.k === 'p' && /^[^.()]{1,20}:$/.test(plain(it.t).trim())

// Quem é dono de cada item: itens (•) e parágrafos de continuação pertencem à opção acima;
// subtítulos curtos ("Bases:") pertencem ao grupo da opção seguinte.
function layoutItems(items, groupByOpt) {
  let lastOpt = null
  return items.map((it, i) => {
    const row = { it, owner: null, subGroup: null }
    if (it.k === 'opt') lastOpt = it.id
    else if (it.k === 'li') row.owner = lastOpt
    else if (it.k === 'p' && items[i - 1]?.k === 'li' && lastOpt && !isSubheading(it) && !/escolh/i.test(it.t)) row.owner = lastOpt
    else if (isSubheading(it)) {
      const next = items.slice(i + 1).find(x => x.k === 'opt')
      row.subGroup = next ? groupByOpt.get(next.id)?.key || null : null
      lastOpt = null
    } else lastOpt = null
    return row
  })
}

function GroupBar({ g, st, collapsed, editing, onEdit, onDone }) {
  let text
  if (g.max === 0) text = 'Nenhuma deste tipo (pelas tradições da Seita).'
  else if (st.over) text = `Limite de ${g.max}: desmarque ${st.count - g.max}.`
  else if (collapsed) text = `${st.count} escolhida${st.count === 1 ? '' : 's'}`
  else if (g.max == null) text = `${st.count} escolhida${st.count === 1 ? '' : 's'} · mínimo ${g.min}`
  else {
    text = `${st.count}/${g.max} escolhida${g.max === 1 ? '' : 's'}`
    if (st.faltaPm) text += ` · falta ${numeroExtenso(st.faltaPm)} ${g.pm.rotulo}`
  }
  return (
    <div className={`flex items-center justify-between gap-2 my-1 px-2 py-0.5 rounded font-sans text-xs
                     ${st.over ? 'bg-red-500/15 text-red-700 dark:text-red-300'
                               : st.complete ? 'bg-emerald-500/10 text-emerald-800 dark:text-emerald-300'
                                             : 'bg-amber-400/15 text-amber-800 dark:text-amber-200'}`}>
      <span>{st.complete && !st.over ? '✓ ' : ''}{text}</span>
      {collapsed && <SmallBtn onClick={onEdit}>Editar</SmallBtn>}
      {editing && !collapsed && <SmallBtn onClick={onDone} disabled={!st.complete}>Concluir</SmallBtn>}
    </div>
  )
}

// ---------- escolhas dentro de uma opção ----------

function ChipList({ options, chosen, max, disabled, onToggle }) {
  const full = max != null && chosen.length >= max
  // Completa: mostra só o escolhido; clicar nele desmarca e as outras voltam
  const visible = full ? options.filter(o => chosen.includes(o.label)) : options
  return (
    <div className="flex flex-wrap gap-1 mt-1">
      {visible.map(o => (
        <Chip key={o.label} on={chosen.includes(o.label)} title={o.full !== o.label ? o.full : undefined}
              disabled={disabled} onClick={() => onToggle(o.label)}>
          {o.label}
        </Chip>
      ))}
    </div>
  )
}

export function MoveText({ refStr, showCartilha = true }) {
  const m = resolveMove(refStr)
  if (!m) return null
  return (
    <div className="text-[14px]">
      {showCartilha && <span className="font-sans text-[11px] uppercase tracking-wider text-mds-500 dark:text-mds-400 mr-1">{m.c.nome}</span>}
      <RichText text={m.opt.t} />
      {m.lis.map((li, i) => (
        <div key={i} className="flex gap-1.5 pl-3"><span className="text-mds-600 dark:text-mds-300">•</span><span><RichText text={li.t} /></span></div>
      ))}
    </div>
  )
}

export function MovePicker({ c, value, onChange, disabled, exclude = [] }) {
  const cur = resolveMove(value)
  const cid = cur?.c.id || String(value || '').split(':')[0] || ''
  const other = CARTILHAS_BY_ID[cid]
  return (
    <div className="space-y-1 font-sans text-sm">
      <div className="flex flex-wrap gap-2">
        <select value={cid} disabled={disabled} onChange={e => onChange(e.target.value ? `${e.target.value}:` : '')}
                className="mds-input !w-auto !py-1 !px-2 text-sm">
          <option value="">Cartilha…</option>
          {outrasCartilhas(c).map(x => <option key={x.id} value={x.id}>{x.nome}</option>)}
        </select>
        {other && (
          <select value={cur?.opt.id || ''} disabled={disabled} onChange={e => onChange(e.target.value ? moveRef(other.id, e.target.value) : `${other.id}:`)}
                  className="mds-input !w-auto !py-1 !px-2 text-sm max-w-[16rem]">
            <option value="">Movimento…</option>
            {movimentosDe(other).map(o => {
              const ref = moveRef(other.id, o.id)
              return <option key={o.id} value={o.id} disabled={exclude.includes(ref)}>{moveTitle(o)}</option>
            })}
          </select>
        )}
      </div>
      {cur && <div className="font-mds-serif"><MoveText refStr={value} showCartilha={false} /></div>}
    </div>
  )
}

// Escolhas dentro de uma opção marcada. `c2`/`R2` = cartilha dona do movimento; `prefix` separa
// movimentos vindos de outra cartilha (ver PREFIXO em rules.js).
export function SubChoices({ ctx, opt, lis, c2 = ctx.c, R2 = ctx.R, prefix = '' }) {
  const { data, ro, set } = ctx
  const cfgs = R2.subs?.[opt.id] || []
  if (ro || cfgs.length === 0) return null
  const k = (cfg) => prefix + (cfg.key || opt.id)

  const toggle = (cfg, label) => {
    const key = k(cfg)
    const cur = data.sub?.[key] || []
    const on = !cur.includes(label)
    const patch = novoPatch(data)
    patch.sub[key] = on ? [...cur, label] : cur.filter(x => x !== label)
    if (cfg.tipo === 'stats') efeitoEscolhaStat(cfg, opt.id, prefix, label, on, data, patch)
    if (!on) {
      // escolhas que dependiam desta ("perícia" → classificações) são desfeitas e esquecidas
      for (const dep of cfgs.filter(x => x.quando?.key === (cfg.key || opt.id) && x.quando.label === label)) {
        for (const st of data.sub?.[k(dep)] || []) if (dep.tipo === 'stats') efeitoEscolhaStat(dep, opt.id, prefix, st, false, data, patch)
        patch.sub[k(dep)] = []
      }
    }
    aplicarPatch(set, patch)
  }

  const trocarMovimento = (cfg, ref) => {
    const key = k(cfg)
    const patch = novoPatch(data)
    const old = resolveMove(data.sub?.[key]?.[0])
    if (old) efeitosAoDesmarcar(regrasDe(old.c), old.opt.id, PREFIXO.emprestado(old.c.id), data, patch)
    patch.sub[key] = ref ? [ref] : []
    const m = resolveMove(ref)
    if (m) efeitosAoMarcar(regrasDe(m.c), m.opt.id, PREFIXO.emprestado(m.c.id), data, patch)
    aplicarPatch(set, patch)
  }

  return (
    <div className="mt-1 mb-2 pl-6 space-y-1.5">
      {cfgs.map((cfg, i) => {
        const key = k(cfg)
        if (cfg.quando && !(data.sub?.[prefix + cfg.quando.key] || []).includes(cfg.quando.label)) return null
        const label = (
          <span className="font-sans text-[11px] uppercase tracking-wider text-mds-600 dark:text-mds-300">
            {cfg.rotulo}{cfg.max && cfg.tipo !== 'stats' ? ` (${cfg.min && cfg.min !== cfg.max ? `${cfg.min}–${cfg.max}` : cfg.max})` : ''}
          </span>
        )
        if (cfg.tipo === 'texto') {
          return (
            <div key={i} className="flex items-baseline gap-2 flex-wrap">
              {label}
              <LineInput value={data.detalhe?.[key] || ''} onChange={v => set(`detalhe.${key}`, v)}
                         className="flex-1 min-w-[10rem] font-sans text-sm" placeholder="Escreva aqui…" />
            </div>
          )
        }
        if (cfg.tipo === 'movimento') {
          const val = data.sub?.[key]?.[0] || ''
          const m = resolveMove(val)
          return (
            <div key={i}>
              {label}
              <MovePicker c={c2} value={val} onChange={v => trocarMovimento(cfg, v)} />
              {m && <SubChoices ctx={ctx} opt={m.opt} lis={m.lis} c2={m.c} R2={regrasDe(m.c)} prefix={PREFIXO.emprestado(m.c.id)} />}
            </div>
          )
        }
        const chosen = data.sub?.[key] || []
        if (cfg.tipo === 'stats') {
          const sinal = (cfg.delta ?? 1) > 0 ? `+${cfg.delta ?? 1}` : `−${Math.abs(cfg.delta)}`
          const full = chosen.length >= cfg.max
          return (
            <div key={i}>
              {label}
              <div className="flex flex-wrap gap-1 mt-1">
                {STATS.filter(s => !full || chosen.includes(s.key)).map(s => {
                  const on = chosen.includes(s.key)
                  return (
                    <Chip key={s.key} on={on} disabled={!on && !statEscolhivel(cfg, prefix, s.key, data)}
                          onClick={() => toggle(cfg, s.key)}>
                      {s.name} {sinal}
                    </Chip>
                  )
                })}
              </div>
            </div>
          )
        }
        return (
          <div key={i}>
            {label}
            <ChipList options={subOptions(cfg, opt, lis)} chosen={chosen} max={cfg.max} onToggle={l => toggle(cfg, l)} />
          </div>
        )
      })}
    </div>
  )
}

// Movimento de outra cartilha (melhoria ou mantido após mudar de tipo), com as escolhas dele
export function ForeignMove({ ctx, refStr, prefixo }) {
  const m = resolveMove(refStr)
  if (!m) return null
  return (
    <div>
      <MoveText refStr={refStr} />
      <SubChoices ctx={ctx} opt={m.opt} lis={m.lis} c2={m.c} R2={regrasDe(m.c)} prefix={prefixo(m.c.id)} />
    </div>
  )
}

// Ferramentas e técnicas do Arcano: escolher quais itens eliminar
function EliminarChoices({ ctx, opt, lis }) {
  const { R, data, ro, set, d } = ctx
  if (ro) return null
  const max = eliminarLimit(R, d)
  const chosen = data.sub?.[opt.id] || []
  const options = lis.map(li => ({ label: liLabel(li), full: liLabel(li) }))
  return (
    <div className="mt-1 mb-2 pl-6">
      <span className="font-sans text-[11px] uppercase tracking-wider text-mds-600 dark:text-mds-300">
        Eliminar ({chosen.length}/{max})
      </span>
      <ChipList options={options} chosen={chosen} max={max}
                onToggle={l => set(`sub.${opt.id}`, chosen.includes(l) ? chosen.filter(x => x !== l) : [...chosen, l])} />
    </div>
  )
}

function ParagraphChoice({ ctx, pc }) {
  const { data, set, ro } = ctx
  if (ro) return null
  if (pc.tipo === 'texto') {
    return (
      <div className="flex items-baseline gap-2 flex-wrap pl-2 mb-1">
        <span className="font-sans text-[11px] uppercase tracking-wider text-mds-600 dark:text-mds-300">{pc.rotulo}</span>
        <LineInput value={data.detalhe?.[pc.key] || ''} onChange={v => set(`detalhe.${pc.key}`, v)}
                   className="flex-1 min-w-[10rem] font-sans text-sm" placeholder="Escreva aqui…" />
      </div>
    )
  }
  const chosen = data.sub?.[pc.key] || []
  return (
    <div className="pl-2 mb-1">
      <span className="font-sans text-[11px] uppercase tracking-wider text-mds-600 dark:text-mds-300">{pc.rotulo} (escolha {numeroExtenso(pc.max)})</span>
      <ChipList options={pc.labels.map(l => ({ label: l, full: l }))} chosen={chosen} max={pc.max}
                onToggle={l => set(`sub.${pc.key}`, chosen.includes(l) ? chosen.filter(x => x !== l) : [...chosen, l])} />
    </div>
  )
}

// ---------- seção ----------

export function SectionView({ ctx, section, showImages = true, showTitle = true, isChecked, toggle, groups: groupsOverride }) {
  const { c, R, data, ro, d, editing, setEditing } = ctx
  const checked = isChecked || ctx.isChecked
  const onToggle = toggle || ctx.toggleOpt
  const groups = groupsOverride || ctx.groups
  const groupByOpt = new Map()
  for (const g of groups) for (const id of g.ids) groupByOpt.set(id, g)

  const states = new Map(groups.map(g => {
    const st = groupState(g, checked)
    const collapsed = !ro && !editing[g.key] && st.target > 0 && st.count >= st.target && !st.over && st.faltaPm === 0
    return [g.key, { st, collapsed, hideAll: g.max === 0 && st.count === 0 }]
  }))

  const rows = layoutItems(section.items, groupByOpt)
  const optHidden = (id) => {
    const g = groupByOpt.get(id)
    if (!g) return false
    const s = states.get(g.key)
    return s.hideAll || (s.collapsed && !checked(id))
  }
  const barShown = new Set()
  const eliminated = new Set(R.eliminar ? (data.sub?.[R.eliminar.opt] || []) : [])

  const fieldRenderer = (itemId) => (idx) => (
    <LineInput
      value={data.fields?.[`${itemId}_${idx}`] || ''}
      disabled={ro}
      onChange={v => ctx.set(`fields.${itemId}_${idx}`, v)}
      className="w-40 max-w-full mx-0.5"
      aria-label="Campo da cartilha"
    />
  )

  const out = []
  rows.forEach(({ it, owner, subGroup }, i) => {
    // barra do grupo antes do primeiro item dele
    const gHere = it.k === 'opt' ? groupByOpt.get(it.id) : (subGroup ? groups.find(g => g.key === subGroup) : null)
    if (gHere && !barShown.has(gHere.key) && !ro) {
      barShown.add(gHere.key)
      const s = states.get(gHere.key)
      out.push(
        <GroupBar key={`bar-${gHere.key}`} g={gHere} st={s.st} collapsed={s.collapsed} editing={!!editing[gHere.key]}
                  onEdit={() => setEditing(gHere.key, true)} onDone={() => setEditing(gHere.key, false)} />,
      )
    }

    if (owner && optHidden(owner)) return
    if (subGroup && states.get(subGroup)?.collapsed) return
    if (subGroup && states.get(subGroup)?.hideAll) return

    switch (it.k) {
      case 'p': {
        const pc = (R.paragrafos || []).find(p => plain(it.t).startsWith(p.inicio))
        out.push(
          <p key={i} className="mt-1">
            <RichText text={it.t} renderField={it.id ? fieldRenderer(it.id) : undefined} />
          </p>,
        )
        if (pc) out.push(<ParagraphChoice key={`pc-${i}`} ctx={ctx} pc={pc} />)
        if (owner && rows[i + 1]?.owner !== owner) out.push(...afterOption(owner, i))
        return
      }
      case 'li': {
        const prev = section.items.slice(0, i).reverse().find(x => x.k !== 'li')
        const elim = R.eliminar?.opt === owner && eliminated.has(liLabel(it))
        out.push(
          <div key={i} className={`flex gap-1.5 ${prev?.k === 'opt' ? 'pl-7' : 'pl-2'} ${elim ? 'line-through opacity-50' : ''}`}>
            <span className="text-mds-600 dark:text-mds-300">•</span>
            <span><RichText text={it.t} />{elim && <span className="no-underline font-sans text-xs ml-1">(eliminada)</span>}</span>
          </div>,
        )
        // escolhas da opção depois do último item dela
        if (owner && rows[i + 1]?.owner !== owner) out.push(...afterOption(owner, i))
        return
      }
      case 'opt': {
        if (optHidden(it.id)) return
        const g = groupByOpt.get(it.id)
        const s = g && states.get(g.key)
        const on = checked(it.id)
        const locked = s?.collapsed && on
        const blocked = g && !on && !canPick(g, s.st, it.id)
        const struck = (it.fixed && c.id === 'viajante' && d.criaEliminada) ||
                       (on && g?.key === 'maldicao' && d.maldicaoRemovida)
        out.push(
          <OptionLine key={i} fixed={it.fixed} ro={ro} checked={on} disabled={locked || blocked || s?.st.over && !on}
                      struck={struck} onToggle={() => onToggle(it.id)}>
            <RichText text={it.t} renderField={fieldRenderer(it.id)} />
            {struck && <span className="font-sans text-xs ml-1 no-underline">(eliminado por melhoria)</span>}
          </OptionLine>,
        )
        if (rows[i + 1]?.owner !== it.id) out.push(...afterOption(it.id, i))
        return
      }
      case 'img':
        if (showImages) out.push(<Illustration key={i} src={it.src} />)
        return
      default:
    }
  })

  function afterOption(id, i) {
    const block = { opt: section.items.find(x => x.id === id), lis: [] }
    const idx = section.items.indexOf(block.opt)
    for (let j = idx + 1; section.items[j]?.k === 'li'; j++) block.lis.push(section.items[j])
    const res = []
    if (R.eliminar?.opt === id) res.push(<EliminarChoices key={`el-${i}`} ctx={ctx} opt={block.opt} lis={block.lis} />)
    if (checked(id) || block.opt.fixed) res.push(<SubChoices key={`sub-${i}`} ctx={ctx} opt={block.opt} lis={block.lis} />)
    return res
  }

  return (
    <div className="break-inside-avoid mb-4">
      {showTitle && section.titulo && <H>{section.titulo}</H>}
      {out}
    </div>
  )
}
