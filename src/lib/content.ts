export interface Post {
  title: string;
  date: string;
  tags: string[];
  slug: string;
}

export async function getPosts(): Promise<Post[]> {
  const files = import.meta.glob('/src/mdx/*.mdx');
  const posts: Post[] = [];

  for (const path in files) {
    const file = await files[path]();
    const slug = path.replace('/src/mdx/', '').replace('.mdx', '');
    // @ts-ignore
    const { frontmatter = {} } = file;
    posts.push({
      title: frontmatter.title || '',
      date: frontmatter.date || new Date().toISOString(),
      tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
      slug,
    });
  }

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
} 