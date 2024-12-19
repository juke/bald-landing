import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ParticleEffect = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(15)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-yellow-400/20 rounded-full"
        initial={{
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          scale: 0,
        }}
        animate={{
          y: [null, -500],
          scale: [0, 2, 0],
        }}
        transition={{
          duration: Math.random() * 20 + 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: Math.random() * 5,
        }}
      />
    ))}
  </div>
);

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
      <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm p-2 rounded-xl border border-yellow-400/20">
        <div className="flex-1 px-4 py-2 text-yellow-400 font-mono">
          {contractAddress}
        </div>
        <motion.button
          onClick={handleCopy}
          className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-bold hover:bg-yellow-300 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          COPY
        </motion.button>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <motion.a
          href="#" // Add your buy link here
          className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold hover:bg-yellow-300 transition-colors text-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          BUY $BALD
        </motion.a>
        <motion.a
          href="#" // Add your DEX screener link here
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

const HeroSection = () => {
  return (
    <section className="min-h-screen relative overflow-hidden flex items-center justify-center p-8">
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

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
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
            className="text-xl mt-8 mb-8 text-gray-200 max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Witness{" "}
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.span
                    className="inline-flex items-center px-4 py-2 bg-yellow-400/10 rounded-lg border border-yellow-400/20 cursor-pointer relative overflow-hidden align-baseline mx-1"
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
                  className="bg-gray-900/95 border border-gray-700 shadow-xl px-4 py-3 rounded-lg max-w-[250px]"
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

        {/* Image */}
        <motion.div
          className="relative w-full max-w-md mx-auto"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <motion.div
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            className="relative z-10"
          >
            {/* Glow effect container */}
            <motion.div 
              className="absolute -inset-2 bg-gradient-to-r from-yellow-400 to-purple-600 rounded-2xl opacity-30 blur-xl"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <div className="relative group overflow-hidden rounded-2xl">
              <img
                src="/bald-hero.png"
                alt="$BALD Token"
                className="rounded-2xl shadow-2xl w-full drop-shadow-[0_0_30px_rgba(250,204,21,0.3)] transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;