// Mock data for the OEM Rebuilds website

// Car makes and models
const carData = {
  makes: ["Toyota", "Honda", "Ford", "BMW", "Mercedes", "Audi", "Nissan"],
  models: {
    Toyota: ["Camry", "Corolla", "RAV4", "Highlander", "Tacoma"],
    Honda: ["Civic", "Accord", "CR-V", "Pilot", "Odyssey"],
    Ford: ["F-150", "Mustang", "Explorer", "Escape", "Focus"],
    BMW: ["3 Series", "5 Series", "X3", "X5", "7 Series"],
    Mercedes: ["C-Class", "E-Class", "S-Class", "GLC", "GLE"],
    Audi: ["A4", "A6", "Q5", "Q7", "A8"],
    Nissan: ["Altima", "Maxima", "Rogue", "Pathfinder", "Sentra"],
  },
}

// Categories
const categories = [
  {
    id: "engine",
    name: "Engine Parts",
    icon: "tool",
    description: "Pistons, Gaskets, Valves & more",
    color: "engine",
  },
  {
    id: "body",
    name: "Body Parts",
    icon: "truck",
    description: "Bumpers, Doors, Mirrors & more",
    color: "body",
  },
  {
    id: "accessories",
    name: "Accessories",
    icon: "zap",
    description: "Lights, Wipers, Mats & more",
    color: "accessories",
  },
  {
    id: "other",
    name: "Other Parts",
    icon: "settings",
    description: "Filters, Belts, Sensors & more",
    color: "other",
  },
]

// Products
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
const productCategories = [...new Set(products.map((product) => product.category))]
const productBrands = [...new Set(products.map((product) => product.brand))]

