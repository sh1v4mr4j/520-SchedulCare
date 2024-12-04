import { ENDPOINTS } from "../endpoint";

export const generateChatResponse = async (chatRequest) => {

    const response = await fetch(ENDPOINTS.chatAssistant, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(chatRequest),
  });

  if (!response.ok) {
    throw new Error('Failed to generate chat response');
  }
  
  return response.json();
};