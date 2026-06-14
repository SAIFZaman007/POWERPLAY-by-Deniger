import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor – attach auth if needed in future
api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// Response interceptor – normalize errors
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

// ── Lead / Form Submission ─────────────────────────────────────────────────────

/**
 * Submit a lead from step 1 (basic contact + age)
 */
export const submitLeadStep1 = (data) =>
  api.post('/leads/step1', data);

/**
 * Submit step 2 – property details
 */
export const submitLeadStep2 = (data) =>
  api.post('/leads/step2', data);

/**
 * Submit step 3 – financial details and request consultation
 */
export const submitLeadStep3 = (data) =>
  api.post('/leads/step3', data);

/**
 * Submit full lead (single-shot from any step 3 completion)
 */
export const submitFullLead = (data) =>
  api.post('/leads/submit', data);

// ── PDF Download ───────────────────────────────────────────────────────────────

/**
 * Trigger pamphlet PDF download for a submitted lead
 * Returns a blob URL that gets auto-downloaded
 */
export const downloadPamphletPDF = async (leadId) => {
  const response = await axios.get(`/api/leads/${leadId}/pamphlet`, {
    responseType: 'blob',
  });
  const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'Powerplay-Mortgage-Reverse-Mortgage-Guide.pdf');
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};

export default api;
