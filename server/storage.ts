import { 
  type User, 
  type InsertUser, 
  type Quiz, 
  type Story, 
  type Riddle, 
  type Proverb, 
  type LearningContent 
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllQuizzes(): Promise<Quiz[]>;
  getQuizzesByCategory(category: string): Promise<Quiz[]>;
  getQuizzesByDifficulty(difficulty: string): Promise<Quiz[]>;
  
  getAllStories(): Promise<Story[]>;
  getStoriesByCategory(category: string): Promise<Story[]>;
  getStory(id: string): Promise<Story | undefined>;
  
  getAllRiddles(): Promise<Riddle[]>;
  getRiddle(id: string): Promise<Riddle | undefined>;
  
  getAllProverbs(): Promise<Proverb[]>;
  getProverb(id: string): Promise<Proverb | undefined>;
  
  getLearningContentByLevel(level: string): Promise<LearningContent[]>;
  getLearningContentByCategory(category: string): Promise<LearningContent[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private quizzes: Map<string, Quiz>;
  private stories: Map<string, Story>;
  private riddles: Map<string, Riddle>;
  private proverbs: Map<string, Proverb>;
  private learningContent: Map<string, LearningContent>;

  constructor() {
    this.users = new Map();
    this.quizzes = new Map();
    this.stories = new Map();
    this.riddles = new Map();
    this.proverbs = new Map();
    this.learningContent = new Map();
    
    this.initializeData();
  }

  private initializeData() {
    // Initialize with sample cultural content
    const sampleQuizzes: Quiz[] = [
      {
        id: "1",
        question: "What does 'నమస్కారం' mean?",
        questionTelugu: "నమస్కారం అంటే ఏమిటి?",
        options: ["Hello/Goodbye", "Thank you", "Good morning", "How are you?"],
        correctAnswer: 0,
        explanation: "నమస్కారం is a respectful greeting used for both hello and goodbye in Telugu culture.",
        difficulty: "beginner",
        category: "greetings"
      },
      {
        id: "2",
        question: "Which classical dance form originated from Andhra Pradesh?",
        questionTelugu: "ఆంధ్రప్రదేశ్ నుండి ఉద్భవించిన శాస్త్రీయ నృత్య రూపం ఏది?",
        options: ["Bharatanatyam", "Kuchipudi", "Kathak", "Odissi"],
        correctAnswer: 1,
        explanation: "Kuchipudi is the classical dance form that originated from the village of Kuchipudi in Andhra Pradesh.",
        difficulty: "intermediate",
        category: "arts"
      }
    ];

    const sampleStories: Story[] = [
      {
        id: "1",
        title: "The Clever Tenali Rama",
        titleTelugu: "తెలివైన తెనాలి రామ",
        summary: "One of the most beloved characters in Telugu folklore, Tenali Rama was known for his wit and wisdom.",
        content: "Tenali Rama was a poet and advisor in the court of King Krishnadevaraya. Known for his quick wit and humor, he often used his intelligence to solve complex problems and teach valuable lessons. In this particular story, a proud scholar arrived at the court claiming to know everything. He challenged anyone to ask him a question he couldn't answer...",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
        category: "folk",
        author: "Traditional"
      },
      {
        id: "2",
        title: "The Magic Banyan Tree",
        titleTelugu: "మాయా మర్రిచెట్టు",
        summary: "A mystical tale about a magical banyan tree that granted wishes to those pure of heart.",
        content: "In a small village nestled between rolling hills, there stood an ancient banyan tree that was said to possess magical powers. The villagers believed that the tree could grant wishes, but only to those who approached it with a pure heart and genuine intentions...",
        imageUrl: "https://pixabay.com/get/g1d8cd1fe8821ec721accbe1f64a6c58bd83228cfe6575b4865b0f7e2864fbb47f681f0b82c5499578130393613bad7c2ce930dfb12d711a9ebc4a0537ebea656_1280.jpg",
        category: "moral",
        author: "Traditional"
      }
    ];

    const sampleRiddles: Riddle[] = [
      {
        id: "1",
        riddle: "Born at night, die in the day. Who am I?",
        riddleTelugu: "రాత్రికి పుట్టిన, పగలికి చస్తాను. నేను ఎవరిని?",
        answer: "Light/Lamp",
        answerTelugu: "వెలుగు",
        explanation: "A lamp or light is lit at night and extinguished during the day."
      }
    ];

    const sampleProverbs: Proverb[] = [
      {
        id: "1",
        proverb: "The mustard plant died after the son-in-law arrived",
        proverbTelugu: "అల్లుడు వచ్చాక ఆవిమించు చచ్చింది",
        meaning: "People often show off excessively when important guests arrive, sometimes causing problems.",
        context: "Used to describe situations where people overspend or overextend themselves to impress others."
      }
    ];

    sampleQuizzes.forEach(quiz => this.quizzes.set(quiz.id, quiz));
    sampleStories.forEach(story => this.stories.set(story.id, story));
    sampleRiddles.forEach(riddle => this.riddles.set(riddle.id, riddle));
    sampleProverbs.forEach(proverb => this.proverbs.set(proverb.id, proverb));
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllQuizzes(): Promise<Quiz[]> {
    return Array.from(this.quizzes.values());
  }

  async getQuizzesByCategory(category: string): Promise<Quiz[]> {
    return Array.from(this.quizzes.values()).filter(quiz => quiz.category === category);
  }

  async getQuizzesByDifficulty(difficulty: string): Promise<Quiz[]> {
    return Array.from(this.quizzes.values()).filter(quiz => quiz.difficulty === difficulty);
  }

  async getAllStories(): Promise<Story[]> {
    return Array.from(this.stories.values());
  }

  async getStoriesByCategory(category: string): Promise<Story[]> {
    return Array.from(this.stories.values()).filter(story => story.category === category);
  }

  async getStory(id: string): Promise<Story | undefined> {
    return this.stories.get(id);
  }

  async getAllRiddles(): Promise<Riddle[]> {
    return Array.from(this.riddles.values());
  }

  async getRiddle(id: string): Promise<Riddle | undefined> {
    return this.riddles.get(id);
  }

  async getAllProverbs(): Promise<Proverb[]> {
    return Array.from(this.proverbs.values());
  }

  async getProverb(id: string): Promise<Proverb | undefined> {
    return this.proverbs.get(id);
  }

  async getLearningContentByLevel(level: string): Promise<LearningContent[]> {
    return Array.from(this.learningContent.values()).filter(content => content.level === level);
  }

  async getLearningContentByCategory(category: string): Promise<LearningContent[]> {
    return Array.from(this.learningContent.values()).filter(content => content.category === category);
  }
}

export const storage = new MemStorage();
