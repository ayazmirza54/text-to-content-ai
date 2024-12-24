import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Image = () => {
  const [prompt, setPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const generateImage = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prompt",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('text-to-image', {
        body: { prompt: prompt.trim() }
      });

      if (error) throw error;
      if (!data.image) throw new Error('No image generated');

      setGeneratedImage(data.image);
      toast({
        title: "Success",
        description: "Image generated successfully!",
      });
    } catch (error) {
      console.error('Error generating image:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to generate image",
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
          <h1 className="text-4xl font-bold text-white mb-8">Text to Image</h1>
          
          <div className="space-y-4">
            <Textarea
              placeholder="Describe the image you want to generate..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[120px] bg-white/5 border-white/10 text-white"
            />
            
            <Button
              onClick={generateImage}
              disabled={isLoading || !prompt.trim()}
              className="w-full bg-gradient-to-r from-secondary to-accent hover:opacity-90"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate Image'
              )}
            </Button>
          </div>

          {generatedImage && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-white mb-4">Generated Image</h2>
              <div className="rounded-lg overflow-hidden bg-white/5 p-4">
                <img
                  src={generatedImage}
                  alt="Generated artwork"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Image;
