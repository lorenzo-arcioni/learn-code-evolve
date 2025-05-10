
import re
import os
import markdown
from fastapi import HTTPException
import urllib.parse
from markdown.extensions.codehilite import CodeHiliteExtension
from markdown.extensions.toc import TocExtension
from pygments.formatters import HtmlFormatter

CONTENT_DIR = "content/theory"

# Scegli lo stile Pygments per evidenziazione del codice (es: 'monokai', 'dracula', 'solarized-dark')
PYGMENTS_STYLE = 'rrt'
# Genera il CSS per i blocchi di codice .codehilite
PYGMENTS_CSS = HtmlFormatter(style=PYGMENTS_STYLE).get_style_defs('.codehilite')

# CSS per il pulsante "Copy"
COPY_BUTTON_CSS = '''
.code-wrapper { position: relative; }
.copy-button {
    position: absolute;
    top: 8px;
    right: 8px;
    padding: 4px 8px;
    font-size: 0.8em;
    cursor: pointer;
    border: none;
    border-radius: 4px;
    background: #eee;
}
'''

def protect_math_content(md_content):
    math_blocks = []
    
    pattern_block = re.compile(r'(\$\$.*?\$\$)', re.DOTALL)
    pattern_inline = re.compile(r'(?<!\\)\$([^\$]*?(?<!\\))\$')
    
    def replace_block(match):
        math_blocks.append(match.group(1))
        return f'@@MATH_BLOCK_{len(math_blocks)-1}@@'
    
    def replace_inline(match):
        math_blocks.append(match.group(0))
        return f'@@MATH_INLINE_{len(math_blocks)-1}@@'
    
    protected = pattern_block.sub(replace_block, md_content)
    protected = pattern_inline.sub(replace_inline, protected)
    
    return protected, math_blocks

def restore_math_content(html_content, math_blocks):
    for i, math in enumerate(math_blocks):
        html_content = html_content.replace(f'@@MATH_BLOCK_{i}@@', math)
        html_content = html_content.replace(f'@@MATH_INLINE_{i}@@', math)
    return html_content

def remove_math_paragraphs(html_content):
    html_content = re.sub(
        r'<p>\s*(\$\$.*?\$\$)\s*</p>',
        r'\1',
        html_content,
        flags=re.DOTALL
    )
    html_content = re.sub(
        r'<p>\s*(\$.*?\$)\s*</p>',
        r'\1',
        html_content,
        flags=re.DOTALL
    )
    return html_content


def find_markdown_file(name):
    target_filename = name.lower().replace('&rsquo;', '\'') + '.md'

    for root, _, files in os.walk(CONTENT_DIR):
        for file in files:
            if file.lower() == target_filename:
                return os.path.relpath(os.path.join(root, file), CONTENT_DIR)
    return None

def extract_title_from_markdown(md_content):
    match = re.search(r'^# (.+)', md_content, re.MULTILINE)
    return match.group(1) if match else "No title found"

def process_obsidian_links(html_content):
    def replace_link(match):
        file_name = match.group(1).strip()
        display_text = match.group(2).strip() if match.group(2) else file_name

        file_path = find_markdown_file(file_name)
        
        if file_path:
            link = f"/theory/{file_path.removesuffix('.md')}"
            return f'<a href="{link}" class="text-primary hover:underline">{display_text}</a>'
        return f'<span class="text-red-500">{display_text}</span>'
    
    return re.sub(
        r'\[\[(.*?)(?:\|(.*?))?\]\]',
        replace_link, 
        html_content,
        flags=re.DOTALL
    )

def build_directory_tree():
    categories = {}
    
    # Assicurati che la directory dei contenuti esista
    if not os.path.exists(CONTENT_DIR):
        os.makedirs(CONTENT_DIR, exist_ok=True)
        
    # Esplora l'albero delle directory
    for root, _, files in os.walk(CONTENT_DIR):
        relative_path = os.path.relpath(root, CONTENT_DIR)
        if relative_path == '.':
            continue
            
        # Se sono presenti file .md, aggiungi alla struttura
        filtered_files = [
            {
                "name": f.removesuffix('.md'),
                "path": os.path.join(relative_path, f).replace('\\', '/'),
            }
            for f in files if f.endswith(".md")
        ]
        
        if filtered_files:
            categories[relative_path] = filtered_files

    return build_hierarchy(categories)

