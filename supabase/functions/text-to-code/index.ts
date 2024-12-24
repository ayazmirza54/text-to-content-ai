import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { GoogleGenerativeAI } from "npm:@google/generative-ai";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get('GEMINI_API_KEY');
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not set');
    }

    const { prompt } = await req.json();
    if (!prompt) {
      throw new Error('Prompt is required');
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const systemPrompt = `You are an expert programmer with deep knowledge of multiple programming languages and best practices.
    Please help the user by generating clean, well-documented code based on their request.
    Always include:
    1. Code comments explaining key parts
    2. Proper error handling
    3. Best practices for the specific language
    4. Format the code with proper markdown code blocks for syntax highlighting
    
    User request: ${prompt}`;

    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
    const generatedCode = response.text();

    return new Response(JSON.stringify({ generatedCode }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in text-to-code function:', error);
    return new Response(
      JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});