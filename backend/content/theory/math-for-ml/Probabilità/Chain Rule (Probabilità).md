---
title: La Regola della Catena in Probabilità
tags: [probabilità, statistica, teoria-della-probabilità, catena-regola]
date: 2025-04-03
---

# La Regola della Catena in Probabilità

In teoria della probabilità la **regola della catena** (o *general product rule*) permette di calcolare la probabilità dell'intersezione di eventi (o la distribuzione congiunta di variabili casuali) in termini di probabilità condizionate. Questa regola risulta particolarmente utile in contesti dove gli eventi non sono necessariamente indipendenti, come nei processi stocastici discreti e nelle reti bayesiane.

## 1. Regola della Catena per Eventi

### 1.1 Due Eventi

Per due eventi $A$ e $B$ la regola della catena si esprime come:
$$
\mathbb{P}(A \cap B) = \mathbb{P}(B \mid A) \, \mathbb{P}(A)
$$
dove $\mathbb{P}(B \mid A)$ rappresenta la probabilità condizionata dell'evento $B$ dato $A$.

#### Esempio: Estrazione da Urna
Consideriamo due urne:
- Urna $A$ contiene 1 pallina nera e 2 palline bianche.
- Urna $B$ contiene 1 pallina nera e 3 palline bianche.

Se scegliamo a caso un'urna (con probabilità $\mathbb{P}(A) = \mathbb{P}(\overline{A}) = \frac{1}{2}$) e poi estraiamo una pallina, definiamo:
- $A$: scelta della prima urna.
- $B$: estrazione di una pallina bianca.

La probabilità di estrarre una pallina bianca, dato che abbiamo scelto la prima urna, è:
$$
\mathbb{P}(B \mid A) = \frac{2}{3}.
$$
Quindi, usando la regola della catena:
$$
\mathbb{P}(A \cap B) = \mathbb{P}(B \mid A) \, \mathbb{P}(A) = \frac{2}{3} \cdot \frac{1}{2} = \frac{1}{3}.
$$

### 1.2 Finiti Eventi

Per $n$ eventi $A_1, A_2, \dots, A_n$ (con intersezione non nulla) la regola della catena è:
$$
\mathbb{P}(A_1 \cap A_2 \cap \cdots \cap A_n) = \prod_{k=1}^{n} \mathbb{P}\Bigl(A_k \mid \bigcap_{j=1}^{k-1} A_j\Bigr),
$$
dove per convenzione l'intersezione vuota (per $k=1$) si intende come $\mathbb{P}(A_1)$.

#### Esempio per $n=4$

La probabilità congiunta di quattro eventi si scrive:
$$
\mathbb{P}(A_1 \cap A_2 \cap A_3 \cap A_4) = \mathbb{P}(A_1) \, \mathbb{P}(A_2 \mid A_1) \, \mathbb{P}(A_3 \mid A_1 \cap A_2) \, \mathbb{P}(A_4 \mid A_1 \cap A_2 \cap A_3).
$$

#### Esempio: Estrazione di Carte

Consideriamo l'estrazione senza reinserimento di 4 carte da un mazzo di 52 carte. Vogliamo calcolare la probabilità di estrarre 4 assi. Definiamo per $n=1,2,3,4$:
$$
A_n = \{ \text{estraiamo un asso al } n\text{-esimo tentativo} \}.
$$
Le probabilità sono:
- $\mathbb{P}(A_1) = \frac{4}{52}$,
- $\mathbb{P}(A_2 \mid A_1) = \frac{3}{51}$,
- $\mathbb{P}(A_3 \mid A_1 \cap A_2) = \frac{2}{50}$,
- $\mathbb{P}(A_4 \mid A_1 \cap A_2 \cap A_3) = \frac{1}{49}$.

Applicando la regola della catena:
$$
\mathbb{P}(A_1 \cap A_2 \cap A_3 \cap A_4) = \frac{4}{52} \cdot \frac{3}{51} \cdot \frac{2}{50} \cdot \frac{1}{49} = \frac{24}{6497400}.
$$

## 2. Enunciato del Teorema e Dimostrazione

Sia $(\Omega, \mathcal{A}, \mathbb{P})$ uno spazio di probabilità e siano $A_1, A_2, \dots, A_n \in \mathcal{A}$. Ricordiamo che la probabilità condizionata è definita come:
$$
\mathbb{P}(A \mid B) :=
\begin{cases}
\frac{\mathbb{P}(A \cap B)}{\mathbb{P}(B)} & \text{se } \mathbb{P}(B) > 0,\\
0 & \text{se } \mathbb{P}(B) = 0.
\end{cases}
$$

Sia \((\Omega, \mathcal{A}, \mathbb{P})\) uno spazio di probabilità. Siano $A_1, A_2, \dots, A_n \in \mathcal{A}$. Allora si ha:

