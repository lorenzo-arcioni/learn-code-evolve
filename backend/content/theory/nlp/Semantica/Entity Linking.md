# 🧠 Entity Linking: Collegare il testo alla conoscenza

## Cos'è l'Entity Linking?

L'Entity Linking (EL), anche noto come Named Entity Disambiguation (NED), è una tecnica del Natural Language Processing (NLP) che collega entità menzionate in un testo (come persone, luoghi, organizzazioni, ecc.) a entità univoche contenute in una base di conoscenza strutturata, come Wikipedia, Wikidata o DBpedia.

In altre parole, l'obiettivo è riconoscere **a chi o a cosa si riferisce una certa parola o frase** nel testo, e poi **associare quella parola/frase a un'entità specifica e unica** nella base di conoscenza.

## ✏️ Esempio semplice

Testo:
> "Paris è la capitale della Francia."

Qui "Paris" potrebbe riferirsi:
- Alla **città di Parigi** 🇫🇷
- A una **persona di nome Paris** (es. Paris Hilton)
- A **Paris**, personaggio della mitologia greca 🏛️

L'Entity Linking aiuta a determinare il significato corretto in base al contesto. In questo caso, "Paris" viene collegato all'entità **"Parigi (città)"** nella base di conoscenza.

## ⚙️ Fasi principali del processo

1. **Named Entity Recognition (NER)**  
   Identificare nel testo le frasi o parole che potrebbero rappresentare un'entità (es. "Paris", "Francia").

2. **Candidate Generation**  
   Per ogni entità trovata, generare una lista di possibili corrispondenze nella base di conoscenza.  
   Esempio: "Paris" → {Parigi (città), Paris Hilton, Paris (mitologia)}.

3. **Entity Disambiguation**  
   Usare il contesto per scegliere la corrispondenza più corretta tra i candidati.  
   Esempio: la parola "capitale" vicino a "Paris" suggerisce che ci si riferisca alla città.

<br>

![](https://upload.wikimedia.org/wikipedia/commons/3/34/Entity_Linking_-_Example_of_pipeline.png)

## 🎯 Obiettivo finale

Associare ogni menzione nel testo a un identificatore univoco, come una pagina di Wikipedia o un ID in Wikidata.  
Questo rende il testo **semanticamente arricchito**, permettendo applicazioni più avanzate come:
- Risposte automatiche a domande
- Riassunti intelligenti
- Ricerca semantica

## 📚 Esempi di basi di conoscenza usate

- **Wikipedia** → link a pagine specifiche
- **Wikidata** → entità con ID univoci (es. Q90 per Parigi)
- **DBpedia** → estrazione strutturata da Wikipedia

## 🧩 Differenza con Named Entity Recognition (NER)

- NER si limita a **identificare** e **classificare** le entità (es. "Paris" → LOC = luogo)
- EL va oltre: **collega** "Paris" a una voce unica e specifica in una base di conoscenza

## 💡 Esempio pratico con output desiderato

**Testo**:  
"Paris è la capitale della Francia."

**Output di Entity Linking**:
- "Paris" → [Parigi (città)](https://it.wikipedia.org/wiki/Parigi)
- "Francia" → [Francia](https://it.wikipedia.org/wiki/Francia)

## 🛠️ Applicazioni

- Motori di ricerca più intelligenti
- Sistemi di raccomandazione
- Assistenti vocali
- Analisi di testi giornalistici o scientifici
