# Grammatiche libere dal contesto (CFG)

Le **grammatiche libere dal contesto** (in inglese *Context-Free Grammars*, CFG) sono una sottoclasse delle grammatiche formali ampiamente utilizzata per rappresentare la sintassi dei linguaggi naturali e dei linguaggi di programmazione.

Sono chiamate *libere dal contesto* perché le regole di produzione si applicano indipendentemente dal contesto in cui si trova il simbolo non terminale.

## 📐 Definizione formale

Una grammatica libera dal contesto è una quadrupla:

$$
G = (N, T, P, S)
$$

dove:

- $N$ è l'insieme dei simboli *non terminali* (categorie sintattiche come frasi o sintagmi)
- $T$ è l'insieme dei simboli *terminali* (le parole o i simboli del lessico)
- $P$ è l'insieme delle *produzioni* o *regole* della forma $A \rightarrow \alpha$, con $A \in N$ e $\alpha \in (N \cup T)^*$. Quindi $P \subseteq N \times ((N \cup T)^*)$, con $A \in N$.
- $S$ è il simbolo iniziale, da cui parte la derivazione. Quindi, $S \in N \land \exists(S, \beta) \in P \land \beta = \epsilon$.

## 🧠 Esempio pratico di CFG

Considera la seguente grammatica:

$$
\begin{align*}
  N & = \{ S, NP, Nom, Det, Noun \} \\
  T & = \{ \text{a}, \text{the}, \text{winter}, \text{night} \} \\
  P & = \{\\
  &\quad S     \rightarrow NP,\\
  &\quad NP    \rightarrow Det\ Nom,\\
  &\quad Nom   \rightarrow Noun \mid Nom\ Noun,\\
  &\quad Det   \rightarrow \text{a} \mid \text{the},\\
  &\quad Noun  \rightarrow \text{winter},\\
  &\quad Noun  \rightarrow \text{night}\\
  \}\\
  S & = S
\end{align*}
$$


Con questa grammatica possiamo generare frasi come:

- *the winter*

<img src="/static/images/tikz/0b7274dea633ee2a22e28408698abbb4.svg" style="width: 100%; height: auto; max-height: 600px;" class="tikz-svg" />

- *a night*

<img src="/static/images/tikz/e86264129766ca5c4fb2071894c9d9fe.svg" style="width: 100%; height: auto; max-height: 600px;" class="tikz-svg" />

- *the winter night*

<img src="/static/images/tikz/7dde49430529afeb60ef72caf403ac76.svg" style="width: 100%; height: auto; max-height: 600px;" class="tikz-svg" />

## Linguaggio generato da una grammatica ($L(G)$)

Il linguaggio generato da una grammatica $G = (N, T, P, S)$ è definito come:

$$
L(G) = \{ w \in T^* \mid S \Rightarrow^{*} w \}
$$

Ovvero: l'insieme di tutte le stringhe composte solo da simboli terminali che possono essere derivate dal simbolo iniziale $S$, applicando una sequenza di produzioni.

Se $G$ è una grammatica libera dal contesto, allora $L(G)$ è un **linguaggio libero dal contesto**.

## Forma Normale di Chomsky (CNF)

Una grammatica è in **forma normale di Chomsky (Chomsky Normal Form)** se tutte le produzioni hanno una delle due forme seguenti:

- $A \rightarrow B\ C$, con $A, B, C \in N$
- $A \rightarrow a$, con $A \in N, a \in T$

Non sono permesse produzioni vuote ($\epsilon$-free) e la struttura generata è sempre **binaria** (alberi binari).

Qualsiasi grammatica libera dal contesto può essere convertita in una **CNF equivalente** (in modo *weakly equivalent*), ad esempio:

$$
A \rightarrow B\ C\ D \quad \Rightarrow \quad
A \rightarrow B\ X,\quad X \rightarrow C\ D
$$

## Grammatiche a dipendenze

