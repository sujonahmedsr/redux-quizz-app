import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useAppDispatch, useAppSelector } from "@/Redux/hook";
import { Button } from "../ui/button";
import QuizControls from "./QuizControls";
import { setAnswers } from "@/Redux/features/quizSlice";
const Question = () => {
    const dispatch = useAppDispatch()
    const { questions, currentQuestionIndex, userAnswers } = useAppSelector(state => state.quiz)

    const currentAnswer = userAnswers[currentQuestionIndex];

    const handleAnswerChange = (answer: string) => {
        dispatch(setAnswers({ questionIndex: currentQuestionIndex, answer }));
    };
    return (
        <div>
            {
                questions.length > 0 && <Card className="md:w-[550px] w-[350px]">
                    <CardHeader>
                        <CardTitle className="text-2xl font-semibold">{questions[currentQuestionIndex].question}</CardTitle>
                        <CardDescription>Question {currentQuestionIndex + 1} of {questions.length}.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-5">
                        <div className="flex flex-col gap-2">
                            {
                                questions[currentQuestionIndex].options.map((option, index) => <Button onClick={() => handleAnswerChange(option)} key={index + 1} variant={option === currentAnswer ? "default" : "outline"}>{option}</Button>)
                            }
                        </div>
                        <QuizControls />
                    </CardContent>
                </Card>
            }
        </div>
    );
};

export default Question;