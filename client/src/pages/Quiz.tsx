import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const quizQuestions = [
  {
    question: "What percentage of Earth's surface is covered by oceans?",
    options: ["51%", "61%", "71%", "81%"],
    correct: "71%"
  },
  {
    question: "Which ocean is the largest?",
    options: ["Atlantic", "Indian", "Pacific", "Arctic"],
    correct: "Pacific"
  },
  {
    question: "How many species of fish are estimated to live in the ocean?",
    options: ["15,000", "20,000", "25,000", "32,000"],
    correct: "32,000"
  },
  {
    question: "What is the average depth of the ocean?",
    options: ["2,000 meters", "3,700 meters", "5,500 meters", "7,000 meters"],
    correct: "3,700 meters"
  },
  {
    question: "Which of these contributes most to ocean pollution?",
    options: ["Oil spills", "Plastic waste", "Chemical runoff", "Sewage"],
    correct: "Plastic waste"
  }
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();

  const handleAnswer = (answer: string) => {
    if (answer === quizQuestions[currentQuestion].correct) {
      setScore(score + 1);
      toast({
        title: "Correct!",
        description: "Great job! Keep going!",
        variant: "default",
      });
    } else {
      toast({
        title: "Incorrect",
        description: `The correct answer was ${quizQuestions[currentQuestion].correct}`,
        variant: "destructive",
      });
    }

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const getBadge = () => {
    if (score === quizQuestions.length) return "Ocean Master";
    if (score >= quizQuestions.length * 0.8) return "Marine Expert";
    if (score >= quizQuestions.length * 0.6) return "Sea Guardian";
    return "Ocean Explorer";
  };

  if (showResults) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
          <p className="text-xl mb-4">Your score: {score}/{quizQuestions.length}</p>
          <Badge className="text-lg p-2 bg-ocean-500">{getBadge()}</Badge>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Ocean Knowledge Quiz</h2>
        <p className="mb-8">Question {currentQuestion + 1} of {quizQuestions.length}</p>
        <h3 className="text-xl mb-4">{quizQuestions[currentQuestion].question}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quizQuestions[currentQuestion].options.map((option) => (
            <Button
              key={option}
              onClick={() => handleAnswer(option)}
              className="p-4 text-lg"
              variant="outline"
            >
              {option}
            </Button>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Quiz;