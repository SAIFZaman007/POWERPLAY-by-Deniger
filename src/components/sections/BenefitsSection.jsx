import { motion } from 'framer-motion';
import { Home, TrendingDown, DollarSign, PiggyBank } from 'lucide-react';

const BENEFITS = [
  {
    icon: Home,
    title: 'Retain Title & Ownership',
    description: 'You remain the sole owner of your home. You can live in it peacefully as long as you maintain the property, pay property taxes and homeowners insurance.',
  },
  {
    icon: TrendingDown,
    title: 'No Monthly Mortgage Payments',
    description: 'Unlike traditional home equity lines, you make absolutely zero monthly principal or interest payments. The loan has deferred repayment.',
  },
  {
    icon: DollarSign,
    title: 'Supplement Your Income',
    description: 'Tailor the cash flow to your lifestyle. Secure your money as a monthly paycheck, a flexible line of credit, a tax-free lump sum, or a mix.',
  },
  {
    icon: PiggyBank,
    title: 'Planning Tool for Retirement',
    description: 'Act as a strategic hedge against downturns, keep your retirement portfolio, IRA, and investments untouched while using home equity strategically.',
  },
];

export default function BenefitsSection() {
  return (
    <section id="how-it-works" style={{ background: '#fff', padding: '40px 0 60px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span style={{
            display: 'inline-block',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#1a4d3a',
            background: 'rgba(26,77,58,0.07)',
            padding: '4px 14px',
            borderRadius: 20,
            marginBottom: 16,
          }}>
            Accumulate Wealth Peacefully
          </span>
          <h2 style={{ fontFamily: 'Montserrat,sans-serif', fontWeight: 800, fontSize: 'clamp(26px,4vw,42px)', color: '#111827', lineHeight: 1.2, marginBottom: 14 }}>
            Benefits of a Reverse Mortgage
          </h2>
          <p style={{ color: '#6b7280', maxWidth: 560, margin: '0 auto', fontSize: 15, lineHeight: 1.7 }}>
            Designed for homeowners 62 and older, a reverse mortgage turns your home equity into accessible, tax-free funds — with no monthly payments.
          </p>
        </div>

        {/* 4-column grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 40, marginBottom: 48 }}>
          {BENEFITS.map(({ icon: Icon, title, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.09 }}
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <div style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: 'rgba(26,77,58,0.07)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 16,
              }}>
                <Icon size={20} color="#1a4d3a" strokeWidth={1.8} />
              </div>
              <h3 style={{ fontFamily: 'Montserrat,sans-serif', fontWeight: 700, fontSize: 15, color: '#111827', marginBottom: 10 }}>
                {title}
              </h3>
              <p style={{ fontSize: 13.5, color: '#6b7280', lineHeight: 1.65 }}>
                {description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA strip */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
          padding: '18px 28px',
          background: '#f0f7f3',
          borderRadius: 12,
        }}>
          <p style={{ fontSize: 15, color: '#374151', fontWeight: 500 }}>
            Want to see how much equity you qualify to release?
          </p>
          <a
            href="#calculator"
            style={{
              background: '#1a4d3a',
              color: '#fff',
              padding: '10px 22px',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              transition: 'background .2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#15603a'}
            onMouseLeave={e => e.currentTarget.style.background = '#1a4d3a'}
          >
            Estimate Your Equity Now →
          </a>
        </div>
      </div>
    </section>
  );
}
