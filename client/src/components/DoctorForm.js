import React from 'react';
import { Layout, Typography } from 'antd';

const { Header, Content } = Layout;
const { Title } = Typography;

const DoctorLayout = ({ children }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ backgroundColor: '#1890ff', color: '#fff', textAlign: 'center', padding: '10px 0' }}>
        <Title level={2} style={{ color: '#fff' }}>Doctor Availability Management</Title>
      </Header>
      <Content style={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {children}
      </Content>
    </Layout>
  );
};

export default DoctorLayout;