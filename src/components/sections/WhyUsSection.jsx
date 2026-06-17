import { motion } from 'framer-motion';
import { Shield, MapPin, User, Briefcase, HeartHandshake } from 'lucide-react';

const REASONS = [
  { icon: MapPin,         title: 'Local Reverse Mortgage Expert',  description: 'Craig is embedded in your community. He understands local market conditions and provides guidance tailored to your area.' },
  { icon: User,           title: 'Personalized Guidance',          description: 'Every household is unique. We provide clear, plain-English answers to ensure you choose a HECM structure that aligns perfectly with your goals.' },
  { icon: Briefcase,      title: 'Trusted Industry Experience',    description: 'With over two decades of reverse lending focus, we\'ve helped thousands of retirees unlock peaceful paths in retirement.' },
  { icon: HeartHandshake, title: 'Customer-Focused Service',       description: 'Craig is embedded in your community. He understands local market conditions and provides guidance tailored to your area.' },
];

const BADGES = ['HUD Approved Lender', 'NMLS Member', 'FHA Insured Loans', 'Licensed in All 50 States'];

export default function WhyUsSection() {
  return (
    <section id="why-us" style={{ background: '#f9fafb', padding: '40px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#1a4d3a', background: 'rgba(26,77,58,0.07)', padding: '4px 14px', borderRadius: 20, marginBottom: 16 }}>
            Solid Standards &amp; Trust
          </span>
          <h2 style={{ fontFamily: 'Montserrat,sans-serif', fontWeight: 800, fontSize: 'clamp(24px,4vw,40px)', color: '#111827', lineHeight: 1.2, marginBottom: 14 }}>
            Why Hundreds of Senior<br />Families Choose Us
          </h2>
          <p style={{ color: '#6b7280', maxWidth: 560, margin: '0 auto', fontSize: 15, lineHeight: 1.7 }}>
            We understand that your home is your most treasured asset. Our process is designed to protect your privacy, respect your intelligence, and put your safety above all else.
          </p>
        </div>

        {/* Cards grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, marginBottom: 48 }}>
          {REASONS.map(({ icon: Icon, title, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.38, delay: i * 0.08 }}
              style={{
                background: '#fff',
                borderRadius: 12,
                padding: '24px 22px',
                boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                border: '1px solid #f3f4f6',
              }}
            >
              <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(26,77,58,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                <Icon size={19} color="#1a4d3a" strokeWidth={1.8} />
              </div>
              <h3 style={{ fontFamily: 'Montserrat,sans-serif', fontWeight: 700, fontSize: 14.5, color: '#111827', marginBottom: 8 }}>
                {title}
              </h3>
              <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.65 }}>{description}</p>
            </motion.div>
          ))}
        </div>

        {/* Trust badge row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px 28px', paddingTop: 8 }}>
          {BADGES.map(b => (
            <span key={b} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, color: '#6b7280' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#1a4d3a', flexShrink: 0 }} />
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
