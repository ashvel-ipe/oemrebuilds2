// Products page specific functionality for OEM Rebuilds website

document.addEventListener("DOMContentLoaded", () => {
  // Mock data (replace with actual data fetching)
  const productCategories = ["Engine", "Transmission", "Brakes", "Suspension"]
  const productBrands = ["Brand A", "Brand B", "Brand C"]
  const products = [
    {
      id: 1,
      name: "Engine 1",
      category: "Engine",
      brand: "Brand A",
      price: 100,
      image: "placeholder.jpg",
      inStock: true,
    },
    {
      id: 2,
      name: "Transmission 1",
      category: "Transmission",
      brand: "Brand B",
      price: 150,
      image: "placeholder.jpg",
      inStock: true,
    },
    {
      id: 3,
      name: "Brakes 1",
      category: "Brakes",
      brand: "Brand C",
      price: 200,
      image: "placeholder.jpg",
      inStock: false,
    },
    {
      id: 4,
      name: "Suspension 1",
      category: "Suspension",
      brand: "Brand A",
      price: 120,
      image: "placeholder.jpg",
      inStock: true,
    },
    {
      id: 5,
      name: "Engine 2",
      category: "Engine",
      brand: "Brand B",
      price: 180,
      image: "placeholder.jpg",
      inStock: true,
    },
  ]

  // Products elements
  const productsGrid = document.getElementById("products-grid")
  const noProductsMessage = document.getElementById("no-products")
  const searchInput = document.getElementById("search-input")
  const clearSearchButton = document.getElementById("clear-search")
  const toggleFiltersButton = document.getElementById("toggle-filters")
  const filtersSection = document.getElementById("filters-section")
  const categoryFiltersContainer = document.getElementById("category-filters")
  const brandFiltersContainer = document.getElementById("brand-filters")
  const priceRangeInput = document.getElementById("price-range-input")
  const minPriceLabel = document.getElementById("min-price")
  const maxPriceLabel = document.getElementById("max-price")
  const resetFiltersButton = document.getElementById("reset-filters")
  const clearAllFiltersButton = document.getElementById("clear-all-filters")

  // Filters state
  let searchTerm = ""
  let selectedCategories = []
  let selectedBrands = []
  let maxPrice = 200

  // Parse URL parameters
  const parseUrlParams = () => {
    const urlParams = new URLSearchParams(window.location.search)
    const category = urlParams.get("category")
    const make = urlParams.get("make")
    const model = urlParams.get("model")

    if (category) {
      selectedCategories = [category]
    }

    if (make && model) {
      // In a real app, we would filter products based on make and model
      console.log(`Filtering for ${make} ${model}`)
    }
  }

  // Render category filters
  const renderCategoryFilters = () => {
    productCategories.forEach((category) => {
      const filterOption = document.createElement("label")
      filterOption.className = "filter-option"
      filterOption.innerHTML = `
        <input type="checkbox" class="filter-checkbox" data-category="${category}" ${selectedCategories.includes(category) ? "checked" : ""}>
        <span class="capitalize">${category}</span>
      `

      categoryFiltersContainer.appendChild(filterOption)

      // Add event listener
      const checkbox = filterOption.querySelector("input")
      checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
          selectedCategories.push(category)
        } else {
          selectedCategories = selectedCategories.filter((c) => c !== category)
        }
        filterProducts()
      })
    })
  }

  // Render brand filters
  const renderBrandFilters = () => {
    productBrands.forEach((brand) => {
      const filterOption = document.createElement("label")
      filterOption.className = "filter-option"
      filterOption.innerHTML = `
        <input type="checkbox" class="filter-checkbox" data-brand="${brand}" ${selectedBrands.includes(brand) ? "checked" : ""}>
        <span>${brand}</span>
      `

      brandFiltersContainer.appendChild(filterOption)

      // Add event listener
      const checkbox = filterOption.querySelector("input")
      checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
          selectedBrands.push(brand)
        } else {
          selectedBrands = selectedBrands.filter((b) => b !== brand)
        }
        filterProducts()
      })
    })
  }

  // Filter products
  const filterProducts = () => {
    let filteredProducts = products

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
    filteredProducts = filteredProducts.filter((product) => product.price <= maxPrice)

    // Render filtered products
    renderProducts(filteredProducts)
  }

  // Render products
  const renderProducts = (productsToRender) => {
    // Clear current products
    productsGrid.innerHTML = ""

    // Show/hide no products message
    if (productsToRender.length === 0) {
      productsGrid.style.display = "none"
      noProductsMessage.style.display = "block"
    } else {
      productsGrid.style.display = "grid"
      noProductsMessage.style.display = "none"

      // Render products
      productsToRender.forEach((product, index) => {
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

        productsGrid.appendChild(productCard)
      })

      // Initialize Feather icons
      feather.replace()

      // Animate products on scroll
      observeElements(document.querySelectorAll(".product-card"), "visible")
    }
  }

  // Reset filters
  const resetFilters = () => {
    searchTerm = ""
    selectedCategories = []
    selectedBrands = []
    maxPrice = 200

    // Reset UI
    searchInput.value = ""
    clearSearchButton.style.display = "none"
    priceRangeInput.value = maxPrice
    maxPriceLabel.textContent = `$${maxPrice}`

    // Reset checkboxes
    document.querySelectorAll(".filter-checkbox").forEach((checkbox) => {
      checkbox.checked = false
    })

    // Filter products
    filterProducts()
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
  searchInput.addEventListener("input", (e) => {
    searchTerm = e.target.value
    clearSearchButton.style.display = searchTerm ? "block" : "none"
    filterProducts()
  })

  clearSearchButton.addEventListener("click", () => {
    searchInput.value = ""
    searchTerm = ""
    clearSearchButton.style.display = "none"
    filterProducts()
  })

  toggleFiltersButton.addEventListener("click", () => {
    filtersSection.style.display = filtersSection.style.display === "none" ? "block" : "none"
  })

  priceRangeInput.addEventListener("input", (e) => {
    maxPrice = Number.parseInt(e.target.value)
    maxPriceLabel.textContent = `$${maxPrice}`
    filterProducts()
  })

  resetFiltersButton.addEventListener("click", resetFilters)
  clearAllFiltersButton.addEventListener("click", resetFilters)

  // Initialize
  parseUrlParams()
  renderCategoryFilters()
  renderBrandFilters()
  filterProducts()
})

