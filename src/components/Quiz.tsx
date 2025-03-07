import { iQuiz } from "@/interfaces/iQuiz";
import { guessSurah } from "quran-quiz";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import generateNumbersForQuranQuiz from "@/utils/generateNumbersForQuranQuiz";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

const Quiz = () => {
  const [quizData, setQuizData] = useState<iQuiz>();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [nextButtonDisabled, setNextButtonDisabled] = useState(false);
  const [previousButtonDisabled, setPreviousButtonDisabled] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null); // Change to string
  const [showIncorrectAnswerMessage, setShowIncorrectAnswerMessage] =
    useState(false);

  useEffect(() => {
    getSurahs();
  }, []);

  const getSurahs = async () => {
    const data = await guessSurah.bySurah({
      amount: 5,
      select: generateNumbersForQuranQuiz(),
    });

    setQuizData(data);
  };

  const submit = () => {
    setShowIncorrectAnswerMessage(false);
    // Check if the selected answer's value is 1 (correct answer)
    const selectedOption = quizData?.data[currentQuestionIndex].options.find(
      (option) => option.text === selectedAnswer
    );
    if (selectedOption?.value === 1) {
      setSelectedAnswer(null); // Reset selected answer
      if (currentQuestionIndex < 4) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setPreviousButtonDisabled(false);
      } else {
        setNextButtonDisabled(true);
      }
    } else {
      setShowIncorrectAnswerMessage(true);
    }
  };

  const GoToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      setPreviousButtonDisabled(true);
    }
  };

  return (
    <Card className="p-5 max-w-full md:max-w-[500px] text-center">
      <CardHeader className="text-center">
        {` Qu'ran Question ${currentQuestionIndex + 1} of 5`}
      </CardHeader>
      <CardDescription>
        Test your knowledge on the Qu'ran by answering this quiz
      </CardDescription>
      <CardTitle>
        <p className="mb-5">In which surah does the following ayath come: </p>
        <p className="mb-5 tracking-widest font-light text-2xl">
          {quizData?.data[currentQuestionIndex].question}
        </p>
        {showIncorrectAnswerMessage && (
          <p className="text-red-500 text-sm">
            Oops! You have selected the incorrect answer. Please try again.
          </p>
        )}
      </CardTitle>
      <CardContent>
        <RadioGroup
          value={selectedAnswer || ""} // Use selectedAnswer directly
          onValueChange={(value) => setSelectedAnswer(value)} // Update selectedAnswer
        >
          {quizData?.data[currentQuestionIndex].options.map((answer, key) => (
            <div className="flex items-center space-x-2" key={key}>
              <RadioGroupItem
                value={answer.text} // Use answer.text as the unique value
                id={answer.text}
                onClick={() => setShowIncorrectAnswerMessage(false)}
              />
              <Label htmlFor={answer.text}>Surah {answer.text}</Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter>
        <div className="mt-5">
          <Button
            variant={"outline"}
            onClick={() => submit()}
            disabled={nextButtonDisabled}
          >
            Submit Answer
          </Button>
          <Button
            variant={"link"}
            onClick={() => GoToPreviousQuestion()}
            disabled={previousButtonDisabled}
          >
            Previous Question
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Quiz;
