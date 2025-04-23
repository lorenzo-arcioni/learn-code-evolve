# Introduzione alla Sintassi nel NLP

La **sintassi** studia la struttura delle frasi e le relazioni grammaticali tra le parole. Nell'elaborazione del linguaggio naturale (NLP), la sintassi è fondamentale per comprendere e generare testi corretti e significativi.

## 🧠 Esempio di struttura sintattica

Considera la frase:

> *Il gatto mangia il pesce.*

Questa frase può essere rappresentata sintatticamente come:

- **S → NP VP**  
  - NP → Det N (*Il gatto*)  
  - VP → V NP (*mangia il pesce*)  
  - NP → Det N (*il pesce*)

Questa struttura mostra come i costituenti si combinano per formare una frase completa, secondo regole grammaticali.

## 🧩 Temi principali

Ecco una panoramica dei concetti chiave che verranno esplorati nelle note collegate:

- [[Grammatiche formali]] e [[Grammatiche context-free]]: fondamenta teoriche per la descrizione della struttura sintattica.
- [[Forma normale di Chomsky]]: trasformazione utile per semplificare l'elaborazione automatica delle grammatiche.
- [[Grammatiche a costituenti vs. Grammatiche a dipendenze]]: due approcci principali alla rappresentazione della struttura frasale.
- [[Ambiguità sintattica]]: problematiche legate a frasi con interpretazioni multiple.
- [[Treebank]]: collezioni di frasi annotate sintatticamente, usate per l’addestramento e la valutazione dei parser.
- [[Parsing sintattico]]: processo di analisi della struttura sintattica di una frase.
- Algoritmi di parsing:
  - [[Algoritmo CKY (Cocke-Kasami-Younger)]] e [[Algoritmo di Earley]]: metodi classici per il parsing di grammatiche libere da contesto.
- [[Grammatiche context-free probabilistiche]] e [[Algoritmo CKY probabilistico]]: estensioni probabilistiche dei modelli sintattici per gestire l’ambiguità in modo statistico.

Consulta ciascuna nota per approfondimenti specifici.
