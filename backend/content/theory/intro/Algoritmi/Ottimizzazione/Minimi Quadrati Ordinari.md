# Metodo dei Minimi Quadrati Ordinari (OLS)

Il **metodo dei minimi quadrati ordinari (OLS, Ordinary Least Squares)** è una tecnica di ottimizzazione utilizzata per stimare i parametri di un modello di regressione lineare. L'obiettivo è trovare i coefficienti che minimizzano la somma dei quadrati degli errori tra i valori osservati e quelli previsti dal modello.

## Formulazione del Problema

Consideriamo un modello di regressione lineare semplice, dove la variabile dipendente $y$ è legata alla variabile indipendente $x$ dalla relazione:

$$
y_i = a x_i + b + \epsilon_i \quad \text{per } i = 1, \dots, n
$$

Dove:
- $y_i$ è il valore osservato della variabile dipendente.
- $x_i$ è il valore della variabile indipendente.
- $a$ e $b$ sono i coefficienti del modello (pendenza e intercetta).
- $\epsilon_i$ è l'errore (rumore) associato alla $i$-esima osservazione.

L'obiettivo è trovare i valori di $a$ e $b$ che minimizzano la **funzione di perdita** (loss function), definita come la somma dei quadrati degli errori:

$$
\ell(a, b) = \sum_{i=1}^n (y_i - a x_i - b)^2 \quad (2.31)
$$

## Minimizzazione della Funzione di Perdita

La funzione di perdita $\ell(a, b)$ è una **funzione quadratica** e, quindi, **[[Funzioni Convesse|convessa]]**. Questo garantisce che esista un unico minimo globale. Per trovare i valori ottimali di $a$ e $b$, calcoliamo il **gradiente** della funzione di perdita rispetto a $a$ e $b$ e lo impostiamo uguale a zero.

### Calcolo del Gradiente

Il gradiente della funzione di perdita rispetto a $a$ e $b$ è dato da:

$$
\nabla \ell(a, b) = \begin{pmatrix}
\frac{\partial \ell}{\partial a} \\
\frac{\partial \ell}{\partial b}
\end{pmatrix}
$$

Calcoliamo le derivate parziali:

1. **Derivata rispetto a $a$**:
   $$
   \frac{\partial \ell}{\partial a} = \sum_{i=1}^n 2 (y_i - a x_i - b) (-x_i) = -2 \sum_{i=1}^n x_i (y_i - a x_i - b)
   $$

2. **Derivata rispetto a $b$**:
   $$
   \frac{\partial \ell}{\partial b} = \sum_{i=1}^n 2 (y_i - a x_i - b) (-1) = -2 \sum_{i=1}^n (y_i - a x_i - b)
   $$

Impostando il gradiente uguale a zero, quindi $\nabla \ell(a, b) = \mathbf 0$, otteniamo un sistema di equazioni lineari:

$$
\begin{cases}
\sum_{i=1}^n x_i (y_i - a x_i - b) = 0 \\
\sum_{i=1}^n (y_i - a x_i - b) = 0
\end{cases}
$$

Espandiamo i prodotti:  

$$  
\begin{cases}  
\sum_{i=1}^{n} (x_i y_i - a x_i^2 - b x_i) = 0 \\  
\sum_{i=1}^{n} (y_i - a x_i - b) = 0  
\end{cases}  
$$  

Distribuiamo la sommatoria:  

$$  
\begin{cases}  
\sum_{i=1}^{n} x_i y_i - \sum_{i=1}^{n} a x_i^2 - \sum_{i=1}^{n} b x_i = 0 \\  
\sum_{i=1}^{n} y_i - \sum_{i=1}^{n} a x_i - \sum_{i=1}^{n} b = 0  
\end{cases}  
$$  

Portiamo fuori le costanti $a$ e $b$:  

$$  
\begin{cases}  
\sum_{i=1}^{n} x_i y_i - a \sum_{i=1}^{n} x_i^2 - b \sum_{i=1}^{n} x_i = 0 \\  
\sum_{i=1}^{n} y_i - a \sum_{i=1}^{n} x_i - b n = 0  
\end{cases}  
$$  

