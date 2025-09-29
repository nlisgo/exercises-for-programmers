#!/usr/bin/env node

import figlet from 'figlet';
import { billInputCheck, calculateTip, dollarAmount, percentageInputCheck } from './calculateTip';
import { Command } from 'commander';
import inquirer from 'inquirer';

console.log(figlet.textSync('Tip Calculator'));

new Command()
  .description('Calculate tip from total and percentage')
  .option('-b, --bill <total>')
  .option('-p, --percentage <percentage>')
  .action(async (options) => {
    const { bill: optionBill, percentage: optionPercentage } = options;
    const bill = Number.parseFloat(
      billInputCheck(optionBill)
        ? optionBill
        : await inquirer
            .prompt([
              {
                type: 'input',
                name: 'bill',
                message: 'Enter the bill amount:',
                validate: (bill) => billInputCheck(bill),
              },
            ])
            .then(({ bill }) => bill)
    );
    const percentage = Number.parseFloat(
      percentageInputCheck(optionPercentage)
        ? optionPercentage
        : await inquirer
            .prompt([
              {
                type: 'input',
                name: 'percentage',
                message: 'Enter the percentage:',
                default: '15',
                validate: (percentage) => percentageInputCheck(percentage),
              },
            ])
            .then(({ percentage }) => percentage)
    );

    const tip = calculateTip(bill, percentage);
    const total = bill + tip;

    console.log(`bill: ${dollarAmount(bill, true)}, tip percentage ${percentage}%`);
    console.log(`tip: ${dollarAmount(tip, false)}, total: ${dollarAmount(total, true)}`);
  })
  .parse();
