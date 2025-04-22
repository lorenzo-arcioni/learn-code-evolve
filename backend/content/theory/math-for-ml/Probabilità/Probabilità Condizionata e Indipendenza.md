# Probabilità Condizionata e Indipendenza

Sia la probabilità condizionata che l'indipendenza sono concetti fondamentali per i probabilisti e gli statistici. Le probabilità condizionate corrispondono all'aggiornamento delle proprie convinzioni quando nuove informazioni diventano disponibili. L'indipendenza, invece, corrisponde all'irrilevanza di un'informazione anche quando viene resa disponibile. Inoltre, l'assunzione di indipendenza può e fa semplificare in modo significativo lo sviluppo, l'analisi matematica e la giustificazione di strumenti e procedure.

## Definizione

Sia $A$ e $B$ eventi generali rispetto a uno spazio campionario $\Omega$, e supponiamo che $P(A) > 0$. La probabilità condizionata di $B$ dato $A$ è definita come:

$$
P(B|A) = \frac{P(A \cap B)}{P(A)}
$$

Alcune conseguenze immediate della definizione di probabilità condizionata sono le seguenti.

## Teorema

-  (Formula Moltiplicativa). Per due eventi $A$, $B$ tali che $P(A) > 0$, si ha:

$$
P(A \cap B) = P(A) P(B|A)
$$

**Dimostrazione**:

La probabilità condizionata di $B$ dato $A$ è definita come:

$$
P(B|A) = \frac{P(A \cap B)}{P(A)}
$$

Moltiplicando entrambi i membri per $P(A)$, otteniamo:

$$
P(A \cap B) = P(A) P(B|A)
$$

Questa è la formula moltiplicativa. $\square$

---

-  Per due eventi $A$ e $B$ tali che $0 < P(A) < 1$, si ha:

$$
P(B) = \frac{P(B|A)}{P(A)} + P(B|A^c) P(A^c)
$$

**Dimostrazione**:

Usiamo la formula della probabilità totale:

$$
P(B) = P(B \cap A) + P(B \cap A^c)
$$

Scrivendo ogni termine come prodotto di probabilità condizionata:

$$
P(B) = P(B|A)P(A) + P(B|A^c)P(A^c)
$$

Questa è la formula richiesta. $\square$

---

-  (Formula della Probabilità Totale). Se $A_1, A_2, \dots, A_k$ formano una partizione dello spazio campionario $\Omega$, e se $0 < P(A_i) < 1$ per tutti $i$, allora:

$$
P(B) = \sum_{i=1}^{k} P(B|A_i) P(A_i)
$$

**Dimostrazione**:

Poiché gli eventi $A_1, A_2, \dots, A_k$ formano una partizione di $\Omega$, possiamo scrivere:

$$
P(B) = P\left(B \cap \bigcup_{i=1}^{k} A_i\right)
$$

Poiché gli eventi sono disgiunti, possiamo riscrivere come somma delle probabilità condizionate:

$$
P(B) = \sum_{i=1}^{k} P(B \cap A_i)
$$

Ora, utilizzando la definizione di probabilità condizionata, otteniamo:

$$
P(B) = \sum_{i=1}^{k} P(B|A_i) P(A_i)
$$

Questa è la formula della probabilità totale. $\square$

---

- (Formula Moltiplicativa Gerarchica). Siano $A_1, A_2, \dots, A_k$ k eventi generali in uno spazio campionario $\Omega$. Allora:

$$
P(A_1 \cap A_2 \cap \dots \cap A_k) = P(A_1) P(A_2|A_1) P(A_3|A_1 \cap A_2) \dots P(A_k|A_1 \cap A_2 \cap \dots \cap A_{k-1})
$$

**Dimostrazione**:

Partiamo dalla probabilità dell'intersezione di tutti gli eventi:

$$
P(A_1 \cap A_2 \cap \dots \cap A_k)
$$

Utilizziamo la formula moltiplicativa della probabilità condizionata. Per prima cosa, possiamo scrivere la probabilità dell'intersezione dei primi due eventi come:

$$
P(A_1 \cap A_2) = P(A_1) P(A_2|A_1)
$$

Poi, per includere il terzo evento, possiamo scrivere:

$$
P(A_1 \cap A_2 \cap A_3) = P(A_1 \cap A_2) P(A_3|A_1 \cap A_2) = P(A_1) P(A_2|A_1) P(A_3|A_1 \cap A_2)
$$

Procediamo allo stesso modo per gli eventi successivi, ottenendo la formula finale:

$$
P(A_1 \cap A_2 \cap \dots \cap A_k) = P(A_1) P(A_2|A_1) P(A_3|A_1 \cap A_2) \dots P(A_k|A_1 \cap A_2 \cap \dots \cap A_{k-1})
$$
$\square$
---

### Esempio

Una delle due urne contiene $a$ palline rosse e $b$ palline nere, mentre l'altra contiene $c$ palline rosse e $d$ palline nere. Si estrae una pallina a caso da ciascuna urna e poi una delle due palline estratte viene scelta casualmente. Qual è la probabilità che questa pallina sia rossa?

Se entrambe le palline selezionate dalle due urne sono rosse, allora la pallina finale è sicuramente rossa. Se una di queste due palline è rossa, allora la probabilità che la pallina finale sia rossa è $1/2$. Se nessuna delle due palline è rossa, la pallina finale non può essere rossa.

Quindi:

$$
P(\text{La pallina finale è rossa}) = \frac{a}{a + b} \cdot \frac{c}{c + d} + \frac{1}{2} \cdot \left[\frac{a}{a + b} \cdot \frac{d}{c + d} + \frac{b}{a + b} \cdot \frac{c}{c + d}\right]
$$

