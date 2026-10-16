"""Gera src/mds/data/cartilhas.js a partir de cartilhas_raw.json + extrai as ilustrações."""
import json, re, os
import pypdfium2 as pdfium

PROJECT = r'C:/Users/nicol/OneDrive/Área de Trabalho/Actung Catulo'
SRC = r'C:/Users/nicol/Desktop/Nicolas/RPG/Monstros da Semana/Fichas Classes'
raw = json.load(open('cartilhas_raw.json', encoding='utf-8'))

IDS = {'Arcano': 'arcano', 'Delinquente': 'delinquente', 'Divino': 'divino', 'Escolhido': 'escolhido',
       'Especialista': 'especialista', 'Iniciado': 'iniciado', 'Injustiçado': 'injusticado',
       'Lunático': 'lunatico', 'Monstruoso': 'monstruoso', 'Mundano': 'mundano',
       'Profissional': 'profissional', 'Sinistro': 'sinistro', 'Viajante': 'viajante'}

# ---------- limpeza de texto ----------
alltext = ' '.join(it['t'] for pages in raw.values() for p in pages for c in p for it in c['items'])
plain_all = alltext.replace('**', '').replace('_', '')
COMPOUNDS = set(m.lower() for m in re.findall(r'\b\w+-\w+\b', plain_all.replace('-\n', '')))
COMPOUNDS |= {'ignora-armadura', 'drena-vida', 'homem-lobo', 'espaço-tempo', 'meio-humano', 'meio-monstro',
              'semi-lícito', 'cano-serrado', 'não-natural', 'não-naturais', 'guarda-costas', 'pós-apocalíptico',
              'matéria-prima', 'e/ou'}

def join_lines(t):
    # hífen de quebra dentro de marcação: "por-**\n**rada" -> "porrada"
    t = re.sub(r'-(\*\*|_)\n\1', lambda m: '-\n', t)
    def hy(m):
        a, b = m.group(1), m.group(2)
        word = f'{a}-{b}'.lower()
        if a[-1:].isdigit() or word in COMPOUNDS:
            return f'{a}-{b}'
        return a + b
    t = re.sub(r'(\w+)-\n(\w+)', hy, t)
    t = re.sub(r'(\*\*|_)\n\1', ' ', t)   # marcação continua na próxima linha
    t = t.replace('\n', ' ')
    t = re.sub(r' +', ' ', t)
    # espaços dentro de marcadores: "**Nome: **Texto" -> "**Nome:** Texto"
    for mk in ('**', '_'):
        t = normalize_marks(t, mk)
    t = re.sub(r' +', ' ', t)
    return t.strip()

def normalize_marks(t, mk):
    parts = t.split(mk)
    if len(parts) % 2 == 0:  # marcador desemparelhado: não mexe
        return t
    out = [parts[0]]
    for i in range(1, len(parts)):
        seg = parts[i]
        if i % 2 == 1:  # conteúdo marcado
            lead = seg[:len(seg) - len(seg.lstrip())]
            trail = seg[len(seg.rstrip()):]
            core = seg.strip()
            if not core:
                out.append(seg)
                continue
            out.append(lead + mk + core + mk + trail)
        else:
            out.append(seg)
    return ''.join(out)

# ---------- errata e correções de digitação ----------
ERRATA = [
    ('o fogo não via se espalhar', 'o fogo não vai se espalhar'),
    ('Faça abençoada', 'Faca abençoada'),
    ('armas destruidoras monstros', 'armas destruidoras de monstros'),
    ('para e le.', 'para ele.'),
    ('até que a lute acabe', 'até que a luta acabe'),
    ('Seus poderes vêm uma fonte', 'Seus poderes vêm de uma fonte'),
    ('estes pedidos começaram a ficar', 'estes pedidos começarão a ficar'),
    ('para de dar −1', 'para dar −1'),
    ('você a conhece única pessoa', 'você conhece a única pessoa'),
    ('contato que sua voz', 'contanto que sua voz'),
    ('padrões amplos possam envolver', 'padrões amplos que possam envolver'),
    ('equipe caçadora monstros então preciso que fazer', 'equipe caçadora de monstros, então preciso fazer'),
    ('essencial espiritual', 'essência espiritual'),
    ('Ele contam como', 'Ele conta como'),
    ('resposta para seu o questionamento', 'resposta para o seu questionamento'),
    ('Ele é um algum tipo', 'Ele é algum tipo'),
    ('seu caçador Delinquente pelo', 'seu caçador Viajante pelo'),  # errata do Viajante (livro p. 112)
    ('Faça abençoada', 'Faca abençoada'),
]

