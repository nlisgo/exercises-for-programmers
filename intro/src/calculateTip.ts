import { pipe, flow } from 'fp-ts/function';
import * as O from 'fp-ts/Option';

// Extract decimal places from a stringified number
// Returns Some(decimals) if they exist, None otherwise
const getDecimals = flow(
  (amount: string) => amount.match(/\.(?<decimals>[^.]+)$/),
  // Try to match decimal portion using regex, wrap result in Option (null becomes None)
  O.fromNullable,
  // If match exists, extract the decimals group (chain flattens nested Options)
  O.chain((match) => O.fromNullable(match.groups?.decimals)),
);
  

// Format a number to have at least 2 decimal places without rounding
// e.g., 10.1 becomes "10.10", 10 stays "10", 10.12 stays "10.12"
const minimumTwoDecimals = flow(
  (amount:number) => String(amount),
  // Create object with both string and its decimal portion (as Option)
  (str) => ({
    str,
    decimals: getDecimals(str),
  }),
  // Handle the decimal portion
  ({ str, decimals }) => pipe(
    decimals,
    // If decimals exist and only 1 digit, append a 0; otherwise keep original
    O.map(d => d.length === 1 ? `${str}0` : str),
    // If no decimals exist (None), just return the original string
    O.getOrElse(() => str),
  )
);
  

// Round to 2 decimal places and format with exactly 2 digits
// Uses flow to compose functions left-to-right
const roundToTwoDecimals = flow(
  (amount:number) => amount * 100,
  Math.round,
  (n: number) => n / 100,
  (n: number) => n.toFixed(2),
);

// Higher-order function that creates validators with custom predicates
// Returns a curried function that validates string inputs
const validateNumeric = (predicate: (n: number) => boolean) => (amount: string): boolean =>
  pipe(
    amount,
    flow(
      parseFloat,
      (n) => isNaN(n) ? O.none : O.some(n),
    ),
    // Filter the Option - if Some and predicate passes, keeps Some; otherwise becomes None
    O.filter(predicate),
    // Convert Option to boolean: Some -> true, None -> false
    O.isSome,
  );

// Exported functions
export const calculateTip = (bill: number, percentage: number): number => pipe(
  bill * percentage,
  (t) => t / 100,
);

export const dollarAmount = (amount: number, fixed: boolean): string =>
  pipe(
    amount,
    // Choose formatting strategy: round and fix decimals, or just ensure minimum 2 decimals
    fixed ? roundToTwoDecimals : minimumTwoDecimals,
    // Prepend dollar sign to the formatted string
    formatted => `$${formatted}`,
  );

// Validate bill input (must be greater than 0)
export const billInputCheck = validateNumeric((n) => n > 0);
// Validate percentage input (must be non-negative)
export const percentageInputCheck = validateNumeric((n) => n >= 0);
