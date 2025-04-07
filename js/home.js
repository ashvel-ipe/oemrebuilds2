// Home page specific functionality for OEM Rebuilds website

document.addEventListener("DOMContentLoaded", () => {
  // Mock data - replace with actual data loading or imports
  const carData = {
    makes: ["Toyota", "Honda", "Ford"],
    models: {
      Toyota: ["Camry", "Corolla"],
      Honda: ["Civic", "Accord"],
      Ford: ["F-150", "Mustang"],
    },
  }

  const categories = [
    {
      id: "brakes",
      name: "Brakes",
      description: "High-quality brake pads and rotors.",
      icon: "disc",
      color: "var(--primary)",
    },
    {
      id: "engine",
      name: "Engine Parts",
      description: "Essential components for engine maintenance.",
      icon: "cpu",
      color: "var(--secondary)",
    },
    {
      id: "suspension",
      name: "Suspension",
      description: "Upgrade your vehicle's suspension system.",
      icon: "sliders",
      color: "var(--tertiary)",
    },
    {
      id: "exhaust",
      name: "Exhaust",
      description: "Performance exhaust systems for enhanced sound.",
      icon: "wind",
      color: "var(--quaternary)",
    },
  ]

  const products = [
    {
      id: "brake-pad-1",
      name: "Brake Pads - Ceramic",
      brand: "Akebono",
      price: 49.99,
      image: "https://via.placeholder.com/150",
      inStock: true,
    },
    {
      id: "rotor-1",
      name: "Brake Rotor - Drilled",
      brand: "Brembo",
      price: 79.99,
      image: "https://via.placeholder.com/150",
      inStock: true,
    },
    {
      id: "spark-plug-1",
      name: "Spark Plug - Iridium",
      brand: "NGK",
      price: 9.99,
      image: "https://via.placeholder.com/150",
      inStock: true,
    },
    {
      id: "air-filter-1",
      name: "Air Filter - High Flow",
      brand: "K&N",
      price: 24.99,
      image: "https://via.placeholder.com/150",
      inStock: false,
    },
    {
      id: "shock-absorber-1",
      name: "Shock Absorber - Front",
      brand: "Bilstein",
      price: 99.99,
      image: "https://via.placeholder.com/150",
      inStock: true,
    },
  ]

  // Vehicle selector elements
  const carMakeSelect = document.getElementById("car-make")
  const carModelSelect = document.getElementById("car-model")
  const carConditionSelect = document.getElementById("car-condition")
  const findPartsButton = document.getElementById("find-parts-button")

  // Category grid
  const categoryGrid = document.getElementById("category-grid")

  // Featured products
  const featuredProductsGrid = document.getElementById("featured-products")

  // Populate car makes dropdown
  const populateCarMakes = () => {
    carData.makes.forEach((make) => {
      const option = document.createElement("option")
      option.value = make
      option.textContent = make
      carMakeSelect.appendChild(option)
    })
  }

  // Update car models based on selected make
  const updateCarModels = () => {
    // Clear current options
    carModelSelect.innerHTML = '<option value="">Select Model</option>'

    const selectedMake = carMakeSelect.value
    if (selectedMake) {
      // Enable select
      carModelSelect.disabled = false

      // Add options
      const models = carData.models[selectedMake]
      models.forEach((model) => {
        const option = document.createElement("option")
        option.value = model
        option.textContent = model
        carModelSelect.appendChild(option)
      })
    } else {
      // Disable select if no make is selected
      carModelSelect.disabled = true
    }

    // Update find parts button state
    updateFindPartsButton()
  }

  // Update find parts button state
  const updateFindPartsButton = () => {
    const makeSelected = carMakeSelect.value !== ""
    const modelSelected = carModelSelect.value !== ""

    findPartsButton.disabled = !(makeSelected && modelSelected)
  }

  // Handle find parts button click
  const handleFindParts = () => {
    const make = carMakeSelect.value
    const model = carModelSelect.value
    const condition = carConditionSelect.value

    // Redirect to products page with query parameters
    window.location.href = `products.html?make=${encodeURIComponent(make)}&model=${encodeURIComponent(model)}&condition=${encodeURIComponent(condition)}`
  }

  // Render categories
  const renderCategories = () => {
    categories.forEach((category, index) => {
      const categoryCard = document.createElement("div")
      categoryCard.className = `category-card ${category.color}`
      categoryCard.dataset.delay = index * 100
      categoryCard.innerHTML = `
        <div class="category-icon">
          <i data-feather="${category.icon}" width="48" height="48"></i>
        </div>
        <h3 class="category-title">${category.name}</h3>
        <p class="category-description">${category.description}</p>
      `

      categoryGrid.appendChild(categoryCard)

      // Add click event
      categoryCard.addEventListener("click", () => {
        window.location.href = `products.html?category=${category.id}`
      })
    })

    // Initialize Feather icons
    feather.replace()

    // Animate categories on scroll
    observeElements(document.querySelectorAll(".category-card"), "visible")
  }

  // Render featured products
  const renderFeaturedProducts = () => {
    // Get first 4 products
    const featuredProducts = products.slice(0, 4)

    featuredProducts.forEach((product, index) => {
      const productCard = document.createElement("div")
      productCard.className = "product-card"
      productCard.dataset.delay = index * 100
      productCard.innerHTML = `
        <div class="product-image-container">
          <img src="${product.image}" alt="${product.name}" class="product-image">
          <button class="product-favorite">
            <i data-feather="heart"></i>
          </button>
          ${!product.inStock ? '<div class="product-out-of-stock">Out of Stock</div>' : ""}
        </div>
        
        <div class="product-details">
          <h3 class="product-name">${product.name}</h3>
          <p class="product-brand">${product.brand}</p>
          <p class="product-price">$${product.price.toFixed(2)}</p>
          
          <button 
            class="add-to-cart-button ${product.inStock ? "in-stock" : "out-of-stock"}" 
            ${!product.inStock ? "disabled" : ""}
            data-product-id="${product.id}"
            onclick="addToCart(${JSON.stringify(product).replace(/"/g, "&quot;")})">
            <i data-feather="shopping-cart" class="add-to-cart-icon"></i>
            Add to Cart
          </button>
        </div>
      `

      featuredProductsGrid.appendChild(productCard)
    })

    // Initialize Feather icons
    feather.replace()

    // Animate products on scroll
    observeElements(document.querySelectorAll(".product-card"), "visible")
  }

  // Intersection Observer for animations
  const observeElements = (elements, className) => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add delay based on index
            const delay = entry.target.dataset.delay || 0
            setTimeout(() => {
              entry.target.classList.add(className)
            }, delay)
          }
        })
      },
      { threshold: 0.1 },
    )

    elements.forEach((element) => {
      observer.observe(element)
    })
  }

  // Event listeners
  carMakeSelect.addEventListener("change", updateCarModels)
  carModelSelect.addEventListener("change", updateFindPartsButton)
  findPartsButton.addEventListener("click", handleFindParts)

  // Initialize
  populateCarMakes()
  renderCategories()
  renderFeaturedProducts()

  // Initialize Feather icons (moved here to ensure it's called after elements are rendered)
  feather.replace()
})

// Mock addToCart function
function addToCart(product) {
  console.log("Added to cart:", product)
  alert(`${product.name} added to cart!`)
}

