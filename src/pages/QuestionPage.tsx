
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { QuestionScreen } from "@/components/sentence-construction/QuestionScreen";
import { useGame } from "@/contexts/GameContext";

export const QuestionPage: React.FC = () => {
  const { isGameStarted } = useGame();
  const navigate = useNavigate();

  // Redirect to home if game hasn't started
  useEffect(() => {
    if (!isGameStarted) {
      navigate("/");
    }
  }, [isGameStarted, navigate]);

  if (!isGameStarted) {
    return null;
  }

  return <QuestionScreen />;
};
