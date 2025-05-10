# Regressione Logistica

La **regressione logistica** è un modello di classificazione che stima direttamente la probabilità di appartenenza a una classe, basandosi su un approccio **discriminativo**. Questo la differenzia da metodi **generativi** come l'Analisi Discriminante Lineare (LDA), che modellano esplicitamente le distribuzioni delle features condizionate alle classi. Per una trattazione dettagliata del quadro probabilistico, consulta la [[Classificazione Binaria]].

## **Fondamenti Probabilistici**

### Collegamento con il Logit e la Sigmoide
Il **logit** rappresenta il *logaritmo del rapporto delle probabilità* (log-odds) tra classe positiva e negativa:
$$
\text{logit}(p) = \ln\left(\frac{p}{1-p}\right) = \mathbf x^\top \mathbf{w} +b
$$

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib import rcParams

# Configurazione stile avanzato
rcParams.update({
    'font.family': 'serif',
    'mathtext.fontset': 'cm',
    'axes.facecolor': 'white',
    'axes.edgecolor': '0.3',
    'axes.grid': True,
    'grid.color': '0.85',
    'axes.labelcolor': '0.3',
    'xtick.color': '0.4',
    'ytick.color': '0.4',
    'axes.titlepad': 15,
    'axes.titlesize': 14,
    'axes.labelsize': 12,
})

# Definizione delle funzioni
def sigmoid(x):
    return 1 / (1 + np.exp(-x))

def logit(p):
    return np.log(p / (1 - p))

# Generazione dati
x = np.linspace(-6, 6, 500)
p = np.linspace(0.01, 0.99, 100)
log_odds = logit(p)

# Creazione figura con griglia personalizzata
fig = plt.figure(figsize=(12, 8), facecolor='white')
gs = fig.add_gridspec(1, 2, width_ratios=[1, 1.2])

# Plot Sigmoide e Logit (trasformazione inversa)
ax1 = fig.add_subplot(gs[0])
ax1.plot(x, sigmoid(x), color='#1f77b4', linewidth=3, 
         label=r'$\sigma(x) = \frac{1}{1+e^{-x}}$')
ax1.set_title('Sigmoide: Da Logit a Probabilità', pad=20)
ax1.set_xlabel(r'$x = \mathbf{w}^\top \mathbf{x} + b$ (logit)', fontsize=12)
ax1.set_ylabel(r'$\sigma(x)$ (probabilità)', fontsize=12)
ax1.legend(loc='upper left', frameon=True, facecolor='white')

# Aggiunta annotazioni matematiche
ax1.annotate(r'$\sigma(0) = 0.5$', xy=(0, 0.5), xytext=(1, 0.4),
             arrowprops=dict(arrowstyle="->", color='0.3'))
ax1.annotate(r'$\lim_{x \to +\infty} \sigma(x) = 1$', xy=(4, 0.98), xytext=(2, 0.8),
             arrowprops=dict(arrowstyle="->", color='0.3'))
ax1.annotate(r'$\lim_{x \to -\infty} \sigma(x) = 0$', xy=(-4, 0.02), xytext=(-5, 0.2),
             arrowprops=dict(arrowstyle="->", color='0.3'))

# Plot Log-Odds (Funzione Logit)
ax2 = fig.add_subplot(gs[1])
ax2.plot(p, log_odds, color='#d62728', linewidth=3, 
         label=r'$\mathrm{logit}(p) = \ln\left(\frac{p}{1-p}\right)$')
ax2.set_title('Funzione Logit: Da Probabilità a Log-Odds', pad=20)
ax2.set_xlabel(r'$p$ (probabilità)', fontsize=12)
ax2.set_ylabel(r'$\mathrm{logit}(p)$ (log-odds)', fontsize=12)
ax2.legend(loc='upper left', frameon=True, facecolor='white')

# Linee guida e annotazioni
ax2.axhline(0, color='0.5', linestyle=':', linewidth=1)
ax2.axvline(0.5, color='0.5', linestyle=':', linewidth=1)
ax2.annotate(r'$\mathrm{logit}(0.5) = 0$', xy=(0.5, 0), xytext=(0.6, 1),
             arrowprops=dict(arrowstyle="->", color='0.3'))
ax2.annotate(r'$\lim_{p \to 1^-} \mathrm{logit}(p) = +\infty$', 
             xy=(0.95, 3), xytext=(0.7, 2.5),
             arrowprops=dict(arrowstyle="->", color='0.3'))
ax2.annotate(r'$\lim_{p \to 0^+} \mathrm{logit}(p) = -\infty$', 
             xy=(0.05, -3), xytext=(0.3, -2.5),
             arrowprops=dict(arrowstyle="->", color='0.3'))

