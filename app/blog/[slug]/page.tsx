import { getPostBySlug, getAllPostSlugs, getPostsPaginated } from "@/lib/wordpress";
import { generateContentMetadata, stripHtml } from "@/lib/metadata";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { SidebarStoreCarousel } from "@/components/blog/SidebarStoreCarousel";
import type { Metadata } from "next";
import type { Post } from "@/lib/wordpress.d";

export async function generateStaticParams() {
  return await getAllPostSlugs();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return generateContentMetadata({ title: post.title.rendered, excerpt: post.excerpt.rendered, slug, type: "post" });
}

const BLUE = "#17569E";
const NAVY = "#17284b";
const ORANGE = "#F5A000";

/* ─── Extract headings from HTML for ToC ─────────────────────────────────── */
function extractHeadings(html: string) {
  const matches = [...html.matchAll(/<h([234])[^>]*\sid="([^"]+)"[^>]*>(.*?)<\/h[234]>/gi)];
  return matches.map(([, level, id, text]) => ({
    level: parseInt(level),
    id,
    text: stripHtml(text),
  }));
}

/* ─── Sidebar — recent posts ─────────────────────────────────────────────── */
function RecentPostCard({ post }: { post: Post }) {
  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  const date  = new Date(post.date).toLocaleDateString("zh-TW", { year: "numeric", month: "2-digit", day: "2-digit" });
  return (
    <Link href={`/blog/${post.slug}`} className="flex gap-3 group py-2.5 border-b last:border-0" style={{ borderColor: "#f3f4f6" }}>
      <div className="flex-shrink-0 relative overflow-hidden rounded-lg" style={{ width: 64, height: 64 }}>
        {media?.source_url
          ? <Image src={media.source_url} alt={post.title.rendered} fill className="object-cover" sizes="64px" />
          : <div className="w-full h-full" style={{ backgroundColor: "#e8eef7" }} />}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs mb-1" style={{ color: "#9ca3af" }}>{date}</p>
        <p className="text-sm font-medium leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors"
          style={{ color: NAVY }}
          dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
      </div>
    </Link>
  );
}


/* ─── Sidebar — brand ────────────────────────────────────────────────────── */
function SidebarBrand() {
  return (
    <div className="rounded-2xl p-6 text-white" style={{ backgroundColor: NAVY }}>
      <div className="flex items-center gap-3 mb-4">
        <Image src="/brand/logo.svg" alt="Lunio" width={80} height={28} className="object-contain brightness-0 invert" />
      </div>
      <p className="font-bold mb-2" style={{ fontSize: 13 }}>Lunio 泰國高品質乳膠床墊品牌</p>
      <p style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", lineHeight: 1.8 }}>
        深知消費者對睡眠品質的重視，相信一覺好眠能解決健康與壓力問題。研發具有服貼支撐、防蟎抗菌、吸震抗噪、自然透氣等優良特性的機能床墊。
      </p>
      <p className="mt-3 text-right font-medium" style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>
        Lunio — 睡眠問題解決專家
      </p>
    </div>
  );
}

/* ─── Monthly promotions ─────────────────────────────────────────────────── */
const PROMO_LINKS = [
  { label: "Gen4 乳膠床墊贈天絲床包+保潔墊", href: "/product/lunio-latex-mattress" },
  { label: "Quantum 乳膠獨立筒床墊現折$8000起", href: "/product/lunio-quantum" },
  { label: "Nooz 系列床墊超值預購中", href: "/product/nooz-helix" },
  { label: "Mercury石墨烯機能記憶枕 新品優惠中", href: "/product/lunio-mercury" },
  { label: "天然乳膠枕全面 9 折", href: "/product/pillows" },
  { label: "天絲床包組全面 9 折", href: "/product/tencel-bedsheet" },
  { label: "防水保潔墊全面 9 折", href: "/product/lunio-protector" },
];

