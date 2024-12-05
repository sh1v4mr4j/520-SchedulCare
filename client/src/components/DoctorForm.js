import React from 'react';
import { Layout, Typography } from 'antd';

const { Header, Content } = Layout;

const DoctorLayout = ({ children }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
       <Header style={{ backgroundColor: '#fff', padding: '0 24px', display: 'flex', justifyContent: 'center' }}>
        <Typography.Title level={3} style={{ margin: '16px 0', textAlign: 'center' }}>
          Schedule Your Availability
        </Typography.Title>
      </Header>
      <Content style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: 'calc(100vh - 64px)', 
        textAlign: 'center' 
      }}>
        {children}
      </Content>
    </Layout>
  );
};

export default DoctorLayout;