"use client";
import { useState } from "react";
import Button from "./ui/components/controls/Button";
import Checkbox from "./ui/components/controls/Checkbox";
import TextField from "./ui/components/controls/TextField";
import Toggle from "./ui/components/controls/Toggle";
import FormField from "./ui/components/FormField";
import InputSlider from "./ui/components/InputSlider";

export default function Home() {
  const [value, setValue] = useState(50);

  return (
    <div>
      <main style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#FFFFFF' }}>
        {/* <FormField label="Label" placeholder="Placeholder" helper="This is random text" /> */}

        <TextField placeholder="Textfield text" />
        <Button variant="primary">BUTTON</Button>
        <Button variant="secondary">BUTTON</Button>
        <Button variant="tertiary">BUTTON</Button>
        <Button variant="link">BUTTON</Button>
        <Button variant="disabled">BUTTON</Button>
        <Toggle />
        <Checkbox />
        <InputSlider value={value} min={0} max={100} onChange={setValue} />
      </main>
    </div>
  );
}