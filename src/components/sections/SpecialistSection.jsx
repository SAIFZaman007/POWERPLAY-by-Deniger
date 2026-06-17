import { motion } from 'framer-motion';
import { Phone, CheckCircle2 } from 'lucide-react';

const CREDENTIALS = [
  '20+ Years of Reverse Mortgage Experience',
  'Federally Licensed HUD / FHA HECM Specialist',
  'Personalized, No-Pressure Consultations',
  'Hundreds of Families Served Across the U.S.',
];

export default function SpecialistSection() {
  return (
    <section id="specialist" style={{ background: '#fff', padding: '0px 0px 40px 0px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 64,
          alignItems: 'center',
        }}>

          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ position: 'relative' }}
          >
            <div style={{  position: 'relative', maxWidth: 340, borderRadius: 16, overflow: 'hidden', boxShadow: '0 12px 48px rgba(0,0,0,0.18)' }}>
              <img
                src="/craig-daniger.png"
                alt="Craig Daniger — HECM Expert"
                style={{ width: '100%', display: 'block', objectFit: 'cover' }}
              />
              {/* Badge overlay */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'rgba(255,255,255,0.96)',
                padding: '10px 16px',
                borderTop: '1px solid #f3f4f6',
              }}>
                <p style={{ fontSize: 11, color: '#6b7280', fontWeight: 500, margin: 0 }}>Federally Licensed Specialist</p>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#1a4d3a', margin: 0 }}>Craig Daniger — HECM Expert</p>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span style={{
              display: 'inline-block',
              fontSize: 11, fontWeight: 700, letterSpacing: '0.12em',
              textTransform: 'uppercase', color: '#1a4d3a',
              background: 'rgba(26,77,58,0.07)',
              padding: '4px 14px', borderRadius: 20, marginBottom: 16,
            }}>
              Accumulate Wealth Peacefully
            </span>

            <h2 style={{ fontFamily: 'Montserrat,sans-serif', fontWeight: 800, fontSize: 'clamp(24px,3.5vw,38px)', color: '#111827', lineHeight: 1.2, marginBottom: 16 }}>
              Trusted Guidance from a True Expert
            </h2>

            <p style={{ fontSize: 15, color: '#6b7280', lineHeight: 1.75, marginBottom: 28 }}>
              With over 30 years of experience in reverse mortgage lending, Craig Daniger has helped hundreds of senior homeowners access the equity in their homes — turning it into financial freedom and peace of mind.
            </p>

            <ul style={{ listStyle: 'none', padding: 0, marginBottom: 32, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {CREDENTIALS.map(cred => (
                <li key={cred} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <CheckCircle2 size={17} color="#1a4d3a" style={{ marginTop: 2, flexShrink: 0 }} />
                  <span style={{ fontSize: 14, color: '#374151' }}>{cred}</span>
                </li>
              ))}
            </ul>

            <a
              href="tel:+18183261915"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                background: '#1a4d3a',
                color: '#fff',
                fontWeight: 700,
                fontSize: 15,
                padding: '14px 28px',
                borderRadius: 10,
                textDecoration: 'none',
                boxShadow: '0 4px 16px rgba(26,77,58,0.25)',
                transition: 'background .2s, transform .15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#15603a'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#1a4d3a'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <Phone size={18} strokeWidth={2.5} />
              Call Craig Direct — (818) 326-1915
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
