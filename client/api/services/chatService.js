
import { ENDPOINTS } from "../endpoints";

export const generateChatResponse = async (userInput) => {
    const url = ENDPOINTS.chatassistant;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [{ role: 'user', content: userInput }]
      }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to generate chat response');
    }
  
    return response.json();
  };