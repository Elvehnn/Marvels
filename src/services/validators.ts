export const isFieldEmpty = (value: string): boolean => {
  return /^\s*$/.test(value);
};
