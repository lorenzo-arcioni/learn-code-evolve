# Regolarizzazione

La **regolarizzazione** è una tecnica utilizzata per prevenire l'overfitting nei modelli di machine learning, aggiungendo un termine di penalità alla funzione di perdita. Questo termine di penalità controlla la complessità del modello, limitando la crescita dei parametri e migliorando la generalizzazione su dati non visti. Di seguito esploriamo i diversi tipi di regolarizzazione, il loro funzionamento e il loro impatto sui modelli.

## **Introduzione alla Regolarizzazione**

L'[[Overfitting e Underfitting|overfitting]] si verifica quando un modello è troppo complesso e si adatta eccessivamente ai dati di training, catturando anche il rumore presente nei dati. Questo porta a un errore basso sui dati di training, ma a un errore elevato sui dati di validazione. La regolarizzazione aiuta a mitigare questo problema aggiungendo un termine di penalità alla funzione di perdita che limita la crescita dei parametri del modello.

## **Tipi di Regolarizzazione**

### **1. Regolarizzazione L2 (Ridge Regression o Tikhonov o weight decay)**

La regolarizzazione L2, nota anche come **Ridge Regression**, aggiunge un termine di penalità basato sulla norma L2 (o norma Frobenius per le matrici) dei parametri. La funzione di perdita regolarizzata è data da:

$$
\argmin_{\Theta} \ell_{\Theta} + \lambda \|\Theta\|_2^2
$$

