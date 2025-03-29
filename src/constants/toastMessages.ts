export const TOAST_MESSAGE = {
  AUTH: {
    SIGNUP_SUCCESS: '이메일 인증 링크가 발송되었습니다.',
    LOGIN_SUCCESS: '로그인에 성공했습니다.',

    SIGNUP_FAILED: '회원가입에 실패했습니다. 잠시 후 다시 시도해주세요.',
    LOGIN_FAILED: '이메일 또는 비밀번호가 일치하지 않습니다.',

    EMAIL_NOT_VERIFIED: '이메일 인증이 필요합니다.',
    SIGNUP_EMAIL_SENT: '이메일 인증 링크가 발송되었습니다.',

    UNKNWON_ERROR: '알 수 없는 오류가 발생했습니다.',
  },

  VALID: {
    EMAIL_AVAILABLE: '사용 가능한 이메일입니다.',
    NICKNAME_AVAILABLE: '사용 가능한 닉네임입니다.',

    EMAIL_TAKEN: '이미 사용 중인 이메일입니다.',
    KAKAO_EMAIL_TAKEN: '카카오 계정으로 가입된 이메일입니다.',
  },

  DIRECT_MESSAGE: {
    ROOM_NOT_EXIST: '존재하지 않는 방입니다.',
    ROOM_FETCH_ERROR: '방 정보를 불러오는 데 실패했습니다.',
  },
  SYSTEM: {
    UNKNWON_ERROR: '알 수 없는 오류가 발생했습니다.',
    TOO_MANY_REQUEST: '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.',
  },
} as const
