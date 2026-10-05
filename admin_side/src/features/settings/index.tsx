import { Outlet, useLocation } from '@tanstack/react-router'
import { Monitor, Bell, Palette, Timer, Wrench, UserCog, Globe } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { SidebarNav } from './components/sidebar-nav'

const sidebarNavItems = [
  {
    title: 'Website & Policies',
    href: '/site-settings',
    icon: <Globe size={18} />,
  },
  {
    title: 'Profile',
    href: '/settings',
    icon: <UserCog size={18} />,
  },
  {
    title: 'Account',
    href: '/settings/account',
    icon: <Wrench size={18} />,
  },
  {
    title: 'Appearance',
    href: '/settings/appearance',
    icon: <Palette size={18} />,
  },
  {
    title: 'Notifications',
    href: '/settings/notifications',
    icon: <Bell size={18} />,
  },
  {
    title: 'Display',
    href: '/settings/display',
    icon: <Monitor size={18} />,
  },
  {
    title: 'Sale Countdown',
    href: '/settings/sale-countdown',
    icon: <Timer size={18} />,
  },
]

export function Settings() {
  const { pathname } = useLocation()
  const isFullWidthPage =
    pathname === '/settings/sale-countdown' || pathname === '/settings/site'

  return (
    <>
      {/* ===== Top Heading ===== */}
      <Header>
        <Search />
        <div className='ms-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>

      <Main fixed={!isFullWidthPage}>
        {!isFullWidthPage && (
          <>
            <div className='space-y-0.5'>
              <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
                Settings
              </h1>
              <p className='text-muted-foreground'>
                Manage your account settings and set e-mail preferences.
              </p>
            </div>
            <Separator className='my-4 lg:my-6' />
          </>
        )}
        <div
          className={`flex flex-1 flex-col space-y-2 md:space-y-2 lg:flex-row lg:space-y-0 lg:space-x-12 ${
            isFullWidthPage ? 'w-full' : 'overflow-hidden'
          }`}
        >
          {!isFullWidthPage && (
            <aside className='top-0 lg:sticky lg:w-1/5'>
              <SidebarNav items={sidebarNavItems} />
            </aside>
          )}
          <div className='flex w-full p-1'>
            <Outlet />
          </div>
        </div>
      </Main>
    </>
  )
}
