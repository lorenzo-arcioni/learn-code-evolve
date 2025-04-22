# Sottoderivata e Sottogradiente

La **sottoderivata** è un concetto matematico che estende la nozione di derivata a funzioni che non sono differenziabili in tutti i punti del loro dominio. Questo strumento è particolarmente utile quando si lavora con funzioni come la **norma L1**, che non è derivabile in $x = 0$. La sottoderivata permette di definire un insieme di "derivate generalizzate" in punti in cui la funzione non è regolare.

## Definizione di Sottoderivata

Sia $f: \mathbb{R} \to \mathbb{R}$ una funzione convessa. La **sottoderivata** di $f$ in un punto $x_0$ è definita come l'insieme di tutti i valori $g$ tali che:

$$
f(x) \geq f(x_0) + g(x - x_0) \quad \text{per ogni } x \in \mathbb{R}.
$$

In altre parole, la sottoderivata è l'insieme di tutte le pendenze delle rette che toccano il grafico di $f$ in $x_0$ senza attraversarlo. Questo insieme è chiamato **sottodifferenziale** di $f$ in $x_0$ e si indica con $\partial f(x_0)$.

## Esempi di Sottoderivata

### 1. Funzione Valore Assoluto (Norma L1)

Consideriamo la funzione valore assoluto $f(x) = |x|$, che è un caso particolare della norma L1. Questa funzione non è derivabile in $x = 0$, ma possiamo calcolare il suo sottodifferenziale.

- Per $x > 0$, la derivata di $f(x)$ è $f'(x) = 1$.
- Per $x < 0$, la derivata di $f(x)$ è $f'(x) = -1$.
- In $x = 0$, la funzione non è derivabile, ma il sottodifferenziale è l'intervallo $[-1, 1]$. Questo significa che ogni valore $g \in [-1, 1]$ è una sottoderivata di $f$ in $x = 0$.

Matematicamente:

$$
\partial f(0) = [-1, 1]
$$

### 2. Funzione Convessa Generica

Per una funzione convessa $f(x)$, il sottodifferenziale in un punto $x_0$ è un insieme chiuso e convesso. Se $f$ è differenziabile in $x_0$, allora il sottodifferenziale è un singleton contenente la derivata classica:

