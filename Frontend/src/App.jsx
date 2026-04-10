import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Homepage/Home";
import DrivePreview from "./pages/Drive/DrivePreview";
import InterviewPanel from "./pages/InterView/InterviewPanel";
import PythonPracticeApp from './pages/Prcaticeset/PythonPracticeApp';
import DomainSelectorPage from './pages/Prcaticeset/DomainSelectorPage';
import PracticeSetPage from './pages/Prcaticeset/PracticeSetPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/drive_name" element={<DrivePreview />} />
        <Route path="/interviewPanel" element={<InterviewPanel />} />
        <Route path="/practiceset" element={<PythonPracticeApp />} />
        <Route path="/domainselector" element={<DomainSelectorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;