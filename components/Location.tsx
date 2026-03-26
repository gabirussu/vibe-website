'use client';

import { useEffect, useRef, useState } from 'react';
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation';
import { supabase } from '@/lib/supabase';

const LAT = 46.7712;
const LNG = 23.5898;
const ADDRESS = 'Strada Potaissa nr. 8, Cluj-Napoca';

export default function Location() {
  const mapRef = useRef<HTMLDivElement>(null);
  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { elementRef: cardRef, isVisible: cardVisible } = useScrollAnimation();

  const rezervareRef = useRef<HTMLButtonElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ nume: '', email: '', telefon: '', data: '', ora: '', persoane: '2', mesaj: '' });
  const [submitted, setSubmitted] = useState(false);
  const [eroare, setEroare] = useState('');
  const [loading, setLoading] = useState(false);
  const [locuriIndisponibile, setLocuriIndisponibile] = useState(false);

  useEffect(() => {
    if (!mapRef.current) return;
    let map: import('leaflet').Map;
    import('leaflet').then((L) => {
      const DefaultIcon = L.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });
      map = L.map(mapRef.current!, { center: [LAT, LNG], zoom: 16, zoomControl: true, scrollWheelZoom: false });
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);
      L.marker([LAT, LNG], { icon: DefaultIcon })
        .addTo(map)
        .bindPopup(`<div style="font-family: serif; text-align: center; padding: 4px 8px;"><strong style="font-size: 15px;">Vibe Caffè</strong><br/><span style="color: #6b7280; font-size: 13px;">${ADDRESS}</span></div>`)
        .openPopup();
    });
    return () => { if (map) map.remove(); };
  }, []);

  // Blochează scroll când modalul e deschis
  useEffect(() => {
    document.body.style.overflow = modalOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [modalOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEroare('');
    setLoading(true);

    const { error } = await supabase.from('rezervari').insert({
      nume: form.nume,
      email: form.email,
      telefon: form.telefon,
      data: form.data,
      ora: form.ora,
      persoane: parseInt(form.persoane),
      mesaj: form.mesaj || null,
    });

    setLoading(false);

    if (error) {
      const msg = error.message || error.details || '';
      if (msg.includes('locuri') || msg.includes('disponibile') || msg.includes('P0001')) {
        setLocuriIndisponibile(true);
      } else {
        setEroare('A apărut o eroare. Te rugăm să încerci din nou.');
        console.error('Eroare rezervare:', error);
      }
    } else {
      setSubmitted(true);
    }
  };

  const handleClose = () => {
    setModalOpen(false);
    setTimeout(() => { setSubmitted(false); setForm({ nume: '', email: '', telefon: '', data: '', ora: '', persoane: '2', mesaj: '' }); }, 300);
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 font-light focus:outline-none focus:border-stone-400 focus:bg-white transition-all duration-200";
  const labelClass = "block text-xs font-semibold mb-1 uppercase tracking-wide text-stone-600";

  return (
    <section
      id="locatie"
      className="py-20 px-6"
      style={{ background: 'linear-gradient(to bottom right, #ffffff, #d6d3d1, #78716c)' }}
    >
      <div className="max-w-6xl mx-auto">

        {/* TITLU */}
        <div
          ref={titleRef}
          className="text-center mb-12"
          style={{
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 800ms ease-out, transform 800ms ease-out',
          }}
        >
          <h2 className="text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Unde ne găsești
          </h2>
          <p className="text-xl text-gray-500 italic" style={{ fontFamily: 'var(--font-italiana)' }}>
            Vino să ne vizitezi. Te așteptăm cu o ceașcă pregătită și cu sufletul deschis.
          </p>
        </div>

        {/* CARD CU HARTĂ + INFO */}
        <div
          ref={cardRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch"
          style={{
            opacity: cardVisible ? 1 : 0,
            transform: cardVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 800ms ease-out, transform 800ms ease-out',
            transitionDelay: '0.3s',
          }}
        >
          {/* HARTĂ */}
          <div className="md:col-span-2 rounded-3xl overflow-hidden shadow-xl" style={{ minHeight: '420px' }}>
            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
            <div ref={mapRef} className="w-full h-full" style={{ minHeight: '420px' }} />
          </div>

          {/* INFO */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 flex flex-col justify-between shadow-xl">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                Vibe Caffè
              </h3>
              <div className="flex flex-col gap-5">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📍</span>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm" style={{ fontFamily: 'var(--font-cinzel)' }}>Adresă</p>
                    <p className="text-gray-600 font-light mt-1" style={{ fontFamily: 'var(--font-inter)' }}>{ADDRESS}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🕐</span>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm" style={{ fontFamily: 'var(--font-cinzel)' }}>Program</p>
                    <p className="text-gray-600 font-light mt-1" style={{ fontFamily: 'var(--font-inter)' }}>Lun – Vin: 07:00 – 21:00</p>
                    <p className="text-gray-600 font-light" style={{ fontFamily: 'var(--font-inter)' }}>Sâm – Dum: 08:00 – 22:00</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📞</span>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm" style={{ fontFamily: 'var(--font-cinzel)' }}>Contact</p>
                    <p className="text-gray-600 font-light mt-1" style={{ fontFamily: 'var(--font-inter)' }}>+40 748 123 456</p>
                    <p className="text-gray-600 font-light" style={{ fontFamily: 'var(--font-inter)' }}>hello@vibecaffe.ro</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-8">
              {/* BUTON REZERVARE */}
              <button
                ref={rezervareRef}
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{ background: 'linear-gradient(135deg, #78716c, #44403c)', fontFamily: 'var(--font-cinzel)', fontSize: '14px' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'linear-gradient(135deg, #44403c, #1c1917)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'linear-gradient(135deg, #78716c, #44403c)')}
              >
                <span>📅</span> Fă o rezervare
              </button>

              {/* BUTON GOOGLE MAPS */}
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${LAT},${LNG}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{ background: 'linear-gradient(135deg, #d6d3d1, #a8a29e)', fontFamily: 'var(--font-cinzel)', fontSize: '14px' }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #78716c, #44403c)';
                  if (rezervareRef.current) rezervareRef.current.style.background = 'linear-gradient(135deg, #d6d3d1, #a8a29e)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #d6d3d1, #a8a29e)';
                  if (rezervareRef.current) rezervareRef.current.style.background = 'linear-gradient(135deg, #78716c, #44403c)';
                }}
              >
                <span>🗺️</span> Deschide în Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* SĂGEATĂ SCROLL */}
      <div className="flex justify-center mt-12 animate-bounce">
        <svg className="w-7 h-7" style={{ color: '#44403c' }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* MODAL LOCURI INDISPONIBILE */}
      {locuriIndisponibile && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)' }}
          onClick={() => setLocuriIndisponibile(false)}
        >
          <div
            className="rounded-3xl shadow-2xl w-full max-w-sm p-8 text-center"
            style={{ background: 'linear-gradient(to bottom right, #ffffff, #e7e5e4, #d6d3d1)' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="text-5xl mb-4">😔</div>
            <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: 'var(--font-heading)', color: '#44403c' }}>
              Ne pare rău
            </h3>
            <p className="font-light leading-relaxed mb-6" style={{ fontFamily: 'var(--font-inter)', color: '#78716c' }}>
              Nu mai sunt locuri disponibile pentru data și ora selectată. Te rugăm să alegi un alt interval orar.
            </p>
            <button
              onClick={() => setLocuriIndisponibile(false)}
              className="px-8 py-3 rounded-2xl text-white font-medium transition-all duration-300 hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #78716c, #44403c)', fontFamily: 'var(--font-cinzel)', fontSize: '14px' }}
            >
              Încearcă din nou
            </button>
          </div>
        </div>
      )}

      {/* MODAL REZERVARE */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)', animation: 'fadeIn 200ms ease-out' }}
          onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
        >
          <div
            className="rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            style={{ background: 'linear-gradient(to bottom right, #ffffff, #e7e5e4, #d6d3d1)', animation: 'fadeInUp 250ms ease-out' }}
          >
            {/* HEADER MODAL */}
            <div className="flex justify-between items-center p-8 pb-4">
              <div>
                <h3 className="text-3xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: '#44403c' }}>
                  Rezervare
                </h3>
                <p className="font-light text-sm mt-1" style={{ fontFamily: 'var(--font-inter)', color: '#9CA3AF' }}>
                  Vibe Caffè — {ADDRESS}
                </p>
              </div>
              <button
                onClick={handleClose}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200 text-gray-500 text-xl"
              >
                ×
              </button>
            </div>

            <div className="px-8 pb-8">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Nume</label>
                      <input
                        type="text"
                        required
                        placeholder="Numele tău"
                        className={inputClass}
                        style={{ fontFamily: 'var(--font-inter)' }}
                        value={form.nume}
                        onChange={e => setForm({ ...form, nume: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Telefon</label>
                      <input
                        type="tel"
                        required
                        placeholder="+40 7xx xxx xxx"
                        className={inputClass}
                        style={{ fontFamily: 'var(--font-inter)' }}
                        value={form.telefon}
                        onChange={e => setForm({ ...form, telefon: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Email</label>
                    <input
                      type="email"
                      required
                      placeholder="adresa@email.com"
                      className={inputClass}
                      style={{ fontFamily: 'var(--font-inter)' }}
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Data</label>
                      <input
                        type="date"
                        required
                        className={inputClass}
                        style={{ fontFamily: 'var(--font-inter)' }}
                        value={form.data}
                        onChange={e => setForm({ ...form, data: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Ora</label>
                      <input
                        type="time"
                        required
                        className={inputClass}
                        style={{ fontFamily: 'var(--font-inter)' }}
                        value={form.ora}
                        onChange={e => setForm({ ...form, ora: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Număr persoane</label>
                    <select
                      className={inputClass}
                      style={{ fontFamily: 'var(--font-inter)' }}
                      value={form.persoane}
                      onChange={e => setForm({ ...form, persoane: e.target.value })}
                    >
                      {[1,2,3,4,5,6,7,8].map(n => (
                        <option key={n} value={n}>{n} {n === 1 ? 'persoană' : 'persoane'}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>Mesaj (opțional)</label>
                    <textarea
                      rows={3}
                      placeholder="Orice detaliu special pe care vrei să îl știm..."
                      className={inputClass + ' resize-none'}
                      style={{ fontFamily: 'var(--font-inter)' }}
                      value={form.mesaj}
                      onChange={e => setForm({ ...form, mesaj: e.target.value })}
                    />
                  </div>

                  {eroare && (
                    <p className="text-red-500 text-sm text-center px-2">{eroare}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-2xl text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ background: 'linear-gradient(135deg, #78716c, #44403c)', fontFamily: 'var(--font-cinzel)', fontSize: '15px' }}
                  >
                    {loading ? 'Se trimite...' : 'Confirmă rezervarea'}
                  </button>
                </form>
              ) : (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">☕</div>
                  <h4 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)', color: '#44403c' }}>
                    Rezervare confirmată!
                  </h4>
                  <p className="font-light leading-relaxed" style={{ fontFamily: 'var(--font-inter)', color: '#9CA3AF' }}>
                    Te așteptăm pe {form.data} la {form.ora}, {form.nume}.<br />
                    O să te contactăm la {form.telefon} pentru confirmare.
                  </p>
                  <button
                    onClick={handleClose}
                    className="mt-6 px-8 py-3 rounded-2xl text-white transition-all duration-300 hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #78716c, #44403c)', fontFamily: 'var(--font-cinzel)', fontSize: '14px' }}
                  >
                    Închide
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
