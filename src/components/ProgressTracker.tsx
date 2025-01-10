import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, Lock } from "lucide-react";
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
    case 7: return '100M';
    case 8: return '250M';
    case 9: return '500M';
    case 10: return '1B';
    default: return '0';
  }
};

const getPreviousLevelAmount = (level: number) => {
  return getLevelAmount(level - 1);
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
            opacity: [0, 0.15, 0.15, 0],
          }}
          transition={{
            duration: 20, // Much slower
            repeat: Infinity,
            delay: i * 3, // More spread out
            ease: "linear",
          }}
        >
          <ArrowUp className="w-40 h-40 text-yellow-400/20" />
        </motion.div>
      ))}

      {/* Medium arrows - steady flow */}
      {[...Array(10)].map((_, i) => {
        const startX = Math.random() * dimensions.width;
        const duration = Math.random() * 4 + 12; // 12-16 seconds
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
              opacity: [0, 0.35, 0.35, 0],
              scale: [0.8, 1, 0.9],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              delay: i * 1.2, // More spread out
              ease: "linear",
            }}
          >
            <ArrowUp className="w-16 h-16 text-yellow-400/30" />
          </motion.div>
        );
      })}

      {/* Small arrows - gentle rise */}
      {[...Array(12)].map((_, i) => {
        const startX = Math.random() * dimensions.width;
        const duration = Math.random() * 3 + 8; // 8-11 seconds
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
              opacity: [0, 0.4, 0.4, 0],
              scale: [0.6, 0.8, 0.7],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "linear",
            }}
          >
            <ArrowUp className="w-8 h-8 text-yellow-400/40" />
          </motion.div>
        );
      })}
    </div>
  );
};

