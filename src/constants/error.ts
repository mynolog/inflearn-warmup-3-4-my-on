export const ERROR_RESPONSE = {
  // 공통 에러
  BAD_REQUEST: { status: 400, message: '잘못된 요청입니다.' },
  UNAUTHORIZED: { status: 401, message: '인증되지 않았습니다.' },
  FORBIDDEN: { status: 403, message: '접근 권한이 없습니다.' },
  NOT_FOUND: { status: 404, message: '요청한 정보를 찾을 수 없습니다.' },
  SERVER_ERROR: { status: 500, message: '서버 오류가 발생했습니다. 다시 시도하세요.' },
  DB_ERROR: { status: 500, message: 'DB 조회 오류가 발생했습니다. 다시 시도해주세요.' },

  // 유저 회원가입 중복 에러
  EMAIL_TAKEN: { status: 409, message: '이미 사용 중인 이메일입니다.' },
  NICKNAME_TAKEN: { status: 409, message: '이미 사용 중인 닉네임입니다.' },

  // 유저 조회 에러
  USER_NOT_FOUND: { status: 404, message: '유저를 찾을 수 없습니다.' },
} as const

export const CONFIG_ERROR = {
  MISSING_BASE_URL: { status: 500, message: '환경 변수 설정 오류: BASE_URL이 없습니다.' },
} as const
