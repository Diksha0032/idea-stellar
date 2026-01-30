import { Navbar } from "@/components/Navbar";
import { ParticleBackground } from "@/components/ParticleBackground";
import { useAuth } from "@/hooks/use-auth";
import { motion } from "framer-motion";
import { Section } from "@/components/Section";
import { Clock, CheckCircle, AlertCircle } from "lucide-react";

export default function Dashboard() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    // Should be redirected by middleware/utils, but fallback UI:
    return null;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <ParticleBackground />
      
      <div className="pt-32 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row items-end justify-between gap-6 mb-12 border-b border-white/10 pb-8"
        >
          <div>
            <h1 className="text-4xl font-display font-bold text-white mb-2">
              Welcome back, <span className="text-primary">{user.firstName || 'Hacker'}</span>
            </h1>
            <p className="text-white/60">Ready to build something extraordinary?</p>
          </div>
          
          <div className="flex items-center gap-4 bg-white/5 px-6 py-3 rounded-full border border-white/10">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
             <span className="text-sm font-medium text-white">System Operational</span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Status Card */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-panel rounded-2xl p-8"
            >
              <h2 className="text-2xl font-display font-bold text-white mb-6">Application Status</h2>
              
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { label: "Registration", status: "Complete", icon: CheckCircle, active: true },
                  { label: "Team Formation", status: "Pending", icon: AlertCircle, active: false },
                  { label: "Project Submission", status: "Locked", icon: Clock, active: false },
                ].map((item, i) => (
                  <div key={i} className={`p-4 rounded-xl border ${item.active ? 'bg-primary/10 border-primary/30' : 'bg-white/5 border-white/5'} flex flex-col items-center text-center gap-3`}>
                    <item.icon className={item.active ? 'text-primary' : 'text-white/40'} />
                    <div>
                      <div className="text-sm font-bold text-white">{item.label}</div>
                      <div className={`text-xs mt-1 ${item.active ? 'text-primary' : 'text-white/40'}`}>{item.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-panel rounded-2xl p-8"
            >
              <h2 className="text-2xl font-display font-bold text-white mb-6">Your Team</h2>
              <div className="border border-dashed border-white/20 rounded-xl p-8 text-center">
                <p className="text-white/40 mb-4">You haven't joined a team yet.</p>
                <button className="px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white transition-colors text-sm font-medium">
                  Find Teammates
                </button>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-gold rounded-2xl p-8"
            >
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" /> Countdown
              </h3>
              <div className="grid grid-cols-4 gap-2 text-center">
                {[
                  { val: "04", label: "Days" },
                  { val: "12", label: "Hrs" },
                  { val: "45", label: "Mins" },
                  { val: "10", label: "Secs" },
                ].map((t, i) => (
                  <div key={i}>
                    <div className="text-2xl font-display font-bold text-white">{t.val}</div>
                    <div className="text-[10px] text-primary/80 uppercase tracking-wider">{t.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-panel rounded-2xl p-8"
            >
              <h3 className="text-lg font-bold text-white mb-4">Announcements</h3>
              <div className="space-y-4">
                {[
                  { title: "API Keys Released", date: "2 hours ago" },
                  { title: "Mentor Office Hours", date: "Yesterday" },
                  { title: "Submission Guidelines", date: "2 days ago" },
                ].map((item, i) => (
                  <div key={i} className="pb-4 border-b border-white/5 last:border-0 last:pb-0">
                    <div className="text-white font-medium hover:text-primary cursor-pointer transition-colors">{item.title}</div>
                    <div className="text-xs text-white/40 mt-1">{item.date}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
