import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { useActiveSection } from "@/hooks/useActiveSection";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { cn } from "@/lib/utils";
import SectionDivider from './SectionDivider';
import { TrendingUp, Users, Wallet } from "lucide-react";

const getLevelAmount = (level: number) => {
  switch(level) {
    case 1: return '0';
    case 2: return '100K';
    case 3: return '1M';
    case 4: return '5M';
    case 5: return '10M';
    case 6: return '50M';
    case 7: return '100M';
    case 8: return '250M';
    case 9: return '500M';
    case 10: return '1B';
    default: return '0';
  }
};

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
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (buttonRef.current?.contains(e.target as Node)) {
        e.preventDefault();
        e.stopPropagation();
        setOpen(prev => !prev);
        return;
      }
      setOpen(false);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <TooltipProvider>
      <Tooltip 
        open={open}
        onOpenChange={setOpen}
        disableHoverableContent={true}
      >
        <TooltipTrigger asChild>
          <motion.button
            ref={buttonRef}
            className="inline-flex items-center px-2 py-0 bg-yellow-400/10 rounded-lg border border-yellow-400/20 cursor-pointer relative overflow-hidden align-baseline mx-1 mr-2.5"
            whileTap={{ scale: 0.95 }}
          >
            {trigger}
          </motion.button>
        </TooltipTrigger>
        <TooltipContent
          ref={ref}
          className={cn(
            "bg-gray-900/95 border border-gray-700 shadow-xl px-4 py-3 rounded-lg max-w-[250px] z-50",
            className
          )}
          {...props}
        >
          {children}
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

      {/* Live Updates Tracker */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="bg-black/20 backdrop-blur-sm border-yellow-400/20 overflow-hidden">
          <CardContent className="p-0">
            {/* Header */}
            <div className="p-3 border-b border-yellow-400/10 flex items-center justify-between bg-black/20">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75" />
                </div>
                <span className="text-xs font-medium text-yellow-400/90">LIVE UPDATES</span>
              </div>
              <Badge 
                variant="outline" 
                className="text-[10px] border-yellow-400/20 bg-yellow-400/5"
              >
                <motion.span
                  animate={{
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="text-yellow-400"
                >
                  REAL-TIME
                </motion.span>
              </Badge>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 divide-x divide-yellow-400/10">
              {[
                { 
                  label: "24h Volume", 
                  value: "$1.2M",
                  icon: TrendingUp,
                  change: '+12.5% vs 24h ago'
                },
                { 
                  label: "Holders", 
                  value: "5,234",
                  icon: Users,
                  change: '+156 today'
                },
                { 
                  label: "Market Cap", 
                  value: "$325M",
                  icon: Wallet,
                  change: '+2.3% vs 24h ago'
                },
              ].map((stat, index) => (
                <div 
                  key={stat.label} 
                  className="p-3 flex flex-col justify-between h-full relative group hover:bg-yellow-400/5 transition-colors duration-300"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-yellow-400/5 to-yellow-400/0"
                    animate={{
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index,
                    }}
                  />
                  <div className="flex flex-col justify-between h-full gap-1.5">
                    <div className="flex items-center gap-1.5">
                      <stat.icon className="h-3.5 w-3.5 text-yellow-400/70" />
                      <div className="text-[10px] font-medium uppercase tracking-wider text-gray-400/80">
                        {stat.label}
                      </div>
                    </div>
                    <motion.div 
                      className="flex flex-col"
                      animate={{
                        opacity: [0.7, 1, 0.7],
                        scale: [1, 1.02, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.5,
                      }}
                    >
                      <span className="text-sm font-bold text-yellow-400">
                        {stat.value}
                      </span>
                      <span className="text-[10px] font-normal text-gray-400/60">
                        {stat.change}
                      </span>
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

const LevelProgressIndicator = ({ className }: { className?: string }) => {
  const [unlockedLevels, setUnlockedLevels] = useState(7);
  const { setActiveSection } = useActiveSection();

  useEffect(() => {
    if (unlockedLevels < 10) {
      const timer = setInterval(() => {
        setUnlockedLevels(prev => Math.min(prev + 1, 10));
      }, 30000);
      return () => clearInterval(timer);
    }
  }, [unlockedLevels]);

  const currentAmount = getLevelAmount(unlockedLevels);
  const nextLevelAmount = "500M";
  const progress = ((getAmountInNumber(currentAmount) / getAmountInNumber(nextLevelAmount)) * 100).toFixed(1);

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
            src={`/bald-landing/levels/${unlockedLevels}.jpg`}
            alt={`Level ${unlockedLevels}`}
            className="w-full h-full object-cover"
          />

          {/* Level Info Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent">
            <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 space-y-2">
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-xs sm:text-sm text-yellow-400/90">Current Level</div>
                  <div className="text-xl sm:text-2xl font-bold text-yellow-400">
                    Level {unlockedLevels}
                  </div>
                  <div className="text-[10px] sm:text-xs text-gray-400 mt-0.5">
                    {unlockedLevels < 10 ? 'Next Level:' : 'Max Level Reached'} {unlockedLevels < 10 ? `$${nextLevelAmount}` : ''}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs sm:text-sm text-yellow-400/90">Current Value</div>
                  <div className="text-lg sm:text-xl font-bold text-yellow-400">
                    ${currentAmount}
                  </div>
                  <div className="text-[10px] sm:text-xs text-gray-400 mt-0.5">
                    {unlockedLevels < 10 ? `${progress}% to Next` : 'Enlightened'}
                  </div>
                </div>
              </div>
              
              {/* Progress Bar */}
              {unlockedLevels < 10 && (
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
              )}

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
                  className="relative text-7xl md:text-8xl font-bold tracking-tight"
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
                className="text-xl text-gray-200 max-w-xl leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                Track{" "}
                <ClickTooltip 
                  side="top" 
                  sideOffset={5}
                  trigger={
                    <motion.span
                      className="relative z-10 font-semibold tracking-wide"
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
                  <div className="space-y-2">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2">
                        <div className="px-1.5 py-0.5 bg-yellow-400/10 rounded-md">
                          <span className="text-yellow-400 text-xs font-medium tracking-wide">BRIAN ARMSTRONG</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="px-1.5 py-0.5 bg-yellow-400/5 rounded-md">
                          <span className="text-yellow-400/80 text-xs">COINBASE CEO</span>
                        </div>
                        <span className="text-yellow-400/50">•</span>
                        <div className="px-1.5 py-0.5 bg-yellow-400/5 rounded-md">
                          <span className="text-yellow-400/80 text-xs">$11.5B</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-300">
                      Built Coinbase from zero to America's largest crypto exchange. His iconic baldness 
                      journey perfectly matches our path to $1B 👨‍🦲
                    </p>
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
              <div className="aspect-[3/4] md:aspect-square w-full">
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
        <SectionDivider />
      </div>
    </div>
  );
}