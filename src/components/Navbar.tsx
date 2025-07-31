'use client'

import { useState } from 'react'
import Link from 'next/link'
import { DropletsIcon, MenuIcon, XIcon } from 'lucide-react'
import { UserButton, useUser } from '@clerk/nextjs'

import { Button } from '@/components/ui/Button'



const Navbar = () => {
  const { isSignedIn } = useUser()
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/collection', label: 'Collection' },
    { href: '/contact', label: 'Contact Us' },
  ]

  return (
    <header className="sticky top-0 left-0 w-full z-50 bg-[#0f0f0f]/30 backdrop-blur-md border-b border-white/10">

      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <DropletsIcon className="w-6 h-6 text-amber-400 animate-pulse" />
         <span className="font-serif text-2xl text-white hover:text-amber-400 transition-colors" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
         Luxe
         </span>

        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex gap-14 text-white text-sm md:text-base">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="hover:text-amber-400 transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right section: Auth and Menu icon */}
        <div className="flex items-center gap-3">
          {/* Auth section (always visible) */}
          {!isSignedIn ? (
            <div className="flex gap-2">
              <Link href="/sign-up">
                <Button className="bg-stone-200 text-black hover:bg-amber-500 hover:text-white transition">
                  Sign Up
                </Button>
              </Link>
              <Link href="/sign-in">
                <Button className="bg-stone-200 text-black hover:bg-amber-500 hover:text-white transition">
                  Sign In
                </Button>
              </Link>
            </div>
          ) : (
            <UserButton afterSignOutUrl="/" />
          )}

          {/* Hamburger icon (mobile only) */}
          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu (only nav links) */}
      {menuOpen && (
        <div className="md:hidden bg-[#1a1a1a] px-6 pb-6 pt-2 space-y-3">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="block text-white hover:text-black hover:bg-amber-500 px-3 py-2 rounded transition"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}

export default Navbar
