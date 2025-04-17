
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import MainLayout from "@/components/layout/MainLayout";
import { ArrowRight, BookOpen, Code, BarChart } from "lucide-react";

const Home = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="py-20 px-4 md:px-6 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1 space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Master Machine Learning with
                <span className="text-primary"> Theory & Practice</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-md">
                A modern platform for learning machine learning concepts and applying them with hands-on coding exercises.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="gap-2">
                  <Link to="/theory">
                    Start Learning <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/practice">Explore Practice Exercises</Link>
                </Button>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="relative z-10 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 card-gradient">
                <div className="code-block">
                  <pre><code>{`# Simple Linear Regression
import numpy as np
from sklearn.linear_model import LinearRegression

# Sample data
X = np.array([[1], [2], [3], [4], [5]])
y = np.array([2, 4, 5, 4, 6])

# Create and train model
model = LinearRegression()
model.fit(X, y)

# Make predictions
predictions = model.predict(X)
print(f"Coefficient: {model.coef_[0]}")
print(f"Intercept: {model.intercept_}")
`}</code></pre>
                </div>
              </div>
              <div className="absolute -top-4 -bottom-4 -left-4 -right-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg -z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Learn Machine Learning The Right Way</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform combines theoretical knowledge with practical coding exercises to help you master machine learning concepts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card rounded-lg p-6 shadow-sm card-hover">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Comprehensive Theory</h3>
              <p className="text-muted-foreground">
                In-depth explanations of machine learning concepts, algorithms, and mathematics behind the scenes.
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-sm card-hover">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Interactive Coding</h3>
              <p className="text-muted-foreground">
                Practice what you learn with hands-on Python coding exercises and real-world examples.
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-sm card-hover">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <BarChart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
              <p className="text-muted-foreground">
                Track your learning journey and see your progress through different topics and exercises.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-6 bg-muted/30">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your ML Journey?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Sign up today to access all practice exercises and track your progress.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link to="/signup">Create Free Account</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/theory">Browse Theory First</Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Home;
