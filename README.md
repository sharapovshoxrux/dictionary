# Multi-Language Dictionary & Flashcards

A React app for building your own multi-language dictionary and studying words with flashcards.  
Runs entirely in the browser with mock data stored in localStorage.  
Styled with a **Terminal Dark Split UI** (left sidebar, right content).

## Live Demo

[https://sharapovshoxrux.github.io/dictionary/](https://sharapovshoxrux.github.io/dictionary/)

---

## Features

- Add, edit, and delete words with examples.
- Filter by source/target language and search by text.
- Study mode with flashcards and score tracking.
- All data stored locally; no backend required.
- Dark, terminal-style layout that works on desktop and mobile.

---

## Tech Stack

- **React** (Create React App)
- **CSS Grid & Flexbox** for layout
- **localStorage** for persistent data

---

## Folder Structure

dictionary/
src/
components/
Filters.jsx
WordForm.jsx
WordList.jsx
Flashcards.jsx
data/
mock.js
App.js
index.js
index.css
public/
package.json

---

## Local Development

Clone and run:

````bash
git clone https://github.com/sharapovshoxrux/dictionary.git
cd dictionary
npm install
npm start
Then open http://localhost:3000.
Deployment (GitHub Pages)
Add this to package.json:
"homepage": "https://sharapovshoxrux.github.io/dictionary",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
Install deploy tool:
npm install --save-dev gh-pages
Deploy:
npm run deploy
Your live site will be at
https://sharapovshoxrux.github.io/dictionary/
Customization
Edit src/data/mock.js to change default words or languages.
Modify src/index.css to adjust the terminal dark theme.
Extend with spaced-repetition scoring or CSV import/export.
License
MIT

Save it as **README.md**, commit, and push:
```bash
git add README.md
git commit -m "add project readme"
git push
````
