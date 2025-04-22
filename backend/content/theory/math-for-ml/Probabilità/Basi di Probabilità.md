# Basi di Probabilità

## Introduzione
La probabilità è uno strumento universalmente accettato per esprimere gradi di fiducia o dubbio su una proposizione in presenza di informazioni incomplete. Per convenzione:

- $\mathbb{P}(A) = 0$: Impossibilità
- $\mathbb{P}(A) = 1$: Certezza

## Esperimenti e Spazi Campionari
**Definizione 1.1**:  
Uno **spazio campionario** $\Omega$ è l'insieme di tutti i possibili esiti:
- Lancio di moneta: $\Omega = \{T, C\}$
- Estrazione numero casuale $[0,1]$: $\Omega = [0,1]$

**Evento**: Qualsiasi $A \subseteq \Omega$, con:
- $A = \emptyset$ (evento impossibile)
- $A = \Omega$ (evento certo)

## Misure di Probabilità
**Assiomi di Kolmogorov**:  
Una funzione $\mathbb{P}: \mathcal{P}(\Omega) \to [0,1]$ è una probabilità se:
1. $\mathbb{P}(A) \geq 0 \quad \forall A \subseteq \Omega$
2. $\mathbb{P}(\Omega) = 1$
3. Additività numerabile:  
   $A_i \cap A_j = \emptyset \Rightarrow \mathbb{P}\left(\bigcup_{i=1}^\infty A_i\right) = \sum_{i=1}^\infty \mathbb{P}(A_i)$

### Proprietà
- $\mathbb{P}(\emptyset) = 0$
- $A \subseteq B \Rightarrow \mathbb{P}(A) \leq \mathbb{P}(B)$
- $\mathbb{P}(A^c) = 1 - \mathbb{P}(A)$

La probabilità congiunta tra due eventi $A$ e $B$ è la probabilità che questi eventi si verifichino contemporaneamente, e si scrive:

$$
P(A \cap B) \quad \text{oppure} \quad P(A, B).
$$

## Probabilità Uniforme (Equiprobabilità)
Per $\Omega$ finito con $|\Omega| = N$:
$$
\mathbb{P}(\{\omega\}) = \frac{1}{N} \quad \forall \omega \in \Omega
$$
Per ogni evento $A$ con $|A| = k$:
$$
\mathbb{P}(A) = \frac{k}{N} = \frac{\text{Casi favorevoli}}{\text{Casi totali}}
$$

**Esempio 1.1** (Problema delle scarpe):  
5 paia → 4 estratte casualmente:
$$
\mathbb{P}(\text{Almeno 1 paio}) = \frac{\binom{5}{2} + \binom{5}{1}\binom{4}{2}2^2}{\binom{10}{4}} = \frac{130}{210} \approx 0.62
$$

## Formula di Inclusione-Esclusione
Per $A_1, ..., A_n$ eventi:
$$
\mathbb{P}\left(\bigcup_{i=1}^n A_i\right) = \sum_{i=1}^n \mathbb{P}(A_i) - \sum_{1 \leq i < j \leq n} \mathbb{P}(A_i \cap A_j) + \cdots + (-1)^{n+1} \mathbb{P}\left(\bigcap_{i=1}^n A_i\right)
$$

**Esempio 1.3** (Bridge):  
Probabilità di mancare almeno un seme:
$$
\mathbb{P} = 4\frac{\binom{39}{13}}{\binom{52}{13}} - 6\frac{\binom{26}{13}}{\binom{52}{13}} + 4\frac{\binom{13}{13}}{\binom{52}{13}} \approx 0.051
$$

## Probabilità Condizionale e Indipendenza
### Definizioni Fondamentali
**Probabilità Condizionale**: quantifica la probabilità che un evento $B$ si verifichi, dato che sappiamo che un altro evento $A$ è accaduto. Formalmente, è definita come:

$$
\mathbb{P}(B|A) = \frac{\mathbb{P}(A \cap B)}{\mathbb{P}(A)} \quad \text{se } \mathbb{P}(A) > 0.
$$

