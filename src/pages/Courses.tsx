import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book, Code, Cpu, Calculator, BookText, Loader2 } from "lucide-react";
import { coursesApi } from '@/services/api'; // Importa il servizio API per i corsi
import { toast } from '@/components/ui/use-toast'; // Assicurati di avere un componente toast
import { useNavigate } from 'react-router-dom';

// Funzione per determinare l'icona in base alla categoria
const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Machine Learning":
      return Cpu;
    case "Matematica":
      return Calculator;
    case "Programmazione":
      return Code;
    case "Algoritmi":
      return BookText;
    default:
      return Book;
  }
};

const Courses = () => {
  const [coursesByCategory, setCoursesByCategory] = useState<Record<string, any[]>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const loadCourses = async () => {
      try {
        setIsLoading(true);
        const data = await coursesApi.getCourses();
        
        // Aggiungiamo le icone ai corsi
        const coursesWithIcons = Object.fromEntries(
          Object.entries(data).map(([category, courses]) => [
            category,
            (courses as any[]).map((course: any) => ({
              ...course,
              icon: getCategoryIcon(category),
              // Aggiungiamo uno stato predefinito se non è presente
              status: course.status || 'available'
            }))
          ])
        );
        
        setCoursesByCategory(coursesWithIcons);
      } catch (err) {
        console.error('Error loading courses:', err);
        setError('Impossibile caricare i corsi. Riprova più tardi.');
        toast({
          title: 'Errore',
          description: 'Impossibile caricare i corsi. Riprova più tardi.',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadCourses();
  }, []);

  const handleCourseRedirect = (courseId: string) => {
    console.log('Navigating to course:', courseId); // Debug log
    if (courseId) {
      // Naviga alla pagina del contenuto del corso invece di usare window.location.href
      navigate(`/courses/${courseId}`);
    } else {
      console.error('Course ID is missing'); // Debug log
      toast({
        title: 'Errore',
        description: 'ID del corso non disponibile',
        variant: 'destructive'
      });
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-8">Corsi Disponibili</h1>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2">Caricamento corsi...</span>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
            {error}
          </div>
        ) : Object.keys(coursesByCategory).length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">Nessun corso disponibile al momento.</p>
          </div>
        ) : (
          Object.entries(coursesByCategory).map(([category, courses]) => (
            <div key={category} className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                {React.createElement(getCategoryIcon(category), { className: "h-6 w-6" })}
                <h2 className="text-2xl font-semibold">{category}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <Card key={String(course._id)} className="overflow-hidden flex flex-col">
                    <div className="h-48 overflow-hidden">
                      <img
                        src={course.image_url}
                        alt={course.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback se l'immagine non carica
                          (e.target as HTMLImageElement).src = '/placeholder-course.jpg';
                        }}
                      />
                    </div>
                    <CardHeader>
                      <CardTitle>{course.title}</CardTitle>
                      <CardDescription>{course.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {course.instructor && (
                          <div>
                            <span className="font-medium">Docente:</span> {course.instructor}
                          </div>
                        )}
                        {course.duration && (
                          <div>
                            <span className="font-medium">Durata:</span> {course.duration}
                          </div>
                        )}
                        {course.level && (
                          <div>
                            <span className="font-medium">Livello:</span> {course.level}
                          </div>
                        )}
                        {course.price && (
                          <div>
                            <span className="font-medium">Prezzo:</span> {course.price}
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="mt-auto">
                      <Button 
                        className="w-full" 
                        variant={course.status === 'coming_soon' ? 'secondary' : 'default'}
                        onClick={() => {
                          if (course.status !== 'coming_soon') {
                            // Usa _id invece di id
                            const courseId = course._id || course.id;
                            handleCourseRedirect(String(courseId));
                          }
                        }}
                        disabled={course.status === 'coming_soon'}
                      >
                        {course.status === 'coming_soon' ? 'Prossimamente' : 'Vedi il programma'}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </MainLayout>
  );
};

export default Courses;