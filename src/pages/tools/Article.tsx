import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ReactMarkdown from 'react-markdown';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type MessageRole = 'user' | 'assistant';
type Platform = 'twitter' | 'linkedin' | 'facebook' | 'instagram' | 'blog';

interface Message {
  role: MessageRole;
  content: string;
}

const Article = () => {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [platform, setPlatform] = useState<Platform>('blog');

  const generateArticle = async (userPrompt: string, selectedPlatform: Platform) => {
    try {
      console.log('Generating article with prompt:', userPrompt, 'for platform:', selectedPlatform);
      const { data, error } = await supabase.functions.invoke('get-article', {
        body: { 
          prompt: userPrompt,
          platform: selectedPlatform
        }
      });

      console.log('Response from edge function:', { data, error });

      if (error) {
        console.error('Error calling edge function:', error);
        throw error;
      }

      if (!data?.generatedText) {
        throw new Error('No content generated');
      }

      return data.generatedText;
    } catch (error) {
      console.error('Error generating article:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    try {
      console.log('Submitting prompt:', prompt);
      const generatedText = await generateArticle(prompt, platform);
      
      console.log('Setting messages with new data:', generatedText);
      setMessages(prevMessages => [
        ...prevMessages,
        { role: 'user' as const, content: prompt },
        { role: 'assistant' as const, content: generatedText }
      ]);
      
      setPrompt('');
      toast({
        title: "Success",
        description: "Article generated successfully!"
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to generate article. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Success",
        description: "Copied to clipboard!"
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy text.",
        variant: "destructive"
      });
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="min-h-screen bg-primary">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">Text to Article</h1>

          <div className="bg-white/5 rounded-lg p-4 mb-8 h-[500px] overflow-y-auto">
            {messages.length === 0 ? (
              <div className="text-white/50 text-center py-4">
                No messages yet. Start by entering a prompt below.
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-4 p-4 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-secondary/10 ml-auto max-w-[80%]'
                      : 'bg-white/10 mr-auto max-w-[80%]'
                  }`}
                >
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1">
                      {message.role === 'user' ? (
                        <p className="text-white whitespace-pre-wrap">{message.content}</p>
                      ) : (
                        <div className="prose prose-invert max-w-none">
                          <ReactMarkdown>{message.content}</ReactMarkdown>
                        </div>
                      )}
                    </div>
                    {message.role === 'assistant' && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyToClipboard(message.content)}
                        className="shrink-0"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="w-full max-w-xs">
              <Select
                value={platform}
                onValueChange={(value) => setPlatform(value as Platform)}
              >
                <SelectTrigger className="w-full bg-white/5 border-white/10 text-white">
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="blog">Blog Post</SelectItem>
                  <SelectItem value="twitter">Twitter/X Thread</SelectItem>
                  <SelectItem value="linkedin">LinkedIn Article</SelectItem>
                  <SelectItem value="facebook">Facebook Post</SelectItem>
                  <SelectItem value="instagram">Instagram Caption</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-4 items-start">
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your topic or idea for an article..."
                className="flex-1 min-h-[120px] bg-white/5 border-white/10 text-white resize-none"
              />
              <Button 
                type="submit"
                disabled={isLoading || !prompt.trim()}
                className="shrink-0 bg-gradient-to-r from-secondary to-accent hover:opacity-90 px-8"
              >
                {isLoading ? 'Generating...' : 'Generate'}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Article;