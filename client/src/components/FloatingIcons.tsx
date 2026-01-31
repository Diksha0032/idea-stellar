import { motion } from "framer-motion";
import { Lightbulb, Code, Hammer, Rocket, Brain, Trophy, Medal, Sparkles, Cpu, Zap, Target, Star } from "lucide-react";

const icons = [
  { Icon: Lightbulb, label: "idea" },
  { Icon: Code, label: "code" },
  { Icon: Hammer, label: "build" },
  { Icon: Rocket, label: "innovation" },
  { Icon: Brain, label: "think" },
  { Icon: Trophy, label: "prize" },
  { Icon: Medal, label: "win" },
  { Icon: Sparkles, label: "create" },
  { Icon: Cpu, label: "tech" },
  { Icon: Zap, label: "fast" },
  { Icon: Target, label: "goal" },
  { Icon: Star, label: "star" },
];

interface FloatingIcon {
  id: number;
  Icon: typeof Lightbulb;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  rotateX: number;
  rotateY: number;
  rotateZ: number;
  opacity: number;
}

function generateIcons(count: number): FloatingIcon[] {
  const generated: FloatingIcon[] = [];
  
  for (let i = 0; i < count; i++) {
    const iconData = icons[i % icons.length];
    generated.push({
      id: i,
      Icon: iconData.Icon,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 24 + 16,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
      rotateX: Math.random() * 30 - 15,
      rotateY: Math.random() * 30 - 15,
      rotateZ: Math.random() * 360,
      opacity: Math.random() * 0.15 + 0.05,
    });
  }
  
  return generated;
}

export function FloatingIcons() {
  const floatingIcons = generateIcons(30);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {floatingIcons.map((item) => (
        <motion.div
          key={item.id}
          className="absolute"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            transformStyle: "preserve-3d",
            perspective: "1000px",
          }}
          initial={{
            opacity: 0,
            rotateX: item.rotateX,
            rotateY: item.rotateY,
            rotateZ: item.rotateZ,
          }}
          animate={{
            opacity: [item.opacity, item.opacity * 1.5, item.opacity],
            y: [0, -30, 0],
            rotateX: [item.rotateX, item.rotateX + 15, item.rotateX],
            rotateY: [item.rotateY, item.rotateY + 20, item.rotateY],
            rotateZ: [item.rotateZ, item.rotateZ + 10, item.rotateZ],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div 
            className="relative"
            style={{
              transformStyle: "preserve-3d",
              transform: `perspective(500px) rotateX(${item.rotateX}deg) rotateY(${item.rotateY}deg)`,
            }}
          >
            <item.Icon 
              size={item.size} 
              className="text-primary drop-shadow-[0_0_10px_rgba(255,215,0,0.3)]"
              strokeWidth={1.5}
            />
            {/* 3D Shadow Effect */}
            <div 
              className="absolute inset-0 blur-sm"
              style={{
                transform: "translateZ(-10px) translateX(3px) translateY(3px)",
                opacity: 0.3,
              }}
            >
              <item.Icon 
                size={item.size} 
                className="text-primary/30"
                strokeWidth={1.5}
              />
            </div>
          </div>
        </motion.div>
      ))}
      
      {/* Additional wireframe shapes for 3D effect */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`shape-${i}`}
          className="absolute border border-primary/10"
          style={{
            left: `${10 + (i * 12)}%`,
            top: `${15 + (i * 10)}%`,
            width: `${30 + i * 5}px`,
            height: `${30 + i * 5}px`,
            transformStyle: "preserve-3d",
          }}
          animate={{
            rotateX: [0, 360],
            rotateY: [0, 180],
            rotateZ: i % 2 === 0 ? [0, 360] : [360, 0],
          }}
          transition={{
            duration: 20 + i * 3,
            delay: i * 0.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
      
      {/* 3D Cubes */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={`cube-${i}`}
          className="absolute"
          style={{
            left: `${20 + i * 18}%`,
            top: `${30 + i * 12}%`,
            transformStyle: "preserve-3d",
            perspective: "800px",
          }}
          animate={{
            rotateX: [0, 360],
            rotateY: [0, 360],
          }}
          transition={{
            duration: 25 + i * 5,
            delay: i,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div 
            className="relative w-8 h-8"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Front face */}
            <div 
              className="absolute inset-0 border border-primary/20 bg-primary/5"
              style={{ transform: "translateZ(16px)" }}
            />
            {/* Back face */}
            <div 
              className="absolute inset-0 border border-primary/10 bg-primary/5"
              style={{ transform: "translateZ(-16px)" }}
            />
            {/* Left face */}
            <div 
              className="absolute inset-0 border border-primary/15 bg-primary/5"
              style={{ transform: "rotateY(-90deg) translateZ(16px)" }}
            />
            {/* Right face */}
            <div 
              className="absolute inset-0 border border-primary/15 bg-primary/5"
              style={{ transform: "rotateY(90deg) translateZ(16px)" }}
            />
            {/* Top face */}
            <div 
              className="absolute inset-0 border border-primary/20 bg-primary/5"
              style={{ transform: "rotateX(90deg) translateZ(16px)" }}
            />
            {/* Bottom face */}
            <div 
              className="absolute inset-0 border border-primary/10 bg-primary/5"
              style={{ transform: "rotateX(-90deg) translateZ(16px)" }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
