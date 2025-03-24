import { ROUTES } from './routes'

interface SidebarItem {
  id: number
  label: string
  href: string
  iconClass: {
    default: string
    active: string
  }
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
  },
  {
    id: 2000,
    label: '검색',
    href: '#',
    iconClass: {
      default: 'fa-solid fa-magnifying-glass',
      active: 'fa-solid fa-magnifying-glass',
    },
    group: 'secondary',
  },
  {
    id: 3000,
    label: '알림',
    href: '#',
    iconClass: {
      default: 'fa-regular fa-heart',
      active: 'fa-solid fa-heart',
    },
    group: 'secondary',
  },
  {
    id: 4000,
    label: '만들기',
    href: '#',
    iconClass: {
      default: 'fa-regular fa-square-plus',
      active: 'fa-solid fa-square-plus',
    },
    group: 'secondary',
  },
  {
    id: 5000,
    label: '메시지',
    href: '#',
    iconClass: {
      default: 'fa-regular fa-paper-plane',
      active: 'fa-solid fa-paper-plane',
    },
    group: 'secondary',
  },
]
