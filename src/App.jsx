import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import { isDemoMode } from '@/lib/demo-mode';
import Splash from './pages/Splash';
import Welcome from './pages/Welcome.jsx';
import Register from './pages/Register';
import Confirmation from './pages/Confirmation';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import CoursePage from './pages/CoursePage';
import QuizScreen from './pages/QuizScreen';
import QuizResults from './pages/QuizResults';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';

const AppRoutes = () => (
  <Routes>
    <Route path="/splash" element={<Splash />} />
    <Route path="/welcome" element={<Welcome />} />
    <Route path="/login" element={<Welcome />} />
    <Route path="/register" element={<Register />} />
    <Route path="/confirmation" element={<Confirmation />} />
    <Route path="/" element={<Dashboard />} />
    <Route path="/courses" element={<Courses />} />
    <Route path="/course/:id" element={<CoursePage />} />
    <Route path="/quiz/:id" element={<QuizScreen />} />
    <Route path="/quiz-results" element={<QuizResults />} />
    <Route path="/leaderboard" element={<Leaderboard />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="*" element={<PageNotFound />} />
  </Routes>
);

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center prototype-fixed-layer prototype-layer-rounded">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return <AppRoutes />;
};


function App() {
  const mobileFrameEnabled = import.meta.env.VITE_MOBILE_FRAME !== 'false';
  const configuredFrameWidth = Number.parseInt(import.meta.env.VITE_MOBILE_FRAME_WIDTH ?? '360', 10);
  const configuredFrameHeight = Number.parseInt(import.meta.env.VITE_MOBILE_FRAME_HEIGHT ?? '700', 10);
  const mobileFrameWidth = Number.isFinite(configuredFrameWidth) && configuredFrameWidth > 0 ? configuredFrameWidth : 390;
  const mobileFrameHeight = Number.isFinite(configuredFrameHeight) && configuredFrameHeight > 0 ? configuredFrameHeight : 844;

  const appTree = (
    <QueryClientProvider client={queryClientInstance}>
      <Router>
        {isDemoMode ? (
          <AppRoutes />
        ) : (
          <AuthProvider>
            <AuthenticatedApp />
          </AuthProvider>
        )}
      </Router>
      <Toaster />
    </QueryClientProvider>
  );

  if (!mobileFrameEnabled) {
    return appTree;
  }

  return (
    <div
      className="mobile-prototype"
      style={{ '--prototype-width': `${mobileFrameWidth}px`, '--prototype-height': `${mobileFrameHeight}px` }}
    >
      <div className="prototype-device">{appTree}</div>
    </div>
  );
}

export default App