'use client';

import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation';

export default function Features() {
  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { elementRef: card1Ref, isVisible: card1Visible } = useScrollAnimation();
  const { elementRef: card2Ref, isVisible: card2Visible } = useScrollAnimation();
  const { elementRef: card3Ref, isVisible: card3Visible } = useScrollAnimation();
  const { elementRef: card4Ref, isVisible: card4Visible } = useScrollAnimation();

  return (
    <section id="features" className="py-20 px-6" style={{ background: 'linear-gradient(to bottom right, #ffffff, #d6d3d1, #78716c)' }}>
      <div className="max-w-6xl mx-auto">

        {/* TITLU + SUBTITLU */}
        <div
          ref={titleRef}
          className="text-center mb-14 transition-all duration-300"
          style={{
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? 'translateY(0)' : 'translateY(30px)',
          }}
        >
          <h2 className="text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            De ce Vibe Caffè?
          </h2>
          <p className="text-xl text-gray-500 italic" style={{ fontFamily: 'var(--font-italiana)' }}>
            Fiecare vizită aici are gustul ei — o ceașcă perfectă, un croissant cald și un ambient care îți redă liniștea.<br />Și un loc unde poți să lași ceva din tine — pentru că unele gânduri merită să fie scrise.<br />Pentru tine doar sau pentru toți cei din jurul tău.
          </p>
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* CARD MARE — STÂNGA */}
          <div
            ref={card1Ref}
            className="relative rounded-3xl overflow-hidden min-h-[420px] flex flex-col justify-end group cursor-pointer hover:shadow-2xl hover:shadow-black/30"
            style={{
              opacity: card1Visible ? 1 : 0,
              transform: card1Visible ? 'translateY(0)' : 'translateY(40px)',
              transition: 'opacity 800ms ease-out, transform 800ms ease-out, box-shadow 300ms ease',
              transitionDelay: '0.8s',
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1525391832543-432b7e058cb0?q=80&w=1200&auto=format&fit=crop"
              alt="Cafea de specialitate"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="relative z-10 p-10">
              <span className="text-4xl mb-4 block">☕</span>
              <h3 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                Cafea de Specialitate
              </h3>
              <p className="text-white/80 text-lg font-light leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>
                Boabe selectate din cele mai bune origini, prăjite cu grijă și preparate de bariști pasionați. Fiecare ceașcă e o experiență în sine.
              </p>
            </div>
          </div>

          {/* COLOANA DREAPTA — 2 carduri mici */}
          <div className="flex flex-col gap-6">

            {/* CARD MIC — SUS */}
            <div
              ref={card2Ref}
              className="relative rounded-3xl overflow-hidden min-h-[280px] md:min-h-[195px] md:flex-1 flex flex-col justify-end group cursor-pointer hover:shadow-2xl hover:shadow-black/30"
              style={{
                opacity: card2Visible ? 1 : 0,
                transform: card2Visible ? 'translateY(0)' : 'translateY(40px)',
                transition: 'opacity 800ms ease-out, transform 800ms ease-out, box-shadow 300ms ease',
                transitionDelay: '1.0s',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1722654585792-fbe7b2e1f5fd?q=80&w=1200&auto=format&fit=crop"
                alt="Ambient relaxant"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="relative z-10 p-8">
                <span className="text-3xl mb-2 block">🌿</span>
                <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                  Ambient Relaxant
                </h3>
                <p className="text-white/80 font-light leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>
                  Un spațiu gândit pentru liniște și reîncărcare. Lumină caldă, muzică discretă și o atmosferă care îți dă voie să respiri.
                </p>
              </div>
            </div>

            {/* CARD MIC — JOS */}
            <div
              ref={card3Ref}
              className="relative rounded-3xl overflow-hidden min-h-[280px] md:min-h-[195px] md:flex-1 flex flex-col justify-end group cursor-pointer hover:shadow-2xl hover:shadow-black/30"
              style={{
                opacity: card3Visible ? 1 : 0,
                transform: card3Visible ? 'translateY(0)' : 'translateY(40px)',
                transition: 'opacity 800ms ease-out, transform 800ms ease-out, box-shadow 300ms ease',
                transitionDelay: '1.2s',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?q=80&w=1200&auto=format&fit=crop"
                alt="Patiserie artizanală"
                className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="relative z-10 p-8">
                <span className="text-3xl mb-2 block">🥐</span>
                <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                  Patiserie Artizanală
                </h3>
                <p className="text-white/80 font-light leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>
                  Croissante crocante, prăjituri de casă și deserturi proaspete — făcute în fiecare dimineață cu ingrediente naturale.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* CARD WIDE — JOS */}
        <div
          ref={card4Ref}
          className="relative rounded-3xl overflow-hidden min-h-[280px] mt-6 flex flex-col md:flex-row items-center group cursor-pointer hover:shadow-2xl hover:shadow-black/30"
          style={{
            opacity: card4Visible ? 1 : 0,
            transform: card4Visible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 800ms ease-out, transform 800ms ease-out, box-shadow 300ms ease',
            transitionDelay: '1.4s',
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1800&auto=format&fit=crop"
            alt="Lasă aici gândurile tale"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/20" />

          {/* TEXT — STÂNGA */}
          <div className="relative z-10 p-10 md:w-1/2">
            <span className="text-4xl mb-4 block">✍️</span>
            <h3 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Lasă aici gândurile tale
            </h3>
            <p className="text-white/80 text-lg font-light leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>
              Un colț al cafenelei dedicat ție. Scrie ce simți, lasă un mesaj pentru cei care vin după tine sau descoperă ce au scris alții. Un jurnal viu, împărtășit de toți cei care trec pragul Vibe Caffè — un jurnal pe care îl poți citi și aici.
            </p>
          </div>

          {/* DETALII — DREAPTA */}
          <div className="relative z-10 p-10 md:w-1/2 flex flex-col gap-4 md:items-end">
            {[
              { icon: '📖', text: 'Un jurnal deschis tuturor' },
              { icon: '💬', text: 'Mesaje anonime sau semnate' },
              { icon: '🕯️', text: 'Momente de reflecție și prezență' },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-3">
                <span className="text-2xl">{icon}</span>
                <span className="text-white/90 font-light" style={{ fontFamily: 'var(--font-inter)' }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* SĂGEATĂ SCROLL */}
      <a href="#menu" className="flex justify-center mt-12 animate-bounce">
        <svg className="w-7 h-7" style={{ color: '#44403c' }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </a>
    </section>
  );
}
