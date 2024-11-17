import React, {useState} from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import {Layout} from 'antd';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import PaymentPage from './pages/PaymentPage';
import DoctorPage from './pages/Doctorpage';
import MapViewPage from './pages/MapViewPage';
import ChatAssistantPage from './pages/ChatAssistancePage';
import PatientPage from './pages/PatientPage';

const {Content} = Layout;

const App = () => {
  const [selectedKey, setSelectedKey] = useState('1');
  const [heading, setHeading] = useState('');

  const handleNavClick = (heading) => {
    setHeading(heading);
  }

  return (
      <Router>
        <Layout>
          <Navbar selectedKey={selectedKey} setHeading={handleNavClick}/>
          <Content style={{padding: "0 48 px"}}>
            <div
                style={{
                  minHeight: 280,
                  height: "100%",
                  padding: 24,
                  margin: 40,
                  background: "white",
                  borderRadius: 10,
                }}
            >
              <div
                  style={{padding: "10px", display: "grid", justifyContent: "center"}}
              >
                <h1>{heading}</h1>
              </div>
              <div
                  style={{padding: "10px", display: "grid"}}
              >
                <Routes>
                  <Route path="/" element={<Navigate to="/patient" replace/>}/> {/* FIXME: Change this to login*/}
                  <Route path="/login" element={<HomePage/>}/>
                  <Route path="/patient" element={<PatientPage/>}/>
                  <Route path="/doctor" element={<DoctorPage/>}/>
                  <Route path="/mapview" element={<MapViewPage/>}/>
                  <Route path="/chatassist" element={<ChatAssistantPage/>}/>
                  <Route path="/patient/payment" element={<PaymentPage/>}/>
                </Routes>
              </div>
            </div>
          </Content>
        </Layout>
      </Router>
  );
};

export default App;
