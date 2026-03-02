import Shortener from "./components/Shortener";
import { useState } from "react";
import "./App.css";

function App() {
  const [links, setLinks] = useState([]);

  const handleNewLink = (linkObj) => {
    setLinks((prev) => [linkObj, ...prev]);
  };

  return (
    <div className="app">
      <Shortener onLink={handleNewLink} />
      <div className="links-list">
        {links.map((link) => (
          <div key={link.id} className="link-item">
            <p>
              <strong>Original:</strong> {link.original}
            </p>
            <p>
              <strong>Shortened:</strong> {link.shortened}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
