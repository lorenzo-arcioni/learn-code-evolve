import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Book, 
  Clock, 
  Users, 
  Award, 
  CheckCircle, 
  PlayCircle, 
  Lock,
  ArrowLeft,
  Star,
  Calendar,
  Laptop,
  Target,
  AlertCircle,
  Loader2
} from "lucide-react";
import { coursesApi } from '@/services/api';
import { toast } from '@/components/ui/use-toast';

interface Lesson {
  id: number;
  title: string;
  description: string;
  duration: string;
  video_url?: string;
  materials?: string[];
  is_free: boolean;
}

interface Module {
  id: number;
  title: string;
  description: string;
  lessons: Lesson[];
  estimated_hours: string;
}

interface Prerequisite {
  title: string;
  description: string;
  is_required: boolean;
}

interface LearningObjective {
  objective: string;
  description?: string;
}

interface CourseContentType {
  id: number;
  course_id: number;
  title: string;
  description: string;
  full_description: string;
  instructor: string;
  instructor_bio: string;
  instructor_image?: string;
  duration: string;
  level: string;
  category: string;
  price: string;
  image_url: string;
  learning_objectives: LearningObjective[];
  prerequisites: Prerequisite[];
  modules: Module[];
  certification: boolean;
  certificate_description?: string;
  target_audience: string[];
  tools_required: string[];
  created_at: string;
  updated_at: string;
  is_published: boolean;
}