# campos de texto embutidos (linhas em branco da ficha)
FIELDS = {
    'Um investigador da polícia, , assumiu': 'Um investigador da polícia, {{campo}}, assumiu',
    'Você teve um rival no seu passado, , que': 'Você teve um rival no seu passado, {{campo}}, que',
    'Você irritou um criminoso influente, , e': 'Você irritou um criminoso influente, {{campo}}, e',
}
FIELD_STARTS = {  # opções que começam com o campo
    'é alguém com poderes especiais': '{{campo}} ',
    'é um velho parceiro que você': '{{campo}} ',
}
FIELD_ENDS = ['Seu pai e/ou mãe:', 'Seu(s) irmão(s):', 'Seu esposo(a)/parceiro(a):', 'Seu(s) filho(s):',
              'Seu(s) melhor(es) amigo(s):', 'Minha presa:', 'Material:']

applied = set()
def fix(t):
    for a, b in ERRATA:
        if a in t:
            t = t.replace(a, b); applied.add(a)
    for a, b in FIELDS.items():
        if a in t:
            t = t.replace(a, b); applied.add(a)
    for a, pre in FIELD_STARTS.items():
        if t.startswith(a):
            t = pre + t; applied.add(a)
    for a in FIELD_ENDS:
        if t == a:
            t = f'{a} {{{{campo}}}}'; applied.add(a)
    return t

STAT_NAMES = ['Braveza', 'Esperteza', 'Estranheza', 'Firmeza', 'Sutileza']
STAT_KEYS = ['bra', 'esp', 'est', 'fir', 'sut']

def parse_stats(t):
    p = t.replace('**', '').replace('_', '')
    vals = {}
    for name, key in zip(STAT_NAMES, STAT_KEYS):
        m = re.search(name + r'\s*([+−\-±]\s*\d)', p)
        s = m.group(1).replace(' ', '').replace('−', '-').replace('±', '')
        vals[key] = int(s)
    return vals

def plain(t):
    return t.replace('**', '').replace('_', '')

# Listas de caixas em duas subcolunas (Heroísmo/Perdição do Escolhido, Tradições do Iniciado) saem
# do parser emendadas numa linha só ("Sacrifício □Uma vida normal"). Aqui elas são reextraídas do PDF:
# cada palavra pertence ao último "□" acima dela na mesma subcoluna. Ordem: subcoluna esquerda, depois a direita.
import pdfplumber

def column_bounds(page):
    seps = sorted(set(round(r['x0']) for r in page.rects if r['x1'] - r['x0'] < 3 and r['bottom'] - r['top'] > 300))
    xs = [0] + seps + [page.width]
    return list(zip(xs[:-1], xs[1:]))

def split_two_col(plumb_page, col_x, top, bottom):
    words = [w for w in plumb_page.extract_words()
             if col_x[0] <= w['x0'] < col_x[1] and top - 3 <= w['top'] < bottom - 1]
    marks = [w for w in words if w['text'].startswith('□')]
    subx = sorted(set(round(m['x0']) for m in marks))
    def sub(w):
        return max((i for i, x in enumerate(subx) if x <= w['x0'] + 1), default=0)
    boxes = [{'sub': sub(m), 'top': m['top'], 'words': []} for m in marks]
    for w in sorted(words, key=lambda w: (w['top'], w['x0'])):
        own = [b for b in boxes if b['sub'] == sub(w) and b['top'] <= w['top'] + 3]
        if not own:
            raise ValueError(f'palavra sem caixa: {w["text"]}')
        max(own, key=lambda b: b['top'])['words'].append(w['text'].lstrip('□'))
    boxes.sort(key=lambda b: (b['sub'], b['top']))
    return [' '.join(x for x in b['words'] if x) for b in boxes]

