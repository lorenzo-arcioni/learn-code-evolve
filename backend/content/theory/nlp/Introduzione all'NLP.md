# Introduzione al Natural Language Processing (NLP)

## Cos'è il Natural Language Processing?
- **Definizione**: Campo interdisciplinare che studia l'interazione tra computer e linguaggi umani (es. inglese, italiano) attraverso testo o voce.
- **Obiettivo**: Sviluppare algoritmi per comprendere, generare e manipolare il linguaggio naturale.
- **Esempi di applicazioni**:
  - Assistenti vocali (Siri, Alexa).
  - Correzione ortografica (Grammarly).
  - Traduzione automatica (Google Translate).
  - Autocompletamento nei motori di ricerca.

## Componenti Fondamentali
### Linguistica
- **Sottocampi**:
  1. **Fonetica**: Studio dei suoni linguistici.
  2. **Fonologia**: Sistemi di suoni nelle lingue.
  3. **Morfologia**: Struttura delle parole.
  4. **Sintassi**: Struttura delle frasi.
  5. **Semantica**: Significato delle frasi.
  6. **Pragmatica**: Uso del linguaggio in contesti specifici.

### Informatica
- Integra conoscenze linguistiche con:
  - **Intelligenza Artificiale** (ragionamento, apprendimento).
  - **Machine Learning** (modelli statistici, deep learning).

## Milestone Storiche nell'NLP
1. **Sistemi basati su regole** (es. regex per estrazione dati):
   - Automatizano semplici task come l'estrazione di dati strutturati (come date, nomi, etc..) da quelli non strutturati (come pagine web, email, etc..).
   - Limitati nella generalizzazione, in quanto poco robusti e semplici.
2. **Modelli statistici e ML classico** (es. Naive Bayes):
   - Possono risolvere problemi più complessigrazie a modelli statistici e probabilistici.
   - Tramite la feature engineering, riescono a sfruttare bene i pattern nei dati di addestramento per fare previsioni accurate su dati mai visti.
3. **Deep Learning** (es. word2vec, BERT):
   - Generalizzano anche meglio dei classici approcci di machine learning. Non necessitano di caratteristiche create manualmente o di feature engineering perché funzionano automaticamente come estrattori di feature, consentendo l'addestramento end-to-end del modello.
   - Le capacità di apprendimento dei modelli di deep learning sono più potenti rispetto a quelle dei modelli ML classici/superficiali, il che ha aperto la strada al raggiungimento dei punteggi più elevati in varie impegnative task di NLP (ad esempio, la traduzione automatica).

## Rappresentazioni del Testo
- **One-Hot Encoding**: 
  - Vettori binari che codificano le parole come sequenze di 0 e 1 in base al vocabolario.
  - Esempio: "Il gatto è sul tappeto" → matrici binarie.
  
    Questo approccio presenta due svantaggi significativi:
    - **Sparsità**: I vettori risultano molto lunghi e con molti zeri (alta dimensionalità) se il vocabolario e la lunghezza del testo sono grandi.
    - **Mancanza di Relazioni Semantiche**: Non è in grado di comprendere le relazioni tra le parole (ad esempio, "scuola" e "libro").
- **Word Embeddings** (es. word2vec, GloVe):
  - Questo modello di deep learning superficiale (shallow) è in grado di rappresentare le parole come vettori densi e catturare relazioni semantiche tra termini correlati (ad esempio, "Parigi" e "Francia", "Madrid" e "Spagna"). 
  - Vettori densi che catturano relazioni semantiche (es. "Parigi → Francia").
- **Modelli Transformer** (es. BERT, GPT):
  - Stato dell'arte nei problemi di NLP moderni.
  - Base per NLP avanzato (es. ChatGPT).

## NLP Multimodale  
- **Definizione**: Estensione del NLP tradizionale che combina dati testuali con altre modalità (immagini, audio, video) per migliorare la comprensione contestuale.  
- **Obiettivo**: Creare modelli in grado di interpretare e generare contenuti integrando informazioni multimodali (es. descrivere un'immagine o rispondere a domande su un video).  
- **Esempi di applicazioni**:  
  - Generazione di descrizioni testuali da immagini (image captioning).  
  - Sistemi di risposta a domande basate su video (video QA).  
  - Assistenti virtuali che interpretano comandi vocali e contesto visivo.  
- **Vantaggi**:  
  - Maggiore ricchezza informativa grazie alla fusione di fonti eterogenee.  
  - Miglioramento delle prestazioni in task complessi (es. riconoscimento di emozioni da testo + tono vocale).  
- **Sfide**:  
  - Allineamento tra modalità diverse (es. sincronizzare testo parlato con frame video).  
  - Complessità computazionale nell'elaborazione parallela di dati multimodali.  
- **Modelli Rappresentativi**:  
  - CLIP (OpenAI): Classifica immagini basandosi su descrizioni testuali.  
  - DALL-E (OpenAI): Genera immagini da prompt testuali.  
  - Whisper (OpenAI): Trascrizione e traduzione multimodale (audio → testo → altre lingue).

## Task e Sfide nell'NLP
### Task Risolti
- Classificazione del testo (es. spam detection).
- Part-of-Speech Tagging (POS).
- Named Entity Recognition (NER).

### Sfide Aperte
- Chatbot a dominio aperto.
- Riassunto astrattivo.
- NLP per lingue a bassa risorsa (es. lingue africane).

## Risorse
- **Libri**: [Speech and Language Processing (Jurafsky & Martin)](https://web.stanford.edu/~jurafsky/slp3/).
- **Articoli**: 
  - [word2vec (Mikolov et al., 2013)](https://arxiv.org/abs/1301.3781).
  - [BERT (Devlin et al., 2019)](https://arxiv.org/abs/1810.04805).

> **Etichetta**: #NLP #Linguistica #AI  
> **Collegamenti**: [[Machine Learning]], [[Deep Learning]]
