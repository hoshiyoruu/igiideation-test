"use client";

import { useContext, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FileText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { JudgeContext } from "@/hooks/JudgeProvider";

const questions = [
  "Novelty & Uniqueness",
  "Benefit to Mankind",
  "Commercialization",
  "Status of Invention / Innovation / Design",
  "Video Presentation",
  "Supporting Documents",
];

export default function EvalForm({ projectId }: { projectId: string }) {
  const [ratings, setRatings] = useState<Record<string, string>>({});
  const [juryComments, setJuryComments] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [accummulatedScore, setaccummulatedScore] = useState<number | null>(
    null
  );
  const [platinumAward, setPlatinumAward] = useState<string>("");
  const [sustainabilityAward, setSustainabilityAward] = useState<string>("");
  const [innovatexAward, setInnovatexAward] = useState<string>("");

  const router = useRouter();

  const judge = useContext(JudgeContext);
  const judgeId = judge?.judgeId;

  const handleSubmit = async () => {
    // Check if all questions are rated

    let isMarkProjectSuccess = false;
    const unansweredQuestions = questions.filter(
      (question) => !ratings[question]
    );
    if (unansweredQuestions.length > 0) {
      setError(`Please rate all questions: ${unansweredQuestions.join(", ")}`);
      return;
    }

    // Clear error
    setError(null);

    // Calculate the average score
    const scores = Object.values(ratings).map(Number);
    const totalScore = scores.reduce((a, b) => a + b, 0);
    console.log(totalScore);
    setaccummulatedScore(totalScore);

    // Result object
    const result = {
      project_id: projectId,
      ratings,
      jury_comments: juryComments,
      average_score: totalScore.toFixed(2),
    };

    const formData = new FormData();
    formData.append("projectId", result.project_id);
    formData.append("judgeId", judgeId!);
    formData.append("noveltyAndUniquenessMark", result.ratings[questions[0]]);
    formData.append("benefitToMankindMark", result.ratings[questions[1]]);
    formData.append("commercializationMark", result.ratings[questions[2]]);
    formData.append("statusOfInventionMark", result.ratings[questions[3]]);
    formData.append("videoPresentationMark", result.ratings[questions[4]]);
    formData.append("supportingDocumentMark", result.ratings[questions[5]]);
    formData.append("platinumAward", platinumAward);
    formData.append("sustainabilityAward", sustainabilityAward);
    formData.append("innovatexAward", innovatexAward);
    formData.append("comments", result.jury_comments);

    try {
      const res = await fetch(`/api/mark-project/${projectId}`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        isMarkProjectSuccess = true;
      }
    } catch (error: any) {
      console.error(error);
    } finally {
      if (isMarkProjectSuccess) router.push("/judge");
    }
  };

  const handleReviewRubrics = () => {
    const rubricUrl = "/rubrics.pdf";
    window.open(rubricUrl, "_blank");
  };

  return (
    <Card className="w-full max-w-2xl mx-auto p-4 border-none h-[100vh] overflow-y-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Project Evaluation Form
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {questions.map((question, index) => (
          <div key={index} className="space-y-2">
            <Label className="text-lg font-semibold">{question}</Label>
            <RadioGroup
              onValueChange={(value) =>
                setRatings((prev) => ({ ...prev, [question]: value }))
              }
              className="flex justify-between"
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <div key={value} className="flex flex-col items-center">
                  <RadioGroupItem
                    value={value.toString()}
                    id={`${question}-${value}`}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={`${question}-${value}`}
                    className="p-2 rounded-full w-10 h-10 flex items-center justify-center text-sm font-medium ring-2 ring-transparent peer-data-[state=checked]:ring-primary peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground transition-all hover:bg-muted"
                  >
                    {value}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        ))}
        <div>
          <Label className="text-lg font-semibold">
            Does this project eligible for Platinum Award?
          </Label>
          <RadioGroup
            onValueChange={(value) => setPlatinumAward(value)}
            className="flex justify-start gap-x-5"
          >
            {["Yes", "No"].map((value) => (
              <div key={value} className="flex flex-col items-center">
                <RadioGroupItem
                  value={value}
                  id={`platinum-award-${value}`}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={`platinum-award-${value}`}
                  className="p-2 rounded-full w-10 h-10 flex items-center justify-center text-sm font-medium ring-2 ring-transparent peer-data-[state=checked]:ring-primary peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground transition-all hover:bg-muted"
                >
                  {value}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div>
          <Label className="text-lg font-semibold">
            Does this project eligible for Sustainability Award?
          </Label>
          <RadioGroup
            onValueChange={(value) => setSustainabilityAward(value)}
            className="flex justify-start gap-x-5"
          >
            {["Yes", "No"].map((value) => (
              <div key={value} className="flex flex-col items-center">
                <RadioGroupItem
                  value={value}
                  id={`sustainability-award-${value}`}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={`sustainability-award-${value}`}
                  className="p-2 rounded-full w-10 h-10 flex items-center justify-center text-sm font-medium ring-2 ring-transparent peer-data-[state=checked]:ring-primary peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground transition-all hover:bg-muted"
                >
                  {value}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div>
          <Label className="text-lg font-semibold">
            Does this project eligible for Innovatex Award?
          </Label>
          <RadioGroup
            onValueChange={(value) => setInnovatexAward(value)}
            className="flex justify-start gap-x-5"
          >
            {["Yes", "No"].map((value) => (
              <div key={value} className="flex flex-col items-center">
                <RadioGroupItem
                  value={value}
                  id={`innovatex-award-${value}`}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={`innovatex-award-${value}`}
                  className="p-2 rounded-full w-10 h-10 flex items-center justify-center text-sm font-medium ring-2 ring-transparent peer-data-[state=checked]:ring-primary peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground transition-all hover:bg-muted"
                >
                  {value}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div className="space-y-2">
          <Label className="text-lg font-semibold">
            JURY COMMENTS (IF ANY)
          </Label>
          <textarea
            className="w-full p-3 border rounded-md"
            rows={5}
            placeholder="Enter your comments here..."
            value={juryComments}
            onChange={(e) => setJuryComments(e.target.value)}
          />
        </div>
        {error && <p className="text-red-600 font-medium">{error}</p>}
        {accummulatedScore !== null && (
          <p className="text-green-600 font-medium">
            Average Score: {accummulatedScore.toFixed(2)}
          </p>
        )}
      </CardContent>
      <CardFooter className="flex justify-between p-4">
        <Button variant="outline" onClick={handleReviewRubrics}>
          <FileText className="mr-2 h-4 w-4" />
          Review Rubrics
        </Button>
        {/* <Button onClick={handleSubmit}>Submit Evaluation</Button> */}
        <Dialog>
          <DialogTrigger className="bg-primary text-white p-2 px-3 rounded-md">
            Submit marks
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Submit Mark</DialogTitle>
              <DialogDescription>
                Are you absolutely sure to submit the mark? <br />
                <span className="text-red-500 font-semibold">
                  Submitted mark may cannot be changed after submission.
                </span>
              </DialogDescription>
            </DialogHeader>
            <h3 className="font-semibold">Summary</h3>
            <div className="flex justify-between">
              <p>Novelty & Uniqueness</p>
              <p className="font-semibold">{ratings[questions[0]]}</p>
            </div>
            <div className="flex justify-between">
              <p>Benefit to Mankind</p>
              <p className="font-semibold">{ratings[questions[1]]}</p>
            </div>
            <div className="flex justify-between">
              <p>Commercialization</p>
              <p className="font-semibold">{ratings[questions[2]]}</p>
            </div>
            <div className="flex justify-between">
              <p>Status of Invention / Innovation / Design</p>
              <p className="font-semibold">{ratings[questions[3]]}</p>
            </div>
            <div className="flex justify-between">
              <p>Video Presentation</p>
              <p className="font-semibold">{ratings[questions[4]]}</p>
            </div>
            <div className="flex justify-between">
              <p>Supporting Documents</p>
              <p className="font-semibold">{ratings[questions[5]]}</p>
            </div>
            <div className="flex justify-between">
              <p>Eligibility for Platinum Award</p>
              <p className="font-semibold">{platinumAward}</p>
            </div>
            <div className="flex justify-between">
              <p>Eligibility for Sustainability Award</p>
              <p className="font-semibold">{sustainabilityAward}</p>
            </div>
            <div className="flex justify-between">
              <p>Eligibility for Innovatex Award</p>
              <p className="font-semibold">{innovatexAward}</p>
            </div>
            <Button className="mt-5" onClick={handleSubmit}>
              Submit mark
            </Button>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
