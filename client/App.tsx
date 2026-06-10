import "./global.css";
import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";
import ThoughtDetox from "./pages/Calender";
import IB from "./pages/Image";
import MentalHealthQuiz from "./pages/MentalHealthQuiz";
import Diary from "./pages/Diary";
import SafeSpace from "./pages/SafeSpace";
import MusicAssistant from "./components/Music";
import MildServices from "./pages/Mild";
import ModerateServices from "./pages/Moderate";
import SevereServices from "./pages/Severe";
import MeditationAssistant from "./components/MeditationAssistant";
import Help from "./pages/Help";
import About from "./pages/About";
import ExplorePage from "./pages/ExplorePage";
import Article from "./pages/Article";
import Login from "./pages/Login"; // adjust path as needed
import CounselorDashboard from "./pages/CounselorDashboard";
import MeetingRoom from "./pages/MeetingRoom";
import BookCounselorMeeting from "./pages/BookCounselorMeeting";
import UserMeetings from "@/components/UserMeetings";
// inside your <Routes>:
const queryClient = new QueryClient();

const P = ({ children }: { children: React.ReactNode }) => (
  <ProtectedRoute>{children}</ProtectedRoute>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* ── Public routes ── */}
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<Login />} />

          {/* ── Protected routes ── */}
          <Route path="/article" element={<P><Article /></P>} />
          <Route
            path="/book-counselor"
            element={<P><BookCounselorMeeting /></P>}
          />
         <Route path="/my-meetings" element={ <P><UserMeetings /></P> } />
          <Route
            path="/counselor-dashboard"
            element={<P><CounselorDashboard /></P>}
          />

          <Route
            path="/meeting/:meetLink"
            element={<P><MeetingRoom /></P>}
          />
          <Route path="/help" element={<P><Help /></P>} />
          <Route path="/Detox" element={<P><ThoughtDetox /></P>} />
          <Route path="/IB" element={<P><IB /></P>} />
          <Route path="/quiz" element={<P><MentalHealthQuiz /></P>} />
          <Route path="/diary" element={<P><Diary /></P>} />
          <Route path="/Safespace" element={<P><SafeSpace /></P>} />
          <Route path="/music" element={<P><MusicAssistant /></P>} />
          <Route path="/mild" element={<P><MildServices /></P>} />
          <Route path="/moderate" element={<P><ModerateServices /></P>} />
          <Route path="/severe" element={<P><SevereServices /></P>} />
          <Route path="/meditation-video" element={<P><MeditationAssistant /></P>} />
          <Route path="/explore" element={<P><ExplorePage /></P>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);