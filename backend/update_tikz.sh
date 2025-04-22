#!/bin/bash

# ========================================================================
# Script per convertire blocchi TikZ in SVG all'interno di file Markdown
#
# Questo script cerca nei file Markdown (`.md`) tutti i blocchi di codice
# delimitati da ```tikz e li converte in immagini SVG. 
#
#Il processo include:
#
# 1. Verifica che i tool necessari siano installati: pdflatex, pdf2svg, md5sum.
# 2. Estrae i blocchi TikZ dai file Markdown.
# 3. Genera un hash del contenuto per evitare duplicati.
# 4. Compila il codice TikZ in PDF con pdflatex.
# 5. Converte il PDF in SVG usando pdf2svg.
# 6. Inserisce un tag <img> nel Markdown al posto del blocco TikZ originale.
# 7. Salva gli SVG in ./static/images/tikz/, usando l'hash come nome file.
#
# Questo è utile per generare versioni web-friendly dei diagrammi TikZ
# in modo automatico e riutilizzabile.
# ========================================================================

# Verifica la presenza dei tool necessari
command -v pdflatex >/dev/null 2>&1 || { echo "Installare pdflatex (texlive)"; exit 1; }
command -v pdf2svg >/dev/null 2>&1 || { echo "Installare pdf2svg"; exit 1; }
command -v md5sum >/dev/null 2>&1 || { echo "Installare md5sum (coreutils)"; exit 1; }

# Crea la directory per gli SVG (se non esiste)
mkdir -p "./static/images/tikz"

# Funzione per processare un singolo file markdown
process_file() {
    local md_file="$1"
    local temp_file="${md_file}.tmp"
    local in_tikz=0
    local tikz_content=""
    local line_num=0
    local replace_section=0
    
    # Crea file temporaneo
    true > "$temp_file"
    
    while IFS= read -r line || [ -n "$line" ]; do
        ((line_num++))
        
        # Rileva inizio blocco tikz
        if [[ "$line" =~ ^\`\`\`tikz ]]; then
            in_tikz=1
            tikz_content=""
            replace_section=1
            continue
        fi
        
        # Rileva fine blocco tikz
        if [[ "$in_tikz" -eq 1 && "$line" =~ ^\`\`\` ]]; then
            in_tikz=0
            
            # Genera hash del contenuto
            local tikz_hash=$(echo -n "$tikz_content" | md5sum | awk '{print $1}')
            local svg_path="./static/images/tikz/${tikz_hash}.svg"
            
            # Se l'SVG non esiste, crealo
            if [ ! -f "$svg_path" ]; then
                {
                    echo '\documentclass[preview]{standalone}'
                    echo "$tikz_content"
                } > "temp_${tikz_hash}.tex"
                
                pdflatex -interaction=nonstopmode "temp_${tikz_hash}.tex" >/dev/null 2>&1
                pdf2svg "temp_${tikz_hash}.pdf" "$svg_path" 2>/dev/null
                rm -f "temp_${tikz_hash}."{tex,aux,log,pdf}
            fi
            
            # Aggiungi il riferimento all'immagine
            echo "<img src=\"${svg_path:1}\" style=\"width: 100%; height: auto; max-height: 600px;\" class=\"tikz-svg\" />" >> "$temp_file"
            replace_section=0
            continue
        fi
        
        # Accumula contenuto tikz
        if [[ "$in_tikz" -eq 1 ]]; then
            tikz_content+="$line"$'\n'
        fi
        
        # Scrivi le linee normali
        if [[ "$replace_section" -eq 0 ]]; then
            echo "$line" >> "$temp_file"
        fi
        
    done < "$md_file"
    
    # Sostituisci il file originale
    mv "$temp_file" "$md_file"
}

# Processa tutti i file markdown ricorsivamente
while IFS= read -r -d $'\0' file; do
    echo "Processing: $file"
    process_file "$file"
done < <(find . -type f -name "*.md" -print0)

echo "Conversione completata. File SVG salvati in: ./static/images/tikz/"