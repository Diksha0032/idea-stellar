import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { setupAuth, registerAuthRoutes } from "./replit_integrations/auth";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Set up Replit Auth
  await setupAuth(app);
  registerAuthRoutes(app);

  app.get(api.tracks.list.path, async (req, res) => {
    const tracks = await storage.getTracks();
    res.json(tracks);
  });

  app.get(api.tracks.get.path, async (req, res) => {
    const track = await storage.getTrack(Number(req.params.id));
    if (!track) {
      return res.status(404).json({ message: 'Track not found' });
    }
    res.json(track);
  });

  // Seed data if empty
  const existingTracks = await storage.getTracks();
  if (existingTracks.length === 0) {
    await storage.createTrack({
      title: "AI & Machine Learning",
      description: "Build the next generation of intelligent systems. Focus on LLMs, Computer Vision, and Predictive Analytics.",
      imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop"
    });
    await storage.createTrack({
      title: "Blockchain & Web3",
      description: "Decentralize the future. Create dApps, Smart Contracts, and new financial paradigms.",
      imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop"
    });
    await storage.createTrack({
      title: "Future of FinTech",
      description: "Revolutionize how we exchange value. Payments, Banking, and Personal Finance re-imagined.",
      imageUrl: "https://images.unsplash.com/photo-1611974765270-ca12586343bb?q=80&w=2670&auto=format&fit=crop"
    });
    await storage.createTrack({
      title: "Sustainability",
      description: "Tech for a greener planet. Renewable energy, waste reduction, and eco-friendly solutions.",
      imageUrl: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2670&auto=format&fit=crop"
    });
  }

  return httpServer;
}
