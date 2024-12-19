import { motion } from "framer-motion";

const DistributionSection = () => {
  return (
    <section className="bg-gray-900 text-white py-16 text-center relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 opacity-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.2 }}
        viewport={{ once: true }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-yellow-400/30 blur-3xl"
            initial={{
              width: Math.random() * 400 + 200,
              height: Math.random() * 400 + 200,
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
              opacity: 0,
            }}
            whileInView={{
              opacity: 0.3,
              scale: [1, 1.2, 1],
              rotate: [0, 90],
            }}
            viewport={{ once: true }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </motion.div>

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
          Token Distribution
        </motion.h2>
        <motion.p 
          className="max-w-xl mx-auto text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.span
            className="inline-block"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <b>50%</b>
          </motion.span>{" "}
          of $BALD supply was added to the liquidity pool at{" "}
          <motion.span
            className="inline-block"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <b>$42k market cap</b>
          </motion.span>
          . The other{" "}
          <motion.span
            className="inline-block"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <b>50%</b>
          </motion.span>{" "}
          was airdropped to the original community.
        </motion.p>
      </motion.div>
    </section>
  );
};

export default DistributionSection;