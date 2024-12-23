import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { TwitterIcon, TelegramIcon, DiscordIcon } from "@/components/icons/SocialIcons";
import { useState, useEffect } from "react";

const Header = () => {
  const activeSection = useActiveSection();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isMenuOpen && !target.closest('.mobile-menu') && !target.closest('.menu-button')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'public-good', label: 'Public Good' },
    { id: 'distribution', label: 'Distribution' },
    { id: 'progress', label: 'Progress' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/10 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <nav className="flex items-center justify-between h-16">
          <div className="text-xl font-bold text-yellow-400">$BALD</div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className="relative"
              >
                <motion.span
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-yellow-400",
                    activeSection === item.id 
                      ? "text-yellow-400" 
                      : "text-gray-400"
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                </motion.span>
                {activeSection === item.id && (
                  <motion.div
                    className="absolute -bottom-[1.5px] left-0 right-0 h-[2px] bg-yellow-400"
                    layoutId="activeSection"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </a>
            ))}

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 mr-2">
                <motion.a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <TwitterIcon />
                </motion.a>
                <motion.a
                  href="https://telegram.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <TelegramIcon />
                </motion.a>
                <motion.a
                  href="https://discord.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <DiscordIcon />
                </motion.a>
              </div>

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

          {/* Mobile Menu Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
            }}
            className="md:hidden text-gray-400 hover:text-yellow-400 transition-colors menu-button"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Menu with Backdrop */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Dark overlay behind menu */}
              <motion.div
                className="fixed inset-0 top-16 bg-black/60 md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
              
              {/* Menu Content */}
              <motion.div
                className="fixed inset-x-4 top-[4.5rem] bg-black supports-[backdrop-filter]:backdrop-blur-lg md:hidden mobile-menu rounded-2xl border border-white/5 shadow-lg shadow-black/20"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex flex-col items-center py-6 px-4 max-h-[calc(100vh-6rem)] overflow-y-auto">
                  {navItems.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={(e) => handleNavClick(e, item.id)}
                      className={cn(
                        "w-full text-center py-4 text-lg font-medium transition-colors hover:bg-white/5 rounded-xl",
                        activeSection === item.id 
                          ? "text-yellow-400" 
                          : "text-gray-400"
                      )}
                    >
                      {item.label}
                    </a>
                  ))}

                  <div className="flex items-center gap-6 mt-6">
                    <motion.a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-yellow-400 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <TwitterIcon />
                    </motion.a>
                    <motion.a
                      href="https://telegram.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-yellow-400 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <TelegramIcon />
                    </motion.a>
                    <motion.a
                      href="https://discord.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-yellow-400 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <DiscordIcon />
                    </motion.a>
                  </div>

                  <div className="flex flex-col w-full gap-4 mt-6">
                    <motion.a
                      href="https://app.uniswap.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 bg-yellow-400 text-black px-4 py-3 rounded-xl text-base font-bold hover:bg-yellow-300 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Buy Now
                      <ArrowRight className="w-4 h-4" />
                    </motion.a>
                    <motion.a
                      href="https://dexscreener.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 bg-black/20 backdrop-blur-sm text-yellow-400 px-4 py-3 rounded-xl text-base font-bold border border-yellow-400/20 hover:bg-black/30 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Chart
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
