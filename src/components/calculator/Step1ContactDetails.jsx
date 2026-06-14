import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ChevronRight } from 'lucide-react';

const schema = yup.object({
  fullName: yup.string().required('Full name is required').min(2, 'Name too short'),
  dateOfBirth: yup.date().required('Date of birth is required').typeError('Please enter a valid date')
    .test('age', 'You must be at least 62 years old to qualify', val => {
      if (!val) return false;
      return Math.floor((new Date() - new Date(val)) / (365.25 * 24 * 60 * 60 * 1000)) >= 62;
    }),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  dayPhone: yup.string().required('Phone number is required').min(10, 'Enter a valid phone number'),
  nightPhone: yup.string().optional(),
});

const inputStyle = (hasError) => ({
  width: '100%',
  border: `1px solid ${hasError ? '#f87171' : '#d1d5db'}`,
  borderRadius: 8,
  padding: '11px 14px',
  fontSize: 14,
  color: '#111827',
  background: hasError ? '#fef2f2' : '#fff',
  outline: 'none',
  transition: 'border-color .2s, box-shadow .2s',
  fontFamily: 'Inter,sans-serif',
  boxSizing: 'border-box',
});

const labelStyle = {
  display: 'block',
  fontSize: 13,
  fontWeight: 600,
  color: '#374151',
  marginBottom: 6,
};

export default function Step1ContactDetails({ formData, updateFormData, onNext }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: formData.fullName,
      dateOfBirth: formData.dateOfBirth,
      email: formData.email,
      dayPhone: formData.dayPhone,
      nightPhone: formData.nightPhone,
    },
  });

  const onSubmit = (data) => { updateFormData(data); onNext(); };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div>
          <label style={labelStyle}>Full Name</label>
          <input {...register('fullName')} placeholder="e.g.Craig Daniger"
            style={inputStyle(!!errors.fullName)}
            onFocus={e => { e.target.style.borderColor = '#1a4d3a'; e.target.style.boxShadow = '0 0 0 3px rgba(26,77,58,0.12)'; }}
            onBlur={e => { e.target.style.borderColor = errors.fullName ? '#f87171' : '#d1d5db'; e.target.style.boxShadow = 'none'; }}
          />
          {errors.fullName && <p style={{ color: '#ef4444', fontSize: 11.5, marginTop: 4 }}>{errors.fullName.message}</p>}
        </div>
        <div>
          <label style={labelStyle}>Date of Birth <span style={{ color: '#9ca3af', fontWeight: 400 }}>(Senior Eligibility)</span></label>
          <input {...register('dateOfBirth')} type="date"
            style={inputStyle(!!errors.dateOfBirth)}
            onFocus={e => { e.target.style.borderColor = '#1a4d3a'; e.target.style.boxShadow = '0 0 0 3px rgba(26,77,58,0.12)'; }}
            onBlur={e => { e.target.style.borderColor = errors.dateOfBirth ? '#f87171' : '#d1d5db'; e.target.style.boxShadow = 'none'; }}
          />
          {errors.dateOfBirth && <p style={{ color: '#ef4444', fontSize: 11.5, marginTop: 4 }}>{errors.dateOfBirth.message}</p>}
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={labelStyle}>Email Address</label>
        <input {...register('email')} type="email" placeholder="e.g.example@gmail.com"
          style={inputStyle(!!errors.email)}
          onFocus={e => { e.target.style.borderColor = '#1a4d3a'; e.target.style.boxShadow = '0 0 0 3px rgba(26,77,58,0.12)'; }}
          onBlur={e => { e.target.style.borderColor = errors.email ? '#f87171' : '#d1d5db'; e.target.style.boxShadow = 'none'; }}
        />
        {errors.email && <p style={{ color: '#ef4444', fontSize: 11.5, marginTop: 4 }}>{errors.email.message}</p>}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
        <div>
          <label style={labelStyle}>Day Time Phone</label>
          <input {...register('dayPhone')} type="tel" placeholder="e.g.(818) 000-0000"
            style={inputStyle(!!errors.dayPhone)}
            onFocus={e => { e.target.style.borderColor = '#1a4d3a'; e.target.style.boxShadow = '0 0 0 3px rgba(26,77,58,0.12)'; }}
            onBlur={e => { e.target.style.borderColor = errors.dayPhone ? '#f87171' : '#d1d5db'; e.target.style.boxShadow = 'none'; }}
          />
          {errors.dayPhone && <p style={{ color: '#ef4444', fontSize: 11.5, marginTop: 4 }}>{errors.dayPhone.message}</p>}
        </div>
        <div>
          <label style={labelStyle}>Night Phone <span style={{ color: '#9ca3af', fontWeight: 400 }}>(Optional)</span></label>
          <input {...register('nightPhone')} type="tel" placeholder="e.g.(818) 000-0000"
            style={inputStyle(false)}
            onFocus={e => { e.target.style.borderColor = '#1a4d3a'; e.target.style.boxShadow = '0 0 0 3px rgba(26,77,58,0.12)'; }}
            onBlur={e => { e.target.style.borderColor = '#d1d5db'; e.target.style.boxShadow = 'none'; }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
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