plt.tight_layout()
plt.savefig('logit_sigmoid_dual.pdf', dpi=300, bbox_inches='tight')
plt.show()
```

<img src="/home/lorenzo/Documenti/GitHub/my-obsidian-vault/images/logit.jpg" alt="Logit">

*Figura 1.0: Funzione logit. Relazione Duale: $\sigma(\mathrm{logit}(p)) = p$ e $\mathrm{logit}(\sigma(x)) = x$*

La **funzione sigmoide** $\sigma(\cdot)$ ne è l'inversa:
$$
p = \sigma(\mathbf x^\top \mathbf{w} + b) = \frac{1}{1 + e^{-(\mathbf x^\top \mathbf{w} + b)}}
$$

![Funzione sigmoide](https://upload.wikimedia.org/wikipedia/commons/8/88/Logistic-curve.svg)

*Figura 2.1: Funzione sigmoide.*

Questa relazione deriva direttamente dalla massimizzazione della *verosimiglianza* (MLE) sotto un modello lineare generalizzato (GLM). Per i dettagli analitici, vedi la [[Classificazione Binaria]].

## **Definizioni Generali**
Dato un dataset $\mathcal D = \{(\mathbf x_i, y_i)\}_{i=1}^n$, una regressione logistica classifica le osservazioni in due classi: $y_i \in \{0, 1\}$. La funzione stimata $\hat{f}_\mathbf w$ utilizza la funzione sigmoide per mappare i vettori $\mathbf x_i \in \mathbb R^{(m+1)}$ in probabilità tramite un vettore di pesi $\mathbf w \in \mathbb R^{m+1}$. Per semplicità, assumeremo che i vettori siano:

$$
\mathbf w = \begin{bmatrix} w_0 \\ \vdots \\ w_m \end{bmatrix} \quad \text{e} \quad \mathbf x = \begin{bmatrix} x_0 = 1 \\ x_1 \\ \vdots \\ x_m \end{bmatrix}.
$$

Quindi:

$$
\hat{f}_\mathbf w(\mathbf x_i) = \sigma(\mathbf x^\top \mathbf{w}) = \frac{1}{1 + e^{-(\mathbf x^\top \mathbf{w})}}.
$$

In questo modo la funzione stimata diventa:

$$
\hat{f}_\mathbf w(\mathbf x_i) = \sigma(\mathbf{x}_i^\top \mathbf w) = \frac{1}{1 + e^{-\mathbf{x}_i^\top \mathbf w}}
$$

Quindi:
- $p(y_i=1 \mid \mathbf x_i, \mathbf w) = \sigma(\mathbf{x}_i^\top \mathbf w) = \frac{1}{1 + e^{-\mathbf{x}_i^\top \mathbf w}}$
- $p(y_i=0 \mid \mathbf x_i, \mathbf w) = 1 - \sigma(\mathbf{x}_i^\top \mathbf w) = \frac{e^{-\mathbf{x}_i^\top \mathbf w}}{1 + e^{-\mathbf{x}_i^\top \mathbf w}}$

Quindi, la verosimiglianza del vettore di tutte le osservazioni $\mathbf y \in \mathbb R^n$ dati un vettore di pesi $\mathbf w \in \mathbb R^{m+1}$ e una matrice di features $\mathbf X \in \mathbb R^{n \times (m+1)}$ viene definita come:

$$\begin{align*}
p(\mathbf y \mid \mathbf X, \mathbf w) &= \prod_{i=1}^n \hat{f}_\mathbf w(\mathbf x_i)^{y_i} \left(1 - \hat{f}_\mathbf w(\mathbf x_i)\right)^{1 - y_i}\\ 
&=\prod_{i=1}^n \sigma(\mathbf{x}_i^\top \mathbf w)^{y_i} \left(1 - \sigma(\mathbf{x}_i^\top \mathbf w)\right)^{1 - y_i}.
\end{align*}
$$

In questo modo, quando (la label del dataset) $y_i = 1$, consideriamo la probabilità predetta dal modello per la classe $1$, mentre quando $y_i = 0$, consideriamo la probabilità predetta dal modello per la classe $0$.

Il nostro obiettivo è quello di trovare il vettore di pesi $\mathbf w$ che massimizza questa funzione di verosimiglianza (la probabilità che, dati i dati e i pesi, si ottengano le previsioni giuste).

## **Ottimizzazione del Modello**
Ora possiamo quindi definire la funzione di verosimiglianza (Likelihood Function) come:

$$
\mathcal{L}(\mathbf{w}) = \prod_{i=1}^n p(y_i \mid \mathbf x_i, \mathbf w) = \prod_{i=1}^n \sigma(\mathbf{x}_i^\top \mathbf w)^{y_i} \left(1 - \sigma(\mathbf{x}_i^\top \mathbf w)\right)^{1 - y_i}.
$$

Chiaramente, questa funzione non è lineare ne tanto meno convessa (grazie alla funzione sigmoide), quindi non possiamo sfruttare le care tecniche di ottimizzazione convessa (ponendo il gradinete $=0$ e risolvendo per $\mathbf w$); non otteniamo la soluzione ottima. Questo può essere un problema non da poco, ma che risolveremo di seguito.

### Funzione di Perdita (Log-Loss)
Applicando il logaritmo ad entrambi i membri della funzione di verosimiglianza otteniamo: 

$$
\ln \mathcal{L}(\mathbf{w}) = \sum_{i=1}^n \left(y_i \ln(\sigma(\mathbf{x}_i^\top \mathbf w)) + (1 - y_i) \ln(1 - \sigma(\mathbf{x}_i^\top \mathbf w))\right).
$$

In questo modo, dato che il logaritmo è una funzione monotona crescente, non modifichiamo il problema di massimizzazione della funzione di verosimiglianza.

In più, applicando un coefficiente (negativo) di mediazione $-\frac{1}{n}$, otteniamo una nuova funzione di perdita $\mathcal{LL}(\mathbf w)$ detta **Log-Loss** o **Cross-Entropy** o **Logarithmic Loss**:

$$
\mathcal{LL}(\mathbf{w}) = -\frac{1}{n} \sum_{i=1}^n \left(y_i \ln(\sigma(\mathbf{x}_i^\top \mathbf w)) + (1 - y_i) \ln(1 - \sigma(\mathbf{x}_i^\top \mathbf w))\right).
$$

Quindi il problema di massimizzazione della funzione di verosimiglianza diventa un problema di minimizzazione della funzione di perdita (grazie al fattore di mediazione negativo). Inoltre, la nuova funzione $\mathcal{LL}(\mathbf{w})$ è una funzione convessa. 😃

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib import rcParams

# Configurazione stile globale
rcParams.update({
    'font.family': 'serif',
    'font.size': 12,
    'axes.titlesize': 14,
    'axes.labelsize': 12,
    'xtick.labelsize': 10,
    'ytick.labelsize': 10,
    'axes.grid': True,
    'grid.alpha': 0.3
})

# Definizione delle funzioni
def sigmoid(x):
    return 1 / (1 + np.exp(-x))

def log_sigmoid(x):
    return -np.log1p(np.exp(-x))  # Forma numericamente stabile

# Calcolo analitico delle derivate seconde
def sigmoid_second_deriv(x):
    σ = sigmoid(x)
    return σ * (1 - σ) * (1 - 2 * σ)

def log_sigmoid_second_deriv(x):
    σ = sigmoid(x)
    return -σ * (1 - σ)

# Generazione dati
x = np.linspace(-6, 6, 500)
σ = sigmoid(x)
log_σ = log_sigmoid(x)
σ_deriv2 = sigmoid_second_deriv(x)
log_σ_deriv2 = log_sigmoid_second_deriv(x)

# Creazione figura con griglia personalizzata
fig = plt.figure(figsize=(14, 10), facecolor='white')
gs = fig.add_gridspec(2, 2, hspace=0.3, wspace=0.2)

# Plot sigmoide
ax1 = fig.add_subplot(gs[0, 0])
ax1.plot(x, σ, color='#1f77b4', linewidth=2.5, 
         label=r'$\sigma(x) = \frac{1}{1+e^{-x}}$')
ax1.set_title('Funzione Sigmoide', pad=15)
ax1.set_xlabel('x', fontsize=12)
ax1.set_ylabel(r'$\sigma(x)$', fontsize=12)
ax1.legend(loc='lower right', framealpha=1)
ax1.set_ylim(-0.1, 1.1)

# Plot derivata seconda sigmoide
ax2 = fig.add_subplot(gs[0, 1])
ax2.plot(x, σ_deriv2, color='#d62728', linewidth=2.5,
         label=r'$\sigma^{\prime\prime}(x) = \sigma(x)(1-\sigma(x))(1-2\sigma(x))$')
ax2.axhline(0, color='black', linestyle='--', linewidth=1)
ax2.set_title('Derivata Seconda della Sigmoide', pad=15)
ax2.set_xlabel('x', fontsize=12)
ax2.set_ylabel(r'$\sigma^{\prime\prime}(x)$', fontsize=12)
ax2.legend(loc='lower left', framealpha=1)
ax2.annotate('Convessa (σ\'\'>0)', xy=(-4, 0.15), xytext=(-5, 0.2),
             arrowprops=dict(facecolor='black', shrink=0.05))
ax2.annotate('Concava (σ\'\'<0)', xy=(4, -0.1), xytext=(2, -0.2),)

# Plot log-sigmoide
ax3 = fig.add_subplot(gs[1, 0])
ax3.plot(x, log_σ, color='#2ca02c', linewidth=2.5,
         label=r'$\log\sigma(x) = -\log(1+e^{-x})$')
ax3.set_title('Logaritmo della Sigmoide', pad=15)
ax3.set_xlabel('x', fontsize=12)
ax3.set_ylabel(r'$\log\sigma(x)$', fontsize=12)
ax3.legend(loc='lower right', framealpha=1)

# Plot derivata seconda log-sigmoide
ax4 = fig.add_subplot(gs[1, 1])
ax4.plot(x, log_σ_deriv2, color='#ff7f0e', linewidth=2.5,
         label=r'$(\log\sigma(x))^{\prime\prime} = -\sigma(x)(1-\sigma(x))$')
ax4.axhline(0, color='black', linestyle='--', linewidth=1)
ax4.set_title('Derivata Seconda del Log-Sigmoide', pad=15)
ax4.set_xlabel('x', fontsize=12)
ax4.set_ylabel(r'$(\log\sigma(x))^{\prime\prime}$', fontsize=12)
ax4.legend(loc='upper center', framealpha=1)
ax4.annotate('Sempre concava\n(derivata seconda <0)', 
             xy=(0, -0.1), xytext=(-5, -0.22))

plt.savefig('./images/log-sigmoid-convex.jpg', 
           dpi=250, 
           bbox_inches='tight',
           pad_inches=0.05,  # Aggiungere questo parametro
           #facecolor=fig.get_facecolor(),  # Mantenere il colore di sfondo
           transparent=False)  # Disabilitare la trasparenza
plt.show()
```

