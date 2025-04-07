"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [isRegistering, setIsRegistering] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (isRegistering) {
      // Register new user
      if (!name || !email || !password) {
        setError("All fields are required")
        return
      }

      // Save user to localStorage
      const user = { name, email, password }
      localStorage.setItem("user", JSON.stringify(user))

      // Close modal and refresh page
      onClose()
      window.location.reload()
    } else {
      // Login existing user
      const storedUser = localStorage.getItem("user")

      if (!storedUser) {
        setError("No account found. Please register.")
        return
      }

      const user = JSON.parse(storedUser)

      if (user.email === email && user.password === password) {
        // Close modal and refresh page
        onClose()
        window.location.reload()
      } else {
        setError("Invalid email or password")
      }
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>

      <div className="bg-white rounded-lg shadow-xl w-full max-w-md z-10 relative animate-fade-in">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">{isRegistering ? "Create Account" : "Login"}</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

          {isRegistering && (
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="John Doe"
              />
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="you@example.com"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 hover:shadow-lg"
          >
            {isRegistering ? "Create Account" : "Login"}
          </button>

          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              {isRegistering ? "Already have an account? Login" : "Don't have an account? Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

