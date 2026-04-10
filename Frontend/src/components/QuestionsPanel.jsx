import QuestionCard from './QuestionCard';

const questions = [
  {
    id: 1,
    title: "What will be the output?",
    code: `def func(a, b=[]):
    b.append(a)
    return b

print(func(1))
print(func(2))`,
    options: ["[1] and [2]", "[1] and [1, 2]", "[1] and [1]", "Error"],
    correct: "b"
  },
  {
    id: 2,
    title: "What does this output?",
    code: `x = "10"
y = 5
print(x * y)`,
    options: ["50", "1010101010", "Error", "None"],
    correct: "b"
  },
  {
    id: 3,
    title: "What happens here?",
    code: `a = [1, 2, 3]
b = a
b += [4]
print(a)`,
    options: ["[1, 2, 3]", "[1, 2, 3, 4]", "Error", "None"],
    correct: "b"
  }
  // Add more questions...
];

const QuestionsPanel = () => {
  return (
    <aside className="h-full min-h-0 border-r border-white/10 bg-[#050816]/80 backdrop-blur-xl flex flex-col overflow-hidden">
      <div className="px-6 py-5 border-b border-white/10 bg-white/5 shrink-0">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.24em] text-[#A1A1AA] font-semibold">
              Practice Workspace
            </p>
            <h1 className="mt-2 text-2xl font-bold text-white">Python Questions</h1>
            <p className="mt-2 text-sm text-[#A1A1AA] max-w-sm">
              Scroll the left panel for questions and use the right panel to write and run Python code.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-mono text-[#A1A1AA]">
            <span className="inline-block h-2 w-2 rounded-full bg-[#22C55E] animate-pulseDot"></span>
            {questions.length} MCQs
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto scrollbar-thin px-4 py-4 space-y-4">
        {questions.map((q, idx) => (
          <QuestionCard 
            key={q.id} 
            question={q} 
            index={idx + 1}
            delay={idx * 0.05}
          />
        ))}
      </div>
    </aside>
  );
};

export default QuestionsPanel;