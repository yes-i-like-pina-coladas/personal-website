import { Link } from 'react-router-dom';
import type { Post } from '@/lib/content';

export default function BlogPostCard({ post }: { post: Post }) {
  const accentColor = post.accent || '#F97316';

  return (
    <Link to={`/blog/${post.slug}`} className="block group relative overflow-visible">
      {/* Glow effect */}
      <div 
        className="absolute -inset-4 sm:-inset-6 bg-orange-500/30 opacity-0 group-hover:opacity-100 rounded-[24px] sm:rounded-[32px] pointer-events-none transition-all duration-500"
        style={{
          filter: 'blur(50px)',
          willChange: 'transform, opacity, filter',
          transform: 'translate3d(0, 0, 0)',
          backfaceVisibility: 'hidden',
        }}
      />
      <article className="relative overflow-hidden rounded-2xl border border-stone-200/60 bg-white transition-all duration-300 hover:shadow-lg hover:shadow-stone-200/50 hover:-translate-y-1 z-10">
        {post.image && (
          <div className="relative aspect-[16/9] overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>
        )}
        {!post.image && (
          <div
            className="relative aspect-[16/9] overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${accentColor}18 0%, ${accentColor}08 50%, transparent 100%)`,
            }}
          >
            <div
              className="absolute -top-12 -right-12 w-40 h-40 rounded-full opacity-20"
              style={{ background: accentColor }}
            />
          </div>
        )}
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-2 text-xs text-stone-400 mb-3">
            <time>{new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</time>
            {post.readingTimeMinutes && (
              <>
                <span className="w-1 h-1 rounded-full bg-stone-300" />
                <span>{post.readingTimeMinutes} min read</span>
              </>
            )}
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-stone-900 leading-snug mb-2 group-hover:text-orange-600 transition-colors duration-200">
            {post.title}
          </h2>
          {post.description && (
            <p className="text-sm text-stone-500 leading-relaxed line-clamp-2 mb-4">
              {post.description}
            </p>
          )}
          {post.tags?.length ? (
            <div className="flex flex-wrap gap-1.5">
              {post.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="px-2 py-0.5 text-[11px] font-medium rounded-full bg-stone-100 text-stone-500">
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </article>
      {/* Decorative hover shapes */}
      <div className="absolute -top-3 -right-3 w-10 h-10 sm:w-14 sm:h-14 rounded-full ring-[3px] ring-orange-500 opacity-0 scale-50 group-hover:opacity-80 group-hover:scale-100 transition-all duration-500 delay-75 pointer-events-none z-20" />
      <div className="absolute -bottom-2 -left-2 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-orange-500/40 opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 delay-150 pointer-events-none z-20" />
      <div className="absolute top-1/2 -left-4 w-4 h-4 sm:w-5 sm:h-5 rounded-md ring-[2px] ring-orange-500/70 rotate-45 opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-80 transition-all duration-500 delay-200 pointer-events-none z-20" />
    </Link>
  );
}


