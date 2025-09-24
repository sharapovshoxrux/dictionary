import React from 'react';

export default function Filters({
  q = '', setQ = () => {},
  fromLang = 'All', setFromLang = () => {},
  toLang = 'All', setToLang = () => {},
  langs = [],
  onReset = () => {},
  variant = 'sidebar'
}) {
  const list = Array.isArray(langs) ? langs : [];

  if (variant === 'sidebar') {
    return (
      <>
        <div className="group">
          <div className="label">Search</div>
          <input
            className="input"
            placeholder="type to filter…"
            value={q}
            onChange={e => setQ(e.target.value)}
          />
        </div>

        <div className="group">
          <div className="label">From language</div>
          <select className="select" value={fromLang} onChange={e => setFromLang(e.target.value)}>
            <option value="All">All</option>
            {list.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>

        <div className="group">
          <div className="label">To language</div>
          <select className="select" value={toLang} onChange={e => setToLang(e.target.value)}>
            <option value="All">All</option>
            {list.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>

        <button className="btn" onClick={onReset}>Reset filters</button>
      </>
    );
  }

  // Fallback (unused in this theme)
  return null;
}
