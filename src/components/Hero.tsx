import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Sparkles } from 'lucide-react';

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen pt-32 pb-20 relative overflow-hidden flex items-center">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-secondary/20 to-transparent -z-10" />
      
      {/* Vector Grid Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20 -z-10" />
      
      {/* Hero Image */}
      <div className="absolute inset-0 -z-20">
        <img 
          src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
          alt="AI Content Creation"
          className="w-full h-full object-cover opacity-15 transform scale-105"
        />
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/70 to-primary/50" />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="w-12 h-12 text-secondary animate-pulse" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 animate-fade-up bg-clip-text text-transparent bg-gradient-to-r from-white via-secondary to-accent leading-tight">
            Transform Text into Engaging Content
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-8 animate-fade-up px-4 sm:px-0" style={{ animationDelay: "0.2s" }}>
            Harness the power of AI to create compelling content that resonates with your audience
          </p>
          <Button 
            className="bg-gradient-to-r from-secondary to-accent hover:opacity-90 text-lg px-6 sm:px-8 py-4 sm:py-6 animate-fade-up w-full sm:w-auto" 
            style={{ animationDelay: "0.4s" }}
            onClick={() => navigate('/tools')}
          >
            Start Creating Now
          </Button>
        </div>
      </div>
    </section>
  );
};