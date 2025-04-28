# Introduzione alla semantica vettoriale

## Significato delle parole e relazioni semantiche

Il concetto di **significato** delle parole è uno dei pilastri fondamentali della linguistica, della semantica e, più recentemente, dell'elaborazione del linguaggio naturale.  
Comprendere come rappresentare il significato delle parole in forma computazionale è cruciale per lo sviluppo di sistemi in grado di interpretare, analizzare e generare linguaggio umano.

Una nozione importante è quella di **similarità semantica**: parole che condividono alcuni elementi di significato sono considerate semanticamente simili.  
**Tuttavia**, essere semanticamente simili **non implica** necessariamente essere sinonimi.

Esempi:
- "car" e "bicycle" sono semanticamente simili perché entrambi rappresentano veicoli per il trasporto personale, ma non sono sinonimi.
- "lion" e "bear" sono entrambi grandi mammiferi carnivori, condividendo alcune caratteristiche biologiche e comportamentali.

**Distinzione chiave**:  
- **Semantic similarity** implica una **condivisione strutturale o categoriale** di significato.
- **Semantic relatedness** è più ampia: include qualsiasi tipo di relazione concettuale o associativa, anche tra entità non simili.

Esempi:
- "car" e "bicycle" → **simili** (entrambi mezzi di trasporto).
- "car" e "gasoline" → **correlati**, ma **non simili** (relazione funzionale: un'auto usa benzina, ma una benzina non è un veicolo).

Questa distinzione tra similarità e correlazione semantica è fondamentale nello sviluppo di modelli computazionali per il linguaggio, soprattutto quando si progettano algoritmi di misura della similarità tra parole o documenti.

## Relazioni semantiche lessicali: iperonimia e iponimia

Le **relazioni lessicali** strutturano il lessico di una lingua in reti concettuali. Due tra le relazioni principali sono:

### Iperonimia

Un **iperonimo** (*hypernym*) è un termine che rappresenta una **categoria più generale** rispetto ad altri termini più specifici.

Esempi:
- "vehicle" è l'iperonimo di "bicycle" e "car".
- "fruit" è l'iperonimo di "apple" e "banana".

Formalmente, possiamo pensare la relazione di iperonimia come una **inclusione**:

$$
\begin{align*}
\text{vehicle} &\supset \text{bicycle}\\
\text{fruit}   &\supset \text{apple}
\end{align*}
$$

cioè, tutto ciò che è una "bicycle" è anche un "vehicle", e tutto ciò che è un "apple" è anche un "fruit".

### Iponimia

Un **iponimo** (*hyponym*) è invece un termine più specifico, che rappresenta un **sottoinsieme** del concetto espresso dall'iperonimo.

Esempi:
- "banana" è un iponimo di "fruit".
- "car" è un iponimo di "vehicle".

La distinzione tra iperonimia e iponimia è essenziale per la costruzione di ontologie, tassonomie e per l'inferenza semantica automatica.

Formalmente, possiamo pensare la relazione di iponimia come una **inclusione**:

$$
\begin{align*}
\text{bicycle} &\subset \text{vehicle}\\
\text{apple}   &\subset \text{fruit}
\end{align*}
$$

cioè, tutto ciò che è una "bicycle" è anche un "vehicle", e tutto ciò che è un "apple" è anche un "fruit".

## L'approccio enumerativo ai significati delle parole

Tradizionalmente, il significato delle parole è stato trattato attraverso inventari predefiniti di **sensi**.   Ogni parola è associata a un elenco finito di possibili interpretazioni.

Esempio:  
**"Knife"** (sostantivo) può essere descritto con i seguenti sensi:
1. Strumento da taglio con lama affilata e manico.
2. Arma bianca con lama appuntita.
3. Proiezione lunga e sottile (es. in un fenomeno naturale o tecnologico).

In questo approccio, si assume che ogni volta che una parola viene usata in un testo, **venga attivato uno specifico senso** tra quelli elencati.

Esempi:
- "She chopped the vegetables with a chef’s knife." ➔ Senso: **strumento da cucina**.
- "A man was beaten and cut with a knife." ➔ Senso: **arma**.

## Limiti dell'approccio enumerativo

Nonostante la sua utilità pratica, l'approccio enumerativo presenta numerosi limiti:

- **Dinamismo linguistico**: le lingue naturali evolvono continuamente, generando nuovi usi e significati che un inventario fisso non può catturare.
- **Ambiguità di confine**: esistono usi intermedi o nuovi di una parola che non si adattano bene ai sensi predefiniti.  
  Esempio: una lama di taglio all'interno di una macchina industriale è un nuovo senso di "knife"?
- **Dipendenza dal contesto**: il significato attuale di una parola può variare enormemente a seconda del dominio applicativo (es. "server" in informatica vs. "server" come cameriere).
- **Impossibilità di enumerazione completa**: è praticamente impossibile prevedere **tutti** i sensi che una parola può assumere nel corso del tempo.

## Una prospettiva alternativa: il significato basato sull'uso

A fronte delle difficoltà dell'approccio enumerativo, una corrente alternativa propone che il significato **emerga dall'uso** della parola nei vari contesti.

Principi fondamentali:
- **Ludwig Wittgenstein** (1945):  
  > "Il significato di una parola è il suo uso nel linguaggio."
- **Zellig Harris** (1954):  
  > "Se due parole hanno ambienti linguistici quasi identici, possiamo considerarli sinonimi."
- **John Firth** (1957):  
  > "Conoscerai una parola dalla compagnia che mantiene."

Questa visione pone il **contesto** come elemento centrale nella costruzione del significato.

## L'ipotesi distribuzionale

L'**ipotesi distribuzionale** formalizza la visione basata sull'uso:


>Parole che appaiono in contesti simili tendono ad avere significati simili.
>[**Harris**, 1954]

Questa idea, semplice ma potente, ha aperto la strada a tutta la moderna semantica computazionale e alla rappresentazione vettoriale del significato delle parole.

### Interpretazione pratica

Osservando **quali parole tendono a co-occorre** nei testi, possiamo inferire la loro relazione semantica.  
Non serve conoscere a priori il significato "reale" delle parole: il loro comportamento linguistico ne rivela le proprietà semantiche.

## Esempio illustrativo: scoprire il significato di "ong choi"

Supponiamo di non sapere cosa sia **ong choi**.  
Tuttavia, leggiamo queste frasi:
- "Ong choi is delicious sautéed with garlic."
- "Ong choi is superb over rice."
- "Ong choi leaves with salty sauces."

Confrontiamo ora frasi simili su parole note:
- "Spinach sautéed with garlic over rice."
- "Chard stems and leaves are delicious."
- "Collard greens and other salty leafy greens."

**Osservazione**:  
I contesti di **ong choi** sono simili a quelli di **spinach**, **chard**, e **collard greens**, tutte verdure a foglia verde.

**Inferenza**:  
Senza una definizione esplicita, possiamo dedurre che **ong choi** è probabilmente un tipo di **vegetale a foglia verde**, simile agli altri.

# Collegamenti correlati

- [[Modelli di Spazio Semantico]]
- [[Misure di similarità vettoriale]]
- [[Tecniche di pesatura (TF-IDF, PMI)]]
- [[Problemi dei modelli vettoriali]]
