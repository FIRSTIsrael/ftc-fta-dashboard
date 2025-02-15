export const durationFormat = (
  ms: number,
  options: {
    long?: boolean;
  } = { long: false }
): string => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  if (options.long) {
    if (minutes === 0) {
      return `${seconds}s`;
    } else {
      return `${minutes}m ${seconds}s`;
    }
  } else {
    return `${minutes}m`;
  }
};
