import { motion } from "framer-motion";

const SectionDivider = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
      <motion.div 
        className="absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            rgba(250,204,21,0.1),
            rgba(250,204,21,0.1) 2px,
            transparent 2px,
            transparent 20px
          )`,
        }}
        animate={{
          backgroundPosition: ['0px 0px', '20px 20px'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
};

export default SectionDivider; 