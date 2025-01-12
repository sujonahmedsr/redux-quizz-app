import { quizData } from "@/components/home/quizData";
import { createSlice } from "@reduxjs/toolkit";

export interface QuizData {
    question: string;
    options: string[];
    correctAnswer: string;
}

export type TQuiz = {
    _id: string;
    name: string;
    description: string;
    questions: QuizData[];
    createdAt: Date;
    updatedAt: Date;
};

interface Iinitial {
    questions: typeof quizData,
    currentQuestionIndex: number,
    userAnswers: (string | null)[],
    quizComplete: boolean,
    resultSummary: boolean
}

const initialState: Iinitial = {
    questions: quizData,
    currentQuestionIndex: 0,
    userAnswers: Array(quizData.length).fill(null),
    quizComplete: false,
    resultSummary: false
}

const quizSlice = createSlice({
    name: "Quiz",
    initialState,
    reducers: {
        setAnswers: (state, action) => {
            const { questionIndex, answer } = action.payload
            state.userAnswers[questionIndex] = answer
        },
        nextQuestion: (state) => {
            if (state.currentQuestionIndex < quizData.length - 1) {
                state.currentQuestionIndex += 1
            }
        },
        previousQuestion: (state) => {
            if (state.currentQuestionIndex > 0) {
                state.currentQuestionIndex -= 1
            }
        },
        completeQuiz: (state) => {
            state.quizComplete = true;
        },
        checkQuizResult: (state) => {
            state.resultSummary = true;
            state.currentQuestionIndex = 0
        },
        setQuiz: (state, action) => {
            state.questions = action.payload
        }
    }
})
export const {
    setAnswers,
    nextQuestion,
    previousQuestion,
    completeQuiz,
    checkQuizResult,
    setQuiz } = quizSlice.actions
export default quizSlice.reducer