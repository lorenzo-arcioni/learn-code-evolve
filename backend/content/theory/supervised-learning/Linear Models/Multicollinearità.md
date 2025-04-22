# Multicollinearità nella Regressione Lineare

La **multicollinearità** è una problematica che si verifica quando due o più variabili indipendenti nel modello di regressione lineare sono altamente correlate tra loro. Questa situazione può rendere difficile separare l'effetto di ciascuna variabile sul risultato e può compromettere la stabilità e l'affidabilità del modello di regressione.

## **Problemi causati dalla Multicollinearità**

### 1. **Stime Instabili dei Coefficienti $\mathbf{w}$**

Quando due o più variabili indipendenti sono fortemente correlate, il modello non è in grado di assegnare un "peso" chiaro e distinto a ciascuna di esse. In altre parole, l'effetto di una variabile potrebbe essere **assorbito** da un'altra variabile altamente correlata. Questo porta a stime **instabili** dei coefficienti del modello.

#### **Esempio di instabilità**
Immagina di avere due variabili indipendenti, $x_1$ e $x_2$, che sono altamente correlate, per esempio, $x_1$ potrebbe essere "altezza" e $x_2$ "peso". Se il modello cerca di predire una variabile dipendente, come la **salute**, utilizzando entrambe le variabili, la forte correlazione tra $x_1$ e $x_2$ crea un problema: entrambi contribuiscono in modo simile alla previsione della salute, ma non è chiaro quanto ciascuno influenzi la salute in modo indipendente.

In pratica, piccole modifiche nei dati di input (ad esempio, un cambiamento nel valore di $x_1$ o $x_2$) possono portare a **grandi cambiamenti** nei coefficienti stimati. Di conseguenza, i coefficienti risultano **sensibili** alle variazioni nei dati, rendendo il modello poco robusto.

#### **Matematica dietro l'instabilità**
In presenza di multicollinearità, la matrice delle variabili indipendenti $\mathbf{X}$ ha una **alta collinearità** tra le colonne, il che fa sì che la matrice $\mathbf{X}^T \mathbf{X}$ (la matrice di Gram) diventi **vicina alla singolarità**. La **singolarità** indica che la matrice non è invertibile o che è quasi singolare. L'inversione di una matrice vicina alla singolarità causa **stime dei coefficienti molto grandi o variabili** a causa della moltiplicazione con numeri numericamente instabili.

### 2. **Alti Errori Standard sui Coefficienti**

Quando due o più variabili indipendenti sono altamente correlate, gli **errori standard** associati ai coefficienti stimati aumentano. Un errore standard elevato indica che la stima del coefficiente è imprecisa. Di conseguenza, diventa più difficile testare se i coefficienti sono significativamente diversi da zero (o da un altro valore di interesse), riducendo la capacità di **interpretare correttamente il modello**.

#### **Esempio di alti errori standard**
Supponiamo di avere una regressione lineare con le variabili $x_1$ (altezza) e $x_2$ (peso). Se $x_1$ e $x_2$ sono altamente correlati, per esempio, perché le persone più alte tendono ad avere anche un peso maggiore, l'errore standard dei coefficienti $w_1$ e $w_2$ (relativi rispettivamente a $x_1$ e $x_2$) sarà elevato. In questo caso, il modello avrà difficoltà a distinguere quale tra $x_1$ e $x_2$ ha un impatto maggiore sulla **salute** della persona, e l'interpretazione del modello diventa meno chiara.

### 3. **Alto VIF (Variance Inflation Factor)**

Il **VIF** misura quanto la varianza di un coefficiente stimato aumenta a causa della collinearità tra le variabili. Se il VIF di una variabile è molto alto (di solito maggiore di 10), ciò indica una forte multicollinearità. Un VIF elevato implica che la variabile ha una **varianza aumentata**, il che rende difficile interpretare i coefficienti correttamente.

#### **Calcolo del VIF**
Il VIF di una variabile indipendente $x_j$ è calcolato come:
$$
VIF(x_j) = \frac{1}{1 - R_j^2}
$$
dove $R_j^2$ è il coefficiente di determinazione ottenuto dalla regressione di $x_j$ su tutte le altre variabili indipendenti. Se $R_j^2$ è vicino a 1, significa che $x_j$ è altamente collineare con le altre variabili, e quindi il VIF sarà elevato.

## **Diagnosi della Multicollinearità**

### 1. **Matrice di Correlazione**
Una matrice di correlazione tra le variabili indipendenti è il primo passo per diagnosticare la multicollinearità. Se le variabili sono altamente correlate (ad esempio, una correlazione superiore a 0.8 o 0.9), è probabile che ci sia multicollinearità.

### 2. **VIF (Variance Inflation Factor)**
Come accennato, un VIF elevato (superiore a 10) è un segno di multicollinearità. Analizzare i VIF di ciascuna variabile ti permette di identificare quali variabili sono problematiche.

### 3. **Condizione della Matrice $\mathbf{X}^T \mathbf{X}$**
Un altro metodo per diagnosticare la multicollinearità è calcolare il **numero di condizionamento** della matrice $\mathbf{X}^T \mathbf{X}$. Se il numero di condizionamento è molto elevato (ad esempio maggiore di 30), significa che la matrice è vicina alla singolarità e che la multicollinearità potrebbe essere un problema.

## **Come Gestire la Multicollinearità**

### 1. **Rimuovere Variabili Correlate**
Se due variabili indipendenti sono altamente correlate, una di esse potrebbe essere eliminata dal modello. Questo semplifica il modello e migliora la stabilità delle stime.

### 2. **Usare la Regressione Ridge o Lasso**
La **regressione ridge** e la **regressione lasso** sono tecniche che aggiungono un termine di penalizzazione per ridurre l'effetto della multicollinearità. In particolare:
- **Ridge Regression**: Penalizza i coefficienti elevati, stabilizzando le stime in presenza di multicollinearità.
- **Lasso (Least Absolute Shrinkage and Selection Operator)**: Oltre a penalizzare i coefficienti elevati, lasso può **ridurre a zero** i coefficienti di alcune variabili, selezionando automaticamente le variabili più rilevanti.

### 3. **Principal Component Analysis (PCA)**
La **PCA** è una tecnica che permette di combinare le variabili correlate in **componenti principali** non correlate tra loro. Utilizzare questi componenti principali nel modello di regressione aiuta a ridurre la multicollinearità.

### 4. **Standardizzazione delle Variabili**
In alcuni casi, la **standardizzazione** o **normalizzazione** delle variabili può ridurre la multicollinearità, in quanto le variabili con scale diverse possono avere correlazioni elevate.

## **Conclusione**

La multicollinearità è un problema serio nella regressione lineare, in quanto porta a stime instabili dei coefficienti e a difficoltà nell'interpretazione dei risultati. È essenziale diagnosticare la multicollinearità utilizzando strumenti come la matrice di correlazione, il VIF e il numero di condizionamento, e poi adottare soluzioni come la rimozione delle variabili correlate, la regressione ridge o lasso, e la PCA per migliorare la robustezza del modello.
