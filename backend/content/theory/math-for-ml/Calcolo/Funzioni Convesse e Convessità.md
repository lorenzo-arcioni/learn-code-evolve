# Convessità

## Introduzione
Nel contesto dell'ottimizzazione, il problema generale che vogliamo risolvere è:

$$
\min_{\Theta} \ell(\Theta)
$$

dove $\Theta$ rappresenta i parametri del modello e $\ell(\Theta)$ è la funzione di perdita. Trovare i minimizzatori per una funzione di perdita generale è un problema aperto nel campo dell'ottimizzazione. Il metodo di ottimizzazione dipende dalle proprietà specifiche della funzione di perdita e, in alcuni casi, potrebbero esserci vincoli sui parametri. Tuttavia, tratteremo principalmente problemi non vincolati.

## Funzioni Convesse
Una classe di funzioni particolarmente facile da minimizzare (o massimizzare) è quella delle **funzioni convesse**, definite dalla **disuguaglianza di Jensen**:

$$
f(\alpha x + (1 - \alpha)y) \leq \alpha f(x) + (1 - \alpha)f(y), \quad \forall x, y \text{ e } \alpha \in [0, 1]
$$

Questa disuguaglianza afferma che la trasformazione convessa di una media è minore o uguale alla media applicata dopo la trasformazione convessa. Per due punti, significa che la linea secante di una funzione convessa giace sopra il grafico della funzione.

