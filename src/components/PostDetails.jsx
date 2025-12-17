import React from "react";
const posts = [
  { id: 1, title: "Getting Started", description: "Learn the basics of our platform." },
  { id: 2, title: "Advanced Tips", description: "Take your skills to the next level." },
  { id: 3, title: "Best Practices", description: "Follow these guidelines for success." },
];

export function PostDetails({ id, onBack }) {
  const post = posts.find((p) => p.id === id);
  if (!post) return <p>Not found</p>;

  return (
    <div>
      <button onClick={onBack}>← Back</button>
      <h2>{post.title}</h2>
      <p>{post.description}</p>
    </div>
  );
}

