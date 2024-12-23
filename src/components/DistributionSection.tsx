import { motion } from "framer-motion";
import { PieChart, Wallet, Lock, Users } from "lucide-react";
import SectionDivider from './SectionDivider';

const DistributionSection = () => {
  return (
    <div className="relative w-full h-full overflow-hidden bg-gray-950 flex items-center">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black" />
      
      {/* Static grid pattern */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(250,204,21,0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(250,204,21,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '64px 64px',
          }}
        />
        
        {/* Glowing dots at intersections */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at center, rgba(250,204,21,0.3) 1px, transparent 1px)`,
            backgroundSize: '64px 64px',
          }}
        />

        {/* Subtle pulsing overlay - only animates when in view */}
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(250,204,21,0.15),transparent_70%)]"
          initial={{ opacity: 0.3, scale: 1 }}
          whileInView={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.1, 1],
          }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{
            duration: 8,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Diagonal gradient stripes */}
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

      {/* Content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 py-20">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="inline-block bg-yellow-400/10 rounded-lg px-4 py-2 mb-6 border border-yellow-400/20"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-yellow-400">Tokenomics</span>
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            Token Distribution
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <PieChart className="w-8 h-8" />,
              title: "50% Liquidity Pool",
              description: "Added at $42k market cap",
            },
            {
              icon: <Users className="w-8 h-8" />,
              title: "50% Community",
              description: "Airdropped to original holders",
            },
            {
              icon: <Lock className="w-8 h-8" />,
              title: "Locked Liquidity",
              description: "100% locked forever",
            },
            {
              icon: <Wallet className="w-8 h-8" />,
              title: "Zero Tax",
              description: "No hidden fees",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-black/40 backdrop-blur-sm border border-yellow-400/20 rounded-2xl p-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div
                className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-yellow-400/10 text-yellow-400 mb-6 relative transition-transform hover:rotate-12 duration-300"
              >
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <SectionDivider />
    </div>
  );
};

export default DistributionSection;