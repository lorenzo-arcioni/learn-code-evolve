# Smoothing nei Modelli Linguistici  

## Introduzione  
Lo **smoothing** è una tecnica fondamentale per gestire il problema dei **dati sparsi** nei modelli di linguaggio. Senza smoothing:  
- Gli **n-grammi non osservati** nel training ricevono probabilità zero, portando a **perplessità infinita** durante il test.  
- Il modello non può generalizzare a sequenze plausibili ma mai viste.  

L'idea è **ridistribuire la massa di probabilità** dagli n-grammi frequenti a quelli rari o assenti ("Rubare ai ricchi per dare ai poveri").  

In alcune tecniche, viene utilizzato il concetto di sconto (discounting), che ora illustreremo.

### Discounting

Uno **sconto** (discount) è una tecnica usata per ridurre la massa di probabilità di un evento, riconoscendo che il conteggio osservato in un corpus limitato potrebbe essere sottostimato rispetto alla reale probabilità che quell'evento si verifichi in un corpus più grande. Formalmente, per un n-gramma con conteggio $c$ si definisce il conteggio ridistribuito $c^*$ come:

$$
c^* = c - d \quad \text{con } d \in [0, c],
$$

dove $d$ è il valore dello sconto. Il fattore di sconto relativo è quindi:

$$
d_c = \frac{c^*}{c}.
$$

Quando calcoliamo la probabilità di un n-gramma (dato un contesto $h$), usiamo il conteggio ridistribuito al posto del conteggio grezzo:

$$
P(w|h) = \frac{c^*}{N(h)},
$$

dove $N(h)$ è la somma totale dei conteggi degli n-grammi osservati per quel contesto.  

Questo approccio ha due scopi fondamentali:  
1. **Ridurre la sovrastima** degli n-grammi osservati frequentemente.  
2. **Riservare parte della massa probabilistica** per quegli n-grammi non osservati, i quali potranno essere poi distribuiti uniformemente (o secondo qualche altra strategia) tra tutti gli eventi "mai visti" per garantire che ricevano probabilità non nulle.

### Un Esempio Pratico

Immaginiamo un contesto $h$ in cui abbiamo i seguenti n-grammi con i relativi conteggi:

| n-gramma | Conteggio $c$ |
|----------|------------------|
| $w_1$ | 10               |
| $w_2$ | 5                |
| $w_3$ | 2                |
| $w_4$ | 0                |

Supponiamo di impostare uno sconto $d = 0.5$ per ciascun n-gramma osservato.  
I conteggi ridistribuiti $c^*$ diventeranno:  

- Per $w_1$: $c^* = 10 - 0.5 = 9.5$  
- Per $w_2$: $c^* = 5 - 0.5 = 4.5$  
- Per $w_3$: $c^* = 2 - 0.5 = 1.5$  
- $w_4$, che non è mai stato osservato, non subisce discounting: la sua probabilità sarà determinata tramite la massa di probabilità riservata agli eventi non visti.

La probabilità degli n-grammi osservati diventa quindi:

$$
P(w|h) = \frac{c - d}{N(h)},
$$

con $N(h) = 10 + 5 + 2 = 17$ (somma dei conteggi dei n-grammi osservati).

Per gli n-grammi non osservati (ad esempio $w_4$), si calcola una probabilità separata utilizzando la massa di probabilità riservata, che è la somma degli sconti applicati:

$$
\text{Massa riservata} = \frac{d \cdot N_{\text{unici}}(h)}{N(h)},
$$

dove $N_{\text{unici}}(h)$ è il numero di n-grammi visti almeno una volta per quel contesto. In questo esempio $N_{\text{unici}}(h) = 3$.

Quindi, la probabilità per un n-gramma non osservato potrebbe essere distribuita in base a questa massa:

$$
P(w_{\text{non-osservato}}|h) = \frac{0.5 \times 3}{17}.
$$

### Conclusioni

Il processo di discounting consente di:
- **Normalizzare** la probabilità complessiva mantenendo la somma pari a 1.
- Dare a quegli n-grammi che non sono mai stati osservati (ma che potrebbero verificarsi) una probabilità non nulla.
- Affrontare il problema dei dati sparsi rendendo il modello più robusto e in grado di generalizzare a sequenze mai viste nel training.

Questo approccio è essenziale per garantire che i modelli linguistici possano trattare con successo la varietà e la rarità degli eventi presenti nei dati reali.


## Tecniche Principali  

### 1. **Laplace (Add-One) Smoothing**  
Il Laplace Smoothing, noto anche come add-one smoothing, è una tecnica usata nei modelli di linguaggio probabilistici per gestire il problema degli zeri nelle stime di probabilità. Nei modelli basati su n-grammi, ad esempio, capita spesso che alcune combinazioni di parole non compaiano mai nel corpus di addestramento. Senza smoothing, queste combinazioni avrebbero probabilità pari a zero, il che può compromettere gravemente la generazione o la valutazione di frasi.

