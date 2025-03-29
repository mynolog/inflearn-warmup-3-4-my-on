export const TOAST_MESSAGE = {
  AUTH: {
    SIGNUP_SUCCESS: '이메일 인증 링크가 발송되었습니다.',
    LOGIN_SUCCESS: '로그인에 성공했습니다.',
    SIGNOUT_SUCCESS: '로그아웃되었습니다.',

    SIGNUP_FAILED: '회원가입에 실패했습니다. 잠시 후 다시 시도해주세요.',
    LOGIN_FAILED: '이메일 또는 비밀번호가 일치하지 않습니다.',
    SIGNOUT_FAILED: '로그아웃 실패했습니다. 잠시 후 다시 시도해주세요.',
    KAKAO_FAILED: '카카오로 시작하기 도중 오류가 발생했습니다.',
    EMAIL_VERIFY_FAILED: '이메일 인증 도중 오류가 발생했습니다.',

    EMAIL_NOT_VERIFIED: '이메일 인증이 필요합니다.',
    SIGNUP_EMAIL_SENT: '이메일 인증 링크가 발송되었습니다.',
    EMAIL_CHECK_REQUIRED: '이메일 중복 확인이 필요합니다.',

    SIGNOUT_PENDING: '로그아웃 중입니다..',
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
    ROOM_FORBIDDEN: '이 방에 접근할 수 없습니다.',
    ROOM_ACCESS_DENINED: '이 방에서 메시지를 전송할 수 없습니다.',
    EMPTY_TEXT_SEND: '메시지를 입력해 주세요.',
  },
  SYSTEM: {
    UNKNWON_ERROR: '알 수 없는 오류가 발생했습니다.',
    TOO_MANY_REQUEST: '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.',
    SERVICE_NOT_AVAILABLE: '준비중인 기능입니다.',
    USER_INIT_FAILED: '사용자 정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.',
    UNAUTHORIZED: '인증되지 않은 사용자입니다. 새로고침 또는 다시 로그인 해주세요.',
  },
} as const
