describe("Chat Assistance Page", () => {
    beforeEach(() => {
      // Visit the page (adjust URL as per your application)
      cy.visit("http://localhost:3000/chatassist");
    });
  
    it("should load the page and display the header, input field, and send button", () => {
      // Check for header text
      cy.contains("AI Health Assistant").should("be.visible");
  
      // Check for input box
      cy.get('input[placeholder="Type your message..."]').should("be.visible");
  
      // Check for send button
      cy.get("button").contains("Send").should("be.visible");
    });
  
    it("should allow the user to type a message and send it", () => {
      const userMessage = "Hello, how can I manage stress?";
      const assistantResponse =
        "Here are some tips for managing stress effectively...";
  
      // Mock the API response
      cy.intercept("POST", "/chat/generate", {
        statusCode: 200,
        body: { response: assistantResponse },
      }).as("generateChatResponse");
  
      // Type a message in the input field
      cy.get('input[placeholder="Type your message..."]').type(userMessage);
  
      // Click the send button
      cy.get("button").contains("Send").click();
  
      // Verify the user's message appears in the chat
      cy.contains(userMessage).should("be.visible");
  
      // Wait for the API call
      cy.wait("@generateChatResponse");
  
      // Verify the assistant's response appears in the chat
      cy.contains(assistantResponse).should("be.visible");
    });
  
    it("should show a loading indicator while the response is being generated", () => {
      const userMessage = "Tell me about healthy eating.";
  
      // Mock the API with a delay to simulate loading
      cy.intercept("POST", "/chat/generate", (req) => {
        req.reply({
          delay: 2000,
          statusCode: 200,
          body: {
            response: "Healthy eating is essential for a balanced lifestyle...",
          },
        });
      }).as("generateChatResponseWithDelay");
  
      // Type a message in the input field
      cy.get('input[placeholder="Type your message..."]').type(userMessage);
  
      // Click the send button
      cy.get("button").contains("Send").click();
  
      // Verify the loading indicator is displayed
      cy.get(".ant-card-loading").should("be.visible");
  
      // Wait for the API call to complete
      cy.wait("@generateChatResponseWithDelay", { timeout: 50000 });
  
      // Verify the loading indicator is no longer visible
      cy.get(".ant-card-loading").should("not.exist");
    });
  
    it("should check whether a server response is coming", () => {
      const userMessage = "Hello, how can I manage stress?";
  
      // Type a message and send it
      cy.get('input[placeholder="Type your message..."]').type(userMessage);
      cy.get("button").contains("Send").click();
  
      // Verify the user's message appears in the chat
      cy.contains(userMessage).should("be.visible");
  
      // Wait for the server response
      cy.get(".ant-card-body", { timeout: 50000 })
        .should("not.have.text", userMessage) // Wait for a non-user response
        .and("not.have.text", ""); // Ensure the response is not empty
    });
  });