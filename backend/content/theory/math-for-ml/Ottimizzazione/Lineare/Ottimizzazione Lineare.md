---
alias: ["Ottimizzazione Lineare", "Programmazione Lineare"]
---

# Ottimizzazione Lineare


## Definizione Formale
L'**ottimizzazione lineare** (o **programmazione lineare**) cerca di ottimizzare una funzione obiettivo lineare soggetta a vincoli lineari:

$$
\begin{align*}
\text{min/max} \quad & \mathbf c^T \mathbf x \\
\text{s.t.} \quad & \mathbf A \mathbf x \leq \mathbf b \\
& \mathbf x \geq 0
\end{align*}
$$

dove:
- $\mathbf x \in \mathbb{R}^n$: vettore delle variabili decisionali
- $\mathbf c \in \mathbb{R}^n$: vettore dei coefficienti della funzione obiettivo
- $\mathbf A \in \mathbb{R}^{m \times n}$: matrice dei vincoli
- $\mathbf b \in \mathbb{R}^m$: termini noti


### Proprietà Strutturali
1. **Convessità**: La regione ammissibile è un insieme convesso
2. **Ottimalità**: Se esiste una soluzione ottima, giace su un vertice ([[Teorema Fondamentale della PL]])
3. **Dualità**: Ogni problema primale ammette un [[Duale Lagrangiano]] con interessanti proprietà

## Linearità come Caso Particolare di Convessità

Una funzione **lineare** $f(x) = c^T x + b$ è sia **convessa** che **concava** per definizione formale.  
Per verificarlo, si applichi la disuguaglianza di Jensen a due punti $x, y \in \mathbb{R}^n$ e $\lambda \in [0,1]$:

$$
\begin{aligned}
f(\lambda x + (1-\lambda)y) &= c^T(\lambda x + (1-\lambda)y) + b \\
&= \lambda c^T x + (1-\lambda)c^T y + b \\
&= \lambda f(x) + (1-\lambda)f(y)
\end{aligned}
$$

Questa uguaglianza soddisfa **entrambe** le condizioni:  
1. $f(\lambda x + (1-\lambda)y) \leq \lambda f(x) + (1-\lambda)f(y)$ (convessità)  
2. $f(\lambda x + (1-\lambda)y) \geq \lambda f(x) + (1-\lambda)f(y)$ (concavità)  

### Implicazioni per l'Ottimizzazione Lineare  
1. **Sempre convessa**:  
   - Funzioni lineari rientrano nella classe delle funzioni convesse  
   - L'insieme ammissibile $\{x \ | \ A x \leq b, x \geq 0\}$ è un poliedro convesso  

2. **Nessuna non-convessità**:  
   - La linearità **esclude** curvature non convesse (es. picchi, valli)  
   - Eventuali "non-convessità" richiederebbero termini non lineari (es. $x^2$, $\sin(x)$), che per definizione non sono ammessi  

**Esempio Istruttivo**:  
Il problema lineare $\min_{x} \ 2x$ con $x \geq 1$:  
- Funzione obiettivo lineare (e quindi convessa)  
- Regione ammissibile convessa ($x \in [1, \infty)$)  
- Soluzione ottima unica a $x = 1$, tipico comportamento convesso  

La linearità è dunque un **caso limite** di convessità, dove le disuguaglianze diventano uguaglianze.  

## Algoritmi Classici
| Metodo                | Complessità          | Caso d'Uso Tipico          |
|-----------------------|----------------------|----------------------------|
| [[Metodo del Simplesso]] | $O(2^n)$ (worst)  | Problemi con $n < 10^4$   |
| [[Algoritmo dei Punti Interni]] | $O(n^{3.5}L)$ | Problemi su larga scala     |
| [[Metodo del Ellissoide]] | $O(n^6L^2)$     | Teoria della complessità    |

## Applicazioni
- [[Pianificazione della Produzione]]: Ottimizzazione mix produttivo
- [[Logistica]]: Problemi di trasporto e assegnazione
- [[Portfolio Optimization]]: Selezione asset finanziari

## Estensioni Importanti
1. **[[Programmazione Lineare Intera]]** (ILP):
   - Variabili discrete $x_i \in \mathbb{Z}$
   - Applicazioni in [[Scheduling]] e [[Routing]]

2. **[[Programmazione Stocastica]]**:
   - Vincoli con parametri probabilistici
   - Usata in [[Pianificazione Energetica]]
