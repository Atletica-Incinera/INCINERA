"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function RadioGroupShowcase() {
  return (
    <div className="space-y-16 pb-20">
      <div>
        <h1 className="text-4xl font-black mb-4 tracking-tight">Radio Group</h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          A set of checkable buttons—known as radio buttons—where no more than
          one button can be checked at a time.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b pb-2">Basic Usage</h2>
        <div className="bg-card p-8 rounded-xl border max-w-md">
          <RadioGroup defaultValue="aluno">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="aluno" id="aluno" />
              <Label htmlFor="aluno">Aluno Graduação</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="pos" id="pos" />
              <Label htmlFor="pos">Pós-Graduação</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="alumni" id="alumni" />
              <Label htmlFor="alumni">Alumni / Professor</Label>
            </div>
          </RadioGroup>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b pb-2">Code</h2>
        <div className="bg-muted p-6 rounded-lg font-mono text-sm overflow-x-auto">
          <pre>{`import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

<RadioGroup defaultValue="option-one">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option-one" id="option-one" />
    <Label htmlFor="option-one">Option One</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option-two" id="option-two" />
    <Label htmlFor="option-two">Option Two</Label>
  </div>
</RadioGroup>`}</pre>
        </div>
      </section>
    </div>
  );
}
