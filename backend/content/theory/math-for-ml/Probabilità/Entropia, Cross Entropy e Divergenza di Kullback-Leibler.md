## Entropia

L'**entropia** è una misura dell'incertezza o della quantità di informazione contenuta in una distribuzione di probabilità. In altre parole, indica quanto è "disorganizzata" o "incerta" una distribuzione di probabilità. Se una variabile casuale $X$ segue una distribuzione di probabilità $P(X)$, l'entropia è definita come:

$$
H(X) = -\sum_{i} P(x_i) \log P(x_i)
$$

Dove:
- $P(x_i)$ è la probabilità di ogni possibile esito $x_i$ della variabile casuale $X$.
- La somma è fatta su tutti gli esiti possibili.

### Interpretazione dell'Entropia

- **Alta entropia** indica una maggiore incertezza. Ciò significa che le probabilità sono distribuite in modo più uniforme tra gli esiti, suggerendo che non ci sono esiti dominanti.
- **Bassa entropia** indica una distribuzione più concentrata, in cui uno o pochi esiti hanno probabilità più elevate, riducendo l'incertezza.

Ad esempio, se si lancia una moneta equa, la probabilità di ottenere testa o croce è $0.5$ ciascuna, e l'entropia è massima ($H(X) = 1$). Se invece si lancia una moneta truccata, con probabilità $0.9$ per testa e $0.1$ per croce, l'entropia sarà $\approx 0.14$.

---

## Cross Entropy

La **cross-entropy** misura la distanza tra due distribuzioni di probabilità. In particolare, misura quanto bene una distribuzione di probabilità predetta $Q(X)$ approssima una distribuzione di probabilità vera $P(X)$.

La formula della **cross-entropy** tra due distribuzioni è:

$$
H(P, Q) = -\sum_{i} P(x_i) \log Q(x_i)
$$

Dove:
- $P(x_i)$ è la distribuzione "vera" (ad esempio, la distribuzione dei dati reali).
- $Q(x_i)$ è la distribuzione "predetta" (ad esempio, la distribuzione predetta da un modello).

### Interpretazione della Cross-Entropy

- **Alta cross-entropy**: Se le due distribuzioni sono molto diverse, la cross-entropy sarà alta. Questo indica che la distribuzione predetta non è una buona approssimazione di quella vera.
- **Bassa cross-entropy**: Se le distribuzioni sono simili, la cross-entropy sarà bassa. Questo indica che il modello ha predetto correttamente la distribuzione dei dati.

La **cross-entropy loss** è una funzione di perdita comunemente utilizzata nell'apprendimento automatico per misurare quanto bene un modello predice una distribuzione di probabilità rispetto ai dati reali. Durante l'addestramento, l'obiettivo è minimizzare la cross-entropy loss.

---

## Divergenza di Kullback-Leibler (KL Divergence)

La **divergenza di Kullback-Leibler** (KL Divergence) misura quanto una distribuzione di probabilità $Q(X)$ diverge dalla distribuzione di probabilità $P(X)$, ed è definita come:

$$
D_{\text{KL}}(P \parallel Q) = \sum_{i} P(x_i) \log \left( \frac{P(x_i)}{Q(x_i)} \right)
$$

### Interpretazione della KL Divergence

- La KL Divergence è una misura di "distanza" tra le due distribuzioni. Tuttavia, **non è una metrica**, poiché non soddisfa la proprietà di simmetria. Infatti, $D_{\text{KL}}(P \parallel Q)$ non è uguale a $D_{\text{KL}}(Q \parallel P)$.
- Intuitivamente, la KL Divergence rappresenta l'**aspettativa del numero di bit extra** necessari per codificare campioni di $P$ utilizzando un codice ottimizzato per $Q$.

### Calcolo della KL Divergence

- Se $Q$ è una buona approssimazione di $P$, la KL Divergence sarà bassa.
- Se $Q$ è molto diversa da $P$, la KL Divergence sarà alta.

In altre parole, la KL Divergence ci dice quanto la distribuzione predetta $Q(X)$ è lontana dalla distribuzione vera $P(X)$ in termini di informazioni aggiuntive richieste.

### Formula Alternativa

La KL Divergence può anche essere espressa come:

$$
D_{\text{KL}}(P \parallel Q) = H(P, Q) - H(P)
$$

Dove:
- $H(P, Q)$ è la cross-entropy tra le distribuzioni $P$ e $Q$.
- $H(P)$ è l'entropia della distribuzione vera $P$.

#### Dimostrazione

$$\begin{align} D_{\text{KL}}(P \parallel Q) &= \sum_{i} P(x_i) \log \left( \frac{P(x_i)}{Q(x_i)} \right) \\ &= \sum_{i} P(x_i) \left[ \log P(x_i) - \log Q(x_i) \right] \\ &= \sum_{i} P(x_i) \log P(x_i) - \sum_{i} P(x_i) \log Q(x_i) \\ &= - H(P) + H(P, Q) \\ &= H(P, Q) - H(P) \end{align}
$$

**Interpretazione** 
- La **cross-entropy** $H(P, Q)$ rappresenta il numero medio di bit necessari per codificare i dati di $P$ usando $Q$. 
- L'**entropia** $H(P)$ è il numero minimo teorico di bit necessari per codificare i dati di $P$. 
- La **KL Divergence** $D_{\text{KL}}(P \parallel Q)$ misura l'aumento del numero medio di bit necessari a causa dell'uso della distribuzione $Q$ invece di quella ottimale $P$. Se $Q$ è una buona approssimazione di $P$, allora $D_{\text{KL}}(P \parallel Q)$ sarà vicino a zero. Se invece $Q$ è molto diversa da $P$, la KL Divergence sarà alta.

Questa formula evidenzia che la KL Divergence è la differenza tra l'entropia della distribuzione vera e la cross-entropy.

---

## In Apprendimento Automatico

Nel contesto dell'apprendimento automatico, la **cross-entropy loss** e la **KL Divergence** sono utilizzate per allenare modelli di classificazione e generativi.

- **Cross-Entropy Loss**: Misura la qualità delle probabilità predette dal modello, e viene minimizzata durante il processo di addestramento.
- **KL Divergence**: Viene usata per ottimizzare la distanza tra una distribuzione predetta e una distribuzione target, ed è comune in modelli probabilistici come i modelli di inferenza bayesiana e nei modelli generativi come le reti generative avversarie (GANs).

---

## Conclusioni

- **Entropia** misura l'incertezza di una distribuzione.
- **Cross-Entropy** misura la distanza tra una distribuzione vera e una distribuzione predetta.
- **KL Divergence** misura quanto una distribuzione predetta diverge dalla distribuzione vera, ed è spesso usata in apprendimento automatico per ottimizzare modelli probabilistici.

L'uso di queste misure permette di quantificare l'incertezza e l'accuratezza dei modelli predittivi, e gioca un ruolo cruciale in molte applicazioni di machine learning, specialmente in contesti probabilistici.
