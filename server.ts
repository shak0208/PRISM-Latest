import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Gemini Setup
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || "",
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // API Route for AI Refinement
  app.post("/api/refine-problem", async (req, res) => {
    try {
      const { problemStatement, title } = req.body;
      
      const prompt = `You are a high-level strategic consultant. Refine the following problem statement for a boardroom simulation. 
      Title: ${title}
      Current Statement: ${problemStatement}
      
      Make it professional, precise, and challenging. Focus on strategic implications. 
      Keep it under 3 sentences. Return only the refined text.`;

      const result = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt
      });
      
      res.json({ refinedText: result.text.trim() });
    } catch (error) {
      console.error("AI Refinement Error:", error);
      res.status(500).json({ error: "Failed to refine problem statement" });
    }
  });

  // API Route for Computing CXO Traits
  app.post("/api/compute-traits", async (req, res) => {
    try {
      const { role, financialAggressiveness, riskAppetite, marketOptimism, executionConfidence } = req.body;
      
      const prompt = `You are an expert executive profiler. Based on the following parameters for a ${role} persona in a boardroom simulation, generate exactly 4 distinct behavioral traits or tendencies this persona would exhibit in a high-stakes strategy meeting.

      Parameters (0-100 scale):
      - Financial Aggressiveness: ${financialAggressiveness}
      - Risk Appetite: ${riskAppetite}
      - Market Optimism: ${marketOptimism}
      - Execution Confidence: ${executionConfidence}

      Return only a JSON array of 4 short strings. Do not include markdown code blocks or any other text.
      Example: ["Demands rigorous financial modeling before agreeing to pilot programs.", "Prioritizes immediate free cash flow over long-term strategic positioning.", "Likely to overestimate market reception based on high optimism.", "Consistently challenges operational timelines due to high execution confidence."]`;

      const result = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt
      });
      
      let traitsText = result.text.trim();
      if (traitsText.startsWith('\`\`\`json')) {
        traitsText = traitsText.replace(/^\`\`\`json\n|\n\`\`\`$/g, '');
      } else if (traitsText.startsWith('\`\`\`')) {
        traitsText = traitsText.replace(/^\`\`\`\n|\n\`\`\`$/g, '');
      }

      let traits = JSON.parse(traitsText);
      if (!Array.isArray(traits)) {
        traits = ["Demands rigorous financial modeling.", "Prioritizes free cash flow.", "Requires contingency plans.", "Uses defensive structured language."];
      }

      res.json({ traits: traits.slice(0, 4) });
    } catch (error) {
      console.error("AI Compute Traits Error:", error);
      res.status(500).json({ error: "Failed to compute traits" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
