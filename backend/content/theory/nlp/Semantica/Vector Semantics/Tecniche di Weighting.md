# 🎯 Tecniche di Pesatura in NLP

## Frequencies Are Not Enough!

In Natural Language Processing (NLP), contare semplicemente la frequenza di co-occorrenza delle parole non è sufficiente per ottenere rappresentazioni semanticamente significative.  
Infatti, parole ad alta frequenza come articoli ("the", "a"), pronomi ("it", "he") o preposizioni ("in", "on") possono comparire frequentemente accanto a molte parole senza apportare reale informazione semantica.

➡️ **Esempi**:
- ✔️ *Buona co-occorrenza*: la parola “sugar” appare frequentemente vicino ad “apricot” → relazione semantica plausibile.
- ❌ *Cattiva co-occorrenza*: parole funzionali come “it” o “the” appaiono ovunque → **rumore** semantico.

🔎 **Conclusione**: **Serve una tecnica di pesatura** che vada oltre il semplice conteggio delle occorrenze per **valorizzare** le co-occorrenze semantiche significative e **penalizzare** quelle banali.

## 📊 TF-IDF (Term Frequency - Inverse Document Frequency)

Una tecnica robusta e ampiamente utilizzata per la pesatura delle parole nei documenti è **TF-IDF**, proposta da Salton e Buckley (1988).

**Idea di fondo**:  
- Premiare le parole **specifiche** di un documento.  
- Penalizzare le parole **comuni** a tutti i documenti.

### Definizione

TF-IDF è il **prodotto** di due componenti:

1. **Term Frequency (tf)**:  
   - Misura quanto frequentemente una parola $t$ appare in un documento $d$.
   - Spesso trasformato usando il logaritmo per attenuare l'effetto delle parole molto frequenti.
   - Formula:  
     $$
     tf(t,d) = \text{frequenza di } t \text{ in } d = \begin{cases}
     1+ \log_{10} count(t, d) & \text{se } count(t, d) > 0, \\
     0 & \text{altrimenti}
     \end{cases}
     $$
   
2. **Inverse Document Frequency (idf)**:  
   - Misura l’importanza della parola in tutto il corpus.
   - Penalizza le parole comuni in molti documenti.
   - Formula:  
     $$
     idf(t) = \log \left( \frac{N}{df(t)} \right)
     $$
     dove $N$ è il numero totale di documenti e $df(t)$ è il numero di documenti contenenti il termine $t$.

### Interpretazione

- Se una parola appare in **molti documenti**, il suo IDF è **basso** → **poco informativa**.
- Se una parola appare in **pochi documenti**, il suo IDF è **alto** → **molto informativa**.

📈 **TF-IDF finale**:
$$
tf\text{-}idf(t,d) = tf(t,d) \cdot idf(t) = w_{t, d}
$$

I valori di $tf$ sono calcolati per ogni coppia di parola e documento, mentre $idf$ viene calcolato una sola volta per ogni parola nel corpus. Il valore $idf$ non dipende dal documento specifico, quindi si può calcolare una volta sola per ogni parola nel corpus.

## 📝 Esempio di Calcolo TF-IDF

Corpus:
- d1: “Frodo accidentally stabbed Sam and then some orcs”
- d2: “Frodo was stabbing regular orcs but never stabbed super orcs – Uruk-Hais”
- d3: “Sam was having a barbecue with some friendly orcs”

Calcolo:

- $tf(\text{"Frodo"}, d1) = 1$
- $idf(\text{"Frodo"}) = \log_{10}\left(\frac{3}{2}\right) \approx 0.176$
- $tf\text{-}idf(\text{"Frodo"}, d1) = 1 \times 0.176 = 0.176$

Analogamente per altre parole.

## 🔎 Pointwise Mutual Information (PMI)

Un'altra tecnica fondamentale per valutare la co-occorrenza di parole è la **Pointwise Mutual Information (PMI)**.

**Idea**:
- Misura quanto è **informativa** l'associazione tra due parole rispetto all'ipotesi di indipendenza statistica.

