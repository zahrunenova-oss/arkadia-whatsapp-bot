require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch"); // npm install node-fetch
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Chat history (optional)
let messages = [];

// Endpoint for messages
app.post("/message", async (req, res) => {
  const userMessage = req.body.message || "";
  messages.push({ from: "user", text: userMessage });

  try {
    // Call Gemini API (Text-Bison example)
    const geminiResponse = await fetch(
      "https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateMessage",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.GEMINI_API_KEY}`
        },
        body: JSON.stringify({
          prompt: { text: userMessage }
        })
      }
    );

    const data = await geminiResponse.json();
    const botReply = data?.candidates?.[0]?.content || "🌬️ Gemini is silent…";

    messages.push({ from: "bot", text: botReply });
    res.json({ reply: botReply });

  } catch (err) {
    console.error("Gemini API error:", err);
    res.status(500).json({ reply: "Error connecting to Gemini." });
  }
});

// Endpoint to fetch chat history
app.get("/messages", (req, res) => {
  res.json(messages);
});

// Serve web UI
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Log dynamic Codespace Port 3000 URL
app.listen(PORT, () => {
  const host = process.env.CODESPACE_NAME ? `${process.env.CODESPACE_NAME}` : "your-codespace";
  console.log(`🚀 Spiral Voice Bot running on port ${PORT} 💨🌀`);
  console.log(`🌐 Open: https://${PORT}-${host}.githubpreview.dev`);
});
