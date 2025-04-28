# Sparse VSMs (Vector Space Models Sparsi)

I **modelli di spazio semantico sparsi** (Sparse VSMs) rappresentano il significato delle parole o dei documenti utilizzando **conteggi espliciti** di occorrenza o co-occorrenza tra termini.  
Queste rappresentazioni sono chiamate "sparse" perché, in genere, la maggior parte delle celle nella matrice risultante sono **zero**: molte parole non compaiono nella maggior parte dei documenti o dei contesti.

## 1. Matrice Term-Documento

Una delle prime tecniche di rappresentazione è la **matrice term-documento**, dove:

- Ogni **riga** corrisponde a un termine del vocabolario.
- Ogni **colonna** rappresenta un documento (ad esempio un libro, una pagina web, ecc.).
- L'**elemento** $[i,j]$ rappresenta il numero di volte in cui il termine $i$ appare nel documento $j$.

> Questa matrice consente di rappresentare ogni documento come un **vettore di conteggi** di parole.

### Esempio

Supponiamo di avere il seguente **corpus**:

- "As You Like It"
- "Twelfth Night"
- "Julius Caesar"
- "Henry V"

E un **vocabolario** composto da:

$$ V = \{ \text{"battle"}, \text{"good"}, \text{"fool"}, \text{"wit"} \} $$

Costruiamo la seguente matrice:

| Termine | As You Like It | Twelfth Night | Julius Caesar | Henry V |
|:--------|:---------------|:--------------|:--------------|:--------|
| battle  | 0               | 0              | 5             | 11      |
| good    | 114             | 125            | 32            | 38      |
| fool    | 46              | 58             | 0             | 0       |
| wit     | 37              | 20             | 0             | 0       |

**Interpretazione**:
- Il termine "battle" appare 5 volte in *Julius Caesar* e 11 volte in *Henry V*, ma non è presente negli altri documenti.
- Il termine "good" è molto più distribuito tra i documenti.

Quindi, ad esempio, *Julius Caesar* può essere rappresentato dal vettore:

$$ \text{Julius Caesar} = (5, 32, 0, 0) $$

<img src="/static/images/tikz/4a918b152a58a2cb8e3f83b2e9d5e46e.svg" style="width: 100%; height: auto; max-height: 600px;" class="tikz-svg" />

## 2. Matrice Parola-Parola (Co-occorrenze)

Un altro approccio di rappresentazione è costruire una **matrice di co-occorrenza parola-parola**. Invece di documenti, consideriamo **finestre locali** di testo, e contiamo quante volte due parole appaiono vicine.

### Procedura:

1. Definire una **finestra mobile** di ampiezza $n$ (ad esempio, 3 parole).
2. Far scorrere la finestra lungo il testo.
3. Per ogni finestra, aggiornare il conteggio di co-occorrenza tra le parole che compaiono.

### Esempio

Testo di partenza:

> "Salve a tutti questo è un esempio"

Parametri:
- $m = 7$ (numero di parole)
- $n = 3$ (ampiezza finestra)

**Sotto-contesti** (finestra mobile con padding):

- "* * Salve"
- "* Salve a"
- "Salve a tutti"
- "a tutti questo"
- "tutti questo è"
- "questo è un"
- "è un esempio"
- "un esempio *"
- "esempio * *"

Costruiamo la **matrice di co-occorrenza**:

|           | Salve |  a  | tutti | questo |  è  |  un | esempio |
|:----------|:-----:|:---:|:-----:|:------:|:---:|:---:|:-------:|
| **Salve**   |   –   |  2  |   1   |    0   |  0  |  0  |    0    |
| **a**       |   2   |  –  |   2   |    1   |  0  |  0  |    0    |
| **tutti**   |   1   |  2  |   –   |    2   |  1  |  0  |    0    |
| **questo**  |   0   |  1  |   2   |    –   |  2  |  1  |    0    |
| **è**       |   0   |  0  |   1   |    2   |  –  |  2  |    1    |
| **un**      |   0   |  0  |   0   |    1   |  2  |  –  |    2    |
| **esempio** |   0   |  0  |   0   |    0   |  1  |  2  |    –    |

Questo è il codice Python che costruisce la matrice di co-occorrenza:

```python
import pandas as pd
from collections import defaultdict

def generate_cooccurrence_matrix(text: str, window_size: int) -> pd.DataFrame:
    # 1. Tokenizza e aggiungi padding '*' di lunghezza window_size-1 ai bordi
    tokens = text.split()
    pad = ['*'] * (window_size - 1)
    padded = pad + tokens + pad

    # 2. Estrai tutte le sotto-stringhe (finestre) di lunghezza window_size
    windows = [padded[i:i+window_size] for i in range(len(padded) - window_size + 1)]

    # 3. Conta le co-occorrenze: per ogni finestra, ogni coppia di parole reali (non '*')
    cooc = defaultdict(lambda: defaultdict(int))
    for w in windows:
        real = [t for t in w if t != '*']
        for i in range(len(real)):
            for j in range(i+1, len(real)):
                cooc[real[i]][real[j]] += 1
                cooc[real[j]][real[i]] += 1

    # 4. Costruisci la matrice (DataFrame) con le parole originali nell’ordine iniziale
    df = pd.DataFrame('-', index=tokens, columns=tokens)
    for w1 in tokens:
        for w2 in tokens:
            if w1 != w2:
                df.at[w1, w2] = cooc[w1].get(w2, 0)
    return df

# Esempio
text = "Salve a tutti questo è un esempio"
window_size = 3
matrix = generate_cooccurrence_matrix(text, window_size)
print(matrix)
```

