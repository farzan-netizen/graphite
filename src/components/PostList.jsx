import React from "react";

const posts = [
  { id: 1, title: "Getting Started", description: "Learn the basics of our platform." },
  { id: 2, title: "Advanced Tips", description: "Take your skills to the next level." },
  { id: 3, title: "Best Practices", description: "Follow these guidelines for success." },
];

export function PostList({ onSelect }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id} onClick={() => onSelect(post.id)} style={{ cursor: "pointer" }}>
          <strong>{post.title}</strong>
        </li>
      ))}
    </ul>
  );
}

