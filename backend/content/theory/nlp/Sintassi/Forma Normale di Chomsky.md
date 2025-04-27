# Forma Normale di Chomsky (CNF)

La **Forma Normale di Chomsky** (CNF) è una particolare forma di rappresentazione delle **[[Grammatiche Context-free|grammatiche libere dal contesto]]** (CFG), utile in molti algoritmi di analisi sintattica, come l'algoritmo di **[[Algoritmo CKY|Cocke–Younger–Kasami (CYK)]]**.

## Definizione Formale

Una grammatica 

$$
G = (V, \Sigma, R, S)
$$ 

dove:

- $V$ è l'insieme dei simboli *non terminali* (categorie sintattiche come frasi o sintagmi)
- $\Sigma$ è l'insieme dei simboli *terminali* (le parole o i simboli del lessico)
- $R$ è l'insieme delle *produzioni* o *regole* della forma $A \rightarrow B$, con $A \in V$ e $B \in (V \cup \Sigma)^*$. Quindi $R \subseteq V \times (V \cup \Sigma)^*$.
- $S$ è il simbolo iniziale, da cui parte la derivazione. Quindi, $S \in V \land \exists(S, \beta) \in R \land \beta \neq \epsilon$

è in **Forma Normale di Chomsky** se tutte le sue produzioni sono della forma:

- $A \rightarrow BC$ dove $A, B, C \in V$ e $B, C \neq S$ (produzione binaria)
- $A \rightarrow a$ dove $a \in \Sigma$ (produzione terminale)

**Eccezione (solo per il simbolo iniziale):**

- $S \rightarrow \varepsilon$ è permesso **solo se** $\varepsilon \in L(G)$

## Proprietà delle grammatiche in CNF

1. **Equivalenza**: Ogni grammatica libera dal contesto può essere trasformata in una grammatica equivalente in CNF (cioè genera lo stesso linguaggio).

2. **Utilità computazionale**: Le grammatiche in CNF sono fondamentali per l’analisi sintattica algoritmica, in particolare per:
   - Algoritmi di parsing bottom-up come **CYK**
   - Analisi di ambiguità e minimizzazione

3. **Forma standardizzata**: Essendo le produzioni molto restrittive, la CNF è una base utile per dimostrazioni teoriche, come il teorema di Pumping per CFG.

4. **Lunghezza delle derivazioni**: Ogni stringa di lunghezza $n$ derivata da una grammatica in CNF richiede esattamente $2n - 1$ passaggi (produzioni), se $\varepsilon$ non è incluso.

## Algoritmo di conversione in CNF

La conversione di una grammatica $G$ in CNF avviene attraverso una serie di **trasformazioni equivalenti**. Ecco l'algoritmo passo passo:

### Passo 1: Aggiunta di un nuovo simbolo iniziale

Aggiungiamo un nuovo simbolo iniziale $S_0 \notin V$ e la produzione:

$$
S_0 \rightarrow S
$$

Questo assicura che il simbolo iniziale originale non compaia mai a destra di una produzione (utile in seguito).

### Passo 2: Rimozione delle produzioni $\varepsilon$

Per ogni produzione del tipo $A \rightarrow \varepsilon$, rimuovila e:
- Per ogni altra produzione che contiene $A$, aggiungi una versione alternativa della produzione con $A$ rimosso.

Ripeti finché non ci sono più produzioni $\varepsilon$, tranne eventualmente $S_0 \rightarrow \varepsilon$ se necessario.

### Passo 3: Rimozione delle unità

Elimina tutte le produzioni di tipo $A \rightarrow B$, dove $A, B \in V$.

Per ogni $A \rightarrow B$, sostituisci con le produzioni di $B$, cioè aggiungi tutte le produzioni $B \rightarrow \alpha$ come $A \rightarrow \alpha$, finché non ci sono più produzioni unitarie.

### Passo 4: Rimozione dei simboli inutili

Elimina:
1. **Simboli non generativi**: simboli che non portano ad alcuna stringa terminale.
2. **Simboli non raggiungibili**: simboli che non sono raggiunti partendo da $S_0$.

### Passo 5: Conversione delle produzioni

Ora tutte le produzioni devono essere trasformate per rispettare la CNF:

#### a. Terminali in produzioni lunghe

Se una produzione ha terminali con altri simboli, come:

$$
A \rightarrow aB
$$

Sostituisci $a$ con una nuova variabile $X_a$, aggiungendo la produzione:

$$
X_a \rightarrow a
$$

Ora:

$$
A \rightarrow X_a B
$$

Ripeti per ogni terminale non isolato.

#### b. Produzioni con più di due variabili

Se hai produzioni come:

$$
A \rightarrow B C D
$$

Suddividile in binarie introducendo nuove variabili:

$$
A \rightarrow B X_1 \\
X_1 \rightarrow C D
$$

E se necessario:

$$
X_1 \rightarrow C X_2 \\
X_2 \rightarrow D E
$$

Fino ad avere solo produzioni binarie.

## Esempio pratico

### Grammatica originale

$$
S \rightarrow aSb \mid \varepsilon
$$

### Passo 1: Nuovo simbolo iniziale

$$
S_0 \rightarrow S
$$

### Passo 2: Eliminazione $\varepsilon$

Poiché $S \rightarrow \varepsilon$, aggiungiamo:

$$
S \rightarrow aSb \\
S \rightarrow ab
$$

Eliminiamo $S \rightarrow \varepsilon$

### Passo 3: Nessuna produzione unitaria

### Passo 4: Tutti i simboli sono utili

### Passo 5: CNF

Sostituiamo i terminali:

$$
A \rightarrow a \quad B \rightarrow b
$$

Convertiamo:

$$
S \rightarrow aSb \Rightarrow A S B \Rightarrow S \rightarrow A X_1 \\
X_1 \rightarrow S B
$$

$$
S \rightarrow ab \Rightarrow A B
$$

Produzioni finali:

$$
S_0 \rightarrow S \\
S \rightarrow A X_1 \mid A B \\
X_1 \rightarrow S B \\
A \rightarrow a \\
B \rightarrow b
$$

## Conclusioni

Le grammatiche in Forma Normale di Chomsky sono un pilastro dell'informatica teorica e fondamentali per l'analisi sintattica. Comprenderne la trasformazione permette di applicare potenti strumenti algoritmici ai linguaggi formali e allo studio della computabilità.

