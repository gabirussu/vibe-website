'use client';

import { useEffect, useState } from 'react';

type Thought = { id: number; text: string; creat_la: string; };

function timeAgo(dateStr: string) {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (diff < 60) return 'chiar acum';
  if (diff < 3600) return `acum ${Math.floor(diff / 60)} min`;
  if (diff < 86400) return `acum ${Math.floor(diff / 3600)} ore`;
  if (diff < 172800) return 'ieri';
  return `acum ${Math.floor(diff / 86400)} zile`;
}

const PER_PAGE = 12;

export default function GanduriPage() {
  const [thoughts, setThoughts] = useState<Thought[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/gand?limit=${PER_PAGE}&offset=${page * PER_PAGE}`)
      .then(r => r.json())
      .then(res => {
        if (res.data) { setThoughts(res.data); setTotal(res.total || 0); }
        setLoading(false);
      });
  }, [page]);

  const totalPages = Math.ceil(total / PER_PAGE);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #ffffff, #d6d3d1, #78716c)', padding: '3rem 1.5rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>

        {/* HEADER */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <a href="/#feedback" style={{ fontFamily: 'var(--font-cinzel)', fontSize: '12px', color: '#78716c', textDecoration: 'none', letterSpacing: '0.1em' }}>
            ← Înapoi
          </a>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', fontWeight: 700, color: '#1c1917', marginTop: '1rem' }}>
            Toate gândurile
          </h1>
          <p style={{ fontFamily: 'var(--font-italiana)', color: '#78716c', fontSize: '1.1rem', fontStyle: 'italic', marginTop: '0.5rem' }}>
            {total} gânduri lăsate aici
          </p>
        </div>

        {/* GÂNDURI */}
        {loading ? (
          <p style={{ textAlign: 'center', color: '#78716c', fontFamily: 'var(--font-inter)' }}>Se încarcă...</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {thoughts.map(t => (
              <div
                key={t.id}
                style={{
                  background: 'rgba(255,255,255,0.75)',
                  borderRadius: '1.5rem',
                  padding: '1.5rem 2rem',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                }}
              >
                <p style={{ fontFamily: 'var(--font-italiana)', fontSize: '1.1rem', color: '#1c1917', lineHeight: 1.7, fontStyle: 'italic' }}>
                  "{t.text}"
                </p>
                <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.8rem', color: '#a8a29e', marginTop: '0.75rem' }}>
                  {timeAgo(t.creat_la)}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* PAGINARE */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => setPage(p => Math.max(0, p - 1))}
              disabled={page === 0}
              style={{ padding: '0.5rem 1.25rem', borderRadius: '999px', border: 'none', cursor: 'pointer', background: page === 0 ? '#e7e5e4' : 'linear-gradient(135deg, #78716c, #44403c)', color: page === 0 ? '#a8a29e' : 'white', fontFamily: 'var(--font-cinzel)', fontSize: '12px' }}
            >
              ← Anterior
            </button>
            <span style={{ fontFamily: 'var(--font-inter)', color: '#78716c', padding: '0.5rem 1rem', alignSelf: 'center' }}>
              {page + 1} / {totalPages}
            </span>
            <button
              onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              style={{ padding: '0.5rem 1.25rem', borderRadius: '999px', border: 'none', cursor: 'pointer', background: page === totalPages - 1 ? '#e7e5e4' : 'linear-gradient(135deg, #78716c, #44403c)', color: page === totalPages - 1 ? '#a8a29e' : 'white', fontFamily: 'var(--font-cinzel)', fontSize: '12px' }}
            >
              Următor →
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
