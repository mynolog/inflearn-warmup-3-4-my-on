import { CONFIG_ERROR } from '@/constants/error'
import ky from 'ky'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

if (!baseUrl) {
  throw new Error(CONFIG_ERROR.MISSING_BASE_URL.message)
}

export const kyInstance = ky.create({
  prefixUrl: baseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})
