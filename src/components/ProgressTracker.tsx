import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Lock, ArrowUp } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface LevelDetailsProps {
  level: number;
  isUnlocked: boolean;
  unlockedLevels: number;
}

const levelDescriptions = [
  "Full head of hair. The journey of enlightenment begins here.",
  "Subtle changes emerge. The hairline whispers of things to come.",
  "The temples begin their retreat. Wisdom starts to show.",
  "The crown joins the transformation. No stopping now.",
  "Halfway to enlightenment. The signature pattern forms.",
  "The horseshoe emerges. Embracing the change.",
  "Advanced thinning. The shine grows stronger.",
  "Nearly there. Chrome dome incoming.",
  "The final traces fade. Ultimate form approaches.",
  "Pure enlightenment achieved. Maximum baldness unlocked.",
];

const getLevelAmount = (level: number) => {
  switch(level) {
    case 1: return '0';
    case 2: return '100K';
    case 3: return '1M';
    case 4: return '5M';
    case 5: return '10M';
    case 6: return '50M';
    case 7: return '153M';
    case 8: return '250M';
    case 9: return '500M';
    case 10: return '1B';
    default: return '0';
  }
};

const getPreviousLevelAmount = (level: number) => {
  return getLevelAmount(level - 1);
};

const getAmountInNumber = (amount: string) => {
  const num = amount.replace(/[^0-9.]/g, '');
  const multiplier = amount.includes('K') ? 1000 : 
                    amount.includes('M') ? 1000000 : 
                    amount.includes('B') ? 1000000000 : 1;
  return parseFloat(num) * multiplier;
};

const calculateTotalProgress = (unlockedLevels: number) => {
  const currentAmount = getAmountInNumber(getLevelAmount(unlockedLevels));
  const totalAmount = getAmountInNumber('1B');
  return (currentAmount / totalAmount) * 100;
};

interface LevelCardProps {
  level: number;
  isUnlocked: boolean;
  onClick: () => void;
  isSelected: boolean;
  unlockedLevels: number;
}

const LevelCard = ({ level, isUnlocked, onClick, isSelected, unlockedLevels }: LevelCardProps) => {
  const currentAmount = isUnlocked ? getAmountInNumber(getLevelAmount(level)) : 0;
  const targetAmount = getAmountInNumber(getLevelAmount(level));
  const progress = (currentAmount / targetAmount) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4,
        delay: level * 0.05, // Reduced delay for better UX
      }}
    >
      <Card 
        className={cn(
          "relative group bg-black/40 border-yellow-400/20 backdrop-blur-sm cursor-pointer overflow-hidden transition-all duration-300",
          isSelected && "ring-2 ring-yellow-400",
          !isUnlocked && "opacity-70",
          isUnlocked && "hover:border-yellow-400/40 hover:bg-black/60"
        )}
        onClick={onClick}
      >
        <CardContent className="p-2 sm:p-3">
          <div className="relative">
            {/* Image Container */}
            <div className="aspect-square rounded-lg overflow-hidden mb-2 relative">
              <img 
                src={`/bald-landing/levels/${level}.jpg`}
                alt={`Level ${level} baldness`}
                className={cn(
                  "w-full h-full object-cover transition-transform duration-300",
                  isUnlocked && "group-hover:scale-110",
                  !isUnlocked && "grayscale"
                )}
              />
              {!isUnlocked && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <Lock className="w-6 h-6 text-yellow-400/50" />
                </div>
              )}
            </div>

            {/* Level Info */}
            <div className="space-y-1">
              <div className="flex items-baseline justify-between">
                <div className="text-sm font-medium text-yellow-400">
                  Level {level}
                </div>
                <div className="text-xs text-yellow-400/60">
                  ${getLevelAmount(level)}
                </div>
              </div>

              {/* Progress Bar */}
              <Progress 
                value={isUnlocked ? 100 : Math.min(
                  ((getAmountInNumber(getLevelAmount(unlockedLevels)) / 
                    getAmountInNumber(getLevelAmount(level))) * 100
                  ), 100)} 
                className="h-1 w-full overflow-hidden rounded-full bg-gray-900/20"
                indicatorClassName={cn(
                  "h-full w-full flex-1 transition-all duration-700",
                  isUnlocked ? "bg-yellow-400" : "bg-yellow-400/30"
                )}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const getLevelProgress = (selectedLevel: number | null, unlockedLevels: number) => {
  if (!selectedLevel) {
    const currentAmount = getAmountInNumber(getLevelAmount(unlockedLevels));
    const nextAmount = getAmountInNumber(getLevelAmount(unlockedLevels + 1));
    return (currentAmount / nextAmount) * 100;
  }

  if (selectedLevel <= unlockedLevels) {
    return 100;
  } else if (selectedLevel === unlockedLevels + 1) {
    const currentAmount = getAmountInNumber(getLevelAmount(unlockedLevels));
    const targetAmount = getAmountInNumber(getLevelAmount(selectedLevel));
    return (currentAmount / targetAmount) * 100;
  }
  return 0;
};

