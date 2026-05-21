import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#1e1e1e] mt-24">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="font-bold text-white">Finding Luca</p>
          <p className="text-[#a0a0a0] text-sm mt-1">
            Building the Future of Medicine
          </p>
        </div>

        <div className="flex gap-8 text-sm text-[#a0a0a0]">
          <Link href="/frontiers" className="hover:text-white transition-colors">
            Frontiers
          </Link>
          <Link href="/projects" className="hover:text-white transition-colors">
            Projects
          </Link>
          <Link href="/blog" className="hover:text-white transition-colors">
            Blog
          </Link>
          <Link href="/news" className="hover:text-white transition-colors">
            News
          </Link>
          <Link href="/contact" className="hover:text-white transition-colors">
            Contact
          </Link>
        </div>

        <p className="text-[#a0a0a0] text-sm">
          © {new Date().getFullYear()} Finding Luca
        </p>
      </div>
    </footer>
  );
}
