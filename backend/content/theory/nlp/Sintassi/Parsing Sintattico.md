# Parsing Sintattico

## Introduzione

**Definizione**  
Fare *parsing sintattico* significa riconoscere una frase e assegnarle una struttura sintattica. 

> In inglese: **Syntactic Parsing**

## Perché fare il parsing di una frase?

- **Controllo grammaticale**  
  Applicazioni per il controllo ortografico e grammaticale.  
  *Esempio*: Un parser segnala l’errore in "He are student".

- **Analisi semantica**  
  Serve come base per l’analisi semantica.  
  *Esempio*: In "He eats sushi", il parser identifica "eats" come verbo principale.

- **Question Answering**  
  Per rispondere ad una domanda è necessario almeno identificare:
  - il **soggetto** (es. *what books*)
  - il **verbo principale** (*write*)
  - l’**aggiunto da-agentivo** (*Raymond Queneau*)

- **Traduzione automatica**  
  Fornisce una struttura sintattica coerente da cui generare la traduzione.  
  *Esempio*: "The cat sleeps" → "Il gatto dorme"

## Parsing Costitutivo

Si esplora lo **spazio dei possibili alberi sintattici** per trovare il migliore dato un input.

### Vincoli

1. **Vincolo sui dati**  
   Un albero per una frase di $k$ parole deve avere **$k$ foglie**.  
   *Esempio*: "He runs" → foglie: "He", "runs"

2. **Vincolo grammaticale**  
   L’albero deve avere **una sola radice**.  
   *Esempio*: "He is a student" → radice unica $S$

## Strategie di parsing

### Top-down (goal-directed)

Parte dalla radice $S$ ed espande ricorsivamente secondo la grammatica:

$$
\begin{align*}
  N &= \{ S, NP, Nom, VP, PP, Det, Noun, Verb, Adjective, Pronoun, Proper\text{-}Noun, Preposition \} \\
  T &= \{\text{me}, \text{I}, \text{he}, \text{you}, \text{it}, \text{him}, \text{her}, \text{Rome}, \text{Sapienza}, \\
    &\quad \text{a}, \text{an}, \text{the}, \text{student}, \text{researcher}, \text{research}, \text{am}, \text{is}, \\
    &\quad \text{bright}, \text{from}, \text{to}, \text{on}, \text{in}, \text{near}, \text{at}, \text{and}, \text{or}, \text{but} \} \\
  P &= \{ \\
  &\quad S \rightarrow NP\ VP, \\
  &\quad NP \rightarrow Pronoun \mid Proper\text{-}Noun \mid Det\ Nom, \\
  &\quad Nom \rightarrow Nom\ Noun \mid Noun, \\
  &\quad VP \rightarrow Verb \mid Verb\ NP \mid Verb\ NP\ PP \mid Verb\ PP, \\
  &\quad PP \rightarrow Preposition\ NP, \\
  &\quad Noun \rightarrow \text{student} \mid \text{researcher} \mid \text{research}, \\
  &\quad Verb \rightarrow \text{am} \mid \text{is}, \\
  &\quad Adjective \rightarrow \text{bright}, \\
  &\quad Pronoun \rightarrow \text{me} \mid \text{I} \mid \text{he} \mid \text{you} \mid \text{it} \mid \text{him} \mid \text{her}, \\
  &\quad Proper\text{-}Noun \rightarrow \text{Rome} \mid \text{Sapienza}, \\
  &\quad Det \rightarrow \text{the} \mid \text{a} \mid \text{an}, \\
  &\quad Preposition \rightarrow \text{from} \mid \text{to} \mid \text{on} \mid \text{in} \mid \text{near} \mid \text{at}, \\
  &\quad Conjunction \rightarrow \text{and} \mid \text{or} \mid \text{but} \\
  \} \\
  S &= S
\end{align*}
$$

Di seguito, una semplice rappresentazione del parsing di un albero sintattico per la frase "He is a student in Rome" con la radice $S$:

<img src="/static/images/tikz/7200215fa19bbd707ac9891c4d6c6ab1.svg" style="width: 100%; height: auto; max-height: 600px;" class="tikz-svg" />
<img src="/static/images/tikz/7cc05607c592465f3113ea1f1ee35ee5.svg" style="width: 100%; height: auto; max-height: 600px;" class="tikz-svg" />
<img src="/static/images/tikz/6239c84d96fda5387fc44fd46339f2ce.svg" style="width: 100%; height: auto; max-height: 600px;" class="tikz-svg" />
<img src="/static/images/tikz/d5356d9e4104dbad6d82d2eb0918bb0f.svg" style="width: 100%; height: auto; max-height: 600px;" class="tikz-svg" />
<img src="/static/images/tikz/2a401a786f2da83f56ba6c461a97801c.svg" style="width: 100%; height: auto; max-height: 600px;" class="tikz-svg" />


### Bottom-up (data-directed)

