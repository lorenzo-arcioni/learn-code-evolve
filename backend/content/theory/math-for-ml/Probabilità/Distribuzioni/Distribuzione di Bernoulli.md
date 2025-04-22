La **distribuzione di Bernoulli** è una distribuzione di probabilità discreta che descrive un esperimento con due possibili esiti: successo (1) o fallimento (0). È uno dei modelli fondamentali della statistica e della teoria della probabilità.

---

## Definizione

Una variabile aleatoria $X$ segue una distribuzione di Bernoulli se assume valori binari con probabilità:

$$
P(X = x) = 
\begin{cases} 
    p & \text{se } x = 1 \\
    1 - p & \text{se } x = 0
\end{cases} \ \ = \ p^x (1-p)^{1-x}
$$

dove $p \in [0,1]$ è la probabilità di successo.

Notazione: $$X \sim \text{Bernoulli}(p)$$

---

## Proprietà

1. **Valore atteso**:
   $$
   \mathbb{E}[X] = p_1 x_1 + \cdots + p_nx_n = p \cdot 1 + (1-p) \cdot 0 = p
   $$
   Questo rappresenta la probabilità media di successo.

2. **Varianza**:
   $$\begin{align}
   \text{Var}(X) = \sum_{i=1}^n p_i(x_i - \mathbb E [X])^2 &= p(1-p)^2 + (1-p)(0-p)^2\\
   &= p((1-p)^2 + (1-p)p)\\
   &=p((1-p) ((1-p) + p))\\
   &=p(1 - p)
   \end{align}
   $$
   La varianza è massima per $p = 0.5$ e si annulla per $p = 0$ o $p = 1$.

3. **Moda**:
   - Se $p > 0.5$, la moda è $1$ (successo più probabile).
   - Se $p < 0.5$, la moda è $0$ (fallimento più probabile).
   - Se $p = 0.5$, entrambi gli esiti sono ugualmente probabili.

4. **Momenti centrali**:
   - Il secondo momento centrato coincide con la varianza.
   - Il terzo momento centrato (asimmetria) è dato da:
     $$
     \gamma_1 = \frac{1 - 2p}{\sqrt{p(1-p)}}
     $$
   - Il quarto momento centrato (curtosi) è:
     $$
     \gamma_2 = \frac{1 - 6p(1-p)}{p(1-p)}
     $$

5. **Funzione generatrice dei momenti (MGF)**:
   $$
   M_X(t) = (1 - p) + p e^t
   $$

6. **Funzione caratteristica**:
   $$
   \varphi_X(t) = (1 - p) + p e^{it}
   $$

7. **Entropia**:
   $$
   H(X) = -p \log p - (1 - p) \log (1 - p)
   $$
   L'entropia è massima per $p = 0.5$.

---

## Interpretazione intuitiva

La distribuzione di Bernoulli modella esperimenti con due soli esiti, come:

- **Lancio di una moneta** (testa o croce, con $p$ rappresentante la probabilità di ottenere testa).
- **Prova di successo o fallimento** (ad esempio, il funzionamento o il guasto di un componente elettronico).
- **Risultato di una domanda a scelta binaria** (vero/falso, sì/no).

È una distribuzione di base nella teoria della probabilità e viene usata per costruire distribuzioni più complesse, come la **binomiale** e la **binomiale negativa**.

---

## Relazioni con altre distribuzioni

- **Distribuzione Binomiale**: La somma di $n$ variabili Bernoulli indipendenti con lo stesso parametro $p$ segue una distribuzione binomiale:
  $$
  X = \sum_{i=1}^{n} X_i \sim \text{Binomiale}(n, p)
  $$

- **Distribuzione Geometrica**: Modella il numero di prove Bernoulli indipendenti necessarie per ottenere il primo successo.

- **Distribuzione Beta**: La distribuzione Beta è una distribuzione a priori comune per il parametro $p$ della distribuzione Bernoulli in un contesto bayesiano.

---

## Esempio pratico

Se lanciamo una moneta equa ($p = 0.5$), la probabilità di ottenere testa ($X = 1$) è $0.5$ e la probabilità di ottenere croce ($X = 0$) è $0.5$.

Se invece un test diagnostico ha probabilità $p = 0.9$ di rilevare correttamente una malattia, possiamo modellare la presenza o assenza della malattia con una variabile Bernoulli.

---

## Conclusione

La distribuzione di Bernoulli è una delle più semplici e fondamentali distribuzioni di probabilità. Il suo utilizzo è cruciale in molte aree della statistica, del machine learning e della teoria delle decisioni.
