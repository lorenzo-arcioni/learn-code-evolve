# 🧠 Esercizio: Costruzione di un Modello Bigramma

Considera il seguente corpus $C$ composto da 5 frasi:

1. `I am Sam`  
2. `Sam I am`  
3. `Sam I like`  
4. `Sam I do like`  
5. `do I like Sam`

## 🔸 Domanda 1: Definire il Modello di Bigrammi sul Corpus $C$

### Step 1: Aggiunta dei tag di inizio e fine frase
A ogni frase si aggiungono i tag speciali `<s>` e `</s>`:

- `<s> I am Sam </s>`  
- `<s> Sam I am </s>`  
- `<s> Sam I like </s>`  
- `<s> Sam I do like </s>`  
- `<s> do I like Sam </s>`

**Vocabolario (closed vocabulary):** {`<s>`, `I`, `am`, `Sam`, `like`, `do`, `</s>`}

### Step 2: Costruzione del Modello di Bigramma

Prima di tutto, realizziamo il vettore di conteggio degli unigrammi:

|       | `<s>` | I | am | Sam | like | do | `</s>` |
|-------|-------|---|----|------|------|----|--------|
| **conteggio** | 5    | 5 | 2  | 5    | 3    | 2  | 5      |

Creiamo ora la matrice di conteggio dei bigrammi. In un bigramma $w_{i-1} w_i$, ogni riga rappresenta $w_{i-1}$ mentre ogni colonna rappresenta $w_i$.

|$w_{i-1} \backslash w_i$       | `<s>` | I | am | Sam | like | do | `</s>` |
|-------|-------|---|----|------|------|----|--------|
| `<s>` |   0   | 1 | 0  | 3    | 0    | 1  | 0      |
| I     |   0   | 0 | 2  | 0    | 2    | 1  | 0      |
| am    |   0   | 0 | 0  | 1    | 0    | 0  | 1      |
| Sam   |   0   | 3 | 0  | 0    | 0    | 0  | 2      |
| like  |   0   | 0 | 0  | 1    | 0    | 0  | 2      |
| do    |   0   | 1 | 0  | 0    | 1    | 0  | 0      |
| `</s>`|   0   | 0 | 0  | 0    | 0    | 0  | 0      |

Per ottenere la matrice di probabilità condizionata $P(w_i \mid w_{i-1})$, normalizziamo ciascun conteggio di bigramma per il totale degli unigrammi nella riga corrispondente (cioè $c(w_{i-1})$):

$$
P(w_i \mid w_{i-1}) = \frac{\text{count}(w_{i-1}, w_i)}{\text{count}(w_{i-1})}
$$

|             | `<s>`           | I               | am              | Sam              | like             | do               | `</s>`           |
|-------------|------------------|------------------|------------------|------------------|------------------|------------------|------------------|
| `<s>`       | $0$              | $\frac{1}{5}$    | $0$              | $\frac{3}{5}$    | $0$              | $\frac{1}{5}$    | $0$              |
| I           | $0$              | $0$              | $\frac{2}{5}$    | $0$              | $\frac{2}{5}$    | $\frac{1}{5}$    | $0$              |
| am          | $0$              | $0$              | $0$              | $\frac{1}{2}$    | $0$              | $0$              | $\frac{1}{2}$    |
| Sam         | $0$              | $\frac{3}{5}$    | $0$              | $0$              | $0$              | $0$              | $\frac{2}{5}$    |
| like        | $0$              | $0$              | $0$              | $\frac{1}{3}$    | $0$              | $0$              | $\frac{2}{3}$    |
| do          | $0$              | $\frac{1}{2}$    | $0$              | $0$              | $\frac{1}{2}$    | $0$              | $0$              |
| `</s>`      | $0$              | $0$              | $0$              | $0$              | $0$              | $0$              | $0$              |

📌 **Nota:** Ogni riga rappresenta la distribuzione di probabilità $P(w_i \mid w_{i-1})$, e la somma dei valori di ogni riga (dove $c(w_{i-1}) > 0$) è pari a 1.