Il Laplace Smoothing risolve questo problema aggiungendo 1 al conteggio di ogni possibile n-gramma. In pratica, anche gli n-grammi mai visti ottengono un conteggio minimo, evitando probabilità nulle. 

Sebbene semplice ed efficace per corpus piccoli, il Laplace Smoothing tende a sovrastimare la probabilità degli eventi rari, penalizzando quelli frequenti. Per questo motivo, in applicazioni avanzate si preferiscono metodi più sofisticati come Good-Turing o Kneser-Ney smoothing. Tuttavia, il Laplace rimane una base utile per comprendere il concetto di smoothing nei modelli di linguaggio.

**Formula (Unigrammi):**  
$$
P_{\text{Laplace}}(w_i) = \frac{c(w_i) + 1}{N + V}
$$  
- $c(w_i)$: conteggio della parola $w_i$.  
- $N$: numero totale di token nel corpus.  
- $V$: dimensione del vocabolario. Questo semplicemente perché abbiamo aggiunto $+1$ per ogni parola.

**Formula generale per n-grammi**:  
Per un n-gramma $w_1, w_2, \dots, w_n$:  
$$
P_{\text{Laplace}}(w_n | w_1, \dots, w_{n-1}) = \frac{c(w_1, \dots, w_n) + 1}{\sum_{w}c(w_1, \dots, w_{n-1} w)+ 1} = \frac{c(w_1, \dots, w_n) + 1}{c(w_1, \dots, w_{n-1}) + V}
$$  
dove $c(w_1, \dots, w_{n-1})$ è il conteggio del contesto $(w_1, \dots, w_{n-1})$ e $V$ la dimensione del vocabolario (sempre perché abbiamo aggiunto $+1$ per ogni n-gramma con prefix $(w_1, \dots, w_{n-1})$).

**Ridistribuzione dei conteggi**:

Possiamo ottenere i conteggi risultati dall'applicazione dello smoothing con la seguente formula:  
$$
P_{\text{Laplace}}(w_n | w_1, \dots, w_{n-1}) = \frac{c(w_1, \dots, w_n) + 1}{c(w_1, \dots, w_{n-1}) + V} = \frac{c^*(w_1, \dots, w_n)}{c(w_i, \ldots, w_{n-1})} \Rightarrow c^*(w_1, \dots, w_n) = \frac{(c(w_1, \dots, w_n) + 1) \cdot c(w_1, \dots, w_{n-1})}{c(w_1, \dots, w_{n-1}) + V}.
$$

In questo modo possiamo confrontare direttamente i conteggi ridistribuiti con quelli originali (MLE).

**Esempio**:  
Se $N=1000$ e $V=500$, un bigramma "gatto felice" con $c=3$ (e contesto "gatto" che appare 10 volte):  
$$
P_{\text{Laplace}} = \frac{3 + 1}{10 + 500} = \frac{4}{510} \approx 0.0078
$$  
Conteggio ridistribuito:  
$$
c^* = \frac{(3 + 1) \cdot 10}{10 + 500} = \frac{40}{510} \approx 0.078
$$

**Problema**:  
- Sovrastima degli eventi rari per $V$ grandi (es. $V=10^5$). Per un bigramma mai visto "gatto volante", con contesto "gatto" ($c=10$):  
$$
P_{\text{Laplace}} = \frac{0 + 1}{10 + 500} = \frac{1}{510} \approx 0.00196.
$$

---

### 2. Add-$k$ Smoothing

Un'alternativa all'add-one smoothing è spostare una quantità minore di massa probabilistica dagli eventi osservati a quelli non osservati. Invece di aggiungere 1 a ogni conteggio, aggiungiamo un conteggio frazionario $0 \leq k \leq 1$. Questo algoritmo è quindi chiamato add-$k$ smoothing.

$$
P_{Add-k}(w_n |w_1, \ldots, w_{n−1}) = \frac{c(w_1, \ldots, w_n) + k}{c(w_1, \ldots, w_{n-1}) + kV} = \frac{c^*(w_1, \dots, w_n)}{c(w_i, \ldots, w_{n-1})} \Rightarrow c^*(w_1, \dots, w_n) = \frac{(c(w_1, \dots, w_n) + k) \cdot c(w_1, \dots, w_{n-1})}{c(w_1, \dots, w_{n-1}) + kV}.
$$

L'add-$k$ smoothing richiede che si abbia un metodo per scegliere $k$; questo può essere fatto, ad esempio, ottimizzando su un devset. Sebbene l'add-$k$ sia utile per alcune attività (inclusa la classificazione di testi), risulta comunque non funzionare bene per la modellazione linguistica, generando conteggi con varianze scarse e spesso sconti inappropriati.

---

### 3. **Good-Turing Smoothing**

