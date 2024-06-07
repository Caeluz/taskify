// TypeScript type definition for truncateText function
// Truncate text to a certain number of words
// truncateText(text: string, maxWords: number): string

interface TruncateText {
  (text: string, maxWords: number): string;
}

const truncateText: TruncateText = (text, maxWords) => {
  const wordsArray = text.split(" ");
  if (wordsArray.length > maxWords) {
    return wordsArray.slice(0, maxWords).join(" ") + "...";
  }
  return text;
};

export { truncateText };
