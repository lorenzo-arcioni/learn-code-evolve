import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { exerciseApi } from '@/services/api';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';

// Importa authApi
import { authApi } from '@/services/api';  // Assicurati che il percorso sia corretto

const Practice = () => {
  const { toast } = useToast();

  // Query per ottenere gli esercizi
  const { data: exercises, isLoading: exercisesLoading } = useQuery({
    queryKey: ['exercises'],
    queryFn: exerciseApi.getAllExercises,
    meta: {
      onError: (error: Error) => {
        toast({
          title: 'Error fetching exercises',
          description: error.message,
          variant: 'destructive',
        });
      }
    }
  });

  // Query per ottenere i progressi dell'utente
  const { data: userProgress, isLoading: progressLoading } = useQuery({
    queryKey: ['user-progress'],
    queryFn: authApi.getUserProgress,  // Usa authApi correttamente
    meta: {
      onError: (error: Error) => {
        toast({
          title: 'Error fetching progress',
          description: error.message,
          variant: 'destructive',
        });
      }
    }
  });

  if (exercisesLoading || progressLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Practice Exercises</h1>
      {userProgress && (
        <div className="mb-4">
          <p>
            Progress: {userProgress.solved_exercises} / {userProgress.total_exercises} (
            {userProgress.progress_percentage.toFixed(2)}%)
          </p>
          <p>Points: {userProgress.points}</p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {exercises &&
          exercises.map((exercise) => (
            <Card key={exercise.id} className="bg-white shadow-md rounded-md overflow-hidden">
              <div className="p-4">
                <h2 className="text-lg font-semibold">{exercise.title}</h2>
                <p className="text-gray-600">{exercise.description}</p>
                <p className="text-sm mt-2">Difficulty: {exercise.difficulty}</p>
                <Link to={`/exercises/${exercise.id}`}>
                  <Button className="mt-4">Solve Exercise</Button>
                </Link>
              </div>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default Practice;

