import { getBlogPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import Link from "next/link";

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <div className="pt-16">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <p className="text-[#00e5ff] text-sm font-medium tracking-[0.2em] uppercase mb-4">
          Blog
        </p>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
          From the Lab
        </h1>
        <p className="text-[#a0a0a0] text-xl max-w-2xl leading-relaxed mb-16">
          Essays, ideas, and thinking from Finding Luca. We write about
          science, medicine, and what it means to pursue hard problems.
        </p>

        {posts.length === 0 ? (
          <div className="border border-[#1e1e1e] rounded-2xl p-16 text-center text-[#555]">
            <p className="text-lg mb-2">Posts coming soon</p>
            <p className="text-sm">
              Follow along as we share our thinking and findings.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <PostCard
                key={post.slug}
                post={post}
                href={`/blog/${post.slug}`}
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
