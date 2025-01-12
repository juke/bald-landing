import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const PublicGoodSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if device is touch-enabled
    const checkTouchDevice = () => {
      setIsTouchDevice(
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(hover: none)').matches
      );
    };

    checkTouchDevice();
    window.addEventListener('resize', checkTouchDevice);
    
    return () => window.removeEventListener('resize', checkTouchDevice);
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      setMousePosition({ 
        x: (clientX / innerWidth) * 100,
        y: (clientY / innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isTouchDevice]);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gray-950 flex items-center section-content" id="public-good">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-black to-gray-950" />

      {/* Subtle animated cubes - Only show on non-touch devices */}
      {!isTouchDevice && (
        <div className="absolute inset-0 overflow-hidden opacity-60 hidden md:block">
          {[...Array(2)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                width: '800px',
                height: '800px',
                left: `${i * 60}%`,
                top: '50%',
                perspective: '1000px',
                transformStyle: 'preserve-3d',
              }}
              animate={{
                rotateX: [0, 360],
                rotateY: [0, 360],
                x: mousePosition.x * 0.02,
                y: mousePosition.y * 0.02,
              }}
              transition={{
                duration: 30 + i * 5,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <motion.div
                className="absolute w-full h-full"
                style={{
                  background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(250,204,21,0.2), transparent 70%)`,
                  boxShadow: '0 0 30px rgba(250,204,21,0.15)',
                  transform: 'rotateX(60deg) rotateZ(45deg)',
                  borderRadius: '4px',
                  border: '1px solid rgba(250,204,21,0.25)',
                }}
              />
            </motion.div>
          ))}
        </div>
      )}

      {/* Ambient glow effect - Simplified on touch devices */}
      <motion.div
        className="absolute inset-0 opacity-40"
        animate={!isTouchDevice ? {
          background: [
            'radial-gradient(circle at 30% 30%, rgba(250,204,21,0.2), transparent 60%)',
            'radial-gradient(circle at 70% 70%, rgba(250,204,21,0.2), transparent 60%)',
            'radial-gradient(circle at 30% 30%, rgba(250,204,21,0.2), transparent 60%)',
          ]
        } : {
          background: 'radial-gradient(circle at 50% 50%, rgba(250,204,21,0.2), transparent 60%)'
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Subtle scan lines - Only show on non-touch devices */}
      {!isTouchDevice && (
        <div className="absolute inset-0 hidden md:block">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-full h-[1px]"
              style={{
                top: `${30 * (i + 1)}%`,
                background: 'linear-gradient(90deg, transparent, rgba(250,204,21,0.35), transparent)',
                filter: 'blur(1px)',
              }}
              animate={{
                x: ['-100%', '100%'],
                opacity: [0.15, 0.25, 0.15],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "linear",
                delay: i * 2,
              }}
            />
          ))}
        </div>
      )}

      {/* Soft vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.6)_100%)]" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full h-full flex flex-col justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-center">
          <motion.div
            className="text-left"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block bg-yellow-400/10 rounded-lg px-3 py-1.5 sm:px-4 sm:py-2 mb-3 sm:mb-4 border border-yellow-400/20 hover:scale-105 transition-transform">
              <span className="text-yellow-400 text-sm sm:text-base">Public Good</span>
            </div>
            
            <motion.h2 
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-200"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              Community Driven Initiative
            </motion.h2>
            
            <motion.p 
              className="text-base sm:text-lg text-gray-300 mb-4 sm:mb-6 leading-relaxed"
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
                className="bg-black/40 backdrop-blur-sm border border-yellow-400/20 rounded-xl p-3 sm:p-4 hover:scale-105 transition-transform relative overflow-hidden group"
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
                <h3 className="text-xl sm:text-2xl font-bold text-yellow-400 mb-1 sm:mb-2 relative z-10">
                  {stat.value}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 relative z-10">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicGoodSection; 