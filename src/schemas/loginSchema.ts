import { z } from 'zod'
import { LOGIN_MESSAGE } from '@/constants/zod'

export const loginSchema = z.object({
  email: z.string().email({ message: LOGIN_MESSAGE.EMAIL }),
  password: z.string().min(1, { message: LOGIN_MESSAGE.PASSWORD }),
})

export type LoginFormData = z.infer<typeof loginSchema>