### Soluzione del Sistema

Risolvendo il sistema di equazioni, otteniamo le **stime OLS** per $a$ e $b$:

1. **Stima di $a$**:  
   Partiamo dal sistema di equazioni:  

   $$
   \begin{cases}  
   \sum_{i=1}^{n} x_i y_i - a \sum_{i=1}^{n} x_i^2 - b \sum_{i=1}^{n} x_i = 0 \\  
   \sum_{i=1}^{n} y_i - a \sum_{i=1}^{n} x_i - b n = 0  
   \end{cases}  
   $$  

   Dalla seconda equazione, isoliamo $b$:  

   $$
   b = \frac{\sum_{i=1}^{n} y_i - a \sum_{i=1}^{n} x_i}{n}
   $$  

   Sostituiamo questa espressione nella prima equazione:  

   $$
   \sum_{i=1}^{n} x_i y_i - a \sum_{i=1}^{n} x_i^2 - \sum_{i=1}^{n} x_i \cdot \frac{\sum_{i=1}^{n} y_i - a \sum_{i=1}^{n} x_i}{n} = 0
   $$  

   Distribuiamo la sommatoria nel termine frazionario:  

   $$
   \sum_{i=1}^{n} x_i y_i - a \sum_{i=1}^{n} x_i^2 - \frac{\sum_{i=1}^{n} x_i \sum_{i=1}^{n} y_i}{n} + a \frac{\sum_{i=1}^{n} x_i \sum_{i=1}^{n} x_i}{n} = 0
   $$  

   Raccogliamo i termini con $a$:  

   $$
   \sum_{i=1}^{n} x_i y_i - \frac{\sum_{i=1}^{n} x_i \sum_{i=1}^{n} y_i}{n} = a \left( \sum_{i=1}^{n} x_i^2 - \frac{\left( \sum_{i=1}^{n} x_i \right)^2}{n} \right)
   $$  

   Infine, isoliamo $a$:  

   $$
   a = \frac{n \sum_{i=1}^n x_i y_i - \left( \sum_{i=1}^n x_i \right) \left( \sum_{i=1}^n y_i \right)}{n \sum_{i=1}^n x_i^2 - \left( \sum_{i=1}^n x_i \right)^2}
   $$  

2. **Stima di $b$**:  
   Usiamo l'espressione già trovata per $b$:  

   $$
   b = \frac{\sum_{i=1}^{n} y_i - a \sum_{i=1}^{n} x_i}{n}
   $$  

   Sostituiamo $a$:  

   $$
   b = \frac{\sum_{i=1}^{n} y_i - \frac{n \sum_{i=1}^n x_i y_i - \left( \sum_{i=1}^n x_i \right) \left( \sum_{i=1}^n y_i \right)}{n \sum_{i=1}^n x_i^2 - \left( \sum_{i=1}^n x_i \right)^2} \sum_{i=1}^{n} x_i}{n}
   $$  

   Distribuiamo $\sum_{i=1}^{n} x_i$ nel numeratore:  

   $$
   b = \frac{\sum_{i=1}^{n} y_i - \frac{n \sum_{i=1}^{n} x_i y_i \sum_{i=1}^{n} x_i - \left( \sum_{i=1}^{n} x_i \right)^2 \sum_{i=1}^{n} y_i}{n \sum_{i=1}^{n} x_i^2 - \left( \sum_{i=1}^{n} x_i \right)^2}}{n}
   $$  

   Semplificando, otteniamo la stessa espressione compatta:  

   $$
   b = \frac{\sum_{i=1}^n y_i - a \sum_{i=1}^n x_i}{n}
   $$  

## Formulazione Matriciale

Per generalizzare il metodo OLS a modelli con più variabili indipendenti, utilizziamo una **formulazione matriciale**. Consideriamo il modello:

$$
\mathbf{y} = \mathbf{X} \mathbf{w} + \boldsymbol{\epsilon}
$$

