import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sprout, TreePine, Mountain } from "lucide-react";

export default function LearningSection() {
  const levels = [
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
      buttonText: "Start Learning"
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
      buttonText: "Continue Learning"
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
      buttonText: "Master Telugu"
    }
  ];

  const greetings = [
    {
      telugu: "నమస్కారం",
      transliteration: "Namaskaram",
      meaning: "Hello/Goodbye (formal)"
    },
    {
      telugu: "వందనలు",
      transliteration: "Vandanalu",
      meaning: "Respectful greetings"
    }
  ];

  const expressions = [
    {
      telugu: "ధన్యవాదాలు",
      transliteration: "Dhanyavadalu",
      meaning: "Thank you"
    },
    {
      telugu: "క్షమించండి",
      transliteration: "Kshaminchand",
      meaning: "Excuse me/Sorry"
    }
  ];

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
                <Button 
                  className={`w-full mt-6 bg-${level.color} text-${level.color}-foreground hover:opacity-90 transition-all`}
                  data-testid={`button-${level.title.toLowerCase()}-learning`}
                >
                  {level.buttonText}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Sample Lesson */}
      <div className="bg-muted p-8 rounded-xl" data-testid="section-sample-lesson">
        <h3 className="text-2xl font-bold mb-6 text-center text-foreground">
          Sample Lesson: Basic Greetings
        </h3>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-4 text-foreground">Common Greetings</h4>
            <div className="space-y-4">
              {greetings.map((greeting, index) => (
                <Card key={index} data-testid={`greeting-${index}`}>
                  <CardContent className="p-4">
                    <div className="font-telugu text-xl text-primary mb-2">{greeting.telugu}</div>
                    <div className="text-foreground font-medium">{greeting.transliteration}</div>
                    <div className="text-sm text-muted-foreground">{greeting.meaning}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-foreground">Daily Expressions</h4>
            <div className="space-y-4">
              {expressions.map((expression, index) => (
                <Card key={index} data-testid={`expression-${index}`}>
                  <CardContent className="p-4">
                    <div className="font-telugu text-xl text-secondary mb-2">{expression.telugu}</div>
                    <div className="text-foreground font-medium">{expression.transliteration}</div>
                    <div className="text-sm text-muted-foreground">{expression.meaning}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
