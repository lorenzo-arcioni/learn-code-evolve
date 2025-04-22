# 📊 Maximum Entropy Models (Modelli a Massima Entropia)

I **Maximum Entropy Models** sono modelli probabilistici discriminativi utilizzati per predire una distribuzione di probabilità $P(y \mid x)$ partendo da un insieme di osservazioni e un insieme di **vincoli** noti.  

L’idea centrale di questi modelli si basa sul **principio di massima entropia**, secondo cui, tra tutte le distribuzioni compatibili con ciò che si conosce, si preferisce quella **con la massima incertezza possibile** (cioè, entropia massima), per evitare di fare assunzioni non giustificate.

Questo approccio è particolarmente utile in contesti in cui abbiamo una conoscenza parziale o incompleta del sistema (come spesso accade in linguaggio naturale), e vogliamo costruire un modello probabilistico che rifletta esattamente le informazioni a disposizione — *nulla di più, nulla di meno*.

## 📚 Concetto base: il principio di massima entropia

Il **principio di massima entropia**, introdotto da E.T. Jaynes, afferma che:

> _“Quando si costruisce una distribuzione di probabilità basata su un insieme di vincoli noti, la distribuzione corretta è quella che massimizza l'entropia, ovvero quella che non introduce alcuna informazione arbitraria oltre ai vincoli dati.”_

In termini pratici: se conosciamo solo alcuni aspetti di un fenomeno (ad esempio, alcune **feature expectations**), il modello migliore è quello che **rispetta quei vincoli**, ma **è altrimenti il più neutro possibile**.

L'entropia di una distribuzione discreta condizionata è definita come:

$$
H(P) = - \sum_y P(y \mid x) \log P(y \mid x)
$$

Massimizzare $H(P)$ significa rendere la distribuzione il più incerta (o “piatta”) possibile, pur rispettando le informazioni note.

## 🔣 Formula del modello: struttura del Maximum Entropy Model

In un modello a massima entropia, la distribuzione condizionata $P(y \mid x)$ viene modellata come:

$$
P(y \mid x) = \frac{1}{Z(x)} \exp\left( \sum_i \lambda_i f_i(x, y) \right)
$$

Questa è una distribuzione **esponenziale generalizzata** che rispetta i vincoli dati da funzioni di feature.

### 🧩 Dettagli sui componenti:

- $f_i(x, y)$:  
  Queste sono **funzioni caratteristiche** (feature functions) che catturano aspetti rilevanti del dato di input $x$ e dell’etichetta $y$. Spesso sono binarie (0 o 1), ma possono essere anche continue. Ogni funzione rappresenta un vincolo che vogliamo rispettare nel modello.

- $\lambda_i$:  
  Sono i **pesi** associati a ciascuna feature. Vengono appresi durante il processo di addestramento. Determinano l'importanza relativa delle feature nella definizione della distribuzione.

- $Z(x)$:  
  È la **funzione di partizione** (partition function), utilizzata per normalizzare la distribuzione in modo che la somma su tutti i possibili $y$ sia pari a 1:

  $$
  Z(x) = \sum_{y'} \exp\left( \sum_i \lambda_i f_i(x, y') \right)
  $$

Questa struttura assicura che $P(y \mid x)$ sia una **distribuzione di probabilità valida**, cioè normalizzata e non negativa.

## 🛠️ Addestramento del modello: come apprendere i pesi $\lambda_i$

L’obiettivo dell’addestramento è **trovare i valori ottimali dei pesi $\lambda_i$** in modo che le aspettative delle feature nel modello corrispondano a quelle osservate nei dati di addestramento.

Formalmente, per ogni feature $f_i$, imponiamo che:

$$
\mathbb{E}_{\text{data}}[f_i] = \mathbb{E}_{\text{model}}[f_i]
$$

dove:
- $\mathbb{E}_{\text{data}}[f_i]$ è l’**aspettativa empirica** della feature calcolata sui dati reali
- $\mathbb{E}_{\text{model}}[f_i]$ è l’**aspettativa predetta** dalla distribuzione del modello

### 🧮 Funzione obiettivo: massimizzazione della log-verosimiglianza

In pratica, si massimizza la **log-likelihood** dei dati di addestramento:

$$
\mathcal{L}(\lambda) = \sum_{(x, y) \in D} \log P(y \mid x)
$$

Poiché $P(y \mid x)$ è espresso in forma esponenziale, la log-likelihood è **concava**, e può essere ottimizzata efficientemente con metodi numerici.

### 🔧 Algoritmi per l'ottimizzazione

L’ottimizzazione può essere fatta con diversi algoritmi:

- **GIS (Generalized Iterative Scaling)**  
  Algoritmo iterativo classico per modelli log-lineari. Garantisce convergenza ma può essere lento.

- **Improved Iterative Scaling**
- **Gradient Ascent**
- **L-BFGS**  
  Metodo più moderno e veloce, basato sull’approssimazione della matrice hessiana (quasi-Newton).

### 🧪 Schema semplificato del processo di addestramento

1. Inizializza tutti i $\lambda_i = 0$
2. Per ogni iterazione:
   - Calcola l’aspettativa empirica $\mathbb{E}_{\text{data}}[f_i]$
   - Calcola l’aspettativa del modello $\mathbb{E}_{\text{model}}[f_i]$
   - Calcola il gradiente: $\nabla_i = \mathbb{E}_{\text{data}}[f_i] - \mathbb{E}_{\text{model}}[f_i]$
   - Aggiorna $\lambda_i$ in direzione del gradiente (gradient ascent)

## 🧠 Interpretabilità e proprietà

- Ogni peso $\lambda_i$ riflette **quanto forte** la feature $f_i$ influenza la probabilità dell'output.
- È un modello **discriminativo**: stima direttamente $P(y \mid x)$, a differenza dei modelli generativi (come Naive Bayes).
- È **modulare**: è facile aggiungere nuove feature, anche complesse.
- È **interpretabile**: i pesi possono essere letti e analizzati per capire le decisioni del modello.

## 📦 Applicazioni pratiche

I Maximum Entropy Models trovano applicazione in numerosi ambiti, specialmente in **Elaborazione del Linguaggio Naturale (NLP)**:

- **[[Part-of-Speech Tagging|POS tagging (Part-of-Speech)]]**  
  Assegnazione di categorie grammaticali alle parole.

- **Named Entity Recognition (NER)**  
  Identificazione di entità come persone, organizzazioni, luoghi.

- **Classificazione testuale**  
  Email spam detection, analisi del sentiment.

- **Sequence labeling**  
  Segmentazione e annotazione di sequenze, estensibile tramite **Maximum Entropy Markov Models (MEMMs)**.

## 🚧 Limitazioni

- Computazionalmente **pesante** se lo spazio delle etichette $y$ è molto grande, perché bisogna sommare su tutte le possibili etichette per calcolare $Z(x)$.
- Richiede feature ingegnerizzate bene: le prestazioni dipendono molto dalla qualità delle funzioni $f_i(x, y)$.
- Non cattura automaticamente dipendenze sequenziali o latenti (come fanno ad esempio i CRF o i modelli neurali).

🧠 *Il Maximum Entropy Model è un potente strumento probabilistico: preciso, flessibile e interpretabile. È ideale quando si dispone di feature ben progettate e si vuole un controllo diretto sulla probabilità condizionata, evitando assunzioni ingiustificate.*

