import AddQuiz from "./components/home/AddQuiz"
import AllQuiz from "./components/home/AllQuiz"
import Question from "./components/home/Question"
import QuizSummary from "./components/home/QuizSummary"
import ResultSummary from "./components/home/ResultSummary"
import { ModeToggle } from "./components/mode-toggle"
import { ThemeProvider } from "./components/theme-provider"
import { useAppSelector } from "./Redux/hook"
import {Toaster} from "sonner"

function App() {
  const {quizComplete, resultSummary} = useAppSelector(state => state.quiz)
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="p-3 space-y-3">
        <div className="flex items-center justify-end">
          <ModeToggle />
        </div>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-center text-4xl mb-5">Quiz App</h1>
          <AddQuiz />
          <AllQuiz />
          {
            resultSummary ? <ResultSummary /> : !quizComplete ? <Question /> : <QuizSummary></QuizSummary>
          }
          
        </div>
      </div>
      <Toaster />
    </ThemeProvider>
  )
}

export default App
