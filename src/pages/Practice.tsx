
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { exerciseApi, authApi } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import MainLayout from "@/components/layout/MainLayout";
import { BookOpen, Code, ArrowRight, CheckCircle, Clock } from "lucide-react";
import { toast } from "sonner";

// Define the Exercise type
interface Exercise {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  content: string;
  locked: boolean;
  created_at: string;
}

// Define the UserProgress type
interface UserProgress {
  total_exercises: number;
  solved_exercises: number;
  progress_percentage: number;
  points: number;
}

const DifficultyBadge = ({ difficulty }: { difficulty: string }) => {
  const colorMap: Record<string, string> = {
    "Easy": "bg-green-500",
    "Medium": "bg-yellow-500",
    "Hard": "bg-orange-500",
    "Expert": "bg-red-500",
  };
  
  return (
    <Badge className={`${colorMap[difficulty] || "bg-blue-500"}`}>
      {difficulty}
    </Badge>
  );
};

const Practice = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  
  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("ml_academy_token");
    setIsLoggedIn(!!token);
  }, []);
  
  // Get user progress if logged in
  const { data: userProgress, isLoading: isLoadingProgress } = useQuery({
    queryKey: ["userProgress"],
    queryFn: authApi.getUserProgress,
    enabled: isLoggedIn,
    onError: (error: any) => {
      console.error("Error fetching user progress:", error);
      if (error.response?.status === 401) {
        // If unauthorized, user's token may be expired
        authApi.logout();
        setIsLoggedIn(false);
        toast.error("Your session has expired. Please log in again.");
      }
    },
  });
  
  // Get all exercises
  const { data: exercises, isLoading: isLoadingExercises } = useQuery({
    queryKey: ["exercises"],
    queryFn: exerciseApi.getAllExercises,
    onError: (error: any) => {
      console.error("Error fetching exercises:", error);
      toast.error("Failed to load exercises. Please try again.");
    },
  });
  
  const handleExerciseClick = (id: string) => {
    navigate(`/exercises/${id}`);
  };
  
  return (
    <MainLayout>
      <div className="container py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Practice Exercises</h1>
          {isLoggedIn && !isLoadingProgress && userProgress && (
            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Progress:</span>
                <div className="w-48">
                  <Progress value={userProgress.progress_percentage} className="h-2" />
                </div>
                <span className="text-sm font-medium">{Math.round(userProgress.progress_percentage)}%</span>
              </div>
              <div className="text-sm">
                <span className="font-medium">{userProgress.solved_exercises}</span> of <span className="font-medium">{userProgress.total_exercises}</span> exercises completed
              </div>
            </div>
          )}
        </div>
        
        {!isLoggedIn && (
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium mb-1">Track Your Progress</h3>
                  <p className="text-muted-foreground">Sign in to track your progress and save your work</p>
                </div>
                <Button onClick={() => navigate("/login")}>Sign In</Button>
              </div>
            </CardContent>
          </Card>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoadingExercises ? (
            Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="pb-2">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </CardContent>
                <CardFooter>
                  <div className="h-10 bg-gray-200 rounded w-full"></div>
                </CardFooter>
              </Card>
            ))
          ) : (
            exercises?.map((exercise: Exercise) => (
              <Card key={exercise.id} className={exercise.locked ? "opacity-70" : ""}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{exercise.title}</CardTitle>
                    <DifficultyBadge difficulty={exercise.difficulty} />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4 line-clamp-2">
                    {exercise.description}
                  </CardDescription>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    {exercise.locked ? (
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>Locked</span>
                      </div>
                    ) : (
                      <>
                        {isLoggedIn && userProgress?.solved_exercises.includes(exercise.id) && (
                          <div className="flex items-center text-green-500">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            <span>Completed</span>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => handleExerciseClick(exercise.id)} 
                    variant={exercise.locked ? "outline" : "default"}
                    className="w-full"
                    disabled={exercise.locked}
                  >
                    <span className="mr-2">
                      {exercise.locked ? "Locked" : "Start Exercise"}
                    </span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Practice;
