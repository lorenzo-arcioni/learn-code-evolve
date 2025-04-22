
# **Il Moto Browniano: Una Descrizione Matematica e Intuitiva**

## **1. Introduzione al Modello Matematico**

Immaginiamo una particella immersa in un fluido, soggetta a urti casuali dalle molecole circostanti. Se proviamo a modellare questo movimento in modo matematico, possiamo iniziare con un semplice **modello discreto** di random walk e poi passare al **limite continuo**, ottenendo il moto Browniano.

---

## **2. Random Walk: Un Modello Discreto**

Consideriamo una particella che si muove su una linea retta (unidimensionale). Definiamo il suo movimento in base alle seguenti regole:

- La particella parte dall'origine:  
  $$
  X_0 = 0
  $$
- A intervalli di tempo $\Delta t$, la particella si sposta di una quantità fissa $\Delta x$ a destra o a sinistra con probabilità uguale a $\frac{1}{2}$.
- Gli spostamenti sono indipendenti l'uno dall'altro.

Formalmente, definiamo una sequenza di variabili casuali $B_k$ con:
$$
B_k =
\begin{cases} 
+1, & \text{con probabilità } \frac{1}{2}, \\
-1, & \text{con probabilità } \frac{1}{2}.
\end{cases}
$$
Dopo $N$ passi, la posizione della particella è data da:
$$
X_N = \sum_{k=1}^{N} B_k \cdot \Delta x.
$$

### **2.1. Proprietà della Random Walk**
- **Valore atteso**:  
  $$
  \mathbb{E}[X_N] = 0
  $$
  perché, in media, la particella si sposta tanto a destra quanto a sinistra.
- **Varianza**:  
  $$
  \mathbb{V}[X_N] = N (\Delta x)^2.
  $$
  Questo indica che, man mano che aumentiamo $N$, la dispersione della posizione cresce.

### **2.2. Esempio Pratico**
Supponiamo di avere $N = 4$ passi e $\Delta x = 1$. Alcuni possibili percorsi della particella potrebbero essere:
- $(+1, +1, -1, +1)$ → $X_4 = 2$
- $(+1, -1, -1, +1)$ → $X_4 = 0$
- $(-1, -1, +1, -1)$ → $X_4 = -2$

Più aumenta $N$, più la distribuzione delle posizioni finali assomiglia a una **distribuzione normale**. 

Possiamo verificarlo formalmente usando il **Teorema del Limite Centrale (TLC)**. Il **Teorema del Limite Centrale (TLC)** è uno dei risultati più importanti nella teoria della probabilità. Esso afferma che, se sommiamo un grande numero di variabili casuali indipendenti e identicamente distribuite (iid), la loro somma, opportunamente normalizzata, converge in distribuzione a una variabile casuale con distribuzione normale (gaussiana), indipendentemente dalla distribuzione originale delle variabili.

Nel contesto della **random walk** (passeggiata casuale), consideriamo una particella che si muove in una dimensione, compiendo passi di lunghezza fissa $\Delta x$ in direzione casuale (ad esempio, a sinistra o a destra con uguale probabilità). La posizione della particella dopo $N$ passi può essere espressa come:

$$
X_N = \sum_{k=1}^{N} B_k \cdot \Delta x,
$$

dove $B_k$ è una variabile casuale che rappresenta il risultato del $k$-esimo passo. Assumiamo che $B_k$ possa assumere valori $\pm 1$ con probabilità $1/2$, rendendo $B_k$ una variabile casuale di Bernoulli con media $\mathbb{E}[B_k] = 0$ e varianza $\mathbb{V}[B_k] = 1$.

---

#### 1. Calcolo del valore atteso $\mathbb{E}[X_N]$

Il valore atteso della posizione $X_N$ è dato da:

$$
\mathbb{E}[X_N] = \mathbb{E}\left[\sum_{k=1}^{N} B_k \cdot \Delta x\right].
$$

Poiché il valore atteso è lineare, possiamo portare la somma fuori dall'operatore di valore atteso:

$$
\mathbb{E}[X_N] = \sum_{k=1}^{N} \mathbb{E}[B_k] \cdot \Delta x.
$$

Sapendo che $\mathbb{E}[B_k] = 0$ per ogni $k$, otteniamo:

$$
\mathbb{E}[X_N] = \sum_{k=1}^{N} 0 \cdot \Delta x = 0.
$$

Quindi, il valore atteso della posizione dopo $N$ passi è **zero**.

---

#### 2. Calcolo della varianza $\mathbb{V}[X_N]$

La varianza della posizione $X_N$ è data da:

$$
\mathbb{V}[X_N] = \mathbb{V}\left[\sum_{k=1}^{N} B_k \cdot \Delta x\right].
$$

Poiché le variabili $B_k$ sono indipendenti, la varianza della somma è uguale alla somma delle varianze:

$$
\mathbb{V}[X_N] = \sum_{k=1}^{N} \mathbb{V}[B_k] \cdot (\Delta x)^2.
$$

Sapendo che $\mathbb{V}[B_k] = 1$ per ogni $k$, otteniamo:

$$
\mathbb{V}[X_N] = \sum_{k=1}^{N} 1 \cdot (\Delta x)^2 = N (\Delta x)^2.
$$

Quindi, la varianza della posizione dopo $N$ passi è $N (\Delta x)^2$.

---

#### 3. Standardizzazione della variabile $X_N$

Per applicare il Teorema del Limite Centrale, definiamo una variabile standardizzata $Z_N$ come:

$$
Z_N = \frac{X_N}{\sqrt{N} \Delta x}.
$$

Questa standardizzazione ha due effetti:
1. **Valore atteso**: Il valore atteso di $Z_N$ è:
   $$
   \mathbb{E}[Z_N] = \frac{\mathbb{E}[X_N]}{\sqrt{N} \Delta x} = \frac{0}{\sqrt{N} \Delta x} = 0.
   $$
