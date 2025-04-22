# Operazioni Elementari su Scalari, Vettori, Matrici e Tensori

Le operazioni elementari su scalari, vettori, matrici e tensori sono fondamentali in matematica e scienze applicate. Questa nota descrive le operazioni di base in modo generico, considerando le dimensionalità degli oggetti coinvolti, senza entrare nei casi particolari.

## Operazioni su Oggetti di Dimensionalità Generica

### 1. **Addizione e Sottrazione**
L'addizione e la sottrazione sono operazioni **elemento per elemento** e possono essere applicate a oggetti della **stessa dimensionalità**.

- **Input**: Due oggetti $A$ e $B$ di dimensionalità identica.
- **Output**: Un oggetto $C$ della stessa dimensionalità, dove ogni elemento è:
  - $C_{i,j,\dots} = A_{i,j,\dots} + B_{i,j,\dots}$ per l'addizione.
  - $C_{i,j,\dots} = A_{i,j,\dots} - B_{i,j,\dots}$ per la sottrazione.

#### Esempio
- Se $A$ e $B$ sono due matrici $2 \times 2$:
  $$
  A = \begin{bmatrix} 1 & 3 \\ 2 & 4 \end{bmatrix}, \quad B = \begin{bmatrix} 5 & 0 \\ -1 & 2 \end{bmatrix}
  $$
  Allora:
  $$
  A + B = \begin{bmatrix} 6 & 3 \\ 1 & 6 \end{bmatrix}, \quad A - B = \begin{bmatrix} -4 & 3 \\ 3 & 2 \end{bmatrix}.
  $$

### 2. **Moltiplicazione per uno Scalare**
La moltiplicazione per uno scalare è un'operazione che **scala** ogni elemento di un oggetto per un valore numerico.

- **Input**: Un oggetto $A$ e uno scalare $k$.
- **Output**: Un oggetto $B$ della stessa dimensionalità di $A$, dove ogni elemento è:
  $$
  B_{i,j,\dots} = k \cdot A_{i,j,\dots}.
  $$

#### Esempio
- Se $A$ è un vettore $[1, 2, 3]$ e $k = 2$, allora:
  $$
  B = [2, 4, 6].
  $$

### 3. **Prodotto tra Oggetti**  
Il prodotto tra oggetti multidimensionali può essere classificato in tre categorie fondamentali, definite dalle regole di interazione tra le loro dimensionalità. La notazione di Einstein (o sommatoria) verrà utilizzata per esprimere le operazioni in modo compatto.

#### **A. Prodotto Interno (Contrazione)**  
Il prodotto interno **contrae** dimensioni condivise tra due oggetti, riducendo la dimensionalità risultante.  

- **Principio**:  
  Dati due oggetti $A$ e $B$ con dimensionalità $(\dots, m)$ e $(m, \dots)$, il prodotto interno "somma" lungo la dimensione condivisa $m$.  
  - **Notazione di Einstein**:  
    $$ C_{\dots i j \dots} = A_{\dots k} \cdot B_{k j \dots} \quad (\text{somma su } k). $$  

- **Esempi**:  
  1. **Prodotto Scalare tra Vettori** (contrazione totale):  
     $$ C = A_i B_i \quad (\text{output: scalare}). $$  
  2. **Prodotto Matrice-Vettore**:  
     $$ C_i = A_{ik} B_k \quad (\text{output: vettore}). $$  
  3. **Contrazione Tensoriale**:  
     $$ C_{ijlm} = A_{ijk} B_{klm} \quad (\text{somma su } k). $$  

#### **B. Prodotto Esterno**  
Il prodotto esterno **combina** due oggetti senza contrarre dimensioni, generando un tensore di rango superiore.  

- **Principio**:  
  Le dimensionalità degli oggetti si concatenano.  
  - **Notazione di Einstein**:  
    $$ C_{i j \dots kl \dots} = A_{i j \dots} \cdot B_{k l \dots} \quad (\text{nessuna somma}). $$  

- **Esempi**:  
  1. **Prodotto Esterno tra Vettori**:  
     $$ C_{ij} = A_i B_j \quad (\text{output: matrice}). $$  
  2. **Prodotto Tensore-Tensore**:  
     $$ C_{ijkl} = A_{ij} B_{kl} \quad (\text{output: tensore 4D}). $$  

#### **C. Somma lungo Assi (Reduce Sum)**  
La somma lungo uno o più assi **riduce la dimensionalità** di un oggetto, aggregando valori lungo direzioni specifiche.  

