# Text-to-Content.ai

A powerful AI-powered content generation platform that helps users create various types of content with ease.

## Features

### Current Tools
- **Text to Article**: Generate well-structured articles from simple prompts
- **Text to Speech**: Convert text into natural-sounding speech
- **Text to Image**: Create stunning images from text descriptions
- **Text to Infographics**: Transform text data into beautiful infographics
- **Text to Code**: Convert natural language into working code snippets

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **UI Components**: shadcn/ui + Tailwind CSS
- **Backend**: Supabase (Authentication, Database, Edge Functions)
- **AI Integration**: 
  - Google's Gemini API for text generation
  - ElevenLabs for text-to-speech
  - Hugging Face for image generation

## Getting Started

1. Clone the repository
```bash
git clone <repository-url>
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env` file with the following variables:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server
```bash
npm run dev
```

## Features

- 🎨 Modern, responsive UI with dark mode
- 🔐 Secure authentication with Supabase
- ⚡ Real-time content generation
- 📱 Mobile-friendly design
- 🎯 Intuitive user interface

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.