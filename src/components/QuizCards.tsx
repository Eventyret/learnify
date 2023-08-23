"use client";
import { cn } from "@/lib/utils";
import { Chapter, Question } from "@prisma/client";
import { ChevronRight } from "lucide-react";
import { useCallback, useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useToast } from './ui/use-toast';

type Props = {
  chapter: Chapter & {
    questions: Question[];
  };
};

export const QuizCards = ({ chapter }: Props) => {
  const { toast } = useToast()
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [correctAnswer, setCorrectAnswer] = useState<boolean>(false);
  const [questionState, setQuestionState] = useState<
    Record<string, boolean | null>
  >({});
  const [hasChecked, setHasChecked] = useState<boolean>(false);
  const [showButton, setShowButton] = useState<boolean>(false);

  const checkAnswer = useCallback(() => {
    const newQuestionState = { ...questionState };
    let isAnyAnswerCorrect = false;

    chapter.questions.forEach((question) => {
      const user_answer = answers[question.id];
      if (!user_answer) return;
      if (user_answer === question.answer) {
        newQuestionState[question.id] = true;
        isAnyAnswerCorrect = true;
      } else {
        newQuestionState[question.id] = false;
      }
      setQuestionState(newQuestionState);
    });

    if (isAnyAnswerCorrect) {
      setCorrectAnswer(true);
    }
    if (isAnyAnswerCorrect) {
      toast({
        title: "Hammered it!",
        description: "You truly nailed that one!",
      });
      setShowButton(false);
    } else {
      toast({
        title: "Missed the Mark!",
        description: "But every archer has their off days. Take another shot!",
        variant: "destructive",
      });
    }

    setHasChecked(true); // Mark that the answer has been checked
  }, [answers, questionState, chapter.questions, toast]);


  if (chapter.questions.length === 0) {
    return null;
  }
  return (

    <div className="flex-[1] mt-16 ml-8">

      <h1 className="text-2xl font-bold">Concept Check</h1>
      <p>Is the answer correct? : {correctAnswer.toString()}</p>

      <div className="mt-2">
        {chapter.questions.map((question) => {
          const uniqueOptions = Array.from(new Set(JSON.parse(question.options) as string[]));
          return (
            <div
              key={question.id}
              className="p-3 mt-4 border border-secondary rounded-lg"
            >
              <h1 className="text-lg font-semibold">{question.question}</h1>
              <div className="mt-2">
                <RadioGroup
                  disabled={correctAnswer}
                  onValueChange={(e) => {
                    setCorrectAnswer(true);
                    if (!correctAnswer) {
                      setHasChecked(false);
                      setCorrectAnswer(false);
                      setShowButton(true);
                      setAnswers((prev) => {
                        return {
                          ...prev,
                          [question.id]: e,
                        }
                      })
                    }
                  }}
                >
                  {uniqueOptions.map((option, index) => {
                    return (
                      <div className="flex items-center space-x-2" key={index}>
                        <RadioGroupItem
                          value={option}
                          id={question.id + index.toString()}
                        />
                        <Label htmlFor={question.id + index.toString()}>
                          {option}
                          {/* Adjusted the conditional rendering */}
                          {hasChecked && answers[question.id] === option && questionState[question.id] === true && (
                            <span className="ml-4 text-green-500">Correct</span>
                          )}
                          {hasChecked && answers[question.id] === option && questionState[question.id] === false && (
                            <span className="ml-4 text-red-500">Incorrect</span>
                          )}
                        </Label>
                      </div>
                    );
                  })}
                </RadioGroup>
              </div>
            </div>
          );
        })}
      </div>
      {
        showButton && (
          <Button
            className="w-full mt-2"
            size="lg"
            onClick={checkAnswer}
            disabled={correctAnswer}
          >
            Check Answer
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        )
      }
    </div >
  );
};
