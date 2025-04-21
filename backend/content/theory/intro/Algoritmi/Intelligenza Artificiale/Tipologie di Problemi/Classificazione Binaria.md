# 📊 Problema della Classificazione Binaria: Interpretazione Probabilistica

La **classificazione binaria** rappresenta uno dei problemi fondamentali dell’apprendimento supervisionato, in cui l’obiettivo è assegnare un'osservazione $\mathbf{x} \in \mathbb{R}^d$ a una delle due classi possibili.  
Formalmente, la variabile target $y$ assume valori in un insieme discreto a due elementi:  
$$
y \in \{0, 1\}
$$

Il problema consiste quindi nel costruire una funzione di decisione, o più in generale un modello predittivo, capace di mappare un vettore di caratteristiche (feature) $\mathbf{x}$ in una stima della probabilità di appartenenza alla classe positiva $y = 1$. In particolare, l’approccio probabilistico si propone di modellare esplicitamente la distribuzione condizionata:

$$
p(y = 1 \mid \mathbf{x}) = f(\mathbf{x})
$$

dove:
- $f : \mathbb{R}^d \to [0,1]$ è una funzione che restituisce una probabilità, cioè un valore numerico interpretabile come il grado di confidenza con cui l’istanza $\mathbf{x}$ viene attribuita alla classe positiva,
- l'uscita $f(\mathbf{x})$ può quindi essere interpretata come una **stima del rischio condizionato** o **probabilità a posteriori**, ottenuta sulla base delle caratteristiche osservate dell’input.

L’adozione di un modello probabilistico, rispetto a un approccio puramente deterministico, offre numerosi vantaggi:
- consente di quantificare l’incertezza nelle predizioni,
- permette di integrare agevolmente conoscenza a priori (tramite il teorema di Bayes),
- rende possibili strategie decisionali ottimali rispetto a metriche di costo-asimmetrico (es. minimizzazione del rischio atteso).

In questo contesto, il problema della classificazione binaria può essere affrontato modellando opportunamente la relazione tra $\mathbf{x}$ e $y$, al fine di apprendere $p(y \mid \mathbf{x})$ a partire da un insieme di dati osservati.  
Nei paragrafi successivi verrà approfondito come tale distribuzione possa essere calcolata, interpretata, e utilizzata tramite strumenti teorici quali il **logit**, la **funzione sigmoide** e la **[[Regressione Logistica|regressione logistica]]**.


## **Likelihood e Posteriori**

Per stimare la probabilità della classe, possiamo applicare il **Teorema di Bayes**:
$$
p(y \mid \mathbf{x}) = \frac{p(\mathbf{x} \mid y) p(y)}{p(\mathbf{x})}
$$

- $p(y)$ è la probabilità a priori della classe $y$.
- $p(\mathbf{x} \mid y)$ è la **verosimiglianza** (*likelihood*), che modella come le caratteristiche $\mathbf{x}$ sono distribuite all'interno di ciascuna classe.
- $p(\mathbf{x}) = \sum_{y \in \{0,1\}} p(\mathbf{x} \mid y) p(y)$ è la probabilità marginale dei dati.

In pratica, possiamo stimare $p(y \mid \mathbf{x})$ attraverso un modello parametrico che approssima la distribuzione dei dati.

## **Il Concetto di Logit e la Funzione Sigmoide**

Come abbiamo visto, nella classificazione binaria, possiamo esprimere la probabilità che un'osservazione $\mathbf x \in \mathbb R^d$ appartenga alla classe 1 come: $p(y = 1 \mid \mathbf{x}) = \frac{p(\mathbf{x} \mid y) p(y)}{p(\mathbf{x})}$. Introduciamo ora il concetto di logit: una misura logaritmica di quanto verosimile sia la classe 1 rispetto alla classe 0 (logaritmicamente):

$$\begin{align*}
logit(p(y = 1 \mid \mathbf{x})) = a &= \log \frac{p(y = 1 \mid \mathbf{x})}{\underbrace{p(y = 0 \mid \mathbf{x})}_{= 1 - p(y = 1 \mid \mathbf{x})}}\\
e^a &= \frac{p(y = 1 \mid \mathbf{x})}{\underbrace{p(y = 0 \mid \mathbf{x})}_{= 1 - p(y = 1 \mid \mathbf{x})}}\\
p(y = 1 \mid \mathbf{x}) &= e^a p(y = 0 \mid \mathbf{x})\\
\end{align*}
$$

