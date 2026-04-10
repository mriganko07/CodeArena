import QuestionsPanel from '../../components/QuestionsPanel';
import CodeEditor from '../../components/CodeEditor';

const PythonPracticeApp = () => {
  return (
    <div 
      className="h-screen grid grid-cols-1 lg:grid-cols-[560px_minmax(0,1fr)] overflow-hidden text-white font-['Inter'] antialiased"
      style={{
        background: `
          radial-gradient(circle at top right, rgba(108,99,255,0.08), transparent 28%),
          linear-gradient(180deg, #050816 0%, #0b1120 100%)
        `
      }}
    >
      <QuestionsPanel />
      <CodeEditor />
    </div>
  );
};

export default PythonPracticeApp;