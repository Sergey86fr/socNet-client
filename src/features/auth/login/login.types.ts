import { z } from "zod"

export const loginSchema = z.object({
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export type LoginFormData = z.infer<typeof loginSchema>