$$
\partial f(x_0) = \{ f'(x_0) \}
$$

## Proprietà della Sottoderivata

1. **Convessità**: Se $f$ è una funzione convessa, il sottodifferenziale $\partial f(x_0)$ è un insieme convesso e chiuso.
2. **Monotonia**: Se $f$ è una funzione convessa, il sottodifferenziale è una funzione monotona, cioè per ogni $x_1 < x_2$ e per ogni $g_1 \in \partial f(x_1)$, $g_2 \in \partial f(x_2)$, si ha $g_1 \leq g_2$.
3. **Ottimizzazione**: La sottoderivata è utile nell'ottimizzazione convessa, poiché fornisce una condizione necessaria e sufficiente per i minimi di una funzione convessa. Un punto $x_0$ è un minimo globale di $f$ se e solo se $0 \in \partial f(x_0)$.

## Applicazioni della Sottoderivata

### 1. Regolarizzazione L1

Nella regolarizzazione L1 (Lasso), la funzione di perdita include un termine di penalità basato sulla norma L1:

$$
\ell(\Theta) = \text{MSE}(\Theta) + \lambda \|\Theta\|_1
$$

Dove $\|\Theta\|_1$ è la norma L1 dei parametri. Poiché la norma L1 non è differenziabile in $\Theta = 0$, utilizziamo il concetto di sottoderivata per calcolare il gradiente generalizzato. In particolare, il sottodifferenziale della norma L1 in $\Theta = 0$ è l'insieme di tutti i vettori $g$ tali che:

$$
g_i \in 
\begin{cases}
\{1\}, & \text{se } \Theta_i > 0 \\
\{-1\}, & \text{se } \Theta_i < 0 \\
[-1, 1], & \text{se } \Theta_i = 0
\end{cases}
$$

### 2. Ottimizzazione Convessa

La sottoderivata è ampiamente utilizzata nell'ottimizzazione convessa, specialmente quando si lavora con funzioni non differenziabili. Ad esempio, nell'algoritmo del **subgradient descent**, si utilizza un vettore del sottodifferenziale per aggiornare i parametri del modello.


## Sottogradiente

Il **sottogradiente** è un concetto che estende la nozione di gradiente a funzioni non differenziabili. Mentre il gradiente classico è definito solo per funzioni differenziabili, il sottogradiente è definito per funzioni convesse (anche non differenziabili) e fornisce una generalizzazione utile per l'ottimizzazione e l'analisi di funzioni non lisce.

### Definizione di Sottogradiente

Sia $f: \mathbb{R}^n \to \mathbb{R}$ una funzione convessa. Un vettore $g \in \mathbb{R}^n$ è chiamato **sottogradiente** di $f$ in un punto $x_0$ se soddisfa la seguente disuguaglianza:

$$
f(x) \geq f(x_0) + g^\top (x - x_0) \quad \text{per ogni } x \in \mathbb{R}^n.
$$

L'insieme di tutti i sottogradienti di $f$ in $x_0$ è chiamato **sottodifferenziale** di $f$ in $x_0$ e si indica con $\partial f(x_0)$. Se $f$ è differenziabile in $x_0$, allora il sottodifferenziale è un singleton contenente il gradiente classico:

$$
\partial f(x_0) = \{ \nabla f(x_0) \}.
$$

### Proprietà del Sottogradiente

1. **Convessità**: Se $f$ è una funzione convessa, il sottodifferenziale $\partial f(x_0)$ è un insieme convesso e chiuso.
2. **Non vuoto**: Per una funzione convessa, il sottodifferenziale è sempre non vuoto in ogni punto del dominio.
3. **Monotonia**: Se $f$ è una funzione convessa, il sottodifferenziale è una funzione monotona, cioè per ogni $x_1, x_2 \in \mathbb{R}^n$ e per ogni $g_1 \in \partial f(x_1)$, $g_2 \in \partial f(x_2)$, si ha:
   $$
   (g_1 - g_2)^\top (x_1 - x_2) \geq 0.
   $$

### Esempi di Sottogradiente

#### 1. Norma L1 (Funzione Valore Assoluto Generalizzata)

Consideriamo la **norma L1** di un vettore $\mathbf x \in \mathbb{R}^n$, definita come:

$$
f(\mathbf x) = \|\mathbf x\|_1 = \sum_{i=1}^n |\mathbf x_i|.
$$

Questa funzione non è differenziabile in tutti i punti in cui almeno una componente di $\mathbf x$ è zero. Tuttavia, possiamo calcolare il suo sottodifferenziale.

- Per $x_i > 0$, la derivata parziale rispetto a $x_i$ è $\frac{\partial f}{\partial x_i} = 1$.
- Per $x_i < 0$, la derivata parziale rispetto a $x_i$ è $\frac{\partial f}{\partial x_i} = -1$.
- Per $x_i = 0$, la derivata parziale non è definita, ma il sottodifferenziale rispetto a $x_i$ è l'intervallo $[-1, 1]$.

Quindi, il sottodifferenziale della norma L1 in un punto $\mathbf x \in \mathbb{R}^n$ è dato da:

$$
\partial f(\mathbf x) = \{ g \in \mathbb{R}^n \mid g_i \in \partial |x_i| \},
$$

dove:

$$
\partial |x_i| = 
\begin{cases}
\{1\}, & \text{se } x_i > 0 \\
\{-1\}, & \text{se } x_i < 0 \\
[-1, 1], & \text{se } x_i = 0
\end{cases}
$$

#### 2. Funzione Convessa Generica in $\mathbb{R}^n$

Per una funzione convessa $f: \mathbb{R}^n \to \mathbb{R}$, il sottodifferenziale in un punto $\mathbf x_0 \in \mathbb{R}^n$ è un insieme convesso e chiuso. Se $f$ è differenziabile in $\mathbf x_0$, allora il sottodifferenziale è un singleton contenente il gradiente classico:

$$
\partial f(\mathbf x_0) = \{ \nabla f(\mathbf x_0) \}.
$$

Se $f$ non è differenziabile in $\mathbf x_0$, il sottodifferenziale è un insieme più grande. Ad esempio, per la funzione $f(x) = \max(x_1, x_2, \dots, x_n)$, il sottodifferenziale in un punto $\mathbf x_0$ è l'insieme di tutti i vettori $\mathbf g \in \mathbb{R}^n$ tali che:

$$
g_i = 
\begin{cases}
1, & \text{se } x_i = \max(x_1, x_2, \dots, x_n) \\
0, & \text{altrimenti}
\end{cases}
$$

### Applicazioni del Sottogradiente

#### 1. Ottimizzazione Non Differenziabile

Il sottogradiente è ampiamente utilizzato nell'ottimizzazione di funzioni non differenziabili. Ad esempio, nell'algoritmo del **subgradient descent**, si utilizza un vettore del sottodifferenziale per aggiornare i parametri del modello. L'aggiornamento è dato da:

$$
x_{k+1} = x_k - \alpha_k g_k
$$

Dove:
- $x_k$ è il vettore dei parametri al passo $k$.
- $g_k$ è un sottogradiente di $f$ in $x_k$.
- $\alpha_k$ è il passo di apprendimento al passo $k$.

#### 2. Regolarizzazione L1

Nella regolarizzazione L1 (Lasso), la funzione di perdita include un termine di penalità basato sulla norma L1:

$$
\ell(\Theta) = \text{MSE}(\Theta) + \lambda \|\Theta\|_1
$$

Dove $\|\Theta\|_1$ è la norma L1 dei parametri. Poiché la norma L1 non è differenziabile in $\Theta = 0$, utilizziamo il concetto di sottogradiente per calcolare il gradiente generalizzato. In particolare, il sottodifferenziale della norma L1 in $\Theta = 0$ è l'insieme di tutti i vettori $g$ tali che:

$$
g_i \in 
\begin{cases}
\{1\}, & \text{se } \Theta_i > 0 \\
\{-1\}, & \text{se } \Theta_i < 0 \\
[-1, 1], & \text{se } \Theta_i = 0
\end{cases}
$$

### Conclusione

Il sottogradiente è uno strumento essenziale per estendere il concetto di gradiente a funzioni non differenziabili, come la norma L1. Questo concetto è particolarmente utile nell'ottimizzazione convessa e nella regolarizzazione, dove funzioni non differenziabili sono comuni. La capacità di lavorare con sottogradienti permette di risolvere problemi complessi che altrimenti sarebbero intrattabili con gli strumenti classici del calcolo differenziale.

## Conclusione

La sottoderivata è uno strumento potente per estendere il concetto di derivata a funzioni non differenziabili, come la norma L1. Questo concetto è particolarmente utile nell'ottimizzazione convessa e nella regolarizzazione, dove funzioni non differenziabili sono comuni. La capacità di lavorare con sottoderivate permette di risolvere problemi complessi che altrimenti sarebbero intrattabili con gli strumenti classici del calcolo differenziale.

## Collegamenti Correlati
- [[Regolarizzazione]]
- [[Norme L1 e L2]]
- [[Ottimizzazione Convessa]]
- [[Funzioni Convesse]]
