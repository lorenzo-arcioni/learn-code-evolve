# Misure di Similarità Vettoriale

Quando rappresentiamo dati testuali o numerici come vettori, possiamo confrontarli tramite **misure di distanza** o **similarità**.  
Queste misure sono fondamentali in molte aree: NLP, clustering, classificazione, retrieval.


La scelta della misura di distanza influenza in modo decisivo le performance degli algoritmi.


## 1. Definizioni Formali

Per procedere in modo rigoroso, definiamo il concetto matematico di **distanza**.

### 1.1 Distanza

Una **distanza** su uno spazio $X$ è una funzione:

$$
d: X \times X \to \mathbb{R}
$$

che associa a ogni coppia di punti $(x, y)$ un numero reale $d(x, y)$, interpretato intuitivamente come la "lontananza" tra $x$ e $y$.

Affinché $d$ sia effettivamente considerata una distanza, deve soddisfare quattro proprietà fondamentali:

1. **Non negatività**:
   
   La distanza tra due punti è sempre un numero positivo o nullo:

   $$
   d(\mathbf{x}, \mathbf{y}) \geq 0 \quad \forall \, \mathbf{x}, \mathbf{y} \in X
   $$

   (*Non esistono distanze negative.*)

2. **Identità degli indiscernibili**:
   
   Due punti sono a distanza zero **se e solo se** coincidono:

   $$
   d(\mathbf{x}, \mathbf{y}) = 0 \quad \iff \quad \mathbf{x} = \mathbf{y}
   $$

   (*Se due oggetti sono distinti, devono avere distanza positiva.*)

3. **Simmetria**:
   
   L'ordine dei punti non conta: la distanza da $x$ a $y$ è uguale a quella da $y$ a $x$:

   $$
   d(\mathbf{x}, \mathbf{y}) = d(\mathbf{y}, \mathbf{x})
   $$

   (*La distanza è "senza direzione", a differenza, ad esempio, di uno spostamento vettoriale.*)

4. **Disuguaglianza triangolare**:
   
   Il percorso diretto tra due punti è sempre il più breve, o almeno non più lungo, rispetto a passare per un terzo punto:

   $$
   d(\mathbf{x}, \mathbf{z}) \leq d(\mathbf{x}, \mathbf{y}) + d(\mathbf{y}, \mathbf{z})
   $$

   (*È la formalizzazione del concetto che "la scorciatoia è sempre più breve" nella geometria.*)

### 1.2 Spazio Metrico

Uno **spazio metrico** è una coppia $(X, d)$, dove:

- $X$ è un insieme di punti (o vettori),
- $d$ è una funzione di distanza che soddisfa le quattro proprietà sopra.

**In sintesi**:
> Uno spazio metrico fornisce un modo formale per misurare "quanto sono vicini" o "quanto sono lontani" due elementi di un insieme.

Gli spazi metrici sono la base concettuale per la geometria, l'analisi matematica, e molte tecniche di machine learning.


## 2. Distanze di Minkowski

La **famiglia di Minkowski** definisce una classe di distanze parametrizzate da $p \geq 1$:

$$
d_p(x, y) = \left( \sum_{i=1}^{n} |x_i - y_i|^p \right)^{\frac{1}{p}}
$$

### Casi speciali:

- **Distanza Manhattan** $p=1$:
  
  $$
  d_1(x, y) = \sum_{i=1}^{n} |x_i - y_i|
  $$

- **Distanza Euclidea** $p=2$:
  
  $$
  d_2(x, y) = \sqrt{ \sum_{i=1}^{n} (x_i - y_i)^2 }
  $$

- **Distanza di Chebyshev** $p→∞$:
  
  $$
  d_\infty(x, y) = \max_{i} |x_i - y_i|
  $$

### 2.1 Dimostrazione: Distanza di Chebyshev come limite di Minkowski

**Teorema**:  
$$
d_\infty(x, y) = \lim_{p \to \infty} d_p(x, y) = \max_i |x_i - y_i|
$$

**Dimostrazione**:

Siano $a = |x_1 - y_1|$ e $b = |x_2 - y_2|$.  
Senza perdita di generalità, supponiamo:

$$
\max(a, b) = a
$$

Allora:

1. Stima dal basso:

$$
\lim_{p \to \infty} (a^p + b^p)^{1/p}
\geq
\lim_{p \to \infty} (a^p)^{1/p}
=
a
$$

2. Stima dall'alto:

$$
\lim_{p \to \infty} (a^p + b^p)^{1/p}
\leq
\lim_{p \to \infty} (a^p + a^p)^{1/p}
=
\lim_{p \to \infty} (2a^p)^{1/p}
=
a \lim_{p \to \infty} 2^{1/p}
=
a
$$

