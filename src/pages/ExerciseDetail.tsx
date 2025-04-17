
import { useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, CheckCircle, PlayCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// This would be fetched from the API in a real application
const exerciseData = {
  "linear-regression": {
    title: "Linear Regression Implementation",
    description: "In this exercise, you will implement a simple linear regression model from scratch using NumPy. You'll create the necessary functions to compute the coefficients, make predictions, and evaluate the model's performance.",
    instructions: [
      "Implement the `compute_coefficients` function to calculate the slope and intercept using the normal equation.",
      "Create a `predict` function that uses the coefficients to make predictions on new data.",
      "Implement the `compute_r_squared` function to evaluate your model's performance.",
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
    testCases: [],
    startingCode: "",
  };

  const handleSubmit = () => {
    // In a real application, this would send the code to the backend
    // Here we're just simulating a response
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
    // Here we're just simulating a response
    setTimeout(() => {
      setResult({
        success: true,
        message: "Code executed. Output:\nSlope: 0.8, Intercept: 1.6\nPredictions: [2.4, 3.2, 4.0, 4.8, 5.6]\nR^2 Score: 0.57",
      });
    }, 1000);
  };

  return (
    <MainLayout>
      <div className="container py-10">
        <h1 className="text-3xl font-bold mb-6">{exercise.title}</h1>
        
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="instructions">Instructions</TabsTrigger>
            <TabsTrigger value="tests">Test Cases</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="mt-0">
            <p className="text-muted-foreground mb-6">
              {exercise.description}
            </p>
          </TabsContent>
          
          <TabsContent value="instructions" className="mt-0">
            <h3 className="font-semibold mb-4">Follow these steps:</h3>
            <ol className="space-y-2 list-decimal pl-5 text-muted-foreground">
              {exercise.instructions.map((instruction, index) => (
                <li key={index} className="pl-1">{instruction}</li>
              ))}
            </ol>
          </TabsContent>
          
          <TabsContent value="tests" className="mt-0">
            <h3 className="font-semibold mb-4">Your solution will be tested against:</h3>
            <ul className="space-y-2 list-disc pl-5 text-muted-foreground">
              {exercise.testCases.map((testCase, index) => (
                <li key={index} className="pl-1">{testCase}</li>
              ))}
            </ul>
          </TabsContent>
        </Tabs>
        
        <div className="mt-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Code Editor</h2>
            <div className="space-x-3">
              <Button variant="outline" size="sm" onClick={runCode} className="gap-1">
                <PlayCircle className="h-4 w-4" /> Run
              </Button>
              <Button size="sm" onClick={handleSubmit}>Submit Solution</Button>
            </div>
          </div>
          
          <div className="border rounded-lg overflow-hidden bg-ml-code-bg">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="font-mono text-ml-code-text w-full p-4 bg-transparent min-h-[500px] resize-y focus:outline-none"
            />
          </div>
          
          {result && (
            <Alert
              className={`mt-6 ${
                result.success
                  ? "border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-950 dark:text-green-100"
                  : "border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950 dark:text-red-100"
              }`}
            >
              {result.success ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
              <AlertTitle className="ml-2">
                {result.success ? "Success!" : "There were some issues"}
              </AlertTitle>
              <AlertDescription className="ml-2 mt-2 whitespace-pre-line">
                {result.message}
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default ExerciseDetail;
