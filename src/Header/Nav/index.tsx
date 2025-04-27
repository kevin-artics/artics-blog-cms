'use client'

import React, { useState } from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon, MenuIcon, XIcon } from 'lucide-react'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="flex items-center gap-3 relative">
      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-3 items-center">
        {navItems.map(({ link }, i) => (
          <CMSLink key={i} {...link} appearance="link" />
        ))}
        <Link href="/search">
          <span className="sr-only">Search</span>
          <SearchIcon className="w-5 text-primary" />
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="flex md:hidden"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <XIcon className="w-6 h-6 text-primary transition-transform duration-300" />
        ) : (
          <MenuIcon className="w-6 h-6 text-primary transition-transform duration-300" />
        )}
      </button>

      {/* Mobile Dropdown */}
      <div
        className={`absolute top-full right-0 mt-2 w-48 bg-background rounded-md shadow-lg flex flex-col py-2 z-50 origin-top-right transition-all duration-300 ${
          isOpen
            ? 'scale-100 opacity-100 pointer-events-auto'
            : 'scale-95 opacity-0 pointer-events-none'
        }`}
      >
        {navItems.map(({ link }, i) => (
          <CMSLink
            key={i}
            {...link}
            appearance="link"
            className="px-4 py-2 hover:bg-muted transition-colors duration-200"
          />
        ))}
        <Link
          href="/search"
          className="px-4 py-2 hover:bg-muted flex items-center gap-2 transition-colors duration-200"
        >
          <SearchIcon className="w-5 text-primary" />
          <span>Buscar</span>
        </Link>
      </div>
    </nav>
  )
}