**Formula PMI**:
$$
PMI(w_1, w_2) = \log \left( \frac{P(w_1, w_2)}{P(w_1) P(w_2)} \right)
$$
dove:
- $P(w_1, w_2)$ è la probabilità congiunta delle due parole.
- $P(w_1)$, $P(w_2)$ sono le probabilità marginali.

🔵 **Interpretazione**:
- PMI > 0 → le parole co-occorrono **più del previsto**.
- PMI < 0 → le parole co-occorrono **meno del previsto**.

📚 **PMI in NLP**:
- Utilizzato per costruire matrici di co-occorrenza pesate tra termini e contesti.
- Stimato da modelli bigrammi/unigrammi.

## ➕ Positive PMI (PPMI)

Poiché valori negativi di PMI sono spesso poco affidabili (soprattutto su corpora piccoli), si utilizza una variante: **Positive PMI (PPMI)**.

**Definizione**:
$$
PPMI(w_1, w_2) = \max(PMI(w_1, w_2), 0)
$$

🔎 **Vantaggi**:
- Ignora co-occorrenze meno frequenti di quanto atteso.
- Focalizza solo su associazioni **significative**.

## 🏗️ Esercizio PPMI (Pointwise Mutual Information)

### 📋 Introduzione

In questo esercizio, partiamo da una **term-context matrix** $F$, che contiene il numero di volte in cui una parola $w_i$ appare in un contesto $c_j$.

**Obiettivo:**  
Costruire la matrice **PPMI** (Positive Pointwise Mutual Information) seguendo questi passi:

### 🔢 Step 1: Matrice dei conteggi $F(w, context)$

| parola         | computer | data | pinch | result | sugar |
|----------------|:--------:|:----:|:-----:|:------:|:-----:|
| **apricot**     | 0        | 0    | 1     | 0      | 1     |
| **pineapple**   | 0        | 0    | 1     | 0      | 1     |
| **digital**     | 2        | 1    | 0     | 1      | 0     |
| **information** | 1        | 6    | 0     | 4      | 0     |

### 🛠️ Step 2: Calcolo delle probabilità

#### a) Calcolare il totale complessivo delle occorrenze

$$
\text{Totale} = \text{somma di tutte le celle di F}
$$

Sommiamo tutti i numeri della tabella:

$$
\text{Totale} = (0 + 0 + 1 + 0 + 1) + (0 + 0 + 1 + 0 + 1) + (2 + 1 + 0 + 1 + 0) + (1 + 6 + 0 + 4 + 0)
$$
$$
\text{Totale} = 2 + 2 + 4 + 11 = 19
$$

Quindi:

$$
\text{Totale} = 19
$$

#### b) Calcolare $p(w, c)$ (probabilità congiunta)

Ogni elemento:

$$
p(w, c) = \frac{\text{conteggio}(w, c)}{19}
$$

Per esempio:
- $p(\text{apricot, pinch}) = \frac{1}{19} \approx 0.0526$

E così via per tutte le celle.

#### c) Calcolare $p(w)$ (probabilità della parola)

Sommiamo le righe:

- $p(\text{apricot}) = \frac{0 + 0 + 1 + 0 + 1}{19} = \frac{2}{19} \approx 0.105$
- $p(\text{pineapple}) = \frac{2}{19} \approx 0.105$
- $p(\text{digital}) = \frac{2 + 1 + 0 + 1 + 0}{19} = \frac{4}{19} \approx 0.211$
- $p(\text{information}) = \frac{1 + 6 + 0 + 4 + 0}{19} = \frac{11}{19} \approx 0.579$

#### d) Calcolare $p(c)$ (probabilità del contesto)

Sommiamo le colonne:

- $p(\text{computer}) = \frac{0 + 0 + 2 + 1}{19} = \frac{3}{19} \approx 0.158$
- $p(\text{data}) = \frac{0 + 0 + 1 + 6}{19} = \frac{7}{19} \approx 0.368$
- $p(\text{pinch}) = \frac{1 + 1 + 0 + 0}{19} = \frac{2}{19} \approx 0.105$
- $p(\text{result}) = \frac{0 + 0 + 1 + 4}{19} = \frac{5}{19} \approx 0.263$
- $p(\text{sugar}) = \frac{1 + 1 + 0 + 0}{19} = \frac{2}{19} \approx 0.105$

