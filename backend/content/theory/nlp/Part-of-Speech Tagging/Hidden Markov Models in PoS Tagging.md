# Hidden Markov Models in PoS Tagging

A partire dagli anni '70, il **PoS tagging** ha iniziato a essere affrontato anche con **metodi probabilistici**, cioè **stocastici**.

L'idea alla base è semplice: usare i **modelli di Markov nascosti (HMM)** per selezionare la **sequenza di etichette grammaticale più probabile** data una sequenza di parole.

Formalmente, il problema può essere formulato come segue:

$$
\hat{t}_1^n = \underset{t_1^n \in \text{Tagset}^n}{\arg\max} \ P(t_1^n \mid w_1^n)
$$

In altre parole, cerchiamo la sequenza di tag $t_1^n$ che **massimizza la probabilità condizionata** dato l'input $w_1^n$, ovvero la sequenza di parole osservate.

## Teorema di Bayes

Per calcolare questa probabilità, possiamo ricorrere al **teorema di Bayes**:

$$
P(x \mid y) = \frac{P(y \mid x) \cdot P(x)}{P(y)}
$$

Applicandolo al nostro problema:

$$
P(t_1^n \mid w_1^n) = \frac{P(w_1^n \mid t_1^n) \cdot P(t_1^n)}{P(w_1^n)}
$$

Poiché $P(w_1^n)$ è costante rispetto ai tag $t_1^n$, possiamo ignorarlo nel calcolo dell'$\arg\max$. Otteniamo quindi:

$$
\hat{t}_1^n = \underset{t_1^n \in \text{Tagset}^n}{\arg\max} \ \frac{P(w_1^n \mid t_1^n) \cdot P(t_1^n)}{P(w_1^n)} \approx \underset{t_1^n \in \text{Tagset}^n}{\arg\max} P(w_1^n \mid t_1^n) \cdot P(t_1^n)
$$

Dove:
- $P(w_1^n \mid t_1^n)$ è la **verosimiglianza** (*likelihood*): probabilità di osservare le parole date le etichette.
- $P(t_1^n)$ è la **probabilità a priori** (*prior*) delle etichette grammaticali.

In pratica, cerchiamo la sequenza di PoS tag che **spiega meglio le parole osservate**, tenendo anche conto di quanto sia **probabile a priori** quella sequenza di tag. Ma come calcolare queste probabilità?

## Assunzione 1: La parola dipende solo dal suo PoS tag

Per semplificare il calcolo della **verosimiglianza** $P(w_1^n \mid t_1^n)$, si fa la seguente assunzione:

> Ogni parola $w_i$ dipende solo dal suo corrispondente tag $t_i$.

Formalmente:

$$
P(w_1^n \mid t_1^n) = \prod_{i=1}^{n} P(w_i \mid t_i)
$$

Questa è un’**assunzione di indipendenza condizionata**: ci permette di calcolare la probabilità delle parole in modo **locale**, tag per tag, invece che sull'intera sequenza.

## Assunzione 2: Ogni tag dipende solo dal tag precedente

Per semplificare il calcolo della **prior** $P(t_1^n)$, si assume che ogni tag dipenda **solo dal tag precedente**:

> Questo è noto come **bigram model** o **Markov assumption di primo ordine**.

Formalmente:

$$
P(t_1^n) = \prod_{i=1}^{n} P(t_i \mid t_{i-1})
$$

Questo significa che la sequenza dei tag viene modellata come una **catena di Markov**: non consideriamo tutta la storia passata dei tag, ma solo quello immediatamente precedente.

## Combinazione delle due assunzioni

Applicando insieme le due assunzioni precedenti otteniamo:

$$
P(w_1^n \mid t_1^n) \cdot P(t_1^n) = \prod_{i=1}^{n} P(w_i \mid t_i) \cdot P(t_i \mid t_{i-1})
$$

Questo prodotto è il cuore del PoS tagging stocastico: stimiamo la **probabilità congiunta** della sequenza parole-tag usando stime locali.

## Stima delle probabilità dai corpora

Grazie a **corpora annotati** (es. Penn Treebank, Universal Dependencies), possiamo stimare le due componenti:

- **Probabilità di emissione** (likelihood):  
  $$
  P(w_i \mid t_i) = \frac{\text{conteggio}(t_i, w_i)}{\text{conteggio}(t_i)}
  $$

