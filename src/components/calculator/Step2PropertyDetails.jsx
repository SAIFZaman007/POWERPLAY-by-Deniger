import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

const schema = yup.object({
  propertyStreetAddress: yup.string().required('Street address is required'),
  city: yup.string().required('City is required'),
  propertyType: yup.string().required('Please select a property type'),
  propertyCondition: yup.string().required('Please select property condition'),
});

const PROPERTY_TYPES     = ['Single Family Home','Condominium (FHA Approved)','Manufactured Home','Townhouse'];
const PROPERTY_CONDITIONS = ['Excellent (Move In Ready)','Average (Wear & Tear)','Needs Repair (Deferred Maintenance)'];

const inputStyle = (hasError) => ({
  width: '100%', border: `1px solid ${hasError ? '#f87171' : '#d1d5db'}`,
  borderRadius: 8, padding: '11px 14px', fontSize: 14,
  color: '#111827', background: hasError ? '#fef2f2' : '#fff',
  outline: 'none', transition: 'border-color .2s, box-shadow .2s',
  fontFamily: 'Inter,sans-serif', boxSizing: 'border-box',
});

const labelStyle = { display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 };

export default function Step2PropertyDetails({ formData, updateFormData, onNext, onBack }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      propertyStreetAddress: formData.propertyStreetAddress,
      city: formData.city,
      propertyType: formData.propertyType,
      propertyCondition: formData.propertyCondition,
    },
  });

  const onSubmit = (data) => { updateFormData(data); onNext(); };

  const selectStyle = (hasError) => ({
    ...inputStyle(hasError),
    appearance: 'none',
    WebkitAppearance: 'none',
    paddingRight: 36,
    cursor: 'pointer',
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ marginBottom: 16 }}>
        <label style={labelStyle}>Property Street Address</label>
        <input {...register('propertyStreetAddress')} placeholder="e.g.Bondor,Modonpur"
          style={inputStyle(!!errors.propertyStreetAddress)}
          onFocus={e => { e.target.style.borderColor = '#1a4d3a'; e.target.style.boxShadow = '0 0 0 3px rgba(26,77,58,0.12)'; }}
          onBlur={e => { e.target.style.borderColor = errors.propertyStreetAddress ? '#f87171' : '#d1d5db'; e.target.style.boxShadow = 'none'; }}
        />
        {errors.propertyStreetAddress && <p style={{ color: '#ef4444', fontSize: 11.5, marginTop: 4 }}>{errors.propertyStreetAddress.message}</p>}
      </div>

      <div style={{ marginBottom: 20 }}>
        <label style={labelStyle}>City</label>
        <input {...register('city')} placeholder="e.g.Bondor"
          style={inputStyle(!!errors.city)}
          onFocus={e => { e.target.style.borderColor = '#1a4d3a'; e.target.style.boxShadow = '0 0 0 3px rgba(26,77,58,0.12)'; }}
          onBlur={e => { e.target.style.borderColor = errors.city ? '#f87171' : '#d1d5db'; e.target.style.boxShadow = 'none'; }}
        />
        {errors.city && <p style={{ color: '#ef4444', fontSize: 11.5, marginTop: 4 }}>{errors.city.message}</p>}
      </div>

      {/* Two dropdowns side by side */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
        <div>
          <label style={labelStyle}>Property Type</label>
          <div style={{ position: 'relative' }}>
            <select {...register('propertyType')} style={selectStyle(!!errors.propertyType)}
              onFocus={e => { e.target.style.borderColor = '#1a4d3a'; e.target.style.boxShadow = '0 0 0 3px rgba(26,77,58,0.12)'; }}
              onBlur={e => { e.target.style.borderColor = errors.propertyType ? '#f87171' : '#d1d5db'; e.target.style.boxShadow = 'none'; }}
            >
              <option value="">e.g.Single Family Home</option>
              {PROPERTY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <ChevronDown size={15} color="#9ca3af" style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
          </div>
          {errors.propertyType && <p style={{ color: '#ef4444', fontSize: 11.5, marginTop: 4 }}>{errors.propertyType.message}</p>}
        </div>

        <div>
          <label style={labelStyle}>Property Condition</label>
          <div style={{ position: 'relative' }}>
            <select {...register('propertyCondition')} style={selectStyle(!!errors.propertyCondition)}
              onFocus={e => { e.target.style.borderColor = '#1a4d3a'; e.target.style.boxShadow = '0 0 0 3px rgba(26,77,58,0.12)'; }}
              onBlur={e => { e.target.style.borderColor = errors.propertyCondition ? '#f87171' : '#d1d5db'; e.target.style.boxShadow = 'none'; }}
            >
              <option value="">e.g.Excellent (Move In Ready)</option>
              {PROPERTY_CONDITIONS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <ChevronDown size={15} color="#9ca3af" style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
          </div>
          {errors.propertyCondition && <p style={{ color: '#ef4444', fontSize: 11.5, marginTop: 4 }}>{errors.propertyCondition.message}</p>}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button type="button" onClick={onBack} style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: 'none', border: '1px solid #e5e7eb', color: '#374151',
          fontWeight: 600, fontSize: 14, padding: '11px 20px', borderRadius: 8,
          cursor: 'pointer', transition: 'background .2s', fontFamily: 'Inter,sans-serif',
        }}
          onMouseEnter={e => e.currentTarget.style.background = '#f9fafb'}
          onMouseLeave={e => e.currentTarget.style.background = 'none'}
        >
          <ChevronLeft size={15} /> Back
        </button>
        <button type="submit" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: '#1a4d3a', color: '#fff', fontWeight: 600,
          fontSize: 14, padding: '12px 28px', borderRadius: 8,
          border: 'none', cursor: 'pointer', transition: 'background .2s',
          fontFamily: 'Inter,sans-serif',
        }}
          onMouseEnter={e => e.currentTarget.style.background = '#15603a'}
          onMouseLeave={e => e.currentTarget.style.background = '#1a4d3a'}
        >
          Next Step <ChevronRight size={16} />
        </button>
      </div>
    </form>
  );
}
