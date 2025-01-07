import { useAppDispatch, useAppSelector } from "@/Redux/hook";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { nextQuestion, previousQuestion } from "@/Redux/features/quizSlice";

const ResultSummary = () => {
    const dispatch = useAppDispatch()
    const { questions, currentQuestionIndex, userAnswers } = useAppSelector(state => state.quiz)
    const currentQuestion = questions[currentQuestionIndex];
    const currentAnswer = userAnswers[currentQuestionIndex];

    const handleNextQuestion = () => {
        dispatch(nextQuestion());
    };
    const handlePreviousQuestion = () => {
        dispatch(previousQuestion());
    };

    const isAnswerQuiz = userAnswers[currentQuestionIndex] !== null;

    const correctAnswer = currentQuestion.correctAnswer === currentAnswer;
    return (
        <div>
            <Card className="md:w-[550px] w-[350px]">
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold">{questions[currentQuestionIndex].question}</CardTitle>
                    <CardDescription>Question {currentQuestionIndex + 1} of {questions.length}.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                    <div className="flex flex-col gap-2">
                        {
                            questions[currentQuestionIndex].options.map((option, index) => <Button key={index + 1}
                                className={`w-full mt-5  ${currentQuestion.correctAnswer === option && 'bg-green-500 text-white'}`}
                                variant={option === currentAnswer ? "default" : "outline"}>{option}</Button>)
                        }
                    </div>

                    <div className="flex flex-col mt-5">
                        <p>
                            Ans:
                            {correctAnswer ? (
                                <span className="text-green-500 font-bold">Correct</span>
                            ) : (
                                <span className="text-red-500 font-bold">Wrong</span>
                            )}
                        </p>
                        {!correctAnswer && (
                            <p>
                                Correct Ans:{" "}
                                <span className="text-green-500 font-bold">
                                    {currentQuestion.correctAnswer}
                                </span>{" "}
                            </p>
                        )}
                    </div>


                    <div className="flex justify-between p-6">
                        <Button
                            disabled={currentQuestionIndex === 0}
                            onClick={handlePreviousQuestion}
                        >
                            {" "}
                            Previous
                        </Button>
                        {currentQuestionIndex < questions.length - 1 && (
                            <Button disabled={!isAnswerQuiz} onClick={handleNextQuestion}>
                                {" "}
                                Next
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ResultSummary;