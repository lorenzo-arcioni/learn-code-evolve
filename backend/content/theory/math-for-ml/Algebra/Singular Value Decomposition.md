# 📚 Singular Value Decomposition (SVD)

## 📌 Introduzione

La **Singular Value Decomposition (SVD)** è una delle tecniche più potenti e versatili dell'algebra lineare. È un metodo che ci permette di "guardare dentro" una matrice e capire il comportamento profondo della trasformazione lineare che rappresenta, rivelandone le direzioni principali di azione e le dimensioni lungo cui opera.

Immagina una trasformazione come qualcosa che prende un insieme di punti e li sposta, allunga, schiaccia o ruota nello spazio. La SVD ci permette di scomporre questa trasformazione complessa in tre passaggi semplici e interpretabili:

- una **rotazione iniziale**, che riallinea il sistema di riferimento;
- una **scalatura**, che modifica le lunghezze lungo gli assi principali;
- una **rotazione finale**, che orienta il risultato nello spazio d'uscita.

Questa capacità di scomporre e reinterpretare trasformazioni la rende una tecnica centrale in molti campi: compressione delle immagini, riconoscimento facciale, sistemi di raccomandazione, ricerca semantica nei testi, e tanto altro.


## 🔍 Intuizione (caso $m > n$)

Diamo ora un'intuizione dietro alla SVD per $m > n$ (in modo analogo si può definire anche per $m < n$).

Sia $\{\mathbf v_1, \cdots, \mathbf v_n\}$ una base dello spazio di partenza, con $\mathbf v_i \in \mathbb{R}^n$, e sia $\mathbf{A} \in \mathbb{R}^{m \times n}$ una matrice qualsiasi. Applichiamo $\mathbf{A}$ ai vettori della base:

$$
\mathbf A \mathbf v_1 = \sigma_1 \mathbf u_1,\quad \cdots,\quad \mathbf A \mathbf v_n = \sigma_n \mathbf u_n
$$

dove:

- $\{\mathbf u_i\}_{i=1}^n$ sono versori (tali che $||\mathbf u_i|| = 1$).
- $\{\sigma_i\}_{i=1}^n$ i fattori di scala dei $\mathbf u_i$.

Quindi, dato che abbiamo una base, ogni vettore $\mathbf x$ può essere scritto come:

$$
\mathbf x = z_1 \mathbf v_1 + \cdots + z_n \mathbf v_n
$$

dove $z_i$ è la coordinata $i$ del vettore $\mathbf x$ nella base $\{\mathbf v_1, \cdots, \mathbf v_n\}$.

Applicando $\mathbf A$:

$$
\mathbf A \mathbf x = \sigma_1 z_1 \mathbf u_1 + \cdots + \sigma_n z_n \mathbf u_n
$$

Sostituendo termini, si ottiene la forma canonica:

$$
\mathbf{A} \mathbf{x} = \sum_{i=1}^{n} \sigma_i z_i \mathbf{u}_i
$$

Cerchiamo ora di scrivere questa formula in forma matriciale:

### 1. **Raggruppiamo le proiezioni**

Definiamo il vettore completo delle proiezioni:
$$
  \mathbf{z} =
  \begin{bmatrix}
  z_1 \\
  \vdots \\
  z_n
  \end{bmatrix}
  = V^{-1} \mathbf{x}
$$
dove $V^{-1}$ è la matrice del cambiamento di base, che mappa da $\{\mathbf{e}_1, \cdots, \mathbf{e}_n\}$ a $\{\mathbf{v}_1, \cdots, \mathbf{v}_n\}$.

### 2. **Applichiamo la scalatura**

Ora moltiplichiamo ogni componente $z_i$ per $\sigma_i$, cioè applichiamo la matrice diagonale dei valori singolari:

$$
\Sigma \mathbf z
=
\begin{bmatrix}
\sigma_1 &        &        \\
        & \ddots &        \\
        &        & \sigma_n \\\\
\hline\\
0       & \cdots & 0       \\
\vdots  &        & \vdots  \\
0       & \cdots & 0
\end{bmatrix}
\begin{bmatrix}
z_1 \\
\vdots \\
z_n
\end{bmatrix}
=
\begin{bmatrix}
\sigma_1 z_1 \\
\vdots \\
\sigma_n z_n \\\\
\hline\\
0 \\
\vdots \\
0
\end{bmatrix}
$$

