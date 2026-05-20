import { getNewsPosts, getPostBySlug } from "@/lib/posts";
import { notFound } from "next/navigation";
import Link from "next/link";
import { remark } from "remark";
import remarkHtml from "remark-html";

export async function generateStaticParams() {
  const posts = getNewsPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function NewsPostPage(props: Props) {
  const { slug } = await props.params;
  const post = getPostBySlug("news", slug);
  if (!post) notFound();

  const processed = await remark().use(remarkHtml).process(post.content);
  const html = processed.toString();

  return (
    <div className="pt-16">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <Link
          href="/news"
          className="text-sm text-[#a0a0a0] hover:text-[#00e5ff] transition-colors mb-12 block"
        >
          ← Back to News
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs text-[#00e5ff] font-medium tracking-widest uppercase">
            {post.tag}
          </span>
          <span className="text-[#333]">·</span>
          <span className="text-xs text-[#555]">{post.date}</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8 leading-tight">
          {post.title}
        </h1>

        <p className="text-[#a0a0a0] text-xl leading-relaxed mb-12 border-b border-[#1e1e1e] pb-12">
          {post.excerpt}
        </p>

        <div
          className="prose prose-invert prose-lg max-w-none
            prose-headings:font-bold prose-headings:text-white
            prose-p:text-[#a0a0a0] prose-p:leading-relaxed
            prose-a:text-[#00e5ff] prose-a:no-underline hover:prose-a:underline
            prose-strong:text-white
            prose-li:text-[#a0a0a0]
            prose-hr:border-[#1e1e1e]"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <div className="mt-16 pt-12 border-t border-[#1e1e1e] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <Link
            href="/news"
            className="text-sm text-[#a0a0a0] hover:text-white transition-colors"
          >
            ← All news
          </Link>
          <Link
            href="/contact"
            className="text-sm px-6 py-2.5 bg-[#00e5ff] text-black font-semibold rounded-full hover:bg-[#00b8cc] transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
}
