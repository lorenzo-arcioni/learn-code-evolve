
### 5. Proprietà spettrali di $A^T A$ e $A A^T$

A partire dall’**SVD** $A = U\Sigma V^\top$, mostriamo che:

- $\{\mathbf{v}_i\}$ sono autovettori di $A^T A$,
- $\{\mathbf{u}_i\}$ sono autovettori di $A A^T$,
- entrambe le famiglie sono ortonormali.

1. **Azione di $A^T A$ su $\mathbf{v}_i$**  
   Dall’SVD abbiamo
   $$
     A\mathbf{v}_i = \sigma_i \,\mathbf{u}_i.
   $$
   Applichiamo $A^T$ a entrambi i lati:
   $$
     A^T(A\mathbf{v}_i)
     = A^T(\sigma_i\,\mathbf{u}_i)
     = \sigma_i\,(A^T \mathbf{u}_i).
   $$
   Ma
   $$
     A^T \mathbf{u}_i
     = A^T\!\Bigl(\tfrac{1}{\sigma_i}A\mathbf{v}_i\Bigr)
     = \tfrac{1}{\sigma_i}\,(A^T A)\,\mathbf{v}_i.
   $$
   Combinando,
   $$
     (A^T A)\,\mathbf{v}_i = \sigma_i^2\,\mathbf{v}_i.
   $$
   **Conclusione:** $\mathbf{v}_i$ è autovettore di $A^T A$ con autovalore $\sigma_i^2$.

2. **Ortonormalità di $\{\mathbf{v}_i\}$**  
   - $A^T A$ è simmetrica $\Rightarrow$ i suoi autovettori associati ad autovalori distinti sono ortogonali.  
   - Poiché i $\sigma_i^2$ sono distinti (o li ordiniamo), otteniamo $\mathbf{v}_i^\top \mathbf{v}_j = 0$ per $i \neq j$.

3. **Azione di $A A^T$ su $\mathbf{u}_i$**  
   Similmente, da $A^T\mathbf{u}_i = \sigma_i \,\mathbf{v}_i$,
   $$
     A\,(A^T\mathbf{u}_i)
     = A\,(\sigma_i\,\mathbf{v}_i)
     = \sigma_i\,(A\mathbf{v}_i)
     = \sigma_i^2\,\mathbf{u}_i,
   $$
   cioè
   $$
     (A A^T)\,\mathbf{u}_i = \sigma_i^2\,\mathbf{u}_i.
   $$
   **Conclusione:** $\mathbf{u}_i$ è autovettore di $A A^T$ con autovalore $\sigma_i^2$.

4. **Ortonormalità di $\{\mathbf{u}_i\}$**  
   - $A A^T$ è simmetrica $\Rightarrow$ i suoi autovettori associati ad autovalori distinti sono ortogonali.  
   - Quindi $\mathbf{u}_i^\top \mathbf{u}_j = 0$ per $i \neq j$, e $||\mathbf{u}_i|| = 1$.

**In sintesi**, dalla decomposizione $A = U\Sigma V^\top$ otteniamo in modo naturale che:
- le colonne di $V$ (i $\mathbf{v}_i$) diagonalizzano $A^T A$,
- le colonne di $U$ (i $\mathbf{u}_i$) diagonalizzano $A A^T$,
- entrambe le famiglie $\{\mathbf{v}_i\}$ e $\{\mathbf{u}_i\}$ sono basi ortonormali nei rispettivi spazi.
CON

Proviamo ora che ogni $\mathbf u_i$ è autovettore di $A A^\top$, e poi usiamo la simmetria per dedurre l’ortonormalità.

1. **Azione di $A A^\top$ su $\mathbf u_i$**  
   Partiamo da  
   $$
     A^\top\,\mathbf u_i = \sigma_i\,\mathbf v_i
     \quad\Longrightarrow\quad
     A\bigl(A^\top \mathbf u_i\bigr)
     = A\bigl(\sigma_i\,\mathbf v_i\bigr)
     = \sigma_i\,(A\,\mathbf v_i)
     = \sigma_i^2\,\mathbf u_i.
   $$
   Quindi  
   $$
     (A A^\top)\,\mathbf u_i = \sigma_i^2\,\mathbf u_i,
   $$
   cioè $\mathbf u_i$ è autovettore di $A A^\top$ con autovalore $\sigma_i^2$.

2. **Simmetria di $A A^\top$ ⇒ ortogonalità**  
   Poiché $A A^\top$ è simmetrica, i suoi autovettori corrispondenti ad autovalori distinti sono ortogonali.  
   Inoltre, per definizione $\|\mathbf u_i\|=1$.  

   **Conclusione:** $\{\mathbf u_i\}$ è una famiglia ortonormale in $\mathbb{R}^m$.

E CON

$(A^\top A)\,\mathbf{v}_i = \sigma_i^2\,\mathbf{v}_i$

A partire dall’SVD  
$$
A = U\,\Sigma\,V^\top,
$$
abbiamo per definizione
$$
A\,\mathbf{v}_i = \sigma_i\,\mathbf{u}_i.
$$

1. **Espansione di $A^\top \mathbf{u}_i$ nella base $\{\mathbf{v}_j\}$**  
   Poiché $\{\mathbf{v}_j\}_{j=1}^n$ è una base ortonormale di $\mathbb{R}^n$, possiamo scrivere  
   $$
   A^\top \mathbf{u}_i
   = \sum_{j=1}^n \bigl(\mathbf{v}_j^\top (A^\top \mathbf{u}_i)\bigr)\,\mathbf{v}_j.
   $$
   Ma  
   $$
   \mathbf{v}_j^\top (A^\top \mathbf{u}_i)
   = (A\,\mathbf{v}_j)^\top\,\mathbf{u}_i.
   $$

2. **Calcolo del coefficiente $(A\,\mathbf{v}_j)^\top\mathbf{u}_i$**  
   Dall’SVD, $A\,\mathbf{v}_j = \sigma_j\,\mathbf{u}_j$. Quindi  
   $$
   (A\,\mathbf{v}_j)^\top \mathbf{u}_i
   = (\sigma_j\,\mathbf{u}_j)^\top \mathbf{u}_i
   = \sigma_j\,(\mathbf{u}_j^\top \mathbf{u}_i)
   = \sigma_j\,\delta_{ji},
   $$
   dove $\delta_{ji}$ è il delta di Kronecker (uguale a 1 se $j=i$, 0 altrimenti).

3. **Semplificazione della somma**  
   $$
   A^\top \mathbf{u}_i
   = \sum_{j=1}^n \sigma_j\,\delta_{ji}\,\mathbf{v}_j
   = \sigma_i\,\mathbf{v}_i.
   $$

4. **Conclusione sullo spettro di $A^\top A$**  
   Ora applichiamo $A^\top$ all’equazione originale:
   $$
     A^\top\bigl(A\,\mathbf{v}_i\bigr)
     = A^\top(\sigma_i\,\mathbf{u}_i)
     = \sigma_i\,(A^\top \mathbf{u}_i)
     = \sigma_i\,(\sigma_i\,\mathbf{v}_i)
     = \sigma_i^2\,\mathbf{v}_i.
   $$
   Da cui:
   $$
     (A^\top A)\,\mathbf{v}_i = \sigma_i^2\,\mathbf{v}_i,
   $$
   cioè $\mathbf{v}_i$ è autovettore di $A^\top A$ con autovalore $\sigma_i^2$.