dove $\Sigma\in\mathbb R^{m\times n}$ è rettangolare (solo $n$ valori singolari).

### 3. **Sommiamo lungo le direzioni $\mathbf{u}_i$**

Costruiamo il vettore somma come combinazione lineare pesata dei vettori $\mathbf{u}_i$:

$$
\sum_{i=1}^n (\sigma_i z_i) \mathbf{u}_i = U_n (\Sigma \mathbf{z}) = U_n \Sigma V^T \mathbf{x}
$$

dove 

$$
U_n =
\begin{bmatrix}
\vert & & \vert \\
\mathbf{u}_1 & \cdots & \mathbf{u}_n \\
\vert & & \vert
\end{bmatrix}
$$

è la matrice che contiene i vettori $\mathbf{u}_i$ come colonne.

### 4. Completamento di $U$ a matrice $m\times m$

Poiché $m>n$, servono ancora $m-n$ colonne $\mathbf u_{n+1},\dots,\mathbf u_m$ per ottenere
$$
U =
\begin{bmatrix}
\vert & & \vert & \vert & & \vert \\
\mathbf{u}_1 & \cdots & \mathbf{u}_n & \mathbf{u}_{n+1} & \cdots & \mathbf{u}_m\\
\vert & & \vert & \vert & & \vert \\
\end{bmatrix}
\in\mathbb R^{m\times m},
$$
una matrice completa. Si sceglie $\{\mathbf u_{n+1},\dots,\mathbf u_m\}$ in modo che la matrice $U$ contenga tutti vettori indipendenti.

### 5. **Forma finale della trasformazione**

Poiché il risultato vale per ogni $\mathbf{x}$, allora:

$$
\mathbf{A} \mathbf{x} = U \Sigma V^T \mathbf{x} \quad \Rightarrow \quad \boxed{\mathbf{A} = U \Sigma V^T}
$$

Questa è la **forma matriciale canonica della trasformazione lineare $\mathbf{A}$**.

### Ma di preciso a cosa è servito?

Senza ulteriori **restrizioni sulla base** $\{\mathbf v_i\}$, la scomposizione ottenuta non ci fornisce reali vantaggi. In particolare, se i vettori $\mathbf v_i$ non sono scelti in modo ortonormale, allora:

- la matrice $V$ **non è ortogonale** (cioè $V^T \ne V^{-1}$, il che è molto svantaggioso computazionalmente),
- la decomposizione $A = U \Sigma V^T$ **non ha una struttura particolarmente utile o interpretabile**, ed è solo una riscrittura di $A = U \Sigma V^{-1}$,
- le coordinate $z_i$ devono essere ottenute tramite inversione $V^{-1} \mathbf{x}$ e **non come semplici proiezioni scalari**, come nel caso ortonormale.

Inoltre, se la base $\{\mathbf v_i\}$ **non contiene gli autovettori (normalizzati) di $A^T A$**, la decomposizione non evidenzia il comportamento geometrico fondamentale di $A$, ovvero:

- $A^T A$ è **simmetrica e semi-definita positiva**, e rappresenta l'operazione:  
  > *applica $A$, poi proietta indietro con $A^T$*.  
  La sua geometria descrive **come $A$ deforma gli input**.

- I suoi autovettori (che diventano i $\mathbf v_i$ in SVD) **danno le direzioni principali** lungo cui $A$ agisce per stretching o compressione.

Quindi, se imponiamo che $V$ contenga gli **autovettori ortonormali di $A^T A$** (i quali formano sempre una base per lo spazio $\mathbb R^n$), otteniamo:

✅ una base che diagonalizza $A^T A$,  
✅ una decomposizione dove $V^T = V^{-1}$,  
✅ una decomposizione dove $U \in \mathbb R^m$ contiene gli autovettori di $AA^T$ (ortonormali),  
✅ valori singolari $\sigma_i = \sqrt{\lambda_i}$ (radici degli autovalori),  
✅ una visione chiara: $A$ **ruota**, **scala**, e poi **ruota di nuovo**.

👉 In sintesi: **la SVD è potente solo se $V$ (e quindi $U$) sono ortogonali** e legati allo spettro di $A^T A$ e $A A^T$, rispettivamente. Altrimenti, la decomposizione perde la sua forza geometrica e computazionale.