Dove:
- $\mathbf{y} \in \mathbb{R}^{n \times 1}$ è il vettore delle osservazioni della variabile dipendente.
- $\mathbf{X} \in \mathbb{R}^{n \times (m+1)}$ è la matrice delle variabili indipendenti, con una colonna di 1 per l'intercetta.
- $\mathbf{w} \in \mathbb{R}^{(m+1) \times 1}$ è il vettore dei coefficienti del modello.
- $\boldsymbol{\epsilon} \in \mathbb{R}^{n \times 1}$ è il vettore degli errori.

La funzione di perdita (errore quadratico) è definita come:

$$
\ell(\mathbf{w}) = \|\mathbf{y} - \mathbf{X} \mathbf{w}\|_2^2
$$

Espandiamo la norma euclidea:

$$
\|\mathbf{y} - \mathbf{X} \mathbf{w}\|_2^2 = (\mathbf{y} - \mathbf{X} \mathbf{w})^\top (\mathbf{y} - \mathbf{X} \mathbf{w})
$$

Sviluppiamo il prodotto scalare:

$$
(\mathbf{y} - \mathbf{X} \mathbf{w})^\top (\mathbf{y} - \mathbf{X} \mathbf{w}) = \mathbf{y}^\top \mathbf{y} - 2 \mathbf{y}^\top \mathbf{X} \mathbf{w} + \mathbf{w}^\top \mathbf{X}^\top \mathbf{X} \mathbf{w}
$$

Ora troviamo il minimo derivando rispetto a $\mathbf{w}$:

$$
\frac{\partial \ell(\mathbf{w})}{\partial \mathbf{w}} = -2 \mathbf{X}^\top \mathbf{y} + 2 \mathbf{X}^\top \mathbf{X} \mathbf{w}
$$

Imponiamo la condizione di ottimalità:

$$
-2 \mathbf{X}^\top \mathbf{y} + 2 \mathbf{X}^\top \mathbf{X} \mathbf{w} = 0
$$

Semplificando:

$$
\mathbf{X}^\top \mathbf{X} \mathbf{w} = \mathbf{X}^\top \mathbf{y}
$$

Se $\mathbf{X}^\top \mathbf{X}$ è invertibile, otteniamo la stima dei coefficienti:

$$
\mathbf{w} = (\mathbf{X}^\top \mathbf{X})^{-1} \mathbf{X}^\top \mathbf{y}
$$

Questa è la soluzione **OLS** in forma matriciale.

## Caso Multidimensionale

Nel caso in cui la variabile dipendente sia multidimensionale (ad esempio, $\mathbf{y}_i \in \mathbb{R}^d$), il modello diventa:

$$
\mathbf{y}_i = \mathbf{x}_i^\top \mathbf{W}, \quad \text{per } i = 1, \dots, n
$$

Dove:
- $\mathbf{W} \in \mathbb{R}^{(m+1) \times d}$ è la matrice dei coefficienti.
- $\mathbf{x}_i \in \mathbb{R}^{(m+1) \times 1}$ è il vettore delle variabili indipendenti per l'osservazione $i$.
- $\mathbf{y}_i \in \mathbb{R}^d$ è il vettore delle osservazioni per l'osservazione $i$.

### Formulazione Matriciale
Se consideriamo tutte le osservazioni simultaneamente, possiamo scrivere:

$$
\mathbf{Y} = \mathbf{X} \mathbf{W}
$$

Dove:
- $\mathbf{Y} \in \mathbb{R}^{n \times d}$ è la matrice delle osservazioni.
- $\mathbf{X} \in \mathbb{R}^{n \times (m+1)}$ è la matrice delle variabili indipendenti.
- $\mathbf{W} \in \mathbb{R}^{(m+1) \times d}$ è la matrice dei coefficienti del modello.

### Funzione di Perdita
La funzione di perdita generalizzata diventa:

$$
\ell(\mathbf{W}) = \|\mathbf{Y} - \mathbf{X} \mathbf{W}\|_2^2
$$

Espandiamo la norma euclidea:

