import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You generate short, practical daily task suggestions. Keep under 8 words.",
        },
        {
          role: "user",
          content: "Suggest one productive task.",
        },
      ],
      temperature: 0.8,
      max_tokens: 20,
    });

    const suggestion = completion.choices[0].message.content;

    res.status(200).json({ suggestion });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI failed" });
  }
}