def fix_two_col(items, plumb_page, col_x, col_bottom):
    out, i, splits = [], 0, 0
    while i < len(items):
        it = items[i]
        if it['k'] == 'opt' and '□' in plain(it['t']):
            j = i
            while j + 1 < len(items) and items[j + 1]['k'] == 'opt':
                j += 1
            bottom = items[j + 1]['top'] if j + 1 < len(items) else col_bottom
            for t in split_two_col(plumb_page, col_x, it['top'], bottom):
                out.append({'k': 'opt', 't': t, 'top': it['top'] + len(out) * 0.001})
            splits += 1
            i = j + 1
        else:
            out.append(it); i += 1
    return out, splits

import pypdfium2.raw as pdfium_raw
def _store(img, path):
    img.thumbnail((900, 900))
    img.save(path, 'WEBP', quality=82, method=6)

def save_image(page, im, path):
    """Salva o objeto de imagem da página (sem o texto ao redor); recorte renderizado como reserva."""
    H = page.get_height()
    for o in page.get_objects(filter=[pdfium_raw.FPDF_PAGEOBJ_IMAGE]):
        l, b, r, t = o.get_bounds()
        if abs(l - im['x0']) < 2 and abs((H - t) - im['top']) < 2:
            _store(o.get_bitmap(render=True).to_pil(), path)
            return
    _store(page.render(scale=3, crop=(im['x0'], H - im['bottom'], page.get_width() - im['x1'], im['top'])).to_pil(), path)

