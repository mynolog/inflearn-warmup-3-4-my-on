import { z } from 'zod'

export const signupSchema = z
  .object({
    email: z.string().email({ message: '이메일 형식이 올바르지 않습니다.' }),
    password: z.string().min(6, { message: '비밀번호는 최소 6자 이상이어야 합니다.' }),
    passwordConfirm: z.string(),
    nickname: z.string().min(2, { message: '닉네임은 최소 2자 이상이어야 합니다.' }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: '비밀번호가 일치하지 않습니다.',
  })

export type SignupFormData = z.infer<typeof signupSchema>
