## Modelli Generativi Probabilistici

I **modelli generativi probabilistici** sono una classe di modelli di apprendimento automatico che stimano la distribuzione congiunta delle caratteristiche $\mathbf{x}$ e delle etichette $y$, ovvero $p(\mathbf{x}, y)$. Questi modelli possono essere utilizzati per la classificazione e la generazione di nuovi dati.

### Definizione
Un modello generativo probabilistico apprende la distribuzione congiunta $p(\mathbf{x}, y)$ e poi utilizza la regola di Bayes per calcolare la probabilità a posteriori:
$$
p(y \mid \mathbf{x}) = \frac{p(\mathbf{x}, y)}{p(\mathbf{x})} = \frac{p(\mathbf{x} \mid y) p(y)}{p(\mathbf{x})}
$$

Dove:
- $p(\mathbf{x} \mid y)$ è la **verosimiglianza**, ovvero la probabilità di osservare $\mathbf{x}$ dato $y$,
- $p(y)$ è la **probabilità a priori** della classe $y$,
- $p(\mathbf{x})$ è la **probabilità marginale** di $\mathbf{x}$, utilizzata per la normalizzazione.

### Esempi di Modelli Generativi Probabilistici
1. **Naive Bayes**: Assume che le caratteristiche siano indipendenti dato $y$, semplificando il calcolo di $p(\mathbf{x} \mid y)$.
2. **Analisi Discriminante Lineare (LDA)**: Assume che $p(\mathbf{x} \mid y)$ segua una distribuzione gaussiana con covarianza comune tra le classi.
3. **Modelli di Mixture Gaussiane (GMM)**: Modella $p(\mathbf{x})$ come una combinazione di più distribuzioni gaussiane, utile per clustering e generazione di dati.
4. **Modelli Generativi Avversari (GANs)**: Una rete generativa viene addestrata in competizione con un discriminatore per generare dati realistici.
5. **Variational Autoencoders (VAEs)**: Utilizzano metodi bayesiani per apprendere rappresentazioni latenti continue di dati complessi.

### Vantaggi e Limitazioni
✅ **Vantaggi**:
- Capacità di generare nuovi dati simili a quelli di training.
- Possono essere utilizzati per il data augmentation e la modellazione della distribuzione sottostante.
- Flessibilità nell'incorporare conoscenze a priori tramite la modellazione delle distribuzioni.

❌ **Limitazioni**:
- Le assunzioni sulle distribuzioni (es. gaussiane in LDA) possono non essere sempre realistiche.
- Possono essere computazionalmente intensivi, specialmente per modelli generativi complessi come GANs e VAEs.
- Sensibilità alla qualità dei dati di training: modelli generativi tendono a imparare le caratteristiche dei dati di input e possono soffrire di overfitting.

### Applicazioni
- **Classificazione**: Naive Bayes, LDA.
- **Generazione di dati**: GANs, VAEs.
- **Elaborazione del linguaggio naturale**: Generazione di testo, modelli basati su probabilità.
- **Computer Vision**: Creazione di immagini sintetiche.
- **Clustering e segmentazione**: GMM.

---
📌 **Nota**: I modelli generativi probabilistici sono una potente alternativa ai modelli discriminativi, in quanto forniscono una comprensione più approfondita della distribuzione dei dati e possono essere usati non solo per la classificazione, ma anche per la generazione di nuovi esempi.
