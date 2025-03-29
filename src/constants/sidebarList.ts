import { ROUTES } from './routes'

interface SidebarItem {
  id: number
  label: string
  href: string
  iconClass: {
    default: string
    active: string
  }
  isAvailable: boolean
  group: 'primary' | 'secondary'
}

export const SIDEBAR_LIST: SidebarItem[] = [
  {
    id: 1000,
    label: '홈',
    href: ROUTES.HOME,
    iconClass: {
      default: 'fa-solid fa-house',
      active: 'fa-solid fa-house',
    },
    group: 'primary',
    isAvailable: true,
  },
  {
    id: 2000,
    label: '검색',
    href: ROUTES.SEARCH,
    iconClass: {
      default: 'fa-solid fa-magnifying-glass',
      active: 'fa-solid fa-magnifying-glass',
    },
    group: 'secondary',
    isAvailable: false,
  },
  {
    id: 3000,
    label: '알림',
    href: ROUTES.NOTIFICATION,
    iconClass: {
      default: 'fa-regular fa-heart',
      active: 'fa-solid fa-heart',
    },
    group: 'secondary',
    isAvailable: false,
  },
  {
    id: 4000,
    label: '만들기',
    href: ROUTES.CREATE,
    iconClass: {
      default: 'fa-regular fa-square-plus',
      active: 'fa-solid fa-square-plus',
    },
    group: 'secondary',
    isAvailable: false,
  },
  {
    id: 5000,
    label: '메시지',
    href: ROUTES.DIRECT_MESSAGE,
    iconClass: {
      default: 'fa-regular fa-paper-plane',
      active: 'fa-solid fa-paper-plane',
    },
    group: 'secondary',
    isAvailable: true,
  },
]
