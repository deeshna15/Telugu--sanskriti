import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import type { Quiz, Riddle, Proverb } from "@shared/schema";

export default function InteractiveSection() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [riddleAnswerVisible, setRiddleAnswerVisible] = useState(false);

  const { data: quizzes = [], isLoading: quizzesLoading } = useQuery<Quiz[]>({
    queryKey: ["/api/quizzes"],
  });

  const { data: riddles = [], isLoading: riddlesLoading } = useQuery<Riddle[]>({
    queryKey: ["/api/riddles"],
  });

  const { data: proverbs = [], isLoading: proverbsLoading } = useQuery<Proverb[]>({
    queryKey: ["/api/proverbs"],
  });

  const currentQuiz = quizzes[currentQuestionIndex];
  const currentRiddle = riddles[0]; // Display first riddle
  const currentProverb = proverbs[0]; // Display first proverb

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowAnswer(true);
    
    if (answerIndex === currentQuiz?.correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < quizzes.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setScore(0);
  };

  if (quizzesLoading || riddlesLoading || proverbsLoading) {
    return (
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-primary mb-8 text-center">Interactive Learning</h2>
        <div className="text-center">Loading interactive content...</div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <h2 className="text-3xl font-bold text-primary mb-8 text-center" data-testid="text-interactive-title">
        Interactive Learning
      </h2>
      
      {/* Quiz Section */}
      <Card data-testid="section-quiz">
        <CardContent className="p-8">
          <h3 className="text-2xl font-semibold mb-6 text-foreground">Telugu Quiz Challenge</h3>
          
          {currentQuiz && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <Badge variant="secondary">
                  Question {currentQuestionIndex + 1} of {quizzes.length}
                </Badge>
                <Badge variant="outline">
                  Score: {score}/{quizzes.length}
                </Badge>
              </div>
              
              <Progress 
                value={((currentQuestionIndex + 1) / quizzes.length) * 100} 
                className="w-full"
                data-testid="progress-quiz"
              />
              
              <div className="mb-6">
                <h4 className="text-lg font-medium mb-4 text-foreground" data-testid="text-quiz-question">
                  {currentQuiz.question}
                </h4>
                {currentQuiz.questionTelugu && (
                  <p className="font-telugu text-base text-muted-foreground mb-4">
                    {currentQuiz.questionTelugu}
                  </p>
                )}
                
                <div className="space-y-3">
                  {currentQuiz.options.map((option, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className={`quiz-option w-full text-left p-4 h-auto justify-start ${
                        showAnswer
                          ? index === currentQuiz.correctAnswer
                            ? "border-primary bg-primary/10 text-primary"
                            : selectedAnswer === index && index !== currentQuiz.correctAnswer
                            ? "border-destructive bg-destructive/10 text-destructive"
                            : ""
                          : "hover:border-primary hover:bg-primary/10"
                      }`}
                      onClick={() => !showAnswer && handleAnswerSelect(index)}
                      disabled={showAnswer}
                      data-testid={`quiz-option-${index}`}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
                
                {showAnswer && currentQuiz.explanation && (
                  <div className="mt-4 p-4 bg-muted rounded-lg" data-testid="quiz-explanation">
                    <p className="text-foreground font-medium">Explanation:</p>
                    <p className="text-muted-foreground">{currentQuiz.explanation}</p>
                  </div>
                )}
                
                {showAnswer && (
                  <div className="flex gap-4 mt-6">
                    {currentQuestionIndex < quizzes.length - 1 ? (
                      <Button onClick={nextQuestion} data-testid="button-next-question">
                        Next Question
                      </Button>
                    ) : (
                      <Button onClick={resetQuiz} data-testid="button-restart-quiz">
                        Restart Quiz
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Riddles and Proverbs */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Riddles Section */}
        {currentRiddle && (
          <Card data-testid="card-riddles">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-foreground">
                Telugu Riddles (పొడుపుకథలు)
              </h3>
              <div className="bg-accent/10 p-4 rounded-lg mb-4">
                <p className="font-telugu text-lg text-foreground mb-2">
                  {currentRiddle.riddleTelugu}
                </p>
                <p className="text-sm text-muted-foreground italic">
                  {currentRiddle.riddle}
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => setRiddleAnswerVisible(!riddleAnswerVisible)}
                className="bg-accent text-accent-foreground hover:opacity-90"
                data-testid="button-riddle-answer"
              >
                {riddleAnswerVisible ? "Hide Answer" : "Show Answer"}
              </Button>
              {riddleAnswerVisible && (
                <div className="mt-4 p-3 bg-muted rounded-lg" data-testid="riddle-answer">
                  <p className="text-foreground font-medium">
                    Answer: {currentRiddle.answerTelugu} ({currentRiddle.answer})
                  </p>
                  {currentRiddle.explanation && (
                    <p className="text-muted-foreground text-sm mt-2">
                      {currentRiddle.explanation}
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Proverbs Section */}
        {currentProverb && (
          <Card data-testid="card-proverbs">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-foreground">
                Proverbs (సామెతలు)
              </h3>
              <div className="bg-secondary/10 p-4 rounded-lg mb-4">
                <p className="font-telugu text-lg text-foreground mb-2">
                  {currentProverb.proverbTelugu}
                </p>
                <p className="text-sm text-muted-foreground italic">
                  {currentProverb.proverb}
                </p>
              </div>
              <div className="text-sm text-muted-foreground">
                <strong>Meaning:</strong> {currentProverb.meaning}
              </div>
              {currentProverb.context && (
                <div className="text-sm text-muted-foreground mt-2">
                  <strong>Context:</strong> {currentProverb.context}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Word of the Day */}
      <div className="bg-gradient-to-r from-primary to-secondary p-8 rounded-xl text-white text-center" data-testid="section-word-of-day">
        <h3 className="text-2xl font-bold mb-4">Word of the Day</h3>
        <div className="font-telugu text-4xl mb-2">సంస్కృతి</div>
        <div className="text-xl mb-2">Sanskriti</div>
        <div className="opacity-90">Culture, Refinement, Civilization</div>
        <p className="mt-4 opacity-90 max-w-2xl mx-auto">
          The essence of refinement and cultural heritage that defines the Telugu way of life, 
          encompassing traditions, arts, and values.
        </p>
      </div>
    </div>
  );
}
