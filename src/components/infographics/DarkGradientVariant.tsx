import { InfographicProps } from "./types";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export const DarkGradientVariant = ({ data, onDownload }: InfographicProps) => {
  return (
    <div 
      id="infographic-dark-1"
      className="bg-gradient-to-br from-gray-900 via-primary to-gray-900 rounded-lg p-8 relative overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full filter blur-3xl"></div>
      <div className="absolute top-1/3 right-1/4 w-12 h-12 border border-white/10 rotate-45"></div>
      <div className="absolute bottom-1/4 left-1/3 w-8 h-8 border border-white/10 rounded-full"></div>
      
      <h2 className="text-2xl font-bold text-white mb-6 relative z-10">
        {data.title}
      </h2>
      <div className="space-y-4 relative z-10">
        {data.points.map((point, index) => (
          <div key={index} className="flex items-start gap-3 bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/10">
            <span className="flex-shrink-0 w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center">
              {index + 1}
            </span>
            <p className="text-white/90">{point}</p>
          </div>
        ))}
      </div>
      <Button
        onClick={() => onDownload('dark-1')}
        className="mt-4 w-full bg-white/10 hover:bg-white/20 text-white border-white/20"
      >
        <Download className="mr-2 h-4 w-4" />
        Download Gradient Dark
      </Button>
    </div>
  );
};