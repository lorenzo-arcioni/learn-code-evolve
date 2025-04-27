# 🧠 Word Sense Disambiguation (WSD)

## 📖 Definizione

La **Word Sense Disambiguation (WSD)** è il compito di **determinare il significato corretto** di una parola in un determinato contesto, **data una lista di possibili sensi (o synset)**, come quelli definiti in risorse come **WordNet**.

> Esempio:  
> Frase: *"I like planes and aeronautics in general."*  
> Obiettivo: Disambiguare la parola *planes* → potrebbe significare “aerei” ($plane¹_n$) oppure “superfici piane” ($plane²_n$)  
> Risultato corretto: $plane¹_n$ (aerei) grazie al contesto semantico (“aeronautics”).

📌 Inventario di sensi: tipicamente tratto da **WordNet** o risorse simili.

## 🧪 Varianti del task

La WSD si divide in due principali sottotipi di task:

### 🎯 Lexical Sample Task

- Viene fornito un **insieme limitato di parole target**.
- Ogni parola ha un proprio inventario di sensi.
- Obiettivo: disambiguare solo queste parole in diversi contesti.
- ✅ Semplice da valutare e confrontare.

### 📚 All-Words Task

- Obiettivo: disambiguare **tutte le parole** in un testo.
- Si utilizza un **lessico completo** con sensi per ogni lemma.
- Simile al *part-of-speech tagging*, ma ogni lemma ha un proprio tagset.
- ✅ Più realistico e sfidante.

## 🧠 Metodi per la WSD

### 🔍 1. Supervised Learning

- Richiede **corpora annotati manualmente** (es. SemCor).
- Utilizza tecniche di machine learning (es. SVM, Decision Tree, ecc.).
- ✅ Alta accuratezza
- ❌ Costi alti per l’annotazione

### 🧩 2. Unsupervised Learning

- Non richiede etichette.
- Utilizza **similarità distribuzionale**, clustering, o co-occorrenze.
- ❌ Tipicamente meno accurato
- ✅ Scalabile a nuove lingue

### ⚖️ 3. Minimally Supervised

- Si basa su **annotazioni parziali** o **weak supervision**.
- Esempio: sfruttare glossari, parallel corpora o dizionari bilingue.

### 🤖 4. Neural WSD

- Modelli basati su **reti neurali profonde**, spesso con **word embeddings contestuali** (es. BERT, ELMo).
- Alcuni modelli famosi:
  - **GlossBERT** (legge gloss e contesto con BERT)
  - **Knowledge-based BERT**
- 📎 Paper: [IJCAI 2021 — Neural Word Sense Disambiguation](https://www.ijcai.org/proceedings/2021/593)

## 🔁 Tecniche correlate

La WSD è strettamente legata ad altri compiti semantici:

- 🔗 **[[Entity Linking]]**  
  → associa una menzione in testo a un'entità in una knowledge base (es. Wikidata, DBpedia).  
  → simile alla WSD ma lavora su entità enciclopediche anziché parole comuni.

- 🧠 **[[Ontology Learning]]**  
  → processo automatico di costruzione di **ontologie semantiche** a partire da testo.  
  → le disambiguazioni accurate sono fondamentali per costruire classi e relazioni corrette.

## 🧠 Esempio visivo (placeholder)

📌 *Inserisci qui uno schema che mostri il processo WSD: parola → contesto → selezione tra sensi possibili da WordNet.*

## 📌 Considerazioni finali

La WSD è un **compito centrale nella comprensione semantica del linguaggio naturale**.  
Nonostante sia studiata da decenni, **rimane un problema aperto** in molte lingue e domini, specialmente in contesti rumorosi o low-resource.

> ✨ Una WSD accurata è cruciale per applicazioni NLP avanzate come:  
> → *machine translation*, *question answering*, *text summarization*, *semantic search*, *information extraction* e molto altro.
