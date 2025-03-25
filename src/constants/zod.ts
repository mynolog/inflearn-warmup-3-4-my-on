export const SIGNUP_MESSAGE = {
  EMAIL: '이메일 형식이 올바르지 않습니다.',
  PASSWORD: '비밀번호는 최소 6자 이상이어야 합니다.',
  NICKNAME: {
    MIN_LENGTH: '닉네임은 최소 2자 이상이어야 합니다.',
    MAX_LENGTH: '닉네임은 최대 20자까지 가능합니다.',
    REGEX: '닉네임은 영문 또는 숫자만 허용됩니다.',
  },
  PASSWORD_CONFIRM: '비밀번호가 일치하지 않습니다.',
}

export const LOGIN_MESSAGE = {
  EMAIL: '이메일 형식이 올바르지 않습니다.',
  PASSWORD: '비밀번호를 입력해주세요.',
} as const
