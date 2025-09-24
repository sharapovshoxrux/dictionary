import React, { useEffect, useMemo, useState } from 'react';
import Filters from './components/Filters';
import WordForm from './components/WordForm';
import WordList from './components/WordList';
import Flashcards from './components/Flashcards';
import { LANGS, MOCK_WORDS } from './data/mock';
import './index.css';

const read = (k, v) => { try { return JSON.parse(localStorage.getItem(k)) ?? v; } catch { return v; } };
const write = (k, v) => localStorage.setItem(k, JSON.stringify(v));

export default function App() {
  const [words, setWords] = useState(() => read('words', MOCK_WORDS));
  useEffect(() => write('words', words), [words]);

  const [q, setQ] = useState('');
  const [fromLang, setFromLang] = useState('All');
  const [toLang, setToLang] = useState('All');

  const [editing, setEditing] = useState(null);
  const [study, setStudy] = useState(false);

  const filtered = useMemo(() => {
    let list = [...words];
    const t = q.trim().toLowerCase();
    if (t) {
      list = list.filter(w =>
        w.base.toLowerCase().includes(t) ||
        w.translation.toLowerCase().includes(t) ||
        (w.example || '').toLowerCase().includes(t)
      );
    }
    if (fromLang !== 'All') list = list.filter(w => w.lang === fromLang);
    if (toLang !== 'All') list = list.filter(w => w.targetLang === toLang);
    return list;
  }, [words, q, fromLang, toLang]);

  const saveWord = (data) => {
    if (data.id) {
      setWords(prev => prev.map(w => (w.id === data.id ? data : w)));
      setEditing(null);
    } else {
      const id = Math.max(0, ...words.map(w => w.id)) + 1;
      setWords(prev => [...prev, { id, ...data }]);
    }
  };
  const deleteWord = (id) => setWords(prev => prev.filter(w => w.id !== id));

  const resetFilters = () => { setQ(''); setFromLang('All'); setToLang('All'); };

  return (
    <div className="app">
      {/* LEFT: terminal sidebar */}
      <aside className="sidebar">
        <div className="brand"><span className="dot" /><span>Dictionary</span></div>
        <Filters
          q={q} setQ={setQ}
          fromLang={fromLang} setFromLang={setFromLang}
          toLang={toLang} setToLang={setToLang}
          langs={LANGS}
          onReset={resetFilters}
          variant="sidebar"   // informs Filters to render vertical
        />
        <button className="btn btn-green" onClick={() => setStudy(s => !s)}>
          {study ? 'Exit Study' : 'Study Flashcards'}
        </button>
        <div className="label">Words</div>
        <div className="muted">{filtered.length} items</div>
      </aside>

      {/* RIGHT: main content */}
      <section className="main">
        <div className="toolbar">
          <span className="kpi">From: {fromLang} → To: {toLang}</span>
          <div className="spacer" />
          <span className="badge">{filtered.length}</span>
        </div>

        {study ? (
          <div className="study-wrap">
            <Flashcards items={filtered} />
          </div>
        ) : (
          <>
            <WordForm onSave={saveWord} editing={editing} cancelEdit={() => setEditing(null)} langs={LANGS} />
            <div className="list">
              <WordList items={filtered} onEdit={setEditing} onDelete={deleteWord} />
            </div>
          </>
        )}

        <footer className="footer">
          Local-only • Mock data • No backend
        </footer>
      </section>
    </div>
  );
}
