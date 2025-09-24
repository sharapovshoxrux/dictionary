import React from 'react';

export default function Flashcards({ items }) {
  const [i, setI] = React.useState(0);
  const [show, setShow] = React.useState(false);
  const [correct, setCorrect] = React.useState(0);

  React.useEffect(() => { setI(0); setShow(false); setCorrect(0); }, [items]);
  if (!items.length) return <div className="muted">Add words to practice.</div>;

  const w = items[i];
  const next = (ok) => {
    if (ok) setCorrect(c => c + 1);
    setShow(false);
    setI(n => (n + 1) % items.length);
  };

  return (
    <div className="study">
      <div className="kpi">Cards: {items.length} • Correct: {correct}</div>
      <div className="question">{w.base}</div>
      <div className="muted">({w.lang} → {w.targetLang})</div>

      {show ? (
        <>
          <div className="answer">{w.translation}</div>
          {w.example && <div className="muted">Ex: {w.example}</div>}
          <div className="row" style={{justifyContent:'center', marginTop:8}}>
            <button className="btn btn-green" onClick={() => next(true)}>I knew it</button>
            <button className="btn" onClick={() => next(false)}>I forgot</button>
          </div>
        </>
      ) : (
        <div className="row" style={{justifyContent:'center', marginTop:8}}>
          <button className="btn" onClick={() => setShow(true)}>Show answer</button>
        </div>
      )}
    </div>
  );
}
