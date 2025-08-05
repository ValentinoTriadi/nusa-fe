'use client';

import { Handshake, Heart, Home, ShoppingBasket, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

import { Button } from '../ui/button';

export const Navbar = () => {
  const pathname = usePathname();

  const navItems = [
    {
      id: 'home',
      label: 'Beranda',
      link: '/home',
      icon: Home,
    },
    {
      id: 'marketplace',
      label: 'Marketplace',
      link: '/marketplace',
      icon: ShoppingBasket,
    },
    {
      id: 'collaboration',
      label: 'Collaboration',
      link: '/collaboration',
      icon: Handshake,
    },
    {
      id: 'favorites',
      label: 'Favorites',
      link: '/favorites',
      icon: Heart,
    },
    {
      id: 'profile',
      label: 'Profile',
      link: '/profile',
      icon: User,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-[50%] z-50 w-full max-w-md -translate-x-[50%] bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
      <div className="flex max-w-md items-center justify-between">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = pathname === item.link;

          return (
            <Link
              href={item.link}
              key={item.id}
              passHref
              className="flex w-[20%] gap-0"
            >
              <Button className="flex w-full min-w-0 flex-1 flex-col items-center gap-1 rounded-none bg-white p-8 hover:bg-gray-100/80">
                <IconComponent
                  size={24}
                  className={cn(
                    'transition-colors',
                    isActive
                      ? item.id === 'collaboration'
                        ? 'text-[#FF5C00]'
                        : 'fill-current text-[#FF5C00]'
                      : 'text-gray-400',
                  )}
                />
                <span
                  className={`text-xs font-medium transition-colors ${
                    isActive ? 'text-[#FF5C00]' : 'text-gray-400'
                  }`}
                >
                  {item.label}
                </span>
              </Button>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
