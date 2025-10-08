import type { ChatRequest } from '../types';

export function buildContextSummary(request: ChatRequest): string {
  const dependencyList = request.projectSummary.dependencies.length
    ? request.projectSummary.dependencies.join(', ')
    : 'No dependencies installed yet.';

  const fileSummary = request.projectSummary.files
    .slice(0, 20)
    .map((file) => {
      const preview = file.preview.replace(/```/g, '');
      return `• ${file.path} (${file.size} chars)\n${preview}`;
    })
    .join('\n\n');

  return `Current dependencies: ${dependencyList}\n\nImportant files:\n${fileSummary || 'No project files yet.'}`;
}
