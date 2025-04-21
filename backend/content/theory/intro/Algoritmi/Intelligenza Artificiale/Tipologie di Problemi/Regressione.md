# Regressione

## Introduzione  

La **regressione** è uno dei problemi fondamentali nel machine learning e nel deep learning.  
L'obiettivo è apprendere una funzione che mappi un insieme di **caratteristiche** ($\mathbf{x} \in \mathbb{R}^n$) su un valore **numerico continuo** ($y \in \mathbb{R}$).  

Esempi tipici di problemi di regressione includono:  

- **Previsione dei prezzi**: stimare il valore di una casa in base a dimensioni, posizione e altre caratteristiche.  
- **Analisi finanziaria**: prevedere il valore di un'azione sulla base di dati storici.  
- **Modellazione climatica**: stimare la temperatura media in un'area specifica.  

A differenza della **classificazione**, dove il target è una **categoria**, nella regressione il target è un **valore continuo**.

## Tipologie di Regressione  

Esistono diverse varianti della regressione, a seconda della complessità del modello e della natura dei dati:

- **[[Regressione Lineare]]**: il modello assume che la relazione tra variabili sia una combinazione lineare delle feature.  
- **[[Regressione Polinomiale]]**: estende la regressione lineare includendo termini polinomiali delle feature.  
- **[[Regressione Logistica]]**: usata per classificazione binaria, ma basata su un modello di regressione con output probabilistico.

## Funzioni di Perdita per la Regressione

Nella regressione, le funzioni di perdita misurano quanto il valore predetto $\hat{y}$ si discosta dal valore reale $y$.  
Le più comuni includono:

- **[[Errore Quadratico Medio (MSE)]](./MSE.md)**: penalizza gli errori quadraticamente, rendendo più influenti gli outlier.  
- **[[Errore Assoluto Medio (MAE)]](./MAE.md)**: considera la media degli errori assoluti, meno sensibile agli outlier rispetto a MSE.  
- **[[Huber Loss]](./Huber-Loss.md)**: una combinazione tra MSE e MAE, più robusta agli outlier.  

## Regressione vs Classificazione  

Spesso si tende a confondere la regressione con la classificazione, ma le differenze principali sono:

| **Caratteristica**      | **Regressione** | **Classificazione** |
|------------------------|---------------|----------------|
| Output atteso         | Valore continuo | Etichetta discreta |
| Funzione di perdita   | MSE, MAE, Huber | Cross-Entropy, Hinge Loss |
| Esempio               | Previsione del prezzo di una casa | Classificazione di immagini di gatti e cani |

## Modelli di Regressione  

Diverse tecniche possono essere utilizzate per affrontare problemi di regressione:

- **[[Regressione Lineare]]**: modello base che assume una relazione lineare tra feature e output.  
- **[Support Vector Regression (SVR)]**: versione della SVM applicata alla regressione.  
- **[Random Forest Regressor](./Random-Forest-Regressor.md)**: metodo basato su alberi per modellare relazioni non lineari.  
- **[Reti Neurali per la Regressione](./Reti-Neurali-Regressione.md)**: modelli più potenti per problemi complessi con dati di grandi dimensioni.  

## Overfitting e Regolarizzazione  

Uno dei problemi principali nella regressione è l'**[[Overfitting e Underfitting|overfitting]]**, ovvero quando il modello si adatta troppo ai dati di training e non generalizza bene sui dati nuovi.  
Alcune tecniche per contrastarlo includono:

- **[Regressione Ridge (L2)](./Regressione-Ridge.md)**: aggiunge una penalizzazione alla somma dei quadrati dei coefficienti per ridurre l'overfitting.  
- **[Regressione Lasso (L1)](./Regressione-Lasso.md)**: forza alcuni coefficienti a diventare zero, favorendo la selezione delle feature più rilevanti.  
- **[Dropout e Early Stopping](./Dropout-Early-Stopping.md)**: usati nei modelli di deep learning per prevenire l’overfitting.  

## Conclusione  

La regressione è un concetto fondamentale del machine learning con applicazioni in moltissimi settori.  
A differenza della classificazione, l'obiettivo è prevedere un valore numerico continuo piuttosto che una categoria.  
L'uso della funzione di perdita appropriata e di tecniche di regolarizzazione è cruciale per ottenere un modello efficace.  

Per approfondire, consulta i seguenti argomenti correlati:

- **[[Regressione Lineare]]**
- **[[Regressione Polinomiale]]**
- **[[Regressione Logistica]]**
- **[[Regolarizzazione]]**
