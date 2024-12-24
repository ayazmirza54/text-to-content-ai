import { Auth as SupabaseAuth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSession } from '@/App';
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const Auth = () => {
  const navigate = useNavigate();
  const session = useSession();

  useEffect(() => {
    // Check for verification success in URL
    const params = new URLSearchParams(window.location.search);
    if (params.get('verified') === 'true') {
      toast.success("Email verified successfully! You can now log in.", {
        duration: 5000,
      });
    }

    if (session) {
      navigate('/');
    }
  }, [session, navigate]);

  const handleGuestAccess = () => {
    // Set a flag in localStorage to indicate guest mode
    localStorage.setItem('guestMode', 'true');
    navigate('/tools');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-[#2A2F3C] to-[#1A1F2C] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-black/20 p-8 rounded-lg backdrop-blur-xl border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Welcome to Text-to-Content.ai</h2>
        <SupabaseAuth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#0EA5E9',
                  brandAccent: '#0284C7',
                  inputBackground: 'rgba(255, 255, 255, 0.05)',
                  inputText: 'white',
                  dividerBackground: 'rgba(255, 255, 255, 0.1)',
                  messageText: 'rgba(255, 255, 255, 0.8)',
                  messageTextDanger: '#ef4444',
                  anchorTextColor: '#0EA5E9',
                  anchorTextHoverColor: '#0284C7'
                }
              }
            },
            style: {
              button: {
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '0.375rem',
                padding: '0.5rem 1rem',
                fontSize: '0.875rem',
                fontWeight: '500',
              },
              input: {
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '0.375rem',
                padding: '0.5rem 1rem',
                fontSize: '0.875rem',
              },
              anchor: {
                color: '#0EA5E9',
                textDecoration: 'none',
              },
              message: {
                color: 'rgba(255, 255, 255, 0.8)',
              },
              container: {
                color: 'white',
              },
              label: {
                color: 'rgba(255, 255, 255, 0.8)',
              },
            },
          }}
          providers={[]}
          redirectTo={window.location.origin}
        />
        
        <div className="mt-6 text-center">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#1A1F2C] px-2 text-white/60">Or</span>
            </div>
          </div>
          <Button
            onClick={handleGuestAccess}
            variant="outline"
            className="mt-4 w-full text-white border-white/20 hover:bg-white/5"
          >
            Try as Guest
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Auth;