E dato che $p(y = 0 \mid \mathbf{x}) + p(y = 1 \mid \mathbf{x}) = 1$,

$$\begin{align*}
e^a p(y = 0 \mid \mathbf{x}) + p(y = 0 \mid \mathbf{x}) &= 1\\
p(y = 0 \mid \mathbf{x}) (e^a + 1) &= 1\\
p(y = 0 \mid \mathbf{x}) &= \frac{1}{e^a + 1}\\
\end{align*}
$$

E ora, usando il fatto che $p(y=1 \mid \mathbf x) = e^a \cdot p(y=0\mid\mathbf x)$, otteniamo:

$$\begin{align*}
    p(y=1 \mid\mathbf x) &= e^a \cdot \frac{1}{1 + e^a}\\
    p(y=1 \mid\mathbf x) &= \frac{e^a}{1 + e^a}\\
    p(y=1 \mid\mathbf x) &= \frac{\frac{e^a}{e^a}}{\frac{1}{e^a} + \frac{e^a}{e^a}}\\
    p(y=1 \mid\mathbf x) &= \frac{1}{1 + e^{-a}} = \sigma(a) \ \text{La funzione sigmoide.}\\
\end{align*}
$$

Questa funzione si chiama **funzione sigmoide** e viene utilizzata per ottenere la probabilità di una classe dato un vettore di caratteristiche. Sarebbe quindi l'inverso della funzione logit, in quanto abbiamo ricavato la $x$ (che nel nostro caso era $p(y = 1 \mid \mathbf{x})$) dalla funzione $logit(x)$. Infatti,

$$
\begin{align*}
\text{Partendo da } p &= \sigma(x) = \frac{1}{1 + e^{-x}} \\
\frac{1}{p} &= 1 + e^{-x} \quad \text{(Reciproco di entrambi i lati)} \\
\frac{1}{p} - 1 &= e^{-x} \quad \text{(Isolare } e^{-x}) \\
\frac{1 - p}{p} &= e^{-x} \quad \text{(Semplificare)} \\
\ln\left(\frac{1 - p}{p}\right) &= -x \quad \text{(Applicare il logaritmo naturale)} \\
x &= -\ln\left(\frac{1 - p}{p}\right) = \ln\left(\frac{p}{1 - p}\right) \quad \text{(Risolvere per } x) \\
\text{Quindi otteniamo alla fine: }\\
\sigma^{-1}(p) &= \ln\left(\frac{p}{1 - p}\right).
\end{align*}
$$

Questo perché il logit trasforma un rapporto di probabilità $\in [0, 1]$ in un valore $\in (-\infty, +\infty)$. Mentre la funzione sigmoide trasforma un valore $\in (-\infty, +\infty)$ in un rapporto di probabilità $\in [0, 1]$. In altre parole, il logit controlla quanto le features in input influenzano la probabilità di appartenenza alla classe 1 rispetto alla classe 0.

### Qual è la classe migliore?

Nel caso di classificazione binaria, la classe con la maggiore probabilità di appartenenza viene chiamata **classe migliore**. Assumiamo ad esempio: $\mathbb P(y = 1 \mid \mathbf x) > \mathbb P(y = 0 \mid \mathbf x) = 1 - \mathbb P(y = 1 \mid \mathbf x)$, allora la classe migliore sarà quella 1. Quindi:

$$\begin{align*}
\frac{\mathbb P(y=1 \mid \mathbf x)}{1 - \mathbb P(y=1 \mid \mathbf x)} &> 1\\
e^a &> 1\\
a &> 0\\
\end{align*}
$$

## 🔗 Collegamento con la Regressione Logistica

Tutto quanto discusso finora riguardo al logit, alla funzione sigmoide e all'interpretazione probabilistica della classificazione binaria, trova una formalizzazione diretta nel modello noto come **[[Regressione Logistica|regressione logistica]]**.

Nel contesto della regressione logistica, l'argomento del logit — che abbiamo indicato con $a$ — è espresso come una **combinazione lineare** delle caratteristiche $\mathbf{x}$, pesate da un vettore di parametri $\mathbf{w}$, più un termine di bias $b$. Formalmente:

