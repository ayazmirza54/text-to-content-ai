import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Article = () => {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);

  const generateArticle = async (userPrompt: string) => {
    const { data: { secret: apiKey } } = await supabase.functions.invoke('get-secret', {
      body: { name: 'GEMINI_API_KEY' }
    });

    const response = await fetch('https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: userPrompt
          }]
        }],
        generationConfig: {
          temperature: 0.9,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192,
        }
      })
    });

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  };

  const { refetch: generateContent, isLoading } = useQuery({
    queryKey: ['article', prompt],
    queryFn: () => generateArticle(prompt),
    enabled: false,
    onSuccess: (data) => {
      setMessages(prev => [...prev, 
        { role: 'user', content: prompt },
        { role: 'assistant', content: data }
      ]);
      setPrompt('');
    },
    onError: (error) => {
      toast.error('Failed to generate article. Please try again.');
      console.error('Error generating article:', error);
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
                  <p className="text-white whitespace-pre-wrap">{message.content}</p>
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