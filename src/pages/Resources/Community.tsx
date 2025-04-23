import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const CommunityPage = () => {
  return (
    <MainLayout>
      <div className="container py-12">
        <h1 className="text-4xl font-bold mb-8">Community</h1>
        
        <p className="text-lg mb-8">
          Join the ML Learn community to connect with other learners, share your projects, ask questions, 
          and collaborate on machine learning topics.
        </p>
        
        <Tabs defaultValue="forum" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-3 md:inline-flex mb-8">
            <TabsTrigger value="forum">Discussion Forum</TabsTrigger>
            <TabsTrigger value="projects">Community Projects</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
          </TabsList>
          
          <TabsContent value="forum" className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Recent Discussions</h2>
              
              <div className="space-y-4">
                {[
                  {
                    id: 1,
                    title: "Best approach for time series forecasting?",
                    author: {
                      name: "Marco R.",
                      avatar: "https://i.pravatar.cc/150?img=1"
                    },
                    replies: 12,
                    views: 234,
                    category: "Time Series",
                    date: "2 days ago"
                  },
                  {
                    id: 2,
                    title: "Understanding backpropagation in neural networks",
                    author: {
                      name: "Elena T.",
                      avatar: "https://i.pravatar.cc/150?img=5"
                    },
                    replies: 28,
                    views: 512,
                    category: "Neural Networks",
                    date: "5 days ago"
                  },
                  {
                    id: 3,
                    title: "How to handle imbalanced classification problems?",
                    author: {
                      name: "Paolo M.",
                      avatar: "https://i.pravatar.cc/150?img=3"
                    },
                    replies: 16,
                    views: 178,
                    category: "Classification",
                    date: "1 week ago"
                  },
                  {
                    id: 4,
                    title: "Best Python libraries for data visualization?",
                    author: {
                      name: "Laura B.",
                      avatar: "https://i.pravatar.cc/150?img=4"
                    },
                    replies: 21,
                    views: 345,
                    category: "Data Visualization",
                    date: "2 weeks ago"
                  }
                ].map((topic) => (
                  <Card key={topic.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between p-4">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={topic.author.avatar} />
                          <AvatarFallback>{topic.author.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{topic.title}</CardTitle>
                          <div className="text-sm text-muted-foreground">
                            Posted by {topic.author.name} · {topic.date}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs mr-2">
                          {topic.category}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="flex text-sm text-muted-foreground">
                        <div className="mr-4">
                          <span className="font-medium">{topic.replies}</span> replies
                        </div>
                        <div>
                          <span className="font-medium">{topic.views}</span> views
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="projects" className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Featured Projects</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    id: 1,
                    title: "Customer Churn Prediction",
                    description: "A model to predict customer churn for telecom companies using historical data.",
                    author: {
                      name: "Andrea B.",
                      avatar: "https://i.pravatar.cc/150?img=6"
                    },
                    stars: 34,
                    category: "Classification"
                  },
                  {
                    id: 2,
                    title: "Image Style Transfer",
                    description: "An implementation of neural style transfer to apply artistic styles to photographs.",
                    author: {
                      name: "Francesco D.",
                      avatar: "https://i.pravatar.cc/150?img=7"
                    },
                    stars: 52,
                    category: "Computer Vision"
                  },
                  {
                    id: 3,
                    title: "Stock Price Forecasting",
                    description: "Using LSTM networks to predict stock market prices with historical data.",
                    author: {
                      name: "Giulia M.",
                      avatar: "https://i.pravatar.cc/150?img=8"
                    },
                    stars: 28,
                    category: "Time Series"
                  },
                  {
                    id: 4,
                    title: "Recommendation System",
                    description: "A collaborative filtering system for movie recommendations based on user ratings.",
                    author: {
                      name: "Roberto P.",
                      avatar: "https://i.pravatar.cc/150?img=9"
                    },
                    stars: 41,
                    category: "Recommender Systems"
                  }
                ].map((project) => (
                  <Card key={project.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="p-4">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{project.title}</CardTitle>
                        <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                          {project.category}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 mt-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={project.author.avatar} />
                          <AvatarFallback>{project.author.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-muted-foreground">{project.author.name}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm mb-4">{project.description}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                        </svg>
                        {project.stars} stars
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="events" className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
              
              <div className="space-y-4">
                {[
                  {
                    id: 1,
                    title: "Introduction to Deep Learning Workshop",
                    date: "May 15, 2023",
                    time: "18:00 - 20:00 CEST",
                    location: "Online (Zoom)",
                    description: "A beginner-friendly workshop covering the fundamentals of deep learning with PyTorch."
                  },
                  {
                    id: 2,
                    title: "ML Learn Community Meetup",
                    date: "June 5, 2023",
                    time: "19:00 - 21:00 CEST",
                    location: "Milano, Italy",
                    description: "Join us for our monthly in-person meetup to network with other ML enthusiasts."
                  },
                  {
                    id: 3,
                    title: "Natural Language Processing Hackathon",
                    date: "June 24-25, 2023",
                    time: "09:00 - 18:00 CEST",
                    location: "Online (Discord)",
                    description: "A weekend-long hackathon focused on solving NLP challenges with practical applications."
                  }
                ].map((event) => (
                  <Card key={event.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                      <div className="flex flex-col space-y-1 text-sm text-muted-foreground mt-2">
                        <div>
                          <span className="font-medium">Date:</span> {event.date}
                        </div>
                        <div>
                          <span className="font-medium">Time:</span> {event.time}
                        </div>
                        <div>
                          <span className="font-medium">Location:</span> {event.location}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm">{event.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default CommunityPage;