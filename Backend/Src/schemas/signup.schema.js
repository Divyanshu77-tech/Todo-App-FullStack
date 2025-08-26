import * as z from "zod";

const signupSchema = z.object({
  name: z
    .string()
    .trim()
    .transform((val) => {
      let cleaned = val.replace(/\s+/g, "");
      cleaned = cleaned.replace(/[^A-Za-z]/g, "");
      return cleaned;
    })
    .refine((val) => val.length >= 3, {
      message: "Name must contain at least 3 characters",
    })
    .refine((val) => val.length <= 50, {
      message: "Name must not exceed 50 characters",
    })
    .refine((val) => /^[A-Za-z]+$/.test(val), {
      message: "Name must only contain letters",
    }),
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
      {
        message: "Email username must not exceed 30 characters before @",
      }
    )
    .refine(
      (val) => {
        const [, domain] = val.split("@");
        return /^[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(domain);
      },
      {
        message: "Please enter a valid domain (e.g. gmail.com)",
      }
    )
    .refine(
      (val) => {
        const [, domain] = val.split("@");
        return domain.length >= 3 && domain.length <= 63;
      },
      {
        message: "Domain must be between 3 and 63 characters long",
      }
    ),
  password: z
    .string()
    .trim()
    .min(8, { message: "Password must contain at least 8 characters" })
    .max(18, { message: "Password must not exceed 18 characters" })
    .regex(/[~!@#$%^&*()_+\-=\[\]{}|;:'",.<>/?]/, {
      message: "Password must contain at least one special character",
    })
    .refine((val) => !/\s/.test(val), {
      message: "Password must not contain spaces",
    }),
});

export default signupSchema;
