export const calculateTip = (bill: number, percentage: number): number => (bill * percentage) / 100;

const minimumTwoDecimals = (amount: number): string => {
  const stringAmount = `${amount}`;
  const decimals = stringAmount.match(/\.(?<decimals>[^.]+)$/)?.groups?.decimals;

  return `${stringAmount}${decimals?.length === 1 ? '0' : ''}`;
};

export const dollarAmount = (amount: number, fixed: boolean): string =>
  `$${fixed ? (Math.round(amount * 100) / 100).toFixed(2) : minimumTwoDecimals(amount)}`;

const isNumeric = (amount: string, callback: (n: number) => boolean): boolean => {
  const numericAmount = Number.parseFloat(amount);
  return !isNaN(numericAmount) && callback(numericAmount);
};

export const billInputCheck = (amount: string): boolean => isNumeric(amount, (n) => n > 0);
export const percentageInputCheck = (amount: string): boolean => isNumeric(amount, (n) => n >= 0);
