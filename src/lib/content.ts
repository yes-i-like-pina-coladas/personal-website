export interface Post {
  title: string;
  date: string;
  tags: string[];
  slug: string;
  description?: string;
  image?: string;
  accent?: string;
  readingTimeMinutes?: number;
  author?: string;
}

export async function getPosts(): Promise<Post[]> {
  const files = import.meta.glob('/src/mdx/*.mdx');
  const rawFiles = import.meta.glob('/src/mdx/*.mdx', { as: 'raw' });
  const posts: Post[] = [];

  for (const path in files) {
    const file = await files[path]();
    const raw = typeof rawFiles[path] === 'function' ? await (rawFiles[path] as any)() : '';
    const slug = path.replace('/src/mdx/', '').replace('.mdx', '');
    // @ts-ignore
    const { frontmatter = {} } = file;
    const words = typeof raw === 'string' ? raw.split(/\s+/g).filter(Boolean).length : 0;
    const readingTimeMinutes = Math.max(1, Math.ceil(words / 225));
    posts.push({
      title: frontmatter.title || '',
      date: frontmatter.date || new Date().toISOString(),
      tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
      slug,
      description: frontmatter.description || '',
      image: typeof frontmatter.image === 'string' ? frontmatter.image : undefined,
      accent: typeof frontmatter.accent === 'string' ? frontmatter.accent : undefined,
      readingTimeMinutes,
      author: typeof frontmatter.author === 'string' ? frontmatter.author : 'Vladimir Loginov',
    });
  }

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
} 

export interface LoadedPost {
  Component: (props: any) => any;
  frontmatter: Record<string, any>;
  readingTimeMinutes: number;
}

export async function loadPostBySlug(slug: string): Promise<LoadedPost | null> {
  const modules = import.meta.glob('/src/mdx/*.mdx');
  const rawModules = import.meta.glob('/src/mdx/*.mdx', { as: 'raw' });
  const key = `/src/mdx/${slug}.mdx`;
  const loader = modules[key];
  if (!loader) return null;
  const mod: any = await loader();
  const raw = typeof rawModules[key] === 'function' ? await (rawModules[key] as any)() : '';
  const words = typeof raw === 'string' ? raw.split(/\s+/g).filter(Boolean).length : 0;
  const readingTimeMinutes = Math.max(1, Math.ceil(words / 225));
  return {
    Component: mod.default,
    frontmatter: { author: 'Vladimir Loginov', ...(mod.frontmatter || {}) },
    readingTimeMinutes,
  };
}