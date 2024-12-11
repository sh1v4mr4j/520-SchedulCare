from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import google.generativeai as genai
from typing import List, Optional
from app.models.chat import ChatRequest, ChatResponse

import os

# Initialize router
app = APIRouter()

# Configure Gemini (you'll need to set this with your API key)
GOOGLE_API_KEY= os.getenv("GEMINI_API_KEY")
genai.configure(api_key=GOOGLE_API_KEY)

# Initialize Gemini model
model = genai.GenerativeModel('gemini-pro')

# Prompt to send to the Gemini Assistant
HEALTHCARE_PROMPT = """You are a knowledgeable healthcare assistant. Your role is to:
1. Listen carefully to patients' health concerns
2. Provide general health guidance and suggestions
3. Always remind patients to consult healthcare professionals for specific medical advice
4. Be empathetic and professional in your responses
5. Focus on general wellness and preventive care
6. You can provide suggestions on basic medications the patient can take at home

Please provide helpful information while maintaining appropriate medical disclaimers."""


@app.post("/generate", response_model=ChatResponse)
async def generate_chat_response(request: ChatRequest):
    try:
        # Convert messages to format Gemini expects
        chat = model.start_chat(history=[])
        chat.send_message(HEALTHCARE_PROMPT)
        # Add all messages to chat history
        for message in request.messages:
            if message.role == "user":
                chat.send_message(message.content)
            elif message.role == "assistant":
                
                continue

        # Generate response
        response = chat.send_message(request.messages[-1].content)
        
        # Add healthcare disclaimer to response
        full_response = (
            response.text + 
            "\n\nNote: This information is for general guidance only and should not "
            "replace professional medical advice. Please consult with a healthcare "
            "provider for specific medical concerns."
        )

        return ChatResponse(response=full_response)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))