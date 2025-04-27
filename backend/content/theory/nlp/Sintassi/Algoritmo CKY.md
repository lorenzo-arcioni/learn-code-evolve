# 🧠 Algoritmo di Cocke-Kasami-Younger (CKY)

L'algoritmo **Cocke-Kasami-Younger (CKY)** è una tecnica di parsing fondamentale nel campo dell'elaborazione del linguaggio naturale e dell'analisi sintattica. Si tratta di un approccio **bottom-up** che sfrutta la **programmazione dinamica** per verificare se una frase (cioè una sequenza di parole) può essere generata da una grammatica **libera dal contesto**, a condizione che quest’ultima sia espressa in **Forma Normale di Chomsky (CNF)**. 

Esiste anche una versione probabilistica del CKY 👉 [[Algoritmo di CKY Probabilistico]].

## 📌 Cos'è la Forma Normale di Chomsky?

Una [[Grammatiche Formali|grammatica]] è in **Forma Normale di Chomsky** quando tutte le sue produzioni rispettano uno dei seguenti due schemi:
- $A \rightarrow BC$ dove $A$, $B$, e $C$ sono non-terminali (con $B$ e $C$ che non sono il simbolo iniziale).
- $A \rightarrow a$ dove $a$ è un terminale, ovvero una parola del vocabolario.

Questa forma consente di semplificare il parsing grazie a una struttura uniforme delle regole.

## 📐 Struttura della tabella di parsing

Per analizzare una frase composta da $n$ parole, l'algoritmo utilizza una **tabella triangolare superiore** (una matrice concettuale) di dimensioni $(n+1) \times (n+1)$, chiamata $table$.

- Ogni cella $table[i][j]$ contiene **l'insieme dei simboli non-terminali** che possono generare la sottostringa compresa tra le posizioni $i$ e $j$ (esclusa $j$).
- La cella più in alto a sinistra, $table[0][n]$, rappresenta la frase intera.
- Se il simbolo iniziale della grammatica $S$ è presente in $table[0][n]$, allora la frase può essere generata dalla grammatica.

### Esempio
Consideriamo la frase: "John loves Mary". Supponiamo di avere la seguente grammatica in CNF:

$$
\begin{align*}
S  &\rightarrow NP \ VP \\
NP &\rightarrow John \mid Mary \\
VP &\rightarrow VP NP\\
V  &\rightarrow loves
\end{align*}
$$


La tabella $table$ di dimensione $4 \times 4$ (poiché $n = 3$) sarà:

|       | 0 (S)  | 1 (John)       | 2 (loves)        | 3 (Mary)  |
|-------|-----|----------|----------|-----|
| **0** |     | {NP}     |          | {S} |
| **1** |     |          | {V}      | {VP}|
| **2** |     |          |          | {NP}|
| **3** |     |          |          |     |

- $table[0][1] = \{NP\}$ perché $NP \rightarrow John$.
- $table[1][2] = \{V\}$ perché $V \rightarrow loves$.
- $table[2][3] = \{NP\}$ perché $NP \rightarrow Mary$.
- $table[1][3] = \{VP\}$ perché $V \in table[1][2]$ e $NP \in table[2][3]$ con la regola $VP \rightarrow V\ NP$.
- $table[0][3] = \{S\}$ perché $NP \in table[0][1]$ e $VP \in table[1][3]$ con la regola $S \rightarrow NP\ VP$.

Dato che $table[0][3] = \{S\}$, la frase puo essere generata dalla grammatica.

## 💡 Meccanismo di base: costruzione delle strutture sintattiche

L’algoritmo si basa su un principio di composizione: se una regola grammaticale afferma che $A \rightarrow B\ C$, e se riusciamo a suddividere una sottostringa in due parti tali che:
- $B$ genera la prima parte, cioè $B \in table[i][k]$
- $C$ genera la seconda parte, cioè $C \in table[k][j]$

allora possiamo concludere che:
- $A$ genera l’intera sottostringa, quindi $A \in table[i][j]$

Questo approccio è ripetuto per tutte le possibili partizioni della frase, permettendo la costruzione incrementale delle strutture sintattiche.

## 📋 Procedura di riempimento della tabella

