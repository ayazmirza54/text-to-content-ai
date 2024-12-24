import React from 'react';
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section className="pt-32 pb-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 -z-10" />
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6 animate-fade-up">
            Transform Text into Engaging Content
          </h1>
          <p className="text-xl text-gray-600 mb-8 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Harness the power of AI to create compelling content that resonates with your audience
          </p>
          <Button 
            className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 animate-fade-up" 
            style={{ animationDelay: "0.4s" }}
          >
            Start Creating Now
          </Button>
        </div>
      </div>
    </section>
  );
};