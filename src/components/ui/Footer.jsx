import { useState } from 'react';
import { Phone, Mail, Shield } from 'lucide-react';

const QUICK_LINKS = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Our Specialist', href: '#specialist' },
  { label: 'Why Choose Us', href: '#why-us' },
  { label: 'Free Quote', href: '#calculator' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) { setSent(true); setEmail(''); }
  };

  return (
    <footer style={{ background: '#0f2e22', color: '#fff' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 24px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40, marginBottom: 48 }}>

          {/* Brand column */}
          <div style={{ gridColumn: 'span 2' }}>
            <img src="/logo.png" alt="Power Play Mortgage" style={{ height: 44, width: 'auto', marginBottom: 16, filter: 'brightness(0) invert(1)' }} />
            <p style={{ fontSize: 13.5, color: '#9ca3af', lineHeight: 1.7, maxWidth: 320, marginBottom: 20 }}>
              Powerplay Mortgage is a premier independent reverse mortgage consulting platform. We bridge senior homeowners with government-insured HUD products, certified agents, and personalized educational advice.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <a href="tel:+18183261915" style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#9ca3af', fontSize: 13.5, textDecoration: 'none', transition: 'color .2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = '#9ca3af'}
              >
                <Phone size={14} /> (818) 326-1915
              </a>
              <a href="mailto:craig.daniger@loanfactory.com" style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#9ca3af', fontSize: 13.5, textDecoration: 'none', transition: 'color .2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = '#9ca3af'}
              >
                <Mail size={14} /> craig.daniger@loanfactory.com
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6b7280', marginBottom: 16 }}>Quick Links</h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {QUICK_LINKS.map(l => (
                <li key={l.label}>
                  <a href={l.href} style={{ fontSize: 13.5, color: '#9ca3af', textDecoration: 'none', transition: 'color .2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                    onMouseLeave={e => e.currentTarget.style.color = '#9ca3af'}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Stay Informed / Newsletter */}
          <div>
            <h3 style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6b7280', marginBottom: 16 }}>Stay Informed</h3>
            <p style={{ fontSize: 13, color: '#9ca3af', lineHeight: 1.6, marginBottom: 14 }}>
              Get free reverse mortgage education delivered to your inbox.
            </p>
            {sent ? (
              <p style={{ fontSize: 13, color: '#4ade80', fontWeight: 600 }}>✓ Subscribed! Thank you.</p>
            ) : (
              <form onSubmit={handleSubscribe}>
                <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Your Email Id"
                    style={{ flex: 1, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 7, padding: '10px 12px', fontSize: 13, color: '#fff', outline: 'none', fontFamily: 'Inter,sans-serif' }}
                  />
                  <button type="submit" style={{ background: '#1a4d3a', color: '#fff', border: 'none', borderRadius: 7, padding: '10px 15px', fontSize: 13, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'Inter,sans-serif' }}>
                    Subscribe
                  </button>
                </div>
                <p style={{ fontSize: 11, color: '#6b7280', display: 'flex', alignItems: 'center', gap: 5, margin: 0 }}>
                  <Shield size={10} /> Your email is safe with us, we don't spam. Privacy Policy
                </p>
              </form>
            )}

            {/* HUD Equal Housing badge */}
            <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, padding: '8px 12px', textAlign: 'center' }}>
                <p style={{ fontSize: 9, fontWeight: 700, color: '#fff', letterSpacing: '0.06em', lineHeight: 1.3, margin: 0 }}>EQUAL HOUSING<br />LENDER</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 24, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 20px' }}>
            {['HUD Approved Lender', 'NMLS Member', 'BBB Accredited A+', 'FHA Insured Loans', 'Licensed in All 50 States'].map(b => (
              <span key={b} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#6b7280' }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#1a4d3a', flexShrink: 0 }} />
                {b}
              </span>
            ))}
          </div>
          <p style={{ fontSize: 12, color: '#6b7280', margin: 0 }}>
            © {new Date().getFullYear()} Powerplay Mortgage. All Rights Reserved.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          footer > div > div:first-child { grid-template-columns: 1fr !important; }
          footer > div > div:first-child > div:first-child { grid-column: span 1 !important; }
        }
      `}</style>
    </footer>
  );
}
