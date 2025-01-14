import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toast } from "sonner";
import { useAddQuizMutation } from "@/Redux/api/quizApi/quizApi";


type TQuestion = {
    question: string,
    options: string[],
    correctAnswer: string
}

type TQuizData = {
    title: string,
    description: string,
    questions: TQuestion[]
}

const AddQuiz = () => {
    const [addQuiz, { isError, isSuccess }] = useAddQuizMutation()
    const [step, setStep] = useState(1)
    const [addQuestionStep, setAddQuestionStep] = useState(1)
    const [openAddQuestionModal, setOpenAddQuestionModal] = useState(false);
    const [quizData, setQuizData] = useState<TQuizData>({
        title: "",
        description: "",
        questions: [],
    })
    const [newQuestion, setNewQuestion] = useState({
        question: "",
        options: ["", "", "", ""],
        correctAnswer: "",
    })

    const handleInputChanges = (e: React.ChangeEvent<HTMLInputElement>, field: string, optionIndex?: number) => {
        const { value } = e.target

        if (field === "title" || field === "description") {
            setQuizData(prev => ({ ...prev, [field]: value }))
        }
        if (field === "question") {
            setNewQuestion((prev) => ({ ...prev, question: value }));
        }
        if (field === "option" && optionIndex !== undefined) {
            const updatedOptions = [...newQuestion.options];
            updatedOptions[optionIndex] = value;
            setNewQuestion((prev) => ({ ...prev, options: updatedOptions }));
        }
    }

    const handleCorrectAnswerSelect = (answer: string) => {
        setNewQuestion((prev) => ({ ...prev, correctAnswer: answer }));
    };

    const addQuestion = () => {
        setQuizData((prev) => ({
            ...prev,
            questions: [...prev.questions, newQuestion],
        }));
        setNewQuestion({
            question: "",
            options: ["", "", "", ""],
            correctAnswer: "",
        });
        setOpenAddQuestionModal(false);
        setAddQuestionStep(1);
    };

    const removeQuestion = (index: number) => {
        const updatedQuestions = quizData.questions.filter((_, i) => i !== index);
        setQuizData((prev) => ({ ...prev, questions: updatedQuestions }));
    };

    const handleSubmit = async () => {
        if (quizData.title === '' || quizData.description === '' || quizData.questions.length === 0) {
            return toast.error("Something went wrong")
        }

        const res = await addQuiz(quizData)

        if (isError || res.error){
            toast.error("Something went wrong.")
        }

        if (isSuccess){
            toast.success("Quiz Added.")
        }
        
        
    }

    return (
        <div className="my-5">
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="destructive">Add Quiz</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create new quiz</DialogTitle>
                        <DialogDescription>
                            {
                                step === 1 && 'Step 1 : Enter Quiz Details'
                            }
                            {
                                step === 2 && 'Step 2: Add Questions'
                            }
                            {
                                step === 3 && 'Step 3: Submit'
                            }

                        </DialogDescription>
                    </DialogHeader>
                    {
                        step === 1 && <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="title" className="text-right">
                                    Title
                                </Label>
                                <Input id="title" className="col-span-3" onChange={(e) => handleInputChanges(e, 'title')} value={quizData.title} />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="description" className="text-right">
                                    Description
                                </Label>
                                <Input id="description" className="col-span-3" onChange={(e) => handleInputChanges(e, 'description')} value={quizData.description} />
                            </div>
                        </div>
                    }
                    {
                        step === 2 && <div className="grid gap-4 py-4">
                            {quizData.questions.map((q, index) => (
                                <div key={index} className="border p-4 rounded-lg relative">
                                    <Label className="text-right">
                                        Q{index + 1}: {q.question}
                                    </Label>
                                    <Button
                                        onClick={() => removeQuestion(index)}
                                        variant="outline"
                                        className="absolute top-2 right-2"
                                    >
                                        Remove
                                    </Button>
                                </div>
                            ))}
                            <Button
                                onClick={() => setOpenAddQuestionModal(true)}
                                className="mt-4 w-full"
                            >
                                Add Another Question
                            </Button>
                        </div>
                    }
                    <DialogFooter>
                        {
                            step > 1 && <Button variant="outline" onClick={() => setStep(step - 1)}>Back</Button>
                        }
                        {
                            step < 3 && <Button type="submit" onClick={() => setStep(step + 1)}>Next</Button>
                        }
                        {
                            step === 3 && <Button variant="destructive" onClick={handleSubmit}>Submit Quiz</Button>
                        }
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={openAddQuestionModal}
                onOpenChange={setOpenAddQuestionModal}>
                <DialogContent className="max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add New Question</DialogTitle>
                        <DialogDescription>
                            Step {addQuestionStep} : {addQuestionStep === 1 && "Question"}
                            {addQuestionStep === 2 && "Options"}
                            {addQuestionStep === 3 && "Correct Answere"}
                        </DialogDescription>
                    </DialogHeader>
                    {
                        addQuestionStep === 1 && <Input placeholder="Enter question"
                            value={newQuestion.question} onChange={(e) => handleInputChanges(e, "question")} />
                    }
                    {
                        addQuestionStep === 2 && newQuestion.options.map((option, i) => <Input key={i} placeholder={`option ${i + 1} `} value={option} onChange={(e) => handleInputChanges(e, "option", i)} />)
                    }
                    {
                        addQuestionStep === 3
                        &&
                        <select
                            value={newQuestion.correctAnswer}
                            className="w-full p-2 mt-2 border rounded-md"
                            onChange={(e) => handleCorrectAnswerSelect(e.target.value)}
                        >
                            {newQuestion.options.map((option, i) => (
                                <option key={i} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    }

                    <DialogFooter>
                        {addQuestionStep > 1 && (
                            <Button onClick={() => setAddQuestionStep((s) => s - 1)}>
                                Back
                            </Button>
                        )}
                        {addQuestionStep < 3 ? (
                            <Button onClick={() => setAddQuestionStep((s) => s + 1)}>
                                Next
                            </Button>
                        ) : (
                            <Button onClick={addQuestion}>Add Question</Button>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AddQuiz;