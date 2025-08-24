import * as z from "zod";

const signinSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email" })
    .refine(
      (val) => {
        const [username] = val.split("@");
        return username.length >= 3;
      },
      {
        message: "Email username must contain at least 3 characters before @",
      }
    )
    .refine(
      (val) => {
        const [username] = val.split("@");
        return username.length < 30;
      },
      { message: "Email username must not exceed 30 characters before @" }
    ),
  password: z
    .string()
    .trim()
    .min(8, { message: "Password must contain 8 characters" })
    .max(18, { message: "Password must not exceed 18 characters" })
    .regex(/[~!@#$%^&*()_+\-=\[\]{}|;:'",.<>/?]/, {
      message: "Password must contain at least one special character",
    }),
});

export default signinSchema;