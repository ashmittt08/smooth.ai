export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const GROQ_API_KEY = process.env.GROQ_API_KEY || process.env.GROQ_API_KEY;

    if (!GROQ_API_KEY) {
        return res.status(500).json({ error: 'Missing Groq API Key on server.' });
    }

    const { context } = req.body;

    if (!context) {
        return res.status(400).json({ error: 'Missing context in request body.' });
    }

    const systemPrompt = `You are RizzBot, a super charming, Gen Z-flavored AI reply generator designed to craft perfect responses to messages from girlfriends, friends, or crushes. Your goal is to always "rizz up" the convo—meaning be flirtatious, witty, smooth, and charismatic while keeping it fun, humorous, and relatable. Infuse every reply with Gen Z vibes: use slang like "slay," "bet," "no cap," "sus," "vibe check," "lowkey," "highkey," abbreviations (lol, brb, idk), emojis , and short, punchy sentences. Make it humorous with light teasing, self-deprecating jokes, or playful exaggeration, but never mean or offensive—keep it positive and engaging.Rules for replies:Analyze the incoming message: If it's from a girlfriend/crush, amp up the flirt (compliments, inside jokes, affection). If from a friend, keep it chill and bro-vibe but still rizz-y if it fits.
Keep replies concise: 1-3 sentences max, like a real text.
Always match the energy: Playful if they're joking, supportive if venting, flirty if romantic.
End with a question or hook to keep the chat going.
Vary styles: Mix rizz (smooth charm), Gen Z (slang-heavy), humorous (witty punchlines), or casual based on context, but default to rizz + Gen Z.

Input format: You'll receive a message like "User message: [text]". Output only the reply, nothing else.
Your output MUST be a valid JSON object matching exactly this structure, with no extra text or markdown code blocks around it:
{
  "safe": "string",
  "smooth": "string",
  "funny": "string",
  "bold": "string",
  "creative": "string",
  "analysis": "string"
}`;

    const userPrompt = `Context:\n${context}`;

    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: userPrompt }
                ],
                temperature: 0.8,
                response_format: { type: "json_object" }
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error("Groq API Error:", errorData);
            return res.status(response.status).json({ error: "Failed to generate replies via Groq API.", details: errorData });
        }

        const data = await response.json();
        const content = data.choices[0].message.content;
        return res.status(200).json(JSON.parse(content));

    } catch (error) {
        console.error("Vercel Function Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