Abbiamo ora un modello completo di bigrammi normalizzato che possiamo utilizzare per:

- **Generare frasi** (es. a partire da `<s>`)
- **Calcolare la probabilità** di una sequenza di parole
- **Confrontare frasi** in base alla loro probabilità
  
## 🔸 Domanda 2: Qual è la parola più probabile che segue la sequenza?

Date le seuguenti sequenze (🥶),

- `<s> Sam ...`  
- `<s> Sam I do ...`  
- `<s> Sam I am Sam ...`
- `<s> do I like ...`

trovare la parola successiva più probabile.

Per ogni sequenza, analizziamo l’ultimo bigramma osservabile e calcoliamo quale parola ha la massima probabilità condizionata dato il contesto.

### 🔹 Sequenza: `<s> Sam ...`

L’ultima parola è `Sam`. Guardiamo la riga corrispondente nella matrice di probabilità:

| Successore | Probabilità $P(w_i \mid \text{Sam})$ |
|------------|--------------------------------------|
| I          | $\frac{3}{5}$ ✅ (massima)           |
| `</s>`     | $\frac{2}{5}$                        |

**👉 Parola più probabile:** `I`

### 🔹 Sequenza: `<s> Sam I do ...`

L’ultima parola è `do`. Guardiamo la riga per `do`:

| Successore | Probabilità $P(w_i \mid \text{do})$ |
|------------|-------------------------------------|
| I          | $\frac{1}{2}$ ✅ (massima pari)     |
| like       | $\frac{1}{2}$ ✅ (massima pari)     |

**👉 Parole più probabili:** `I` o `like` (probabilità uguale)

### 🔹 Sequenza: `<s> Sam I am Sam ...`

L’ultima parola è `Sam`. Guardiamo di nuovo la riga per `Sam`:

| Successore | Probabilità $P(w_i \mid \text{Sam})$ |
|------------|--------------------------------------|
| I          | $\frac{3}{5}$ ✅                     |
| `</s>`     | $\frac{2}{5}$                        |

**👉 Parola più probabile:** `I`

### 🔹 Sequenza: `<s> do I like ...`

L’ultima parola è `like`. Guardiamo la riga per `like`:

| Successore | Probabilità $P(w_i \mid \text{like})$ |
|------------|----------------------------------------|
| Sam        | $\frac{1}{3}$                         |
| `</s>`     | $\frac{2}{3}$ ✅                      |

**👉 Parola più probabile:** `</s>`

### ✅ Conclusione

| Sequenza                | Parola più probabile       |
|-------------------------|----------------------------|
| `<s> Sam`               | `I`                        |
| `<s> Sam I do`          | `I` o `like`               |
| `<s> Sam I am Sam`      | `I`                        |
| `<s> do I like`         | `</s>`                     |

## 🔸 Domanda 3: Calcolare la probabilità delle seguenti sequenze di parole

- `<s> Sam do like </s>`
- `<s> Sam I am </s>`
- `<s> I am Sam </s>`

Dobbiamo calcolare la probabilità totale delle sequenze usando il modello di bigrammi, ovvero:

$$
P(w_1, w_2, ..., w_n) = \prod_{i=1}^{n} P(w_i \mid w_{i-1})
$$

### 🔹 Sequenza 1: `<s> Sam do like </s>`

Bigrammi:  
- P(Sam | `<s>`) = 3/5  
- P(do | Sam) = 0  
- P(like | do) = 1/2  
- P(`</s>` | like) = 2/3  

**Probabilità totale:**
$$
P(\langle s\rangle\ Sam\ do\ like\ \langle/s\rangle) = \frac{3}{5} \cdot 0 \cdot \frac{1}{2} \cdot \frac{2}{3} = 0
$$

### 🔹 Sequenza 2: `<s> Sam I am </s>`

Bigrammi:  
- P(Sam | `<s>`) = 3/5  
- P(I | Sam) = 3/5  
- P(am | I) = 2/5  
- P(`</s>` | am) = 1/2  

