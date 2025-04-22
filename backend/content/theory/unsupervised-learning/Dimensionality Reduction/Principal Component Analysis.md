# Principal Component Analysis (PCA)

## 📘 Definizione
La **Principal Component Analysis (PCA)** è una tecnica di riduzione della dimensionalità, che si basa sulla feature extraction, utilizzata per comprimere i dati preservando la maggior parte delle informazioni rilevanti. Viene ampiamente applicata in machine learning, analisi dei dati e statistica.

L'obiettivo principale della PCA è:
> Trovare una rappresentazione dello spazio originale dei dati in un sistema di coordinate trasformato, chiamato "componenti principali", che massimizzi la varianza dei dati.

 È strettamente collegata all'ipotesi dei [[Manifold Hypothesis|Manifold]].

---

## 🎯 Obiettivi principali

1. **Riduzione della dimensionalità**: Ridurre il numero di variabili per semplificare l'analisi.
2. **Rimozione della collinearità**: Ridurre la ridondanza tra le variabili.
3. **Visualizzazione**: Rappresentare dati complessi in 2D o 3D per comprenderne la struttura.

---
## 📊 Dataset di partenza

Consideriamo un dataset $D = \{\vec{x}_i\}_{i=1}^N$, con $\vec{x}_i \in \mathbb{R}^d$, dove:
- $N$: numero di osservazioni
- $d$: numero di variabili (dimensioni)

Scritto in forma di matrice, $D$ può essere rappresentato come:
$$
D = \begin{bmatrix}
x_{1,1} & x_{1,2} & \cdots & x_{1,d} \\
x_{2,1} & x_{2,2} & \cdots & x_{2,d} \\
\vdots & \vdots & \ddots & \vdots \\
x_{N,1} & x_{N,2} & \cdots & x_{N,d}
\end{bmatrix}
$$

Dove $x_{i,j}$ rappresenta il valore della $j$-esima variabile per il punto $\vec{x}_i$.

---

## 🛠️ Procedura dettagliata

### 1️⃣ **Standardizzazione del dataset**
Per ogni variabile $j \in \{1, 2, \dots, d\}$, calcoliamo:
1. La media:
   $$
   \mu_j = \frac{1}{N} \sum_{i=1}^N x_{i,j}
   $$
2. La deviazione standard:
   $$
   \sigma_j = \sqrt{\frac{1}{N} \sum_{i=1}^N (x_{i,j} - \mu_j)^2}
   $$

Per ogni punto $\vec{x}_i = [x_{i,1}, x_{i,2}, \dots, x_{i,d}]$, standardizziamo ogni dimensione:
$$
z_{i,j} = \frac{x_{i,j} - \mu_j}{\sigma_j}
$$

Il nuovo dataset standardizzato diventa:
$$
Z = \begin{bmatrix}
z_{1,1} & z_{1,2} & \cdots & z_{1,d} \\
z_{2,1} & z_{2,2} & \cdots & z_{2,d} \\
\vdots & \vdots & \ddots & \vdots \\
z_{N,1} & z_{N,2} & \cdots & z_{N,d}
\end{bmatrix}
$$

---

### 2️⃣ **Calcolo della matrice di covarianza**
La [[Covarianza|matrice di covarianza]] $\Sigma$ misura la relazione lineare tra le variabili del dataset standardizzato $Z$:
$$
\Sigma = \frac{1}{N-1} Z^\top Z
$$
Dove $Z^\top$ è la trasposta della matrice $Z$.

Ogni elemento $\Sigma_{j,k}$ della matrice di covarianza rappresenta la covarianza tra le variabili $j$ e $k$.

Notiamo inoltre l'applicazione della [[Correzione di Bessel]] nella formula della covarianza.

---

### 3️⃣ **Calcolo di autovalori e autovettori**
Calcoliamo gli **autovalori** $\lambda_1, \lambda_2, \dots, \lambda_d$ e gli **autovettori** $\vec{v}_1, \vec{v}_2, \dots, \vec{v}_d$ della matrice di covarianza $\Sigma$:
$$
\Sigma \vec{v}_j = \lambda_j \vec{v}_j
$$
- Gli autovalori $\lambda_j$ indicano la (quantità di) varianza catturata dal componente principale associato. Infatti, se sommiamo tutti gli autovalori, otteniamo la varianza totale.
- Gli autovettori $\vec{v}_j$ definiscono la direzione dei componenti principali.

