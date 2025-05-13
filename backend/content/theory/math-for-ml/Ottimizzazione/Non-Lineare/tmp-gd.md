### Derivazione della forma chiusa per GD con Momentum

Partiamo dalle **equazioni ricorsive** della discesa del gradiente con momentum:

$$
\begin{cases}
\mathbf{v}^{(t+1)} = \lambda\,\mathbf{v}^{(t)} - \alpha \,\nabla \ell\bigl(\Theta^{(t)}\bigr),\\
\Theta^{(t+1)} = \Theta^{(t)} + \mathbf{v}^{(t+1)}.
\end{cases}
$$

Vogliamo **unrollare** queste relazioni fino all’iterazione iniziale $\Theta^{(0)}$.

#### 1. Espressione ricorsiva di $\mathbf{v}^{(t+1)}$

Applichiamo più volte la definizione di $\mathbf{v}$:

$$
\begin{aligned}
\mathbf{v}^{(1)} &= \lambda\,\mathbf{v}^{(0)} - \alpha\,\nabla \ell(\Theta^{(0)}),\\ 
\mathbf{v}^{(2)} &= \lambda\,\mathbf{v}^{(1)} - \alpha\,\nabla \ell(\Theta^{(1)})\\
&= \lambda \bigl(\lambda\,\mathbf{v}^{(0)} - \alpha\,\nabla \ell(\Theta^{(0)})\bigr)
  - \alpha\,\nabla \ell(\Theta^{(1)})\\
&= \lambda^2 \mathbf{v}^{(0)}
  - \alpha \bigl(\lambda\,\nabla \ell(\Theta^{(0)}) + \nabla \ell(\Theta^{(1)})\bigr),
\end{aligned}
$$

e in generale, per $0 \le i \le t$:

$$
\mathbf{v}^{(t+1)}
= \lambda^{\,t+1}\mathbf{v}^{(0)}
- \alpha \sum_{i=0}^{t} \lambda^{\,t-i}\,\nabla \ell\bigl(\Theta^{(i)}\bigr).
$$

Spesso si assume $\mathbf{v}^{(0)}=\mathbf{0}$, da cui:

$$
\mathbf{v}^{(t+1)}
= -\,\alpha \sum_{i=0}^{t} \lambda^{\,t-i}\,\nabla \ell\bigl(\Theta^{(i)}\bigr).
$$

#### 2. Unrolling di $\Theta^{(t+1)}$

Ora inseriamo $\mathbf{v}^{(t+1)}$ nell’aggiornamento di $\Theta$:

$$
\begin{aligned}
\Theta^{(t+1)}
&= \Theta^{(t)} + \mathbf{v}^{(t+1)}\\
&= \Theta^{(t)} 
  - \alpha \sum_{i=0}^{t} \lambda^{\,t-i}\,\nabla \ell\bigl(\Theta^{(i)}\bigr).
\end{aligned}
$$

Ripetendo ricorsivamente l’aggiornamento su $\Theta^{(t)}, \Theta^{(t-1)}, \dots, \Theta^{(0)}$, otteniamo:

$$
\begin{aligned}
\Theta^{(t+1)}
&= \Theta^{(0)}
  - \alpha \sum_{k=0}^{t} \sum_{i=0}^{k} \lambda^{\,k-i}\,\nabla \ell\bigl(\Theta^{(i)}\bigr) \\
&= \Theta^{(0)}
  - \alpha \sum_{i=0}^{t} \Bigl(\sum_{k=i}^{t} \lambda^{\,k-i}\Bigr)\,\nabla \ell\bigl(\Theta^{(i)}\bigr).
\end{aligned}
$$

#### 3. Calcolo della somma geometrica interna

La somma interna $\displaystyle\sum_{k=i}^{t} \lambda^{\,k-i}$ è una **serie geometrica** di ragione $\lambda$ e $t-i+1$ termini:

$$
\sum_{k=i}^{t} \lambda^{\,k-i}
= \sum_{h=0}^{t-i} \lambda^{\,h}
= \frac{1 - \lambda^{\,t-i+1}}{1 - \lambda}.
$$

#### 4. Forma finale

Sostituendo nella formula di $\Theta^{(t+1)}$, otteniamo la forma chiusa:

$$
\boxed{
\Theta^{(t+1)} 
= \Theta^{(0)} 
- \alpha \sum_{i=0}^{t} 
      \underbrace{\frac{1 - \lambda^{\,t-i+1}}{1 - \lambda}}_{\Gamma_i^t}
  \,\nabla \ell\bigl(\Theta^{(i)}\bigr).
}
$$

Qui $\displaystyle\Gamma_i^t = \frac{1 - \lambda^{\,t+1-i}}{1 - \lambda}$ è il **fattore di accumulo** che appare nella figura mostrata.
