'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

type GalerieFoto = { id: number; url: string; titlu: string | null; creat_la: string; };

type Rezervare = {
  id: number;
  nume: string;
  email: string;
  telefon: string;
  data: string;
  ora: string;
  persoane: number;
  status: string;
  mesaj: string | null;
  creat_la: string;
};

function UploadCard({ titlu, setTitlu, onUpload, loading, label }: {
  titlu: string;
  setTitlu: (v: string) => void;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  label: string;
}) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.85)', borderRadius: '1.5rem', padding: '1.5rem', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', marginBottom: '1.5rem' }}>
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, color: '#1c1917', marginBottom: '1rem' }}>
        {label}
      </h2>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Titlu (opțional)"
          value={titlu}
          onChange={e => setTitlu(e.target.value)}
          style={{ flex: 1, minWidth: '200px', padding: '0.6rem 1rem', borderRadius: '999px', border: '1px solid #d6d3d1', fontFamily: 'var(--font-inter)', fontSize: '14px', outline: 'none' }}
        />
        <label style={{
          padding: '0.6rem 1.5rem', borderRadius: '999px', cursor: loading ? 'not-allowed' : 'pointer',
          background: loading ? '#d6d3d1' : 'linear-gradient(135deg, #78716c, #44403c)',
          color: 'white', fontFamily: 'var(--font-cinzel)', fontSize: '13px',
          opacity: loading ? 0.7 : 1,
        }}>
          {loading ? 'Se încarcă...' : '+ Alege fotografie'}
          <input type="file" accept="image/*" onChange={onUpload} disabled={loading} style={{ display: 'none' }} />
        </label>
      </div>
    </div>
  );
}