Questa formula ha un significato intuitivo:  
- Il numeratore $\mathbb{P}(A \cap B)$ rappresenta la probabilità che entrambi gli eventi $A$ e $B$ si verifichino contemporaneamente.  
- Il denominatore $\mathbb{P}(A)$ è la probabilità che $A$ avvenga. Dato che stiamo assumendo che $A$ sia già accaduto, $\mathbb P(A)$ si trova al denominatore, in quanto il nostro nuovo "universo" di probabilità è $A$.

*Esempio pratico*:  
Immagina di avere un mazzo di carte. Sia $A$ l'evento "estrai una carta di cuori" e $B$ l'evento "estrai un asso". Se sai già che la carta estratta è di cuori, stai lavorando solo all'interno delle carte di cuori (13 carte). Quindi, la probabilità che sia anche un asso, $\mathbb{P}(B|A)$, è data dal rapporto tra 1 (l'unico asso di cuori) e 13:
$$
\mathbb{P}(B|A) = \frac{1}{13}.
$$

**Indipendenza**:
Due eventi $A$ e $B$ sono indipendenti se:

$$
\mathbb{P}(A \cap B) = \mathbb{P}(A) \cdot \mathbb{P}(B)
$$

Cioè, due eventi si dicono indipendenti se il verificarsi di uno non influenza la probabilità che l'altro si verifichi; in termini di insiemi, la "parte" di $A$ che interseca $B$ è esattamente proporzionale alla grandezza di $A$, senza alcuna "sovrapposizione" inaspettata.

*Esempio pratico*:  
Pensa a lanciare due monete. Sia $A$ l'evento "la prima moneta mostra testa" e $B$ l'evento "la seconda moneta mostra testa". La probabilità che ciascuna moneta mostri testa è $\frac{1}{2}$. Poiché il lancio di una moneta non influenza l'altro, la probabilità che entrambe mostrino testa è:
$$
\mathbb{P}(A \cap B) = \frac{1}{2} \cdot \frac{1}{2} = \frac{1}{4}.
$$

**Indipendenza Condizionale**:  
Due eventi $A$ e $B$ sono condizionalmente indipendenti dato $C$ (con $\mathbb{P}(C) > 0$) se:

$$
\mathbb{P}(A \cap B \mid C) = \mathbb{P}(A \mid C) \cdot \mathbb{P}(B \mid C)
$$

Cioè, se restringiamo il nostro "universo" all'insieme $C$, la probabilità che si verifichino insieme $A$ e $B$ è semplicemente il prodotto delle probabilità di $A$ e $B$ calcolate all'interno di $C$. In termini di insiemi, questo significa che, una volta fissato $C$, la "parte" di $C$ dove $A$ e $B$ si sovrappongono è esattamente quella che ci si aspetterebbe se non vi fosse alcuna influenza reciproca tra $A$ e $B$.

*Esempio pratico*:  
Considera un'università dove $C$ rappresenta il fatto che uno studente appartiene a un corso di laurea in Ingegneria. Sia $A$ l'evento "lo studente prende un voto alto in matematica" e $B$ l'evento "lo studente prende un voto alto in fisica". Anche se in generale la performance in matematica e fisica possono essere correlate, all'interno del corso di Ingegneria (cioè, dato $C$) gli esiti possono essere trattati come indipendenti: la probabilità di ottenere voti alti in entrambe le materie, condizionata all'appartenenza al corso, è il prodotto delle probabilità individuali calcolate per quel corso.

### Teoremi Chiave
#### Teorema (Formule Fondamentali)
1. **Formula Moltiplicativa**:  
   Per eventi $A$, $B$ con $\mathbb{P}(A) > 0$:  
   $$
   \mathbb{P}(A \cap B) = \mathbb{P}(A) \cdot \mathbb{P}(B|A)
   $$
   
   *Dimostrazione*:  
   Partiamo dalla definizione di probabilità condizionata:
   $$
   \mathbb{P}(B|A) = \frac{\mathbb{P}(A \cap B)}{\mathbb{P}(A)}.
   $$
   Moltiplicando entrambi i membri per $\mathbb{P}(A)$ otteniamo:
   $$
   \mathbb{P}(A \cap B) = \mathbb{P}(A) \cdot \mathbb{P}(B|A).
   $$
   $\square$

