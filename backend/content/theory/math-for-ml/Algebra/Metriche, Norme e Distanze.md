# **Metriche, Norme e Distanze**

## **Introduzione**
Nell'ambito dell'analisi matematica e dell'algebra lineare, il concetto di **distanza** tra punti in uno spazio è fondamentale per comprendere la struttura geometrica dello spazio stesso. In particolare, nello spazio euclideo $\mathbb{R}^n$, la nozione di distanza è strettamente legata alla definizione di **norma** di un vettore, che a sua volta è collegata alla lunghezza del vettore.

Tuttavia, quando definiamo uno **spazio vettoriale**, non facciamo alcun riferimento a concetti come lunghezza, direzione o orientamento. Questi concetti emergono solo quando lo spazio è dotato di strutture aggiuntive, come una **metrica** o una **norma**.
## **Metriche e Spazi Metrici**

### **Definizione di Metrica**
Una **metrica** (o **distanza**) è una funzione $d(\cdot, \cdot) : X \times X \to \mathbb{R}$ che associa a ogni coppia di punti $x, y$ in uno spazio $X$ un numero reale che rappresenta la distanza tra di essi. Per essere una metrica, la funzione $d$ deve soddisfare le seguenti proprietà:

1. **Non negatività**: $d(x, y) \geq 0$ per ogni $x, y \in X$, e $d(x, y) = 0$ se e solo se $x = y$.
2. **Simmetria**: $d(x, y) = d(y, x)$ per ogni $x, y \in X$.
3. **Disuguaglianza triangolare**: $d(x, z) \leq d(x, y) + d(y, z)$ per ogni $x, y, z \in X$.

Uno spazio dotato di una metrica è chiamato **spazio metrico**.

### **Distanza Euclidea**
Nello spazio euclideo $\mathbb{R}^n$, la distanza più comune è la **distanza euclidea**, che è un caso particolare di una famiglia più generale di distanze chiamate **distanze $L_p$ (Minkowski)**. La distanza $L_p$ tra due vettori $x, y \in \mathbb{R}^n$ è definita come:

$$
d_p(x, y) = \left( \sum_{i=1}^n |x_i - y_i|^p \right)^{\frac{1}{p}}
$$

Dove:
- $p \geq 1$ è un parametro che definisce il tipo di distanza.

### **Casi Particolari**
- **Distanza Euclidea**: Per $p = 2$, otteniamo la distanza euclidea, che è la distanza "standard" nello spazio $\mathbb{R}^n$:
  $$
  d_2(x, y) = \sqrt{(x_1 - y_1)^2 + (x_2 - y_2)^2 + \dots + (x_n - y_n)^2} \quad (2.28)
  $$
  Questa è la distanza che siamo abituati a utilizzare nella geometria euclidea.

- **Distanza di Manhattan**: Per $p = 1$, otteniamo la distanza di Manhattan:
  $$
  d_1(x, y) = \sum_{i=1}^n |x_i - y_i|
  $$
  Questa distanza è utile in contesti in cui il movimento è limitato a direzioni ortogonali, come in una griglia.

- **Distanza di Chebyshev**: Per $p \to \infty$, otteniamo la distanza di Chebyshev:
  $$
  d_\infty(x, y) = \max_{i} |x_i - y_i|
  $$
  Questa distanza misura la massima differenza lungo una qualsiasi delle coordinate. Intuitivamente, per $p \to \infty$, la differenza $|x_i -y_i|^p$ che domina su tutte le altre è proprio $\max_{i} |x_i - y_i|$.
## **Norme e Lunghezza di un Vettore**

### **Definizione di Norma**
Una **norma** è una funzione $\|\cdot\| : X \to \mathbb{R}$ che associa a ogni vettore $x$ in uno spazio vettoriale $X$ un numero reale non negativo, interpretato come la "lunghezza" del vettore. Per essere una norma, la funzione $\|\cdot\|$ deve soddisfare le seguenti proprietà:

1. **Non negatività**: $\|x\| \geq 0$ per ogni $x \in X$, e $\|x\| = 0$ se e solo se $x = 0$.
2. **Omogeneità**: $\|\alpha x\| = |\alpha| \cdot \|x\|$ per ogni scalare $\alpha$ e ogni $x \in X$.
3. **Disuguaglianza triangolare**: $\|x + y\| \leq \|x\| + \|y\|$ per ogni $x, y \in X$.

### **Norma $L_p$**
La norma $L_p$ di un vettore $x \in \mathbb{R}^n$ è definita come:

$$
\|x\|_p = \left( \sum_{i=1}^n |x_i|^p \right)^{\frac{1}{p}}
$$

Questa norma generalizza il concetto di lunghezza di un vettore. In particolare:
- Per $p = 2$, otteniamo la **norma euclidea**:
  $$
  \|x\|_2 = \sqrt{x_1^2 + x_2^2 + \dots + x_n^2}
  $$
  Questa è la lunghezza "standard" di un vettore nello spazio euclideo.

- Per $p = 1$, otteniamo la **norma di Manhattan**:
  $$
  \|x\|_1 = \sum_{i=1}^n |x_i|
  $$

- Per $p \to \infty$, otteniamo la **norma di Chebyshev**:
  $$
  \|x\|_\infty = \max_{i} |x_i|
  $$

### **Interpretazione Geometrica**
La norma di un vettore può essere interpretata come la distanza del vettore dall'origine dello spazio. Ad esempio, la norma euclidea $\|x\|_2$ rappresenta la distanza euclidea tra il punto $x$ e l'origine.

#### **In $\mathbb{R}^2$**
In $\mathbb{R}^2$, le norme $L_p$ definiscono diverse "forme" per i cerchi unitari (cioè l'insieme dei punti con norma $1$):
- Per $p = 1$, il cerchio unitario è un rombo (diamante).
- Per $p = 2$, il cerchio unitario è un cerchio tradizionale.
- Per $p \to \infty$, il cerchio unitario è un quadrato.

#### **In $\mathbb{R}^3$**
In $\mathbb{R}^3$, le norme $L_p$ definiscono diverse superfici unitarie:
- Per $p = 1$, la superficie unitaria è un ottaedro.
- Per $p = 2$, la superficie unitaria è una sfera.
- Per $p \to \infty$, la superficie unitaria è un cubo.