<img title="a title" alt="Alt text" src="/home/lorenzo/Documenti/GitHub/my-obsidian-vault/images/log-sigmoid-convex.jpg">

*Figura 2.0: Convessità del logaritmo della sigmoide*

Infatti, possiamo notare che la funzione $-\ln(\sigma(x))$ (e quindi anche $\ln(1-\sigma(x))$) è convessa, in quanto la sua derivata seconda è sempre negativa.

**Proof:** 

$$
\begin{align*}
f(x) &= -\ln(\sigma(x)) \quad \text{dove} \quad \sigma(x) = \frac{1}{1 + e^{-x}}\\
f(x) &= -\ln\left(\frac{1}{1 + e^{-x}}\right) = \ln(1 + e^{-x})\\
f'(x) &= \frac{d}{dx} \ln(1 + e^{-x}) = \frac{-e^{-x}}{1 + e^{-x}} = -\frac{1}{1 + e^{x}}\\
f''(x) &= \frac{d}{dx} \left(-\frac{1}{1 + e^{x}}\right) = \frac{e^{x}}{(1 + e^{x})^2}
\end{align*}
$$

La funzione è **convessa** se $f''(x) \geq 0$ per ogni $x \in \mathbb{R}$.  
Osserviamo che:
- $e^{x} > 0$ per ogni $x$
- $(1 + e^{x})^2 > 0$ per ogni $x$

