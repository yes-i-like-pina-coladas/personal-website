import { getPosts } from "@/lib/content";
import type { Post } from "@/lib/content";
import { useEffect, useState } from "react";

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getPosts().then(setPosts);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <p className="text-lg">Coming soon...</p>
    </div>
  );
} 