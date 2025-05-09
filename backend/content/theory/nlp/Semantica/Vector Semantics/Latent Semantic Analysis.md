# 📚 Analisi Semantica Latente (Latent Semantic Analysis - LSA)

## 🧠 Concetti chiave

LSA è una tecnica di *apprendimento non supervisionato* utilizzata nel *Natural Language Processing (NLP)* per scoprire **argomenti latenti** nascosti all’interno di grandi collezioni di testi. È connessa ai seguenti concetti matematici fondamentali:

- 📉 **Riduzione dimensionale**: passaggio da uno spazio vettoriale ad alta dimensione ($\mathbb{R}^N$) a uno spazio ridotto ($\mathbb{R}^M$, con $M \ll N$).
- 🔢 **[[Singular Value Decomposition|Scomposizione ai valori singolari (SVD)]]**: tecnica algebrica per decomporre matrici.
- 🔍 **Scoperta di argomenti latenti**: estrazione non supervisionata di strutture semantiche nei dati testuali.
- 📦 **Densificazione delle rappresentazioni**: da rappresentazioni sparse e lunghe a vettori corti e densi.
## 🧾 Matrice termine-documento

Sia $\mathbf{X} \in \mathbb{R}^{|D| \times |V|}$ una matrice termine-documento o una matrice TF-IDF.  
Dove:

- $|D|$: numero di documenti
- $|V|$: dimensione del vocabolario (numero di termini distinti)

Ogni elemento $x_{ij}$ di $\mathbf{X}$ rappresenta l’importanza del termine $j$ nel documento $i$.

### 📌 La matrice $\mathbf{X}$ cattura:
- Relazioni **termine vs documento**: quanto è rappresentativo un termine in un documento.
- Relazioni **termine vs termine**: se due termini co-occorrono nei documenti.
- Relazioni **documento vs documento**: similarità semantica tra documenti.
## 🧠 Idea chiave n.1

> **Esistono $k$ argomenti latenti nascosti nella matrice $\mathbf{X}$, che vogliamo scoprire.**

Questi argomenti non sono osservabili direttamente, ma possono emergere come combinazioni lineari di parole e documenti attraverso l'SVD.
## 🔍 Idea chiave n.2

> **Non considerare $\mathbf{X}$ solo come dati grezzi: decompone la matrice in componenti strutturate.**

La decomposizione serve per **estrarre informazione strutturale** e ridurre la dimensionalità mantenendo le componenti principali.
## 🧮 Decomposizione con SVD

La decomposizione ai valori singolari è:

$$
\mathbf{X} = \mathbf{U} \mathbf{S} \mathbf{V}^\top
$$

dove:

- $\mathbf{U} \in \mathbb{R}^{|D| \times |D|}$: **matrice dei documenti**, ortonormale
- $\mathbf{S} \in \mathbb{R}^{|D| \times |V|}$: **matrice diagonale** dei valori singolari (importanza degli assi)
- $\mathbf{V} \in \mathbb{R}^{|V| \times |V|}$: **matrice dei termini**, ortonormale

## ✂️ Approssimazione a rango ridotto (Truncated SVD)

Spesso $\mathbf{X}$ è molto grande. Usiamo una versione **troncata**:

$$
\mathbf{X}_k = \mathbf{U}_k \mathbf{S}_k \mathbf{V}_k^\top
$$

dove:

- $k \ll \min(|D|, |V|)$
- $\mathbf{U}_k \in \mathbb{R}^{|D| \times k}$
- $\mathbf{S}_k \in \mathbb{R}^{k \times k}$
- $\mathbf{V}_k \in \mathbb{R}^{|V| \times k}$

In questo modo otteniamo:

- **Vettori documenti** proiettati in $\mathbb{R}^k$, tramite $\mathbf{U}_k \mathbf{S}_k$
- **Vettori termini** proiettati in $\mathbb{R}^k$, tramite $\mathbf{V}_k \mathbf{S}_k$


### 🔒 Vincoli:

$$
\begin{aligned}
&\min_{\mathbf{U_k}, \mathbf{S_k}, \mathbf{V_k}} \|\mathbf{X} - \mathbf{U_k S_k V_k}^\top\|_F \\
&\text{s.t. } \mathbf{U_k}^\top \mathbf{U_k} = \mathbf{I_k}, \quad \mathbf{V_k}^\top \mathbf{V_k} = \mathbf{I_k} \\
&\mathbf{S_k} = \operatorname{diag}(\sigma_1, \sigma_2, \dots, \sigma_r) \quad \text{con } \sigma_1 \geq \sigma_2 \geq \dots \geq \sigma_k \geq 0
\end{aligned}
$$