1. **Inizializzazione (lunghezza 1)**: Per ogni parola nella frase, si aggiungono i non-terminali che possono generare direttamente quella parola (tramite regole del tipo $A \rightarrow a$).
2. **Espansione (lunghezze maggiori)**: Si analizzano sottostringhe di lunghezza crescente, esaminando tutte le possibili partizioni in due sottosequenze contigue. Per ogni partizione, si cercano coppie di simboli non-terminali già presenti nella tabella che possano essere combinate secondo le regole della grammatica.

Questo processo è eseguito in maniera bottom-up, iniziando dalle sottostringhe più piccole e costruendo via via strutture più complesse.

## 🔁 Pseudocodice dell'algoritmo CKY

Di seguito è riportato uno pseudocodice che illustra il funzionamento dell'algoritmo CKY. L'input è una lista di parole `words` e una grammatica in CNF, mentre l'output è una tabella $table$ che descrive come la frase può essere derivata.

$$
\begin{array}{l}
\textbf{function } \text{CKY-Parse(words, grammar)} \rightarrow \text{return table} \\[1em]
\qquad \textbf{for } j = 1 \text{ to } \texttt{length(words)} \text{ do} \\
\qquad \quad \textbf{for all rules } \{A \mid A \rightarrow \texttt{words}[j] \in \text{grammar}\} \text{ do} \\
\qquad \quad\quad \texttt{table}[j-1][j] \leftarrow \texttt{table}[j-1][j] \cup \{A\} \\[1em]

\qquad \quad \textbf{for } i = j - 2 \text{ down to } 0 \text{ do} \\
\qquad \quad\quad \textbf{for } k = i + 1 \text{ to } j - 1 \text{ do} \\
\qquad \quad\quad\quad \textbf{for all rules } \{A \mid A \rightarrow B\ C  \in \text{grammar}\} \text{ do} \\
\qquad \quad\quad\quad\quad \textbf{if } B \in \texttt{table}[i][k] \text{ and } C \in \texttt{table}[k][j] \text{ then} \\
\qquad \quad\quad\quad\quad\quad \texttt{table}[i][j] \leftarrow \texttt{table}[i][j] \cup \{A\} \\[1em]
 
\qquad \textbf{return } \texttt{table}
\end{array}
$$

### Spiegazione

Per ogni indice $i = 0$ a $n-1$ (dove $n$ è la lunghezza della frase), eseguiamo due fasi:

#### 🧩 Fase 1 — parola singola $w_i$

- Consideriamo la **sottostringa di lunghezza 1** $w_i$
- Per ogni regola terminale della grammatica:
  $$
  A \rightarrow w_i
  $$
  se $w_i$ è il terminale a destra, allora aggiungiamo $A$ in:
  $$
  table[i][i+1] \gets table[i][i+1] \cup \{A\}
  $$

✨ Questa fase classifica ogni parola singola nella sua possibile **categoria grammaticale**.

#### 🧱 Fase 2 — sottostringhe più lunghe che terminano in $w_i$

- Per ogni lunghezza $\ell = 2$ fino a $i+1$:
  - Consideriamo la sottostringa:
    $$
    w_{i - \ell + 1} \dots w_i
    $$
    - Questa sottostringa corrisponde a:
      $$
      table[i - \ell + 1][i+1]
      $$
  - Per ogni punto di divisione interno $k$ con:
    $$
    i - \ell + 1 < k < i+1
    $$
    analizziamo le due sottostringhe:
    $$
    table[i - \ell + 1][k], \quad table[k][i+1]
    $$
    - Per ogni regola binaria della grammatica:
      $$
      A \rightarrow B\,C
      $$
      se $B \in table[i - \ell + 1][k]$ e $C \in table[k][i+1]$, allora:
      $$
      A \in table[i - \ell + 1][i+1]
      $$

In pratica, a ogni passo combiniamo **strutture più piccole** già calcolate, fino a costruire tutte le sottostrutture sintattiche che terminano in $w_i$.

### 🧠 Intuizione dell'algoritmo CKY

L’algoritmo CKY può sembrare inizialmente complicato, ma è in realtà un procedimento **molto logico e sistematico** per capire se una frase può essere generata da una grammatica.

