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
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  Table,
  TableCell,
} from "./ui/table";
import { CircleCheck, CircleX, RefreshCwIcon } from "lucide-react";

interface iResult {
  questionTitle: string;
  questionIndex: number;
  firstTry: boolean;
  numberOfRetries: number;
  missedTheAnswer: boolean;
}

const Quiz = () => {
  const [quizData, setQuizData] = useState<iQuiz>();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [nextButtonDisabled, setNextButtonDisabled] = useState(false);
  const [previousButtonDisabled, setPreviousButtonDisabled] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showIncorrectAnswerMessage, setShowIncorrectAnswerMessage] =
    useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean | null>(
    null
  );
  const [retries, setRetries] = useState<number>(0);
  const [results, setResults] = useState<iResult[]>([]);

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
    setNextButtonDisabled(false);
    setPreviousButtonDisabled(true);
    setShowSuccessMessage(false);
    getSurahs();
  };

  const submit = (questionTitle: string) => {
    setShowIncorrectAnswerMessage(false);
    const selectedOption = quizData?.data[currentQuestionIndex].options.find(
      (option) => option.text === selectedAnswer
    );
    if (selectedOption?.value === 1) {
      setResults((prevResults) => [
        ...prevResults,
        {
          questionTitle,
          questionIndex: currentQuestionIndex,
          firstTry: retries === 0,
          numberOfRetries: retries,
          missedTheAnswer: false,
        },
      ]);
      setSelectedAnswer(null);
      GoToNextQuestion();
    } else {
      if (retries < 2) {
        setShowIncorrectAnswerMessage(true);
        setRetries(retries + 1);
      } else {
        setResults((prevResults) => [
          ...prevResults,
          {
            questionTitle,
            questionIndex: currentQuestionIndex,
            firstTry: retries === 0,
            numberOfRetries: retries,
            missedTheAnswer: true,
          },
        ]);
        GoToNextQuestion();
      }
    }
  };

  const GoToNextQuestion = () => {
    setRetries(0);
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
              onClick={() =>
                submit(quizData?.data[currentQuestionIndex].question || "")
              }
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
    console.log(results);
    return (
      <Card className="p-5 max-w-full md:max-w-[600px] text-center mx-auto">
        <CardHeader className="text-center text-2xl font-semibold mb-4">
          Your Quiz Results
        </CardHeader>
        <CardContent>
          {showSuccessMessage && (
            <Table className="mx-auto text-center">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">No.</TableHead>
                  <TableHead className="text-center">Question</TableHead>
                  <TableHead className="text-center">Retries</TableHead>
                  <TableHead className="text-center">Correct?</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((result, key) => (
                  <TableRow key={key} className="text-center">
                    <TableCell className="text-center">
                      #{result.questionIndex + 1}
                    </TableCell>
                    <TableCell className="text-center">
                      {result.questionTitle}
                    </TableCell>
                    <TableCell className="text-center">
                      {result.numberOfRetries}
                    </TableCell>
                    <TableCell className="text-center">
                      {result.missedTheAnswer ? (
                        <CircleX color="var(--destructive)" />
                      ) : (
                        <CircleCheck color="var(--primary)" />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
        <CardFooter className="justify-center">
          <div className="mt-5 text-center">
            <p className="text-sm mb-5">
              Ready for a new challenge? Click below to start again with fresh
              questions!
            </p>
            <Button variant={"outline"} onClick={() => playAgain()}>
              Play Again <RefreshCwIcon />
            </Button>
          </div>
        </CardFooter>
      </Card>
    );
  }
};

export default Quiz;
