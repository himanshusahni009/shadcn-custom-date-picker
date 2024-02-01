import { format } from "date-fns";

/* Date Format Base Units */
const dateFormatUnits: any = {
  defaultUnit: "dd-MM-yyyy",
  defaultView: "dd-MMM-yyyy",
  longLocalizedDate: "PPP",
};

/* Function to get Nth Date form Today Date */
export function getNthDateFromToday(n: number, formatDateUnit: string = "") {
  /* Logic to get Nth Date from Today Date */
  const today = new Date();
  const nthDate = new Date(today);

  nthDate.setDate(today.getDate() + n);

  /* Return Nth Date in Required Format */
  return formatDateUnit
    ? format(nthDate, dateFormatUnits[formatDateUnit])
    : nthDate;
}

// console.log(getNthDateFromToday(5));
// Wed Feb 07 2024 01:11:09 GMT+0530

// console.log(getNthDateFromToday(10, "defaultView"));
// 12-Feb-2024

// console.log(getNthDateFromToday(-5, "longLocalizedDate"));
// January 27th, 2024
