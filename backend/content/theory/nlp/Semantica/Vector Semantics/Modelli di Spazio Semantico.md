# Modelli di Spazio Semantico

## Introduzione

I **modelli di spazio semantico** (VSM, *Vector Space Models*) rappresentano un approccio fondamentale per modellare computazionalmente il significato delle parole.  
L'idea centrale è associare ad ogni parola un **vettore** di numeri reali, posizionandola così come un punto in uno spazio vettoriale a $N$ dimensioni.

### Concetti principali:
- **Modellano il significato** delle parole basandosi sulla **similarità** tra parole.
- **Definiscono** il significato di una parola come un vettore numerico.
- **Parole semanticamente simili** sono rappresentate come **vettori vicini** nello spazio.

In altre parole, in un VSM, parole con significati affini (come "dog" e "puppy") avranno vettori che si trovano a poca distanza l'uno dall'altro.

<img src="/static/images/tikz/31e40f9cdc75074bf0d6cfb5484b2794.svg" style="width: 100%; height: auto; max-height: 600px;" class="tikz-svg" />
Come possiamo vedere, in un VSM le parole semanticamente simili sono rappresentate come punti (vettori) vicini nello spazio dei significati.

## Word Embeddings: parole nello spazio

L'**embedding** è il processo standard in NLP per rappresentare parole come punti nello spazio vettoriale.  
Il termine **embedding** si riferisce al fatto che gli oggetti (in questo caso le parole) sono **immersi** all'interno di uno spazio numerico.

- Quando "embeddiamo" **parole**, otteniamo dei **word embeddings**.
- Ogni parola è un **vettore**.

L'idea chiave è che strutturando così il significato possiamo calcolare la distanza tra parole e stimare il grado di similarità semantica.

## Tipi principali di Word Embeddings

Esistono due grandi categorie di rappresentazioni vettoriali delle parole:

| Categoria         | Caratteristiche principali                                                                 | Esempi                       |
|:------------------|:-------------------------------------------------------------------------------------------|:------------------------------|
| **Sparse Embeddings** | - Vettori molto grandi ma prevalentemente pieni di zeri.<br>- Basati su conteggi di co-occorrenza. | Term-Document Matrix, Word-Word Matrix |
| **Dense Embeddings**  | - Vettori piccoli e compatti.<br>- Dimensioni latenti.<br>- Basati su modelli predittivi.   | Word2Vec, GloVe, FastText     |

👉 Vedi anche:

- [[Sparse Word Embeddings]]
- [[Dense Word Embeddings]]
