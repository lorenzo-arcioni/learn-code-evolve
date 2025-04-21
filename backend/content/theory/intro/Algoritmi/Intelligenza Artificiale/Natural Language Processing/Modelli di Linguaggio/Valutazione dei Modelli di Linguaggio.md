# Valutazione dei Modelli di Linguaggio
La valutazione di un modello di linguaggio consiste nella misurazione della qualità del modello attraverso la probabilità che il modello assegna ai dati di test. È un passaggio fondamentale che consente di determinare se un modello di linguaggio funziona bene o meno.

## Criteri di Valutazione
- **Domande fondamentali**:  
  1. Come determinare se un modello è efficace?  
  2. Come confrontare due modelli per stabilire quale sia migliore?  

- **Comportamento ideale di un modello**:  
  Un buon modello deve:  
  • **Favorire frasi fluenti** (grammaticali o frequentemente osservate)  
  • **Sfavorire frasi scorrette** (agrammaticali o rare)  

- **Intuizione chiave**:  
  > Dati due modelli probabilistici, **il modello migliore è quello che si adatta meglio ai dati di test**, assegnando loro probabilità più elevate.  

## Misurazione Quantitativa
La qualità si misura attraverso **la probabilità che il modello assegna ai dati di test**:  
$$ P_{\text{test}} = \prod_{i=1}^N P(w_i | w_{1:i-1}) $$  
**Regola di confronto**:  
- Modello A è migliore di Modello B se:  
  $$ P_{\text{test}}(A) > P_{\text{test}}(B) $$  

## Suddivisione Standard dei Dati
**Struttura raccomandata**:  

| Set di Dati      | Scopo                                         | Dimensione Tipica |  
|------------------|-----------------------------------------------|-------------------|  
| **Training**     | Apprendimento parametri (es. conteggi n-gram) | 80%               |  
| **Development**  | Tuning iperparametri (es. ordine n-gram)      | 10%               |  
| **Test**         | Valutazione finale                            | 10%               |  

**Condizioni essenziali**:  
- Training, development e test set devono essere **disgiunti**.  
- Il test set deve contenere dati mai visti durante l’addestramento.  

## Valutazione Qualitativa tramite Generazione  
**Protocollo**:  
1. Generare frasi campione da modelli con ordini n-gram diversi.  
2. Valutare empiricamente la qualità delle frasi generate.  

**Esempio di output**:

| Ordine n-gram | Frase Generata                     | Valutazione Qualitativa |  
|---------------|------------------------------------|-------------------------|  
| Unigram       | "the of to and a"                  | ❌ Incoerente            |  
| Bigram        | "the cat jumped on"                | ⚠️ Parzialmente corretta |  
| Trigram       | "the cat sat on the mat"           | ✅ Fluida                |  
| Quadrigram    | "the cat sat on the red carpet"    | ✅ Ricca di contesto     |  

## Teoria vs Pratica
- **Modelli complessi** (es. n-gram di ordine elevato):
 
  - Migliore adattamento ai dati di training  
  - Rischio di **overfitting** (prestazioni scadenti su test set)  
  $$ P_{\text{quadrigram}}(w_i) \approx 0 \quad \text{per sequenze nuove} $$  

- **Modelli semplici** (es. unigrammi):  
  - Generalizzazione migliore  
  - Incapacità di catturare dipendenze a lungo raggio  
  $$ P_{\text{unigram}}(w_i) = \text{frequenza della parola} $$  

## Vocabolario Chiuso vs. Aperto

### Definizioni Fondamentali
- **Closed Vocabulary**:  
  Assunzione che **tutte le parole nel test set siano presenti nel vocabolario** (nessuna parola sconosciuta).  
  $$ \forall w \in \text{Test Set}, \quad w \in \text{Vocabolario} $$  

- **Open Vocabulary**:  
  Gestione delle **parole OOV (Out-Of-Vocabulary)** tramite il token speciale `<UNK>`.  
  $$
  \text{OOV} \rightarrow \text{<UNK>}
  $$
  Per gestire al meglio le parole OOV, si utilizza quindi il **meccanismo di sostituzione**.

### Processo di Addestramento per Open Vocabulary (3 Step)

Consideriamo un set di test:

*Escort claims Berlusconi's bunga bunga parties full of young girls. An
escort who claims she was paid €10,000 (£8,500) to spend two nights
with the Italian Prime Minister Silvio Berlusconi has revealed how his
parties were full of young girls.*

#### **1. Scelta del Vocabolario**

Consideriamo un vocabolario di train:

$\text{Vocabolario}$ = {Escort, escort, claims, Berlusconi’s, parties, full, of, young,
girls, an, who, she, was, paid, to, spend, two, nights, with, the, Italian,
Prime, Minister, Berlusconi, has, revealed, how, his, were}

- **Strumenti**: Liste di frequenza lessicale o cutoff statistico  
- **Esempio pratico**:  
  Dal caso studio, parole selezionate includono forme flesse ("Escort/escort") e entità ("Berlusconi"), ma escludono numeri e valute.  
  *Dimensione vocabolario*: 29 parole nel caso fornito.

#### **2. Conversione OOV nel Training Set**  
- **Meccanismo di sostituzione**:  
  Per ogni parola $w$ nel training set:  
  $$ 
  w_{\text{convertita}} = \begin{cases} 
  w & \text{se } w \in \text{Vocabolario} \\
  \text{<UNK>} & \text{altrimenti}
  \end{cases}
  $$  
