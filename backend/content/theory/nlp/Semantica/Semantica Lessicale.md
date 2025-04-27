# 📝 **Semantica Lessicale**

La **semantica lessicale** è una branca fondamentale della linguistica che si occupa dello studio del significato delle parole in una lingua naturale. Per comprendere il significato di una frase o di un testo, è necessario partire dal significato delle singole parole. Questo approccio è essenziale anche nel campo dell'elaborazione del linguaggio naturale (Natural Language Processing), dove la corretta comprensione delle parole è cruciale per l'analisi del significato complessivo di un enunciato.

## Definizioni Fondamentali

Per iniziare, è utile definire alcuni concetti relativi alle parole e ai loro significati:

- **Lessico**: una lista finita di parole di una lingua.
- **Lemma**: la forma grammaticale base di una parola, utilizzata nei dizionari. Ad esempio, "peach" è il lemma di "peaches".
- **Forma della parola**: qualsiasi forma grammaticale di una parola. Ad esempio, "eat", "eats", "ate" sono tutte forme della parola "eat".

### Lemmatizzazione

Il processo di conversione delle forme delle parole nel loro lemma si chiama **lemmatizzazione**. Questo processo non è sempre deterministico, poiché può dipendere dal contesto. Ad esempio, la parola "bind" può avere significati diversi a seconda della frase:

- **Lemma**: bind (constringere)  
  - "They bound the parties to observe neutrality."
  
- **Lemma**: bound (saltare)  
  - "The horses were found to bound across the meadows."

Le forme lessicali possono anche cambiare a seconda della parte del discorso, come nel caso di "purchase":

- "They closed the purchase with a handshake."
- "They are about to purchase a flat."

## Sensi delle Parole

Le parole hanno **sensi** differenti, che possono avere significati diversi a seconda del contesto.

### Monosemia vs. Polisemia

Una parola è **monosemica** se ha un solo significato. Ad esempio:
- Internet
- Plant life

Una parola è **polisemica** se ha più di un significato. Alcuni esempi di parole polisemiche includono:
- **Bank**: può significare "banca" o "sponda del fiume".
- **Plane**: può significare "aereo" o "piano".
- **Bass**: può significare "basso" come in uno strumento musicale, o "basso" come nella specie di pesce.

### Altri Concetti Relativi ai Sensi delle Parole

- **Omonimia**: fenomeno per cui due parole hanno la stessa forma ma significati diversi (ad esempio, "bank" intesa come istituto finanziario e "bank" intesa come sponda di un fiume).
- **Metonimia**: quando una parola viene usata per rappresentare un altro concetto a causa di una relazione di contiguità (ad esempio, "la Casa Bianca ha rilasciato una dichiarazione"). Qui "Casa Bianca" rappresenta **l’amministrazione statunitense** o **il governo degli Stati Uniti**, in quanto sede fisica del potere esecutivo. La relazione non è di somiglianza, ma di prossimità o associazione logica tra luogo e istituzione, contenente e contenuto, strumento e agente, ecc.

    Esempi comuni:
    - "Bevo un bicchiere" → si intende **il contenuto**, non il contenitore.
    - "Ho letto Shakespeare" → si intende **un’opera scritta da Shakespeare**, non la persona fisica.
 
- **Metafora**: l'uso di una parola in un contesto che implica una somiglianza simbolica, come in "un mare di problemi".
- **Personificazione**: attribuire caratteristiche umane a concetti astratti o oggetti inanimati (ad esempio, "Il vento sussurrava tra gli alberi").
- **Sinestesia**: un fenomeno linguistico in cui sensazioni appartenenti a diversi sensi vengono mescolate, come in "un dolce suono".

## Distinzione dei Sensi

Un aspetto centrale della semantica lessicale è come rappresentare i diversi sensi di una parola. Un approccio comune è l'uso di un **inventario fisso dei sensi** di una parola, che enumera tutte le possibili interpretazioni di un termine.

### Esempio di Inventario dei Sensi: "Knife"

Un possibile inventario dei sensi per la parola "knife" potrebbe includere:
1. Un utensile da cucina utilizzato per tagliare.
2. Una lama utilizzata come parte di una macchina.
3. Un'arma tagliente.

La domanda è: dovremmo aggiungere un ulteriore senso per "una lama che fa parte di una macchina"? E, inoltre, i sensi delle parole sono applicabili indipendentemente dal contesto?

## Interpretazione dei Sensi: Questioni Aperte

