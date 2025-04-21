# **Classificazione**

## **Introduzione**  

Un compito molto comune nel machine learning è la **classificazione**, in cui l'obiettivo è prevedere una **categoria** o una **classe** per un determinato dato.  
Ad esempio, dati alcuni attributi che descrivono un'email, potremmo voler classificare il messaggio come **spam** o **non-spam**. Questo è un esempio di **classificazione binaria**.

La classificazione è alla base di numerosi problemi in machine learning, tra cui:  

- **Riconoscimento di immagini**: determinare se un'immagine contiene un gatto o un cane.  
- **Diagnosi mediche**: prevedere se un paziente ha una malattia basandosi su dati clinici.  
- **Elaborazione del linguaggio naturale (NLP)**: categorizzare recensioni come positive o negative.  

## **Classificazione vs Regressione**  

Si potrebbe pensare che la classificazione sia semplicemente un caso particolare di regressione, dato che possiamo rappresentare l'insieme delle possibili categorie come numeri naturali, ovvero un sottoinsieme di $\mathbb{R}$.  
L'idea sarebbe quindi di usare la regressione standard e poi applicare un **post-processing** per convertire il valore di output in una categoria.  
Ad esempio, nel problema della rilevazione dello spam, potremmo applicare una soglia per ottenere un output binario.  

Tuttavia, questo approccio presenta alcune limitazioni:  

- **Perdita di ottimalità**: la regressione lineare minimizza l'errore quadratico medio (MSE), ma se poi applichiamo un post-processing per ottenere una classe, il risultato **non è più necessariamente ottimale** per il problema di classificazione.  
- **Scarsa interpretabilità**: i valori previsti non hanno una chiara interpretazione probabilistica, mentre i modelli di classificazione forniscono spesso probabilità esplicite per ogni classe.  
- **Difficoltà con più classi**: nel caso di classificazione multiclasse, il mapping tra numeri reali e classi diventa meno naturale rispetto all'uso di modelli specifici per la classificazione.  

Per questi motivi, è preferibile utilizzare modelli specifici per la classificazione, che ottimizzano una funzione di perdita più adatta al problema.

## **Funzioni di Perdita per la Classificazione**  

Un aspetto fondamentale della classificazione è l'uso di **funzioni di perdita** progettate appositamente per questo tipo di problemi.  
Le più comuni includono:

- **[[Log Loss (Cross-Entropy Loss)]]**: usata nei problemi di classificazione binaria e multiclasse, misura quanto la probabilità predetta si discosta dalla classe corretta.  
- **[Hinge Loss](./Hinge-Loss.md)**: utilizzata per le **macchine a vettori di supporto (SVM)**, penalizza le classificazioni errate.  
- **[Sparse Categorical Crossentropy](./Sparse-Categorical-Crossentropy.md)**: simile alla cross-entropy ma più efficiente per classi rappresentate come interi.  

## **Modelli di Classificazione**  

Diversi modelli sono stati sviluppati per risolvere problemi di classificazione, tra cui:

- **[[Regressione Logistica]]**: un modello di base per la classificazione binaria che utilizza la funzione sigmoide per produrre probabilità.  
- **[Support Vector Machines (SVM)](./SVM.md)**: cerca di trovare un iperpiano che separa al meglio le classi.  
- **[Alberi di Decisione](./Alberi-di-Decisione.md)** e **[Random Forest](./Random-Forest.md)**: modelli basati su alberi decisionali per classificazione binaria e multiclasse.  
- **[Reti Neurali](./Reti-Neurali.md)**: usate per problemi di classificazione più complessi, sfruttando architetture profonde.  

## **Tipologie di Classificazione**  

Esistono diverse varianti della classificazione in base alla natura del problema:

- **[[Classificazione Binaria]]**: due sole classi, ad esempio spam/non-spam.  
- **[[Classificazione Multiclasse]]**: più di due classi, come il riconoscimento di cifre scritte a mano (0-9).  
- **[Classificazione Multi-Label](./Classificazione-Multi-Label.md)**: un dato può appartenere a più classi contemporaneamente, ad esempio un'immagine che contiene sia un cane che un gatto.  

## **Conclusione**  

La classificazione è uno dei problemi più importanti nel machine learning e ha numerose applicazioni pratiche.  
A differenza della regressione, richiede funzioni di perdita specifiche e modelli adatti a gestire dati categoriali.  
Le reti neurali, in particolare, hanno rivoluzionato il campo, permettendo di ottenere risultati di alto livello su problemi complessi come il riconoscimento di immagini e il NLP.  

Per approfondire, puoi consultare i seguenti argomenti correlati:

- **[Regressione Logistica](./Regressione-Logistica.md)**
- **[Softmax e Classificazione Multiclasse](./Softmax.md)**
- **[Funzioni di Attivazione](./Funzioni-di-Attivazione.md)**
- **[Overfitting e Regolarizzazione](./Overfitting-e-Regolarizzazione.md)**
- **[Reti Neurali per la Classificazione](./Reti-Neurali-Classificazione.md)**  
