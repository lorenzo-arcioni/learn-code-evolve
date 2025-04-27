# 🎲 Algoritmo CKY Probabilistico (PCKY)

L'algoritmo **CKY Probabilistico** (PCKY) è una variante avanzata dell'algoritmo CKY classico che introduce **probabilità** per selezionare l'analisi sintattica più plausibile di una frase. Utilizza una **Probabilistic Context-Free Grammar (PCFG)** e combina programmazione dinamica con tecniche di massimizzazione delle probabilità.

## 📊 Cos'è una PCFG?

Una **Probabilistic Context-Free Grammar** assegna a ogni regola di produzione una probabilità, con due vincoli fondamentali:
1. Per ogni non-terminale $A$, la somma delle probabilità di tutte le regole con $A$ a sinistra deve essere 1:
   $$
   \sum_{\alpha} P(A \rightarrow \alpha) = 1
   $$
2. La grammatica deve essere in **Forma Normale di Chomsky (CNF)**.

## 🧮 Struttura della Tabella PCKY

La tabella è una matrice triangolare superiore di dimensioni $(n+1) \times (n+1)$, dove ogni cella `table[i][j]` contiene:
- **Non-terminali** con la **probabilità massima** di generare la sottostringa da $i$ a $j$.
- **Backpointers** per ricostruire l'albero di derivazione ottimale.

### Formato di una cella:
$$
table[i][j][A] = 
\begin{cases} 
\text{probabilità massima} & \text{se } A \text{ genera } w_i \dots w_{j-1} \\
\text{backpointer } (k, B, C) & \text{indici e simboli per la ricostruzione}
\end{cases}
$$

**Esempio di tabella per "John loves Mary":**
|       | 0                  | 1                  | 2                  | 3                    |
|-------|--------------------|--------------------|--------------------|----------------------|
| **0** | -                  | `NP: 0.3`          | ∅                  | `S: 0.1512`          |
| **1** | -                  | -                  | `V: 1.0`           | `VP: 0.63`           |
| **2** | -                  | -                  | -                  | `NP: 0.7`            |
| **3** | -                  | -                  | -                  | -                    |

## 🔍 Meccanismo del PCKY: Tre Fasi Chiave

### 1. **Inizializzazione (Terminali)**
Per ogni parola $w_j$ nella posizione $j$:
- Per ogni regola terminale $A \rightarrow w_j$ con probabilità $p$:
  - Imposta $table[j-1][j][A] = p$  
  - Esempio: Se $NP \rightarrow \text{John}\ [0.3]$, allora $table[0][1][NP] = 0.3$.

### 2. **Combinazione (Regole Binarie)**
Per ogni sottostringa di lunghezza $l \geq 2$ e posizione iniziale $i$:
- Per ogni punto di split $k$ tra $i+1$ e $j-1$:
  - Per ogni coppia di non-terminali $(B, C)$ in $table[i][k]$ e $table[k][j]$:
    - Calcola la probabilità **congiunta**:
      $$
      P_{\text{new}} = P(B) \times P(C) \times P(A \rightarrow B\ C)
      $$
    - Se $P_{\text{new}} > P(A) \text{ corrente in } table[i][j]$, aggiorna la cella.

### 3. **Selezione della Probabilità Massima**
Mantieni solo la **probabilità massima** per ogni non-terminale $A$ in $table[i][j]$, registrando il backpointer $(k, B, C)$ che ha generato il valore.

## 📜 Pseudocodice Formale del PCKY

$$
\begin{array}{ll}
\textbf{function } \text{PCKY-Parse}(words, \text{PCFG}) \rightarrow \text{table} \\[1em]
1. & n \leftarrow \text{length}(words) \\
2. & \text{Inizializza } table[0 \dots n][0 \dots n] \text{ come mappa vuota} \\
3. & \\
4. & \textbf{for } j = 1 \text{ to } n \textbf{ do} \quad \triangleright \text{Inizializzazione terminali} \\
5. & \quad \textbf{for each } (A \rightarrow words[j-1]) \in \text{PCFG} \textbf{ do} \\
6. & \quad \quad table[j-1][j][A] \leftarrow \{ \text{prob: } P(A \rightarrow words[j-1]), \text{ back: } \emptyset \} \\
7. & \\
8. & \textbf{for } l = 2 \text{ to } n \textbf{ do} \quad \triangleright \text{Sottostringhe di lunghezza } l \\
9. & \quad \textbf{for } i = 0 \text{ to } n - l \textbf{ do} \\
10. & \quad \quad j \leftarrow i + l \\
11. & \quad \quad \textbf{for } k = i + 1 \text{ to } j - 1 \textbf{ do} \quad \triangleright \text{Tutti i possibili split} \\
12. & \quad \quad \quad \textbf{for each } B \in table[i][k] \textbf{ do} \\
13. & \quad \quad \quad \quad \textbf{for each } C \in table[k][j] \textbf{ do} \\
14. & \quad \quad \quad \quad \quad \textbf{for each } (A \rightarrow B\ C) \in \text{PCFG} \textbf{ do} \\
15. & \quad \quad \quad \quad \quad \quad p_{\text{new}} \leftarrow table[i][k][B].\text{prob} \times table[k][j][C].\text{prob} \times P(A \rightarrow B\ C) \\
16. & \quad \quad \quad \quad \quad \quad \textbf{if } p_{\text{new}} > table[i][j].\text{get}(A, 0) \textbf{ then} \\
17. & \quad \quad \quad \quad \quad \quad \quad table[i][j][A] \leftarrow \{ \text{prob: } p_{\text{new}}, \text{ back: } (k, B, C) \} \\
18. & \\
19. & \textbf{return } table
\end{array}
$$

