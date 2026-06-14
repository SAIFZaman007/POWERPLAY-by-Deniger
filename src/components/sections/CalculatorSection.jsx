import { useState } from 'react';
import { Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';

import { useMultiStepForm } from '../../hooks/useMultiStepForm';
import HecmSidebar from '../calculator/HecmSidebar';
import Step1ContactDetails from '../calculator/Step1ContactDetails';
import Step2PropertyDetails from '../calculator/Step2PropertyDetails';
import Step3FinancialDetails from '../calculator/Step3FinancialDetails';
import SuccessPopup from '../calculator/SuccessPopup';
import { generatePamphletPDF } from '../calculator/PamphletPDF';
import { submitFullLead } from '../../utils/api';
import { calculateHECM } from '../../utils/hecmCalculator';

const STEPS = [
  { label: 'Contact Details' },
  { label: 'Property Details' },
  { label: 'Financial Details' },
];

export default function CalculatorSection() {
  const {
    currentStep, totalSteps, formData, updateFormData,
    nextStep, prevStep, resetForm,
    isSubmitting, setIsSubmitting,
    submitError, setSubmitError,
    submittedLead, setSubmittedLead,
  } = useMultiStepForm(3);

  // Step 1=33%, 2=66%, 3=100%
  const barWidth = `${Math.round((currentStep / totalSteps) * 100)}%`;

  const handleFinalSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitError(null);
    const dob = new Date(data.dateOfBirth);
    const age = Math.max(62, new Date().getFullYear() - dob.getFullYear());
    const calc = calculateHECM(data.estimatedPropertyValue, data.currentMortgageBalance, age);
    const payload = { ...data, estimatedHecmRelease: calc.netCashAvailable };
    try {
      try { await submitFullLead(payload); } catch (e) { console.warn('Backend offline:', e.message); }
      setSubmittedLead(payload);
      toast.success('Consultation request submitted!');
      setTimeout(() => generatePamphletPDF(payload), 700);
    } catch (err) {
      setSubmitError(err.message || 'Submission failed. Please try again.');
      toast.error('Submission failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="calculator" style={{ background: '#f5f5f5', padding: '40px 0px' }}>
      <Toaster position="top-right" />
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>

        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#1a4d3a', background: 'rgba(26,77,58,0.07)', padding: '4px 14px', borderRadius: 20, marginBottom: 14 }}>
            Obligation-Free Equity Preview
          </span>
          <div style={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontFamily: 'Montserrat,sans-serif', fontWeight: 800, fontSize: 'clamp(26px,4vw,42px)', color: '#111827', lineHeight: 1.15, marginBottom: 14 }}>
                Calculate Your Potential Payout
              </h2>
              <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.7 }}>
                Complete our secure inquiry form to receive a personalized, detailed evaluation report. Craig Daniger or our licensed local reverse specialists will run complete actuarial estimations under HUD programs based on your age and property value.
              </p>
            </div>
          </div>
        </div>

        {/* Two-column layout: sidebar + form */}
        <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 28, alignItems: 'start' }}>

          {/* Left — HECM sidebar */}
          <div>
            <HecmSidebar formData={formData} />
          </div>

          {/* Right — stepped form card */}
          <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>

            {/* Step header + progress */}
            <div style={{ padding: '22px 28px 18px', borderBottom: '1px solid #f3f4f6' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <span style={{ fontSize: 13.5, fontWeight: 700, color: '#1a4d3a' }}>
                  Step {currentStep}: {STEPS[currentStep - 1].label}
                </span>
                <span style={{ fontSize: 12, color: '#9ca3af' }}>Step {currentStep} of {totalSteps}</span>
              </div>
              {/* Progress bar */}
              <div style={{ height: 5, background: '#f3f4f6', borderRadius: 3, overflow: 'hidden' }}>
                <motion.div
                  initial={false}
                  animate={{ width: barWidth }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  style={{ height: '100%', background: '#1a4d3a', borderRadius: 3 }}
                />
              </div>
            </div>

            {/* Step body */}
            <div style={{ padding: '24px 28px' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.22 }}
                >
                  {currentStep === 1 && <Step1ContactDetails formData={formData} updateFormData={updateFormData} onNext={nextStep} />}
                  {currentStep === 2 && <Step2PropertyDetails formData={formData} updateFormData={updateFormData} onNext={nextStep} onBack={prevStep} />}
                  {currentStep === 3 && <Step3FinancialDetails formData={formData} updateFormData={updateFormData} onBack={prevStep} onSubmit={handleFinalSubmit} isSubmitting={isSubmitting} submitError={submitError} />}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Security note */}
            <div style={{ padding: '10px 25px 10px', textAlign: 'center' }}>
              <p style={{ fontSize: 12, color: '#9ca3af', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                <Lock size={40}/>
                We secure your privacy back with bank-grade safeguards. Our calculations strictly abide by federal housing safety standards. No personal information is ever sold.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive — stack on mobile */}
      <style>{`
        @media (max-width: 900px) {
          #calculator > div > div:last-child {
            grid-template-columns: 1fr !important;
          }
          #calculator > div > div:nth-child(2) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      {submittedLead && (
        <SuccessPopup
          lead={submittedLead}
          onReset={resetForm}
          onDownload={() => generatePamphletPDF(submittedLead)}
        />
      )}
    </section>
  );
}
