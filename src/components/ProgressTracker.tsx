import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, Lock } from "lucide-react";
import { useState, useEffect } from "react";

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
            duration: 20, // Much slower
            repeat: Infinity,
            delay: i * 3, // More spread out
            ease: "linear",
          }}
        >
          <ArrowUp className="w-40 h-40 text-yellow-400/10" />
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
              opacity: [0, 0.25, 0.25, 0],
              scale: [0.8, 1, 0.9],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              delay: i * 1.2, // More spread out
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

const LevelCard = ({ level, isUnlocked, onClick, isSelected }: { 
  level: number; 
  isUnlocked: boolean; 
  onClick: () => void;
  isSelected: boolean;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ 
        duration: 0.4,
        delay: level * 0.1,
      }}
    >
      <Card 
        className={`relative group bg-black/40 border-yellow-400/20 backdrop-blur-sm cursor-pointer overflow-hidden
          ${isSelected ? 'ring-2 ring-yellow-400' : ''}
          ${isUnlocked ? 'hover:border-yellow-400/40' : 'opacity-70'}
        `}
        onClick={onClick}
      >
        <CardContent className="p-4">
          <div className="relative">
            <div className="aspect-square rounded-lg overflow-hidden mb-3 relative">
              <img 
                src={`/bald-landing/levels/${level}.jpg`} 
                alt={`Level ${level} baldness`}
                className={`w-full h-full object-cover transition-transform duration-300
                  ${isUnlocked ? 'group-hover:scale-110' : 'grayscale'}
                `}
              />
              {!isUnlocked && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <Lock className="w-8 h-8 text-yellow-400/50" />
                </div>
              )}
            </div>
            <div className="text-2xl font-bold text-yellow-400 mb-1">
              Level {level}
            </div>
            <Progress 
              value={level * 10} 
              className="h-1 bg-gray-800"
              indicatorClassName={`${isUnlocked ? 'bg-yellow-400' : 'bg-yellow-400/30'} transition-all duration-700`}
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const LevelDetails = ({ level }: { level: number }) => {
  const levelDescriptions = [
    "The journey begins! A full head of hair, but the transformation awaits.",
    "Subtle changes emerge as the hairline starts its graceful retreat.",
    "The crown begins to thin, marking the path to enlightenment.",
    "A noticeable transformation takes hold, embracing the change.",
    "The middle ground - neither here nor there, but progress is clear.",
    "More than halfway there! The shine becomes more prominent.",
    "The classic horseshoe pattern emerges, a sign of distinction.",
    "Embracing the change, minimal maintenance required.",
    "Nearly there! The final stages of transformation.",
    "Achievement unlocked: Maximum baldness achieved! True enlightenment.",
  ];

  return (
    <motion.div
      className="col-span-2 md:col-span-5 bg-black/40 rounded-2xl border border-yellow-400/20 backdrop-blur-sm p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <div className="w-48 h-48 rounded-xl overflow-hidden">
          <motion.img
            src={`/bald-landing/levels/${level}.jpg`}
            alt={`Level ${level} baldness`}
            className="w-full h-full object-cover"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-yellow-400 mb-2">
            Level {level} - {level * 10}% Baldness
          </h3>
          <p className="text-gray-300 text-lg leading-relaxed">
            {levelDescriptions[level - 1]}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const ProgressTracker = () => {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [unlockedLevels, setUnlockedLevels] = useState(3); // Start with 3 levels unlocked

  const handleLevelClick = (level: number) => {
    if (level <= unlockedLevels) {
      setSelectedLevel(level);
    }
  };

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
    <div className="relative w-full h-full overflow-hidden bg-gray-950 flex items-center">
      {/* Background elements remain the same */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-900 to-black animate-gradient-shift"
          style={{ backgroundSize: '200% 200%' }}
        />
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,_rgba(250,204,21,0.15),transparent_70%)]"
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <FloatingArrows />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-20 pb-32">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.4 }}
        >
          <Badge 
            variant="outline" 
            className="bg-yellow-400/10 text-yellow-400 border-yellow-400/20 px-4 py-2 mb-6 text-base"
          >
            Progress Tracker
          </Badge>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            Your Baldness Journey
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            Track your transformation through {unlockedLevels} unlocked levels. New levels unlock as your journey progresses!
          </motion.p>
        </motion.div>

        {/* Always show LevelDetails above the grid */}
        <div className="mb-8">
          <AnimatePresence mode="wait">
            {selectedLevel && (
              <LevelDetails key={selectedLevel} level={selectedLevel} />
            )}
          </AnimatePresence>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[...Array(10)].map((_, idx) => (
            <LevelCard
              key={idx + 1}
              level={idx + 1}
              isUnlocked={idx + 1 <= unlockedLevels}
              onClick={() => handleLevelClick(idx + 1)}
              isSelected={selectedLevel === idx + 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;