Parte dalle parole e risale combinando in costituenti.

<img src="/static/images/tikz/349b24732100c60715dc4c8fe8a1926b.svg" style="width: 100%; height: auto; max-height: 600px;" class="tikz-svg" />
<img src="/static/images/tikz/15c5cf38b9e0e2ffa3777e1ed08f676d.svg" style="width: 100%; height: auto; max-height: 600px;" class="tikz-svg" />
<img src="/static/images/tikz/333a97a7d26529a4069e5875d3575a43.svg" style="width: 100%; height: auto; max-height: 600px;" class="tikz-svg" />
<img src="/static/images/tikz/7744a28b8344e8400ac22de97145da55.svg" style="width: 100%; height: auto; max-height: 600px;" class="tikz-svg" />
<img src="/static/images/tikz/87cf67ee1eb82df05562fb76c2a393fa.svg" style="width: 100%; height: auto; max-height: 600px;" class="tikz-svg" />
<img src="/static/images/tikz/b1d832ebd8334f4f81304993876f8160.svg" style="width: 100%; height: auto; max-height: 600px;" class="tikz-svg" />

## Ambiguità strutturale

Un’importante sfida nel parsing sintattico è la **presenza di più alberi possibili per una stessa frase**, ossia *ambiguità strutturale*.

### Esempio classico

**Frase**:  
> "He saw the man with the telescope"

Questa frase ha **due interpretazioni** sintattiche distinte:

1. **Interpretazione 1** – *Ha visto l’uomo con il telescopio* (cioè, l’uomo ha il telescopio)  
   → Il sintagma preposizionale "with the telescope" si collega al **nome "man"**

2. **Interpretazione 2** – *Ha visto (con il telescopio) l’uomo*  
   → Il sintagma preposizionale "with the telescope" si collega al **verbo "saw"**

### Implicazioni

- Queste ambiguità sono comuni in linguaggio naturale.
- Rappresentano un ostacolo per i parser sintattici deterministici.
- In NLP, è spesso necessario ricorrere a **modelli probabilistici** o **contesto semantico** per risolverle.

Anche se una frase non è ambigua globalmente, può essere ambigua localmente, e può essere computazionalmente costosa risolverla. Come ad esempio:

**Frase**:  
> "Book that flight"

- La frase non è ambigua globalmente.
- Quando il parser vede la parola *Book* non sa se si tratta di un verbo o un nome, per cui non riesce a decidere la sua [Part-of-Speech Tagging|PoS] corretta.

## Approccio Backtracking nel Parsing

Uno degli approcci più semplici per il parsing sintattico è il **backtracking**, in cui si esplorano **tutte le possibili derivazioni** della frase a partire dalla grammatica, tornando indietro ogni volta che un'analisi si rivela non valida. Esattamente l'approccio utilizzato negli esempi di parsing sintattico (Top-Down e Bottom-Up) precedenti.

### Come funziona

- Si parte dal simbolo iniziale della grammatica.
- Si tenta di derivare la frase applicando le regole grammaticali.
- Se un cammino porta a un vicolo cieco, si torna indietro (*backtrack*) e si prova una derivazione alternativa.

### Svantaggi del backtracking

- È **computazionalmente costoso**, perché in presenza di ambiguità strutturale o grammatiche complesse, il numero di derivazioni può crescere **esponenzialmente**.
- Può causare **ripetizione di lavoro**, esplorando più volte gli stessi sottoproblemi.

### Programmazione dinamica come alternativa

Per superare queste limitazioni, si preferisce usare **algoritmi di parsing basati su programmazione dinamica**, come l’algoritmo **CKY**, che:

- Evita ripetizioni memorizzando i risultati intermedi.
- Riduce il tempo di parsing a **tempo polinomiale** per grammatiche in forma normale di Chomsky (CNF).
- È più adatto per implementazioni efficienti in NLP.

👉 Vedi anche: [[Algoritmo CKY]]

## Conclusioni

Il **parsing sintattico** è un passaggio cruciale nell'analisi del linguaggio naturale, in quanto permette di attribuire una struttura gerarchica e formale alle frasi. In questa nota abbiamo:

- Esplorato cosa siano gli **alberi sintattici** e il loro ruolo nella rappresentazione della struttura delle frasi.
- Analizzato il concetto di **ambiguità strutturale**, evidenziando come una stessa frase possa dare luogo a interpretazioni sintattiche differenti.
- Descritto l'approccio di **backtracking** e i suoi limiti computazionali, motivando la preferenza per tecniche più efficienti come la **programmazione dinamica**.

Comprendere il parsing sintattico non solo è essenziale per applicazioni NLP come l'analisi grammaticale automatica, ma fornisce anche una base teorica solida per comprendere come i computer possano "capire" il linguaggio umano. È un ponte tra la linguistica e l'informatica che dimostra la potenza e la bellezza delle grammatiche formali.
