import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Lock, ArrowUp } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import SectionDivider from './SectionDivider';

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

interface LevelCardProps {
  level: number;
  isUnlocked: boolean;
  onClick: () => void;
  isSelected: boolean;
  unlockedLevels: number;
}

const LevelCard = ({ level, isUnlocked, onClick, isSelected, unlockedLevels }: LevelCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4,
        delay: level * 0.05,
      }}
      className="h-full"
    >
      <Card 
        className={cn(
          "relative group bg-black/40 backdrop-blur-sm cursor-pointer h-full",
          "overflow-hidden transition-all duration-300",
          isSelected ? "border-yellow-400/50 border-2" : "border-yellow-400/20 border",
          !isUnlocked && "opacity-70",
          isUnlocked && "hover:border-yellow-400/40 hover:bg-black/60"
        )}
        onClick={onClick}
      >
        <CardContent className="p-2 sm:p-3 h-full flex flex-col">
          {/* Image Container */}
          <div className="aspect-[5/4] rounded-lg overflow-hidden relative flex-shrink-0">
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
                <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400/50" />
              </div>
            )}
          </div>

          {/* Level Info */}
          <div className="mt-2 flex flex-col justify-end gap-1">
            <div className="flex items-baseline justify-between">
              <div className="text-xs sm:text-sm font-medium text-yellow-400">
                Level {level}
              </div>
              <div className="text-[10px] sm:text-xs text-yellow-400/60">
                ${getLevelAmount(level)}
              </div>
            </div>

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

const SubtleDivider = () => (
  <div className="relative w-full h-6 mt-6 flex items-center justify-center">
    {/* Main horizontal line */}
    <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent" />
  </div>
);

const ProgressTracker = () => {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [unlockedLevels] = useState(7);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Update the scroll effect for horizontal scrolling on mobile/tablet
  useEffect(() => {
    if (window.innerWidth < 1024 && selectedLevel) {
      const scrollToSelectedCard = () => {
        const viewport = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]');
        const levelCard = viewport?.querySelector(`[data-level="${selectedLevel}"]`);
        
        if (viewport && levelCard) {
          // Get the card's position relative to the container
          const cardOffset = (levelCard as HTMLElement).offsetLeft;
          const cardWidth = (levelCard as HTMLElement).offsetWidth;
          const viewportWidth = viewport.clientWidth;
          
          // Calculate scroll position to center the card
          const targetScroll = cardOffset - (viewportWidth - cardWidth) / 2;
          
          // Animate scroll
          viewport.scrollTo({
            left: targetScroll,
            behavior: 'smooth'
          });
        }
      };

      // Ensure DOM is ready and handle initial scroll
      requestAnimationFrame(() => {
        scrollToSelectedCard();
      });
    }
  }, [selectedLevel]);

  // Set initial selected level and scroll into view
  useEffect(() => {
    const nextLevel = Math.min(unlockedLevels + 1, 10);
    setSelectedLevel(nextLevel);
  }, []); // Only run once on mount

  // Remove the vertical scroll effect since we don't need it
  useEffect(() => {
    if (window.innerWidth <= 768 && selectedLevel) {
      // Remove this effect or update it if needed for other functionality
    }
  }, [selectedLevel]);

  return (
    <div className="relative w-full min-h-screen bg-gray-950 flex items-center section-content" id="progress">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-900 to-black animate-gradient-shift" />
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,_rgba(250,204,21,0.05),transparent_70%)]"
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/80" />
        <FloatingArrows />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full h-full flex flex-col justify-center">
        <div className="flex flex-col gap-4 sm:gap-6">
          {/* Header */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Badge className="rounded-md px-3 py-1.5 text-xs font-semibold bg-yellow-400/10 text-yellow-400 border-yellow-400/20 hover:bg-yellow-400/20 transition-colors">
                Progress Tracker
              </Badge>
            </motion.div>
            
            <motion.h2 
              className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4 mt-2"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              Your Baldness Journey
            </motion.h2>
          </motion.div>

          {/* Current Value Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex justify-center"
          >
            <Card className="bg-black/20 backdrop-blur-sm border-yellow-400/10 inline-flex">
              <CardContent className="flex items-center gap-4 py-3 px-4 sm:py-4 sm:px-6">
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  <p className="text-xs sm:text-sm font-medium text-gray-400">Current Value</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl sm:text-2xl font-bold text-yellow-400">$325M</span>
                    <span className="text-xs sm:text-sm text-yellow-400/60">USD</span>
                  </div>
                </motion.div>
                <div className="h-8 w-px bg-yellow-400/10" />
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  <p className="text-xs sm:text-sm font-medium text-gray-400">Level</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl sm:text-2xl font-bold text-yellow-400">8</span>
                    <span className="text-xs sm:text-sm text-yellow-400/60">/ 10</span>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Info Box */}
          <motion.div 
            className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {selectedLevel ? (
                <motion.div 
                  key={selectedLevel}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 sm:p-5 flex items-start gap-4 sm:gap-5 h-[140px]"
                >
                  <div className="relative w-20 h-24 sm:w-24 sm:h-28 rounded-lg overflow-hidden border border-yellow-400/20 shrink-0">
                    <motion.img
                      src={`/bald-landing/levels/${selectedLevel}.jpg`}
                      alt={`Level ${selectedLevel}`}
                      className={cn(
                        "w-full h-full object-cover",
                        selectedLevel > unlockedLevels && "grayscale opacity-50"
                      )}
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <motion.h3 
                        className="text-yellow-400 font-bold text-base sm:text-lg drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        Level {selectedLevel}
                      </motion.h3>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        <Badge variant="outline" className="text-xs text-yellow-400/80 border-yellow-400/20 shadow-[0_2px_3px_rgba(0,0,0,0.3)]">
                          ${getLevelAmount(selectedLevel)}
                        </Badge>
                      </motion.div>
                    </div>
                    <motion.p 
                      className="text-xs sm:text-sm text-gray-400 mt-1 line-clamp-2 drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)]"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                    >
                      {levelDescriptions[selectedLevel - 1]}
                    </motion.p>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-3 sm:p-4 flex items-center justify-center h-[80px]"
                >
                  <span className="text-xs sm:text-sm text-gray-400 drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)]">
                    Select a level to view details
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Level Cards Grid */}
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <ScrollArea 
              ref={scrollAreaRef}
              className="w-full"
            >
              <div className="px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:grid-flow-row lg:auto-rows-fr">
                  {[...Array(10)].map((_, idx) => (
                    <div 
                      key={idx + 1}
                      data-level={idx + 1}
                      className="h-full lg:h-auto"
                    >
                      <LevelCard
                        level={idx + 1}
                        isUnlocked={idx + 1 <= unlockedLevels}
                        onClick={() => setSelectedLevel(idx + 1)}
                        isSelected={selectedLevel === idx + 1}
                        unlockedLevels={unlockedLevels}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </ScrollArea>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;