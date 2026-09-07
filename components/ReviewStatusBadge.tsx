import type { ReviewStatus } from "@/lib/posts";

const STYLES: Record<
  ReviewStatus,
  { label: string; className: string; dot: string }
> = {
  "not-peer-reviewed": {
    label: "Not peer reviewed",
    className: "border-[#f59e0b]/30 bg-[#f59e0b]/10 text-[#f59e0b]",
    dot: "bg-[#f59e0b]",
  },
  preprint: {
    label: "Preprint · not peer reviewed",
    className: "border-[#f59e0b]/30 bg-[#f59e0b]/10 text-[#f59e0b]",
    dot: "bg-[#f59e0b]",
  },
  "peer-reviewed": {
    label: "Peer reviewed",
    className: "border-[#22c55e]/30 bg-[#22c55e]/10 text-[#22c55e]",
    dot: "bg-[#22c55e]",
  },
};

type Props = {
  status: ReviewStatus;
  /** Compact variant for listing cards. */
  small?: boolean;
};

export default function ReviewStatusBadge({ status, small = false }: Props) {
  const style = STYLES[status];

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border font-medium ${
        style.className
      } ${small ? "px-2.5 py-0.5 text-[10px]" : "px-3 py-1 text-xs"}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} aria-hidden />
      {style.label}
    </span>
  );
}
