# Dimostrazione: La matrice $\mathbf{X}^\top \mathbf{X} + \lambda \mathbf{I}$ è sempre invertibile per $\lambda > 0$

Vogliamo dimostrare che se $\lambda > 0$, allora la matrice 

$$
\mathbf{M} = \mathbf{X}^\top \mathbf{X} + \lambda \mathbf{I}
$$

è sempre invertibile. Dimostrare l'invertibilità di $\mathbf{M}$ equivale a verificare che essa sia **definita positiva**, ossia che per ogni vettore non nullo $\mathbf{v} \in \mathbb{R}^{m+1}$, si ha:

$$
\mathbf{v}^\top \mathbf{M} \mathbf{v} > 0.
$$


## Passo 1: Simmetria della matrice $\mathbf{M}$

Dimostriamo che $\mathbf{M}$ è simmetrica.  

- La matrice $\mathbf{X}^\top \mathbf{X}$ è simmetrica perché:

  $$
  (\mathbf{X}^\top \mathbf{X})^\top = \mathbf{X}^\top (\mathbf{X}^\top)^\top = \mathbf{X}^\top \mathbf{X}.
  $$

- La matrice identità $\mathbf{I}$ è ovviamente simmetrica, poiché $\mathbf{I}^\top = \mathbf{I}$.

- La somma di due matrici simmetriche è ancora una matrice simmetrica:

  $$
  \mathbf{M}^\top = (\mathbf{X}^\top \mathbf{X} + \lambda \mathbf{I})^\top = \mathbf{X}^\top \mathbf{X} + \lambda \mathbf{I} = \mathbf{M}.
  $$

Quindi, $\mathbf{M}$ è **simmetrica**.

## (1) Se $\mathbf{M}$ è definita positiva, allora $\mathbf{M}$ è invertibile

**Assunzione:** Per ogni vettore $\mathbf{v} \neq \mathbf{0}$ in $\mathbb{R}^{m+1}$ si ha

$$
\mathbf{v}^\top \mathbf{M} \mathbf{v} > 0.
$$

**Dimostrazione:**

1. Poiché $\mathbf{M}$ è simmetrica (già dimostrato precedentemente), essa ammette una decomposizione spettrale:
   $$
   \mathbf{M} = \mathbf{Q} \mathbf{\Lambda} \mathbf{Q}^\top,
   $$
   dove $\mathbf{Q}$ è una matrice ortogonale e $\mathbf{\Lambda}$ è una matrice diagonale con autovalori $\lambda_1, \lambda_2, \dots, \lambda_{m+1}$.

2. Sia $\mathbf{v} = \mathbf{Q}\mathbf{u}$, con $\mathbf{u} \neq \mathbf{0}$. Allora:
   $$
   \mathbf{v}^\top \mathbf{M} \mathbf{v} = (\mathbf{Q}\mathbf{u})^\top \mathbf{Q} \mathbf{\Lambda} \mathbf{Q}^\top (\mathbf{Q}\mathbf{u})
   = \mathbf{u}^\top \mathbf{\Lambda} \mathbf{u}
   = \sum_{i=1}^{m+1} \lambda_i u_i^2.
   $$

3. Poiché per ogni $\mathbf{v} \neq \mathbf{0}$ abbiamo $\mathbf{v}^\top \mathbf{M} \mathbf{v} > 0$, risulta che:
   $$
   \sum_{i=1}^{m+1} \lambda_i u_i^2 > 0 \quad \text{per ogni } \mathbf{u} \neq \mathbf{0}.
   $$
   Questo implica che ciascun autovalore $\lambda_i$ deve essere strettamente positivo (cioè, $\lambda_i > 0$ per ogni $i$); altrimenti, si potrebbe scegliere un vettore $\mathbf{u}$ tale da annullare il contributo relativo a un eventuale autovalore nullo, contraddicendo la positività della forma quadratica.

4. Se tutti gli autovalori sono strettamente positivi, allora il determinante di $\mathbf{M}$ è:
   $$
   \det(\mathbf{M}) = \prod_{i=1}^{m+1} \lambda_i > 0.
   $$
   Un determinante non nullo implica che $\mathbf{M}$ è invertibile.

## (2) Se $\mathbf{M}$ è invertibile, allora $\mathbf{M}$ è definita positiva

**Assunzione:** $\mathbf{M}$ è invertibile, cioè $\det(\mathbf{M}) \neq 0$.

**Dimostrazione:**

1. Poiché $\mathbf{M}$ è simmetrica, anche qui possiamo applicare la decomposizione spettrale:
   $$
   \mathbf{M} = \mathbf{Q} \mathbf{\Lambda} \mathbf{Q}^\top,
   $$
   con autovalori reali $\lambda_1, \dots, \lambda_{m+1}$.

2. L'invertibilità di $\mathbf{M}$ implica che nessuno degli autovalori è zero, cioè $\lambda_i \neq 0$ per ogni $i$.

