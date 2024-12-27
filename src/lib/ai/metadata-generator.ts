import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

interface VideoMetadata {
  title: string;
  description: string;
  category: string;
  tags: string[];
  hook: string;
  mainPoints: string[];
}

export async function generateVideoMetadata(transcript: string): Promise<VideoMetadata> {
  try {
    const prompt = `Based on the following video transcript, generate engaging metadata that includes:
    1. A catchy title that reflects the content
    2. A compelling description summarizing the key points
    3. The most appropriate category for this content
    4. 5-7 relevant tags for discovery
    5. An attention-grabbing hook from the content
    6. 3-5 main points covered
    Format the response as JSON.

    Transcript:
    ${transcript}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error('No response from OpenAI');
    }

    const parsed = JSON.parse(response);
    
    return {
      title: parsed.title || 'Untitled Video',
      description: parsed.description || '',
      category: parsed.category || 'Uncategorized',
      tags: parsed.tags || [],
      hook: parsed.hook || '',
      mainPoints: parsed.mainPoints || []
    };
  } catch (error) {
    console.error('Failed to generate metadata:', error);
    // Return default metadata if AI generation fails
    return {
      title: 'Untitled Video',
      description: '',
      category: 'Uncategorized',
      tags: [],
      hook: '',
      mainPoints: []
    };
  }
}