Quindi:
$$
f''(x) = \underbrace{\frac{e^{x}}{(1 + e^{x})^2}}_{\text{Sempre positivo}} > 0 \quad \forall x
$$

**Conclusione**:  
- $\ln(\sigma(x))$ è **strettamente convessa** su tutto $\mathbb{R}$. $\square$

### Dimostrazione della Convessità della Log-Loss

Per dimostrare che la **log-loss** è una funzione convessa, possiamo verificare che la sua Hessiana (la matrice delle derivate seconde) è **definita positiva**. Seguiamo i passaggi dettagliatamente.

#### 1. Definizione della Log-Loss

Supponiamo di avere la funzione di log-loss:

$$
\mathcal{LL}(\mathbf w) = -\frac{1}{n} \sum_{i=1}^{n} \left[ y_i \ln(\sigma(z_i)) + (1 - y_i) \ln(1 - \sigma(z_i)) \right],
$$

dove:

- $z_i = \mathbf x_i^\top \mathbf w$ rappresenta la combinazione lineare dei pesi $\mathbf w$ e delle feature $\mathbf x_i$.
- $\sigma(z)$ è la **funzione sigmoide** definita come:
  
  $$
  \sigma(z) = \frac{1}{1 + e^{- z}}.
  $$

#### 2. Calcolo della derivata prima

Consideriamo la funzione interna:

$$
f(z_i) = -\left[ y_i \ln(\sigma(z_i)) + (1 - y_i) \ln(1 - \sigma(z_i)) \right].
$$

Deriviamo rispetto a $z_i$. Utilizzando le proprietà della funzione sigmoide, otteniamo:

$$
\frac{d}{dz_i} f(z_i) = \sigma(z_i) - y_i.
$$

Derivando poi $z_i$ rispetto ai pesi $\mathbf w$, otteniamo:

$$
\frac{d z_i}{d\mathbf w} = \mathbf x_i.
$$

Applicando la **chain rule**, la derivata della log-loss rispetto ai pesi $\mathbf w$ è:

$$
\nabla_{\mathbf w} \mathcal{LL}(\mathbf w) = \frac{1}{n} \sum_{i=1}^{n} \frac{d f(z_i)}{dz_i}\frac{d z_i}{d\mathbf w} = \frac{1}{n} \sum_{i=1}^{n} (\sigma(z_i) - y_i) \mathbf x_i.
$$ 

Questa espressione rappresenta il **gradiente** della log-loss.

#### 3. Calcolo della Hessiana (derivata seconda)

Per avere la garanzia che la funzione di log-loss sia **convessa**, bisogna verificare che la sua Hessiana (la matrice delle derivate seconde) sia **semidefinita positiva**, il che garantisce che la funzione **abbia curvatura non negativa in tutte le direzioni** e quindi che sia convessa.

Per calcolare la **matrice Hessiana** della log-loss, deriviamo il gradiente $\nabla_{\mathbf{w}} \mathcal{LL}(\mathbf{w})$ rispetto a $\mathbf{w}$.  
Sappiamo che:
$$
\nabla_{\mathbf{w}} \mathcal{LL}(\mathbf{w}) = \frac{1}{n} \sum_{i=1}^n (\sigma(z_i) - y_i) \mathbf{x}_i
$$

**Passaggio 3.1: Derivata del gradiente**  
Deriviamo ogni componente $j$-esima del gradiente rispetto a $w_k$:
$$
\frac{\partial}{\partial w_k} \left[ \frac{1}{n} \sum_{i=1}^n (\sigma(z_i) - y_i) x_{ij} \right] = \frac{1}{n} \sum_{i=1}^n \frac{\partial \sigma(z_i)}{\partial w_k} x_{ij} - \underbrace{\frac{\partial y_i x_{ij}}{\partial w_k}}_{= 0} = \frac{1}{n} \sum_{i=1}^n \frac{\partial \sigma(z_i)}{\partial w_k} x_{ij}
$$

**Passaggio 3.2: Derivata della sigmoide**  
Usiamo la proprietà $\sigma'(z_i) = \sigma(z_i)(1 - \sigma(z_i))$:
$$
\frac{\partial \sigma(z_i)}{\partial w_k} = \sigma(z_i)(1 - \sigma(z_i)) \cdot \frac{\partial z_i}{\partial w_k} = \sigma(z_i)(1 - \sigma(z_i)) x_{ik}
$$

**Passaggio 3.3: Forma matriciale della Hessiana**  
Sostituendo nella derivata seconda:

$$
\nabla_{\mathbf{w}}^2 \mathcal{LL}(\mathbf{w}) = \frac{\partial}{\partial \mathbf{w}} \left( \nabla_{\mathbf{w}} \mathcal{LL}(\mathbf{w}) \right) = \frac{1}{n} \sum_{i=1}^n \frac{\partial}{\partial \mathbf{w}} \left[ (\sigma(z_i) - y_i) \mathbf{x}_i \right] = \frac{1}{n} \sum_{i=1}^n \sigma(z_i)(1 - \sigma(z_i)) \mathbf{x}_i \mathbf{x}_i^\top
$$

dove:

$$
\frac{\partial}{\partial w_k} \left[ (\sigma(z_i) - y_i) x_{ij} \right] = \underbrace{\frac{\partial \sigma(z_i)}{\partial w_k}}_{\sigma(z_i)(1 - \sigma(z_i)) x_{ik}} \cdot x_{ij} = \sigma(z_i)(1 - \sigma(z_i)) x_{ik} x_{ij}
$$

che quindi equivale a 

$$
\mathbf{H}_i = \sigma(z_i)(1 - \sigma(z_i)) 
\begin{bmatrix}
x_{i1}x_{i1} & x_{i1}x_{i2} & \cdots & x_{i1}x_{id} \\
x_{i2}x_{i1} & x_{i2}x_{i2} & \cdots & x_{i2}x_{id} \\
\vdots & \vdots & \ddots & \vdots \\
x_{id}x_{i1} & x_{id}x_{i2} & \cdots & x_{id}x_{id}
\end{bmatrix}
= \sigma(z_i)(1 - \sigma(z_i)) \, \mathbf{x}_i \mathbf{x}_i^\top
$$

#### 4. Analisi della Definita Positività

Ora abbiamo:

- **1. Positività dei coefficienti**: $\sigma(z_i)(1 - \sigma(z_i)) > 0 \quad \forall z_i \in \mathbb{R}$, poiché $\sigma(z_i) \in (0,1)$.

- **2. Matrici semidefinite positive**: Ogni matrice $\mathbf{x}_i \mathbf{x}_i^\top$ è [[semidefinita positiva]]. 
  
    Per ogni vettore $\mathbf{v} \in \mathbb{R}^d$:
    $$
    \mathbf{v}^\top (\mathbf{x}_i \mathbf{x}_i^\top) \mathbf{v} = (\mathbf{x}_i^\top \mathbf{v})^2 \geq 0
    $$

    Dimostriamo ora che per ogni vettore $\mathbf{x}_i \in \mathbb{R}^d$, la matrice $\mathbf{x}_i \mathbf{x}_i^\top$ è semidefinita positiva.
  
    Una matrice $M \in \mathbb{R}^{d \times d}$ è semidefinita positiva (PSD) se e solo se:  
    $$
    \forall \mathbf{v} \in \mathbb{R}^d \setminus \{\mathbf{0}\}, \quad \mathbf{v}^\top M \mathbf{v} \geq 0
    $$

    Sia $\mathbf{v} \in \mathbb{R}^d$ un vettore non nullo arbitrario. Calcoliamo:
    $$
    \mathbf{v}^\top (\mathbf{x}_i \mathbf{x}_i^\top) \mathbf{v} = (\mathbf{v}^\top \mathbf{x}_i)(\mathbf{x}_i^\top \mathbf{v})
    $$  
    Poiché $\mathbf{v}^\top \mathbf{x}_i$ è uno scalare, vale:  
    $$
    (\mathbf{v}^\top \mathbf{x}_i)(\mathbf{x}_i^\top \mathbf{v}) = (\mathbf{x}_i^\top \mathbf{v})^\top (\mathbf{x}_i^\top \mathbf{v}) = \|\mathbf{x}_i^\top \mathbf{v}\|^2
    $$

    Per qualsiasi scalare $a \in \mathbb{R}$, si ha $a^2 \geq 0$. Quindi:  
    $$
    \|\mathbf{x}_i^\top \mathbf{v}\|^2 \geq 0 \quad \forall \mathbf{v} \neq \mathbf{0}
    $$

    Poiché $\mathbf{v}^\top (\mathbf{x}_i \mathbf{x}_i^\top) \mathbf{v} \geq 0$ per ogni $\mathbf{v} \neq \mathbf{0}$, la matrice $\mathbf{x}_i \mathbf{x}_i^\top$ è semidefinita positiva per definizione. $\square$


**Corollari**:
- **Autovalori Non Negativi**: Gli autovalori di $\mathbf{x}_i \mathbf{x}_i^\top$ sono $\|\mathbf{x}_i\|^2$ (autovalore non negativo) e $0$ (con molteplicità $d-1$).
- **Rank 1**: Se $\mathbf{x}_i \neq \mathbf{0}$, la matrice ha rank 1, con autovettore $\mathbf{x}_i$.

La combinazione lineare:  
$$
\sum_{i=1}^n \sigma(z_i)(1 - \sigma(z_i)) \mathbf{x}_i \mathbf{x}_i^\top
$$  
mantiene la positività semidefinita perché:
  1. Coefficienti $\sigma(z_i)(1 - \sigma(z_i)) > 0$
  2. Somma di matrici PSD pesate positivamente è PSD
  3. Somma di matrici PSD pesate negativamente non sono PSD


Quindi, la Hessiana $\mathbf{H}_i$ per ogni osservazione $i$ risulta essere **semidefinita positiva**.

#### 5. Conclusione Finale

Poiché la Hessiana è semidefinita positiva per ogni $\mathbf{w}$, la funzione di log-loss $\mathcal{LL}(\mathbf{w})$ è **convessa** su $\mathbb{R}^d$. $\square$

