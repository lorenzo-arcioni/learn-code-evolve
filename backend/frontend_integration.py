
"""
This module provides helper functions to integrate the FastAPI backend with the React frontend.
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from main import app

# Add CORS middleware to allow frontend to call the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite dev server default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Helper function to seed the database with initial data
async def seed_database():
    """Seed the database with initial data for testing"""
    from main import db, get_password_hash
    from datetime import datetime
    
    # Clear existing data
    await db["users"].delete_many({})
    await db["exercises"].delete_many({})
    await db["theory"].delete_many({})
    
    # Create test users
    test_users = [
        {
            "username": "ml_master",
            "email": "ml_master@example.com",
            "full_name": "Machine Learning Master",
            "hashed_password": get_password_hash("password123"),
            "points": 9850,
            "solved_exercises": ["linear-regression", "decision-trees", "data-preprocessing"],
            "is_active": True,
            "created_at": datetime.utcnow()
        },
        {
            "username": "data_ninja",
            "email": "data_ninja@example.com",
            "full_name": "Data Science Ninja",
            "hashed_password": get_password_hash("password123"),
            "points": 8920,
            "solved_exercises": ["linear-regression", "decision-trees"],
            "is_active": True,
            "created_at": datetime.utcnow()
        },
        {
            "username": "ai_explorer",
            "email": "ai_explorer@example.com",
            "full_name": "AI Explorer",
            "hashed_password": get_password_hash("password123"),
            "points": 8450,
            "solved_exercises": ["linear-regression"],
            "is_active": True,
            "created_at": datetime.utcnow()
        }
    ]
    
    await db["users"].insert_many(test_users)
    
    # Create exercises matching the frontend data
    exercises = [
        {
            "title": "Linear Regression Implementation",
            "description": "Implement a simple linear regression model from scratch",
            "difficulty": "Easy",
            "locked": False,
            "content": """
# Linear Regression Exercise

In this exercise, you'll implement a simple linear regression model from scratch.

## Instructions

1. Implement the `LinearRegression` class with the following methods:
   - `fit(X, y)`: Fits the model to the training data
   - `predict(X)`: Makes predictions on new data
   - `score(X, y)`: Calculates the R² score of the model

## Example Solution

```python
import numpy as np

class LinearRegression:
    def __init__(self):
        self.coefficients = None
        self.intercept = None
        
    def fit(self, X, y):
        # Add a column of ones to X for the intercept term
        X_b = np.c_[np.ones((X.shape[0], 1)), X]
        
        # Calculate the coefficients using the normal equation
        theta = np.linalg.inv(X_b.T.dot(X_b)).dot(X_b.T).dot(y)
        
        self.intercept = theta[0]
        self.coefficients = theta[1:]
        
        return self
        
    def predict(self, X):
        X_b = np.c_[np.ones((X.shape[0], 1)), X]
        return X_b.dot(np.r_[self.intercept, self.coefficients])
        
    def score(self, X, y):
        y_pred = self.predict(X)
        u = ((y - y_pred) ** 2).sum()
        v = ((y - y.mean()) ** 2).sum()
        return 1 - u/v
```

## Testing Your Implementation

```python
from sklearn.datasets import make_regression
from sklearn.model_selection import train_test_split

# Generate synthetic data
X, y = make_regression(n_samples=100, n_features=1, noise=10, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train your model
model = LinearRegression()
model.fit(X_train, y_train)

# Evaluate the model
print(f"R² score: {model.score(X_test, y_test)}")
```
            """,
            "created_at": datetime.utcnow()
        },
        {
            "title": "Decision Tree Classifier",
            "description": "Build a decision tree for classification tasks",
            "difficulty": "Easy",
            "locked": False,
            "content": """
# Decision Tree Classifier Exercise

In this exercise, you'll implement a simple decision tree classifier from scratch.

## Instructions

1. Implement the `DecisionTree` class with the following methods:
   - `fit(X, y)`: Builds the decision tree
   - `predict(X)`: Makes predictions on new data

## Example Solution

