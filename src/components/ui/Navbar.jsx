import { useState, useEffect } from 'react';
import { Menu, X, Phone, ArrowRight } from 'lucide-react';

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
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        // Next-gen high-fidelity premium glassmorphism
        background: scrolled ? 'rgba(255, 255, 255, 0.75)' : 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: scrolled ? '1px solid rgba(26, 77, 58, 0.08)' : '1px solid rgba(0, 0, 0, 0.03)',
        boxShadow: scrolled ? '0 12px 40px -12px rgba(15, 46, 34, 0.12)' : '0 4px 20px -5px rgba(0, 0, 0, 0.02)',
        height: scrolled ? 68 : 84, // Compact fluid transition scale
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <div style={{ width: '100%', maxWidth: 1240, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo container */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <a 
              href="#" 
              aria-label="Power Play Mortgage Home"
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                textDecoration: 'none',
                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <img 
                src="/logo.png" 
                alt="Power Play Mortgage Logo" 
                style={{ 
                  height: scrolled ? '44px' : '62px',
                  width: 'auto', 
                  objectFit: 'contain',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  filter: 'drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.03))'
                }} 
              />
            </a>
          </div>

          {/* Desktop Nav Links (Advanced futuristic capsule layout) */}
          <nav style={{ display: 'none' }} className="lg-nav">
            <div style={{ 
              display: 'flex', 
              background: scrolled ? 'rgba(26, 77, 58, 0.03)' : 'rgba(0, 0, 0, 0.02)',
              padding: '6px',
              borderRadius: '30px',
              border: '1px solid rgba(26, 77, 58, 0.04)',
              transition: 'all 0.3s'
            }}>
              {NAV_LINKS.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  style={{
                    fontSize: 13.5,
                    fontWeight: 600,
                    color: '#374151',
                    textDecoration: 'none',
                    padding: '8px 18px',
                    borderRadius: '20px',
                    letterSpacing: '-0.01em',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  className="nav-item-capsule"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>

          {/* Action CTA Block */}
          <div style={{ display: 'none' }} className="lg-cta">
            <a
              href="tel:+18183261915"
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 6, 
                color: '#1a4d3a', 
                fontWeight: 600, 
                fontSize: 13.5, 
                textDecoration: 'none',
                padding: '8px 14px',
                borderRadius: '12px',
                transition: 'all 0.3s'
              }}
              className="phone-hover-link"
            >
              <Phone size={13} strokeWidth={2.5} />
              (818) 326-1915
            </a>
            <a
              href="#calculator"
              style={{
                background: 'linear-gradient(135deg, #164232 0%, #0b2219 100%)',
                color: '#fff',
                padding: scrolled ? '10px 22px' : '12px 26px',
                borderRadius: '14px',
                fontSize: 13.5,
                fontWeight: 600,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                boxShadow: scrolled ? '0 8px 20px -4px rgba(26, 77, 58, 0.3)' : '0 4px 14px rgba(26, 77, 58, 0.2)',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              className="cta-button-glow"
            >
              Get Quote
              <ArrowRight size={14} className="arrow-icon" style={{ transition: 'transform 0.3s' }} />
            </a>
          </div>

          {/* Hamburger Menu Toggle Button */}
          <button
            onClick={() => setOpen(!open)}
            className="mobile-menu-btn"
            style={{ 
              background: 'rgba(26, 77, 58, 0.05)', 
              border: 'none', 
              cursor: 'pointer', 
              padding: '10px', 
              borderRadius: '12px',
              color: '#1a4d3a',
              transition: 'all 0.2s'
            }}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Glass Dropdown Drawer */}
      <div
        style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          overflow: 'hidden',
          maxHeight: open ? 420 : 0,
          transition: 'max-height .45s cubic-bezier(0.16, 1, 0.3, 1)',
          background: 'rgba(255, 255, 255, 0.96)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: open ? '1px solid rgba(26, 77, 58, 0.08)' : 'none',
          boxShadow: '0 30px 60px -15px rgba(15, 46, 34, 0.15)'
        }}
      >
        <div style={{ padding: '12px 24px 28px' }}>
          {NAV_LINKS.map(link => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{ display: 'block', padding: '14px 4px', color: '#374151', fontWeight: 600, fontSize: 14.5, textDecoration: 'none', borderBottom: '1px solid rgba(0,0,0,0.03)' }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="tel:+18183261915"
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '16px 4px', color: '#1a4d3a', fontWeight: 700, fontSize: 14.5, textDecoration: 'none' }}
          >
            <Phone size={14} /> (818) 326-1915
          </a>
          <a
            href="#calculator"
            onClick={() => setOpen(false)}
            style={{ display: 'block', marginTop: 12, background: 'linear-gradient(135deg, #1a4d3a 0%, #0f2e22 100%)', color: '#fff', textAlign: 'center', padding: '14px', borderRadius: '12px', fontWeight: 600, fontSize: 14, textDecoration: 'none', boxShadow: '0 4px 14px rgba(26, 77, 58, 0.2)' }}
          >
            Get Free Quote
          </a>
        </div>
      </div>

      {/* Global CSS Injectors & Structural Adjustments */}
      <style>{`
        /* 1. ULTIMATE RESOLUTION FOR CUTOFF ISSUES */
        html {
          scroll-behavior: smooth;
        }

        /* Targets every ID target area dynamically across your landing page layout */
        #how-it-works, #specialist, #why-us, #calculator, [id] {
          scroll-margin-top: 110px !important; /* Forces layout spacing engine to leave safe header padding */
        }

        /* 2. MODERN ADVANCED INTERACTION ANIMATIONS */
        .nav-item-capsule:hover {
          color: #fff !important;
          background: #1a4d3a !important;
          box-shadow: 0 4px 12px rgba(26, 77, 58, 0.15);
        }

        .phone-hover-link:hover {
          background: rgba(26, 77, 58, 0.06);
          color: #113326 !important;
        }

        .cta-button-glow:hover {
          transform: translateY(-2px);
          background: linear-gradient(135deg, #1e5742 0%, #133a2b 100%) !important;
          box-shadow: 0 8px 24px rgba(26, 77, 58, 0.35) !important;
        }

        .cta-button-glow:hover .arrow-icon {
          transform: translateX(4px);
        }

        @media (min-width: 1024px) {
          .lg-nav { display: flex !important; }
          .lg-cta { display: flex !important; align-items: center; gap: 16px; }
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
    </header>
  );
}