Dato che stiamo assumendo una grammatica in CNF, ogni nodo non terminale avrà al massimo due figli. Quindi, possiamo utilizzare una matrice per descrivere la struttura dell'albero.

#### 🔹 Obiettivo
Costruire una tabella dove ogni cella $table[i][j]$ contiene l'insieme dei simboli non-terminali che possono generare la sottostringa di parole da posizione $i$ a $j$ (escluso $j$). Quindi la cella che rappresenta la frase intera è $table[0][n]$ (solo se è presente il simbolo iniziale alla fine dell'algoritmo).

#### 🔹 Fase 1: Riempimento della diagonale (lunghezza = 1)

Per ogni parola $w_i$ nella frase:

- Cerchiamo tutte le regole del tipo:  
  $$
  A \rightarrow w_i
  $$
- Se la troviamo, mettiamo $A$ nella cella $table[i][i+1]$, perché $A$ è in grado di generare la parola $w_i$.

✨ Questa fase identifica la **categoria grammaticale** di ogni parola.

#### 🔹 Fase 2: Costruzione della tabella (lunghezze > 1)

Per ogni sottostringa di lunghezza $\geq 2$, consideriamo tutte le possibili divisioni della sottostringa in due parti. Per ogni divisione:

1. Supponiamo che:
   $$
   B \in table[i][k] \quad \text{e} \quad C \in table[k][j]
   $$
   cioè che le due parti possano essere generate da $B$ e $C$.

2. Se esiste una regola della grammatica:
   $$
   A \rightarrow B\ C
   $$
   allora possiamo dire che:
   $$
   A \in table[i][j]
   $$
   perché $A$ è in grado di generare l'intera sottostringa da $i$ a $j$.

⚙️ Questa fase **combina strutture più piccole** in strutture più grandi, secondo le regole grammaticali.

#### 🔚 Verifica finale

Alla fine, controlliamo se il simbolo iniziale $S$ si trova in $table[0][n]$. Se sì, allora la frase può essere generata dalla grammatica.

$$
S \in table[0][n] \Rightarrow \text{Frase grammaticalmente corretta}
$$

### 🪄 Metafora intuitiva

Immagina di avere una **torre di blocchi LEGO**, dove ogni blocco è una parola. CKY ti dice come puoi incastrare i blocchi tra loro, seguendo **regole di incastro** (grammatica), per costruire una **torre completa** (la frase intera).

Se riesci a costruire la torre partendo dai singoli pezzi, significa che la frase ha senso secondo la grammatica.

✔️ Ecco perché è così potente: **non indovina** il significato della frase, ma ti dice se la frase è **formalmente corretta**!


## 📘 Esempio
**"Book the flight through Houston"**

Dopo la tokenizzazione e normalizzazione:
$$
w = [ \text{book}, \text{the}, \text{flight}, \text{through}, \text{houston} ]
$$

### 📐 Tabella CKY – struttura iniziale

Costruiamo una tabella triangolare superiore $table[i][j]$ con $n = 5$ parole:

|       | 0   | 1   | 2   | 3   | 4   | 5   |
|-------|-----|-----|-----|-----|-----|-----|
| **0** |     |     |     |     |     |     |
| **1** |     |     |     |     |     |     |
| **2** |     |     |     |     |     |     |
| **3** |     |     |     |     |     |     |
| **4** |     |     |     |     |     |     |
| **5** |     |     |     |     |     |     |

### 🧱 Fase 1 – Inizializzazione con terminali (lunghezza 1)

Riempimento della diagonale con regole $A \rightarrow a$

#### Parola $w_0 = \text{book}$

- $\text{Verb} \rightarrow \text{book} \Rightarrow \text{Verb} \in table[0][1]$
- $\text{VP} \rightarrow \text{book} \Rightarrow \text{VP} \in table[0][1]$
- $\text{Noun} \rightarrow \text{book} \Rightarrow \text{Noun} \in table[0][1]$
- $\text{Nominal} \rightarrow \text{book} \Rightarrow \text{Nominal} \in table[0][1]$

$$
table[0][1] = \{ \text{S}, \text{Verb}, \text{VP}, \text{Nominal}, \text{Noun} \}
$$

