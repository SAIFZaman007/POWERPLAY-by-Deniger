import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';

const NAV_LINKS = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Our Specialist', href: '#specialist' },
  { label: 'Why Choose Us', href: '#why-us' },
  { label: 'Free Quote', href: '#calculator' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: '#fff',
        boxShadow: scrolled ? '0 2px 12px rgba(0,0,0,0.08)' : '0 1px 0 #e5e7eb',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>

          {/* Logo + subtitle */}
          <div 
  style={{ 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    height: '100%', 
    minHeight: '80px', // Matches standard header height safely
    padding: '0 16px'
  }}
>
  <a 
    href="#" 
    aria-label="Power Play Mortgage Home"
    style={{ 
      display: 'inline-flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      textDecoration: 'none',
      transition: 'transform 0.2s ease-in-out'
    }}
    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
  >
    {/* Logo Image - Optimized & Resized */}
    <img 
      src="/logo.png" 
      alt="Power Play Mortgage Logo" 
      style={{ 
        height: '60px',       // Larger presentation as requested
        width: 'auto',        // Maintains aspect ratio, preventing squishing
        maxHeight: '100%',
        objectFit: 'contain',
        filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.08))' // Highlights and pops against white background
      }} 
    />
  </a>
</div>

          {/* Desktop nav links */}
          <nav style={{ display: 'none' }} className="lg-nav">
            {NAV_LINKS.map(link => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: '#374151',
                  textDecoration: 'none',
                  padding: '4px 2px',
                  borderBottom: '2px solid transparent',
                  transition: 'color .2s, border-color .2s',
                }}
                onMouseEnter={e => { e.target.style.color = '#1a4d3a'; e.target.style.borderBottomColor = '#1a4d3a'; }}
                onMouseLeave={e => { e.target.style.color = '#374151'; e.target.style.borderBottomColor = 'transparent'; }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Phone + CTA */}
          <div style={{ display: 'none' }} className="lg-cta">
            <a
              href="tel:+18183261915"
              style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#1a4d3a', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}
            >
              <Phone size={15} strokeWidth={2.5} />
              (818) 326-1915
            </a>
            <a
              href="#calculator"
              style={{
                background: '#1a4d3a',
                color: '#fff',
                padding: '9px 20px',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                transition: 'background .2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#15603a'}
              onMouseLeave={e => e.currentTarget.style.background = '#1a4d3a'}
            >
              Get Quote →
            </a>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="mobile-menu-btn"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, color: '#374151' }}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div
        style={{
          overflow: 'hidden',
          maxHeight: open ? 400 : 0,
          transition: 'max-height .3s ease',
          background: '#fff',
          borderTop: '1px solid #f3f4f6',
        }}
      >
        <div style={{ padding: '12px 24px 20px' }}>
          {NAV_LINKS.map(link => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{ display: 'block', padding: '10px 0', color: '#374151', fontWeight: 500, fontSize: 15, textDecoration: 'none', borderBottom: '1px solid #f3f4f6' }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="tel:+18183261915"
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 0', color: '#1a4d3a', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}
          >
            <Phone size={15} /> (818) 326-1915
          </a>
          <a
            href="#calculator"
            onClick={() => setOpen(false)}
            style={{ display: 'block', marginTop: 12, background: '#1a4d3a', color: '#fff', textAlign: 'center', padding: '12px', borderRadius: 8, fontWeight: 600, fontSize: 14, textDecoration: 'none' }}
          >
            Get Free Quote
          </a>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .lg-nav { display: flex !important; align-items: center; gap: 32px; }
          .lg-cta { display: flex !important; align-items: center; gap: 20px; }
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
    </header>
  );
}
