
# Types of Machine Learning

Machine learning algorithms can be categorized into several types based on how they learn and the kind of problems they solve.

## Supervised Learning

In supervised learning, the algorithm learns from labeled training data, trying to find a function that best maps inputs to outputs.

### Key Algorithms:

- **Linear Regression**: Predicts continuous values
- **Logistic Regression**: Used for binary classification
- **Decision Trees**: Tree-like model of decisions
- **Support Vector Machines (SVM)**: Creates a hyperplane for classification
- **Neural Networks**: Multiple layers of neurons for complex patterns

### Mathematical Representation:

For linear regression, we minimize the cost function:

$$J(\theta) = \frac{1}{2m} \sum_{i=1}^{m} (h_\theta(x^{(i)}) - y^{(i)})^2$$

Where $h_\theta(x)$ is the hypothesis, $x^{(i)}$ and $y^{(i)}$ are the input and output values.

## Unsupervised Learning

Unsupervised learning works with unlabeled data, finding patterns or intrinsic structures within the data.

### Key Algorithms:

- **K-Means Clustering**: Groups similar data points
- **Hierarchical Clustering**: Creates tree of clusters
- **Principal Component Analysis (PCA)**: Reduces dimensionality
- **Autoencoders**: Neural networks for efficient data encoding

### Mathematical Representation:

For K-means clustering, we minimize:

$$J(c,\mu) = \sum_{i=1}^{m} ||x^{(i)} - \mu_{c^{(i)}}||^2$$

Where $c^{(i)}$ is the cluster assignment and $\mu_{c^{(i)}}$ is the centroid of the cluster.

## Reinforcement Learning

Reinforcement learning trains algorithms to make sequences of decisions by receiving feedback from the environment.

### Key Concepts:

- **Agent**: The learner or decision-maker
- **Environment**: Everything the agent interacts with
- **Action**: What the agent can do
- **Reward**: Feedback from the environment

### Mathematical Representation:

The goal is to maximize the expected cumulative reward:

$$V(s) = \mathbb{E}[\sum_{t=0}^{\infty} \gamma^t R_{t+1} | S_0 = s]$$

Where $V(s)$ is the value function, $\gamma$ is the discount factor, and $R_{t+1}$ is the reward.

## Semi-Supervised Learning

Semi-supervised learning uses both labeled and unlabeled data for training.

## Transfer Learning

Transfer learning applies knowledge from one domain to another related domain.

```python
# Example of transfer learning using a pre-trained model
import tensorflow as tf
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D
from tensorflow.keras.models import Model

# Load pre-trained model
base_model = MobileNetV2(weights='imagenet', include_top=False)

# Freeze base model layers
for layer in base_model.layers:
    layer.trainable = False

# Add new classifier layers
x = base_model.output
x = GlobalAveragePooling2D()(x)
x = Dense(1024, activation='relu')(x)
predictions = Dense(10, activation='softmax')(x)

# Create new model
model = Model(inputs=base_model.input, outputs=predictions)

# Compile model
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
```

## Conclusion

Each type of machine learning has its specific use cases and strengths. Understanding when to apply each type is crucial for successful implementation of machine learning solutions.

