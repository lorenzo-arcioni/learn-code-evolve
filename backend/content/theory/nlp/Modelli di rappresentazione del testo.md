# Modelli di Rappresentazione del Testo

In NLP (Natural Language Processing), i modelli di rappresentazione del testo sono fondamentali per trasformare le parole in forme numeriche utilizzabili dagli algoritmi di Machine Learning e Deep Learning. Esistono diverse tecniche, dalle più semplici alle più avanzate, ciascuna con vantaggi e limitazioni.

## One-Hot Encoding

### Funzionamento
- Ogni parola di un corpus viene rappresentata come un vettore binario.
- La lunghezza del vettore è pari alla dimensione del vocabolario.
- Solo una posizione del vettore è impostata a 1 (indicando la parola), mentre tutte le altre sono 0.

### Limiti
- **Sparsità**: Poiché il vocabolario può essere molto grande, i vettori risultano molto lunghi e con molti zeri (alta dimensionalità).
- **Mancanza di relazioni semantiche**: Non vi è alcuna informazione sulla similarità tra parole. Ad esempio, "gatto" e "felino" non hanno alcuna relazione esplicita nella rappresentazione one-hot.

## Word Embeddings

Word embeddings sono vettori densi che rappresentano le parole in uno spazio continuo di dimensioni ridotte. Questo permette di catturare relazioni semantiche tra parole simili.

### **word2vec** (Mikolov et al., 2013)
- Utilizza reti neurali shallow per apprendere rappresentazioni densi e continue delle parole.
- Due principali architetture:
  - **CBOW (Continuous Bag of Words)**: Predice una parola data una finestra di contesto.
  - **Skip-gram**: Predice il contesto data una parola centrale.
- Cattura analogie semantiche: ad esempio, la relazione vettoriale tra "re" e "uomo" è simile a quella tra "regina" e "donna" (operazioni vettoriali: `re - uomo + donna ≈ regina`).

### **BERT** (Devlin et al., 2019)
- Basato sull'architettura Transformer.
- Apprendimento **bidirezionale**: a differenza di modelli precedenti come word2vec, BERT tiene conto del contesto sia a sinistra che a destra della parola target.
- Addestrato su grandi quantità di testo utilizzando due compiti principali:
  - **Masked Language Model (MLM)**: alcune parole sono nascoste e il modello deve predirle.
  - **Next Sentence Prediction (NSP)**: il modello apprende relazioni tra frasi consecutive.
- Ampiamente utilizzato per il fine-tuning su vari compiti NLP come classificazione del testo, Named Entity Recognition (NER) e question answering.

## Architetture Avanzate

### **GPT (Generative Pre-trained Transformer)**
- Modello basato su Transformer **unidirezionale**.
- Pre-addestrato su grandi corpus di testo e fine-tunato per la generazione di testo.
- Usato per applicazioni come chatbot, completamento automatico e scrittura assistita.

### **T5 (Text-to-Text Transfer Transformer)**
- Approccio task-agnostic: tutti i problemi NLP vengono convertiti in un formato di input/output testuale.
- Esempi di task:
  - **Traduzione**: "Translate English to French: How are you?" → "Comment ça va?"
  - **Riassunto**: "Summarize: Questo articolo discute..." → "L'articolo tratta di..."
- Molto flessibile e utilizzato per diverse applicazioni NLP avanzate.

## Conclusione
I modelli di rappresentazione del testo si sono evoluti notevolmente nel tempo, passando da semplici tecniche basate su vettori binari a potenti architetture di deep learning. La scelta del modello dipende dal compito specifico e dalle risorse computazionali disponibili.

---

**Etichette**: #NLP #WordEmbeddings #Transformer  
**Collegamenti**: [[Deep Learning]], [[Introduzione all'NLP]]
