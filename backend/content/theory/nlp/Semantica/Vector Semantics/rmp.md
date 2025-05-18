> ✔️ Sì, è corretto: nel modello Skip-Gram di Word2Vec si usano due matrici distinte perché svolgono **ruoli diversi** nel calcolo di $p(\text{contesto} \mid \text{target})$.

1. **Input vs. output**  
   - La matrice $\mathbf{\theta}_W$ funge da **input-to-hidden**: trasforma la parola target (centro) in un embedding.  
   - La matrice $\mathbf{\theta}_C$ funge da **hidden-to-output**: prende quell’embedding e lo trasforma in logits su tutte le parole di contesto, prima di applicare la softmax.  
   Questo design è stato scelto fin dall’articolo originale di Mikolov et al. per separare chiaramente le fasi di “codifica” (target→vettore) e “decodifica” (vettore→distribuzione sul vocabolario). :contentReference[oaicite:0]{index=0}

2. **Distinzione funzionale**  
   - L’**embeddings di input** ($\mathbf{\theta}_W$) è ciò che apprendiamo come “rappresentazione principale” della parola.  
   - L’**embeddings di output** ($\mathbf{\theta}_C$) è ciò che usiamo per generare le predizioni di contesto.  
   Senza queste due matrici, perderemmo la capacità di ottimizzare separatamente il modo in cui una parola “comanda” il contesto e il modo in cui il contesto “risponde” alla parola target. :contentReference[oaicite:1]{index=1}

3. **Aspetti matematici e computazionali**  
   - Il softmax sull’intero vocabolario richiede di “mappare” l’embedding del target in un punteggio per ogni possibile contesto. La matrice $\mathbf{\theta}_C$ consente di fare questa operazione via prodotto matrice-vettore in $O(|V|\cdot D)$.  
   - Aggiornare **separatamente** $\mathbf{\theta}_W$ e $\mathbf{\theta}_C$ tramite backpropagation permette di rifinire in modo specifico sia la rappresentazione del target sia la generazione dei logits di contesto. :contentReference[oaicite:2]{index=2}

4. **Pratica comune**  
   - In implementazioni come Gensim si addestrano entrambe le matrici, ma spesso si conserva solo $\mathbf{\theta}_W$ come vettori finali delle parole perché rappresentano il “centro” delle relazioni di co-occorrenza. :contentReference[oaicite:3]{index=3}

---

**Fonti principali:**  
- StackOverflow: “Why we use input-hidden weight matrix … for target vs context” :contentReference[oaicite:4]{index=4}  
- DataScience.SE: “Why do we need 2 matrices for word2vec or GloVe” :contentReference[oaicite:5]{index=5}  
- StackOverflow: “Difference between the two weight matrices” :contentReference[oaicite:6]{index=6}  
