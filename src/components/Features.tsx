import React from 'react';
import { Wand2, Zap, Shield } from 'lucide-react';

const features = [
  {
    icon: Wand2,
    title: "Smart Generation",
    description: "Advanced AI algorithms that understand context and create relevant content"
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Generate high-quality content in seconds, not hours"
  },
  {
    icon: Shield,
    title: "Reliable & Secure",
    description: "Enterprise-grade security with your data privacy in mind"
  }
];

export const Features = () => {
  return (
    <section id="features" className="py-20 bg-primary/50 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent mb-16">
          Powerful Features
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="p-6 rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/10 hover:border-white/20 transition-all"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <feature.icon className="w-12 h-12 text-secondary mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};