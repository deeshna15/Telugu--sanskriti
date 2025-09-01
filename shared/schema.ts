import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const quizzes = pgTable("quizzes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  question: text("question").notNull(),
  questionTelugu: text("question_telugu"),
  options: jsonb("options").notNull().$type<string[]>(),
  correctAnswer: integer("correct_answer").notNull(),
  explanation: text("explanation"),
  difficulty: text("difficulty").notNull().default("beginner"),
  category: text("category").notNull().default("language"),
});

export const stories = pgTable("stories", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  titleTelugu: text("title_telugu"),
  summary: text("summary").notNull(),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  category: text("category").notNull().default("folk"),
  author: text("author"),
});

export const riddles = pgTable("riddles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  riddle: text("riddle").notNull(),
  riddleTelugu: text("riddle_telugu").notNull(),
  answer: text("answer").notNull(),
  answerTelugu: text("answer_telugu"),
  explanation: text("explanation"),
});

export const proverbs = pgTable("proverbs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  proverb: text("proverb").notNull(),
  proverbTelugu: text("proverb_telugu").notNull(),
  meaning: text("meaning").notNull(),
  context: text("context"),
});

export const learningContent = pgTable("learning_content", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  content: text("content").notNull(),
  level: text("level").notNull().default("beginner"),
  category: text("category").notNull(),
  orderIndex: integer("order_index").notNull().default(0),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertQuizSchema = createInsertSchema(quizzes).omit({
  id: true,
});

export const insertStorySchema = createInsertSchema(stories).omit({
  id: true,
});

export const insertRiddleSchema = createInsertSchema(riddles).omit({
  id: true,
});

export const insertProverbSchema = createInsertSchema(proverbs).omit({
  id: true,
});

export const insertLearningContentSchema = createInsertSchema(learningContent).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Quiz = typeof quizzes.$inferSelect;
export type Story = typeof stories.$inferSelect;
export type Riddle = typeof riddles.$inferSelect;
export type Proverb = typeof proverbs.$inferSelect;
export type LearningContent = typeof learningContent.$inferSelect;
