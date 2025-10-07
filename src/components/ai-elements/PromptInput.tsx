import type { ChangeEvent } from 'react';

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function PromptInput({ value, onChange, placeholder, disabled }: PromptInputProps) {
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  return (
    <textarea
      className="prompt-input"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      disabled={disabled}
      rows={4}
      spellCheck={false}
    />
  );
}
