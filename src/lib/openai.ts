import { Configuration, OpenAIApi } from "openai-edge";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export async function generateImagePrompt(name: string) {
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an creative and helpful AI assistant. You are capable of generating interesting thumbnail images for each of my note categories and notes. Your output will be fed into the DALLE API to generate the final image. The description should be detailed but also minimalistic and flat styled ",
        },
        {
          role: "user",
          content: `Please genearate a thumbnail image for my note category ${name}`,
        },
      ],
    });
    const data = await response.json();
    const image_description = data.choices[0].message.content;
    return image_description as string;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function generateImage() {}
