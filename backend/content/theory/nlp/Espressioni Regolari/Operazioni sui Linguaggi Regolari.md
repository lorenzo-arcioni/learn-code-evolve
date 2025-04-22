# Operazioni su Linguaggi Regolari

## Unione ($L_1 \cup L_2$)
- **Definizione**: Insieme di stringhe appartenenti a $L_1$ **o** $L_2$.
- **Esempio**:
  - $L_1 = \{ \text{cat, dog} \}$
  - $L_2 = \{ \text{fish, bird} \}$
  - $L_1 \cup L_2 = \{ \text{cat, dog, fish, bird} \}$
- **Regex**: `(cat|dog|fish|bird)`.

## Concatenazione ($L_1 L_2$)
- **Definizione**: Stringhe ottenute concatenando una stringa di $L_1$ con una di $L_2$.
- **Esempio**:
  - $L_1 = \{ \text{hello} \}$
  - $L_2 = \{ \text{ world} \}$
  - $L_1 L_2 = \{ \text{hello world} \}$
- **Regex**: `(hello)( world)`.

## Chiusura di Kleene ($L^*$)
- **Definizione**: Insieme di tutte le concatenazioni di 0 o più stringhe di $L$.
- **Esempio**:
  - $L = \{ \text{a} \}$
  - $L^* = \{ \epsilon, \text{a, aa, aaa, ...} \}$
- **Regex**: `(a)*`.

## Proprietà di Chiusura
I linguaggi regolari sono **chiusi** sotto:
1. **Unione**: $L_1 \cup L_2$ è regolare.
2. **Concatenazione**: $L_1 L_2$ è regolare.
3. **Stella di Kleene**: $L^*$ è regolare.
4. **Intersezione** e **Complemento** (per FSA deterministici).

## Esempio Complesso
- **Linguaggio**: Stringhe con un numero pari di 'a'.
  - **Regex**: `(b*ab*ab*)*`.
  - **FSA**: Due stati (pari/dispari), con transizioni per 'a' che alternano stati.

> **Etichette**: #LinguaggiFormali #Regex  
> **Collegamenti**: [[Automi a Stati Finiti]], [[Teoria della Computazione]]
