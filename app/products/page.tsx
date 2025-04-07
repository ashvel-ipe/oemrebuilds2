"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import { ShoppingCart, Filter, Search, X } from "lucide-react"
import { useCart } from "@/lib/cart-context"

// Mock product data
const allProducts = [
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
  {
    id: 5,
    name: "Alternator",
    price: 149.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "engine",
    brand: "OEM Nissan",
    compatibility: ["Nissan Altima", "Nissan Maxima"],
    inStock: true,
  },
  {
    id: 6,
    name: "Side Mirror",
    price: 89.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "body",
    brand: "OEM Mercedes",
    compatibility: ["Mercedes C-Class", "Mercedes E-Class"],
    inStock: true,
  },
  {
    id: 7,
    name: "Air Filter",
    price: 19.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "other",
    brand: "OEM Audi",
    compatibility: ["Audi A4", "Audi Q5"],
    inStock: true,
  },
  {
    id: 8,
    name: "Spark Plugs (Set of 4)",
    price: 29.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "engine",
    brand: "OEM Toyota",
    compatibility: ["Toyota RAV4", "Toyota Highlander"],
    inStock: true,
  },
]

// Extract unique categories and brands for filters
const categories = [...new Set(allProducts.map((product) => product.category))]
const brands = [...new Set(allProducts.map((product) => product.brand))]

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const { addToCart } = useCart()

  const [products, setProducts] = useState(allProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200])
  const [showFilters, setShowFilters] = useState(false)
  const [addedToCart, setAddedToCart] = useState<{ [key: number]: boolean }>({})

  // Apply URL params on initial load
  useEffect(() => {
    const make = searchParams.get("make")
    const model = searchParams.get("model")

    if (make && model) {
      // In a real app, we would filter products based on make and model
      // For now, we'll just set a message
      console.log(`Filtering for ${make} ${model}`)
    }
  }, [searchParams])

  // Filter products based on search and filters
  useEffect(() => {
    let filteredProducts = allProducts

    // Apply search term
    if (searchTerm) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply category filter
    if (selectedCategories.length > 0) {
      filteredProducts = filteredProducts.filter((product) => selectedCategories.includes(product.category))
    }

    // Apply brand filter
    if (selectedBrands.length > 0) {
      filteredProducts = filteredProducts.filter((product) => selectedBrands.includes(product.brand))
    }

    // Apply price range
    filteredProducts = filteredProducts.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1],
    )

    setProducts(filteredProducts)
  }, [searchTerm, selectedCategories, selectedBrands, priceRange])

  const handleAddToCart = (product: any) => {
    addToCart(product)

    // Visual feedback
    setAddedToCart({ ...addedToCart, [product.id]: true })

    // Reset after animation
    setTimeout(() => {
      setAddedToCart({ ...addedToCart, [product.id]: false })
    }, 1500)
  }

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    } else {
      setSelectedCategories([...selectedCategories, category])
    }
  }

  const toggleBrand = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand))
    } else {
      setSelectedBrands([...selectedBrands, brand])
    }
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">All Products</h1>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div className="relative w-full md:w-auto flex-grow">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 bg-white border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-50 md:ml-4"
          >
            <Filter size={18} />
            <span>Filters</span>
          </button>
        </div>

        {/* Filters Section */}
        {showFilters && (
          <div className="bg-white p-4 rounded-lg shadow-md mb-8 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Categories */}
              <div>
                <h3 className="font-semibold mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => toggleCategory(category)}
                        className="rounded text-blue-600 focus:ring-blue-500"
                      />
                      <span className="capitalize">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div>
                <h3 className="font-semibold mb-3">Brands</h3>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <label key={brand} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                        className="rounded text-blue-600 focus:ring-blue-500"
                      />
                      <span>{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-semibold mb-3">Price Range</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={() => {
                  setSelectedCategories([])
                  setSelectedBrands([])
                  setPriceRange([0, 200])
                }}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No products found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategories([])
                setSelectedBrands([])
                setPriceRange([0, 200])
              }}
              className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 animate-fade-in"
              >
                <div className="relative group">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
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
        )}
      </div>
    </div>
  )
}

