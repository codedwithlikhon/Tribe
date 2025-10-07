const INTERNAL_FRAME_PATTERNS = [/node_modules\//, /\(internal\//, /\bwebcontainer\b/i];

function formatErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return typeof error === 'string' ? error : JSON.stringify(error);
}

export function cleanStackTrace(error: unknown): string {
  if (!(error instanceof Error) || !error.stack) {
    return formatErrorMessage(error);
  }

  const [messageLine, ...stackLines] = error.stack.split('\n');
  const filteredStack = stackLines.filter((line) => !INTERNAL_FRAME_PATTERNS.some((pattern) => pattern.test(line)));

  if (!filteredStack.length) {
    return messageLine ?? formatErrorMessage(error);
  }

  return [messageLine, ...filteredStack].join('\n');
}
