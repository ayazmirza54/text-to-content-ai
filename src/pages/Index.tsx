import React from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { HowItWorks } from '@/components/HowItWorks';
import { CTA } from '@/components/CTA';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-[#2A2F3C] to-[#1A1F2C] text-white">
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <CTA />
      </main>
    </div>
  );
};

export default Index;