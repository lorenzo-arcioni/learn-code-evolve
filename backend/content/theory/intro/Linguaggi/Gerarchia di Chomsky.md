# Gerarchia di Chomsky

## Introduzione
Struttura teorica sviluppata da **Noam Chomsky** nel 1956 che classifica le grammatiche formali in 4 livelli in base alla loro potenza generativa.  
→ **Obiettivo**: Analizzare la complessità dei linguaggi formali e la loro relazione con modelli computazionali.

## I 4 Livelli della Gerarchia

![Diagramma della Gerarchia di Chomsky](https://devopedia.org/images/article/210/7090.1571152901.jpg)  
*Rappresentazione grafica della gerarchi*

### 1. Tipo-0 (Grammatiche Illimitate)
- **Regole**: Nessuna restrizione (`γ → α`)
- **Linguaggi**: Ricorsivamente enumerabili (riconosciuti da **macchine di Turing**)
- **Esempio**: Problemi indecidibili come l'*Halting Problem*
- **Automa associato**: Macchina di Turing universale

### 2. Tipo-1 (Grammatiche Context-Sensitive)
- **Regole**: `αAβ → αγβ` (sostituzione contestuale)
- **Linguaggi**: Context-sensitive (es. `{aⁿbⁿcⁿ | n ≥ 1}`)
- **Automa associato**: Macchina di Turing linearmente limitata
- **Esempio**: 
$$\begin{align*}
S → aBC | aSBC\\
CB → BC\\
aB→ab\\ bB→bb\\ bC→bc\\ cC→cc
\end{align*}
$$

### 3. Tipo-2 (Grammatiche Context-Free)
- **Regole**: `A → γ` (sostituzione indipendente dal contesto)
- **Linguaggi**: Context-free (es. `{aⁿbⁿ | n ≥ 1}`)
- **Automa associato**: Automa a pila non deterministico
- **Esempio**:  
$$
S → aSb | ε
$$


### 4. Tipo-3 (Grammatiche Regolari)
- **Regole**:  
- **Forma destra**: `A → aB` o `A → a`  
- **Forma sinistra**: `A → Ba` o `A → a`  
- **Linguaggi**: Regolari (es. `a*`)
- **Automa associato**: Automa a stati finiti

## Relazioni di Inclusione
Ogni livello è un **sottoinsieme proprio** del precedente: Regolari $\subset$ Context-Free $\subset$ Context-Sensitive $\subset$ Ricorsivamente Enumerabili.


## Tabella Riassuntiva
| Tipo | Grammatica           | Esempio Linguaggio | Automa                     | Potenza Computazionale |
|------|----------------------|--------------------|----------------------------|------------------------|
| 0    | Illimitata           | Linguaggi Turing   | Macchina di Turing         | Massima               |
| 1    | Context-Sensitive    | $aⁿbⁿcⁿ$             | Turing linearmente limitata| Alta                  |
| 2    | Context-Free         | $aⁿbⁿ$               | Automa a pila              | Media                 |
| 3    | Regolare             | $a^*$                 | Automa a stati finiti      | Minima                |

![](https://devopedia.org/images/article/210/9008.1571242798.png)

## Applicazioni
- **Compilatori**: Analisi sintattica con grammatiche context-free
- **Linguistica computazionale**: Modellazione di strutture linguistiche
- **Teoria della complessità**: Classificazione di problemi decisionali

> 🔍 **Curiosità**: 
> - I moderni LLM (Large Language Models) superano i 100 miliardi di parametri!
> - La gerarchia non include i **linguaggi ricorsivi**, posizionati tra Tipo-0 e Tipo-1.

## Riferimenti
- [Chomsky Hierarchy - Devopedia](https://devopedia.org/chomsky-hierarchy)
- [Chomsky Hierarchy - Wikidata](https://www.wikidata.org/wiki/Q190913)

**Note**:  
- Gli esempi di grammatiche sono adattati da Wikipedia e fonti accademiche.  
- Le immagini utilizzate sono sotto licenza Creative Commons o di pubblico dominio.
