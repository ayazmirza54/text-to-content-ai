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
          wrapper: "bg-white rounded-lg p-8 relative overflow-hidden bg-[linear-gradient(0deg,rgba(243,243,243,0.5)1px,transparent1px),linear-gradient(90deg,rgba(243,243,243,0.5)1px,transparent1px)] bg-[size:20px_20px]",
          title: "text-2xl font-bold text-gray-800 mb-6 relative z-10",
          point: "text-gray-700",
          numberBg: "bg-secondary",
          button: "mt-4 w-full",
          buttonVariant: "outline" as const
        };
      case 'light-2':
        return {
          wrapper: "bg-[#F1F0FB] rounded-lg p-8 relative overflow-hidden bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)]",
          title: "text-2xl font-bold text-gray-800 mb-6 relative z-10",
          point: "text-gray-700",
          numberBg: "bg-accent",
          button: "mt-4 w-full",
          buttonVariant: "outline" as const
        };
      case 'dark-1':
        return {
          wrapper: "bg-gradient-to-br from-gray-900 via-primary to-gray-900 rounded-lg p-8 relative overflow-hidden bg-[linear-gradient(0deg,rgba(34,34,34,0.3)1px,transparent1px),linear-gradient(90deg,rgba(34,34,34,0.3)1px,transparent1px)] bg-[size:24px_24px]",
          title: "text-2xl font-bold text-white mb-6 relative z-10",
          point: "text-white/90",
          numberBg: "bg-secondary",
          button: "mt-4 w-full bg-white/10 hover:bg-white/20 text-white border-white/20",
          buttonVariant: "outline" as const
        };
      case 'dark-2':
        return {
          wrapper: "bg-gray-900 rounded-lg p-8 relative overflow-hidden bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.4)_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_at_center,black_80%,transparent_100%)]",
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
      {/* Background Patterns and Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Blob Gradients with reduced opacity for better pattern visibility */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full filter blur-3xl"></div>
        
        {/* Animated Decorative Icons */}
        <div className="absolute top-4 right-4 transform rotate-12">
          <Circle className="w-6 h-6 text-secondary/40 animate-pulse" />
        </div>
        <div className="absolute top-12 left-4 transform -rotate-12">
          <Sparkles className="w-8 h-8 text-accent/40 animate-pulse" style={{ animationDelay: "0.5s" }} />
        </div>
        <div className="absolute bottom-8 right-8 transform rotate-45">
          <Droplet className="w-7 h-7 text-secondary/40 animate-pulse" style={{ animationDelay: "0.7s" }} />
        </div>
        <div className="absolute bottom-16 left-8 transform -rotate-12">
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
            } backdrop-blur-sm p-4 rounded-lg transform hover:scale-[1.02] transition-all duration-300 ${
              variant.includes('light') ? 'border border-gray-100 hover:border-secondary/50' : 'border border-white/10 hover:border-secondary/50'
            } hover:shadow-lg`}
          >
            <span className={`flex-shrink-0 w-8 h-8 ${styles.numberBg} text-white rounded-full flex items-center justify-center transform hover:scale-110 transition-transform`}>
              {index + 1}
            </span>
            <p className={styles.point}>{point}</p>
          </div>
        ))}
      </div>
      <Button
        onClick={() => onDownload(variant)}
        className={`${styles.button} transform hover:scale-105 transition-transform`}
        variant={styles.buttonVariant}
      >
        <Download className="mr-2 h-4 w-4" />
        Download {variant.includes('light') ? 'Light' : 'Dark'} {variant.endsWith('1') ? 'Modern' : 'Minimal'}
      </Button>
    </div>
  );
};