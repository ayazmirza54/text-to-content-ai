import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import * as htmlToImage from 'html-to-image';
import { LightModernVariant } from "@/components/infographics/LightModernVariant";
import { LightMinimalVariant } from "@/components/infographics/LightMinimalVariant";
import { DarkGradientVariant } from "@/components/infographics/DarkGradientVariant";
import { DarkNeonVariant } from "@/components/infographics/DarkNeonVariant";
import type { InfographicData } from "@/components/infographics/types";

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
    if (!element) {
      toast({
        title: "Error",
        description: "Failed to find infographic element",
        variant: "destructive",
      });
      return;
    }

    try {
      const dataUrl = await htmlToImage.toPng(element, {
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: variantId.includes('dark') ? '#1A1F2C' : '#ffffff',
      });
      
      const link = document.createElement('a');
      link.download = `infographic-${variantId}.png`;
      link.href = dataUrl;
      link.click();
      
      toast({
        title: "Success",
        description: "Infographic downloaded successfully!",
      });
    } catch (error) {
      console.error('Error downloading infographic:', error);
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
              <LightModernVariant data={infographicData} onDownload={downloadInfographic} />
              <LightMinimalVariant data={infographicData} onDownload={downloadInfographic} />
              <DarkGradientVariant data={infographicData} onDownload={downloadInfographic} />
              <DarkNeonVariant data={infographicData} onDownload={downloadInfographic} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Infographics;