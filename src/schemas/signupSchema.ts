import { z } from 'zod'
import { SIGNUP_MESSAGE } from '@/constants/zod'

export const signupSchema = z
  .object({
    email: z.string().email({ message: SIGNUP_MESSAGE.EMAIL }),
    password: z.string().min(6, { message: SIGNUP_MESSAGE.PASSWORD }),
    passwordConfirm: z.string(),
    nickname: z
      .string()
      .min(2, { message: SIGNUP_MESSAGE.NICKNAME.MIN_LENGTH })
      .max(20, { message: SIGNUP_MESSAGE.NICKNAME.MAX_LENGTH })
      .regex(/^[가-힣a-zA-Z0-9]+$/, { message: SIGNUP_MESSAGE.NICKNAME.REGEX }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: SIGNUP_MESSAGE.PASSWORD_CONFIRM,
  })

export type SignupFormData = z.infer<typeof signupSchema>
