import { getNewsPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import Link from "next/link";

export default function NewsPage() {
  const posts = getNewsPosts();

  return (
    <div className="pt-16">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <p className="text-[#00e5ff] text-sm font-medium tracking-[0.2em] uppercase mb-4">
          News
        </p>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
          Lab Updates &amp; Medical News
        </h1>
        <p className="text-[#a0a0a0] text-xl max-w-2xl leading-relaxed mb-16">
          Announcements, breakthroughs, and what&apos;s happening at the
          frontier of medicine. Curated by WHPC.
        </p>

        {posts.length === 0 ? (
          <div className="border border-[#1e1e1e] rounded-2xl p-16 text-center text-[#555]">
            <p className="text-lg mb-2">Updates coming soon</p>
            <p className="text-sm">
              We&apos;ll post lab news and medical breakthroughs here.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <PostCard
                key={post.slug}
                post={post}
                href={`/news/${post.slug}`}
              />
            ))}
          </div>
        )}

        <div className="mt-16 pt-16 border-t border-[#1e1e1e] flex items-center justify-between">
          <p className="text-[#555] text-sm">Want to follow our research?</p>
          <Link
            href="/contact"
            className="text-sm text-[#00e5ff] hover:text-white transition-colors"
          >
            Get in touch →
          </Link>
        </div>
      </div>
    </div>
  );
}
