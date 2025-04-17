
import MainLayout from "@/components/layout/MainLayout";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, ChartBar, GitMerge, Cpu } from "lucide-react";

const topics = [
  {
    id: "intro",
    title: "Introduction to Machine Learning",
    description: "Fundamentals of machine learning and its applications",
    icon: Brain,
    badge: "Beginner",
    subtopics: ["What is Machine Learning?", "Types of Machine Learning", "Applications and Use Cases"],
  },
  {
    id: "supervised",
    title: "Supervised Learning",
    description: "Regression and classification algorithms for labeled data",
    icon: ChartBar,
    badge: "Intermediate",
    subtopics: ["Linear Regression", "Logistic Regression", "Decision Trees", "Support Vector Machines"],
  },
  {
    id: "unsupervised",
    title: "Unsupervised Learning",
    description: "Clustering and dimension reduction techniques",
    icon: GitMerge,
    badge: "Intermediate",
    subtopics: ["K-Means Clustering", "Hierarchical Clustering", "Principal Component Analysis", "t-SNE"],
  },
  {
    id: "deep-learning",
    title: "Deep Learning",
    description: "Neural networks and advanced models",
    icon: Cpu,
    badge: "Advanced",
    subtopics: ["Neural Networks Basics", "Convolutional Neural Networks", "Recurrent Neural Networks", "Transformers"],
  },
];

const Theory = () => {
  return (
    <MainLayout>
      <div className="container py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-4">Theory</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Explore machine learning concepts through comprehensive guides and examples.
            <span className="block mt-2 text-sm text-muted-foreground">
              Content is available for all visitors. Create an account to track your progress.
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {topics.map((topic) => (
            <Card key={topic.id} className="card-hover">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                    <topic.icon className="h-5 w-5 text-primary" />
                  </div>
                  <Badge>{topic.badge}</Badge>
                </div>
                <CardTitle>{topic.title}</CardTitle>
                <CardDescription>{topic.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {topic.subtopics.map((subtopic, index) => (
                    <li key={index} className="flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></span>
                      {subtopic}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Link
                  to={`/theory/${topic.id}`}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Explore this topic →
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Theory;
