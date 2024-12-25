import React from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { FileText, Mic, Image, LineChart, Code, HelpCircle } from 'lucide-react';

const Tools = () => {
  const navigate = useNavigate();

  const tools = [
    {
      title: "Text to Article",
      description: "Transform your ideas into well-structured articles with AI assistance",
      icon: <FileText className="w-12 h-12 text-secondary" />,
      route: "/tools/article"
    },
    {
      title: "Text to Speech",
      description: "Convert your text into natural-sounding speech",
      icon: <Mic className="w-12 h-12 text-secondary" />,
      route: "/tools/speech"
    },
    {
      title: "Text to Image",
      description: "Generate stunning images from your text descriptions",
      icon: <Image className="w-12 h-12 text-secondary" />,
      route: "/tools/image"
    },
    {
      title: "Text to Infographics",
      description: "Create beautiful infographics from your textual data",
      icon: <LineChart className="w-12 h-12 text-secondary" />,
      route: "/tools/infographics"
    },
    {
      title: "Text to Code",
      description: "Convert natural language into working code snippets",
      icon: <Code className="w-12 h-12 text-secondary" />,
      route: "/tools/code"
    },
    {
      title: "Text to Q&A",
      description: "Generate comprehensive Q&A content from any topic",
      icon: <HelpCircle className="w-12 h-12 text-secondary" />,
      route: "/tools/qna"
    }
  ];

  return (
    <div className="min-h-screen bg-primary">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-4xl font-bold text-white mb-8">AI Tools</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Card 
              key={tool.title}
              className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
              onClick={() => navigate(tool.route)}
            >
              <CardHeader>
                <div className="mb-4">{tool.icon}</div>
                <CardTitle className="text-white">{tool.title}</CardTitle>
                <CardDescription className="text-gray-400">
                  {tool.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Tools;