import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Layout, Input, Button, Card, Typography, Space } from 'antd';
import { SendOutlined, RobotOutlined, UserOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';
import { generateChatResponse } from '../api/services/chatService';

const { Header, Content } = Layout;
const { Text } = Typography;

const ChatAssistancePage = () => {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (userInput) => {
    const prompt = "You are a helpful assistant.";
    const newMessage = { role: 'user', content: userInput };
    setMessages(prev => [...prev, newMessage]);
    setIsLoading(true);

    try {
      const response = await generateChatResponse({
        messages: [
          { role: 'system', content: prompt },
          newMessage
        ]
      });

      console.log('Received response:', response);

      setMessages(prev => [...prev, { role: 'assistant', content: response.response }]);
    } catch (error) {
      console.error('Error generating chat response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = () => {
    if (userInput.trim()) {
      sendMessage(userInput);
      setUserInput('');
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      <Header style={{ backgroundColor: '#fff', padding: '0 24px', display: 'flex', justifyContent: 'center' }}>
        <Typography.Title level={3} style={{ margin: '16px 0', textAlign: 'center' }}>
          AI Health Assistant
        </Typography.Title>
      </Header>
      
      <Content style={{ padding: '24px', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        <Card
          style={{
            height: 'calc(100vh - 200px)',
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid #d9d9d9',
            borderRadius: '4px',
          }}
          bodyStyle={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            padding: '24px',
            overflow: 'hidden',
          }}
        >
          {/* Messages Area */}
          <div
            style={{
              flex: 1,
              overflow: 'auto',
              marginBottom: '24px',
            }}
          >
            <Space direction="vertical" style={{ width: '100%' }}>
              {messages.map((message, index) => (
                <Card
                  key={index}
                  style={{
                    marginBottom: '16px',
                    backgroundColor: message.role === 'user' ? '#e6f7ff' : '#f6f6f6',
                    marginLeft: message.role === 'user' ? 'auto' : '0',
                    marginRight: message.role === 'assistant' ? 'auto' : '0',
                    maxWidth: '80%',
                  }}
                  bodyStyle={{ padding: '12px' }}
                >
                  <Space>
                    {/* {message.role === 'user' ? (
                      <UserOutlined style={{ color: '#1890ff' }} />
                    ) : (
                      <RobotOutlined style={{ color: '#52c41a' }} />
                    )} */}
                    {message.role === 'assistant' ? (
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                    ) : (
                      <Text>{message.content}</Text>
                    )}
                  </Space>
                </Card>
              ))}
              {isLoading && (
                <Card
                  loading={true}
                  style={{
                    marginBottom: '16px',
                    marginRight: 'auto',
                    maxWidth: '80%',
                  }}
                />
              )}
            </Space>
          </div>

          {/* Input Area */}
          <div style={{ marginTop: 'auto' }}>
            <Space.Compact style={{ width: '100%' }}>
              <Input
                size="large"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type your message..."
                disabled={isLoading}
                onPressEnter={handleSendMessage}
              />
              <Button
                size="large"
                type="primary"
                icon={<SendOutlined />}
                onClick={handleSendMessage}
                disabled={isLoading}
              >
                Send
              </Button>
            </Space.Compact>
          </div>
        </Card>
      </Content>
    </Layout>
  );
}

export default ChatAssistancePage;