- $\|\cdot\|_F$: norma di Frobenius (somma dei quadrati di tutti gli elementi della matrice)
- I vincoli garantiscono che $\mathbf{U}_k$ e $\mathbf{V}_k$ siano **matrici ortonormali**
- I $\sigma_i$ (valori singolari) sono **sempre reali e non negativi**.

<img src="../../../../../images/mysvd.png" width="75%" style="display: block; margin-left: auto; margin-right: auto;">

## 📌 Interpretazione semantica

- Ogni **colonna di $\mathbf{V}_k$** rappresenta un *argomento latente*, ovvero una combinazione di termini che tende a comparire insieme nei documenti.
- Ogni **riga di $\mathbf{U}_k$** descrive un documento secondo la sua affinità con questi argomenti latenti.
- La matrice $\mathbf{S}_k$ scala ciascun asse latente in base alla sua **importanza** (varianza spiegata).

## 🎯 Perché funziona?

- I **primi $k$ valori singolari** $\sigma_1, \dots, \sigma_k$ catturano **la maggior parte dell’informazione semantica** presente in $\mathbf{X}$.
- I valori successivi rappresentano spesso **rumore** (parole rare, anomalie, incoerenze).
- La proiezione in $\mathbb{R}^k$ consente di cogliere **relazioni latenti** tra termini e documenti, anche se non co-occorrono esplicitamente.
- Questo processo prende il nome di **riduzione dimensionale semantica**: migliora l’analisi mantenendo solo le componenti significative.

## 🔽 Riduzione della dimensionalità: Proiezione di un documento

Dato un documento $\mathbf{d} \in \mathbb{R}^{|V|}$ nello spazio originale dei termini:

$$ 
\mathbf{d}_k = \underbrace{\mathbf{V}_k^\top}_{k \times |V|} \underbrace{\mathbf{d}}_{|V| \times 1} \in \mathbb{R}^k
$$

- Stiamo **proiettando $\mathbf{d}$ nello spazio latente** generato da SVD.
- Questo spazio ha dimensione $k$, dove $k$ è scelto per catturare solo le direzioni semantiche più rilevanti.

## 🧠 Perché usare la SVD?

Sia $\mathbf{X}$ una matrice termini-documenti. Allora:

- $\mathbf{X}\mathbf{X}^\top$ misura le **correlazioni tra termini** (similitudine semantica).
- Applicando la SVD otteniamo:

$$
\mathbf{X} \mathbf{X}^\top = (\mathbf{U} \mathbf{S} \mathbf{V}^\top)(\mathbf{V} \mathbf{S}^\top \mathbf{U}^\top) = \mathbf{U} \mathbf{S} \mathbf{S}^\top \mathbf{U}^\top
$$

- Quindi stiamo **decomponendo la correlazione** tra termini (o tra documenti) in modo geometrico.

## 🧭 Interpretazione geometrica

La SVD può essere vista come una **pipeline geometrica**:

$$
\mathbf{A}\mathbf{x} = \mathbf{U}(\mathbf{S}(\mathbf{V}^\top \mathbf{x}))
$$

| Fase         | Operazione               |
|--------------|--------------------------|
| 1️⃣ Rotazione | $\mathbf{V}^\top$        |
| 2️⃣ Scalatura | $\mathbf{S}$            |
| 3️⃣ Rotazione | $\mathbf{U}$            |

- Le **componenti principali** (valori singolari) indicano **quanto contribuisce ogni direzione**.
- La **scalatura + rotazioni** preserva struttura ma elimina ridondanza.

## ⚠️ Limiti di SVD

- La matrice $\mathbf{X}$ è **molto sparsa** e ad alta dimensionalità ($10^5 \times 10^5$ o più).
- L'SVD ha un **costo computazionale elevato** ($O(n^2)$).
- L’aggiunta di nuovi termini/documenti **richiede ricalcolo**.
- Serve **pre-elaborazione** (es. TF-IDF) per bilanciare la frequenza delle parole.

## 🔚 Conclusione

LSA consente di:
- Ridurre dimensionalità mantenendo la struttura semantica
- Rappresentare testi in uno spazio concettuale più interpretabile
- Confrontare documenti e parole semanticamente
