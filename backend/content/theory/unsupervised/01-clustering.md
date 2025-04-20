
# Clustering Algorithms

Clustering is a fundamental unsupervised learning technique that groups similar data points together based on certain features or characteristics.

## K-Means Clustering

K-means is one of the most popular clustering algorithms. It partitions the data into K clusters by minimizing the sum of squared distances from each point to its assigned cluster centroid.

### Algorithm:

1. Randomly initialize K cluster centroids
2. Assign each data point to the nearest centroid
3. Update centroids as the mean of all assigned points
4. Repeat steps 2-3 until convergence or maximum iterations

### Mathematical Formulation:

The objective is to minimize:

$$J = \sum_{i=1}^{n} \sum_{k=1}^{K} r_{ik} ||x_i - \mu_k||^2$$

Where:
- $r_{ik}$ is 1 if point $i$ belongs to cluster $k$, 0 otherwise
- $\mu_k$ is the centroid of cluster $k$
- $||x_i - \mu_k||^2$ is the squared Euclidean distance

### Strengths and Limitations:

**Strengths:**
- Simple and efficient
- Works well with spherical clusters
- Scales well to large datasets

**Limitations:**
- Requires specifying K in advance
- Sensitive to initial centroids
- May converge to local minima
- Struggles with non-spherical clusters

## Hierarchical Clustering

Hierarchical clustering creates a tree of clusters (dendrogram) by recursively merging or splitting groups.

### Types:

1. **Agglomerative (bottom-up)**: Start with each point as a cluster, then merge the closest clusters
2. **Divisive (top-down)**: Start with all points in one cluster, then recursively divide

### Distance Metrics:

- **Single linkage**: Minimum distance between points
- **Complete linkage**: Maximum distance between points
- **Average linkage**: Average distance between all pairs
- **Ward's method**: Minimizes variance within clusters

### Implementation in Python:

```python
import numpy as np
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans, AgglomerativeClustering
from sklearn.datasets import make_blobs
from scipy.cluster.hierarchy import dendrogram, linkage

# Generate sample data
X, _ = make_blobs(n_samples=300, centers=4, cluster_std=0.60, random_state=0)

# K-means clustering
kmeans = KMeans(n_clusters=4, random_state=0)
kmeans_labels = kmeans.fit_predict(X)

# Hierarchical clustering
hierarchical = AgglomerativeClustering(n_clusters=4)
hierarchical_labels = hierarchical.fit_predict(X)

# Plot results
plt.figure(figsize=(12, 5))

plt.subplot(1, 2, 1)
plt.scatter(X[:, 0], X[:, 1], c=kmeans_labels, cmap='viridis')
plt.scatter(kmeans.cluster_centers_[:, 0], kmeans.cluster_centers_[:, 1], 
            s=200, marker='X', c='red')
plt.title('K-means Clustering')

plt.subplot(1, 2, 2)
plt.scatter(X[:, 0], X[:, 1], c=hierarchical_labels, cmap='viridis')
plt.title('Hierarchical Clustering')

plt.tight_layout()
plt.show()

# Plot dendrogram
linked = linkage(X, 'ward')
plt.figure(figsize=(10, 7))
dendrogram(linked)
plt.title('Dendrogram')
plt.xlabel('Data Points')
plt.ylabel('Euclidean Distance')
plt.show()
```

## DBSCAN (Density-Based Spatial Clustering of Applications with Noise)

DBSCAN groups together points that are closely packed while marking points in low-density regions as outliers.

### Parameters:

- **eps**: Maximum distance between two points to be considered neighbors
- **minPts**: Minimum number of points required to form a dense region

### Algorithm:

1. For each point, find all neighbors within distance eps
2. Core points have at least minPts neighbors
3. Form clusters by connecting core points that are neighbors
4. Assign non-core points to clusters of their core neighbors or mark as noise

### Advantages:

- Does not require specifying the number of clusters
- Can find arbitrarily shaped clusters
- Robust to outliers
- Works well with dense clusters

## Gaussian Mixture Models (GMM)

GMM assumes that data points are generated from a mixture of several Gaussian distributions.

### Mathematical Formulation:

The probability density function is:

$$p(x) = \sum_{k=1}^{K} \pi_k \mathcal{N}(x|\mu_k, \Sigma_k)$$

Where:
- $\pi_k$ is the weight of the $k$-th Gaussian
- $\mathcal{N}(x|\mu_k, \Sigma_k)$ is the Gaussian density with mean $\mu_k$ and covariance $\Sigma_k$

### Estimation:

Parameters are typically estimated using the Expectation-Maximization (EM) algorithm.

## Evaluation Metrics

Clustering quality can be assessed using:

- **Silhouette Coefficient**: Measures how similar an object is to its own cluster compared to other clusters
- **Davies-Bouldin Index**: Ratio of within-cluster to between-cluster distances
- **Calinski-Harabasz Index**: Ratio of between-cluster to within-cluster dispersion

## Conclusion

Clustering algorithms provide powerful tools for discovering hidden patterns in unlabeled data. The choice of algorithm depends on the specific characteristics of the data and the intended application.

