import { motion } from "framer-motion";

const PublicGoodSection = () => {
  return (
    <section className="bg-gray-100 text-gray-900 py-16 text-center relative overflow-hidden">
      {/* Background gradient animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-gray-100 to-yellow-100 opacity-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.5 }}
        transition={{ duration: 1 }}
      />
      
      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-4"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2 
          className="text-4xl font-bold mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          A Public Good
        </motion.h2>
        <motion.p 
          className="max-w-2xl mx-auto text-lg mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          $BALD exists as a public good with a single purpose: to bootstrap new liquidity for the original $BALD token. 
          No roadmap, no promises - just a community-driven initiative to strengthen the $BALD ecosystem.
        </motion.p>
      </motion.div>
    </section>
  );
};

export default PublicGoodSection; 