// src/services/aiService.js

/**
 * Rizz Assistant AI Service
 * 
 * Calls our secure Vercel backend (/api/generate) to fetch Groq API responses.
 */
export async function generateReplies(context) {
    try {
        const response = await fetch("/api/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ context })
        });

        if (!response.ok) {
            console.error("Backend API Error:", response.statusText);
            throw new Error("Failed to generate replies via backend.");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("AI Service Error:", error);
        return getFallbackData(context);
    }
}

function getFallbackData(context) {
    return {
        safe: `Hey, how's your day going?`,
        smooth: `I was going to wait to text you, but I realized I didn't want to.`,
        funny: `Are you my router? Because I'm feeling a connection... wait, that was terrible. Let's start over.`,
        bold: `Stop teasing and tell me when we're going out.`,
        creative: `If we were in an escape room, I'd probably be staring at you instead of looking for clues.`,
        analysis: `Fallback analysis: Could not reach API, showing default responses.`
    };
}
