import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Play, ArrowLeft, ArrowRight, Sprout, TreePine, Mountain, BookOpen, Users, PenTool } from "lucide-react";

type LessonType = {
  id: number;
  title: string;
  type: "vocabulary" | "grammar" | "exercise" | "cultural";
  content: {
    words?: Array<{ telugu: string; transliteration: string; meaning: string; }>;
    grammar?: { rule: string; examples: Array<{ telugu: string; english: string; }>; };
    exercise?: { question: string; options: string[]; correct: number; explanation: string; };
    cultural?: { title: string; description: string; examples: string[]; };
  };
  completed?: boolean;
};

type LevelType = {
  title: string;
  subtitle: string;
  icon: any;
  color: string;
  topics: string[];
  buttonText: string;
  lessons: LessonType[];
};

export default function LearningSection() {
  const [activeLevel, setActiveLevel] = useState<string | null>(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [lessonProgress, setLessonProgress] = useState<Record<string, number>>({});
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const levels: LevelType[] = [
    {
      title: "Beginner",
      subtitle: "Start from basics",
      icon: Sprout,
      color: "secondary",
      topics: [
        "Telugu Alphabet (అక్షరాలు)",
        "Basic Greetings",
        "Numbers & Colors",
        "Family Relations"
      ],
      buttonText: "Start Learning",
      lessons: [
        {
          id: 1,
          title: "Basic Greetings",
          type: "vocabulary",
          content: {
            words: [
              { telugu: "నమస్కారం", transliteration: "Namaskaram", meaning: "Hello/Goodbye (formal)" },
              { telugu: "వందనలు", transliteration: "Vandanalu", meaning: "Respectful greetings" },
              { telugu: "ధన్యవాదాలు", transliteration: "Dhanyavadalu", meaning: "Thank you" },
              { telugu: "క్షమించండి", transliteration: "Kshaminchand", meaning: "Excuse me/Sorry" }
            ]
          }
        },
        {
          id: 2,
          title: "Numbers 1-10",
          type: "vocabulary",
          content: {
            words: [
              { telugu: "ఒకటి", transliteration: "Okati", meaning: "One" },
              { telugu: "రెండు", transliteration: "Rendu", meaning: "Two" },
              { telugu: "మూడు", transliteration: "Moodu", meaning: "Three" },
              { telugu: "నాలుగు", transliteration: "Naalugu", meaning: "Four" },
              { telugu: "అయిదు", transliteration: "Ayidu", meaning: "Five" }
            ]
          }
        },
        {
          id: 3,
          title: "Practice Quiz",
          type: "exercise",
          content: {
            exercise: {
              question: "What does 'నమస్కారం' mean?",
              options: ["Hello/Goodbye", "Thank you", "How are you?", "Good morning"],
              correct: 0,
              explanation: "నమస్కారం is a respectful greeting used for both hello and goodbye."
            }
          }
        }
      ]
    },
    {
      title: "Intermediate",
      subtitle: "Build vocabulary",
      icon: TreePine,
      color: "primary",
      topics: [
        "Conversation Skills",
        "Grammar Rules",
        "Cultural Context",
        "Reading Practice"
      ],
      buttonText: "Continue Learning",
      lessons: [
        {
          id: 1,
          title: "Grammar Basics",
          type: "grammar",
          content: {
            grammar: {
              rule: "Telugu verb conjugation changes based on person and respect level",
              examples: [
                { telugu: "నేను వస్తున్నాను", english: "I am coming" },
                { telugu: "మీరు వస్తున్నారు", english: "You are coming (respectful)" },
                { telugu: "అతను వస్తున్నాడు", english: "He is coming" }
              ]
            }
          }
        },
        {
          id: 2,
          title: "Everyday Conversations",
          type: "vocabulary",
          content: {
            words: [
              { telugu: "ఎలా ఉన్నారు?", transliteration: "Ela unnaru?", meaning: "How are you?" },
              { telugu: "బాగున్నాను", transliteration: "Baagunnanu", meaning: "I am fine" },
              { telugu: "మీ పేరు ఏమిటి?", transliteration: "Mee peru emiti?", meaning: "What is your name?" },
              { telugu: "నా పేరు...", transliteration: "Naa peru...", meaning: "My name is..." }
            ]
          }
        }
      ]
    },
    {
      title: "Advanced",
      subtitle: "Master the language",
      icon: Mountain,
      color: "accent",
      topics: [
        "Literary Works",
        "Poetry & Prose",
        "Dialects & Variations",
        "Teaching Others"
      ],
      buttonText: "Master Telugu",
      lessons: [
        {
          id: 1,
          title: "Telugu Literature",
          type: "cultural",
          content: {
            cultural: {
              title: "Classical Telugu Poetry",
              description: "Telugu literature has a rich tradition of poetry spanning over 1000 years.",
              examples: [
                "Andhra Mahabharatam by Nannaya, Tikkana, and Yerrapragada",
                "Sumati Shatakam by Baddena",
                "Amuktamalyada by Sri Krishnadevaraya"
              ]
            }
          }
        },
        {
          id: 2,
          title: "Regional Dialects",
          type: "vocabulary",
          content: {
            words: [
              { telugu: "నీరు (తెలంగాణ)", transliteration: "Neeru (Telangana)", meaning: "Water (Telangana dialect)" },
              { telugu: "నీళ్లు (ఆంధ్ర)", transliteration: "Neellu (Andhra)", meaning: "Water (Andhra dialect)" },
              { telugu: "అన్నం", transliteration: "Annam", meaning: "Rice (common)" },
              { telugu: "భాత్", transliteration: "Bhat", meaning: "Rice (in some regions)" }
            ]
          }
        }
      ]
    }
  ];

  const activeCurrentLevel = levels.find(level => level.title === activeLevel);
  const currentLesson = activeCurrentLevel?.lessons[currentLessonIndex];

  const handleLevelSelect = (levelTitle: string) => {
    setActiveLevel(levelTitle);
    setCurrentLessonIndex(0);
    setSelectedAnswer(null);
    setShowAnswer(false);
  };

  const handleLessonComplete = () => {
    const levelKey = activeLevel || '';
    const currentProgress = lessonProgress[levelKey] || 0;
    setLessonProgress({
      ...lessonProgress,
      [levelKey]: Math.max(currentProgress, currentLessonIndex + 1)
    });
    
    if (activeCurrentLevel && currentLessonIndex < activeCurrentLevel.lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowAnswer(true);
  };

  const resetToLevelSelect = () => {
    setActiveLevel(null);
    setCurrentLessonIndex(0);
    setSelectedAnswer(null);
    setShowAnswer(false);
  };

  if (activeLevel && activeCurrentLevel) {
    return (
      <div className="space-y-8">
        {/* Header with back button */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={resetToLevelSelect}
            className="flex items-center space-x-2"
            data-testid="button-back-to-levels"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Levels</span>
          </Button>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-primary">{activeLevel} Level</h2>
            <p className="text-muted-foreground">Lesson {currentLessonIndex + 1} of {activeCurrentLevel.lessons.length}</p>
          </div>
          <div className="w-32" /> {/* Spacer */}
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Progress</span>
            <span>{Math.round(((currentLessonIndex + 1) / activeCurrentLevel.lessons.length) * 100)}%</span>
          </div>
          <Progress 
            value={((currentLessonIndex + 1) / activeCurrentLevel.lessons.length) * 100} 
            className="w-full"
          />
        </div>

        {/* Current Lesson */}
        {currentLesson && (
          <Card className="p-8">
            <div className="text-center mb-6">
              <Badge variant="secondary" className="mb-2">
                {currentLesson.type.charAt(0).toUpperCase() + currentLesson.type.slice(1)} Lesson
              </Badge>
              <h3 className="text-2xl font-bold text-foreground">{currentLesson.title}</h3>
            </div>

            {/* Vocabulary Lesson */}
            {currentLesson.type === "vocabulary" && currentLesson.content.words && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  {currentLesson.content.words.map((word, index) => (
                    <Card key={index} className="p-4">
                      <div className="font-telugu text-2xl text-primary mb-2">{word.telugu}</div>
                      <div className="text-foreground font-medium mb-1">{word.transliteration}</div>
                      <div className="text-sm text-muted-foreground">{word.meaning}</div>
                    </Card>
                  ))}
                </div>
                <div className="text-center">
                  <Button onClick={handleLessonComplete} className="bg-primary text-primary-foreground">
                    Complete Lesson
                    <CheckCircle className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Grammar Lesson */}
            {currentLesson.type === "grammar" && currentLesson.content.grammar && (
              <div className="space-y-6">
                <div className="bg-muted p-6 rounded-lg">
                  <h4 className="text-lg font-semibold mb-4">Grammar Rule</h4>
                  <p className="text-foreground">{currentLesson.content.grammar.rule}</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-4">Examples</h4>
                  <div className="space-y-3">
                    {currentLesson.content.grammar.examples.map((example, index) => (
                      <Card key={index} className="p-4">
                        <div className="font-telugu text-xl text-primary mb-2">{example.telugu}</div>
                        <div className="text-foreground">{example.english}</div>
                      </Card>
                    ))}
                  </div>
                </div>
                <div className="text-center">
                  <Button onClick={handleLessonComplete} className="bg-primary text-primary-foreground">
                    Complete Lesson
                    <CheckCircle className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Exercise Lesson */}
            {currentLesson.type === "exercise" && currentLesson.content.exercise && (
              <div className="space-y-6">
                <div className="text-center">
                  <h4 className="text-xl font-semibold mb-6">{currentLesson.content.exercise.question}</h4>
                  <div className="space-y-3 max-w-md mx-auto">
                    {currentLesson.content.exercise.options.map((option, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className={`w-full text-left p-4 h-auto justify-start ${
                          showAnswer
                            ? index === currentLesson.content.exercise!.correct
                              ? "border-primary bg-primary/10 text-primary"
                              : selectedAnswer === index && index !== currentLesson.content.exercise!.correct
                              ? "border-destructive bg-destructive/10 text-destructive"
                              : ""
                            : "hover:border-primary hover:bg-primary/10"
                        }`}
                        onClick={() => !showAnswer && handleAnswerSelect(index)}
                        disabled={showAnswer}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                  
                  {showAnswer && (
                    <div className="mt-6 space-y-4">
                      <div className="p-4 bg-muted rounded-lg">
                        <p className="text-foreground font-medium">Explanation:</p>
                        <p className="text-muted-foreground">{currentLesson.content.exercise.explanation}</p>
                      </div>
                      <Button onClick={handleLessonComplete} className="bg-primary text-primary-foreground">
                        Continue to Next Lesson
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Cultural Lesson */}
            {currentLesson.type === "cultural" && currentLesson.content.cultural && (
              <div className="space-y-6">
                <div className="text-center">
                  <h4 className="text-xl font-semibold mb-4">{currentLesson.content.cultural.title}</h4>
                  <p className="text-muted-foreground mb-6">{currentLesson.content.cultural.description}</p>
                </div>
                <div>
                  <h5 className="text-lg font-medium mb-4">Notable Examples:</h5>
                  <div className="space-y-2">
                    {currentLesson.content.cultural.examples.map((example, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                        <span className="text-foreground">{example}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-center">
                  <Button onClick={handleLessonComplete} className="bg-primary text-primary-foreground">
                    Complete Lesson
                    <CheckCircle className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </Card>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <h2 className="text-3xl font-bold text-primary mb-8 text-center" data-testid="text-learning-title">
        Start Your Telugu Journey
      </h2>
      
      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        {levels.map((level, index) => {
          const Icon = level.icon;
          return (
            <Card key={index} data-testid={`card-level-${level.title.toLowerCase()}`}>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 bg-${level.color} rounded-full flex items-center justify-center mr-4`}>
                    <Icon className={`h-6 w-6 text-${level.color}-foreground`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">{level.title}</h3>
                    <p className="text-sm text-muted-foreground">{level.subtitle}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {level.topics.map((topic, topicIndex) => (
                    <div key={topicIndex} className="flex items-center space-x-3">
                      <div className={`w-3 h-3 bg-${level.color} rounded-full`}></div>
                      <span className="text-foreground">{topic}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-3 mt-6">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Progress</span>
                    <span>{lessonProgress[level.title] || 0}/{level.lessons.length} lessons</span>
                  </div>
                  <Progress 
                    value={((lessonProgress[level.title] || 0) / level.lessons.length) * 100} 
                    className="w-full"
                  />
                  <Button 
                    className={`w-full bg-${level.color} text-${level.color}-foreground hover:opacity-90 transition-all`}
                    onClick={() => handleLevelSelect(level.title)}
                    data-testid={`button-${level.title.toLowerCase()}-learning`}
                  >
                    <Play className="mr-2 h-4 w-4" />
                    {level.buttonText}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Learning Path Overview */}
      <div className="bg-gradient-to-r from-primary to-secondary p-8 rounded-xl text-white text-center">
        <h3 className="text-2xl font-bold mb-4">Interactive Learning Experience</h3>
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <div className="flex flex-col items-center">
            <BookOpen className="h-8 w-8 mb-2" />
            <h4 className="font-semibold mb-1">Structured Lessons</h4>
            <p className="text-sm opacity-90">Step-by-step learning with vocabulary, grammar, and cultural insights</p>
          </div>
          <div className="flex flex-col items-center">
            <PenTool className="h-8 w-8 mb-2" />
            <h4 className="font-semibold mb-1">Interactive Exercises</h4>
            <p className="text-sm opacity-90">Practice with quizzes and real-world examples</p>
          </div>
          <div className="flex flex-col items-center">
            <Users className="h-8 w-8 mb-2" />
            <h4 className="font-semibold mb-1">Cultural Context</h4>
            <p className="text-sm opacity-90">Learn language through Telugu culture and traditions</p>
          </div>
        </div>
      </div>
    </div>
  );
}