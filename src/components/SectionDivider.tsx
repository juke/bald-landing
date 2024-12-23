import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const SectionDivider = () => {
  return (
    <>
      <motion.div 
        className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden md:block"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.8 }}
        transition={{ duration: 0.8 }}
      >
        <ChevronDown className="w-6 h-6 text-yellow-400/50 animate-bounce" />
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