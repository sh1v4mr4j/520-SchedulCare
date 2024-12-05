import React from 'react';
import { Layout, Typography } from 'antd';

const { Header, Content } = Layout;
// const { Title } = Typography;

const DoctorLayout = ({ children }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
       <Header style={{ backgroundColor: '#fff', padding: '0 24px', display: 'flex', justifyContent: 'center' }}>
        <Typography.Title level={3} style={{ margin: '16px 0', textAlign: 'center' }}>
          Schedule Your Availability
        </Typography.Title>
      </Header>
      <Content style={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {children}
      </Content>
    </Layout>
  );
};

export default DoctorLayout;