import Image from "next/image";

/** Shown while a page is still on its way: the WHPC heart, beating. */
export default function Loading() {
  return (
    <div
      role="status"
      className="pt-16 min-h-[70vh] flex items-center justify-center"
    >
      <Image
        src="/whpc-heart.png"
        alt=""
        width={76}
        height={76}
        priority
        className="whpc-heartbeat-loader h-14 w-14 object-contain"
      />
      <span className="sr-only">Loading</span>
    </div>
  );
}
