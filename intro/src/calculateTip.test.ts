import { calculateTip, dollarAmount, billInputCheck, percentageInputCheck } from './calculateTip';

describe('calculateTip', () => {
  test('calculates tip correctly for standard values', () => {
    expect(calculateTip(100, 15)).toBe(15);
    expect(calculateTip(50, 20)).toBe(10);
    expect(calculateTip(213, 12.5)).toBe(26.625);
  });

  test('handles zero values', () => {
    expect(calculateTip(0, 15)).toBe(0);
    expect(calculateTip(100, 0)).toBe(0);
  });

  test('handles decimal percentages', () => {
    expect(calculateTip(100, 15.5)).toBe(15.5);
    expect(calculateTip(33.33, 18)).toBe(5.9994);
  });
});

describe('dollarAmount', () => {
  test('formats with fixed decimals when fixed is true', () => {
    expect(dollarAmount(15, true)).toBe('$15.00');
    expect(dollarAmount(15.5, true)).toBe('$15.50');
    expect(dollarAmount(15.555, true)).toBe('$15.56');
  });

  test('formats with minimum two decimals when fixed is false', () => {
    expect(dollarAmount(15, false)).toBe('$15');
    expect(dollarAmount(15.5, false)).toBe('$15.50');
    expect(dollarAmount(15.55, false)).toBe('$15.55');
  });
});

describe('billInputCheck', () => {
  test('returns true for valid positive bill amounts', () => {
    expect(billInputCheck('100')).toBe(true);
    expect(billInputCheck('15.50')).toBe(true);
    expect(billInputCheck('0.01')).toBe(true);
  });

  test('returns false for invalid or zero/negative bill amounts', () => {
    expect(billInputCheck('0')).toBe(false);
    expect(billInputCheck('-5')).toBe(false);
    expect(billInputCheck('abc')).toBe(false);
    expect(billInputCheck('')).toBe(false);
  });
});

describe('percentageInputCheck', () => {
  test('returns true for valid non-negative percentages', () => {
    expect(percentageInputCheck('15')).toBe(true);
    expect(percentageInputCheck('0')).toBe(true);
    expect(percentageInputCheck('25.5')).toBe(true);
  });

  test('returns false for negative percentages or invalid input', () => {
    expect(percentageInputCheck('-5')).toBe(false);
    expect(percentageInputCheck('abc')).toBe(false);
    expect(percentageInputCheck('')).toBe(false);
  });
});
