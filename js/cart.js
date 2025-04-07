// Cart functionality for OEM Rebuilds website

document.addEventListener("DOMContentLoaded", () => {
  // Cart elements
  const cartButton = document.getElementById("cart-button")
  const cartSidebar = document.getElementById("cart-sidebar")
  const cartOverlay = document.getElementById("cart-overlay")
  const closeCartButton = document.getElementById("close-cart")
  const continueShoppingButton = document.getElementById("continue-shopping")
  const cartItemsContainer = document.getElementById("cart-items")
  const emptyCartMessage = document.getElementById("empty-cart")
  const cartFooter = document.getElementById("cart-footer")
  const cartTotalPrice = document.getElementById("cart-total-price")
  const checkoutButton = document.getElementById("checkout-button")
  const clearCartButton = document.getElementById("clear-cart")

  // Cart state
  let cart = []

  // Load cart from localStorage
  const loadCart = () => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        cart = JSON.parse(savedCart)
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error)
        cart = []
      }
    }
    updateCartUI()
  }

  // Save cart to localStorage
  const saveCart = () => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }

  // Add product to cart
  window.addToCart = (product) => {
    // Check if product is already in cart
    const existingItemIndex = cart.findIndex((item) => item.id === product.id)

    if (existingItemIndex !== -1) {
      // Update quantity if product already exists
      cart[existingItemIndex].quantity += 1
    } else {
      // Add new product to cart
      cart.push({
        ...product,
        quantity: 1,
      })
    }

    saveCart()
    updateCartUI()
    openCart()

    // Show added to cart feedback
    const addButton = document.querySelector(`[data-product-id="${product.id}"]`)
    if (addButton) {
      addButton.classList.add("added")
      addButton.textContent = "Added to Cart!"

      // Reset after animation
      setTimeout(() => {
        addButton.classList.remove("added")
        addButton.innerHTML = `<i data-feather="shopping-cart" class="add-to-cart-icon"></i> Add to Cart`
        feather.replace()
      }, 1500)
    }
  }

  // Remove product from cart
  const removeFromCart = (id) => {
    cart = cart.filter((item) => item.id !== id)
    saveCart()
    updateCartUI()
  }

  // Update product quantity
  const updateQuantity = (id, quantity) => {
    const itemIndex = cart.findIndex((item) => item.id === id)
    if (itemIndex !== -1) {
      cart[itemIndex].quantity = quantity
      saveCart()
      updateCartUI()
    }
  }

  // Clear cart
  const clearCart = () => {
    cart = []
    saveCart()
    updateCartUI()
  }

  // Calculate total price
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  // Update cart UI
  const updateCartUI = () => {
    // Show/hide empty cart message and footer
    if (cart.length === 0) {
      emptyCartMessage.style.display = "flex"
      cartFooter.style.display = "none"
    } else {
      emptyCartMessage.style.display = "none"
      cartFooter.style.display = "block"
    }

    // Clear current cart items
    const cartItems = cartItemsContainer.querySelectorAll(".cart-item")
    cartItems.forEach((item) => item.remove())

    // Add cart items
    cart.forEach((item) => {
      const cartItemElement = document.createElement("div")
      cartItemElement.className = "cart-item"
      cartItemElement.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
        <div class="cart-item-details">
          <h3 class="cart-item-name">${item.name}</h3>
          <p class="cart-item-brand">${item.brand}</p>
          <p class="cart-item-price">$${item.price.toFixed(2)}</p>
          
          <div class="cart-item-quantity">
            <button class="quantity-button decrease-quantity" data-id="${item.id}">
              <i data-feather="minus"></i>
            </button>
            <span class="cart-item-quantity-value">${item.quantity}</span>
            <button class="quantity-button increase-quantity" data-id="${item.id}">
              <i data-feather="plus"></i>
            </button>
          </div>
        </div>
        <button class="cart-item-remove" data-id="${item.id}">
          <i data-feather="x"></i>
        </button>
      `

      // Insert before empty cart message
      cartItemsContainer.insertBefore(cartItemElement, emptyCartMessage)

      // Add event listeners
      const decreaseButton = cartItemElement.querySelector(".decrease-quantity")
      const increaseButton = cartItemElement.querySelector(".increase-quantity")
      const removeButton = cartItemElement.querySelector(".cart-item-remove")

      decreaseButton.addEventListener("click", () => {
        const newQuantity = Math.max(1, item.quantity - 1)
        updateQuantity(item.id, newQuantity)
      })

      increaseButton.addEventListener("click", () => {
        updateQuantity(item.id, item.quantity + 1)
      })

      removeButton.addEventListener("click", () => {
        removeFromCart(item.id)
      })
    })

    // Update total price
    cartTotalPrice.textContent = `$${calculateTotal().toFixed(2)}`

    // Initialize Feather icons
    if (typeof feather !== "undefined") {
      feather.replace()
    }
  }

  // Open cart
  const openCart = () => {
    cartSidebar.classList.add("active")
    cartOverlay.classList.add("active")
    document.body.style.overflow = "hidden"
  }

  // Close cart
  const closeCart = () => {
    cartSidebar.classList.remove("active")
    cartOverlay.classList.remove("active")
    document.body.style.overflow = "auto"
  }

  // Event listeners
  cartButton.addEventListener("click", openCart)
  closeCartButton.addEventListener("click", closeCart)
  continueShoppingButton.addEventListener("click", closeCart)
  cartOverlay.addEventListener("click", closeCart)
  clearCartButton.addEventListener("click", clearCart)

  // Checkout
  checkoutButton.addEventListener("click", () => {
    // In a real app, this would navigate to a checkout page
    // For now, we'll just save the order to localStorage
    const order = {
      id: Date.now(),
      items: cart,
      total: calculateTotal(),
      date: new Date().toISOString(),
    }

    // Get existing orders or initialize empty array
    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]")
    localStorage.setItem("orders", JSON.stringify([...existingOrders, order]))

    // Clear cart
    clearCart()
    closeCart()

    // Show confirmation (in a real app, this would be a modal or redirect)
    alert("Order placed successfully!")
  })

  // Close cart when pressing Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && cartSidebar.classList.contains("active")) {
      closeCart()
    }
  })

  // Load cart on page load
  loadCart()
})

