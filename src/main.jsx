import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { PostList } from "./components/PostList";
import { PostDetails } from "./components/PostDetails";

const App = () => {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div>
      <h1>Blog</h1>
      {selectedId ? (
        <PostDetails id={selectedId} onBack={() => setSelectedId(null)} />
      ) : (
        <PostList onSelect={setSelectedId} />
      )}
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

