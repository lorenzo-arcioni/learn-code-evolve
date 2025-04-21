## Introduzione

La valutazione di un algoritmo di clustering è una fase cruciale per determinare la qualità delle partizioni generate rispetto ai dati.

Esistono due principali approcci per valutare un clustering.

### Valutazione Esterna (External Evaluation)
La valutazione esterna confronta i risultati del clustering con una "verità di base" (ground truth o gold standard base) predefinita, ovvero un insieme di etichette o partizioni conosciute. Questo approccio misura quanto il clustering trovato sia coerente con la classificazione reale. È solitamente meno utilizzato in quanto è difficile che ci siano conoscenze a priori delle etichette dei dati se si vuole fare clustering. Metriche comuni includono:
- **Purezza (purity)**: Siano:
	- $C_i, \cdots, C_K$ i clusters.
	- $L_1, \cdots, L_J$ le labels conosciute a priori.
	- $n_{i, j}$ il numero degli items con label $j$ nel cluster $C_i$
	- $\sum_{j=1}^J n_{i, j} = n_i$ ovviamente il numero di elementi nel cluster $C_i$.
	La purezza $P(C_i)$ di un certo cluster $C_i$ è calcolata come
	$$
	P(C_i) = \frac{1}{n_i} \max_{j \in [J]} n_{i, j}
	$$
	Cioè la label che appare più volte nel cluster $C_i$ diviso la dimensione del cluster stesso.

	Ovviamente, la purezza totale del clustering, è data dalla media aritmetica delle purezze dei clusters:
	$$
	P = \frac{1}{K} \sum_{k=1}^K P(C_k)
	$$
	C'è comunque un problema di bias, in quanto la purezza cresce all'aumentare del numero di clusters.
- **Rand Index**: Misura il livello di coerenza tra il clustering e il ground truth. 
	$$
	\begin{array}{c|c|c|c} & \textbf{Stessa Classe in Ground Truth} & \textbf{Classi Diverse in Ground Truth} & \textbf{Totale} \\ \hline \textbf{Stessa Classe in Clustering} & a & b & a + b \\ \textbf{Classi Diverse in Clustering} & c & d & c + d \\ \hline \textbf{Totale} & a + c & b + d & N \end{array}
	$$
	**Legenda**: 
	- $a$: True Positive. 
	- $b$: False Positive. 
	- $c$: False Negative. 
	- $d$: True negative.
	Il Rand-Index equivale all'accuracy delle predizioni, quindi:
	$$
	\text{RI} = \frac{a + d}{a + b + c + d} = \frac{a + d}{N} = \frac{\text{Previsioni giuste}}{\text{Previsioni totali}}
	$$
	## Metriche di Valutazione per il Rand Index

	Oltre al Rand Index, possiamo calcolare altre metriche di valutazione basate sulla matrice di confusione:
	
	**Precision**
	La precisione misura la frazione di coppie correttamente identificate come appartenenti allo stesso cluster rispetto a tutte quelle assegnate allo stesso cluster:
	$$
	\text{Precision} = \frac{a}{a + b}.
	$$
	
	**Recall**
	Il recall misura la frazione di coppie nello stesso cluster nella ground truth che sono state assegnate correttamente allo stesso cluster nel clustering:
	$$
	\text{Recall} = \frac{a}{a + c}.
	$$
	
	**F1-score**
	L'**F1-Score** è la media armonica tra precision e recall:
	$$
	\text{F1-Score} = \frac{2 \cdot \text{Precision} \cdot \text{Recall}}{\text{Precision} + \text{Recall}} = \frac{2a}{2a + b + c}.
	$$
	
	**F$\beta$-Score**
	L'**F$\beta$-Score** è una generalizzazione dell'F1-Score, che permette di dare più peso alla precision o al recall. È definito come:
	$$
	F_\beta = \frac{(1 + \beta^2) \cdot \text{Precision} \cdot \text{Recall}}{\beta^2 \cdot \text{Precision} + \text{Recall}}.
	$$
	Sostituendo precision e recall:
	$$
	F_\beta = \frac{(1 + \beta^2) \cdot a}{(1 + \beta^2) \cdot a + \beta^2 \cdot b + c}.
	$$
	
	### Considerazioni
	- Quando $\beta = 1$, l'$F_\beta$-Score diventa equivalente all'F1-Score.
	- Quando $\beta > 1$, viene data più importanza al recall.
	- Quando $\beta < 1$, viene data più importanza alla precision.
	
		
	- **Adjusted Rand Index (ARI)**: Valuta la similarità tra le partizioni considerando correzioni per la casualità.
	- **Normalized Mutual Information (NMI)**: Misura la dipendenza statistica tra le partizioni trovate e quelle della ground truth.

