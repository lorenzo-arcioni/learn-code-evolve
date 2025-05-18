# Part-of-Speech (PoS) Tagging

## Definizione

Il **Part-of-Speech (PoS) Tagging**, o **etichettatura delle categorie grammaticali**, è il processo di assegnazione a ciascuna parola di un testo un'etichetta grammaticale che indica la sua funzione sintattica, come **sostantivo**, **verbo**, **aggettivo**, **avverbio**, ecc.

Questa tecnica è un passo fondamentale nell'elaborazione del linguaggio naturale (NLP), perché consente ai sistemi informatici di comprendere la struttura grammaticale di una frase, facilitando operazioni più complesse come l'analisi sintattica, la traduzione automatica, l'estrazione di informazioni o la generazione di testo.

Il PoS tagging può essere effettuato:
- in modo **rule-based**, con l'uso di dizionari e regole grammaticali;
- oppure con metodi **statistici o basati su machine learning**, che apprendono dai corpora annotati.

Nelle prossime sezioni approfondiremo i principali metodi, esempi pratici e librerie utili.

## Universal PoS Tagset

Per favorire l'interoperabilità tra linguaggi e strumenti NLP, è stato definito un set di **17 tag universali**, adottato da risorse come Universal Dependencies. Questi tag rappresentano una categorizzazione "coarse-grained", cioè meno dettagliata ma più generalizzabile rispetto a quelli specifici dei singoli treebank.

> "...this set of coarse-grained POS categories is defined operationally, by collapsing language (or treebank) specific distinctions to a set of categories that exists across all languages..."

### I 17 Universal PoS Tags:

- **VERB** – verbi (tutti i tempi e modi)
- **NOUN** – nomi comuni e propri
- **PROPN** – nomi propri
- **PRON** – pronomi
- **AUX** – ausiliari
- **ADJ** – aggettivi
- **ADV** – avverbi
- **ADP** – adposizioni (preposizioni e postposizioni)
- **INTJ** – interiezioni (esclamazioni)
- **CCONJ** – congiunzioni coordinanti (e, o, ma)
- **SCONJ** – congiunzioni subordinanti (che, se, quando)
- **DET** – determinanti
- **NUM** – numerali cardinali
- **PART** – particelle o altre parole funzionali
- **PUNCT** – punteggiatura
- **SYM** – simboli (es. \$, sostituibili con "dollaro")
- **X** – altri (parole straniere, errori, abbreviazioni)

Tuttavia, dato che ogni lingua possiede le proprie specificità grammaticali, nei diversi **treebank** (cioè corpora linguistici annotati) vengono spesso usati tag più dettagliati o personalizzati. Il sistema di tag **universali** serve quindi a creare un livello comune e semplificato, utile per:

- il confronto tra lingue diverse;
- la portabilità di modelli NLP multilingua;
- la generalizzazione nei task di apprendimento automatico;
- l’integrazione con risorse linguistiche come *Universal Dependencies*.

Questo compromesso tra granularità e compatibilità permette agli strumenti NLP di operare efficacemente su più lingue con un set standardizzato di categorie grammaticali.


## Esempio di Frase con PoS Tagging

Per chiarire l'applicazione pratica del PoS tagging, si può considerare la seguente frase inglese:

> **The oboist Heinz Holliger has taken a hard line about the problems.**

| Token       | Tag originale | Tag universale |
|-------------|---------------|----------------|
| The         | DT            | DET            |
| oboist      | NN            | NOUN           |
| Heinz       | NNP           | NOUN           |
| Holliger    | NNP           | NOUN           |
| has         | VBZ           | VERB           |
| taken       | VBN           | VERB           |
| a           | DT            | DET            |
| hard        | JJ            | ADJ            |
| line        | NN            | NOUN           |
| about       | IN            | ADP            |
| the         | DT            | DET            |
| problems    | NNS           | NOUN           |
| .           | .             | PUNCT          |

Questa trasformazione consente di uniformare l’analisi linguistica e migliorare la compatibilità tra corpus e strumenti NLP in lingue diverse.