Un problema aperto nella rappresentazione del significato lessicale è se si debba introdurre **nuovi sensi** ogni volta che una parola viene usata in un contesto leggermente diverso. Ad esempio:

> *Should we add a further sense to the inventory for “a cutting blade forming part of a machine”?*

Oppure, possiamo dire che i sensi sono **astratti e applicabili in modo indipendente dal contesto**?

> *Are word senses application-independent?*

In realtà, le evidenze suggeriscono che i **sensi non sempre hanno confini netti**, ma si distribuiscono lungo un continuum, analogamente all’appartenenza categoriale nella mente umana.

### Graded Word Sense Assignment

Uno studio di riferimento è quello di **Erk e McCarthy (2009)**, in cui si chiede agli annotatori di giudicare **quanto ogni senso** di una parola si applica in un certo contesto, su una scala graduata.

#### Esempio di frase:
> *This question provoked arguments in America about the Norton Anthology of Literature by Women, some of the contents of which were said to have had little value as literature.*

Annotazioni possibili (scala da 1 a 5 per ogni senso):

| Annotatore | Senso 1 | Senso 2 | Senso 3 | Senso 4 | Senso 5 | Senso 6 | Senso 7 |
|------------|---------|---------|---------|---------|---------|---------|---------|
| Ann. 1     |   4     |   5     |   4     |   2     |   1     |   1     |   4     |
| Ann. 2     |   1     |   4     |   5     |   1     |   1     |   1     |   1     |
| Ann. 3     |   ...   |   ...   |   ...   |   ...   |   ...   |   ...   |   ...   |

Questo approccio **sfuma** il concetto di senso, trattandolo come una **funzione continua** più che come una categoria discreta:

$$
\text{Applicabilità}(s_i, c) \in [0, 1] \quad \text{dove } s_i \text{ è il senso } i \text{ e } c \text{ è il contesto}
$$

### Generative Lexicon: L'Approccio di Pustejovsky (1991)

Nel modello del **Generative Lexicon**, i sensi non sono semplicemente enumerati ma **generati** da strutture semantiche regolari, chiamate **strutture qualia**.

#### Esempio: "knife"

$$
\begin{align*}
\text{TYPE}_{\text{STR}} &= 
\begin{bmatrix}
\text{ARG}_1 = \text{x (artefatto, strumento)} \\
\text{ARG}_2 = \text{w (oggetto fisico)} \\
\text{ARG}_3 = \text{y (umano)} \\
\end{bmatrix}\\
\text{QUALIA} &= 
\begin{cases}
\text{FORMAL}: \text{utensile da taglio} \\
\text{CONSTITUTIVE}: \text{lama, manico, ...} \\
\text{TELIC}: \text{funzione di tagliare} \\
\text{AGENTIVE}: \text{atto di produzione, fabbricazione} \\
\end{cases}
\end{align*}
$$

Questa rappresentazione permette di spiegare perché “knife” possa riferirsi a:
- un **utensile da cucina** (focus su TELIC),
- una **parte di una macchina** (focus su FORMAL e CONSTITUTIVE),
- oppure una **lama usata come arma** (focus su uso e contesto pragmatico).

## Codifica dei Sensi delle Parole

### Il Modo Umano: Dizionari

Nel contesto umano, i **dizionari** rappresentano la forma tradizionale per codificare i sensi delle parole. Questi contengono:

- **Lemma**: forma base della parola (es. *dictator*)
- **Pronuncia**: indicazione fonetica
- **Parte del discorso**: (nome, verbo, aggettivo, ecc.)
- **Informazioni morfologiche**
- **Definizioni testuali** (gloss)
- **Informazioni d’uso**: esempi, collocazioni, registri, ecc.

#### Esempio: dal lemma *dictator*

> *Dictator* (n.)  
> 1. A ruler with total power over a country, typically one who has obtained control by force.  
> 2. A person who behaves in an autocratic way.  
> Etimologia: dal latino *dictator*, da *dicere* (“dire, ordinare”).

L'etimologia mostra il collegamento sistematico tra parole con la stessa radice:

$$
\text{dico, dicere, dictus} \Rightarrow \text{dictator, dictation, dictionary, predict, contradict}
$$

Dizionari storici come l’Oxford English Dictionary organizzano i sensi secondo l’evoluzione diacronica, mentre quelli moderni possono usare un ordinamento per frequenza d’uso.

### Il Modo Computazionale

