const suggestions = [
  "Review today's goals",
  "Plan tomorrow's tasks",
  "Clean workspace",
  "Check important emails",
  "Go for a 30 min workout",
  "Read 10 pages of a book",
  "Update project progress",
  "Practice coding problems",
];

export function getAISuggestion() {
  const random =
    suggestions[Math.floor(Math.random() * suggestions.length)];
  return random;
}