2. **Legge della Probabilità Totale**:  
   Per partizione $A_1, ..., A_k$ di $\Omega$:  
   $$
   \mathbb{P}(B) = \sum_{i=1}^k \mathbb{P}(B|A_i)\mathbb{P}(A_i)
   $$
   
   *Dimostrazione*:  
   Siccome $\{A_i\}_{i=1}^k$ è una partizione di $\Omega$, ogni evento $B$ può essere scritto come:
   $$
   B = \bigcup_{i=1}^k (B \cap A_i),
   $$
   dove gli insiemi $B \cap A_i$ sono a due a due disgiunti. Applicando l'additività della probabilità:
   $$
   \mathbb{P}(B) = \sum_{i=1}^k \mathbb{P}(B \cap A_i).
   $$
   Utilizzando la formula moltiplicativa per ogni $i$:
   $$
   \mathbb{P}(B \cap A_i) = \mathbb{P}(A_i) \cdot \mathbb{P}(B|A_i),
   $$
   otteniamo:
   $$
   \mathbb{P}(B) = \sum_{i=1}^k \mathbb{P}(A_i)\mathbb{P}(B|A_i).
   $$
   $\square$

3. **Formula Moltiplicativa Gerarchica ([[Chain Rule (Probabilità)|chain rule]])**:  
   Per eventi $A_1, ..., A_k$:  
   $$
   \mathbb{P}\left(\bigcap_{i=1}^k A_i\right) = \prod_{i=1}^k \mathbb{P}\left(A_i \bigg| \bigcap_{j=1}^{i-1} A_j \right)
   $$
   
   *Dimostrazione*:  
   Dimostriamo per induzione.
   
   - **Base ($k=2$)**:  
     Dalla definizione di probabilità condizionata abbiamo:
     $$
     \mathbb{P}(A_1 \cap A_2) = \mathbb{P}(A_1) \cdot \mathbb{P}(A_2|A_1).
     $$
   
   - **Passo induttivo**:  
     Supponiamo che la formula sia vera per $k-1$ eventi:
     $$
     \mathbb{P}\left(\bigcap_{i=1}^{k-1} A_i\right) = \prod_{i=1}^{k-1} \mathbb{P}\left(A_i \bigg| \bigcap_{j=1}^{i-1} A_j \right).
     $$
     Consideriamo ora $k$ eventi. Applicando la definizione di probabilità condizionata all'evento $\bigcap_{i=1}^k A_i$ (assumendo $A = A_k$ e $B = \bigcap_{i=1}^{k-1} A_i$):
     $$
     \mathbb{P}\left(\bigcap_{i=1}^{k} A_i\right) = \mathbb{P}\left(\bigcap_{i=1}^{k-1} A_i\right) \cdot \mathbb{P}\left(A_k \mid \bigcap_{i=1}^{k-1} A_i\right).
     $$
     Sostituendo l'ipotesi induttiva si ottiene:
     $$
     \mathbb{P}\left(\bigcap_{i=1}^{k} A_i\right) = \left( \prod_{i=1}^{k-1} \mathbb{P}\left(A_i \bigg| \bigcap_{j=1}^{i-1} A_j \right) \right) \cdot \mathbb{P}\left(A_k \mid \bigcap_{i=1}^{k-1} A_i\right).
     $$
     Quindi:
     $$
     \mathbb{P}\left(\bigcap_{i=1}^{k} A_i\right) = \prod_{i=1}^{k} \mathbb{P}\left(A_i \bigg| \bigcap_{j=1}^{i-1} A_j \right).
     $$
   $\square$

### Esempi Applicativi

