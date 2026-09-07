import type { Metadata } from "next";
import type { Post } from "./posts";
import { REPORT_INSTITUTION, SITE_URL } from "./site";

/**
 * Google Scholar indexing tags. Scholar reads repeated `citation_author`
 * tags, and expects dates as YYYY/MM/DD.
 *
 * See: https://scholar.google.com/intl/en/scholar/inclusion.html
 */
export function citationMeta(post: Post): Record<string, string | string[]> {
  const url = `${SITE_URL}/${post.type}/${post.slug}`;
  const tags: Record<string, string | string[]> = {
    citation_title: post.title,
    citation_author: post.authors,
    citation_publication_date: post.date.replace(/-/g, "/"),
    citation_online_date: post.date.replace(/-/g, "/"),
    citation_abstract_html_url: url,
    citation_public_url: url,
  };

  if (post.publishedIn) {
    tags.citation_journal_title = post.publishedIn;
  } else {
    tags.citation_technical_report_institution = REPORT_INSTITUTION;
  }

  if (post.doi) tags.citation_doi = post.doi;

  return tags;
}

export function postMetadata(post: Post): Metadata {
  return {
    title: `${post.title} | WHPC`,
    description: post.excerpt,
    alternates: {
      canonical: `${SITE_URL}/${post.type}/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: post.authors,
      siteName: "WHPC",
      images: post.image ? [post.image] : undefined,
    },
    other: citationMeta(post),
  };
}
