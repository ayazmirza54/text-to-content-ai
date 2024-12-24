import React from 'react';

const steps = [
  {
    number: "01",
    title: "Input Your Text",
    description: "Start with any text - an idea, outline, or rough draft"
  },
  {
    number: "02",
    title: "AI Processing",
    description: "Our AI analyzes and enhances your content"
  },
  {
    number: "03",
    title: "Get Results",
    description: "Receive polished, engaging content ready to use"
  }
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-accent/10 -z-10" />
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent mb-16">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={step.number}
              className="relative"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-secondary/20 to-accent/20 mb-4">{step.number}</div>
              <h3 className="text-xl font-semibold mb-2 text-white">{step.title}</h3>
              <p className="text-gray-300">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};