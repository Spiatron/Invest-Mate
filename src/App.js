import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import About from './components/About/About';
import Pricing from './components/Pricing/Pricing';
import SignupForm from './components/UserLogin/SignupForm';
import PANStepForm from './components/UserLogin/PANStepForm';
import SegmentSelectionForm from './components/UserLogin/SegmentSelectionForm';
import Aadhaar from './components/UserLogin/Aadhaar';
import AppFooter from './components/Footer/Footer';
import Layout from './components/UserLogin/Layout';
import HomePage from './components/HomePage/HomePage';
import LinkBankAccount from './components/UserLogin/LinkBankAccount';
import UploadDocumentsForm from './components/UserLogin/UploadDocumentsForm';
import LastStep from './components/UserLogin/LastStep';
import AdminPanel from './components/Admin/AdminPanel';
import LoginForm from './components/UserLogin/LoginForm';
import ProfileSettings from './components/UserLogin/ProfileSettings';
import { EmailProvider } from './components/UserLogin/EmailContext'

function App() {
  return (
    <Router>
      <EmailProvider>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#ff0000",
          },
        }}
      >
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/SignupForm" element={<SignupForm />} />
            <Route path="/pan-step" element={<PANStepForm />} />
            <Route path="/segment-selection" element={<SegmentSelectionForm />} />
            <Route path="/aadhaar" element={<Aadhaar />} />
            <Route path="/LinkBankAccount" element={<LinkBankAccount />} />
            <Route path="/UploadDocumentsForm" element={<UploadDocumentsForm />} />
            <Route path="/LastStep" element={<LastStep />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/Profile-Settings" element={<ProfileSettings />} />
            {/* Add other routes as necessary */}
          </Routes>
        </Layout>
        <AppFooter />
      </ConfigProvider>
      </EmailProvider>
    </Router>
  );
}

export default App;
