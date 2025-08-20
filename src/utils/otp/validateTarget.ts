import { BadRequestError } from "../../constants/constants/customErrors";

export function validateTarget(target: string): "email" | "phone" {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Phone: only digits, 7–15 length
  const phoneRegex = /^\d{7,15}$/;  

  if (emailRegex.test(target)) return "email";
  if (phoneRegex.test(target)) return "phone";

  throw new BadRequestError("Target must be a valid email or phone number");
}
