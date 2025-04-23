import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

const ApiPage = () => {
  return (
    <MainLayout>
      <div className="container py-12">
        <h1 className="text-4xl font-bold mb-8">ML Learn API</h1>
        
        <Alert className="mb-8 bg-primary/10 border-primary/20">
          <InfoIcon className="h-4 w-4 mr-2" />
          <AlertDescription>
            This documentation describes the ML Learn RESTful API. You need an API key to use most endpoints.
          </AlertDescription>
        </Alert>
        
        <Tabs defaultValue="intro" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-4 md:inline-flex mb-8">
            <TabsTrigger value="intro">Introduction</TabsTrigger>
            <TabsTrigger value="auth">Authentication</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="examples">Examples</TabsTrigger>
          </TabsList>
          
          <TabsContent value="intro" className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">API Introduction</h2>
              <p className="mb-4">
                The ML Learn API allows you to programmatically access our platform's resources, manage user accounts,
                track progress, and interact with our machine learning features.
              </p>
              
              <h3 className="text-xl font-medium mt-6 mb-3">Base URL</h3>
              <div className="bg-gray-100 p-4 rounded-md my-4">
                <code>https://api.mllearn.com/v1</code>
              </div>
              
              <h3 className="text-xl font-medium mt-6 mb-3">Response Format</h3>
              <p className="mb-4">
                All API responses are returned in JSON format. Successful responses have a 2xx status code and include the requested data.
                Error responses have a 4xx or 5xx status code and include an error message.
              </p>
              
              <div className="bg-gray-100 p-4 rounded-md my-4">
                <pre className="text-sm">
{`// Success response example
{
  "data": {
    "id": "123",
    "username": "johndoe",
    "email": "john@example.com"
  }
}

// Error response example
{
  "error": {
    "code": "invalid_credentials",
    "message": "Invalid username or password"
  }
}`}
                </pre>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="auth" className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Authentication</h2>
              <p className="mb-4">
                ML Learn API uses JWT tokens for authentication. You need to obtain a token before making authenticated requests.
              </p>
              
              <h3 className="text-xl font-medium mt-6 mb-3">Obtaining a Token</h3>
              <p className="mb-4">
                To get a token, make a POST request to the <code>/token</code> endpoint with your credentials:
              </p>
              
              <div className="bg-gray-100 p-4 rounded-md my-4">
                <pre className="text-sm">
{`POST /token
Content-Type: application/x-www-form-urlencoded

username=your_username&password=your_password

// Response
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}`}
                </pre>
              </div>
              
              <h3 className="text-xl font-medium mt-6 mb-3">Using the Token</h3>
              <p className="mb-4">
                Include the token in the Authorization header of all your API requests:
              </p>
              
              <div className="bg-gray-100 p-4 rounded-md my-4">
                <pre className="text-sm">
{`GET /users/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`}
                </pre>
              </div>
              
              <h3 className="text-xl font-medium mt-6 mb-3">Token Expiration</h3>
              <p>
                Tokens are valid for 24 hours after issuance. After expiration, you need to request a new token.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="resources" className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">API Resources</h2>
              
              <h3 className="text-xl font-medium mt-6 mb-3">User Endpoints</h3>
              <table className="w-full border-collapse mb-6">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Endpoint</th>
                    <th className="border p-2 text-left">Method</th>
                    <th className="border p-2 text-left">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2"><code>/users/me</code></td>
                    <td className="border p-2">GET</td>
                    <td className="border p-2">Get current user profile</td>
                  </tr>
                  <tr>
                    <td className="border p-2"><code>/users/me</code></td>
                    <td className="border p-2">PUT</td>
                    <td className="border p-2">Update user profile</td>
                  </tr>
                  <tr>
                    <td className="border p-2"><code>/users/me/avatar</code></td>
                    <td className="border p-2">POST</td>
                    <td className="border p-2">Upload user avatar</td>
                  </tr>
                  <tr>
                    <td className="border p-2"><code>/users/me/progress</code></td>
                    <td className="border p-2">GET</td>
                    <td className="border p-2">Get user progress</td>
                  </tr>
                </tbody>
              </table>
              
              <h3 className="text-xl font-medium mt-6 mb-3">Exercise Endpoints</h3>
              <table className="w-full border-collapse mb-6">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Endpoint</th>
                    <th className="border p-2 text-left">Method</th>
                    <th className="border p-2 text-left">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2"><code>/exercises</code></td>
                    <td className="border p-2">GET</td>
                    <td className="border p-2">List all exercises</td>
                  </tr>
                  <tr>
                    <td className="border p-2"><code>/exercises/{`{id}`}</code></td>
                    <td className="border p-2">GET</td>
                    <td className="border p-2">Get exercise details</td>
                  </tr>
                  <tr>
                    <td className="border p-2"><code>/exercises/{`{id}`}/submit</code></td>
                    <td className="border p-2">POST</td>
                    <td className="border p-2">Submit exercise solution</td>
                  </tr>
                </tbody>
              </table>
              
              <h3 className="text-xl font-medium mt-6 mb-3">Theory Endpoints</h3>
              <table className="w-full border-collapse mb-6">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Endpoint</th>
                    <th className="border p-2 text-left">Method</th>
                    <th className="border p-2 text-left">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2"><code>/theory</code></td>
                    <td className="border p-2">GET</td>
                    <td className="border p-2">List all theory articles</td>
                  </tr>
                  <tr>
                    <td className="border p-2"><code>/theory/{`{path}`}</code></td>
                    <td className="border p-2">GET</td>
                    <td className="border p-2">Get theory content</td>
                  </tr>
                  <tr>
                    <td className="border p-2"><code>/theory/structure</code></td>
                    <td className="border p-2">GET</td>
                    <td className="border p-2">Get theory structure</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabsContent>
          
          <TabsContent value="examples" className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">API Usage Examples</h2>
              
              <h3 className="text-xl font-medium mt-6 mb-3">Authentication</h3>
              <div className="bg-gray-100 p-4 rounded-md my-4">
                <pre className="text-sm">
{`# Python example using requests
import requests

# Get token
response = requests.post(
    "https://api.mllearn.com/v1/token",
    data={"username": "your_username", "password": "your_password"}
)
token = response.json()["access_token"]

# Use token for authenticated requests
headers = {"Authorization": f"Bearer {token}"}
user_response = requests.get("https://api.mllearn.com/v1/users/me", headers=headers)
user_data = user_response.json()
print(user_data)`}
                </pre>
              </div>
              
              <h3 className="text-xl font-medium mt-6 mb-3">Submitting an Exercise Solution</h3>
              <div className="bg-gray-100 p-4 rounded-md my-4">
                <pre className="text-sm">
{`# Python example using requests
import requests

# Authenticate first (see previous example)
# ...

# Submit solution for exercise "linear-regression"
solution_code = """
import numpy as np
from sklearn.linear_model import LinearRegression

# Create and train model
X = np.array([[1], [2], [3], [4], [5]])
y = np.array([2, 4, 6, 8, 10])
model = LinearRegression()
model.fit(X, y)

# Print results
print(f"Coefficient: {model.coef_[0]}")
print(f"Intercept: {model.intercept_}")
"""

response = requests.post(
    "https://api.mllearn.com/v1/exercises/linear-regression/submit",
    headers=headers,
    json={"code": solution_code}
)

result = response.json()
print(f"Status: {result['success']}")
print(f"Output: {result['stdout']}")
print(f"Errors: {result['stderr']}")
print(f"Points earned: {result['points_earned']}")`}
                </pre>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default ApiPage;