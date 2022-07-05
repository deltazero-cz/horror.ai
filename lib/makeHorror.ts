import { OpenAIApi, Configuration } from "openai"
const apiKey = process.env.OPENAI_API_KEY as string

export default async function makeHorror(topic: string) : Promise<string> {
  const openai = new OpenAIApi(new Configuration({ apiKey }))

  const response = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: `Topic: ${topic}\nTwo-Sentence Horror Story:`,
    temperature: 0.8,
    max_tokens: 60,
    top_p: 1,
    frequency_penalty: 0.5,
    presence_penalty: 0,
  })

  const text = response?.data?.choices?.[0]?.text?.trim()
  if (!text)
    throw new Error('Unable To Call OpenAI')

  return text
}
