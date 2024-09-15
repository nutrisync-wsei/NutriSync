"use client";
import { ChangeEvent, useState } from "react";
import styled from 'styled-components';

import Button from "./ui/components/controls/Button";
import Checkbox from "./ui/components/controls/Checkbox";
import TextField from "./ui/components/controls/TextField";
import Toggle from "./ui/components/controls/Toggle";
import FormField from "./ui/components/FormField";
import InputSlider from "./ui/components/InputSlider";
import TextArea from "./ui/components/TextArea";

export default function Home() {
  const [value, setValue] = useState(50);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(parseInt(event.target.value, 10));
  };

  return (
    <MainContainer>
      <FormField label="Label" placeholder="Placeholder" helper="This is random text" name="TestField" />

      <Section>
        <TextField placeholder="Textfield text" />
        <TextField isValid placeholder="Valid Textfield" />
        <TextField hasError placeholder="Error Textfield" />
        <TextField disabled placeholder="Disabled Textfield" />
        <InputSlider value={value} min={0} max={100} onChange={handleChange} />
      </Section>

      <Section>
        <Button variant="primary">Button</Button>
        <Button variant="secondary">Button</Button>
        <Button variant="tertiary">Button</Button>
        <Button variant="link">Link</Button>
        <Button variant="disabled">Disabled</Button>
      </Section>

      <Section>
        <Toggle />
        <Checkbox />
        <TextArea placeholder="Text area" />
      </Section>
    </MainContainer>
  );
}

const MainContainer = styled.main`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 20px;
  background: #FFFFFF;
`;

const Section = styled.div`
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  display: flex;
  gap: 12px;
`;