Dove:
- $\ell_{\Theta}$ è la funzione di perdita originale (ad esempio, l'errore quadratico medio).
- $\|\Theta\|_2^2$ è la norma L2 al quadrato dei parametri $\Theta$.
- $\lambda$ è un parametro di regolarizzazione che controlla il trade-off tra l'adattamento ai dati e la penalità.

#### **Effetto della Regolarizzazione L2**
- **Shrinkage**: La regolarizzazione L2 riduce i valori dei parametri, ma non li azzera completamente. Questo è utile per controllare la complessità del modello senza eliminare completamente alcune feature.
- **Convessità**: La norma L2 è una funzione convessa, quindi la funzione di perdita regolarizzata rimane convessa, garantendo l'esistenza di un minimo globale.

### **2. Regolarizzazione L1 (Lasso Regression)**

La regolarizzazione L1, nota anche come **Lasso Regression**, aggiunge un termine di penalità basato sulla norma L1 dei parametri. La funzione di perdita regolarizzata è data da:

$$
\argmin_{\Theta} \ell_{\Theta} + \lambda \|\Theta\|_1
$$

Dove:
- $\|\Theta\|_1$ è la norma L1 dei parametri $\Theta$, definita come la somma dei valori assoluti dei parametri.

#### **Effetto della Regolarizzazione L1**
- **Sparsità**: La regolarizzazione L1 tende a produrre modelli sparsi, cioè modelli in cui molti parametri sono esattamente zero. Questo è utile per la selezione delle feature, poiché elimina le feature irrilevanti.
- **Push Uniforme**: La regolarizzazione L1 applica una spinta uniforme verso zero per tutti i parametri, indipendentemente dalla loro grandezza.

### **3. Elastic Net**

L'**Elastic Net** combina la regolarizzazione L1 e L2, offrendo un compromesso tra sparsity e shrinkage. La funzione di perdita regolarizzata è data da:

$$
\argmin_{\Theta} \ell_{\Theta} + \lambda_1 \|\Theta\|_1 + \lambda_2 \|\Theta\|_2^2
$$

Dove:
- $\lambda_1$ e $\lambda_2$ sono parametri di regolarizzazione che controllano il trade-off tra la regolarizzazione L1 e L2.

#### **Effetto dell'Elastic Net**
- **Sparsità e Shrinkage**: L'Elastic Net combina i vantaggi della regolarizzazione L1 (sparsity) e L2 (shrinkage), rendendolo utile quando le feature sono correlate tra loro.

## **Intuizione sui Gradienti**

Per comprendere perché la regolarizzazione L1 e L2 hanno effetti diversi, consideriamo il gradiente dei termini di regolarizzazione rispetto a un singolo parametro $\theta$:

### **Regolarizzazione L1**
Dato che la regolarizzazione L1 non è derivabile in $\theta = 0$, il gradiente viene definito come:
$$
\frac{\partial}{\partial \theta} (\lambda \|\Theta\|_1) = 
\begin{cases}
\lambda, & \theta > 0 \\
-\lambda, & \theta < 0
\end{cases}
$$

secondo il concetto di [[Sottoderivata e Sottogradiente]].

### **Regolarizzazione L2**
$$
\frac{\partial}{\partial \theta} (\lambda \|\Theta\|_2^2) = 2\lambda \theta
$$

- **L1**: Applica una spinta costante ($\lambda$ o $-\lambda$) verso zero, indipendentemente dal valore di $\theta$.
- **L2**: Applica una spinta proporzionale al valore di $\theta$, portando i parametri più grandi a ridursi più rapidamente.

#### Come cambia la normal equation qando si applica regolarizzazione $L_2$?

La funzione di errore da minimizzare diventa:
$$
\ell(\mathbf{W}) = \|\mathbf{Y} - \mathbf{X} \mathbf{W}\|_2^2 + \lambda \|\mathbf{W}\|_2^2
$$

Espandiamo la norma euclidea:

$$
\ell(\mathbf{W}) = (\mathbf{Y} - \mathbf{X} \mathbf{W})^\top (\mathbf{Y} - \mathbf{X} \mathbf{W}) + \lambda \mathbf{W}^\top \mathbf{W}
$$

Sviluppiamo il prodotto:

$$
\ell(\mathbf{W}) = \mathbf{Y}^\top \mathbf{Y} - 2 \mathbf{W}^\top \mathbf{X}^\top \mathbf{Y} + \mathbf{W}^\top \mathbf{X}^\top \mathbf{X} \mathbf{W} + \lambda \mathbf{W}^\top \mathbf{W}
$$

Ora calcoliamo la derivata rispetto a $\mathbf{W}$:

$$
\frac{\partial \ell(\mathbf{W})}{\partial \mathbf{W}} = -2 \mathbf{X}^\top \mathbf{Y} + 2 \mathbf{X}^\top \mathbf{X} \mathbf{W} + 2 \lambda \mathbf{W}
$$

Imponiamo la condizione di ottimalità:

$$
-2 \mathbf{X}^\top \mathbf{Y} + 2 \mathbf{X}^\top \mathbf{X} \mathbf{W} + 2 \lambda \mathbf{W} = 0
$$

Semplificando:

$$\begin{align*}
\mathbf{X}^\top \mathbf{X} \mathbf{W} + \lambda \mathbf{W} &= \mathbf{X}^\top \mathbf{Y}\\
(\mathbf{X}^\top \mathbf{X} + \lambda \mathbf{I}) \mathbf{W} &= \mathbf{X}^\top \mathbf{Y}
\end{align*}
$$

Se $\mathbf{X}^\top \mathbf{X} + \lambda I$ è invertibile, la soluzione ottimale è:

$$
\mathbf{W} = (\mathbf{X}^\top \mathbf{X} + \lambda \mathbf{I})^{-1} \mathbf{X}^\top \mathbf{Y}
$$

Questa è la soluzione **OLS** nel caso multidimensionale con regolarizzazione $L_2$. In [[Dimostrazione di Invertibilità Ridge|questa]] nota, è presente una dimostrazione sul perché la soluzione OLS con regolarizzazione $L_2$ sia ben definita e la matrice $(\mathbf{X}^\top \mathbf{X} + \lambda \mathbf{I})$ sia sempre invertibile.

## **Definizione Formale di Regolarizzazione**

**Definizione 3.2 (Regolarizzazione)**: Qualsiasi modifica intesa a ridurre l'errore di generalizzazione ma non l'errore di training.

La regolarizzazione non si limita all'aggiunta di termini di penalità alla funzione di perdita. Altre forme includono la scelta di una rappresentazione, l'early stopping e il dropout.

In generale, le $p$-norme sono una buona scelta per i regolarizzatori, poiché sono sempre convesse.  
Quindi, quando $\ell_\Theta$ è convessa, anche $\ell_\Theta + \lambda \|\Theta\|_p^2$ lo è, poiché la somma di due funzioni convesse è ancora convessa.  
Questo è molto importante perché significa che possiamo sperare di trovare un'espressione in forma chiusa per l'ottimo globale del problema di minimizzazione:

$$
\argmin_{\Theta} \ \ell_\Theta + \lambda \|\Theta\|_p^2.
$$

Inoltre, notiamo che qualsiasi $p$-norma non sarà lineare in $\Theta$ poiché contiene almeno il valore assoluto.

In generale, la regolarizzazione ci consente di imporre un certo comportamento atteso nel nostro modello di apprendimento.  
Essa permette di controllare la complessità del modello e, facendo ciò, riduce la necessità di disporre di grandi quantità di dati, poiché impone un determinato comportamento.  
Si noti che i regolarizzatori non sono sempre definiti come penalizzazioni incluse nelle funzioni di perdita.

> *Se i regolarizzatori riducono l'overfitting, non basterebbe ridurre la complessità del modello invece che introdurre un termine di penalizzazione?*
>
> A volte può essere sufficiente ridurre la complessità del modello per evitare l'overfitting, questo approccio può essere funzionale se il problema di apprendimento non richiede un modello molto complesso. Ma se siamo di fronte ad un problema che richiede un modello più complesso, la regolarizzazione è la scelta migliore in quanto permette comunque al modello di catturare pattern complessi senza basarsi troppo sui dati di addestramento.

## **Altre Forme di Regolarizzazione**

Oltre alle norme L1 e L2, esistono altre forme di regolarizzazione che impongono comportamenti desiderati sui parametri:

### **1. Early Stopping**
L'early stopping interrompe l'addestramento del modello quando la performance sul validation set smette di migliorare, prevenendo l'overfitting.

### **2. Dropout**
Il dropout è una tecnica utilizzata nelle reti neurali, dove durante l'addestramento alcuni neuroni vengono "disattivati" casualmente, riducendo la dipendenza del modello da specifici neuroni e migliorando la generalizzazione.

### **3. Scelta della Rappresentazione**
La scelta di una rappresentazione appropriata dei dati (ad esempio, trasformazioni non lineari o feature engineering) può agire come una forma di regolarizzazione, migliorando la capacità del modello di generalizzare.

## **Conclusione**

La regolarizzazione è uno strumento essenziale per migliorare la generalizzazione dei modelli di machine learning. Le tecniche come la regolarizzazione L1, L2 e Elastic Net offrono diversi modi per controllare la complessità del modello, mentre altre forme come l'early stopping e il dropout forniscono ulteriori meccanismi per prevenire l'overfitting. La scelta della giusta forma di regolarizzazione dipende dal problema specifico e dalle caratteristiche dei dati.

## **Collegamenti Correlati**
- [[Underfitting e Overfitting]]
- [[Regressione Polinomiale]]
- [[Minimi Quadrati Ordinari (OLS)]]
- [[Teorema di Stone-Weierstrass]]
- [[Selezione del Modello]]
