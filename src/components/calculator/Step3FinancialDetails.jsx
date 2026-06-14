import { useState, useMemo } from 'react';
import { ChevronLeft, Send, Calendar } from 'lucide-react';
import { formatCurrency, calculateHECM } from '../../utils/hecmCalculator';

const MIN_HOME   = 100000;
const MAX_HOME   = 2000000;
const MIN_LOAN   = 20000;

function Slider({ label, value, min, max, step = 5000, onChange, formatVal, left, mid, right }) {
  const pct = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  return (
    <div style={{ marginBottom: 22 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
        <span style={{ fontSize: 13.5, fontWeight: 600, color: '#374151' }}>{label}</span>
        <span style={{ fontSize: 15, fontWeight: 700, color: '#1a4d3a' }}>{formatVal(value)}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{
          width: '100%',
          background: `linear-gradient(to right, #1a4d3a 0%, #1a4d3a ${pct}%, #e5e7eb ${pct}%, #e5e7eb 100%)`,
        }}
      />
      {(left || mid || right) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
          <span style={{ fontSize: 10.5, color: '#9ca3af' }}>{left}</span>
          {mid && <span style={{ fontSize: 10.5, color: '#9ca3af' }}>{mid}</span>}
          <span style={{ fontSize: 10.5, color: '#9ca3af' }}>{right}</span>
        </div>
      )}
    </div>
  );
}

function YesNo({ value, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 10 }}>
      {[true, false].map(v => (
        <button
          key={String(v)}
          type="button"
          onClick={() => onChange(v)}
          style={{
            padding: '8px 24px', borderRadius: 8, fontSize: 13.5, fontWeight: 600,
            border: '1px solid',
            borderColor: value === v ? '#1a4d3a' : '#e5e7eb',
            background: value === v ? '#1a4d3a' : '#fff',
            color: value === v ? '#fff' : '#374151',
            cursor: 'pointer', transition: 'all .18s', fontFamily: 'Inter,sans-serif',
          }}
        >
          {v ? 'Yes' : 'No'}
        </button>
      ))}
    </div>
  );
}