$$
\ell(\mathbf{W}) = (\mathbf{Y} - \mathbf{X} \mathbf{W})^\top (\mathbf{Y} - \mathbf{X} \mathbf{W})
$$

Sviluppiamo il prodotto:

$$
\ell(\mathbf{W}) = \mathbf{Y}^\top \mathbf{Y} - 2 \mathbf{W}^\top \mathbf{X}^\top \mathbf{Y} + \mathbf{W}^\top \mathbf{X}^\top \mathbf{X} \mathbf{W}
$$

Ora calcoliamo la derivata rispetto a $\mathbf{W}$:

$$
\frac{\partial \ell(\mathbf{W})}{\partial \mathbf{W}} = -2 \mathbf{X}^\top \mathbf{Y} + 2 \mathbf{X}^\top \mathbf{X} \mathbf{W}
$$

Imponiamo la condizione di ottimalità:

$$
-2 \mathbf{X}^\top \mathbf{Y} + 2 \mathbf{X}^\top \mathbf{X} \mathbf{W} = 0
$$

Semplificando:

$$
\mathbf{X}^\top \mathbf{X} \mathbf{W} = \mathbf{X}^\top \mathbf{Y}
$$

Se $\mathbf{X}^\top \mathbf{X}$ è invertibile, la soluzione ottimale è:

$$
\mathbf{W} = (\mathbf{X}^\top \mathbf{X})^{-1} \mathbf{X}^\top \mathbf{Y}
$$

Questa è la soluzione **OLS** nel caso multidimensionale.

### Problema di Non Invertibilità di $\mathbf{X}^\top \mathbf{X}$
Se $\mathbf{X}^\top \mathbf{X}$ non è invertibile (singolare o mal condizionata), la soluzione OLS non è definita. Questo accade quando:
- Ci sono più variabili indipendenti di osservazioni ($m+1 > n$).
- Le colonne di $\mathbf{X}$ sono altamente correlate (multicollinearità).

Per risolvere il problema, possiamo applicare la **regolarizzazione di Tikhonov**, nota anche come **Ridge Regression**.

### [[Regolarizzazione]] Ridge
Introduciamo un termine di regolarizzazione $\lambda > 0$ che penalizza la grandezza dei coefficienti, modificando il problema di minimizzazione in:

$$
\ell_{\text{ridge}}(\mathbf{W}) = \|\mathbf{Y} - \mathbf{X} \mathbf{W}\|_2^2 + \lambda \|\mathbf{W}\|_2^2
$$

Derivando e ponendo il gradiente uguale a zero, otteniamo la soluzione regolarizzata:

$$
\mathbf{W} = (\mathbf{X}^\top \mathbf{X} + \lambda \mathbf{I})^{-1} \mathbf{X}^\top \mathbf{Y}
$$

Dove:
- $\mathbf{I}$ è la matrice identità di dimensione $(m+1) \times (m+1)$.
- $\lambda$ è un iperparametro che controlla la quantità di regolarizzazione.

### Interpretazione della Regolarizzazione
- Se $\lambda = 0$, recuperiamo la soluzione OLS classica.
- Se $\lambda > 0$, la matrice $\mathbf{X}^\top \mathbf{X} + \lambda \mathbf{I}$ diventa sempre invertibile, garantendo una soluzione ben definita.

[[Dimostrazione di Invertibilità Ridge|Qui]] è disponibile una dimostrazione dettagliata sul perché la matrice $\mathbf{X}^\top \mathbf{X} + \lambda \mathbf{I}$ sia sempre invertibile.

## Conclusione

Il metodo OLS è uno strumento potente per stimare i parametri di un modello di regressione lineare. La sua formulazione matriciale lo rende adatto a problemi con più variabili indipendenti e dipendenti. La soluzione analitica, ottenuta risolvendo l'equazione normale, garantisce un'unica soluzione ottimale grazie alla convessità della funzione di perdita.

## Collegamenti Correlati
- [[Regressione Lineare]]
- [[Metriche, Norme e Distanze]]
- [[Gradiente]]