Quindi, scegliendo la base $V$ che ha per vettori gli autovettori della matrice $A^TA$, abbiamo la garanzia che i vettori $\{\mathbf v_i\}_{i=1}^n$ siano ortogonali tra loro e, inoltre, che puntino verso le direzioni dove avviene il massimo stretch della trasformazione $A$; i cosidetti **Right Singular Vectors**. In questo modo, otteniamo un'altra importante proprietà: **la matrice $U$ contiene gli autovettori di $AA^T$**, i cosidetti **Left Singular Vectors**.

Questa proprietà è fondamentale perché:

- **Scomposizione geometrica**:  
  $$
  A = U \, \Sigma \, V^T
  $$
  descrive $A$ come rotazione → stretching → rotazione.

- **Riduzione del problema**:  
  Permette di lavorare in basi dove $A$ agisce diagonalmente, semplificando l'analisi e la risoluzione dei sistemi.

- **Stabilità numerica**:  
  Le matrici ortogonali $U$ e $V$ non amplificano errori, rendendo la SVD ideale per il calcolo numerico.

- **Compressione e filtraggio**:  
  I valori singolari ordinano l'importanza delle direzioni → utile per approssimazione a rango ridotto e PCA.

- **Pseudoinversa e minimi quadrati**:  
  La SVD fornisce una soluzione ottima anche in presenza di sistemi non invertibili o sovradeterminati.

## 👻 Proprietà spettrali di $A^T A$ e $A A^T$

**Ipotesi**  
Sia $\{\mathbf v_i\}_{i=1}^n$ un insieme di vettori ortonormali tali che  
$$
A^T A\,\mathbf v_i = \sigma_i^2\,\mathbf v_i,
\qquad i=1,\dots,n
$$  
cioè i $\mathbf v_i$ sono già autovettori di $A^T A$ (e quindi ortogonali) con autovalori $\sigma_i^2$.

**Obiettivo**  
Dimostrare che  
1. $\{\mathbf u_i\}$, definiti da $\mathbf u_i = \tfrac1{\sigma_i}A\,\mathbf v_i$, sono autovettori di $A A^T$.  
2. Gli autovalori corrispondenti sono anch'essi $\sigma_i^2$.

1.  **Definizione di $\mathbf u_i$**  
    Poiché $\mathbf v_i$ è autovettore di $A^T A$ con autovalore $\sigma_i^2$, poniamo  
    $$
      \mathbf u_i \;:=\;\frac{A\,\mathbf v_i}{\|A\,\mathbf v_i\|}
      = \frac{A\,\mathbf v_i}{\sigma_i}.
    $$  
    Perché $\sigma_i > 0$ (valore singolare), questa definizione è ben posta e $\|\mathbf u_i\|=1$.

2.  **Calcolo di $A A^T\,\mathbf u_i$**  
    Partiamo da  
    $$
      \mathbf u_i = \frac1{\sigma_i}A\,\mathbf v_i
      \;\Longrightarrow\;
      A^T\,\mathbf u_i = \frac1{\sigma_i}A^T A\,\mathbf v_i
      = \frac1{\sigma_i}\,\sigma_i^2\,\mathbf v_i
      = \sigma_i\,\mathbf v_i.
    $$  
    Ora applichiamo $A$ a questa relazione:
    $$
      A A^T\,\mathbf u_i
      = A\bigl(\sigma_i\,\mathbf v_i\bigr)
      = \sigma_i\,A\,\mathbf v_i
      = \sigma_i\bigl(\sigma_i\,\mathbf u_i\bigr)
      = \sigma_i^2\,\mathbf u_i.
    $$

3.  **Conclusione sugli autovettori di $A A^T$**  
    Abbiamo mostrato che
    $$
      (A A^T)\,\mathbf u_i = \sigma_i^2\,\mathbf u_i,
    $$
    dunque ciascuno $\mathbf u_i$ è autovettore di $A A^T$ con autovalore $\sigma_i^2$.

4.  **Ortonormalità**  
    - Gli $\mathbf v_i$ erano ortonormali per ipotesi.  
    - Gli $\mathbf u_i$, essendo autovettori di una matrice simmetrica, sono anch'essi ortonormali (si verifica $u_i^T u_j=0$ per $i\neq j$ e $=1$ per $i=j$ in modo analogo al caso di $v_i$).

**Risultato finale**  
- $A^T A$ ha autovettori $\{\mathbf v_i\}$ con autovalori $\{\sigma_i^2\}$.  
- $A A^T$ ha autovettori $\{\mathbf u_i\}$ con gli stessi autovalori $\{\sigma_i^2\}$.  
- Entrambe le famiglie di autovettori sono ortonormali.

