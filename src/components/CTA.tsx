import React from 'react';
import { Button } from "@/components/ui/button";

export const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary to-secondary text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Transform Your Content?
        </h2>
        <p className="text-xl mb-8 text-white/90">
          Join thousands of content creators who trust Text-to-Content.ai
        </p>
        <Button className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6">
          Get Started Free
        </Button>
      </div>
    </section>
  );
};