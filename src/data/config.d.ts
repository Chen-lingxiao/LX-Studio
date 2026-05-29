export interface MenuItem {
  title: string
  path: string
}

export interface MenuCategory {
  title: string
  icon: string
  children: MenuItem[]
}

export const studyMenu: MenuCategory[]