- **Risultato**:  
*Escort claims Berlusconi's $\text{<UNK>}$ $\text{<UNK>}$ parties full of young girls. An
escort who claims she was paid $\text{<UNK>}$ $\text{<UNK>}$ to spend two nights with
the Italian Prime Minister $\text{<UNK>}$ Berlusconi has revealed how his parties
were full of young girls.*

#### **3. Stima delle Probabilità**  
- **Trattamento di <UNK>**:  
  Il token speciale viene considerato una parola nel modello:  
  $$
  P(\text{<UNK>}) = \frac{C(\text{<UNK>})}{C(\text{tutte le parole})}
  $$  

**Calcolo probabilità bigramma**:  
$$
P(\text{parties} | \text{<UNK>}) = \frac{C(\text{<UNK> parties})}{C(\text{<UNK>})} = \frac{1}{5}
$$

### Impatto sulle Prestazioni
- **Vantaggio**: Previene errori "zero probability" per parole nuove  
- **Svantaggio**: Perde informazioni lessicali specifiche  
- **Trade-off**:  
  $$
  \text{Informatività} \propto \frac{1}{\text{Dimensione Vocabolario}}
  $$

## Valutazione Intrinseca e Estrinseca nei Modelli di Linguaggio

La valutazione dei modelli di linguaggio può essere classificata in due categorie principali: **valutazione intrinseca (in vitro)** ed **estrinseca (in vivo o end-to-end)**.  

### Valutazione Estrinseca (In Vivo)  
Questa metodologia prevede l'integrazione del modello in un'applicazione reale e la misurazione della sua qualità attraverso il funzionamento del sistema finale. Un esempio comune è l'inserimento di un modello di linguaggio in un sistema di riconoscimento vocale e la valutazione della qualità delle trascrizioni generate.  

**Vantaggi**:
- Fornisce una misura diretta dell'impatto del modello nell'uso pratico.
- Permette di valutare il contributo del modello in un contesto applicativo.  

**Svantaggi**:
- Può essere costosa e richiedere molte risorse computazionali.
- Non sempre è possibile da realizzare per ogni modello.  

### Valutazione Intrinseca (In Vitro)  
Questa modalità utilizza metriche specifiche per valutare il modello senza integrarlo in un'applicazione reale. Un esempio comune è la **perplessità** (perplexity), che misura quanto il modello è incerto nel prevedere la prossima parola di una sequenza.  

**Vantaggi**:
- Più economica e semplice da eseguire.
- Permette di confrontare rapidamente diversi modelli.  

**Svantaggi**:
- Non garantisce necessariamente miglioramenti nelle applicazioni reali.
- Anche se spesso è correlata con la qualità dell'uso pratico, non è una misura definitiva dell'efficacia del modello in un contesto reale.  

In sintesi, la valutazione intrinseca è utile per analisi preliminari e sviluppo rapido, mentre la valutazione estrinseca è fondamentale per misurare l'effettivo impatto del modello nel mondo reale. Idealmente, entrambe dovrebbero essere utilizzate per una valutazione completa dei modelli di linguaggio.  

### Perplessità (Perplexity)

La **Perplexity** (PP) è una metrica fondamentale per valutare i modelli linguistici, misura quanto un modello è "perplesso" nel predire una sequenza di parole. Valori più bassi indicano modelli più accurati.

#### Definizione Base
Per una sequenza di `N` parole $w_1, w_2, ..., w_N = W$ la perplexity (PP) viene definita come:

$$
PP(W) = \mathbb P(W)^{- \frac{1}{N}}= \sqrt[N]{\prod_{i=1}^{N} \frac{1}{\mathbb P(w_i | w_1...w_{i-1})}}
$$

#### Casi Specifici
- **Bigramma** (semplificazione):
  $$
  PP(W) = \sqrt[N]{\prod_{i=1}^{N} \frac{1}{\mathbb P(w_i | w_{i-1})}}
  $$
- **Corpus** con `m` frasi e `N` parole totali:
  $$
  PP(C) = \sqrt[N]{\frac{1}{\mathbb P(s_1, ..., s_m)}}
  $$
  Se le frasi sono indipendenti:
  $$
  \mathbb P(s_1, ..., s_m) = \prod_{i=1}^{m} \mathbb P(s_i)
  $$

#### Interpretazione
- **PP ↓ → Modello ↑**: Minore è la perplexity, migliore è il modello.
- **Esempio Reale** (Wall Street Journal):
  | N-gramma  | Unigramma | Bigramma | Trigramma |
  |-----------|-----------|----------|-----------|
  | Perplexity| 962       | 170      | 109       |

Quindi, più informazione il modello ci da sulla sequenza di parole, più bassa è la perplexity, migliore il modello. Intuitivamente, se un modello assegna un'alta probabilità al set di test, significa che non è sorpreso di osservarlo (non ne è 'perplesso'), indicando una buona comprensione del funzionamento del linguaggio.

#### Fonti
- [Articolo Originale](https://pubs.aip.org/asa/jasa/article/62/S1/S63/642598/Perplexity-a-measure-of-the-difficulty-of-speech)
- [Approfondimento](https://towardsdatascience.com/perplexity-in-language-models-87a196019a94)
