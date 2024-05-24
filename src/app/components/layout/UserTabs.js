import React from 'react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function UserTabs({isAdmin}) {
    const path = usePathname();
  return (
    <div className="tabs flex gap-2 justify-center">
    <Link className={path === '/profile' ? 'active' : ''} href = {'/profile'}>Profile</Link>
    {
      isAdmin && (
        <>
          <Link className={path === '/categories' ? 'active' : ''} href={"/categories"}>Categories</Link>
          <Link className={/menu-item/.test(path) ? 'active' : ''} href={"/menu-items"}>Menu Items</Link> 
          {/*BASIC:  path === '/menu-items' REGEX: /menu-items/.test(path) NORMAL: path.includes('menu-items) */}
          <Link className={path.includes('/users') ? 'active' : ''} href={"/users"}>Users</Link>
          <Link className={path === '/orders' ? 'active' : ''} href={"/orders"}>Orders</Link>
        </>
      )
    }
  </div>
  )
}

export default UserTabs;