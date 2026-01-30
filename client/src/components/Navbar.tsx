import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const { user, logout } = useAuth();
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isHome = location === "/";

  const navLinks = [
    { href: "/tracks", label: "Tracks" },
    { href: "/#about", label: "About" },
    { href: "/#prizes", label: "Prizes" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/50 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-primary to-[#9E7F0D] flex items-center justify-center transform group-hover:rotate-45 transition-transform duration-300">
              <span className="text-black font-bold font-display text-lg">H</span>
            </div>
            <span className="font-display font-bold text-xl tracking-wider text-white group-hover:text-primary transition-colors">
              HACK<span className="text-primary">GOLD</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.label}
                href={link.href} 
                className="text-sm font-medium text-white/70 hover:text-primary transition-colors tracking-widest uppercase text-[11px]"
              >
                {link.label}
              </a>
            ))}

            {user ? (
              <div className="flex items-center gap-4">
                <Link href="/dashboard">
                  <Button variant="ghost" className="text-white hover:text-primary hover:bg-white/5">
                    Dashboard
                  </Button>
                </Link>
                <Button 
                  onClick={() => logout()} 
                  variant="outline" 
                  className="border-primary/50 text-primary hover:bg-primary hover:text-black transition-all duration-300"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <a href="/api/login">
                <Button className="bg-gradient-to-r from-primary via-[#FDB931] to-[#FFD700] text-black font-bold hover:shadow-[0_0_20px_rgba(255,215,0,0.3)] border-0 transition-all duration-300 rounded-full px-8">
                  Register Now
                </Button>
              </a>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white hover:text-primary"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 border-b border-white/10 overflow-hidden"
          >
            <div className="px-4 py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <a 
                  key={link.label}
                  href={link.href} 
                  className="text-lg font-display text-white/80 hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              {user ? (
                <>
                  <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                    <span className="text-lg font-display text-white/80 hover:text-primary block">Dashboard</span>
                  </Link>
                  <Button onClick={() => logout()} className="w-full bg-primary text-black">Logout</Button>
                </>
              ) : (
                <a href="/api/login">
                  <Button className="w-full bg-primary text-black">Register Now</Button>
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
