## Introduzione
Il **metodo di Lloyd-Forgy** è un algoritmo iterativo comunemente utilizzato per risolvere problemi di ottimizzazione iterativa. È particolarmente noto per la sua applicazione in problemi di clustering, come nell'algoritmo K-Means, ma può essere adattato a una vasta gamma di scenari in cui è necessario ottimizzare una funzione obiettivo dipendente da due insiemi di variabili.

## Descrizione generale
Il metodo si basa su un ciclo di **ottimizzazione alternata** in cui:
1. Si fissa un insieme di variabili per ottimizzare l'altro insieme.
2. Si alternano i due insiemi fino a quando non si raggiunge la convergenza.

In forma generale, il problema può essere descritto come:
$$
\DeclareMathOperator*{\argmin}{argmin}
X^*, Y^* = \argmin_{X, Y} L(X, Y)
$$
Dove:
- $L(X, Y)$ è una funzione obiettivo dipendente da due insiemi di variabili $X$ e $Y$.
- $X$ e $Y$ vengono ottimizzati alternativamente.

### Struttura dell'algoritmo
Il metodo di Lloyd-Forgy segue i seguenti passaggi:

1. **Inizializzazione**:
   - Si scelgono valori iniziali per uno degli insiemi di variabili, ad esempio $Y$.
2. **Ottimizzazione Alternata**:
   - Fissare $Y$ e trovare $X^*$ che minimizza $L(X, Y)$.
   - Fissare $X$ e trovare $Y^*$ che minimizza $L(X, Y)$.
3. **Iterazione**:
   - Ripetere i passaggi di ottimizzazione alternata fino alla convergenza, cioè fino a quando $L(X, Y)$ non cambia significativamente tra due iterazioni successive.

### Convergenza
- Il metodo converge tipicamente a un **punto fisso** della funzione obiettivo.
- La soluzione trovata non è garantita essere il **minimo globale**, in particolare se $L(X, Y)$ non è convessa.

## Applicazioni
Il metodo di Lloyd-Forgy è ampiamente utilizzato in diversi contesti, tra cui:
- **Clustering** (es. K-Means).
- **Compressione di dati**.
- **Ottimizzazione di sistemi complessi** con variabili correlate.

## Limitazioni
- **Minimi locali**: Poiché l'algoritmo non esplora l'intero spazio delle soluzioni, può rimanere intrappolato in minimi locali.
- **Dipendenza dall'inizializzazione**: La qualità della soluzione dipende fortemente dai valori iniziali scelti.
- **Convergenza lenta**: In alcuni casi, il numero di iterazioni richiesto per la convergenza può essere elevato.

## Pseudo-codice
Un'implementazione generica del metodo di Lloyd-Forgy può essere rappresentata come segue:

```python
# Metodo di Lloyd-Forgy

def lloyd_forgy(init_X, init_Y, objective_function, optimize_X, optimize_Y, tolerance=1e-6, max_iterations=100):
    """
    Generico algoritmo di Lloyd-Forgy.

    Args:
        init_X: Valori iniziali per il set X.
        init_Y: Valori iniziali per il set Y.
        objective_function: Funzione obiettivo L(X, Y) da minimizzare.
        optimize_X: Funzione per ottimizzare X dato Y.
        optimize_Y: Funzione per ottimizzare Y dato X.
        tolerance: Soglia di tolleranza per determinare la convergenza.
        max_iterations: Numero massimo di iterazioni consentite.

    Returns:
        X, Y: I valori ottimali trovati.
    """
    X, Y = init_X, init_Y
    for iteration in range(max_iterations):
        # Ottimizzazione alternata
        X_new = optimize_X(Y)
        Y_new = optimize_Y(X_new)

        # Calcola variazione nella funzione obiettivo
        delta = abs(objective_function(X_new, Y_new) - objective_function(X, Y))
        if delta < tolerance:
            break

        # Aggiorna X e Y
        X, Y = X_new, Y_new

    return X, Y
```
