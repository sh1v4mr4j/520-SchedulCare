import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Layout} from 'antd';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import PaymentPage from './pages/PaymentPage';
import DoctorPage from './pages/Doctorpage';
import MapViewPage from './pages/MapViewPage';
import ChatAssistantPage from './pages/ChatAssistancePage';
import PatientPage from './pages/PatientPage';


const App = () =>{
  const [selectedKey,setSelectedKey] = useState('1');
  return (
    <Router>
      <Layout>
        <Navbar selectedKey = {selectedKey} />
        <Routes>
          <Route path="/login" element={<HomePage />} />
          <Route path="/patient" element={<PatientPage />} />
          <Route path="/doctor" element={<DoctorPage />} />
          <Route path="/mapview" element={<MapViewPage />} />
          <Route path="/chatassist" element ={<ChatAssistantPage />} />
          <Route path="/patient/payment" element ={<PaymentPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