- **Probabilità di transizione** (prior):  
  $$
  P(t_i \mid t_{i-1}) = \frac{\text{conteggio}(t_{i-1}, t_i)}{\text{conteggio}(t_{i-1})}
  $$

Queste stime si basano sulla **frequenza relativa** osservata nei corpus PoS-annotati.

## Come trovare la sequenza di tag ottimale?

Ora abbiamo:
- le probabilità $P(w_i \mid t_i)$ → emissione
- le probabilità $P(t_i \mid t_{i-1})$ → transizione

Ma dobbiamo trovare la **sequenza di tag $\hat{t}_1^n$** che **massimizza il prodotto** di questi termini.

Questo è un problema classico di **decodifica in modelli di Markov nascosti**.

## Utilizzo degli Hidden Markov Models

Per risolvere il problema del PoS tagging — ovvero associare la sequenza di parole a una sequenza di tag grammaticale — si può modellare il processo come un **Hidden Markov Model (HMM)**.

Un HMM è un modello statistico in cui:
- Esiste una **sequenza nascosta di stati** (nel nostro caso, i **tag** grammaticali).
- Ogni stato emette un'**osservazione** (nel nostro caso, una **parola** del testo).
- Le transizioni tra stati e le emissioni sono regolate da **probabilità**.

**Formalmente**:

- $Q = q_1 q_2 \dots q_N$  **un insieme di $N$ stati**

- $A = a_{11} \dots a_{ij} \dots a_{NN}$ **una matrice di probabilità di transizione** $A$, dove ogni $a_{ij}$ rappresenta la probabilità  
  di passare dallo stato $i$ allo stato $j$, tale che $\sum_{j=1}^N a_{ij} = 1 \quad \forall i$

- $O = o_1 o_2 \dots o_T$ **una sequenza di $T$ osservazioni**, ciascuna presa da un vocabolario $V = v_1, v_2, \dots, v_V$

- $B = b_i(o_t)$ **una sequenza di probabilità di osservazione**, dette anche **probabilità di emissione**, ognuna delle quali esprime la probabilità che un'osservazione $o_t$ venga generata dallo stato $q_i$

- $\pi = \pi_1, \pi_2, \dots, \pi_N$ **una distribuzione di probabilità iniziale** sugli stati. $\pi_i$ è la probabilità che la catena di Markov inizi nello stato $i$. Alcuni stati $j$ possono avere $\pi_j = 0$,  
  cioè non possono essere stati iniziali. Inoltre, $\sum_{i=1}^n \pi_i = 1$

### Due assunzioni fondamentali di un HMM di primo ordine

1. **Assunzione di Markov**:  
   Ogni stato (tag) dipende solo dallo **stato precedente**:
   $$
   P(t_i \mid t_1^{i-1}) \approx P(t_i \mid t_{i-1})
   $$

2. **Assunzione di emissione indipendente**:  
   Ogni parola dipende solo dal **tag corrente**, non dagli altri tag o parole:
   $$
   P(w_i \mid t_1^n, w_1^{i-1}) \approx P(w_i \mid t_i)
   $$

Applicando queste due assunzioni otteniamo la formula:
$$
\hat{t}_1^n = \arg\max_{t_1^n \in Tagset^n} \prod_{i=1}^n P(w_i \mid t_i) \cdot P(t_i \mid t_{i-1})
$$

[[Hidden Markov Models|Qui]] è diposnibile una descrizione dettagliata degli HMM.

### Esempio: Jason Eisner task (2002)

Un esempio classico per spiegare gli HMM è il **"Jason Eisner task"**:

> Jason tiene un diario con il numero di gelati mangiati ogni giorno dell'estate.
> Il suo obiettivo è ricostruire, a partire da questi numeri, se ogni giorno era caldo (**H**) o freddo (**C**).

Formalmente:
- La sequenza **osservata** $O$ è il numero di gelati mangiati ogni giorno.
- La sequenza **nascosta** $Q$ è la condizione meteorologica (**H**ot o **C**old).
- Ogni giorno Jason sceglie quanti gelati mangiare **in base al meteo**.
- L’obiettivo è **inferire la sequenza di stati** che ha prodotto le osservazioni.

