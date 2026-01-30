import { Navbar } from "@/components/Navbar";
import { ParticleBackground } from "@/components/ParticleBackground";
import { Section } from "@/components/Section";
import { TrackCard } from "@/components/TrackCard";
import { useTracks } from "@/hooks/use-tracks";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { Trophy, Calendar, Users, Cpu, ArrowRight } from "lucide-react";

export default function Landing() {
  const { data: tracks } = useTracks();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30">
      <Navbar />
      <ParticleBackground />

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Abstract Background Element */}
        <motion.div 
          style={{ y }}
          className="absolute inset-0 z-0 flex items-center justify-center opacity-30 pointer-events-none"
        >
          <div className="w-[800px] h-[800px] rounded-full border border-primary/20 animate-[spin_60s_linear_infinite]" />
          <div className="absolute w-[600px] h-[600px] border border-primary/10 rotate-45 animate-[spin_40s_linear_infinite_reverse]" />
          <div className="absolute w-[400px] h-[400px] rounded-full border border-primary/30 animate-[pulse_4s_ease-in-out_infinite]" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h2 className="text-primary font-bold tracking-[0.3em] text-sm md:text-base uppercase mb-8">
              October 25-27, 2025 • Global Virtual
            </h2>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl lg:text-9xl font-display font-bold leading-none tracking-tight mb-8"
          >
            <span className="block text-white">BUILD THE</span>
            <span className="block text-gradient-gold drop-shadow-[0_0_30px_rgba(255,215,0,0.2)]">
              FUTURE
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-12 font-light leading-relaxed"
          >
            Join the world's most elite developers in a 48-hour challenge to define the next generation of technology. 
            $100,000 in prizes awaiting the visionaries.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <a href="/api/login">
              <Button size="lg" className="h-14 px-10 rounded-full bg-primary text-black hover:bg-white hover:scale-105 transition-all duration-300 font-bold text-lg shadow-[0_0_20px_rgba(255,215,0,0.4)]">
                Register Now
              </Button>
            </a>
            <Button variant="outline" size="lg" className="h-14 px-10 rounded-full border-white/20 text-white hover:bg-white/5 hover:border-primary/50 transition-all text-lg">
              View Schedule
            </Button>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-primary to-transparent mx-auto mb-2" />
          <span className="text-[10px] tracking-widest uppercase">Scroll</span>
        </motion.div>
      </div>

      {/* Stats Section */}
      <div className="border-y border-white/5 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Prize Pool", value: "$100k+" },
            { label: "Participants", value: "2,000+" },
            { label: "Countries", value: "45+" },
            { label: "Sponsors", value: "20+" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-display font-bold text-white mb-2">{stat.value}</div>
              <div className="text-primary text-xs tracking-widest uppercase">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tracks Section */}
      <Section id="tracks">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Challenge Tracks</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tracks?.map((track, i) => (
            <TrackCard key={track.id} track={track} index={i} />
          )) || (
            // Loading skeletons
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="h-80 bg-white/5 rounded-2xl animate-pulse border border-white/5" />
            ))
          )}
        </div>
      </Section>

      {/* About / Features Section */}
      <Section id="about" className="bg-gradient-to-b from-transparent to-black">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-8 leading-tight">
              An Experience Unlike <br />
              <span className="text-primary italic">Any Other</span>
            </h2>
            <div className="space-y-8">
              {[
                { icon: Trophy, title: "Elite Competition", desc: "Compete against the best developers from top universities and tech companies worldwide." },
                { icon: Users, title: "World-Class Mentors", desc: "Get 1:1 guidance from engineers at Google, Meta, and unicorn startups." },
                { icon: Cpu, title: "Cutting Edge Tech", desc: "Access exclusive APIs and hardware from our partners to build the impossible." },
              ].map((feature, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="flex gap-6"
                >
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary">
                    <feature.icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-white/60 leading-relaxed">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="relative">
             {/* Decorative Image Placeholder - 3D Cube */}
             <div className="aspect-square rounded-3xl overflow-hidden relative border border-white/10 glass-panel">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1635322966219-b75ed372eb01?q=80&w=2864&auto=format&fit=crop')] bg-cover bg-center opacity-50 mix-blend-overlay" />
                {/* HTML Comment for Image: Abstract gold and black geometric shapes */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="text-5xl font-display font-bold text-white mb-2">48h</div>
                  <div className="text-primary text-sm tracking-widest uppercase">Of Non-Stop Innovation</div>
                </div>
             </div>
             
             {/* Floating decorative elements */}
             <motion.div 
               animate={{ y: [0, -20, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-primary to-[#9E7F0D] rounded-full blur-[50px] opacity-20" 
             />
          </div>
        </div>
      </Section>

      {/* Prizes Section */}
      <Section id="prizes">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">The Rewards</h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Beyond the glory, we've curated a prize pool that empowers you to continue building your dreams.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-end max-w-5xl mx-auto">
          {/* 2nd Place */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-black/40 border border-white/10 rounded-2xl p-8 text-center relative overflow-hidden group"
          >
            <div className="text-4xl font-bold text-white/20 mb-4 group-hover:text-primary/20 transition-colors">02</div>
            <div className="text-2xl font-bold text-white mb-2">Runner Up</div>
            <div className="text-3xl font-display font-bold text-primary mb-6">$25,000</div>
            <ul className="text-sm text-white/60 space-y-2">
              <li>• MacBook Pro M3</li>
              <li>• YC Interview Fast-track</li>
              <li>• 1 Year Replit Core</li>
            </ul>
          </motion.div>

          {/* 1st Place */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-gradient-to-b from-[#FFD700]/10 to-black border border-[#FFD700]/30 rounded-2xl p-10 text-center relative overflow-hidden shadow-[0_0_50px_rgba(255,215,0,0.1)] order-first md:order-none z-10 transform md:-translate-y-8"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary to-[#9E7F0D] rounded-full flex items-center justify-center mb-6 shadow-lg shadow-primary/20">
              <Trophy className="text-black w-8 h-8" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">Grand Prize</div>
            <div className="text-5xl font-display font-bold text-gradient-gold mb-8">$50,000</div>
            <ul className="text-sm text-white/80 space-y-3 font-medium">
              <li>• $50k Cash Prize</li>
              <li>• Direct VC Introduction</li>
              <li>• Lifetime Replit Core</li>
              <li>• Featured in TechCrunch</li>
            </ul>
          </motion.div>

          {/* 3rd Place */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-black/40 border border-white/10 rounded-2xl p-8 text-center relative overflow-hidden group"
          >
            <div className="text-4xl font-bold text-white/20 mb-4 group-hover:text-primary/20 transition-colors">03</div>
            <div className="text-2xl font-bold text-white mb-2">Third Place</div>
            <div className="text-3xl font-display font-bold text-primary mb-6">$10,000</div>
            <ul className="text-sm text-white/60 space-y-2">
              <li>• iPad Pro</li>
              <li>• Cloud Credits</li>
              <li>• Swag Pack</li>
            </ul>
          </motion.div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-black text-center relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center gap-2 mb-8 opacity-50 hover:opacity-100 transition-opacity">
            <span className="font-display font-bold text-xl tracking-wider text-white">
              HACK<span className="text-primary">GOLD</span>
            </span>
          </div>
          <p className="text-white/40 text-sm">
            © 2025 HackGold. All rights reserved. Built for the bold.
          </p>
        </div>
      </footer>
    </div>
  );
}