Quindi ora abbiamo la seguente tabella di probabilità congiunte $p(w, context)$:

| parola        | computer | data | pinch | result | sugar | $P(w)$ |
|---------------|:--------:|:----:|:-----:|:------:|:-----:|:----------:|
| **apricot**    | 0.00     | 0.00 | 0.05  | 0.00   | 0.05  | 0.11       |
| **pineapple**  | 0.00     | 0.00 | 0.05  | 0.00   | 0.05  | 0.11       |
| **digital**    | 0.11     | 0.05 | 0.00  | 0.05   | 0.00  | 0.21       |
| **information**| 0.05     | 0.32 | 0.00  | 0.21   | 0.00  | 0.58       |

Le probabilità marginali dei contesti $P(context)$ sono:

| context  | $P(c)$ |
|----------|:----------:|
| computer | 0.16       |
| data     | 0.37       |
| pinch    | 0.11       |
| result   | 0.26       |
| sugar    | 0.11       |

### 🔥 Step 3: Calcolo della PPMI

Per ogni cella $(w, c)$:

1. **Se** il conteggio è 0, PPMI = 0.
2. **Altrimenti**, calcoliamo:

$$
PPMI(w, c) = \max\left( \log_2\left( \frac{p(w,c)}{p(w) \times p(c)} \right), 0 \right)
$$

#### Esempio di calcolo: "apricot" e "pinch"

- $p(\text{apricot, pinch}) = 0.0526$
- $p(\text{apricot}) = 0.105$
- $p(\text{pinch}) = 0.105$

Allora:

$$
\frac{p(w,c)}{p(w)p(c)} = \frac{0.0526}{0.105 \times 0.105} \approx \frac{0.0526}{0.011025} \approx 4.77
$$

Poi:

$$
\log_2(4.77) \approx 2.25
$$

Infine:

$$
PPMI(\text{apricot, pinch}) = 2.25
$$

### ✅ Step 4: Costruzione della matrice finale PPMI

Ripetiamo il procedimento per ogni cella della matrice.

- Dove il conteggio è 0, scriviamo "-".
- Dove il conteggio è >0, calcoliamo il valore come sopra.


La matrice PPMI risultante è:

| parola        | computer | data | pinch | result | sugar |
|---------------|:--------:|:----:|:-----:|:------:|:-----:|
| **apricot**    | -        | -    | 2.25  | -      | 2.25  |
| **pineapple**  | -        | -    | 2.25  | -      | 2.25  |
| **digital**    | 1.66     | 0.00 | -     | 0.00   | -     |
| **information**| 0.00     | 0.57 | -     | -0.47  | -     |

*(Nota: i valori negativi diventano 0 nel PPMI.)*

### 🎯 Conclusione

Ora abbiamo la matrice **PPMI** costruita a partire **dai conteggi** iniziali!

## 🚨 Problemi di PMI e PPMI

Nonostante la PMI e la PPMI siano strumenti potenti per pesare la co-occorrenza di parole, presentano **alcuni problemi** importanti da considerare.

### ⚠️ Problema: Sovrastima degli Eventi Rari

La PMI tende a **sovrastimare** le associazioni che coinvolgono parole o contesti **molto rari**.

📌 **Esempio**:
- Se una parola rara appare anche **una sola volta** con un certo contesto, il valore di PMI può risultare **molto alto**, anche se quell'associazione è dovuta al caso. Questo porta a **valori anomali** che inquinano la rappresentazione semantica.

**Motivo**:
- Se $P(w)$ o $P(c)$ sono molto piccoli, il denominatore nella formula di PMI è minuscolo, facendo esplodere il valore del logaritmo.

## 🛠️ Soluzioni: Correzione della Probabilità

Per mitigare questo problema, possiamo **modificare le probabilità**:

### 1. Smoothing delle Probabilità

Una tecnica è il **Laplace Smoothing**, in cui si aggiunge una piccola quantità (ad esempio 1) a tutti i conteggi, per evitare zeri e ridurre l’impatto dei rari.