2. **Varianza**: La varianza di $Z_N$ è:
   $$
   \mathbb{V}[Z_N] = \mathbb{V}\left[\frac{X_N}{\sqrt{N} (\Delta x)}\right] = \frac{\mathbb{V}[X_N]}{N (\Delta x)^2} = \frac{N (\Delta x)^2}{N (\Delta x)^2} = 1.
   $$

Quindi, $Z_N$ ha valore atteso **0** e varianza **1**, indipendentemente da $N$.

---

#### 4. Applicazione del Teorema del Limite Centrale

Secondo il Teorema del Limite Centrale, quando $N$ (il numero di passi) tende all'infinito, la distribuzione della variabile standardizzata $Z_N$ converge in distribuzione a una variabile casuale con distribuzione normale standard $\mathcal{N}(0,1)$. In formule:

$$
Z_N \xrightarrow{d} \mathcal{N}(0,1),
$$

dove $\xrightarrow{d}$ indica la convergenza in distribuzione.

---

#### 5. Interpretazione e collegamento al moto Browniano

Questo risultato è fondamentale per il passaggio dalla **random walk discreta** al **moto Browniano**, che è un processo stocastico continuo. Nel limite in cui:
- Il numero di passi $N$ diventa molto grande,
- La lunghezza di ciascun passo $\Delta x$ diventa molto piccola,
- Il tempo tra un passo e l'altro tende a zero,

la random walk converge a un **processo di Wiener**, che è la descrizione matematica del moto Browniano. Questo risultato è alla base della modellizzazione di molti fenomeni fisici (come il movimento delle particelle in un fluido) e finanziari (come l'andamento dei prezzi delle azioni).

---

#### Riassunto dei passaggi:
1. La posizione $X_N$ è la somma di $N$ variabili casuali $B_k \cdot \Delta x$.
2. Il valore atteso di $X_N$ è $0$ e la sua varianza è $N (\Delta x)^2$.
3. Standardizzando $X_N$, otteniamo $Z_N = \frac{X_N}{\sqrt{N} \Delta x}$, con $\mathbb{E}[Z_N] = 0$ e $\mathbb{V}[Z_N] = 1$.
4. Per $N \to \infty$, $Z_N$ converge in distribuzione a una normale standard $\mathcal{N}(0,1)$.
5. Questo risultato collega la random walk discreta al moto Browniano continuo.
---

## **3. Limite Continuo: Il Moto Browniano**

Se riduciamo la dimensione dei passi $\Delta x$ e il tempo tra i passi $\Delta t$, mantenendo costante il rapporto:
$$
\frac{(\Delta x)^2}{\Delta t} = \sigma^2,
$$
otteniamo nel limite un processo continuo chiamato **moto Browniano**, indicato con $B_t$.

Il moto Browniano è quindi il **limite** di una random walk opportunamente scalata.

### **3.1. Proprietà del Moto Browniano**
Il processo $B_t$ soddisfa le seguenti condizioni:
1. **Incrementi indipendenti**: gli spostamenti $B_t - B_s$ sono indipendenti per ogni $0 \leq s < t$.
2. **Incrementi normali**: la differenza tra due istanti segue una distribuzione normale:
   $$
   B_t - B_s \sim \mathcal{N}(0, t - s).
   $$
3. **Traiettorie continue**: il percorso $t \mapsto B_t$ è una funzione continua in $t$.
4. **Varianza lineare nel tempo**:  
   $$
   \mathbb{V}[B_t] = t.
   $$

### **3.2. Esempio Pratico**
Supponiamo che una particella inizi da $B_0 = 0$ e il tempo sia misurato in secondi. Dopo 5 secondi, la posizione $B_5$ segue una distribuzione normale con media 0 e varianza 5, ovvero:
$$
B_5 \sim \mathcal{N}(0,5).
$$
Ciò significa che, in media, la particella rimane vicino a 0, ma ha una deviazione standard di $\sqrt{5} \approx 2.23$, quindi la probabilità che si trovi tra -4 e +4 è molto alta.

---

## **4. Distribuzione delle Posizioni nel Tempo**

Dal punto di vista probabilistico, la distribuzione della posizione di una particella che segue un moto Browniano è data dalla **densità della normale**:
$$
p(x,t) = \frac{1}{\sqrt{2\pi t}} e^{-x^2 / (2t)}.
$$
Questa equazione mostra che la probabilità di trovare la particella in $x$ diminuisce esponenzialmente con $x^2$, quindi è più probabile trovare la particella vicino all'origine.

### **4.1. Esempio di Simulazione**
Se generiamo più traiettorie di $B_t$ con una simulazione numerica, vedremo che tutte iniziano da 0, ma si diffondono nel tempo con una forma simile a una campana.

---

## **5. Relazione con l'Equazione del Calore**

Il moto Browniano è strettamente legato all'**equazione del calore**, che descrive la diffusione del calore in un solido. La funzione di densità $p(x,t)$ soddisfa:
$$
\frac{\partial p}{\partial t} = \frac{1}{2} \frac{\partial^2 p}{\partial x^2}.
$$
Questo mostra che il moto di una particella Browniana è analogo alla diffusione del calore in un materiale.

---

## **6. Conclusioni**

Il moto Browniano è un modello matematico fondamentale per descrivere movimenti casuali continui. La sua costruzione parte da una semplice random walk e porta, nel limite, a un processo con proprietà precise e ben definite.  

Le sue applicazioni spaziano dalla **fisica** (diffusione molecolare) alla **finanza** (modelli di prezzo delle azioni), fino alla **biologia** (movimenti cellulari). 🚀
