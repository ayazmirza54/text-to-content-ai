import React from 'react';
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { useSession } from '@/App';

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const session = useSession();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/");
      toast({
        title: "Logged out successfully",
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: "Error logging out",
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  return (
    <header className="fixed w-full bg-primary/50 backdrop-blur-xl z-50 border-b border-white/10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">
          Text-to-Content.ai
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <Button 
            variant="ghost" 
            className="text-gray-300 hover:text-white hover:bg-white/10"
            onClick={() => navigate('/')}
          >
            Home
          </Button>
          <Button 
            variant="ghost" 
            className="text-gray-300 hover:text-white hover:bg-white/10"
            onClick={() => navigate('/tools')}
          >
            Tools
          </Button>
          {session ? (
            <Button 
              onClick={handleLogout}
              variant="ghost" 
              className="bg-black/20 text-gray-300 hover:text-white hover:bg-white/10 border-white/10"
            >
              Logout
            </Button>
          ) : (
            <Button 
              onClick={() => navigate('/auth')}
              variant="ghost" 
              className="bg-black/20 text-gray-300 hover:text-white hover:bg-white/10 border-white/10"
            >
              Login
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
};