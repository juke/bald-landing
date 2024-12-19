import { motion } from "framer-motion";

const ProgressTracker = () => {
  return (
    <section className="py-16 text-center bg-yellow-100">
      <h2 className="text-4xl font-bold mb-8">Baldness Levels</h2>
      <div className="flex justify-center gap-4">
        {[...Array(10)].map((_, level) => (
          <motion.div
            key={level}
            className="w-20 h-20 flex items-center justify-center rounded-full border-2 border-yellow-600"
            whileHover={{ scale: 1.1 }}
          >
            <span className="text-lg font-bold">Level {level + 1}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProgressTracker;