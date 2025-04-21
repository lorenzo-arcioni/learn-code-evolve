# Automi a Stati Finiti (Finite State Automata)

## Definizione Formale
Un automa a stati finiti è una **quintupla** $(Q, \Sigma, \delta, q_0, A)$, dove:
- **$Q$**: Insieme finito di stati (es. $q_0, q_1, q_2$).
- **$\Sigma$**: Alfabeto (simboli consentiti, es. $\{a, b, l\}$).
- **$\delta: Q \times \Sigma \rightarrow Q$**: Funzione di transizione $\delta(q, x) \rightarrow q'$. Definisce come l'automa passa da uno stato $q$ a $q'$ leggendo il simbolo $x$.
- **$q_0$**: Stato iniziale (es. $q_0$).
- **$A$**: Insieme di stati accettanti/finali (es. $\{q_4\}$).

Gli automi a stati finiti fanno parte dei **rule-based systems**, come le [[Espressioni Regolari|regex]].

## Esempio: Il "Linguaggio delle Pecore"
### Descrizione
- **Linguaggio $L_{\text{sheep}} = \{ \text{baa!}, \text{baaaa!}, \text{baaaaaa!}, ... \}$**: Stringhe che iniziano con "b", seguite da almeno due "a", e terminano con "!".
- **Regex corrispondente**: `/baa+!/`.

### Automa Corrispondente
```tikz
\usepackage{tikz}
\usetikzlibrary{automata, positioning, arrows.meta}
\begin{document}
\begin{tikzpicture}[
    node distance=3cm, 
    scale=1.5,
    every state/.style={minimum size=1.2cm},
    auto
]
    \node[state, initial] (q0) {$q_0$};
    \node[state, right=of q0] (q1) {$q_1$};
    \node[state, right=of q1] (q2) {$q_2$};
    \node[state, right=of q2] (q3) {$q_3$};
    \node[state, accepting, right=of q3] (q4) {$q_4$};
    
    \path[->, >=Stealth]
    (q0) edge node[above] {b} (q1)
    (q1) edge node[above] {a} (q2)
    (q2) edge node[above] {a} (q3)
    (q3) edge[loop above] node {a} ()
          edge node[above] {!} (q4);
\end{tikzpicture}
\end{document}
```

### Definita come FSA

- **Stati**: $Q = \{q_0, q_1, q_2, q_3, q_4\}$.
- **Alfabeto**: $\Sigma = \{b, a, !\}$.
- **Stato iniziale**: $q_0$.
- **Stati accettanti**: $A = \{q_4\}$.
- **Tabella di Transizione di $\delta$**:

    | Stato | $b$      | $a$      | $!$      |
    |-------|----------|----------|----------|
    | $q_0$ | $q_1$    | -        | -        |
    | $q_1$ | -        | $q_2$    | -        |
    | $q_2$ | -        | $q_3$    | -        |
    | $q_3$ | -        | $q_3$    | $q_4$    |
    | $q_4$ | -        | -        | -        |

## Funzionamento di un FSA
### Processo di Riconoscimento
1. **Input**: "baaa!"
   - $q_0 \xrightarrow{b} q_1 \xrightarrow{a} q_2 \xrightarrow{a} q_3 \xrightarrow{a} q_3 \xrightarrow{!} q_4$ → **Accettata**.
2. **Input**: "ba!"
   - $q_0 \xrightarrow{b} q_1 \xrightarrow{a} q_2$ → Esaurimento input in stato non finale → **Rifiutata**.

Quindi se l'input si esaurisce in uno stato finale, la stringa viene **riconosciuta** come appartenente al linguaggio, mentre se si esaurisce in uno stato non finale, la stringa viene **rifiutata**. Se l'automa non raggiunge mai uno stato finale, diremo che fallisce l'accettazione.

## Accettatori vs. Generatori

I [[Linguaggi Formali]] sono insiemi di stringhe composte di simboli derivati da un alfabeto (insieme finito di simboli). Gli FSA definiscono un linguaggio formale. Possiamo vedere gli FSA anche come **generatori** di stringhe di linguaggi formali.

- **Accettatori**: Verificano se una stringa appartiene al linguaggio.
- **Generatori**: Producono tutte le stringhe valide.

## Relazione tra Regex e FSA
Ogni Regex corrisponde ad un FSA che accetta il linguaggio corrispondente. Simmetricamente, ogni FSA corrisponde ad una Regex che accetta il linguaggio corrispondente. Un'espressione regolare è un modo di caratterizzare un particolare linguaggio formale chiamato [[Linguaggio Regolare]]. Entrambi FSA e Regex sono utilizzati per descrivere linguaggi regolari.

Possiamo definire il linguaggio regolare così: 
$$L(M) = \{ w \in \Sigma^* \mid M \text{ accetta } w \}
$$
con $M$ un FSA.

### Equivalenze
| Operazione Regex      | Operazione FSA                  |
|-----------------------|---------------------------------|
| $RE_{L_1} \mid RE_{L_2}$ (Unione)     | FSA che accetta $L_1 \cup L_2 = \{ w \mid w \in L_1 \lor w \in L_2 \}$ |
| $RE_{L_1}RE_{L_2}$ (Concatenazione)| FSA che accetta $L_1L_2 = \{ xy \mid x \in L_1 \land y \in L_2 \}$     |
| $RE^*$ (Kleene Star)   | FSA con loop per ripetizioni $L^* = \bigcup_{n=0}^{\infty} L^n$ chiamado [[Chiusura di Kleene]]   |

**Esempio**: Regex `(a|b)*c`  
```tikz
\usepackage{tikz}
\usetikzlibrary{automata, positioning, arrows.meta}
\begin{document}
\begin{tikzpicture}[
    node distance=4cm, 
    scale=1.5,
    every state/.style={minimum size=1.2cm}
]
    \node[state, initial] (q0) {$q_0$};
    \node[state, accepting, right=of q0] (q1) {$q_1$};
    
    \path[->, >=Stealth]
    (q0) edge[loop above] node {a, b} ()
         edge node[above] {c} (q1);
\end{tikzpicture}
\end{document}
```

## Esercizio Guidato
### Dati
- $L_1 = \{\text{nlp}, \text{nat\_lang\_proc}\}$
- $L_2 = \{\text{\_is\_cool}\}$
- $L_3 = L_1L_2^*$

### Soluzione
**FSA per $L_3$**:  
```tikz
\usepackage{tikz}
\usetikzlibrary{automata, positioning, arrows.meta}

\begin{document}
\begin{tikzpicture}[
    node distance=3cm,
    every state/.style={minimum size=1.2cm}
]
    \node[state, initial] (q0) {$q_0$};
    \node[state, accepting, right=of q0] (q1) {$q_1$};
    
    \path[->, >=Stealth]
    (q0) edge node[above] {nlp} (q1)
         edge [bend right] node[below] {nat\_lang\_proc} (q1)
    (q1) edge[loop right] node {\_is\_cool} ();
\end{tikzpicture}
\end{document}
```

> **Etichette**: #FSA #Regex #LinguaggiFormali  
> **Collegamenti**: [[Espressioni Regolari]], [[Teoria degli Automi]]  
> **Risorse**:  
> - [Speech and Language Processing (Jurafsky & Martin)](https://web.stanford.edu/~jurafsky/slp3/)  
> - [Simulatore FSA Online](https://ivanzuzak.info/noam/webapps/fsm_simulator/)