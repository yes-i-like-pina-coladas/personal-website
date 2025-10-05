import { useEffect } from 'react';
import { getPosts } from '@/lib/content';
import BlogPostCard from '@/components/BlogPostCard';
import type { Post } from '@/lib/content';
import { useState } from 'react';

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getPosts();
      setPosts(data);
    })();
  }, []);

  useEffect(() => {
    document.title = 'Blog | Vladimir Loginov';
    const description = 'Articles by Vladimir Loginov on product, AI, and engineering.';
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', description);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `${window.location.origin}/blog`);

    // OG/Twitter
    const og: Array<[string, string]> = [
      ['og:site_name', 'Vladimir Loginov'],
      ['og:type', 'website'],
      ['og:title', 'Blog | Vladimir Loginov'],
      ['og:description', description],
      ['og:url', `${window.location.origin}/blog`],
      ['og:image', `${window.location.origin}/assets/photo_normal.jpg`],
    ];
    og.forEach(([property, content]) => {
      let tag = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    });

    const tw: Array<[string, string]> = [
      ['twitter:card', 'summary_large_image'],
      ['twitter:title', 'Blog | Vladimir Loginov'],
      ['twitter:description', description],
      ['twitter:image', `${window.location.origin}/assets/photo_normal.jpg`],
    ];
    tw.forEach(([name, content]) => {
      let tag = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    });

    // JSON-LD: Blog
    const ld = {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Vladimir Loginov Blog',
      url: `${window.location.origin}/blog`,
      publisher: {
        '@type': 'Person',
        name: 'Vladimir Loginov',
      },
    };
    let script = document.getElementById('blog-jsonld') as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'blog-jsonld';
      document.head.appendChild(script);
    }
    script.text = JSON.stringify(ld);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 mt-10 sm:mt-12">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}