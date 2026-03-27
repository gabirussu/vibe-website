'use client';

import { useState, useEffect } from 'react';
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation';

type Thought = { id: number; text: string; creat_la: string; };
type GalerieFoto = { id: number; url: string; titlu: string | null; };
type Testimonial = { id: number; url: string; titlu: string | null; };

function timeAgo(dateStr: string) {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (diff < 60) return 'chiar acum';
  if (diff < 3600) return `acum ${Math.floor(diff / 60)} min`;
  if (diff < 86400) return `acum ${Math.floor(diff / 3600)} ore`;
  if (diff < 172800) return 'ieri';
  return `acum ${Math.floor(diff / 86400)} zile`;
}

export default function Journal() {
  const [thoughts, setThoughts] = useState<Thought[]>([]);
  const [input, setInput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [galerie, setGalerie] = useState<GalerieFoto[]>([]);
  const [fotoMare, setFotoMare] = useState<string | null>(null);
  const [modalGalerieOpen, setModalGalerieOpen] = useState(false);
  const [testimoniale, setTestimoniale] = useState<Testimonial[]>([]);
  const [sliderIndex, setSliderIndex] = useState(0);
  const [modalTestimonialeOpen, setModalTestimonialeOpen] = useState(false);

  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { elementRef: leftRef, isVisible: leftVisible } = useScrollAnimation();
  const { elementRef: rightRef, isVisible: rightVisible } = useScrollAnimation();

  useEffect(() => {
    fetch('/api/gand?limit=3')
      .then(r => r.json())
      .then(res => { if (res.data) setThoughts(res.data); });
    fetch('/api/galerie')
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setGalerie(data); });
    fetch('/api/testimoniale')
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setTestimoniale(data); });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);
    const res = await fetch('/api/gand', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: input.trim() }),
    });
    const data = await res.json();
    setLoading(false);
    if (res.ok) {
      setThoughts(prev => [data, ...prev].slice(0, 3));
      setInput('');
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <section id="feedback" className="py-20 px-6" style={{ background: 'linear-gradient(to bottom right, #ffffff, #d6d3d1, #78716c)' }}>
      <div className="max-w-6xl mx-auto">

        {/* TITLU */}
        <div
          ref={titleRef}
          className="text-center mb-16"
          style={{
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 800ms ease-out, transform 800ms ease-out',
          }}
        >
          <h2 className="text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Lasă aici gândurile tale
          </h2>
          <p className="text-xl text-gray-500 italic" style={{ fontFamily: 'var(--font-italiana)' }}>
            Un colț al cafenelei unde timpul stă puțin pe loc.
          </p>
        </div>

        {/* SPLIT LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

          {/* STÂNGA — POVESTEA */}
          <div
            ref={leftRef}
            style={{
              opacity: leftVisible ? 1 : 0,
              transform: leftVisible ? 'translateY(0)' : 'translateY(40px)',
              transition: 'opacity 800ms ease-out, transform 800ms ease-out',
              transitionDelay: '0.2s',
            }}
          >
            <div className="relative rounded-3xl overflow-hidden mb-6" style={{ minHeight: '280px' }}>
              <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
                <source src="/hero-coffe-1.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8">
                <span className="text-4xl mb-3 block">✍️</span>
                <h3 className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                  Povestea noastră
                </h3>
              </div>
            </div>

            {/* CARD POVESTE */}
            <div className="mt-6 rounded-3xl p-6 shadow-lg" style={{ background: 'linear-gradient(to bottom right, #ffffff, #d6d3d1, #78716c)' }}>
              <div className="flex flex-col gap-5">
                <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>
                  Vibe Caffè s-a născut dintr-o obsesie simplă: că o cafea bună poate schimba tonul unei zile întregi. Nu ne-am dorit un loc unde lumea vine în grabă — ne-am dorit un loc unde lumea rămâne.
                </p>
                <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>
                  Fiecare detaliu a fost gândit pentru tine — lumina caldă, muzica discretă, fotoliul din colț. Și jurnalul deschis pe masă, pentru că unele gânduri merită să fie scrise...și citite. Verdeața care te înconjoară nu e doar decor — e o invitație. Te obligă să respiri mai adânc, să conștientizezi clipa și să uiți, măcar pentru o clipă, tumultul cotidianului.
                </p>
                <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>
                  Nu vindem cafea — oferim experiențe. Aromă autentică, patiserie proaspătă și un loc unde gândurile tale rămân. Totul natural, proaspăt, gândit pentru tine, pregătit cu pasiune și oferit cu bucurie.
                </p>
              </div>
            </div>

            {/* CARD GALERIE */}
            {galerie.length > 0 && (
              <div className="mt-6 rounded-3xl p-6 shadow-lg" style={{ background: 'linear-gradient(to bottom right, #ffffff, #d6d3d1, #78716c)' }}>
                <h3 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                  📸 Galerie foto
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {galerie.slice(0, 3).map(foto => (
                    <div
                      key={foto.id}
                      className="relative rounded-2xl overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200"
                      style={{ aspectRatio: '1' }}
                      onClick={() => setFotoMare(foto.url)}
                    >
                      <img src={foto.url} alt={foto.titlu || ''} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setModalGalerieOpen(true)}
                  className="w-full mt-4 py-2 rounded-2xl text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #78716c, #44403c)', fontFamily: 'var(--font-cinzel)', fontSize: '12px' }}
                >
                  {galerie.length > 3 ? `Vezi toate fotografiile (${galerie.length})` : 'Vezi galeria'}
                </button>
              </div>
            )}
          </div>

          {/* DREAPTA — JURNAL */}
          <div
            ref={rightRef}
            style={{
              opacity: rightVisible ? 1 : 0,
              transform: rightVisible ? 'translateY(0)' : 'translateY(40px)',
              transition: 'opacity 800ms ease-out, transform 800ms ease-out',
              transitionDelay: '0.4s',
            }}
          >
            {/* FORMULAR */}
            <div className="relative rounded-3xl overflow-hidden p-8 shadow-lg mb-6">
              <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
                <source src="/hero-coffe-2.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
              <h3 className="relative z-10 text-2xl font-bold text-[#F5E6C8] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                Ce gând lași azi?
              </h3>
              <p className="relative z-10 text-white/70 font-light text-sm mb-5" style={{ fontFamily: 'var(--font-inter)' }}>
                Anonim, sincer, al tău. Rămâne aici pentru cei care vin după tine.
              </p>
              <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-3">
                <textarea
                  rows={3}
                  placeholder="Scrie ce simți..."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 text-gray-800 font-light focus:outline-none focus:border-stone-400 focus:bg-white transition-all duration-200 resize-none"
                  style={{ fontFamily: 'var(--font-inter)' }}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-2xl text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-60"
                  style={{ background: 'linear-gradient(135deg, #78716c, #44403c)', fontFamily: 'var(--font-cinzel)', fontSize: '14px' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'linear-gradient(135deg, #44403c, #1c1917)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'linear-gradient(135deg, #78716c, #44403c)')}
                >
                  {loading ? 'Se trimite...' : submitted ? '✓ Mulțumim!' : 'Lasă gândul tău'}
                </button>
              </form>
            </div>

            {/* GÂNDURI */}
            <div className="flex flex-col gap-3">
              {thoughts.map((t) => (
                <div
                  key={t.id}
                  className="relative rounded-2xl overflow-hidden px-6 py-4 shadow-sm"
                >
                  <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
                    <source src="/hero-coffe-2.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-black/55" />
                  <p className="relative z-10 text-white/90 font-light leading-relaxed" style={{ fontFamily: 'var(--font-italiana)' }}>
                    "{t.text}"
                  </p>
                  <p className="relative z-10 text-white/40 text-xs mt-2" style={{ fontFamily: 'var(--font-inter)' }}>
                    {timeAgo(t.creat_la)}
                  </p>
                </div>
              ))}
            </div>

            {/* BUTON TOATE GÂNDURILE */}
            <div className="flex justify-center mt-6">
              <a
                href="/ganduri"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{ background: 'linear-gradient(135deg, #78716c, #44403c)', fontFamily: 'var(--font-cinzel)', fontSize: '13px' }}
              >
                ✍️ Toate gândurile
              </a>
            </div>

            {/* CARD TESTIMONIALE */}
            {testimoniale.length > 0 && (
              <div className="mt-6 rounded-3xl p-4 shadow-lg" style={{ background: 'linear-gradient(to bottom right, #ffffff, #d6d3d1, #78716c)' }}>
                <h3 className="text-lg font-bold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                  ✍️ Ce spun clienții noștri
                </h3>

                {/* SLIDER */}
                <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: '16/9' }}>
                  <img
                    src={testimoniale[sliderIndex].url}
                    alt={testimoniale[sliderIndex].titlu || ''}
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => setFotoMare(testimoniale[sliderIndex].url)}
                  />
                  {testimoniale[sliderIndex].titlu && (
                    <div className="absolute bottom-0 left-0 right-0 px-4 py-3" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }}>
                      <p className="text-white text-sm" style={{ fontFamily: 'var(--font-italiana)', fontStyle: 'italic' }}>
                        {testimoniale[sliderIndex].titlu}
                      </p>
                    </div>
                  )}
                  {testimoniale.length > 1 && (
                    <>
                      <button
                        onClick={() => setSliderIndex(i => (i - 1 + testimoniale.length) % testimoniale.length)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-white transition-colors"
                        style={{ background: 'rgba(0,0,0,0.4)' }}
                      >
                        ‹
                      </button>
                      <button
                        onClick={() => setSliderIndex(i => (i + 1) % testimoniale.length)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-white transition-colors"
                        style={{ background: 'rgba(0,0,0,0.4)' }}
                      >
                        ›
                      </button>
                    </>
                  )}
                </div>

                {/* DOTS */}
                {testimoniale.length > 1 && (
                  <div className="flex justify-center gap-1.5 mt-3">
                    {testimoniale.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setSliderIndex(i)}
                        className="rounded-full transition-all duration-200"
                        style={{ width: i === sliderIndex ? '20px' : '8px', height: '8px', background: i === sliderIndex ? '#44403c' : '#d6d3d1', border: 'none', cursor: 'pointer' }}
                      />
                    ))}
                  </div>
                )}

                <button
                  onClick={() => setModalTestimonialeOpen(true)}
                  className="w-full mt-4 py-2 rounded-2xl text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #78716c, #44403c)', fontFamily: 'var(--font-cinzel)', fontSize: '12px' }}
                >
                  {testimoniale.length > 1 ? `Vezi toate (${testimoniale.length})` : 'Vezi tot'}
                </button>
              </div>
            )}

          </div>
        </div>

      </div>

      {/* MODAL TESTIMONIALE */}
      {modalTestimonialeOpen && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.80)', backdropFilter: 'blur(8px)' }}
          onClick={() => setModalTestimonialeOpen(false)}
        >
          <div
            className="relative rounded-3xl overflow-hidden shadow-2xl"
            style={{ background: 'rgba(255,255,255,0.95)', maxWidth: '800px', width: '100%', maxHeight: '90vh', overflowY: 'auto', padding: '2rem' }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>
                ✍️ Ce spun clienții noștri
              </h3>
              <button
                onClick={() => setModalTestimonialeOpen(false)}
                className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 text-xl transition-colors"
              >
                ×
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '0.75rem' }}>
              {testimoniale.map(t => (
                <div
                  key={t.id}
                  className="relative rounded-2xl overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200"
                  style={{ aspectRatio: '1' }}
                  onClick={() => { setModalTestimonialeOpen(false); setFotoMare(t.url); }}
                >
                  <img src={t.url} alt={t.titlu || ''} className="w-full h-full object-cover" />
                  {t.titlu && (
                    <div className="absolute bottom-0 left-0 right-0 px-3 py-2" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }}>
                      <p className="text-white text-xs" style={{ fontFamily: 'var(--font-inter)' }}>{t.titlu}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL GALERIE */}
      {modalGalerieOpen && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.80)', backdropFilter: 'blur(8px)' }}
          onClick={() => setModalGalerieOpen(false)}
        >
          <div
            className="relative rounded-3xl overflow-hidden shadow-2xl"
            style={{ background: 'rgba(255,255,255,0.95)', maxWidth: '800px', width: '100%', maxHeight: '90vh', overflowY: 'auto', padding: '2rem' }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>
                📸 Galerie foto
              </h3>
              <button
                onClick={() => setModalGalerieOpen(false)}
                className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 text-xl transition-colors"
              >
                ×
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))' }}>
              {galerie.map(foto => (
                <div
                  key={foto.id}
                  className="relative rounded-2xl overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200"
                  style={{ aspectRatio: '1' }}
                  onClick={() => { setModalGalerieOpen(false); setFotoMare(foto.url); }}
                >
                  <img src={foto.url} alt={foto.titlu || ''} className="w-full h-full object-cover" />
                  {foto.titlu && (
                    <div className="absolute bottom-0 left-0 right-0 px-3 py-2" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }}>
                      <p className="text-white text-xs" style={{ fontFamily: 'var(--font-inter)' }}>{foto.titlu}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* LIGHTBOX */}
      {fotoMare && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
          onClick={() => setFotoMare(null)}
        >
          <img
            src={fotoMare}
            alt=""
            className="max-w-full max-h-full rounded-3xl shadow-2xl"
            style={{ maxHeight: '90vh', objectFit: 'contain' }}
          />
          <button
            onClick={() => setFotoMare(null)}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white text-xl transition-colors"
          >
            ×
          </button>
        </div>
      )}
    </section>
  );
}