def build_hierarchy(categories):
    hierarchy = {'subcategories': {}, 'files': []}
    
    for path, files in categories.items():
        parts = path.split(os.sep)
        current_node = hierarchy
        
        for part in parts:
            if part not in current_node['subcategories']:
                current_node['subcategories'][part] = {
                    'subcategories': {},
                    'files': []
                }
            current_node = current_node['subcategories'][part]
        
        current_node['files'] = files
    
    return hierarchy['subcategories']

def process_image_links(html_content):
    # Pattern che cattura l'intero <img ...> e dentro group(2) il valore di src
    pattern = r'(<img\b[^>]*\bsrc="([^"]+)"[^>]*>)'

    def replacer(match):
        full_tag = match.group(1)   # es. <img src="..." class="...">
        src_value = match.group(2)  # es. ../../../images/foo.jpg

        # Se nel tag c'è class="..." che contiene tikz‑svg, non toccare nulla
        if re.search(r'\bclass\s*=\s*"[^"]*\btikz-svg\b[^"]*"', full_tag):
            return full_tag

        # Altrimenti ricava il file e ricostruisci il src
        filename = src_value.rsplit('/', 1)[-1]
        new_src = f'/static/images/posts/{filename}'

        # Sostituisci solo il src originale
        return full_tag.replace(f'src="{src_value}"', f'src="{new_src}"')

    return re.sub(pattern, replacer, html_content)

def parse_markdown_content(file_path: str):
    try:
        # Leggi il file Markdown
        with open(file_path, "r", encoding="utf-8") as f:
            md_content = f.read()
        
        # Estrai titolo e rimuovi la prima riga (titolo)
        title = extract_title_from_markdown(md_content)
        md_content = "\n".join(md_content.split("\n")[1:])
        
        # Proteggi i blocchi matematici
        protected_content, math_blocks = protect_math_content(md_content)
        
        # Configura le estensioni Markdown con evidenziazione del codice
        extensions = [
            'fenced_code',
            'tables',
            'nl2br',
            'md_in_html',
            'extra',
            'attr_list',
            'smarty',
            'toc',
            'admonition',
            'def_list',
            'footnotes',
            'sane_lists',
            CodeHiliteExtension(linenums=False, guess_lang=True, css_class='codehilite'),
        ]
        extension_configs = {
            'codehilite': {
                'linenums': False,
                'guess_lang': True,
                'css_class': 'codehilite'
            }
        }

        # Converte Markdown in HTML
        html_body = markdown.markdown(
            protected_content,
            extensions=extensions,
            extension_configs=extension_configs
        )

        # Avvolgi ogni blocco .codehilite in un .code-wrapper con pulsante copy inline
        def wrap_code(match):
            code_block = match.group(0)
            # Pulsante con onclick inline per evitare problemi di esecuzione script
            button = (
                '<button class="copy-button" '
                'onclick="(function(btn){'
                'var code=btn.parentElement.querySelector(\'pre\');'
                'if(code){navigator.clipboard.writeText(code.innerText);'
                'btn.textContent=\'Copied!\';'
                'setTimeout(function(){btn.textContent=\'Copy\';},2000);} '
                '})(this)">Copy</button>'
            )
            return f'<div class="code-wrapper">\n' + button + '\n' + code_block + '\n</div>'

        import re
        html_with_wrappers = re.sub(r'(<div class="codehilite"[\s\S]*?<\/div>)', wrap_code, html_body)

        # Inietta i CSS di Pygments e del pulsante copy
        style_block = f"<style>{PYGMENTS_CSS}\n{COPY_BUTTON_CSS}</style>"
        html_content = style_block + html_with_wrappers

        # Ripristina formule matematiche e processa link/immagini
        html_content = restore_math_content(html_content, math_blocks)
        html_content = html_content.replace('\\_', '_')
        html_content = remove_math_paragraphs(html_content)
        html_content = process_obsidian_links(html_content)
        html_content = process_image_links(html_content)
        
        return {
            "title": title,
            "content": html_content
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