const CourseContent = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [courseContent, setCourseContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    const loadCourseContent = async () => {
      if (!courseId) {
        setError('ID del corso non specificato');
        setIsLoading(false);
        return;
      }
      try {
        const data = await coursesApi.getCourseContent(courseId);
        setCourseContent(data);
      } catch (err) {
        toast({
          title: 'Errore',
          description: 'Impossibile caricare il contenuto del corso.',
          variant: 'destructive'
        });
        setError('Errore nel caricamento del corso.');
      } finally {
        setIsLoading(false);
      }
    };
    loadCourseContent();
  }, [courseId]);

  const handleGoBack = () => navigate('/courses');

  const calculateTotalLessons = modules => modules.reduce((total, m) => total + m.lessons.length, 0);

  if (isLoading) return (
    <MainLayout>
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Caricamento...</span>
      </div>
    </MainLayout>
  );

  if (error || !courseContent) return (
    <MainLayout>
      <div className="p-6">
        <div className="bg-red-100 text-red-700 p-4 rounded-md">
          <AlertCircle className="inline mr-2" />{error || 'Corso non trovato'}
        </div>
        <Button onClick={handleGoBack} className="mt-4">
          <ArrowLeft className="h-4 w-4 mr-2" />Torna ai corsi
        </Button>
      </div>
    </MainLayout>
  );

  return (
    <MainLayout>
      <div className="container mx-auto py-8">
        <Button variant="ghost" onClick={handleGoBack} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />Torna ai corsi
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonna principale */}
          <div className="lg:col-span-2 space-y-6 flex flex-col">
            <div className="space-y-4">
              <Badge variant="secondary">{courseContent.category}</Badge>
              <h1 className="text-4xl font-bold">{courseContent.title}</h1>
              <p className="text-gray-600 text-xl">{courseContent.description}</p>

              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center"><Clock className="h-4 w-4 mr-1" />{courseContent.duration}</div>
                <div className="flex items-center"><Users className="h-4 w-4 mr-1" />{courseContent.level}</div>
                <div className="flex items-center"><Book className="h-4 w-4 mr-1" />{courseContent.modules.length} moduli</div>
                <div className="flex items-center"><PlayCircle className="h-4 w-4 mr-1" />{calculateTotalLessons(courseContent.modules)} lezioni</div>
                {courseContent.certification && <div className="flex items-center"><Award className="h-4 w-4 mr-1" />Certificato</div>}
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5" />Il tuo istruttore</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 items-start">
                  {courseContent.instructor_image && <img src={courseContent.instructor_image} alt={courseContent.instructor} className="w-16 h-16 rounded-full object-cover" />}
                  <div>
                    <h3 className="font-semibold text-lg">{courseContent.instructor}</h3>
                    <p className="text-gray-600 mt-2">{courseContent.instructor_bio}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Altri contenuti */}
            <div className="space-y-6 flex-grow flex flex-col">
              <Card>
                <CardHeader><CardTitle>Descrizione completa</CardTitle></CardHeader>
                <CardContent><p className="whitespace-pre-wrap">{courseContent.full_description}</p></CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle className="flex items-center gap-2"><Target className="h-5 w-5" />Cosa imparerai</CardTitle></CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {courseContent.learning_objectives.map((o, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium">{o.objective}</span>
                          {o.description && <p className="text-sm text-gray-600 mt-1">{o.description}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Book className="h-5 w-5" />Programma del corso</CardTitle>
                  <CardDescription>{courseContent.modules.length} moduli • {calculateTotalLessons(courseContent.modules)} lezioni</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {courseContent.modules.map((module, i) => (
                    <div key={module.id} className="border p-4 rounded-lg">
                      <h3 className="font-semibold text-lg">Modulo {i + 1}: {module.title}</h3>
                      <p className="text-gray-600 text-sm mt-1">{module.description}</p>
                      <div className="text-sm text-gray-500 mt-2 flex gap-4">
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{module.estimated_hours}</span>
                        <span className="flex items-center gap-1"><PlayCircle className="h-3 w-3" />{module.lessons.length} lezioni</span>
                      </div>

                      <div className="mt-3 space-y-2">
                        {module.lessons.map((lesson, j) => (
                          <div key={lesson.id} className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg">
                            {lesson.is_free ? <PlayCircle className="h-4 w-4 text-green-500" /> : <Lock className="h-4 w-4 text-gray-400" />}
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <span className="font-medium text-sm">{j + 1}. {lesson.title}</span>
                                <span className="text-xs text-gray-500">{lesson.duration}</span>
                              </div>
                              <p className="text-xs text-gray-600 mt-1">{lesson.description}</p>
                              {lesson.is_free && <Badge variant="outline" className="mt-2 text-xs">Anteprima gratuita</Badge>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <div className="aspect-video overflow-hidden rounded-lg bg-gray-100">
                  <img src={courseContent.image_url} alt={courseContent.title} className="w-full h-full object-cover" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-4">{courseContent.price}</div>
                <Button className="w-full mb-4" size="lg" disabled={isEnrolling || isEnrolled}>
                  {isEnrolling ? (
                    <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Iscrizione in corso...</>
                  ) : isEnrolled ? (
                    <><CheckCircle className="h-4 w-4 mr-2" />Iscritto</>
                  ) : (
                    'Iscriviti al corso'
                  )}
                </Button>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" />Accesso a vita</div>
                  <div className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" />Materiali scaricabili</div>
                  {courseContent.certification && <div className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" />Certificato incluso</div>}
                  <div className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" />Supporto Q&A</div>
                </div>
              </CardContent>
            </Card>

            {/* Informazioni aggiuntive */}
            {courseContent.prerequisites.length > 0 && (
            <Card>
                <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    Prerequisiti
                </CardTitle>
                </CardHeader>
                <CardContent>
                <div className="space-y-3">
                    {courseContent.prerequisites.map((prereq, index) => (
                    <div key={index} className="flex items-start gap-2">
                        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                        prereq.is_required ? 'bg-red-500' : 'bg-yellow-500'
                        }`} />
                        <div>
                        <span className="font-medium text-sm">{prereq.title}</span>
                        <p className="text-xs text-gray-600 mt-1">{prereq.description}</p>
                        {prereq.is_required && (
                            <Badge variant="destructive" className="mt-1 text-xs">
                            Obbligatorio
                            </Badge>
                        )}
                        </div>
                    </div>
                    ))}
                </div>
                </CardContent>
            </Card>
            )}

            {/* Target Audience */}
            {courseContent.target_audience.length > 0 && (
            <Card>
                <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    A chi è rivolto
                </CardTitle>
                </CardHeader>
                <CardContent>
                <div className="space-y-2">
                    {courseContent.target_audience.map((audience, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">{audience}</span>
                    </div>
                    ))}
                </div>
                </CardContent>
            </Card>
            )}

            {/* Tools Required */}
            {courseContent.tools_required.length > 0 && (
            <Card>
                <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Laptop className="h-5 w-5" />
                    Strumenti necessari
                </CardTitle>
                </CardHeader>
                <CardContent>
                <div className="space-y-2">
                    {courseContent.tools_required.map((tool, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{tool}</span>
                    </div>
                    ))}
                </div>
                </CardContent>
            </Card>
            )}

            {/* Certificazione */}
            {courseContent.certification && (
              <Card>
                <CardHeader><CardTitle className="flex items-center gap-2"><Award className="h-5 w-5" />Certificazione</CardTitle></CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium">Certificato di completamento</span>
                  </div>
                  {courseContent.certificate_description && <p className="text-sm text-gray-600">{courseContent.certificate_description}</p>}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CourseContent;
