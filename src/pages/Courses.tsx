import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book, Code, Cpu, Calculator, BookText } from "lucide-react";

const coursesByCategory = {
  "Machine Learning": [
    {
      id: 1,
      title: "Machine Learning: Introduzione",
      description: "Questo corso offre un'introduzione ai concetti fondamentali e alle applicazioni del Machine Learning.",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      status: "coming_soon",
      icon: Cpu
    },
    {
      id: 2,
      title: "Machine Learning: Algoritmo K-Nearest Neighbors (KNN)",
      description: "Guida completa all'algoritmo K-Nearest Neighbors (KNN), concetti teorici e implementazioni pratiche in Python.",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      status: "available",
      icon: Cpu
    }
  ],
  "Matematica": [
    {
      id: 3,
      title: "Math Fundamentals: Algebra Lineare",
      description: "Un corso approfondito sui fondamenti dell'algebra lineare e le sue applicazioni nel machine learning.",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      status: "available",
      icon: Calculator
    }
  ],
  "Programmazione": [
    {
      id: 4,
      title: "Python per Data Science",
      description: "Impara Python concentrandoti sulle librerie e gli strumenti essenziali per la Data Science.",
      image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
      status: "available",
      icon: Code
    }
  ],
  "Algoritmi": [
    {
      id: 5,
      title: "Algoritmi di Ottimizzazione",
      description: "Esplora i principali algoritmi di ottimizzazione utilizzati nel machine learning.",
      image: "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2",
      status: "coming_soon",
      icon: BookText
    }
  ]
};

const Courses = () => {
  return (
    <MainLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-8">Corsi Disponibili</h1>
        {Object.entries(coursesByCategory).map(([category, courses]) => (
          <div key={category} className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              {category === "Machine Learning" && <Cpu className="h-6 w-6" />}
              {category === "Matematica" && <Calculator className="h-6 w-6" />}
              {category === "Programmazione" && <Code className="h-6 w-6" />}
              {category === "Algoritmi" && <BookText className="h-6 w-6" />}
              <h2 className="text-2xl font-semibold">{category}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="overflow-hidden flex flex-col">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{course.title}</CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="mt-auto">
                    <Button className="w-full" variant={course.status === 'coming_soon' ? 'secondary' : 'default'}>
                      {course.status === 'coming_soon' ? 'Prossimamente' : 'Iscriviti Ora'}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
};

export default Courses;