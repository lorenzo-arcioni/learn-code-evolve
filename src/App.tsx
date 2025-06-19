// src/App.tsx
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import Header from "@/components/layout/Header";
import Home from "./pages/Home";
import Theory from "./pages/Theory";
import TheoryTopic from "./pages/TheoryTopic";
import Practice from "./pages/Practice";
import ExerciseDetail from "./pages/ExerciseDetail";
import Leaderboard from "./pages/Leaderboard";
import Courses from "./pages/Courses";
import CourseContent from "./pages/CourseContent";
import Shop from "./pages/Shop";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import CookiePolicy from "./pages/CookiePolicy";
import Documentation from "./pages/Resources/Documentation";
import ApiPage from "./pages/Resources/Api";
import CommunityPage from "./pages/Resources/Community";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const Layout: React.FC = () => (
  <>
    <Header />
    <main className="pt-0">
      <Outlet />
    </main>
  </>
);

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/theory" element={<Theory />} />
            <Route path="/theory/:topicId/*" element={<TheoryTopic />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/practice/:exerciseId" element={<ExerciseDetail />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:courseId" element={<CourseContent />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/resources/documentation" element={<Documentation />} />
            <Route path="/resources/api" element={<ApiPage />} />
            <Route path="/resources/community" element={<CommunityPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
