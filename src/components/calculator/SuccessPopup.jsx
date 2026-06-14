import { CheckCircle2, Download, RefreshCw, X } from 'lucide-react';
import { formatCurrency } from '../../utils/hecmCalculator';

export default function SuccessPopup({ lead, onReset, onDownload }) {
  const firstName = (lead.fullName || 'Client').split(' ')[0];

  const rows = [
    { label: 'Contact Person',        value: lead.fullName },
    { label: 'Property Address',      value: `${lead.propertyStreetAddress || ''}, ${lead.city || ''}`.trim().replace(/^,\s*/, '') },
    { label: 'Selected Home Value',   value: formatCurrency(lead.estimatedPropertyValue) },
    { label: 'Current Mortgage Debt', value: formatCurrency(lead.currentMortgageBalance) },
    { label: 'Estimated HECM Release',value: formatCurrency(lead.estimatedHecmRelease) },
    { label: 'Joint Co-Signer',       value: lead.hasJointBorrower ? (lead.coBorrowerName || '—') : '—' },
    { label: 'Homeowner Insurance',   value: lead.hasHomeownersInsurance ? 'Yes' : 'No' },
  ];

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)',
      padding: 16,
    }}>
      <div style={{
        background: '#fff',
        borderRadius: 20,
        width: '100%',
        maxWidth: 520,
        maxHeight: '92vh',
        overflowY: 'auto',
        padding: '36px 32px',
        position: 'relative',
        boxShadow: '0 24px 80px rgba(0,0,0,0.2)',
      }}>
        {/* Close */}
        <button onClick={onReset} style={{
          position: 'absolute', top: 16, right: 16,
          background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af',
          padding: 4, borderRadius: 6,
        }}>
          <X size={18} />
        </button>

        {/* Icon */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#1a4d3a', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(26,77,58,0.3)' }}>
            <CheckCircle2 size={38} color="#fff" />
          </div>
        </div>

        {/* Heading */}
        <h2 style={{ fontFamily: 'Montserrat,sans-serif', fontWeight: 800, fontSize: 24, textAlign: 'center', color: '#111827', marginBottom: 10 }}>
          Thank You, {firstName}!
        </h2>
        <p style={{ fontSize: 14, color: '#6b7280', textAlign: 'center', lineHeight: 1.7, marginBottom: 10 }}>
          Your reverse mortgage consultation request has been successfully registered. Craig Daniger is compiling your initial HUD-backed report for your {lead.propertyType || 'property'} based on an appraised valuation of
        </p>
        <p style={{ fontFamily: 'Montserrat,sans-serif', fontWeight: 900, fontSize: 30, color: '#1a4d3a', textAlign: 'center', marginBottom: 24 }}>
          {formatCurrency(lead.estimatedPropertyValue)}
        </p>

        {/* Details card */}
        <div style={{ background: '#f9fafb', borderRadius: 12, padding: '18px 20px', marginBottom: 20 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9ca3af', textAlign: 'center', marginBottom: 16 }}>
            Consultation Details Built
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {rows.map(({ label, value }) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                <span style={{ fontSize: 13, color: '#6b7280', flexShrink: 0 }}>{label}:</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#111827', textAlign: 'right' }}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        <p style={{ fontSize: 13, color: '#1a4d3a', textAlign: 'center', fontWeight: 600, marginBottom: 20 }}>
          Craig Daniger will call you directly at{' '}
          <a href="tel:+18183261915" style={{ color: '#1a4d3a' }}>(818) 326-1915</a>{' '}
          within business hours.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button onClick={onDownload} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            background: '#1a4d3a', color: '#fff', fontWeight: 700, fontSize: 14,
            padding: '13px', borderRadius: 10, border: 'none', cursor: 'pointer',
            transition: 'background .2s', fontFamily: 'Inter,sans-serif',
          }}
            onMouseEnter={e => e.currentTarget.style.background = '#15603a'}
            onMouseLeave={e => e.currentTarget.style.background = '#1a4d3a'}
          >
            <Download size={16} /> Download Reverse Mortgage Guide (PDF)
          </button>
          <button onClick={onReset} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            background: '#fff', color: '#374151', fontWeight: 600, fontSize: 14,
            padding: '12px', borderRadius: 10, border: '1px solid #e5e7eb',
            cursor: 'pointer', transition: 'background .2s', fontFamily: 'Inter,sans-serif',
          }}
            onMouseEnter={e => e.currentTarget.style.background = '#f9fafb'}
            onMouseLeave={e => e.currentTarget.style.background = '#fff'}
          >
            <RefreshCw size={14} /> Submit Another Response
          </button>
        </div>
      </div>
    </div>
  );
}