```python
import numpy as np

class Node:
    def __init__(self, feature=None, threshold=None, left=None, right=None, value=None):
        self.feature = feature    # Index of feature to split on
        self.threshold = threshold    # Threshold value for the split
        self.left = left    # Left subtree
        self.right = right    # Right subtree
        self.value = value    # Leaf value if this is a leaf node

class DecisionTree:
    def __init__(self, max_depth=5):
        self.max_depth = max_depth
        self.root = None
        
    def fit(self, X, y):
        self.root = self._grow_tree(X, y, depth=0)
        return self
    
    def _grow_tree(self, X, y, depth):
        n_samples, n_features = X.shape
        n_classes = len(np.unique(y))
        
        # Stopping criteria
        if depth >= self.max_depth or n_classes == 1:
            leaf_value = self._most_common_label(y)
            return Node(value=leaf_value)
        
        # Find the best split
        best_feature, best_threshold = self._best_split(X, y, n_features)
        
        # Split the data
        left_idxs = X[:, best_feature] < best_threshold
        right_idxs = ~left_idxs
        
        # Grow the children
        left = self._grow_tree(X[left_idxs], y[left_idxs], depth + 1)
        right = self._grow_tree(X[right_idxs], y[right_idxs], depth + 1)
        
        return Node(best_feature, best_threshold, left, right)
    
    def _best_split(self, X, y, n_features):
        best_gain = -1
        best_feature = None
        best_threshold = None
        
        for feature in range(n_features):
            thresholds = np.unique(X[:, feature])
            for threshold in thresholds:
                gain = self._information_gain(X, y, feature, threshold)
                
                if gain > best_gain:
                    best_gain = gain
                    best_feature = feature
                    best_threshold = threshold
                    
        return best_feature, best_threshold
    
    def _information_gain(self, X, y, feature, threshold):
        # Calculate parent entropy
        parent_entropy = self._entropy(y)
        
        # Generate split
        left_idxs = X[:, feature] < threshold
        right_idxs = ~left_idxs
        
        if len(left_idxs) == 0 or len(right_idxs) == 0:
            return 0
        
        # Calculate the weighted entropy of children
        n = len(y)
        n_l, n_r = len(y[left_idxs]), len(y[right_idxs])
        e_l, e_r = self._entropy(y[left_idxs]), self._entropy(y[right_idxs])
        child_entropy = (n_l / n) * e_l + (n_r / n) * e_r
        
        # Calculate information gain
        information_gain = parent_entropy - child_entropy
        return information_gain
    
    def _entropy(self, y):
        class_counts = np.bincount(y.astype(int))
        probabilities = class_counts / len(y)
        entropy = -np.sum([p * np.log2(p) for p in probabilities if p > 0])
        return entropy
    
    def _most_common_label(self, y):
        return np.argmax(np.bincount(y.astype(int)))
    
    def predict(self, X):
        return np.array([self._traverse_tree(x, self.root) for x in X])
    
    def _traverse_tree(self, x, node):
        if node.value is not None:
            return node.value
        
        if x[node.feature] < node.threshold:
            return self._traverse_tree(x, node.left)
        else:
            return self._traverse_tree(x, node.right)
```

## Testing Your Implementation

```python
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# Load iris dataset
iris = load_iris()
X, y = iris.data, iris.target

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train your model
dt = DecisionTree(max_depth=3)
dt.fit(X_train, y_train)

# Make predictions
y_pred = dt.predict(X_test)

# Calculate accuracy
accuracy = accuracy_score(y_test, y_pred)
print(f"Accuracy: {accuracy}")
```
            """,
            "created_at": datetime.utcnow()
        },
        {
            "title": "Data Preprocessing",
            "description": "Implement data cleaning and preprocessing techniques",
            "difficulty": "Medium",
            "locked": False,
            "content": """
# Data Preprocessing Exercise

In this exercise, you'll implement common data preprocessing techniques.

## Instructions

1. Implement the following preprocessing functions:
   - `normalize(X)`: Normalize features to have values between 0 and 1
   - `standardize(X)`: Standardize features to have zero mean and unit variance
   - `handle_missing_values(X)`: Replace missing values with the mean of each column
   - `one_hot_encode(X)`: Convert categorical variables to one-hot encoded format

## Example Solution

