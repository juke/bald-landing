import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowUp } from "lucide-react";
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

const ProgressTracker = () => {
  return (
    <div className="relative w-full h-full overflow-hidden bg-gray-950 flex items-center">
      {/* Animated background */}
      <div className="absolute inset-0">
        {/* Animated gradient background */}
        <div 
          className="absolute inset-0 bg-gradient-to-t from-black via-gray-900 to-black animate-gradient-shift"
          style={{
            backgroundSize: '200% 200%',
          }}
        />
        
        {/* Glowing effect */}
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,_rgba(250,204,21,0.15),transparent_70%)]"
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Floating arrows effect */}
        <FloatingArrows />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 py-20 pb-32">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <Badge 
            variant="outline" 
            className="bg-yellow-400/10 text-yellow-400 border-yellow-400/20 px-4 py-2 mb-6 text-base"
          >
            Progress
          </Badge>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Baldness Levels
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Track your journey to complete baldness through our revolutionary level system
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[...Array(10)].map((_, level) => (
            <motion.div
              key={level}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ 
                duration: 0.4,
                delay: level * 0.1,
              }}
            >
              <Card className="relative group bg-black/40 border-yellow-400/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="relative">
                    <div className="text-3xl font-bold text-yellow-400 mb-2">
                      {level + 1}
                    </div>
                    <div className="text-sm text-gray-400 mb-4">
                      Level {level + 1}
                    </div>
                    <Progress 
                      value={(level + 1) * 10} 
                      className="h-1 bg-gray-800"
                      indicatorClassName="bg-yellow-400 transition-all duration-700"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;