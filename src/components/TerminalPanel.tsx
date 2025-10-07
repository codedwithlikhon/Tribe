import { useEffect, useRef } from 'react';

interface TerminalPanelProps {
  output: string;
}

export function TerminalPanel({ output }: TerminalPanelProps) {
  const outputRef = useRef<HTMLDivElement>(null);
  const shouldAutoScrollRef = useRef(true);

  useEffect(() => {
    const container = outputRef.current;
    if (!container) {
      return;
    }

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);

      // Allow a small threshold so tiny scroll differences don't disable auto-scroll.
      shouldAutoScrollRef.current = distanceFromBottom <= 16;
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const container = outputRef.current;
    if (!container || !shouldAutoScrollRef.current) {
      return;
    }

    const animationFrame = requestAnimationFrame(() => {
      container.scrollTop = container.scrollHeight;
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [output]);

  return (
    <div className="panel">
      <h3>Terminal</h3>
      <div
        aria-live="polite"
        role="log"
        className="terminal-output"
        ref={outputRef}
      >
        {output ? <pre>{output}</pre> : 'Terminal output will appear here.'}
      </div>
    </div>
  );
}
