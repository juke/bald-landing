import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionDivider from './SectionDivider';

const PublicGoodSection = () => {
  return (
    <div className="relative w-full h-full overflow-hidden bg-gray-950 flex items-center">
      {/* Static backgrounds */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-black to-gray-950" />
      
      {/* Static diagonal stripes */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            rgba(250,204,21,0.1),
            rgba(250,204,21,0.1) 1px,
            transparent 1px,
            transparent 30px
          )`,
        }}
      />

      {/* Static gradient orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-[800px] h-[800px] rounded-full opacity-10 bg-radial-gradient" />
      </div>

      {/* Static vignette effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-transparent to-gray-950" />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-20">
        <motion.div
          className="text-left"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block bg-yellow-400/10 rounded-lg px-4 py-2 mb-6 border border-yellow-400/20 hover:scale-105 transition-transform">
            <span className="text-yellow-400">Public Good</span>
          </div>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-200"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            Community Driven Initiative
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-300 mb-8 leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            $BALD exists as a public good with a single purpose: to bootstrap new liquidity 
            for the original $BALD token. No roadmap, no promises - just pure community power.
          </motion.p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Community Members", value: "10K+" },
            { label: "Total Supply", value: "1M" },
            { label: "Liquidity Locked", value: "100%" },
            { label: "Holders", value: "5K+" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-black/20 backdrop-blur-sm border border-yellow-400/10 rounded-2xl p-6 hover:scale-105 transition-transform"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">
                {stat.value}
              </h3>
              <p className="text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <SectionDivider />
    </div>
  );
};

export default PublicGoodSection; 