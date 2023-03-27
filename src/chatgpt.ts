import { Configuration, OpenAIApi } from "openai";

// Static class/singleton
export default class ChatGPT {
  private static instance: ChatGPT;
  private config: Configuration;
  private openai: OpenAIApi;

  private constructor(apiKey: string) {
    this.config = new Configuration({ apiKey });
    this.openai = new OpenAIApi(this.config);
  }

  static getInstance(apiKey: string): ChatGPT {
    if (!ChatGPT.instance) {
      ChatGPT.instance = new ChatGPT(apiKey);
    }
    return ChatGPT.instance;
  }

  async createFixture(
    code: string,
  ): Promise<string | null> {
    const prompt = `
  Create a fixture (testing data) for the following type definition:
  """${code}"""

  Return just the expected output (no comments) as code.
  The fixture has to be a valid array of object literals that can be assigned to the type definition.
  `;

    try {
      const response = await this.openai.createCompletion({
        model: "text-davinci-003",
        prompt,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        max_tokens: 2048,
      });
      return response.data.choices[0].text ?? null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}