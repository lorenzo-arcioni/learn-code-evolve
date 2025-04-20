
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import api from "@/services/api";

interface ContentItem {
  name: string;
  path: string;
}

interface Category {
  subcategories: Record<string, Category>;
  files: ContentItem[];
}

interface TheoryContentResponse {
  title: string;
  content: string;
}

// Demo content for preview
const demoStructure = {
  intro: {
    subcategories: {},
    files: [
      { name: "What is Machine Learning", path: "intro/01-what-is-machine-learning" },
      { name: "Types of Machine Learning", path: "intro/02-types-of-machine-learning" }
    ]
  },
  supervised: {
    subcategories: {},
    files: [
      { name: "Linear Regression", path: "supervised/01-linear-regression" }
    ]
  },
  unsupervised: {
    subcategories: {},
    files: [
      { name: "Clustering", path: "unsupervised/01-clustering" }
    ]
  },
  "deep-learning": {
    subcategories: {},
    files: [
      { name: "Neural Networks", path: "deep-learning/01-neural-networks" }
    ]
  }
};

// Demo content for preview
const demoContent: Record<string, TheoryContentResponse> = {
  "intro/01-what-is-machine-learning": {
    title: "What is Machine Learning?",
    content: `
      <p>Machine Learning is a subset of artificial intelligence that focuses on developing systems that can learn from and make decisions based on data. Instead of being explicitly programmed to perform a task, these systems are trained using large amounts of data and algorithms that give them the ability to learn how to perform tasks.</p>

      <h2>Key Concepts</h2>
      <p>Machine learning works by extracting patterns from data. The main types of machine learning are:</p>
      <ol>
        <li><strong>Supervised Learning</strong>: The algorithm is trained on labeled data, learning to map inputs to known outputs.</li>
        <li><strong>Unsupervised Learning</strong>: The algorithm identifies patterns in data without predefined labels.</li>
        <li><strong>Reinforcement Learning</strong>: The algorithm learns by interacting with an environment and receiving feedback in the form of rewards or penalties.</li>
      </ol>

      <h2>Applications</h2>
      <p>Machine learning is used in various fields:</p>
      <ul>
        <li><strong>Healthcare</strong>: Disease diagnosis, patient monitoring</li>
        <li><strong>Finance</strong>: Fraud detection, algorithmic trading</li>
        <li><strong>Transportation</strong>: Self-driving cars, traffic prediction</li>
        <li><strong>Entertainment</strong>: Recommendation systems, content generation</li>
      </ul>
    `
  },
  "intro/02-types-of-machine-learning": {
    title: "Types of Machine Learning",
    content: `
      <h2>Supervised Learning</h2>
      <p>In supervised learning, the algorithm learns from labeled training data, making predictions or decisions based on that data. Examples include:</p>
      <ul>
        <li>Linear Regression</li>
        <li>Logistic Regression</li>
        <li>Decision Trees</li>
        <li>Support Vector Machines</li>
      </ul>

      <h2>Unsupervised Learning</h2>
      <p>In unsupervised learning, the algorithm finds patterns in unlabeled data. Examples include:</p>
      <ul>
        <li>Clustering</li>
        <li>Dimensionality Reduction</li>
        <li>Association Rules</li>
      </ul>

      <h2>Reinforcement Learning</h2>
      <p>In reinforcement learning, an agent learns to make decisions by taking actions in an environment to maximize a reward. Examples include:</p>
      <ul>
        <li>Q-Learning</li>
        <li>Deep Q Networks</li>
        <li>Policy Gradient Methods</li>
      </ul>
    `
  },
  "supervised/01-linear-regression": {
    title: "Linear Regression",
    content: `
      <h2>Introduction to Linear Regression</h2>
      <p>Linear regression is one of the most basic and widely used supervised learning algorithms. It models the relationship between a dependent variable and one or more independent variables using a linear equation.</p>

      <h2>Mathematical Representation</h2>
      <p>The basic form of linear regression is:</p>
      <p><code>y = mx + b</code></p>
      <p>Where:</p>
      <ul>
        <li><code>y</code> is the dependent variable</li>
        <li><code>x</code> is the independent variable</li>
        <li><code>m</code> is the slope</li>
        <li><code>b</code> is the y-intercept</li>
      </ul>

      <h2>Implementation in Python</h2>
      <pre><code>
import numpy as np
from sklearn.linear_model import LinearRegression

# Sample data
X = np.array([[1], [2], [3], [4]])
y = np.array([2, 4, 6, 8])

# Create and train model
model = LinearRegression()
model.fit(X, y)

# Make prediction
prediction = model.predict([[5]])
print(f"Prediction for input 5: {prediction[0]}")
      </code></pre>
    `
  },
  "unsupervised/01-clustering": {
    title: "Clustering Algorithms",
    content: `
      <h2>What is Clustering?</h2>
      <p>Clustering is an unsupervised learning technique that groups similar data points together based on certain features or characteristics. The goal is to find inherent structures in the data.</p>

      <h2>Popular Clustering Algorithms</h2>
      <h3>K-Means Clustering</h3>
      <p>K-means clustering partitions data into K distinct clusters based on distance to the centroid of a cluster.</p>
      <pre><code>
from sklearn.cluster import KMeans
import numpy as np

# Sample data
X = np.array([[1, 2], [1, 4], [1, 0], [4, 2], [4, 4], [4, 0]])

# Create and train model
kmeans = KMeans(n_clusters=2, random_state=0)
kmeans.fit(X)

# Predict cluster for new data
print(kmeans.predict([[0, 0], [4, 4]]))
      </code></pre>

      <h3>Hierarchical Clustering</h3>
      <p>Hierarchical clustering builds a tree of clusters, providing a more detailed view of the data structure.</p>
    `
  },
  "deep-learning/01-neural-networks": {
    title: "Neural Networks Basics",
    content: `
      <h2>Introduction to Neural Networks</h2>
      <p>Neural networks are computational models inspired by the human brain. They consist of layers of interconnected nodes (neurons) that process information.</p>

      <h2>Components of a Neural Network</h2>
      <ul>
        <li><strong>Input Layer</strong>: Receives the initial data</li>
        <li><strong>Hidden Layers</strong>: Process the inputs using weighted connections</li>
        <li><strong>Output Layer</strong>: Produces the final result</li>
        <li><strong>Weights and Biases</strong>: Parameters that are adjusted during training</li>
        <li><strong>Activation Functions</strong>: Non-linear functions that determine the output of a neuron</li>
      </ul>

      <h2>Simple Neural Network in Python</h2>
      <pre><code>
import tensorflow as tf

# Create a simple sequential model
model = tf.keras.Sequential([
    tf.keras.layers.Dense(128, activation='relu', input_shape=(784,)),
    tf.keras.layers.Dropout(0.2),
    tf.keras.layers.Dense(10, activation='softmax')
])

# Compile the model
model.compile(
    optimizer='adam',
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)
      </code></pre>
    `
  }
};

