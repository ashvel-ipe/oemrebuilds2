"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ShoppingCart, Heart } from "lucide-react"
import { useCart } from "@/lib/cart-context"

// Mock product data
const products = [
  {
    id: 1,
    name: "Engine Piston Set",
    price: 129.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "engine",
    brand: "OEM Toyota",
    compatibility: ["Toyota Camry", "Toyota Corolla"],
    inStock: true,
  },
  {
    id: 2,
    name: "Brake Pad Kit",
    price: 79.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "brakes",
    brand: "OEM Honda",
    compatibility: ["Honda Civic", "Honda Accord"],
    inStock: true,
  },
  {
    id: 3,
    name: "Headlight Assembly",
    price: 199.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "accessories",
    brand: "OEM Ford",
    compatibility: ["Ford F-150", "Ford Mustang"],
    inStock: true,
  },
  {
    id: 4,
    name: "Oil Filter",
    price: 12.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "other",
    brand: "OEM BMW",
    compatibility: ["BMW 3 Series", "BMW 5 Series"],
    inStock: false,
  },
]

export default function FeaturedProducts() {
  const { addToCart } = useCart()
  const productRefs = useRef<(HTMLDivElement | null)[]>([])
  const [addedToCart, setAddedToCart] = useState<{ [key: number]: boolean }>({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0")
            entry.target.classList.remove("opacity-0", "translate-y-10")
          }
        })
      },
      { threshold: 0.1 },
    )

    productRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => {
      productRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
    }
  }, [])

  const handleAddToCart = (product: any) => {
    addToCart(product)

    // Visual feedback
    setAddedToCart({ ...addedToCart, [product.id]: true })

    // Reset after animation
    setTimeout(() => {
      setAddedToCart({ ...addedToCart, [product.id]: false })
    }, 1500)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <div
          key={product.id}
          ref={(el) => (productRefs.current[index] = el)}
          className="opacity-0 translate-y-10 transition-all duration-500 ease-out bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl"
          style={{ transitionDelay: `${index * 100}ms` }}
        >
          <div className="relative group">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={300}
              height={300}
              className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute top-2 right-2">
              <button className="p-2 bg-white/80 rounded-full text-gray-700 hover:text-red-500 transition-colors">
                <Heart size={20} />
              </button>
            </div>
            {!product.inStock && (
              <div className="absolute top-0 left-0 bg-red-500 text-white px-3 py-1 text-sm">Out of Stock</div>
            )}
          </div>

          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-600 mb-2">{product.brand}</p>
            <p className="text-xl font-bold mb-4">${product.price.toFixed(2)}</p>

            <button
              onClick={() => handleAddToCart(product)}
              disabled={!product.inStock}
              className={`w-full flex items-center justify-center py-2 px-4 rounded-md transition-all duration-300 ${
                addedToCart[product.id]
                  ? "bg-green-500 text-white"
                  : product.inStock
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {addedToCart[product.id] ? (
                "Added to Cart!"
              ) : (
                <>
                  <ShoppingCart size={18} className="mr-2" />
                  Add to Cart
                </>
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

