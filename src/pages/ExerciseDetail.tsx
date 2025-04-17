
import { useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, CheckCircle, PlayCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

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

const ExerciseDetail = () => {
  const { exerciseId } = useParams();
  const [code, setCode] = useState(exerciseData[exerciseId as keyof typeof exerciseData]?.startingCode || "");
  const [result, setResult] = useState<null | { success: boolean; message: string }>(null);
  const exercise = exerciseData[exerciseId as keyof typeof exerciseData] || {
    title: "Exercise Not Found",
    description: "This exercise does not exist or has been removed.",
    instructions: [],
    hints: [],
    testCases: [],
    startingCode: "",
  };

  const handleSubmit = () => {
    // In a real application, this would send the code to the backend
    setTimeout(() => {
      if (code.length > 100) {
        setResult({
          success: true,
          message: "All test cases passed successfully! Great job implementing linear regression from scratch.",
        });
      } else {
        setResult({
          success: false,
          message: "Some test cases failed. Please check your implementation and try again.",
        });
      }
    }, 1500);
  };

  const runCode = () => {
    // In a real application, this would run the code in a sandbox
    setTimeout(() => {
      setResult({
        success: true,
        message: "Code executed. Output:\nSlope: 0.8, Intercept: 1.6\nPredictions: [2.4, 3.2, 4.0, 4.8, 5.6]\nR^2 Score: 0.57",
      });
    }, 1000);
  };

  return (
    <MainLayout>
      <div className="container py-6">
        <h1 className="text-3xl font-bold mb-4">{exercise.title}</h1>
        <ResizablePanelGroup direction="horizontal" className="min-h-[600px] rounded-lg border">
          <ResizablePanel defaultSize={40} minSize={30}>
            <div className="h-full p-6">
              <Tabs defaultValue="description" className="h-full flex flex-col">
                <TabsList className="w-full justify-start mb-4">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="hints">Hints</TabsTrigger>
                  <TabsTrigger value="tests">Tests</TabsTrigger>
                </TabsList>
                
                <div className="flex-1 overflow-auto">
                  <TabsContent value="description" className="mt-0 h-full">
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
                  
                  <TabsContent value="hints" className="mt-0 h-full">
                    <div className="space-y-4">
                      <h3 className="font-semibold">Helpful Hints:</h3>
                      <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                        {exercise.hints.map((hint, index) => (
                          <li key={index}>{hint}</li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="tests" className="mt-0 h-full">
                    <div className="space-y-4">
                      <h3 className="font-semibold">Test Cases:</h3>
                      <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                        {exercise.testCases.map((testCase, index) => (
                          <li key={index}>{testCase}</li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          <ResizablePanel defaultSize={60}>
            <div className="h-full flex flex-col">
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-lg font-semibold">Code Editor</h2>
                <div className="space-x-3">
                  <Button variant="outline" size="sm" onClick={runCode} className="gap-1">
                    <PlayCircle className="h-4 w-4" /> Run
                  </Button>
                  <Button size="sm" onClick={handleSubmit}>Submit Solution</Button>
                </div>
              </div>
              
              <div className="flex-1 overflow-hidden">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="font-mono text-sm w-full h-full p-4 bg-ml-code-bg text-ml-code-text resize-none focus:outline-none"
                />
              </div>
              
              {result && (
                <div className="p-4 border-t">
                  <Alert
                    className={cn(
                      result.success
                        ? "border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-950 dark:text-green-100"
                        : "border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950 dark:text-red-100"
                    )}
                  >
                    {result.success ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                    <AlertTitle className="ml-2">
                      {result.success ? "Success!" : "There were some issues"}
                    </AlertTitle>
                    <AlertDescription className="ml-2 mt-2 whitespace-pre-line">
                      {result.message}
                    </AlertDescription>
                  </Alert>
                </div>
              )}
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </MainLayout>
  );
};

export default ExerciseDetail;
