# Byte-Pair Encoding (BPE): Algoritmo e Esempio Pratico  
Il **Byte-Pair Encoding** (BPE) è un algoritmo di tokenizzazione sub-lessicale ampiamente utilizzato in NLP per ridurre le dimensioni del vocabolario e gestire parole rare o non viste. Si basa sulla fusione iterativa delle coppie di caratteri/sottoparole più frequenti in un corpus.  

$$
\text{BPE}(C, k) = \{ \text{token}_1, \text{token}_2, \text{token}_3, \ldots \}
$$

## **Algoritmo BPE in Pseudocodice**  
**Input**:  
- `C`: Corpus suddiviso in token iniziali (es. caratteri o parole).  
- `k`: Numero di fusioni da eseguire.  

**Output**:  
- `V`: Vocabolario finale con token sub-lessicali.  

**Passaggi**:  

1. **Inizializzazione del vocabolario**:  
   - Suddividi ogni parola nel corpus in caratteri individuali.  
   - Aggiungi un simbolo speciale `_` (spesso usato per indicare la fine di una parola).  
   - `V` ← Insieme di tutti i caratteri unici presenti in `C`.  

2. **Iterazione per `k` fusioni**:  
   Per `i` da 1 a `k`:  
   - **Calcola le frequenze delle coppie adiacenti**:  
     Conta tutte le coppie di token consecutivi nel corpus.  
   - **Seleziona la coppia più frequente**:  
     Sia `(tL, tR)` la coppia con la massima frequenza.  
   - **Crea un nuovo token**:  
     `tNEW` ← `tL + tR` (concatenazione dei due token).  
   - **Aggiorna il vocabolario**:  
     `V` ← `V ∪ {tNEW}`.  
   - **Modifica il corpus**:  
     Sostituisci ogni occorrenza di `tL` seguito da `tR` con `tNEW` in tutte le parole.  

3. **Restituisci** `V`.  

$$
\begin{aligned}
& \textbf{Algoritmo: Byte-Pair Encoding} \\
& \textbf{Input:} \\
& \quad - \text{Corpus } C \text{ (token iniziali)} \\
& \quad - \text{Numero di fusioni } k \\
& \textbf{Output:} \\
& \quad - \text{Vocabolario } V \text{ (token sub-lessicali)} \\
& \\
& \text{1: Inizializza } V \gets \text{ tutti i caratteri unici in } C \\
& \text{2: Aggiungi il simbolo speciale } \texttt{"\_"} \text{ a } V \text{ (delimitatore di fine parola)} \\
& \text{3: Suddividi ogni parola in } C \text{ in caratteri singoli + } \texttt{\_} \\
& \text{4: For } i = 1 \text{ to } k \text{ do:} \\
& \quad \text{4.1: Calcola frequenze di tutte le coppie adiacenti } (t_L, t_R) \text{ in } C \\
& \quad \text{4.2: Seleziona la coppia } (t_L, t_R) \text{ con frequenza massima} \\
& \quad \text{4.3: Crea nuovo token } t_{\text{NEW}} = t_L \oplus t_R \text{ (concatenazione)} \\
& \quad \text{4.4: Aggiorna } V \leftarrow V \cup \{ t_{\text{NEW}} \} \\
& \quad \text{4.5: Sostituisci ogni occorrenza di } t_L t_R \text{ con } t_{\text{NEW}} \text{ in } C \\
& \text{5: Restituisci } V
\end{aligned}
$$

## **Esempio Pratico**  

### Dati Iniziali  
**Corpus** (con frequenze):  
5 `l o w _`  
2 `l o w e s t _`  
6 `n e w e r _`  
3 `w i d e r _`  
2 `n e w _`  

**Vocabolario iniziale**:  
`V = { _, d, e, i, l, n, o, r, s, t, w }`  

---

### Esecuzione dell'Algoritmo (k = 3 fusioni)  

#### **Fusione 1**  
- **Coppia più frequente**: `(e, r)`  
  - Presente in:  
    6 `n e w e r _` (6 occorrenze)  
    3 `w i d e r _` (3 occorrenze)  
  - **Totale**: 9 occorrenze  
- **Nuovo token**: `er`  
- **Vocabolario aggiornato**:  
  `V = { _, d, e, i, l, n, o, r, s, t, w, er }`  
- **Nuovo corpus**:  
  5 `l o w _`  
  2 `l o w e s t _`  
  6 `n e w er _`  
  3 `w i d er _`  
  2 `n e w _`  

