import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, ChevronUp } from "lucide-react";
import { useState, useCallback } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { buttonVariants } from "@/components/ui/button";

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'public-good', label: 'Public Good' },
  { id: 'distribution', label: 'Distribution' },
  { id: 'progress', label: 'Progress' },
];

const Header = () => {
  const { activeSection, setActiveSection, setLastInteractionTime } = useActiveSection();
  const [isOpen, setIsOpen] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  const isAtTop = activeSection === 'home';

  const handleClick = useCallback((id: string, isMobile?: boolean) => {
    const element = document.getElementById(id);
    if (element) {
      setLastInteractionTime();
      setActiveSection(id);
      
      if (isMobile) setIsOpen(false);

      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      
      window.history.replaceState(null, '', `#${id}`);
    }
  }, [setActiveSection, setLastInteractionTime, setIsOpen]);

  const handleLogoClick = () => {
    if (isAtTop) return;

    const element = document.getElementById('home');
    if (element) {
      setLastInteractionTime();
      setActiveSection('home');
      
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      
      window.history.replaceState(null, '', '#home');
    }
  };

  const NavigationLink = ({ item, isMobile = false }: { item: typeof navItems[0], isMobile?: boolean }) => (
    <div className="relative">
      <motion.button
        onClick={() => {
          handleClick(item.id, isMobile);
        }}
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "cursor-pointer transition-colors relative z-10",
          activeSection === item.id 
            ? "text-yellow-400 hover:text-yellow-400" 
            : "text-gray-400 hover:text-yellow-400",
          isMobile ? "w-full justify-start px-2" : "px-3",
          "!cursor-pointer"
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {item.label}
      </motion.button>
    </div>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16">
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/10 to-transparent backdrop-blur-[2px]" />
      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <nav className="flex items-center justify-between h-16">
          <motion.div 
            className={cn(
              "flex items-center text-2xl font-bold text-yellow-400 select-none",
              !isAtTop && "cursor-pointer"
            )}
            onClick={handleLogoClick}
            onHoverStart={() => !isAtTop && setIsLogoHovered(true)}
            onHoverEnd={() => setIsLogoHovered(false)}
            whileHover={!isAtTop ? { scale: 1.05 } : {}}
            whileTap={!isAtTop ? { scale: 0.95 } : {}}
          >
            <span>$BALD</span>
            <AnimatePresence>
              {isLogoHovered && !isAtTop && (
                <motion.div
                  initial={{ width: 0, opacity: 0, x: -10 }}
                  animate={{ width: 'auto', opacity: 1, x: 0 }}
                  exit={{ width: 0, opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="ml-2 overflow-hidden"
                >
                  <ChevronUp className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          
          <div className="hidden md:flex items-center gap-8">
            {/* Desktop Navigation */}
            <div className="flex items-center gap-1">
              {navItems.map((item) => (
                <NavigationLink key={item.id} item={item} />
              ))}
            </div>

            <div className="flex items-center gap-4">
              <motion.a
                href="https://app.uniswap.org"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 bg-yellow-400 text-black px-3 py-1.5 rounded-lg text-sm font-bold hover:bg-yellow-300 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Buy Now
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.a>
              <motion.a
                href="https://dexscreener.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 bg-black/20 backdrop-blur-sm text-yellow-400 px-3 py-1.5 rounded-lg text-sm font-bold border border-yellow-400/20 hover:bg-black/30 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Chart
              </motion.a>
            </div>
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button className="md:hidden text-gray-400 hover:text-yellow-400 transition-colors cursor-pointer">
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs bg-black/95 backdrop-blur-sm border-white/5">
              <nav className="flex flex-col gap-2 mt-6">
                {navItems.map((item) => (
                  <NavigationLink key={item.id} item={item} isMobile />
                ))}
                <div className="flex flex-col gap-3 mt-4">
                  <motion.a
                    href="https://app.uniswap.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Buy Now
                    <ArrowRight className="w-4 h-4" />
                  </motion.a>
                  <motion.a
                    href="https://dexscreener.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 bg-black/20 text-yellow-400 px-4 py-2 rounded-lg font-bold border border-yellow-400/20"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Chart
                  </motion.a>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  );
};

export default Header;
