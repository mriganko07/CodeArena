import { useState, useEffect, useRef, useCallback } from 'react';

const CodeEditor = () => {
  const [code, setCode] = useState(`# Questions are on the left panel
# Write and run Python here

def square(n):
    return n * n

print(square(7))`);
  const [output, setOutput] = useState('Run code to see output here...');
  const [status, setStatus] = useState('idle');
  const [metaText, setMetaText] = useState('');
  const editorRef = useRef(null);
  const lineNumbersRef = useRef(null);
  const skulptLoaded = useRef(false);

  // Load Skulpt
  useEffect(() => {
    const loadSkulpt = async () => {
      if (!skulptLoaded.current) {
        const [skulpt, stdlib] = await Promise.all([
          import('https://cdn.skypack.dev/skulpt'),
          import('https://cdn.skypack.dev/skulpt-stdlib')
        ]);
        window.Sk = skulpt.Sk;
        window.Sk.builtinFiles = stdlib.builtinFiles;
        skulptLoaded.current = true;
      }
    };
    loadSkulpt();
  }, []);

  const renderLineNumbers = useCallback(() => {
    if (!editorRef.current || !lineNumbersRef.current) return;
    const count = Math.max(1, code.split('\n').length);
    lineNumbersRef.current.innerHTML = Array.from(
      { length: count }, 
      (_, i) => `<div class="pr-4">${i + 1}</div>`
    ).join('');
  }, [code]);

  useEffect(() => {
    renderLineNumbers();
  }, [code, renderLineNumbers]);

  const syncScroll = useCallback(() => {
    if (lineNumbersRef.current && editorRef.current) {
      lineNumbersRef.current.scrollTop = editorRef.current.scrollTop;
    }
  }, []);

  const runCode = useCallback(async () => {
    if (!window.Sk) return;
    
    setOutput('');
    setStatus('running');
    setMetaText('Running...');
    const start = performance.now();

    window.Sk.configure({
      output: (text) => setOutput((prev) => prev + text),
      read: (file) => {
        if (window.Sk.builtinFiles?.files[file] === undefined) {
          throw `File not found: '${file}'`;
        }
        return window.Sk.builtinFiles.files[file];
      },
      __future__: window.Sk.python3
    });

    try {
      await window.Sk.misceval.asyncToPromise(() => 
        window.Sk.importMainWithBody('<stdin>', false, code, true)
      );
      setStatus('success');
      setMetaText(((performance.now() - start) / 1000).toFixed(3) + 's');
      if (!output.trim()) setOutput('Code executed successfully.');
    } catch (err) {
      setStatus('error');
      setMetaText(((performance.now() - start) / 1000).toFixed(3) + 's');
      setOutput(err.toString());
    }
  }, [code, output]);

  const clearEditor = () => {
    setCode('');
    setOutput('Run code to see output here...');
    setMetaText('');
    setStatus('idle');
    editorRef.current?.focus();
  };

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = editorRef.current.selectionStart;
      const end = editorRef.current.selectionEnd;
      const newCode = code.slice(0, start) + '    ' + code.slice(end);
      setCode(newCode);
      editorRef.current.selectionStart = editorRef.current.selectionEnd = start + 4;
      renderLineNumbers();
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      runCode();
    }
  }, [code, runCode, renderLineNumbers]);

  return (
    <main className="h-full min-h-0 flex flex-col bg-[#0b1220]/70 overflow-hidden">
      <div className="h-16 shrink-0 border-b border-white/10 bg-[#050816]/70 backdrop-blur-xl px-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.24em] text-[#A1A1AA] font-semibold">Editor</p>
          <h2 className="mt-1 text-lg font-semibold text-white">Code Playground</h2>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={clearEditor}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-[#A1A1AA] hover:bg-white/10 hover:text-white transition-all"
          >
            Clear
          </button>
          <button 
            onClick={runCode}
            disabled={status === 'running'}
            className="rounded-xl bg-[#6C63FF] px-4 py-2 text-sm font-semibold text-white hover:bg-[#7b73ff] transition-all shadow-[0_0_0_1px_rgba(108,99,255,0.16),_0_10px_30px_rgba(0,0,0,0.28)] disabled:opacity-50"
          >
            Run Code
          </button>
        </div>
      </div>

      <div className="grid grid-rows-[minmax(0,1fr)_180px] flex-1 min-h-0 overflow-hidden">
        <div className="min-h-0 grid grid-cols-[56px_minmax(0,1fr)] bg-[#07101d] overflow-hidden">
          <div 
            ref={lineNumbersRef}
            className="overflow-hidden border-r border-white/10 bg-navy/50 py-4 text-right text-[13px] leading-7 font-mono text-muted/50 select-none scrollbar-thin"
          />
          <textarea
            ref={editorRef}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onScroll={syncScroll}
            onKeyDown={handleKeyDown}
            spellCheck="false"
            className="min-h-0 h-full w-full resize-none overflow-auto scrollbar-thin bg-transparent p-4 font-mono text-[13px] leading-7 text-slate-100 outline-none"
            placeholder="# Write Python code here
print('Hello')"
          />
        </div>

        <div className="border-t border-white/10 bg-[#050816]/80 flex flex-col min-h-0 overflow-hidden">
          <div className="h-11 shrink-0 px-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#A1A1AA]">
              <span 
                className={`h-2.5 w-2.5 rounded-full transition-all ${
                  status === 'running' ? 'bg-yellow-400 animate-pulseDot' :
                  status === 'success' ? 'bg-[#22C55E]' :
                  status === 'error' ? 'bg-red-400' :
                  'bg-white/30'
                }`}
              />
              Output
            </div>
            <div className="text-xs text-[#A1A1AA] font-mono">{metaText}</div>
          </div>
          <pre className="min-h-0 flex-1 overflow-auto scrollbar-thin p-4 font-mono text-[13px] leading-7 text-slate-200 whitespace-pre-wrap">
            {output}
          </pre>
        </div>
      </div>
    </main>
  );
};

export default CodeEditor;