```python
import numpy as np
import pandas as pd

def normalize(X):
    """
    Normalize features to have values between 0 and 1
    
    Parameters:
    X (numpy.ndarray): Input features
    
    Returns:
    numpy.ndarray: Normalized features
    """
    X_min = X.min(axis=0)
    X_max = X.max(axis=0)
    return (X - X_min) / (X_max - X_min)

def standardize(X):
    """
    Standardize features to have zero mean and unit variance
    
    Parameters:
    X (numpy.ndarray): Input features
    
    Returns:
    numpy.ndarray: Standardized features
    """
    X_mean = X.mean(axis=0)
    X_std = X.std(axis=0)
    return (X - X_mean) / X_std

def handle_missing_values(X):
    """
    Replace missing values with the mean of each column
    
    Parameters:
    X (pandas.DataFrame): Input data with potential missing values
    
    Returns:
    pandas.DataFrame: Data with missing values replaced
    """
    return X.fillna(X.mean())

def one_hot_encode(X, categorical_columns):
    """
    Convert categorical variables to one-hot encoded format
    
    Parameters:
    X (pandas.DataFrame): Input data
    categorical_columns (list): List of column names to one-hot encode
    
    Returns:
    pandas.DataFrame: One-hot encoded data
    """
    return pd.get_dummies(X, columns=categorical_columns)
```

## Testing Your Implementation

```python
import pandas as pd
import numpy as np

# Create sample data with missing values
data = {
    'age': [25, 30, None, 40, 50],
    'income': [50000, 60000, 75000, None, 90000],
    'gender': ['male', 'female', 'male', 'female', 'male'],
    'education': ['bachelors', 'masters', 'phd', 'bachelors', 'masters']
}

df = pd.DataFrame(data)

# Handle missing values
df_filled = handle_missing_values(df)
print("After handling missing values:")
print(df_filled)

# Normalize numeric features
numeric_cols = ['age', 'income']
X_numeric = df_filled[numeric_cols].values
X_normalized = normalize(X_numeric)
print("\nNormalized numeric features:")
print(X_normalized)

# Standardize numeric features
X_standardized = standardize(X_numeric)
print("\nStandardized numeric features:")
print(X_standardized)

# One-hot encode categorical features
categorical_cols = ['gender', 'education']
df_encoded = one_hot_encode(df_filled, categorical_cols)
print("\nOne-hot encoded data:")
print(df_encoded)
```
            """,
            "created_at": datetime.utcnow()
        }
    ]
    
    await db["exercises"].insert_many(exercises)
    
    # Create theory content
    theory_content = [
        {
            "title": "Introduction to Machine Learning",
            "category": "intro",
            "content": """
# Introduction to Machine Learning

Machine learning is a field of artificial intelligence (AI) that focuses on building systems that learn from data. Instead of explicitly programming rules, machine learning algorithms use statistical methods to find patterns in data and make decisions or predictions.

## What is Machine Learning?

Machine learning is a method of data analysis that automates analytical model building. It's a branch of artificial intelligence based on the idea that systems can learn from data, identify patterns, and make decisions with minimal human intervention.

## Types of Machine Learning

There are three main types of machine learning:

### 1. Supervised Learning

In supervised learning, the algorithm is trained on labeled data, where the desired output is known. The model learns to map inputs to outputs based on example input-output pairs. Common supervised learning tasks include:

- **Classification**: Predicting a categorical label (e.g., spam detection, image classification)
- **Regression**: Predicting a continuous value (e.g., house prices, temperature forecasting)

### 2. Unsupervised Learning

In unsupervised learning, the algorithm is trained on unlabeled data, and it must find patterns or structure on its own. Common unsupervised learning tasks include:

- **Clustering**: Grouping similar data points together (e.g., customer segmentation)
- **Dimensionality Reduction**: Reducing the number of variables in data while preserving important information
- **Anomaly Detection**: Identifying unusual data points (e.g., fraud detection)

### 3. Reinforcement Learning

In reinforcement learning, an agent learns to make decisions by taking actions in an environment to maximize a reward. The agent learns from the consequences of its actions, rather than from explicit training examples.

## Applications of Machine Learning

Machine learning has a wide range of applications across various industries:

- **Healthcare**: Disease diagnosis, personalized treatment, drug discovery
- **Finance**: Fraud detection, algorithmic trading, credit scoring
- **Retail**: Recommendation systems, inventory management, price optimization
- **Transportation**: Self-driving cars, traffic prediction, route optimization
- **Manufacturing**: Predictive maintenance, quality control, supply chain optimization

