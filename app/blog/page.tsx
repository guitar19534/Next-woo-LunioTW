import {
  getPostsPaginated, getAllCategories, searchCategories,
} from "@/lib/wordpress";
import Image from "next/image";
import Link from "next/link";
import { stripHtml, truncateText } from "@/lib/metadata";
import { SearchInput } from "@/components/posts/search-input";
import type { Metadata } from "next";
import type { Post } from "@/lib/wordpress.d";

export const metadata: Metadata = {
  title: "好眠知識 | Lunio Taiwan",
  description: "探索睡眠科學、床墊挑選指南、枕頭推薦等好眠知識，讓你每夜睡得更好。",
  alternates: { canonical: "/blog" },
};

export const revalidate = 3600;

const BLUE = "#17569E";
const NAVY = "#17284b";

/* ─── Featured card (first post, full-width hero) ─────────────────────────── */
function FeaturedCard({ post }: { post: Post }) {
  const media   = post._embedded?.["wp:featuredmedia"]?.[0];
  const cat     = post._embedded?.["wp:term"]?.[0]?.[0];
  const excerpt = post.excerpt?.rendered ? truncateText(stripHtml(post.excerpt.rendered), 140) : "";
  const date    = new Date(post.date).toLocaleDateString("zh-TW", { year: "numeric", month: "long", day: "numeric" });

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div className="grid md:grid-cols-2 gap-0 overflow-hidden rounded-2xl"
        style={{ boxShadow: "0 8px 40px rgba(23,40,75,0.10)" }}>
        {/* Image */}
        <div className="relative overflow-hidden" style={{ aspectRatio: "16/10", minHeight: 280 }}>
          {media?.source_url ? (
            <Image src={media.source_url} alt={post.title.rendered} fill
              className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width:768px) 100vw, 50vw" priority />
          ) : (
            <div className="w-full h-full" style={{ backgroundColor: "#e8eef7" }} />
          )}
          {cat && (
            <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold text-white"
              style={{ backgroundColor: BLUE }}>{cat.name}</span>
          )}
        </div>
        {/* Content */}
        <div className="flex flex-col justify-center p-8 md:p-10" style={{ backgroundColor: "#fff" }}>
          <p className="text-xs font-medium mb-3 uppercase tracking-widest" style={{ color: "#9ca3af" }}>{date}</p>
          <h2 className="font-bold leading-tight mb-4 group-hover:text-blue-600 transition-colors"
            style={{ fontSize: "clamp(20px, 2vw, 28px)", color: NAVY }}
            dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
          <p className="mb-6" style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.75 }}>{excerpt}</p>
          <span className="inline-flex items-center gap-1.5 font-semibold text-sm transition-colors"
            style={{ color: BLUE }}>
            閱讀更多 <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ─── Post card ───────────────────────────────────────────────────────────── */
function BlogCard({ post }: { post: Post }) {
  const media   = post._embedded?.["wp:featuredmedia"]?.[0];
  const cat     = post._embedded?.["wp:term"]?.[0]?.[0];
  const excerpt = post.excerpt?.rendered ? truncateText(stripHtml(post.excerpt.rendered), 80) : "";
  const date    = new Date(post.date).toLocaleDateString("zh-TW", { year: "numeric", month: "long", day: "numeric" });

  return (
    <Link href={`/blog/${post.slug}`} className="group flex flex-col overflow-hidden rounded-2xl bg-white transition-all duration-300 hover:-translate-y-1"
      style={{ boxShadow: "0 2px 16px rgba(23,40,75,0.07)" }}>
      <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
        {media?.source_url ? (
          <Image src={media.source_url} alt={post.title.rendered} fill
            className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw" />
        ) : (
          <div className="w-full h-full" style={{ backgroundColor: "#e8eef7" }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <span style={{ fontSize: 32 }}>🌙</span>
            </div>
          </div>
        )}
        {cat && (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold text-white"
            style={{ backgroundColor: BLUE }}>{cat.name}</span>
        )}
      </div>
      <div className="flex flex-col flex-1 p-5">
        <p className="text-xs mb-2 font-medium uppercase tracking-wider" style={{ color: "#9ca3af" }}>{date}</p>
        <h3 className="font-bold mb-2 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2"
          style={{ fontSize: 16, color: NAVY }}
          dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
        <p className="text-sm flex-1 line-clamp-3" style={{ color: "#6b7280", lineHeight: 1.7 }}>{excerpt}</p>
        <div className="mt-4 pt-4" style={{ borderTop: "1px solid #f3f4f6" }}>
          <span className="text-xs font-semibold transition-colors" style={{ color: BLUE }}>閱讀更多 →</span>
        </div>
      </div>
    </Link>
  );
}

/* ─── Pagination ──────────────────────────────────────────────────────────── */
function Pagination({ page, totalPages, buildUrl }: { page: number; totalPages: number; buildUrl: (p: number) => string }) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter((n) => n === 1 || n === totalPages || Math.abs(n - page) <= 1);

  return (
    <div className="flex items-center justify-center gap-2 py-10">
      {page > 1 && (
        <Link href={buildUrl(page - 1)}
          className="px-4 py-2 rounded-full text-sm font-medium transition-colors hover:bg-blue-50"
          style={{ color: BLUE, border: `1px solid ${BLUE}` }}>← 上一頁</Link>
      )}
      {pages.map((n, idx, arr) => (
        <span key={n} className="flex items-center gap-2">
          {idx > 0 && n - arr[idx - 1] > 1 && <span className="text-gray-400">…</span>}
          <Link href={buildUrl(n)}
            className="w-10 h-10 flex items-center justify-center rounded-full text-sm font-semibold transition-colors"
            style={n === page
              ? { backgroundColor: BLUE, color: "#fff" }
              : { color: NAVY, backgroundColor: "#f3f4f6" }}>
            {n}
          </Link>
        </span>
      ))}
      {page < totalPages && (
        <Link href={buildUrl(page + 1)}
          className="px-4 py-2 rounded-full text-sm font-medium transition-colors hover:bg-blue-50"
          style={{ color: BLUE, border: `1px solid ${BLUE}` }}>下一頁 →</Link>
      )}
    </div>
  );
}

