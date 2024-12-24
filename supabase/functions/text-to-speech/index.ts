import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { text, voiceId } = await req.json()
    const apiKey = Deno.env.get('ELEVEN_LABS_API_KEY')

    if (!apiKey) {
      throw new Error('ElevenLabs API key not found')
    }

    console.log('Generating speech for text:', text.substring(0, 100) + '...')
    console.log('Using voice ID:', voiceId)

    // Call ElevenLabs API to generate speech
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': apiKey,
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_monolingual_v1",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5,
          },
        }),
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error('ElevenLabs API error:', errorText)
      throw new Error(`Failed to generate speech: ${errorText}`)
    }

    // Get the audio data as an ArrayBuffer
    const audioBuffer = await response.arrayBuffer()
    
    // Convert ArrayBuffer to Base64
    const uint8Array = new Uint8Array(audioBuffer)
    const binary = uint8Array.reduce((data, byte) => data + String.fromCharCode(byte), '')
    const base64Audio = btoa(binary)
    const audioUrl = `data:audio/mpeg;base64,${base64Audio}`

    console.log('Successfully generated audio')

    return new Response(
      JSON.stringify({ audioUrl }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    )
  } catch (error) {
    console.error('Error:', error.message)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})