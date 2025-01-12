import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useActiveSection } from "@/hooks/useActiveSection";

const SectionDivider = ({ isLastSection, nextSection }: { 
  isLastSection?: boolean;
  nextSection: string;
}) => {
  const { setActiveSection, setLastInteractionTime } = useActiveSection();
  
  const handleClick = () => {
    const targetId = isLastSection ? 'home' : nextSection;
    const element = document.getElementById(targetId);
    if (element) {
      setLastInteractionTime();
      setActiveSection(targetId);
      
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      
      window.history.replaceState(null, '', `#${targetId}`);
    }
  };

  return (
    <>
      <motion.div 
        className="absolute left-0 right-0 bottom-0 h-16 flex items-center justify-center cursor-pointer z-20"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.8 }}
        transition={{ duration: 0.8 }}
        onClick={handleClick}
      >
        <motion.div
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
              aria-label={`Scroll to ${nextSection} section`}
            />
          )}
        </motion.div>
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