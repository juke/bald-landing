import { motion } from "framer-motion";

const RoadmapSection = () => {
  return (
    <section className="bg-gray-100 text-gray-900 py-12 sm:py-16 text-center relative overflow-hidden">
      {/* Background gradient animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-gray-100 to-yellow-100 opacity-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.5 }}
        transition={{ duration: 1 }}
      />
      
      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2 
          className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Roadmap
        </motion.h2>
        <motion.p 
          className="max-w-2xl mx-auto text-base sm:text-lg mb-6 sm:mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          $BALD's roadmap section.
        </motion.p>
      </motion.div>
    </section>
  );
};

export default RoadmapSection;