perché $\lim_{p\to\infty} 2^{1/p} = 1$.

**Conclusione**:  
$$
\lim_{p\to\infty} d_p(x,y) = a = \max(a,b)
\quad \Box
$$

## 3. Similarità Coseno

La **similarità coseno** è una misura della **direzione** relativa tra due vettori in uno spazio vettoriale.  
In particolare, essa **non** considera la lunghezza dei vettori, ma solamente **l'angolo** che essi formano tra loro.

### Formula

La formula della similarità coseno tra due vettori $\mathbf{x}, \mathbf{y} \in \mathbb{R}^n$ è:

$$
\text{sim}_{\cos}(\mathbf{x}, \mathbf{y}) = \frac{ \mathbf{x} \cdot \mathbf{y} }{ \|\mathbf{x}\| \|\mathbf{y}\| }
$$

dove:

- $\mathbf{x} \cdot \mathbf{y} = \sum_{i=1}^{n} x_i y_i$ è il **prodotto scalare**,
- $\|\mathbf{x}\| = \sqrt{ \sum_{i=1}^{n} x_i^2 }$ è la **norma Euclidea** di $\mathbf{x}$,
- $\|\mathbf{y}\| = \sqrt{ \sum_{i=1}^{n} y_i^2 }$ è la **norma Euclidea** di $\mathbf{y}$.

### Dimostrazione della Formula tramite Angoli

Partiamo da due vettori nel piano:

$$
\mathbf{x} = (x_1, x_2), \quad \mathbf{y} = (y_1, y_2)
$$

Supponiamo che $\mathbf{x}$ e $\mathbf{y}$ abbiano rispettivamente:

- Lunghezza $\|\mathbf{x}\|$ e $\|\mathbf{y}\|$,
- Formino angoli $\alpha$ e $\beta$ rispetto all'asse $x$.

Allora, per la definizione di coseno di un angolo, possiamo scrivere le loro componenti:

$$
x_1 = \|\mathbf{x}\| \cos(\alpha), \quad x_2 = \|\mathbf{x}\| \sin(\alpha)
$$
$$
y_1 = \|\mathbf{y}\| \cos(\beta), \quad y_2 = \|\mathbf{y}\| \sin(\beta)
$$

Ora il prodotto scalare è:

$$
\mathbf{x} \cdot \mathbf{y} = x_1 y_1 + x_2 y_2
$$

Sostituendo:

$$
= \|\mathbf{x}\| \cos(\alpha) \|\mathbf{y}\| \cos(\beta) + \|\mathbf{x}\| \sin(\alpha) \|\mathbf{y}\| \sin(\beta)
$$
$$
= \|\mathbf{x}\| \|\mathbf{y}\| \left( \cos(\alpha) \cos(\beta) + \sin(\alpha) \sin(\beta) \right)
$$

Ora, usando l'identità trigonometrica:

$$
\cos(\alpha - \beta) = \cos(\alpha) \cos(\beta) + \sin(\alpha) \sin(\beta)
$$

otteniamo:

$$
\mathbf{x} \cdot \mathbf{y} = \|\mathbf{x}\| \|\mathbf{y}\| \cos(\alpha - \beta)
$$

Dove:

- $\alpha - \beta = \theta$ è l'**angolo** tra i due vettori.

Quindi:

$$
\cos(\theta) = \frac{ \mathbf{x} \cdot \mathbf{y} }{ \|\mathbf{x}\| \|\mathbf{y}\| }
$$

che è esattamente la definizione della **similarità coseno**. $\square$

### Interpretazione Geometrica

- Se $\cos(\theta) = 1$, allora $\theta = 0^\circ$, i vettori puntano nella **stessa direzione** → **massima similarità**.
- Se $\cos(\theta) = 0$, allora $\theta = 90^\circ$, i vettori sono **ortogonali** → **nessuna similarità**.
- Se $\cos(\theta) = -1$, allora $\theta = 180^\circ$, i vettori puntano in **direzioni opposte**.

### Riassunto Tabellare

| $\theta$ | Interpretazione                  | $\text{sim}_{\cos}$ |
|:----------:|:----------------------------------|:---------------------:|
| $0^\circ$ | Vettori paralleli, stesso verso  | $1$ |
| $90^\circ$ | Vettori ortogonali               | $0$ |
| $180^\circ$ | Vettori paralleli, verso opposto | $-1$ |

<img src="/static/images/tikz/bf74f0743b6e427e2214b06c887d9e3f.svg" style="display: block; width: 100%; height: auto; max-height: 600px;" class="tikz-svg" />

- **L'angolo tra $\mathbf{x}$ e $\mathbf{y}$** determina il valore della similarità coseno.
- **Non conta quanto sono lunghi** $\mathbf{x}$ e $\mathbf{y}$: solo **l'orientamento**.

