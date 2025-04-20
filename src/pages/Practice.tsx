
import React, { useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Link, useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Lock, Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { authApi } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

interface Exercise {
  id: string;
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Expert";
  locked: boolean;
}

type ExerciseLevel = "beginner" | "intermediate" | "advanced";
type Exercises = Record<ExerciseLevel, Exercise[]>;

const exercises: Exercises = {
  beginner: [
    { id: "linear-regression", title: "Linear Regression", description: "Implement a simple linear regression model", difficulty: "Easy", locked: false },
    { id: "decision-trees", title: "Decision Trees", description: "Build a decision tree classifier", difficulty: "Medium", locked: false },
    { id: "data-preprocessing", title: "Data Preprocessing", description: "Implement data preprocessing techniques", difficulty: "Hard", locked: false }
  ],
  intermediate: [
    { id: "kmeans-clustering", title: "K-Means Clustering", description: "Implement K-Means clustering", difficulty: "Medium", locked: true },
    { id: "random-forest", title: "Random Forest Classifier", description: "Build a random forest classifier", difficulty: "Medium", locked: true },
    { id: "gradient-descent", title: "Gradient Descent", description: "Implement gradient descent optimization", difficulty: "Hard", locked: true }
  ],
  advanced: [
    { id: "neural-network", title: "Neural Network from Scratch", description: "Build a neural network without frameworks", difficulty: "Hard", locked: true },
    { id: "cnn-implementation", title: "CNN Implementation", description: "Implement a CNN for image classification", difficulty: "Expert", locked: true },
    { id: "nlp-transformer", title: "Transformer for NLP", description: "Implement a transformer model for NLP", difficulty: "Expert", locked: true }
  ]
};

const topics = ["All Topics", "Linear Regression", "Classification", "Neural Networks", "Deep Learning", "NLP", "Computer Vision"] as const;

const Practice = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const selectedTopic = searchParams.get("topic") || "All Topics";
  const navigate = useNavigate();

  // Check authentication status using React Query
  const { data: isAuthenticated = false, isLoading } = useQuery({
    queryKey: ['auth-status'],
    queryFn: async () => {
      try {
        const token = localStorage.getItem("ml_academy_token");
        if (!token) return false;
        
        await authApi.getCurrentUser();
        return true;
      } catch (error) {
        console.error("Auth check error:", error);
        return false;
      }
    },
  });

  // Get user progress if authenticated
  const { data: progress } = useQuery({
    queryKey: ['user-progress'],
    queryFn: authApi.getUserProgress,
    enabled: isAuthenticated,
  });

  const handleSearch = (value: string) => {
    searchParams.set("search", value);
    setSearchParams(searchParams);
  };

  const handleTopicChange = (value: string) => {
    searchParams.set("topic", value);
    setSearchParams(searchParams);
  };

  const filterExercises = (exercises: Exercise[]) => {
    return exercises.filter((exercise) => {
      const matchesSearch = exercise.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exercise.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTopic = selectedTopic === "All Topics" || exercise.title.includes(selectedTopic);
      return matchesSearch && matchesTopic;
    });
  };

  return (
    <MainLayout>
      <div className="container py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-4">Practice</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Apply your knowledge with hands-on coding exercises.
          </p>
  
          {isAuthenticated && progress && (
            <div className="mt-6 p-4 border rounded-lg bg-primary/5">
              <div className="flex flex-col md:flex-row justify-between gap-4 items-center">
                <div>
                  <h3 className="font-medium">Your Progress</h3>
                  <p className="text-sm text-muted-foreground">
                    You've completed {progress.solved_exercises} out of {progress.total_exercises} exercises
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-bold text-primary">{Math.round(progress.progress_percentage)}%</span>
                    <span className="text-xs text-muted-foreground">Progress</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-bold text-primary">{progress.points}</span>
                    <span className="text-xs text-muted-foreground">Points</span>
                  </div>
                  <Button variant="outline" onClick={() => navigate('/profile')}>
                    View Profile
                  </Button>
                </div>
              </div>
            </div>
          )}
  
          {!isAuthenticated && !isLoading && (
            <Alert className="mt-6 border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-100">
              <AlertCircle className="h-4 w-4 mr-2" />
              <AlertDescription>
                You need to <Link to="/login" className="font-medium underline">log in</Link> to submit solutions and track your progress. Some exercises are only available to registered users.
              </AlertDescription>
            </Alert>
          )}
        </div>
  
        {/* Resto del codice della pagina di pratica */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search exercises..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={selectedTopic} onValueChange={handleTopicChange}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Select topic" />
            </SelectTrigger>
            <SelectContent>
              {topics.map((topic) => (
                <SelectItem key={topic} value={topic}>
                  {topic}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
                {filterExercises(exercises[level]).map((exercise) => (
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
                      {exercise.locked && !isAuthenticated ? (
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
                      {exercise.locked && !isAuthenticated ? (
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

// Add missing Button component import
import { Button } from "@/components/ui/button";

export default Practice;