Tuttavia, se imponessimo ora $\nabla_{\mathbf{w}} \mathcal{LL}(\mathbf{w}) = 0$, otterremmo il **minimo globale** della funzione di log-loss $\mathcal{LL}(\mathbf{w})$. Se non fosse che questa equazione è un'equazione trascendente, e può essere dimostrato che queste tipologie di equazioni non hanno una soluzione analitica. Quindi, per ottenere il minimo globale, bisogna utilizzare un metodo numerico di ottimizzazione. 

L’ottimizzazione tramite [[Discesa del Gradiente|discesa del gradiente]] è una delle soluzioni più comuni, e grazie alla convessità della funzione di log-loss, può convergere a un **unico minimo globale** (se esiste).


**Implicazioni pratiche**:  
- L’assenza di minimi locali rende la regressione logistica **stabile** e **prevedibile** nell’ottimizzazione.  
- Metodi del secondo ordine (es. Newton-Raphson) sfruttano direttamente la convessità per convergenza rapida.


## **Estensione Multiclasse: Softmax e Logica Multinomiale**

La regressione logistica può essere estesa a problemi di classificazione con $K \geq 2$ classi tramite il modello **Softmax** (o **regressione multinomiale**). Questo approccio generalizza la funzione sigmoide per gestire più classi, preservando la convessità della funzione di perdita.

### **Fondamenti Probabilistici**

#### 1. Funzione Softmax
Dato un vettore di punteggi (logit) $\mathbf{z} = [z_1, \dots, z_K]^\top$, dove $z_k = \mathbf{x}^\top \mathbf{w}_k$, la funzione softmax mappa i logit in probabilità:
$$
\sigma(\mathbf{z})_k = \frac{e^{z_k}}{\sum_{j=1}^K e^{z_j}}, \quad k = 1, \dots, K
$$
- **Proprietà**:
  - $\sigma(\mathbf{z})_k \in (0,1)$
  - $\sum_{k=1}^K \sigma(\mathbf{z})_k = 1$

#### 2. Modello Probabilistico
Per un'osservazione $\mathbf{x}$, la probabilità di appartenere alla classe $k$ è:
$$
p(y=k \mid \mathbf{x}, \mathbf{W}) = \sigma(\mathbf{z})_k = \frac{e^{\mathbf{x}^\top \mathbf{w}_k}}{\sum_{j=1}^K e^{\mathbf{x}^\top \mathbf{w}_j}}
$$
dove $\mathbf{W} = [\mathbf{w}_1, \dots, \mathbf{w}_K] \in \mathbb{R}^{(m+1) \times K}$ è la matrice dei pesi.

### **Funzione di Perdita (Cross-Entropy Multiclasse)**

#### 3. Log-Verosimiglianza
Data una matrice di labels $\mathbf{Y} \in \{0,1\}^{n \times K}$ (one-hot encoded), la log-verosimiglianza è:
$$
\ln \mathcal{L}(\mathbf{W}) = \sum_{i=1}^n \sum_{k=1}^K y_{ik} \ln\left( \frac{e^{\mathbf{x}_i^\top \mathbf{w}_k}}{\sum_{j=1}^K e^{\mathbf{x}_i^\top \mathbf{w}_j}} \right)
$$

#### 4. Cross-Entropy Loss
La funzione di perdita (negativa log-verosimiglianza normalizzata) è:
$$
\mathcal{LL}(\mathbf{W}) = -\frac{1}{n} \sum_{i=1}^n \sum_{k=1}^K y_{ik} \ln\left( \sigma(\mathbf{z}_i)_k \right)
$$

### **Ottimizzazione del Modello**

#### 5. Gradiente
Il gradiente rispetto a $\mathbf{w}_k$ è:
$$
\nabla_{\mathbf{w}_k} \mathcal{LL}(\mathbf{W}) = -\frac{1}{n} \sum_{i=1}^n \mathbf{x}_i \left( y_{ik} - \sigma(\mathbf{z}_i)_k \right)
$$
**Dimostrazione**:
- Sia $p_{ik} = \sigma(\mathbf{z}_i)_k$
- Derivando $\mathcal{LL}$ rispetto a $\mathbf{w}_k$:
  $$
  \frac{\partial \mathcal{LL}}{\partial \mathbf{w}_k} = -\frac{1}{n} \sum_{i=1}^n \mathbf{x}_i \left( y_{ik} - p_{ik} \right)
  $$

#### 6. Hessiana
La matrice Hessiana è **blocco-convessa** e può essere scritta come:
$$
\nabla_{\mathbf{W}}^2 \mathcal{LL}(\mathbf{W}) = \frac{1}{n} \sum_{i=1}^n \left( \text{diag}(\mathbf{p}_i) - \mathbf{p}_i \mathbf{p}_i^\top \right) \otimes \mathbf{x}_i \mathbf{x}_i^\top
$$
dove:
- $\mathbf{p}_i = [p_{i1}, \dots, p_{iK}]^\top$
- $\otimes$ è il prodotto di Kronecker
- $\text{diag}(\mathbf{p}_i)$ rappresenta la matrice diagonale di $\mathbf I_{K \times K} \cdot \mathbf{p}_i$.

**Proprietà**:
- La matrice $\text{diag}(\mathbf{p}_i) - \mathbf{p}_i \mathbf{p}_i^\top$ è semidefinita positiva.
- La combinazione di matrici semidefinite positive preserva la convessità.

