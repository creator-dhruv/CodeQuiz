import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import { loadApiKey } from "./config.js";


async function getTopicFromFile(filePath) {
    const content = fs.readFileSync(filePath, "utf-8");
    const apiKey = loadApiKey()?.trim();
    if (!apiKey) {
        console.error("❌ No Gemini API key found. Run CLI to set one.");
        process.exit(1);
    }

    const genAI = new GoogleGenAI({ apiKey });

    const prompt = `
    Analyze this text and return ONLY the main topic as a short phrase.
    Always define topic not more then 10 words
    And always add name of language with the topic.
    Text:
    ${content}
  `;

    const response = await genAI.models.generateContent({
        model: "gemini-2.5-pro",
        contents: [{
            parts: [{ text: prompt }],
            role: "user",
        }],
    });

    const reply = response.candidates?.[0]?.content?.parts?.[0]?.text.trim();
    return reply;
}

async function generateQuestions(topic, number = 5) {
    const apiKey = loadApiKey()?.trim();
    if (!apiKey) {
        console.error("❌ No Gemini API key found. Run CLI to set one.");
        process.exit(1);
    }

    const genAI = new GoogleGenAI({ apiKey });
    const prompt = `
    Create an **array** ${number} multiple-choice quiz questions on the topic "${topic}".
    Always ask short and to the point questions.
    Always ask questions about the topic and their related technology.
    Each question must be in strict JSON format like this:

    [
      {
        "question": "Question text?",
        "choices": ["Option1", "Option2", "Option3", "Option4"],
        "answer": "CorrectOption"
      },
      {
        "question": "Question text?",
        "choices": ["Option1", "Option2", "Option3", "Option4"],
        "answer": "CorrectOption"
      }
    ]

    Do NOT include extra text, only valid JSON.
  `;

    const response = await genAI.models.generateContent({
        model: "gemini-2.5-pro",
        contents: [{
            parts: [{ text: prompt }],
            role: "user",
        }],
    });

    const reply = response.candidates?.[0]?.content?.parts?.[0]?.text.trim();

    try {
        let cleanedOutput = reply
            .replace(/```json/g, '')
            .replace(/```/g, '')
            .trim();
        const pattern = /^\s*\[\s*(\{\s*"question"\s*:\s*"[^"]+"\s*,\s*"choices"\s*:\s*\[\s*(?:"[^"]+"\s*(,\s*"[^"]+"\s*)*)?\]\s*,\s*"answer"\s*:\s*"[^"]+"\s*\}\s*(,\s*\{\s*"question"\s*:\s*"[^"]+"\s*,\s*"choices"\s*:\s*\[\s*(?:"[^"]+"\s*(,\s*"[^"]+"\s*)*)?\]\s*,\s*"answer"\s*:\s*"[^"]+"\s*\}\s*)*)?\s*\]\s*$/;
        const match = cleanedOutput.match(pattern);
        const json = match ? match[0] : rawOutput.trim();

        return JSON.parse(json);
    } catch (err) {
        console.error("⚠️ Could not parse Gemini response:", reply);
        return [];
    }
}

export { getTopicFromFile, generateQuestions };
