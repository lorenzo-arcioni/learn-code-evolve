# Teorema di Rolle

## Enunciato
Il **Teorema di Rolle** afferma che:

**Sia** $f: [a,b] \to \mathbb{R}$ una funzione che soddisfa le seguenti ipotesi:

1. **Continuità** su $[a,b]$, ovvero $f(x)$ è continua in ogni punto dell'intervallo chiuso $[a,b]$.
2. **Derivabilità** su $(a,b)$, ovvero $f(x)$ è derivabile in ogni punto dell'intervallo aperto $(a,b)$.
3. **Valori uguali agli estremi**, ossia $f(a) = f(b)$.

Allora **esiste almeno un punto** $c \in (a,b)$ tale che:

$$
f'(c) = 0.
$$

## Dimostrazione

Il teorema di Rolle si dimostra utilizzando il **Teorema di Weierstrass** e il **Teorema di Fermat**.

1. **Esistenza di un massimo o minimo assoluto**: Poiché $f$ è continua su $[a,b]$, per il **Teorema di Weierstrass** essa ammette un massimo e un minimo assoluto nell'intervallo $[a,b]$.

2. **Caso costante**: Se $f(x)$ è costante su tutto $[a,b]$, allora $f'(x) = 0$ per ogni $x \in (a,b)$, quindi la tesi è immediatamente verificata.

3. **Caso non costante**: Supponiamo ora che $f$ non sia costante. Allora, per il **Teorema di Weierstrass**, esiste almeno un punto $c \in (a,b)$ in cui $f(x)$ assume un massimo o un minimo **interno**.

4. **Applicazione del Teorema di Fermat**: Poiché $f$ è derivabile in $(a,b)$, possiamo applicare il **Teorema di Fermat**, che afferma che se $f$ ha un massimo o un minimo locale in un punto $c$ interno all'intervallo e $f$ è derivabile in $c$, allora $f'(c) = 0$.

Quindi esiste almeno un punto $c \in (a,b)$ tale che $f'(c) = 0$, come volevamo dimostrare. $\square$

## Esempi

### Esempio 1: Funzione quadratica
Consideriamo la funzione

$$
f(x) = x^2 - 4x + 3
$$
sull'intervallo $[1,3]$.

- **Verifica delle ipotesi**:
  - $f(x)$ è continua su $[1,3]$ poiché è un polinomio.
  - $f(x)$ è derivabile su $(1,3)$ perché è un polinomio.
  - $f(1) = 0$ e $f(3) = 0$, quindi $f(1) = f(3)$.

Applicando il Teorema di Rolle, troviamo un $c \in (1,3)$ tale che $f'(c) = 0$.

Calcoliamo la derivata:

$$
f'(x) = 2x - 4.
$$

Imponiamo $f'(c) = 0$:

$$
2c - 4 = 0 \Rightarrow c = 2.
$$

Quindi esiste un $c = 2$ tale che $f'(2) = 0$, confermando il teorema.

### Esempio 2: Funzione trigonometrica
Consideriamo la funzione

$$
f(x) = \cos x
$$
sull'intervallo $\left[ -\pi, \pi \right]$.

- **Continuità**: $\cos x$ è continua su $[-\pi, \pi]$.
- **Derivabilità**: $\cos x$ è derivabile su $(-\pi, \pi)$.
- **Valori agli estremi**: $f(-\pi) = \cos(-\pi) = -1$ e $f(\pi) = \cos(\pi) = -1$, quindi $f(-\pi) = f(\pi)$.

Calcoliamo la derivata:

$$
f'(x) = -\sin x.
$$

Imponiamo $f'(c) = 0$:

$$
-\sin c = 0 \Rightarrow \sin c = 0.
$$

Le soluzioni nell'intervallo $(-\pi, \pi)$ sono $c = 0$. Dunque, esiste almeno un $c$ che soddisfa $f'(c) = 0$, confermando il teorema.

## Applicazioni del Teorema di Rolle

1. **Dimostrazione del Teorema di Lagrange**: Il Teorema di Rolle è un caso particolare del **Teorema di Lagrange**, il quale afferma l'esistenza di un punto in cui la derivata coincide con il tasso di variazione medio della funzione.
2. **Analisi dell'esistenza di radici multiple**: Se una funzione è nulla agli estremi e ha derivata nulla in almeno un punto interno, è possibile trarre conclusioni sulla sua forma e sulle sue radici.
3. **Verifica della differenziabilità**: Se un'ipotesi del teorema fallisce (es. funzione non continua o non derivabile), possiamo dedurre informazioni sulla funzione, come la presenza di cuspidi o discontinuità.

## Conclusione

Il **Teorema di Rolle** è un risultato fondamentale dell'analisi matematica che garantisce l'esistenza di almeno un punto stazionario (derivata nulla) in un intervallo se la funzione è continua, derivabile e assume lo stesso valore agli estremi. Questo teorema è alla base del **Teorema di Lagrange**, che generalizza il concetto di variazione media di una funzione.
