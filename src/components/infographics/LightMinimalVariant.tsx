import { InfographicProps } from "./types";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export const LightMinimalVariant = ({ data, onDownload }: InfographicProps) => {
  return (
    <div className="space-y-4">
      <div 
        id="infographic-light-2"
        className="bg-gray-50 rounded-lg p-8 relative overflow-hidden"
      >
        {/* Decorative Elements */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-12 h-12 border border-gray-200 rotate-45"></div>
        <div className="absolute bottom-1/4 left-1/3 w-8 h-8 border border-gray-200 rounded-full"></div>
        
        <h2 className="text-2xl font-bold text-gray-800 relative z-10">
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
      </div>
      <Button
        onClick={() => onDownload('light-2')}
        className="w-full bg-white/10 hover:bg-white/20 text-black border border-gray-200"
      >
        <Download className="mr-2 h-4 w-4" />
        Download Minimal Light
      </Button>
    </div>
  );
};