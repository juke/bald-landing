import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import PublicGoodSection from "./components/PublicGoodSection";
import DistributionSection from "./components/DistributionSection";
import ProgressTracker from "./components/ProgressTracker";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <main>
        <section id="home" className="min-h-screen">
          <HeroSection />
        </section>
        <section id="roadmap" className="scroll-mt-32">
          <PublicGoodSection />
        </section>
        <section id="distribution" className="scroll-mt-32">
          <DistributionSection />
        </section>
        <section id="progress" className="scroll-mt-32">
          <ProgressTracker />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;