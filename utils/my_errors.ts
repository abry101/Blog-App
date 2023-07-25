import { CustomError } from "@/types";

export const ERROR_VERIFICATION_TIMEOUT = new CustomError(
  "Verification Time out, pls try again!",
  "Verification Failed"
);
export const ERROR_ALREADY_VERIFIED = new CustomError(
  "You are already verified, to proceed please refresh the page!",
  "Already Verified"
);
