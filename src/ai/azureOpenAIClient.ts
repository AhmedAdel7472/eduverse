export class AzureOpenAIClient {
  private endpoint: string = '';
  private apiKey: string = '';
  private model: string = 'o4-mini';

  constructor() {
    const defaultEncKey = 'NVFhTWxHZHd4Qzg1bnkzeVdLMG1GMHd2R2hMQnhFRUxkQkh2RkNhWkFSSVhiN2ZjNXpMR0pRUUo5OUNGQ2ZoaE1rNVhKM3czQUFBQUFDT0c4WFhP';
    this.endpoint = import.meta.env.VITE_AZURE_ENDPOINT || 'https://ah30309142502238-8748-resource.services.ai.azure.com/openai/v1/responses';
    const envKey = import.meta.env.VITE_AZURE_API_KEY || defaultEncKey;
    try {
      this.apiKey = typeof atob === 'function' ? atob(envKey) : envKey;
    } catch (e) {
      this.apiKey = envKey;
    }
  }

  /**
   * Attempts live completion via configured Azure AI o4-mini OpenAI endpoint.
   */
  public async generateCompletion(prompt: string, systemPrompt: string = 'You are an expert AI Assessment System.'): Promise<string | null> {
    if (!this.apiKey) {
      return null;
    }

    const payload = {
      model: this.model,
      input: `${systemPrompt}\n\nUser Prompt: ${prompt}`
    };

    // Try direct endpoint first, then proxy endpoint if direct fails
    const endpointsToTry = [this.endpoint, '/api/openai-proxy'];

    for (const url of endpointsToTry) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        const response = await fetch(url, {
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
        // Try next endpoint or fall through
      }
    }

    return null;
  }
}
