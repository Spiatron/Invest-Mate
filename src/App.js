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
import ProfileSettings from './components/ProfileSettings/ProfileSettings';
import { UsernameProvider } from './components/UserLogin/UsernameContext'
import ForgetPassword from './components/UserLogin/ForgetPassword';
import CustomerPanel from './components/Admin/CustomerPanel';
import BuyAndSell from './components/BuyAndSell/BuyAndSell';
import StockCharts from './components/BuyAndSell/StockCharts';
import LiveData from './components/LiveData';
import AdminLoginForm from './components/Admin/AdminLoginForm';
import AdminForgetPassword from './components/Admin/AdminForgetPassword';
import TransactionHistory from './components/BuyAndSell/TransactionHistory';
import TransactionPanel from './components/Transaction/TransactionPanel';
import UnauthorizedPage from './components/Unauthorized/UnauthorizedPage';

function App() {
  return (
    <Router>
      <UsernameProvider>
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
            <Route path="/forgetpassword" element={<ForgetPassword />} />
            <Route path="/CustomerPanel" element={<CustomerPanel />} />
            <Route path="/Buy&Sell" element={<BuyAndSell />} />
            <Route path="/graph" element={<StockCharts />} />
            <Route path="/liveData" element={<LiveData />} />
            <Route path="/adminLogin" element={<AdminLoginForm />} />
            <Route path="/adminForgetpassword" element={<AdminForgetPassword />} />
            <Route path="/TransactionHistory" element={<TransactionHistory />} />
            <Route path="/TransactionPanel" element={<TransactionPanel />} />
            <Route path="/error403" element={<UnauthorizedPage />} />
            {/* Add other routes as necessary */}
          </Routes>
        </Layout>
        <AppFooter />
      </ConfigProvider>
      </UsernameProvider>
    </Router>
  );
}

export default App;
