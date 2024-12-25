import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { GoogleGenerativeAI } from "npm:@google/generative-ai";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const platformPrompts = {
  blog: "Write a detailed blog post about:",
  twitter: "Create a Twitter/X thread (using markdown numbering for each tweet) about:",
  linkedin: "Write a professional LinkedIn article about:",
  facebook: "Write an engaging Facebook post about:",
  instagram: "Create an Instagram caption (including relevant hashtags) about:"
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { 
      headers: corsHeaders,
      status: 204,
    });
  }

  try {
    const apiKey = Deno.env.get('GEMINI_API_KEY');
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not set');
    }

    const { prompt, platform = 'blog' } = await req.json();
    if (!prompt) {
      throw new Error('Prompt is required');
    }
    
    console.log('Generating content for platform:', platform);
    console.log('With prompt:', prompt);

    // Initialize the Generative AI model
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-pro",
      generationConfig: {
        temperature: 0.9,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 8192,
      },
    });

    // Create platform-specific prompt
    const platformPrompt = platformPrompts[platform as keyof typeof platformPrompts] || platformPrompts.blog;
    const fullPrompt = `${platformPrompt} ${prompt}\n\nMake sure the content is optimized for ${platform} in terms of length, style, and format. Include relevant hashtags if appropriate for the platform.`;

    // Generate content
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const generatedText = response.text();
    
    console.log('Generated text length:', generatedText.length);

    return new Response(JSON.stringify({ generatedText }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Error in get-article function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.stack 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});