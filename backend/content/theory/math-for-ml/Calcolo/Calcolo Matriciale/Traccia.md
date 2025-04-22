# Traccia di una Matrice

La **traccia** è un operatore lineare che mappa una matrice quadrata in uno scalare, estraendo informazioni dalla diagonale principale. È fondamentale in algebra lineare, fisica e machine learning.

## Definizione
Data una matrice quadrata $A$ di dimensione $n \times n$, la traccia è:
$$
\text{tr}(A) = \sum_{i=1}^n a_{ii}.
$$

## Proprietà

### 1. **Linearità**
Per matrici $A$, $B$ e scalare $c$:
$$
\text{tr}(A + B) = \text{tr}(A) + \text{tr}(B), \quad \text{tr}(cA) = c \cdot \text{tr}(A).
$$

### 2. **Invarianza alla Trasposizione**
$$
\text{tr}(A) = \text{tr}(A^T).
$$

### 3. **Proprietà Ciclica**

La **proprietà ciclica della traccia** è una caratteristica fondamentale in algebra lineare che riguarda il prodotto di matrici. In particolare, se abbiamo tre matrici:

- $A$ di dimensione $m \times n$,
- $B$ di dimensione $n \times p$,
- $C$ di dimensione $p \times m$,

allora il prodotto $ABC$ è definito e risulta in una matrice quadrata di dimensione $m \times m$ (poiché il numero di colonne di $C$ è $m$). La traccia di una matrice quadrata è definita come la somma degli elementi sulla diagonale principale.

La proprietà ciclica afferma che:
$$
\text{tr}(ABC) = \text{tr}(BCA) = \text{tr}(CAB).
$$

Questa invarianza rispetto agli shift ciclici delle matrici nel prodotto vale in generale.

**Nota:** Se, oltre ad essere definite nel prodotto, le matrici $A$, $B$ e $C$ sono anche **commutative** (cioè $AB = BA$, $AC = CA$, $BC = CB$), allora il prodotto può essere riordinato in maniera arbitraria e si ha:
$$
\text{tr}(ABC) = \text{tr}(BCA) = \text{tr}(CAB) = \text{tr}(CBA) = \text{tr}(ACB) = \text{tr}(BAC).
$$

La ciclicità è valida per un numero arbitrario di matrici coinvolte nel prodotto.

### 4. **Traccia e Autovalori**
Se $A$ è diagonalizzabile:
$$
\text{tr}(A) = \sum_{i=1}^n \lambda_i \quad (\lambda_i \text{ sono gli autovalori}).
$$

## Applicazioni

### 1. **Forme Quadratiche**
Per un vettore $\mathbf{x}$ e matrice $A$:
$$
\mathbf{x}^T A \mathbf{x} = \text{tr}(A \mathbf{x} \mathbf{x}^T).
$$

### 2. **Gradienti**
- Gradiente della traccia rispetto a $A$:
  $$
  \nabla_A \text{tr}(A) = I \quad (\text{matrice identità}).
  $$
- Gradiente di $\text{tr}(AB)$:
  $$
  \nabla_A \text{tr}(AB) = B^T.
  $$

### 3. **Ottimizzazione**
Utilizzata in funzioni obiettivo come:
$$
\min_A \text{tr}(A^T A) \quad (\text{minimizzazione dell'energia}).
$$

## Errori Comuni

### 1. **Gradiente della Traccia**
Errore:
$$
\nabla \text{tr}(A) \neq \text{tr}(\nabla A).
$$
Corretto:
$$
\nabla_A \text{tr}(A) = I.
$$

## Note Correlate
- [[Autovalori e Autovettori]]
- [[Proprietà delle Matrici Trasposte]]
- [[Ottimizzazione con Matrici]]
