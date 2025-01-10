import { motion } from "framer-motion";
import SectionDivider from './SectionDivider';

const PublicGoodSection = () => {
  return (
    <div className="relative w-full h-full overflow-hidden bg-gray-950 flex items-center">
      {/* Dynamic gradient background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-black to-purple-900/20"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear"
        }}
      />
      
      {/* Animated diagonal stripes */}
      <motion.div 
        className="absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            rgba(250,204,21,0.15),
            rgba(250,204,21,0.15) 2px,
            transparent 2px,
            transparent 40px
          )`,
        }}
        animate={{
          backgroundPosition: ['0px 0px', '40px 40px'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-radial from-yellow-400/20 via-yellow-400/5 to-transparent" />
        </motion.div>
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-radial from-purple-600/20 via-purple-600/5 to-transparent" />
        </motion.div>
      </div>

      {/* Enhanced vignette effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "linear",
            }}
          />
        ))}
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center py-12 sm:py-20">
        <motion.div
          className="text-left"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block bg-yellow-400/10 rounded-lg px-3 py-1.5 sm:px-4 sm:py-2 mb-4 sm:mb-6 border border-yellow-400/20 hover:scale-105 transition-transform">
            <span className="text-yellow-400 text-sm sm:text-base">Public Good</span>
          </div>
          
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-200"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            Community Driven Initiative
          </motion.h2>
          
          <motion.p 
            className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            $BALD exists as a public good with a single purpose: to bootstrap new liquidity 
            for the original $BALD token. No roadmap, no promises - just pure community power.
          </motion.p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {[
            { label: "Community Members", value: "10K+" },
            { label: "Total Supply", value: "1M" },
            { label: "Liquidity Locked", value: "100%" },
            { label: "Holders", value: "5K+" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-black/40 backdrop-blur-sm border border-yellow-400/20 rounded-2xl p-6 hover:scale-105 transition-transform relative overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-yellow-400/10 to-yellow-400/0"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.8 }}
              />
              <h3 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2 relative z-10">
                {stat.value}
              </h3>
              <p className="text-gray-400 relative z-10">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <SectionDivider />
    </div>
  );
};

export default PublicGoodSection; 