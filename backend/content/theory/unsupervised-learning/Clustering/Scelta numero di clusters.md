## Introduzione

Ci sostanzialmente due situazioni in cui possiamo trovarci:
- Il numero di clusters è dato dal problema (molto raro).
- Il numero di clusters deve essere in qualche modo estrapolato dai dati.

Nel secondo caso, bisogna raggiungere un trade-off tra avere pochi clusters e averne troppi, quindi è essenziale un'analisi di costi e benefici.

## Total Benefit

Dato un clustering, definiamo un beneficio $b_i$ per un data point $\vec x_n$ come la sua similarità con il suo centroide, quindi $b_i \in [0, 1]$. Quindi il total benefit del clustering $B$ è:

$$
B = \sum_{i=1}^N b_i.
$$
**Remark:** Esiste sempre un clustering dove $B=N$. Cioè quando tutti i data points sono centroidi (abbiamo $N$ clusters).

## Total Cost

Assegniamo un costo $p$ ad ogni cluster, quindi un clustering con $K$ clusters avrà un total cost $P$ pari a $Kp$. 

Definiamo inoltre il valore $V$ di un clustering come total benefit - total cost:
$$
V = B - P
$$
**Goal:** Trovare un clustering che massimizzi $V$ su tutte le possibili scelte di $K$.

Il benefit $B$ aumenta al crescere del numero di clusters, ma $-P$ cerca di smorzare questa crescita.

## Elbow Method

È un metodo empirico per cercare di stimare il numero di clusters che massimizza il valore $V$ del clustering senza overfittare sui dati.  Qui possiamo osservare un esempio di come all'aumentare di $K$ diminuisce la sum of square distances:

![[elbow-method-clustering.svg]]
## Varianti alternative
- [[K-Medoids]]
- [[BRF K-means]]
