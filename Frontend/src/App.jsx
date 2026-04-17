import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Homepage/Home";
import DrivePreview from "./pages/Drive/DrivePreview";
import InterviewPanel from "./pages/InterView/InterviewPanel";
import PythonPracticeApp from './pages/Prcaticeset/PythonPracticeApp';
import DomainSelectorPage from './pages/Prcaticeset/DomainSelectorPage';
import PracticeSetPage from './pages/Prcaticeset/PracticeSetPage';
import Dashboard from "./pages/Dashboard/Dashboard";
import ProfileDashboard from "./pages/LoginProfile/ProfileDashboard";
import './App.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/drive_name" element={<DrivePreview />} />
        <Route path="/interviewPanel" element={<InterviewPanel />} />
        <Route path="/practiceset" element={<PythonPracticeApp />} />
        <Route path="/domainselector" element={<DomainSelectorPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<ProfileDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;