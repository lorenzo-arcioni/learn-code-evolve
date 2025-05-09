# 📌 Vettori - Teoria Approfondita

## 🧠 Definizione Formale

Un **vettore** è un elemento di uno **spazio vettoriale**. Intuitivamente, un vettore può essere pensato come:
- Un oggetto che ha **direzione**, **verso** e **modulo** (interpretazione geometrica).
- Una **tupla ordinata** di numeri reali o complessi (interpretazione algebrica).

### ✍️ [[Spazio Vettoriale]]

Sia $\mathbb{F}$ un campo (es. $\mathbb{R}$ o $\mathbb{C}$) e $V$ un insieme non vuoto. $V$ è uno **spazio vettoriale** su $\mathbb{F}$ se è dotato di due operazioni:

- **Addizione vettoriale**: $+ : V \times V \rightarrow V$
- **Moltiplicazione per scalare**: $\cdot : \mathbb{F} \times V \rightarrow V$

Tali operazioni devono soddisfare gli assiomi degli spazi vettoriali (chiusura, associatività, elemento neutro, inverso additivo, distributività, etc.).

### 📐 Rappresentazione Geometrica

Un vettore in $\mathbb{R}^n$ può essere rappresentato come una **freccia** che parte dall'origine e arriva al punto determinato dalle sue coordinate.

Esempio in $\mathbb{R}^2$:

Un vettore $\vec{v} = (3, 4)$ è un segmento che parte dall'origine $(0,0)$ e termina in $(3,4)$.

## 📊 Notazione

- Colonna: $\vec{v} = \begin{bmatrix} v_1 \\ v_2 \\ \vdots \\ v_n \end{bmatrix}$
- Riga: $\vec{v}^\top = [v_1, v_2, ..., v_n]$

## ➕ Somma di Vettori

Dati $\vec{u}, \vec{v} \in \mathbb{R}^n$, la **somma** è definita come:

$$
\vec{u} + \vec{v} = \begin{bmatrix}u_1 + v_1\\ u_2 + v_2\\ \ldots\\ u_n + v_n\end{bmatrix}
$$

### 🧭 Interpretazione Geometrica

- La somma corrisponde alla **regola del parallelogramma**.
- A livello grafico: trasla $\vec{v}$ in modo che il suo punto iniziale coincida con il termine di $\vec{u}$; il vettore risultante è dalla origine alla sommità del parallelogramma.

Prendiamo ad esempio il vettore $\vec{u} = (1,2)$ e il vettore $\vec{v} = (2,-1)$. La loro somma risulta essere $\vec{u} + \vec{v} = (3,1)$, come mostra l'immagine.

<img src="../../images/vec-add.svg" alt="Sum Vectors" style="width: 500px; display: block; margin-left: auto; margin-right: auto"/>

## 🔁 Moltiplicazione per uno scalare

Dato uno scalare $\alpha \in \mathbb{R}$ e un vettore $\vec{v} \in \mathbb{R}^n$:

$$
\alpha \vec{v} = \begin{bmatrix}\alpha v_1\\ \alpha v_2\\ \ldots\\ \alpha v_n\end{bmatrix}
$$

### 📏 Interpretazione Geometrica

- Cambia la **lunghezza** del vettore (modulo) e, se $\alpha < 0$, anche il **verso**.

## 📏 Norma (lunghezza) di un vettore

Per $\vec{v} \in \mathbb{R}^n$:

$$
\|\vec{v}\| = \sqrt{v_1^2 + v_2^2 + \ldots + v_n^2}
$$

Interpretazione geometrica: distanza euclidea tra l'origine e il punto finale del vettore.

## 🔲 Prodotto Scalare (Inner Product)

Per due vettori $\vec{u}, \vec{v} \in \mathbb{R}^n$:

$$
\vec{u} \cdot \vec{v} = u_1 v_1 + u_2 v_2 + \ldots + u_n v_n = \sum_{i=1}^{n} u_i v_i
$$

### 🧭 Interpretazione Geometrica

$$
\vec{u} \cdot \vec{v} = \|\vec{u}\| \|\vec{v}\| \cos(\theta)
$$

Dove $\theta$ è l'angolo tra i due vettori.

#### 🔹 Casi Particolari:
- $\vec{u} \cdot \vec{v} = 0$ ⟹ i vettori sono **ortogonali**.
- $\vec{u} \cdot \vec{v} > 0$ ⟹ angolo acuto.
- $\vec{u} \cdot \vec{v} < 0$ ⟹ angolo ottuso.

Questa non è altro che la formula della similarità coseno, infatti:

$$
\cos(\theta) = \frac{\vec{u} \cdot \vec{v}}{\|\vec{u}\| \|\vec{v}\|}
$$

👉 [[Misure di Similarità Vettoriale|Qui]] c'è un approfondimento sulle metriche di similarità tra vettori, tra cui anche la similarità coseno (o distanza coseno).

Per trovare $\theta$ basta calcolare quindi 

$$
\theta = \arccos\left(\frac{\vec{u} \cdot \vec{v}}{\|\vec{u}\| \|\vec{v}\|}\right).
$$

#### Esempio:

Consideriamo ad esempio i vettori $\vec {u} = (2, 2)$ e $\vec{v} = (3, -1)$. Il loro prodotto scalare vale:

