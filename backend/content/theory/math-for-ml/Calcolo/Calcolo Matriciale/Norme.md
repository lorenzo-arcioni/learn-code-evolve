# Norme Matriciali

Le norme matriciali sono funzioni che assegnano un valore scalare non negativo a una matrice, misurandone la "grandezza". Sono fondamentali in algebra lineare, analisi numerica e applicazioni scientifiche.

## Definizione Assiomatica
Una norma matriciale $\| \cdot \|$ deve soddisfare per tutte matrici $A,B \in \mathbb{R}^{m \times n}$ e scalari $c \in \mathbb{R}$:
1. **Non negatività**:  
   $\|A\| \geq 0$, e $\|A\| = 0 \iff A = 0$.
2. **Omogeneità**:  
   $\|cA\| = |c| \cdot \|A\|$.
3. **Disuguaglianza triangolare**:  
   $\|A + B\| \leq \|A\| + \|B\|$.
4. **Submoltiplicatività** (se $m = n$):  
   $\|AB\| \leq \|A\| \cdot \|B\|$.

## Principali Norme Matriciali

### 1. **Norme Entry-Wise ($L_p$)**
Queste norme trattano le matrici $m \times n$ come vettori di lunghezza $m \cdot n$ e misurano la somma del valore assoluto di ogni elemento elevato alla $p$ e calcolano la radice $p$-esima del risultato.

$$
\|A\|_p = \|vec(A)\|_p = \left(\sum_{i=1}^m \sum_{j=1}^n |a_{ij}|^p\right)^{1/p}
$$

Di seguito, alcuni casi più comuni.

#### Norma di Frobenius ($L_2$)
- **Definizione**:  
  $$\|A\|_F = \sqrt{\sum_{i=1}^m \sum_{j=1}^n |a_{ij}|^2} = \sqrt{\text{tr}(A^T A)}.$$
- **Interpretazione**:  
  Generalizza la norma euclidea ai tensori 2D.
- **Applicazioni**:  
  - Misura d'errore tra matrici ($\|A - B\|_F$).  
  - Regolarizzazione in regressione lineare.
#### **Norma $L_{1}$ (Max Colonna)**
- **Definizione**:  
  $$\|A\|_{1} = \max_{1 \leq j \leq n} \sum_{i=1}^m |a_{ij}|.$$
- **Interpretazione**:  
  Massima somma assoluta delle colonne.

#### **Norma $L_{\infty}$ (Max Riga)**

- **Definizione**:  
  $$\|A\|_{\infty} = \max_{1 \leq i \leq m} \sum_{j=1}^n |a_{ij}|.$$
- **Interpretazione**:  
  Massima somma assoluta delle righe.

### 2. **Norma Operatoria (Indotta da $L_2$)**
- **Definizione**:  
  $$\|A\|_{\text{op}} = \max_{\|x\|_2 = 1} \|Ax\|_2 = \sigma_{\text{max}}(A).$$
- **Interpretazione**:  
  Massimo fattore di amplificazione di un vettore unitario.
- **Applicazioni**:  
  - Analisi della stabilità numerica.  
  - Controllo ottimo.

### 3. **Norma Nucleare**
- **Definizione**:  
  $$\|A\|_* = \sum_{i=1}^r \sigma_i \quad (\sigma_i = \text{valori singolari}).$$
- **Interpretazione**:  
  Misura la complessità del rango (rank).
- **Applicazioni**:  
  - Matrix completion (es. Netflix Prize).  
  - Robust PCA.

## Proprietà Fondamentali

### Equivalenza tra Norme
Per $A \in \mathbb{R}^{m \times n}$:
$$
\|A\|_{\text{op}} \leq \|A\|_F \leq \sqrt{\min(m,n)} \|A\|_{\text{op}}.
$$

### Relazione con SVD
Per una matrice $A$ con SVD $U\Sigma V^T$:
- $\|A\|_F = \sqrt{\sum \sigma_i^2}$  
- $\|A\|_{\text{op}} = \sigma_{\text{max}}$  
- $\|A\|_* = \sum \sigma_i$

## Esempi Matematici

### Esempio 1: Norma di Frobenius
Per $A = \begin{pmatrix}1 & 2 \\ 3 & 4\end{pmatrix}$:  
$$
\|A\|_F = \sqrt{1^2 + 2^2 + 3^2 + 4^2} = \sqrt{30} \approx 5.477.
$$

### Esempio 2: Norma Operatoria
Per $A = \begin{pmatrix}3 & 0 \\ 0 & 2\end{pmatrix}$:  
$$
\|A\|_{\text{op}} = 3 \quad (\sigma_{\text{max}} = 3).
$$

## Applicazioni Pratiche

### 1. **[[Regressione Lineare]]**  
Minimizzare:  
$$
\min_W \|Y - XW\|_F^2 + \lambda \|W\|_F^2.
$$

### 2. **Compressione di Dati**  
Approssimare una matrice $A$ con una a basso rango:  
$$
\min_{\text{rango}(B) \leq k} \|A - B\|_F.
$$

### 3. **Riconoscimento di Pattern**  
Utilizzare la norma nucleare per decomporre dati in componenti low-rank + rumore:  
$$
\min_{L,S} \|L\|_* + \lambda \|S\|_1 \quad \text{t.c.} \quad A = L + S.
$$

## Errori Comuni

### 1. **Confondere $\|A\|_1$ Matriciale e Vettoriale**  
- Matriciale: Massima somma colonne.  
- Vettoriale: Somma valori assoluti elementi.

### 2. **Submoltiplicatività Non Universale**  
La norma nucleare **non** soddisfa:  
$$
\|AB\|_* \leq \|A\|_* \|B\|_*.
$$

## Note Correlate
- [[Decomposizione a Valori Singolari (SVD)]]  
- [[Regolarizzazione in Machine Learning]]  
- [[Ottimizzazione Convezza]]  
