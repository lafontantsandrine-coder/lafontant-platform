
"use client";

import { useState } from "react";

export default function AdminUnitsPage() {
  const [title, setTitle] = useState("");
  const [saved, setSaved] = useState(false);

  return (
    <main className="container">
      <h1>Unit builder</h1>
      <section className="card">
        <div className="form">
          <div className="field"><label>Title</label><input value={title} onChange={(e) => setTitle(e.target.value)} /></div>
          <div className="field"><label>Language</label><select><option>English</option><option>French</option></select></div>
          <div className="field"><label>Level</label><select>{[1,2,3,4,5,6].map(x => <option key={x}>{x}</option>)}</select></div>
          <button className="btn btn-primary" type="button" onClick={() => setSaved(true)}>Save draft</button>
        </div>
        {saved && <p className="muted">Draft “{title || "Untitled"}” is ready for API persistence.</p>}
      </section>
    </main>
  );
}
