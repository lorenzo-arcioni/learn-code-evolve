
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
import { AlertCircle, Lock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";

const exercises = {
  beginner: [
    {
      id: "linear-regression",
      title: "Linear Regression Implementation",
      description: "Implement a simple linear regression model from scratch",
      difficulty: "Easy",
      locked: false,
    },
    {
      id: "decision-trees",
      title: "Decision Tree Classifier",
      description: "Build a decision tree for classification tasks",
      difficulty: "Easy",
      locked: false,
    },
    {
      id: "data-preprocessing",
      title: "Data Preprocessing",
      description: "Implement data cleaning and preprocessing techniques",
      difficulty: "Medium",
      locked: false,
    },
  ],
  intermediate: [
    {
      id: "kmeans-clustering",
      title: "K-Means Clustering",
      description: "Implement the K-Means clustering algorithm",
      difficulty: "Medium",
      locked: true,
    },
    {
      id: "random-forest",
      title: "Random Forest Classifier",
      description: "Build an ensemble of decision trees for classification",
      difficulty: "Medium",
      locked: true,
    },
    {
      id: "gradient-descent",
      title: "Gradient Descent Optimization",
      description: "Implement various gradient descent optimization algorithms",
      difficulty: "Hard",
      locked: true,
    },
  ],
  advanced: [
    {
      id: "neural-network",
      title: "Neural Network from Scratch",
      description: "Build a simple neural network without using frameworks",
      difficulty: "Hard",
      locked: true,
    },
    {
      id: "cnn-implementation",
      title: "Convolutional Neural Network",
      description: "Implement a CNN for image classification",
      difficulty: "Hard",
      locked: true,
    },
    {
      id: "nlp-transformer",
      title: "Transformer Model for NLP",
      description: "Build a simple transformer model for text processing",
      difficulty: "Expert",
      locked: true,
    },
  ],
};

const Practice = () => {
  return (
    <MainLayout>
      <div className="container py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-4">Practice</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Apply your knowledge with hands-on coding exercises.
          </p>
          <Alert className="mt-6 border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-100">
            <AlertCircle className="h-4 w-4 mr-2" />
            <AlertDescription>
              You need to <Link to="/login" className="font-medium underline">log in</Link> to submit solutions and track your progress. Some exercises are only available to registered users.
            </AlertDescription>
          </Alert>
        </div>

        <Tabs defaultValue="beginner" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="beginner">Beginner</TabsTrigger>
            <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
          
          {(["beginner", "intermediate", "advanced"] as const).map((level) => (
            <TabsContent key={level} value={level} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {exercises[level].map((exercise) => (
                  <Card key={exercise.id} className={`card-hover ${exercise.locked ? 'opacity-80' : ''}`}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <Badge className={
                          exercise.difficulty === "Easy" ? "bg-green-500" :
                          exercise.difficulty === "Medium" ? "bg-amber-500" :
                          exercise.difficulty === "Hard" ? "bg-red-500" : "bg-purple-600"
                        }>
                          {exercise.difficulty}
                        </Badge>
                        {exercise.locked && (
                          <Lock className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                      <CardTitle className="mt-2">{exercise.title}</CardTitle>
                      <CardDescription>{exercise.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {exercise.locked ? (
                        <p className="text-sm text-muted-foreground">
                          This exercise is available only for registered users.
                        </p>
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          Complete this coding challenge to test your understanding.
                        </p>
                      )}
                    </CardContent>
                    <CardFooter>
                      {exercise.locked ? (
                        <Link
                          to="/signup"
                          className="text-sm font-medium text-primary hover:underline"
                        >
                          Create account to unlock →
                        </Link>
                      ) : (
                        <Link
                          to={`/practice/${exercise.id}`}
                          className="text-sm font-medium text-primary hover:underline"
                        >
                          Start exercise →
                        </Link>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Practice;