#### **Definizione**  
Il **Good-Turing smoothing** è una tecnica statistica fondamentale per stimare la probabilità di token rari o non osservati in un dataset. È particolarmente utile nei modelli linguistici (ad esempio, per $n$-gram) perché permette di ridistribuire la massa probabilistica dagli token frequenti a quelli che non sono stati mai osservati, migliorando così la robustezza del modello anche in presenza di dati scarsi.


#### **Formula Principale**  
Per un token osservato $k$ volte, la probabilità scontata è:  
$$
P_{\text{GT}}(w) = \frac{k^*}{N}, \quad \text{dove } k^* = \frac{(k+1) \cdot N_{k+1}}{N_k},  
$$  
- $N_k$ = numero di token osservati **esattamente** $k$ volte nel corpus,  
- $N$ = numero totale di token osservati ($N = \sum_{k=1}^\infty k \cdot N_k$).  

**Probabilità per Token non osservati** ($k=0$):  
$$
P_{\text{GT}}(w_{\text{new}}) = \frac{N_1}{N}.  
$$

Ovviamente i token non osservati sono quelli che non sono stati mai osservati nel corpus (training set), ma che sono presenti nel vocabolario $V$.

#### Intuizione

L'idea fondamentale del Good-Turing smoothing è quella di “riutilizzare” il corpus come un set di validazione per stimare la probabilità sia dei token già osservati sia di quelli che non abbiamo mai visto. La chiave del seguente ragionamento non è più la probabilità di un token di apparire in un testo, ma la probabilità che un certo token appaia con una certa frequenza. Quello che ci chiediamo è: quale frequenza mi aspetto per il prossimo token? e non più: quale probabilità mi aspetto per il prossimo token?

Immagina di avere un cesto di frutta e di voler prevedere quale frutto potresti trovare in più, anche se non lo hai mai visto o l'hai visto pochissimo. Il Good-Turing smoothing è una tecnica che ci aiuta proprio a fare questo: usa le informazioni sulle frequenze dei frutti per stimare la loro probabilità.

Assumiamo quindi di avere il seguente corpus $C$:

| Frutto | Frequenza |  
| --- | --- |  
| 🍌 | 5 |  
| 🍎 | 3 |  
| 🍊 | 2 |  
| 🍒 | 2 | 
| 🍉 | 1 |
| 🍇 | 0 |

e il seguente vocabolario: 

$$
V = \{ \text{🍌}, \text{🍎}, \text{🍊}, \text{🍒}, \text{🍉}, \text{🍇} \}
$$

In questo contesto, $N_0$ è il numero di token osservati 0 volte ($N_0 = 1$ in questo caso), $N_1$ il numero di token osservati 1 volta, e cosi via.

Per stimare la probabilità di trovare un 🍇 nel mondo reale, il Good-Turing smoothing utilizza il seguente ragionamento: se il prossimo token fosse 🍇, avrebbe molteplicità 1 nel corpus (perché avrei visto 🍇 per la prima volta). Quindi, se così fosse, avrei che questa situazione ha probabilità $\frac{1}{13}$, perché nel corpus per ora ho solo un elemento con molteplicità $1$ (🍉). E quindi un altro elemento di molteplicità $1$ ha probabilità $\frac{1}{13}$.

Questo ragionamento può estendersi tranquillamente per i token che già appaiono nel corpus. Considerando ad esempio il token 🍒, e chiediamoci qual è la probabilità che appaia di nuovo. Dato che 🍒 appare già 2 volte ($k=2$), se incontrassimo un altro 🍒, ne avremmo 3. Ora, la probabilità di apparire di nuovo di un token di frequenza 2 è la stessa che ha un token di frequenza 3 di apparire nel corpus, che è:
$$
\frac{(k+1) \cdot N_{k+1}}{N} = \frac{3 \cdot 1}{13} = \frac{3}{13}.
$$

Questo però non basta, perché questa è la probabilità che un **generico** frutto con molteplicità 2 diventi di molteplicità 3, quindi (dato che noi vogliamo la probabilità di un unico token) dobbiamo dividere questa probabilità per il numero di frutti con molteplicità 2 nel corpus ($N_2 = 2$). Quindi, la probabilità per il token 🍒 diventa:

$$
\frac{(k+1) \cdot N_{k+1}}{N \cdot N_2} = \frac{3 \cdot 1}{13 \cdot 2} = \frac{3}{26}.
$$

In questo contesto, possiamo definire anche $k^*$ come il conteggio atteso di un token con molteplicità $k$ nel corpus $C$ come segue:


