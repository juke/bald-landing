import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="h-screen bg-gradient-to-br from-black to-gray-900 text-white flex flex-col items-center justify-center text-center p-8">
      <motion.h1
        className="text-6xl font-bold mb-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        $BALD - A Memecoin Revolution
      </motion.h1>
      <p className="text-lg mb-8 max-w-2xl">
        Witness Brian Armstrong get progressively <b>BALDER</b> as $BALD moonshots to Level 10 baldness!
      </p>
      <Button className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg">
        Buy $BALD Now
      </Button>
    </section>
  );
};

export default HeroSection;