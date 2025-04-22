# Variabili Casuali Intere e Discrete  

## Introduzione  
La probabilità e la statistica si occupano fondamentalmente dello studio delle distribuzioni delle variabili casuali.  

## Caratteristiche Principali delle Variabili Casuali  
- Rappresentano quantità che variano (nel tempo o tra individui)  
- La variabilità deriva da processi casuali sottostanti  
- Il valore è determinato dal punto campionario ($\omega$) che si verifica durante l'esperimento ($\mathcal E$)  
- Non possono essere previste in anticipo perché l'esito ω è sconosciuto  

## Definizione Formale  
**Definizione 1.6 (Variabile Casuale)**  
Sia $\Omega$ uno spazio campionario corrispondente a un esperimento $\mathcal E$, e sia $X: \Omega \to \mathbb{R}$ una funzione che mappa lo spazio campionario sulla retta reale. Allora $X$ è detta **variabile casuale**. 

Quindi:

- Un evento è un insieme di esiti (o una parte) dello spazio campionario. Ad esempio, nel lancio di una moneta, l'evento "esce testa" è l'insieme che contiene l'esito "testa". Gli eventi sono ciò a cui assegniamo una probabilità, e possono essere combinati tra loro (unione, intersezione, complemento, ecc.). Quindi, gli eventi indicano "cosa accade" (cioè, un insieme di esiti) e hanno una probabilità associata.

- Una variabile aleatoria è una funzione che associa un numero reale ad ogni esito dello spazio campionario. In altre parole, trasforma l'insieme degli esiti (che possono essere non numerici) in valori numerici, permettendoci di studiarne le proprietà statistiche (come la media, la varianza e la distribuzione). Ad esempio, lanciando due dadi, possiamo definire una variabile aleatoria che rappresenta la somma dei valori ottenuti. Quindi, le variabili aleatorie mappano ciascun esito a un numero, permettendo l'analisi quantitativa dell'esperimento.

## Variabili Casuali Discrete  
**Proprietà:**  
- Assumono un numero finito o infinito numerabile di valori  
- Le variabili casuali intere sono un caso speciale (e sempre discrete)  

**Struttura Probabilistica:**  
Comprendere una variabile casuale richiede l'analisi della struttura probabilistica dell'esperimento sottostante.  

## Funzione di Massa di Probabilità (PMF)  
**Definizione 1.7 (Funzione di Massa di Probabilità)**  
Per una variabile casuale discreta $X: \Omega \to \mathbb{R}$ che assume valori $x_1, x_2, x_3, \ldots$, la **funzione di massa di probabilità (pmf)** è definita come:  

$$
p(x) = P(X = x), \quad \text{per } x = x_1, x_2, x_3, \ldots
$$ 

*(Implicitamente, $p(x) = 0$ per tutti gli altri valori.)*  

**Terminologia Alternativa:**  
- Chiamata anche **distribuzione di probabilità**  
- A volte indicata semplicemente come **funzione di massa**  

**Requisiti per una PMF Valida:**  
1. **Non-negatività:** $p(x) \geq 0$ per ogni $x$.  
2. **Normalizzazione:** $\sum_{i} p(x_i) = 1$.  

Qualsiasi funzione che soddisfa queste due condizioni per un insieme di valori $x_1, x_2, x_3, \ldots$ è una pmf valida.  

---  
*Nota: Storicamente, le variabili casuali nacquero in contesti di gioco d'azzardo, rendendo i casi a valori interi (es. la somma di due lanci di dado) gli esempi più intuitivi.*  
