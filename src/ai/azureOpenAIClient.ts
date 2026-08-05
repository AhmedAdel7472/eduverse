export class AzureOpenAIClient {
  private endpoint: string = '';
  private apiKey: string = '';
  private model: string = 'o4-mini';

  constructor() {
    this.endpoint = import.meta.env.VITE_AZURE_ENDPOINT || 'https://ah30309142502238-8748-resource.services.ai.azure.com/openai/v1/responses';
    this.apiKey = import.meta.env.VITE_AZURE_API_KEY || '';
  }

  /**
   * Attempts live completion via configured Azure AI o4-mini OpenAI endpoint.
   * Uses local Vite proxy `/api/openai-proxy` to bypass browser CORS constraints.
   */
  public async generateCompletion(prompt: string, systemPrompt: string = 'You are an expert AI Assessment System.'): Promise<string | null> {
    if (!this.apiKey) {
      return null;
    }

    try {
      const payload = {
        model: this.model,
        input: `${systemPrompt}\n\nUser Prompt: ${prompt}`
      };

      const targetUrl = typeof window !== 'undefined' ? '/api/openai-proxy' : this.endpoint;

      // 3.5 Second Timeout Safeguard for Instant UI Response
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const response = await fetch(targetUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': this.apiKey,
        },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();

        // 1. Extract from o4-mini responses output structure
        if (data.output && Array.isArray(data.output)) {
          for (const item of data.output) {
            if (item.type === 'message' && Array.isArray(item.content)) {
              for (const contentItem of item.content) {
                if (contentItem.type === 'output_text' && contentItem.text) {
                  return contentItem.text;
                }
              }
            }
          }
        }

        // 2. Fallback choices structure
        if (data.choices?.[0]?.message?.content) {
          return data.choices[0].message.content;
        }
      }
    } catch (e) {
      // Abort or network error falls through silently to procedural generator
    }
    return null;
  }
}