Nel trattamento automatico del linguaggio (NLP), la rappresentazione dei sensi avviene tramite **risorse lessicali strutturate**, come:

#### 1. **Thesauri computazionali**

Liste di parole organizzate per **similarità semantica** (sinonimi, contrari), come nel *Roget’s Thesaurus*.

> Esempio:
> - *booklet, manual, pamphlet, guide, tract, brochure* → gruppo di sinonimi

#### 2. **Dizionari leggibili dalla macchina**  
Rappresentano le versioni digitali dei dizionari cartacei, con struttura formalizzata:

$$
\text{Word} \rightarrow \{ \text{POS}, \text{Senses}, \text{Gloss}, \text{Usage}, \text{Examples} \}
$$

#### 3. **Lessici computazionali**  
Sono risorse più sofisticate, come **WordNet**, **FrameNet** o **VerbNet**, in cui i sensi sono integrati in una rete concettuale:

- Gerarchie semantiche (iperonimia, meronimia)
- Relazioni sintattico-semantiche
- Ruoli tematici

> Esempio in WordNet:
> - *dictator.n.01*: a ruler who is unconstrained by law
> - *dictator.n.02*: a person who behaves in an autocratic way

Le informazioni sono spesso strutturate come **grafi lessicali**:

$$
\text{Synset} = \{ \text{lemma}_1, \text{lemma}_2, ..., \text{gloss}, \text{relations} \}
$$

E le relazioni includono:

- $\text{hypernym}(x)$: categoria generale
- $\text{hyponym}(x)$: sottocategoria
- $\text{meronym}(x)$: parte di x
- $\text{antonym}(x)$: opposto

[[WordNet]] e [[BabelNet]] sono esempi di lessici computazionali, ovvero risorse strutturate che rappresentano informazioni semantiche e sintattiche sulle parole. 

Queste risorse permettono di:

- organizzare i sensi delle parole in insiemi di sinonimi (WordNet),
- collegare concetti attraverso più lingue e fonti enciclopediche (BabelNet),
- supportare compiti di [[Word Sense Disambiguation]] e [[Semantic Similarity]],
- costruire grafi semantici navigabili e interoperabili in applicazioni NLP.

Entrambe le risorse si collocano nel più ampio panorama delle risorse linguistiche computazionali utilizzate nella semantica lessicale computazionale.

### Confronto Umano vs. Computazionale

| Aspetto                  | Dizionari Umani               | Risorse Computazionali             |
|--------------------------|-------------------------------|-------------------------------------|
| Forma                   | Testo naturale                 | Struttura formale / database        |
| Etimologia               | Spesso presente               | Raramente presente                  |
| Definizione              | Esplicita e discorsiva        | Compatta e normalizzata             |
| Relazioni semantiche     | Limitate                      | Esplicite e navigabili              |
| Applicabilità in NLP     | Manuale (per lettura)         | Automatizzabile e scalabile         |

### Domanda Aperta

> **Come rappresentare computazionalmente la polisemia in modo flessibile?**  
La risposta più moderna implica l’uso di **modelli contestuali** come BERT, che assegnano vettori differenti alla stessa parola in contesti diversi:

$$
\text{embedding}(\text{bank}_{\text{financial}}) \neq \text{embedding}(\text{bank}_{\text{river}})
$$

Ciò supera la rigidità degli inventari fissi di sensi.



## Conclusione

La semantica lessicale rappresenta un pilastro teorico e applicativo per lo studio del significato delle parole, tanto in ambito linguistico quanto nell'elaborazione del linguaggio naturale. Abbiamo visto come i sensi delle parole non siano entità statiche e isolate, ma si manifestino come fenomeni dinamici, influenzati dal contesto, dalla pragmatica e dalla struttura concettuale sottostante.

Dagli inventari di sensi discreti ai modelli distribuzionali contestuali, passando per le strutture qualia e le risorse computazionali come [[WordNet]] e [[BabelNet]], il campo mostra una continua evoluzione verso rappresentazioni più flessibili, scalabili e coerenti con la complessità del linguaggio umano.

Nel panorama attuale, comprendere e modellare la polisemia non è più un semplice esercizio accademico, ma una sfida centrale per lo sviluppo di sistemi intelligenti capaci di comprendere, disambiguare e ragionare semanticamente. La semantica lessicale, quindi, non è solo una teoria del significato, ma una chiave per l'accesso computazionale alla comprensione profonda del linguaggio.
