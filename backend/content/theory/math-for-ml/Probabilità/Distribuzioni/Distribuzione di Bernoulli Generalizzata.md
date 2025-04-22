La **distribuzione di Bernoulli generalizzata** è una versione estesa della [[Distribuzione di Bernoulli |distribuzione di Bernoulli]] classica. A differenza della Bernoulli classica, che ha solo due esiti possibili (successo e fallimento), la distribuzione di Bernoulli generalizzata consente più esiti. Sebbene mantenga la struttura di base di un esperimento con esiti discreti, offre maggiore flessibilità in alcune applicazioni, come quelle che coinvolgono variabili aleatorie con un numero maggiore di esiti.

---

## Definizione

Una variabile aleatoria $X$ segue una distribuzione di Bernoulli generalizzata se i suoi possibili valori sono da un insieme finito $S = \{x_1, x_2, \dots, x_k\}$ con probabilità $p_i$ associate ad ogni valore $x_i$ per $i = 1, 2, \dots, k$. La probabilità totale deve essere 1:

$$
\sum_{i=1}^{k} p_i = 1
$$

Notazione: $$X \sim \text{Bernoulli Generale}(p_1, p_2, \dots, p_k)$$

---

## Proprietà

1. **Valore atteso**:
   $$
   \mathbb{E}[X] = \sum_{i=1}^{k} p_i x_i
   $$
   Il valore atteso è la media ponderata degli esiti, con i pesi dati dalle probabilità $p_i$.

2. **Varianza**:
   $$
   \text{Var}(X) = \sum_{i=1}^{k} p_i (x_i - \mathbb{E}[X])^2
   $$

3. **Moda**:
   La moda è l'esito $x_i$ che ha la probabilità massima, ossia:
   $$
   \text{Moda}(X) = \arg \max_{i} \{ p_i \}
   $$

4. **Funzione generatrice dei momenti (MGF)**:
   $$
   M_X(t) = \sum_{i=1}^{k} p_i e^{t x_i}
   $$

5. **Funzione caratteristica**:
   $$
   \varphi_X(t) = \sum_{i=1}^{k} p_i e^{it x_i}
   $$

---

## Interpretazione intuitiva

La distribuzione di Bernoulli generalizzata può essere utilizzata per modellare esperimenti con più di due possibili esiti, come:

- **Lancio di un dado**: Ogni faccia del dado può essere rappresentata come un esito con probabilità di $p_1, p_2, \dots, p_6$ per ciascun numero da 1 a 6.
- **Risultato di una domanda a scelta multipla**: Ogni risposta possibile ha una probabilità associata.
- **Sistemi con più di due stati**: Ad esempio, nel caso di un sistema elettronico che può trovarsi in più stati di funzionamento (es. acceso, spento, in standby, ecc.).

---

## Relazioni con altre distribuzioni

- **Distribuzione Multinomiale**: Se si effettuano più esperimenti di Bernoulli generalizzata con variabili indipendenti, la distribuzione congiunta può essere descritta da una distribuzione multinomiale.
  
- **Distribuzione di Poisson Generalizzata**: Una generalizzazione della distribuzione di Poisson che consente più esiti discreti, simile alla Bernoulli generalizzata, ma per eventi che accadono in un intervallo di tempo o spazio continuo.

---

## Esempio pratico

Consideriamo un esperimento con tre possibili esiti: "Successo" ($x_1 = 1$), "Nessun cambiamento" ($x_2 = 0$) e "Fallimento" ($x_3 = -1$). Le probabilità associate sono $p_1 = 0.4$, $p_2 = 0.3$ e $p_3 = 0.3$. La distribuzione di Bernoulli generalizzata in questo caso avrà:

- **Valore atteso**:  
  $$
  \mathbb{E}[X] = (0.4)(1) + (0.3)(0) + (0.3)(-1) = 0.1
  $$

- **Varianza**:  
  $$
  \text{Var}(X) = (0.4)(1 - 0.1)^2 + (0.3)(0 - 0.1)^2 + (0.3)(-1 - 0.1)^2 = 0.47
  $$

---

## Conclusione

La distribuzione di Bernoulli generalizzata estende il concetto di distribuzione di Bernoulli per esperimenti con più esiti possibili. È utile in una varietà di applicazioni, come modelli di sistemi con molteplici stati o esperimenti a più scelte. Sebbene la Bernoulli classica rimanga una base fondamentale, la versione generalizzata permette di affrontare situazioni più complesse.