**Probabilità totale:**
$$
P(\langle s\rangle\ Sam\ I\ am\ \langle/s\rangle) = \frac{3}{5} \cdot \frac{3}{5} \cdot \frac{2}{5} \cdot \frac{1}{2} = \frac{18}{250} = 0.072
$$
### 🔹 Sequenza 3: `<s> I am Sam </s>`

Bigrammi:  
- P(I | `<s>`) = 1/5  
- P(am | I) = 2/5  
- P(Sam | am) = 1/2  
- P(`</s>` | Sam) = 2/5  

**Probabilità totale:**
$$
P(\langle s\rangle\ I\ am\ Sam\ \langle/s\rangle) = \frac{1}{5} \cdot \frac{2}{5} \cdot \frac{1}{2} \cdot \frac{2}{5} = \frac{4}{250} = 0.016
$$

### ✅ Riepilogo

| Sequenza                   | Probabilità |
|----------------------------|-------------|
| `<s> Sam do like </s>`     | **0.000**   |
| `<s> Sam I am </s>`        | **0.072**   |
| `<s> I am Sam </s>`        | **0.016**   |

## 🔸 Domanda 4: Applica il Laplace Smoothing al Modello

Applichiamo il **Laplace Smoothing** (add-one smoothing) al modello di bigrammi per evitare probabilità nulle. La formula modificata è:

$$
P(w_i \mid w_{i-1}) = \frac{\text{count}(w_{i-1}, w_i) + 1}{\text{count}(w_{i-1}) + |V|}
$$

dove $|V|$ è la cardinalità del vocabolario.

### 📌 Dati:

- **Vocabolario chiuso**: $\{ \langle s\rangle,\ I,\ am,\ Sam,\ like,\ do,\ \langle/s\rangle \}$  
- $\Rightarrow |V| = 7$

Applichiamo il Laplace smoothing a tutti i bigrammi della matrice.

- $|V| = 7$
- Per ogni riga (cioè per ogni parola $w_{i-1}$), si usa:  
  $$
  P(w_i \mid w_{i-1}) = \frac{\text{count}(w_{i-1}, w_i) + 1}{\text{count}(w_{i-1}) + 7}
  $$
- Vettore dei conteggi degli unigrammi:

|       | `<s>` | I | am | Sam | like | do | `</s>` |
|-------|-------|---|----|------|------|----|--------|
| **conteggio** | 5    | 5 | 2  | 5    | 3    | 2  | 5      |

- Matrice dei conteggi dei bigrammi:

|$w_{i-1} \backslash w_i$       | `<s>` | I | am | Sam | like | do | `</s>` |
|-------|-------|---|----|------|------|----|--------|
| `<s>` |   0   | 1 | 0  | 3    | 0    | 1  | 0      |
| I     |   0   | 0 | 2  | 0    | 2    | 1  | 0      |
| am    |   0   | 0 | 0  | 1    | 0    | 0  | 1      |
| Sam   |   0   | 3 | 0  | 0    | 0    | 0  | 2      |
| like  |   0   | 0 | 0  | 1    | 0    | 0  | 2      |
| do    |   0   | 1 | 0  | 0    | 1    | 0  | 0      |
| `</s>`|   0   | 0 | 0  | 0    | 0    | 0  | 0      |

### 📋 Matrice di Probabilità Smoothed $P(w_i \mid w_{i-1})$

