'use client';

/**
 * 🎯 HERO STARTER - Versiunea simplă pentru cursanți
 *
 * Aceasta este versiunea MINIMALISTĂ de la care plecăm în curs.
 * Fără animații, fără video, fără JavaScript complex.
 * Doar HTML + Tailwind CSS = fundația de bază.
 */

export default function HeroStarter() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* IMAGINE FUNDAL */}
      <img
        src="https://images.unsplash.com/photo-1761971976200-24b6b2abc903?q=80&w=1920&auto=format&fit=crop"
        alt="Cafenea modernă cu perete verde"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* OVERLAY ÎNTUNECAT */}
      <div className="absolute inset-0 bg-black/55" />

      {/* SĂGEȚI SCROLL — JOS */}
      <a
        href="#features"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
        style={{ animation: 'fadeInDown 0.8s ease-out both', animationDelay: '2.5s' }}
      >
        <svg className="w-6 h-6 animate-bounce" style={{ animationDelay: '0ms', color: '#9CA3AF', opacity: 0.4 }} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
        <svg className="w-6 h-6 animate-bounce" style={{ animationDelay: '150ms', color: '#9CA3AF', opacity: 0.65 }} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
        <svg className="w-6 h-6 animate-bounce" style={{ animationDelay: '300ms', color: '#9CA3AF', opacity: 0.9 }} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
      </a>

      {/* CONȚINUT */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">

        {/* TITLU PRINCIPAL */}
        <h1
          className="text-3xl sm:text-5xl md:text-8xl font-bold mb-6 leading-tight drop-shadow-2xl text-[#F5E6C8]"
          style={{
            textShadow: '0 4px 32px rgba(0,0,0,0.5)',
            animation: 'fadeInUp 0.8s ease-out both',
            animationDelay: '0.8s',
          }}
        >
          Respiră. Savurează. Reîncarcă.
        </h1>

        {/* SUBTITLU */}
        <p
          className="text-base sm:text-xl md:text-3xl mb-8 font-light tracking-wide italic px-2 text-[#9CA3AF]"
          style={{
            textShadow: '0 2px 16px rgba(0,0,0,0.5)',
            animation: 'fadeInUp 0.8s ease-out both',
            animationDelay: '1.2s',
          }}
        >
          Cafeaua care îți redă energia fără să îți fure liniștea. O găsești la Vibe Caffè.
        </p>

        {/* BUTON NOU — DEASUPRA */}
        <div
          className="flex justify-center mb-6"
          style={{ animation: 'fadeInUp 0.8s ease-out both', animationDelay: '1.6s' }}
        >
          <a
            href="#features"
            className="relative inline-flex items-center justify-center px-12 py-4 overflow-hidden rounded-3xl font-light text-lg border border-white/30 hover:border-white/60 hover:scale-105 transition-all duration-300"
          >
            <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
              <source src="/hero-coffe-3.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/30" />
            <span className="relative z-10 text-[#E5E4E2]" style={{ fontFamily: 'var(--font-cinzel)' }}>Descoperă experiența</span>
          </a>
        </div>

        {/* BUTOANE */}
        <div
          className="flex flex-wrap justify-center gap-4"
          style={{ animation: 'fadeInUp 0.8s ease-out both', animationDelay: '2.0s' }}
        >
          {/* BUTON CTA CU VIDEO FUNDAL */}
          <a
            href="#menu"
            className="relative inline-flex items-center justify-center px-16 py-8 overflow-hidden rounded-3xl font-semibold text-white shadow-2xl text-xl hover:scale-105 transition-all duration-300"
            style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.5)' }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 12px 60px rgba(0,0,0,0.8)')}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 8px 40px rgba(0,0,0,0.5)')}
          >
            <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: 'center bottom' }}>
              <source src="/hero-coffe.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/30" />
            <span className="relative z-10 text-[#E5E4E2]" style={{ fontFamily: 'var(--font-cinzel)' }}>Vezi meniul</span>
          </a>

          {/* BUTON SECUNDAR */}
          <a
            href="#locatie"
            className="relative inline-flex items-center justify-center px-16 py-8 overflow-hidden rounded-3xl font-semibold text-white text-xl hover:scale-105 transition-all duration-300"
            style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.4)' }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 12px 60px rgba(0,0,0,0.7)')}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 8px 40px rgba(0,0,0,0.4)')}
          >
            <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
              <source src="/hero-coffe-1.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/30" />
            <span className="relative z-10 text-[#E5E4E2]" style={{ fontFamily: 'var(--font-cinzel)' }}>Vizitează-ne</span>
          </a>
        </div>

        {/* BUTON TERTIAR */}
        <div
          className="flex justify-center mt-4"
          style={{ animation: 'fadeInUp 0.8s ease-out both', animationDelay: '2.0s' }}
        >
          <a
            href="#feedback"
            className="relative inline-flex items-center justify-center px-10 py-4 overflow-hidden rounded-3xl font-light text-lg border border-white/30 hover:border-white/60 hover:scale-105 transition-all duration-300"
          >
            <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
              <source src="/hero-coffe-2.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/30" />
            <span className="relative z-10 text-[#E5E4E2]" style={{ fontFamily: 'var(--font-cinzel)' }}>Lasă aici gândurile tale...</span>
          </a>
        </div>

      </div>
    </section>
  );
}
