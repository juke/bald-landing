import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { 
  TwitterIcon, 
  TelegramIcon, 
  DiscordIcon 
} from "./icons/SocialIcons";
import { useState } from "react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4">
      <motion.header
        className="w-full max-w-7xl"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <nav className="bg-black/20 backdrop-blur-md border border-yellow-400/20 rounded-2xl px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href="#"
              className="text-xl md:text-2xl font-bold text-yellow-400"
              whileHover={{ scale: 1.05 }}
            >
              $BALD
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <NavLink href="#home">Home</NavLink>
              <NavLink href="#roadmap">Roadmap</NavLink>
              <NavLink href="#distribution">Distribution</NavLink>
              <NavLink href="#progress">Progress</NavLink>
            </div>

            {/* Desktop Social Links & Buy Button */}
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-3">
                <SocialIcon href="https://twitter.com" icon={<TwitterIcon />} />
                <SocialIcon href="https://t.me" icon={<TelegramIcon />} />
                <SocialIcon href="https://discord.com" icon={<DiscordIcon />} />
              </div>

              <motion.a
                href="#"
                className="bg-yellow-400 text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-yellow-300 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                BUY $BALD
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-yellow-400 p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Menu */}
          <motion.div
            className={`${isMobileMenuOpen ? 'flex' : 'hidden'} md:hidden flex-col gap-4 mt-4 pt-4 border-t border-yellow-400/20`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: isMobileMenuOpen ? 1 : 0, height: isMobileMenuOpen ? 'auto' : 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col gap-2">
              <MobileNavLink href="#home" onClick={() => setIsMobileMenuOpen(false)}>Home</MobileNavLink>
              <MobileNavLink href="#roadmap" onClick={() => setIsMobileMenuOpen(false)}>Roadmap</MobileNavLink>
              <MobileNavLink href="#distribution" onClick={() => setIsMobileMenuOpen(false)}>Distribution</MobileNavLink>
              <MobileNavLink href="#progress" onClick={() => setIsMobileMenuOpen(false)}>Progress</MobileNavLink>
            </div>

            <div className="flex items-center justify-end gap-4 py-2">
              <div className="flex items-center gap-3">
                <SocialIcon href="https://twitter.com" icon={<TwitterIcon />} />
                <SocialIcon href="https://t.me" icon={<TelegramIcon />} />
                <SocialIcon href="https://discord.com" icon={<DiscordIcon />} />
              </div>
              <motion.a
                href="#"
                className="bg-yellow-400 text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-yellow-300 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                BUY $BALD
              </motion.a>
            </div>
          </motion.div>
        </nav>
      </motion.header>
    </div>
  );
};

// Helper Components
const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <motion.a
    href={href}
    className="text-gray-200 hover:text-yellow-400 transition-colors"
    whileHover={{ scale: 1.1 }}
  >
    {children}
  </motion.a>
);

const MobileNavLink = ({ 
  href, 
  children, 
  onClick 
}: { 
  href: string; 
  children: React.ReactNode;
  onClick: () => void;
}) => (
  <motion.a
    href={href}
    className="text-gray-200 hover:text-yellow-400 transition-colors px-2 py-1"
    whileHover={{ scale: 1.05 }}
    onClick={onClick}
  >
    {children}
  </motion.a>
);

const SocialIcon = ({ href, icon }: { href: string; icon: React.ReactNode }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-200 hover:text-yellow-400 transition-colors"
    whileHover={{ scale: 1.2, rotate: 10 }}
    whileTap={{ scale: 0.9 }}
  >
    {icon}
  </motion.a>
);

export default Header;