$$
\mathbb{P} (A_1 \cap A_2 \cap \dots \cap A_n) = \mathbb{P} (A_1) \prod_{j=2}^{n} \mathbb{P} (A_j \mid A_1 \cap \dots \cap A_{j-1}).
$$

### Dimostrazione
Procediamo per induzione su $n$.

#### Caso base ($n = 2$)  
Dalla definizione di probabilità condizionata, sappiamo che:

$$
\mathbb{P}(A_1 \cap A_2) = \mathbb{P}(A_1) \mathbb{P}(A_2 \mid A_1).
$$

Questo verifica la formula per $n = 2$.

#### Passo induttivo  
Supponiamo che la formula sia vera per $n-1$, ossia:

$$
\mathbb{P} (A_1 \cap A_2 \cap \dots \cap A_{n-1}) = \mathbb{P} (A_1) \prod_{j=2}^{n-1} \mathbb{P} (A_j \mid A_1 \cap \dots \cap A_{j-1}).
$$

Dalla definizione di probabilità condizionata, possiamo scrivere:

$$
\mathbb{P} (A_1 \cap A_2 \cap \dots \cap A_n) = \mathbb{P} (A_1 \cap A_2 \cap \dots \cap A_{n-1}) \mathbb{P} (A_n \mid A_1 \cap A_2 \cap \dots \cap A_{n-1}).
$$

Sostituendo l'ipotesi induttiva, otteniamo:

$$
\mathbb{P} (A_1 \cap A_2 \cap \dots \cap A_n) = \left( \mathbb{P} (A_1) \prod_{j=2}^{n-1} \mathbb{P} (A_j \mid A_1 \cap \dots \cap A_{j-1}) \right) \mathbb{P} (A_n \mid A_1 \cap A_2 \cap \dots \cap A_{n-1}).
$$

Che si riscrive come:

$$
\mathbb{P} (A_1 \cap A_2 \cap \dots \cap A_n) = \mathbb{P} (A_1) \prod_{j=2}^{n} \mathbb{P} (A_j \mid A_1 \cap \dots \cap A_{j-1}).
$$

Questo conclude il passo induttivo e quindi la dimostrazione per ogni $n \geq 2$. $\square$

Ripetendo questo procedimento per $n$ eventi si ottiene la formula generale.

## 3. Regola della Catena per Variabili Casuali Discrete

### 3.1 Due Variabili Casuali

Sia $X$ e $Y$ due variabili casuali discrete. Considerando gli eventi
$$
A := \{X=x\} \quad \text{e} \quad B := \{Y=y\},
$$
dalla definizione di probabilità condizionata otteniamo:
$$
\mathbb{P}(X=x, Y=y) = \mathbb{P}(X=x \mid Y=y) \, \mathbb{P}(Y=y).
$$
Alternativamente:
$$
\mathbb{P}_{(X,Y)}(x,y) = \mathbb{P}_{X\mid Y}(x\mid y) \, \mathbb{P}_Y(y),
$$
dove $\mathbb{P}_X(x) := \mathbb{P}(X=x)$ è la distribuzione marginale di $X$.

### 3.2 Finiti Variabili Casuali

Sia $X_1, X_2, \dots, X_n$ un insieme di variabili casuali e siano $x_1, x_2, \dots, x_n \in \mathbb{R}$. Utilizzando la definizione di probabilità condizionata per gli eventi
$$
A_k := \{X_k = x_k\},
$$
la distribuzione congiunta si esprime come:
$$
\begin{aligned}
\mathbb{P}(X_1 = x_1, \dots, X_n = x_n)
&=\mathbb{P}(X_1 = x_1) \, \mathbb{P}(X_2 = x_2 \mid X_1 = x_1) \\
&\quad \cdot \mathbb{P}(X_3 = x_3 \mid X_1 = x_1, X_2 = x_2) \cdots \mathbb{P}(X_n = x_n \mid X_1 = x_1, \dots, X_{n-1} = x_{n-1}).
\end{aligned}
$$
Per $n=3$ abbiamo:
$$
\mathbb{P}(X_1=x_1,X_2=x_2,X_3=x_3) = \mathbb{P}_{X_3\mid X_2,X_1}(x_3\mid x_2,x_1) \, \mathbb{P}_{X_2\mid X_1}(x_2\mid x_1) \, \mathbb{P}_{X_1}(x_1).
$$

## 4. Conclusioni

La regola della catena è uno strumento fondamentale in probabilità, in quanto permette di scomporre una probabilità congiunta complessa in una sequenza di probabilità condizionate più semplici. Tale tecnica trova ampio impiego in:

- **Processi stocastici discreti**
- **Reti bayesiane**
- **Modelli statistici complessi**

Comprendere e applicare correttamente questa regola è essenziale per analizzare sistemi probabilistici dove le dipendenze tra eventi o variabili casuali non sono indipendenti.

## Riferimenti

- Wikipedia, "Chain rule (probability)". (Testo originale in inglese).
- [Wikipedia](https://en.wikipedia.org/wiki/Chain_rule_(probability))
