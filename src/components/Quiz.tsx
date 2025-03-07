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
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean | null>(
    null
  );

  useEffect(() => {
    getSurahs();
  }, []);

  const getSurahs = async () => {
    const data = await guessSurah.bySurah({
      amount: 10,
      select: generateNumbersForQuranQuiz(),
    });

    setQuizData(data);
  };

  const playAgain = async () => {
    setCurrentQuestionIndex(0);
    setShowSuccessMessage(false);
    getSurahs();
  };

  const submit = () => {
    setShowIncorrectAnswerMessage(false);
    const selectedOption = quizData?.data[currentQuestionIndex].options.find(
      (option) => option.text === selectedAnswer
    );
    if (selectedOption?.value === 1) {
      setSelectedAnswer(null);
      GoToNextQuestion();
    } else {
      setShowIncorrectAnswerMessage(true);
    }
  };

  const GoToNextQuestion = () => {
    if (currentQuestionIndex < 9) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setPreviousButtonDisabled(false);
    } else {
      setNextButtonDisabled(true);
      setShowSuccessMessage(true);
    }
  };

  const GoToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      setPreviousButtonDisabled(true);
    }
  };

  if (!showSuccessMessage) {
    return (
      <Card className="p-5 max-w-full md:max-w-[500px] text-center">
        <CardHeader className="text-center">
          {` Qu'ran Question ${currentQuestionIndex + 1} of 10`}
        </CardHeader>
        <CardDescription>
          Test your knowledge on the Qu'ran by answering this quiz
        </CardDescription>
        <CardTitle>
          <p className="mb-5">In which surah does the following ayath come: </p>
          <p className="mb-5 tracking-wide font-light text-3xl leading-14">
            {quizData?.data[currentQuestionIndex].question}
          </p>
          {showIncorrectAnswerMessage && (
            <p className="text-red-500 text-sm">
              Oops! You have selected the incorrect answer. Please try again.
            </p>
          )}

          {showSuccessMessage && (
            <p className="text-green-700 text-sm">
              Mashaa Allah! You have got all the questions correct. <br /> If
              you want to play with new questions, refresh the page.
            </p>
          )}
        </CardTitle>
        <CardContent>
          <RadioGroup
            value={selectedAnswer || ""}
            onValueChange={(value) => setSelectedAnswer(value)}
          >
            {quizData?.data[currentQuestionIndex].options.map((answer, key) => (
              <div className="flex items-center space-x-2" key={key}>
                <RadioGroupItem
                  value={answer.text}
                  id={answer.text}
                  onClick={() => setShowIncorrectAnswerMessage(false)}
                />
                <Label htmlFor={answer.text}>Surah {answer.text}</Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter className="justify-center">
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
  } else if (showSuccessMessage) {
    return (
      <Card className="p-5 max-w-full md:max-w-[500px] text-center">
        <CardHeader className="text-center text-2xl">
          Congratulations
        </CardHeader>
        <CardContent>
          {showSuccessMessage && (
            <>
              <p className="text-5xl pb-4">🎉</p>
              <p className="text-green-700 text-2xl">
                Mashaa Allah! You have got all the questions correct.
              </p>
              <p className=" text-xl mt-2">
                If you want to play with new questions, press the button below.
              </p>
            </>
          )}
        </CardContent>
        <CardFooter className="justify-center">
          <div className="mt-5">
            <Button variant={"outline"} onClick={() => playAgain()}>
              Play again
            </Button>
          </div>
        </CardFooter>
      </Card>
    );
  }
};

export default Quiz;