- **Principio**:  
  $$ C_{\dots} = \sum_{k} A_{\dots k \dots} \quad (\text{elimina l'asse } k). $$  

- **Esempi**:  
  1. **Somma di una Matrice lungo le Colonne**:  
     $$ C_i = \sum_{j} A_{ij} \quad (\text{output: vettore}). $$  
  2. **Somma di un Tensore 3D lungo l'Asse 2**:  
     $$ C_{ik} = \sum_{j} A_{ijk} \quad (\text{output: matrice}). $$  

#### **D. Broadcasting**  
Il broadcasting **espande automaticamente** oggetti di dimensionalità inferiore per allinearli a oggetti di dimensionalità superiore, senza replicare dati fisicamente.  

- **Regole**:  
  1. Allinea le dimensioni da destra.  
  2. Una dimensione pari a $1$ può essere "espansa" a qualsiasi valore.  
  3. Se una dimensione manca, viene trattata come $1$.  

- **Esempi**:  
  1. **Scalare + Matrice**:  
     $$ C_{ij} = A_{ij} + B \quad (B \text{ è trattato come } B_{11}). $$  
  2. **Vettore + Matrice**:  
     $$ C_{ij} = A_{i} + B_{ij} \quad (A \text{ ha dimensionalità } (n, 1)). $$    

## 4. **Trasposizione**  
La trasposizione è un’operazione fondamentale che **riorganizza gli assi** di un oggetto multidimensionale, invertendone o permutandone le dimensioni. Questa operazione generalizza il concetto di "scambio righe-colonne" delle matrici a oggetti di rango superiore.

### **Principio Generale**  
- **Definizione**:  
  Dato un oggetto $A$ con dimensionalità $(d_1, d_2, \dots, d_n)$, la trasposizione produce un nuovo oggetto $A^T$ le cui dimensioni sono una **permutazione** degli assi originali.  
  - Per matrici ($2$D), la trasposizione scambia righe e colonne: $(d_1, d_2) \rightarrow (d_2, d_1)$.  
  - Per tensori ($n$D), è possibile definire qualsiasi permutazione degli assi (es. $(i,j,k) \rightarrow (k,j,i)$).  

- **Notazione di Einstein**:  
  $$ (A^T)_{\dots j i \dots} = A_{\dots i j \dots} \quad \text{(scambio di indici)}. $$  

### **Casi Specifici**  
1. **Matrici (2D)**:  
   - Scambio righe ↔ colonne.  
   - Esempio:  
     $$ 
     A = \begin{pmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \end{pmatrix}, \quad A^T = \begin{pmatrix} 1 & 4 \\ 2 & 5 \\ 3 & 6 \end{pmatrix}. 
     $$  

2. **Tensori (nD)**:  
   - Permutazione personalizzata degli assi.  
   - Esempio (tensore 3D con assi $(i,j,k) \rightarrow (k,i,j)$):  
     $$ 
     A_{ijk} = \text{valore in posizione }(i,j,k), \quad (A^T)_{kij} = A_{ijk}. 
     $$  

### **Proprietà della Trasposizione**  
1. **Invioluzione**:  
   $$ (A^T)^T = A. $$  

2. **Interazione con il Prodotto**:  
   - Per prodotti tra oggetti:  
     $$ (A \cdot B)^T = B^T \cdot A^T \quad \text{(inversione dell'ordine)}. $$  

3. **Effetto sul Broadcasting**:  
   La trasposizione può **allineare dimensioni** per abilitare operazioni tra oggetti inizialmente non compatibili.  
   - Esempio:  
     $$ 
     A_{ij} + B_{i} \quad \text{diventa} \quad A_{ji} + B_{i} \quad \text{(dopo trasposizione di $A$)}.
     $$
4. **Prodotto di una matrice con la sua trasposizione ($X^\top X$)**:
   
    Il prodotto di una matrice con la sua trasposizione produce una matrice simmetrica.

    **Proof**:
      La matrice $\mathbf{X}^\top \mathbf{X}$ è simmetrica perché la sua trasposta è uguale a se setssa:

      $$
        (\mathbf{X}^\top \mathbf{X})^\top = \mathbf{X}^\top (\mathbf{X}^\top)^\top = \mathbf{X}^\top \mathbf{X}.
      $$

      

## Note Correlate

- [[Definizioni di Scalare, Vettore, Matrice e Tensore]]
- [[Proprietà delle Operazioni su Oggetti Multidimensionali]]
- [[Applicazioni delle Operazioni su Scalari, Vettori, Matrici e Tensori]]

Questa nota fornisce una panoramica generica delle operazioni elementari su scalari, vettori, matrici e tensori, con esempi pratici e collegamenti ad argomenti correlati per ulteriori approfondimenti.
