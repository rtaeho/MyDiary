import React, { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/diary/test")
      .then((response) => response.text())
      .then((data) => setMessage(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div className="App">
      <h1>Diary Application</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
