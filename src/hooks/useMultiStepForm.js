import { useState, useCallback } from 'react';

/**
 * useMultiStepForm
 * Manages a 3-step form wizard with shared form data state.
 */
export function useMultiStepForm(totalSteps = 3) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1
    fullName: '',
    dateOfBirth: '',
    email: '',
    dayPhone: '',
    nightPhone: '',
    // Step 2
    propertyStreetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    propertyType: '',
    propertyCondition: '',
    // Step 3
    estimatedPropertyValue: 450000,
    currentMortgageBalance: 50000,
    loanAmountNeeded: 450000,
    currentOnPropertyTax: null,
    hasHomeownersInsurance: null,
    hasJointBorrower: false,
    coBorrowerName: '',
    coBorrowerDateOfBirth: '',
    ultimateGoals: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submittedLead, setSubmittedLead] = useState(null);

  const nextStep = useCallback(() => {
    setCurrentStep((s) => Math.min(s + 1, totalSteps));
  }, [totalSteps]);

  const prevStep = useCallback(() => {
    setCurrentStep((s) => Math.max(s - 1, 1));
    setSubmitError(null);
  }, []);

  const updateFormData = useCallback((updates) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  }, []);

  const resetForm = useCallback(() => {
    setCurrentStep(1);
    setFormData({
      fullName: '', dateOfBirth: '', email: '', dayPhone: '', nightPhone: '',
      propertyStreetAddress: '', city: '', state: '', zipCode: '',
      propertyType: '', propertyCondition: '',
      estimatedPropertyValue: 450000, currentMortgageBalance: 50000,
      loanAmountNeeded: 450000, currentOnPropertyTax: null,
      hasHomeownersInsurance: null, hasJointBorrower: false,
      coBorrowerName: '', coBorrowerDateOfBirth: '', ultimateGoals: '',
    });
    setSubmittedLead(null);
    setSubmitError(null);
  }, []);

  const progress = Math.round(((currentStep - 1) / (totalSteps - 1)) * 100);

  return {
    currentStep,
    totalSteps,
    formData,
    updateFormData,
    nextStep,
    prevStep,
    resetForm,
    isSubmitting,
    setIsSubmitting,
    submitError,
    setSubmitError,
    submittedLead,
    setSubmittedLead,
    progress,
  };
}
