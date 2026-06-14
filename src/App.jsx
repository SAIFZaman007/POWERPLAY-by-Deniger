import Navbar from './components/ui/Navbar';
import Footer from './components/ui/Footer';
import HeroSection from './components/sections/HeroSection';
import BenefitsSection from './components/sections/BenefitsSection';
import SpecialistSection from './components/sections/SpecialistSection';
import WhyUsSection from './components/sections/WhyUsSection';
import CalculatorSection from './components/sections/CalculatorSection';

export default function App() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1, paddingTop: 0 }}>
        <HeroSection />
        <BenefitsSection />
        <SpecialistSection />
        <WhyUsSection />
        <CalculatorSection />
      </main>
      <Footer />
    </div>
  );
}
