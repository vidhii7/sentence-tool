
import React from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "@/contexts/GameContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const QuestionScreen: React.FC = () => {
  const navigate = useNavigate();
  const {
    currentQuestionIndex,
    questions,
    timeLeft,
    userAnswers,
    selectedBlankIndex,
    setSelectedBlankIndex,
    selectOption,
    unselectOption,
    setCurrentQuestionIndex,
  } = useGame();

  if (questions.length === 0) {
    return <div className="text-center p-8">Loading questions...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const currentUserAnswers = userAnswers[currentQuestionIndex];
  
  // Check if all blanks are filled
  const allBlanksFilled = currentUserAnswers.every(answer => answer !== null);
  
  // Split question by blank placeholder
  const questionParts = currentQuestion.question.split("_____________");
  
  // Handle option click
  const handleOptionClick = (option: string) => {
    // Check if this option is already selected
    const isOptionSelected = currentUserAnswers.includes(option);
    if (!isOptionSelected) {
      selectOption(option);
    }
  };
  
  // Handle blank click
  const handleBlankClick = (index: number) => {
    if (currentUserAnswers[index] !== null) {
      // Unselect if already filled
      unselectOption(index);
    } else {
      // Select blank to fill
      setSelectedBlankIndex(index);
    }
  };
  
  // Handle next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigate("/results");
    }
  };

  // Handle quit
  const handleQuit = () => {
    navigate("/results");
  };
  
  // Format time left to mm:ss
  const formatTime = (seconds: number) => {
    return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, "0")}`;
  };
  
  // Render progress bars
  const renderProgressBars = () => {
    return Array.from({ length: 10 }).map((_, index) => (
      <div
        key={index}
        className={`h-1 rounded-full ${
          index <= currentQuestionIndex ? "bg-[#453FE1]" : "bg-gray-300"
        }`}
        style={{ flex: 1 }}
      />
    ));
  };

  return (
    <div className="bg-[#F8F8F8] min-h-screen py-4 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm font-medium text-gray-600">{formatTime(timeLeft)}</div>
          <button
            onClick={handleQuit}
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            Quit
          </button>
        </div>
        
        {/* Progress bars */}
        <div className="flex gap-1 mb-8">
          {renderProgressBars()}
        </div>
        
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-center text-sm font-medium text-gray-600 mb-4">
              Select the missing words in the correct order
            </h2>
            
            <div className="sentence-container mb-8">
              {questionParts.map((part, index) => (
                <React.Fragment key={index}>
                  {part}
                  {index < questionParts.length - 1 && (
                    <button
                      className={`inline-block mx-1 px-2 py-1 min-w-28 border-b-2 border-gray-300 text-center ${
                        currentUserAnswers[index]
                          ? "bg-[#453FE1] text-white rounded"
                          : selectedBlankIndex === index
                          ? "bg-[#453FE1]/10 border-[#453FE1]"
                          : ""
                      }`}
                      onClick={() => handleBlankClick(index)}
                    >
                      {currentUserAnswers[index] || "\u00A0"}
                    </button>
                  )}
                </React.Fragment>
              ))}
            </div>
            
            <div className="options-container flex flex-wrap gap-2 justify-center">
              {currentQuestion.options.map((option, index) => {
                const isOptionUsed = currentUserAnswers.includes(option);
                return (
                  <button
                    key={index}
                    className={`border rounded-md px-4 py-2 text-sm ${
                      isOptionUsed
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-white hover:bg-gray-50"
                    }`}
                    onClick={() => handleOptionClick(option)}
                    disabled={isOptionUsed || selectedBlankIndex === null}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-end">
          <Button
            className="bg-[#453FE1] text-white px-6 py-2.5 rounded-lg hover:bg-[#453FE1]/90 transition-colors"
            disabled={!allBlanksFilled}
            onClick={handleNextQuestion}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
