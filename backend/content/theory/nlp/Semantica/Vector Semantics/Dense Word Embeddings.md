# 🔤 Dense Word Embeddings

## 🧠 Concetti Chiave

I **word embeddings densi** sono rappresentazioni continue e distribuite delle parole in uno spazio vettoriale a bassa dimensione ($\mathbb{R}^d$). Raspresentano uno sviluppo fondamentale nell’NLP moderno perché permettono ai modelli di **catturare somiglianze semantiche** tra le parole.

### ✅ Obiettivo
> Mappare ogni parola $w \in \mathcal{V}$ (vocabolario) in un vettore continuo $\mathbf{w} \in \mathbb{R}^d$ con $d \ll |\mathcal{V}|$

## 🔍 Perché embeddings "densi"?

Con i [[Sparse Word Embeddings]] (come one-hot encoding o matrici sparse TF-IDF):

- 🟥 I vettori sono **sparsi**: la maggior parte delle componenti è zero.
- 🟥 Non catturano **relazioni semantiche** (es. “gatto” e “felino” sono ortogonali).
- 🟥 Non generalizzano bene.

Con i dense word embeddings:

- ✅ Le parole **semanticamente simili** hanno vettori **vicini** (es. distanza coseno piccola)
- ✅ Le rappresentazioni sono **dense**: tutti i valori sono reali e significativi
- ✅ I modelli possono sfruttare **algebra lineare** semantica:  
  $\text{king} - \text{man} + \text{woman} \approx \text{queen}$

## ⚙️ Formato matematico

Dati:

- Un vocabolario $\mathcal{V}$
- Ogni parola $w_i$ è rappresentata da un vettore $\mathbf{w}_i \in \mathbb{R}^d$
- Una matrice $\mathbf{W} \in \mathbb{R}^{|\mathcal V| \times d}$ che contiene tutti gli embeddings come righe

Allora:

$$
\mathbf{W} = 
\begin{bmatrix}
\text{--------- }\mathbf{w}_1^\top \text{ ---------}\\
\text{--------- }\mathbf{w}_2^\top \text{ ---------}\\
\vdots \\
\text{--------- }\mathbf{w}_V^\top \text{ ---------}
\end{bmatrix}
$$

Con:
- $d$: dimensione dello spazio semantico (tipicamente 50-300)
- Ogni riga: un vettore di embedding per una parola

## 🧪 Come si apprendono?

Esistono diversi approcci per apprendere embeddings:

### 1. 🏷️ Predictive: basati su modelli linguistici ([[Word2Vec]], FastText)

- Usano una rete neurale shallow per predire parole basate sul contesto o viceversa
- Si basano sull'ipotesi di distribuzionalità:
  > "Parole che appaiono in contesti simili hanno significati simili" (Harris, 1954)

#### 📌 [[Word2Vec]] (CBOW e Skip-gram)

- **CBOW (Continuous Bag of Words)**: predice una parola dato il suo contesto
- **Skip-Gram**: predice le parole del contesto dato una parola centrale

##### Skip-Gram: formulazione

Dati $T$ token $(w_1, \dots, w_T)$, massimizziamo:

$$
\mathcal{L} = \sum_{t=1}^T \sum_{-c \le j \le c, j \neq 0} \log P(w_{t+j} \mid w_t)
$$

Dove $c$ è la dimensione della finestra di contesto.

La probabilità condizionata è modellata tramite softmax:

$$
P(w_o \mid w_i) = \frac{\exp\left(\mathbf{v}_{w_o}^\top \cdot \mathbf{v}_{w_i}\right)}{\sum_{w \in \mathcal{V}} \exp\left(\mathbf{v}_w^\top \cdot \mathbf{v}_{w_i}\right)}
$$

> ⚠️ Calcolo costoso per vocabolari grandi → si usano trucchi: **Negative Sampling**, **Hierarchical Softmax**

### 2. 📊 Count-based: basati su co-occorrenze (es. GloVe)

- Costruiscono una **matrice di co-occorrenza** globale $X \in \mathbb{R}^{V \times V}$, dove $X_{ij}$ è quante volte $w_j$ appare nel contesto di $w_i$
- Idea: l’embedding di una parola deve catturare le **statistiche di co-occorrenza** con tutte le altre

#### GloVe: Global Vectors for Word Representation

Minimizza:

$$
J = \sum_{i,j=1}^{V} f(X_{ij}) \left( \mathbf{w}_i^\top \tilde{\mathbf{w}}_j + b_i + \tilde{b}_j - \log X_{ij} \right)^2
$$

- $\mathbf{w}_i$, $\tilde{\mathbf{w}}_j$: embeddings per parola e contesto
- $b_i$, $\tilde{b}_j$: bias
- $f(x)$: funzione peso per regolare l’influenza delle co-occorrenze molto frequenti

## 🧮 Proprietà geometriche emergenti

- Le parole con significato simile formano **cluster** nello spazio $\mathbb{R}^d$
- Relazioni semantiche lineari diventano **operazioni vettoriali**
- Gli assi principali possono catturare dimensioni latenti come **genere**, **tempo**, **concretezza**

## 💾 Embeddings Pre-Addestrati

Sono disponibili embeddings già addestrati su enormi corpora:

- **[[Word2Vec]]** (Google News)
- **GloVe** (Wikipedia + Gigaword)
- **FastText** (Facebook AI)
- **ELMo**, **BERT** (contextual embeddings → più avanzati)

Vantaggi:

- 🚀 Riutilizzabili in downstream tasks
- 📈 Migliorano le performance anche su dataset piccoli

## 📉 Limitazioni

- Non contestualizzati: ogni parola ha **una sola rappresentazione**, anche se può avere **più significati** (es. *banca* come istituto finanziario o riva del fiume)
- Non aggiornabili in tempo reale durante training fine-tuning
- Hanno **bias** (di genere, razza, ecc.) appresi dal corpus

## 🔚 Conclusione

I word embeddings densi hanno rivoluzionato il NLP grazie alla loro capacità di:

- Rappresentare il significato distribuzionale in forma compatta
- Catturare similarità semantiche e sintattiche
- Abilitare tecniche avanzate di NLP (classificazione, similarità, clustering, ecc.)

Sono alla base dei modelli **contestualizzati** moderni (BERT, GPT), che ne estendono la filosofia.

### ✅ Riassumendo, i principali vantaggi sono:

- **Compattezza**: ogni parola è rappresentata da un vettore $d$-dimensionale, dove $d$ è gestibile computazionalmente (tipicamente 100–300).
- **Semanticità**: parole simili semanticamente hanno vettori geometricamente vicini.
- **Operazioni vettoriali significative**: le differenze tra vettori spesso riflettono analogie semantiche coerenti.
- **Riutilizzabilità**: possono essere pre-addestrati su grandi corpora e impiegati in numerose applicazioni downstream.

### ⚠️ Tuttavia, presentano anche alcune criticità:

- La rappresentazione è **statica**: ogni parola ha un solo embedding, indipendentemente dal contesto in cui appare.
- Sono soggetti a **bias** insiti nei dati di addestramento (sessuali, razziali, culturali, ecc.).
- Non gestiscono ambiguità lessicali, polisemia o variazioni contestuali in modo naturale.

Per queste ragioni, negli ultimi anni si è evoluta una nuova generazione di rappresentazioni: gli **embeddings contestualizzati** (es. ELMo, BERT, GPT), i quali, invece di assegnare un unico vettore a ciascuna parola, generano una rappresentazione dinamica **dipendente dal contesto locale**.

