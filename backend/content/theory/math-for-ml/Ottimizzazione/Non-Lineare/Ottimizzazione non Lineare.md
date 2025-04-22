# Ottimizzazione Non Lineare

## Definizione Formale  
L'**ottimizzazione non lineare** consiste nel trovare un vettore $\mathbf{x}^* \in \mathbb{R}^n$ che:  

$$
\begin{aligned}  
\mathbf{x}^* = \arg\min_{\mathbf{x}} \quad & f(\mathbf{x}) \\  
\text{soggetto a} \quad & g_i(\mathbf{x}) \leq 0, \quad i = 1, \dots, m \\  
& h_j(\mathbf{x}) = 0, \quad j = 1, \dots, p  
\end{aligned}  
$$

dove:  
- $f: \mathbb{R}^n \to \mathbb{R}$ è una **funzione obiettivo non lineare**  
- $g_i: \mathbb{R}^n \to \mathbb{R}$ sono vincoli di disuguaglianza non lineari  
- $h_j: \mathbb{R}^n \to \mathbb{R}$ sono vincoli di uguaglianza non lineari  

**Condizione di non linearità**: Almeno una tra $f$, $\{g_i\}$, o $\{h_j\}$ è non lineare.  

## Classificazione Problemi
1. **[[Ottimizzazione Convessa]]**:
   - $f$ convessa, $g_i$ convesse
   - Garantita convergenza al globale

2. **[[Ottimizzazione Non Convessa]]**:
   - Presenza di minimi locali
   - Richiede metodi globali ([[Algoritmi Genetici]], [[Simulated Annealing]])
  
## Non-Linear Optimization: Convessità e Non-Convessità

L'ottimizzazione non lineare generalizza i problemi lineari introducendo **curvatura** nella funzione obiettivo e/o nei vincoli.  
A differenza dei problemi lineari (sempre convessi), i problemi non lineari possono essere:

### 1. **Convessità**  
Una funzione $f(x)$ è **convessa** se:  
$$
f(\lambda x + (1-\lambda)y) \leq \lambda f(x) + (1-\lambda)f(y) \quad \forall x,y \in \text{dom}(f), \lambda \in [0,1]
$$
**Esempi**:  
- $f(x) = x^2$ (convessa stretta)  
- $f(x) = e^x$ (convessa ma non stretta)  

**Implicazioni**:  
- Esiste **un unico minimo globale**  
- Algoritmi efficienti (es. [[Gradient Descent]]) garantiscono convergenza  

### 2. **Non Convessità**  
Una funzione è **non convessa** se viola la disuguaglianza di convessità in almeno un punto.  
**Esempi**:  
- $f(x) = \sin(x)$ (infiniti minimi/massimi locali)  
- $f(x) = x^4 - 3x^3 + 2$ (punti di sella)  

**Implicazioni**:  
- **Minimi locali** ingannevoli  
- Richiede metodi specializzati (es. [[Simulated Annealing]], [[Algoritmi Genetici]])  

### Perché la Non-Linearità Introduce Complessità?  
| Caratteristica       | Lineare              | Non Lineare Convessa      | Non Lineare Non Convessa  |  
|-----------------------|----------------------|---------------------------|---------------------------|  
| **Minimi Globali**    | 1 (se esiste)        | 1                         | Multipli                  |  
| **Curvatura**         | Zero                 | Uniforme (≥0)             | Variabile (pos./neg.)     |  
| **Soluzioni**         | Vertici poliedro     | Punti interni/confine     | Qualsiasi                 |  

**Esempio Istruttivo**:  
Per $f(x) = x^4 - 2x^2$:  
- **Non convessa** (derivata seconda $12x^2 - 4$ cambia segno)  
- Due minimi globali a $x = \pm 1$, un massimo locale a $x = 0$  

La non-linearità rompe la struttura "piatta" dei problemi lineari, introducendo **comportamenti emergenti** che richiedono tecniche avanzate di analisi e ottimizzazione.  

## Metodi Numerici
### Approcci Derivati
1. **[[Metodi del Gradiente]]**:
   - [[Discesa del gradiente]]
   - [[Metodo di Newton]] e [[Quasi-Newton]]

2. **[[Metodi di Penalità]]**:
   - Trasformano vincoli in termini additivi

### Approcci Senza Derivate
1. **[[Algoritmi Evolutivi]]**
2. **[[Ricerca Pattern Search]]**

## Teoremi Fondamentali
1. **[[Condizioni KKT]]**: Generalizzazione dei moltiplicatori di Lagrange
2. **[[Teorema di Weierstrass]]**: Esistenza di soluzioni per insiemi compatti
3. **[[Teorema della Funzione Inversa]]**: Base per metodi locali

## Campi di Applicazione
- [[Machine Learning]]: Training di [[Reti Neurali]]
- [[Controllo Ottimo]]: Traiettorie in [[Robotica]]
- [[Finanza Quantitativa]]: Calibrazione modelli

## Sfide Aperte
1. **[[Maledizione della Dimensionalità]]**: Scalabilità in spazi $\mathbb{R}^n$ con $n$ grande
2. **[[Equilibrio di Nash]]**: Ottimizzazione in contesti competitivi
3. **[[Ottimizzazione Robustza]]**: Gestione incertezza parametrica
