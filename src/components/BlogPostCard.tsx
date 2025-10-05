import { Link } from 'react-router-dom';
import type { Post } from '@/lib/content';

export default function BlogPostCard({ post }: { post: Post }) {
  return (
    <Link to={`/blog/${post.slug}`} className="block group">
      <article className="relative overflow-hidden rounded-xl border border-white/10 transition-transform duration-300 hover:translate-y-[-2px] bg-white/[0.02]">
        <div className="relative aspect-[16/9]">
          <div
            className="absolute inset-0 opacity-60 group-hover:opacity-80 transition-opacity"
            style={{
              backgroundImage: post.image
                ? `url(${post.image})`
                : `radial-gradient(circle at 20% -10%, ${post.accent || 'rgba(59,130,246,0.35)'} 0%, transparent 35%), radial-gradient(circle at 120% 20%, rgba(255,255,255,0.08) 0%, transparent 40%)`,
              backgroundSize: post.image ? 'cover' : 'auto',
              backgroundPosition: 'center',
              filter: post.image ? 'grayscale(25%)' : 'none',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
            <div className="text-xs text-white/70 mb-2">
              {(post.author || 'Vladimir Loginov')} · {new Date(post.date).toLocaleDateString('en-GB')} {post.readingTimeMinutes ? `· ${post.readingTimeMinutes} min read` : ''} {post.tags?.length ? `· ${post.tags.join(', ')}` : ''}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
              {post.title}
            </h2>
          </div>
        </div>
      </article>
    </Link>
  );
}