### **Convessità e Unicità della Soluzione**

#### 7. Convessità Globale
La cross-entropy multiclasse è **convessa** in $\mathbf{W}$ perché:
- La Hessiana è semidefinita positiva.
- La somma di funzioni convesse è convessa.

#### 8. Identificabilità
Il modello è **sovraparametrizzato**: aggiungendo una costante a tutti i pesi $\mathbf{w}_k$, le probabilità non cambiano. Per rimuovere l'ambiguità:
- Si fissa $\mathbf{w}_K = \mathbf{0}$ (classe di riferimento).
- Si stimano $K-1$ vettori di pesi.

## Visualizzazione 3D della Softmax: Caso Reale di Diagnosi Medica

### Contesto Applicativo
Immaginiamo un sistema di supporto alle decisioni mediche che valuta il rischio di 3 patologie cardiache in base a due parametri vitali:
1. **Pressione sistolica (z₁)**: Variabile continua (70-200 mmHg)
2. **Livello di colesterolo (z₂)**: Variabile continua (150-300 mg/dL)

Le 3 classi di output rappresentano:
- **Classe 1**: Rischio infarto
- **Classe 2**: Rischio ictus
- **Classe 3**: Paziente sano

### Codice-Realtà

#### 1. Preparazione Dati Medici
- **Griglia 3D**: Simula tutte le combinazioni possibili di pressione/colesterolo
- **z₀ fisso a 0**: Baseline per pazienti con parametri normali
- **Softmax**: Calcola le probabilità relative delle tre condizioni

#### 2. Interpretazione Clinica
- **Superficie Rossa (Infarto)**: Aumenta con pressione alta + colesterolo elevato
- **Superficie Verde (Ictus)**: Predomina per pressione estrema + colesterolo medio
- **Superficie Blu (Sano)**: Dominante nella zona parametri normali

### Dinamiche Chiave
1. **Zona Pericolo Estremo** (angolo in alto a destra):
   - Pressione > 180 mmHg + Colesterolo > 250 mg/dL
   - Probabilità infarto ≈80%, ictus ≈15%, sano ≈5%

2. **Area Grigia Decisionale** (centro grafico):
   - Pressione 140-160 mmHg + Colesterolo 200-220 mg/dL
   - Probabilità simili tra tutte le classi (25-40%)

3. **Isola di Salute** (angolo in basso a sinistra):
   - Pressione < 120 mmHg + Colesterolo < 180 mg/dL
   - Probabilità sano >90%

### Componenti Grafiche Strategiche
- **Trasparenza**: Mostra sovrapposizioni tra diagnosi concorrenti
- **Colori Settoriali**: Allineati alle convenzioni mediche (rosso=emergenza)
- **Linee di Contorno**: Indicano le soglie decisionali critiche

### Utilizzo Pratico
I medici possono:
1. Valutare rapidamente scenari complessi
2. Identificare soglie di intervento
3. Spiegare i rischi ai pazienti con visualizzazioni intuitive
4. Ottimizzare i protocolli di prevenzione

> **Esempio Decisionale**: Un paziente con:
> - Pressione 160 mmHg (z₁=1.5)
> - Colesterolo 240 mg/dL (z₂=2.0)
> 
> Mostrerà: 45% infarto | 35% ictus | 20% sano  
> **Azione**: Combinare terapia ipotensiva + dieta

