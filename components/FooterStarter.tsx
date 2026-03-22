'use client';

export default function FooterStarter() {
  return (
    <footer style={{ background: 'linear-gradient(to bottom right, #44403c, #1c1917)' }}>

      {/* CONȚINUT PRINCIPAL */}
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* COLOANA 1 — CONTACT + WHATSAPP */}
        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-semibold text-[#F5E6C8] uppercase tracking-widest" style={{ fontFamily: 'var(--font-cinzel)' }}>
            Contact
          </h4>
          <p className="text-[#9CA3AF] font-light" style={{ fontFamily: 'var(--font-inter)' }}>+40 748 123 456</p>
          <a
            href="https://wa.me/40748123456"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg w-fit mt-1"
            style={{ background: 'transparent', fontFamily: 'var(--font-inter)', fontSize: '14px', color: '#9CA3AF', fontWeight: 300 }}
          >
            <span className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: '#25D366' }}>
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </span>
            Scrie-ne pe WhatsApp
          </a>
        </div>

        {/* COLOANA 2 — ORAR + ÎNAPOI SUS */}
        <div className="flex flex-col gap-3 items-start md:items-center">
          <h4 className="text-sm font-semibold text-[#F5E6C8] uppercase tracking-widest" style={{ fontFamily: 'var(--font-cinzel)' }}>
            Program
          </h4>
          <p className="text-[#9CA3AF] font-light" style={{ fontFamily: 'var(--font-inter)' }}>Lun – Vin: 07:00 – 21:00</p>
          <p className="text-[#9CA3AF] font-light" style={{ fontFamily: 'var(--font-inter)' }}>Sâm – Dum: 08:00 – 22:00</p>
          <a
            href="#"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-2xl text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg mt-2"
            style={{ background: 'linear-gradient(135deg, #78716c, #44403c)', fontFamily: 'var(--font-cinzel)', fontSize: '13px' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'linear-gradient(135deg, #44403c, #1c1917)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'linear-gradient(135deg, #78716c, #44403c)')}
          >
            ↑ Respiră. Savurează. Reîncarcă.
          </a>
        </div>

        {/* COLOANA 3 — SOCIAL MEDIA */}
        <div className="flex flex-col gap-4 items-start md:items-end">
          <h4 className="text-sm font-semibold text-[#F5E6C8] uppercase tracking-widest" style={{ fontFamily: 'var(--font-cinzel)' }}>
            Urmărește-ne
          </h4>
          <div className="flex gap-4">
            {/* INSTAGRAM */}
            <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:opacity-90"
              style={{ background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)' }}>
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            {/* FACEBOOK */}
            <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:opacity-90"
              style={{ background: '#1877F2' }}>
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            {/* TIKTOK */}
            <a href="#" aria-label="TikTok" className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:opacity-90"
              style={{ background: '#010101' }}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fill="#69C9D0" d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                <path fill="#EE1D52" d="M16.435 4.19c.57.89 1.4 1.61 2.365 2 .57.26 1.18.42 1.8.5V2.84c-.62-.08-1.23-.24-1.8-.5-.965-.39-1.795-1.11-2.365-2z"/>
              </svg>
            </a>
            {/* THREADS */}
            <a href="#" aria-label="Threads" className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:opacity-90"
              style={{ background: '#101010' }}>
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 192 192">
                <path d="M141.537 88.988a66.667 66.667 0 0 0-2.518-1.143c-1.482-27.307-16.403-42.94-41.457-43.1h-.34c-14.986 0-27.449 6.396-35.12 18.036l13.779 9.452c5.73-8.695 14.724-10.548 21.348-10.548h.229c8.249.053 14.474 2.452 18.503 7.129 2.932 3.405 4.893 8.111 5.864 14.05-7.314-1.243-15.224-1.626-23.68-1.14-23.82 1.371-39.134 15.264-38.105 34.568.522 9.792 5.4 18.216 13.735 23.719 7.047 4.652 16.124 6.927 25.557 6.412 12.458-.683 22.231-5.436 29.049-14.127 5.178-6.6 8.453-15.153 9.899-25.93 5.937 3.583 10.337 8.298 12.767 13.966 4.132 9.635 4.373 25.468-8.546 38.376-11.319 11.308-24.925 16.2-45.488 16.351-22.809-.169-40.07-7.484-51.292-21.741C35.22 139.978 29.811 120.643 29.608 96c.203-24.643 5.612-43.978 16.133-57.516C57.162 24.226 74.423 16.911 97.232 16.742c22.976.17 40.526 7.52 52.171 21.847 5.71 7.026 10.015 15.86 12.853 26.162l16.147-4.308c-3.44-12.68-8.853-23.606-16.219-32.668C147.036 9.607 125.202.195 97.399 0h-.471C69.315.195 47.236 9.643 32.078 28.054 18.535 44.512 11.568 67.682 11.328 96v.6c.24 28.317 7.207 51.487 20.75 67.946 15.158 18.411 37.237 27.859 65.624 28.054h.47c24.827-.173 42.38-6.682 56.655-21.047 18.963-18.915 18.392-42.717 12.157-57.286-4.317-10.064-12.477-18.267-25.447-23.279zm-47.259 40.83c-10.432.572-21.284-4.097-21.82-14.189-.397-7.442 5.277-15.746 22.462-16.735 1.966-.113 3.895-.169 5.79-.169 6.235 0 12.068.606 17.371 1.765-1.978 24.702-13.58 28.713-23.803 29.328z"/>
              </svg>
            </a>
          </div>
        </div>

      </div>

      {/* SEPARATOR */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="border-t border-white/10" />
      </div>

      {/* COPYRIGHT */}
      <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-2">
        <p className="text-[#9CA3AF] font-light text-sm" style={{ fontFamily: 'var(--font-inter)' }}>
          © 2026 Vibe Caffè. Cafea preparată cu suflet.
        </p>
        <p className="text-[#9CA3AF]/50 font-light text-xs" style={{ fontFamily: 'var(--font-inter)' }}>
          Construit cu ☕ și mult drag.
        </p>
      </div>

    </footer>
  );
}
