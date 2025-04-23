import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Theory from "./pages/Theory";
import TheoryTopic from "./pages/TheoryTopic";
import Practice from "./pages/Practice";
import About from "./pages/About";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Profile from "./pages/Profile";
import ExerciseDetail from "./pages/ExerciseDetail";
import Leaderboard from "./pages/Leaderboard";
import Courses from "./pages/Courses";
import Shop from "./pages/Shop";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import CookiePolicy from "./pages/CookiePolicy";
import Documentation from "./pages/Resources/Documentation";
import ApiPage from "./pages/Resources/Api";
import CommunityPage from "./pages/Resources/Community";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/theory" element={<Theory />} />
          {/* Unified wildcard route for nested content paths */}
          <Route path="/theory/:topicId/*" element={<TheoryTopic />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/practice/:exerciseId" element={<ExerciseDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="courses" element={<Courses />} />
          <Route path="shop" element={<Shop />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="cookie-policy" element={<CookiePolicy />} />
          <Route path="resources/documentation" element={<Documentation />} />
          <Route path="resources/api" element={<ApiPage />} />
          <Route path="resources/community" element={<CommunityPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