#### **Fusione 2**  
- **Coppia più frequente**: `(er, _)`  
  - Presente in:  
    6 `n e w er _` (6 occorrenze)  
    3 `w i d er _` (3 occorrenze)  
  - **Totale**: 9 occorrenze  
- **Nuovo token**: `er_`  
- **Vocabolario aggiornato**:  
  `V = { _, d, e, i, l, n, o, r, s, t, w, er, er_ }`  
- **Nuovo corpus**:  
  5 `l o w _`  
  2 `l o w e s t _`  
  6 `n e w er_`  
  3 `w i d er_`  
  2 `n e w _`  

#### **Fusione 3**  
- **Coppia più frequente**: `(n, e)`  
  - Presente in:  
    6 `n e w er_` (6 occorrenze)  
    2 `n e w _` (2 occorrenze)  
  - **Totale**: 8 occorrenze  
- **Nuovo token**: `ne`  
- **Vocabolario finale**:  
  `V = { _, d, e, i, l, n, o, r, s, t, w, er, er_, ne}`    
- **Corpus finale**:  
  5 `l o w _`  
  2 `l o w e s t _`  
  6 `ne w er_`  
  3 `w i d er_`  
  2 `ne w _`  

#### **Fusione 4**  
- **Coppia più frequente**: `(ne, w)`  
  - Presente in:  
    6 `ne w er_` (6 occorrenze)  
    2 `ne w _` (2 occorrenze)  
  - **Totale**: 8 occorrenze  
- **Nuovo token**: `new`  
- **Vocabolario aggiornato**:  
  `V = { _, d, e, i, l, n, o, r, s, t, w, er, er_, ne, new }`  
- **Nuovo corpus**:  
  5 `l o w _`  
  2 `l o w e s t _`  
  6 `new er_`  
  3 `w i d er_`  
  2 `new _`  

#### **Fusione 5**  
- **Coppia più frequente**: `(l, o)`  
  - Presente in:  
    5 `l o w _` (5 occorrenze)  
    2 `l o w e s t _` (2 occorrenze)  
  - **Totale**: 7 occorrenze  
- **Nuovo token**: `lo`  
- **Vocabolario aggiornato**:  
  `V = { _, d, e, i, l, n, o, r, s, t, w, er, er_, ne, new, lo }`  
- **Nuovo corpus**:  
  5 `lo w _`  
  2 `lo w e s t _`  
  6 `new er_`  
  3 `w i d er_`  
  2 `new _`  

#### **Fusione 6**  
- **Coppia più frequente**: `(lo, w)`  
  - Presente in:  
    5 `lo w _` (5 occorrenze)  
    2 `lo w e s t _` (2 occorrenze)  
  - **Totale**: 7 occorrenze  
- **Nuovo token**: `low`  
- **Vocabolario aggiornato**:  
  `V = { ..., lo, low }`  
- **Nuovo corpus**:  
  5 `low _`  
  2 `low e s t _`  
  6 `new er_`  
  3 `w i d er_`  
  2 `new _`  

#### **Fusione 7**  
- **Coppia più frequente**: `(new, er_)`  
  - Presente in:  
    6 `new er_` (6 occorrenze)  
  - **Totale**: 6 occorrenze  
- **Nuovo token**: `newer_`  
- **Vocabolario aggiornato**:  
  `V = { ..., new, er_, newer_ }`  
- **Nuovo corpus**:  
  5 `low _`  
  2 `low e s t _`  
  6 `newer_`  <!-- Fusione di "new" + "er_" -->  
  3 `w i d er_`  
  2 `new _`  

#### **Fusione 8**  
- **Coppia più frequente**: `(low, _)`  
  - Presente in:  
    5 `low _` (5 occorrenze)  
  - **Totale**: 5 occorrenze  
- **Nuovo token**: `low_`  
- **Vocabolario finale**:  
  `V = { _, d, e, i, l, n, o, r, s, t, w, er, er_, ne, new, lo, low, newer_, low_ }`  
- **Corpus finale**:  
  5 `low_`  <!-- Fusione di "low" + "_" -->  
  2 `low e s t _`  
  6 `newer_`  
  3 `w i d er_`  
  2 `new _`  

Quindi, dopo 8 fusioni (iterazioni), il vocabolario finale contiene 19 token e il corpus finale contiene 12 token. E queste sono le regole apprese dall'algoritmo:

- e r -> er
- er _ -> er_
- n e -> ne
- ne w-> new
- l o -> lo
- lo w -> low
- new er_ -> newer_
- low _ -> low_
