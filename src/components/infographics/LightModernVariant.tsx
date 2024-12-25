import { InfographicProps } from "./types";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export const LightModernVariant = ({ data, onDownload }: InfographicProps) => {
  return (
    <div 
      id="infographic-light-1"
      className="bg-white rounded-lg p-8 relative overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/4 left-1/3 w-12 h-12 bg-secondary/10 rounded-lg rotate-12 animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/4 w-8 h-8 bg-accent/10 rounded-full animate-bounce"></div>
      
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-purple-50 opacity-50"></div>
      
      <h2 className="text-2xl font-bold text-gray-800 mb-6 relative z-10">
        {data.title}
      </h2>
      <div className="space-y-4 relative z-10">
        {data.points.map((point, index) => (
          <div key={index} className="flex items-start gap-3 bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm border border-gray-100">
            <span className="flex-shrink-0 w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center">
              {index + 1}
            </span>
            <p className="text-gray-700">{point}</p>
          </div>
        ))}
      </div>
      <Button
        onClick={() => onDownload('light-1')}
        className="mt-4 w-full"
        variant="outline"
      >
        <Download className="mr-2 h-4 w-4" />
        Download Modern Light
      </Button>
    </div>
  );
};