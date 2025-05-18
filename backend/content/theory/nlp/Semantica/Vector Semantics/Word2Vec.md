# 🧠 Word2Vec: Una Spiegazione Dettagliata e Intuitiva

## Cos'è Word2Vec?

Word2Vec è una tecnica di **apprendimento non supervisionato** introdotta da **Tomas Mikolov** nel 2013 al Google Research. Serve a rappresentare le **parole** come **vettori continui** in uno spazio n-dimensionale, catturando **relazioni semantiche e sintattiche** tra parole.

### 🧩 Perché usare Word2Vec?

- Perché le **parole non sono numeri**, ma per addestrare modelli di Machine Learning abbiamo bisogno di rappresentazioni **numericamente significative**.
- Word2Vec permette di **mappare parole simili in vettori simili** nello spazio.
- È alla base di molte applicazioni NLP: **motori di ricerca, chatbot, traduttori automatici, recommender system**, ecc.

## 📌 Obiettivo: Embedded Meaning

Word2Vec impara a **prevedere il contesto** di una parola o la parola dato un contesto. A differenza del classico one-hot encoding (dove ogni parola è un vettore ortogonale), Word2Vec assegna a ogni parola un **vettore denso** (dense vector) che ne **cattura il significato**. Ad esempio:

$$
\text{King} - \text{Man} + \text{Woman} \approx \text{Queen}.
$$

Questo tipo di **algebra semantica** è possibile perché Word2Vec apprende delle **rappresentazioni distribuite** (distributed representations).

## 🛠️ Architettura: CBOW vs Skip-Gram

Word2Vec ha due principali architetture:

### 1. CBOW (Continuous Bag of Words)

- Obiettivo: **Predire la parola centrale** dato il **contesto** (le parole attorno).
- Esempio:
  - Contesto: "il __ beve latte"
  - Target: "gatto"

**Funziona meglio con dataset piccoli e parole frequenti.**

### 2. Skip-Gram

- Obiettivo: **Predire il contesto** dato una parola centrale.
- Esempio:
  - Input: "gatto"
  - Output atteso: ["il", "beve", "latte"]

**Funziona meglio con dataset grandi e parole rare.**

## 📐 Come funziona internamente?

### Step 1: One-Hot Encoding dell'input

Ogni parola è rappresentata come un vettore lungo quanto il vocabolario (es: 10.000 parole), con uno 0 ovunque tranne un 1 nella posizione della parola.

Esempio:
```
gatto → [0, 0, ..., 1, ..., 0]
```

### Step 2: Layer di embedding (matrice peso)

- L’input one-hot moltiplicato per una **matrice dei pesi W** restituisce il vettore dense.
- Se `W` ha dimensione `(vocab_size, embedding_dim)` → otterrai un vettore `embedding_dim` (es. 100).

### Step 3: Output layer + Softmax

Nel caso di CBOW:
- Il contesto viene mediato → moltiplicato per `W.T` → passaggio a softmax → si confronta con la parola target.
Nel caso di Skip-Gram:
- La parola target genera il vettore → moltiplicato → predice ogni parola nel contesto.

## 💡 Intuizione geometrica

- Le **distanze cosine** tra vettori di parole simili sono piccole.
- I vettori non hanno significato assoluto, ma **relativo**: il significato emerge dalla posizione rispetto alle altre parole.

📷 ![Spazio vettoriale 2D](/img/word2vec_projection.png)

## ⚙️ Ottimizzazione: Negative Sampling e Hierarchical Softmax

### 🧮 Problema

Calcolare una softmax su un vocabolario da 100.000 parole è costoso.

### 💡 Soluzioni:

#### 1. Negative Sampling

- Invece di aggiornare **tutti i vettori**, si aggiornano solo quelli delle parole **corrette** e di alcune **parole negative scelte a caso**.

- Esempio:
  - Target: "gatto"
  - Negative samples: ["astronave", "carburatore", "banana"]

- Si applica una **logistic regression binaria**: vera parola = 1, parole campione = 0.

#### 2. Hierarchical Softmax

- Organizza le parole in un **albero binario Huffman**.
- Ogni parola è una foglia, ogni predizione è un **cammino da radice a foglia**.
- Riduce la complessità computazionale da `O(V)` a `O(log V)`.

## 🧠 Significato Semantico nei Vettori

Grazie a Word2Vec, i vettori imparati **catturano concetti** come:

- **Somiglianza semantica**: "gatto" vicino a "cane"
- **Relazioni analogiche**: "re - uomo + donna ≈ regina"
- **Sinonimia**: "auto" vicino a "macchina"

📷 ![Analogies](/img/word2vec_analogies.png)

## 🧪 Qualità degli embeddings

### 🔍 Metriche comuni:

- **Cosine Similarity**: misura quanto due vettori puntano nella stessa direzione.
- **Word Analogies**: test come "paris : france = tokyo : ?"
- **t-SNE / PCA**: visualizzazioni per ridurre la dimensionalità e mostrare cluster semantici.

## 📈 Training Tips

- Dataset più grande → embedding migliore.
- Pulizia dei dati importante: rimuovere stopword può aiutare.
- Finestra (window size) bilancia semantica vs sintassi:
  - **Piccola (2-3)** → sintassi
  - **Grande (5-10)** → semantica

## 🧰 Implementazioni e librerie

- `gensim.models.Word2Vec` (Python, semplice e veloce)
- TensorFlow / PyTorch per implementazioni personalizzate
- FastText (Facebook): estende Word2Vec gestendo morfologia con n-grammi

## 🧭 Limiti di Word2Vec

- Staticità: ogni parola ha **un solo vettore**, anche se ha significati diversi.
- Mancanza di contesto: non è sensibile alla frase.
- Non gestisce frasi né strutture sintattiche.

➡️ Per superare questi limiti: **ELMo, BERT, GPT** e altri modelli **contextual embeddings**.

## 📚 Risorse utili

- Paper originale: "Efficient Estimation of Word Representations in Vector Space" – Mikolov et al., 2013
- [Tutorial ufficiale Gensim](https://radimrehurek.com/gensim/)
- Dataset: Google News (300D), Wikipedia, Common Crawl

## ✅ Conclusione

Word2Vec ha rivoluzionato l'NLP permettendo una **rappresentazione densa e semantica** delle parole. È stato il **ponte tra il bag-of-words e i language model profondi**. Comprendere a fondo Word2Vec è essenziale per chiunque lavori con linguaggio naturale, reti neurali e intelligenza artificiale in generale.

📎 *"You shall know a word by the company it keeps" – J.R. Firth (1957)*
