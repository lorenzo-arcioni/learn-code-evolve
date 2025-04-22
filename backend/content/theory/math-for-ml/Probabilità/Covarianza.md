## 📖 Definizione
La **covarianza** misura la relazione lineare tra due variabili $X$ e $Y$ all'interno di un dataset. In altre parole, indica come le due variabili variano insieme rispetto alle loro medie.

La formula della covarianza per due variabili $X$ e $Y$ è:
$$
\text{Cov}(X, Y) = \frac{1}{N} \sum_{i=1}^N (x_i - \mu_X)(y_i - \mu_Y)
$$

Dove:
- $x_i$ e $y_i$: sono i valori delle variabili $X$ e $Y$ per l'osservazione $i$,
- $\mu_X$ e $\mu_Y$: sono le medie delle variabili $X$ e $Y$,
- $N$: è il numero totale di osservazioni.

---

## 🛠️ Calcolo
### 1️⃣ **Calcolo delle medie**
Prima di tutto, calcoliamo la media delle variabili:
$$
\mu_X = \frac{1}{N} \sum_{i=1}^N x_i, \quad \mu_Y = \frac{1}{N} \sum_{i=1}^N y_i
$$

### 2️⃣ **Sottrazione delle medie**
Per ogni osservazione $i$, sottraiamo la media dalla variabile corrispondente:
$$
x_i' = x_i - \mu_X, \quad y_i' = y_i - \mu_Y
$$

### 3️⃣ **Prodotto delle deviazioni**
Calcoliamo il prodotto delle deviazioni di $X$ e $Y$ per ogni osservazione:
$$
(x_i - \mu_X)(y_i - \mu_Y)
$$

### 4️⃣ **Media del prodotto**
Infine, prendiamo la media dei prodotti calcolati per ottenere la covarianza:
$$
\text{Cov}(X, Y) = \frac{1}{N} \sum_{i=1}^N (x_i - \mu_X)(y_i - \mu_Y)
$$

---

## 🧮 Proprietà
1. **Segno della covarianza**:
   - $\text{Cov}(X, Y) > 0$: le variabili variano nella stessa direzione (quando $X$ aumenta, $Y$ tende ad aumentare).
   - $\text{Cov}(X, Y) < 0$: le variabili variano in direzioni opposte (quando $X$ aumenta, $Y$ tende a diminuire).
   - $\text{Cov}(X, Y) = 0$: non c'è relazione lineare tra le variabili.

2. **Unità di misura**:
   - La covarianza è espressa nell'unità del prodotto di $X$ e $Y$. Per una versione normalizzata, vedi la [Correlazione](Correlazione.md).

3. **Simmetria**:
   - La covarianza è simmetrica: $\text{Cov}(X, Y) = \text{Cov}(Y, X)$.

---

## 🛠️ Covarianza matriciale
Per dataset multivariati $D$ con $d$ variabili (dimensioni), la **matrice di covarianza** è:
$$
\Sigma = \frac{1}{N-1} D^\top D
$$
Ogni elemento $\Sigma_{j,k}$ rappresenta la covarianza tra la $j$-esima e la $k$-esima variabile. 

Per approfondire il calcolo matriciale, vedi la nota sulla [Matrice di Covarianza](Matrice%20di%20Covarianza.md).

---

## 🔗 Collegamenti
- [Standardizzazione](Standardizzazione.md)
- [Correlazione](Correlazione.md)
- [Matrice di Covarianza](Matrice%20di%20Covarianza.md)
