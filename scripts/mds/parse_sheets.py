"""Converte as 13 cartilhas PDF em JSON estruturado (páginas > colunas > itens),
preservando negrito/itálico e as quebras de coluna."""
import pdfplumber, glob, os, json, re, sys
from collections import Counter

SRC = r'C:/Users/nicol/Desktop/Nicolas/RPG/Monstros da Semana/Fichas Classes'
OUT = 'cartilhas_raw.json'

def style_of(fontname):
    f = fontname.lower()
    b = 'bold' in f or 'black' in f or 'heavy' in f or 'semibold' in f
    i = 'italic' in f or 'oblique' in f
    return b, i

def line_text(chars):
    chars = sorted(chars, key=lambda c: c['x0'])
    out, cur_b, cur_i, last_x1 = [], False, False, None
    for c in chars:
        t = c['text']
        if t in ('\u034f',):  # combining grapheme joiner lixo
            continue
        size = c.get('size', 9)
        if last_x1 is not None and c['x0'] - last_x1 > size * 0.22 and t != ' ':
            if not out or out[-1] != ' ':
                out.append(' ')
        b, i = style_of(c['fontname'])
        if t.strip():
            if b != cur_b:
                out.append('**'); cur_b = b
            if i != cur_i:
                out.append('_'); cur_i = i
        out.append(t)
        last_x1 = c['x1']
    if cur_i: out.append('_')
    if cur_b: out.append('**')
    s = ''.join(out)
    s = re.sub(r' +', ' ', s)
    return s.strip()

def group_lines(chars):
    rows = []
    for c in sorted(chars, key=lambda c: (round(c['top']), c['x0'])):
        for r in rows:
            if abs(r['top'] - c['top']) < 2.5:
                r['chars'].append(c); break
        else:
            rows.append({'top': c['top'], 'chars': [c]})
    rows.sort(key=lambda r: r['top'])
    for r in rows:
        r['x0'] = min(c['x0'] for c in r['chars'] if c['text'].strip()) if any(c['text'].strip() for c in r['chars']) else 0
        r['size'] = Counter(round(c['size']) for c in r['chars']).most_common(1)[0][0]
        r['text'] = line_text(r['chars'])
    return [r for r in rows if r['text']]

def plain(s):
    return s.replace('**', '').replace('_', '')

def is_heading(r):
    t = plain(r['text']).strip()
    letters = [ch for ch in t if ch.isalpha()]
    return (len(letters) >= 4 and all(ch.isupper() for ch in letters)
            and not t.startswith(('□', '▣', '•')))

def parse_column(lines):
    items = []
    prev = None
    for r in lines:
        t = r['text']
        p = plain(t)
        if is_heading(r):
            items.append({'k': 'h', 't': t.replace('**', '').replace('_', ''), 'top': r['top'], 'x0': r['x0']})
        elif p.startswith(('□', '▣')):
            items.append({'k': 'opt', 'fixed': p.startswith('▣'), 't': re.sub(r'^(\*\*|_)*[□▣]\s*', r'\1', t).strip(), 'top': r['top'], 'x0': r['x0']})
        elif p.startswith('•'):
            items.append({'k': 'li', 't': t.replace('•', '', 1).strip(), 'top': r['top'], 'x0': r['x0']})
        else:
            if prev and items and items[-1]['k'] in ('opt', 'li') and r['x0'] > items[-1]['x0'] + 2 and r['top'] - prev['top'] < r['size'] * 1.6:
                items[-1]['t'] += '\n' + t
            elif prev and items and items[-1]['k'] == 'p' and r['top'] - prev['top'] < r['size'] * 1.45:
                items[-1]['t'] += '\n' + t
            else:
                items.append({'k': 'p', 't': t, 'top': r['top'], 'x0': r['x0']})
        prev = r
    return items

def main():
    data = {}
    for f in sorted(glob.glob(SRC + '/*.pdf')):
        name = os.path.basename(f).split(' (')[0]
        pdf = pdfplumber.open(f)
        pages = []
        for pi, page in enumerate(pdf.pages):
            seps = sorted(set(round(r['x0']) for r in page.rects if r['x1'] - r['x0'] < 3 and r['bottom'] - r['top'] > 300))
            xs = [0] + seps + [page.width]
            cols = []
            for ci in range(len(xs) - 1):
                crop = page.crop((xs[ci], 0, xs[ci + 1], page.height))
                lines = group_lines(crop.chars)
                items = parse_column(lines)
                imgs = [{'k': 'img', 'top': im['top'], 'bottom': im['bottom'], 'x0': im['x0'], 'x1': im['x1'],
                         'w': im['x1'] - im['x0'], 'h': im['bottom'] - im['top']}
                        for im in page.images if xs[ci] <= im['x0'] < xs[ci + 1] and (im['x1'] - im['x0']) > 40]
                cols.append({'items': items, 'imgs': imgs})
            pages.append(cols)
        data[name] = pages
        print(name, [[len(c['items']) for c in p] for p in pages], [[len(c['imgs']) for c in p] for p in pages])
    json.dump(data, open(OUT, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)

main()
