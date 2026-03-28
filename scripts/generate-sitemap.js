import { readdir, readFile, writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const DOMAIN = 'https://www.vladimir-loginov.com';

async function getSlugs() {
  const files = await readdir(join(root, 'src/mdx'));
  return files
    .filter(f => f.endsWith('.mdx'))
    .map(f => f.replace(/\.mdx$/, ''));
}

async function main() {
  const slugs = await getSlugs();

  const urls = [
    { loc: `${DOMAIN}/`, changefreq: 'monthly', priority: '1.0' },
    { loc: `${DOMAIN}/blog`, changefreq: 'weekly', priority: '0.8' },
    ...slugs.map(slug => ({
      loc: `${DOMAIN}/blog/${slug}`,
      changefreq: 'yearly',
      priority: '0.7',
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  await writeFile(join(root, 'public/sitemap.xml'), xml);
  console.log(`Sitemap written with ${urls.length} URLs.`);
}

main();
