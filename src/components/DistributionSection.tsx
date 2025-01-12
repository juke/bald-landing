import { motion } from "framer-motion";
import { PieChart, Wallet, Lock, ArrowUp } from "lucide-react";
import SectionDivider from './SectionDivider';

const DistributionSection = () => {
  return (
    <div className="relative w-full min-h-screen bg-gray-950 flex items-center section-content" id="distribution">
      {/* Background container */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black" />
        
        {/* Grid pattern with dots - combined to reduce layers */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(250,204,21,0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(250,204,21,0.1) 1px, transparent 1px),
              radial-gradient(circle at center, rgba(250,204,21,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '64px 64px, 64px 64px, 64px 64px',
          }}
        />

        {/* Animated overlay */}
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(250,204,21,0.15),transparent_70%)]"
          initial={{ opacity: 0.3 }}
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Diagonal stripes */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              rgba(250,204,21,0.1),
              rgba(250,204,21,0.1) 2px,
              transparent 2px,
              transparent 20px
            )`,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full h-full flex flex-col justify-center">
        <div className="flex flex-col gap-6 md:gap-8">
          {/* Header */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="inline-block bg-yellow-400/10 rounded-lg px-3 py-1.5 sm:px-4 sm:py-2 mb-3 sm:mb-4 border border-yellow-400/20"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-yellow-400 text-sm sm:text-base">Tokenomics</span>
            </motion.div>
            
            <motion.h2 
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-white"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.5 }}
            >
              Token Distribution
            </motion.h2>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              {
                icon: <PieChart className="w-6 h-6 sm:w-8 sm:h-8" />,
                title: "50% Liquidity",
                description: "Added at $42k market cap",
              },
              {
                icon: <Lock className="w-6 h-6 sm:w-8 sm:h-8" />,
                title: "Locked Forever",
                description: "100% locked liquidity",
              },
              {
                icon: <Wallet className="w-6 h-6 sm:w-8 sm:h-8" />,
                title: "Zero Tax",
                description: "No hidden fees",
              },
              {
                icon: <ArrowUp className="w-6 h-6 sm:w-8 sm:h-8" />,
                title: "Peak Baldness",
                description: "$1B market cap goal",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-black/40 backdrop-blur-sm border border-yellow-400/20 rounded-xl p-3 sm:p-4 hover:scale-105 transition-transform relative overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div
                  className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-yellow-400/10 text-yellow-400 mb-3 sm:mb-4 relative transition-transform hover:rotate-12 duration-300"
                >
                  {item.icon}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-1 sm:mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <SectionDivider nextSection="progress" />
    </div>
  );
};

export default DistributionSection;