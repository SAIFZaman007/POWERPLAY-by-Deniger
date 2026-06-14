import { useMemo } from 'react';
import { RefreshCw, Shield } from 'lucide-react';
import { calculateHECM, formatCurrency } from '../../utils/hecmCalculator';

export default function HecmSidebar({ formData }) {
  const age = useMemo(() => {
    if (!formData.dateOfBirth) return 70;
    const dob = new Date(formData.dateOfBirth);
    const today = new Date();
    let a = today.getFullYear() - dob.getFullYear();
    if (today.getMonth() - dob.getMonth() < 0 || (today.getMonth() - dob.getMonth() === 0 && today.getDate() < dob.getDate())) a--;
    return Math.max(62, a);
  }, [formData.dateOfBirth]);

  const calc = useMemo(
    () => calculateHECM(formData.estimatedPropertyValue || 450000, formData.currentMortgageBalance || 0, age),
    [formData.estimatedPropertyValue, formData.currentMortgageBalance, age]
  );

  const rows = [
    { label: 'Selected Home Value',         value: formatCurrency(calc.homeValue),         green: false },
    { label: 'Est. Max Cash Release (HECM)', value: formatCurrency(calc.principalLimit),    green: true },
    { label: 'Current Mortgage Debt',        value: formatCurrency(calc.existingMortgage),  green: true },
    { label: 'Estimated Net Cash Available', value: formatCurrency(calc.netCashAvailable),  green: true },
  ];

  return (
    <div style={{
      background: '#fff',
      borderRadius: 16,
      border: '1px solid #e5e7eb',
      padding: '22px 20px',
      position: 'sticky',
      top: 88,
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18, paddingBottom: 14, borderBottom: '1px solid #f3f4f6' }}>
        <RefreshCw size={14} color="#9ca3af" />
        <span style={{ fontSize: 12.5, color: '#6b7280', fontWeight: 500 }}>Live HECM Estimate Preview</span>
      </div>

      {/* Rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {rows.map(({ label, value, green }) => (
          <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 13, color: '#6b7280' }}>{label}</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: green ? '#1a4d3a' : '#111827' }}>{value}</span>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div style={{ marginTop: 18, background: '#f9fafb', borderRadius: 10, padding: '12px 14px', display: 'flex', gap: 10 }}>
        <Shield size={14} color="#9ca3af" style={{ flexShrink: 0, marginTop: 2 }} />
        <p style={{ fontSize: 11.5, color: '#6b7280', lineHeight: 1.6, margin: 0 }}>
          <strong style={{ color: '#374151' }}>HUD Insured &amp; Protected:</strong> Your estimate does not consitute an offer. Official figures require legal HUD counseling and official home appraisal.
        </p>
      </div>
    </div>
  );
}