const FloatingArrows = () => {
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
      {/* Large background arrows - very slow and ethereal */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`bg-${i}`}
          className="absolute"
          initial={{
            x: (dimensions.width / 6) * i + (Math.random() * 100 - 50),
            y: dimensions.height + 100,
            opacity: 0,
          }}
          animate={{
            y: -200,
            opacity: [0, 0.08, 0.08, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            delay: i * 3,
            ease: "linear",
          }}
        >
          <ArrowUp className="w-40 h-40 text-yellow-400/10" />
        </motion.div>
      ))}

      {/* Medium arrows - steady flow */}
      {[...Array(10)].map((_, i) => {
        const startX = Math.random() * dimensions.width;
        const duration = Math.random() * 4 + 12;
        return (
          <motion.div
            key={`med-${i}`}
            className="absolute"
            initial={{
              x: startX,
              y: dimensions.height + 50,
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              y: -100,
              opacity: [0, 0.25, 0.25, 0],
              scale: [0.8, 1, 0.9],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              delay: i * 1.2,
              ease: "linear",
            }}
          >
            <ArrowUp className="w-16 h-16 text-yellow-400/20" />
          </motion.div>
        );
      })}

      {/* Small arrows - gentle rise */}
      {[...Array(12)].map((_, i) => {
        const startX = Math.random() * dimensions.width;
        const duration = Math.random() * 3 + 8;
        return (
          <motion.div
            key={`small-${i}`}
            className="absolute"
            initial={{
              x: startX,
              y: dimensions.height,
              opacity: 0,
              scale: 0.6,
            }}
            animate={{
              y: 0,
              opacity: [0, 0.3, 0.3, 0],
              scale: [0.6, 0.8, 0.7],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "linear",
            }}
          >
            <ArrowUp className="w-8 h-8 text-yellow-400/30" />
          </motion.div>
        );
      })}
    </div>
  );
};

