# 🌟 Modelli di Massima Entropia (MaxEnt) per il Part-of-Speech Tagging

## 🔍 Introduzione

Il **[[Part-of-Speech Tagging|Part-of-Speech tagging]]** (o POS tagging) è il processo di assegnare ad ogni parola in una frase il suo **ruolo grammaticale** (es. nome, verbo, aggettivo).

Due approcci molto comuni sono:
- **HMM (Hidden Markov Models)** → modelli **generativi** che stimano $P(x, c)$ e poi usano Bayes per ottenere $P(c \mid x)$.
- **MaxEnt (Maximum Entropy)** → modelli **discriminativi** che stimano direttamente $P(c \mid x)$ senza fare assunzioni forti di indipendenza.

## 🧠 Cosa fa un modello MaxEnt?

Un **modello MaxEnt** assegna ad ogni coppia $(c, x)$ (cioè: classe e contesto osservato) una **probabilità condizionata**:

$$
P(c \mid x) = \frac{1}{Z(x)} \exp\left(\sum_{j} \lambda_j f_j(c, x)\right)
$$

Dove:
- $c$: classe (es. NN, VB, VBG...),
- $x$: contesto osservato (es. parola, parole vicine, tag precedenti...),
- $f_j(c, x)$: **feature functions** binarie (0 o 1),
- $\lambda_j$: peso (learned during training),
- $Z(x)$: funzione di normalizzazione:

$$
Z(x) = \sum_{c'} \exp\left(\sum_j \lambda_j f_j(c', x)\right)
$$

## ⚙️ Esempi di Feature Functions

Ecco alcune feature rappresentate nell'immagine:

$$
\begin{align*}
f_1(c,x) &= 
\begin{cases}
1 & \text{se } word_i = \text{"race"} \text{ e } c = NN \\
0 & \text{altrimenti}
\end{cases}\\

f_2(c,x) &= 
\begin{cases}
1 & \text{se } t_{i-1} = TO \text{ e } c = VB \\
0 & \text{altrimenti}
\end{cases}\\

f_3(c,x) &= 
\begin{cases}
1 & \text{se } \text{suffix}(word_i) = \text{"ing"} \text{ e } c = VBG \\
0 & \text{altrimenti}
\end{cases}\\

f_4(c,x) &= 
\begin{cases}
1 & \text{se } \text{is\_lower\_case}(word_i) \text{ e } c = VB \\
0 & \text{altrimenti}
\end{cases}\\

f_5(c,x) &= 
\begin{cases}
1 & \text{se } word_i = \text{"race"} \text{ e } c = VB \\
0 & \text{altrimenti}
\end{cases}\\

f_6(c,x) &= 
\begin{cases}
1 & \text{se } t_{i-1} = TO \text{ e } c = NN \\
0 & \text{altrimenti}
\end{cases}\\

\end{align*}
$$

> ✨ Queste funzioni possono osservare **proprietà arbitrarie** del contesto, come la parola corrente, il tag precedente, suffissi, maiuscole/minuscole... cosa **difficile o impossibile** da modellare con HMM.

## 📐 Esempio Completo

Supponiamo la frase:  
**"They plan to race tomorrow."**

Parola corrente: `race`  
Contesto: `word_i = "race", t_{i-1} = TO`

### Step 1: Feature attivate per ciascun candidato tag

| Candidato Tag $c$ | Feature Attive $f_j(c, x)$ |
|---------------------|------------------------------|
| **VB**              | $f_2, f_5$                 |
| **NN**              | $f_1, f_6$                 |
| **VBG**             | nessuna                      |

### Step 2: Pesi delle feature (ipotesi):

| Feature | Peso $\lambda_j$ |
|--------|--------------------|
| $f_1$ | 1.2                |
| $f_2$ | 1.4                |
| $f_5$ | 0.9                |
| $f_6$ | 0.5                |

### Step 3: Calcolo punteggi

$$
\begin{align*}
\text{score}(VB) = \exp(\lambda_2 + \lambda_5) = \exp(1.4 + 0.9) = \exp(2.3) &\approx 9.974\\
\text{score}(NN) = \exp(\lambda_1 + \lambda_6) = \exp(1.2 + 0.5) = \exp(1.7) &\approx 5.473\\
\text{score}(VBG) = \exp(0) &= 1\\
Z(x) = 9.974 + 5.473 + 1 &= 16.447
\end{align*}
$$

### Step 4: Probabilità finali

$$
P(VB \mid x) = \frac{9.974}{16.447} \approx 0.606
$$
$$
P(NN \mid x) = \frac{5.473}{16.447} \approx 0.333
$$
$$
P(VBG \mid x) = \frac{1}{16.447} \approx 0.061
$$

🔚 **Predizione finale: VB** → "race" è usato come verbo.

## 📋 Altri Esempi Utili

| Frase | Parola | Contesto | Feature Attivate | Tag Atteso |
|-------|--------|----------|------------------|------------|
| "The race is on." | race | word_i = race | $f_1$ | NN |
| "They want to race." | race | t_{i-1} = TO | $f_2, f_5$ | VB |
| "He is running fast." | running | suffix = "ing" | $f_3$ | VBG |
| "I need to plan." | plan | lowercase, t_{i-1} = TO | $f_2, f_4$ | VB |

## 🔁 Vantaggi rispetto a HMM

| Modello | Limiti |
|--------|--------|
| **HMM** | Fa assunzioni di indipendenza forte tra osservazioni. Difficile modellare feature complesse. |
| **MaxEnt** | Flessibile, può includere qualunque funzione arbitraria. Meglio con più contesto. |

## 🧠 Conclusione

I modelli di massima entropia:
- Permettono di **combinare molte feature diverse** in modo elegante.
- Sono **più flessibili** rispetto agli HMM.
- Funzionano molto bene per **POS tagging**, chunking, NER, ecc.
