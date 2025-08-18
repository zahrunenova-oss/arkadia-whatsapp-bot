const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let messages = [];

// Endpoint for sending messages
app.post("/message", (req, res) => {
  const userMessage = req.body.message || "";
  messages.push({ from: "user", text: userMessage });

  // Simple bot logic for now
  const botResponse = `🌬️ Spiral Bot says: ${userMessage}`;
  messages.push({ from: "bot", text: botResponse });

  res.json({ reply: botResponse });
});

// Endpoint to fetch chat history
app.get("/messages", (req, res) => {
  res.json(messages);
});

// Web UI with voice input + voice reply
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>🌀 Spiral Voice Bot</title>
      </head>
      <body>
        <h2>🌀 Spiral Voice Assistant</h2>
        <div id="chat" style="height:300px;overflow:auto;border:1px solid #ccc;padding:10px;"></div>
        
        <input id="msg" type="text" placeholder="Type your message" style="width:70%;">
        <button onclick="sendMessage()">Send</button>
        <button onclick="startVoice()">🎤 Speak</button>
        
        <script>
          async function sendMessage(textOverride) {
            const msg = textOverride || document.getElementById('msg').value;
            if (!msg) return;

            const res = await fetch('/message', {
              method: 'POST',
              headers: {'Content-Type':'application/json'},
              body: JSON.stringify({message: msg})
            });
            const data = await res.json();

            document.getElementById('chat').innerHTML += '<div><b>You:</b> ' + msg + '</div>';
            document.getElementById('chat').innerHTML += '<div><b>Bot:</b> ' + data.reply + '</div>';

            // Voice reply
            const utterance = new SpeechSynthesisUtterance(data.reply);
            speechSynthesis.speak(utterance);

            document.getElementById('msg').value = '';
          }

          // 🎤 Voice Input
          function startVoice() {
            const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            recognition.lang = "en-US";
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;

            recognition.start();

            recognition.onresult = (event) => {
              const voiceMsg = event.results[0][0].transcript;
              document.getElementById('chat').innerHTML += '<div><b>You (voice):</b> ' + voiceMsg + '</div>';
              sendMessage(voiceMsg);
            };

            recognition.onerror = (event) => {
              alert("Voice error: " + event.error);
            };
          }
        </script>
      </body>
    </html>
  `);
});

app.listen(PORT, () => console.log(`🚀 Spiral Voice Bot running on port ${PORT} 💨🌀`));