#### Parola $w_1 = \text{the}$

- $\text{Det} \rightarrow \text{the} \Rightarrow \text{Det} \in table[1][2]$

$$
table[1][2] = \{ \text{Det} \}
$$

#### Parola $w_2 = \text{flight}$

- $\text{Noun} \rightarrow \text{flight} \Rightarrow \text{Noun} \in table[2][3]$
- $\text{Nominal} \rightarrow \text{flight} \Rightarrow \text{Nominal} \in table[2][3]$

$$
table[2][3] = \{ \text{Noun}, \text{Nominal} \}
$$

#### Parola $w_3 = \text{through}$

- $\text{Preposition} \rightarrow \text{through} \Rightarrow \text{Preposition} \in table[3][4]$

$$
table[3][4] = \{ \text{Preposition} \}
$$

#### Parola $w_4 = \text{houston}$

- $\text{Proper{-}Noun} \rightarrow \text{houston} \Rightarrow \text{Proper{-}Noun} \in table[4][5]$
- $\text{NP} \rightarrow \text{houston} \Rightarrow \text{NP} \in table[4][5]$

$$
table[4][5] = \{ \text{Proper{-}Noun}, \text{NP} \}
$$

### 📐 Tabella CKY — Dopo la Fase 1 (Produzioni Terminali)

|              | book                         | the          | flight              | through         | houston                  |
|--------------|------------------------------|--------------|---------------------|------------------|---------------------------|
| **book**     |                 {S,Verb, VP, Nominal, Noun} |              |                     |                          |
| **the**      |                              | {Det}              |                  |                          |
| **flight**   |                              |                     | {Nominal Noun}  |                          |
| **through**  |                              |                     |                  | {Preposition}            |
| **houston**  |                              |              |                     |                  | {Proper-Noun, NP}        |


### 🧱 Fase 2 – Costruzione bottom-up (lunghezze crescenti)

#### Lunghezza = 2 (diagonale partendo da colonna 2)

**Sottostringa \([0, 2]\): "book the"**

- $\text{Verb} \in table[0][1], \text{Det} \in table[1][2]$
- Regola: Nessuna regola che combina $\{ \text{Verb}, \text{VP}, \text{Noun}, \text{Nominal} \}$ e $\{Det\}$.

$$
table[0][2] = \emptyset
$$

**Sottostringa \([1, 3]\): "the flight"**

- $\text{Det} \in table[1][2], \text{Nominal} \in table[2][3]$
- Regola: $NP \rightarrow Det\ Nominal \Rightarrow NP \in table[1][3]$

$$
table[1][3] = \{ \text{NP} \}
$$

**Sottostringa \([2, 4]\): "flight through"**

- $table[2][3] = \{\text{Nominal}, \text{Noun}\}, \text{Preposition} \in table[3][4]$
- Regola: Nessuna regola che combina $\text{Nominal} \mid \text{Noun}$ e $\text{Preposition}$.

$$
table[2][4] = \emptyset
$$

**Sottostringa \([3, 5]\): "through houston"**

- $\text{Preposition} \in table[3][4], \text{NP} \in table[4][5]$
- Regola: $PP \rightarrow Preposition\ NP \Rightarrow PP \in table[3][5]$

$$
table[3][5] = \{ \text{PP} \}
$$

#### Lunghezza = 3 (diagonale partendo da colonna 3)

**Sottostringa \([0, 3]\): "book the flight"**

Confrontiamo le celle $table[0][1]$ e $table[1][3]$.

- $\text{Verb} \in table[0][1], \text{NP} \in table[1][3]$
- Regola: $S \rightarrow Verb\ NP \Rightarrow S \in table[0][3]$
- Regola: $VP \rightarrow Verb\ NP \Rightarrow VP \in table[0][3]$
- Regola: $X2 \rightarrow Verb\ NP \Rightarrow X2 \in table[0][3]$

Confrontiamo le celle $table[0][2]$ e $table[2][3]$.

- $table[0][2] = \emptyset$, $table[2][3] = \{ \text{Nominal, Noun} \}$
- Regola: Nessuna regola che combina $\emptyset$ e $\text{Nominal} \mid \text{Noun}$.

