import React from 'react';
import { LANGS as DEFAULT_LANGS } from '../data/mock';

export default function WordForm({ onSave, editing, cancelEdit, langs }) {
  // Safe languages list: use prop if valid array, else fallback export
  const options = Array.isArray(langs) ? langs : DEFAULT_LANGS;

  const [base, setBase] = React.useState(editing?.base || '');
  const [lang, setLang] = React.useState(editing?.lang || options[0]);
  const [translation, setTranslation] = React.useState(editing?.translation || '');
  const [targetLang, setTargetLang] = React.useState(editing?.targetLang || options[1] || options[0]);
  const [example, setExample] = React.useState(editing?.example || '');

  React.useEffect(() => {
    setBase(editing?.base || '');
    setLang(editing?.lang || options[0]);
    setTranslation(editing?.translation || '');
    setTargetLang(editing?.targetLang || options[1] || options[0]);
    setExample(editing?.example || '');
  }, [editing, options]);

  const submit = (e) => {
    e.preventDefault();
    onSave({
      ...(editing || {}),
      base: base.trim(),
      lang,
      translation: translation.trim(),
      targetLang,
      example: example.trim(),
    });
  };

  return (
    <form className="card form" onSubmit={submit}>
      <div className="row">
        <input
          className="input"
          placeholder="Base word"
          value={base}
          onChange={(e) => setBase(e.target.value)}
          required
        />
        <select className="select" value={lang} onChange={(e) => setLang(e.target.value)}>
          {options.map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
      </div>

      <div className="row">
        <input
          className="input"
          placeholder="Translation"
          value={translation}
          onChange={(e) => setTranslation(e.target.value)}
          required
        />
        <select className="select" value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
          {options.map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
      </div>

      <input
        className="input"
        placeholder="Example sentence (optional)"
        value={example}
        onChange={(e) => setExample(e.target.value)}
      />

      <div className="row">
        <button className="btn btn-primary" type="submit">{editing ? 'Update' : 'Add'}</button>
        {editing && <button type="button" className="btn" onClick={cancelEdit}>Cancel</button>}
      </div>
    </form>
  );
}
