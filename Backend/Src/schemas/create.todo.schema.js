import * as z from "zod";

const createTodoSchema = z.object({
  title: z
    .string()
    .min(10, { message: "Todo title must contain 10 chracters" })
    .max(25, { message: "Todo title must not exceed 25 chracters" }),
  description: z
    .string()
    .max(150, { message: "Todo description must not exceed 150 characters" }),
});

export default createTodoSchema;