function SidebarPromo() {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #e5eaf5" }}>
      <div className="px-4 py-3" style={{ backgroundColor: "#f8faff", borderBottom: "1px solid #e5eaf5" }}>
        <p className="font-bold" style={{ fontSize: 14, color: NAVY }}>當月活動</p>
      </div>
      <div className="p-4 space-y-1">
        {PROMO_LINKS.map((p) => (
          <Link key={p.href} href={p.href}
            className="flex items-start gap-2 py-1.5 text-sm hover:underline transition-colors"
            style={{ color: BLUE, fontSize: 13, lineHeight: 1.6 }}>
            <span className="flex-shrink-0 mt-0.5">🏷️</span>
            {p.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ─── Page ────────────────────────────────────────────────────────────────── */
export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [post, recentResponse] = await Promise.all([
    getPostBySlug(slug),
    getPostsPaginated(1, 5),
  ]);
  if (!post) notFound();

  const media    = post._embedded?.["wp:featuredmedia"]?.[0];
  const author   = post._embedded?.author?.[0];
  const category = post._embedded?.["wp:term"]?.[0]?.[0];
  const headings = extractHeadings(post.content.rendered);

  const date = new Date(post.date).toLocaleDateString("zh-TW", {
    year: "numeric", month: "2-digit", day: "2-digit",
  }).replace(/\//g, "-");

  const recentPosts = recentResponse.data.filter((p) => p.slug !== slug).slice(0, 5);

  return (
    <main style={{ fontFamily: "'MiSansTC','Noto Sans TC',sans-serif", backgroundColor: "#f8faff", minHeight: "100vh", overflowX: "hidden" }}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-14">
        <div className="grid lg:grid-cols-[1fr_320px] gap-8 lg:gap-10">

          {/* ── Article column ──────────────────────────────────── */}
          <article style={{ minWidth: 0, overflow: "hidden" }}>
            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-xs mb-4 flex-wrap" style={{ color: "#9ca3af" }}>
              <Link href="/blog" className="hover:underline shrink-0" style={{ color: BLUE }}>好眠知識</Link>
              {category && <>
                <span className="shrink-0">›</span>
                <Link href={`/blog?category=${category.id}`} className="hover:underline" style={{ color: BLUE }}>{category.name}</Link>
              </>}
            </div>

            {/* Title */}
            <h1 className="font-bold leading-tight mb-4"
              style={{ fontSize: "clamp(20px, 3vw, 34px)", color: NAVY, overflowWrap: "break-word", wordBreak: "break-word" }}
              dangerouslySetInnerHTML={{ __html: post.title.rendered }} />

            {/* Meta */}
            <div className="flex items-center gap-3 mb-5 flex-wrap" style={{ fontSize: 12, color: "#6b7280" }}>
              <span className="flex items-center gap-1">📅 {date}</span>
              {author?.name && <span className="flex items-center gap-1">✍ {author.name}</span>}
            </div>

            {/* Featured image */}
            {media?.source_url && (
              <div className="relative overflow-hidden rounded-2xl mb-8" style={{ aspectRatio: "16/9" }}>
                <Image src={media.source_url} alt={post.title.rendered} fill
                  className="object-cover" sizes="(max-width:1024px) 100vw, 800px" priority />
              </div>
            )}

            {/* Excerpt */}
            {post.excerpt?.rendered && (
              <p className="mb-6 rounded-xl px-5 py-4" style={{ fontSize: 14, color: "#555", lineHeight: 1.85, backgroundColor: "#f0f4fb", borderLeft: `3px solid ${BLUE}` }}>
                {stripHtml(post.excerpt.rendered)}
              </p>
            )}

            {/* Table of Contents */}
            {headings.length > 0 && <TableOfContents headings={headings} />}

            {/* Article content */}
            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            />

            {/* Back / tag bar */}
            <div className="mt-10 pt-8 flex items-center justify-between flex-wrap gap-4"
              style={{ borderTop: "1px solid #e5eaf5" }}>
              <Link href="/blog"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm transition-colors hover:bg-blue-50"
                style={{ border: `1px solid ${BLUE}`, color: BLUE }}>
                ← 回到好眠知識
              </Link>
              {category && (
                <Link href={`/blog?category=${category.id}`}
                  className="px-4 py-2 rounded-full text-sm font-semibold text-white"
                  style={{ backgroundColor: BLUE }}>
                  更多「{category.name}」文章
                </Link>
              )}
            </div>
          </article>

          {/* ── Sidebar ─────────────────────────────────────────── */}
          <aside className="space-y-6 lg:space-y-8">

            {/* Ad banner */}
            <Link href="/product/lunio-latex-mattress" className="block rounded-2xl overflow-hidden group">
              <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <Image src="/gen4/Lunio-Gen4-Pro_26-1.webp" alt="Lunio Gen4 石墨烯乳膠床墊" fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="320px" />
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-6"
                  style={{ background: "linear-gradient(to top, rgba(23,40,75,0.85) 0%, transparent 60%)" }}>
                  <p className="font-bold text-white text-center" style={{ fontSize: 15 }}>Lunio Gen4 石墨烯乳膠床墊</p>
                  <p style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>怕熱、淺眠、腰酸背痛者推薦</p>
                </div>
              </div>
            </Link>

            {/* Recent posts */}
            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #e5eaf5", backgroundColor: "#fff" }}>
              <div className="px-4 py-3 flex items-center gap-2" style={{ backgroundColor: "#f8faff", borderBottom: "1px solid #e5eaf5" }}>
                <span style={{ width: 3, height: 16, backgroundColor: BLUE, display: "inline-block", borderRadius: 2 }} />
                <p className="font-bold" style={{ fontSize: 14, color: NAVY }}>近期文章</p>
              </div>
              <div className="px-4 py-2 divide-y" style={{ borderColor: "#f3f4f6" }}>
                {recentPosts.map((p) => <RecentPostCard key={p.id} post={p} />)}
              </div>
            </div>

            {/* Monthly promo */}
            <SidebarPromo />

            {/* Store carousel */}
            <SidebarStoreCarousel />

            {/* Brand */}
            <SidebarBrand />

          </aside>

        </div>
      </div>

      {/* Article content styles */}
      <style>{`
        .blog-content { word-break: break-word; overflow-wrap: break-word; }
        .blog-content h2 { font-size: clamp(17px, 2vw, 22px); font-weight: 700; color: ${BLUE}; margin: 2em 0 0.75em; line-height: 1.4; }
        .blog-content h3 { font-size: clamp(15px, 1.5vw, 18px); font-weight: 600; color: ${NAVY}; margin: 1.5em 0 0.5em; line-height: 1.4; }
        .blog-content h4 { font-size: 15px; font-weight: 600; color: ${NAVY}; margin: 1.2em 0 0.4em; }
        .blog-content p  { font-size: clamp(14px, 1.1vw, 15px); line-height: 1.9; color: #374151; margin-bottom: 1.2em; }
        .blog-content a  { color: ${BLUE}; text-decoration: underline; word-break: break-all; }
        .blog-content ul, .blog-content ol { padding-left: 1.4em; margin-bottom: 1.2em; }
        .blog-content li { font-size: clamp(14px, 1.1vw, 15px); line-height: 1.85; color: #374151; margin-bottom: 0.3em; }
        .blog-content img { border-radius: 12px; width: 100%; height: auto; margin: 1.5em 0; display: block; }
        .blog-content figure { margin: 1.5em 0; }
        .blog-content figure img { margin: 0; }
        .blog-content .wp-block-table, .blog-content table { width: 100%; margin: 1.5em 0; }
        .blog-content .wp-block-table { overflow-x: auto; -webkit-overflow-scrolling: touch; display: block; }
        .blog-content table { border-collapse: collapse; font-size: 14px; min-width: 400px; }
        .blog-content th, .blog-content td { border: 1px solid #e5eaf5; padding: 8px 12px; text-align: left; }
        .blog-content th { background: #f0f4fb; font-weight: 600; color: ${NAVY}; }
        .blog-content blockquote { border-left: 3px solid ${BLUE}; background: #f0f4fb; padding: 12px 16px; margin: 1.5em 0; border-radius: 0 12px 12px 0; }
        .blog-content strong { color: ${NAVY}; font-weight: 700; }
        .blog-content pre, .blog-content code { overflow-x: auto; max-width: 100%; white-space: pre-wrap; }
        .blog-content iframe { max-width: 100%; }
        @media (max-width: 640px) {
          .blog-content h2 { font-size: 17px; margin: 1.5em 0 0.6em; }
          .blog-content h3 { font-size: 15px; }
          .blog-content p, .blog-content li { font-size: 14px; line-height: 1.85; }
        }
      `}</style>
    </main>
  );
}
