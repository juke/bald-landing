import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import SectionDivider from './SectionDivider';

const ParticleEffect = () => {
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${
            i % 3 === 0
              ? "w-1 h-1 bg-yellow-400/30"
              : i % 3 === 1
              ? "w-1.5 h-1.5 bg-yellow-400/20"
              : "w-0.5 h-0.5 bg-yellow-400/40"
          }`}
          initial={{
            x: Math.random() * dimensions.width,
            y: dimensions.height * (1 + Math.random()),
            scale: Math.random(),
            opacity: Math.random() * 0.5,
          }}
          animate={{
            y: -100,
            scale: [null, 1, 0.8],
            opacity: [null, 1, 0],
          }}
          transition={{
            duration: Math.random() * 15 + 25,
            repeat: Infinity,
            repeatDelay: -5,
            ease: "linear",
            delay: -(Math.random() * 25),
            opacity: {
              duration: Math.random() * 15 + 25,
              times: [0, 0.1, 1],
              ease: "easeInOut",
              repeat: Infinity,
            },
          }}
        />
      ))}
    </div>
  );
};

const ContractForm = () => {
  const contractAddress = "0xE1aBD004...01d094FAa420";

  const handleCopy = () => {
    navigator.clipboard.writeText(contractAddress);
    // You could add a toast notification here
  };

  return (
    <motion.div
      className="flex flex-col gap-4 w-full max-w-xl mx-auto mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      {/* Contract Address Display */}
      <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm p-2 rounded-xl border border-yellow-400/20 overflow-hidden">
        <div className="flex-1 px-4 py-2 text-yellow-400 font-mono text-sm md:text-base overflow-x-auto">
          {contractAddress}
        </div>
        <motion.button
          onClick={handleCopy}
          className="bg-yellow-400 text-black px-4 md:px-6 py-2 rounded-lg font-bold hover:bg-yellow-300 transition-colors shrink-0 z-10"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          COPY
        </motion.button>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <motion.a
          href="#"
          className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold hover:bg-yellow-300 transition-colors text-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          BUY $BALD
        </motion.a>
        <motion.a
          href="#"
          className="bg-black/20 backdrop-blur-sm text-yellow-400 px-6 py-3 rounded-xl font-bold border border-yellow-400/20 hover:bg-black/30 transition-colors text-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          CHART
        </motion.a>
      </div>
    </motion.div>
  );
};

const LevelProgressIndicator = ({ className }: { className?: string }) => {
  const [unlockedLevels, setUnlockedLevels] = useState(3);

  useEffect(() => {
    if (unlockedLevels < 10) {
      const timer = setInterval(() => {
        setUnlockedLevels(prev => Math.min(prev + 1, 10));
      }, 30000);
      return () => clearInterval(timer);
    }
  }, [unlockedLevels]);

  const previousLevel = Math.max(1, unlockedLevels - 1);
  const nextLevel = Math.min(10, unlockedLevels + 1);

  return (
    <div className={className}>
      <motion.div
        className="relative w-full rounded-2xl overflow-hidden bg-black/20 backdrop-blur-sm border border-yellow-400/10"
        animate={{
          boxShadow: [
            '0 0 20px rgba(250,204,21,0.2)',
            '0 0 40px rgba(250,204,21,0.4)',
            '0 0 20px rgba(250,204,21,0.2)',
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Current Level Display */}
        <motion.div
          className="relative w-full aspect-square"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative w-full h-full">
            <img
              src={`/bald-landing/levels/${unlockedLevels}.jpg`}
              alt={`Level ${unlockedLevels}`}
              className="w-full h-full object-cover"
            />

            {/* Level Indicator */}
            <div className="absolute inset-0 flex flex-col items-center justify-end p-4">
              <div className="flex flex-col items-center gap-4">
                <motion.button
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById('progress-tracker');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="relative bg-black/60 backdrop-blur-sm px-4 py-2 rounded-xl group hover:bg-black/70 transition-colors overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-400 via-purple-500 to-yellow-400"
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    style={{ backgroundSize: '200% 100%' }}
                  />
                  <div className="absolute inset-[1px] rounded-[10px] bg-black/60 backdrop-blur-sm" />
                  <div className="relative text-sm text-yellow-400 text-center flex items-center gap-2">
                    <span>Track Progress</span>
                    <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                  </div>
                </motion.button>

                <div className="bg-black/60 backdrop-blur-sm px-4 py-2 rounded-xl border border-yellow-400/20">
                  <div className="text-2xl font-bold text-yellow-400 text-center">
                    Level {unlockedLevels}
                  </div>
                  <div className="text-sm text-gray-400 mt-0.5">
                    Current Baldness Stage
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Progress Section - Now in a separate box */}
      <motion.div
        className="mt-6 rounded-2xl bg-black/20 backdrop-blur-sm border border-yellow-400/10 p-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="relative flex items-center justify-center min-h-[50px]">
          {/* Previous Level */}
          <div className="absolute left-4 w-[50px] group">
            <motion.div 
              className="relative aspect-square rounded-lg overflow-hidden border-2 border-gray-800"
              whileHover={{ scale: 1.4 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <img
                src={`/bald-landing/levels/${previousLevel}.jpg`}
                alt={`Level ${previousLevel}`}
                className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 transition-all duration-300"
              />
            </motion.div>
          </div>

          {/* Progress Bar */}
          <div className="w-full mx-[80px]">
            <Progress 
              value={unlockedLevels * 10} 
              className="h-1.5 bg-gray-800"
              indicatorClassName="bg-yellow-400 transition-all duration-1000"
            />
            <div className="flex justify-between mt-2 text-xs text-gray-400">
              <span>Level {previousLevel}</span>
              <span>Level {nextLevel}</span>
            </div>
          </div>

          {/* Next Level Preview */}
          <div className="absolute right-4 w-[50px] group">
            <motion.div 
              className="relative aspect-square rounded-lg overflow-hidden border-2 border-yellow-400/20"
              whileHover={{ scale: 1.4 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <img
                src={`/bald-landing/levels/${nextLevel}.jpg`}
                alt={`Level ${nextLevel}`}
                className="w-full h-full object-cover opacity-50 group-hover:opacity-75 transition-opacity"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:opacity-50 transition-opacity" />
            </motion.div>
            <motion.div
              className="absolute -inset-1 bg-yellow-400/10 rounded-lg z-[-1]"
              animate={{
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const HeroSection = () => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  return (
    <div className="relative w-full h-full overflow-hidden bg-gray-950 flex items-center">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-purple-900 animate-gradient-shift" />
      
      {/* Gradient overlay for extra depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

      {/* Particle effect */}
      <ParticleEffect />

      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-yellow-400/5 rounded-full blur-3xl animate-blob" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-purple-600/5 rounded-full blur-3xl animate-blob animation-delay-2000" />
      </div>

      <div className="relative w-full">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-8 pt-20 pb-12 md:pb-0">
          {/* Text Content */}
          <div className="text-left text-white">
            <motion.div
              className="inline-block"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <div className="space-y-2">
                <motion.h1 
                  className="text-7xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 animate-text-shine tracking-tight relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  $BALD
                  <motion.span
                    className="absolute -inset-1 bg-yellow-400/20 blur-lg rounded-lg"
                    animate={{
                      opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                </motion.h1>
                <motion.p 
                  className="text-2xl md:text-3xl font-semibold text-yellow-400/80"
                  animate={{
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  A Memecoin Revolution
                </motion.p>
              </div>
            </motion.div>
            <motion.p
              className="text-xl mt-8 mb-8 text-gray-200 max-w-xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Witness{" "}
              <TooltipProvider delayDuration={0}>
                <Tooltip open={tooltipOpen} onOpenChange={setTooltipOpen}>
                  <TooltipTrigger asChild onClick={() => setTooltipOpen(!tooltipOpen)}>
                    <motion.span
                      className="inline-flex items-center px-2 py-0 bg-yellow-400/10 rounded-lg border border-yellow-400/20 cursor-pointer relative overflow-hidden align-baseline mx-1"
                      whileHover={{ 
                        scale: 1.05,
                        backgroundColor: "rgba(250, 204, 21, 0.2)",
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.span
                        className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-yellow-400/10 to-transparent skew-x-12"
                        animate={{
                          x: ['-100%', '100%'],
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: "easeInOut",
                          repeatDelay: 3,
                        }}
                      />
                      <span className="relative z-10 font-semibold tracking-wide">
                        Brian Armstrong
                      </span>
                    </motion.span>
                  </TooltipTrigger>
                  <TooltipContent 
                    side="top"
                    className="bg-gray-900/95 border border-gray-700 shadow-xl px-4 py-3 rounded-lg max-w-[250px] z-50"
                    sideOffset={5}
                  >
                    <div className="space-y-2">
                      <p className="font-semibold text-gray-200">Brian Armstrong</p>
                      <p className="text-sm leading-relaxed text-gray-400">
                        CEO and co-founder of Coinbase, one of the world's largest cryptocurrency 
                        exchanges. Known for his iconic bald head and pioneering work in making 
                        crypto accessible to everyone.
                      </p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>{" "}
              get progressively{" "}
              <motion.b 
                className="text-yellow-400 inline-block"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                BALDER
              </motion.b>{" "}
              as $BALD moonshots to Level 10 baldness!
            </motion.p>
            
            {/* Replace the existing button with ContractForm */}
            <ContractForm />
          </div>

          {/* Level Progress Display */}
          <div className="relative w-full max-w-md mx-auto mb-12 md:mb-0">
            <LevelProgressIndicator className="w-full" />
          </div>
        </div>
      </div>

      <SectionDivider />
    </div>
  );
};

export default HeroSection;