### Nota pratica

La similarità coseno è **molto usata** quando:

- I dati sono rappresentati come vettori **sparsi** (es: bag-of-words, TF-IDF).
- L'interesse è confrontare la **direzione** (cioè la proporzione tra componenti) piuttosto che la magnitudine assoluta.

Esempi applicativi:

- **Document Retrieval**: trovare documenti simili a una query.
- **Sistemi di Raccomandazione**: trovare utenti o prodotti simili.
- **Clustering Testuale**.

### Esempio

Consideriamo il seguente esempio pratico di calcolo della **similarità coseno** tra vettori associati a parole.

Supponiamo di avere una matrice di co-occorrenza delle parole rispetto a tre contesti: `pie`, `data` e `computer`:

|        | pie | data | computer |
|:------:|:---:|:----:|:--------:|
| cherry | 442 | 8    | 2        |
| digital| 5   | 1683 | 1670     |
| information | 5 | 3982 | 3325  |

L'obiettivo è confrontare la similarità tra:

- **cherry** e **information**
- **digital** e **information**

#### Calcolo

La similarità coseno si calcola come:

$$
\cos(\mathbf{x}, \mathbf{y}) = \frac{ \sum_{i=1}^n x_i y_i }{ \sqrt{ \sum_{i=1}^n x_i^2 } \sqrt{ \sum_{i=1}^n y_i^2 } }
$$

Nel nostro caso:

- Vettore cherry = (442, 8, 2)
- Vettore digital = (5, 1683, 1670)
- Vettore information = (5, 3982, 3325)

Calcoliamo:

##### Similarità tra cherry e information:

$$
\cos(\text{cherry}, \text{information}) = \frac{442 \times 5 + 8 \times 3982 + 2 \times 3325}{\sqrt{442^2 + 8^2 + 2^2} \times \sqrt{5^2 + 3982^2 + 3325^2}}
$$

$$
= \frac{2210 + 31856 + 6650}{\sqrt{195364 + 64 + 4} \times \sqrt{25 + 15856224 + 11055625}}
$$

$$
= \frac{40716}{\sqrt{195432} \times \sqrt{26911874}}
$$

$$
= \frac{40716}{442 \times 5187}
$$

$$
\approx 0.017
$$

##### Similarità tra digital e information:

$$
\cos(\text{digital}, \text{information}) = \frac{5 \times 5 + 1683 \times 3982 + 1670 \times 3325}{\sqrt{5^2 + 1683^2 + 1670^2} \times \sqrt{5^2 + 3982^2 + 3325^2}}
$$

$$
= \frac{25 + 6702906 + 5552750}{\sqrt{25 + 2832729 + 2788900} \times \sqrt{25 + 15856224 + 11055625}}
$$

$$
= \frac{12255981}{\sqrt{5621654} \times \sqrt{26911874}}
$$

$$
= \frac{12255981}{2370 \times 5187}
$$

$$
\approx 0.996
$$

✅ Quindi, **digital** e **information** sono **molto più simili** rispetto a **cherry** e **information**, come confermato dal valore molto vicino a 1 della loro similarità coseno.

## 4. Visualizzazioni Intuitive

### 4.1 Distanze Minkowski

Supponi due vettori $x = (1, 2)$ e $y = (4, 6)$:

| Tipo | Formula                          | Calcolo |
|:-----|:----------------------------------|:--------|
| Manhattan | $|1-4| + |2-6| = 3 + 4 = 7$ | 7 |
| Euclidea  | $\sqrt{(1-4)^2 + (2-6)^2} = \sqrt{9+16} = \sqrt{25}$ | 5 |
| Chebyshev | $\max(\mid 1-4 \mid ,  \mid 2-6 \mid ) = \max(3,4)$ | 4 |

![Grafico distanze Minkowski](https://barbegenerativediary.com/en/wp-content/uploads/2024/03/minkowski-02-1024x288.webp)

_(Fonte: Wikipedia)_

### 4.2 Similarità Coseno

La similarità coseno si basa sull'angolo tra due vettori:

![Grafico similarità coseno](https://www.ibm.com/content/dam/connectedassets-adobe-cms/worldwide-content/creative-assets/s-migr/ul/g/7b/91/vector-search-cosine.png)

_(Fonte: Wikipedia)_

## 5. Osservazioni Finali

- **Le distanze Minkowski** dipendono dalla scala delle componenti.
- **La similarità coseno** è indipendente dalla scala: guarda solo la **direzione** dei vettori.
- La scelta della metrica dipende dal problema specifico:
  - Clustering: solitamente distanza euclidea o Manhattan.
  - Documenti di testo: similarità coseno.
  - Sistemi di raccomandazione: dipende dalla sparsità dei dati.
