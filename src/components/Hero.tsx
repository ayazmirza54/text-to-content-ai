import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen pt-32 pb-20 relative overflow-hidden flex items-center">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-secondary/20 to-transparent -z-10" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20 -z-10" />
      
      {/* Hero Image */}
      <div className="absolute inset-0 -z-20">
        <img 
          src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
          alt="Hero background" 
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
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