<a href="https://universaldependencies.org/u/pos/">Qui</a> è possibile trovare un elenco completo dei tag universali e il loro mapping nelle diverse lingue.

## 🔄 Ambiguità lessicale nel PoS Tagging

Nel processo di PoS Tagging, una delle principali difficoltà è rappresentata dall’ambiguità: **la stessa parola può appartenere a categorie grammaticali differenti**, a seconda del contesto.

### 🧠 Esempio della parola "well"

La parola _well_ è un classico esempio di ambiguità grammaticale in inglese. Ecco come può essere interpretata in frasi diverse:

| Frase                                         | Categoria grammaticale | Tag  |
|----------------------------------------------|-------------------------|------|
| _How to increase the water pressure from a well?_ | Nome (pozzo)            | `NOUN` |
| _Tears well in her eyes_                     | Verbo (sgorgare)        | `VERB` |
| _The wound is nearly well_                   | Aggettivo (guarito)     | `ADJ` |
| _The party went well_                        | Avverbio (bene)         | `ADV` |

#### 🗂️ Schema concettuale dell’ambiguità (esempio con "well")

```plaintext
Input: "How to increase the well"

       [ How ]   [ to ]   [ increase ]   [ the ]   [ well ]
          ↓         ↓          ↓           ↓          ↓
                                 PoS Tagger
                                       ↓
           Output:  ADV  |  PART  |  VERB  |  DET  |  ???
                                                   ↳ NOUN
                                                   ↳ ADV
                                                   ↳ ADJ
```

🧩 La parola "well" ha **più possibili etichette** (`NOUN`, `ADV`, `ADJ`), e il sistema di tagging deve scegliere la più adatta **in base al contesto**.

🔍 **Conclusione**: il contesto è fondamentale per disambiguare correttamente il significato.

### 📊 Frequenza dell’ambiguità: Brown Corpus

L’ambiguità non è un fenomeno raro. Analizzando il **Brown Corpus**, un corpus linguistico ampiamente utilizzato per l’inglese, si osservano i seguenti dati:

| Misura                          | Percentuale |
|---------------------------------|-------------|
| Tipi di parola ambigui (types)  | 11.5%       |
| Token ambigui (nei testi reali) | 40%         |

💡 **Interpretazione**: anche se solo una piccola parte dei lemmi è ambigua, queste parole compaiono molto spesso nei testi, rendendo l’ambiguità un problema ricorrente nei corpus reali.

<img src="/static/images/tikz/7246a8d7f940889d420ec983437a71e0.svg" style="display: block; width: 100%; height: auto; max-height: 600px;" class="tikz-svg" />

## Rule-based PoS tagging (dagli anni '60)

Il PoS tagging basato su regole è uno dei primi approcci sviluppati per l’assegnazione delle categorie grammaticali, risalente agli anni '60. Si basa su un insieme di **regole linguistiche scritte a mano** che utilizzano informazioni **lessicali e contestuali** per determinare il ruolo grammaticale di ogni parola in una frase.

### Componenti principali

- Un **lessico**: contiene le parole e le possibili etichette grammaticali associate.
- Un insieme di **regole di disambiguazione**: scritte da linguisti per risolvere le ambiguità in base al contesto sintattico.

Le regole hanno spesso la forma:
> *Se una parola può essere sia un nome che un verbo, ma segue un determinante, allora è un nome.*

### Esempio

Frase:
> *Time flies like an arrow.*

- Lessico:
  - Time → Nome / Verbo  
  - flies → Nome / Verbo  
  - like → Verbo / Preposizione  

- Regole:
  - *Se la prima parola è maiuscola e si trova all’inizio della frase, preferisci Nome.*
  - *Se una parola segue un nome ed è compatibile come verbo, mantieni il verbo.*

