import React from 'react';

export default function WordList({ items, onEdit, onDelete }) {
  if (!items.length) return <div className="muted">No words yet.</div>;
  return (
    <>
      {items.map(w => (
        <div key={w.id} className="rowi">
          <div className="title">{w.base} <span className="muted">({w.lang})</span></div>
          <div><span className="tag">{w.translation}</span></div>
          <div className="muted">{w.targetLang}</div>
          <div className="row" style={{justifyContent:'flex-end'}}>
            <button className="btn" onClick={() => onEdit(w)}>edit</button>
            <button className="btn btn-red" onClick={() => onDelete(w.id)}>delete</button>
          </div>
        </div>
      ))}
    </>
  );
}
