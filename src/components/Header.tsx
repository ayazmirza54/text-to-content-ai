import React from 'react';
import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="fixed w-full bg-primary/50 backdrop-blur-xl z-50 border-b border-white/10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">
          Text-to-Content.ai
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How it Works</a>
          <Button className="bg-gradient-to-r from-secondary to-accent hover:opacity-90">Get Started</Button>
        </nav>
      </div>
    </header>
  );
};