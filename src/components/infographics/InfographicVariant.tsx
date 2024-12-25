import React from 'react';
import { Download } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Circle, Sparkles, Droplet, Leaf } from 'lucide-react';

interface InfographicVariantProps {
  id: string;
  title: string;
  points: string[];
  variant: 'light-1' | 'light-2' | 'dark-1' | 'dark-2';
  onDownload: (variantId: string) => void;
}

export const InfographicVariant = ({ id, title, points, variant, onDownload }: InfographicVariantProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'light-1':
        return {
          wrapper: "bg-white rounded-lg p-8 relative overflow-hidden",
          title: "text-2xl font-bold text-gray-800 mb-6 relative z-10",
          point: "text-gray-700",
          numberBg: "bg-secondary",
          button: "mt-4 w-full",
          buttonVariant: "outline" as const
        };
      case 'light-2':
        return {
          wrapper: "bg-gray-50 rounded-lg p-8 relative overflow-hidden",
          title: "text-2xl font-bold text-gray-800 mb-6 relative z-10",
          point: "text-gray-700",
          numberBg: "bg-accent",
          button: "mt-4 w-full",
          buttonVariant: "outline" as const
        };
      case 'dark-1':
        return {
          wrapper: "bg-gradient-to-br from-gray-900 via-primary to-gray-900 rounded-lg p-8 relative overflow-hidden",
          title: "text-2xl font-bold text-white mb-6 relative z-10",
          point: "text-white/90",
          numberBg: "bg-secondary",
          button: "mt-4 w-full bg-white/10 hover:bg-white/20 text-white border-white/20",
          buttonVariant: "outline" as const
        };
      case 'dark-2':
        return {
          wrapper: "bg-gray-900 rounded-lg p-8 relative overflow-hidden",
          title: "text-2xl font-bold text-white mb-6 relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-secondary to-accent",
          point: "text-white/90",
          numberBg: "bg-gradient-to-r from-secondary to-accent",
          button: "mt-4 w-full bg-gradient-to-r from-secondary to-accent text-white hover:opacity-90",
          buttonVariant: null
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div id={`infographic-${variant}`} className={styles.wrapper}>
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Blob Gradients */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full filter blur-3xl"></div>
        
        {/* Dotted Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
        
        {/* Decorative Icons */}
        <div className="absolute top-4 right-4">
          <Circle className="w-6 h-6 text-secondary/40 animate-pulse" />
        </div>
        <div className="absolute top-12 left-4">
          <Sparkles className="w-8 h-8 text-accent/40 animate-pulse" style={{ animationDelay: "0.5s" }} />
        </div>
        <div className="absolute bottom-8 right-8">
          <Droplet className="w-7 h-7 text-secondary/40 animate-pulse" style={{ animationDelay: "0.7s" }} />
        </div>
        <div className="absolute bottom-16 left-8">
          <Leaf className="w-6 h-6 text-accent/40 animate-pulse" style={{ animationDelay: "1s" }} />
        </div>
      </div>

      <h2 className={styles.title}>{title}</h2>
      <div className="space-y-4 relative z-10">
        {points.map((point, index) => (
          <div 
            key={index} 
            className={`flex items-start gap-3 ${
              variant.includes('light') ? 'bg-white/80' : 'bg-white/5'
            } backdrop-blur-sm p-4 rounded-lg ${
              variant.includes('light') ? 'border border-gray-100' : 'border border-white/10 hover:border-secondary/50'
            } transition-colors`}
          >
            <span className={`flex-shrink-0 w-8 h-8 ${styles.numberBg} text-white rounded-full flex items-center justify-center`}>
              {index + 1}
            </span>
            <p className={styles.point}>{point}</p>
          </div>
        ))}
      </div>
      <Button
        onClick={() => onDownload(variant)}
        className={styles.button}
        variant={styles.buttonVariant}
      >
        <Download className="mr-2 h-4 w-4" />
        Download {variant.includes('light') ? 'Light' : 'Dark'} {variant.endsWith('1') ? 'Modern' : 'Minimal'}
      </Button>
    </div>
  );
};