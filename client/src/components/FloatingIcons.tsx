import { motion } from "framer-motion";
import { Lightbulb, Code, Hammer, Rocket, Brain, Trophy, Medal } from "lucide-react";

const icons = [
  { Icon: Lightbulb, label: "idea" },
  { Icon: Code, label: "code" },
  { Icon: Hammer, label: "build" },
  { Icon: Rocket, label: "innovation" },
  { Icon: Brain, label: "think" },
  { Icon: Trophy, label: "prize" },
  { Icon: Medal, label: "win" },
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
      size: Math.random() * 28 + 44,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
      rotateX: Math.random() * 30 - 15,
      rotateY: Math.random() * 30 - 15,
      rotateZ: Math.random() * 360,
      opacity: Math.random() * 0.15 + 0.08,
    });
  }
  
  return generated;
}

export function FloatingIcons() {
  const floatingIcons = generateIcons(21);

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
              className="text-primary drop-shadow-[0_0_8px_rgba(255,215,0,0.2)]"
              strokeWidth={1.5}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