/* ─── Page ────────────────────────────────────────────────────────────────── */
export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string; search?: string; tag?: string; author?: string }>;
}) {
  const params   = await searchParams;
  const { category, page: pageParam, search, tag, author } = params;
  const page     = pageParam ? parseInt(pageParam, 10) : 1;

  const [postsResponse, categories] = await Promise.all([
    getPostsPaginated(page, 9, { category, search, tag, author }),
    search ? searchCategories(search) : getAllCategories(),
  ]);

  const { data: posts, headers } = postsResponse;
  const { total, totalPages } = headers;

  const buildUrl = (p: number) => {
    const q = new URLSearchParams();
    if (p > 1) q.set("page", String(p));
    if (category) q.set("category", category);
    if (search) q.set("search", search);
    if (tag) q.set("tag", tag);
    if (author) q.set("author", author);
    return `/blog${q.toString() ? `?${q}` : ""}`;
  };

  const [featured, ...rest] = posts;

  return (
    <main style={{ fontFamily: "'MiSansTC','Noto Sans TC',sans-serif", backgroundColor: "#f8faff", minHeight: "100vh" }}>

      {/* ── Hero header ─────────────────────────────────────────── */}
      <section className="py-14 md:py-20" style={{ backgroundColor: NAVY }}>
        <div className="max-w-[1200px] w-[88%] mx-auto text-center">
          <p className="font-semibold mb-2 uppercase tracking-widest" style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>Lunio Blog</p>
          <h1 className="font-bold mb-4" style={{ fontSize: "clamp(32px, 5vw, 56px)", color: "#fff" }}>好眠知識</h1>
          <p className="mb-8" style={{ fontSize: "clamp(14px, 1.3vw, 17px)", color: "rgba(255,255,255,0.6)", maxWidth: 560, margin: "0 auto 2rem" }}>
            探索睡眠科學、床墊挑選指南、枕頭推薦，讓你每一夜睡得更好
          </p>
          <div className="max-w-[480px] mx-auto">
            <SearchInput defaultValue={search} />
          </div>
        </div>
      </section>

      {/* ── Category pills ──────────────────────────────────────── */}
      {categories.length > 0 && (
        <section className="py-5 bg-white" style={{ borderBottom: "1px solid #f0f4fb" }}>
          <div className="max-w-[1200px] w-[88%] mx-auto">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
              <Link href="/blog"
                className="flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors"
                style={!category
                  ? { backgroundColor: BLUE, color: "#fff" }
                  : { backgroundColor: "#f3f4f6", color: NAVY }}>
                全部
              </Link>
              {categories.map((cat) => (
                <Link key={cat.id} href={`/blog?category=${cat.id}`}
                  className="flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors"
                  style={category === String(cat.id)
                    ? { backgroundColor: BLUE, color: "#fff" }
                    : { backgroundColor: "#f3f4f6", color: NAVY }}>
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="max-w-[1200px] w-[88%] mx-auto py-12 space-y-12">

        {/* Result count */}
        {search && (
          <p style={{ color: "#6b7280", fontSize: 14 }}>
            搜尋「{search}」共找到 <strong>{total}</strong> 篇文章
          </p>
        )}

        {posts.length === 0 && (
          <div className="text-center py-20">
            <p style={{ fontSize: 48 }}>🔍</p>
            <p className="mt-4 font-semibold" style={{ color: NAVY, fontSize: 18 }}>找不到相關文章</p>
            <Link href="/blog" className="mt-4 inline-block text-sm" style={{ color: BLUE }}>← 查看全部文章</Link>
          </div>
        )}

        {/* Featured post */}
        {featured && page === 1 && !search && !category && !tag && !author && (
          <div>
            <p className="font-semibold mb-4 uppercase tracking-widest" style={{ fontSize: 11, color: "#9ca3af" }}>最新文章</p>
            <FeaturedCard post={featured} />
          </div>
        )}

        {/* Post grid */}
        {rest.length > 0 && (
          <div>
            {featured && page === 1 && !search && !category && (
              <p className="font-semibold mb-6 uppercase tracking-widest" style={{ fontSize: 11, color: "#9ca3af" }}>更多文章</p>
            )}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(page === 1 && !search && !category && !tag && !author ? rest : posts).map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        )}

        <Pagination page={page} totalPages={totalPages} buildUrl={buildUrl} />

      </div>
    </main>
  );
}