| $w_{i-1} \backslash w_i$ | `<s>`         | I               | am              | Sam             | like            | do              | `</s>`          |
|--------------------------|----------------|------------------|------------------|------------------|------------------|------------------|------------------|
| `<s>`                   | $\frac{0+1}{5+7} = \frac{1}{12}$ | $\frac{1+1}{12} = \frac{2}{12}$ | $\frac{0+1}{12} = \frac{1}{12}$ | $\frac{3+1}{12} = \frac{4}{12}$ | $\frac{0+1}{12} = \frac{1}{12}$ | $\frac{1+1}{12} = \frac{2}{12}$ | $\frac{0+1}{12} = \frac{1}{12}$ |
| I                      | $\frac{0+1}{12} = \frac{1}{12}$ | $\frac{0+1}{12} = \frac{1}{12}$ | $\frac{2+1}{12} = \frac{3}{12}$ | $\frac{0+1}{12} = \frac{1}{12}$ | $\frac{2+1}{12} = \frac{3}{12}$ | $\frac{1+1}{12} = \frac{2}{12}$ | $\frac{0+1}{12} = \frac{1}{12}$ |
| am                     | $\frac{0+1}{9} = \frac{1}{9}$ | $\frac{0+1}{9} = \frac{1}{9}$ | $\frac{0+1}{9} = \frac{1}{9}$ | $\frac{1+1}{9} = \frac{2}{9}$ | $\frac{0+1}{9} = \frac{1}{9}$ | $\frac{0+1}{9} = \frac{1}{9}$ | $\frac{1+1}{9} = \frac{2}{9}$ |
| Sam                    | $\frac{0+1}{12} = \frac{1}{12}$ | $\frac{3+1}{12} = \frac{4}{12}$ | $\frac{0+1}{12} = \frac{1}{12}$ | $\frac{0+1}{12} = \frac{1}{12}$ | $\frac{0+1}{12} = \frac{1}{12}$ | $\frac{0+1}{12} = \frac{1}{12}$ | $\frac{2+1}{12} = \frac{3}{12}$ |
| like                   | $\frac{0+1}{10} = \frac{1}{10}$ | $\frac{0+1}{10} = \frac{1}{10}$ | $\frac{0+1}{10} = \frac{1}{10}$ | $\frac{1+1}{10} = \frac{2}{10}$ | $\frac{0+1}{10} = \frac{1}{10}$ | $\frac{0+1}{10} = \frac{1}{10}$ | $\frac{2+1}{10} = \frac{3}{10}$ |
| do                     | $\frac{0+1}{9} = \frac{1}{9}$ | $\frac{1+1}{9} = \frac{2}{9}$ | $\frac{0+1}{9} = \frac{1}{9}$ | $\frac{0+1}{9} = \frac{1}{9}$ | $\frac{1+1}{9} = \frac{2}{9}$ | $\frac{0+1}{9} = \frac{1}{9}$ | $\frac{0+1}{9} = \frac{1}{9}$ |
| `</s>`                | — | — | — | — | — | — | — (nessuna transizione in uscita)

### 📌 Nota:

- Ogni riga rappresenta la distribuzione $P(w_i \mid w_{i-1})$ con smoothing.
- La somma di ogni riga = 1
- La riga `</s>` non è definita perché `</s>` è sempre terminale (non ha bigrammi in uscita).

### 🔹 Calcolo delle probabilità con smoothing

#### 🔸 Esempio: Calcoliamo $P(\text{do} \mid \text{Sam})$

Senza smoothing:
- $\text{count}(\text{Sam}, \text{do}) = 0$
- $\text{count}(\text{Sam}) = 5$

Con smoothing:
$$
P(\text{do} \mid \text{Sam}) = \frac{0 + 1}{5 + 7} = \frac{1}{12} \approx 0.083
$$

### Conclusioni
  - **Vantaggio**: Elimina gli zeri (es. $P(\text{do} | \text{Sam}) = \frac{1}{12}$).  
  - **Svantaggio**: Appiattimento delle probabilità ($P(\text{I} | \text{Sam})$ scende da $\frac{3}{5}$ a $\frac{4}{12}$).


## 🔸 Domanda 5: Quali sono le nuove probabilità delle seguenti parole?

- `<s> Sam do like </s>`
- `<s> Sam I am </s>`
- `<s> I am Sam </s>`

#### 🔹 Sequenza 1: `<s> Sam do like </s>`

Bigrammi (con smoothing):
- $P(\text{Sam} \mid \langle s\rangle) = \frac{3 + 1}{5 + 7} = \frac{4}{12}$
- $P(\text{do} \mid \text{Sam}) = \frac{0 + 1}{5 + 7} = \frac{1}{12}$
- $P(\text{like} \mid \text{do}) = \frac{1 + 1}{2 + 7} = \frac{2}{9}$
- $P(\langle/s\rangle \mid \text{like}) = \frac{2 + 1}{3 + 7} = \frac{3}{10}$

