import type { FormEvent, ReactNode } from 'react';

interface PromptFormProps {
  children: ReactNode;
  onSubmit: () => void | Promise<void>;
  isPending?: boolean;
}

export function PromptForm({ children, onSubmit, isPending }: PromptFormProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void onSubmit();
  };

  return (
    <form className="prompt-form" onSubmit={handleSubmit} aria-busy={isPending}>
      <div className="prompt-form-body">{children}</div>
      <div className="prompt-form-actions">
        <button type="submit" disabled={isPending}>
          {isPending ? 'Sending…' : 'Send'}
        </button>
      </div>
    </form>
  );
}
