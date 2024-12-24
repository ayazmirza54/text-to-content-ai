import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

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

  return (
    <div className="min-h-screen bg-primary">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto space-y-8">
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
            <div className="mt-8 bg-white/5 rounded-lg p-8 border border-white/10">
              <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                {infographicData.title}
              </h2>
              <div className="grid gap-6">
                {infographicData.points.map((point, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-secondary to-accent flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <p className="text-white/90 text-lg">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Infographics;
