// Importing the ENDPOINTS object from the endpoint module
import { ENDPOINTS } from "../endpoint";

// Function to generate a chat response by sending a request to the chat assistant API
export const generateChatResponse = async (chatRequest) => {
    // Sending a POST request to the chat assistant endpoint with the chat request data
    const response = await fetch(ENDPOINTS.chatAssistant, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(chatRequest),
  });
  
  // Checking if the response is not OK 
  if (!response.ok) {
    // Throwing an error if the response indicates failure
    throw new Error('Failed to generate chat response');
  }
  // Parsing the JSON response and returning it
  return response.json();
};