import type { Metadata } from "next";
import Link from "next/link";
import ReviewStatusBadge from "@/components/ReviewStatusBadge";

export const metadata: Metadata = {
  title: "How We Publish | WHPC",
  description:
    "What WHPC publishes, what has and has not been peer reviewed, and how to read and cite work on this site.",
};

export default function PublishingPage() {
  return (
    <div className="pt-16">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <p className="text-xs text-[#00e5ff] font-medium tracking-[0.3em] uppercase mb-6">
          Publishing
        </p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8 leading-tight">
          How We Publish
        </h1>
        <p className="text-[#a0a0a0] text-xl leading-relaxed mb-12 border-b border-[#1e1e1e] pb-12">
          WHPC self-publishes its own work. Almost nothing on this site has been
          peer reviewed, and we label every item so you never have to guess.
        </p>

        <div className="space-y-14 text-[#a0a0a0] leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-white mb-5">
              The short version
            </h2>
            <p>
              Everything published here is written by the lab itself. It has not
              been through external peer review unless a badge on the item says
              otherwise. That does not make it careless — but it does mean no
              independent expert has checked the methods, the data, or the
              conclusions before you read them. Treat it as a working document.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-5">
              What the labels mean
            </h2>
            <p className="mb-6">
              Every article, project, and news item carries one of these:
            </p>
            <dl className="space-y-6">
              <div className="rounded-2xl border border-[#1e1e1e] bg-[#111] p-6">
                <dt className="mb-3">
                  <ReviewStatusBadge status="not-peer-reviewed" />
                </dt>
                <dd className="text-sm">
                  Self-published by WHPC. No external review. This covers our
                  essays, commentary, and early-stage project write-ups. Most of
                  the site is this.
                </dd>
              </div>
              <div className="rounded-2xl border border-[#1e1e1e] bg-[#111] p-6">
                <dt className="mb-3">
                  <ReviewStatusBadge status="preprint" />
                </dt>
                <dd className="text-sm">
                  A research manuscript posted publicly before peer review, with
                  a permanent record on a recognised preprint server. Citable,
                  but provisional — the conclusions may change.
                </dd>
              </div>
              <div className="rounded-2xl border border-[#1e1e1e] bg-[#111] p-6">
                <dt className="mb-3">
                  <ReviewStatusBadge status="peer-reviewed" />
                </dt>
                <dd className="text-sm">
                  A peer-reviewed version has been published in a journal. The
                  item here links to it. Where the two differ, the published
                  version is authoritative.
                </dd>
              </div>
            </dl>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-5">
              We are not a journal
            </h2>
            <p className="mb-4">
              WHPC does not publish other people&apos;s research, does not run
              peer review, and does not charge anyone to appear on this site. We
              publish our own work and label it honestly.
            </p>
            <p>
              If that changes, it will not change quietly. A journal needs an
              editorial board independent of the lab and a real review process,
              and we would announce both before publishing a single outside
              submission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-5">
              Citing work from this site
            </h2>
            <p className="mb-4">
              Every item carries a citation line and, where one exists, a DOI
              and a link to the preprint or published version. Please cite the
              most authoritative version available: the journal article if there
              is one, otherwise the preprint, otherwise the page here.
            </p>
            <p>
              If you cite an unreviewed item, say so. That is the whole point of
              labelling it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-5">
              Corrections
            </h2>
            <p>
              If something here is wrong, we want to know and we will fix it in
              the open — with a note saying what changed and when, not a silent
              edit.{" "}
              <Link href="/contact" className="text-[#00e5ff] hover:underline">
                Tell us what we got wrong
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-5">
              This is not medical advice
            </h2>
            <p>
              Nothing on this site is medical advice, diagnosis, or treatment
              guidance, and none of it should be used to make a decision about
              your own health or anyone else&apos;s. Talk to a qualified
              clinician.
            </p>
          </section>
        </div>

        <div className="mt-16 pt-12 border-t border-[#1e1e1e]">
          <Link
            href="/projects"
            className="text-sm text-[#a0a0a0] hover:text-white transition-colors"
          >
            ← Back to projects
          </Link>
        </div>
      </div>
    </div>
  );
}
