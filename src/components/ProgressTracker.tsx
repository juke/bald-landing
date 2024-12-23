import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const ProgressTracker = () => {
  return (
    <div className="relative w-full h-full overflow-hidden bg-gray-950 flex items-center">
      {/* Static gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/80" />

      <div className="relative z-10 max-w-7xl mx-auto px-8 py-20">
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