$$
table[0][3] = \{ \text{S}, \text{VP}, \text{X2} \}
$$

**Sottostringa \([1, 4]\): "the flight trough"**

Confrontiamo le celle $table[1][2]$ e $table[2][4]$.

- $table[1][2] = \{Det\}$, $table[2][4] = \emptyset$
- Regola: Nessuna regola che combina $\{Det\}$ e $\emptyset$.

Confrontiamo le celle $table[1][3]$ e $table[3][4]$.

- $table[1][3] = \{ \text{NP} \}$, $table[3][4] = \{ \text{Preposition} \}$
- Regola: Nessuna regola che combina $\{ \text{NP} \}$ e $\{ \text{Preposition} \}$.

*Da notare che $PP \rightarrow Preposition\ NP$ è diverso da $PP \rightarrow NP\ Preposition$*.

$$
table[1][4] = \emptyset
$$

**Sottostringa \([2, 5]\): "flight through houston"**

- $\text{Nominal} \in table[2][3], \text{PP} \in table[3][5]$
- Regola: $Nominal \rightarrow Nominal\ PP \Rightarrow Nominal \in table[2][5]$
- $table[2][4] = \emptyset$, $table[3][5] = \{ \text{NP}, \text{Proper-Noun} \}$
- Regola: Nessuna regola che combina $\emptyset$ e $\{ \text{NP}, \text{Proper-Noun} \}$.

$$
table[2][5] = \{ \text{Nominal} \}
$$

### Lunghezza = 4

**Sottostringa \([0, 4]\): "the flight through houston"**

Confrontiamo le celle $table[0][1]$ e $table[1][4]$.

- $table[0][1] = \{\text{S}, \text{VP}, \text{Nominal}, \text{Noun}, \text{Verb}\}$, $table[1][4] = \emptyset$
- Regola: Nessuna regola che combina $\{\text{S}, \text{VP}, \text{Nominal}, \text{Noun}, \text{Verb}\}$ e $\emptyset$.

Confrontiamo le celle $table[0][2]$ e $table[2][4]$.

- $table[0][2] = \emptyset$, $table[2][4] = \emptyset$
- Regola: Nessuna regola che combina $\emptyset$ e $\emptyset$.

Confrontiamo le celle $table[0][3]$ e $table[3][4]$.

- $table[0][3] = \{\text{S}, \text{VP}, \text{X2}\}$, $table[3][4] = \{ \text{Preposition} \}$
- Regola: Nessuna regola che combina $\{\text{S}, \text{VP}, \text{X2}\}$ e $\{ \text{Preposition} \}$.

$$
table[0][4] = \emptyset
$$

**Sottostringa \([1, 5]\): "flight through houston"**

Confrontiamo le celle $table[1][2]$ e $table[2][5]$.
- $table[1][2] = \text{Det}$, $table[2][5] = \text{Nominal}$
- Regola: $NP \rightarrow Det \ Nominal \Rightarrow NP \in table[1][5]$.

Confrontiamo le celle $table[1][3]$ e $table[3][5]$.

- $table[1][3] = \{ \text{NP} \}$, $table[3][5] = \{ \text{PP}\}$
- Regola: Nessuna regola che combina $\{ \text{NP} \}$ e $\{ \text{PP}\}$.

Confrontiamo le celle $table[1][4]$ e $table[4][5]$.

- $table[1][4] = \emptyset$, $table[4][5] = \{ \text{NP}, \text{Proper-Noun} \}$
- Regola: Nessuna regola che combina $\emptyset$ e $\text{NP} \mid \text{Proper-Noun}$.

$$
table[1][5] = \{ \text{NP} \}
$$

### Lunghezza = 5

**Sottostringa \([0, 5]\): "book the flight through houston"**