$$
\vec{u} \cdot \vec{v} = 2 \cdot 3 + 2 \cdot (-1) = 6 + -2 = 4.
$$
<img src="../../images/vec-angle.svg" alt="Dot Product" style="width: 500px; display: block; margin-left: auto; margin-right: auto"/>

Questo significa che la direzione dei due vettori **non è né perfettamente allineata (parallela)** né **perfettamente perpendicolare**. Il prodotto scalare è positivo, quindi:

- L'**angolo tra i vettori è acuto** (compreso tra $0^\circ$ e $90^\circ$).
- I due vettori "puntano grossomodo nella stessa direzione", cioè condividono una certa componente lungo lo stesso asse.

### 📐 Calcolo dell'angolo

Calcoliamo la norma dei due vettori:

$$
\|\vec{u}\| = \sqrt{2^2 + 2^2} = \sqrt{8} = 2\sqrt{2}
$$

$$
\|\vec{v}\| = \sqrt{3^2 + (-1)^2} = \sqrt{9 + 1} = \sqrt{10}
$$

Ora usiamo la formula dell'angolo:

$$
\theta = \arccos\left(\frac{\vec{u} \cdot \vec{v}}{\|\vec{u}\| \|\vec{v}\|}\right) = 
\arccos\left(\frac{4}{2\sqrt{2} \cdot \sqrt{10}}\right) =
\arccos\left(\frac{4}{2\sqrt{20}}\right) =
\arccos\left(\frac{2}{\sqrt{20}}\right)
$$

$$
\Rightarrow \theta \approx \arccos\left(\frac{2}{4.4721}\right) \approx \arccos(0.4472) \approx 63.43^\circ
$$

### 🧩 Intuizione del Prodotto Scalare

- Il prodotto scalare può essere visto come **quanto un vettore "proietta" sull'altro**.
- Più la direzione di $\vec{v}$ è **allineata con $\vec{u}$**, più la componente lungo $\vec{u}$ sarà grande.
- Se sono perpendicolari, la proiezione è nulla, quindi il prodotto scalare è **zero**.

### 🔄 Proiezione Ortogonale

La **proiezione di $\vec{v}$ su $\vec{u}$** è:

$$
\text{proj}_{\vec{u}} \vec{v} = \left( \frac{\vec{u} \cdot \vec{v}}{\|\vec{u}\|^2} \right) \vec{u}
$$

Nel nostro esempio:

$$
\frac{\vec{u} \cdot \vec{v}}{\|\vec{u}\|^2} = \frac{4}{8} = 0.5
\Rightarrow \text{proj}_{\vec{u}} \vec{v} = 0.5 \cdot \vec{u} = (1, 1)
$$

📌 Quindi, la parte di $\vec{v}$ **allineata con $\vec{u}$** è il vettore $(1,1)$. Il resto è **ortogonale**.


## ⬛ Prodotto Esterno (Outer Product)

Definizione: dato $\vec{u} \in \mathbb{R}^n$ (colonna), e $\vec{v}^\top \in \mathbb{R}^m$ (riga):

$$
\vec{u} \otimes \vec{v} = \vec{u} \cdot \vec{v}^\top = 
\begin{bmatrix}
u_1 v_1 & u_1 v_2 & \ldots & u_1 v_m \\
u_2 v_1 & u_2 v_2 & \ldots & u_2 v_m \\
\vdots & \vdots & \ddots & \vdots \\
u_n v_1 & u_n v_2 & \ldots & u_n v_m
\end{bmatrix}
$$ 

📐 **Risultato**: matrice $n \times m$

### 🧭 Interpretazione Geometrica

- Genera una **matrice rank-1** che rappresenta la combinazione lineare dei vettori.
- Utilizzato in machine learning per rappresentare correlazioni o costruire tensori.

## 📚 Esempi

### Somma:
$$
\vec{a} = (1, 2), \quad \vec{b} = (3, 4) \Rightarrow \vec{a} + \vec{b} = (4, 6)
$$

### Prodotto Scalare:
$$
\vec{a} = (1, 2), \quad \vec{b} = (3, 4) \Rightarrow \vec{a} \cdot \vec{b} = 1 \cdot 3 + 2 \cdot 4 = 11
$$

### Prodotto Esterno:
$$
\vec{a} = \begin{bmatrix}1 \\ 2\end{bmatrix}, \quad \vec{b}^\top = \begin{bmatrix}3 & 4\end{bmatrix} \Rightarrow
\vec{a} \otimes \vec{b} = 
\begin{bmatrix}
3 & 4 \\
6 & 8
\end{bmatrix}
$$

## 🔍 Ulteriori Concetti

- **Base di uno spazio vettoriale**: insieme di vettori linearmente indipendenti che generano tutto lo spazio.
- **Coordinate rispetto a una base**: rappresentano un vettore come combinazione lineare dei vettori base.
- **Proiezione ortogonale**: la "shadow" di un vettore su un altro.
- **Ortonormalità**: insieme di vettori ortogonali tra loro e con norma unitaria.

## 🧩 Applicazioni

- Fisica (forze, velocità)
- Computer graphics (trasformazioni)
- Machine learning (spazi di feature)
- Algebra lineare computazionale

## 🔚 Conclusione

I vettori sono **strutture fondamentali** in matematica e fisica, che combinano eleganza algebrica con interpretazioni geometriche intuitive. Comprenderli a fondo permette di affrontare con sicurezza temi avanzati come **spazi affini, tensori, matrici, decomposizioni** e molto altro.