3. Per dimostrare che $\mathbf{M}$ è definita positiva, dobbiamo verificare che per ogni $\mathbf{v} \neq \mathbf{0}$:
   $$
   \mathbf{v}^\top \mathbf{M} \mathbf{v} = \sum_{i=1}^{m+1} \lambda_i u_i^2 > 0.
   $$
   Supponiamo per assurdo che esista almeno un autovalore negativo, cioè esiste $j$ tale che $\lambda_j < 0$. Allora, scegliendo un vettore $\mathbf{u}$ tale che $u_j \neq 0$ e $u_i = 0$ per $i \neq j$, avremmo:
   $$
   \mathbf{v}^\top \mathbf{M} \mathbf{v} = \lambda_j u_j^2 < 0,
   $$
   contraddicendo l'invertibilità "ben comportata" delle forme quadratiche per matrici simmetriche invertibili. In realtà, per matrici simmetriche, l'invertibilità non basta da sola a garantire la definitezza positiva; occorre anche che la forma quadratica associata sia strettamente positiva. Nel contesto in cui $\mathbf{M} = \mathbf{X}^\top \mathbf{X} + \lambda \mathbf{I}$ con $\lambda > 0$, il termine $\lambda \mathbf{I}$ garantisce proprio che non possano esistere autovalori negativi (vedi la parte relativa alla regolarizzazione nella dimostrazione completa).

4. Quindi, in questo caso particolare, l'invertibilità di $\mathbf{M}$ implica che tutti gli autovalori devono essere strettamente positivi, e dunque:
   $$
   \mathbf{v}^\top \mathbf{M} \mathbf{v} > 0 \quad \text{per ogni } \mathbf{v} \neq \mathbf{0}.
   $$
   Questo significa che $\mathbf{M}$ è definita positiva.

## Passo 2: Espressione del prodotto quadratico $\mathbf{v}^\top \mathbf{M} \mathbf{v}$

Consideriamo il prodotto quadratico associato a $\mathbf{M}$:

$$
\mathbf{v}^\top \mathbf{M} \mathbf{v} = \mathbf{v}^\top (\mathbf{X}^\top \mathbf{X} + \lambda \mathbf{I}) \mathbf{v}.
$$

Usiamo la distributività del prodotto scalare:

$$
\mathbf{v}^\top \mathbf{X}^\top \mathbf{X} \mathbf{v} + \lambda \mathbf{v}^\top \mathbf{I} \mathbf{v}.
$$

Poiché il prodotto con la matrice identità è semplicemente la norma quadrata:

$$
\mathbf{v}^\top \mathbf{I} \mathbf{v} = \|\mathbf{v}\|^2,
$$

otteniamo:

$$
\mathbf{v}^\top \mathbf{X}^\top \mathbf{X} \mathbf{v} + \lambda \|\mathbf{v}\|^2.
$$

## Passo 3: Proprietà di semidefinitezza di $\mathbf{X}^\top \mathbf{X}$

Dimostriamo ora che $\mathbf{X}^\top \mathbf{X}$ è **semidefinita positiva**.

### Dimostrazione della semidefinitezza positiva di $\mathbf{X}^\top \mathbf{X}$

Per ogni vettore $\mathbf{v} \neq 0$, consideriamo il prodotto quadratico:

$$
\mathbf{v}^\top \mathbf{X}^\top \mathbf{X} \mathbf{v}.
$$

Riscriviamolo come:

$$
(\mathbf{X} \mathbf{v})^\top (\mathbf{X} \mathbf{v}) = \|\mathbf{X} \mathbf{v}\|^2.
$$

Poiché la norma euclidea al quadrato di un vettore è sempre **non negativa**, segue che:

$$
\mathbf{v}^\top \mathbf{X}^\top \mathbf{X} \mathbf{v} \geq 0, \quad \forall \mathbf{v} \neq 0.
$$

Ciò dimostra che $\mathbf{X}^\top \mathbf{X}$ è **semidefinita positiva**.

Se $\mathbf{X}$ ha rango massimo (ovvero se le sue colonne sono linearmente indipendenti), allora $\mathbf{X}^\top \mathbf{X}$ è anche **definita positiva**, cioè:

$$
\mathbf{v}^\top \mathbf{X}^\top \mathbf{X} \mathbf{v} > 0, \quad \forall \mathbf{v} \neq 0.
$$

Tuttavia, in generale, se $\mathbf{X}$ non ha rango massimo, $\mathbf{X}^\top \mathbf{X}$ potrebbe avere autovalori nulli, rendendola **non invertibile**.

## Passo 4: Effetto della regolarizzazione

Introduciamo ora il termine di regolarizzazione $\lambda \mathbf{I}$.  

Sappiamo che $\mathbf{X}^\top \mathbf{X}$ è **semidefinita positiva**, quindi:

$$
\mathbf{v}^\top \mathbf{X}^\top \mathbf{X} \mathbf{v} \geq 0.
$$

Il termine aggiuntivo $\lambda \|\mathbf{v}\|^2$ è **strettamente positivo** per ogni $\mathbf{v} \neq 0$ se $\lambda > 0$. Quindi:

$$
\mathbf{v}^\top \mathbf{X}^\top \mathbf{X} \mathbf{v} + \lambda \|\mathbf{v}\|^2 > 0, \quad \forall \mathbf{v} \neq 0.
$$

Questo dimostra che $\mathbf{M}$ è **definita positiva**.

## Conclusione

Abbiamo dimostrato che per $\lambda > 0$, la matrice:

$$
\mathbf{M} = \mathbf{X}^\top \mathbf{X} + \lambda \mathbf{I}
$$

è **definita positiva** e quindi **sempre invertibile**.  

Questo garantisce che la soluzione del problema di regressione regolarizzata:

$$
\mathbf{w} = (\mathbf{X}^\top \mathbf{X} + \lambda \mathbf{I})^{-1} \mathbf{X}^\top \mathbf{y}
$$

è ben definita, eliminando i problemi di non invertibilità che potrebbero verificarsi in assenza della regolarizzazione.
