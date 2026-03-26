'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

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

export default function AdminPage() {
  const [autorizat, setAutorizat] = useState(false);
  const [rezervari, setRezervari] = useState<Rezervare[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtruStatus, setFiltruStatus] = useState('toate');

  useEffect(() => {
    if (sessionStorage.getItem('vc_admin') !== '1') {
      window.location.href = '/';
      return;
    }
    setAutorizat(true);
    fetchRezervari();
  }, []);

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

        {/* FILTRE */}
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

        {/* TABEL */}
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
      </div>
    </div>
  );
}