L'unico caso in cui possiamo ottenere una soluzione non banale dell'equazione (i.e. $\vec v_j = \vec 0$) è quando la matrice $(\Sigma - \lambda_j I)$ non è invertibile, infatti se lo fosse
$$\begin{align}
\Sigma \vec{v}_j &= \lambda_j \vec{v}_j\\
\Sigma \vec{v}_j - \lambda_j \vec{v}_j &= \vec 0\\
(\Sigma - \lambda_j I) \vec{v}_j &= \vec 0\\
(\Sigma - \lambda_j I)^{-1} (\Sigma - \lambda_j I) \vec{v}_j &= (\Sigma - \lambda_j I)^{-1} \vec 0\\
\vec v_j &= \vec 0.
\end{align}
$$
avremmo la soluzione banale. Quindi dobbiamo assumere per forza che 
$$
det[(\Sigma - \lambda_j I)] = 0.
$$
Dato che questa equazione è un polinomio di grado al massimo $d$, può avere al massimo $d$ soluzioni, e quindi non più di $d$ autovettori e autovalori.

Una volta trovati gli autovalori, non ci resta altro che sostituirli nell'equazione
$$
(\Sigma - \lambda_j I) \vec{v}_j = \vec 0
$$
per ottenere i rispettivi autovettori. Infine, per ottenere i versori dagli autovettori, ci basterà dividerli per la loro norma $L^2$, in modo da ottenere dei vettori di lunghezza unitaria.

---

### 4️⃣ **Selezione dei componenti principali**
Ordiniamo gli autovalori in ordine decrescente:
$$
\lambda_1 \geq \lambda_2 \geq \cdots \geq \lambda_d
$$
Selezioniamo i primi $k$ componenti principali che spiegano la maggior parte della varianza, cioè:
$$
\text{Varianza spiegata} = \frac{\sum_{j=1}^k \lambda_j}{\sum_{j=1}^d \lambda_j}
$$

---

### 5️⃣ **Proiezione dei dati**
Proiettiamo il dataset standardizzato $Z$ nello spazio dei $k$ componenti principali selezionati. La matrice proiettata è definita come:

$$
Z_{\text{PCA}} = Z V_k
$$

Dove:
- $Z$ è la matrice del dataset standardizzato di dimensione $N \times d$ (con $N$ osservazioni e $p$ variabili),
- $V_k$ è una matrice $d \times k$, i cui $k$ autovettori (o "vettori propri") corrispondono ai $k$ autovalori maggiori della matrice di covarianza.

#### 🔍 **Perché questa operazione funziona?**
La proiezione $Z V_k$ riduce la dimensione del dataset da $d$ a $k$ variabili, ma conserva la maggior parte dell'informazione originale (ovvero la varianza). Questo avviene per i seguenti motivi:

1. **Gli autovettori definiscono una nuova base**:
   Gli autovettori di $Z$ (calcolati dalla matrice di covarianza o di correlazione) rappresentano le direzioni principali lungo cui i dati variano maggiormente. In termini geometrici, queste direzioni sono ortogonali tra loro e formano una nuova base dello spazio originale.

2. **Proiezione lungo le direzioni principali**:
   Molte variabili del dataset originale possono essere fortemente correlate tra loro, il che significa che i dati "occupano" solo una porzione ridotta dello spazio ad alta dimensionalità. Gli autovettori identificano le direzioni in cui i dati sono più sparsi. Proiettando $Z$ sugli autovettori principali, ci "spostiamo" dal sistema di coordinate originale a uno nuovo, allineato con queste direzioni principali.

3. **Selezione dei $k$ componenti principali**:
   Scegliendo i primi $k$ autovettori (che corrispondono ai $k$ autovalori più grandi), ci limitiamo a considerare le direzioni che catturano la maggior parte della varianza nei dati. Le altre direzioni (con varianza più piccola) vengono ignorate perché contribuiscono meno all'informazione complessiva.

#### 📏 **Cosa succede a livello geometrico?**

- Il dataset standardizzato $Z$ è rappresentato come un insieme di punti in uno spazio $d$-dimensionale.
- Gli autovettori $V_k$ definiscono un sotto-spazio $k$-dimensionale in cui i dati sono "schiacciati" (proiettati).
- La proiezione $Z V_k$ consiste nel prendere i punti originali e calcolare le loro coordinate rispetto a questo nuovo sistema di riferimento ridotto. Geometricamente, stiamo spostando i dati su un "piano" o "sottospazio" che meglio rappresenta la struttura del dataset.

