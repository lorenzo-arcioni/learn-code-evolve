# Correzione di Bessel nella Covarianza

Quando si calcola la **covarianza** di un campione, spesso si utilizza un divisore di $N - 1$ invece di $N$. Questo è dovuto a una **correzione del bias** che serve a ottenere una stima non distorta della covarianza della popolazione.

## Covarianza della Popolazione
La formula della covarianza per l'intera **popolazione** è la seguente:

$$
\text{Cov}(X, Y) = \frac{1}{N} \sum_{i=1}^{N} (X_i - \mu_X)(Y_i - \mu_Y)
$$

dove $N$ è il numero totale di dati e $\mu_X$ e $\mu_Y$ sono le medie della popolazione delle variabili $X$ e $Y$.

## Covarianza del Campione
Quando si calcola la covarianza da un **campione** della popolazione, il calcolo tende a sottostimare la covarianza vera della popolazione. Per correggere questo bias, si utilizza il divisore $N - 1$, che è noto come **correzione di Bessel**.

La formula della covarianza per un campione è quindi:

$$
\text{Cov}(X, Y) = \frac{1}{N-1} \sum_{i=1}^{N} (X_i - \bar{X})(Y_i - \bar{Y})
$$

dove $N$ è il numero di osservazioni nel campione e $\bar{X}$ e $\bar{Y}$ sono le medie del campione delle variabili $X$ e $Y$.

## Perché si usa $N - 1$?
Il motivo per cui si usa $N - 1$ al posto di $N$ è che nel calcolo della covarianza da un campione, la somma degli scarti quadrati tende ad essere inferiore rispetto a quanto sarebbe se avessimo l'intera popolazione. La correzione di Bessel ($N - 1$) rende la stima della covarianza un **stimatore non distorto** della covarianza della popolazione.
