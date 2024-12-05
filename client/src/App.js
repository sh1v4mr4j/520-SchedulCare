import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { Layout } from "antd";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import PaymentPage from "./pages/PaymentPage";
import DoctorPage from "./pages/Doctorpage";
import MapViewPage from "./pages/MapViewPage";
import ChatAssistancePage from "./pages/ChatAssistancePage";
import PatientPage from "./pages/PatientPage";
import MapView from "./components/Maps/MapView";
import LocationSearch from "./components/Maps/LocationSearch";
import "bootstrap-icons/font/bootstrap-icons.css";
import Directions from "./components/Maps/Directions";
import AddressSelector from "./components/Maps/AddressSelector";
import { UserProvider } from "./context/UserContext";

const { Content } = Layout;

const App = () => {
  const [selectedKey, setSelectedKey] = useState("1");

  return (
    <UserProvider>
      <Router>
        <Layout>
          <Navbar selectedKey={selectedKey} />
          <Content style={{ padding: "0 48 px" }}>
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
              <div style={{ padding: "10px", display: "grid" }}>
                <Routes>
                  <Route
                    path="/"
                    element={<Navigate to="/patient" replace />}
                  />{" "}
                  {/* FIXME: Change this to login*/}
                  <Route path="/login" element={<HomePage />} />
                  <Route path="/patient" element={<PatientPage />} />
                  <Route path="/doctor" element={<DoctorPage />} />
                  <Route path="/mapview/*" element={<MapViewPage />}>
                    <Route index element={<LocationSearch />} />
                    <Route
                      path="location-search"
                      element={<LocationSearch />}
                    />
                    <Route path="directions" element={<Directions />} />
                  </Route>
                  <Route path="/chatassist" element={<ChatAssistancePage />} />
                  <Route path="/payment" element={<PaymentPage />} />
                  {/* TODO: only to be used by Nikhil for now. Men at work kinda situation */}
                  <Route path="/test" element={<LocationSearch />} />
                  <Route path="/location" element={<AddressSelector />} />
                </Routes>
              </div>
            </div>
          </Content>
        </Layout>
      </Router>
    </UserProvider>
  );
};

export default App;