Esempio numerico: se $a = 99$, $b = 1$, $c = 1$, $d = 1$, allora:

$$
\frac{2ac + ad + bc}{2(a + b)(c + d)} = 0.745
$$

Sebbene la percentuale totale di palline rosse nelle due urne sia superiore al 98%, la probabilità che la pallina finale selezionata sia rossa è circa 75%.

---

### Esempio (Un Argomento di Condizionamento Astuto)

La moneta $A$ dà testa con probabilità $s$ e la moneta $B$ dà testa con probabilità $t$. Le monete vengono lanciate alternativamente, iniziando con la moneta $A$. Vogliamo trovare la probabilità che la prima testa si ottenga con la moneta $A$.

Troviamo questa probabilità condizionando sui risultati dei primi due lanci; più precisamente, definiamo:

- $A_1 = \{H\}$ (Il primo lancio dà testa)
- $A_2 = \{TH\}$ (Il primo lancio dà croce e il secondo dà testa)
- $A_3 = \{TT\}$ (Il primo lancio dà croce e il secondo dà croce)

Vogliamo calcolare $P(A)$, la probabilità che la prima testa si ottenga con la moneta $A$. Utilizzando la formula della probabilità totale:

$$
P(A) = P(A_1) P(A|A_1) + P(A_2) P(A|A_2) + P(A_3) P(A|A_3)
$$

Ad esempio, se $s = 0.4$ e $t = 0.5$, la probabilità che la prima testa si ottenga con la moneta $A$ è:

$$
P(A) = \frac{s}{s + t - st} \approx 0.57
$$

---

### Definizione

Una collezione di eventi $A_1, A_2, \dots, A_n$ è detta mutuamente indipendente (o semplicemente indipendente) se per ogni $k$, $1 \leq k \leq n$, e qualsiasi sottoinsieme $A_{i_1}, A_{i_2}, \dots, A_{i_k}$ di eventi, si ha:

$$
P(A_1 \cap \dots \cap A_k) = P(A_1) \cdot P(A_2) \cdot \dots \cdot P(A_k)
$$

Gli eventi sono detti **indipendenti a coppie** se questa proprietà vale per $k = 2$.

---

### Esempio (Lotterie)

Sebbene molte persone acquistino biglietti della lotteria sperando nella buona sorte, probabilisticamente parlando, acquistare biglietti della lotteria è solitamente una perdita di denaro. Supponiamo che in una lotteria statale settimanale vengano estratti cinque numeri da un insieme di 50 numeri senza sostituzione, e che qualcuno con esattamente quei numeri vinca la lotteria. La probabilità che una persona con un biglietto vinca in una settimana data è:

$$
\frac{1}{\binom{50}{5}} = 4.72 \times 10^{-7}
$$

Se questa persona acquista un biglietto ogni settimana per 40 anni, la probabilità che vinca almeno una volta è:

$$
1 - \left(1 - 4.72 \times 10^{-7}\right)^{52 \times 40} \approx 0.00098
$$

---

### Confusione tra Probabilità Condizionata

Non è raro confondere le probabilità condizionate $P(A|B)$ e $P(B|A)$. Supponiamo che in un gruppo di pazienti con cancro ai polmoni vediamo una grande percentuale di fumatori. Se definiamo $B$ come l'evento che una persona è fumatrice e $A$ come l'evento che una persona ha il cancro ai polmoni, possiamo concludere che $P(B|A)$ è elevata, ma non possiamo concludere che fumare aumenti la probabilità di cancro ai polmoni, ovvero che $P(A|B)$ sia elevata. Per calcolare una probabilità condizionata $P(A|B)$, è utile il teorema di Bayes.

## Teorema (Bayes)

Sia $\{A_1, A_2, \dots, A_m\}$ una partizione di uno spazio campionario $\Omega$, e sia $B$ un evento fisso. Allora:

$$
P(B|A_i) = \frac{P(B|A_j) P(A_j)}{\sum_{i=1}^{m} P(B|A_i) P(A_i)}
$$
**Dimostrazione**: La probabilità condizionata di $B$ dato $A_i$ può essere scritta come: $$ P(B|A_i) = \frac{P(A_i \cap B)}{P(A_i)} $$ Ora, possiamo esprimere la probabilità di $P(A_i \cap B)$ usando la formula della probabilità totale: $$ P(A_i \cap B) = P(B|A_j) P(A_j) $$ Sommiamo su tutti i possibili eventi della partizione $\{A_1, A_2, \dots, A_m\}$: $$ P(B) = \sum_{i=1}^{m} P(B|A_i) P(A_i) $$ Ora possiamo esprimere la formula di Bayes isolando $P(B|A_i)$: $$ P(B|A_i) = \frac{P(B|A_i) P(A_i)}{\sum_{i=1}^{m} P(B|A_i) P(A_i)} $$
$\square$
### Esempio (Esami a Scelta Multipla)

Supponiamo che in un esame a scelta multipla, ogni domanda abbia cinque alternative e che uno studente debba scegliere una come risposta corretta. Un studente conosce la risposta corretta con probabilità 0.7, o sceglie una risposta a caso tra le cinque alternative. Se una domanda è stata risolta correttamente, vogliamo sapere qual è la probabilità che lo studente conoscesse la risposta corretta. Utilizzando il teorema di Bayes:

$$
P(A|B) = \frac{P(B|A) P(A)}{P(B|A) P(A) + P(B|A^c) P(A^c)}
$$