## The Machine Learning Process

The typical machine learning workflow involves:

1. **Data Collection**: Gathering relevant data from various sources
2. **Data Preprocessing**: Cleaning, transforming, and preparing data for analysis
3. **Feature Engineering**: Selecting and creating relevant features
4. **Model Selection**: Choosing appropriate algorithms
5. **Model Training**: Using data to train the model
6. **Model Evaluation**: Assessing model performance
7. **Model Deployment**: Implementing the model in a production environment
8. **Monitoring and Updating**: Continuously monitoring and improving the model

## Key Challenges in Machine Learning

- **Data Quality**: Machine learning models are only as good as the data they're trained on
- **Overfitting**: Models that perform well on training data but poorly on new data
- **Interpretability**: Understanding how models make decisions
- **Ethical Considerations**: Addressing bias, fairness, and privacy concerns

## Getting Started with Machine Learning

To begin your journey in machine learning, focus on:

1. **Understanding the fundamentals**: Learn the basic concepts and algorithms
2. **Building a strong foundation in mathematics**: Statistics, linear algebra, calculus
3. **Programming skills**: Python is the most popular language for machine learning
4. **Hands-on practice**: Work on projects and participate in competitions

As you progress through this course, you'll gain practical experience implementing various machine learning algorithms and applying them to real-world problems.
            """,
            "created_at": datetime.utcnow()
        },
        {
            "title": "Supervised Learning",
            "category": "supervised",
            "content": """
# Supervised Learning

Supervised learning is a type of machine learning where the model is trained on labeled data. The algorithm learns to map input features to output labels, allowing it to make predictions on new, unseen data.

## Core Concepts

In supervised learning:
- The training data consists of input-output pairs
- The model learns a mapping function from inputs to outputs
- The objective is to minimize the error between predicted and actual outputs

## Common Algorithms

### Linear Regression

Linear regression is used for predicting continuous values by finding the best-fitting straight line through the data points.

#### Mathematical Formulation

The linear regression model can be represented as:

$$y = \\beta_0 + \\beta_1 x_1 + \\beta_2 x_2 + ... + \\beta_n x_n + \\epsilon$$

Where:
- $y$ is the target variable
- $x_1, x_2, ..., x_n$ are the features
- $\\beta_0, \\beta_1, ..., \\beta_n$ are the coefficients
- $\\epsilon$ is the error term

#### Optimization

The coefficients are typically estimated by minimizing the sum of squared errors:

$$\\min_{\\beta} \\sum_{i=1}^{m} (y_i - (\\beta_0 + \\beta_1 x_{i1} + ... + \\beta_n x_{in}))^2$$

### Logistic Regression

Despite its name, logistic regression is a classification algorithm. It estimates the probability that an instance belongs to a particular class.

#### Mathematical Formulation

The logistic regression model uses the sigmoid function to transform a linear equation into a range between 0 and 1:

$$P(y=1|x) = \\frac{1}{1 + e^{-(\\beta_0 + \\beta_1 x_1 + ... + \\beta_n x_n)}}$$

### Decision Trees

Decision trees make predictions by following a series of rules based on feature values. They create a flowchart-like structure where each node represents a decision based on a feature, each branch represents the outcome of that decision, and each leaf node represents a final classification or value.

Benefits of decision trees include:
- Easy to understand and interpret
- Require little data preprocessing
- Can handle both numerical and categorical data

### Support Vector Machines (SVM)

SVMs find the hyperplane that best separates classes in the feature space. They aim to maximize the margin between the closest points (support vectors) of different classes.

### k-Nearest Neighbors (k-NN)

k-NN makes predictions based on the majority class (for classification) or average value (for regression) of the k closest training examples in the feature space.

### Neural Networks

Neural networks consist of layers of interconnected nodes that process information. They can learn complex patterns and are particularly effective for tasks like image and speech recognition.

## Evaluation Metrics

### For Classification

- **Accuracy**: Proportion of correct predictions
- **Precision**: Proportion of positive identifications that were actually correct
- **Recall**: Proportion of actual positives that were correctly identified
- **F1 Score**: Harmonic mean of precision and recall
- **ROC Curve and AUC**: Graphical representation of the trade-off between true positive rate and false positive rate

