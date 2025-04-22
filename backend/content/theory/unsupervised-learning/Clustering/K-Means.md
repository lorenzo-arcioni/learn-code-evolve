## Introduzione

L'algoritmo **K-Means** è uno dei metodi più comuni e semplici per eseguire il clustering. Esso cerca di partizionare un set di $N$ punti in $K$ cluster, minimizzando la varianza interna ai cluster (sum of square distances). 

Il K-means fa parte della tipologia [[Partitioning-based Clustering]].

In questo caso, il rappresentante di ogni cluster $\vec \Theta_k$ è il suo centro di massa (i.e., il centroide). Il centroide di un cluster è la media data point assegnati ad ogni cluster.

## Setup

Basandoci sul framework generale del [[Partitioning-based Clustering]], definiamo
$$
\vec \Theta_k = \frac{\sum_{n=1}^N \alpha_{n, k} \cdot \vec x_{n}}{\sum_{n=1}^N \alpha_{n, k}} = \mu_k = \frac{1}{|C_k|} \sum_{n \in C_k} \vec x_{n}
$$

where $|C_k| = \sum_{n=1}^N \alpha_{n, k}$

Assumiamo ora che la nostra funzione di distanza $\delta$ sia il quadrato della norma $L^2$ applicata al vettore differenza $\vec x_n - \vec \Theta_k$:
$$
\delta(\vec x_n, \vec \Theta_k) = ||\vec x_n - \vec \Theta_k||_2^2 = (\vec x_n - \vec \Theta_k)^2.
$$
La nostra funzione obiettivo $L$ diventa
$$
L(A, \Theta) = \sum_{n=1}^N \sum_{k=1}^K \alpha_{n, k} \cdot (\vec x_n - \vec \Theta_k)^2.
$$
Procediamo ora con i due steps:

- **Assegnazione**
	$$
	\alpha_{n, k} = \begin{cases}
	1 \quad \text{se } (\vec x_n - \vec \Theta_k)^2 = \min_{1 \leq j \leq K} \{(\vec x_n - \vec \Theta_j)^2\}\\
	0 \quad \text{altrimenti}
	\end{cases}
	$$
- **Ottimizzazione**
	Minimizziamo $L$ rispetto a $\Theta$ fissando $A$, quindi
	$$
	\DeclareMathOperator*{\argmin}{argmin}
	\DeclareMathOperator*{\argmax}{argmax}
	\Theta^* = \argmin_{\Theta} \left\{ \underbrace{\sum_{n=1}^N \sum_{k=1}^K \alpha_{n, k} \cdot (\vec x_n - \vec \Theta_k)^2}_{L(\Theta; A)} \right\}
	$$
	Calcoliamo ora il gradiente di $L$, poniamolo $=0$ e risolviamo per $\Theta$.
	Dal framework generale [[Partitioning-based Clustering]] sappiamo che se vogliamo trovare il gradiente di $L$, ci basta calcolare
	$$
	\begin{align}
	\frac{\partial L(\Theta; A)}{\partial \vec \Theta_k} &= \frac{\partial}{\partial \vec \Theta_k} \sum_{n=1}^N \alpha_{n, k} \cdot (\vec x_n - \vec \Theta_k)^2\\
	\\
	&\text{dato che ora } \alpha_{n, k} \text{ è una costante}\\
	\\
	&= \sum_{n=1}^N \alpha_{n, k} \cdot \frac{\partial}{\partial \vec \Theta_k} (\vec x_n - \vec \Theta_k)^2
	\end{align}
	$$
	Calcoliamo ora
	$$\begin{align}
	\frac{\partial}{\partial \vec \Theta_k} (\vec x_n - \vec \Theta_k)^2 &= \frac{\partial}{\partial \vec \Theta_k} (\vec x_n - \vec \Theta_k)^T (\vec x_n - \vec \Theta_k)\\
	&= \frac{\partial}{\partial \vec \Theta_k} \left [\vec x_n^T \vec x_n \underbrace{- \vec \Theta^T \vec x_n - \vec x_n^T \vec \Theta_k}_\text{sono uguali} + \vec \Theta_k^T \vec \Theta_k \right]\\
	&= \frac{\partial}{\partial \vec \Theta_k} \vec x_n^T \vec x_n - \frac{\partial}{\partial \vec \Theta_k} 2 \cdot \vec \Theta^T \vec x_n + \frac{\partial}{\partial \vec \Theta_k} \vec \Theta_k^T \vec \Theta_k \\
	&= 0 \ - 2 \vec x_n + 2 \vec \Theta_k\\
	&= -2(\vec x_n - \vec \Theta_k)
	\end{align}
	$$
	Ora non ci resta altro che porre 
	$$\begin{align}
	\sum_{n=1}^N \alpha_{n, k} \cdot -2(\vec x_n - \vec \Theta_k) &= 0\\
	2 \sum_{n=1}^N \alpha_{n, k} \vec \Theta_k &= 2 \sum_{n=1}^N \alpha_{n, k} \vec x_n\\
	\sum_{n=1}^N \alpha_{n, k} \vec \Theta_k &= \sum_{n=1}^N \alpha_{n, k} \vec x_n\\
	\vec \Theta_k &= \frac{\sum_{n=1}^N \alpha_{n, k} \vec x_n}{\sum_{n=1}^N \alpha_{n, k}} = \mu_k = \frac{1}{|C_k|} \sum_{n \in C_k} \vec x_n.
	\end{align}
	$$
	Quindi il centroide del cluster $k$ (quindi la media dei suoi data points) minimizza la funzione obiettivo (con una matrice $A$ fissata).
