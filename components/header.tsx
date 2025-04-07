"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ShoppingCart, User, Search, Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"
import CartSidebar from "./cart-sidebar"
import LoginModal from "./login-modal"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState("")
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    // Check if user is logged in
    const userData = localStorage.getItem("user")
    if (userData) {
      const user = JSON.parse(userData)
      setIsLoggedIn(true)
      setUserName(user.name)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    setIsLoggedIn(false)
    setUserName("")
  }

  return (
    <>
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="text-2xl font-bold">
              <span className={isScrolled ? "text-black" : "text-white"}>OEM Rebuilds</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className={`${
                  isScrolled ? "text-black hover:text-blue-600" : "text-white hover:text-blue-300"
                } transition-colors`}
              >
                Home
              </Link>
              <Link
                href="/products"
                className={`${
                  isScrolled ? "text-black hover:text-blue-600" : "text-white hover:text-blue-300"
                } transition-colors`}
              >
                Products
              </Link>
              <Link
                href="/categories"
                className={`${
                  isScrolled ? "text-black hover:text-blue-600" : "text-white hover:text-blue-300"
                } transition-colors`}
              >
                Categories
              </Link>
            </nav>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
              <button
                className={`p-2 rounded-full ${
                  isScrolled ? "text-black hover:bg-gray-100" : "text-white hover:bg-white/10"
                }`}
              >
                <Search size={20} />
              </button>

              <button
                className={`p-2 rounded-full ${
                  isScrolled ? "text-black hover:bg-gray-100" : "text-white hover:bg-white/10"
                }`}
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart size={20} />
              </button>

              {isLoggedIn ? (
                <div className="relative group">
                  <button
                    className={`p-2 rounded-full ${
                      isScrolled ? "text-black hover:bg-gray-100" : "text-white hover:bg-white/10"
                    }`}
                  >
                    <User size={20} />
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
                    <div className="px-4 py-2 text-sm text-gray-700">Hello, {userName}</div>
                    <hr />
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  className={`p-2 rounded-full ${
                    isScrolled ? "text-black hover:bg-gray-100" : "text-white hover:bg-white/10"
                  }`}
                  onClick={() => setIsLoginModalOpen(true)}
                >
                  <User size={20} />
                </button>
              )}

              {/* Mobile Menu Button */}
              <button
                className={`md:hidden p-2 rounded-full ${
                  isScrolled ? "text-black hover:bg-gray-100" : "text-white hover:bg-white/10"
                }`}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-20">
          <div className="container mx-auto px-4">
            <nav className="flex flex-col space-y-4 py-8">
              <Link
                href="/"
                className="text-black text-xl py-2 border-b border-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/products"
                className="text-black text-xl py-2 border-b border-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                href="/categories"
                className="text-black text-xl py-2 border-b border-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Categories
              </Link>
            </nav>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Login Modal */}
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  )
}

