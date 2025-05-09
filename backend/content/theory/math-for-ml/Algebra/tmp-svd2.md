### 👻 Proprietà spettrali di $A^T A$ e $A A^T$

**Ipotesi**  
Sia $\{\mathbf v_i\}_{i=1}^n$ un insieme di vettori ortonormali tali che  
$$
A^T A\,\mathbf v_i = \sigma_i^2\,\mathbf v_i,
\qquad i=1,\dots,n
$$  
cioè i $\mathbf v_i$ sono già autovettori di $A^T A$ con autovalori $\sigma_i^2$.

**Obiettivo**  
Dimostrare che  
1. $\{\mathbf u_i\}$, definiti da $\mathbf u_i = \tfrac1{\sigma_i}A\,\mathbf v_i$, sono autovettori di $A A^T$.  
2. Gli autovalori corrispondenti sono anch’essi $\sigma_i^2$.

1.  **Definizione di $\mathbf u_i$**  
    Poiché $\mathbf v_i$ è autovettore di $A^T A$ con autovalore $\sigma_i^2$, poniamo  
    $$
      \mathbf u_i \;:=\;\frac{A\,\mathbf v_i}{\|A\,\mathbf v_i\|}
      = \frac{A\,\mathbf v_i}{\sigma_i}.
    $$  
    Perché $\sigma_i > 0$ (valore singolare), questa definizione è ben posta e $\|\mathbf u_i\|=1$.

2.  **Calcolo di $A A^T\,\mathbf u_i$**  
    Partiamo da  
    $$
      \mathbf u_i = \frac1{\sigma_i}A\,\mathbf v_i
      \;\Longrightarrow\;
      A^T\,\mathbf u_i = \frac1{\sigma_i}A^T A\,\mathbf v_i
      = \frac1{\sigma_i}\,\sigma_i^2\,\mathbf v_i
      = \sigma_i\,\mathbf v_i.
    $$  
    Ora applichiamo $A$ a questa relazione:
    $$
      A A^T\,\mathbf u_i
      = A\bigl(\sigma_i\,\mathbf v_i\bigr)
      = \sigma_i\,A\,\mathbf v_i
      = \sigma_i\bigl(\sigma_i\,\mathbf u_i\bigr)
      = \sigma_i^2\,\mathbf u_i.
    $$

3.  **Conclusione sugli autovettori di $A A^T$**  
    Abbiamo mostrato che
    $$
      (A A^T)\,\mathbf u_i = \sigma_i^2\,\mathbf u_i,
    $$
    dunque ciascuno $\mathbf u_i$ è autovettore di $A A^T$ con autovalore $\sigma_i^2$.

4.  **Ortonormalità**  
    - Gli $\mathbf v_i$ erano ortonormali per ipotesi.  
    - Gli $\mathbf u_i$, essendo ottenuti da vettori ortonormali $\mathbf v_i$ mediante l’operazione $A$ seguita da normalizzazione, risultano anch’essi ortonormali (si verifica $u_i^T u_j=0$ per $i\neq j$ e $=1$ per $i=j$ in modo analogo al caso di $v_i$).

**Risultato finale**  
- $A^T A$ ha autovettori $\{\mathbf v_i\}$ con autovalori $\{\sigma_i^2\}$.  
- $A A^T$ ha autovettori $\{\mathbf u_i\}$ con gli stessi autovalori $\{\sigma_i^2\}$.  
- Entrambe le famiglie di autovettori sono ortonormali.  

Questa doppia proprietà spettrale è al cuore della struttura della SVD $A = U\,\Sigma\,V^T$.  
