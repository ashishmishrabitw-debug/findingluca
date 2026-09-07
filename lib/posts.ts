import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type ReviewStatus = "not-peer-reviewed" | "preprint" | "peer-reviewed";

export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tag: string;
  content: string;
  type: "blog" | "news" | "projects";
  image?: string;
  imagePosition?: string;
  /** Editorial status of this item. Defaults to "not-peer-reviewed". */
  reviewStatus: ReviewStatus;
  authors: string[];
  doi?: string;
  /** Canonical preprint record, e.g. a medRxiv URL. */
  preprintUrl?: string;
  /** Journal name, once a peer-reviewed version exists. */
  publishedIn?: string;
  publishedUrl?: string;
};

const REVIEW_STATUSES: ReviewStatus[] = [
  "not-peer-reviewed",
  "preprint",
  "peer-reviewed",
];

function parseReviewStatus(value: unknown): ReviewStatus {
  return typeof value === "string" &&
    (REVIEW_STATUSES as string[]).includes(value)
    ? (value as ReviewStatus)
    : "not-peer-reviewed";
}

function parseAuthors(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String);
  if (typeof value === "string" && value.trim() !== "") return [value];
  return ["WHPC"];
}

function getPostsFromDir(dir: string, type: "blog" | "news" | "projects"): Post[] {
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
        type,
        image: data.image,
        imagePosition: data.imagePosition,
        reviewStatus: parseReviewStatus(data.reviewStatus),
        authors: parseAuthors(data.authors),
        doi: data.doi,
        preprintUrl: data.preprintUrl,
        publishedIn: data.publishedIn,
        publishedUrl: data.publishedUrl,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getBlogPosts(): Post[] {
  return getPostsFromDir("content/blog", "blog");
}

export function getNewsPosts(): Post[] {
  return getPostsFromDir("content/news", "news");
}

export function getProjectPosts(): Post[] {
  return getPostsFromDir("content/projects", "projects");
}

export function getAllPosts(): Post[] {
  return [...getBlogPosts(), ...getNewsPosts(), ...getProjectPosts()].sort(
    (a, b) => (a.date < b.date ? 1 : -1)
  );
}

export function getPostBySlug(
  type: "blog" | "news" | "projects",
  slug: string
): Post | null {
  const all =
    type === "blog"
      ? getBlogPosts()
      : type === "news"
      ? getNewsPosts()
      : getProjectPosts();
  return all.find((p) => p.slug === slug) ?? null;
}
