import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { PostList } from "./components/PostList";

const App = () => {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div>
      <h1>Blog</h1>
      <PostList onSelect={setSelectedId} />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

