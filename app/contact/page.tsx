export default function ContactPage() {
  return (
    <div className="pt-16">
      <div className="max-w-4xl mx-auto px-6 py-20">
        {/* Header */}
        <p className="text-[#00e5ff] text-sm font-medium tracking-[0.2em] uppercase mb-4">
          Contact
        </p>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
          Let&apos;s Talk
        </h1>
        <p className="text-[#a0a0a0] text-xl max-w-2xl leading-relaxed mb-20">
          Whether you&apos;re a researcher, a student, a collaborator, or just
          deeply curious about the future of medicine — we want to hear from
          you.
        </p>

        {/* Contact card */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="border border-[#1e1e1e] rounded-2xl p-10 bg-[#111]">
            <div className="text-2xl text-[#00e5ff] mb-6">✉</div>
            <h2 className="text-xl font-semibold mb-3">Send an Email</h2>
            <p className="text-[#a0a0a0] text-sm leading-relaxed mb-6">
              The best way to reach us. Whether it&apos;s a question, a
              collaboration idea, or just a hello — we read everything.
            </p>
            <a
              href="mailto:ashishmishrabitw@gmail.com"
              className="text-[#00e5ff] text-sm font-medium hover:underline"
            >
              ashishmishrabitw@gmail.com
            </a>
          </div>

          <div className="border border-[#1e1e1e] rounded-2xl p-10 bg-[#111]">
            <div className="text-2xl text-[#00e5ff] mb-6">◈</div>
            <h2 className="text-xl font-semibold mb-3">Join the Lab</h2>
            <p className="text-[#a0a0a0] text-sm leading-relaxed mb-6">
              We&apos;re always open to bringing on curious, driven people.
              Tell us what you&apos;re working on, what you&apos;re excited
              about, and why you want to be part of WHPC.
            </p>
            <a
              href="mailto:join@findingluca.com"
              className="text-[#00e5ff] text-sm font-medium hover:underline"
            >
              join@findingluca.com
            </a>
          </div>
        </div>

        {/* What we're looking for */}
        <div className="border border-[#1e1e1e] rounded-2xl p-10 bg-[#111] mb-20">
          <h2 className="text-xl font-semibold mb-8">
            What we look for in collaborators
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                label: "Deep curiosity",
                desc: "You follow questions relentlessly, even when the path isn't clear.",
              },
              {
                label: "First-principles thinking",
                desc: "You question assumptions and reason from evidence, not convention.",
              },
              {
                label: "Long-term commitment",
                desc: "The best science takes time. We're not looking for quick wins.",
              },
            ].map((item) => (
              <div key={item.label}>
                <p className="font-semibold text-white mb-2">{item.label}</p>
                <p className="text-[#a0a0a0] text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quote */}
        <div className="border-t border-[#1e1e1e] pt-20 text-center">
          <p className="text-2xl md:text-3xl font-light text-[#a0a0a0] leading-relaxed">
            &ldquo;Science is not a body of knowledge — it&apos;s a{" "}
            <span className="text-white font-medium">way of thinking</span>.
            &rdquo;
          </p>
          <p className="text-[#555] text-sm mt-4">— Carl Sagan</p>
        </div>
      </div>
    </div>
  );
}
