export const ROUTES = {
  HOME: '/',

  // /auth
  AUTH: '/auth',
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',

  // /direct-message
  DIRECT_MESSAGE: '/direct-message',
} as const

export const API_ENDPOINTS = {
  EMAIL_USER_REGISTER: 'api/user/email/register',
  OAUTH_USER_REGISTER: 'api/user/oauth/register',
  USER_PROFILE: 'api/user/me',
  USERS: 'api/users',

  ROOMS: 'api/rooms',
  MESSAGES: 'api/messages',
  MESSAGE: 'api/message',
} as const

export const EXACT_SAFE_PATHS = ['/', '/auth', '/auth/login', '/auth/signup', '/direct-message']
