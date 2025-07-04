import Link from 'next/link'
import React from 'react'
import DesktopNavbar from '@/components/DesktopNavbar'
import MobileNavbar from '@/components/MobileNavbar'


const Navbar = () => {
  return (
    <nav className='navbar'>
        <div className='max-w-7xl  mx-auto px-4'>
            <div className='flex items-center justify-between h-16'>
                <div className='flex items-center'>
                    <Link href="/" className='text-xl font-bold text-primary font-mono tracking-wider'>
                        Konvoo
                    </Link>
                </div>  
                <div className='flex items-center ml-auto'>
                    <DesktopNavbar />
                    <MobileNavbar />
                </div>
            </div>
        </div>
    </nav>
  )
}

export default Navbar
