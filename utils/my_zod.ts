import * as z from "zod";
import { r_fullname, r_password } from "./my-regex";

export const z_name = z
  .string()
  .nonempty("Name is required")
  .min(3, "Name must be at least 3 characters")
  .max(25, "Name must be less than 50 characters");
export const z_fullName = z
  .string()
  .nonempty("Full Name is required")
  .regex(r_fullname, "Your Full Name is not valid")
  .min(5, "Full Name must be at least 3 letters")
  .max(50, "Full Name must be less than 50 characters");
export const z_email = z
  .string()
  .nonempty("Email Address is required")
  .email("Your Email Address is not valid")
  .min(5, "Email Address must be at least 3 letters")
  .max(50, "Email Address must be less than 50 characters");
export const z_password = z
  .string()
  .nonempty("Password is required")
  .regex(r_password, "Your Password is invalid");

export const z_bool = z.boolean({
  required_error: "",
});
export const z_passwordWithStrength = z
  .string()
  .nonempty("Password is required")
  .refine((value) => {
    // Minimum length requirement
    if (value.length < 8) {
      return "Password must be at least 8 characters";
    }

    // Additional criteria for password strength
    // Customize these conditions based on your own requirements
    const hasLowerCase = /[a-z]/.test(value);
    const hasUpperCase = /[A-Z]/.test(value);
    const hasDigit = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*]/.test(value);

    // Password strength classification
    if (hasLowerCase && hasUpperCase && hasDigit && hasSpecialChar) {
      return true;
    } else if ((hasLowerCase || hasUpperCase) && (hasDigit || hasSpecialChar)) {
      return true;
    } else {
      return "Password must not be easy";
    }
  });
