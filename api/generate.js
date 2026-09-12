export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  
  const apiKey = process.env.apikey; 
  
  const { finalPrompt } = req.body; 

  if (!finalPrompt) {
    return res.status(400).json({ error: 'Missing prompt text' });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: finalPrompt }]
            }
          ]
        })
      }
    );

    const data = await response.json();
    return res.status(200).json(data);
    
  } catch (error) {
    return res.status(500).json({ error: 'Uh oh! Seems like the default API has ran out of credits! Check back in a few hours to see if it resets!' });
  }
}