import Link from "next/link";
import type { Post } from "@/lib/posts";

type Props = {
  post: Post;
  href: string;
};

export default function PostCard({ post, href }: Props) {
  return (
    <Link
      href={href}
      className="group block border border-[#1e1e1e] rounded-2xl p-8 bg-[#111] hover:border-[#00e5ff]/30 transition-colors"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-[#00e5ff] font-medium tracking-widest uppercase">
          {post.tag}
        </span>
        <span className="text-xs text-[#555]">{post.date}</span>
      </div>
      <h3 className="text-xl font-semibold mb-3 group-hover:text-[#00e5ff] transition-colors leading-snug">
        {post.title}
      </h3>
      <p className="text-[#a0a0a0] text-sm leading-relaxed">{post.excerpt}</p>
      <p className="text-[#00e5ff]/60 text-sm mt-6 group-hover:text-[#00e5ff] transition-colors">
        Read more →
      </p>
    </Link>
  );
}
