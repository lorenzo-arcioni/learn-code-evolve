# 🌐 BabelNet

> Fonte: [Navigli and Ponzetto, 2012 – *BabelNet: The automatic construction, evaluation and application of a wide-coverage multilingual semantic network*](https://aclanthology.org/P10-1023/)

## 🧠 Cos’è BabelNet?

**BabelNet** è una **rete semantica e lessicale multilingue** automatica, costruita con l’obiettivo di superare le limitazioni di WordNet in termini di copertura linguistica e aggiornamento.  
È una delle risorse più complete al mondo per il trattamento del significato nelle lingue naturali, unendo informazioni **enciclopediche e lessicali** in un unico grafo semantico.

BabelNet integra:

- 🧾 **WordNet** → per il lessico strutturato e le relazioni semantiche
- 📘 **Wikipedia** → per la conoscenza enciclopedica aggiornata
- 📚 **OmegaWiki**, Wiktionary, Wikidata, e altri database linguistici e semantici

📎 Sito ufficiale: [https://babelnet.org](https://babelnet.org)

## 🔧 Come funziona BabelNet?

BabelNet costruisce automaticamente un **grafo semantico multilingue**, i cui **nodi** sono chiamati **BabelSynset** e rappresentano un concetto o un entità, mentre gli **archi** esprimono relazioni semantiche o lessicali.

Ogni **BabelSynset** include:

- Sinonimi in diverse lingue
- Definizioni (*glosses*)
- Relazioni semantiche e lessicali
- Collegamenti a concetti di WordNet e voci enciclopediche di Wikipedia

## 📚 Esempio di BabelSynset

Un BabelSynset relativo al concetto di “car” potrebbe includere:

- Sinonimi: *car (en)*, *automobile (en)*, *voiture (fr)*, *Auto (de)*, *macchina (it)*, *汽车 (zh)*, ...
- Definizione (gloss): "A road vehicle, typically with four wheels, powered by an internal combustion engine..."
- Relazioni: is-a (hypernym), has-part (meronym), related-to, etc.
- Link a Wikipedia e WordNet

## 🌍 Copertura linguistica e dimensioni

BabelNet è progettato per essere **multilingue e ad alta copertura**.  
Le dimensioni della rete (aggiornamento 2023) sono impressionanti:

| Caratteristica                  | Valore                                      |
|--------------------------------|---------------------------------------------|
| 🌐 Lingue supportate           | 284                                         |
| 📄 BabelSynset (concetti)      | ~16 milioni                                 |
| 🔠 Lemmi totali                | > 20 milioni                                |
| 📚 Glossari                    | > 1 miliardo di parole nei gloss totali     |
| 🔗 Relazioni semantiche        | centinaia di milioni                        |

## 🕸️ Struttura di BabelNet

BabelNet è un **grafo orientato**, dove ogni nodo è un BabelSynset e ogni arco è una relazione semantica.

📌 **Schema Principale**:  

![Schema BabelNet](https://upload.wikimedia.org/wikipedia/commons/6/63/The_BabelNet_structure.png)

## 🧪 Applicazioni

BabelNet è utilizzato in molteplici contesti NLP:

- 🌐 **Word Sense Disambiguation** (disambiguazione del significato)
- 🔍 **Question Answering** multilingue
- 📊 **Information Retrieval** semantico
- 🏷️ **Tagging semantico**
- 🌱 **Linked Open Data** e knowledge graphs
- 🧠 **Machine Translation** e cross-lingual NLP
- 🤖 **Chatbot e sistemi intelligenti**

## 💬 Vantaggi principali

- ✅ **Ampia copertura linguistica e concettuale**
- ✅ **Unione di fonti lessicali e enciclopediche**
- ✅ **Aggiornamento automatico grazie a Wikipedia**
- ✅ **Utilizzabile per NLP, IR, AI e applicazioni semantiche complesse**

## ⚠️ Limitazioni

- 🐢 **Grandezza del grafo** → costi computazionali alti per alcune applicazioni
- 🔍 **Ambiguità nei link Wikipedia-WordNet** → possibile rumore semantico
- 🔒 **Licenza**: l’uso di BabelNet per scopi commerciali richiede una licenza specifica

## 📌 Conclusione

BabelNet rappresenta un passo avanti rispetto a WordNet, con una copertura estesa a **quasi tutte le lingue del mondo** e un’integrazione con risorse enciclopediche.  
È uno strumento fondamentale per tutte le applicazioni semantiche **multilingue** e **cross-lingua** nel campo del Natural Language Processing moderno.

> ✨ In sintesi: **una delle più grandi e ricche reti semantiche mai costruite**.

