import { useState } from 'react';

const QuestionCard = ({ question, index, delay = 0 }) => {
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);

  const handleOptionClick = (option) => {
    if (answered) return;
    setSelected(option);
    setAnswered(true);
    
    setTimeout(() => {
      // Reset after 3 seconds
      setSelected(null);
      setAnswered(false);
    }, 3000);
  };

  return (
    <section 
        className="bg-plum/80 border border-white/10 rounded-2xl p-0 overflow-hidden shadow-2xl backdrop-blur-xl animate-fadeUp scrollbar-thin ring-0"
        style={{ animationDelay: `${delay}s` }}
    >
      <div className="px-5 pt-5 pb-3 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-mono text-[#6C63FF]">Question {index}</p>
          <h2 className="mt-1 text-base font-semibold text-white">{question.title}</h2>
        </div>
      </div>

      <div className="code-window">
        <div className="flex items-center gap-2 px-4 py-2 border-b border-white/10 bg-white/5 rounded-t-2xl">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400"></span>
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400"></span>
            <span className="h-2.5 w-2.5 rounded-full bg-green-400"></span>
        </div>
        <pre className="p-4 overflow-x-auto text-[12px] leading-6 font-mono text-slate-200 scrollbar-thin">
          <code>{question.code}</code>
        </pre>
      </div>

      <div className="px-4 pt-4 pb-5">
        <p className="text-xs uppercase tracking-[0.18em] text-[#A1A1AA] mb-3">Choose one answer</p>
        <div className="grid gap-2">
          {question.options.map((option, idx) => (
            <button
                key={idx}
                className={`mcq-option ${
                    selected === String.fromCharCode(97 + idx) ? 
                    (String.fromCharCode(97 + idx) === question.correct ? 
                        'border-greenok/50 bg-greenok/10 text-green-300 shadow-glow' : 
                        'border-red-400/50 bg-red-400/10 text-red-300 animate-shake'
                    ) : ''
                }`}
                data-option={String.fromCharCode(97 + idx)}
                onClick={() => handleOptionClick(String.fromCharCode(97 + idx))}
            >
              {String.fromCharCode(97 + idx).toUpperCase()}. {option}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuestionCard;