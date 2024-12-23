import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PublicGoodSection from "@/components/PublicGoodSection";
import DistributionSection from "@/components/DistributionSection";
import ProgressTracker from "@/components/ProgressTracker";

function App() {
  return (
    <div className="relative min-h-screen w-screen overflow-hidden bg-black text-white">
      <Header />
      <div className="snap-container">
        <section id="home" className="section-content">
          <HeroSection />
        </section>
        <section id="public-good" className="section-content">
          <PublicGoodSection />
        </section>
        <section id="distribution" className="section-content">
          <DistributionSection />
        </section>
        <section id="progress" className="section-content">
          <ProgressTracker />
        </section>
      </div>
    </div>
  );
}

export default App;