function FotoGrid({ items, onDelete }: { items: GalerieFoto[]; onDelete: (id: number, url: string) => void; }) {
  if (items.length === 0) return <p style={{ textAlign: 'center', color: '#78716c', fontFamily: 'var(--font-inter)' }}>Nicio fotografie încă.</p>;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
      {items.map(foto => (
        <div key={foto.id} style={{ background: 'rgba(255,255,255,0.85)', borderRadius: '1.25rem', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
          <div style={{ aspectRatio: '1', overflow: 'hidden' }}>
            <img src={foto.url} alt={foto.titlu || ''} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ padding: '0.75rem 1rem' }}>
            {foto.titlu && (
              <p style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: '#44403c', marginBottom: '0.5rem', fontWeight: 500 }}>
                {foto.titlu}
              </p>
            )}
            <button
              onClick={() => onDelete(foto.id, foto.url)}
              style={{ width: '100%', padding: '0.4rem', borderRadius: '999px', border: 'none', cursor: 'pointer', background: '#dc2626', color: 'white', fontFamily: 'var(--font-cinzel)', fontSize: '11px' }}
            >
              Șterge
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AdminPage() {
  const [autorizat, setAutorizat] = useState(false);
  const [rezervari, setRezervari] = useState<Rezervare[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtruStatus, setFiltruStatus] = useState('toate');
  const [tab, setTab] = useState<'rezervari' | 'galerie' | 'testimoniale'>('rezervari');

  const [galerie, setGalerie] = useState<GalerieFoto[]>([]);
  const [uploadLoadingGalerie, setUploadLoadingGalerie] = useState(false);
  const [titluGalerie, setTitluGalerie] = useState('');

  const [testimoniale, setTestimoniale] = useState<GalerieFoto[]>([]);
  const [uploadLoadingTestimoniale, setUploadLoadingTestimoniale] = useState(false);
  const [titluTestimoniale, setTitluTestimoniale] = useState('');

  useEffect(() => {
    if (sessionStorage.getItem('vc_admin') !== '1') {
      window.location.href = '/';
      return;
    }
    setAutorizat(true);
    fetchRezervari();
    fetchGalerie();
    fetchTestimoniale();
  }, []);

  const fetchGalerie = async () => {
    const res = await fetch('/api/galerie');
    const data = await res.json();
    if (Array.isArray(data)) setGalerie(data);
  };

  const fetchTestimoniale = async () => {
    const res = await fetch('/api/testimoniale');
    const data = await res.json();
    if (Array.isArray(data)) setTestimoniale(data);
  };

  const handleUploadGalerie = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadLoadingGalerie(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('titlu', titluGalerie);
    const res = await fetch('/api/galerie', { method: 'POST', body: formData });
    const data = await res.json();
    if (res.ok) { setGalerie(prev => [data, ...prev]); setTitluGalerie(''); }
    setUploadLoadingGalerie(false);
    e.target.value = '';
  };

  const handleUploadTestimoniale = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadLoadingTestimoniale(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('titlu', titluTestimoniale);
    const res = await fetch('/api/testimoniale', { method: 'POST', body: formData });
    const data = await res.json();
    if (res.ok) { setTestimoniale(prev => [data, ...prev]); setTitluTestimoniale(''); }
    setUploadLoadingTestimoniale(false);
    e.target.value = '';
  };

  const stergeFoto = async (id: number, url: string) => {
    if (!confirm('Ștergi această fotografie?')) return;
    const fileName = url.split('/').pop() || '';
    await fetch('/api/galerie', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, fileName }) });
    setGalerie(prev => prev.filter(f => f.id !== id));
  };

  const stergeTestimonial = async (id: number, url: string) => {
    if (!confirm('Ștergi acest testimonial?')) return;
    const fileName = url.split('/').pop() || '';
    await fetch('/api/testimoniale', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, fileName }) });
    setTestimoniale(prev => prev.filter(f => f.id !== id));
  };

  const fetchRezervari = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('rezervari')
      .select('*')
      .order('data', { ascending: true })
      .order('ora', { ascending: true });
    setRezervari(data || []);
    setLoading(false);
  };

  const schimbaStatus = async (id: number, status: string) => {
    await supabase.from('rezervari').update({ status }).eq('id', id);
    setRezervari(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  const stergeRezervare = async (id: number) => {
    if (!confirm('Sigur vrei să ștergi această rezervare?')) return;
    await supabase.from('rezervari').delete().eq('id', id);
    setRezervari(prev => prev.filter(r => r.id !== id));
  };

  const rezervariFiltrate = filtruStatus === 'toate'
    ? rezervari
    : rezervari.filter(r => r.status === filtruStatus);

  const statusColor = (status: string) => {
    if (status === 'confirmată') return '#16a34a';
    if (status === 'anulat') return '#dc2626';
    return '#d97706';
  };

  if (!autorizat) return null;

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #ffffff, #d6d3d1, #78716c)', padding: '2rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* HEADER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 700, color: '#1c1917' }}>
              Vibe Caffè — Admin
            </h1>
            <p style={{ fontFamily: 'var(--font-inter)', color: '#78716c', marginTop: '0.25rem' }}>
              {rezervari.length} rezervări total
            </p>
          </div>
          <button
            onClick={() => { sessionStorage.removeItem('vc_admin'); window.location.href = '/'; }}
            style={{ padding: '0.6rem 1.5rem', borderRadius: '999px', background: 'linear-gradient(135deg, #78716c, #44403c)', color: 'white', fontFamily: 'var(--font-cinzel)', fontSize: '13px', cursor: 'pointer', border: 'none' }}
          >
            Ieși
          </button>
        </div>

        {/* TABS */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {(['rezervari', 'galerie', 'testimoniale'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding: '0.5rem 1.5rem', borderRadius: '999px', border: 'none', cursor: 'pointer',
                fontFamily: 'var(--font-cinzel)', fontSize: '13px',
                background: tab === t ? 'linear-gradient(135deg, #44403c, #1c1917)' : 'rgba(255,255,255,0.7)',
                color: tab === t ? 'white' : '#44403c',
              }}
            >
              {t === 'rezervari' ? '📅 Rezervări' : t === 'galerie' ? '📸 Galerie foto' : '✍️ Testimoniale'}
            </button>
          ))}
        </div>

        {/* TAB: REZERVARI */}
        {tab === 'rezervari' && (
          <>
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              {['toate', 'în așteptare', 'confirmată', 'anulat'].map(s => (
                <button
                  key={s}
                  onClick={() => setFiltruStatus(s)}
                  style={{
                    padding: '0.5rem 1.25rem', borderRadius: '999px', border: 'none', cursor: 'pointer',
                    fontFamily: 'var(--font-cinzel)', fontSize: '12px',
                    background: filtruStatus === s ? 'linear-gradient(135deg, #78716c, #44403c)' : 'rgba(255,255,255,0.7)',
                    color: filtruStatus === s ? 'white' : '#44403c',
                  }}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
              <button
                onClick={fetchRezervari}
                style={{ padding: '0.5rem 1.25rem', borderRadius: '999px', border: 'none', cursor: 'pointer', background: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-cinzel)', fontSize: '12px', color: '#44403c' }}
              >
                ↻ Reîncarcă
              </button>
            </div>

            {loading ? (
              <p style={{ textAlign: 'center', color: '#78716c', fontFamily: 'var(--font-inter)' }}>Se încarcă...</p>
            ) : rezervariFiltrate.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#78716c', fontFamily: 'var(--font-inter)' }}>Nicio rezervare.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {rezervariFiltrate.map(r => (
                  <div key={r.id} style={{ background: 'rgba(255,255,255,0.85)', borderRadius: '1.5rem', padding: '1.5rem', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                      <div>
                        <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, color: '#1c1917' }}>{r.nume}</p>
                        <p style={{ fontFamily: 'var(--font-inter)', color: '#78716c', fontSize: '0.9rem' }}>{r.email} · {r.telefon}</p>
                        <p style={{ fontFamily: 'var(--font-inter)', color: '#44403c', marginTop: '0.5rem' }}>
                          📅 {r.data} la {r.ora.slice(0,5)} · 👥 {r.persoane} persoane
                        </p>
                        {r.mesaj && <p style={{ fontFamily: 'var(--font-inter)', color: '#78716c', fontSize: '0.9rem', marginTop: '0.25rem', fontStyle: 'italic' }}>"{r.mesaj}"</p>}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-end' }}>
                        <span style={{ padding: '0.3rem 1rem', borderRadius: '999px', background: statusColor(r.status) + '22', color: statusColor(r.status), fontFamily: 'var(--font-cinzel)', fontSize: '12px', fontWeight: 600 }}>
                          {r.status}
                        </span>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          {r.status !== 'confirmată' && (
                            <button onClick={() => schimbaStatus(r.id, 'confirmată')} style={{ padding: '0.4rem 1rem', borderRadius: '999px', border: 'none', cursor: 'pointer', background: '#16a34a', color: 'white', fontFamily: 'var(--font-cinzel)', fontSize: '11px' }}>
                              Confirmă
                            </button>
                          )}
                          {r.status !== 'anulat' && (
                            <button onClick={() => schimbaStatus(r.id, 'anulat')} style={{ padding: '0.4rem 1rem', borderRadius: '999px', border: 'none', cursor: 'pointer', background: '#d97706', color: 'white', fontFamily: 'var(--font-cinzel)', fontSize: '11px' }}>
                              Anulează
                            </button>
                          )}
                          <button onClick={() => stergeRezervare(r.id)} style={{ padding: '0.4rem 1rem', borderRadius: '999px', border: 'none', cursor: 'pointer', background: '#dc2626', color: 'white', fontFamily: 'var(--font-cinzel)', fontSize: '11px' }}>
                            Șterge
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* TAB: GALERIE */}
        {tab === 'galerie' && (
          <div>
            <UploadCard titlu={titluGalerie} setTitlu={setTitluGalerie} onUpload={handleUploadGalerie} loading={uploadLoadingGalerie} label="Adaugă fotografie" />
            <FotoGrid items={galerie} onDelete={stergeFoto} />
          </div>
        )}

        {/* TAB: TESTIMONIALE */}
        {tab === 'testimoniale' && (
          <div>
            <UploadCard titlu={titluTestimoniale} setTitlu={setTitluTestimoniale} onUpload={handleUploadTestimoniale} loading={uploadLoadingTestimoniale} label="Adaugă testimonial letric" />
            <FotoGrid items={testimoniale} onDelete={stergeTestimonial} />
          </div>
        )}

      </div>
    </div>
  );
}
