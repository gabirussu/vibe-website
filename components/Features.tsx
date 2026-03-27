'use client';

import { useState, useEffect } from 'react';
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation';

type Foto = { id: number; url: string; titlu: string | null; };

export default function Features() {
  const [galerie, setGalerie] = useState<Foto[]>([]);
  const [testimoniale, setTestimoniale] = useState<Foto[]>([]);
  const [modalGalerie, setModalGalerie] = useState(false);
  const [modalTestimoniale, setModalTestimoniale] = useState(false);
  const [fotoMare, setFotoMare] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/galerie').then(r => r.json()).then(d => { if (Array.isArray(d)) setGalerie(d); });
    fetch('/api/testimoniale').then(r => r.json()).then(d => { if (Array.isArray(d)) setTestimoniale(d); });
  }, []);

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
          <a
            href="/?cat=Specialty#menu"
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
          </a>

          {/* COLOANA DREAPTA — 2 carduri mici */}
          <div className="flex flex-col gap-6">

            {/* CARD MIC — SUS */}
            <div
              onClick={() => setModalGalerie(true)}
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
            <a
              href="/?cat=Patiserie#menu"
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
            </a>

          </div>
        </div>

        {/* CARD WIDE — JOS */}
        <div
          onClick={() => setModalTestimoniale(true)}
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

      {/* MODAL GALERIE */}
      {modalGalerie && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.80)', backdropFilter: 'blur(8px)' }} onClick={() => setModalGalerie(false)}>
          <div className="relative rounded-3xl shadow-2xl" style={{ background: 'rgba(255,255,255,0.95)', maxWidth: '800px', width: '100%', maxHeight: '90vh', overflowY: 'auto', padding: '2rem' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>📸 Galerie foto</h3>
              <button onClick={() => setModalGalerie(false)} className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 text-xl transition-colors">×</button>
            </div>
            {galerie.length === 0 ? (
              <p className="text-center text-gray-400" style={{ fontFamily: 'var(--font-inter)' }}>Nicio fotografie încă.</p>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '0.75rem' }}>
                {galerie.map(f => (
                  <div key={f.id} className="relative rounded-2xl overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200" style={{ aspectRatio: '1' }} onClick={() => setFotoMare(f.url)}>
                    <img src={f.url} alt={f.titlu || ''} className="w-full h-full object-cover" />
                    {f.titlu && <div className="absolute bottom-0 left-0 right-0 px-3 py-2" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }}><p className="text-white text-xs" style={{ fontFamily: 'var(--font-inter)' }}>{f.titlu}</p></div>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL TESTIMONIALE */}
      {modalTestimoniale && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.80)', backdropFilter: 'blur(8px)' }} onClick={() => setModalTestimoniale(false)}>
          <div className="relative rounded-3xl shadow-2xl" style={{ background: 'rgba(255,255,255,0.95)', maxWidth: '800px', width: '100%', maxHeight: '90vh', overflowY: 'auto', padding: '2rem' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>✍️ Ce spun clienții noștri</h3>
              <button onClick={() => setModalTestimoniale(false)} className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 text-xl transition-colors">×</button>
            </div>
            {testimoniale.length === 0 ? (
              <p className="text-center text-gray-400" style={{ fontFamily: 'var(--font-inter)' }}>Niciun testimonial încă.</p>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '0.75rem' }}>
                {testimoniale.map(t => (
                  <div key={t.id} className="relative rounded-2xl overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200" style={{ aspectRatio: '1' }} onClick={() => setFotoMare(t.url)}>
                    <img src={t.url} alt={t.titlu || ''} className="w-full h-full object-cover" />
                    {t.titlu && <div className="absolute bottom-0 left-0 right-0 px-3 py-2" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }}><p className="text-white text-xs" style={{ fontFamily: 'var(--font-inter)' }}>{t.titlu}</p></div>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* LIGHTBOX */}
      {fotoMare && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }} onClick={() => setFotoMare(null)}>
          <img src={fotoMare} alt="" className="max-w-full max-h-full rounded-3xl shadow-2xl" style={{ maxHeight: '90vh', objectFit: 'contain' }} />
          <button onClick={() => setFotoMare(null)} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white text-xl transition-colors">×</button>
        </div>
      )}
    </section>
  );
}