Questo è del tutto analogo al PoS tagging:
- Le **osservazioni** sono le parole del testo.
- Gli **stati nascosti** sono i tag grammaticali.
- L’obiettivo è inferire la **sequenza di tag più probabile** dato il testo osservato.

### Riassunto dei componenti di un HMM per il PoS tagging

| Componente | Significato NLP | Simbolo | Come si calcola |
|------------|------------------|---------|------------------|
| Stati $Q$ | Tag PoS | $t_i$ | Predefiniti nel tagset |
| Osservazioni $O$ | Parole del testo | $w_i$ | Input della frase |
| Transizione | $P(t_i \mid t_{i-1})$ | Tag → Tag | Frequenze nei corpora |
| Emissione | $P(w_i \mid t_i)$ | Tag → Parola | Frequenze nei corpora |
| Iniziale $\pi(t_1)$ | Probabilità iniziale di ogni tag | $P(t_1)$ | Conta quanti tag iniziali in corpus |

### Obiettivo finale

Data una frase (sequenza di parole), vogliamo trovare:

$$
\hat{t}_1^n = \arg\max_{t_1^n} P(w_1^n \mid t_1^n) \cdot P(t_1^n)
$$

Dove $P(w_1^n \mid t_1^n)$ e $P(t_1^n)$ sono le **verosimiglianze** e **probabilità a priori**.


### Esempio pratico


Supponiamo di avere il seguente **corpus annotato** (PoS-tagged):

```
the/DT dog/NN barks/VBZ
the/DT can/NN falls/VBZ
we/PRP can/MD win/VB
book/NN the/DT book/VB
dogs/NNS bark/VBP
cats/NNS sleep/VBP
the/DT can/MD run/VB
can/MD you/PRP run/VB
some/DT dogs/NNS bark/VBP
```

#### 1. Insieme dei tag e parole

- **Tag (Q)** = { `DT`, `PRP`, `NN`, `NNS`, `MD`, `VBZ`, `VBP`, `VB` }  
- **Parole (O)** = { the, some, we, you, dog, dogs, cat(s), can, book, bark, barks, falls, sleep, run, win }

#### 2. Probabilità di transizione

| Transizione           | Conteggio | Probabilità |
|-----------------------|-----------|-------------|
| ⟨s⟩ → DT              | 4         | 4/9 ≃ 0.44  |
| ⟨s⟩ → PRP             | 1         | 1/9 ≃ 0.11  |
| ⟨s⟩ → NN              | 1         | 1/9 ≃ 0.11  |
| ⟨s⟩ → NNS             | 2         | 2/9 ≃ 0.22  |
| ⟨s⟩ → MD              | 1         | 1/9 ≃ 0.11  |
| DT → NN               | 2         | 2/5 = 0.40  |
| DT → MD               | 1         | 1/5 = 0.20  |
| DT → NNS              | 1         | 1/5 = 0.20  |
| DT → VB               | 1         | 1/5 = 0.20  |
| PRP → MD              | 1         | 1/2 = 0.50  |
| PRP → VB              | 1         | 1/2 = 0.50  |
| NN → VBZ              | 2         | 2/3 ≃ 0.67  |
| NN → DT               | 1         | 1/3 ≃ 0.33  |
| NNS → VBP             | 2         | 3/3 = 1.00  |
| MD → VB               | 2         | 2/3 ≃ 0.67  |
| MD → PRP              | 1         | 1/3 ≃ 0.33  |

#### 3. Probabilità di emissione

**DT** (5 occorrenze)

| Parola | Conteggio | Probabilità |
|--------|-----------|-------------|
| the    | 4         | 4/5 = 0.80  |
| some   | 1         | 1/5 = 0.20  |

**PRP** (2 occorrenze)

| Parola | Conteggio | Probabilità |
|--------|-----------|-------------|
| we     | 1         | 1/2 = 0.50  |
| you    | 1         | 1/2 = 0.50  |

**NN** (4 occorrenze)

| Parola | Conteggio | Probabilità |
|--------|-----------|-------------|
| dog    | 1         | 1/3 ≈ 0.333 |
| can    | 1         | 1/3 ≈ 0.333 |
| book   | 1         | 1/3 ≈ 0.333 |

**NNS** (3 occorrenze)

| Parola | Conteggio | Probabilità |
|--------|-----------|-------------|
| dogs   | 2         | 2/3 ≃ 0.67  |
| cats   | 1         | 1/3 ≃ 0.33  |

