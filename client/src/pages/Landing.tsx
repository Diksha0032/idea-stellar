import { Navbar } from "@/components/Navbar";
import { ParticleBackground } from "@/components/ParticleBackground";
import { FloatingIcons } from "@/components/FloatingIcons";
import { SpaceBackground } from "@/components/SpaceBackground";
import { Section } from "@/components/Section";
import { TrackCard } from "@/components/TrackCard";
import { useTracks } from "@/hooks/use-tracks";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { Trophy, Calendar, Users, Cpu, ArrowRight, Lightbulb, Code, Presentation, Award, Rocket, Clock } from "lucide-react";
import { useState, useEffect } from "react";

function CountdownTimer() {
  const targetDate = new Date("2025-10-25T00:00:00").getTime();
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-6">
      {timeUnits.map((unit, i) => (
        <motion.div
          key={unit.label}
          initial={{ opacity: 0, y: 20, rotateX: -30 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: 0.8 + i * 0.1, duration: 0.6 }}
          className="perspective-container"
        >
          <div className="timer-digit rounded-2xl p-4 md:p-6 min-w-[80px] md:min-w-[100px] text-center">
            <div className="font-orbitron text-3xl md:text-5xl font-bold text-white mb-1">
              {String(unit.value).padStart(2, '0')}
            </div>
            <div className="text-white/40 text-xs uppercase tracking-widest">{unit.label}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function Landing() {
  const { data: tracks } = useTracks();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const steps = [
    {
      number: "01",
      icon: Lightbulb,
      title: "Ideation",
      description: "Form teams, brainstorm innovative ideas, and define your project scope. Get inspired by mentors and industry experts.",
      duration: "Day 1 - 6 Hours"
    },
    {
      number: "02",
      icon: Code,
      title: "Development",
      description: "Build your prototype using cutting-edge technologies. Access exclusive APIs and get hands-on support from sponsors.",
      duration: "Day 1-2 - 30 Hours"
    },
    {
      number: "03",
      icon: Presentation,
      title: "Pitch & Demo",
      description: "Present your solution to a panel of industry-leading judges. Showcase your innovation and technical prowess.",
      duration: "Day 3 - 6 Hours"
    },
    {
      number: "04",
      icon: Award,
      title: "Awards & Celebration",
      description: "Winners announced! Network with sponsors, receive prizes, and celebrate your achievements with the community.",
      duration: "Day 3 - 6 Hours"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30">
      <Navbar />
      <ParticleBackground />
      <SpaceBackground />
      <FloatingIcons />

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center pt-28 overflow-hidden">
        
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
            <span className="block text-white text-3d">BUILD THE</span>
            <span className="block text-gradient-interstellar drop-shadow-[0_0_30px_rgba(0,212,255,0.2)]">
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

          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-12"
          >
            <p className="text-white/40 text-sm uppercase tracking-widest mb-6 flex items-center justify-center gap-2">
              <Clock className="w-4 h-4" /> Event Starts In
            </p>
            <CountdownTimer />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
          >
            <a href="/api/login">
              <Button size="lg" className="h-14 px-10 rounded-full bg-primary text-primary-foreground hover:bg-cyan-400 hover:scale-105 transition-all duration-300 font-bold text-lg glow-button">
                Register Now
              </Button>
            </a>
            <Button variant="outline" size="lg" className="h-14 px-10 rounded-full border-white/20 text-white hover:bg-white/5 hover:border-cyan-400/50 transition-all text-lg">
              View Schedule
            </Button>
          </motion.div>
        </div>
        
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
            <motion.div 
              key={i} 
              className="text-center p-4 rounded-xl hover-shadow cursor-default"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-3xl md:text-4xl font-display font-bold text-white mb-2">{stat.value}</div>
              <div className="text-primary text-xs tracking-widest uppercase">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* About Ideathon Section */}
      <Section id="about-ideathon" className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
        
        <div className="relative z-10">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-primary text-sm font-bold tracking-[0.3em] uppercase">What Is</span>
              <h2 className="text-4xl md:text-6xl font-display font-bold text-white mt-4 mb-6">
                HACK<span className="text-gradient-interstellar">GOLD</span> IDEATHON
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-8" />
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-white/70 text-lg leading-relaxed mb-6">
                HackGold Ideathon is a premier 48-hour innovation marathon that brings together the brightest minds from around the globe. 
                It's not just a hackathon — it's a launchpad for revolutionary ideas that will shape the future of technology.
              </p>
              <p className="text-white/70 text-lg leading-relaxed mb-6">
                Whether you're a seasoned developer, a creative designer, or an ambitious entrepreneur, HackGold provides the perfect 
                environment to collaborate, innovate, and transform your vision into reality.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  { icon: Rocket, label: "48 Hours of Innovation" },
                  { icon: Users, label: "Global Community" },
                  { icon: Trophy, label: "$100k+ in Prizes" },
                  { icon: Cpu, label: "Cutting-Edge Tech" }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover-shadow cursor-default"
                  >
                    <item.icon className="w-6 h-6 text-primary" />
                    <span className="text-white/80 text-sm font-medium">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative perspective-container"
            >
              <div className="card-3d">
                <div className="card-3d-inner aspect-video rounded-3xl overflow-hidden relative border border-primary/20 glass-gold">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center opacity-60" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  <div className="absolute inset-0 shimmer-gold" />
                  <div className="absolute bottom-8 left-8 right-8">
                    <div className="text-5xl font-orbitron font-bold text-gradient-gold mb-2">48:00:00</div>
                    <div className="text-white/60 text-sm tracking-widest uppercase">Hours of Pure Innovation</div>
                  </div>
                </div>
              </div>
              
              {/* Floating decorative elements */}
              <motion.div 
                animate={{ y: [0, -20, 0], rotateZ: [0, 5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-primary to-[#9E7F0D] rounded-full blur-[60px] opacity-30" 
              />
              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-5 -left-5 w-24 h-24 border-2 border-primary/30 rounded-full" 
              />
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Steps / Timeline Section */}
      <Section id="steps">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">The Ideathon Steps</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-black/40 border border-white/10 rounded-2xl p-6 text-center hover:border-primary/30 transition-colors click-shadow cursor-pointer"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary">
                <step.icon className="w-7 h-7" />
              </div>
              <div className="text-primary/60 text-sm font-medium mb-2">{step.number}</div>
              <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-3">{step.description}</p>
              <div className="text-primary text-xs font-medium">{step.duration}</div>
            </motion.div>
          ))}
        </div>
      </Section>

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
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
              <span className="font-body">An Experience</span> <br />
              <span className="font-display text-gradient-interstellar italic">Unlike Any Other</span>
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
                  className="flex gap-6 p-4 rounded-xl hover:bg-white/5 hover-shadow transition-all cursor-default"
                >
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-black border border-primary/30 flex items-center justify-center text-primary">
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
          <div className="relative perspective-container">
             {/* Decorative Image Placeholder - 3D Cube */}
             <div className="aspect-square rounded-3xl overflow-hidden relative border border-white/10 bg-black/40">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1635322966219-b75ed372eb01?q=80&w=2864&auto=format&fit=crop')] bg-cover bg-center opacity-40" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8">
                    <div className="text-5xl font-display font-bold text-gradient-interstellar mb-2">48h</div>
                    <div className="text-primary text-sm tracking-widest uppercase">Of Non-Stop Innovation</div>
                  </div>
               </div>
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
            whileHover={{ y: -5 }}
            className="bg-black/40 border border-white/10 rounded-2xl p-8 text-center relative overflow-hidden group click-shadow cursor-pointer"
          >
            <div className="text-4xl font-bold text-white/20 mb-4 group-hover:text-primary/20 transition-colors">02</div>
            <div className="text-2xl font-bold text-white mb-2">Runner Up</div>
            <div className="text-3xl font-display font-bold text-primary mb-6">$25,000</div>
            <ul className="text-sm text-white/60 space-y-2">
              <li>MacBook Pro M3</li>
              <li>YC Interview Fast-track</li>
              <li>1 Year Replit Core</li>
            </ul>
          </motion.div>

          {/* 1st Place */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-gradient-to-b from-cyan-500/10 to-black border border-cyan-400/30 rounded-2xl p-10 text-center relative overflow-hidden order-first md:order-none z-10 transform md:-translate-y-8 click-shadow cursor-pointer"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
            <div className="relative z-10">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-cyan-400 to-purple-600 rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(0,212,255,0.3)]">
                <Trophy className="text-white w-8 h-8" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">Grand Prize</div>
              <div className="text-5xl font-display font-bold text-gradient-interstellar mb-8">$50,000</div>
              <ul className="text-sm text-white/80 space-y-3 font-medium">
                <li>$50k Cash Prize</li>
                <li>Direct VC Introduction</li>
                <li>Lifetime Replit Core</li>
                <li>Featured in TechCrunch</li>
              </ul>
            </div>
          </motion.div>

          {/* 3rd Place */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-black/40 border border-white/10 rounded-2xl p-8 text-center relative overflow-hidden group click-shadow cursor-pointer"
          >
            <div className="text-4xl font-bold text-white/20 mb-4 group-hover:text-primary/20 transition-colors">03</div>
            <div className="text-2xl font-bold text-white mb-2">Third Place</div>
            <div className="text-3xl font-display font-bold text-primary mb-6">$10,000</div>
            <ul className="text-sm text-white/60 space-y-2">
              <li>iPad Pro</li>
              <li>Cloud Credits</li>
              <li>Swag Pack</li>
            </ul>
          </motion.div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-black text-center relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center gap-2 mb-8 opacity-50 hover:opacity-100 transition-opacity">
            <span className="font-display font-bold text-3xl md:text-4xl tracking-tight text-white">
              HACK<span className="text-gradient-interstellar">GOLD</span>
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
