
import { useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, CheckCircle, DownloadCloud, RotateCcw } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge"; // Added missing import
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// This would be fetched from the API in a real application
const exerciseData = {
  "linear-regression": {
    title: "Linear Regression Implementation",
    description: "In this exercise, you will implement a simple linear regression model from scratch using NumPy.",
    instructions: [
      "Implement the `compute_coefficients` function to calculate the slope and intercept using the normal equation.",
      "Create a `predict` function that uses the coefficients to make predictions on new data.",
      "Implement the `compute_r_squared` function to evaluate your model's performance.",
    ],
    hints: [
      "Remember that the normal equation is β = (X^T X)^(-1) X^T y",
      "For prediction, use the formula y = mx + b",
      "R² compares the model's predictions to the mean of the target variable",
    ],
    testCases: [
      "Test with a simple dataset where X = [1, 2, 3, 4, 5] and y = [2, 4, 5, 4, 6]",
      "Verify correct coefficient calculation",
      "Test prediction accuracy on both training and test data",
    ],
    startingCode: `import numpy as np

def compute_coefficients(X, y):
    """
    Compute the coefficients for linear regression using the normal equation.
    
    Parameters:
    X (numpy.ndarray): Training data of shape (n_samples, 1)
    y (numpy.ndarray): Target values of shape (n_samples,)
    
    Returns:
    tuple: (slope, intercept)
    """
    # TODO: Implement this function
    pass

def predict(X, slope, intercept):
    """
    Make predictions using the linear regression model.
    
    Parameters:
    X (numpy.ndarray): Data to predict on, shape (n_samples, 1)
    slope (float): Slope coefficient
    intercept (float): Intercept coefficient
    
    Returns:
    numpy.ndarray: Predictions of shape (n_samples,)
    """
    # TODO: Implement this function
    pass

def compute_r_squared(y_true, y_pred):
    """
    Compute the coefficient of determination (R^2) for the model.
    
    Parameters:
    y_true (numpy.ndarray): True target values
    y_pred (numpy.ndarray): Predicted target values
    
    Returns:
    float: The R^2 score
    """
    # TODO: Implement this function
    pass

# Example usage:
if __name__ == "__main__":
    # Sample data
    X = np.array([[1], [2], [3], [4], [5]])
    y = np.array([2, 4, 5, 4, 6])
    
    # Compute coefficients
    slope, intercept = compute_coefficients(X, y)
    print(f"Slope: {slope}, Intercept: {intercept}")
    
    # Make predictions
    predictions = predict(X, slope, intercept)
    print(f"Predictions: {predictions}")
    
    # Compute R^2 score
    r2 = compute_r_squared(y, predictions)
    print(f"R^2 Score: {r2}")
`,
  },
};

interface TestResult {
  id: number;
  status: "passed" | "failed";
  description: string;
  message: string;
}

interface Submission {
  id: number;
  timestamp: string;
  status: "passed" | "failed";
  score: number;
}

const ExerciseDetail = () => {
  const { exerciseId } = useParams();
  const [code, setCode] = useState(exerciseData[exerciseId as keyof typeof exerciseData]?.startingCode || "");
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([
    { id: 1, timestamp: "2024-04-17 10:30", status: "passed", score: 100 },
    { id: 2, timestamp: "2024-04-17 10:15", status: "failed", score: 0 },
  ]);

  const exercise = exerciseData[exerciseId as keyof typeof exerciseData] || {
    title: "Exercise Not Found",
    description: "This exercise does not exist or has been removed.",
    instructions: [],
    hints: [],
    testCases: [],
    startingCode: "",
  };

  const handleSubmit = () => {
    // Mock test results - in a real app, this would come from the backend
    setTestResults([
      { id: 1, status: "passed", description: "Basic functionality", message: "All basic tests passed" },
      { id: 2, status: "failed", description: "Edge cases", message: "Failed on input [0, 0, 0]" },
    ]);
  };

  const handleReset = () => {
    setCode(exercise.startingCode);
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${exerciseId}-solution.py`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <MainLayout>
      <div className="container py-6">
        <h1 className="text-3xl font-bold mb-4">{exercise.title}</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Instructions Panel */}
          <Card className="w-full h-[800px] flex flex-col">
            <CardHeader>
              <CardTitle>Instructions</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <Tabs defaultValue="description" className="h-full flex flex-col">
                <TabsList className="w-full justify-start mb-4">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="hints">Hints</TabsTrigger>
                  <TabsTrigger value="submissions">Submissions</TabsTrigger>
                </TabsList>
                
                <ScrollArea className="flex-1">
                  <TabsContent value="description" className="mt-0">
                    <div className="space-y-4">
                      <p className="text-muted-foreground">{exercise.description}</p>
                      <div>
                        <h3 className="font-semibold mb-2">Instructions:</h3>
                        <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
                          {exercise.instructions.map((instruction, index) => (
                            <li key={index}>{instruction}</li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="hints" className="mt-0">
                    <div className="space-y-4">
                      <h3 className="font-semibold">Helpful Hints:</h3>
                      <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                        {exercise.hints.map((hint, index) => (
                          <li key={index}>{hint}</li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>

                  <TabsContent value="submissions" className="mt-0">
                    <div className="space-y-4">
                      <h3 className="font-semibold">Your Submissions:</h3>
                      <div className="space-y-2">
                        {submissions.map((submission) => (
                          <div
                            key={submission.id}
                            className={cn(
                              "p-4 rounded-lg",
                              submission.status === "passed"
                                ? "bg-green-50 border border-green-200"
                                : "bg-red-50 border border-red-200"
                            )}
                          >
                            <div className="flex justify-between items-center">
                              <span className="text-sm">
                                {submission.timestamp}
                              </span>
                              <Badge
                                className={cn(
                                  submission.status === "passed"
                                    ? "bg-green-500"
                                    : "bg-red-500"
                                )}
                              >
                                {submission.status} - Score: {submission.score}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </ScrollArea>
              </Tabs>
            </CardContent>
          </Card>

          {/* Code Editor Panel */}
          <Card className="w-full h-[800px] flex flex-col">
            <CardHeader className="flex-none border-b">
              <div className="flex justify-between items-center">
                <CardTitle>Code Editor</CardTitle>
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleReset}
                    className="gap-1"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Reset
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDownload}
                    className="gap-1"
                  >
                    <DownloadCloud className="h-4 w-4" />
                    Download
                  </Button>
                  <Button size="sm" onClick={handleSubmit}>
                    Submit Solution
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-0">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="font-mono text-sm w-full h-full p-4 bg-ml-code-bg text-ml-code-text resize-none focus:outline-none border-none"
              />
            </CardContent>
          </Card>
        </div>

        {/* Test Results */}
        {testResults.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Test Results</h2>
            <div className="space-y-4">
              {testResults.map((result) => (
                <Alert
                  key={result.id}
                  className={cn(
                    result.status === "passed"
                      ? "border-green-200 bg-green-50 text-green-900"
                      : "border-red-200 bg-red-50 text-red-900"
                  )}
                >
                  {result.status === "passed" ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}
                  <AlertTitle>{result.description}</AlertTitle>
                  <AlertDescription>{result.message}</AlertDescription>
                </Alert>
              ))}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ExerciseDetail;
