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
      <main className="pt-24">
        <section id="home">
          <HeroSection />
        </section>
        <section id="roadmap">
          <PublicGoodSection />
        </section>
        <section id="distribution">
          <DistributionSection />
        </section>
        <section id="progress">
          <ProgressTracker />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;