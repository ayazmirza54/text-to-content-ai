import React from 'react';
import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-xl font-bold text-primary">Text-to-Content.ai</div>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-gray-600 hover:text-primary transition-colors">Features</a>
          <a href="#how-it-works" className="text-gray-600 hover:text-primary transition-colors">How it Works</a>
          <Button className="bg-primary hover:bg-primary/90">Get Started</Button>
        </nav>
      </div>
    </header>
  );
};