Etichettatura risultante:
> Time/**Nome** flies/**Verbo** like/**Preposizione** an/**Det** arrow/**Nome**

### Pro e contro

✅ Funziona bene in **domini specifici**  
❌ Richiede una **scrittura intensiva di regole** da parte di esperti  
❌ È **poco adattabile** a nuovi testi o domini

## Part-of-Speech Tagging Stocastico

L'approccio **stocastico/statistico** al PoS tagging si basa sull'uso della **probabilità** per determinare la sequenza di tag più probabile per una data frase. A differenza dei metodi rule-based, che si affidano a regole linguistiche scritte a mano, i modelli stocastici imparano da **corpora annotati** utilizzando metodi di apprendimento automatico.

### Obiettivo

Dato un input $x = (w_1, w_2, \dots, w_n)$ di parole, vogliamo trovare la sequenza di tag $t = (t_1, t_2, \dots, t_n)$ che massimizza:

$$
\hat{t} = \arg\max_{t} P(t \mid x)
$$

Tramite il teorema di Bayes:

$$
\hat{t} = \arg\max_{t} P(x \mid t) \cdot P(t)
$$

Qui nascono due grandi famiglie di modelli:

---

### 📘 1. Modelli Generativi (es. Hidden Markov Models - HMM)

Questi modelli stimano:
- $P(t)$: la probabilità della sequenza di tag (modello del linguaggio dei tag)
- $P(x \mid t)$: la probabilità delle parole date i tag (modello di emissione)

Assumono che:
- Ogni tag dipende solo da quello precedente: $P(t_i \mid t_{i-1})$
- Ogni parola dipende solo dal tag corrente: $P(w_i \mid t_i)$

$$
P(t, x) = \prod_{i=1}^{n} P(t_i \mid t_{i-1}) \cdot P(w_i \mid t_i)
$$

Il tagging avviene con **algoritmi di decoding** come il **Viterbi**, che trovano la sequenza più probabile.

#### ✅ Pro:
- Semplice, efficiente, ben compreso
- Funziona bene con dati sufficienti

#### ❌ Contro:
- Assunzioni forti di indipendenza
- Difficoltà nel gestire feature complesse

[[Hidden Markov Models in PoS Tagging|Qui]] è diposnibile una descrizione dettagliata degli HMM per il PoS Tagging e una descrizione dettagliata dell'algoritmo di Viterbi.

---

### 📘 2. Modelli Discriminativi (es. Maximum Entropy, Conditional Random Fields)

Questi modelli stimano direttamente:

$$
P(t \mid x)
$$

usando funzioni di feature che descrivono in dettaglio il contesto, come:
- la parola corrente e circostanti
- suffissi, prefissi, maiuscole/minuscole
- tag precedenti

Due esempi comuni:
- **Maximum Entropy Models (MEMs)** → modello discriminativo con feature e logistica
- **Conditional Random Fields (CRF)** → generalizza i MEMs, considerando l’intera sequenza

#### ✅ Pro:
- Più flessibili dei modelli generativi
- Permettono di usare molte feature contestuali
- Migliori performance sul disambiguamento

#### ❌ Contro:
- Più costosi da addestrare
- Più complessi da implementare

[[Maximum Entropy Models in PoS Tagging|Qui]] è diposnibile una descrizione dettagliata dei MEMs per il PoS Tagging.

## ✅ Conclusioni

Il PoS Tagging è un passo essenziale per l’analisi linguistica e ha visto un’evoluzione significativa:

| Approccio       | Vantaggi | Svantaggi |
|----------------|----------|-----------|
| **Rule-based** | Interpretabile, controllabile | Poco adattabile, intensivo |
| **HMM (generativo)** | Semplice, robusto | Assunzioni di indipendenza |
| **MaxEnt / CRF (discriminativi)** | Molto accurati, flessibili | Più lenti e complessi |

Oggi, i metodi **statistici e di machine learning**, in particolare quelli **discriminativi**, sono lo standard, e vengono spesso integrati con **reti neurali** per raggiungere performance ancora più elevate.

Il successo nel PoS tagging dipende dalla **qualità del corpus annotato**, dalla **scelta delle feature** e dalla **capacità del modello di generalizzare** sulle ambiguità lessicali.
