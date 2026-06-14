import jsPDF from 'jspdf';
import { formatCurrency, calculateHECM } from '../../utils/hecmCalculator';

/**
 * Generates a professional Reverse Mortgage Information Pamphlet PDF
 * using jsPDF (no server required).
 */
export async function generatePamphletPDF(lead) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  const PAGE_W = 210;
  const MARGIN = 20;
  const CONTENT_W = PAGE_W - MARGIN * 2;
  let y = 0;

  // ── Color palette ─────────────────────────────────────────────────────────
  const GREEN = [26, 77, 58];      // #1a4d3a
  const GOLD  = [232, 197, 71];    // #e8c547
  const WHITE = [255, 255, 255];
  const GRAY  = [107, 114, 128];
  const DARK  = [26, 26, 26];

  // ── Helpers ───────────────────────────────────────────────────────────────
  const setColor = (rgb, isFill = true) => {
    if (isFill) doc.setFillColor(...rgb);
    else doc.setTextColor(...rgb);
  };

  const text = (str, x, yPos, opts = {}) => {
    doc.text(str, x, yPos, opts);
  };

  // ── Header ────────────────────────────────────────────────────────────────
  setColor(GREEN, true);
  doc.rect(0, 0, PAGE_W, 45, 'F');

  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  setColor(WHITE, false);
  text('POWERPLAY MORTGAGE', MARGIN, 18);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  text('Reverse Mortgage Information Guide', MARGIN, 27);

  doc.setFontSize(8);
  setColor(GOLD, false);
  text('HUD Insured  •  NMLS Member  •  BBB Accredited A+  •  Licensed in All 50 States', MARGIN, 38);

  y = 58;

  // ── Personalized header ────────────────────────────────────────────────────
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  setColor(GREEN, false);
  text(`Prepared for: ${lead.fullName || 'Valued Client'}`, MARGIN, y);
  y += 6;

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  setColor(GRAY, false);
  text(`Generated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, MARGIN, y);
  y += 14;

  // ── HECM Estimate box ─────────────────────────────────────────────────────
  const calc = calculateHECM(
    lead.estimatedPropertyValue || 450000,
    lead.currentMortgageBalance || 0,
    70
  );

  setColor([240, 247, 243], true);
  doc.roundedRect(MARGIN, y, CONTENT_W, 45, 4, 4, 'F');

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  setColor(GREEN, false);
  text('YOUR ESTIMATED HECM PREVIEW', MARGIN + 6, y + 10);

  const estimates = [
    ['Selected Home Value', formatCurrency(calc.homeValue)],
    ['Est. Max Cash Release (HECM)', formatCurrency(calc.principalLimit)],
    ['Current Mortgage Debt', formatCurrency(calc.existingMortgage)],
    ['Estimated Net Cash Available', formatCurrency(calc.netCashAvailable)],
  ];

  doc.setFontSize(8);
  estimates.forEach(([label, val], i) => {
    const rowY = y + 18 + i * 6;
    doc.setFont('helvetica', 'normal');
    setColor(GRAY, false);
    text(label, MARGIN + 6, rowY);
    doc.setFont('helvetica', 'bold');
    setColor(GREEN, false);
    text(val, MARGIN + CONTENT_W - 6, rowY, { align: 'right' });
  });

  y += 53;

  // ── Section helper ────────────────────────────────────────────────────────
  const section = (title) => {
    setColor(GREEN, true);
    doc.rect(MARGIN, y, CONTENT_W, 8, 'F');
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    setColor(WHITE, false);
    text(title, MARGIN + 4, y + 5.5);
    y += 13;
  };

  const body = (str) => {
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    setColor(DARK, false);
    const lines = doc.splitTextToSize(str, CONTENT_W);
    lines.forEach((line) => {
      if (y > 272) { doc.addPage(); y = 20; }
      text(line, MARGIN, y);
      y += 5;
    });
    y += 3;
  };

  const bullet = (str) => {
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    setColor(DARK, false);
    if (y > 272) { doc.addPage(); y = 20; }
    text('\u2022', MARGIN + 2, y);
    const lines = doc.splitTextToSize(str, CONTENT_W - 8);
    lines.forEach((line, i) => {
      text(line, MARGIN + 7, y + i * 5);
    });
    y += lines.length * 5 + 2;
  };

  // ── Content sections ──────────────────────────────────────────────────────
  section('WHAT IS A REVERSE MORTGAGE?');
  body(
    'A Home Equity Conversion Mortgage (HECM) is a federally-insured reverse mortgage backed by the U.S. Department of Housing and Urban Development (HUD). It allows homeowners 62 and older to convert a portion of their home equity into tax-free cash — with no monthly mortgage payments required. The loan is repaid when the last surviving borrower permanently leaves the home.'
  );

  section('KEY BENEFITS');
  bullet('Retain full ownership and title of your home');
  bullet('No monthly mortgage payments — ever');
  bullet('Tax-free cash proceeds (consult your tax advisor)');
  bullet('Proceeds can be structured as lump sum, monthly income, or line of credit');
  bullet('Non-recourse loan: you never owe more than your home is worth');
  bullet('HUD & FHA insured — government-backed protection');
  y += 2;

  section('ELIGIBILITY REQUIREMENTS');
  bullet('Youngest borrower must be at least 62 years of age');
  bullet('Primary residence only — must be your main home');
  bullet('Property must meet FHA minimum property standards');
  bullet('Must be current on property taxes and homeowners insurance');
  bullet('Must complete a HUD-approved counseling session before closing');
  y += 2;

  section('HOW THE PAYOUT OPTIONS WORK');
  const options = [
    ['Lump Sum', 'Receive all available funds at closing (fixed-rate only)'],
    ['Monthly Tenure', 'Equal monthly payments for as long as you occupy the home'],
    ['Line of Credit', 'Draw funds as needed; unused balance grows over time'],
    ['Combination', 'Mix of lump sum + monthly payments + line of credit'],
  ];
  doc.setFontSize(8);
  options.forEach(([opt, desc]) => {
    if (y > 272) { doc.addPage(); y = 20; }
    doc.setFont('helvetica', 'bold');
    setColor(GREEN, false);
    text(`${opt}: `, MARGIN + 2, y);
    const w = doc.getTextWidth(`${opt}: `);
    doc.setFont('helvetica', 'normal');
    setColor(DARK, false);
    const lines = doc.splitTextToSize(desc, CONTENT_W - w - 4);
    text(lines[0], MARGIN + 2 + w, y);
    y += 6;
  });
  y += 2;

  section('IMPORTANT DISCLOSURES');
  body(
    'This estimate is for informational purposes only and does not constitute a loan commitment or offer. All figures are estimates based on the information provided and standard HUD principal limit factors. Official reverse mortgage figures require a legal HUD counseling session and an official FHA-certified home appraisal. Interest accrues over the life of the loan. The loan becomes due when the last borrower permanently vacates the property. Powerplay Mortgage is an independent consulting platform — all loans are processed through licensed, federally-approved lenders.'
  );

  // ── Footer on each page ───────────────────────────────────────────────────
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    setColor(GREEN, true);
    doc.rect(0, 287, PAGE_W, 10, 'F');
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    setColor(WHITE, false);
    text('Powerplay Mortgage  •  (818) 326-1915  •  craig.daniger@loanfactory.com', MARGIN, 293);
    text(`Page ${i} of ${totalPages}`, PAGE_W - MARGIN, 293, { align: 'right' });
  }

  doc.save('Powerplay-Mortgage-Reverse-Mortgage-Guide.pdf');
}
