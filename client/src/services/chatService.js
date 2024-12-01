export const generateChatResponse = async (chatRequest) => {
    const url = "http://127.0.0.1:8000/chat/generate"

    const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(chatRequest),
  });

  if (!response.ok) {
    throw new Error('Failed to generate chat response');
  }
  
  return response.json();
};