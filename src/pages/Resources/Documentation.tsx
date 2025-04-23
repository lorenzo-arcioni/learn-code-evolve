import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Documentation = () => {
  return (
    <MainLayout>
      <div className="container py-12">
        <h1 className="text-4xl font-bold mb-8">Documentation</h1>
        
        <Tabs defaultValue="platform" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-3 md:inline-flex mb-8">
            <TabsTrigger value="platform">Platform Guide</TabsTrigger>
            <TabsTrigger value="api">API Reference</TabsTrigger>
            <TabsTrigger value="examples">Examples</TabsTrigger>
          </TabsList>
          
          <TabsContent value="platform" className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
              <p className="mb-4">
                ML Learn is a comprehensive platform for learning machine learning through both theory and practice.
                This guide will help you understand how to use the platform effectively.
              </p>
              
              <h3 className="text-xl font-medium mt-6 mb-3">Account Creation</h3>
              <p>
                To get started, create an account by navigating to the Sign Up page. Once registered, you'll have access
                to all learning materials, exercises, and can track your progress across the platform.
              </p>
              
              <h3 className="text-xl font-medium mt-6 mb-3">Learning Path</h3>
              <p>
                We recommend following this learning path:
              </p>
              <ol className="list-decimal pl-6 mb-4 space-y-2">
                <li>Start with the <strong>Theory</strong> section to understand the fundamentals</li>
                <li>Apply your knowledge in the <strong>Practice</strong> section by solving exercises</li>
                <li>Join a <strong>Course</strong> to get structured learning with guidance</li>
                <li>Check the <strong>Leaderboard</strong> to see your progress compared to others</li>
              </ol>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">Theory Section</h2>
              <p>
                The Theory section contains comprehensive articles on various machine learning topics, organized by category.
                Each article includes mathematical foundations, practical applications, and links to related topics.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">Practice Section</h2>
              <p>
                The Practice section offers coding exercises of varying difficulty levels. You can write and test your code
                directly in the browser, and receive immediate feedback on your solutions.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="api" className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">API Overview</h2>
              <p className="mb-4">
                ML Learn provides a RESTful API that allows you to access our platform's resources programmatically.
                This documentation covers the available endpoints, authentication, and usage examples.
              </p>
              
              <h3 className="text-xl font-medium mt-6 mb-3">Authentication</h3>
              <p>
                All API requests require authentication using JWT tokens. You can obtain a token by making a POST request
                to the <code>/token</code> endpoint with your username and password.
              </p>
              
              <div className="bg-gray-100 p-4 rounded-md my-4">
                <pre className="text-sm">
                  POST /token<br/>
                  Content-Type: application/x-www-form-urlencoded<br/><br/>
                  username=your_username&password=your_password
                </pre>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">Endpoints</h2>
              
              <h3 className="text-xl font-medium mt-6 mb-3">User Endpoints</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><code>GET /users/me</code> - Get current user information</li>
                <li><code>PUT /users/me</code> - Update user profile</li>
                <li><code>POST /users/me/avatar</code> - Upload user avatar</li>
                <li><code>GET /users/me/progress</code> - Get user progress statistics</li>
              </ul>
              
              <h3 className="text-xl font-medium mt-6 mb-3">Exercise Endpoints</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><code>GET /exercises/</code> - List all exercises</li>
                <li><code>GET /exercises/{`{exercise_id}`}</code> - Get exercise details</li>
                <li><code>POST /exercises/{`{exercise_id}`}/submit</code> - Submit exercise solution</li>
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="examples" className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Code Examples</h2>
              
              <h3 className="text-xl font-medium mt-6 mb-3">Linear Regression Example</h3>
              <div className="bg-gray-100 p-4 rounded-md my-4">
                <pre className="text-sm">
{`import numpy as np
from sklearn.linear_model import LinearRegression
import matplotlib.pyplot as plt

# Generate sample data
np.random.seed(0)
X = np.random.rand(100, 1)
y = 2 + 3 * X + np.random.randn(100, 1) * 0.1

# Train the model
model = LinearRegression()
model.fit(X, y)

# Make predictions
X_test = np.array([[0], [1]])
y_pred = model.predict(X_test)

# Print results
print(f"Intercept: {model.intercept_}")
print(f"Coefficient: {model.coef_}")
print(f"R^2 Score: {model.score(X, y)}")

# Plot the results
plt.scatter(X, y, color='blue')
plt.plot(X_test, y_pred, color='red', linewidth=3)
plt.title('Linear Regression Example')
plt.xlabel('X')
plt.ylabel('y')
plt.show()`}
                </pre>
              </div>
              
              <h3 className="text-xl font-medium mt-6 mb-3">K-Means Clustering Example</h3>
              <div className="bg-gray-100 p-4 rounded-md my-4">
                <pre className="text-sm">
{`import numpy as np
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans
from sklearn.datasets import make_blobs

# Generate sample data
n_samples = 300
n_features = 2
n_clusters = 3
random_state = 42

X, y = make_blobs(n_samples=n_samples, n_features=n_features, 
                 centers=n_clusters, random_state=random_state)

# Train K-Means model
kmeans = KMeans(n_clusters=n_clusters, random_state=random_state)
kmeans.fit(X)
y_pred = kmeans.predict(X)

# Plot results
plt.figure(figsize=(10, 6))
plt.scatter(X[:, 0], X[:, 1], c=y_pred, cmap='viridis', alpha=0.7)

# Plot centroids
centroids = kmeans.cluster_centers_
plt.scatter(centroids[:, 0], centroids[:, 1], s=100, c='red', marker='x')

plt.title('K-Means Clustering')
plt.xlabel('Feature 1')
plt.ylabel('Feature 2')
plt.show()`}
                </pre>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Documentation;