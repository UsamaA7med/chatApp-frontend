import {z} from "zod"

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

export const signupSchema = z.object({
  fullname: z.string().min(3, { message: "Fullname must be at least 3 characters long" }),
  email: z.string().email(),
  password: z.string().min(6)
})

export type TSignupForm = z.infer<typeof signupSchema>
export type TLoginForm = z.infer<typeof loginSchema>
