# Spelling Correction & Minimum Edit Distance (MED)

## Rilevazione e Correzione di Errori Ortografici

Un tipico problema di Natural Language Processing (NLP) consiste nel rilevare e correggere errori ortografici in testi in linguaggio naturale.

### Classificazione degli Errori ([Kukich, 1992])

#### Rilevazione di non-parole
Identificare parole che non esistono nel dizionario di riferimento.

**Esempio:**
```text
Input: "graxfe" → Non presente nel dizionario italiano/inglese.
Azione: Segnalazione automatica o suggerimento di correzione.
```

**Metodi:**

- Lookup in dizionari predefiniti (es. dizionari open-source come Hunspell).
- Modelli statistici per identificare sequenze di caratteri anomale.

#### Correzione isolata di parole
Correggere errori in parole singole senza considerare il contesto circostante.

**Esempio:**
```text
Input: "acomodation" → Correzione: "accommodation".
```

**Algoritmi:**

- Generazione di candidati tramite MED (es. parole con edit distance ≤ 2).
- Ranking basato sulla frequenza lessicale (es. "accommodation" è più comune di "accomodation").

#### Correzione dipendente dal contesto
Correggere errori che producono parole valide ma semanticamente errate.

**Esempio:**
```text
Frase: "I have there apples." → Correzione: "three".
```

**Tecniche avanzate:**

- Modelli linguistici n-gram (es. trigrammi per valutare la probabilità della sequenza "have three apples").
- Reti neurali (es. Transformer) per catturare dipendenze a lungo raggio.

## Statistiche sugli Errori ([Damerau, 1964])
L'80% degli errori deriva da un singolo errore per parola:

| Tipo         | Esempio | Correzione | Operazione Richiesta |
|-------------|---------|------------|----------------------|
| Inserimento | "the"  | "ther"      | Inserimento del carattere "r" extra. |
| Cancellazione | "the" | "th"      | Rimozione del carattere "e". |
| Sostituzione | "thw"  | "the"      | Sostituzione di "w" con "e". |
| Trasposizione | "teh" | "the"      | Inversione di "h" e "e". |

**Eccezioni:**

- Errori multipli (es. "becuaesh" → "because") richiedono algoritmi più complessi (es. MED con k > 2).
- Errori fonetici (es. "fone" → "phone") non rilevabili tramite MED standard.

## L'Intuizione

Per molte applicazioni (es. Correzione Ortografica, Traduzione Automatica, Estrazione di Informazioni, Riconoscimento Vocale, Biologia Computazionale) è cruciale valutare la similarità tra due stringhe.

### Quanto sono simili due stringhe?

### Correzione Ortografica
L'utente ha digitato **"graffe"**, quale parola è la più simile?

- graf
- graft
- grail
- giraffe

Dato un dizionario di parole corrette, le similarità vengono utilizzate per trovare l'ortografia corretta più simile.

**Riferimento:** [Kukich, 1992]  
**Argomento:** Elaborazione del Linguaggio Naturale - Correzione Ortografica e Distanza di Modifica Minima  
**Riferimento:** [Damerau, 1964]

### Biologia Computazionale
Allineamento di due sequenze di nucleotidi:

```
AGGCTATCACCTGACCTCCAGGCCGATGCCC
TAGCTATCACGACCGCGGTCGATTTGCCCGAC
```

Allineamento risultante:

```
-AGGCTATCACCTGACCTCCAGGCCGA--TGCCC---
TAG-CTATCAC--GACCGC--GGTCGATTTGCCCGAC
```

Date due sequenze di nucleotidi, le similarità vengono utilizzate per eseguire l'allineamento ottimale.

## Minimum Edit Distance (MED)

La **Minimum Edit Distance (MED)** è una misura del costo minimo necessario per applicare operazioni di modifica al fine di allineare una stringa sorgente $X$ a una stringa target $Y$.

Le operazioni di modifica sono:

- **Inserimento (i):**
- **Cancellazione (d):**
- **Sostituzione (s):**

La funzione **costo(z):**, con $z \in \{i, d, s\}$, definisce il costo associato all'applicazione di una determinata operazione di modifica.

Per calcolare la MED di due stringhe si potrebbe pensare di tentare tutte le combinazioni di operazioni di modifica, ma questo richiederebbe esponenziali operazioni di calcolo. Per evitare questo, si utilizza un algoritmo di programmazione dinamica.

### Algoritmo di Wagner-Fischer
L'algoritmo di Wagner-Fischer utilizza un'approccio matriciale per calcolare la MED tra due stringhe. In particolare, si utilizza una matrice $D$ di dimensioni $(n+1) × (m+1)$, dove $n$ e $m$ sono le lunghezze delle due stringhe.

