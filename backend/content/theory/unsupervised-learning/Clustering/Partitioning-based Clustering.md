# Partitioning-based Clustering

## Definizione 

Gli algoritmi di clustering basati su partizioni suddividono un dataset in **$K$ gruppi distinti**. Ogni punto dati appartiene a uno e un solo cluster, e i cluster vengono definiti in modo tale da minimizzare la distanza intra-cluster e massimizzare la distanza inter-cluster.

Quindi abbiamo la seguente configurazione:

- **Input**: Un insieme di $N$ data points e un numero $K$ (tale che $K < N$)
- **Goal**: Trovare una partizione che ottimizza un certo criterio (funzione obiettivo).
- **Output**: Una partizione degli $n$ data points in $K$ clusters.
	
Esempio di partizione con $K=2$:
	$C = [0, 1, 1, 0, 1, 0, \cdots, 1, 0]$
	
Ma quante sono le possibili partizioni di un insieme? Beh potenzialmente potremmo pensare di avere $K^N$ partizioni, perché per ogni punto possiamo scegliere $K$ clusters, e quindi $K \cdot K \cdot \ \cdots \ \cdot K$, $N$ volte. Ma in realtà molte di meno in quanto siamo interessati solamente a quelle dove ogni cluster contiene almeno $1$ data point, ed inoltre stiamo considerando anche le stesse partizioni più volte, come ad esempio:
$$\begin{align}
\{[1, 2], [3, 4]\} \rightarrow (0, 0, 1, 1)\\
\{[3, 4], [1, 2]\} \rightarrow (1, 1, 0, 0)
\end{align}.
$$
Possiamo però essere molto più precisi utilizzando il numero di Stirling per le partizioni:

$$
S(K, N) = \begin{Bmatrix}
x\\
y
\end{Bmatrix}\approx \frac{K^N}{K!} \in O(K^N)
\
$$
Quindi, la ricerca della partizione ottima (i.e. , che minimizza la funzione obiettivo) è un problema intrattabile, dal punto di vista computazionale, per molte funzioni di costo. Ma possiamo benissimo cavarcela con delle euristiche, come il [[K-Means]] , [[K-Medoids]] e il [[K-Means++]].

## Un Framework Generico per il Clustering

### Flat Hard Clustering
Il **flat hard clustering** è un metodo di clustering in cui i dati vengono suddivisi in gruppi **non gerarchici** (flat) e ogni punto appartiene **esattamente a un solo cluster** (hard), senza sovrapposizioni. Quindi, formalmente:

- $\{\vec x_1, \vec x_2, \cdot, \vec x_N\}$ i dati di input.
- $\{C_1, C_2, \cdots, C_K\}$ cluster di output.
- $\vec \Theta_k$ è il **rappresentante** del cluster $C_k$.
Dove per rappresentante si intende un valore (o un insieme di valori) che descrive in modo sintetico le caratteristiche del cluster $C_k$. Può essere, ad esempio: 

- **Il centroide**: nel caso di algoritmi come **K-Means**, è il punto medio dei dati all'interno del cluster $C_k$, calcolato come: $$ \vec{\Theta}_k = \frac{1}{|C_k|} \sum_{\vec{x}_i \in C_k} \vec{x}_i $$
- **Il medoid**: per algoritmi come **K-Medoids**, è l'elemento del cluster $C_k$ che minimizza la somma delle distanze con gli altri punti del cluster. 
- **Una distribuzione probabilistica**: in approcci più avanzati (ad esempio clustering bayesiano), $\vec{\Theta}_k$ può rappresentare i parametri di una distribuzione (es. media e varianza di una gaussiana). In generale, il rappresentante $\vec{\Theta}_k$ è scelto per ottimizzare un criterio (ad esempio, la minimizzazione della varianza intra-cluster).

### Funzione Obiettivo
La funzione obiettivo è in grado di dirci quanto il nostro clustering è ottimale:
$$\large
L(A, \Theta) = \sum_{n=1}^N \sum_{k=1}^K \alpha_{n, k} \cdot \delta(\vec x_n, \vec \Theta_k)
$$
Dove:

- $A$ è una matrice $N \times K$ tale che
$$
\alpha_{n, k} = \begin{cases}
1 \quad \text{se } \vec x_n \text{ è assegnato al cluster } k\\
\\
0 \quad \text{altrimenti}
\end{cases}.
$$
- $\Theta = \{\vec \Theta_1, \cdots, \vec \Theta_K\}$ è l'insieme dei rappresentanti dei clusters.
- $\delta(\vec x_n, \vec \Theta_k)$ è una funzione che misura la distanza tra $\vec x_n$ e $\vec \Theta_k$.
Quindi
$$
A^*, \Theta^* = \argmin_{A, \Theta} L(A, \Theta),
$$
ma come abbiamo già visto, la soluzione a questo problema è $NP$-Hard, perché esplora tutte le possibili partizioni $O(K^N)$.

