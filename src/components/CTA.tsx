import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

export const CTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-secondary to-accent opacity-20 -z-10" />
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
          Ready to Transform Your Content?
        </h2>
        <p className="text-xl mb-8 text-gray-300">
          Join thousands of content creators who trust Text-to-Content.ai
        </p>
        <Button 
          onClick={() => navigate('/tools')}
          className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6"
        >
          Get Started Free
        </Button>
      </div>
    </section>
  );
};