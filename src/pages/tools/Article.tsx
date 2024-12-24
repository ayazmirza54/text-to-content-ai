import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import ReactMarkdown from 'react-markdown';

const Article = () => {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);

  const generateArticle = async (userPrompt: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('get-article', {
        body: { prompt: userPrompt }
      });

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

  const { refetch: generateContent, isLoading } = useQuery({
    queryKey: ['article', prompt],
    queryFn: () => generateArticle(prompt),
    enabled: false,
    meta: {
      onSuccess: (data: string) => {
        setMessages(prev => [...prev, 
          { role: 'user', content: prompt },
          { role: 'assistant', content: data }
        ]);
        setPrompt('');
        toast.success('Article generated successfully!');
      },
      onError: (error: Error) => {
        toast.error('Failed to generate article. Please try again.');
        console.error('Error generating article:', error);
      }
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    generateContent();
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy text.');
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
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 p-4 rounded-lg ${
                  message.role === 'user' 
                    ? 'bg-secondary/10 ml-auto max-w-[80%]' 
                    : 'bg-white/10 mr-auto max-w-[80%]'
                }`}
              >
                <div className="flex justify-between items-start gap-2">
                  {message.role === 'user' ? (
                    <p className="text-white whitespace-pre-wrap">{message.content}</p>
                  ) : (
                    <div className="prose prose-invert prose-p:text-white prose-headings:text-white prose-strong:text-white prose-em:text-white prose-code:text-white max-w-none">
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                    </div>
                  )}
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
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex gap-4">
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your topic or idea for an article..."
              className="flex-1 bg-white/5 border-white/10 text-white"
            />
            <Button 
              type="submit" 
              disabled={isLoading || !prompt.trim()}
              className="shrink-0"
            >
              {isLoading ? 'Generating...' : 'Generate'}
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Article;