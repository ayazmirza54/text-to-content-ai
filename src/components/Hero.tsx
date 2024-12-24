import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Sparkles, Circle, Droplet, Leaf } from 'lucide-react';

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-[100dvh] flex items-center justify-center relative overflow-hidden">
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

      {/* Floating Elements - Adjusted for better mobile appearance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-48 h-48 md:w-64 md:h-64 bg-secondary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[10%] right-[5%] w-48 h-48 md:w-64 md:h-64 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      {/* Decorative Vector Elements - Mobile Optimized */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top Left Decorative Elements */}
        <div className="absolute top-8 left-4 md:left-8">
          <Circle className="w-4 h-4 text-secondary/30 animate-pulse" />
        </div>
        <div className="absolute top-20 left-8 md:left-16">
          <Sparkles className="w-6 h-6 text-accent/30 animate-pulse" style={{ animationDelay: "0.5s" }} />
        </div>
        
        {/* Top Right Decorative Elements */}
        <div className="absolute top-12 right-6 md:right-12">
          <Droplet className="w-5 h-5 text-secondary/30 animate-pulse" style={{ animationDelay: "0.7s" }} />
        </div>
        
        {/* Bottom Left Decorative Elements */}
        <div className="absolute bottom-16 left-6 md:left-12">
          <Leaf className="w-5 h-5 text-accent/30 animate-pulse" style={{ animationDelay: "1.2s" }} />
        </div>
        
        {/* Bottom Right Decorative Elements */}
        <div className="absolute bottom-24 right-8 md:right-16">
          <Circle className="w-4 h-4 text-secondary/30 animate-pulse" style={{ animationDelay: "0.9s" }} />
        </div>

        {/* Dotted Pattern - Left Side */}
        <div className="absolute left-0 top-1/3 w-20 h-20 opacity-20">
          <div className="grid grid-cols-3 gap-2">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 bg-secondary/50 rounded-full" />
            ))}
          </div>
        </div>

        {/* Dotted Pattern - Right Side */}
        <div className="absolute right-0 bottom-1/3 w-20 h-20 opacity-20">
          <div className="grid grid-cols-3 gap-2">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 bg-accent/50 rounded-full" />
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12 relative">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center mb-4 md:mb-6">
            <Sparkles className="w-8 h-8 md:w-12 md:h-12 text-secondary animate-pulse" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-6xl font-bold mb-4 md:mb-6 animate-fade-up bg-clip-text text-transparent bg-gradient-to-r from-white via-secondary to-accent leading-tight">
            Transform Text into Engaging Content
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 md:mb-8 animate-fade-up px-4 sm:px-0" style={{ animationDelay: "0.2s" }}>
            Harness the power of AI to create compelling content that resonates with your audience
          </p>
          <Button 
            className="bg-gradient-to-r from-secondary to-accent hover:opacity-90 text-base md:text-lg px-6 py-3 md:px-8 md:py-6 animate-fade-up w-full sm:w-auto" 
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