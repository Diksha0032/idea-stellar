import { Navbar } from "@/components/Navbar";
import { ParticleBackground } from "@/components/ParticleBackground";
import { TrackCard } from "@/components/TrackCard";
import { useTracks } from "@/hooks/use-tracks";
import { motion } from "framer-motion";

export default function TracksPage() {
  const { data: tracks, isLoading } = useTracks();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <ParticleBackground />

      <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">
            Tracks & <span className="text-gradient-gold">Challenges</span>
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Choose your path. Each track is designed to push the boundaries of what's possible with modern technology.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 bg-white/5 rounded-2xl animate-pulse border border-white/5" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tracks?.map((track, i) => (
              <TrackCard key={track.id} track={track} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
