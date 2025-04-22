# Overfitting e Underfitting

L'**overfitting** e l'**underfitting** sono due problemi comuni nell'addestramento di modelli di machine learning. Questi fenomeni si verificano quando un modello non riesce a generalizzare bene ai dati, portando a prestazioni scarse sia sui dati di training che su quelli di test. Di seguito esploriamo in dettaglio questi concetti, le loro cause e come evitarli.

## Introduzione

Quando inferiamo una funzione (un elemento di uno spazio infinito-dimensionale) da un insieme finito di campioni di training, ci sono necessariamente regioni del dominio non coperte dai campioni. In queste regioni, non abbiamo alcuna informazione sul comportamento della funzione (è qui che entrano in gioco i **prior**). Tuttavia, vorremmo che la funzione appresa approssimi bene la funzione vera in generale, non solo sui dati di training, cioè che sia il più generale possibile, anche se questo significa non adattarsi perfettamente ai dati di training.

## Definizioni

### Overfitting
L'**overfitting** si verifica quando il modello è troppo complesso e si adatta eccessivamente ai dati di training, catturando anche il rumore presente nei dati. Questo porta a un errore basso sui dati di training, ma a un errore elevato sui dati di validazione. Il modello, quindi, generalizza male a nuovi dati.

![Underfitting e Overfitting](https://i0.wp.com/spotintelligence.com/wp-content/uploads/2024/05/underfitting-overfitting.jpg?resize=1024%2C576&ssl=1)

### Underfitting
L'**underfitting** si verifica quando il modello è troppo semplice per catturare la complessità dei dati. Questo porta a un errore elevato sia sui dati di training che sui dati di validazione. In altre parole, il modello non è in grado di rappresentare adeguatamente la relazione tra le variabili indipendenti e la variabile dipendente.

## Rilevamento di Underfitting e Overfitting

Esiste un modo relativamente semplice per rilevare se stiamo facendo underfitting o overfitting:

1. **Separazione dei dati**: Dividi i dati noti in due insiemi: il **training set** e il **validation set**.
2. **Stima dei parametri**: Stima i parametri del modello sul training set in modo da minimizzare la funzione di perdita sui dati di training.
3. **Underfitting**: Se la perdita è grande sul training set, allora stiamo facendo underfitting, poiché il modello non è in grado di rappresentare bene i dati di training.
4. **Overfitting**: Se la perdita è piccola sul training set, potremmo essere in overfitting. Per verificarlo, calcola la funzione di perdita sul validation set.
5. **Conferma dell'overfitting**: Se la perdita è grande sul validation set, allora stiamo facendo overfitting, poiché il modello generalizza male su nuovi dati.

In sintesi:
- **Underfitting**: Perdita elevata sia sul training set che sul validation set.
- **Overfitting**: Perdita bassa sul training set ma elevata sul validation set.

## **k-Fold Cross-Validation**

Per difenderci da underfitting e overfitting, uno dei meccanismi più semplici e comunemente utilizzati è la **k-fold cross-validation**.

### Funzionamento della k-Fold Cross-Validation

Il punto chiave della k-fold cross-validation è che non vogliamo overfittare neanche sul validation set. Per evitare ciò, suddividiamo il training set in $k$ sottoinsiemi, chiamati **folds**. Poi, addestriamo il modello su $k-1$ folds e validiamo sul fold rimanente, ripetendo questo processo per ciascun fold (cioè $k$ volte). In questo modo, otteniamo l'MSE per ciascun fold e possiamo calcolare la media. Se il modello ottiene un buon punteggio medio su tutti i folds, allora possiamo dire che il modello è buono. Altrimenti, potrebbe essere necessario cambiare il modello.

![Example](https://towardsdatascience.com/wp-content/uploads/2024/11/1zyVG5Y3DCanGQlLS_CbpiQ.png)

Ad esempio, nella regressione polinomiale, possiamo eseguire la k-fold cross-validation più volte con diversi gradi del polinomio e scegliere il grado che produce il più piccolo MSE medio.

## Conclusione

L'underfitting e l'overfitting sono problemi critici nell'addestramento dei modelli di machine learning. La k-fold cross-validation è uno strumento efficace per mitigare questi problemi, specialmente quando si lavora con modelli complessi come la regressione polinomiale. Tuttavia, è importante considerare altre tecniche e approcci per migliorare la generalizzazione del modello, come la regolarizzazione e l'incorporazione di conoscenze aggiuntive.

## Collegamenti Correlati
- [[Regressione Polinomiale]]
- [[Minimi Quadrati Ordinari]]
- [[Teorema di Stone-Weierstrass]]
- [[Selezione del Modello]]
- [[Regolarizzazione]]