Quindi dato:

- Una stringa $X$ di lunghezza $n$
- Una stringa $Y$ di lunghezza $m$

Definiamo $D_{X,Y}(i,j)$ come:

- La distanza di modifica tra i primi $i$ caratteri di $X$ e i primi $j$ caratteri di $Y$.
- La distanza di modifica tra $X$ e $Y$ è quindi $D_{X,Y}(n,m)$.

L'approccio consiste nel calcolo tabulare di $D_{X,Y}(n,m)$.

Si risolve il problema combinando soluzioni di sottoproblemi più piccoli.

### Strategia "Bottom-up"

- Si calcola $D_{X,Y}(i,j)$ per valori piccoli di $i$ e $j$.
- Si utilizzano i valori precedentemente calcolati per ottenere $D_{X,Y}(i,j)$ per valori più grandi.
- Si computa $D_{X,Y}(i,j)$ per tutti $i$ con $0 < i < n$ e $j$ con $0 < j < m$.

### Formalmente

$$
\begin{aligned}
& \textbf{Algoritmo: Calcolo della Distanza di Modifica Minima} \\
& \textbf{Input:} \\
& \quad - \text{Stringa sorgente } X \text{, di lunghezza } n \\
& \quad - \text{Stringa target } Y \text{, di lunghezza } m \\
& \textbf{Output:} \\
& \quad - \text{Distanza di modifica minima } D_{X,Y}(n,m) \\
& \quad - \text{Allineamento ottimale tramite puntatori di backtracking} \\
& \\
& \text{1: Inizializza la matrice } D_{X,Y} \text{ di dimensioni } (n+1) \times (m+1) \text{ con:} \\
& \quad \text{per } i = 0 \text{ to } n: \quad D_{X,Y}(i,0) \gets i \\
& \quad \text{per } j = 0 \text{ to } m: \quad D_{X,Y}(0,j) \gets j \\
& \quad \text{(Salva i puntatori di backtracking per ciascuna cella)} \\
& \\
& \text{2: Per } i = 1 \text{ a } n \text{ do:} \\
& \quad \quad \text{Per } j = 1 \text{ a } m \text{ do:} \\
& \quad \quad \quad D_{X,Y}(i,j) \gets \min \Big\{ \\
& \quad \quad \quad \quad D_{X,Y}(i-1,j) + \text{costo(d)} \quad \text{(cancellazione)}, \\
& \quad \quad \quad \quad D_{X,Y}(i,j-1) + \text{costo(i)} \quad \text{(inserimento)}, \\
& \quad \quad \quad \quad D_{X,Y}(i-1,j-1) + 
    \begin{cases}
      \text{costo(s)} & \text{se } X[i] \neq Y[j], \\
      0 & \text{se } X[i] = Y[j]
    \end{cases} \quad \text{(sostituzione)} \\
& \quad \quad \quad \Big\} \\
& \quad \quad \quad \text{(Aggiorna i puntatori di backtracking in base alla scelta minima)} \\
& \\
& \text{3: La distanza di modifica minima è } D_{X,Y}(n,m). \\
& \\
& \text{4: Per ottenere l'allineamento ottimale, inizia da } D_{X,Y}(n,m) \text{ e segui i puntatori di backtracking.}
\end{aligned}
$$

### Esecuzione Completa dell'Algoritmo per "hello" e "hey"

Consideriamo:

- $X = "hello"$ (lunghezza $n = 5$)
- $Y = "hey"$ (lunghezza $m = 3$)

Utilizziamo i seguenti costi:

- Inserimento: 1
- Cancellazione: 1
- Sostituzione: 1 (0 se i caratteri sono uguali)

#### 1. Inizializzazione

Si crea una matrice $D$ di dimensioni $(n+1) \times (m+1) = 6 \times 4$.

Per ogni $i = 0, \dots, 5$:
$$
D(i,0) = i
$$
Per ogni $j = 0, \dots, 3$:
$$
D(0,j) = j
$$

La matrice iniziale è:

$$
\begin{array}{c|cccc}
      & j=0 & j=1 & j=2 & j=3 \\ \hline
i=0   & 0   & 1   & 2   & 3   \\
i=1   & 1   &     &     &     \\
i=2   & 2   &     &     &     \\
i=3   & 3   &     &     &     \\
i=4   & 4   &     &     &     \\
i=5   & 5   &     &     &     \\
\end{array}
$$

#### 2. Riempimento della Matrice

Si calcola $D(i,j)$ per $i = 1,\dots,5$ e $j = 1,\dots,3$ utilizzando:

$$
D(i,j)= \min \left\{
\begin{array}{l}
D(i-1,j) + \text{costo(d)} \quad \text{(cancellazione)} \\
D(i,j-1) + \text{costo(i)} \quad \text{(inserimento)} \\
D(i-1,j-1) + 
  \begin{cases}
    0 & \text{se } X[i]=Y[j] \\
    1 & \text{se } X[i]\neq Y[j]
  \end{cases}
  \quad \text{(sostituzione)}
\end{array}
\right\}.
$$

#### Dettaglio dei Calcoli

**Riga $i=1$ ($X[1] = "h"$):**

- **$j=1$ ($Y[1] = "h"$):**  
  $X[1] = h, \; Y[1] = h$ → match (costo 0)
  $$
  D(1,1) = \min \{ D(0,1)+1, \; D(1,0)+1, \; D(0,0)+0 \} = \min \{ 2,\, 2,\, 0 \} = 0.
  $$
- **$j=2$ ($Y[2] = "e"$):**  
  $h$ vs $e$ → sostituzione (costo 1)
  $$
  D(1,2) = \min \{ D(0,2)+1, \; D(1,1)+1, \; D(0,1)+1 \} = \min \{ 3,\, 1,\, 2 \} = 1.
  $$
- **$j=3$ ($Y[3] = "y"$):**  
  $h$ vs $y$ → sostituzione (costo 1)
  $$
  D(1,3) = \min \{ D(0,3)+1, \; D(1,2)+1, \; D(0,2)+1 \} = \min \{ 4,\, 2,\, 3 \} = 2.
  $$

La matrice diventa:

$$
\begin{array}{c|cccc}
      & 0 & 1 & 2 & 3 \\ \hline
0     & 0 & 1 & 2 & 3 \\
1     & 1 & 0 & 1 & 2 \\
2     & 2 &   &   &   \\
3     & 3 &   &   &   \\
4     & 4 &   &   &   \\
5     & 5 &   &   &   \\
\end{array}
$$

#### **Riga $i=2$ ($X[2] = "e"$):**

- **$j=1$ ($Y[1] = "h"$):**  
  $e$ vs $h$ → sostituzione (costo 1)
  $$
  D(2,1) = \min \{ D(1,1)+1, \; D(2,0)+1, \; D(1,0)+1 \} = \min \{ 1,\, 3,\, 2 \} = 1.
  $$
- **$j=2$ ($Y[2] = "e"$):**  
  $e$ vs $e$ → match (costo 0)
  $$
  D(2,2) = \min \{ D(1,2)+1, \; D(2,1)+1, \; D(1,1)+0 \} = \min \{ 2,\, 2,\, 0 \} = 0.
  $$
- **$j=3$ ($Y[3] = "y"$):**  
  $e$ vs $y$ → sostituzione (costo 1)
  $$
  D(2,3) = \min \{ D(1,3)+1, \; D(2,2)+1, \; D(1,2)+1 \} = \min \{ 3,\, 1,\, 2 \} = 1.
  $$

La matrice aggiornata:

$$
\begin{array}{c|cccc}
      & 0 & 1 & 2 & 3 \\ \hline
0     & 0 & 1 & 2 & 3 \\
1     & 1 & 0 & 1 & 2 \\
2     & 2 & 1 & 0 & 1 \\
3     & 3 &   &   &   \\
4     & 4 &   &   &   \\
5     & 5 &   &   &   \\
\end{array}
$$

#### **Riga $i=3$ ($X[3] = "l"$):**

- **$j=1$ ($Y[1] = "h"$):**  
  $l$ vs $h$ → sostituzione (costo 1)
  $$
  D(3,1) = \min \{ D(2,1)+1, \; D(3,0)+1, \; D(2,0)+1 \} = \min \{ 2,\, 4,\, 3 \} = 2.
  $$
- **$j=2$ ($Y[2] = "e"$):**  
  $l$ vs $e$ → sostituzione (costo 1)
  $$
  D(3,2) = \min \{ D(2,2)+1, \; D(3,1)+1, \; D(2,1)+1 \} = \min \{ 1,\, 3,\, 2 \} = 1.
  $$
- **$j=3$ ($Y[3] = "y"$):**  
  $l$ vs $y$ → sostituzione (costo 1)
  $$
  D(3,3) = \min \{ D(2,3)+1, \; D(3,2)+1, \; D(2,2)+1 \} = \min \{ 2,\, 2,\, 1 \} = 1.
  $$

La matrice diventa:

$$
\begin{array}{c|cccc}
      & 0 & 1 & 2 & 3 \\ \hline
0     & 0 & 1 & 2 & 3 \\
1     & 1 & 0 & 1 & 2 \\
2     & 2 & 1 & 0 & 1 \\
3     & 3 & 2 & 1 & 1 \\
4     & 4 &   &   &   \\
5     & 5 &   &   &   \\
\end{array}
$$

#### **Riga $i=4$ ($X[4] = "l"$):**

- **$j=1$ ($Y[1] = "h"$):**  
  $l$ vs $h$ → sostituzione (costo 1)
  $$
  D(4,1) = \min \{ D(3,1)+1, \; D(4,0)+1, \; D(3,0)+1 \} = \min \{ 3,\, 5,\, 4 \} = 3.
  $$
- **$j=2$ ($Y[2] = "e"$):**  
  $l$ vs $e$ → sostituzione (costo 1)
  $$
  D(4,2) = \min \{ D(3,2)+1, \; D(4,1)+1, \; D(3,1)+1 \} = \min \{ 2,\, 4,\, 3 \} = 2.
  $$
- **$j=3$ ($Y[3] = "y"$):**  
  $l$ vs $y$ → sostituzione (costo 1)
  $$
  D(4,3) = \min \{ D(3,3)+1, \; D(4,2)+1, \; D(3,2)+1 \} = \min \{ 2,\, 3,\, 2 \} = 2.
  $$

La matrice diventa:

$$
\begin{array}{c|cccc}
      & 0 & 1 & 2 & 3 \\ \hline
0     & 0 & 1 & 2 & 3 \\
1     & 1 & 0 & 1 & 2 \\
2     & 2 & 1 & 0 & 1 \\
3     & 3 & 2 & 1 & 1 \\
4     & 4 & 3 & 2 & 2 \\
5     & 5 &   &   &   \\
\end{array}
$$

#### **Riga $i=5$ ($X[5] = "o"$):**

- **$j=1$ ($Y[1] = "h"$):**  
  $o$ vs $h$ → sostituzione (costo 1)
  $$
  D(5,1) = \min \{ D(4,1)+1, \; D(5,0)+1, \; D(4,0)+1 \} = \min \{ 4,\, 6,\, 5 \} = 4.
  $$
- **$j=2$ ($Y[2] = "e"$):**  
  $o$ vs $e$ → sostituzione (costo 1)
  $$
  D(5,2) = \min \{ D(4,2)+1, \; D(5,1)+1, \; D(4,1)+1 \} = \min \{ 3,\, 5,\, 4 \} = 3.
  $$
- **$j=3$ ($Y[3] = "y"$):**  
  $o$ vs $y$ → sostituzione (costo 1)
  $$
  D(5,3) = \min \{ D(4,3)+1, \; D(5,2)+1, \; D(4,2)+1 \} = \min \{ 3,\, 4,\, 3 \} = 3.
  $$

La matrice finale è:

$$
\begin{array}{c|cccc}
      & 0 & 1 & 2 & 3 \\ \hline
0     & 0 & 1 & 2 & 3 \\
1     & 1 & 0 & 1 & 2 \\
2     & 2 & 1 & 0 & 1 \\
3     & 3 & 2 & 1 & 1 \\
4     & 4 & 3 & 2 & 2 \\
5     & 5 & 4 & 3 & 3 \\
\end{array}
$$

La **distanza di modifica minima** tra "hello" e "hey" è dunque $D(5,3) = 3$.

#### 3. Backtracking per l'Allineamento Ottimale

Si parte da $D(5,3)$ e si risale seguendo i puntatori (cioè, scegliendo la mossa che ha prodotto il valore corrente):

1. **Da $D(5,3) = 3$:**  
   Possibili mosse:

   - Da $D(4,3)$: $2 + 1 = 3$
   - Da $D(5,2)$: $3 + 1 = 4$
   - Da $D(4,2)$: $2 + 1 = 3$  
   *Scelta:* Movimento diagonale da $D(4,2)$ (operazione di **sostituzione**: $X[5] = \text{"o"}$ sostituito con $Y[3] = \text{"y"}$).

2. **Da $D(4,2) = 2$:**  
   Possibili mosse:

   - Da $D(3,2)$: $1 + 1 = 2$
   - Da $D(4,1)$: $3 + 1 = 4$
   - Da $D(3,1)$: $2 + 1 = 3$  
   *Scelta:* Movimento dall'alto da $D(3,2)$ (operazione di **cancellazione**: eliminazione di $X[4] = \text{"l"}$).

3. **Da $D(3,2) = 1$:**  
   Possibili mosse:

   - Da $D(2,2)$: $0 + 1 = 1$
   - Da $D(3,1)$: $2 + 1 = 3$
   - Da $D(2,1)$: $1 + 1 = 2$  
   *Scelta:* Movimento dall'alto da $D(2,2)$ (operazione di **cancellazione**: eliminazione di $X[3] = \text{"l"}$).

4. **Da $D(2,2) = 0$:**  
   $X[2] = \text{"e"}$ e $Y[2] = \text{"e"}$ corrispondono → **match**.  
   *Movimento:* Diagonale a $D(1,1)$.

5. **Da $D(1,1) = 0$:**  
   $X[1] = \text{"h"}$ e $Y[1] = \text{"h"}$ corrispondono → **match**.  
   *Movimento:* Diagonale a $D(0,0)$.

**Sintesi delle operazioni (dal fondo verso l'inizio):**

- $D(1,1)$: **Match**: "h" con "h".
- $D(2,2)$: **Match**: "e" con "e".
- $D(3,2)$: **Cancellazione**: eliminazione di $X[3] = \text{"l"}$.
- $D(4,2)$: **Cancellazione**: eliminazione di $X[4] = \text{"l"}$.
- $D(5,3)$: **Sostituzione**: $X[5] = \text{"o"}$ sostituito da $Y[3] = \text{"y"}$.

#### 4. Allineamento Finale

Ricostruendo l'allineamento in ordine corretto:

$$
\begin{array}{cccccc}
\textbf{X:} & h & e & l & l & o \\
\textbf{Y:} & h & e & - & - & y \\
\end{array}
$$

Dove:

- Le lettere "h" ed "e" corrispondono.
- I due "l" in "hello" (posizioni 3 e 4) sono state **cancellate** (allineate a gap).
- La lettera "o" è stata **sostituita** con "y".

Il **punteggio finale** (distanza di modifica) è **3**.

Questo esempio mostra in dettaglio l'esecuzione dell'algoritmo per il calcolo della distanza di modifica minima e come, tramite backtracking, si ottiene l'allineamento ottimale tra "hello" e "hey".

## Weighted Minimum Edit Distance

Nel contesto della correzione ortografica, alcune lettere sono più soggette ad errori di battitura rispetto ad altre. Il Weighted Minimum Edit Distance assegna costi variabili alle operazioni di modifica per riflettere queste differenze, migliorando così l'accuratezza della correzione.

**Schemi di Costi:**

| Operazione    | Costo Standard | Costo Ponderato | Spiegazione                                       |
|---------------|----------------|-----------------|---------------------------------------------------|
| Inserimento   | 1              | 1               | Costo base per aggiungere un carattere.           |
| Cancellazione | 1              | 1               | Costo base per rimuovere un carattere.            |
| Sostituzione  | 1              | 2               | Maggiore costo per lettere meno frequentemente sbagliate, riflettendo la probabilità di errore. |
| Trasposizione | Non supportata | 1               | Inversione di caratteri adiacenti.                |

**Esempio con Costi Ponderati:**

```text
Parola errata: "acesp"
Correzione candidata: "access"
  - Inserisci "c"  → Costo: 1
  - Sostituisci "p" con "s"  → Costo: 2
Totale: 1 + 2 = 3
```

## Applicazioni Pratiche

### 1. Correzione Ortografica in Motori di Ricerca

**Funzionamento:**

1. Genera candidati con MED ≤ 2 (es. "graffe" → "giraffe", "graft").
2. Classifica utilizzando la frequenza nel corpus (es. "giraffe" è più comune di "graft").
3. Aggiunge correzioni contestuali (es. "there" → "three" se seguito da un numero).

### 2. Allineamento di Sequenze Genomiche

**Esempio:**
```text
Sequenza 1: AGGCTATCACCTGACCTCCAGGCCGATGCCC
Sequenza 2: TAGCTATCACGACCGCGGTCGATTTGCCCGAC
```
```text
-AGGCTATCACCTGACCTCCAGGCCGA--TGCCC---
TAG-CTATCAC--GACCGC--GGTCGATTTGCCCGAC
```

## Limitazioni e Migliorie

### Limitazioni del MED
- Ignora il contesto semantico (es. "their" vs "there" hanno MED = 0 ma significati diversi).
- Non gestisce errori fonetici (es. "phish" vs "fish").

### Migliorie Proposte
- Costi basati sulla tastiera (es. sostituzioni tra tasti vicini).
- Modelli ibridi (es. combinare MED con modelli neurali come BERT).
- Algoritmi fonetici avanzati (es. Metaphone per gestire omofoni).

## Riferimenti e Letture Consigliate
- Kukich, K. (1992)
- Damerau, F. J. (1964)
- Wagner, R. A. e Fischer, M. J. (1974)
