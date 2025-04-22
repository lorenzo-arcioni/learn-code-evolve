# Definizioni: Scalari, Vettori, Matrici e Tensori

In matematica e fisica, **scalari**, **vettori**, **matrici** e **tensori** sono oggetti fondamentali utilizzati per rappresentare e manipolare dati in diverse dimensioni. Questa nota fornisce una definizione chiara di ciascuno di essi, con esempi e collegamenti ad argomenti correlati.

## Scalari

Uno **scalare** è una quantità descritta da un singolo valore numerico, senza direzione o orientamento. Gli scalari sono utilizzati per rappresentare grandezze come la temperatura, la massa o la lunghezza.

### Esempi di Scalari
- $5$ (un numero reale)
- $-3.14$ (un numero decimale)
- $\pi$ (una costante matematica)

## Vettori

Un **vettore** è una quantità descritta da una sequenza ordinata di elementi (scalari), che rappresentano una grandezza con **direzione** e **modulo** (intensità). I vettori possono essere rappresentati come righe o colonne di numeri.

### Forma Generale di un Vettore
Un vettore $\mathbf{v}$ di dimensione $n$ può essere scritto come:
$$
\mathbf{v} = \begin{bmatrix} v_1 \\ v_2 \\ \vdots \\ v_n \end{bmatrix} \quad \text{(vettore colonna)}
$$
oppure
$$
\mathbf{v} = \begin{bmatrix} v_1 & v_2 & \cdots & v_n \end{bmatrix} \quad \text{(vettore riga)}
$$

### Esempi di Vettori
1. Vettore colonna $3 \times 1$:
   $$
   \mathbf{v} = \begin{bmatrix} 2 \\ -1 \\ 4 \end{bmatrix}
   $$
2. Vettore riga $1 \times 4$:
   $$
   \mathbf{w} = \begin{bmatrix} 3 & 0 & 5 & 2 \end{bmatrix}
   $$

Solitamente, si assume che un vettore sia sempre un vettore colonna.

## Matrici

Una **matrice** è una tabella rettangolare di elementi (scalari), organizzati in righe e colonne. Una matrice $m \times n$ ha $m$ righe e $n$ colonne.

### Forma Generale di una Matrice
Una matrice $\mathbf{A}$ di dimensione $m \times n$ è rappresentata come:
$$
\mathbf{A} = \begin{bmatrix}
a_{11} & a_{12} & \cdots & a_{1n} \\
a_{21} & a_{22} & \cdots & a_{2n} \\
\vdots & \vdots & \ddots & \vdots \\
a_{m1} & a_{m2} & \cdots & a_{mn}
\end{bmatrix}
$$

### Esempi di Matrici
1. Matrice $2 \times 2$:
   $$
   \mathbf{A} = \begin{bmatrix} 1 & 3 \\ 4 & 2 \end{bmatrix}
   $$
2. Matrice $3 \times 2$:
   $$
   \mathbf{B} = \begin{bmatrix} 5 & 0 \\ 2 & 7 \\ 1 & 4 \end{bmatrix}
   $$

## Tensori

Un **tensore** è una generalizzazione di scalari, vettori e matrici a dimensioni superiori. I tensori sono utilizzati per rappresentare dati multidimensionali e sono fondamentali in campi come la fisica, l'apprendimento automatico e la grafica computerizzata.

### Descrizione
- Uno **scalare** è un tensore di rango 0 (nessuna dimensione).
- Un **vettore** è un tensore di rango 1 (una dimensione).
- Una **matrice** è un tensore di rango 2 (due dimensioni).
- Un tensore di rango $k$ ha $k$ dimensioni.

### Esempio di Tensore
Un tensore $2 \times 2 \times 2$ (rango 3):
$$
\mathbf{T} = \begin{bmatrix}
\begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix} \\
\begin{bmatrix} 5 & 6 \\ 7 & 8 \end{bmatrix}
\end{bmatrix}
$$

## Note Correlate

- [[Operazioni Elementari su Vettori e Matrici]]
- [[Proprietà dei Tensori]]
- [[Algebra Lineare]]
- [[Applicazioni di Scalari, Vettori, Matrici e Tensori]]

Questa nota fornisce una panoramica completa delle definizioni di scalari, vettori, matrici e tensori, con esempi pratici e collegamenti ad argomenti correlati per ulteriori approfondimenti.