(Numero di volte che un token con molteplicità $k$ apparirebbe nel corpus se venisse osservato un'ulteriore volta) x (Numero di classi con la stessa (nuova) molteplicità nel corpus) / (Numero di classi che potenzialmente possono essere "promosse" a molteplicità $k+1$ nel corpus).

In formule, 

$$
k^* = (k+1) \cdot \frac{N_{k+1}}{N_k}.
$$

Intuitivamente, se:

- $N_{k+1} > N_k$, allora significa che la porzione delle frequenze che hanno molteplicità $k+1$ nel corpus, sono maggiori di quelle che hanno molteplicità $k$ nel corpus. E quindi un token con molteplicità $k$ più probabilmente deve essere promosso a molteplicità $k+1$.
- $N_{k+1} = N_k$, allora significa che se osserviamo un nuovo token con molteplicità $k$, esso arriverà a molteplicità $k+1$. Quindi è come se il modello dicesse: "non ho evidenze per correggere il conteggio che ho ora, quindi mi limito ad aumentarlo di 1 in via cautelativa".
- $N_{k+1} < N_k$, allora significa che la porzione delle frequenze che hanno molteplicità $k$ nel corpus, sono maggiori di quelle che hanno molteplicità $k+1$ nel corpus. E quindi un token con molteplicità $k$ più probabilmente rimarrà con molteplicità $k$ invece di essere promosso a molteplicità $k+1$. 

Questo era un esempio di utilizzo in un unigramma, ma questo discorso vale per $N$-grammi in generale.


#### Limiti e Considerazioni

Il Good-Turing smoothing, pur essendo estremamente utile, presenta alcune limitazioni e aspetti da considerare:

1. **Instabilità quando $N_{k+1} = 0$**:  
   Se per un determinato $k$ non esistono Token osservati $k+1$ volte, la formula per $k^*$ non può essere calcolata, rendendo il metodo inapplicabile in quei casi. In questo caso, si utilizzano metodi per stimare anche il valore di $N_{k+1}$ (e.g. [[regressione lineare|Regressione Lineare]]).

2. **Ridotta Efficacia per Token ad Alta Frequenza**:  
   Per Token molto frequenti (tipicamente per $k \geq 5$), il metodo può risultare meno efficace, poiché la stima diventa meno significativa.

3. **Complessità Computazionale**:  
   Calcolare $N_k$ per ogni valore di $k$ può essere oneroso, soprattutto in corpus di grandi dimensioni. In tali contesti, possono essere necessarie semplificazioni o tecniche approssimative per rendere il calcolo computazionalmente gestibile.

---

### 4. **Absolute Discounting**

L'**Absolute Discounting** è una tecnica di smoothing che applica uno **sconto fisso** $d$ a tutti gli n-grammi con conteggio positivo. L’idea di base è simile al concetto generale di discounting: si sottrae una quantità fissa dal conteggio di ogni n-gramma osservato e si **ridistribuisce la massa probabilistica risparmiata** agli eventi non osservati.

#### **Formula**

Per un bigramma $w_{n-1}, w_n$ con conteggio $c(w_{n-1}, w_n)$, la probabilità scontata viene calcolata come:

$$
P_{\text{Abs}}(w_n | w_{n-1}) =
\frac{\max(c(w_{n-1}, w_n) - d, 0)}{c(w_{n-1})} + \lambda(w_{n-1}) \cdot P_{\text{backoff}}(w_n)
$$

- $d$: valore dello sconto (tipicamente tra 0.5 e 1.0, scelto empiricamente o stimato).
- $\lambda(w_{n-1})$: fattore di normalizzazione per il contesto $w_{n-1}$.
- $P_{\text{backoff}}(w_n)$: probabilità stimata da un modello di ordine inferiore (es. unigramma).

#### **Calcolo di $\lambda(w_{n-1})$**

Il termine $\lambda(w_{n-1})$ rappresenta **la massa di probabilità riassegnata** ai bigrammi non osservati. Si calcola come:

$$
\lambda(w_{n-1}) = \frac{d \cdot N_{+}(w_{n-1})}{c(w_{n-1})}
$$

dove:
- $N_{+}(w_{n-1})$ è il numero di bigrammi diversi che iniziano con $w_{n-1}$ e hanno conteggio positivo.

#### **Esempio Pratico**

Supponiamo di avere il seguente contesto $w_{n-1} = \text{"gatto"}$ con questi bigrammi:

| Bigramma         | Conteggio |
|------------------|-----------|
| ("gatto", "mangia") | 5       |
| ("gatto", "corre")  | 3       |
| ("gatto", "salta")  | 2       |
| ("gatto", "parla")  | 0       |

Totale conteggi per "gatto":  
$$
c(\text{"gatto"}) = 5 + 3 + 2 = 10
$$

Applichiamo uno sconto $d = 0.75$. I conteggi scontati diventano:

- ("gatto", "mangia"): $5 - 0.75 = 4.25$  
- ("gatto", "corre"): $3 - 0.75 = 2.25$  
- ("gatto", "salta"): $2 - 0.75 = 1.25$

Numero di bigrammi osservati: $N_{+}(\text{"gatto"}) = 3$

Calcoliamo $\lambda(\text{"gatto"})$:

$$
\lambda(\text{"gatto"}) = \frac{0.75 \cdot 3}{10} = 0.225
$$

La probabilità per i bigrammi osservati diventa:

$$
P(\text{"mangia"}|\text{"gatto"}) = \frac{4.25}{10} = 0.425  
$$

La probabilità per un bigramma non osservato come ("gatto", "parla") sarà determinata tramite backoff:

$$
P(\text{"parla"}|\text{"gatto"}) = 0.225 \cdot P_{\text{unigram}}(\text{"parla"})
$$

#### **Vantaggi**
- Più accurato del Laplace/Add-$k$, in quanto riduce i conteggi solo per n-grammi **osservati**.
- È una base del più sofisticato **Kneser-Ney smoothing**.

#### **Limiti**
- Richiede un buon stimatore per $d$ (può essere stimato da un dev set o con metodi come Good-Turing).
- Può sottostimare gli n-grammi frequenti se $d$ è scelto male.
- Viene utilizzato un modello di ordine inferiore per il backoff, e questo può portare a problemi di generalizzazione.

### 5. **Kneser-Ney Smoothing (Stato dell'Arte)**  
Il Kneser-Ney smoothing è considerato il metodo più efficace per la modellazione linguistica con $n$-grammi, combinando **sconti dinamici** e una **probabilità di continuazione** per gestire contesti non osservati e ridurre il bias verso parole frequenti in contesti specifici.

#### **Formula Base**
Usando l'intuizione che deriva dall'Absolute Discounting e sostituendo la probabilità di un modello di ordine inferiore con una **probabilità di continuazione**, otteniamo (nel caso di un bigramma) la seguente formula:

$$
P_{\text{KN}}(w_i | w_{i-1}) = \underbrace{\frac{\max(c(w_{i-1}, w_i) - d, 0)}{c(w_{i-1})}}_{\text{Probabilità del bigramma scontato}} + \underbrace{\lambda(w_{i-1})}_\text{Fattore di interpolazione} \cdot \underbrace{P_{\text{cont}}(w_i)}_\text{Probabilità di continuazione}
$$  
- **$d$**: Fattore di sconto (tipicamente $d = 0.75$).  
- **$P_{\text{cont}}(w_i)$**: Probabilità di continuazione (quanti bigrammi completa $w_i$), definita come:  
  $$
  P_{\text{cont}}(w_i) = \frac{|\{w_{i-1} : c(w_{i-1}, w_i) > 0\}|}{|\{(w_{j-1}, w_j) : c(w_{j-1}, w_j) > 0\}|}
  $$  
  - Numeratore: Numero di contesti **diversi** in cui $w_i$ appare.  
  - Denominatore: Numero totale di bigrammi **diversi** osservati nel corpus.

- **$\lambda(w_{i-1})$**: Fattore di interpolazione per garantire che la somma delle probabilità sia 1:  
  $$
  \lambda(w_{i-1}) = \underbrace{\frac{d}{c(w_{i-1})}}_{\text{sconto normalizzato}} \cdot \overbrace{\underbrace{\underbrace{|\{w_i : c(w_{i-1}, w_i) > 0\}|}_{\text{Numero di bigrammi diversi in cui $w_i$ appare}}}_\text{Numero di volte che abbiamo applicato lo sconto}}^{\text{Numero di bigrammi scontati}}
  $$

In generale:

Per un generico n-gramma $w_{i-n+1}, \dots, w_{i-1}, w_i$:  

$$
P_{\text{KN}}(w_i | w_{i-n+1}^{i-1}) = \frac{\max\left(c(w_{i-n+1}^{i}) - d,\, 0\right)}{c(w_{i-n+1}^{i-1})} + \lambda(w_{i-n+1}^{i-1}) \cdot P_{\text{KN}}(w_i | w_{i-n+2}^{i-1})
$$

Dove:
- **Sconto** ($d$):  
  Valore fisso (es. $d = 0.75$).  
- **Fattore di interpolazione** ($\lambda$):  
  $$
  \lambda(w_{i-n+1}^{i-1}) = \frac{d \cdot |\{w_i : c(w_{i-n+1}^{i}) > 0\}|}{c(w_{i-n+1}^{i-1})}
  $$  
  dove $|\{w_i : c(w_{i-n+1}^{i}) > 0\}|$ è il numero di **parole distinte** che seguono il contesto $w_{i-n+1}^{i-1}$.  

- **Probabilità di continuazione** (ricorsiva):  
  -  **Numeratore**: Contesti distinti $w_{i-n+1}$ per $w_{i-n+2}^{i}$.  
  - **Denominatore**: Totale n-grammi unici nel corpus. 
$$
P_{\text{KN}}(w_i | w_{i-n+2}^{i-1}) = \frac{\max\left(c(w_{i-n+2}^{i}) - d,\, 0\right)}{c(w_{i-n+2}^{i-1})} + \lambda(w_{i-n+2}^{i-1}) \cdot P_{\text{KN}}(w_i | w_{i-n+3}^{i-1}).
$$

Alla fine della ricorsione otteniamo la formula per gli unigrammi:

$$
P_{KN}(w) = \frac{\max(c(w) - d, 0)}{\underbrace{\sum_{w_i} c(w_i)}_\text{Somma totale dei conteggi di tutte le parole}} + \lambda(\epsilon) \frac{1}{V}
$$

Se vogliamo includere una parola sconosciuta `<UNK>`, la trattiamo semplicemente come una normale voce del vocabolario con conteggio pari a zero.  
Di conseguenza, la sua probabilità sarà una distribuzione uniforme pesata dal fattore $\lambda$:

$$
P(<\!UNK\!>) = \lambda(\varepsilon) \cdot \frac{1}{V}
$$

dove:
- $\varepsilon$ è la stringa vuota,
- $V$ è la dimensione del vocabolario.

#### Intuizione per Sconto e Probabilità di Continuazione  
1. **Sconto (Discounting)**:  
   Riduce i conteggi degli $n$-grammi osservati per "riservare" massa probabilistica agli eventi non osservati.  
   Questo sconto penalizzerà di meno il conteggio di parole molto frequenti (quelle di cui ci fidiamo di più) e di più il conteggio di parole poco frequenti (quelle di cui ci fidiamo di meno). 

2. **Probabilità di Continuazione**:  
   Misura quanto una parola $w_i$ è **versatile** nell'apparire in contesti diversi.  
   - Penalizza parole come "Francisco" che appaiono spesso solo in contesti specifici (es. dopo "San").  
   - Premia parole come "the" o "di" che appaiono in molti contesti.  

#### Intuizione per $\lambda(w_{i-n+1}^{i-1})$

L'interpretazione intuitiva di $\lambda(w_{i-n+1}^{i-1})$ si articola in tre componenti principali:

1. **Sconto Normalizzato $\frac{d}{c(w_{i-n+1}^{i-1})}$:**  
   Questo termine rappresenta la frazione della probabilità totale associata al contesto $w_{i-n+1}^{i-1}$ che viene "tolta" per ciascun n-gramma osservato in quel contesto. Il parametro $d$ è lo sconto fisso applicato, e dividendolo per $c(w_{i-n+1}^{i-1})$ (ovvero il numero totale di occorrenze del contesto $w_{i-n+1}^{i-1}$) si ottiene il **peso** o **quota** di probabilità ridotta per ogni occorrenza.

2. **Numero di n-grammi Scontati $|\{w_i : c(w_{i-n+1}^{i}) > 0\}|$:**  
   Questo termine conta il numero di n-grammi distinti che completano il contesto $w_{i-n+1}^{i-1}$ e che sono stati osservati almeno una volta. In altre parole, esso indica **quante volte lo sconto $d$ viene applicato** all'interno del contesto specificato, ovvero quante volte abbiamo "rimosso" una parte della probabilità dagli n-grammi osservati.

3. **Prodotto delle Due Componenti:**  
   Moltiplicando il **sconto normalizzato** per il **numero di n-grammi scontati**, si ottiene la **massa totale di probabilità** che è stata sottratta dagli eventi osservati nel contesto $w_{i-n+1}^{i-1}$. Questa massa di probabilità viene poi utilizzata nel meccanismo di backoff (o interpolazione) per garantire che la somma complessiva delle probabilità, comprese quelle dei n-grammi non osservati, risulti pari a 1.

In sintesi, **$\lambda(w_{i-n+1}^{i-1})$** raccoglie il "peso" persa a causa dello sconto applicato a tutti gli n-grammi che seguono il contesto $w_{i-n+1}^{i-1}$, e tale massa viene poi ridistribuita al modello inferiore. Questo meccanismo assicura una distribuzione di probabilità completa e normalizzata anche quando alcuni n-grammi non sono stati osservati durante il training.

#### Dimostrazione che $\sum P_{\text{KN}}(w_i | w_{i-n+1}^{i-1}) = 1$

Consideriamo la formula per un bigramma:

$$
P_{\text{KN}}(w_i | w_{i-1}) = \frac{\max(c(w_{i-1}, w_i) - d, 0)}{c(w_{i-1})} + \lambda(w_{i-1}) \cdot P_{\text{cont}}(w_i)
$$

dove il fattore di interpolazione è definito come

$$
\lambda(w_{i-1}) = \frac{d}{c(w_{i-1})} \cdot |\{w_i : c(w_{i-1}, w_i) > 0\}|.
$$

**Passo 1: Sommiamo $P_{\text{KN}}(w_i | w_{i-1})$ su tutti i possibili $w_i$:**

$$
\sum_{w_i} P_{\text{KN}}(w_i | w_{i-1}) = \sum_{w_i} \frac{\max(c(w_{i-1}, w_i) - d, 0)}{c(w_{i-1})} + \lambda(w_{i-1}) \sum_{w_i} P_{\text{cont}}(w_i)
$$

Sappiamo per certo che $P_{\text{cont}}(w_i)$ sia una distribuzione di probabilità valida, ovvero

$$
\sum_{w_i} P_{\text{cont}}(w_i) = 1.
$$

**Passo 2: Scomponiamo la somma per i bigrammi osservati.**

Per ogni $w_i$ tale che $c(w_{i-1}, w_i) > 0$ abbiamo:

$$
\max(c(w_{i-1}, w_i) - d, 0) = c(w_{i-1}, w_i) - d.
$$

Quindi, sommando su tutti i $w_i$ osservati otteniamo:

$$
\sum_{\{w_i: c(w_{i-1},w_i) > 0\}} \bigl[c(w_{i-1}, w_i)-d\bigr] 
= \left(\sum_{\{w_i: c(w_{i-1},w_i) > 0\}} c(w_{i-1}, w_i)\right) - d \cdot |\{w_i : c(w_{i-1}, w_i) > 0\}|.
$$

Notiamo che

$$
\sum_{\{w_i: c(w_{i-1},w_i) > 0\}} c(w_{i-1}, w_i) = c(w_{i-1}),
$$

pertanto si ha:

$$
\sum_{\{w_i: c(w_{i-1},w_i) > 0\}} \bigl[c(w_{i-1}, w_i)-d\bigr] = c(w_{i-1}) - d \cdot |\{w_i : c(w_{i-1}, w_i) > 0\}|.
$$

**Passo 3: Inseriamo il tutto nella sommatoria totale.**

Dividendo per $c(w_{i-1})$ si ottiene:

$$
\sum_{w_i} \frac{\max(c(w_{i-1},w_i)-d,0)}{c(w_{i-1})} 
= \frac{c(w_{i-1}) - d \cdot |\{w_i : c(w_{i-1}, w_i) > 0\}|}{c(w_{i-1})}.
$$

Per la parte del backoff abbiamo:

$$
\lambda(w_{i-1}) \cdot \sum_{w_i} P_{\text{cont}}(w_i) = \lambda(w_{i-1}) \cdot 1 = \lambda(w_{i-1}).
$$

Quindi, la somma totale diventa:

$$
\sum_{w_i} P_{\text{KN}}(w_i | w_{i-1}) 
= \frac{c(w_{i-1}) - d \cdot |\{w_i : c(w_{i-1}, w_i) > 0\}|}{c(w_{i-1})} + \lambda(w_{i-1}).
$$

**Passo 4: Verifica del vincolo di normalizzazione.**

Sostituendo la definizione di $\lambda(w_{i-1})$:

$$
\lambda(w_{i-1}) = \frac{d \cdot |\{w_i : c(w_{i-1}, w_i) > 0\}|}{c(w_{i-1})},
$$

si ottiene:

$$
\sum_{w_i} P_{\text{KN}}(w_i | w_{i-1}) = \frac{c(w_{i-1}) - d \cdot |\{w_i : c(w_{i-1}, w_i) > 0\}|}{c(w_{i-1})} + \frac{d \cdot |\{w_i : c(w_{i-1}, w_i) > 0\}|}{c(w_{i-1})} = \frac{c(w_{i-1})}{c(w_{i-1})} = 1.
$$

$\square$

**Conclusione per il Caso Generale (n-grammi):**

La stessa logica si estende al caso degli n-grammi tramite la formulazione ricorsiva:

$$
P_{\text{KN}}(w_i | w_{i-n+1}^{i-1}) = \frac{\max(c(w_{i-n+1}^{i}) - d,\,0)}{c(w_{i-n+1}^{i-1})} + \lambda(w_{i-n+1}^{i-1}) \cdot P_{\text{KN}}(w_i | w_{i-n+2}^{i-1}),
$$

con

$$
\lambda(w_{i-n+1}^{i-1}) = \frac{d \cdot |\{w_i : c(w_{i-n+1}^{i}) > 0\}|}{c(w_{i-n+1}^{i-1})}.
$$

**Argomentazione per Induzione:**

1. **Base dell'induzione (n = 2 – bigrammi):**  
   Abbiamo dimostrato che

   $$
   \sum_{w_i} P_{\text{KN}}(w_i | w_{i-1}) = 1.
   $$

2. **Passo induttivo:**  
   Supponiamo che per un modello di ordine $n-1$ (cioè con condizione $w_{i-n+2}^{i-1}$) la proprietà di normalizzazione sia soddisfatta:

   $$
   \sum_{w_i} P_{\text{KN}}(w_i | w_{i-n+2}^{i-1}) = 1.
   $$

   Allora, considerando la formula ricorsiva per il modello di ordine $n$:

   $$
   \sum_{w_i} P_{\text{KN}}(w_i | w_{i-n+1}^{i-1}) = \sum_{w_i} \left[ \frac{\max(c(w_{i-n+1}^{i}) - d,\,0)}{c(w_{i-n+1}^{i-1})} \right] + \lambda(w_{i-n+1}^{i-1}) \sum_{w_i} P_{\text{KN}}(w_i | w_{i-n+2}^{i-1}).
   $$

   Utilizzando l'ipotesi induttiva $\sum_{w_i} P_{\text{KN}}(w_i | w_{i-n+2}^{i-1}) = 1$ e seguendo i medesimi passaggi del caso bigramma, si ottiene:

   $$
   \sum_{w_i} P_{\text{KN}}(w_i | w_{i-n+1}^{i-1}) = \frac{c(w_{i-n+1}^{i-1}) - d \cdot |\{w_i : c(w_{i-n+1}^{i}) > 0\}|}{c(w_{i-n+1}^{i-1})} + \lambda(w_{i-n+1}^{i-1}) = 1.
   $$

Pertanto, per induzione, la proprietà di normalizzazione vale per qualsiasi ordine $n$:

$$
\sum_{w_i} P_{\text{KN}}(w_i | w_{i-n+1}^{i-1}) = 1.
$$

$\square$

#### **Variante del Kneser-Ney**  
1. **Modified Kneser-Ney**:  
   Usa **sconti differenziati** per conteggi $c = 1$, $c = 2$, e $c \geq 3$:  
   - $d_1 = 0.75$ (per $c=1$),  
   - $d_2 = 0.5$ (per $c=2$),  
   - $d_3 = 0.25$ (per $c \geq 3$).

#### **Vantaggi**  
1. **Gestione ottimale delle parole comuni**:  
   - "Francisco" avrà bassa $P_{\text{cont}}$ perché appare solo dopo "San".  
   - "the" avrà alta $P_{\text{cont}}$ perché appare in molti contesti.  

2. **Adattabilità a contesti sparsi**:  
   Usa informazioni degli $n$-grammi di ordine inferiore in modo più efficace rispetto a Good-Turing.  

3. **Performance superiori**:  
   È lo standard per modelli linguistici in task come traduzione automatica e riconoscimento vocale.  

#### **Limiti**  
1. **Complessità computazionale**:  
   Richiede il calcolo di $P_{\text{cont}}$ per tutte le parole e contesti, costoso per corpus di grandi dimensioni.  

2. **Scelta dei parametri**:  
   Il valore di $d$ e la variante (interpolated vs modified) influenzano significativamente i risultati.    

## Tabella di Confronto

| **Metodo**         | **Idee Chiave**                                                                 | **Vantaggi**                                  | **Svantaggi**                                                                 | **Casi d'Uso**                     |
|---------------------|---------------------------------------------------------------------------------|----------------------------------------------|-------------------------------------------------------------------------------|-------------------------------------|
| **Laplace (Add-One)** | Aggiunge 1 al conteggio di ogni n-gramma per evitare probabilità zero.          | Semplice da implementare.                    | Sovrastima eventi rari, inefficace per vocabolari grandi ($V$ elevato).       | Corpus piccoli, prototipazione.     |
| **Add-$k$**          | Aggiunge un conteggio frazionario $k$ (es. 0.5) invece di 1.                   | Più flessibile di Laplace.                   | Difficoltà nella scelta di $k$, varianza elevata, sconti inappropriati.       | Classificazione testi, task specifici. |
| **Good-Turing**     | Ridistribuisce massa dagli eventi frequenti a quelli rari usando $N_k$.         | Fondamento teorico solido.                   | Instabile per $N_{k+1}=0$, complessità computazionale, inefficace per $k$ alti. | Corpus medi, modelli con sparsità.  |
| **Kneser-Ney**      | Combina sconti e probabilità di continuazione per gestire contesti.             | Gestione avanzata dei contesti, stato dell'arte. | Complessità implementativa, richiede calcolo di $P_{\text{cont}}$.            | Modelli linguistici avanzati (es. NLP moderno). |

## Conclusioni  
I metodi di smoothing risolvono il problema degli n-grammi non osservati o rari, ma con compromessi tra semplicità e accuratezza:  

1. **Laplace e Add-$k$** sono adatti per **scenari semplici** (corpus piccoli o prototipi), ma diventano rapidamente inefficaci con vocabolari ampi.  
2. **Good-Turing** offre una **base teorica rigorosa** per la ridistribuzione della massa probabilistica, ma la sua complessità e instabilità lo rendono poco pratico per corpus molto grandi.  
3. **Kneser-Ney** è lo **stato dell'arte** per la modellazione linguistica, grazie alla combinazione di sconti dinamici e probabilità di continuazione, che penalizzano parole comuni in contesti specifici (es. "Francisco" dopo "San").  

**Raccomandazioni**:  
- Usare **Kneser-Ney** per task avanzati (es. riconoscimento vocale, traduzione automatica).  
- Optare per **Good-Turing** se è necessaria una ridistribuzione teorica senza troppa complessità.  
- **Laplace/Add-$k$** sono utili solo in fase esplorativa o con dati limitati.  

In sintesi, la scelta dipende dal trade-off tra risorse computazionali, dimensione del corpus e necessità di precisione. Per applicazioni reali, Kneser-Ney rimane il gold standard nonostante la sua complessità.  
