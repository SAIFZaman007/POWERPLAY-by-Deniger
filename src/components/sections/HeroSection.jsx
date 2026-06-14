import { motion } from 'framer-motion';
import { Phone, CalendarDays } from 'lucide-react';

export default function HeroSection() {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        paddingTop: 68,
      }}
    >
      {/* Full-bleed background image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/hero-house.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center right',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Left-side dark gradient overlay — matches Figma purple-navy fade */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(105deg, rgba(22,20,50,0.92) 0%, rgba(22,20,50,0.82) 38%, rgba(22,20,50,0.45) 62%, rgba(22,20,50,0.05) 100%)',
        }}
      />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 1200, margin: '0 auto', padding: '60px 24px' }}>
        <div style={{ maxWidth: 580 }}>

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: 24,
              padding: '5px 14px',
              marginBottom: 20,
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#d4a843', display: 'inline-block' }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: '#fff', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'Inter,sans-serif' }}>
              Accumulate Wealth Peacefully
            </span>
          </motion.div>

          {/* Headline — matches Figma exactly */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(36px, 5.5vw, 68px)',
              lineHeight: 1.08,
              color: '#ffffff',
              marginBottom: 8,
            }}
          >
            Unlock Your
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.17 }}
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(36px, 5.5vw, 68px)',
              lineHeight: 1.08,
              color: '#d4a843',
              marginBottom: 24,
            }}
          >
            Home's Equity
          </motion.h1>

          {/* Body */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            style={{ fontSize: 16, color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, marginBottom: 36, maxWidth: 480 }}
          >
            Access critical tax-free cash while maintaining complete, <strong style={{ color: '#fff' }}>full ownership</strong> of your home. Realize your financial potential today with a custom-designed Reverse Mortgage program.
          </motion.p>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.33 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 48 }}
          >
            <a
              href="tel:+18183261915"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: '#fff',
                color: '#1a4d3a',
                fontWeight: 700,
                fontSize: 15,
                padding: '13px 28px',
                borderRadius: 8,
                textDecoration: 'none',
                boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
                transition: 'transform .15s',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <Phone size={17} strokeWidth={2.5} />
              Call Now
            </a>
            <a
              href="#calculator"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: '#1a4d3a',
                color: '#fff',
                fontWeight: 700,
                fontSize: 15,
                padding: '13px 28px',
                borderRadius: 8,
                textDecoration: 'none',
                border: '1px solid rgba(255,255,255,0.25)',
                transition: 'transform .15s, background .2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#15603a'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#1a4d3a'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <CalendarDays size={17} strokeWidth={2} />
              Get Free Consultation
            </a>
          </motion.div>

          {/* Stats row — matches Figma */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.42 }}
            style={{ display: 'flex', gap: 36, flexWrap: 'wrap' }}
          >
            {[
              { value: '20+', label: 'Years Experience' },
              { value: '500+', label: 'Families Helped' },
              { value: 'A+', label: 'BBB Rating' },
            ].map(({ value, label }) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{ fontFamily: 'Montserrat,sans-serif', fontWeight: 900, fontSize: 28, color: '#fff', lineHeight: 1 }}>
                  {value}
                </span>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.06em' }}>Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
          style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(255,255,255,0.5)' }}
        />
      </div>
    </section>
  );
}
