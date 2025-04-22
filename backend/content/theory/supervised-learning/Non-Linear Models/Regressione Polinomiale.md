# **Regressione Polinomiale**

La **regressione polinomiale** è un'estensione della regressione lineare che permette di modellare relazioni non lineari tra le variabili indipendenti e la variabile dipendente. Questo viene fatto introducendo termini polinomiali delle variabili indipendenti nel modello. La regressione polinomiale è particolarmente utile quando la relazione tra le variabili non è lineare, ma può essere approssimata da una funzione polinomiale.

## **Formulazione del Modello**

Consideriamo una variabile indipendente $x$ e una variabile dipendente $y$. Il nostro dataset di riferimento sarà quindi $\mathcal{D} = \{(x_i, y_i)\}_{i=1}^n$. Il modello di regressione polinomiale di grado $k$ è dato da:

$$
y_i = b + \sum_{j=1}^k a_j x_i^j + \epsilon_i \quad \text{per tutti i punti dati } i = 1, \dots, n
$$

Dove:
- $y_i$ è il valore osservato della variabile dipendente.
- $x_i$ è il valore della variabile indipendente.
- $b$ è l'intercetta.
- $a_j$ sono i coefficienti del polinomio.
- $\epsilon_i$ è l'errore (rumore) associato alla $i$-esima osservazione.

### **Notazione Matriciale**

Il modello può essere espresso in notazione matriciale come:

$$
\mathbf{y} = \mathbf{X} \mathbf w + \boldsymbol{\epsilon}
$$

Dove:
- $\mathbf{y}$ è il vettore delle osservazioni della variabile dipendente (dimensioni $n \times 1$).
- $\mathbf{X}$ è la matrice delle variabili indipendenti con i termini polinomiali (dimensioni $n \times (k+1)$).
- $\mathbf w$ è il vettore dei coefficienti (dimensioni $(k+1) \times 1$).
- $\boldsymbol{\epsilon}$ è il vettore degli errori (dimensioni $n \times 1$).

La matrice $\mathbf{X}$ è definita come:

$$
\mathbf{X} = \begin{pmatrix}
x_1^k & x_1^{k-1} & \dots & x_1 & 1 \\
x_2^k & x_2^{k-1} & \dots & x_2 & 1 \\
\vdots & \vdots & \ddots & \vdots & \vdots \\
x_n^k & x_n^{k-1} & \dots & x_n & 1
\end{pmatrix}
$$

[[Notazione Matriciale Completa Regressione Polinomiale|Qui]] è possibile trovare una descrizione completa della notazione matriciale utilizzata nel modello di regressione polinomiale.

## **Teorema di Stone-Weierstrass**

Il **teorema di Stone-Weierstrass** fornisce una base teorica per l'uso della regressione polinomiale. Il teorema afferma che:

**Teorema 3.1 (Stone-Weierstrass)**: Se $f$ è una funzione continua sull'intervallo $[a, b]$, allora per ogni $\epsilon > 0$ esiste un polinomio $p$ tale che $|f(x) - p(x)| < \epsilon$ per tutti gli $x$ nell'intervallo.

Questo teorema ci dice che, data una funzione reale $f$ su un intervallo, esiste un polinomio $p$ (di grado non noto) che approssima $f$ con la precisione desiderata. L'approssimazione è misurata in termini di errore assoluto.

## **Scelta del Grado del Polinomio**

Il grado del polinomio $k$ non è un parametro da apprendere, ma un **iperparametro** che codifica una previsione iniziale (prior) che stabiliamo. Ad esempio, potremmo aspettarci che i dati seguano una distribuzione cubica.

La scelta del grado del polinomio è cruciale per evitare due fenomeni comuni: [[Overfitting e Underfitting]].

## **Minimi Quadrati Ordinari (OLS)**

Per stimare i coefficienti del modello di regressione polinomiale, possiamo utilizzare il metodo dei **minimi quadrati ordinari (OLS)**. La funzione di perdita è data da:

$$
\ell(\mathbf w) = \|\mathbf{y} - \mathbf{X} \mathbf w\|_2^2
$$

La soluzione ottimale è:

$$
\mathbf w = (\mathbf{X}^\top \mathbf{X})^{-1} \mathbf{X}^\top \mathbf{y}
$$

## **Limiti della Regressione Polinomiale**

Nonostante i polinomi possano approssimare qualsiasi funzione continua (grazie al **Teorema di Stone-Weierstrass**), ci sono diverse ragioni per cui non sono sufficienti:

1. **Perdite più complesse**: Alcune funzioni di perdita non sono esprimibili come MSE.
2. **Difficoltà nella regolarizzazione**: La regressione polinomiale non è facile da regolarizzare.
3. **Conoscenza aggiuntiva**: Potremmo avere conoscenze aggiuntive, oltre ai dati di training, che vorremmo incorporare nel modello.
4. **Feature intermedie**: Alcuni modelli producono feature intermedie che sono molto utili per affrontare determinati compiti.
5. **Flessibilità**: La facilità di accesso e sperimentazione con il modello.

## **Conclusione**

La regressione polinomiale è uno strumento potente per modellare relazioni non lineari nei dati. Tuttavia, è importante bilanciare la complessità del modello con la quantità di dati disponibili per evitare underfitting e overfitting. La scelta del grado del polinomio è un passo cruciale per ottenere previsioni accurate e interpretabili.

## **Collegamenti Correlati**
- [[Regressione Lineare]]
- [[Minimi Quadrati Ordinari (OLS)]]
- [[Underfitting e Overfitting]]
- [[Teorema di Stone-Weierstrass]]
- [[Selezione del Modello]]

## **Riferimenti**
- Figura 3.3: Fit data with different poly degree.
- Teorema 3.1 (Stone-Weierstrass): https://en.wikipedia.org/wiki/Stone%E2%80%93Weierstrass_theorem