- $Verb \in table[0][1]$, $table[1][5] = \{NP\}$
- Regola: $S \rightarrow Verb\ NP \Rightarrow S \ (S_1) \in table[0][4]$
- Regola: $VP \rightarrow Verb\ NP \Rightarrow VP \in table[0][4]$
- Regola: $X2 \rightarrow Verb\ NP \Rightarrow X2 \in table[0][4]$
- $table[0][2] = \emptyset$, $table[2][5] = \{\text{Nominal}\}$
- Regola: Nessuna regola che combina $\emptyset$ e $\{\text{Nominal}\}$.
- $\text{VP} \in table[0][3], \text{PP} \in table[3][5]$
- Regola: $S \rightarrow VP\ PP \Rightarrow S \ (S_2) \in table[0][5]$
- Regola: $VP \rightarrow VP\ PP \Rightarrow VP \in table[0][5]$
- $\text{X2} \in table[0][3], \text{PP} \in table[3][5]$
- Regola: $S \rightarrow X2\ PP \Rightarrow S \ (S_3) \in table[0][5]$
- Regola: $VP \rightarrow X2\ PP \Rightarrow VP \in table[0][5]$

$$
table[0][5] = \{ \text{S}_1, \text{VP}, \text{X2}, \text{S}_2, \text{S}_3 \}
$$

### 📐 Tabella CKY — Dopo la Fase 2 (stato finale)
|              | book                                  | the          | flight                 | through         | houston                     |
|--------------|----------------------------------------|--------------|-------------------------|------------------|------------------------------|
| **book**     | {S, Verb, VP, Nominal, Noun}           | ∅            | {S, VP, X2}             | ∅                | {S₁, S₂, S₃, VP, X2}         |
| **the**      |                                        | {Det}        | {NP}                    | ∅                | {NP}                           |
| **flight**   |                                        |              | {Nominal, Noun}         | ∅                | {Nominal}                   |
| **through**  |                                        |              |                         | {Preposition}    | {PP}                         |
| **houston**  |                                        |              |                         |                  | {Proper-Noun, NP}           |


### ✅ Conclusione

Poiché il simbolo iniziale $S \in table[0][5]$, la frase:

$$
\text{"book the flight through houston"}
$$

**è grammaticalmente corretta** secondo la grammatica fornita.

✔️ **Frase accettata!**

### Ricaviamo l'albero di derivazione

Basta partire ora dalla prima $S_i$ trovata per costruire l'albero di derivazione:

<img src="/static/images/tikz/8de168a4143ee4725cd1a0829334cf31.svg" style="width: 100%; height: auto; max-height: 600px;" class="tikz-svg" />

## Limiti dell'algoritmo CKY

L'algoritmo CKY (Cocke-Kasami-Younger) presenta alcune limitazioni pratiche che è importante considerare quando si applica a problemi reali di parsing sintattico:

- **Necessità di grammatica in Forma Normale di Chomsky (CNF)**  
  CKY richiede che la grammatica sia espressa in CNF, ovvero tutte le produzioni devono avere la forma:
  - $A \rightarrow BC$ (dove $B$ e $C$ sono simboli non terminali)
  - $A \rightarrow a$ (dove $a$ è un simbolo terminale)

  Questa trasformazione può essere problematica:
  - **Complica l'analisi semantica**, specialmente nei sistemi in cui la struttura sintattica guida l’interpretazione del significato (syntax-driven semantic analysis).
  
- **Soluzione praticabile**  
  Una strategia per superare questa difficoltà consiste nel **conservare abbastanza informazioni** durante la conversione in CNF, in modo da poter **ricostruire gli alberi sintattici originali** una volta completato il parsing.

  Alcuni esempi:
  - È **facile** trattare regole trasformate come:  
    $A \rightarrow BCw \Rightarrow X \rightarrow BC$, $A \rightarrow Xw$  
    dove si introduce un simbolo intermedio $X$ durante la conversione.
  - È invece **più complesso** gestire le **produzioni unitarie** come:  
    $A \rightarrow B$

In sintesi, anche se CKY è teoricamente solido e garantisce completezza per grammatiche in CNF, il costo pratico della trasformazione grammaticale e la perdita di struttura semantica originale rappresentano ostacoli da affrontare con attenzione.

## ✅ Conclusione

L’algoritmo CKY rappresenta un approccio sistematico e rigoroso per determinare la **derivabilità di una frase** da una grammatica in CNF. Grazie all’uso della programmazione dinamica, consente di evitare ridondanze computazionali, garantendo una complessità polinomiale di $O(n^3 \cdot |G|)$, dove $n$ è la lunghezza della frase e $|G|$ è il numero di regole della grammatica.