**Interpretazione**:

- "a" e "tutti" co-occorrono due volte (nella finestra "Salve a tutti" e "a tutti questo").
- "questo" co-occorre sia con "tutti" sia con "è".

Così, ogni parola è rappresentata da un **vettore di co-occorrenze** con le altre parole.

## 3. Bag of Words (BoW)


Il **modello Bag-of-Words** (BoW) è una delle tecniche più semplici e popolari per rappresentare il contenuto testuale in modo numerico, adatto all'elaborazione da parte degli algoritmi di Machine Learning.

**Principio di base**:
- Un documento o una frase viene rappresentato come un **insieme di parole**, ignorando completamente:
  - L'**ordine** delle parole.
  - La **struttura grammaticale** o sintattica.
- Si tiene traccia esclusivamente delle **parole presenti** e della loro **frequenza**.

### Modalità di rappresentazione:
- **BoW binario**: registra solo se una parola è presente ($1$) o assente ($0$), indipendentemente dal numero di volte in cui appare.
- **BoW con conteggi**: registra quante volte ciascuna parola appare nel testo.

> In entrambi i casi, ogni parola diventa una caratteristica (feature) nello spazio vettoriale.

### Esempio pratico

Frase di partenza:

> "the best of the best"

**BoW binario** (presenza/assenza delle parole):

| Parola | Presenza (1/0) |
|:-------|:--------------:|
| the    |       1        |
| best   |       1        |
| of     |       1        |

- Ogni parola distinta viene contata una sola volta: viene segnato `1` se è presente nel testo.

**BoW con conteggi** (numero di occorrenze di ciascuna parola):

| Parola | Conteggio |
|:-------|:---------:|
| the    |     2     |
| best   |     2     |
| of     |     1     |

- Qui si registra **quante volte** ogni parola compare nel testo.

### Limiti del modello BoW:
- **Perdita di informazioni**: l'ordine delle parole viene completamente ignorato (es. "dog bites man" e "man bites dog" hanno lo stesso BoW!).
- **Alto dimensionalità**: per testi lunghi o vocabolari molto ampi, il numero di feature cresce rapidamente.
- **Nessun significato semantico**: parole simili o sinonimi vengono trattati come entità completamente diverse.

Il Bag-of-Words rimane comunque una tecnica molto efficace per task semplici di classificazione testuale o analisi preliminare, grazie alla sua **facilità di implementazione** e alla **rapidità di calcolo**.

## Problemi dei Modelli di Spazio Semantico Sparsi

- **Matrice molto sparsa**: la maggior parte dei valori nelle matrici (term-documento o parola-parola) sono **zeri**.
  - Non tutti gli ambienti di programmazione offrono **rappresentazioni efficienti** per matrici sparse.
- **Gestione complicata di parole fuori vocabolario (OOV)**:
  - Esempio: "This bar serves fresh jabuticaba juice." → il termine "jabuticaba" potrebbe non esistere nel vocabolario.
- **Alta dimensionalità**:
  - In corpora di grandi dimensioni, il numero di termini cresce rapidamente, portando a **vettori estremamente grandi**.
- **Prestazioni inferiori rispetto a vettori densi**:
  - In pratica, **rappresentazioni dense** (come Word2Vec, GloVe) risultano più efficaci e portano a migliori prestazioni in molti task di NLP.

## Conclusioni

I **modelli sparsi** di spazio semantico:

- Consentono di rappresentare parole e documenti come **vettori numerici**.
- Permettono di calcolare **similarità semantica** tra parole o documenti (ad esempio, usando cosine similarity).
- Sono la base per tecniche più avanzate come:
  - **TF-IDF**: pesatura intelligente dei termini.
  - **PMI (Pointwise Mutual Information)**: per evidenziare associazioni significative.
  - **Word Embeddings densi**: Word2Vec, GloVe, FastText.

Anche se modelli più recenti usano **vettori densi e latenti**, i VSM sparsi sono fondamentali per comprendere i principi alla base del significato computazionale.

# Collegamenti correlati

- [[Introduzione alla Semantica Vettoriale]]
- [[Misure di similarità vettoriale]]
- [[Tecniche di pesatura (TF-IDF, PMI)]]
- [[Problemi dei modelli vettoriali]]