const ProgressTracker = () => {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [unlockedLevels] = useState(7);
  const gridRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Set initial selected level to next unlocked level
  useEffect(() => {
    setSelectedLevel(Math.min(unlockedLevels + 1, 10));
  }, [unlockedLevels]);

  // Scroll to current level on mobile
  useEffect(() => {
    if (window.innerWidth <= 768 && selectedLevel) {
      setTimeout(() => {
        const viewport = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]');
        const levelCard = viewport?.querySelector(`[data-level="${selectedLevel}"]`);
        
        if (viewport && levelCard) {
          const cardRect = levelCard.getBoundingClientRect();
          const viewportRect = viewport.getBoundingClientRect();
          const scrollTop = cardRect.top - viewportRect.top - (viewportRect.height / 2) + (cardRect.height / 2);
          
          viewport.scrollTo({
            top: viewport.scrollTop + scrollTop,
            behavior: 'smooth'
          });
        }
      }, 100); // Small delay to ensure elements are rendered
    }
  }, [selectedLevel]);

  const getMarkerPosition = (level: number) => {
    return (level / 10) * 100;
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-gray-950 flex flex-col">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-900 to-black animate-gradient-shift" />
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,_rgba(250,204,21,0.05),transparent_70%)]"
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/80" />
        <FloatingArrows />
      </div>

      <div className="relative z-10 flex flex-col flex-1 items-center justify-center h-screen">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div className="text-center mb-6">
            <Badge className="rounded-md px-3 py-1.5 text-xs font-semibold bg-yellow-400/10 text-yellow-400 border-yellow-400/20 hover:bg-yellow-400/20 transition-colors">
              Progress Tracker
            </Badge>
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 mt-4">
              Your Baldness Journey
            </h2>
            
            {/* Total Progress Bar */}
            <div className="max-w-md mx-auto w-full mb-8">
              <div className="flex justify-between mb-2 text-sm">
                <span className="text-gray-400">
                  {selectedLevel ? (
                    selectedLevel <= unlockedLevels ? 
                      'Level Unlocked' : 
                      `Progress Needed: $${getLevelAmount(selectedLevel)}`
                  ) : (
                    'Current Progress'
                  )}
                </span>
                <span className="text-yellow-400 font-medium">
                  {selectedLevel ? (
                    selectedLevel <= unlockedLevels ? 
                      '100%' : 
                      `${getLevelAmount(unlockedLevels)}`
                  ) : (
                    `$${getLevelAmount(unlockedLevels)}`
                  )}
                </span>
              </div>
              <div className="relative">
                <Progress 
                  value={getLevelProgress(selectedLevel, unlockedLevels)} 
                  className="h-3 w-full overflow-hidden rounded-full bg-black/40 backdrop-blur-sm border border-yellow-400/10"
                  indicatorClassName={cn(
                    "h-full w-full flex-1 transition-all duration-700",
                    selectedLevel && selectedLevel <= unlockedLevels 
                      ? "bg-green-400" 
                      : "bg-gradient-to-r from-yellow-400/80 via-yellow-400 to-yellow-400/80"
                  )}
                />
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 overflow-hidden rounded-full">
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(to right, transparent, rgba(250,204,21,0.2), transparent)',
                      width: '50%',
                      transform: 'translateX(-100%)',
                    }}
                    animate={{
                      transform: ['translateX(-100%)', 'translateX(200%)'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </div>
              </div>
              <div className="flex justify-between mt-1 text-xs text-gray-400">
                <span>
                  {selectedLevel ? (
                    selectedLevel <= unlockedLevels ? 
                      'Maximum Level Reached' : 
                      'Keep Growing'
                  ) : (
                    `Level ${unlockedLevels}`
                  )}
                </span>
                <span>
                  {selectedLevel ? (
                    selectedLevel <= unlockedLevels ? 
                      'Completed' : 
                      `${getLevelProgress(selectedLevel, unlockedLevels).toFixed(1)}%`
                  ) : (
                    'Next Level Loading...'
                  )}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <div className="space-y-4">
            {/* Info Box */}
            <div className="bg-black/20 backdrop-blur-sm border border-yellow-400/10 rounded-xl w-full max-w-xl mx-auto">
              <AnimatePresence mode="wait">
                {selectedLevel ? (
                  <div className="p-4 flex items-center gap-4 min-h-[6rem]">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-yellow-400/20 shrink-0">
                      <img
                        src={`/bald-landing/levels/${selectedLevel}.jpg`}
                        alt={`Level ${selectedLevel}`}
                        className={cn(
                          "w-full h-full object-cover",
                          selectedLevel > unlockedLevels && "grayscale opacity-50"
                        )}
                      />
                    </div>
                    <div className="flex-1 min-w-0 -mt-1">
                      <div className="flex items-baseline justify-between mb-1">
                        <h3 className="text-yellow-400 font-bold">Level {selectedLevel}</h3>
                        <span className="text-sm text-yellow-400/60">${getLevelAmount(selectedLevel)}</span>
                      </div>
                      <p className="text-sm text-gray-400 line-clamp-2">
                        {levelDescriptions[selectedLevel - 1]}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 flex items-center justify-center min-h-[6rem]">
                    <span className="text-sm text-gray-400">Select a level to view details</span>
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Level Cards */}
            <ScrollArea 
              ref={scrollAreaRef}
              className="rounded-xl border border-yellow-400/10 bg-black/20 backdrop-blur-sm"
              style={{
                height: window.innerWidth <= 768 ? 'calc(100vh - 20rem)' : 'fit-content',
                maxHeight: window.innerWidth <= 768 ? 'calc(100vh - 20rem)' : '50vh'
              }}
            >
              <div className="p-3 sm:p-4">
                <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-4 max-w-[1400px] mx-auto">
                  {[...Array(10)].map((_, idx) => (
                    <div 
                      key={idx + 1} 
                      data-level={idx + 1}
                      className={cn(
                        "w-full",
                        selectedLevel === idx + 1 && "ring-2 ring-yellow-400/50"
                      )}
                    >
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      >
                        <LevelCard
                          level={idx + 1}
                          isUnlocked={idx + 1 <= unlockedLevels}
                          onClick={() => setSelectedLevel(idx + 1)}
                          isSelected={selectedLevel === idx + 1}
                          unlockedLevels={unlockedLevels}
                        />
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;