## 📐 Interpretazione Geometrica

Questa formula mostra come la SVD scompone ogni trasformazione lineare in una **sequenza ordinata** di operazioni:

1. **Rotazione/Riflessione** (o cambio di base) del vettore di input nello spazio delle $\mathbf{v}_i$, tramite $\mathbf{V}^T = V^{-1}$.
2. **Scalatura anisotropa** lungo queste direzioni, con coefficienti $\sigma_i$.
3. **Rotazione/Riflessione** finale nello spazio delle $\mathbf{u}_i$, tramite $\mathbf{U}$.

Questa decomposizione è non solo utile dal punto di vista computazionale, ma rivela anche la **struttura interna** della trasformazione stessa.

Quindi sia $\mathbf{A} \in \mathbb{R}^{m \times n}$ una matrice qualsiasi. La **SVD** è una fattorizzazione della matrice nella forma:

$$
\mathbf{A} = \mathbf{U} \mathbf{\Sigma} \mathbf{V}^{T}
$$

dove:

- $\mathbf{U} \in \mathbb{R}^{m \times m}$: matrice ortogonale delle **left singular vectors**
- $\mathbf{\Sigma} \in \mathbb{R}^{m \times n}$: matrice diagonale con valori $\sigma_i$ detti **singular values** in ordine decrescente
- $\mathbf{V} \in \mathbb{R}^{n \times n}$: matrice ortogonale delle **right singular vectors**

## 🧠 Approfondimento


Ogni trasformazione lineare $\mathbf{A} \in \mathbb{R}^{m \times n}$, per quanto complessa, può essere sempre **scomposta in tre fasi geometriche**:

$$
\mathbf{A} = \mathbf{U} \mathbf{\Sigma} \mathbf{V}^T
$$

Questa decomposizione corrisponde alla seguente **pipeline geometrica**:

### 🔹 1. Rotazione iniziale dello spazio ($\mathbf{V}^T$)

- Ruota (o riflette) lo spazio originale per allinearlo alle direzioni principali della trasformazione.

- Trasforma ogni vettore $\mathbf{A}$ nel nuovo sistema di riferimento ortonormale: $\mathbf z= \mathbf V^⊤ \mathbf x$

- Intuitivamente, è come esprimere $\mathbf{A}$ in una nuova base ortogonale costruita sui concetti principali della trasformazione.

### 🔹 2. Scalatura assiale ($\mathbf{\Sigma}$)

- $\mathbf{\Sigma}$ è una matrice **diagonale** che **scala** ogni coordinata **indipendentemente** lungo un asse ortogonale.
- I valori diagonali $\sigma_1 \geq \sigma_2 \geq \dots \geq \sigma_r \geq 0$ sono i **valori singolari** e rappresentano **quanto** viene deformato lo spazio in ciascuna direzione.
- Nessuna rotazione o shearing: solo **dilatazione o contrazione**.
- In questo passaggio avviene il "cuore" della trasformazione: le direzioni principali vengono **ingrandite o compresse** in base alla loro **importanza informativa**.

### 🔹 3. Rotazione finale ($\mathbf{U}$)

- Dopo che il vettore è stato proiettato e scalato lungo le direzioni principali, $\mathbf{U}$ applica una rotazione (o riflessione) per posizionare il risultato nello spazio d'uscita: quello di $\mathbb{R}^m$ se $\mathbf{A} \in \mathbb{R}^{m \times n}$.

- La trasformazione $\mathbf{U}$ agisce come un cambio di base nello spazio del codominio:
essa assegna un significato geometrico e direzionale al risultato, stabilendo in quale direzione finale andrà ogni componente scalata.

- Geometricamente, $\mathbf{U}$ determina l'orientamento dell'ellisse risultante: mentre $\mathbf{V}^T$ allinea l'ingresso alle direzioni principali e $\Sigma$ deforma (scala) secondo quelle direzioni, $\mathbf{U}$ decide come disporre quella deformazione nello spazio originale d'uscita.

### 🌌 Esempio Visivo

Immagina un **cerchio unitario** nello spazio 2D. Applichiamo $\mathbf{A}$ tramite la sua SVD:

<img src="../../images/svd_pipeline.png" width="600" style="display: block; margin-left: auto; margin-right: auto;">
<br>

