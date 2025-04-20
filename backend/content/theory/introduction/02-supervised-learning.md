
# Supervised Learning

Supervised learning is a type of machine learning where the algorithm learns from labeled training data to make predictions about new, unseen data.

## Key Concepts

In supervised learning:
- Each training example has input features ($X$) and a target variable ($y$)
- The goal is to learn a function $f(X) \approx y$
- This function can then make predictions on new data

## Common Tasks

1. **Classification**
   - Predicting a categorical label
   - Example: Spam detection
   - Algorithms: SVM, Random Forest, Neural Networks

2. **Regression**
   - Predicting a continuous value
   - Example: House price prediction
   - Algorithms: Linear Regression, Decision Trees

## Mathematical Foundations

For linear regression with multiple features:

$$
h_\theta(x) = \theta_0 + \theta_1x_1 + \theta_2x_2 + ... + \theta_nx_n
$$

Cost function:

$$
J(\theta) = \frac{1}{2m}\sum_{i=1}^m(h_\theta(x^{(i)}) - y^{(i)})^2
$$

## Next Steps

Continue to [[unsupervised-learning|Unsupervised Learning]] to learn about working with unlabeled data.
