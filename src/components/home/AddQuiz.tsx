import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";


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


    return (
        <div>
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
                                <Label htmlFor="Title" className="text-right">
                                    Title
                                </Label>
                                <Input id="Title" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="Description" className="text-right">
                                    Description
                                </Label>
                                <Input id="Description" className="col-span-3" />
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
                            step === 3 && <Button variant="destructive">Submit Quiz</Button>
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
                        addQuestionStep === 1 && <Input placeholder="Enter question" />
                    }
                    {
                        addQuestionStep === 2 && newQuestion.options.map((option, i) => <Input placeholder={`option ${i + 1} `} value={option} />)
                    }
                    {
                        addQuestionStep === 3
                        &&
                        <select
                            className="w-full p-2 mt-2 border rounded-md"
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
                            <Button>Add Question</Button>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AddQuiz;