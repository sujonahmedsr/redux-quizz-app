import Question from "./components/home/Question"
import QuizSummary from "./components/home/QuizSummary"
import { ModeToggle } from "./components/mode-toggle"
import { ThemeProvider } from "./components/theme-provider"
import { useAppSelector } from "./Redux/hook"

function App() {
  const {quizComplete} = useAppSelector(state => state.quiz)
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="p-3 space-y-3">
        <div className="flex items-center justify-end">
          <ModeToggle />
        </div>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-center text-4xl mb-5">Quiz App</h1>
          
          {
            !quizComplete ? <Question /> : <QuizSummary></QuizSummary>
          }
          
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
