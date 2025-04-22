# Distribuzione Normale (Gaussiana)

La **Distribuzione Normale**, o **Distribuzione di Gauss**, è una delle distribuzioni di probabilità più importanti in statistica e matematica. È ampiamente utilizzata per modellare fenomeni naturali e processi casuali.

---

## 1. Definizione

Una variabile casuale continua $X$ segue una **distribuzione normale** se la sua funzione di densità di probabilità (PDF) è data da:

$$
f(x | \mu, \sigma^2) = \frac{1}{\sqrt{2\pi\sigma^2}} \exp\left( -\frac{(x - \mu)^2}{2\sigma^2} \right)
$$

Dove:
- $\mu$ è la **media** (o valore atteso) della distribuzione.
- $\sigma^2$ è la **varianza** (che misura la dispersione).
- $\sigma$ è la **deviazione standard** (radice quadrata della varianza).

La distribuzione normale è simmetrica rispetto alla media $\mu$ e ha una forma a campana.

---

## 2. Proprietà della Distribuzione Normale

### 2.1 Simmetria
- La distribuzione normale è perfettamente **simmetrica** rispetto alla media $\mu$.
- Il **valore atteso**, la **mediana** e la **moda** coincidono:  
  $$
  \mathbb{E}[X] = \mu, \quad \text{Mediana}(X) = \mu, \quad \text{Moda}(X) = \mu
  $$

### 2.2 Regola Empirica (68-95-99.7)
La regola empirica stabilisce che:
- Il **68%** dei valori si trova entro $\mu \pm \sigma$.
- Il **95%** dei valori si trova entro $\mu \pm 2\sigma$.
- Il **99.7%** dei valori si trova entro $\mu \pm 3\sigma$.

Questa proprietà è utile per valutare la probabilità di eventi in una distribuzione normale.

### 2.3 Linearità
Se $X \sim \mathcal{N}(\mu, \sigma^2)$ e $a, b$ sono costanti, allora anche la trasformazione affine $Y = aX + b$ segue una distribuzione normale:

$$
Y \sim \mathcal{N}(a\mu + b, a^2\sigma^2)
$$

---

## 3. Distribuzione Normale Standardizzata

La **Distribuzione Normale Standard** è un caso speciale della distribuzione normale con:

$$
\mu = 0, \quad \sigma^2 = 1
$$

La sua funzione di densità è:

$$
\phi(z) = \frac{1}{\sqrt{2\pi}} \exp\left(-\frac{z^2}{2}\right)
$$

Dove $Z \sim \mathcal{N}(0,1)$ è la **variabile normale standard**.

### 3.1 Standardizzazione di una Variabile Normale

Data una variabile $X \sim \mathcal{N}(\mu, \sigma^2)$, possiamo trasformarla in una variabile normale standard $Z$ con:

$$
Z = \frac{X - \mu}{\sigma}
$$

Questa trasformazione è utile per calcolare probabilità con le tavole della distribuzione normale standard.

---

## 4. Funzione di Ripartizione (CDF)

La **funzione di ripartizione** della distribuzione normale è:

$$
F(x) = P(X \leq x) = \int_{-\infty}^{x} f(t) dt
$$

Non esiste una formula chiusa per questa funzione, quindi i valori vengono ottenuti tramite tabelle o funzioni numeriche.

---

## 5. Distribuzione Normale Multivariata

Quando abbiamo un vettore di variabili casuali $\mathbf{X}$ che segue una distribuzione normale multivariata, la sua distribuzione è data da:

$$
f(\mathbf{x}) = \frac{1}{(2\pi)^{k/2} |\Sigma|^{1/2}} \exp\left(-\frac{1}{2} (\mathbf{x} - \mathbf{\mu})^\top \Sigma^{-1} (\mathbf{x} - \mathbf{\mu}) \right)
$$

Dove:
- $\mathbf{\mu}$ è il vettore delle medie.
- $\Sigma$ è la matrice di covarianza.

---

## 6. Applicazioni della Distribuzione Normale

1. **Inferenza Statistica**: Molti test statistici (t-test, ANOVA) assumono dati distribuiti normalmente.
2. **Regressione Lineare**: Gli errori sono spesso modellati come normali.
3. **Teorema del Limite Centrale**: La somma di molte variabili indipendenti tende a seguire una distribuzione normale.
4. **Finanza**: Modelli di rischio e rendimenti si basano su distribuzioni normali.

---

## 7. Approssimazione Normale di Altre Distribuzioni

Per grandi campioni, molte distribuzioni discrete possono essere approssimate dalla normale grazie al **Teorema del Limite Centrale (TLC)**:

- **Distribuzione Binomiale**: Se $n$ è grande, $X \sim \text{Bin}(n, p)$ può essere approssimata con $\mathcal{N}(np, np(1-p))$.
- **Distribuzione di Poisson**: Per $\lambda$ grande, $X \sim \text{Poisson}(\lambda)$ può essere approssimata con $\mathcal{N}(\lambda, \lambda)$.

---

## 8. Conclusione

La **Distribuzione Normale** è una delle distribuzioni più fondamentali della statistica e della probabilità. Le sue proprietà matematiche, la sua simmetria e la sua connessione con il **Teorema del Limite Centrale** la rendono indispensabile in molte applicazioni pratiche.

---

## 9. Riferimenti

- Casella, G., & Berger, R. L. (2002). *Statistical Inference*.
- Wasserman, L. (2004). *All of Statistics*.
- Montgomery, D. C., & Runger, G. C. (2010). *Applied Statistics and Probability for Engineers*.
