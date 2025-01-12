import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useActiveSection } from "@/hooks/useActiveSection";
import React from "react";
import { cn } from "@/lib/utils";
import SectionDivider from './SectionDivider';
import { TrendingUp, Wallet, Copy, ExternalLink, Check, DollarSign, ChartBar, CircleDollarSign, Group, Droplet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Marquee } from "@devnomic/marquee";
import "@devnomic/marquee/dist/index.css";

const getAmountInNumber = (amount: string) => {
  const num = amount.replace(/[^0-9.]/g, '');
  const multiplier = amount.includes('K') ? 1000 : 
                    amount.includes('M') ? 1000000 : 
                    amount.includes('B') ? 1000000000 : 1;
  return parseFloat(num) * multiplier;
};

const ClickTooltip = React.forwardRef<
  React.ElementRef<typeof TooltipContent>,
  React.ComponentPropsWithoutRef<typeof TooltipContent> & {
    trigger: React.ReactNode;
    children: React.ReactNode;
  }
>(({ className, trigger, children, ...props }, ref) => {
  const [open, setOpen] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle clicks outside
  React.useEffect(() => {
    const handleClickOutside = () => {
      setOpen(false);
    };

    if (open) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [open]);

  return (
    <TooltipProvider>
      <Tooltip open={open}>
        <TooltipTrigger asChild>
          <motion.button
            onClick={(e) => {
              e.stopPropagation(); // Prevent the click from bubbling up
              setOpen(!open);
            }}
            className="inline-flex items-center px-2 py-0 bg-yellow-400/10 rounded-lg border border-yellow-400/20 cursor-pointer relative overflow-hidden align-baseline mx-1 mr-2.5"
            whileTap={{ scale: 0.95 }}
          >
            {trigger}
          </motion.button>
        </TooltipTrigger>
        <TooltipContent
          ref={ref}
          side="bottom"
          align={isMobile ? "center" : "start"}
          sideOffset={5}
          alignOffset={isMobile ? -40 : 0}
          className={cn(
            "z-[60] animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
            "bg-black/95 backdrop-blur-sm border border-yellow-400/20",
            "shadow-[0_0_15px_rgba(250,204,21,0.1)] rounded-xl",
            "p-4",
            isMobile ? "max-w-[calc(100vw-2rem)] mx-4" : "max-w-[300px]",
            className
          )}
          {...props}
        >
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
          
          {/* Decorative elements */}
          <div className="absolute -z-10 inset-0 bg-gradient-to-b from-yellow-400/5 to-transparent rounded-xl" />
          <motion.div 
            className="absolute -z-10 inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(250,204,21,0.1),transparent_70%)]"
            animate={{
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
});
ClickTooltip.displayName = "ClickTooltip";

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
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(contractAddress);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <motion.div
      className="flex flex-col gap-3 sm:gap-4 w-full max-w-2xl mx-auto mt-6 sm:mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      {/* Contract Address Display */}
      <motion.div 
        className="group relative flex items-center gap-2 bg-black/20 backdrop-blur-sm p-1.5 sm:p-2 rounded-xl border border-yellow-400/20 overflow-hidden"
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-yellow-400/5 to-yellow-400/0"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <div className="relative flex-1 px-2 sm:px-3 py-1.5 sm:py-2">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-yellow-400/50 animate-pulse" />
            <span className="text-[10px] uppercase tracking-wider text-yellow-400/70">Contract Address</span>
          </div>
          <div className="font-mono text-sm md:text-base text-yellow-400 mt-1 overflow-x-auto scrollbar-hide pr-2">
            {contractAddress}
          </div>
        </div>

        <motion.div
          whileTap={{ scale: 0.95 }}
          className="relative shrink-0 mr-1.5"
        >
          <Button
            onClick={handleCopy}
            variant="secondary"
            className={cn(
              "relative overflow-hidden transition-colors duration-200",
              copySuccess
                ? "bg-green-500 text-white hover:bg-green-400"
                : "bg-yellow-400 hover:bg-yellow-300 text-black"
            )}
            size="sm"
          >
            <motion.div
              initial={false}
              animate={{ 
                opacity: copySuccess ? 1 : 0,
                scale: copySuccess ? 1 : 0.5,
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Check className="size-4" />
            </motion.div>
            <motion.div
              initial={false}
              animate={{ 
                opacity: copySuccess ? 0 : 1,
                scale: copySuccess ? 0.5 : 1,
              }}
              className="flex items-center gap-2"
            >
              <Copy className="size-4" />
              <span className="hidden sm:inline">Copy</span>
            </motion.div>
          </Button>
        </motion.div>
      </motion.div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2 sm:gap-4">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            asChild
            size="lg"
            className="relative w-full overflow-hidden bg-yellow-400 hover:bg-yellow-300 text-black font-bold group"
          >
            <a href="#" className="flex items-center justify-center gap-2">
              {/* Animated gradient overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-white/20 to-yellow-400/0"
                animate={{
                  x: ['-200%', '200%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                  repeatDelay: 1,
                }}
              />
              <motion.div
                animate={{
                  rotate: [0, 15, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Wallet className="size-4" />
              </motion.div>
              <span className="relative">Buy $BALD</span>
            </a>
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full border-yellow-400/20 bg-black/20 backdrop-blur-sm text-yellow-400 hover:bg-black/30 hover:text-yellow-300 font-bold group"
          >
            <a href="#" className="flex items-center justify-center gap-2">
              <ExternalLink className="size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              <span>Chart</span>
            </a>
          </Button>
        </motion.div>
      </div>

      {/* Live Update Tracker */}
      <div className="relative rounded-xl bg-black/20 backdrop-blur-sm border border-yellow-400/20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 z-10 pointer-events-none" />
        <Marquee
          fade={true}
          direction="left"
          reverse={false}
          pauseOnHover={true}
          className="py-2.5"
          innerClassName="gap-2"
        >
          {[
            { label: "Price", value: "$0.00042", change: "+15.2%", icon: DollarSign },
            { label: "Market Cap", value: "$325M", change: "+12.8%", icon: ChartBar },
            { label: "24h Volume", value: "$8.2M", change: "+25.5%", icon: CircleDollarSign },
            { label: "Holders", value: "2,851", change: "+124", icon: Group },
            { label: "Liquidity", value: "$2.1M", change: "+5.2%", icon: Droplet }
          ].map((item, index) => (
            <div key={index} className="flex items-center mx-2">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-5 h-5 rounded-md bg-yellow-400/10">
                  <item.icon className="size-3.5 text-yellow-400/70" />
                </div>
                <span className="text-xs text-gray-400">{item.label}:</span>
                <span className="text-sm font-medium text-yellow-400">{item.value}</span>
                <span className={cn(
                  "text-xs font-medium flex items-center gap-0.5",
                  item.change.startsWith("+") ? "text-green-400" : "text-red-400"
                )}>
                  <TrendingUp className="size-3" />
                  {item.change}
                </span>
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </motion.div>
  );
};

const LevelProgressIndicator = ({ className }: { className?: string }) => {
  const { setActiveSection } = useActiveSection();

  const currentAmount = "325M";
  const nextLevelAmount = "500M";
  const prevLevelAmount = "250M";
  
  // Calculate progress between current level (8) and next level (9)
  const progress = ((getAmountInNumber(currentAmount) - getAmountInNumber(prevLevelAmount)) / 
                   (getAmountInNumber(nextLevelAmount) - getAmountInNumber(prevLevelAmount)) * 100).toFixed(1);

  const [tooltipOpen, setTooltipOpen] = useState(false);

  useEffect(() => {
    if (tooltipOpen) {
      const timer = setTimeout(() => {
        setTooltipOpen(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [tooltipOpen]);

  return (
    <div className={cn("w-full h-full", className)}>
      <motion.div
        className="relative w-full h-full rounded-2xl overflow-hidden bg-black/20 backdrop-blur-sm border border-yellow-400/10"
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
        <div className="relative w-full h-full">
          <img
            src={`/bald-landing/levels/8.jpg`}
            alt="Level 8"
            className="w-full h-full object-cover"
          />

          {/* Level Info Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent">
            <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 space-y-2">
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-xs sm:text-sm text-yellow-400/90">Current Level</div>
                  <div className="text-xl sm:text-2xl font-bold text-yellow-400">
                    Level 8
                  </div>
                  <div className="text-[10px] sm:text-xs text-gray-400 mt-0.5">
                    Next Level: $500M
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs sm:text-sm text-yellow-400/90">Current Value</div>
                  <div className="text-lg sm:text-xl font-bold text-yellow-400">
                    $325M
                  </div>
                  <div className="text-[10px] sm:text-xs text-gray-400 mt-0.5">
                    {progress}% to Next
                  </div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="relative h-1.5 bg-yellow-400/10 rounded-full overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-yellow-400 rounded-full"
                    style={{ width: `${progress}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
              </div>

              {/* Track Progress Button */}
              <motion.button
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById('progress');
                  if (element) {
                    window.history.pushState(null, '', '#progress');
                    setActiveSection('progress');
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="mt-2 text-xs text-yellow-400/80 hover:text-yellow-400 transition-colors flex items-center justify-center gap-1.5 group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>View Full Progress</span>
                <span className="group-hover:translate-x-0.5 transition-transform">→</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function HeroSection() {
  return (
    <div className="relative w-full min-h-screen bg-gray-950 section-content" id="home">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-purple-900 animate-gradient-shift" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <ParticleEffect />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-yellow-400/5 rounded-full blur-3xl animate-blob" />
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-purple-600/5 rounded-full blur-3xl animate-blob animation-delay-2000" />
        </div>
      </div>

      {/* Content */}
      <div className="relative w-full h-screen flex items-center">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 lg:gap-16">
          {/* Text Content */}
          <div className="flex flex-col justify-center pt-16 md:pt-0">
            <div className="space-y-4 sm:space-y-6 md:space-y-12">
              <motion.div
                className="space-y-3"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                <motion.h1 
                  className="relative text-7xl md:text-8xl font-bold tracking-tight mt-10 md:mt-0"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.span
                    className={`
                      relative 
                      text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-300
                      [text-shadow:0_0_7px_rgba(250,204,21,0.3),0_0_10px_rgba(250,204,21,0.2),0_0_21px_rgba(250,204,21,0.1),0_0_42px_rgba(250,204,21,0.1)]
                      motion-safe:animate-glow
                    `}
                  >
                    $BALD
                  </motion.span>
                </motion.h1>
                <motion.p 
                  className="text-2xl md:text-3xl font-medium tracking-wide text-gray-400/80"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.span
                    className="inline-block"
                    animate={{ 
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                      times: [0, 0.5, 1],
                    }}
                  >
                    The Evolution of Baldness
                  </motion.span>
                </motion.p>
              </motion.div>

              <motion.p
                className="text-xl text-gray-200 max-w-xl leading-relaxed pb-6 md:pb-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                Track{" "}
                <ClickTooltip 
                  trigger={
                    <motion.span
                      className="relative z-10 font-semibold tracking-wide "
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
                      <span className="relative z-10">
                        Brian Armstrong's
                      </span>
                    </motion.span>
                  }
                >
                  <div className="space-y-3">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <div className="px-2 py-1 bg-yellow-400/10 rounded-md">
                          <span className="text-yellow-400 text-xs font-medium tracking-wide">BRIAN ARMSTRONG</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="px-2 py-1 bg-yellow-400/5 rounded-md">
                          <span className="text-yellow-400/80 text-xs">COINBASE CEO</span>
                        </div>
                        <span className="text-yellow-400/50">•</span>
                        <div className="px-2 py-1 bg-yellow-400/5 rounded-md">
                          <span className="text-yellow-400/80 text-xs">$11.5B</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-300">
                      Built Coinbase from zero to America's largest crypto exchange. His iconic baldness 
                      journey perfectly matches our path to $1B 👨‍🦲
                    </p>
                    
                    {/* Add a subtle divider */}
                    <motion.div 
                      className="h-px bg-gradient-to-r from-yellow-400/0 via-yellow-400/20 to-yellow-400/0"
                      animate={{
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    
                    {/* Add some stats */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div className="text-center p-2 rounded-lg bg-yellow-400/5">
                        <div className="text-[10px] text-yellow-400/70">Net Worth</div>
                        <div className="text-sm font-medium text-yellow-400">$11.5B</div>
                      </div>
                      <div className="text-center p-2 rounded-lg bg-yellow-400/5">
                        <div className="text-[10px] text-yellow-400/70">Founded</div>
                        <div className="text-sm font-medium text-yellow-400">2012</div>
                      </div>
                    </div>
                  </div>
                </ClickTooltip>
                journey to peak baldness. Each milestone unlocks a new level, from full head of hair to{" "}
                <motion.span 
                  className="text-yellow-400 font-medium"
                  animate={{
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  ultimate enlightenment
                </motion.span>{" "}
                at{" "}
                <span className="font-semibold text-yellow-400/90">
                  $1B market cap
                </span>.
              </motion.p>
              
              {/* Contract Form */}
              <ContractForm />
            </div>
          </div>

          {/* Level Progress Display */}
          <div className="flex flex-col justify-center pb-8 md:pb-0">
            <div className="w-full max-w-[400px] mx-auto md:max-w-[450px] flex flex-col gap-3 sm:gap-4 md:gap-8">
              <div className="aspect-[3/4] md:aspect-square w-full pt-6 sm:pt-8 md:pt-0 pb-8 sm:pb-10 md:pb-0">
                <LevelProgressIndicator className="w-full h-full" />
              </div>
              
              {/* Info Box */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <div className="rounded-xl bg-black/20 backdrop-blur-sm border border-yellow-400/20 overflow-hidden">
                  <div className="flex items-center gap-3 p-3 sm:p-4">
                    <div className="h-7 w-7 sm:h-8 sm:w-8 shrink-0 rounded-full bg-yellow-400/10 flex items-center justify-center">
                      <motion.div
                        animate={{
                          rotate: [0, 10, 0],
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        🚀
                      </motion.div>
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-medium text-yellow-400">
                        Level-Based Evolution
                      </div>
                      <div className="text-[10px] sm:text-xs text-gray-400">
                        Watch Brian Armstrong transform as market cap grows to $1B
                      </div>
                    </div>
                  </div>
                  <motion.div 
                    className="h-[1px] sm:h-[2px] bg-gradient-to-r from-yellow-400/0 via-yellow-400/50 to-yellow-400/0"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <div className="grid grid-cols-3 divide-x divide-yellow-400/10">
                    <div className="p-2 sm:p-3 text-center">
                      <div className="text-[10px] sm:text-xs font-medium text-yellow-400">Built on</div>
                      <div className="text-[9px] sm:text-[11px] text-gray-400">Base</div>
                    </div>
                    <div className="p-2 sm:p-3 text-center">
                      <div className="text-[10px] sm:text-xs font-medium text-yellow-400">Levels</div>
                      <div className="text-[9px] sm:text-[11px] text-gray-400">10 Stages</div>
                    </div>
                    <div className="p-2 sm:p-3 text-center">
                      <div className="text-[10px] sm:text-xs font-medium text-yellow-400">Goal</div>
                      <div className="text-[9px] sm:text-[11px] text-gray-400">$1B MC</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-16">
        <SectionDivider nextSection="distribution" />
      </div>
    </div>
  );
}