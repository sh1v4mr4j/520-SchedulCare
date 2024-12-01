import React, { useState } from 'react';
import { Layout, Input, Button, Card, Typography, Space } from 'antd';
import { SendOutlined, RobotOutlined, UserOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';
import { generateChatResponse } from '../../api/services/chatService';

const { Header, Content } = Layout;
const { Text } = Typography;

const ChatAssistancePage = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    const newMessage = { role: 'user', content: userInput };
    setMessages(prev => [...prev, newMessage]);
    setIsLoading(true);

    try {
      const response = await generateChatResponse(userInput);
      setMessages(prev => [...prev, { role: 'assistant', content: response.response }]);
    } catch (error) {
      console.error('Error generating chat response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      <Header style={{ backgroundColor: '#fff', padding: '0 24px', display: 'flex', justifyContent: 'center' }}>
        <Typography.Title level={3} style={{ margin: '16px 0', textAlign: 'center' }}>
          AI Chat Assistant
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
                    {message.role === 'user' ? (
                      <UserOutlined style={{ color: '#1890ff' }} />
                    ) : (
                      <RobotOutlined style={{ color: '#52c41a' }} />
                    )}
                    <Text>{message.content}</Text>
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
                onPressEnter={handleSubmit}
              />
              <Button
                size="large"
                type="primary"
                icon={<SendOutlined />}
                onClick={handleSubmit}
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