export default function Step3FinancialDetails({ formData, updateFormData, onBack, onSubmit, isSubmitting, submitError }) {
  const [errors, setErrors] = useState({});

  const maxMortgage = formData.estimatedPropertyValue || MAX_HOME;

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (formData.currentOnPropertyTax === null || formData.currentOnPropertyTax === undefined) errs.tax = 'Please answer this question';
    if (formData.hasHomeownersInsurance === null || formData.hasHomeownersInsurance === undefined) errs.ins = 'Please answer this question';
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Slider
        label="Estimated Property Value"
        value={formData.estimatedPropertyValue || 450000}
        min={MIN_HOME} max={MAX_HOME} step={5000}
        onChange={v => updateFormData({ estimatedPropertyValue: v })}
        formatVal={formatCurrency}
        left="$100,000" mid="$1,000,000" right="$2,000,000+"
      />

      <Slider
        label="Current Mortgage Balance"
        value={formData.currentMortgageBalance || 0}
        min={0} max={maxMortgage} step={5000}
        onChange={v => updateFormData({ currentMortgageBalance: v })}
        formatVal={formatCurrency}
        left="$0 (Free & Clear)"
        mid={`50% Equity (${formatCurrency((formData.estimatedPropertyValue || 450000) * 0.5)})`}
        right={`Full Premium (${formatCurrency(formData.estimatedPropertyValue || 450000)})`}
      />
      <p style={{ fontSize: 11.5, color: '#6b7280', marginTop: -12, marginBottom: 20, lineHeight: 1.55 }}>
        <strong>Note:</strong> Reverse mortgages must pay off all existing home mortgages first. The HECM payout automatically resolves existing liens.
      </p>

      <Slider
        label="Loan Amount Needed"
        value={formData.loanAmountNeeded || MIN_LOAN}
        min={MIN_LOAN} max={formData.estimatedPropertyValue || MAX_HOME} step={5000}
        onChange={v => updateFormData({ loanAmountNeeded: v })}
        formatVal={formatCurrency}
        left={formatCurrency(MIN_LOAN)}
        mid="Max HECM Line"
        right={`Full Value (${formatCurrency(formData.estimatedPropertyValue || 450000)})`}
      />

      {/* Mandatory Qualifications */}
      <div style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: '18px 18px', marginBottom: 18 }}>
        <h4 style={{ fontFamily: 'Montserrat,sans-serif', fontWeight: 700, fontSize: 14, color: '#111827', marginBottom: 18 }}>
          Mandatory Qualifications
        </h4>

        <div style={{ marginBottom: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <p style={{ fontSize: 13.5, fontWeight: 600, color: '#111827', margin: '0 0 3px' }}>Are you current on Property Tax?</p>
              <p style={{ fontSize: 12, color: '#9ca3af', margin: 0 }}>Must be current to qualify for HECM programs.</p>
            </div>
            <YesNo value={formData.currentOnPropertyTax} onChange={v => { updateFormData({ currentOnPropertyTax: v }); setErrors(e => ({ ...e, tax: undefined })); }} />
          </div>
          {errors.tax && <p style={{ color: '#ef4444', fontSize: 11.5, marginTop: 6 }}>{errors.tax}</p>}
        </div>

        <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <p style={{ fontSize: 13.5, fontWeight: 600, color: '#111827', margin: '0 0 3px' }}>Do you currently have Homeowner's Insurance?</p>
              <p style={{ fontSize: 12, color: '#9ca3af', margin: 0 }}>Active hazard insurance coverage is required.</p>
            </div>
            <YesNo value={formData.hasHomeownersInsurance} onChange={v => { updateFormData({ hasHomeownersInsurance: v }); setErrors(e => ({ ...e, ins: undefined })); }} />
          </div>
          {errors.ins && <p style={{ color: '#ef4444', fontSize: 11.5, marginTop: 6 }}>{errors.ins}</p>}
        </div>
      </div>

      {/* Joint Borrower */}
      <div style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: '16px 18px', marginBottom: 18 }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', marginBottom: formData.hasJointBorrower ? 16 : 0 }}>
          <div
            onClick={() => updateFormData({ hasJointBorrower: !formData.hasJointBorrower })}
            style={{
              width: 18, height: 18, borderRadius: 4,
              border: `2px solid ${formData.hasJointBorrower ? '#1a4d3a' : '#d1d5db'}`,
              background: formData.hasJointBorrower ? '#1a4d3a' : '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              transition: 'all .18s', cursor: 'pointer',
            }}
          >
            {formData.hasJointBorrower && (
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path d="M1 4l2.5 2.5L9 1" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>Joint Borrower Details</span>
        </label>

        {formData.hasJointBorrower && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#6b7280', marginBottom: 5 }}>Co-Borrower Name</label>
              <input
                type="text"
                value={formData.coBorrowerName || ''}
                onChange={e => updateFormData({ coBorrowerName: e.target.value })}
                placeholder="e.g.Mizanur Rahman"
                style={{ width: '100%', border: '1px solid #d1d5db', borderRadius: 8, padding: '10px 13px', fontSize: 13.5, outline: 'none', fontFamily: 'Inter,sans-serif', boxSizing: 'border-box' }}
                onFocus={e => { e.target.style.borderColor = '#1a4d3a'; e.target.style.boxShadow = '0 0 0 3px rgba(26,77,58,0.12)'; }}
                onBlur={e => { e.target.style.borderColor = '#d1d5db'; e.target.style.boxShadow = 'none'; }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#6b7280', marginBottom: 5 }}>Co-Borrower Date of Birth</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="date"
                  value={formData.coBorrowerDateOfBirth || ''}
                  onChange={e => updateFormData({ coBorrowerDateOfBirth: e.target.value })}
                  style={{ width: '100%', border: '1px solid #d1d5db', borderRadius: 8, padding: '10px 13px', fontSize: 13.5, outline: 'none', fontFamily: 'Inter,sans-serif', boxSizing: 'border-box' }}
                  onFocus={e => { e.target.style.borderColor = '#1a4d3a'; e.target.style.boxShadow = '0 0 0 3px rgba(26,77,58,0.12)'; }}
                  onBlur={e => { e.target.style.borderColor = '#d1d5db'; e.target.style.boxShadow = 'none'; }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Ultimate Goals */}
      <div style={{ marginBottom: 24 }}>
        <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Ultimate Goals</label>
        <textarea
          value={formData.ultimateGoals || ''}
          onChange={e => updateFormData({ ultimateGoals: e.target.value })}
          rows={3}
          placeholder="Retirement goal, questions or general timeline preferences"
          style={{ width: '100%', border: '1px solid #d1d5db', borderRadius: 8, padding: '11px 14px', fontSize: 14, fontFamily: 'Inter,sans-serif', outline: 'none', resize: 'none', boxSizing: 'border-box', lineHeight: 1.6 }}
          onFocus={e => { e.target.style.borderColor = '#1a4d3a'; e.target.style.boxShadow = '0 0 0 3px rgba(26,77,58,0.12)'; }}
          onBlur={e => { e.target.style.borderColor = '#d1d5db'; e.target.style.boxShadow = 'none'; }}
        />
      </div>

      {submitError && (
        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '10px 14px', marginBottom: 16, color: '#dc2626', fontSize: 13 }}>
          {submitError}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button type="button" onClick={onBack} style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: 'none', border: '1px solid #e5e7eb', color: '#374151',
          fontWeight: 600, fontSize: 14, padding: '11px 20px', borderRadius: 8,
          cursor: 'pointer', fontFamily: 'Inter,sans-serif',
        }}
          onMouseEnter={e => e.currentTarget.style.background = '#f9fafb'}
          onMouseLeave={e => e.currentTarget.style.background = 'none'}
        >
          <ChevronLeft size={15} /> Back
        </button>

        <button type="submit" disabled={isSubmitting} style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: '#1a4d3a', color: '#fff', fontWeight: 600,
          fontSize: 14, padding: '12px 24px', borderRadius: 8,
          border: 'none', cursor: isSubmitting ? 'not-allowed' : 'pointer',
          opacity: isSubmitting ? 0.7 : 1, transition: 'background .2s',
          fontFamily: 'Inter,sans-serif',
        }}
          onMouseEnter={e => { if (!isSubmitting) e.currentTarget.style.background = '#15603a'; }}
          onMouseLeave={e => e.currentTarget.style.background = '#1a4d3a'}
        >
          {isSubmitting ? (
            <><span style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} /> Submitting...</>
          ) : (
            <><Send size={14} /> Request Free ConsLAtation</>
          )}
        </button>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </form>
  );
}
