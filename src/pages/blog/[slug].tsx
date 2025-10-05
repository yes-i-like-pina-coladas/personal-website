import { useParams } from 'react-router-dom';
import { loadPostBySlug } from '@/lib/content';
import Footer from '@/components/Footer';
import { useEffect, useMemo, useRef, useState } from 'react';

function setMetaTag(name: string, content: string) {
  if (!content) return;
  let tag = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('name', name);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function setPropertyTag(property: string, content: string) {
  if (!content) return;
  let tag = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('property', property);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

export default function PostPage() {
  const { slug = '' } = useParams();
  const [post, setPost] = useState<{ Component: any; frontmatter: any } | null>(null);

  useEffect(() => {
    (async () => {
      const loaded = await loadPostBySlug(slug);
      setPost(loaded);
    })();
  }, [slug]);

  const url = useMemo(() => `${window.location.origin}/blog/${slug}`, [slug]);

  useEffect(() => {
    if (!post) return;
    const { frontmatter } = post;
    const title = frontmatter.title ?? 'Blog post';
    const description = frontmatter.description ?? '';
    const published = frontmatter.date ?? '';
    const tags: string[] = Array.isArray(frontmatter.tags) ? frontmatter.tags : [];
    const author = (frontmatter.author as string) || 'Vladimir Loginov';

    document.title = `${title} | Vladimir Loginov`;
    setMetaTag('description', description);
    setMetaTag('author', author);
    setMetaTag('og:site_name', 'Vladimir Loginov');
    setMetaTag('og:title', `${title} | Vladimir Loginov`);
    setMetaTag('og:description', description);
    setMetaTag('og:type', 'article');
    setMetaTag('og:url', url);
    if (frontmatter.image) setMetaTag('og:image', `${window.location.origin}${frontmatter.image}`);
    if (published) setPropertyTag('article:published_time', published);
    setPropertyTag('article:author', author);
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', `${title} | Vladimir Loginov`);
    setMetaTag('twitter:description', description);
    if (frontmatter.image) setMetaTag('twitter:image', `${window.location.origin}${frontmatter.image}`);

    // canonical
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', url);

    // JSON-LD
    const ld = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: title,
      datePublished: published,
      dateModified: published,
      description,
      url,
      author: {
        '@type': 'Person',
        name: author,
      },
      keywords: tags.join(', '),
      publisher: {
        '@type': 'Person',
        name: 'Vladimir Loginov',
      },
    };
    let script = document.getElementById('post-jsonld') as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'post-jsonld';
      document.head.appendChild(script);
    }
    script.text = JSON.stringify(ld);

    // BreadcrumbList JSON-LD
    const breadcrumb = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${window.location.origin}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Blog',
          item: `${window.location.origin}/blog`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: title,
          item: url,
        },
      ],
    };
    let breadcrumbScript = document.getElementById('breadcrumb-jsonld') as HTMLScriptElement | null;
    if (!breadcrumbScript) {
      breadcrumbScript = document.createElement('script');
      breadcrumbScript.type = 'application/ld+json';
      breadcrumbScript.id = 'breadcrumb-jsonld';
      document.head.appendChild(breadcrumbScript);
    }
    breadcrumbScript.text = JSON.stringify(breadcrumb);
  }, [post, url]);

  const contentRef = useRef<HTMLDivElement | null>(null);
  const [toc, setToc] = useState<Array<{ id: string; text: string }>>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (!contentRef.current) return;
    const nodes = contentRef.current.querySelectorAll('h2');
    const items: Array<{ id: string; text: string }> = [];
    nodes.forEach((node) => {
      const id = (node as HTMLElement).id || (node as HTMLElement).textContent?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || '';
      (node as HTMLElement).id = id;
      items.push({ id, text: (node as HTMLElement).textContent || '' });
    });
    setToc(items);

    // Observe sections for active highlight
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId((entry.target as HTMLElement).id);
          }
        });
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0.01 }
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [post]);
  
  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-white/80">Loading…</p>
      </div>
    );
  }

  const { Component, frontmatter, readingTimeMinutes } = post as any;
  const components: Record<string, any> = {
    h2: (props: any) => <h2 className="mt-8 mb-3 text-3xl font-bold text-blue-400 scroll-mt-28" {...props} />,
    h3: (props: any) => <h3 className="mt-6 mb-2 text-2xl font-semibold scroll-mt-28" {...props} />,
    h4: (props: any) => <h4 className="mt-5 mb-2 text-xl font-semibold scroll-mt-28" {...props} />,
    p: (props: any) => <p className="my-4 leading-7" {...props} />,
    a: (props: any) => <a className="text-blue-400 underline underline-offset-2 hover:text-blue-300" {...props} />,
    ul: (props: any) => <ul className="my-4 list-disc pl-6 space-y-2" {...props} />,
    ol: (props: any) => <ol className="my-4 list-decimal pl-6 space-y-2" {...props} />,
    li: (props: any) => <li className="leading-7" {...props} />,
    blockquote: (props: any) => <blockquote className="my-6 border-l-4 border-blue-500/40 pl-4 italic text-gray-300" {...props} />,
    img: (props: any) => <img className="my-6 rounded-lg mx-auto" {...props} />,
    hr: (props: any) => <hr className="my-8 border-gray-800" {...props} />,
    table: (props: any) => <table className="my-6 w-full text-left border-collapse" {...props} />,
    th: (props: any) => <th className="border-b border-gray-700 py-2 pr-4 font-semibold" {...props} />,
    td: (props: any) => <td className="border-b border-gray-800 py-2 pr-4 align-top" {...props} />,
    em: (props: any) => <em className="italic" {...props} />,
    strong: (props: any) => <strong className="font-semibold" {...props} />,
    code: (props: any) => <code className="px-1.5 py-0.5 rounded bg-white/10 text-white" {...props} />,
    pre: (props: any) => <pre className="my-6 overflow-x-auto rounded bg-black/70 p-4" {...props} />,
  };

  return (
    <>
      <div id="top" className="sr-only">top</div>
      <div className="container mx-auto px-4 py-8 mt-10 sm:mt-12 text-gray-100 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
        <aside className="hidden lg:block sticky top-24 h-max self-start">
          <div className="text-sm text-white/70 font-semibold mb-3">On this page</div>
          <nav className="space-y-1 text-sm">
            {toc.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`block rounded px-2 py-1 transition ${activeId === item.id ? 'bg-white/10 text-white' : 'text-white/70 hover:text-white'}`}
              >
                {item.text}
              </a>
            ))}
          </nav>
        </aside>
        <div>
          <h1 className="text-4xl font-bold mb-2">{frontmatter.title}</h1>
          {frontmatter.subtitle && (
            <p className="text-lg text-white/80 mb-1">{frontmatter.subtitle}</p>
          )}
          {frontmatter.subtitleNote && (
            <p className="text-sm text-white/60 italic mb-4">{frontmatter.subtitleNote}</p>
          )}
          <div className="text-sm text-white/60 mb-8">
            {(frontmatter.author as string) || 'Vladimir Loginov'} · {new Date(frontmatter.date || Date.now()).toLocaleDateString('en-GB')} {readingTimeMinutes ? `· ${readingTimeMinutes} min read` : ''} {frontmatter.tags?.length ? `· ${frontmatter.tags.join(', ')}` : ''}
          </div>
          <div ref={contentRef} className="max-w-3xl post-content">
            <Component components={components} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}


