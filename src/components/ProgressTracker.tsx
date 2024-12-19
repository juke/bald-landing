import { motion } from "framer-motion";

const ProgressTracker = () => {
  return (
    <section className="py-16 text-center bg-yellow-100 relative overflow-hidden">
      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-4"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2 
          className="text-4xl font-bold mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Baldness Levels
        </motion.h2>
        
        <div className="flex flex-wrap justify-center gap-4">
          {[...Array(10)].map((_, level) => (
            <motion.div
              key={level}
              initial={{ opacity: 0, scale: 0, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5,
                delay: level * 0.1,
                type: "spring",
                stiffness: 200
              }}
            >
              <motion.div
                className="w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 text-white shadow-lg cursor-pointer"
                whileHover={{ 
                  scale: 1.1,
                  rotate: [0, -5, 5, -5, 0],
                  transition: { duration: 0.3 }
                }}
              >
                <span className="text-lg font-bold">Level {level + 1}</span>
                
                {/* Glow effect on hover */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-yellow-400"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.3, scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ProgressTracker;