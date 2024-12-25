import { InfographicProps } from "./types";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export const LightMinimalVariant = ({ data, onDownload }: InfographicProps) => {
  return (
    <div 
      id="infographic-light-2"
      className="bg-gray-50 rounded-lg p-8 relative overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
      <div className="absolute top-4 right-4 w-16 h-16 bg-accent/5 rounded-full"></div>
      <div className="absolute bottom-8 left-8 w-20 h-20 bg-secondary/5 rotate-45"></div>
      
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-gray-50 via-white to-purple-50 opacity-60"></div>
      
      <h2 className="text-2xl font-bold text-gray-800 mb-6 relative z-10">
        {data.title}
      </h2>
      <div className="space-y-4 relative z-10">
        {data.points.map((point, index) => (
          <div key={index} className="flex items-start gap-3 bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-gray-100">
            <span className="flex-shrink-0 w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center">
              {index + 1}
            </span>
            <p className="text-gray-700">{point}</p>
          </div>
        ))}
      </div>
      <Button
        onClick={() => onDownload('light-2')}
        className="mt-4 w-full"
        variant="outline"
      >
        <Download className="mr-2 h-4 w-4" />
        Download Minimal Light
      </Button>
    </div>
  );
};