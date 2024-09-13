"use client";
import TextField from "./ui/components/controls/TextField";
import FormField from "./ui/components/FormField";

export default function Home() {
  return (
    <div>
      <main style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#FFFFFF' }}>
        <TextField placeholder="Textfield text" />
        <FormField label="Label" placeholder="Placeholder" helper="This is random text" />
      </main>
    </div>
  );
}