Formula di smoothing:

$$
count'(w, c) = count(w, c) + \lambda
$$

dove $\lambda > 0$ è una costante (tipicamente $\lambda = 1$).

Con questo trucco:
- Le parole molto rare ricevono una **penalizzazione**.
- Il denominatore della PMI diventa più stabile.

### 2. PPMI con Probabilità Modificate ($PPMI^{\alpha}$)

Una soluzione ancora più raffinata proposta da **Levy et al. (2015)** consiste nel modificare la probabilità dei contesti $P(c)$.

**Idea**:
- Innalzare i contesti rari artificialmente, rendendoli meno "speciali".
- Applicare un **esponente $\alpha$ (tipicamente $\alpha=0.75$)** sulle frequenze dei contesti.

Formula modificata:

$$
P^{\alpha}(c) = \frac{count(c)^{\alpha}}{\sum_{c'}count(c')^{\alpha}}
$$

e la **PPMI corretta ($PPMI^{\alpha}$)** diventa:

$$
PPMI^{\alpha}(w, c) = \max\left( \log_2 \left( \frac{P(w,c)}{P(w) \cdot P^{\alpha}(c)} \right), 0 \right)
$$

### 🧠 Interpretazione

- **Se $c$ è raro**, $P^{\alpha}(c)$ sarà **più grande** di $P(c)$ normale.
- Questo **riduce** il valore di PMI per associazioni sospette con contesti rari.
- I contesti molto frequenti (grandi $count(c)$) sono **penalizzati meno**.

### 📚 Esempio Numerico

Supponiamo:

- Contesto $a$: $count(a) = 99$
- Contesto $b$: $count(b) = 1$
- Numero totale di contesti: $N = 100$

Calcoliamo le probabilità normali:

$$
P(a) = 0.99, \quad P(b) = 0.01
$$

Ora applichiamo $\alpha = 0.75$:

- $count(a)^{0.75} = 99^{0.75} \approx 31.4$
- $count(b)^{0.75} = 1^{0.75} = 1$

Totale normalizzato:

$$
\sum_{c}count(c)^{0.75} = 31.4 + 1 = 32.4
$$

Quindi:

$$
P^{0.75}(a) = \frac{31.4}{32.4} \approx 0.97
$$
$$
P^{0.75}(b) = \frac{1}{32.4} \approx 0.03
$$

➡️ **Conclusione**: anche se $b$ era rarissimo, ora la sua probabilità effettiva non è più 0.01 ma circa 0.03, **riducendo l'esplosione di PMI** su contesti rari.

## 🧩 Riassunto Finale

| Metodo | Vantaggi | Problemi |
|:---|:---|:---|
| **TF (Term Frequency)** | Semplice da calcolare; riflette l'importanza locale di una parola in un documento | Non distingue tra parole informative e parole molto comuni (es. "the", "is") |
| **IDF (Inverse Document Frequency)** | Penalizza parole troppo comuni; migliora la discriminatività delle parole | Può assegnare punteggi estremi a parole molto rare |
| **TF-IDF** | Combina importanza locale (TF) e globale (IDF); migliora la qualità delle rappresentazioni testuali | Non cattura le relazioni tra le parole; insensibile alla semantica |
| **PMI** | Misura precisa della forza di associazione tra parola e contesto | Sovrastima eventi rari; instabile su piccoli corpora |
| **PPMI** | Ignora associazioni negative; maggiore robustezza rispetto a PMI | Comunque vulnerabile a rumore da contesti rari |
| **PPMI$^{\alpha}$** | Migliora la gestione dei contesti rari applicando smoothing parametrico; più bilanciato | Richiede una scelta accurata del parametro $\alpha$; maggiore complessità computazionale |

## 🧠 Conclusioni

- **TF-IDF** è estremamente efficace per la rappresentazione di documenti rispetto a corpus di testi.
- **PMI** e **PPMI** sono strumenti potenti per analizzare la semantica fine delle relazioni tra parole.
- In NLP moderno, queste tecniche di pesatura rimangono fondamentali per la costruzione di rappresentazioni sparse e semantiche significative delle parole.
