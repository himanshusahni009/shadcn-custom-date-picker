import { type ClassValue, clsx as cl } from "clsx";
import { twMerge as twM } from "tailwind-merge";

// Helper Function for Tailwind Merge and ClassNames
export function cn(...inputs: ClassValue[]) {
  return twM(cl(inputs));
}