Le **grammatiche a dipendenze** rappresentano le relazioni sintattiche (e talvolta semantiche) tra le parole di una frase, senza l'uso di costituenti frasali (NP, VP...).

- Le produzioni sono **relazioni tra parole**
- Gli archi tra parole sono etichettati (es. `nsubj`, `det`, `dobj`, ...), formando un **grafo orientato**
- Non si utilizzano simboli non terminali

### Vantaggi

- Maggiore flessibilità per lingue con **ordine libero** delle parole (es. italiano, ceco)
- Riduce la complessità delle regole rispetto ai costituenti

### Esempio: *"They did the right thing"*

<img src="/static/images/tikz/454268bba13ecf6c5b8502365372f9c4.svg" style="width: 100%; height: auto; max-height: 600px;" class="tikz-svg" />

### Relazioni sintattiche

Nell'albero disegnato per la frase **"They did the right thing"**, ogni nodo rappresenta una parola e ogni freccia indica una relazione di dipendenza **lessicale** e **sintattica** tra due parole. Le etichette sopra le frecce specificano il tipo di relazione.

- **Nodo principale (radice)**: `did` è il verbo principale della frase e funge da radice dell'albero.
  
- **nsubj (nominal subject)**: `they` è il soggetto nominale del verbo `did`. La freccia va da `did` a `they` con etichetta `nsubj`.

- **dobj (direct object)**: `thing` è il complemento oggetto diretto del verbo `did`. La freccia va da `did` a `thing` con etichetta `dobj`.

- **det (determiner)**: `the` è un determinante (articolo) che modifica il sostantivo `thing`. La freccia va da `thing` a `the` con etichetta `det`.

- **mod (modifier)**: `right` è un modificatore (aggettivo) che specifica ulteriormente `thing`. La freccia va da `thing` a `right` con etichetta `mod`.

#### Struttura gerarchica

- `did` è al vertice dell'albero
  - `they` è collegato come soggetto (`nsubj`)
  - `thing` è collegato come oggetto (`dobj`)
    - `thing` ha come figli `the` (`det`) e `right` (`mod`)

In sintesi, la struttura mostra come **"they"** compie l'azione **"did"**, e l'azione ha come oggetto diretto **"thing"**, che è ulteriormente descritto da **"the"** e **"right"**.

Le strutture delle grammatiche a dipendenze **non dipendono dall'ordine delle parole**.

Questa rappresentazione evita nodi astratti (come NP o VP) e si concentra sulle **relazioni dirette tra le parole**, facilitando l’analisi del significato e l’elaborazione automatica del linguaggio.

## Treebank e Universal Dependencies

- Un **treebank** è un corpus di frasi annotate con alberi di analisi sintattica. L'esempio più noto è il **Penn Treebank**, che include:
  - Wall Street Journal: 1.3 milioni di parole
  - Brown Corpus: 1 milione di parole
  - Switchboard: 1 milione di parole

- Il progetto **[Universal Dependencies](https://universaldependencies.org/)** fornisce:
  - Annotazioni coerenti cross-linguistiche
  - Dati per l'addestramento di parser multilingue
  - Strumenti per il parsing e lo studio della sintassi in più lingue


## 🔍 Utilizzi delle CFG nel NLP

Le grammatiche libere dal contesto sono utili per:

- Analizzare la struttura sintattica delle frasi ([[Parsing sintattico]])
- Costruire [[Treebank]] con annotazioni strutturate
- Implementare algoritmi di parsing come [[Algoritmo CKY (Cocke-Kasami-Younger)]] o [[Algoritmo di Earley]]
- Definire regole di base in linguaggi di programmazione

📌 Le CFG offrono un equilibrio tra espressività e semplicità computazionale, rendendole uno strumento potente ma gestibile nel contesto del trattamento automatico del linguaggio.

[[Grammatiche formali]] → [[Grammatiche libere dal contesto]] → [[Forma normale di Chomsky]] / [[Parsing sintattico]]