const TheoryTopic = () => {
  const { topicId, contentPath } = useParams();
  const navigate = useNavigate();
  const [structure, setStructure] = useState<Record<string, Category>>({});
  const [isLoadingStructure, setIsLoadingStructure] = useState(true);
  const [content, setContent] = useState<TheoryContentResponse | null>(null);
  const [isLoadingContent, setIsLoadingContent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usingDemoContent, setUsingDemoContent] = useState(false);

  useEffect(() => {
    const fetchStructure = async () => {
      try {
        const response = await api.get("/theory/structure");
        setStructure(response.data);
        setUsingDemoContent(false);
      } catch (err) {
        console.error("Failed to fetch theory structure:", err);
        // Use demo structure when backend is not available
        setStructure(demoStructure);
        setUsingDemoContent(true);
      } finally {
        setIsLoadingStructure(false);
      }
    };

    fetchStructure();
  }, []);

  useEffect(() => {
    if (contentPath) {
      const fetchContent = async () => {
        setIsLoadingContent(true);
        
        if (usingDemoContent) {
          // Use demo content when backend is not available
          setTimeout(() => {
            const demoContentItem = demoContent[contentPath];
            if (demoContentItem) {
              setContent(demoContentItem);
              setError(null);
            } else {
              setError("Requested content not found in demo data.");
            }
            setIsLoadingContent(false);
          }, 300); // Simulate loading
          return;
        }
        
        try {
          const response = await api.get(`/theory/content/${contentPath}`);
          setContent(response.data);
          setError(null);
        } catch (err) {
          console.error("Failed to fetch theory content:", err);
          // Fallback to demo content if available when API fails
          if (demoContent[contentPath]) {
            setContent(demoContent[contentPath]);
            setError(null);
          } else {
            setError("Failed to load the requested content. It might not exist or there was a server error.");
          }
        } finally {
          setIsLoadingContent(false);
        }
      };

      fetchContent();
    } else {
      setContent(null);
    }
  }, [contentPath, usingDemoContent]);

  const renderNav = (category: Category, currentPath: string = "", depth: number = 0) => {
    return (
      <div key={currentPath} className="space-y-1">
        {Object.entries(category.subcategories).map(([key, subCategory]) => (
          <div key={key} className="space-y-1">
            <div className={`pl-${depth * 2} font-medium text-sm text-muted-foreground`}>
              {key}
            </div>
            {renderNav(subCategory, `${currentPath}/${key}`.replace(/^\//, ''), depth + 1)}
          </div>
        ))}
        {category.files.map((file) => (
          <Link
            key={file.path}
            to={`/theory/${topicId}/${file.path.replace(/\.md$/, '')}`}
            className={`block pl-${depth * 2 + 2} py-1 text-sm rounded hover:bg-accent ${
              contentPath === file.path.replace(/\.md$/, '') ? "bg-accent/50 font-medium" : ""
            }`}
          >
            {file.name}
          </Link>
        ))}
      </div>
    );
  };

  // Find the current topic category
  const currentCategory = topicId && structure[topicId] ? structure[topicId] : null;

  return (
    <MainLayout>
      <div className="container py-8">
        <div className="mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/theory")}
            className="mb-4"
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Theory
          </Button>
          <h1 className="text-3xl font-bold">
            {topicId === "intro"
              ? "Introduction to Machine Learning"
              : topicId === "supervised"
              ? "Supervised Learning"
              : topicId === "unsupervised"
              ? "Unsupervised Learning"
              : topicId === "deep-learning"
              ? "Deep Learning"
              : "Theory"}
          </h1>
          <Separator className="my-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="md:col-span-1">
            <CardContent className="p-4">
              <h3 className="font-medium mb-3">Topics</h3>
              {usingDemoContent && (
                <div className="mb-3 text-xs text-amber-600 dark:text-amber-400 p-2 bg-amber-50 dark:bg-amber-950/30 rounded">
                  Showing demo content. Backend connection unavailable.
                </div>
              )}
              <ScrollArea className="h-[calc(100vh-300px)]">
                {isLoadingStructure ? (
                  <div className="flex items-center justify-center p-4">
                    <Loader2 className="h-6 w-6 animate-spin" />
                  </div>
                ) : currentCategory ? (
                  renderNav(currentCategory)
                ) : (
                  <p className="text-sm text-muted-foreground">No content available</p>
                )}
              </ScrollArea>
            </CardContent>
          </Card>

          <Card className="md:col-span-3">
            <CardContent className="p-6">
              {isLoadingContent ? (
                <div className="flex items-center justify-center p-8">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : error ? (
                <div className="p-4 border border-red-200 rounded bg-red-50 text-red-700">
                  {error}
                </div>
              ) : content ? (
                <article className="prose max-w-none">
                  <h1>{content.title}</h1>
                  <div dangerouslySetInnerHTML={{ __html: content.content }} />
                </article>
              ) : (
                <div className="text-center p-8 text-muted-foreground">
                  <p>Select a topic from the sidebar to view its content.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default TheoryTopic;