![Jensen's Inequality](https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/ConvexFunction.svg/1200px-ConvexFunction.svg.png)

*Figura 2.4: La disuguaglianza di Jensen generalizza l'affermazione che la linea secante di una funzione convessa giace sopra il grafico.*

## Perché le funzioni convesse sono facili da minimizzare?
Guardando il grafico sopra, possiamo intuire che esiste sempre un **minimo unico**. Se ricordiamo un po' di calcolo delle scuole superiori, sappiamo anche che il punto in cui tale minimo è raggiunto è il punto (ancora unico) in cui la derivata della funzione è zero.

Un'importante assunzione che spesso facciamo è che la funzione di perdita $\ell$ sia **differenziabile**, in modo da poter calcolare la sua derivata $\frac{d\ell}{dx}$ in tutti i punti $x$.

## Formalizzazione della Convessità
Per spiegare formalmente, riscriviamo la disuguaglianza di Jensen in una forma diversa:

$$
f(x + \alpha(y - x)) \leq (1 - \alpha)f(x) + \alpha f(y), \quad \forall x, y \text{ e } \alpha \in (0, 1)
$$

Effettuando alcune manipolazioni algebriche, otteniamo:

$$
\frac{f(x + \alpha(y - x))}{\alpha} \leq \frac{(1 - \alpha)f(x) + \alpha f(y)}{\alpha}
$$

$$
\frac{f(x + \alpha(y - x))}{\alpha} \leq \frac{f(x)}{\alpha} - f(x) + f(y) \quad (\text{espandendo il prodotto } (1 - \alpha)f(x))
$$

$$
\frac{f(x + \alpha(y - x)) - f(x)}{\alpha} + f(x) \leq f(y)
$$

Prendendo il limite per $\alpha \to 0$, notiamo che l'espressione assomiglia alla definizione di derivata di una funzione, ovvero il limite del rapporto incrementale:

$$
\frac{df}{dx} = \lim_{h \to 0} \frac{f(x + h) - f(x)}{h}
$$

Per completare l'espressione, abbiamo bisogno di un fattore $(y - x)$:

$$
\lim_{\alpha \to 0} \frac{f(x + \alpha(y - x)) - f(x)}{\alpha(y - x)} (y - x) + f(x) \leq f(y), \quad \forall x, y
$$

Poiché $(y - x)$ è uno scalare, possiamo estrarlo dal limite, e l'intero limite rappresenta la derivata di $f$:

$$
\frac{df(x)}{dx} (y - x) + f(x) \leq f(y), \quad \forall x, y
$$

Notiamo che il lato sinistro della disuguaglianza è l'approssimazione di Taylor del primo ordine di $f$ nel punto $x$, ovvero la migliore approssimazione lineare di $f$ in quel punto.

![Taylor Approximation](https://upload.wikimedia.org/wikipedia/commons/c/c6/Taylor_Approximation_of_sin%28x%29.jpeg)

*Figura 2.5: Approssimazione di Taylor.*

## Minimizzazione di Funzioni Convesse
Se vogliamo trovare un minimizzatore per una funzione convessa $f$, basta calcolare la sua derivata $\frac{df}{dx}$, imporla $= 0$ e risolvere per $x$. Come abbiamo mostrato, il punto $x$ soddisfa la disuguaglianza:

$$
\underbrace{\frac{df(x)}{dx} (y - x)}_{=0} + f(x) \leq f(y), \quad \forall y
$$

quindi

$$
f(x) \leq f(y), \quad \forall y
$$

e dunque $x$ è il **minimizzatore globale** della funzione.

In generale, per trovare un minimizzatore per una funzione convessa $f$, è sufficiente calcolare la sua derivata $\frac{df}{dx}$, impostarla a zero e risolvere per $x$. Il punto $x$ sarà quindi il minimizzatore globale della funzione.

## Convessità e la Seconda Derivata

### Nel Caso Univariato

Se $f(x)$ è due volte differenziabile, il **test della seconda derivata** stabilisce che:

- Se $f''(x) \geq 0$ per ogni $x$, la funzione è convessa.
- Se $f''(x) > 0$ per ogni $x$, la funzione è strettamente convessa.

**Spiegazione Dettagliata e Motivazione Matematica**

In questa sezione approfondiremo, dal punto di vista matematico, perché le proprietà relative alla curvatura, alla tangente e alla monotonia del gradiente garantiscono la convessità di una funzione $f(x)$.

#### 1. Curvatura e Seconda Derivata

**Concetto:**
La seconda derivata $f''(x)$ misura la curvatura della funzione. Se $f''(x) \geq 0$ in ogni punto, la funzione "si piega verso l'alto" ovunque.

**Motivazione Matematica:**

Consideriamo la definizione di derivata seconda:
$$
f''(x) = \lim_{h \to 0} \frac{f'(x+h) - f'(x)}{h}.
$$
Se $f''(x) \geq 0$ per ogni $x$, significa che per ogni incremento $h > 0$ (piccolo), il valore $f'(x+h)$ è almeno pari a $f'(x)$. Quindi il gradiente non diminuisce mai: $f'(x)$ è **monotono non decrescente**.

**Interpretazione:**
- Quando la funzione è "piegata verso l'alto", la variazione del suo tasso di crescita è tale da non permettere inversioni di curvatura che potrebbero generare minimi o massimi locali multipli.
- In termini geometrici, il grafico di $f(x)$ non può avere "fianchi discendenti" improvvisi che si ripiegano verso il basso, garantendo l'unicità del minimo (se esiste).

#### 2. Tangente e Approssimazione Lineare

**Concetto:**
La retta tangente a $f(x)$ in un punto $x_0$ è data da:
$$
L(x) = f(x_0) + f'(x_0)(x - x_0).
$$
Se $f''(x) \geq 0$, il grafico di $f(x)$ si trova sempre al di sopra della retta tangente in $x_0$.

**Motivazione Matematica (Teorema di Taylor):**

Utilizziamo l'espansione in serie di Taylor al primo ordine per $f(x)$ intorno a $x_0$. Per un $x$ arbitrario, esiste un punto $\xi$ compreso tra $x_0$ e $x$ tale che:
$$
f(x) = \underbrace{f(x_0) + f'(x_0)(x - x_0)}_{L(x)} + \frac{1}{2} f''(\xi)(x - x_0)^2.
$$
Se $f''(\xi) \geq 0$, allora
$$
\frac{1}{2} f''(\xi)(x - x_0)^2 \geq 0.
$$
Pertanto:
$$
\underbrace{f(x_0) + f'(x_0)(x - x_0) + \frac{1}{2} f''(\xi)(x - x_0)^2}_{f(x)} \geq f(x_0) + f'(x_0)(x - x_0) = L(x).
$$
Questo mostra che la retta tangente $L(x)$ è un **supporto** per $f(x)$ – il grafico della funzione non scende mai al di sotto della sua tangente. Questa proprietà è essenziale per la convessità, perché implica che la funzione è sempre "sopra" ogni approssimazione lineare locale.

#### 3. Monotonia del Gradiente

**Concetto:**
La condizione $f''(x) \geq 0$ implica che il gradiente $f'(x)$ è monotono non decrescente.

**Motivazione Matematica ([[Teorema di Lagrange]] o del Valore Medio):**

Sia $x_1 < x_2$ e applichiamo il Teorema del Valore Medio a $f'(x)$ su $[x_1, x_2]$. Esiste un punto $\xi \in (x_1, x_2)$ tale che:
$$
f'(x_2) - f'(x_1) = f''(\xi)(x_2 - x_1).
$$
Poiché $x_2 - x_1 > 0$ e $f''(\xi) \geq 0$, ne consegue che:
$$
f'(x_2) - f'(x_1) \geq 0 \quad \Rightarrow \quad f'(x_2) \geq f'(x_1).
$$
Quindi, il gradiente non diminuisce mai al crescere di $x$. Questa monotonia del gradiente è fondamentale perché significa che, una volta che il gradiente raggiunge il valore zero, non può tornare a valori negativi che indicherebbero una nuova discesa. Così, se $f'(x_0) = 0$ per qualche $x_0$, $x_0$ è il **minimo globale**.

#### Sintesi della Motivazione Matematica

- **Curvatura:**  
  La condizione $f''(x) \geq 0$ assicura che la funzione non abbia inversioni di curvatura, mantenendo una forma "aperta verso l'alto" e prevenendo l'esistenza di multipli minimi locali.

- **Tangente:**  
  L'approssimazione lineare (tangente) fornisce un limite inferiore al grafico di $f(x)$ quando $f''(x) \geq 0$. Questo significa che il grafico di $f(x)$ è sempre al di sopra della sua tangente, caratteristica che semplifica l'analisi della funzione e l'identificazione del minimo globale.

- **Monotonia del Gradiente:**  
  Con $f''(x) \geq 0$, il gradiente $f'(x)$ cresce o rimane costante. Questo impedisce oscillazioni che potrebbero generare più soluzioni stazionarie, garantendo così l'unicità del punto in cui $f'(x) = 0$ e rendendo quel punto il minimo globale.

Questi punti, insieme, formano la base teorica che spiega perché le funzioni con $f''(x) \geq 0$ sono convexi e perché questa condizione rende il problema di ottimizzazione (ovvero, trovare il minimo globale) molto più semplice da risolvere.


### Estensione al Caso Multivariato

Per una funzione $f: \mathbb{R}^n \to \mathbb{R}$ due volte differenziabile, la condizione di convessità si generalizza attraverso la **Hessiana** $\nabla^2 f(\mathbf{x})$, la matrice delle derivate seconde. La funzione $f$ è convessa se e solo se, per ogni vettore $\mathbf{v} \in \mathbb{R}^n$:

$$
\mathbf{v}^\top \nabla^2 f(\mathbf{x}) \, \mathbf{v} \geq 0, \quad \forall \mathbf{x}.
$$

Questo significa che la Hessiana è **positiva semidefinita**. L'interpretazione è la stessa: la funzione ha una curvatura non negativa in tutte le direzioni, estendendo il concetto della seconda derivata non negativa dal caso univariato.

## Riassunto Intuitivo

- **Funzioni a Una Variabile:**  
  Se $f''(x) \geq 0$ in ogni punto, la funzione è sempre "inclinata verso l'alto". La retta tangente in ogni punto funge da supporto, e la funzione non presenta inversioni di curvatura. Quindi, il punto in cui $f'(x) = 0$ è il minimo globale.

- **Funzioni Multivariate:**  
  Se la Hessiana $\nabla^2 f(\mathbf{x})$ è positiva semidefinita, la funzione possiede una curvatura non negativa in ogni direzione. Questo garantisce l'unicità del minimo locale (che è anche globale) e semplifica la risoluzione dei problemi di ottimizzazione.

## Conclusione

La caratterizzazione della convessità mediante la disuguaglianza di Jensen e il test della seconda derivata (o della Hessiana nel caso multivariato) fornisce strumenti fondamentali per l'analisi e la risoluzione di problemi di ottimizzazione. Le funzioni convesse, avendo un unico minimo globale, permettono l'utilizzo di algoritmi efficienti e garantiscono che ogni minimo locale sia effettivamente globale, semplificando notevolmente il processo di minimizzazione.

*Nota: Questa spiegazione si basa su concetti classici dell'analisi matematica e dell'ottimizzazione. Per ulteriori approfondimenti si consiglia lo studio di testi specifici di calcolo avanzato e teoria dell'ottimizzazione.*