### For Regression

- **Mean Absolute Error (MAE)**: Average of absolute differences between predicted and actual values
- **Mean Squared Error (MSE)**: Average of squared differences between predicted and actual values
- **Root Mean Squared Error (RMSE)**: Square root of MSE
- **R-squared**: Proportion of variance in the dependent variable explained by the model

## Preventing Overfitting

- **Cross-validation**: Training and testing the model on different subsets of the data
- **Regularization**: Adding a penalty term to the loss function to discourage complex models
- **Feature selection**: Using only the most relevant features
- **Early stopping**: Halting training when performance on a validation set stops improving

## Implementing Supervised Learning

When implementing supervised learning algorithms, consider:

1. **Data preparation**: Cleaning, normalization, feature engineering
2. **Model selection**: Choose an algorithm appropriate for your problem
3. **Hyperparameter tuning**: Optimize model parameters
4. **Model evaluation**: Assess performance on test data
5. **Model deployment**: Implement the model in a production environment

By mastering these concepts and techniques, you'll be equipped to apply supervised learning to a wide range of prediction and classification problems.
            """,
            "created_at": datetime.utcnow()
        },
        {
            "title": "Unsupervised Learning",
            "category": "unsupervised",
            "content": """
# Unsupervised Learning

Unsupervised learning is a type of machine learning where the algorithm learns patterns from unlabeled data. Unlike supervised learning, there are no explicit target variables or correct answers. Instead, the model discovers structure, patterns, or relationships within the data on its own.

## Core Concepts

In unsupervised learning:
- The training data consists of input features only (no labels)
- The model identifies patterns, structures, or relationships in the data
- The objective varies depending on the specific task (e.g., clustering, dimensionality reduction)

## Common Algorithms

### Clustering

Clustering algorithms group similar data points together based on certain characteristics.

#### K-Means Clustering

K-means is one of the most popular clustering algorithms. It works by:

1. Randomly initializing K cluster centroids
2. Assigning each data point to the nearest centroid
3. Recalculating the centroids as the mean of all points in the cluster
4. Repeating steps 2-3 until convergence

The objective function for K-means is to minimize the sum of squared distances:

$$\\min_{C} \\sum_{k=1}^{K} \\sum_{x \\in C_k} ||x - \\mu_k||^2$$

where $C_k$ represents the $k$-th cluster, $x$ is a data point, and $\\mu_k$ is the centroid of cluster $k$.

#### Hierarchical Clustering

Hierarchical clustering builds a tree of clusters (dendrogram) by:

- **Agglomerative (bottom-up)**: Starting with each data point as its own cluster and merging the closest clusters iteratively
- **Divisive (top-down)**: Starting with all data points in one cluster and recursively splitting them

#### DBSCAN (Density-Based Spatial Clustering of Applications with Noise)

DBSCAN identifies clusters as dense regions separated by regions of lower density. It can discover clusters of arbitrary shape and is robust to outliers.

### Dimensionality Reduction

Dimensionality reduction techniques reduce the number of features while preserving important information.

#### Principal Component Analysis (PCA)

PCA transforms the data into a new coordinate system where the greatest variance lies on the first coordinate (principal component), the second greatest variance on the second coordinate, and so on.

The objective is to find a projection that maximizes the variance:

$$\\max_{w} w^T \\Sigma w \\quad \\text{subject to} \\quad ||w|| = 1$$

where $\\Sigma$ is the covariance matrix and $w$ is the projection vector.

#### t-SNE (t-Distributed Stochastic Neighbor Embedding)

t-SNE is particularly effective for visualizing high-dimensional data in 2D or 3D. It models the similarity between points in the high-dimensional space and preserves these relationships in the lower-dimensional representation.

#### UMAP (Uniform Manifold Approximation and Projection)

UMAP is a more recent dimensionality reduction technique that often provides better performance than t-SNE while preserving more global structure.

### Association Rule Learning

Association rule learning discovers interesting relationships between variables in large datasets.

#### Apriori Algorithm

The Apriori algorithm finds frequent itemsets and generates association rules based on support and confidence measures.

#### FP-Growth (Frequent Pattern Growth)

FP-Growth is an efficient method for mining frequent itemsets without candidate generation.

### Anomaly Detection

Anomaly detection identifies data points that deviate significantly from the norm.