### Spiegazione dello Pseudocodice
- **Righe 4-6**: Inizializzazione delle celle diagonali con le probabilità delle regole terminali.
- **Righe 8-17**: Riempimento della tabella per sottostringhe di lunghezza crescente:
  - Per ogni split point $k$, combina le probabilità dei non-terminali $B$ e $C$.
  - Calcola la probabilità congiunta e aggiorna la cella solo se supera il valore corrente.

## 📘 Esempio Dettagliato: "John loves Mary"

### Grammatica PCFG:
$$
\begin{align*}
S   & \rightarrow NP\ VP \quad [1.0] \\
NP  & \rightarrow \text{John} \quad [0.3] \\
NP  & \rightarrow \text{Mary} \quad [0.7] \\
VP  & \rightarrow V\ NP \quad [0.9] \\
VP  & \rightarrow V \quad [0.1] \\
V   & \rightarrow \text{loves} \quad [1.0]
\end{align*}
$$


### Fase 1: Inizializzazione
Riempimento delle celle diagonali con regole terminali:

| Cella       | Contenuto                     | Regola Applicata          |
|-------------|-------------------------------|---------------------------|
| `table[0][1]` | `NP: 0.3`                    | $NP \rightarrow \text{John}$ |
| `table[1][2]` | `V: 1.0`                     | $V \rightarrow \text{loves}$ |
| `table[2][3]` | `NP: 0.7`                    | $NP \rightarrow \text{Mary}$ |

### Fase 2: Combinazione per `table[1][3]` ("loves Mary")
- **Split point**: $k = 2$
- **Componenti**:
  - $B = V$ (probabilità: $1.0$ da `table[1][2]`)
  - $C = NP$ (probabilità: $0.7$ da `table[2][3]`)
- **Regola applicata**: $VP \rightarrow V\ NP$ con $P = 0.9$

$$
P_{\text{new}} = P(V) \times P(NP) \times P(VP \rightarrow V\ NP) = 1.0 \times 0.7 \times 0.9 = 0.63
$$

**Aggiornamento**: $table[1][3] = VP: 0.63$

### Fase 3: Combinazione per `table[0][3]` ("John loves Mary")
- **Split point**: $k = 1$
- **Componenti**:
  - $B = NP$ (probabilità: $0.3$ da `table[0][1]`)
  - $C = VP$ (probabilità: $0.63$ da `table[1][3]`)
- **Regola applicata**: $S \rightarrow NP\ VP$ con $P = 1.0$

$$
P_{\text{new}} = P(NP) \times P(VP) \times P(S \rightarrow NP\ VP) = 0.3 \times 0.63 \times 1.0 = 0.189
$$

**Aggiornamento**: $table[0][3] = S: 0.189$

### Tabella Finale:

|       | 0                  | 1                  | 2                  | 3                    |
|-------|--------------------|--------------------|--------------------|----------------------|
| **0** | -                  | `NP: 0.3`          | ∅                  | `S: 0.189`           |
| **1** | -                  | -                  | `V: 1.0`           | `VP: 0.63`           |
| **2** | -                  | -                  | -                  | `NP: 0.7`            |
| **3** | -                  | -                  | -                  | -                    |


## 🔄 Differenze Chiave dal CKY Classico

| Caratteristica          | CKY Classico                          | PCKY Probabilistico                     |
|-------------------------|---------------------------------------|-----------------------------------------|
| **Contenuto celle**     | Insiemi di non-terminali              | Probabilità + backpointers              |
| **Obiettivo**           | Verifica grammaticalità               | Selezione albero più probabile          |
| **Regole**              | CNF standard                          | PCFG in CNF                             |
| **Complessità**         | $O(n^3 \cdot |G|)$                    | $O(n^3 \cdot |G|^3)$ (per backpointers)|
| **Ambiguità**           | Restituisce tutte le opzioni           | Sceglie l'opzione con probabilità max   |

## ⚠️ Limitazioni Pratiche

1. **Indipendenza delle Regole**: Le PCFG assumono che le regole siano indipendenti, il che non è realistico in linguaggio naturale.
   - Esempio: La scelta tra "NP → John" e "NP → Mary" non dipende dal contesto.

2. **Addestramento**: Richiede un **albero sintattico annotato** per stimare le probabilità, operazione costosa.

3. **Underflow Numerico**: Le probabilità moltiplicate diventano rapidamente piccole. Soluzione: Usare **log-probabilità**:
   $$
   \log(P_{\text{new}}) = \log(P(B)) + \log(P(C)) + \log(P(A \rightarrow B\ C))
   $$

## 🏆 Applicazioni Pratiche

- **Disambiguazione sintattica**:  
  *"He saw the girl with the telescope"* → Decide se "with the telescope" modifica "saw" o "girl".

- **Machine Translation**: Seleziona l'analisi sorgente più plausibile per generare una traduzione corretta.

- **Information Extraction**: Identifica relazioni (soggetto, oggetto) in frasi complesse.
