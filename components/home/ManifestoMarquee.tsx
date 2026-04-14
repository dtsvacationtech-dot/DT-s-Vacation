export default function ManifestoMarquee() {
  return (
    <section className="bg-deep-navy py-6 overflow-hidden flex items-center border-y border-white/10">
      <div className="whitespace-nowrap flex overflow-hidden w-full relative">
        <div className="animate-[marquee_30s_linear_infinite] flex space-x-12 min-w-max pr-12 items-center">
          {[1, 2, 3].map((set) => (
            <div key={set} className="flex space-x-12 items-center text-white/90">
              <span className="font-heading text-lg lg:text-xl tracking-wider font-light uppercase">Intentionally Adventurous</span>
              <span className="text-tropical-gold">✦</span>
              <span className="font-heading text-lg lg:text-xl tracking-wider font-light uppercase">Meticulously Planned</span>
              <span className="text-tropical-gold">✦</span>
              <span className="font-heading text-lg lg:text-xl tracking-wider font-light uppercase">Devotedly Advocated</span>
              <span className="text-tropical-gold">✦</span>
              <span className="font-heading text-lg lg:text-xl tracking-wider font-light uppercase">Forthrightly Honest</span>
              <span className="text-tropical-gold">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
