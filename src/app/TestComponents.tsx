import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio";
import { Switch } from "@/components/ui/switch";

export default function TestComponents() {
  // Checkbox state
  const [checkboxChecked, setCheckboxChecked] = useState(false);

  // Radio group state
  const [radioValue, setRadioValue] = useState("option1");

  // Switch states: one basic and one with text label
  const [switchValue, setSwitchValue] = useState(false);
  const [switchWithTextValue, setSwitchWithTextValue] = useState(false);

  return (
    <div className="p-6 space-y-8">
      {/* Checkbox Variants */}
      <section className="border p-4">
        <h2 className="text-2xl font-bold mb-4">Checkbox Variants</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={checkboxChecked}
              onCheckedChange={(checked: boolean | "indeterminate") =>
                setCheckboxChecked(checked === true)
              }
              aria-label="Controlled Checkbox"
            />

            <span>
              Controlled Checkbox (checked: {checkboxChecked ? "Yes" : "No"})
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox disabled defaultChecked aria-label="Disabled Checkbox" />
            <span>Disabled Checkbox (checked)</span>
          </div>
        </div>
      </section>

      {/* Radio Group Variants */}
      <section className="border p-4">
        <h2 className="text-2xl font-bold mb-4">Radio Group Variants</h2>
        <RadioGroup
          value={radioValue}
          onValueChange={setRadioValue}
          className="flex space-x-6"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option1" id="radio-option1" />
            <label htmlFor="radio-option1">Option 1</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option2" id="radio-option2" />
            <label htmlFor="radio-option2">Option 2</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option3" id="radio-option3" disabled />
            <label htmlFor="radio-option3">Option 3 (Disabled)</label>
          </div>
        </RadioGroup>
        <p className="mt-2">Selected: {radioValue}</p>
      </section>

      {/* Switch Variants */}
      <section className="border p-4">
        <h2 className="text-2xl font-bold mb-4">Switch Variants</h2>
        <div className="space-y-6">
          {/* Basic switch without text */}
          <div>
            <h3 className="text-lg font-semibold">Basic Switch (No Text)</h3>
            <Switch
              checked={switchValue}
              onCheckedChange={setSwitchValue}
              aria-label="Basic Switch"
            />
            <p className="mt-1">State: {switchValue ? "On" : "Off"}</p>
          </div>

          {/* Switch with text label */}
          <div>
            <h3 className="text-lg font-semibold">Switch with Text</h3>
            <div className="flex items-center space-x-2">
              <Switch
                checked={switchWithTextValue}
                onCheckedChange={setSwitchWithTextValue}
                aria-label="Switch with Text"
              />
              <span>{switchWithTextValue ? "On" : "Off"}</span>
            </div>
          </div>

          {/* Disabled switch */}
          <div>
            <h3 className="text-lg font-semibold">Disabled Switch</h3>
            <Switch disabled defaultChecked aria-label="Disabled Switch" />
          </div>
        </div>
      </section>
    </div>
  );
}