## Recap

Quindi, ricapitolando:
1. Scegliere il valore di $K$.
2. Selezionare randomicamente i $K$ centroidi tra gli $N$ data points a disposizione.
3. Assegnazione: assegnare ogni osservazione al più vicino centroide basandoci sulla funzione di distanza $\delta$. 
4. Ottimizzazione: per ogni cluster, aggiorniamo il centroide calcolando la nuova media di tutti i data points attualmente nel cluster.
5. Ripetere iterativamente i punti 3-5 finché non viene raggiunta la condizione di uscita.
	Abbiamo varie condizioni di uscita:
	- Numero fisso di iterazioni.
	- Gli assegnamenti dei clusters non cambiano più (con un certo threshold).
	- I centroidi rimangono sempre gli stessi.
## Convergenza

In entrambi i casi di assegnazione e ottimizzazione (aggiornamento) o miglioriamo la funzione obiettivo oppure no. In generale, questo algoritmo è un caso particolare dell'[[Expectation Maximization Algorithm]], del quale è dimostrata la convergenza.
## Complessità (time)
Calcolare la distanza tra due vettori di dimensione $d$ ha un costo di $O(d)$. 

Lo step di assegnazione quindi ha un costo di $O(NKd)$, in quanto per ogni data point, cerchiamo il centroide più vicino (calcolando per ognuno la distanza).

Nello step di ottimizzazione (aggiornamento dei centroidi) calcoliamo la media una volta per ogni punto in ogni cluster. Dato che ogni punto è in un solo cluster, e che per calcolare la media per tutte le dimensioni ha un costo di $O(d)$, in totale abbiamo $O(Nd)$.

Assumendo che l'algoritmo termini in $R$ iterazioni, abbiamo una complessità totale di $O(R(KNd + Nd))$ e quindi $O(RKNd)$.

## ✅ Vantaggi:
1. **Semplicità ed Efficienza** – Facile da implementare e computazionalmente efficiente, soprattutto per grandi dataset.
2. **Scalabilità** – Può gestire grandi volumi di dati con una complessità computazionale relativamente bassa.
3. **Velocità di Convergenza** – Generalmente converge rapidamente rispetto ad altri algoritmi di clustering.
## ❌ Svantaggi:
1. **Necessità di specificare K** – Il numero di cluster deve essere definito a priori, il che può essere difficile senza conoscenza preliminare dei dati.
2. **Sensibilità agli outlier** – Gli outlier possono influenzare significativamente i centroidi, distorcendo il clustering.
3. **Dipendenza dall’inizializzazione** – L'algoritmo può convergere a soluzioni sub-ottimali a seconda della scelta iniziale dei centroidi.

## Conclusioni

Il fatto che all'inizio vengano scelti i centroidi in modo casuale, può comportare un clustering non sempre sub-ottimale. Per mitigare il problema, si esegue l'algoritmo K-means più volte, in modo da avere diverse versioni di assegnazione iniziale dei centroidi, potendo scegliere la migliore. Un approccio che cerca di mitigare il problema della scelta randomica iniziale dei centroidi è il [[K-means++]].
