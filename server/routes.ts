import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Quiz routes
  app.get("/api/quizzes", async (req, res) => {
    try {
      const { category, difficulty } = req.query;
      let quizzes;
      
      if (category) {
        quizzes = await storage.getQuizzesByCategory(category as string);
      } else if (difficulty) {
        quizzes = await storage.getQuizzesByDifficulty(difficulty as string);
      } else {
        quizzes = await storage.getAllQuizzes();
      }
      
      res.json(quizzes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch quizzes" });
    }
  });

  // Story routes
  app.get("/api/stories", async (req, res) => {
    try {
      const { category } = req.query;
      let stories;
      
      if (category) {
        stories = await storage.getStoriesByCategory(category as string);
      } else {
        stories = await storage.getAllStories();
      }
      
      res.json(stories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch stories" });
    }
  });

  app.get("/api/stories/:id", async (req, res) => {
    try {
      const story = await storage.getStory(req.params.id);
      if (!story) {
        return res.status(404).json({ message: "Story not found" });
      }
      res.json(story);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch story" });
    }
  });

  // Riddle routes
  app.get("/api/riddles", async (req, res) => {
    try {
      const riddles = await storage.getAllRiddles();
      res.json(riddles);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch riddles" });
    }
  });

  app.get("/api/riddles/:id", async (req, res) => {
    try {
      const riddle = await storage.getRiddle(req.params.id);
      if (!riddle) {
        return res.status(404).json({ message: "Riddle not found" });
      }
      res.json(riddle);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch riddle" });
    }
  });

  // Proverb routes
  app.get("/api/proverbs", async (req, res) => {
    try {
      const proverbs = await storage.getAllProverbs();
      res.json(proverbs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch proverbs" });
    }
  });

  app.get("/api/proverbs/:id", async (req, res) => {
    try {
      const proverb = await storage.getProverb(req.params.id);
      if (!proverb) {
        return res.status(404).json({ message: "Proverb not found" });
      }
      res.json(proverb);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch proverb" });
    }
  });

  // Learning content routes
  app.get("/api/learning", async (req, res) => {
    try {
      const { level, category } = req.query;
      let content: Awaited<ReturnType<typeof storage.getLearningContentByLevel>> = [];
      
      if (level) {
        content = await storage.getLearningContentByLevel(level as string);
      } else if (category) {
        content = await storage.getLearningContentByCategory(category as string);
      }
      
      res.json(content);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch learning content" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
