# Espressioni Regolari (Regex)

## Cosa sono le Regex?
- **Definizione**: Sequenze di caratteri che definiscono un pattern di ricerca, utilizzate per individuare, estrarre o sostituire testo. Fanno parte dei **rule-based systems**.
- **Scopo principale**: Automatizzare operazioni di testo complesse (es. validare email, estrarre dati).
- **Esempi di utilizzo**:
  - Ricerca di parole chiave in documenti.
  - Pulizia di dataset testuali.
  - Sostituzioni avanzate in editor di codice.
- **Pattern Matching**: Processo di identificazione di sequenze testuali che corrispondono a un formato specifico definito dal pattern. Le regex permettono di cercare, validare o estrarre porzioni di testo seguendo regole flessibili (es. trovare tutti i numeri in un documento).

## Strumenti per Testare le Regex
- **Regex101** ([link](https://regex101.com/)): Piattaforma web con debugger integrato e spiegazioni dettagliate.
- **Python** (`re` module): Libreria standard per manipolare regex ([esempi](https://www.programiz.com/python-programming/regex)).
- **Java**: Utilizza `java.util.regex` per operazioni avanzate ([guide](https://www.w3schools.com/java/java_regex.asp)).
- **Perl**: Linguaggio storico per regex, con operatori come `s///` per sostituzioni.

## Sintassi Base delle Regex

### Come Funziona il Pattern Matching  
Il pattern matching con regex si basa su regole di sintassi che combinano:  
- **Caratteri letterali**: Cercano corrispondenze esatte (es. `cane` trova solo "cane").  
- **Quantificatori**: Specificano quante volte un elemento può ripetersi (es. `?`, `+`, `*`).  
- **Ancore**: Definiscono la posizione nel testo (es. `^` per l'inizio riga, `\$` per la fine).  
- **Classi di caratteri**: Raggruppano opzioni valide (es. `[aeiou]` per vocali).
- **Range**: Definiscono un intervallo di caratteri (es. `[a-z]` per lettere minuscole).
- **Gruppi**: Isolano parti del pattern con `()` per riferimenti o operazioni specifiche.  
- **Alternanza**: Permettono scelte tra opzioni con `|` (es. `gatto|cane`).  
- **Escape**: I metacaratteri speciali (es. `.`, `*`) richiedono `\` per essere cercati letteralmente (es. `\.`).  

### Caratteri Letterali
- **Caratteri Literali**: `a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`, `i`, `j`, `k`, `l`, `m`, `n`, `o`, `p`, `q`, `r`, `s`, `t`, `u`, `v`, `w`, `x`, `y`, `z`.
- **Caratteri Numerici**: `0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`. 
- **Caratteri Speciali**: `\space`, `\t`, `\n`, `\r`, `\f`, `\b`, `\a`, `\e`, `\0`, `\xHH`, `\uHHHH`, `\UHHHHHHHH`.
- **Carattere di Escape**: `\`, `\\`, `\n`, `\t`, `\r`, `\f`, `\b`, `\a`, `\e`, `\0`, `\xHH`, `\uHHHH`, `\UHHHHHHHH`.

### Metacaratteri
| Simbolo | Funzione | Esempio |
|---------|----------|---------|
| `[]`    | Definisce un set di caratteri ammessi. | `[Aa]mico` → "Amico" o "amico" |
| `^`     | 1) Negazione dentro `[]`.<br>2) Inizio della riga. | `[^a-z]` → Non lettere minuscole.<br>`^Ciao` → "Ciao" solo all'inizio. |
| `?`     | Zero o una occorrenza del carattere precedente. | `colou?r` → "color" o "colour" |
| `.`     | Qualsiasi carattere (tranne newline). | `b.t` → "bat", "b@t", "b3t" |
| `*`     | Zero o più occorrenze del carattere precedente. | `lo*l` → "ll", "lol", "loooool" |
| `+`     | Una o più occorrenze del carattere precedente. | `a+` → "a", "aa", "aaa" |
| `{n,m}` | Da `n` a `m` occorrenze. | `a{2,4}` → "aa", "aaa", "aaaa" |

### Alias Utili
- `\d`: Cifra numerica (`[0-9]`).
- `\w`: Carattere alfanumerico o underscore (`[a-zA-Z0-9_]`).
- `\s`: Spazio bianco (spazio, tab, newline).
- `\b`: Inizio o fine di una parola.
- `\D`, `\W`, `\S`, `\B`: Negazioni dei precedenti.
- `\n`: Newline.
- `\t`: Tab.
- `\r`: Carattere di ritorno.
- `\f`: Carattere di fine riga.
- `\*`, `\+`, `\?`: Alias per `*`, `+`, `?`.

## Gruppi di cattura
Le **parentesi tonde** `()` nelle espressioni regolari vengono utilizzate per definire **gruppi di cattura**. Questi gruppi possono essere utilizzati per riferirsi ai sottostringhe cercate e per eseguire operazioni di sostituzione.

### Esempio
```regex
/(\w+) (\w+)/
```
Questa espressione cerca due parole separati da uno spazio. Se applicata alla stringa "Nome Cognome", cattura "Nome" e "Cognome".


## Esercizio Guidato: Trovare la Parola "the"
1. **Primo tentativo**: `/the/ → Trova "the" ma anche "there", "other" (falsi positivi).**
2. **Matching case-insensitive**: `/[tT]he/ → Trova "The" e "the".`
3. **Evitare parole contenenti "the"**:  
   `/[^a-zA-Z][tT]he[^a-zA-Z]/ → " the " in "Catch the ball"` ma non in `Mathematic`. 

4. **Pattern avanzato**:  
   `/(^|[^a-zA-Z])[tT]he([^a-zA-Z]|$)/ → Considera inizio/fine riga.`<br>
   Cerca la parola "the" o "The" solo quando isolata (circondata da caratteri non alfabetici, spazi, punteggiatura, inizio/fine riga) compresi quando inizia o finisce una frase.

**Problemi comuni**:
- **Falsi positivi**: Match indesiderati (es. "there").
- **Falsi negativi**: Mancato match di "The" all'inizio frase.
- **Bilanciamento**: Aumentare la **precisione** (ridurre falsi positivi) e il **recall** (ridurre falsi negativi).

## Registri (Parentesi per Riferimenti)

Le **parentesi tonde** `()` registrano le occorrenze trovate nelle espressioni regolari in dei cosi detti **registri**.

### Sintassi di Base
Un gruppo di cattura è definito con `()` e può essere richiamato con `\n`, dove `n` è il numero del gruppo nell'ordine in cui compare.

**Esempio**:
```regex
/(\d+)-(\d+)/
```
Questa regex cattura due numeri separati da un trattino `-`:
- `\1` si riferisce al primo numero.
- `\2` si riferisce al secondo numero.

Se applicata alla stringa `2023-2024`, cattura `2023` come `\1` e `2024` come `\2`.

### Applicazione: Riorganizzazione del Testo
I riferimenti ai gruppi catturati vengono utilizzati nelle operazioni di sostituzione.

**Esempio**:
```regex
s/(\w+) (\w+)/\2 \1/
```
Questa espressione inverte la posizione di due parole:
- Input: `Nome Cognome`
- Output: `Cognome Nome`

### Altri Esempi di Utilizzo
#### 1. Estrazione del Dominio da un'Email
```regex
/(\w+)@(\w+\.\w+)/
```
- `\1` rappresenta il nome utente.
- `\2` rappresenta il dominio dell'email.

Se applicata a `esempio@email.com`, cattura:
- `esempio` come `\1`
- `email.com` come `\2`

#### 2. Riformattazione della Data
Se una data è scritta come `2024/03/26` e la si vuole convertire in `26-03-2024`:
```regex
s/(\d{4})/(\d{2})/(\d{2})/\3-\2-\1/
```

- `\1` è l'anno.
- `\2` è il mese.
- `\3` è il giorno.

Risultato della sostituzione: `26-03-2024`.

### Conclusione
I **registri** e i **gruppi di cattura** sono strumenti potenti per manipolare il testo con le espressioni regolari. Sono utili per:
- Estrarre informazioni specifiche.
- Riordinare parti di una stringa.
- Modificare il formato di dati testuali.

## Caso Storico: ELIZA (1966)

Descrizione: Primo chatbot che simulava uno psicologo rogersiano.

Funzionamento:

  - Utilizzava regex semplici per identificare parole chiave (es. "madre", "triste").

  - Generava risposte predefinite basate su sostituzioni (es. "Dimmi di più sulla tua famiglia").

Limitazioni: Nessuna comprensione semantica, solo pattern matching superficiale.

<a href="https://www.youtube.com/watch?v=4sngIh0YJtk" target="_blank">ELIZA, video dimostrativo della funzionalità</a>

## Risorse

- Libro: Speech and Language Processing (Jurafsky & Martin).

- Tool online: Regex101 per testare pattern.

- Etichette: #Regex #NLP #PatternMatching
    
- Collegamenti: [[Introduzione all'NLP]], [[Elaborazione del Testo]]
