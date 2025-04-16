
import React from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "@/contexts/GameContext";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Frown, Smile } from "lucide-react";

export const ResultsScreen: React.FC = () => {
  const navigate = useNavigate();
  const { questions, userAnswers, resetGame } = useGame();

  const calculateScore = () => {
    let correctCount = 0;
    
    questions.forEach((question, questionIndex) => {
      const correctAnswers = question.correctAnswer;
      const userAnswersForQuestion = userAnswers[questionIndex];
      
      let isCorrect = true;
      correctAnswers.forEach((answer, index) => {
        if (userAnswersForQuestion[index] !== answer) {
          isCorrect = false;
        }
      });
      
      if (isCorrect) correctCount++;
    });
    
    return correctCount;
  };

  const score = calculateScore();
  const percentage = Math.round((score / questions.length) * 100);
  const isGoodScore = percentage >= 50;

  const handleTryAgain = () => {
    resetGame();
    navigate("/");
  };

  const isAnswerCorrect = (questionIndex: number) => {
    const correctAnswers = questions[questionIndex].correctAnswer;
    const userAnswersForQuestion = userAnswers[questionIndex];
    
    let isCorrect = true;
    correctAnswers.forEach((answer, index) => {
      if (userAnswersForQuestion[index] !== answer) {
        isCorrect = false;
      }
    });
    
    return isCorrect;
  };

  return (
    <div className="bg-[#F8F8F8] min-h-screen py-8 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-lg font-medium text-gray-900">Sentence Construction</h1>
        </div>
        
        <div className="score-container text-center mb-12">
          <div className="flex flex-col items-center">
            <div className="relative inline-block">
              <div className="w-32 h-32 rounded-full border-8 border-[#453FE1]/10 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-4xl font-bold text-[#453FE1]">{percentage}</span>
                  <span className="text-xl text-[#453FE1]">%</span>
                </div>
              </div>
              <div className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-8 h-8 flex items-center justify-center">
                {score}/{questions.length}
              </div>
            </div>
            
            <div className="mt-4 animate-bounce">
              {isGoodScore ? (
                <Smile 
                  size={50} 
                  className="text-green-500" 
                  strokeWidth={1.5}
                />
              ) : (
                <Frown 
                  size={50} 
                  className="text-red-500" 
                  strokeWidth={1.5}
                />
              )}
            </div>
            
            <p className="text-gray-600 mt-4 text-sm">
              You've correctly ordered words in {score} out of {questions.length} sentences.
              Check the detailed results for each question below.
            </p>
            
            <Button 
              className="mt-6 bg-[#453FE1] text-white w-40 py-2.5 rounded-lg hover:bg-[#453FE1]/90 transition-colors"
              onClick={handleTryAgain}
            >
              Try Again
            </Button>
          </div>
        </div>
        
        <div className="results-details">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {questions.map((question, questionIndex) => {
              const correct = isAnswerCorrect(questionIndex);
              return (
                <AccordionItem 
                  key={question.questionId} 
                  value={question.questionId}
                  className="border border-gray-200 rounded-lg overflow-hidden bg-white"
                >
                  <AccordionTrigger className="px-4 py-3 hover:no-underline">
                    <div className="flex items-center">
                      <div className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center text-white ${correct ? 'bg-green-500' : 'bg-red-500'}`}>
                        {correct ? '✓' : '✗'}
                      </div>
                      <span className="text-left font-medium">
                        Question {questionIndex + 1}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="px-4 pb-4">
                      <div className="mb-4">
                        <h4 className="text-sm text-gray-500 mb-2">Question:</h4>
                        {renderQuestionWithAnswers(question.question, userAnswers[questionIndex], false)}
                      </div>
                      
                      {!correct && (
                        <div>
                          <h4 className="text-sm text-gray-500 mb-2">Correct Answer:</h4>
                          {renderQuestionWithAnswers(question.question, question.correctAnswer, true)}
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

// Helper function to render question with answers
const renderQuestionWithAnswers = (
  question: string, 
  answers: (string | null)[], 
  isCorrect: boolean
) => {
  const questionParts = question.split("_____________");
  
  return (
    <p className="text-sm">
      {questionParts.map((part, index) => (
        <React.Fragment key={index}>
          {part}
          {index < questionParts.length - 1 && (
            <span 
              className={`inline-block px-2 py-1 mx-1 rounded ${
                isCorrect 
                  ? 'bg-green-100 text-green-800' 
                  : answers[index] 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-gray-100'
              }`}
            >
              {answers[index] || "_____"}
            </span>
          )}
        </React.Fragment>
      ))}
    </p>
  );
};
