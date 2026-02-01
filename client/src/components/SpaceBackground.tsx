import { motion } from "framer-motion";
import { useMemo } from "react";

interface CelestialObject {
  id: number;
  type: 'planet' | 'satellite' | 'star';
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
}

function generateCelestialObjects(): CelestialObject[] {
  const objects: CelestialObject[] = [];
  
  const planets = [
    { color: 'from-amber-600 to-orange-800', size: 80 },
    { color: 'from-blue-400 to-indigo-600', size: 60 },
    { color: 'from-purple-500 to-pink-600', size: 50 },
    { color: 'from-teal-400 to-cyan-600', size: 45 },
    { color: 'from-red-500 to-rose-700', size: 55 },
  ];
  
  planets.forEach((planet, i) => {
    objects.push({
      id: i,
      type: 'planet',
      x: 10 + (i * 18) + Math.random() * 10,
      y: 15 + Math.random() * 70,
      size: planet.size + Math.random() * 20,
      color: planet.color,
      duration: 20 + Math.random() * 15,
      delay: i * 2,
    });
  });
  
  for (let i = 0; i < 6; i++) {
    objects.push({
      id: 100 + i,
      type: 'satellite',
      x: Math.random() * 90 + 5,
      y: Math.random() * 80 + 10,
      size: 20 + Math.random() * 15,
      color: 'from-gray-300 to-gray-500',
      duration: 15 + Math.random() * 10,
      delay: Math.random() * 5,
    });
  }
  
  return objects;
}

export function SpaceBackground() {
  const celestialObjects = useMemo(() => generateCelestialObjects(), []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {celestialObjects.map((obj) => {
        if (obj.type === 'planet') {
          return (
            <motion.div
              key={obj.id}
              className="absolute"
              style={{
                left: `${obj.x}%`,
                top: `${obj.y}%`,
                width: obj.size,
                height: obj.size,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: obj.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: obj.delay,
              }}
            >
              <div 
                className={`w-full h-full rounded-full bg-gradient-to-br ${obj.color} opacity-20`}
                style={{
                  boxShadow: `0 0 ${obj.size/2}px rgba(255,255,255,0.1), inset -${obj.size/4}px -${obj.size/4}px ${obj.size/2}px rgba(0,0,0,0.4)`,
                }}
              />
              <div 
                className="absolute top-[10%] left-[20%] w-[20%] h-[15%] rounded-full bg-white/10 blur-sm"
              />
            </motion.div>
          );
        }
        
        if (obj.type === 'satellite') {
          return (
            <motion.div
              key={obj.id}
              className="absolute"
              style={{
                left: `${obj.x}%`,
                top: `${obj.y}%`,
              }}
              animate={{
                x: [-50, 50, -50],
                y: [0, -30, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: obj.duration,
                repeat: Infinity,
                ease: "linear",
                delay: obj.delay,
              }}
            >
              <div className="relative opacity-30">
                <div className="w-4 h-2 bg-gradient-to-r from-gray-400 to-gray-600 rounded-sm" />
                <div className="absolute top-1/2 -translate-y-1/2 -left-6 w-6 h-1 bg-gradient-to-r from-blue-400 to-blue-600" />
                <div className="absolute top-1/2 -translate-y-1/2 -right-6 w-6 h-1 bg-gradient-to-l from-blue-400 to-blue-600" />
              </div>
            </motion.div>
          );
        }
        
        return null;
      })}
    </div>
  );
}
