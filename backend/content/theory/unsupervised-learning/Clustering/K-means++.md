## Introduzione

L'algoritmo **K-Means++** è una variante del classico **[[K-Means]]** progettata per migliorare la scelta iniziale dei centroidi. Questo approccio riduce il rischio di convergenza a un minimo locale sub-ottimale e migliora la qualità del clustering.

Invece di scegliere i centroidi iniziali casualmente, **K-Means++** seleziona strategicamente i centroidi iniziali in modo da massimizzare la distanza tra di essi. Questo metodo aumenta la probabilità di ottenere una buona separazione iniziale tra i cluster e, di conseguenza, risultati migliori.

## Algoritmo

Il processo di **K-Means++** può essere descritto nei seguenti passi:

1. Scegli il primo centroide $\vec \Theta_1$ casualmente tra i punti del dataset $\{\vec x_1, \vec x_2, \cdots, \vec x_N\}$. Quindi ora il set dei centroidi è $\{\vec \Theta_1\}$.
2. Per ogni punto $\vec x_n$, calcola la distanza quadrata dal centroide più vicino già selezionato:  
   $$
   D(\vec x_n) = \min_{j \in [K]} ||\vec x_n - \vec \Theta_j||^2
   $$
3. Seleziona il prossimo centroide $\vec \Theta_{m+1}$ con probabilità proporzionale a $D(\vec x_n)$:  
   $$
   P(\vec x_n) = \frac{D(\vec x_n)}{\sum_{i=1}^N D(\vec x_i)}.
   $$
4. Ripeti i passi 2 e 3 finché non avremo selezionato $K$ centroidi.
5. Esegui l'algoritmo [[K-Means]] classico partendo dai centroidi iniziali selezionati (step 3.).

## Vantaggi

1. **Minore sensibilità all'inizializzazione**: I centroidi iniziali sono scelti per essere ben distribuiti nello spazio, riducendo i rischi di convergenza sub-ottimale, come avviene nella versione vanilla [[K-Means]].
2. **Migliore approssimazione**: garantisce un upper-bound all'approssimazione ottenuta rispetto alla soluzione ottimale. Infatti, un clustering ottenuto con K-means++ è al massimo $O(\log K)$ peggiore di un clustering ottimale.
3. **Miglior convergenza**: Converge spesso più rapidamente rispetto al [[K-Means]] tradizionale poiché parte da un'inizializzazione migliore.

## Complessità

La fase di inizializzazione di **K-Means++** introduce un overhead rispetto al K-Means classico:
- Calcolare $D(\vec x_n)$ per tutti i punti ha complessità $O(Nd)$.
- Ripetere questo calcolo per selezionare $K$ centroidi richiede complessivamente $O(KNd)$.

Tuttavia, grazie alla migliore inizializzazione, spesso sono necessarie meno iterazioni per raggiungere la convergenza, compensando il costo aggiuntivo.

## Conclusioni

L'algoritmo **K-Means++** è una scelta preferibile rispetto al K-Means tradizionale per dataset complessi o con una distribuzione eterogenea. La sua inizializzazione migliorata riduce il rischio di ottenere risultati sub-ottimali, rendendolo particolarmente utile in applicazioni pratiche.
