# Funzioni Discriminanti Lineari nella Classificazione

Le **funzioni discriminanti lineari** sono utilizzate per classificare i dati separando le classi mediante iperpiani nel loro spazio delle caratteristiche. 

## Definizione
Una funzione discriminante lineare per una classe $k$ assume la forma:
$$
g_k(\mathbf{x}) = \mathbf{w}^T \mathbf{x} + w_0
$$
dove:
- $\mathbf{w}$ è il vettore dei pesi,
- $\mathbf{x}$ è il vettore delle caratteristiche,
- $w_0$ è il termine di bias.

## Regola di Decisione
Per un problema di classificazione a due classi ($C_1$ e $C_2$), la decisione viene presa in base al segno della funzione discriminante:
$$
g(\mathbf{x}) = \mathbf{w}^T \mathbf{x} + w_0 \geq 0 \Rightarrow \mathbf{x} \in C_1
$$
$$
g(\mathbf{x}) = \mathbf{w}^T \mathbf{x} + w_0 < 0 \Rightarrow \mathbf{x} \in C_2
$$

## Interpretazione Geometrica
L'iperpiano di decisione è dato dalla condizione:
$$
\mathbf{w}^T \mathbf{x} + w_0 = 0
$$
Questo iperpiano separa lo spazio delle caratteristiche in due regioni corrispondenti alle due classi.

### Esempio Grafico
Un esempio di separazione lineare tra due classi:

![Separazione lineare tra due classi](https://media.geeksforgeeks.org/wp-content/uploads/20190423124957/2dldanew.jpg)

## Stima dei Pesi
I pesi $\mathbf{w}$ e $w_0$ possono essere determinati tramite:
- **[[Regressione logistica]]** (per la classificazione probabilistica)
- **Analisi discriminante lineare (LDA)** (se si assume una distribuzione gaussiana dei dati con covarianza comune)
- **Perceptron** (se i dati sono linearmente separabili)

## Vantaggi e Limitazioni
✅ **Vantaggi**:
- Modello semplice e interpretabile
- Computazionalmente efficiente
- Funziona bene se le classi sono linearmente separabili

❌ **Limitazioni**:
- Non gestisce bene problemi non linearmente separabili
- Sensibile agli outlier
- Non sfrutta relazioni complesse tra le variabili

## Applicazioni
- Classificazione di immagini e testo
- Diagnosi mediche
- Riconoscimento di pattern

---
📌 **Nota**: Se i dati non sono linearmente separabili, è possibile utilizzare trasformazioni non lineari (es. Kernel trick nelle SVM) per migliorare la separabilità delle classi.
