# Grammatiche formali

Le **grammatiche formali** sono sistemi matematici usati per descrivere la struttura delle frasi in un linguaggio. In linguistica computazionale e NLP, sono fondamentali per rappresentare la sintassi di un linguaggio naturale o artificiale in modo preciso e computabile.

## ✍️ Definizione

Una grammatica formale è composta da:

- **Un insieme finito di simboli terminali** (alfabeto) — i simboli che compaiono nelle frasi generate.
- **Un insieme finito di simboli non terminali** — rappresentano categorie sintattiche (es. frase, sintagma nominale).
- **Un simbolo iniziale** — da cui parte la derivazione (es. S per *sentence*).
- **Un insieme di regole di produzione** — definiscono come i simboli possono essere riscritti.

Una regola di produzione ha tipicamente la forma:

$$
A \rightarrow \alpha
$$


dove $A$ è un simbolo non terminale e $\alpha$ è una stringa di terminali e/o non terminali.

## 🧱 Gerarchia di Chomsky

Noam Chomsky ha classificato le grammatiche formali in una gerarchia (detta [[Gerarchia di Chomsky|gerarchia di Chomsky]]) in base alla potenza espressiva:

1. [[Grammatiche Regolari]] (Tipo 3)  
2. [[Grammatiche Context-free]] (Tipo 2)  
3. [[Grammatiche Context-sensitive]] (Tipo 1)  
4. [[Grammatiche non limitate]] (Tipo 0)

Ogni classe superiore include la precedente, offrendo maggiore espressività, ma anche maggiore complessità computazionale.

## 📐 Applicazioni nel NLP

Le grammatiche formali sono utilizzate per:

- Analisi sintattica (parsing) di frasi in linguaggio naturale.
- Progettazione di parser per linguaggi di programmazione.
- Costruzione di strumenti grammaticali (correttori, traduttori).
- Modellazione del comportamento linguistico in modo formalizzato.

## 📚 Collegamenti utili

- [[Grammatiche libere dal contesto]]
- [[Forma normale di Chomsky]]
- [[Parsing sintattico]]
- [[Ambiguità sintattica]]
- [[Grammatiche probabilistiche libere dal contesto]]

---

📌 *Le grammatiche formali forniscono un ponte tra linguistica teorica e implementazioni computazionali. Sono la base per molte tecniche avanzate di NLP.*
