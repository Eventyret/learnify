"use client"

import { DropdownMenuContent } from '@radix-ui/react-dropdown-menu';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuTrigger } from './ui/dropdown-menu';
import { User } from 'next-auth';
import { use, useEffect, useState } from 'react';

interface UserAccountNavProps {
  user: User
}

export const UserAccountNav: React.FC<UserAccountNavProps> = ({ user }) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true)
  }, [])
  if (!isMounted) return null
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button>Open Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <div className='flex items-center justify-start gap-2 p-2'>
          {user?.name && <p className='font-medium'>{user.name}</p>}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}