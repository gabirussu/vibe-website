'use client';

import { useState, useEffect } from 'react';
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation';

const menuData = {
  Espresso: [
    { name: 'Espresso', price: 12, description: 'Shot dublu intens, extras lent pentru o aromă concentrată și echilibrată.', image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=800&auto=format&fit=crop' },
    { name: 'Americano', price: 14, description: 'Espresso alungit cu apă caldă — simplu, curat, reconfortant.', image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=800&auto=format&fit=crop' },
    { name: 'Cappuccino', price: 16, description: 'Espresso cu lapte spumat cremos, echilibru perfect între intensitate și moliciune.', image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=800&auto=format&fit=crop' },
    { name: 'Flat White', price: 17, description: 'Dublă doză de espresso cu lapte microfăcut — pentru iubitorii de cafea serioasă.', image: 'https://images.unsplash.com/photo-1611564494260-6f21b80af7ea?q=80&w=800&auto=format&fit=crop' },
    { name: 'Macchiato', price: 13, description: 'Espresso „pătat" cu o picătură de lapte spumat. Mic, dar cu caracter.', image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?q=80&w=800&auto=format&fit=crop' },
    { name: 'Lungo', price: 13, description: 'Extracție lungă, aromă mai blândă, corp plin. Ideal dimineața.', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop' },
  ],
  Specialty: [
    { name: 'Pour Over', price: 22, description: 'Preparare manuală lentă — fiecare notă de aromă iese la suprafață.', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop' },
    { name: 'AeroPress', price: 20, description: 'Metodă modernă, presiune controlată, gust curat și vibrant.', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop' },
    { name: 'Cold Drip', price: 24, description: 'Picurare la rece timp de ore întregi. Rezultat: o cafea bogată și fără aciditate.', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=800&auto=format&fit=crop' },
    { name: 'Chemex', price: 22, description: 'Filtru de hârtie gros, claritate maximă a aromelor. O experiență vizuală și gustativă.', image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=800&auto=format&fit=crop' },
    { name: 'Syphon', price: 26, description: 'Cafeaua pregătită prin vacuum. Spectacol la masă, gust de neuitat.', image: 'https://images.unsplash.com/photo-1521302080334-4bebac2763a6?q=80&w=800&auto=format&fit=crop' },
    { name: 'Turkish Coffee', price: 15, description: 'Preparată tradițional în ibric, cu cardamom și o cremă fină la suprafață. Un ritual în fiecare ceașcă.', image: 'https://images.unsplash.com/photo-1669809374019-9a9d02b0e10d?q=80&w=800&auto=format&fit=crop' },
  ],
  'Cold Brew': [
    { name: 'Classic Cold Brew', price: 18, description: 'Macerat 18 ore la rece. Intens, neted, fără amăreală.', image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=800&auto=format&fit=crop' },
    { name: 'Cold Brew cu Lapte', price: 20, description: 'Cold brew clasic cu lapte rece — racoritor și cremos în același timp.', image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=800&auto=format&fit=crop' },
    { name: 'Nitro Cold Brew', price: 22, description: 'Infuzat cu azot. Textură catifelată, spumă naturală, zero zahăr.', image: 'https://images.unsplash.com/photo-1644764399224-f7d18b1e8d1c?q=80&w=800&auto=format&fit=crop' },
    { name: 'Cold Brew Tonic', price: 21, description: 'Cold brew peste apă tonică și gheață. Surprinzător de bun.', image: 'https://images.unsplash.com/photo-1667064371242-19c2e7b9cb63?q=80&w=800&auto=format&fit=crop' },
    { name: 'Iced Latte', price: 19, description: 'Espresso, gheață, lapte rece. Clasicul verii.', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=800&auto=format&fit=crop' },
    { name: 'Cold Brew Vanilla', price: 21, description: 'Cold brew clasic cu sirop de vanilie și lapte de migdale. Dulce, rece și reconfortant.', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=800&auto=format&fit=crop' },
  ],
  Patiserie: [
    { name: 'Croissant cu Unt', price: 12, description: 'Crocant la exterior, pufos la interior. Copt în fiecare dimineață.', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=800&auto=format&fit=crop' },
    { name: 'Pain au Chocolat', price: 14, description: 'Foietaj delicat cu ciocolată neagră belgiană în interior.', image: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?q=80&w=800&auto=format&fit=crop' },
    { name: 'Banana Bread', price: 13, description: 'Umed, dens, cu nuanțe de scorțișoară. Rețetă de casă.', image: 'https://images.unsplash.com/photo-1569762404472-026308ba6b64?q=80&w=800&auto=format&fit=crop' },
    { name: 'Cheesecake New York', price: 18, description: 'Cremos, cu bază de biscuiți și sos de fructe de pădure.', image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=800&auto=format&fit=crop' },
    { name: 'Tiramisu', price: 17, description: 'Clasicul italian cu espresso, mascarpone și pudră de cacao.', image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=800&auto=format&fit=crop' },
    { name: 'Cookie cu Ciocolată', price: 9, description: 'Crocant pe margini, moale în centru. Copt la comandă.', image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=800&auto=format&fit=crop' },
  ],
};

type Category = keyof typeof menuData;
const categories = Object.keys(menuData) as Category[];

export default function Menu() {
  const [activeTab, setActiveTab] = useState<Category>('Espresso');
  const [fadeIn, setFadeIn] = useState(true);

  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { elementRef: tabsRef, isVisible: tabsVisible } = useScrollAnimation();
  const { elementRef: gridRef, isVisible: gridVisible } = useScrollAnimation();

  useEffect(() => {
    const cat = new URLSearchParams(window.location.search).get('cat');
    if (cat === 'Specialty') setActiveTab('Specialty');
    else if (cat === 'Patiserie') setActiveTab('Patiserie');
  }, []);

  const handleTabChange = (cat: Category) => {
    if (cat === activeTab) return;
    setFadeIn(false);
    setTimeout(() => {
      setActiveTab(cat);
      setFadeIn(true);
    }, 200);
  };

  return (
    <section id="menu" className="py-20 px-6" style={{ background: 'linear-gradient(to bottom right, #ffffff, #d6d3d1, #78716c)' }}>
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
            Meniul nostru
          </h2>
          <p className="text-xl text-gray-500 italic" style={{ fontFamily: 'var(--font-italiana)' }}>
            Preparate cu grijă, servite cu drag.
          </p>
        </div>

        {/* TAB-URI CATEGORII */}
        <div
          ref={tabsRef}
          className="flex flex-wrap justify-center gap-3 mb-12"
          style={{
            opacity: tabsVisible ? 1 : 0,
            transform: tabsVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 600ms ease-out, transform 600ms ease-out',
            transitionDelay: '0.2s',
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleTabChange(cat)}
              className="px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300"
              style={{
                fontFamily: 'var(--font-cinzel)',
                background: activeTab === cat ? 'linear-gradient(135deg, #78716c, #44403c)' : 'linear-gradient(135deg, #d6d3d1, #a8a29e)',
                color: activeTab === cat ? '#ffffff' : '#6b7280',
                border: activeTab === cat ? '2px solid transparent' : '2px solid #d6d3d1',
                boxShadow: activeTab === cat ? '0 4px 15px rgba(120, 113, 108, 0.4)' : 'none',
                transform: activeTab === cat ? 'scale(1.05)' : 'scale(1)',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* GRID PRODUSE */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          style={{
            opacity: gridVisible ? (fadeIn ? 1 : 0) : 0,
            transform: gridVisible ? (fadeIn ? 'translateY(0)' : 'translateY(10px)') : 'translateY(40px)',
            transition: gridVisible
              ? 'opacity 300ms ease-out, transform 300ms ease-out'
              : 'opacity 800ms ease-out, transform 800ms ease-out',
            transitionDelay: gridVisible ? '0s' : '0.4s',
          }}
        >
          {menuData[activeTab].map((produs) => (
            <div
              key={produs.name}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-amber-200 hover:shadow-xl hover:shadow-amber-100/60 transition-all duration-300 cursor-default group"
              style={{ transform: 'scale(1)', transition: 'transform 300ms ease, box-shadow 300ms ease, border-color 300ms ease' }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.02)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            >
              {/* IMAGINE */}
              <div className="w-full overflow-hidden" style={{ aspectRatio: '3/1' }}>
                <img
                  src={produs.image}
                  alt={produs.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* CONȚINUT */}
              <div className="p-2.5">
                <div className="flex justify-between items-start mb-0.5">
                  <h3 className="font-bold text-gray-900" style={{ fontFamily: 'var(--font-heading)', fontSize: '20px' }}>
                    {produs.name}
                  </h3>
                  <span
                    className="text-base font-semibold whitespace-nowrap ml-2"
                    style={{ fontFamily: 'var(--font-cinzel)', color: '#ea580c' }}
                  >
                    {produs.price} RON
                  </span>
                </div>
                <p className="text-gray-500 font-light leading-relaxed" style={{ fontFamily: 'var(--font-inter)', fontSize: '11px' }}>
                  {produs.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* SĂGEATĂ SCROLL */}
      <a href="#locatie" className="flex justify-center mt-12 animate-bounce">
        <svg className="w-7 h-7" style={{ color: '#44403c' }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </a>
    </section>
  );
}
