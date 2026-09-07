import type { Post } from "@/lib/posts";
import { SITE_URL } from "@/lib/site";
import ReviewStatusBadge from "./ReviewStatusBadge";

const STATUS_NOTE: Record<Post["reviewStatus"], string> = {
  "not-peer-reviewed":
    "This is self-published work from WHPC. It has not been peer reviewed, and no external reviewer has checked its methods, data, or conclusions. Read it as a working document rather than as settled evidence.",
  preprint:
    "This is a preprint. It has been posted publicly so it can be read and cited, but it has not yet been peer reviewed. Its conclusions may change before any final version appears.",
  "peer-reviewed":
    "A peer-reviewed version of this work has been published. Where the two differ, the published version is authoritative.",
};

function formatCitation(post: Post): string {
  const year = post.date.slice(0, 4);
  const authors = post.authors.join(", ");
  const where = post.publishedIn
    ? post.publishedIn
    : "WHPC Working Papers";
  const locator = post.doi
    ? ` https://doi.org/${post.doi}`
    : ` ${SITE_URL}/${post.type}/${post.slug}`;
  return `${authors} (${year}). ${post.title}. ${where}.${locator}`;
}

export default function CitationBlock({ post }: { post: Post }) {
  return (
    <section
      aria-labelledby={`publishing-status-${post.slug}`}
      className="mt-16 rounded-2xl border border-[#1e1e1e] bg-[#111] p-8"
    >
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <h2
          id={`publishing-status-${post.slug}`}
          className="text-xs font-medium uppercase tracking-widest text-[#a0a0a0]"
        >
          Publishing status
        </h2>
        <ReviewStatusBadge status={post.reviewStatus} />
      </div>

      <p className="text-sm leading-relaxed text-[#a0a0a0]">
        {STATUS_NOTE[post.reviewStatus]}{" "}
        <a
          href="/publishing"
          className="text-[#00e5ff] hover:underline"
        >
          How we publish →
        </a>
      </p>

      {(post.preprintUrl || post.publishedUrl || post.doi) && (
        <dl className="mt-6 grid gap-3 border-t border-[#1e1e1e] pt-6 text-sm sm:grid-cols-[8rem_1fr]">
          {post.preprintUrl && (
            <>
              <dt className="text-[#555]">Preprint</dt>
              <dd>
                <a
                  href={post.preprintUrl}
                  className="text-[#00e5ff] hover:underline break-all"
                >
                  {post.preprintUrl}
                </a>
              </dd>
            </>
          )}
          {post.publishedUrl && (
            <>
              <dt className="text-[#555]">Published in</dt>
              <dd>
                <a
                  href={post.publishedUrl}
                  className="text-[#00e5ff] hover:underline"
                >
                  {post.publishedIn ?? post.publishedUrl}
                </a>
              </dd>
            </>
          )}
          {post.doi && (
            <>
              <dt className="text-[#555]">DOI</dt>
              <dd>
                <a
                  href={`https://doi.org/${post.doi}`}
                  className="text-[#00e5ff] hover:underline break-all"
                >
                  {post.doi}
                </a>
              </dd>
            </>
          )}
        </dl>
      )}

      <div className="mt-6 border-t border-[#1e1e1e] pt-6">
        <p className="mb-3 text-xs uppercase tracking-widest text-[#555]">
          Cite as
        </p>
        <p className="rounded-lg bg-[#0a0a0a] p-4 font-mono text-xs leading-relaxed text-[#a0a0a0] break-words">
          {formatCitation(post)}
        </p>
      </div>
    </section>
  );
}