**Probabilità totale:**
$$
P(\langle s\rangle\ Sam\ do\ like\ \langle/s\rangle) = \frac{4}{12} \cdot \frac{1}{12} \cdot \frac{2}{9} \cdot \frac{3}{10} = \frac{24}{12960} = \frac{1}{540} \approx \mathbf{0.00185}
$$

#### 🔹 Sequenza 2: `<s> Sam I am </s>`

Bigrammi (con smoothing):
- $P(\text{Sam} \mid \langle s\rangle) = \frac{3 + 1}{5 + 7} = \frac{4}{12}$
- $P(\text{I} \mid \text{Sam}) = \frac{3 + 1}{5 + 7} = \frac{4}{12}$
- $P(\text{am} \mid \text{I}) = \frac{2 + 1}{5 + 7} = \frac{3}{12}$
- $P(\langle/s\rangle \mid \text{am}) = \frac{1 + 1}{2 + 7} = \frac{2}{9}$

**Probabilità totale:**
$$
P(\langle s\rangle\ Sam\ I\ am\ \langle/s\rangle) = \frac{4}{12} \cdot \frac{4}{12} \cdot \frac{3}{12} \cdot \frac{2}{9} = \frac{96}{15552} = \frac{2}{324} \approx \mathbf{0.00617}
$$

#### 🔹 Sequenza 3: `<s> I am Sam </s>`

Bigrammi (con smoothing):
- $P(\text{I} \mid \langle s\rangle) = \frac{1 + 1}{5 + 7} = \frac{2}{12}$
- $P(\text{am} \mid \text{I}) = \frac{2 + 1}{5 + 7} = \frac{3}{12}$
- $P(\text{Sam} \mid \text{am}) = \frac{1 + 1}{2 + 7} = \frac{2}{9}$
- $P(\langle/s\rangle \mid \text{Sam}) = \frac{2 + 1}{5 + 7} = \frac{3}{12}$

**Probabilità totale:**
$$
P(\langle s\rangle\ I\ am\ Sam\ \langle/s\rangle) = \frac{2}{12} \cdot \frac{3}{12} \cdot \frac{2}{9} \cdot \frac{3}{12} = \frac{36}{15552} = \frac{1}{432} \approx \mathbf{0.00231}
$$

### ✅ Riepilogo (con Laplace smoothing)

| Sequenza                   | Probabilità (con smoothing) |
|----------------------------|-----------------------------|
| `<s> Sam do like </s>`     | **0.00185**                 |
| `<s> Sam I am </s>`        | **0.00617**                 |
| `<s> I am Sam </s>`        | **0.00231**                 |

## 🔸 Domanda 6: Definire una Catena di Markov per un Modello Bigramma

### Componenti della Catena di Markov:
1. **Insieme degli stati $Q$**:
   $$
   Q = \{ \langle s\rangle,\ \text{I},\ \text{am},\ \text{Sam},\ \text{like},\ \text{do},\ \langle/s\rangle \}
   $$
   Ogni stato corrisponde a una parola del vocabolario, incluso il token di fine e inizio frase.

2. **Matrice di transizione $A$**:
   Le probabilità di transizione $a_{ij} = P(w_j | w_i)$ sono definite dalla tabella sottostante (valori semplificati per chiarezza):

   | Stato $w_i$   | Transizioni $w_j$ (probabilità semplificate)           |
   |-------------------|----------------------------------------------------------|
   | `<s>`             | I: $\frac{2}{12}$, Sam: $\frac{4}{12}$, do: $\frac{2}{12}$, `<s>`/am/like/`</s>`: $\frac{1}{12}$ |
   | I                 | am: $\frac{3}{12}$, like: $\frac{3}{12}$, do: $\frac{2}{12}$, altri: $\frac{1}{12}$ |
   | am                | Sam: $\frac{2}{9}$, `</s>`: $\frac{2}{9}$, altri: $\frac{1}{9}$ |
   | Sam               | I: $\frac{4}{12}$, `</s>`: $\frac{3}{12}$, altri: $\frac{1}{12}$ |
   | like              | Sam: $\frac{2}{10}$, `</s>`: $\frac{3}{10}$, altri: $\frac{1}{10}$ |
   | do                | I: $\frac{2}{9}$, like: $\frac{2}{9}$, altri: $\frac{1}{9}$ |
   | `</s>`            | Nessuna transizione (stato terminale) |

