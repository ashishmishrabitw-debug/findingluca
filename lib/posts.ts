import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tag: string;
  content: string;
};

function getPostsFromDir(dir: string): Post[] {
  const fullDir = path.join(process.cwd(), dir);
  if (!fs.existsSync(fullDir)) return [];

  const files = fs.readdirSync(fullDir).filter((f) => f.endsWith(".md"));

  return files
    .map((filename) => {
      const slug = filename.replace(".md", "");
      const raw = fs.readFileSync(path.join(fullDir, filename), "utf-8");
      const { data, content } = matter(raw);
      return {
        slug,
        title: data.title ?? "Untitled",
        date: data.date ?? "",
        excerpt: data.excerpt ?? "",
        tag: data.tag ?? "Post",
        content,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getBlogPosts(): Post[] {
  return getPostsFromDir("content/blog");
}

export function getNewsPosts(): Post[] {
  return getPostsFromDir("content/news");
}

export function getPostBySlug(type: "blog" | "news", slug: string): Post | null {
  const all = type === "blog" ? getBlogPosts() : getNewsPosts();
  return all.find((p) => p.slug === slug) ?? null;
}
