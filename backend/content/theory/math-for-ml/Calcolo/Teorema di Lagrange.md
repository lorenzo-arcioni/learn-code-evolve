# Teorema di Lagrange (Teorema del Valore Medio)

## Enunciato
Sia $f: [a, b] \to \mathbb{R}$ una funzione tale che:

1. $f$ è continua in $[a, b]$,
2. $f$ è derivabile in $(a, b)$.

Allora esiste almeno un punto $c \in (a, b)$ tale che:

$$
f'(c) = \frac{f(b) - f(a)}{b - a}.
$$

## Interpretazione Geometrica
Il Teorema di Lagrange afferma che esiste almeno un punto $c$ nell'intervallo $(a, b)$ in cui la derivata della funzione coincide con il coefficiente angolare della retta secante che passa per $(a, f(a))$ e $(b, f(b))$.

In altre parole, esiste almeno un punto in cui la tangente alla curva è parallela alla secante.

## Dimostrazione
Si dimostra il teorema applicando il [[Teorema di Rolle]].

1. Definiamo la funzione ausiliaria:
   $$
    g(x) = f(x) - \left( \frac{f(b) - f(a)}{b - a} \right) (x - a).
   $$
   Questa funzione rappresenta la differenza tra $f(x)$ e la retta secante.

2. Osserviamo che:
   - $g(x)$ è continua in $[a, b]$ perché $f$ è continua.
   - $g(x)$ è derivabile in $(a, b)$ perché $f$ è derivabile.
   - $g(a) = f(a) - f(a) = 0$ e $g(b) = f(b) - f(b) = 0$, quindi $g(a) = g(b)$.

3. Applicando il [[Teorema di Rolle]], esiste un $c \in (a, b)$ tale che:
   $$
g'(c) = 0.
   $$

4. Calcoliamo $g'(x)$:
   $$
    g'(x) = f'(x) - \frac{f(b) - f(a)}{b - a}.
   $$
   Quindi, ponendo $g'(c) = 0$, otteniamo:
   $$
   f'(c) = \frac{f(b) - f(a)}{b - a}.
   $$
   Il che conclude la dimostrazione. $\square$

## Esempi
### Esempio 1: Funzione Quadratica
Consideriamo $f(x) = x^2$ su $[1,3]$:

- $f(1) = 1^2 = 1$,
- $f(3) = 3^2 = 9$.

Il coefficiente angolare della secante è:
$$
\frac{9 - 1}{3 - 1} = 4.
$$

La derivata della funzione è $f'(x) = 2x$. Risolvendo $2c = 4$, troviamo $c = 2$, che appartiene a $(1,3)$.

### Esempio 2: Funzione Seno
Consideriamo $f(x) = \sin x$ su $\left[0, \frac{\pi}{2} \right]$:

- $f(0) = \sin 0 = 0$,
- $f(\pi/2) = \sin(\pi/2) = 1$.

Il coefficiente angolare della secante è:
$$
\frac{1 - 0}{\pi/2 - 0} = \frac{2}{\pi}.
$$

La derivata è $f'(x) = \cos x$. Risolvendo $\cos c = 2/\pi$, otteniamo $c \approx 0.69$, che appartiene a $(0, \pi/2)$.

## Applicazioni del Teorema di Lagrange
1. **Dimostrazione dell'esistenza di soluzioni di equazioni differenziali**
2. **Stime di variazione di una funzione**
3. **Dimostrazione dell'uguaglianza tra velocità media e velocità istantanea in fisica**

## Conclusione
Il Teorema di Lagrange è un potente strumento matematico che collega la derivata di una funzione con il comportamento globale della funzione stessa, avendo implicazioni in vari ambiti della matematica e della fisica.
