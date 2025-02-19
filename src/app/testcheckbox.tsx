"use client";

import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

export function TestCheckbox() {
  // Local state to control the checkbox value.
  const [checked, setChecked] = useState(false);

  return (
    <div className="p-4">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="test-checkbox"
          checked={checked}
          onCheckedChange={(value) => setChecked(value as boolean)}
        />
        <label htmlFor="test-checkbox" className="text-sm font-medium">
          Accept terms and conditions
        </label>
      </div>
      <p className="mt-4">
        The checkbox is {checked ? "checked" : "not checked"}.
      </p>
    </div>
  );
}