$$
a = \mathbf{w}^\top \mathbf{x} + b
$$

Dove:
- $\mathbf{x} \in \mathbb{R}^d$ è il vettore delle feature (caratteristiche dell'input),
- $\mathbf{w} \in \mathbb{R}^d$ è il vettore dei pesi associati a ciascuna feature,
- $b \in \mathbb{R}$ è un termine di bias (intercetta).

Quindi, la **probabilità che un'osservazione appartenga alla classe 1**, secondo la regressione logistica, è:

$$
p(y = 1 \mid \mathbf{x}) = \sigma(a) = \frac{1}{1 + e^{-(\mathbf{w}^\top \mathbf{x} + b)}}
$$

### 🧠 Connessione con il framework probabilistico visto prima

Nel paragrafo precedente abbiamo derivato la forma generale della **funzione sigmoide** come:

$$
p(y = 1 \mid \mathbf{x}) = \frac{1}{1 + e^{-a}} \quad \text{dove } a = \log \left( \frac{p(y=1 \mid \mathbf{x})}{p(y=0 \mid \mathbf{x})} \right)
$$

Ora, nella regressione logistica, si assume **esplicitamente** che questo logit sia **modellato come funzione lineare delle feature**:

$$
\log \left( \frac{p(y=1 \mid \mathbf{x})}{p(y=0 \mid \mathbf{x})} \right) = \mathbf{w}^\top \mathbf{x} + b
$$

In altre parole: il logit, che abbiamo introdotto come misura della tendenza verso la classe positiva, viene parametrizzato linearmente nel modello logistico.

Questo **collega in modo diretto** la regressione logistica con il framework probabilistico della classificazione binaria:  
**la regressione logistica è un caso specifico** in cui si assume che il log-odds sia una funzione lineare delle variabili osservabili.

Quindi:
- il valore $a = \mathbf{w}^\top \mathbf{x} + b$ rappresenta l'evidenza (in scala logaritmica) a favore della classe 1,
- la funzione sigmoide serve a convertire questa evidenza in una probabilità interpretabile in senso bayesiano,
- la soglia di classificazione (tipicamente 0.5) corrisponde a $a = 0$, cioè a un logit neutro.

Questa formulazione consente un'integrazione naturale tra modelli statistici, inferenza bayesiana e ottimizzazione numerica, rendendo la regressione logistica un ponte formale tra:
- il principio del massimo di verosimiglianza,
- il principio di massima entropia (nel quale la regressione logistica può essere reinterpretata),
- e l’interpretazione geometrica dei classificatori lineari.

## 🧾 Conclusioni

La classificazione binaria, nel contesto probabilistico, fornisce una struttura interpretativa rigorosa per modellare l'incertezza e le decisioni in presenza di dati etichettati. Attraverso il teorema di Bayes, la funzione logit e la funzione sigmoide, è possibile tradurre una relazione tra dati e classi in termini di probabilità interpretabili, consentendo predizioni robuste e controllabili.

L'introduzione della **regressione logistica** come specificazione parametrica del modello binario completa elegantemente questo framework:  
- La trasformazione logit consente di modellare i **log-odds** in funzione delle feature osservate.  
- La funzione sigmoide traduce questi log-odds in **probabilità ben calibrate**, comprese tra 0 e 1.  
- L'intera struttura consente non solo una previsione binaria, ma anche una misura del **grado di confidenza** associato ad essa.

Inoltre, l'approccio probabilistico:
- rende il modello interpretabile a livello statistico e decisionale,
- fornisce un criterio naturale di classificazione basato sul **massimo a posteriori**,
- è estensibile a contesti più complessi (classificazione multiclasse, sequenziale, o strutturata) tramite generalizzazioni come:
  - modelli discriminativi (es. **[[Maximum Entropy Models]]**),
  - modelli generativi (es. **[[Naive Bayes]]**),
  - o metodi bayesiani più avanzati.

In sintesi, comprendere il legame tra probabilità, logit e regressione logistica fornisce una base solida non solo per costruire classificatori binari efficaci, ma anche per **interpretare e giustificare le decisioni predittive** nel contesto reale.  
Questo ponte tra teoria dell'informazione, statistica e apprendimento automatico è ciò che rende questo paradigma fondamentale per tutta la moderna modellazione predittiva.
