export const ROUTES = {
  HOME: '/',

  // /auth
  AUTH: '/auth',
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',
} as const

export const API_ENDPOINTS = {
  EMAIL_USER_REGISTER: 'api/user/email/register',
  OAUTH_USER_REGISTER: 'api/user/oauth/register',
  USER_PROFILE: 'api/user/me',
} as const
