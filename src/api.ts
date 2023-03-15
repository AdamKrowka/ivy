import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from "openai";

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const getResponse = async (
  messages: ChatCompletionRequestMessage[]
): Promise<string> => {
  const data = await openai.createChatCompletion(
    {
      model: "gpt-3.5-turbo",
      messages,
    },
    {
      timeout: 5000,
    }
  );
  return data.data.choices[0].message?.content || "";
};