3. **Distribuzione iniziale $\pi$**:
   $$
   \pi_{\langle s\rangle} = 1, \quad \pi_{\text{I}} = \pi_{\text{am}} = \pi_{\text{Sam}} = \pi_{\text{like}} = \pi_{\text{do}} = \pi_{\langle/s\rangle} = 0
   $$
   Tutte le frasi iniziano con `<s>`.

### Diagramma della Catena di Markov:
<img src="/static/images/tikz/d9a8452a4780687bb03acb8df4eef9ef.svg" style="display: block; width: 100%; height: auto; max-height: 600px;" class="tikz-svg" />

## 🔷 Conclusioni Finali  

### 1. **Confronto Smoothing vs. Non-Smoothed**  
- **Senza smoothing**:  
  - ✔️ Accurate per dati osservati.  
  - ❌ Fragile: la presenza di probabilità nulle compromette la modellazione di sequenze nuove.  
- **Con Laplace**:  
  - ✔️ Robusto: ogni transizione ha probabilità > 0.  
  - ❌ Distorsione: ad es. $P(\text{I} | \text{Sam})$ si riduce del **47%** → effetto negativo su transizioni frequenti.

### 2. **Scelta del Metodo di Smoothing**  
- **Laplace**:  
  - ✅ Semplice da implementare.  
  - ❌ Uniforma eccessivamente → penalizza le distribuzioni reali.  
- **Altri metodi (Katz Backoff, Kneser-Ney)**:  
  - ✅ Più sofisticati.  
  - ✅ Scontano in modo adattivo e preservano meglio le frequenze originali.  

### 3. **Impatto del Corpus**  
- **Dimensione**:  
  - Corpus molto piccolo ($N = 5$ frasi) → alta **sparsità**.  
- **Pattern ripetitivi**:  
  - Sequenze come “Sam I” o “I am” dominano le transizioni → il modello rischia di **overfittare** su co-occorrenze casuali.  
- **Copertura lessicale**:  
  - Vocabolario ristretto ($|V| = 6$ parole) → le tecniche di smoothing hanno effetto amplificato.

### 4. **Modello come Catena di Markov**  
- Il modello $n$-gramma (qui bigramma) equivale a una **catena di Markov di ordine 1**:  
  $$ P(w_i | w_1^{i-1}) \approx P(w_i | w_{i-1}) $$
- Vantaggi:  
  - ✅ Rappresentazione semplice e visualizzabile con automi.  
- Limiti:  
  - ❌ Perde dipendenze a lungo termine.  
  - ❌ La memoria limitata (solo lo stato precedente) può causare ambiguità in sequenze complesse.

### 5. **Equazioni Chiave**  
- **MLE (Massima Verosimiglianza)**:  
  $$ P_{\text{MLE}}(w_i | w_{i-1}) = \frac{\text{count}(w_{i-1}, w_i)}{\text{count}(w_{i-1})} $$
- **Laplace Smoothing**:  
  $$ P_{\text{smooth}}(w_i | w_{i-1}) = \frac{\text{count}(w_{i-1}, w_i) + 1}{\text{count}(w_{i-1}) + |V|} $$

### ✅ Conclusione Generale:  
I modelli $n$-gramma, pur essendo una base utile per la modellazione del linguaggio, **necessitano di smoothing avanzati** per affrontare la **sparsità** dei dati.  
Quando interpretati come catene di Markov, evidenziano chiaramente il **trade-off tra semplicità e potere predittivo**.
