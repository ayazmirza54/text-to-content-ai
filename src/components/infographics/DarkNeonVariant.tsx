import { InfographicProps } from "./types";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export const DarkNeonVariant = ({ data, onDownload }: InfographicProps) => {
  return (
    <div className="space-y-4">
      <div 
        id="infographic-dark-2"
        className="bg-gray-900 rounded-lg p-8 relative overflow-hidden"
      >
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full filter blur-3xl"></div>
        <div className="absolute top-8 left-8 w-16 h-16 border border-secondary/30 rounded-lg rotate-12"></div>
        <div className="absolute bottom-12 right-12 w-20 h-20 border border-accent/30 rounded-full"></div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-transparent to-accent/5"></div>
        
        <h2 className="text-2xl font-bold relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-secondary to-accent">
          {data.title}
        </h2>
        <div className="space-y-4 relative z-10">
          {data.points.map((point, index) => (
            <div key={index} className="flex items-start gap-3 bg-white/5 p-4 rounded-lg border border-white/10 hover:border-secondary/50 transition-colors">
              <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-secondary to-accent text-white rounded-full flex items-center justify-center">
                {index + 1}
              </span>
              <p className="text-white/90">{point}</p>
            </div>
          ))}
        </div>
      </div>
      <Button
        onClick={() => onDownload('dark-2')}
        className="w-full bg-gradient-to-r from-secondary to-accent text-white hover:opacity-90"
      >
        <Download className="mr-2 h-4 w-4" />
        Download Neon Dark
      </Button>
    </div>
  );
};
