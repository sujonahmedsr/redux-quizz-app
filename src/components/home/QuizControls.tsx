import { useAppDispatch, useAppSelector } from "@/Redux/hook";
import { Button } from "../ui/button";
import { completeQuiz, nextQuestion, previousQuestion } from "@/Redux/features/quizSlice";


const QuizControls = () => {
    const { questions, currentQuestionIndex, quizComplete, userAnswers } = useAppSelector(state => state.quiz)
    const dispatch = useAppDispatch()
    const isAnswerSelected = userAnswers[currentQuestionIndex] !== null
    const isCompleteEnabled =
        isAnswerSelected || currentQuestionIndex !== questions.length - 1;
    return (
        <div className="flex items-center justify-between">
            {/* Previous Button */}
            <Button disabled={currentQuestionIndex === 0 || quizComplete}
                onClick={() => dispatch(previousQuestion())}>Previous</Button>

            {/* Next Button */}
            {currentQuestionIndex < questions.length - 1 && !quizComplete &&
                <Button onClick={() => dispatch(nextQuestion())} disabled={!isAnswerSelected}>Next</Button>
            }

            {/* Complete Quiz Button */}
            {currentQuestionIndex === questions.length - 1 && !quizComplete && (
                <Button onClick={() => dispatch(completeQuiz())} disabled={!isCompleteEnabled}>
                    Complete Quiz
                </Button>
            )}
        </div>
    );
};

export default QuizControls;