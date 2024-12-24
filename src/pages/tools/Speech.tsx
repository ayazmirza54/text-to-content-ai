import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const voices = [
  { id: "21m00Tcm4TlvDq8ikWAM", name: "Rachel" },
  { id: "AZnzlk1XvdvUeBnXmlld", name: "Domi" }
];

const Speech = () => {
  const [speaker1Text, setSpeaker1Text] = useState("");
  const [speaker2Text, setSpeaker2Text] = useState("");
  const [speaker1Voice, setSpeaker1Voice] = useState(voices[0].id);
  const [speaker2Voice, setSpeaker2Voice] = useState(voices[1].id);
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioUrl1, setAudioUrl1] = useState<string | null>(null);
  const [audioUrl2, setAudioUrl2] = useState<string | null>(null);
  const { toast } = useToast();

  const generateSpeech = async (text: string, voiceId: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('text-to-speech', {
        body: { text, voiceId },
      });

      if (error) throw error;
      return data?.audioUrl;
    } catch (error) {
      console.error('Error generating speech:', error);
      throw error;
    }
  };

  const handleGenerateConversation = async () => {
    if (!speaker1Text.trim() || !speaker2Text.trim()) {
      toast({
        title: "Error",
        description: "Please enter text for both speakers",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const [audio1, audio2] = await Promise.all([
        generateSpeech(speaker1Text, speaker1Voice),
        generateSpeech(speaker2Text, speaker2Voice),
      ]);

      setAudioUrl1(audio1);
      setAudioUrl2(audio2);
      
      toast({
        title: "Success",
        description: "Conversation generated successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate conversation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">Podcast Style Conversation</h1>
          
          <div className="space-y-6">
            <Tabs defaultValue="speaker1" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="speaker1">Speaker 1</TabsTrigger>
                <TabsTrigger value="speaker2">Speaker 2</TabsTrigger>
              </TabsList>
              
              <TabsContent value="speaker1" className="space-y-4">
                <Textarea
                  placeholder="Enter text for Speaker 1..."
                  value={speaker1Text}
                  onChange={(e) => setSpeaker1Text(e.target.value)}
                  className="min-h-[150px] bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                />
                <Select value={speaker1Voice} onValueChange={setSpeaker1Voice}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue placeholder="Select voice for Speaker 1" />
                  </SelectTrigger>
                  <SelectContent>
                    {voices.map((v) => (
                      <SelectItem key={v.id} value={v.id}>
                        {v.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {audioUrl1 && (
                  <div className="mt-4">
                    <p className="text-white mb-2">Speaker 1 Audio:</p>
                    <audio controls className="w-full">
                      <source src={audioUrl1} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="speaker2" className="space-y-4">
                <Textarea
                  placeholder="Enter text for Speaker 2..."
                  value={speaker2Text}
                  onChange={(e) => setSpeaker2Text(e.target.value)}
                  className="min-h-[150px] bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                />
                <Select value={speaker2Voice} onValueChange={setSpeaker2Voice}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue placeholder="Select voice for Speaker 2" />
                  </SelectTrigger>
                  <SelectContent>
                    {voices.map((v) => (
                      <SelectItem key={v.id} value={v.id}>
                        {v.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {audioUrl2 && (
                  <div className="mt-4">
                    <p className="text-white mb-2">Speaker 2 Audio:</p>
                    <audio controls className="w-full">
                      <source src={audioUrl2} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                )}
              </TabsContent>
            </Tabs>

            <Button 
              onClick={handleGenerateConversation} 
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-secondary to-accent hover:opacity-90"
            >
              {isGenerating ? "Generating Conversation..." : "Generate Conversation"}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Speech;
