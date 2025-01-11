import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useActiveSection } from "@/hooks/useActiveSection";

const SectionDivider = () => {
  const { activeSection, setActiveSection } = useActiveSection();
  
  const handleClick = () => {
    const sections = ['home', 'public-good', 'distribution', 'progress'];
    const currentIndex = sections.indexOf(activeSection);
    const isLastSection = currentIndex === sections.length - 1;

    if (isLastSection) {
      // Scroll to home section
      const element = document.getElementById('home');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setActiveSection('home');
        window.history.pushState(null, '', '#home');
      }
    } else {
      // Scroll to next section
      const nextSectionId = sections[currentIndex + 1];
      const element = document.getElementById(nextSectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(nextSectionId);
        window.history.pushState(null, '', `#${nextSectionId}`);
      }
    }
  };

  const isLastSection = activeSection === 'progress';

  return (
    <>
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer z-10"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.8 }}
        transition={{ duration: 0.8 }}
        onClick={handleClick}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        {isLastSection ? (
          <ChevronUp 
            className="w-6 h-6 text-yellow-400/50 animate-bounce hover:text-yellow-400/80 transition-colors"
            aria-label="Scroll to top"
          />
        ) : (
          <ChevronDown 
            className="w-6 h-6 text-yellow-400/50 animate-bounce hover:text-yellow-400/80 transition-colors"
            aria-label="Scroll to next section"
          />
        )}
      </motion.div>
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent"
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: false, amount: 0.8 }}
        transition={{ duration: 0.8 }}
      />
    </>
  );
};

export default SectionDivider; 