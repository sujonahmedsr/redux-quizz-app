import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const AddQuiz = () => {
    const [step, setStep] = useState(1)
    const [addQuestionStep, setAddQuestionStep] = useState(1)
    const [openAddQuestionModal, setOpenAddQuestionModal] = useState(false);
    const [newQuestion, setNewQuestion] = useState({
        question: "",
        options: ["", "", "", ""],
        correctAnswer: "",
    })


    const nextStep = () => {
        setStep(step + 1)
    }
    const backStep = () => {
        setStep(step - 1)
    }
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
                            step > 1 && <Button variant="outline" onClick={backStep}>Back</Button>
                        }
                        {
                            step < 3 && <Button type="submit" onClick={nextStep}>Next</Button>
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
                        addQuestionStep === 2 && newQuestion.options.map((option,i) => <Input placeholder={`option ${i + 1} `} value={option}/>)
                    }
                    {
                        addQuestionStep === 3 && newQuestion.options.map((option,i) => <Input placeholder={`option ${i + 1} `} value={option}/>)
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