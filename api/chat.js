// This would run on your server
export default async function handler(req, res) {
  const { message } = req.body;

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_API_KEY`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        parts: [{ text: `You are Harsh's personal AI assistant. 
                        Harsh is a Computer Scientist and Music Producer 
                        who uses Ableton Live and loves traveling to Uttarakhand. 
                        Answer this: ${message}` }]
      }]
    })
  });

  const data = await response.json();
  const botText = data.candidates[0].content.parts[0].text;
  
  res.status(200).json({ reply: botText });
}