import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { createContext, useContext, useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Tools from "./pages/Tools";
import Article from "./pages/tools/Article";
import Speech from "./pages/tools/Speech";
import Image from "./pages/tools/Image";
import Infographics from "./pages/tools/Infographics";
import Code from "./pages/tools/Code";
import QnA from "./pages/tools/QnA";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Create session context
const SessionContext = createContext<Session | null>(null);
export const useSession = () => useContext(SessionContext);

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();
  const isGuest = localStorage.getItem('guestMode') === 'true';
  
  if (!session && !isGuest) {
    return <Navigate to="/auth" replace />;
  }
  return <>{children}</>;
};

const App = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SessionContext.Provider value={session}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/tools" element={<ProtectedRoute><Tools /></ProtectedRoute>} />
              <Route path="/tools/article" element={<ProtectedRoute><Article /></ProtectedRoute>} />
              <Route path="/tools/speech" element={<ProtectedRoute><Speech /></ProtectedRoute>} />
              <Route path="/tools/image" element={<ProtectedRoute><Image /></ProtectedRoute>} />
              <Route path="/tools/infographics" element={<ProtectedRoute><Infographics /></ProtectedRoute>} />
              <Route path="/tools/code" element={<ProtectedRoute><Code /></ProtectedRoute>} />
              <Route path="/tools/qna" element={<ProtectedRoute><QnA /></ProtectedRoute>} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </SessionContext.Provider>
    </QueryClientProvider>
  );
};

export default App;