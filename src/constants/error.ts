export const ERROR_RESPONSE = {
  // 공통 에러
  BAD_REQUEST: { status: 400, message: '잘못된 요청' },
  UNAUTHORIZED: { status: 401, message: '인증되지 않음. 로그인 필요' },
  FORBIDDEN: { status: 403, message: '접근 불가. 권한 없음' },
  NOT_FOUND: { status: 404, message: '요청한 정보를 찾을 수 없음' },
  SERVER_ERROR: { status: 500, message: '서버 오류. 다시 시도하세요.' },
  DB_ERROR: { status: 500, message: 'DB 조회 오류' },
} as const

export const CONFIG_ERROR = {
  MISSING_BASE_URL: { status: 500, message: '환경 변수 설정 오류: BASE_URL 없음' },
} as const

// export const CLIENT_ERROR = {}
