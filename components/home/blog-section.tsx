/**
 * Blog Section — "床墊知識 / 好眠知識"
 * Matches the blog/knowledge section at the bottom of lunio.com.tw homepage.
 * Fetches latest posts from WordPress REST API.
 */

import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { getPostsPaginated } from "@/lib/wordpress";
import type { Post, EmbeddedFeaturedMedia } from "@/lib/wordpress.d";

function PostCard({ post }: { post: Post }) {
  const featuredImage =
    (post._embedded?.["wp:featuredmedia"]?.[0] as EmbeddedFeaturedMedia)
      ?.source_url;

  const date = new Date(post.date).toLocaleDateString("zh-TW", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link
      href={`/posts/${post.slug}`}
      className="group block bg-white rounded-[8px] overflow-hidden transition-all duration-300 hover:shadow-md"
      style={{ border: "1px solid #E4E4E4" }}
    >
      {/* Image */}
      <div className="relative aspect-video bg-[#F8F8F8] overflow-hidden">
        {featuredImage ? (
          <Image
            src={featuredImage}
            alt={post.title.rendered}
            fill
            className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
            sizes="(max-width: 544px) 100vw, (max-width: 921px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full bg-[#E4E4E4] flex items-center justify-center">
            <span className="text-[#888888]" style={{ fontSize: "12px" }}>
              Lunio Blog
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-[#888888] mb-2" style={{ fontSize: "11px" }}>
          {date}
        </p>
        <h3
          className="font-medium text-[#212020] leading-snug line-clamp-2 group-hover:text-[#3c7ae4] transition-colors"
          style={{ fontSize: "14px" }}
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
      </div>
    </Link>
  );
}

export async function BlogSection() {
  let posts: Post[] = [];
  try {
    const result = await getPostsPaginated(1, 4);
    posts = result.data ?? [];
  } catch {
    return null;
  }
  if (!posts.length) return null;

  return (
    <section className="py-14 md:py-16" style={{ backgroundColor: "#F8F8F8" }}>
      <div className="max-w-[1140px] mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <p
              className="tracking-[5px] uppercase font-medium mb-2"
              style={{ fontSize: "11px", color: "#3c7ae4" }}
            >
              SLEEP KNOWLEDGE · 好眠知識
            </p>
            <h2 className="font-bold text-[#212020]">床墊知識</h2>
            <p
              className="mt-1 text-[#5F6062]"
              style={{ fontSize: "14px" }}
            >
              您的睡眠健康雜誌
            </p>
          </div>
          <Link
            href="/posts"
            className="hidden sm:flex items-center gap-1 font-medium transition-colors hover:opacity-70"
            style={{ fontSize: "13px", color: "#3c7ae4" }}
          >
            查看全部 <ChevronRight size={14} />
          </Link>
        </div>

        {/* Post grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        <div className="text-center mt-6 sm:hidden">
          <Link
            href="/posts"
            className="inline-flex items-center gap-1 font-medium"
            style={{ fontSize: "13px", color: "#3c7ae4" }}
          >
            查看全部文章 <ChevronRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
