# WordNet

> Fonte: [Miller et al., 1990 — WordNet](https://wordnet.princeton.edu/)

## 🧠 Cos'è WordNet?

WordNet è il **lessico computazionale dell’inglese più diffuso**, sviluppato con l’intento di riflettere teorie psicologiche sul funzionamento mentale del linguaggio.  
È strutturato attorno al concetto di **synset** (set di sinonimi), che rappresenta un **concetto**.

## 🧩 Synsets

- Ogni concetto è rappresentato da un **insieme di parole sinonime** → un *synset*.
- Un *word sense* è l’**occorrenza di una parola in un synset**.

Esempio:

$$
Synset: \{car¹_n, auto^1_n, automobile^1_n, machine^4_n, motorcar^1_n\}
$$

→ $machine^1_n$ in questo contesto è il **quarto senso del sostantivo** “machine”.

## 🚗 Esempio: il caso di *car*

Un esempio classico in WordNet è il lemma **car**. Esistono più synset con questo lemma, ognuno relativo a un significato differente:

$$
\begin{align*}
Synset 1: &\{car¹_n, auto^1_n, automobile^1_n, machine^4_n, motorcar^1_n\}\\
Synset 2: &\{car^2_n, railcar_n^1, railway car_n^1, railroad car_n^1\}\\
Synset 3: &\{cable car_n^1, car_n^3\}\\
Synset 4: &\{car^4_n, gondola_n^3\}\\
Synset 5: &\{car_n^5, elevator car_n^1\}\\
\end{align*}
$$

## 📝 Glosses (Definizioni testuali)

WordNet fornisce una definizione testuale per ogni synset, detta **glossa**:

- **Gloss di car¹**:
  > “a 4-wheeled motor vehicle; usually propelled by an internal combustion engine; 'he needs a car to get to work'”

- **Gloss di car²**:
  > “a wheeled vehicle adapted to the rails of railroad; 'three cars had jumped the rails'”

## 🔗 Relazioni semantiche

WordNet codifica diverse **relazioni semantiche tra synset**:

- **Iperonimia (is-a)**  
  → $car^1_n$ is-a $motor vehicle_n^1$

- **Meronimia (has-a)**  
  → $car^1_n$ has-a $car door^1_n$

- **Altre relazioni semantiche**:
  - Entailment
  - Similarità
  - Attributi

## 🧬 Relazioni lessicali

Anche le relazioni tra i *sensi delle parole* sono modellate:

- **Sinonimia**: parole che condividono un synset  
- **Antonimia**: es. $good$ è antonimo di $bad$  
- **Pertainimia**: es. $dental$ pertains to $tooth$  
- **Nominalizzazione / derivazione**: es. $service$ deriva da $serve$

## 🔄 WordNet come Grafo Semantico

WordNet può essere visto come un **grafo**, in cui i nodi sono synset e gli archi sono relazioni semantiche o lessicali.

📌 **Placeholder per immagine**:

<img src="/static/images/tikz/b06bb0bacf179b9d5af5dd94aeebc520.svg" style="width: 100%; height: auto; max-height: 600px;" class="tikz-svg" />

## 🌐 WordNet come Rete Semantica

Ma WordNet **non è solo un grafo**: è una **rete semantica vera e propria**.

> Una rete semantica è una rappresentazione strutturata della conoscenza, dove i concetti (synset) sono collegati da relazioni semantiche.

📌 **Esempio di Rete Semantica di WordNet**:  
![Schema rete semantica](https://www.researchgate.net/profile/Mohamed-Menai/publication/281892834/figure/fig1/AS:347228821573632@1459797210842/Example-of-a-semantic-network-in-wordnet_W640.jpg)

## 🌍 WordNet in altre lingue

Sebbene WordNet sia stato originariamente progettato per l’**inglese**, sono stati sviluppati diversi progetti per **adattarlo ad altre lingue**:

- **MultiWordNet**: WordNet italiano, allineato semanticamente con l’originale inglese.
- **EuroWordNet**: versioni per più lingue europee, con una struttura concettuale condivisa.
- **BabelNet**: estensione multilingue che unisce WordNet e Wikipedia.

> Queste versioni multilingue permettono confronti e inferenze semantiche cross-lingua, supportando applicazioni come machine translation, question answering e semantic search.

## ⚠️ Limiti di WordNet

Nonostante la sua utilità, WordNet presenta alcuni **limiti strutturali e concettuali**:

- 🏗️ **Costruito manualmente**: la creazione e l’aggiornamento dei synset avviene tramite lavoro umano → costoso e lento.
- 🔍 **Copertura limitata**: include soprattutto parole comuni e ben definite; mancano molti termini tecnici, neologismi, slang o forme idiomatiche.
- 🌐 **Poche lingue disponibili**: solo alcune lingue sono coperte da versioni ufficiali; molte lingue del mondo non hanno una risorsa WordNet completa.
- 📚 **Rigidità strutturale**: le relazioni sono fisse e gerarchiche; difficile modellare ambiguità, polisemia o uso contestuale.
- 🔄 **Non adatto a tutte le applicazioni**: ad esempio, in ambiti come sentiment analysis o text classification, approcci basati su word embeddings o transformer offrono prestazioni migliori.

## 📌 Conclusione

WordNet rappresenta una **risorsa lessicale fondamentale** per il trattamento automatico del linguaggio, con applicazioni importanti in analisi semantica, disambiguazione, IR e NLP in generale.

Tuttavia, le sue **limitazioni strutturali** e la **copertura ristretta** hanno spinto la comunità a esplorare **approcci distribuiti** (es. Word2Vec, GloVe, BERT) e **reti semantiche più ampie e aggiornate** (es. BabelNet, ConceptNet).

> 🧠 WordNet resta una pietra miliare nello studio del significato linguistico e nella costruzione di sistemi intelligenti basati sulla semantica.