#### Isolation Forest

Isolation Forest explicitly isolates anomalies by randomly selecting a feature and a split value, creating shorter paths for anomalies in the resulting trees.

#### One-Class SVM

One-Class SVM maps the data into a high-dimensional feature space and separates the majority of data points from the origin, considering points close to the origin as anomalies.

## Evaluation Metrics

Evaluating unsupervised learning algorithms can be challenging since there are no ground truth labels. Common approaches include:

- **Internal evaluation**: Assess how well the clusters are separated using metrics like silhouette coefficient, Davies-Bouldin index, or Calinski-Harabasz index
- **External evaluation**: Compare the clustering results with known class labels (if available) using metrics like adjusted Rand index or normalized mutual information
- **Visual inspection**: Visualize the results to see if they make intuitive sense

## Applications of Unsupervised Learning

- **Customer segmentation**: Grouping customers based on purchasing behavior
- **Anomaly detection**: Identifying fraudulent transactions or network intrusions
- **Feature learning**: Automatically learning useful features from raw data
- **Recommendation systems**: Finding similar items or users
- **Topic modeling**: Discovering abstract topics in document collections
- **Image compression**: Reducing the size of images while preserving important information

## Challenges in Unsupervised Learning

- **Determining the optimal number of clusters**: Many algorithms require specifying the number of clusters in advance
- **Evaluating results**: Without ground truth labels, it's difficult to objectively measure performance
- **Scalability**: Some algorithms have high computational complexity for large datasets
- **Curse of dimensionality**: High-dimensional data can make distance metrics less meaningful

By understanding these concepts and techniques, you'll be equipped to apply unsupervised learning to discover hidden patterns and structures in your data.
            """,
            "created_at": datetime.utcnow()
        },
        {
            "title": "Deep Learning",
            "category": "deep-learning",
            "content": """
# Deep Learning

Deep Learning is a subfield of machine learning that uses neural networks with multiple layers (deep neural networks) to model complex patterns in data. Deep learning has revolutionized various domains, including computer vision, natural language processing, and speech recognition.

## Neural Network Fundamentals

### Basic Structure

A neural network consists of:

- **Input Layer**: Receives the input data
- **Hidden Layers**: Process the information
- **Output Layer**: Produces the final result

Each layer contains **neurons** (or nodes) that perform computations. The connections between neurons have associated **weights** that are adjusted during training.

### Activation Functions

Activation functions introduce non-linearity into the network, allowing it to learn complex patterns:

- **Sigmoid**: $\\sigma(x) = \\frac{1}{1 + e^{-x}}$
- **Tanh**: $\\tanh(x) = \\frac{e^x - e^{-x}}{e^x + e^{-x}}$
- **ReLU (Rectified Linear Unit)**: $\\text{ReLU}(x) = \\max(0, x)$
- **Leaky ReLU**: $\\text{Leaky ReLU}(x) = \\max(\\alpha x, x)$ where $\\alpha$ is a small constant
- **Softmax**: $\\text{Softmax}(x_i) = \\frac{e^{x_i}}{\\sum_j e^{x_j}}$ (used for multi-class classification)

### Feedforward Process

The feedforward process calculates the output of the network for a given input:

1. Input data is fed to the input layer
2. Each neuron computes a weighted sum of its inputs
3. The activation function is applied to the weighted sum
4. The output is passed to the next layer
5. This process continues until the output layer produces the final result

### Backpropagation

Backpropagation is the key algorithm for training neural networks:

1. Calculate the error at the output layer
2. Compute the gradient of the error with respect to the weights
3. Propagate the error backwards through the network
4. Update the weights using an optimization algorithm (e.g., gradient descent)

## Deep Learning Architectures

### Convolutional Neural Networks (CNNs)

CNNs are specialized for processing grid-like data such as images. Key components include:

- **Convolutional Layers**: Apply filters to extract features
- **Pooling Layers**: Reduce dimensionality while preserving important information
- **Fully Connected Layers**: Process the extracted features for final classification or regression

Popular CNN architectures include:
- **LeNet**: One of the earliest CNNs, used for digit recognition
- **AlexNet**: Winner of the 2012 ImageNet competition
- **VGG**: Known for its simplicity and depth
- **ResNet**: Introduced residual connections to enable very deep networks
- **Inception/GoogLeNet**: Uses inception modules with parallel convolutional operations

