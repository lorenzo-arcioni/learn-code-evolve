# Legge di Zipf

## Introduzione
La **Legge di Zipf** (dal linguista George Kingsley Zipf, 1902-1950) è un principio empirico che descrive la relazione tra la frequenza di un elemento e la sua posizione ("rango") in una lista ordinata. Nella linguistica, stabilisce che:

> "La frequenza di una parola è inversamente proporzionale al suo rango."

Il **rango** ($r$) di una parola è la sua posizione in una lista ordinata per frequenza decrescente.

## Formulazione Matematica
Per un corpus testuale, la legge è espressa come:

$$
f(r) = \frac{C}{r^s}
$$

Dove:
- $f(r)$: frequenza della parola di rango $r$
- $C$: costante di normalizzazione
- $s$: esponente caratteristico (≈1 per molte lingue naturali)

In termini semplificati:
- La parola più frequente ($r=1$) occorrerà circa 2 volte più spesso della seconda ($r=2$), 3 volte più spesso della terza ($r=3$), ecc.

## Esempi Pratici

| Rango | Parola (Inglese) | Frequenza Relativa |
|-------|------------------|--------------------|
| 1     | the              | 7%                 |
| 2     | of               | 3.5%               |
| 3     | and              | 2.3%               |
| 10    | they             | 0.7%               |

<img src="/home/lorenzo/Documenti/GitHub/my-obsidian-vault/images/Zipf's_law_on_War_and_Peace.png" alt="Zipf's law on War and Peace" width="80%" style="display: block; margin-left: auto; margin-right: auto; align: center">

*Figura 1: Nelle lingue, in generale, si osserva la presenza di un piccolo numero di parole con frequenza elevata (rango piu basso) e un grande numero di parole con frequenza bassa (rango piu alto).*

## Applicazioni
La legge si osserva in:
1. **Linguistica**: distribuzione parole nei testi
2. **Demografia**: dimensione delle città
3. **Informatica**: frequenza accessi a pagine web
4. **Economia**: distribuzione del reddito

## Limiti
- Funziona meglio su grandi dataset
- L'esponente $s$ può variare tra 0.8-1.2
- Non spiega il "perché" del fenomeno

$$
\begin{aligned}
\text{Per } s=1: \quad &f(r) \propto \frac{1}{r} \\
& \sum_{r=1}^{\infty} \frac{1}{r} \to \infty \quad (\text{Serie armonica divergente})
\end{aligned}
$$

## Curiosità
Lo stesso Zipf paragonò il fenomeno al "principio del minimo sforzo" in natura. Studi recenti lo collegano a:
- Dinamiche di ottimizzazione
- Processi stocastici
- Auto-organizzazione critica