L'immagine illustra geometricamente la decomposizione a valori singolari (SVD) di una matrice $\mathbf A$, mostrando come può essere interpretata come una sequenza di trasformazioni.

- **$\mathbf{V}^T$** ruota il cerchio nella direzione delle **direzioni principali** (quelle dove deve avvenire lo stretching).
- **$\mathbf{\Sigma}$** schiaccia o dilata il cerchio lungo i suoi assi principali, trasformandolo in un ellisse.
- **$\mathbf{U}$** riallinea (ruota o riflette) l'ellisse nell'output space, secondo le direzioni principali dell'immagine di $\mathbf{A}$, cioè gli autovettori di $\mathbf{A} \mathbf{A}^T$.

Risultato: da una figura simmetrica e isotropa (cerchio), otteniamo un oggetto deformato ma **con significato direzionale**.

### 🧮 Forma matriciale compatta

Tutti i risultati precedenti possono essere espressi elegantemente in forma matriciale. A partire dalla **SVD**:

$$
A = U \Sigma V^T,
$$

possiamo scrivere:

- Per il prodotto $A^T A$:

$$
A^T A = (U \Sigma V^T)^T (U \Sigma V^T)
= V \Sigma^T U^T U \Sigma V^T
= V \Sigma^T \Sigma V^T.
$$

Poiché $U^T U = I$, otteniamo:

$$
A^T A = V (\Sigma^T \Sigma) V^T,
$$

che mostra che $A^T A$ è **diagonalizzabile** tramite $V$, e ha **autovalori** dati da $\sigma_i^2$.

- Analogamente, per $A A^T$:

$$
A A^T = (U \Sigma V^T)(U \Sigma V^T)^T
= U \Sigma V^T V \Sigma^T U^T
= U \Sigma \Sigma^T U^T.
$$

Quindi:

$$
A A^T = U (\Sigma \Sigma^T) U^T,
$$

che mostra che $A A^T$ è **diagonalizzabile** tramite $U$, e ha gli **stessi autovalori** $\sigma_i^2$ (tranne eventuali zeri in più se $m \ne n$).

Queste espressioni confermano in forma compatta che:
- Le colonne di $V$ sono autovettori di $A^T A$,
- Le colonne di $U$ sono autovettori di $A A^T$,
- Gli autovalori in entrambi i casi sono i quadrati dei valori singolari contenuti in $\Sigma$.

- **Caso $m > n$:**  
  $U \in \mathbb{R}^{m \times m}$ è ortogonale. I primi $n$ autovettori corrispondono agli autovalori $\sigma_i^2 > 0$ di $A A^\top$; i restanti $m - n$ sono autovettori associati all'autovalore $0$.  

- **Caso $n > m$:**  
  $V \in \mathbb{R}^{n \times n}$ è ortogonale. I primi $m$ autovettori corrispondono agli autovalori $\sigma_i^2 > 0$ di $A^\top A$; i restanti $n - m$ sono autovettori associati all'autovalore $0$.  


## 📏 Proprietà

- I vettori di $\mathbf{U}$ e $\mathbf{V}$ formano **basi ortonormali** per lo spazio delle righe e delle colonne.
- I **valori singolari** $\sigma_i$ rappresentano la **quantità di informazione** trasportata lungo ciascuna direzione.
- $\text{rank}(\mathbf{A}) =$ numero di valori singolari non nulli.
- Può essere vista come una generalizzazione dell'autodecomposizione (eigendecomposition) per matrici rettangolari.

## 🔧 Riduzione Dimensionale tramite Truncated SVD

Spesso, molte direzioni in cui la matrice $\mathbf{A}$ proietta i dati risultano **trascurabili o rumorose**. La **Truncated SVD** consiste nel conservare **solo i primi $k \ll \min(m, n)$ valori singolari** più grandi:

$$
\mathbf{A} \approx \mathbf{A}_k = \mathbf{U}_k \mathbf{\Sigma}_k \mathbf{V}_k^T
$$

- $\mathbf{U}_k \in \mathbb{R}^{m \times k}$ contiene i primi $k$ vettori singolari sinistri.
- $\mathbf{\Sigma}_k \in \mathbb{R}^{k \times k}$ contiene i primi $k$ valori singolari (i più grandi).
- $\mathbf{V}_k^T \in \mathbb{R}^{k \times n}$ contiene i primi $k$ vettori singolari destri.

🔍 **Perché funziona?**

