/**
 * HECM (Home Equity Conversion Mortgage) Calculator
 * Formula modeled after Finance of America & Longbridge Financial methodologies.
 *
 * HUD rules (simplified for estimation purposes):
 *  - MCA = min(appraised value, FHA lending limit $1,149,825 in 2024)
 *  - PLF (Principal Limit Factor) is age-based (higher age = higher PLF)
 *  - Principal Limit = MCA × PLF
 *  - Net Available = Principal Limit - existing mortgage payoff - MIP (2% of MCA) - closing costs (~$6,000 est.)
 */

// FHA Maximum Claim Amount lending limit (2024)
const FHA_LENDING_LIMIT = 1149825;

// HUD-based PLF table (age → factor), interpolated from official HUD tables
// These are approximate principal limit factors at ~3% expected rate
const PLF_TABLE = {
  62: 0.400, 63: 0.408, 64: 0.415, 65: 0.422, 66: 0.429,
  67: 0.436, 68: 0.443, 69: 0.451, 70: 0.458, 71: 0.466,
  72: 0.473, 73: 0.481, 74: 0.489, 75: 0.497, 76: 0.505,
  77: 0.513, 78: 0.521, 79: 0.530, 80: 0.538, 81: 0.547,
  82: 0.556, 83: 0.565, 84: 0.574, 85: 0.583, 86: 0.592,
  87: 0.601, 88: 0.611, 89: 0.620, 90: 0.630,
};

/**
 * Get PLF for a given age (clamps to 62-90 range)
 */
function getPLF(age) {
  const clampedAge = Math.min(90, Math.max(62, Math.floor(age)));
  return PLF_TABLE[clampedAge] || 0.400;
}

/**
 * Main HECM calculation function
 * @param {number} homeValue       - Appraised home value in USD
 * @param {number} mortgageBalance - Existing mortgage balance (0 if free & clear)
 * @param {number} borrowerAge     - Age of youngest borrower (must be ≥ 62)
 * @returns {Object} Full breakdown of HECM estimates
 */
export function calculateHECM(homeValue, mortgageBalance, borrowerAge) {
  const age = Math.max(62, Math.min(100, borrowerAge || 70));

  // Maximum Claim Amount = lower of appraised value or FHA limit
  const mca = Math.min(homeValue, FHA_LENDING_LIMIT);

  // Principal Limit Factor based on age
  const plf = getPLF(age);

  // Gross Principal Limit
  const principalLimit = Math.round(mca * plf);

  // Upfront MIP = 2% of MCA (HUD standard)
  const upfrontMIP = Math.round(mca * 0.02);

  // Estimated closing costs (origination fee + third-party + servicing setup)
  const estimatedClosingCosts = Math.min(6000, Math.max(2500, Math.round(homeValue * 0.013)));

  // Total costs deducted from principal limit
  const totalCosts = upfrontMIP + estimatedClosingCosts;

  // Available equity after paying off existing mortgage
  const afterMortgagePayoff = principalLimit - mortgageBalance;

  // Net cash available to borrower
  const netCashAvailable = Math.max(0, afterMortgagePayoff - totalCosts);

  // Max HECM Line of Credit (same as net cash for lump sum)
  const maxHecmLine = netCashAvailable;

  // Estimated monthly tenure payment (rough: net / (life expectancy months))
  const lifeExpectancyYears = Math.max(5, 90 - age);
  const monthlyTenure = Math.round(netCashAvailable / (lifeExpectancyYears * 12));

  return {
    homeValue,
    mca,
    plf: (plf * 100).toFixed(1) + '%',
    principalLimit,
    existingMortgage: mortgageBalance,
    upfrontMIP,
    estimatedClosingCosts,
    totalCosts,
    netCashAvailable,
    maxHecmLine,
    monthlyTenure,
    isEligible: age >= 62 && homeValue > 0,
    minAge: 62,
  };
}

/**
 * Format currency values for display
 */
export function formatCurrency(value) {
  if (value === undefined || value === null) return '$0';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Format a number with commas
 */
export function formatNumber(value) {
  return new Intl.NumberFormat('en-US').format(value);
}
