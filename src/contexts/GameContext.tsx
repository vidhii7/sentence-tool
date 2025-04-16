
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export interface Question {
  questionId: string;
  question: string;
  questionType: string;
  answerType: string;
  options: string[];
  correctAnswer: string[];
}

export interface GameData {
  status: string;
  data: {
    testId: string;
    questions: Question[];
  };
  message: string;
}

interface GameContextType {
  currentQuestionIndex: number;
  questions: Question[];
  isLoading: boolean;
  timeLeft: number;
  userAnswers: (string | null)[][];
  selectedBlankIndex: number | null;
  setSelectedBlankIndex: (index: number | null) => void;
  setCurrentQuestionIndex: (index: number) => void;
  selectOption: (option: string) => void;
  unselectOption: (blankIndex: number) => void;
  startGame: () => void;
  isGameStarted: boolean;
  isGameFinished: boolean;
  resetGame: () => void;
}

const GameContext = createContext<GameContextType | null>(null);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [userAnswers, setUserAnswers] = useState<(string | null)[][]>([]);
  const [selectedBlankIndex, setSelectedBlankIndex] = useState<number | null>(null);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [isGameFinished, setIsGameFinished] = useState<boolean>(false);
  const [timerId, setTimerId] = useState<number | null>(null);
  const navigate = useNavigate();

  // Fetch questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // In a real application, this would be an API call
        // For this example, we're using the sample data
        const sampleData: GameData = {
          "status": "SUCCESS",
          "data": {
            "testId": "oihq2eo9h1029921-210-20112",
            "questions": [
              {
                "questionId": "b28af948-db8b-465e-92e6-3d42534c4533",
                "question": "The company's _____________ approach to product development _____________ customer feedback at every stage, _____________ user satisfaction and _____________ a loyal consumer base.",
                "questionType": "text",
                "answerType": "options",
                "options": ["Incorporated", "User-centric", "Enhancing", "Cultivating"],
                "correctAnswer": ["User-centric", "Incorporated", "Enhancing", "Cultivating"]
              },
              {
                "questionId": "6e6534ea-260a-4c26-96fd-f830b27601fb",
                "question": "The _____________ musical performance _____________ elements from various genres, _____________ the audience with its unique sound and _____________ critical acclaim from industry experts.",
                "questionType": "text",
                "answerType": "options",
                "options": ["Captivating", "Eclectic", "Garnering", "Blended"],
                "correctAnswer": ["Eclectic", "Blended", "Captivating", "Garnering"]
              },
              {
                "questionId": "7186e3da-0384-460a-af19-5a3984758e78",
                "question": "The scientist's _____________ research on quantum computing _____________ new possibilities for data processing, _____________ traditional limitations and _____________ the way for groundbreaking technological advancements.",
                "questionType": "text",
                "answerType": "options",
                "options": ["Pioneering", "Paving", "Overcoming", "Opened up"],
                "correctAnswer": ["Pioneering", "Opened up", "Overcoming", "Paving"]
              },
              {
                "questionId": "10cbe3c2-13bb-4973-a794-18bf309b0791",
                "question": "The _____________ implementation of machine learning algorithms in medical diagnostics _____________ early detection of diseases, _____________ treatment outcomes and _____________ the workload of healthcare professionals.",
                "questionType": "text",
                "answerType": "options",
                "options": ["Improving", "Reducing", "Enabled", "Revolutionary"],
                "correctAnswer": ["Revolutionary", "Enabled", "Improving", "Reducing"]
              },
              {
                "questionId": "71ffe41e-8732-48e6-87f2-f84ea07eb060",
                "question": "The _____________ security breach at the tech giant _____________ millions of users' data, _____________ concerns about online privacy and _____________ calls for stricter regulations.",
                "questionType": "text",
                "answerType": "options",
                "options": ["Raising", "Massive", "Prompting", "Compromised"],
                "correctAnswer": ["Massive", "Compromised", "Raising", "Prompting"]
              },
              {
                "questionId": "48b9b4bd-5c2c-4c25-92c0-ce453b14e8d7",
                "question": "The _____________ educational reform _____________ a more inclusive curriculum, _____________ equal opportunities for all students and _____________ the overall quality of public schooling.",
                "questionType": "text",
                "answerType": "options",
                "options": ["Comprehensive", "Enhancing", "Implemented", "Promoting"],
                "correctAnswer": ["Comprehensive", "Implemented", "Promoting", "Enhancing"]
              },
              {
                "questionId": "ed5e6e2d-8408-406e-be32-777ac26460e2",
                "question": "The company's _____________ commitment to sustainability _____________ eco-friendly practices across all departments, _____________ its carbon footprint and _____________ a model for corporate responsibility.",
                "questionType": "text",
                "answerType": "options",
                "options": ["Implemented", "Setting", "Unwavering", "Reducing"],
                "correctAnswer": ["Unwavering", "Implemented", "Reducing", "Setting"]
              },
              {
                "questionId": "936eccaa-2f3b-4322-a3d3-ceabf2219dc5",
                "question": "The _____________ implementation of artificial intelligence in healthcare _____________ patient outcomes, _____________ the workload of medical professionals and _____________ new avenues for personalized treatment.",
                "questionType": "text",
                "answerType": "options",
                "options": ["Opening", "Improved", "Gradual", "Reducing"],
                "correctAnswer": ["Gradual", "Improved", "Reducing", "Opening"]
              },
              {
                "questionId": "d78effdf-88ab-4667-8115-3bfb2baa0a24",
                "question": "The _____________ festival _____________ artists from diverse backgrounds, _____________ cultural exchange and _____________ a platform for emerging talents to showcase their work.",
                "questionType": "text",
                "answerType": "options",
                "options": ["Providing", "Brought together", "Promoting", "International"],
                "correctAnswer": ["International", "Brought together", "Promoting", "Providing"]
              },
              {
                "questionId": "2d08ec76-a253-4f34-bc45-e12ef21b78fb",
                "question": "The _____________ implementation of smart city technologies _____________ urban efficiency and sustainability, _____________ quality of life for residents and _____________ a model for future urban development.",
                "questionType": "text",
                "answerType": "options",
                "options": ["Enhancing", "Improved", "Providing", "Widespread"],
                "correctAnswer": ["Widespread", "Improved", "Enhancing", "Providing"]
              }
            ]
          },
          "message": "Questions fetched successfully",
          "activity": {
            "id": "3c576049-9ea9-4b5c-9fb7-4b316adaaaa0",
            "userId": "c6ad08a5-67ac-4a4d-aa3a-16d7fe91d51c",
            "type": "VERSANT_CATEGORY_TEST",
            "coinType": "DEDUCTED",
            "coins": 20,
            "description": "Used Versant Category Test",
            "createdAt": "2025-04-10T06:42:21.041Z"
          }
        };

        setQuestions(sampleData.data.questions);
        // Initialize userAnswers with empty arrays for each question
        const initialUserAnswers = sampleData.data.questions.map(q => {
          // Count blanks in the question
          const blankCount = (q.question.match(/____________/g) || []).length;
          return Array(blankCount).fill(null);
        });
        setUserAnswers(initialUserAnswers);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // Timer logic
  useEffect(() => {
    if (isGameStarted && !isGameFinished && timeLeft > 0) {
      const timer = window.setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            // Time's up, move to next question
            if (currentQuestionIndex < questions.length - 1) {
              setCurrentQuestionIndex(currentQuestionIndex + 1);
              return 30; // Reset timer for next question
            } else {
              // End game if all questions are done
              setIsGameFinished(true);
              navigate("/results");
              clearInterval(timer);
            }
          }
          return prev - 1;
        });
      }, 1000);
      
      setTimerId(timer);
      return () => {
        if (timer) clearInterval(timer);
      };
    }
  }, [isGameStarted, isGameFinished, timeLeft, currentQuestionIndex, questions.length, navigate]);

  // Reset timer when question changes
  useEffect(() => {
    if (isGameStarted) {
      setTimeLeft(30);
    }
  }, [currentQuestionIndex, isGameStarted]);

  const startGame = () => {
    setIsGameStarted(true);
    setCurrentQuestionIndex(0);
    setTimeLeft(30);
    navigate("/question");
  };

  const resetGame = () => {
    setIsGameStarted(false);
    setIsGameFinished(false);
    setCurrentQuestionIndex(0);
    setTimeLeft(30);
    setSelectedBlankIndex(null);
    // Reset user answers
    const resetAnswers = questions.map(q => {
      const blankCount = (q.question.match(/____________/g) || []).length;
      return Array(blankCount).fill(null);
    });
    setUserAnswers(resetAnswers);
    if (timerId) {
      clearInterval(timerId);
      setTimerId(null);
    }
  };

  const selectOption = (option: string) => {
    if (selectedBlankIndex !== null) {
      const newUserAnswers = [...userAnswers];
      const currentAnswers = [...newUserAnswers[currentQuestionIndex]];
      currentAnswers[selectedBlankIndex] = option;
      newUserAnswers[currentQuestionIndex] = currentAnswers;
      setUserAnswers(newUserAnswers);
      setSelectedBlankIndex(null);
    }
  };

  const unselectOption = (blankIndex: number) => {
    const newUserAnswers = [...userAnswers];
    const currentAnswers = [...newUserAnswers[currentQuestionIndex]];
    currentAnswers[blankIndex] = null;
    newUserAnswers[currentQuestionIndex] = currentAnswers;
    setUserAnswers(newUserAnswers);
  };

  const value = {
    currentQuestionIndex,
    questions,
    isLoading,
    timeLeft,
    userAnswers,
    selectedBlankIndex,
    setSelectedBlankIndex,
    setCurrentQuestionIndex,
    selectOption,
    unselectOption,
    startGame,
    isGameStarted,
    isGameFinished,
    resetGame,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