**MD** (3 occorrenze)

| Parola | Conteggio | Probabilità |
|--------|-----------|-------------|
| can    | 3         | 3/3 = 1.00  |

**VBZ** (2 occorrenze)

| Parola | Conteggio | Probabilità |
|--------|-----------|-------------|
| barks  | 1         | 1/2 = 0.50  |
| falls  | 1         | 1/2 = 0.50  |

**VBP** (2 occorrenze)

| Parola | Conteggio | Probabilità |
|--------|-----------|-------------|
| bark   | 2         | 2/3 ≈ 0.667 |
| sleep  | 1         | 1/3 ≈ 0.333 |

**VB** (4 occorrenze)

| Parola | Conteggio | Probabilità |
|--------|-----------|-------------|
| win    | 1         | 1/4 = 0.25  |
| book   | 1         | 1/4 = 0.25  |
| run    | 2         | 2/4 = 0.50  |

#### 4. Rappresentazione TikZ del modello HMM

<img src="/static/images/tikz/3bfdc9c4c841833e4ad94f4100c0c1d9.svg" style="width: 100%; height: auto; max-height: 600px;" class="tikz-svg" />

#### Conclusione

Questo è un semplice esempio pratico che mostra come costruire un HMM da un corpus annotato, calcolare tutte le probabilità, e disegnare il grafo corrispondente. Nella realtà si lavora su tagset e vocabolari molto più grandi, ma il concetto è lo stesso.

## PoS Decoding

Nel contesto dei modelli **HMM**, il **decoding** è il processo per determinare la sequenza più probabile di stati nascosti (in questo caso, i PoS tag) dati una sequenza osservata di parole.

<br>

> **Decoding**: Dato in input un HMM $\lambda = (A, B)$ e una sequenza di osservazioni $O = o_1, o_2, \dots, o_T$, il compito è trovare la sequenza di stati $Q = q_1 q_2 q_3 \dots q_T$ più probabile.

Nel caso del **PoS tagging**, le **osservazioni** corrispondono alle parole, mentre gli **stati** rappresentano i corrispondenti PoS tag. L'obiettivo è quindi assegnare ad ogni parola il PoS tag più plausibile secondo il modello HMM.

### Algoritmo di Viterbi

Il **decoding** viene eseguito tramite l'**algoritmo di Viterbi**, che trova il percorso di stati più probabile (la sequenza di tag PoS più plausibile) che ha generato la sequenza osservata.

L'algoritmo lavora in tre fasi:

- **Inizializzazione**: calcola la probabilità iniziale per ciascuno stato, moltiplicando la probabilità iniziale $\pi_s$ per la probabilità di emissione della prima osservazione.
  
- **Ricorsione**: per ogni parola nella sequenza (dalla seconda in poi), si aggiorna la matrice delle probabilità di percorso considerando il massimo tra tutti i possibili stati precedenti.

- **Terminazione**: si seleziona il percorso con la probabilità totale più alta.

> Output: `bestpath`, la sequenza più probabile di stati (PoS tag), e `bestpathprob`, la sua probabilità.

