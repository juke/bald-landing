import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const SectionDivider = () => {
  const scrollToNextSection = () => {
    const sections = Array.from(document.querySelectorAll('.section-content'));
    const viewportMiddle = window.innerHeight / 2;
    
    const currentIndex = sections.findIndex(section => {
      const rect = section.getBoundingClientRect();
      const sectionMiddle = rect.top + rect.height / 2;
      return Math.abs(sectionMiddle - viewportMiddle) < rect.height / 2;
    });

    if (currentIndex !== -1 && currentIndex < sections.length - 1) {
      sections[currentIndex + 1].scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <>
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block cursor-pointer z-10"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.8 }}
        transition={{ duration: 0.8 }}
        onClick={scrollToNextSection}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronDown className="w-6 h-6 text-yellow-400/50 animate-bounce hover:text-yellow-400/80 transition-colors" />
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