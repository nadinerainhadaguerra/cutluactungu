import RichText from './RichText'
import { SectionView, MoveText, ForeignMove } from './Choices'
import { H, TextArea } from './parts'
import { TIPOS_ALIADO } from '../../data/regras'
import { CARTILHAS_BY_ID } from '../../data/cartilhas'
import { sectionsOf, regrasDe, expand, plain, moveRef, textoMelhoria, PREFIXO } from './rules'

// Aba "Ações": tudo da Página 2 (escolhas já recolhidas) + o que as melhorias acrescentaram.

const ESPECIALISTA = CARTILHAS_BY_ID.especialista
const refugioSection = () => sectionsOf(ESPECIALISTA).find(s => s.titulo === 'REFÚGIO')
const bibliotecaMistica = () => refugioSection().items.find(it => it.k === 'opt' && plain(it.t).startsWith('Biblioteca mística'))

function ExtraRefugio({ ctx }) {
  const { data, set, d } = ctx
  const sec = refugioSection()
  const opts = sec.items.filter(it => it.k === 'opt')
  const isChecked = id => !!data.extra?.refugio?.[id]
  const group = { key: 'refugioExtra', ids: expand(opts.map(o => o.id)), max: d.refugioExtra, min: d.refugioExtra, pm: null }
  return (
    <div className="break-inside-avoid mb-4">
      <H>Refúgio</H>
      <p className="italic text-sm">Como o do Especialista. Decida como você conseguiu este refúgio e onde ele fica.</p>
      <SectionView
        ctx={{ ...ctx, c: ESPECIALISTA, R: regrasDe(ESPECIALISTA) }}
        section={{ titulo: null, items: opts }}
        groups={[group]}
        isChecked={isChecked}
        toggle={id => set(`extra.refugio.${id}`, !isChecked(id))}
        showTitle={false}
      />
    </div>
  )
}

export default function ActionsTab({ ctx }) {
  const { c, data, set, ro, d } = ctx
  const sections = sectionsOf(c)
  const registros = d.registros

  return (
    <div>
      <div className="lg:columns-2 gap-8">
        {sections.map((s, i) => <SectionView key={i} ctx={ctx} section={s} />)}

        {d.refugioExtra !== null && <ExtraRefugio ctx={ctx} />}

        {d.biblioteca && (
          <div className="break-inside-avoid mb-4">
            <H>Biblioteca mística</H>
            <MoveText refStr={moveRef(ESPECIALISTA.id, bibliotecaMistica().id)} showCartilha={false} />
          </div>
        )}

        {d.outros.length > 0 && (
          <div className="break-inside-avoid mb-4">
            <H>Movimentos de outras cartilhas</H>
            <div className="space-y-2">{d.outros.map(ref => <ForeignMove key={ref} ctx={ctx} refStr={ref} prefixo={PREFIXO.outra} />)}</div>
          </div>
        )}

        {d.mantidos.length > 0 && (
          <div className="break-inside-avoid mb-4">
            <H>Mantidos da cartilha anterior</H>
            <div className="space-y-2">{d.mantidos.map(ref => <ForeignMove key={ref} ctx={ctx} refStr={ref} prefixo={PREFIXO.mantido} />)}</div>
          </div>
        )}

        {d.basicos.length > 0 && (
          <div className="break-inside-avoid mb-4">
            <H>Movimentos básicos avançados</H>
            <p className="text-sm italic">Com 12+ nestes movimentos você recebe o resultado avançado (livro p. 154–155).</p>
            <ul className="mt-1">{d.basicos.map(m => <li key={m} className="flex gap-1.5"><span className="text-mds-600 dark:text-mds-300">•</span>{m}</li>)}</ul>
          </div>
        )}

        {d.aliados.length > 0 && (
          <div className="break-inside-avoid mb-4">
            <H>Aliados e equipes</H>
            <ul className="space-y-1">
              {d.aliados.map((a, i) => {
                const tipo = TIPOS_ALIADO.find(t => t.key === a.tipo)
                return (
                  <li key={i}>
                    <strong>{a.nome}</strong> — {a.equipe ? 'Equipe' : 'Aliado'}: {tipo?.label.toLowerCase()}
                    <span className="italic"> (motivação: {tipo?.motivacao})</span>
                    {a.desc && <div className="text-sm">{a.desc}</div>}
                  </li>
                )
              })}
            </ul>
          </div>
        )}

        {registros.length > 0 && (
          <div className="break-inside-avoid mb-4">
            <H>Outras melhorias</H>
            <ul className="space-y-1">
              {registros.map((n, i) => (
                <li key={i} className="flex gap-1.5">
                  <span className="text-mds-600 dark:text-mds-300">•</span>
                  <span><RichText text={textoMelhoria(n)} />{n.d?.nota && <span className="italic"> — {n.d.nota}</span>}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {!ro && (
        <div className="mt-2">
          <H>Anotações do caçador</H>
          <TextArea value={data.anotacoes} onChange={v => set('anotacoes', v)} rows={5}
                    placeholder="Equipamentos extras, aliados, pistas, o que quiser…" />
        </div>
      )}
    </div>
  )
}