$$
\begin{aligned}
\textbf{VITERBI}(O = o_1, o_2, \dots, o_T; \lambda = (A, B)) &\Rightarrow \text{best-path}, \text{path-prob} \\
\\
\textbf{Inizializzazione:} \quad &\text{crea una matrice } \textit{viterbi}[N, T]\\
\quad &\text{per ogni stato } s = 1 \dots N \\
&\quad \textit{viterbi}[s, 1] \leftarrow \pi_s \cdot b_s(o_1) \\
&\quad \textit{backpointer}[s, 1] \leftarrow 0 \\
\\
\textbf{Ricorsione:} \quad &\text{per ogni } t = 2 \dots T \\
&\quad \text{per ogni stato } s = 1 \dots N \\
&\quad \quad \textit{viterbi}[s, t] \leftarrow \max_{s'} \left( \textit{viterbi}[s', t-1] \cdot a_{s', s} \cdot b_s(o_t) \right) \\
&\quad \quad \textit{backpointer}[s, t] \leftarrow \mathop{\arg\max}\limits_{s'} \left( \textit{viterbi}[s', t-1] \cdot a_{s', s} \cdot b_s(o_t) \right) \\
\\
\textbf{Terminazione:} \quad &\text{bestpathprob} \leftarrow \max_{s=1}^N \left( \textit{viterbi}[s, T] \right) \\
&\text{bestpathpointer} \leftarrow \mathop{\arg\max}\limits_{s=1}^{N} \left( \textit{viterbi}[s, T] \right) \\
&\text{Ricostruzione del percorso usando } \textit{backpointer} \\
\end{aligned}
$$

**Spiegazione Intuitiva**

L'algoritmo di Viterbi si basa su un principio semplice ma potente: invece di considerare **tutti** i possibili percorsi attraverso la rete di stati (cosa computazionalmente proibitiva), calcola **ricorsivamente** il percorso più probabile che porta a ciascuno stato in ogni istante di tempo. Così facendo, sfrutta il principio di **ottimalità** della programmazione dinamica.

Ecco l'idea chiave:

- Se vogliamo sapere qual è la sequenza di stati più probabile che ha generato una sequenza di osservazioni, possiamo costruirla passo dopo passo, **tenendo traccia solo dei percorsi migliori** verso ciascuno stato.
- In ogni momento, per uno stato corrente $s$, si calcola la **probabilità massima di arrivare lì** da uno qualsiasi degli stati precedenti $s'$, **moltiplicando**:
  1. la probabilità del miglior percorso fino a $s'$ al tempo $t-1$
  2. la probabilità di transizione da $s'$ a $s$ ($a_{s', s}$)
  3. la probabilità di emissione dell'osservazione corrente da $s$ ($b_s(o_t)$)

Questo approccio si basa su un'importante assunzione del modello di Markov (HMM):

- La **probabilità di uno stato** dipende **solo** dallo stato precedente (Markoviano)
- L'**osservazione** dipende **solo** dallo stato attuale

**Perché funziona?**  
Perché grazie alla struttura a stati e alle probabilità condizionate dell’HMM, possiamo decomporre un problema complesso (trovare il percorso globale ottimo) in tanti sottoproblemi più semplici (trovare il miglior percorso fino a un certo stato in un certo istante), e riutilizzare le soluzioni ai sottoproblemi precedenti. Questo è esattamente ciò che fa la programmazione dinamica.

Infine, una volta costruita la matrice `viterbi`, usiamo `backpointer` per ricostruire **all’indietro** la sequenza ottimale degli stati, partendo dallo stato finale con la massima probabilità.

In sintesi:

- Non esplora tutti i percorsi possibili.
- Sfrutta solo i percorsi migliori a ogni passo.
- È efficiente (tempo lineare nella lunghezza della sequenza).
- È esatto (garantisce il percorso più probabile).

### Applicazione dell'Algoritmo di Viterbi per la sequenza "we can run"

Questo documento illustra passo dopo passo l'applicazione dell'algoritmo di Viterbi per trovare la sequenza di tag POS (Part-Of-Speech) più probabile per la frase "we can run". 

**Parametri di Input**
- **Sequenza di osservazioni**:  
  $$O = (o_1, o_2, o_3) = (\text{we},\, \text{can},\, \text{run})$$  
  Dove $T = 3$ è la lunghezza della sequenza.

- **Insieme degli stati (tag POS)**:  
  $$Q = \{\text{DT}, \text{PRP}, \text{NN}, \text{NNS}, \text{MD}, \text{VBZ}, \text{VBP}, \text{VB}\}$$  
  Alcuni stati (VBZ, VBP, VB) hanno probabilità iniziale $\pi_s = 0$.

- **Parametri**:
  - $\pi_s$: Probabilità iniziali degli stati.
  - $A = [a]_{i,j}$: Matrice di transizione tra stati.
  - $B = b_i(o_t)$: Matrice di emissione (probabilità che uno stato $i$ emetta una parola $o_t$).

**1. Inizializzazione ($t=1$)**

Calcoliamo le probabilità $v[s,1]$ per tutti gli stati al primo passo temporale ($t=1$), usando la formula:  
$$v[s,1] = \pi_s \cdot b_s(\text{we})$$

**Spiegazione**:
- $v[s,1]$: Probabilità del percorso più probabile che termina nello stato $s$ al tempo $t=1$.
- Solo gli stati con $\pi_s > 0$ **e** $b_s(\text{we}) > 0$ contribuiscono.  