### Valutazione Interna (Internal Evaluation)
La valutazione interna si basa esclusivamente sui dati e sui risultati del clustering, senza fare riferimento a etichette esterne. Questo approccio mira a misurare la coesione interna ai cluster (quanto i punti all'interno di un cluster sono vicini tra loro) e la separazione tra cluster distinti. 

In generale, un clustering è considerato "buono" se i suoi cluster hanno:
- Alta similarità intra-cluster (i data points in ogni cluster sono vicini).
- Bassa similarità inter-cluster (i clusters sono ben separati tra di loro).
La qualità di un clustering quindi dipende sia dalla rappresentazione dei dati e sia dalla metrica di similarità utilizzata.

Metriche comuni includono:

- **Davies-Bouldin Index**: il Davies-Bouldin Index (DBI) è una metrica di valutazione interna per il clustering che misura la qualità dei cluster basandosi sulla compattezza e sulla separabilità dei cluster stessi. Un valore più basso del DBI indica cluster più compatti e meglio separati, quindi un clustering più efficace. È calcolato come segue:
  $$
  DBI = \frac{1}{K} \sum_{i=1}^K \max_{j \neq i} \left(\frac{\sigma_i + \sigma_j}{\delta(\vec \mu_i, \vec \mu_j)} \right)
   $$
   Dove:
   - $K$ è il numero di clusters
   - $\vec \mu_k$ è il centroide del cluster $C_k$
   - $\sigma_k$ è la distanza media di tutti gli elementi del cluster $C_k$ dal suo centroide $\mu_k$.
   - $\delta(\vec \mu_i, \vec \mu_j) = \delta(\vec \Theta_i, \vec \Theta_j)$ è la distanza tra il centroide del cluster $C_i$ e quello del cluster $C_j$.
   
- **Dunn Index**: Il Dunn Index è una metrica di valutazione interna per il clustering che misura il rapporto tra la minima distanza tra cluster distinti (separabilità) e la massima distanza interna a un cluster (compattezza). Un valore più alto del Dunn Index indica un clustering migliore, con cluster ben separati e poco dispersi. Si calcola come segue:
  $$
  D = \frac{\min_{1 \leq i \leq j \leq K} \delta(\vec \Theta_i, \vec \Theta_j)}{\max_{1 \leq k \leq K} \delta'(\vec \Theta_k)}
  $$
  Dove:
   - $K$ è il numero di clusters
   - $\vec \Theta_k$ è il centroide del cluster $C_k$
   - $\sigma_k$ è la distanza media di tutti gli elementi del cluster $C_k$ dal suo centroide $\mu_k$.
   - $\delta(\vec \Theta_i, \vec \Theta_j)$ è la distanza tra il centroide del cluster $C_i$ e quello del cluster $C_j$.
   - $\delta'(\vec \Theta_k)$ è la distanza massima tra due punti nel cluster $k$.
   
- **Silhouette Score**: Combina coesione e separazione per ogni punto e calcola un valore medio. 
  Dato un punto dati $i \in C_I$, definiamo il coefficiente $a(i)$ come la media delle distanze tra $i$ e tutti gli altri data points nel cluster $C_I$. Calcolata come:
  $$
  a(i) = \frac{1}{|C_I| -1} \sum_{j \in C_I \setminus \{i\}} \delta(i, j)
   $$
   Possiamo interpretare il valore $a(i)$ come una misura di quanto abbiamo sbagliato ad assegnare il punto $i$ al cluster $C_I$. Questo è un modo per valutare la similarità intra-cluster.
   
   ![[silhouette_a.svg|300]]
   Analogamente, possiamo definire una media di diversità del punto $i$ con un certo cluster $C_J$ come la media delle distanze tra $i$ e tutti i punti nel cluster $C_J$, dove ovviamente $C_I \neq C_J$: 
  $$
   b(i) = \min_{J \in [K] \setminus \{i\}} \frac{1}{|C_J|} \sum_{j \in C_J} \delta(i, j)
   $$
   $b(i)$ è la più piccola distanza media tra $i$ e tutti i punti negli altri cluster. Il cluster $C_J$ che minimizza questa media di distanze è detto cluster "vicino" (neighboring cluster) di $i$ perché è il cluster migliore, dopo $C_I$, che lo possa ospitare.
   ![[silhouette_b.svg]]
   
   Ora possiamo finalmente definire il **silhouette score** $S(i)$ definito come:
   $$
   S(i) = \frac{b(i) - a(i)}{\max\{a(i), b(i)\}}
   $$
   Quindi ora abbiamo che:
   $$
   S(i) = \begin{cases}
   1 - \frac{a(i)}{b(i)} \quad &\text{se} \ \  a(i) < b(i)\\
   0 \quad &\text{se} \ \  a(i) = b(i)\\
   \frac{b(i)}{a(i)} - 1 \quad &\text{se} \ \  a(i) > b(i)
   \end{cases}
   $$
   Dalla formula, appare chiaro che $-1 \leq S(i) \leq 1 \ \ \forall i$ .
   Notiamo inoltre che $a(i)$ non è chiaramente definito quando $|C_I| = 1$, quindi in questo caso poniamo $S(i) = 0$.
   
   Un **silhouette score** alto è indice di un buon clustering, uno basso il contrario.

L'obiettivo della valutazione è garantire che i risultati del clustering siano significativi e utili per il problema specifico in analisi, tenendo conto delle caratteristiche intrinseche dei dati.
