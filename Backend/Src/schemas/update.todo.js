import * as z from "zod";

const updateTodoSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(10, { message: "Todo title must contain 10 chracters" })
      .max(25, { message: "Todo title must not exceed 25 chracters" })
      .optional(),
    description: z
      .string()
      .trim()
      .max(150, { message: "Todo description must not exceed 150 characters" })
      .optional(),
  })
  .refine(
    (data) => data.title !== undefined || data.description !== undefined,
    { message: "At least one field (title or description) must be provided" }
  );

export default updateTodoSchema;