| Stato $s$ | $\pi_s$      | $b_s(\text{we})$ | $v[s,1]$          | Note                                  |
|-------------|----------------|---------------------|---------------------|---------------------------------------|
| DT          | $4/9 \approx 0.444$ | 0                  | $0$              | Emissione nulla per "we"              |
| PRP     | $1/9 \approx 0.111$ | $0.50$            | $\frac{1}{18} \approx 0.0556$ | Unico stato con probabilità non nulla |
| NN          | $1/9$        | 0                  | $0$              | Emissione nulla                      |
| NNS         | $2/9$        | 0                  | $0$              | Emissione nulla                      |
| MD          | $1/9$        | 0                  | $0$              | Emissione nulla                      |
| VBZ         | $0$              | $0$                  | $0$              | Probabilità iniziale nulla           |
| VBP         | $0$              | $0$                  | $0$              | Probabilità iniziale nulla           |
| VB          | $0$              | $0$                  | $0$              | Probabilità iniziale nulla           |

**Chiarimenti**:
- Lo stato PRP è l'unico attivo a $t=1$ perché ha sia $\pi_s > 0$ che $b_s(\text{we}) > 0$.
- I valori di $\pi_s$ per VBZ, VBP, VB sono zero (non presenti nel training data iniziale).

### 2. Fase Ricorsiva

#### Passo $t=2$ (osservazione: "can")

**Emissioni rilevanti**:  
- $b_{\text{NN}}(\text{can}) = 0.25$  
- $b_{\text{MD}}(\text{can}) = 1.00$  

Calcoliamo $v[s,2]$ solo per NN e MD (unici stati con emissione non nulla):

1. **Per lo stato NN**:  
   $$v[\text{NN},2] = \max_{s'} \left( v[s',1] \cdot a_{s',\text{NN}} \cdot 0.25 \right)$$  
   - $s'$ può essere solo PRP (unico stato con $v[s',1] > 0$).  
   - $a_{\text{PRP},\text{NN}} = 0$ (transizione PRP→NN non consentita).  
   - Risultato: $v[\text{NN},2] = 0.0556 \cdot 0 \cdot 0.25 = 0$.

2. **Per lo stato MD**:  
   $$v[\text{MD},2] = \max_{s'} \left( v[s',1] \cdot a_{s',\text{MD}} \cdot 1.00 \right)$$  
   - $a_{\text{PRP},\text{MD}} = 0.5$ (transizione PRP→MD consentita).  
   - Risultato: $v[\text{MD},2] = 0.0556 \cdot 0.5 \cdot 1 = 0.0278$.  
   - Backpointer: $bp[\text{MD},2] = \text{PRP}$ (stato precedente ottimale).

| Stato $s$ | $v[s,2]$       | $bp[s, 2]$   | Note                          |
|-------------|------------------|------|-------------------------------|
| MD          | $\frac{1}{36} \approx 0.0278$ | PRP  | Unico stato attivo a $t=2$ |
| NN          | $0$            | —    | Probabilità nulla            |
| Altri       | $0$            | —    | Emissione nulla              |

#### Passo $t=3$ (osservazione: "run")

**Emissioni rilevanti**:  
- $b_{\text{VB}}(\text{run}) = 0.50$ (solo VB emette "run").  

Calcoliamo $v[\text{VB},3]$:  
$$v[\text{VB},3] = \max_{s'} \left( v[s',2] \cdot a_{s',\text{VB}} \cdot 0.50 \right)$$  

- $s'$ può essere solo MD (unico stato con $v[s',2] > 0$).  
- $a_{\text{MD},\text{VB}} = \frac{2}{3}$ (transizione MD→VB consentita).  
- Risultato:  
  $$v[\text{VB},3] = 0.0278 \cdot \frac{2}{3} \cdot 0.5 = \frac{1}{108} \approx 0.00926$$  
- Backpointer: $bp[\text{VB},3] = \text{MD}$.

| Stato $s$ | $v[s,3]$         | $bp[s, 3]$   | Note                          |
|-------------|--------------------|------|-------------------------------|
| VB          | $\frac{1}{108} \approx 0.00926$ | MD  | Unico stato attivo a $t=3$ |
| Altri       | $0$              | —    | Emissione nulla              |

Alla fine, abbiamo la tabella di valori ottimali:

