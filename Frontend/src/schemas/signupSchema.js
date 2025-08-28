import * as z from "zod";

const signupSchema = z.object({
  name: z
  .string()
  .trim()
  .min(3, { message: "Name must contain at least 3 characters" })
  .max(50, { message: "Name must not exceed 50 characters" })
  .regex(/^[A-Za-z]+$/, {
    message: "Name must only contain letters and no spaces",
  }),
  email: z
  .string()
  .trim()
  .email({ message: "Please enter a valid email" })
  .min(6, { message: "Email is too short" })
  .max(254, { message: "Email is too long" }),
  password: z
  .string()
  .trim()
  .min(8, { message: "Password must contain at least 8 characters" })
  .max(18, { message: "Password must not exceed 18 characters" })
  .regex(/^\S+$/, { message: "Password must not contain spaces" })
  .regex(/[~!@#$%^&*()_+\-=\[\]{}|;:'",.<>/?]/, {
    message: "Password must contain at least one special character",
  }),
});

export default signupSchema;