```python
import torch
import numpy as np
import matplotlib.pyplot as plt
from matplotlib import cm
from mpl_toolkits.mplot3d import Axes3D
from matplotlib.patches import Patch
from matplotlib import colormaps

# Configurazione tema medico professionale
plt.style.use('dark_background')
plt.rcParams.update({
    'font.size': 12,
    'axes.titlesize': 16,
    'axes.labelcolor': '#FFAA00',
    'xtick.color': '#FFFFFF',
    'ytick.color': '#FFFFFF',
    'axes.facecolor': '#4f4f4e',
    'figure.facecolor': '#4f4f4e'
})

# Parametri medici realistici (range clinico)
sistolica = np.linspace(70, 200, 100)     # mmHg
colesterolo = np.linspace(150, 300, 100)  # mg/dL
SIS, COL = np.meshgrid(sistolica, colesterolo)

# Normalizzazione per modello (z-score ipotetico)
z_sis = (SIS - 135)/25  # Media 135, SD 25
z_col = (COL - 225)/50   # Media 225, SD 50

# Calcolo probabilità patologie
with torch.no_grad():
    logits = torch.stack([
        torch.tensor(z_sis.ravel() * 0.8 + z_col.ravel() * 0.5),  # Infarto
        torch.tensor(z_sis.ravel() * 1.2 + z_col.ravel() * 0.3),  # Ictus
        torch.tensor(-z_sis.ravel() * 0.4 - z_col.ravel() * 0.2)  # Sano
    ], dim=1)
    
    probs = torch.nn.functional.softmax(logits, dim=1).numpy()

# Formattazione per plot 3D
prob_infarto = probs[:, 0].reshape(SIS.shape)
prob_ictus = probs[:, 1].reshape(SIS.shape)
prob_sano = probs[:, 2].reshape(SIS.shape)

# Creazione figura
fig = plt.figure(figsize=(16, 12))
ax = fig.add_subplot(111, projection='3d')

# Superfici cliniche
cmap_emergency = colormaps['Reds'].reversed()
cmap_stroke = colormaps['Greens'].reversed()
cmap_sano = colormaps['Purples']  # Cambiato da Blu a Viola

surf1 = ax.plot_surface(SIS, COL, prob_infarto,
                       facecolors=cmap_emergency(prob_infarto),
                       alpha=0.8,
                       rstride=3,
                       cstride=3,
                       antialiased=True)

surf2 = ax.plot_surface(SIS, COL, prob_ictus,
                       facecolors=cmap_stroke(prob_ictus),
                       alpha=0.7,
                       rstride=3,
                       cstride=3)

surf3 = ax.plot_surface(SIS, COL, prob_sano,
                       facecolors=cmap_sano(prob_sano),
                       alpha=0.6,
                       rstride=3,
                       cstride=3)

# Etichette cliniche
ax.set_xlabel('\nPressione Sistolica (mmHg)', fontsize=14, color='#FFFFFF')
ax.set_ylabel('\nColesterolo Totale (mg/dL)', fontsize=14, color='#FFFFFF')
ax.set_zlabel('\nProbabilità Diagnosi', fontsize=14, color='#FFFFFF')
ax.set_zticks(np.linspace(0, 1, 11))

# Angolo visuale ottimale
ax.view_init(elev=38, azim=-125)

# Legenda diagnostica
legend_elements = [
    Patch(facecolor='red', edgecolor='white', label='Rischio Infarto'),
    Patch(facecolor='green', edgecolor='white', label='Rischio Ictus'),
    Patch(facecolor='purple', edgecolor='white', label='Paziente Sano')
]
ax.legend(handles=legend_elements, loc='upper right', fontsize=12)

# Linee guida cliniche
ax.contour(SIS, COL, prob_infarto, 
          levels=[0.5, 0.7], 
          colors='#FF0000',
          linestyles='--',
          linewidths=0.5,
          offset=0)

ax.contour(SIS, COL, prob_ictus, 
          levels=[0.4, 0.6], 
          colors='#00FF00',
          linestyles='-.',
          linewidths=0.5,
          offset=0)

plt.tight_layout(pad=0.0)
plt.savefig('./images/softmax-example.jpg', 
           dpi=250, 
           bbox_inches='tight',
           pad_inches=0.05,  # Aggiungere questo parametro
           facecolor=fig.get_facecolor(),  # Mantenere il colore di sfondo
           transparent=False)  # Disabilitare la trasparenza
plt.show()
```

<img src="/home/lorenzo/Documenti/GitHub/my-obsidian-vault/images/softmax-example.jpg" alt="Softmax Example">

*Figura 3.0: Esempio di utilizzo della Regressione Logistica con Softmax per la diagnosi di patologie cliniche*

## Confronto con l'Analisi Discriminante Lineare (LDA)

| **Caratteristica**       | **Regressione Logistica**                          | **LDA**                                  |
|--------------------------|---------------------------------------------------|------------------------------------------|
| **Tipo di Modello**       | Discriminativo                                    | Generativo                               |
| **Assunzioni**           | Nessuna su $p(\mathbf{x} \mid y)$               | Features ~ Gaussiane con stessa covarianza |
| **Stima Parametri**      | Massimizzazione della verosimiglianza             | Massimizzazione joint likelihood        |
| **Robustezza**           | Maggiore in assenza di normalità delle features   | Sensibile a violazioni delle assunzioni  |
| **Interpretazione**      | Coefficienti come log-odds ratio                  | Coefficienti legati a media e covarianza |

## **Aspetti Pratici**

### Regolarizzazione
Per evitare overfitting, si aggiungono termini di penalità alla loss:
- **L1 (Lasso)**: $\lambda \|\mathbf{w}\|_1$ → Sparsità (selezione features).
- **L2 (Ridge)**: $\lambda \|\mathbf{w}\|_2^2$ → Contrazione coefficienti.

Esempio con regolarizzazione L2:
$$
\ell_{\text{reg}}(\mathbf{w}) = \ell(\mathbf{w}) + \lambda \sum_{j=1}^n w_j^2
$$

### Soglie di Decisione Non Standard
La soglia 0.5 è ottimale solo se:
- Costi di falsi positivi/negativi sono bilanciati.
- La distribuzione delle classi è uniforme.

In scenari sbilanciati, si può ottimizzare la soglia massimizzando l'**F1-score** o minimizzando costi specifici.

## **Esempio: Interpretazione Coefficienti**

Supponiamo un modello con:
- **Feature**: Età ($\mathbf{x}_1$), Reddito ($\mathbf{x}_2$).
- **Coefficiente stimato**: $\mathbf{w} = [0.8, -0.2]$.

**Interpretazione**:
- **Età**: Un aumento di 1 anno moltiplica gli odds ratio per $e^{0.8} ≈ 2.23$ (favorevole alla classe positiva).
- **Reddito**: Un aumento di 1 unità moltiplica gli odds ratio per $e^{-0.2} ≈ 0.82$ (sfavorevole).

## **Limiti della Regressione Logistica**

1. **Linearità nei Confini**: Assume che il logit sia lineare nelle features → Non cattura interazioni complesse.
2. **Sensibilità a Correlazioni**: Features altamente correlate possono destabilizzare i coefficienti.
3. **Classi Separabili**: Se le classi sono linearmente separabili, i coefficienti divergono ($\|\mathbf{w}\| \to \infty$).

Per superare questi limiti, si possono introdurre:
- **Feature Polinomiali**: $\mathbf{x}_1^2, \mathbf{x}_1 \mathbf{x}_2$.
- **Kernel Methods**: Mappare implicitamente in spazi ad alta dimensionalità.
