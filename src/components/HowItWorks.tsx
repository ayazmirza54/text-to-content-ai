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
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-16">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={step.number}
              className="relative"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="text-6xl font-bold text-secondary/10 mb-4">{step.number}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};