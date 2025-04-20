
# Linear Regression

Linear regression is one of the fundamental supervised learning algorithms in machine learning, used for predicting a continuous target variable based on one or more predictor variables.

## Basic Concept

Linear regression models the relationship between a dependent variable $y$ and one or more independent variables $X$ using a linear equation:

$$y = \beta_0 + \beta_1 x_1 + \beta_2 x_2 + ... + \beta_n x_n + \epsilon$$

Where:
- $y$ is the target variable
- $x_1, x_2, ..., x_n$ are the features
- $\beta_0, \beta_1, ..., \beta_n$ are the coefficients to be estimated
- $\epsilon$ is the error term

## Simple Linear Regression

Simple linear regression involves only one independent variable:

$$y = \beta_0 + \beta_1 x + \epsilon$$

The goal is to find the line that best fits the data by minimizing the sum of squared errors.

## Cost Function

The most common cost function for linear regression is the Mean Squared Error (MSE):

$$J(\beta) = \frac{1}{2m} \sum_{i=1}^{m} (h_\beta(x^{(i)}) - y^{(i)})^2$$

Where:
- $m$ is the number of training examples
- $h_\beta(x)$ is the hypothesis function ($\beta_0 + \beta_1 x_1 + ... + \beta_n x_n$)
- $y^{(i)}$ is the actual target value

## Gradient Descent

Gradient descent is an optimization algorithm used to minimize the cost function:

$$\beta_j := \beta_j - \alpha \frac{\partial}{\partial \beta_j} J(\beta)$$

Where $\alpha$ is the learning rate.

For linear regression, the update rule becomes:

$$\beta_j := \beta_j - \alpha \frac{1}{m} \sum_{i=1}^{m} (h_\beta(x^{(i)}) - y^{(i)}) \cdot x_j^{(i)}$$

## Multiple Linear Regression

Multiple linear regression extends the concept to multiple features:

$$y = \beta_0 + \beta_1 x_1 + \beta_2 x_2 + ... + \beta_n x_n + \epsilon$$

In vector notation:

$$y = X\beta + \epsilon$$

## Implementation in Python

```python
import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score

# Generate sample data
np.random.seed(42)
X = 2 * np.random.rand(100, 1)
y = 4 + 3 * X + np.random.randn(100, 1)

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = LinearRegression()
model.fit(X_train, y_train)

# Make predictions
y_pred = model.predict(X_test)

# Evaluate model
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print(f"Intercept: {model.intercept_}")
print(f"Coefficient: {model.coef_}")
print(f"Mean Squared Error: {mse}")
print(f"R² Score: {r2}")

# Plot results
plt.scatter(X_test, y_test, color='blue', label='Actual')
plt.plot(X_test, y_pred, color='red', linewidth=2, label='Predicted')
plt.xlabel('X')
plt.ylabel('y')
plt.legend()
plt.show()
```

## Assumptions of Linear Regression

1. **Linearity**: The relationship between features and target is linear
2. **Independence**: Observations are independent of each other
3. **Homoscedasticity**: Constant variance of errors
4. **Normality**: Errors are normally distributed
5. **No multicollinearity**: Independent variables are not highly correlated

## Regularization

To prevent overfitting, regularization techniques can be applied:

- **Ridge Regression (L2)**: Adds the squared magnitude of coefficients as a penalty term
- **Lasso Regression (L1)**: Adds the absolute magnitude of coefficients as a penalty term
- **Elastic Net**: Combines L1 and L2 regularization

## Conclusion

Linear regression provides a powerful yet simple approach for predictive modeling with continuous outcomes. Despite its simplicity, it serves as the foundation for many advanced regression techniques and is widely used in various fields.