# ---------- montagem ----------
os.makedirs(PROJECT + '/public/mds/cartilhas', exist_ok=True)
result = []
for nome, pages in raw.items():
    cid = IDS[nome]
    p1, p2 = pages
    # página 1 — itens em sequência (colunas 1..3)
    seq = [it for c in p1 for it in c['items']]
    for it in seq:
        it['t'] = fix(join_lines(it['t']))
    heads = [i for i, it in enumerate(seq) if it['k'] == 'h']
    def section(title):
        idx = next((i for i in heads if seq[i]['t'].startswith(title)), None)
        if idx is None: return []
        nxt = next((i for i in heads if i > idx), len(seq))
        return seq[idx + 1:nxt]
    col1 = p1[0]['items']
    titulo = next(it['t'] for it in col1 if it['k'] in ('p', 'h') and plain(it['t']).strip(' ,'))
    first_h = min((it['top'] for it in col1 if it['k'] == 'h'), default=999)
    lema = [fix(join_lines(it['t'])) for it in col1 if it['k'] == 'p' and 100 < it['top'] < first_h]
    sorte_sec = section('SORTE')
    especial = next((it['t'] for it in sorte_sec if plain(it['t']).startswith('Especial')), None)
    criacao = next(it['t'] for it in section('CRIAÇÃO DO CAÇADOR') if it['k'] == 'p')
    aparencia = [plain(it['t']).rstrip('.') for it in section('APARÊNCIA') if it['k'] == 'li']
    classificacoes = [parse_stats(it['t']) for it in section('CLASSIFICAÇÕES') if it['k'] == 'opt']
    apresentacoes = ' '.join(it['t'] for it in section('APRESENTAÇÕES') if it['k'] == 'p')
    hist_sec = section('HISTÓRICO')
    historico_intro = next((it['t'] for it in hist_sec if it['k'] == 'p'), '')
    historico = [it['t'] for it in hist_sec if it['k'] == 'li']
    subindo = [it['t'] for it in section('SUBINDO DE NÍVEL') if it['k'] == 'p' and 'Experiência' not in it['t']]
    melh_sec = section('MELHORIAS')
    melhorias = [it['t'] for it in melh_sec if it['k'] == 'opt']
    melh_nota = [it['t'] for it in melh_sec if it['k'] == 'p']
    avancadas = [it['t'] for it in section('MELHORIAS AVANÇADAS') if it['k'] == 'opt']

    # página 2 — colunas com itens + ilustrações
    pdf = pdfium.PdfDocument(f'{SRC}/{nome} (cartilha completável).pdf')
    page2 = pdf[1]
    plumb2 = pdfplumber.open(f'{SRC}/{nome} (cartilha completável).pdf').pages[1]
    bounds2 = column_bounds(plumb2)
    cols = []
    counter = 0
    img_n = 0
    for ci, c in enumerate(p2):
        raw_items, n_split = fix_two_col(c['items'], plumb2, bounds2[ci], plumb2.height)
        if n_split:
            print(f'  {nome} col {ci}: {n_split} lista(s) em duas subcolunas separadas')
        items = []
        for it in raw_items:
            out = {'k': it['k'], 't': fix(join_lines(it['t'])), 'top': it['top']}
            if it['k'] == 'opt':
                counter += 1
                out['id'] = f'o{counter}'
                if it.get('fixed'): out['fixed'] = True
            elif '{{campo}}' in out['t']:
                out['id'] = f"f{sum(1 for cc in cols for x in cc if x.get('id','').startswith('f')) + sum(1 for x in items if x.get('id','').startswith('f')) + 1}"
            items.append(out)
        for im in c['imgs']:
            img_n += 1
            fname = f'{cid}-{img_n}.webp'
            save_image(page2, im, f'{PROJECT}/public/mds/cartilhas/{fname}')
            items.append({'k': 'img', 'src': f'/mds/cartilhas/{fname}', 'top': im['top'], 'w': round(im['w']), 'h': round(im['h'])})
        items.sort(key=lambda x: x['top'])
        for x in items: x.pop('top', None)
        cols.append(items)

    # ilustrações da página 1 (ficam ao pé da 3ª coluna)
    page1 = pdf[0]
    imgs_p1 = []
    for c in p1:
        for im in c['imgs']:
            img_n += 1
            fname = f'{cid}-{img_n}.webp'
            save_image(page1, im, f'{PROJECT}/public/mds/cartilhas/{fname}')
            imgs_p1.append({'src': f'/mds/cartilhas/{fname}', 'w': round(im['w']), 'h': round(im['h'])})

    result.append({
        'id': cid, 'nome': nome, 'imagensPagina1': imgs_p1, 'titulo': f'O {nome}', 'lema': lema,
        'sorteEspecial': especial, 'criacao': criacao, 'aparencia': aparencia,
        'classificacoes': classificacoes, 'apresentacoes': apresentacoes,
        'historicoIntro': historico_intro, 'historico': historico, 'subindo': subindo,
        'melhorias': melhorias, 'melhoriasNota': melh_nota, 'avancadas': avancadas,
        'pagina2': cols,
    })
    print(nome, '| lema:', len(lema), '| aparência', len(aparencia), '| cls', len(classificacoes),
          '| hist', len(historico), '| melh', len(melhorias), '| avanç', len(avancadas),
          '| p2 opts', counter, '| imgs', img_n, '| especial', bool(especial))

missing = [a for a, _ in ERRATA if a not in applied] + [a for a in list(FIELDS) + list(FIELD_STARTS) + FIELD_ENDS if a not in applied]
print('NÃO APLICADOS:', missing)

header = ('// Gerado a partir das cartilhas preenchíveis (Fichas Classes/*.pdf) com a errata aplicada.\n'
          '// Marcação: **negrito**, _itálico_, {{campo}} = campo de texto dentro da frase.\n'
          '// pagina2 = três colunas, na mesma ordem da ficha impressa.\n')
js = header + 'export const CARTILHAS = ' + json.dumps(result, ensure_ascii=False, indent=2) + '\n\n' \
     'export const CARTILHAS_BY_ID = Object.fromEntries(CARTILHAS.map(c => [c.id, c]))\n'
os.makedirs(PROJECT + '/src/mds/data', exist_ok=True)
open(PROJECT + '/src/mds/data/cartilhas.js', 'w', encoding='utf-8').write(js)
print('bytes', len(js))
