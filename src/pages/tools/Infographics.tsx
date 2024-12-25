import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Download, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import html2canvas from "html2canvas";

interface InfographicData {
  title: string;
  points: string[];
}

const Infographics = () => {
  const [prompt, setPrompt] = useState("");
  const [infographicData, setInfographicData] = useState<InfographicData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const generateInfographic = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text to generate an infographic",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('text-to-infographic', {
        body: { prompt: prompt.trim() }
      });

      if (error) throw error;
      if (!data.title || !data.points) throw new Error('Invalid response format');

      setInfographicData({
        title: data.title,
        points: data.points
      });

      toast({
        title: "Success",
        description: "Infographic generated successfully!",
      });
    } catch (error) {
      console.error('Error generating infographic:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to generate infographic",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const downloadInfographic = async (variantId: string) => {
    const element = document.getElementById(`infographic-${variantId}`);
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        backgroundColor: variantId.includes('dark') ? '#1A1F2C' : '#ffffff',
      });
      
      const link = document.createElement('a');
      link.download = `infographic-${variantId}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      
      toast({
        title: "Success",
        description: "Infographic downloaded successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download infographic",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-primary">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-6xl mx-auto space-y-8">
          <h1 className="text-4xl font-bold text-white mb-8">Text to Infographic</h1>
          
          <div className="space-y-4">
            <Textarea
              placeholder="Enter your text to generate an infographic..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[120px] bg-white/5 border-white/10 text-white"
            />
            
            <Button
              onClick={generateInfographic}
              disabled={isLoading || !prompt.trim()}
              className="w-full bg-gradient-to-r from-secondary to-accent hover:opacity-90"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate Infographic'
              )}
            </Button>
          </div>

          {infographicData && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Light Modern */}
              <div 
                id="infographic-light-1"
                className="bg-white rounded-lg p-8 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 relative z-10">
                  {infographicData.title}
                </h2>
                <div className="space-y-4 relative z-10">
                  {infographicData.points.map((point, index) => (
                    <div key={index} className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg shadow-sm">
                      <span className="flex-shrink-0 w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center">
                        {index + 1}
                      </span>
                      <p className="text-gray-700">{point}</p>
                    </div>
                  ))}
                </div>
                <Button
                  onClick={() => downloadInfographic('light-1')}
                  className="mt-4 w-full"
                  variant="outline"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Modern Light
                </Button>
              </div>

              {/* Light Minimal */}
              <div 
                id="infographic-light-2"
                className="bg-gray-50 rounded-lg p-8 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 relative z-10">
                  {infographicData.title}
                </h2>
                <div className="space-y-4 relative z-10">
                  {infographicData.points.map((point, index) => (
                    <div key={index} className="flex items-start gap-3 bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-gray-100">
                      <span className="flex-shrink-0 w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center">
                        {index + 1}
                      </span>
                      <p className="text-gray-700">{point}</p>
                    </div>
                  ))}
                </div>
                <Button
                  onClick={() => downloadInfographic('light-2')}
                  className="mt-4 w-full"
                  variant="outline"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Minimal Light
                </Button>
              </div>

              {/* Dark Gradient */}
              <div 
                id="infographic-dark-1"
                className="bg-gradient-to-br from-gray-900 via-primary to-gray-900 rounded-lg p-8 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
                <h2 className="text-2xl font-bold text-white mb-6 relative z-10">
                  {infographicData.title}
                </h2>
                <div className="space-y-4 relative z-10">
                  {infographicData.points.map((point, index) => (
                    <div key={index} className="flex items-start gap-3 bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/10">
                      <span className="flex-shrink-0 w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center">
                        {index + 1}
                      </span>
                      <p className="text-white/90">{point}</p>
                    </div>
                  ))}
                </div>
                <Button
                  onClick={() => downloadInfographic('dark-1')}
                  className="mt-4 w-full bg-white/10 hover:bg-white/20 text-white border-white/20"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Gradient Dark
                </Button>
              </div>

              {/* Dark Neon */}
              <div 
                id="infographic-dark-2"
                className="bg-gray-900 rounded-lg p-8 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full filter blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full filter blur-3xl"></div>
                <h2 className="text-2xl font-bold text-white mb-6 relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-secondary to-accent">
                  {infographicData.title}
                </h2>
                <div className="space-y-4 relative z-10">
                  {infographicData.points.map((point, index) => (
                    <div key={index} className="flex items-start gap-3 bg-white/5 p-4 rounded-lg border border-white/10 hover:border-secondary/50 transition-colors">
                      <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-secondary to-accent text-white rounded-full flex items-center justify-center">
                        {index + 1}
                      </span>
                      <p className="text-white/90">{point}</p>
                    </div>
                  ))}
                </div>
                <Button
                  onClick={() => downloadInfographic('dark-2')}
                  className="mt-4 w-full bg-gradient-to-r from-secondary to-accent text-white hover:opacity-90"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Neon Dark
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Infographics;