const LevelCard = ({ level, isUnlocked, onClick, isSelected }: { 
  level: number; 
  isUnlocked: boolean; 
  onClick: () => void;
  isSelected: boolean;
}) => {
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
        <CardContent className="p-3">
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
                  ((parseInt(getLevelAmount(level - 1).replace(/\D/g, '')) / 
                    parseInt(getLevelAmount(level).replace(/\D/g, ''))) * 100
                  ), 100)} 
                className="h-1 bg-gray-800"
                indicatorClassName={cn(
                  "transition-all duration-700",
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

const LevelDetails = ({ level, isUnlocked, unlockedLevels }: LevelDetailsProps) => {
  return (
    <motion.div
      className="space-y-4 p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="relative w-full rounded-2xl overflow-hidden bg-black/20 backdrop-blur-sm border border-yellow-400/10"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {/* Level Image */}
        <div className="relative w-full">
          <div className="relative aspect-[16/9] overflow-hidden rounded-t-2xl">
            <img
              src={`/bald-landing/levels/${level}.jpg`}
              alt={`Level ${level} baldness`}
              className={cn(
                "w-full h-full object-cover transition-all duration-300",
                !isUnlocked && "grayscale opacity-50"
              )}
            />
            {!isUnlocked && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <Lock className="w-12 h-12 text-yellow-400/50" />
              </div>
            )}
          </div>
        </div>

        {/* Title section */}
        <div className="flex items-baseline gap-3 p-6">
          <h3 className={`text-mobile-title ${isUnlocked ? 'text-yellow-400' : 'text-yellow-400/50'}`}>
            Level {level}
          </h3>
          <span className={`text-mobile-subtitle ${isUnlocked ? 'text-yellow-400/60' : 'text-yellow-400/30'}`}>
            ${getLevelAmount(level)}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="px-6 pb-4">
          <Progress 
            value={isUnlocked ? 100 : Math.min(
              ((parseInt(getLevelAmount(unlockedLevels).replace(/\D/g, '')) / 
                parseInt(getLevelAmount(level).replace(/\D/g, ''))) * 100
              ), 100)} 
            className="h-1.5 bg-gray-800"
            indicatorClassName={`${isUnlocked ? 'bg-yellow-400' : 'bg-yellow-400/30'} transition-all duration-700`}
          />
          <div className="flex justify-between mt-1 text-xs text-gray-400">
            <span>${level === 1 ? '0' : getPreviousLevelAmount(level)}</span>
            <span>${getLevelAmount(level)}</span>
          </div>
        </div>

        {/* Description */}
        <div className={`p-6 border-t border-yellow-400/10 ${!isUnlocked && 'opacity-70'}`}>
          <p className="text-mobile-body text-gray-300 leading-relaxed">
            {levelDescriptions[level - 1]}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProgressTracker = () => {
  const [selectedLevel, setSelectedLevel] = useState<number>(0);
  const [unlockedLevels] = useState(4);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const detailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLevelClick = (level: number) => {
    setSelectedLevel(level);
    
    // Update URL hash instead of using router
    window.history.replaceState(
      null, 
      '', 
      `#progress?level=${level}`
    );
    
    // Mobile scroll handling remains the same
    if (window.innerWidth < 768) {
      setTimeout(() => {
        if (detailsRef.current) {
          const headerHeight = 64;
          const padding = 20;
          const container = document.querySelector('.snap-container');
          if (!container) return;

          const containerRect = container.getBoundingClientRect();
          const elementRect = detailsRef.current.getBoundingClientRect();
          const relativeTop = elementRect.top - containerRect.top;
          
          container.scrollTo({
            top: container.scrollTop + relativeTop - headerHeight - padding,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  };

  // Update URL sync to use hash
  useEffect(() => {
    const hash = window.location.hash;
    const levelMatch = hash.match(/progress\?level=(\d+)/);
    if (levelMatch) {
      const urlLevel = parseInt(levelMatch[1]);
      if (urlLevel >= 1 && urlLevel <= 10) {
        setSelectedLevel(urlLevel);
      }
    }
  }, []);

  // Set selected level to latest unlocked level when unlocked levels change
  useEffect(() => {
    setSelectedLevel(unlockedLevels);
  }, [unlockedLevels]);

  // Initialize selected level
  useEffect(() => {
    setSelectedLevel(unlockedLevels);
  }, []);

  // Simulate unlocking a new level every 30 seconds
  useEffect(() => {
    if (unlockedLevels < 10) {
      const timer = setInterval(() => {
        setUnlockedLevels(prev => Math.min(prev + 1, 10));
      }, 30000);
      return () => clearInterval(timer);
    }
  }, [unlockedLevels]);

  return (
    <div className="min-h-screen w-full relative flex flex-col py-16 md:py-24">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-900 to-black animate-gradient-shift" />
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,_rgba(250,204,21,0.15),transparent_70%)]"
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <FloatingArrows />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 flex flex-col flex-1">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="outline" className="bg-yellow-400/10 text-yellow-400 border-yellow-400/20 mb-4">
            Progress Tracker
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Your Baldness Journey
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-mobile-body">
            Track your transformation through {unlockedLevels} unlocked levels
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 max-w-7xl mx-auto w-full flex-1">
          {/* Details Section - Regular flow on mobile */}
          <div className="w-full lg:w-2/5 order-1 lg:sticky lg:top-[80px]">
            <div className="bg-black/20 backdrop-blur-sm border border-yellow-400/10 rounded-xl p-4 md:p-6">
              <AnimatePresence mode="wait">
                {selectedLevel ? (
                  <LevelDetails
                    key={selectedLevel}
                    level={selectedLevel}
                    isUnlocked={selectedLevel <= unlockedLevels}
                    unlockedLevels={unlockedLevels}
                  />
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center text-center"
                  >
                    <div className="text-yellow-400/30 mb-4">
                      <Lock className="w-12 h-12" />
                    </div>
                    <h3 className="text-xl font-semibold text-yellow-400/60 mb-2">
                      Select a Level
                    </h3>
                    <p className="text-gray-400 text-mobile-body">
                      Choose a level to view detailed information about your baldness journey
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Grid Section */}
          <div className="w-full lg:w-3/5 order-2">
            <ScrollArea 
              className="rounded-xl border border-yellow-400/10 bg-black/20 backdrop-blur-sm"
              style={{ height: 'calc(100vh - 300px)' }}
            >
              <div className="p-4 md:p-6">
                <div className="flex lg:grid gap-4 lg:grid-cols-3 xl:grid-cols-4 snap-x lg:snap-none overflow-x-auto">
                  {[...Array(10)].map((_, idx) => (
                    <div 
                      key={idx + 1} 
                      className={cn(
                        "flex-none lg:w-auto snap-center",
                        "transform-gpu transition-all duration-300",
                        "w-[55vw] sm:w-[40vw] first:ml-[22.5vw] sm:first:ml-[30vw]",
                        "lg:first:ml-0 lg:transform-none"
                      )}
                      style={{
                        ...(isMobile && {
                          transform: `perspective(1000px) rotateY(${idx === selectedLevel - 1 ? 0 : -15}deg)`,
                          opacity: idx === selectedLevel - 1 ? 1 : 0.85,
                        })
                      }}
                    >
                      <motion.div
                        whileHover={{ 
                          scale: 1.02,
                          ...(isMobile && { rotateY: 0 })
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className="transform-gpu"
                      >
                        <LevelCard
                          level={idx + 1}
                          isUnlocked={idx + 1 <= unlockedLevels}
                          onClick={() => handleLevelClick(idx + 1)}
                          isSelected={selectedLevel === idx + 1}
                        />
                      </motion.div>
                    </div>
                  ))}
                </div>
                <div className="h-8" />
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;