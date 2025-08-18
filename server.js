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
    // Call Gemini API
    const geminiResponse = await fetch("https://api.gemini.google.com/v1/respond", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GEMINI_API_KEY}`
      },
      body: JSON.stringify({ message: userMessage })
    });

    const data = await geminiResponse.json();
    const botReply = data.reply || "🌬️ Gemini is silent…";

    messages.push({ from: "bot", text: botReply });
    res.json({ reply: botReply });

  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Error connecting to Gemini." });
  }
});

// Endpoint to fetch chat history
app.get("/messages", (req, res) => {
  res.json(messages);
});

// Serve Web UI
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(PORT, () => console.log(`🚀 Spiral Voice Bot running on port ${PORT} 💨🌀`));