Il risultato della proiezione, $Z_{\text{PCA}}$, è un dataset ridotto di dimensione $N \times k$. Questo dataset:
- Mantiene la maggior parte della varianza originale (se $k$ è scelto correttamente),
- Elimina la ridondanza e il rumore presente nelle dimensioni con varianza bassa,
- È più compatto e facilmente interpretabile rispetto al dataset originale.

---

## 🔗 Vantaggi

La PCA offre numerosi vantaggi, sia in termini di efficienza che di qualità dei risultati in analisi dei dati e machine learning. Di seguito, ogni vantaggio è spiegato in dettaglio:

### 1️⃣ **Riduzione del rumore**
- **Cosa significa**: Durante il processo di PCA, le dimensioni del dataset associate a una varianza bassa (spesso causate da rumore o variabili irrilevanti) vengono scartate. Questo aiuta a concentrarsi sulle componenti che rappresentano la struttura "vera" dei dati.
- **Perché è importante**: I dati reali spesso contengono rumore dovuto a misurazioni imprecise, errori di raccolta dati o informazioni non significative. Rimuovendo queste dimensioni, il dataset risultante è più pulito e meno soggetto a interpretazioni errate.

---

### 2️⃣ **Efficienza computazionale**
- **Cosa significa**: La riduzione del numero di dimensioni del dataset porta a una significativa riduzione dei costi computazionali, sia per il calcolo che per il successivo utilizzo nei modelli di machine learning.
- **Perché è importante**:
  - Molti algoritmi di machine learning, come regressione logistica, SVM e reti neurali, funzionano più velocemente quando il numero di feature è minore.
  - Inoltre, la complessità computazionale degli algoritmi di ottimizzazione cresce con l'aumentare delle dimensioni del dataset.

---

### 3️⃣ **Rappresentazione compatta**
- **Cosa significa**: La PCA comprime le informazioni più importanti del dataset originale in un numero inferiore di dimensioni, chiamate componenti principali. Questo consente una rappresentazione più semplice e comprensibile dei dati.
- **Perché è importante**:
  - Riducendo le dimensioni, il dataset diventa più facile da esplorare e visualizzare. Ad esempio, possiamo rappresentare un dataset multidimensionale in 2D o 3D, facilitando la comprensione dei pattern nei dati.
  - Conserva la maggior parte della varianza (cioè l’informazione significativa) anche dopo la riduzione.

---

### 4️⃣ **Eliminazione della collinearità**
- **Cosa significa**: La PCA trasforma le variabili originali in componenti principali che sono ortogonali tra loro (non correlate). Questo risolve il problema della multi-collinearità, dove due o più variabili sono fortemente correlate.
- **Perché è importante**:
  - La multi-collinearità può causare problemi in molti algoritmi, come regressione lineare, rendendo difficile stimare accuratamente i coefficienti.
  - Le componenti principali, essendo ortogonali, eliminano automaticamente questa problematica.
- **Esempio pratico**:
  - In un dataset economico, reddito e spese potrebbero essere fortemente correlati. La PCA può combinare queste due variabili in una nuova componente principale che rappresenta il "livello economico" senza ridondanza.

---

### 5️⃣ **Facilita l'interpretazione e la visualizzazione dei dati**
- **Cosa significa**: Riducendo il numero di dimensioni, diventa più semplice rappresentare i dati graficamente o interpretarne la struttura.
- **Perché è importante**:
  - In dataset ad alta dimensionalità, è difficile comprendere relazioni tra variabili o identificare pattern.
  - Dopo la PCA, possiamo spesso visualizzare i dati in 2D o 3D, rendendo più intuitiva l'analisi esplorativa.

---

## ⚠️ Svantaggi
- **Perdita di interpretabilità**: I componenti principali non sono facili da interpretare.
- **Lineare**: La PCA è limitata a relazioni lineari tra le variabili, quindi se i dati vivono in un sotto-spazio (i.e. [[Manifold Hypothesis|manifold]]) non lineare, la PCA può non catturare tutta l'informazione. 
- **Sensibile alla scala**: I dati devono essere standardizzati.
- **Complessità computazionale**: La PCA è abbastanza complessa dal punto di vista computazionale, perché richiede vari calcoli che coinvolgono matrici potenzialmente molto grandi. Quindi può essere abbastanza costoso eseguire la PCA su dataset di grandi dimensioni.

---
## 🚀 **Conclusione**
Grazie a questi vantaggi, la PCA è un'operazione fondamentale in molti ambiti dell'analisi dei dati, dalla riduzione delle dimensioni alla preparazione dei dati per modelli di machine learning. È particolarmente utile quando si lavora con dataset ad alta dimensionalità, in cui è cruciale ridurre la complessità senza perdere informazione significativa.