#### Esempio (Problema delle Urne)
**Scenario**:  
- Urna 1: $a$ rosse, $b$ nere  
- Urna 2: $c$ rosse, $d$ nere  
Si estrae 1 pallina da ciascuna urna, poi si sceglie a caso una delle due.  

**Probabilità finale di rosso**:  
$$
\mathbb{P}(\text{Rosso}) = \frac{2ac + ad + bc}{2(a+b)(c+d)}
$$

**Caso concreto**:  
Per $a=99$, $b=1$, $c=1$, $d=1$:  
$$
\mathbb{P}(\text{Rosso}) = \frac{2 \cdot 99 \cdot 1 + 99 \cdot 1 + 1 \cdot 1}{2 \cdot 100 \cdot 2} = 0.745
$$

> **Nota**: Nonostante il 98% di palline rosse nelle urne, la probabilità finale è solo ~75% per via della selezione casuale.

#### Esempio (Strategia di Lancio di Monete)
**Scenario**:  
- Moneta A: probabilità testa $s$  
- Moneta B: probabilità testa $t$  
Si alternano lanci iniziando da A. Qual è la probabilità che la prima testa sia su A?

**Soluzione**:  
Condizionando sui primi due lanci:  
$$
\mathbb{P}(A) = \frac{s}{s + t - st}
$$

**Caso concreto**:  
Per $s=0.4$, $t=0.5$:  
$$
\mathbb{P}(A) = \frac{0.4}{0.4 + 0.5 - 0.2} = 0.57
$$

> **Osservazione**: Chi inizia ha un vantaggio strategico anche con monete sfavorevoli.

### Teorema di Bayes e Applicazioni

#### Enunciato Formale (Teorema)
Per partizione $A_1, ..., A_m$ di $\Omega$ e evento $B$:  
$$
\mathbb{P}(A_j|B) = \frac{\mathbb{P}(B|A_j)\mathbb{P}(A_j)}{\sum_{i=1}^m \mathbb{P}(B|A_i)\mathbb{P}(A_i)}
$$

#### Contesto Interpretativo
- **Confusione comune**: Scambiare $\mathbb{P}(A|B)$ con $\mathbb{P}(B|A)$  
  Esempio: Alta percentuale di fumatori tra malati di cancro ($\mathbb{P}(B|A)$) non implica che fumare causi il cancro ($\mathbb{P}(A|B)$).

  Supponiamo che, in una popolazione di 10.000 persone:

  - Il 1% sviluppa il cancro, quindi $\mathbb{P}(A) = 0.01$ (100 persone su 10.000).
  - Tra i malati di cancro, l'80% è fumatori, cioè $\mathbb{P}(B|A) = 0.8$ (80 persone).
  - Complessivamente, il 30% della popolazione fuma, quindi $\mathbb{P}(B) = 0.3$ (3.000 persone).

  Utilizzando il teorema di Bayes per calcolare la probabilità che un fumatore sviluppi il cancro, abbiamo:

  $$
  \mathbb{P}(A|B) = \frac{\mathbb{P}(B|A) \, \mathbb{P}(A)}{\mathbb{P}(B)} = \frac{0.8 \times 0.01}{0.3} \approx 0.0267
  $$

  Questo significa che solo circa il 2.67% dei fumatori sviluppa il cancro, nonostante l'80% dei malati di cancro siano fumatori. Quindi, l'alta percentuale di fumatori tra i malati ($\mathbb{P}(B|A)$) non implica che la maggior parte dei fumatori sviluppi il cancro ($\mathbb{P}(A|B)$), evidenziando l'importanza di considerare la prevalenza della malattia nella popolazione generale.

#### Esempio (Esame a Scelta Multipla)
**Scenario**:  
- Studente conosce risposta con probabilità 0.7  
- Altrimenti indovina (1/5 di successo)  

**Probabilità posteriore di conoscenza**:  
$$
\mathbb{P}(\text{Conosceva}|{\text{Risposta corretta}}) = \frac{1 \cdot 0.7}{1 \cdot 0.7 + 0.2 \cdot 0.3} = 0.921
$$
