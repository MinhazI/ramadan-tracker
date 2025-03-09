import { iQuiz } from "@/interfaces/iQuiz";
import { guessSurah } from "quran-quiz";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import generateNumbersForQuranQuiz from "@/utils/generateNumbersForQuranQuiz";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  Table,
  TableCell,
} from "@/components/ui/table";
import { CircleCheck, CircleX } from "lucide-react";
import { logEvent } from "firebase/analytics";
import { fbAnalytics } from "@/utils/firebase";

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
  const [quranLevel, setQuranLevel] = useState<number>(0);
  const correctAnswers = results.filter(
    (result) => !result.missedTheAnswer
  ).length;

  useEffect(() => {
    const currentQuranLevel = localStorage.getItem("quranLevel");
    if (currentQuranLevel) {
      setQuranLevel(Number(currentQuranLevel));
    } else {
      setQuranLevel(1);
    }
  }, []);

  useEffect(() => {
    getSurahs(quranLevel);
  }, [quranLevel]);

  const getSurahs = async (level: number) => {
    const data = await guessSurah.bySurah({
      amount: 10,
      select: generateNumbersForQuranQuiz(level || 1),
    });

    setQuizData(data);
  };

  const playAgain = async (level: number) => {
    if (level <= 12) {
      localStorage.setItem("quranLevel", level.toString());
      setQuranLevel(level);
      setCurrentQuestionIndex(0);
      setNextButtonDisabled(false);
      setPreviousButtonDisabled(true);
      setShowSuccessMessage(false);
      setResults([]);
      getSurahs(level);
    }
  };

  const submit = (questionTitle: string) => {
    logEvent(fbAnalytics, "quiz_submitted");
    setShowIncorrectAnswerMessage(false);
    const selectedOption = quizData?.data[currentQuestionIndex].options.find(
      (option) => option.text === selectedAnswer
    );

    if (selectedOption?.value === 1) {
      // Correct answer
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
      GoToNextQuestion(); // Move to the next question
    } else {
      // Incorrect answer
      if (retries < 2) {
        setShowIncorrectAnswerMessage(true);
        setRetries(retries + 1); // Increment retries
      } else {
        // Retries exhausted
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
        setSelectedAnswer(null); // Reset selected answer
        GoToNextQuestion(); // Move to the next question
      }
    }
  };

  const GoToNextQuestion = () => {
    setRetries(0); // Reset retries for the next question
    if (currentQuestionIndex < 9) {
      setCurrentQuestionIndex(currentQuestionIndex + 1); // Move to the next question
      setPreviousButtonDisabled(false); // Enable the "Previous" button
    } else {
      setNextButtonDisabled(true); // Disable the "Next" button if it's the last question
      setShowSuccessMessage(true); // Show the success message
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
          Test your knowledge on the Qu'ran by answering this quiz (Level{" "}
          {quranLevel})
        </CardDescription>
        <CardTitle>
          <p className="mb-5">In which surah does the following ayath come: </p>
          <p className="tracking-wide font-light text-3xl leading-14">
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
          <p className="mb-5 text-gray-400 text-sm">
            You have <span className="font-bold">{2 - retries}</span> retries
          </p>
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
    return (
      <Card className="p-5 max-w-full md:max-w-[500px] text-center mx-auto">
        <CardHeader className="text-center text-2xl font-semibold mb-4">
          Your Quiz Results
        </CardHeader>
        <CardContent>
          You got{" "}
          <span className="font-bold text-primary text-xl">
            {correctAnswers}
          </span>{" "}
          out of 10 correct!
          {showSuccessMessage && (
            <Table className="mx-auto text-center">
              <TableHeader className="">
                <TableRow>
                  <TableHead className="text-center w-[40px]">#</TableHead>
                  <TableHead className="text-center w-[40px]">✓</TableHead>
                  <TableHead className="text-center">Question</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((result, key) => (
                  <TableRow key={key} className="transition">
                    <TableCell className="text-center font-semibold">
                      {result.questionIndex + 1}
                    </TableCell>
                    <TableCell className="text-center flex justify-center">
                      {result.missedTheAnswer ? (
                        <CircleX
                          color="var(--destructive)"
                          aria-label="Wrong"
                        />
                      ) : (
                        <CircleCheck
                          color="var(--primary)"
                          aria-label="Correct"
                        />
                      )}
                    </TableCell>
                    <TableCell className="text-left">
                      {result.questionTitle}{" "}
                      {result.numberOfRetries > 0 && (
                        <span className="text-sm text-gray-500 ml-2">
                          (🔄 {result.numberOfRetries})
                        </span>
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
              questions, level {quranLevel + 1}!
            </p>
            <Button
              variant={"outline"}
              onClick={() => playAgain(quranLevel + 1)}
            >
              Play Level {quranLevel + 1}
            </Button>
          </div>
        </CardFooter>
      </Card>
    );
  }
};

export default Quiz;