### Recurrent Neural Networks (RNNs)

RNNs are designed for sequential data, with connections that form cycles to maintain memory of previous inputs:

- **Simple RNN**: Basic recurrent architecture
- **LSTM (Long Short-Term Memory)**: Addresses the vanishing gradient problem with memory cells and gates
- **GRU (Gated Recurrent Unit)**: A simplified version of LSTM with fewer parameters

### Transformers

Transformers have revolutionized natural language processing through their self-attention mechanism:

- **Self-Attention**: Allows the model to focus on relevant parts of the input sequence
- **Multi-Head Attention**: Applies self-attention multiple times in parallel
- **Positional Encoding**: Provides information about the position of tokens in the sequence

Popular transformer models include:
- **BERT**: Bidirectional Encoder Representations from Transformers
- **GPT (Generative Pre-trained Transformer)**: Autoregressive language model
- **T5**: Text-to-Text Transfer Transformer

### Generative Adversarial Networks (GANs)

GANs consist of two neural networks competing against each other:

- **Generator**: Creates synthetic data samples
- **Discriminator**: Distinguishes between real and generated samples

The networks are trained simultaneously, with the generator trying to fool the discriminator and the discriminator learning to better identify fake samples.

## Training Deep Neural Networks

### Optimization Algorithms

- **Stochastic Gradient Descent (SGD)**: Updates weights based on the gradient of the error for a small batch of samples
- **Adam**: Adaptive moment estimation, combines ideas from RMSprop and momentum
- **RMSprop**: Adapts the learning rate for each parameter based on the history of gradients

### Regularization Techniques

- **Dropout**: Randomly deactivates neurons during training to prevent co-adaptation
- **Batch Normalization**: Normalizes the inputs to each layer to stabilize training
- **Weight Decay (L2 Regularization)**: Adds a penalty term to the loss function based on the magnitude of weights
- **Early Stopping**: Halts training when performance on a validation set stops improving

### Learning Rate Schedules

- **Step Decay**: Reduces the learning rate by a factor at predetermined epochs
- **Exponential Decay**: Decreases the learning rate exponentially over time
- **Cosine Annealing**: Varies the learning rate following a cosine function
- **Learning Rate Warm-up**: Gradually increases the learning rate before decreasing it

## Deep Learning Frameworks

Popular deep learning frameworks include:

- **TensorFlow**: Developed by Google, known for its production-ready deployment options
- **PyTorch**: Developed by Facebook, known for its dynamic computation graph and ease of use
- **Keras**: High-level API that can run on top of TensorFlow, known for its user-friendly interface

## Challenges and Best Practices

### Challenges

- **Overfitting**: Models may memorize training data instead of learning generalizable patterns
- **Vanishing/Exploding Gradients**: Gradients may become very small or very large during backpropagation
- **Computational Resources**: Training deep models requires significant computing power
- **Interpretability**: Deep models are often considered "black boxes" due to their complexity

### Best Practices

- **Data Augmentation**: Artificially increasing the training set by applying transformations
- **Transfer Learning**: Using pre-trained models as a starting point
- **Hyperparameter Tuning**: Systematically searching for optimal hyperparameters
- **Ensemble Methods**: Combining multiple models for better performance
- **Model Distillation**: Training a smaller model to mimic a larger one

By understanding these concepts and techniques, you'll be equipped to apply deep learning to complex problems and contribute to this rapidly evolving field.
            """,
            "created_at": datetime.utcnow()
        }
    ]
    
    await db["theory"].insert_many(theory_content)
    
    print("Database seeded successfully!")

# Add extra routes for integration with frontend
@app.get("/api/health")
async def health_check():
    """Health check endpoint for the frontend to verify the backend is running"""
    return {"status": "ok", "timestamp": datetime.utcnow().isoformat()}

@app.get("/api/seed")
async def seed_data():
    """Endpoint to seed the database with initial data"""
    try:
        await seed_database()
        return {"message": "Database seeded successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error seeding database: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    import asyncio
    
    # Seed the database when the server starts
    asyncio.run(seed_database())
    
    print("Backend API is running at http://localhost:8000")
    print("API documentation available at http://localhost:8000/docs")