Però, possiamo comunque trovare una soluzione non-convessa data l'assegnazione discreta dei valori nella matrice $A$ (minimi locali multipli). Tuttavia, in questo modo, non possiamo sfruttare le proprietà delle funzioni convesse, come quella di trovare un minimo globale.

La matrice $A$ infatti è composta da valori discreti ($0$ o $1$), quindi il problema è combinatorio e non può essere trattato come un problema di ottimizzazione continua. 
Non possiamo utilizzare tecniche analitiche, come il calcolo differenziale, per trovare facilmente il minimo. 

$L(A, \Theta)$ non è convessa rispetto a $A$ e $\Theta$, quindi può avere **minimi locali multipli**. Non esiste garanzia di trovare il minimo globale utilizzando metodi iterativi.

### Soluzione Iterativa [[Algoritmo di Lloyd-Forgy]]
Questo algoritmo non garantisce una soluzione ottima, perché potremmo fermarci ad un minimo locale o ad un punto di sella. L'algoritmo si compone di due steps:
- **Assegnazione**:
	Minimizzare $L$ rispetto ad $A$ fissando $\Theta$. Infatti non possiamo calcolare il gradiente di $L$ in quanto $A$ è una matrice discreta.
	Intuitivamente, dato un set (fisso) di rappresentanti, $L$ è minimizzata se ogni data point $\vec x_n$ è assegnato al cluster del più vicino rappresentante (ad $\vec x_n$).
	**Remark:** $L$ è la somma di tutte le distanze da ogni data point al suo rappresentante.
	Quindi,

$$
\large
\alpha_{n, k} = \begin{cases}
1 \quad \text{se } \delta(\vec x_n, \vec \Theta_k) = \min_{1 \leq j \leq K} \{\delta(\vec x_n, \vec \Theta_j)\} \\
0 \quad \text{altrimenti}
\end{cases}.
$$

- **Ottimizzazione**:
	Minimizzare $L$ rispetto a $\Theta$ fissando $A$. Se fissiamo $A$, possiamo tranquillamente calcolare il gradiente di $L$ (in quanto ora $L(\vec \Theta_1, \cdots, \vec \Theta_K; A)$ dipende solo dal parametro $\Theta$), porlo $= \vec 0$ e risolvere per $\Theta$.
$$
\large
\begin{align*}
\nabla L(\Theta; A) &= \left(\frac{\partial L(\Theta; A)}{\partial \vec \Theta_1}, \cdots,  \frac{\partial L(\Theta; A)}{\partial \vec \Theta_K} \right)^T\\
&= \left(\frac{\partial L(\vec \Theta_1, \cdots, \vec \Theta_K; A)}{\partial \vec \Theta_1}, \cdots,  \frac{\partial L(\vec \Theta_1, \cdots, \vec \Theta_K; A)}{\partial \vec \Theta_K} \right)^T
\end{align*}
$$ 
Quindi,
$$
\nabla L(\Theta; A) = \vec 0 \iff \frac{\partial L(\vec \Theta_1, \cdots, \vec \Theta_K; A)}{\partial \vec \Theta_j} = \underbrace{\frac{\partial L}{\partial \vec \Theta_j}}_\text{per semplificare la notazione} = 0 \quad \forall j \in [K].
$$ 
Calcoliamo ora
$$
\frac{\partial L}{\partial \vec \Theta_j} = \frac{\partial}{\partial \vec \Theta_j} \sum_{n=1}^N \sum_{k=1}^K \alpha_{n, k} \cdot \delta(\vec x_n, \vec \Theta_k) = \frac{\partial}{\partial \vec \Theta_j} \sum_{n=1}^N \alpha_{n, k} \cdot \delta(\vec x_n, \vec \Theta_j)
$$
e poi non ci resta che risolvere
$$
\frac{\partial}{\partial \vec \Theta_j} \sum_{n=1}^N \alpha_{n, k} \cdot \delta(\vec x_n, \vec \Theta_j) = 0
$$
che ovviamente, ora che $\alpha_{n, k}$ è una costante, dipende dalla funzione $\delta$.

## Algoritmi principali 

- [[K-Means]]: Suddivide i dati in $K$ cluster minimizzando la somma delle distanze quadrate tra i punti e i centroidi.
- [[K-Medoids]]: Simile a K-Means, ma utilizza punti effettivi del dataset come rappresentanti dei cluster (medoids) per ridurre l’impatto degli outlier.
- [[K-Means++]]:
## Limitazioni 

- Richiede di definire il numero di cluster ($K$) a priori.
- Sensibile agli outlier, che possono influenzare i centroidi.
## Applicazioni 

- Segmentazione clienti in ambito marketing. 
- Clusterizzazione di documenti in [[Natural Language Processing]]. 
- Compressione di immagini (es. riduzione di colori usando K-Means).