1. I valori singolari $\sigma_1 \geq \sigma_2 \geq \dots \geq \sigma_r$ sono ordinati in modo decrescente:  
   **i primi rappresentano le direzioni in cui $\mathbf{A}$ ha la massima "energia"** (varianza proiettata).

2. Geometricamente:  
   - Ogni direzione $\mathbf{v}_i$ corrisponde a un asse principale su cui $\mathbf{A}$ proietta i dati.
   - Il valore $\sigma_i$ misura **quanto è importante quella direzione**.
   - Troncando dopo $k$, scartiamo le direzioni meno influenti.

3. Matematicamente:  
   $$ 
   \mathbf{A}_k = \arg\min_{\text{rank-}k\text{ matrices } \mathbf{A}} \|\mathbf{A} - \mathbf{A}\|_F 
   $$
   cioè $\mathbf{A}_k$ è la **migliore approssimazione di rango $k$** di $\mathbf{A}$ in norma di Frobenius (somma dei quadrati degli scarti).

🚀 **Utilità**:
- **Compressione dei dati**: conserviamo solo l'informazione essenziale.
- **Riduzione del rumore**: eliminiamo direzioni deboli o casuali.
- **Estrazione di concetti latenti**: fondamentale in NLP, raccomandazione, clustering.


## 🧾 Differenze tra SVD ed Eigendecomposition

| Metodo      | Tipo matrice     | Fattorizzazione                                  |
|-------------|------------------|--------------------------------------------------|
| SVD         | qualsiasi         | $\mathbf{A} = \mathbf{U} \mathbf{\Sigma} \mathbf{V}^T$ |
| Eigendecomp | solo quadrate     | $\mathbf{A} = \mathbf{Q} \mathbf{\Lambda} \mathbf{Q}^{-1}$ |

Nota: SVD è più generale e robusta.

## ⚙️ Algoritmo per Calcolare la SVD

Sebbene abbiamo discusso a fondo il significato geometrico e le proprietà della decomposizione SVD, **non abbiamo ancora affrontato il modo in cui essa viene effettivamente calcolata**.

In breve, calcolare la SVD di una matrice $\mathbf{A} \in \mathbb{R}^{m \times n}$ significa trovare tre matrici $\mathbf{U}, \mathbf{\Sigma}, \mathbf{V}$ tali che:

$$
\mathbf{A} = \mathbf{U} \mathbf{\Sigma} \mathbf{V}^T
$$

L'algoritmo per trovare queste matrici **non si basa semplicemente su manipolazioni algebriche dirette**, ma coinvolge:

- la **diagonalizzazione** delle matrici simmetriche $A^T A$ e $A A^T$,
- il **calcolo degli autovalori e autovettori** di queste matrici,
- e la costruzione dei vettori singolari normalizzati a partire da queste informazioni.

In pratica, si ricorre a **tecniche numeriche stabili** come:
- il metodo delle **rotazioni di Jacobi**,
- la **bidiagonalizzazione** di $\mathbf{A}$ tramite trasformazioni di Householder,
- e successivi algoritmi iterativi per l'estrazione dei valori singolari.

👉 Per i dettagli sul **procedimento numerico e algoritmico** per ottenere la SVD, rimandiamo alla seguente nota dedicata:

📎 [[Algoritmo per la SVD]]

## ⚠️ Limiti della SVD

- Complessità computazionale elevata: $\mathcal{O}(mn\min(m,n))$
- Poco scalabile su matrici **molto grandi** (es. $10^6 \times 10^6$)
- Non si adatta bene a **matrici dinamiche** o sparse (come nel linguaggio naturale)
- Richiede **riaddestramento completo** per ogni nuovo documento/termine

## ✅ Vantaggi

- Estrae automaticamente **relazioni latenti**
- Riduce il rumore e le ridondanze
- Ottimo per compattare l'informazione
- Facilita la **similarità semantica** tra oggetti (es. documenti, parole)

## 🧪 Applicazioni

- **NLP**: [[Latent Semantic Analysis]] (LSA)
- **Motori di raccomandazione**: filtraggio collaborativo
- **Visione artificiale**: compressione di immagini
- **Machine Learning**: preprocessing per PCA e clustering

## 🧭 Conclusione

La SVD non è solo una tecnica matematica ma un **principio guida** per strutturare, comprimere e interpretare dati complessi. In ambito linguistico, è lo strumento matematico fondante di molte tecniche semantiche moderne.