| Stato   | $o_1$="we" (t=1)      | $o_2$="can" (t=2)       | $o_3$="run" (t=3)        |
|---------|-----------------------|-------------------------|---------------------------|
| DT      | $0$                   | $0$                     | $0$                       |
| PRP     | $\frac{1}{18} \approx 0.0556$ | $0$                     | $0$                       |
| NN      | $0$                   | $0$                     | $0$                       |
| NNS     | $0$                   | $0$                     | $0$                       |
| MD      | $0$                   | $\frac{1}{36} \approx 0.0278$ | $0$                       |
| VBZ     | $0$                   | $0$                     | $0$                       |
| VBP     | $0$                   | $0$                     | $0$                       |
| VB      | $0$                   | $0$                     | $\frac{1}{108} \approx 0.00926$ |


e la tabella di backpointers:

| Stato   | $o_1$="we" (t=1) | $o_2$="can" (t=2) | $o_3$="run" (t=3) |
|---------|-------------------|-------------------|-------------------|
| DT      | $0$              | —                 | —                 |
| PRP     | $0$              | —                 | —                 |
| NN      | $0$              | —                 | —                 |
| NNS     | $0$              | —                 | —                 |
| MD      | $0$              | **PRP**           | —                 |
| VBZ     | $0$              | —                 | —                 |
| VBP     | $0$              | —                 | —                 |
| VB      | $0$              | —                 | **MD**            |

#### 3. Terminazione e Ricostruzione del Percorso

1. **Terminazione**:  
   - Troviamo lo stato finale ottimale:  
     $$\text{bestpathprob} = \max_{s} v[s,T] = \max_{s} v[s,3] = v[\text{VB},3] \approx 0.00926$$  
   - Stato finale: $s^* = \text{VB}$.

2. **Ricostruzione all'indietro** (backtracking):  
   - $\hat{s}_3 = \text{VB}$  
   - $\hat{s}_2 = bp[\text{VB},3] = \text{MD}$  
   - $\hat{s}_1 = bp[\text{MD},2] = \text{PRP}$  

**Sequenza ottimale**:  
$$(\text{PRP},\, \text{MD},\, \text{VB}) \quad \text{con probabilità } \approx 0.926\%$$  

**Interpretazione linguistica**:  
- **PRP**: Pronome personale ("we").  
- **MD**: Verbo modale ("can").  
- **VB**: Verbo base ("run").

## Conclusione: HMM e Viterbi nel PoS Tagging

### 🔍 Punti Chiave
1. **Modellazione Contestuale**: Gli HMM catturano le dipendenze sequenziali tra i tag attraverso le probabilità di transizione  
2. **Efficienza Computazionale**: L'algoritmo di Viterbi riduce la complessità da esponenziale a lineare grazie alla programmazione dinamica  
3. **Addestramento Data-Driven**: Le probabilità sono stimate direttamente da corpora annotati, garantendo adattabilità a diversi domini linguistici  

### 🛑 Limiti Pratici
- **Sparsità dei Dati**: Transizioni/emissioni non osservate nei dati di training ricevono probabilità zero (problema dello smoothing)  
- **Contesto Limitato**: L'assunzione markoviana di primo ordine ignora dipendenze a lungo raggio  
- **Ambiguity Resolution**: Difficoltà con parole polisemiche che richiederebbero contesto semantico  

#### 💡 Soluzioni Ibride Moderne
1. **Integrazione con Reti Neurali**  
   - Usare HMM per la struttura sequenziale + Embedding neurali per rappresentazioni contestuali  
   - Esempio: **BiLSTM-CRF** combinano la potenza delle reti ricorrenti con modelli grafici  

2. **Transformer-Based Taggers**  
   - Modelli come BERT sfruttano l'attenzione globale per catturare dipendenze complesse  
   - Accuracy >98% sul Penn Treebank contro il 95-97% degli HMM classici  

3. **Active Learning**  
   - Ridurre la dipendenza da grandi corpora annotati attraverso annotazioni mirate  
   - Particolarmente utile per lingue low-resource o domini specialistici  

#### 📚 Riferimenti

- [Penn Treebank](https://www.ling.upenn.edu/courses/Fall_2003/ling001/penn_treebank_pos.html)
- [Jurafsky and Martin - Speech and Language Processing](https://web.stanford.edu/~jurafsky/slp3/)
